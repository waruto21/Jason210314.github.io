# Memory Ordering


最近写一个Rust项目，看了[Tokio Notify](https://github.com/tokio-rs/tokio/blob/master/tokio/src/sync/notify.rs)和[event_listener](https://github.com/smol-rs/event-listener)的源代码，了解到一些memory order的知识。

## 基础概念

Memory Order与多线程程序紧密相关，但是它并不是用于**限制多线程之间的执行顺序**，而是规定**一个线程内的指令如何执行，更准确的说，是讨论单线程内的指令执行顺序对多线程的影响。**

Rust直接继承了C++20的内存模型，这个模型从根本上说是为了弥补消除程序员想要的语义、编译器想要的优化和我们的硬件想要的不一致的混乱之间的差距。

### 编译器重排

编译器从根本上希望进行各种复杂的转换，减少数据依赖，消除dead code，这可能导致一些操作的执行顺序发生大幅改变， 甚至根本不发生。

如下代码

```rust
x = 1;
y = 3;
x = 2;
```

编译器优化后

```rust
x = 2;
y = 3;
```

`x = 1`被消除了，剩下的赋值操作顺序被交换了。在串行程序中，最终结果是一致的，但是在多线程程序中，程序在发现`y = 2`时，可能会假定并依赖`x = 1`，但编译器优化打破了这个事实`x`，原子操作也只保证对一个变量的操作的原子性，对多个load、store操作的顺序没有保证。程序员有时候是希望程序清楚地按照自己的所编写的顺序执行的。

### 硬件重排

即便编译器按照程序员料想的做了，硬件也可能导致问题。

例如由于cache，cpu可能产生一些顺序问题。所以需要一些特殊指令，去控制。

```bash
initial state: x = 0, y = 1

THREAD 1        THREAD2
y = 3;          if x == 1 {
x = 1;              y *= 2;
                }
```

上面这个程序，如果由于硬件问题，可能会有：

`y = 2`：thread2看见x = 1，但是没看见y = 3这个更新，然后执行了y = 1 * 2；

绝大部分X86/64 cpu是强顺序的，而Arm是弱顺序的。在支持强顺序的CPU上 要求强顺序 开销很低或者没有额外开销，因为都是硬件本身提供的，降低顺序要求可能只对弱顺序的硬件有加速作用。

## 数据访问

C++的内存模型通过让程序员来操作程序的 **因果性** 来消弭这些鸿沟。一般来说，就是通过在程序的各个部分以及运行它们的线程之间建立 happen-before 关系来实现的。在没有 happen-before 关系时，编译器可以更激进的优化，存在 happen-before 关系时，编译器则会注意。

数据访问是程序最基本的操作之一，但是编译器可以自由做非常激进的重排，硬件也可以自由地将数据访问的修改以lazily的、非一致的方式传播到其他线程。**只依靠普通的数据访问，不可能写出正确的线程同步代码。**

原子性访问就是程序员告诉编译器和硬件这是多线程程序的方法。每个原子性访问都可以带上一个 ordering 标记，用来表示它和其他原子性访问的关系。其实就是告诉编译器和硬件：**什么不能做**。对编译器来说，主要影响重排；对硬件来说，主要影响数据修改的传播。

主要有下面几个ordering：

- Sequentially Consistent (SeqCst)
- Release
- Acquire
- Relaxed

### Sequentially Consistent

SeqCst是最强的顺序性保证，隐含了其他所有ordering。在这个原子访问之前和之后的数据访问都仍然在它之前和之后，不能跨越这个点。

但是即使在强顺序的硬件上，使用SeqCst也会有额外开销，需要使用内存屏障。

### Acquire-Release

Acquire 和 Release 是作为一对来使用的。它的名字隐含了适用用例：加锁/释放锁。acquire access保证在它之后的所有acess仍然在它之后，能读到在它之前的所有写入；release保证在它之前的仍然在它之前，相当于在这个点，对外发布了它之前的数据访问。

当线程A release某个内存位置，线程B acquire这个内存位置，因果关系就产生了。在A release前的所有write（普通访问和relaxed atomic）都会被B acquire之后的所有操作读到。

### Relaxed

Relaxed是最弱的，对于其他读写，没有同步或者顺序要求，无法形成happen-before关系。Relaxed只保证原子性和修改顺序一致性（其他线程不一定读取到最新值，但读取到的值都是按照写入顺序的）。

relaxed适合那些一定要发生，但并不在意其他线程看到什么值的操作，例如：多线程counter，每次`fetch_add`；智能指针的引用计数counter（但是析构需要以release fetch_sub，然后以acquire load或者直接fence，来读到引用计数的最新值）。

## 思考

最近师兄在秋招，面试官问了他一个问题，学完memory order刚好可以解答。

>  问：一个常见的结构体，里面有mutex，和被它保护的数据成员，mutex加锁本身是原子操作的，那么怎么保证，mutex这个变量被锁住之后，结构体里其他变量能读到最新值呢？

以[`parking_lot`](https://docs.rs/parking_lot/latest/parking_lot/)这个库的`Mutex`为例，可见`lock`时，使用acquire，其后的数据访问不会被重排到其之前；`unlock`使用release，其前的访问不会被排到其后。就保证lock之后能acquire到之前的写入，unlock之后能release之前的写入。

```rust
#[inline]
fn lock(&self) {
  if self
  .state
  .compare_exchange_weak(0, LOCKED_BIT, Ordering::Acquire, Ordering::Relaxed)
  .is_err()
  {
    self.lock_slow(None);
  }
  unsafe { deadlock::acquire_resource(self as *const _ as usize) };
}

#[inline]
unsafe fn unlock(&self) {
  deadlock::release_resource(self as *const _ as usize);
  if self
  .state
  .compare_exchange(LOCKED_BIT, 0, Ordering::Release, Ordering::Relaxed)
  .is_ok()
  {
    return;
  }
  self.unlock_slow(false);
}
```



## 参考

- https://www.zhihu.com/question/265714945/answer/527790724
- https://github.com/GHScan/TechNotes/blob/master/2017/Memory_Model.md

