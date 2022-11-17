# 用 GAT + TAIT 实现零成本Async Trait


## 起因

RisingWave 的数据源部分，有一个`SourceParser` trait, 它本来是同步的，但是在这个pr中，[feat(source): support confluent schema registry](https://github.com/risingwavelabs/risingwave/pull/6289)，添加了schema registry的支持，在`parse`的过程中，有可能需要从网络下载schema，整个RW是运行在tokio runtime上的，那么自然这个网络请求也应该用异步的，由于异步的传染性，那么`SourceParser` trait也要改异步了，刚开始为了方便，直接使用了[async_trait](https://docs.rs/async-trait/0.1.58/async_trait/)，程序run起来，但是留下了一个性能问题。

`async_trait`会生成如下的结构，那么就有两点开销：

- 动态派发的开销

- 堆内存分配的开销

`Pin<Box<dyn std::future::Future<Output = ()> + Send + 'async_trait>>`。

这个`SourceParser` trait可是row base的，每parse一行数据都在堆上分配一个临时对象，并且动态地调用`parse`，想想开销就有点大。

所以：我们需要一个静态派发的async `SourceParser`。

## 使用GAT

`SourceParser`原来的定义如下：

```rust
pub trait SourceParser: Send + Debug + 'static {
    fn parse(&self, payload: &[u8], writer: SourceStreamChunkRowWriter<'_>) -> Result<WriteGuard>;
}
```

改写为async，就让它返回一个`Future<Output = Result<WriteGuard>>`，而每个Parser返回的Future类型当然也不同，所以我们就可以使用关联类型了；同样的，这个返回的Future实际引用了参数中的`self`, `payload`，`writer`，所以这个Future就得有一个生命周期的参数，因此，我们得用上GAT。

至于生命周期约束，根据直觉，`self`, `payload`，`writer`至少活得和这个Future一样长，那么我们就可以得出如下的trait。

```rust
pub trait ParseFuture<'a, Out> = Future<Output = Out> + Send + 'a;

pub trait SourceParser: Send + Debug + 'static {
    type ParseResult<'a>: ParseFuture<'a, Result<WriteGuard>>;
  
    fn parse<'a, 'b, 'c>(
        &'a self,
        payload: &'b [u8],
        writer: SourceStreamChunkRowWriter<'c>,
    ) -> Self::ParseResult<'a>
    where
      'b: 'a,
      'c: 'a;
}
```

## 使用TAIT

[TAIT](https://rust-lang.github.io/rfcs/2515-type_alias_impl_trait.html)最直观的作用就是可以给实现某个trait的某个类型起别名。

```rust
fn foo() -> impl Bar {
    // return some type implementing `Bar`
}

// use TAIT
type Baz = impl Bar;

fn foo() -> Baz {
    // return some type implementing `Bar`
}
```

不过这个用法刚开始给我造成了困惑，因为我写出了如下的错误代码：

```rust
type Baz = impl Display;

fn foo1() -> Baz {
    0_i32
}

fn foo1() -> Baz {
    0_i64
}
```

`type Baz = impl Display;`并不是在我们使用`Baz`时自动帮我们替换成`impl Display`，而是定义了一个匿名类型，在出现使用时由编译器自动推断并进行绑定，因此它只能，也必须绑定到一个类型上。

回到主线上，我们在为某个具体Parser实现`SourceParser`时，肯定要写出这个关联类型啊，可是一段代码产生的Future是编译器用生成器生成的匿名类型呀，手写它的类型，比拉马努金手写$\pi$的计算公式还离谱。

```rust
type ParseResult<'a> = ???
```

所以，这里刚好可以使用TAIT了，让编译器推断它的类型。

```rust
impl SourceParser for AvroParser {
    type ParseResult<'a> = impl ParseFuture<'a, Result<WriteGuard>>;

    fn parse<'a, 'b, 'c>(
        &'a self,
        payload: &'b [u8],
        writer: SourceStreamChunkRowWriter<'c>,
    ) -> Self::ParseResult<'a>
    where
        'b: 'a,
        'c: 'a,
    {
        self.parse_inner(payload, writer)
    }
}
```


