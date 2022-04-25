---
title: Rust智能指针Cow
date: 2021-01-30 23:26:30
categories:
  - rust
tags:
  - rust
  - 智能指针
  - cow
---

## 定义

`Cow`是一个提供了写时克隆功能的智能指针，它可以包装对数据的借用，当需要修改数据或者获取数据的所有权时，对数据`clone`。它的定义如下：

<!-- more -->

```rust
pub enum Cow<'a, B>
where
    B: 'a + ToOwned + ?Sized,
 {
    Borrowed(&'a B),
    Owned(<B as ToOwned>::Owned),
}
```

- `Cow`名为`clone-on-write`，但是对数据类型`B`的`trait`要求是`ToOwned`，而不是`Clone`。这是因为`Clone`只能从`&T`生成`T`，但是`ToOwned`泛化为从任意给定类型的借用数据构建新类型的数据。功能更为强大。

如下一段示例代码，将`Cow`应用在结构体中。

```rust
use std::borrow::Cow;

struct Items<'a, X: 'a>
where
    [X]: ToOwned<Owned = Vec<X>>,
{
    values: Cow<'a, [X]>,
}

impl<'a, X: Clone + 'a> Items<'a, X>
where
    [X]: ToOwned<Owned = Vec<X>>,
{
    fn new(v: Cow<'a, [X]>) -> Self {
        Items { values: v }
    }
}

// Creates a container from borrowed values of a slice
fn main() {
    let readonly = [1, 2];
    let borrowed = Items::new((&readonly[..]).into());
    match borrowed {
        Items {
            values: Cow::Borrowed(b),
        } => println!("borrowed {:?}", b),
        _ => panic!("expect borrowed value"),
    }

    let mut clone_on_write = borrowed;
    // Mutates the data from slice into owned vec and pushes a new value on top
    clone_on_write.values.to_mut().push(3);
    println!("clone_on_write = {:?}", clone_on_write.values);

    // The data was mutated. Let check it out.
    match clone_on_write {
        Items {
            values: Cow::Owned(_),
        } => println!("clone_on_write contains owned data"),
        _ => panic!("expect owned data"),
    }
}
```

运行生成如下结果，可见对借用的数据进行修改后，发生了克隆。

```bash
borrowed [1, 2]
clone_on_write = [1, 2, 3]
clone_on_write contains owned data
```

## 使用

试想这样一个场景，我们需要给处理一些`Url`，其中一部分是`https://`开头的，而另一部分不是，现在要给缺少`https://`前缀的`Url`加上前缀。

使用`Cow`，函数如下：

```rust
fn add_prefix_by_cow<'a, T>(urls: T, prefix: &str) -> Vec<Cow<'a, String>>
where
    T: IntoIterator<Item = &'a String>,
{
    urls.into_iter()
        .map(|url| {
            if url.starts_with(prefix) {
                Cow::Borrowed(url)
            } else {
                Cow::Owned(String::with_capacity(url.len() + prefix.len()) + prefix + url)
            }
        })
        .collect()
}
```

不使用`Cow`，函数如下：

```rust
fn add_prefix_by_clone<'a, T>(urls: T, prefix: &'a str) -> Vec<String>
where
    T: IntoIterator<Item = &'a String>,
{
    urls.into_iter()
        .map(|url| {
            if url.starts_with(prefix) {
                url.clone()
            } else {
                url.clone() + prefix
            }
        })
        .collect()
}
```

用`Criterion`来进行 benchmark 测试

```rust
fn bench(c: &mut Criterion) {
    let mut group = c.benchmark_group("cow_bench");
    group.sampling_mode(SamplingMode::Linear);
    group.bench_function("cow", |b| {
        b.iter_batched(
            || {
                let pre = vec!["https://127.0.0.1".to_string(); 1024];
                let non_pre = vec!["127.0.0.1".to_string(); 1024];
                [pre, non_pre].concat()
            },
            |v| {
                let _ = add_prefix_by_cow(&v, "https://");
            },
            BatchSize::SmallInput,
        )
    });
    group.bench_function("clone", |b| {
        b.iter_batched(
            || {
                let pre = vec!["https://127.0.0.1".to_string(); 1024];
                let non_pre = vec!["127.0.0.1".to_string(); 1024];
                [pre, non_pre].concat()
            },
            |v| {
                let _ = add_prefix_by_clone(&v, "https://");
            },
            BatchSize::SmallInput,
        )
    });
    group.finish();
}
```

输出如下：

```bash
cow_bench/cow           time:   [256.10 us 259.48 us 262.41 us]
cow_bench/clone         time:   [448.13 us 457.38 us 467.73 us]
```

生成分析图片如下图所示，可见`Cow`在大量的内存操作时，能尽可能的进行内存共享，延迟耗时的克隆操作，进行更加细致的内存操作控制。

![image-20210131002520961](Rust-Smartpointer-Cow/image-20210131002520961.png)

<Disqus/>
