---
title: 6.S081 lab6 cow
date: 2021-02-27 14:48:15
tags:
  - 6.S081
  - cow

categories:
  - OS
---

# Copy-on-Write Fork for xv6

这次 lab 只有一关，那就是为`xv6`实现`copy on write`。

`xv6`中的`fork()`系统调用将父进程的用户内存全部复制到子进程中。如果父进程内存占用很大，复制可能需要很长的时间。更糟糕的是，通常来说，这个复制在很大程度上是浪费的；例如，在子进程中，`fork()`之后的`exec()`调用会导致子进程丢弃复制的内存，可能大部分内存都没有来得及使用。另一方面，如果父子双方都使用一个`page`，并且其中一方或双方需要写这个`page`，那么确实需要复制。

<!-- more -->

根据官网给的提示：

- 使用引用计数，对每个物理页面维护一个`reference count`，记录物理页面被 map 的次数。

  `kernel/kalloc.c`

  ```c
  struct {
    struct spinlock lock;
    struct run *freelist;
    int rc[PHYSTOP / PGSIZE];
  } kmem;

  void
  freerange(void *pa_start, void *pa_end)
  {
    char *p;
    p = (char*)PGROUNDUP((uint64)pa_start);
    for(; p + PGSIZE <= (char*)pa_end; p += PGSIZE) {
      kmem.rc[(uint64)p / PGSIZE] = 1;
      kfree(p);
    }
  }

  void
  increase_rc(uint64 pa) {
    acquire(&kmem.lock);
    kmem.rc[pa / PGSIZE]++;
    release(&kmem.lock);
  }
  ```

- 利用 RISC-V PTE 中的`RSW (reserved for software)`位来标记`cow`页，修改`uvmcopy()`,在复制内存时，仅将父进程的物理页面 map 到子进程页表中，并清除双方`PTE`中的`PTE_W`标志。

  在`kernel/riscv.h`中加入：

  ```c
  #define PTE_COW (1L << 8)
  ```

  在`kernel/vm.c`中加入：

  ```c
  int
  uvmcopy(pagetable_t old, pagetable_t new, uint64 sz)
  {
    pte_t *pte;
    uint64 pa, i;
    uint flags;

    for(i = 0; i < sz; i += PGSIZE){
      if((pte = walk(old, i, 0)) == 0)
        panic("uvmcopy: pte should exist");
      if((*pte & PTE_V) == 0)
        panic("uvmcopy: page not present");
      pa = PTE2PA(*pte);
      flags = PTE_FLAGS(*pte);
      // only for writable page
      if (flags & PTE_W) {
        flags = (flags | PTE_COW) & (~PTE_W);
        *pte = PA2PTE(pa) | flags;
      }
      increase_rc(pa);
      if(mappages(new, i, PGSIZE, pa, flags) != 0){
        goto err;
      }
    }
    return 0;

   err:
    uvmunmap(new, 0, i / PGSIZE, 1);
    return -1;
  }
  ```

  注意`mappages`失败时，删掉原有的`kfree(mem)`，因为我们没有申请新的内存。

- 发生`page falut`时，在`usertrap()`中捕获，对`cow page`分配真正的物理内存。

  `kernel/kalloc.c`

  ```c
  int
  cow_alloc(pagetable_t pagetable, uint64 va) {
    uint64 pa;
    uint64 mem;
    pte_t *pte;
    if (va >= MAXVA)
      return -1;
    va = PGROUNDDOWN(va);
    pte = walk(pagetable, va, 0);
    if (pte == 0) {
      return -1;
    }
    // not a valid cow page
    if (!(*pte & PTE_V)) {
      return -2;
    }
    pa = PTE2PA(*pte);

    // only one rf, make it writable
    acquire(&kmem.lock);
    if (kmem.rc[pa / PGSIZE] == 1) {
      *pte &= ~PTE_COW;
      *pte |= PTE_W;
      release(&kmem.lock);
      return 0;
    }
    release(&kmem.lock);
    if ((mem = (uint64)kalloc()) == 0){
      return -3;
    }
    memmove((void *)mem, (void *)pa, PGSIZE);
    *pte = ((PA2PTE(mem) | PTE_FLAGS(*pte) | PTE_W) & (~PTE_COW));
    // decrease rc
    kfree((void *)pa);
    return 0;
  }
  ```

  在我的实现中，当`cow page`发生`page fault`，且`reference count`为 1 时，不再重新分配页面进行复制，而是直接将该页面消去`PTE_COW`并加上`PTE_W`，减少内存分配和复制操作。

  在`kernel/trap.c`：

  ```c
  else if(r_scause() == 13 || r_scause() == 15) {
    va = r_stval();
    if (va < PGROUNDDOWN(p->trapframe->sp) &&
        va >= PGROUNDDOWN(p->trapframe->sp) - PGSIZE) {
      // guard page
      p->killed = 1;
    } else {
      int ret;
      if((ret = cow_alloc(p->pagetable, va)) < 0 ) {
        p->killed = 1;
      }
    }
  }
  ```

  当使用`kalloc()`进行内存分配时，需要将对应`page`的`reference count`设置为 1，使用`kfree()`释放内存时，只能将`reference count`为 0 的页面放回空闲列表。

  `kernel/kalloc.c`：

  ```c
  void *
  kalloc(void)
  {
    struct run *r;

    acquire(&kmem.lock);
    r = kmem.freelist;
    if(r) {
      kmem.freelist = r->next;
      kmem.rc[(uint64)r / PGSIZE] = 1;
    }
    release(&kmem.lock);

    if(r)
      memset((char*)r, 5, PGSIZE); // fill with junk
    return (void*)r;
  }

  void
  kfree(void *pa)
  {
    struct run *r;

    if(((uint64)pa % PGSIZE) != 0 || (char*)pa < end || (uint64)pa >= PHYSTOP)
      panic("kfree");

    acquire(&kmem.lock);
    kmem.rc[(uint64)pa / PGSIZE]--;
    if(kmem.rc[(uint64)pa / PGSIZE] <= 0) {
      memset(pa, 1, PGSIZE);
      r = (struct run*)pa;
      r->next = kmem.freelist;
      kmem.freelist = r;
    }
    release(&kmem.lock);
  }
  ```

  _注意_：`kfree()`中，对于`kmem.rc[(uint64)pa / PGSIZE]`的修改和读取必须是一个原子操作，否则内存可能被重复释放，例如对于某个物理`page`，同时 map 到 A、B 的页表中，之后：

  - A : ref - 1
  - B : ref - 1
  - A : ref == 0 => free
  - B : ref == 0 => free

- 最后，我们需要修改`copyout()`，同`lazy allocation`一样，当因为系统调用切换到内核页表时，硬件无法再为写`cow page`产生`page fault`，所以我们需要手动处理：

  ```c
  int
  copyout(pagetable_t pagetable, uint64 dstva, char *src, uint64 len)
  {
    uint64 n, va0, pa0;

    while(len > 0){
      va0 = PGROUNDDOWN(dstva);
      cow_alloc(pagetable, va0);
      pa0 = walkaddr(pagetable, va0);
      if(pa0 == 0)
        return -1;
      n = PGSIZE - (dstva - va0);
      if(n > len)
        n = len;
      memmove((void *)(pa0 + (dstva - va0)), src, n);

      len -= n;
      src += n;
      dstva = va0 + PGSIZE;
    }
    return 0;
  }
  ```

  至此便完成了 lab6 copy on write。

  最终代码见[GitHub 仓库](https://github.com/Jason210314/xv6-labs-2020/tree/cow)。
