---
title: 6.S081 lab8 lock
date: 2021-03-01 20:12:11
categories:
  - OS
tags:
  - 6.S081
  - lock
---

在本实验室中，将重新设计代码以提高并行性。在多核机器上，并行性差的一个常见症状是高强度的锁竞争。提高并行性通常需要改变数据结构和加锁策略，以减少争用。您将对 xv6 内存分配器和文件块缓存进行改进。

<!-- more -->

# Memory allocator

`xv6`的内存分配与释放使用了一个全局锁`kmem.lock`，所有 cpu 想要分配和释放内存时，调用`kfree()`和`kalloc()`将对`kmem.lock`加锁，所以多线程同时获取和释放内存时，将造成激烈的锁竞争。本次实验将为每一个 cpu 实现单独的空闲内存链表，当一个 cpu 没有可用内存时，从另一个 cpu“窃取”。

在改进之前，进行`kalloctest`：

```bash
$ kalloctest
start test1
test1 results:
--- lock kmem/bcache stats
lock: kmem: #fetch-and-add 134228 #acquire() 433016
lock: bcache: #fetch-and-add 0 #acquire() 1242
--- top 5 contended locks:
lock: kmem: #fetch-and-add 134228 #acquire() 433016
lock: proc: #fetch-and-add 39362 #acquire() 135295
lock: virtio_disk: #fetch-and-add 8435 #acquire() 114
lock: proc: #fetch-and-add 4895 #acquire() 135334
lock: proc: #fetch-and-add 3939 #acquire() 135337
tot= 134228
test1 FAIL
start test2
total free number of pages: 32499 (out of 32768)
.....
test2 OK

```

可以看到`kmem`锁的“#fetch-and-add”数值（即自旋次数）非常高，锁竞争非常吉利。

需要注意：

> The function `cpuid` returns the current core number, but it's only safe to call it and use its result when interrupts are turned off. You should use `push_off()` and `pop_off()` to turn interrupts off and on.

修改`kmem`，`kinit()`，`kfree`，`kalloc`：

```c
struct {
  struct spinlock lock;
  struct run *freelist;
} kmems[NCPU];

char kbuf[NCPU][20];

void
kinit()
{
  for (int i = 0; i < NCPU; i++) {
    snprintf(kbuf[i], 20, "kmem%d", i);
    initlock(&kmems[i].lock, (char*)kbuf[i]);
  }
  freerange(end, (void*)PHYSTOP);
}

void
kfree(void *pa)
{
  struct run *r;

  if(((uint64)pa % PGSIZE) != 0 || (char*)pa < end || (uint64)pa >= PHYSTOP)
    panic("kfree");

  // Fill with junk to catch dangling refs.
  memset(pa, 1, PGSIZE);

  r = (struct run*)pa;
  // interrupt off
  push_off();
  int cpu = cpuid();
  acquire(&kmems[cpu].lock);
  r->next = kmems[cpu].freelist;
  kmems[cpu].freelist = r;
  release(&kmems[cpu].lock);
  // interrupt on
  pop_off();
}

void *
kalloc(void)
{
  struct run *r;

  push_off();
  int cpu = cpuid();
  acquire(&kmems[cpu].lock);
  r = kmems[cpu].freelist;
  if(r)
    kmems[cpu].freelist = r->next;
  release(&kmems[cpu].lock);

  // steal from other cpu
  if(!r) {
    for(int i = 0; i < NCPU; i++) {
      if (i == cpu)
        continue;
      acquire(&kmems[i].lock);
      r = kmems[i].freelist;
      if (r) {
        kmems[i].freelist = r->next;
        release(&kmems[i].lock);
        break;
      }
      release(&kmems[i].lock);
    }
  }
  pop_off();
  if(r)
    memset((char*)r, 5, PGSIZE); // fill with junk
  return (void*)r;
}
```

修改后进行`kalloctest`：

```bash
$ kalloctest
start test1
test1 results:
--- lock kmem/bcache stats
lock: kmem0: #fetch-and-add 0 #acquire() 65683
lock: kmem1: #fetch-and-add 0 #acquire() 190628
lock: kmem2: #fetch-and-add 0 #acquire() 176734
lock: bcache: #fetch-and-add 0 #acquire() 1242
--- top 5 contended locks:
lock: proc: #fetch-and-add 35310 #acquire() 112156
lock: virtio_disk: #fetch-and-add 11562 #acquire() 114
lock: proc: #fetch-and-add 4717 #acquire() 112193
lock: proc: #fetch-and-add 4242 #acquire() 112196
lock: proc: #fetch-and-add 4058 #acquire() 112181
tot= 0
test1 OK
start test2
total free number of pages: 32499 (out of 32768)
.....
test2 OK

```

可以看到`kmem`锁竞争消失了。

# Buffer cache

在`xv6`中，使用`buffer cache`缓存一个磁盘`block`的内容，`bcache`使用一个锁来维护，每次`bget`和`brelse`都需要获取锁，这样将带来很激烈的锁竞争。

在修改前，`bcachetest`测试结果如下：

```bash
$ bcachetest
start test0
test0 results:
--- lock kmem/bcache stats
lock: bcache: #fetch-and-add 90245 #acquire() 65022
--- top 5 contended locks:
lock: virtio_disk: #fetch-and-add 157311 #acquire() 1137
lock: bcache: #fetch-and-add 90245 #acquire() 65022
lock: proc: #fetch-and-add 82586 #acquire() 73871
lock: proc: #fetch-and-add 59647 #acquire() 73519
lock: proc: #fetch-and-add 29617 #acquire() 73520
tot= 90245
test0: FAIL
start test1
test1 OK
```

根据实验指导，我们将`bcache`的数据结构由一个双向链表改为`hashtable`，`bucket`数量使用素数来减少 hash 碰撞，其中`steal_lock`是整个`bcache`的大锁。

```c
#define NBUCKET 13

struct {
  struct buf head[NBUCKET];
  struct spinlock lock[NBUCKET];
  struct buf buf[NBUF];
  struct spinlock steal_lock;
} bcache;

uint
ihash(uint blockno) {
  return blockno % NBUCKET;
}
```

修改初始化代码，将每个`bucket`指向的`buf`构造成双向循环链表，方便查找头尾，每次被释放的`buf`将被移到头部，以实现 LRU，减少查找长度。

```c
char buf[NBUCKET][20];

void
binit(void)
{
  struct buf *b;
  for (int i = 0; i < NBUCKET; i++) {
    snprintf(buf[i], 20, "bcache.bucket%d", i);
    initlock(&bcache.lock[i], (char*)buf[i]);
  }
  initlock(&bcache.steal_lock, "bcache");

  for (int i = 0; i < NBUCKET; i++) {
    // create a circular linked list
    // head.next is the first elem
    // head.prev is the last(LRU) elem
    struct buf *head = &bcache.head[i];
    head->prev = head;
    head->next = head;
  }
  int i;
  // Average distribut buf to each bucket
  for (b = bcache.buf, i = 0; b < bcache.buf + NBUF; b++, i = (i + 1) % NBUCKET) {
    b->next = bcache.head[i].next;
    b->prev = &bcache.head[i];
    bcache.head[i].next->prev = b;
    bcache.head[i].next = b;
    initsleeplock(&b->lock, "buffer");
  }
}
```

修改最关键的`bget`：

```c
static struct buf*
bget(uint dev, uint blockno)
{
  struct buf *b;

  uint idx = ihash(blockno);

  acquire(&bcache.lock[idx]);
  for (b = bcache.head[idx].next; b != &bcache.head[idx]; b = b->next) {
    if(b->dev == dev && b->blockno == blockno) {
      b->refcnt++;
      release(&bcache.lock[idx]);
      acquiresleep(&b->lock);
      return b;
    }
  }

  // Not cached, find LRU
  for (b = bcache.head[idx].prev; b != &bcache.head[idx]; b = b->prev) {
    if (b->refcnt == 0) {
      b->dev = dev;
      b->blockno = blockno;
      b->valid = 0;
      b->refcnt = 1;
      release(&bcache.lock[idx]);
      acquiresleep(&b->lock);
      return b;
    }
  }
  release(&bcache.lock[idx]);


  acquire(&bcache.steal_lock);
  acquire(&bcache.lock[idx]);

    for (b = bcache.head[idx].next; b != &bcache.head[idx]; b = b->next) {
    if(b->dev == dev && b->blockno == blockno) {
      b->refcnt++;
      release(&bcache.lock[idx]);
      release(&bcache.steal_lock);
      acquiresleep(&b->lock);
      return b;
    }
  }

  // Not cached, find LRU
  for (b = bcache.head[idx].prev; b != &bcache.head[idx]; b = b->prev) {
    if (b->refcnt == 0) {
      b->dev = dev;
      b->blockno = blockno;
      b->valid = 0;
      b->refcnt = 1;
      release(&bcache.lock[idx]);
      release(&bcache.steal_lock);
      acquiresleep(&b->lock);
      return b;
    }
  }
  // steal from other bucket
  uint _idx = idx;
  idx = ihash(idx + 1);
  while (idx != _idx) {

    acquire(&bcache.lock[idx]);
    // Not cached; recycle an unused buffer.
    for (b = bcache.head[idx].prev; b != &bcache.head[idx]; b = b->prev) {
      if (b->refcnt == 0) {
        b->dev = dev;
        b->blockno = blockno;
        b->valid = 0;
        b->refcnt = 1;
        b->prev->next = b->next;
        b->next->prev = b->prev;
        release(&bcache.lock[idx]);
        b->next = bcache.head[_idx].next;
        b->prev = &bcache.head[_idx];
        b->next->prev = b;
        b->prev->next = b;
        release(&bcache.lock[_idx]);
        release(&bcache.steal_lock);
        acquiresleep(&b->lock);
        return b;
      }
    }
    release(&bcache.lock[idx]);
    idx = ihash(idx + 1);
  }
  release(&bcache.lock[_idx]);
  release(&bcache.steal_lock);

  panic("bget: no buffers");
}
```

上面的代码中，在当前`bucket`中两次查看`block`是否已经被缓存或者有空闲`buf`可用，第二次使用了整个`bcache`的大锁。在我最开始的设计中，当前`bucket`中找不到可用`buf`时，直接尝试从其他`bucket` steal，这会导致潜在的死锁问题，当出现 A steal from B，B steal from A 的情况，就会死锁，这种情况代表了所有`buf`被消耗殆尽，这时应该执行到末尾的`panic`，而不能死锁在这里。

测试中应该没有同时消耗掉所有`buf`，所以死锁并不会出现，但还是应该在设计上避免死锁，所以使用了整个`bcache`的大锁`steal_lock`。当任何进程想要从其他`bucket` steal `buf`时，需要持有该锁，并且需要重复之前的扫描操作，防止执行空隙中有其他进程缓存了对应`block`，破坏操作的原子性，导致一个`block`被缓存两次。`steal_lock`仅影响 steal，当`steal_lock`被持有，不参与 steal 的其他`bucket`仍可以被并发地`bget()`。该设计需要感谢[知乎`iced coffe`](https://zhuanlan.zhihu.com/p/350624682)。

之后修改剩余的相关函数：

```c
void
brelse(struct buf *b)
{
  if(!holdingsleep(&b->lock))
    panic("brelse");

  releasesleep(&b->lock);

  uint idx = ihash(b->blockno);
  acquire(&bcache.lock[idx]);
  b->refcnt--;
  if (b->refcnt == 0) {
    // move to head
    b->next->prev = b->prev;
    b->prev->next = b->next;
    b->next = bcache.head[idx].next;
    b->prev = &bcache.head[idx];
    bcache.head[idx].next->prev = b;
    bcache.head[idx].next = b;
  }

  release(&bcache.lock[idx]);
}

void
bpin(struct buf *b) {
  uint idx = ihash(b->blockno);
  acquire(&bcache.lock[idx]);
  b->refcnt++;
  release(&bcache.lock[idx]);
}

void
bunpin(struct buf *b) {
  uint idx = ihash(b->blockno);
  acquire(&bcache.lock[idx]);
  b->refcnt--;
  release(&bcache.lock[idx]);
}
```

完成改进后，再进行`bcachetest`测试：

```bash
$ bcachetest
start test0
test0 results:
--- lock kmem/bcache stats
lock: bcache.bucket0: #fetch-and-add 0 #acquire() 6174
lock: bcache.bucket1: #fetch-and-add 0 #acquire() 6176
lock: bcache.bucket2: #fetch-and-add 0 #acquire() 6336
lock: bcache.bucket3: #fetch-and-add 0 #acquire() 6328
lock: bcache.bucket4: #fetch-and-add 0 #acquire() 4270
lock: bcache.bucket5: #fetch-and-add 0 #acquire() 4264
lock: bcache.bucket6: #fetch-and-add 0 #acquire() 2680
lock: bcache.bucket7: #fetch-and-add 0 #acquire() 4672
lock: bcache.bucket8: #fetch-and-add 0 #acquire() 4400
lock: bcache.bucket9: #fetch-and-add 0 #acquire() 4121
lock: bcache.bucket10: #fetch-and-add 0 #acquire() 4169
lock: bcache.bucket11: #fetch-and-add 0 #acquire() 6178
lock: bcache.bucket12: #fetch-and-add 0 #acquire() 6176
lock: bcache: #fetch-and-add 0 #acquire() 7
--- top 5 contended locks:
lock: virtio_disk: #fetch-and-add 144778 #acquire() 1197
lock: proc: #fetch-and-add 82509 #acquire() 73738
lock: proc: #fetch-and-add 8076 #acquire() 73425
lock: proc: #fetch-and-add 7466 #acquire() 73385
lock: proc: #fetch-and-add 7014 #acquire() 73384
tot= 0
test0: OK
start test1
test1 OK

```

可见`bcache`锁的竞争消失了。

最终代码见[GitHub 仓库](https://github.com/waruto21/xv6-labs-2020/tree/lock)。
