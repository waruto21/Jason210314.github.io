---
title: 6.S081 lab7 thread
date: 2021-02-28 15:55:05
categories:
  - OS
tags:
  - 6.S081
  - Multithreading
---

本实验室将让你熟悉多线程。您将在用户级线程包中实现线程切换；使用多线程来加快程序的速度；并实现一个`barrier`。

<!-- more -->

# Uthread: switching between threads

实验代码中为我们提供了一个用户级别线程库，需要我们实现线程切换部分。我们需要给`user/uthread.c`中的`thread_create()`和`thread_schedule()`，以及`user/uthread_switch.S`中的`thread_switch`添加代码。

首先，我们为`thread`添加`context`以保存`callee`寄存器值，从`kernel/proc.h`中复制即可。

```c
struct context {
  uint64 ra;
  uint64 sp;

  // callee-saved
  uint64 s0;
  uint64 s1;
  uint64 s2;
  uint64 s3;
  uint64 s4;
  uint64 s5;
  uint64 s6;
  uint64 s7;
  uint64 s8;
  uint64 s9;
  uint64 s10;
  uint64 s11;
};

struct thread {
  char       stack[STACK_SIZE]; /* the thread's stack */
  int        state;             /* FREE, RUNNING, RUNNABLE */
  struct context context;
};
```

然后是``thread_create()`：

```c
void
thread_create(void (*func)())
{
  struct thread *t;

  for (t = all_thread; t < all_thread + MAX_THREAD; t++) {
    if (t->state == FREE) break;
  }
  t->state = RUNNABLE;
  // YOUR CODE HERE
  // user ra return func in switch
  t->context.ra = (uint64)func;
  // point to stack top(highest addr)
  t->context.sp = (uint64)t->stack + STACK_SIZE;
}
```

利用`ra`在 switch 到 thread 后，返回到函数的位置，将`sp`指向该`thread`的栈顶。

最后是`thread_schedule`：

```c
if (current_thread != next_thread) {         /* switch threads?  */
  next_thread->state = RUNNING;
  t = current_thread;
  current_thread = next_thread;
  /* YOUR CODE HERE
     * Invoke thread_switch to switch from t to next_thread:
     * thread_switch(??, ??);
     */
  thread_switch((uint64)&t->context, (uint64)&current_thread->context);
}
```

至于`thread_switch`的代码，直接从`kernel/switch.S`中复制即可。

# Using threads

后面的两关都和`xv6`无关了，大概是有一些多线程的 feature，`xv6`无法提供，所以需要我们使用`pthread`。

实验为我们提供了一个无锁的`hashtable`，单线程下执行无误，但是多线程执行时，会发生如下问题：

```bash
❯ ./ph 2
100000 puts, 1.780 seconds, 56190 puts/second
0: 16577 keys missing
1: 16577 keys missing
200000 gets, 4.343 seconds, 46055 gets/second
```

这是因为，当两个线程同时插入`hashtable`的一个`bucket`时，会导致 key 丢失。

我们对`put`操作加锁即可（不要忘了在`main()`函数中初始化`locks`）：

```c
pthread_mutex_t locks[NBUCKET];

static
void put(int key, int value)
{
  int i = key % NBUCKET;
  pthread_mutex_lock(&locks[i]);
  // is the key already present?
  struct entry *e = 0;
  for (e = table[i]; e != 0; e = e->next) {
    if (e->key == key)
      break;
  }
  if(e){
    // update the existing key.
    e->value = value;
  } else {
    // the new is new.
    insert(key, value, &table[i], table[i]);
  }
  pthread_mutex_unlock(&locks[i]);
}
```

# Barrier

本关要求我们实现一个`barrie`：在某个点上，所有相关的的线程必须等待，直到所有其他相关的线程也到达这个点。这个我们参考`xv6`中的`sleep`和`wait`的使用即可：

```c
static void
barrier()
{
  // YOUR CODE HERE
  //
  // Block until all threads have called barrier() and
  // then increment bstate.round.
  //

  pthread_mutex_lock(&bstate.barrier_mutex);
  bstate.nthread++;
  if (bstate.nthread == nthread) {
    bstate.round++;
    bstate.nthread = 0;
    pthread_cond_broadcast(&bstate.barrier_cond);
  } else {
    pthread_cond_wait(&bstate.barrier_cond, &bstate.barrier_mutex);
  }
  pthread_mutex_unlock(&bstate.barrier_mutex);
}
```

最终代码见[GitHub 仓库](https://github.com/waruto21/xv6-labs-2020/tree/thread)。
