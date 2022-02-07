---
title: 6.S081 lab10 mmap
date: 2021-03-03 16:35:52

tags:
  - 6.S081
  - mmap
categories:
  - OS
---

`mmap`和`munmap`系统调用允许 UNIX 程序对其地址空间进行更为细致的控制。它们可用于在进程间共享内存，将文件映射到进程地址空间，并作为用户级`page fault`方案的一部分。在本实验室中，我们将在`xv6`中添加`mmap`和`munmap`系统调用，重点是`memory-mapped files`。

<!-- more -->

# Lab: mmap

`mmap`的 API 如下：

```c
void *mmap(void *addr, size_t length, int prot, int flags,
           int fd, off_t offset);
```

在`xv6`中，`addr`始终为 0，所以由`kernel`自行判断应当 map 的地址；`prot`表示了 mapped memory 的 R、W、X 权限，`flags`为`MAP_SHARED`或者`MAP_PRIVATE`，前者表示对 mapped memory 的修改应写回文件，后者则不需要；`offer`永远为 0，不用处理文件的偏移量；mmap 成功将返回对应内存起始地址；失败返回`0xffffffffffffffff`。

`munmap(addr, length)`需要将从 addr 开始的长度为`length`的内存`unmap`。实验指导书保证被`munmap`的这段内存位于`mmap`内存区间的头部/尾部或者是全部，`munmap`不会在中间挖一个洞；当内存是以`MAP_SHARED`模式被`mmap`时，需要先将修改写回文件。

看完了对于`mmap`和`munmap`的要求，发现其实测试没有一些比较难的`case`，为我们的实现提供了便利。

之后，就可以跟着 hints 完成实验：

- 首先添加`mmap`和`munmap`的系统调用声明，并且在`Makefile`中加入`_mmaptest`。

- 对 mapped memory 要使用 lazy allocation，就像在之前的实验中那样，这样子使得我们可以在物理内存有限的情况下`mmap`尽可能大的文件。

- 记录`mmap`为每个进程 map 文件的情况，例如地址，长度，权限，对应的文件等等。由于`xv6`没有真正的内存分配器，所以我们使用一个定长的数组去存储，16 就足够了。

  ```c
  struct VMA {
    int used;
    uint64 addr;
    uint64 end;
    int prot;
    int flags;
    int offset;
    struct file *f;
  };

  // in struct proc
  struct VMA vma[NVMA];
  uint64 mmap_start;
  ```

- 实现`mmap`，从用户地址空间找到空闲处 map 文件，修改对应的`VMA`结构体记录，当对文件`mmap`后，应当增加文件的引用计数(`filedup`)，这样当文件被关闭时，`VMA`持有的文件指针才不会失效。

  最重要的就是找到合适的空闲地址，用于`mmap`。`xv6`的用户地址空间如下图：

  ![image-20210303172730172](6-S081-lab10-mmap/image-20210303172730172.png)

  最顶部是`trampoline`和`trapframe`，它们占用了两个 page，和`stack`之间有很大的空闲地址，我们可以将文件 map 到`trapframe`之下，不断向下增长，`mmap_start`记录着`trapframe`下可用于`mmap`的起始地址，初始值为`PGROUNDDOWN(MAXVA - (2 * PGSIZE))`。

  ```c
  uint64
  sys_mmap(void)
  {
    int length, prot, flags, fd;
    struct file *f;
    if(argint(1, &length) < 0 || argint(2, &prot) < 0
      || argint(3, &flags) < 0 || argfd(4, &fd, &f) < 0) {
        return 0xffffffffffffffff;
    }
    if (!f->writable && flags == MAP_SHARED && (prot & PROT_WRITE)) {
      return 0xffffffffffffffff;
    }
    // find a vma
    struct proc *p = myproc();
    struct VMA *v;
    for (v = p->vma; v < p->vma + NVMA; v++) {
      if(!v->used) {
        break;
      }
    }
    if(v == p->vma + NVMA) {
      return -1;
    }
    filedup(f);
    v->addr = PGROUNDDOWN(p->mmap_start - length);
    v->end = v->addr + length;
    p->mmap_start = v->addr;

    v->used = 1;
    v->f = f;
    v->prot = prot;
    v->flags = flags;
    v->offset = 0;
    return v->addr;
  }
  ```

- 当发生`page fault`时，为其分配一个真实的物理页面，使用`readi`将文件内容读入内存，然后将物理页面 map 到用户地址空间，记得正确设置页面的权限。

  ```c
  else if (r_scause() == 13 || r_scause() == 15) {
      uint64 va = r_stval();
      if (va > MAXVA) {
        p->killed = 1;
      } else {
        if(mmap_alloc(p->pagetable, va) < 0) {
          p->killed = 1;
        }
      }
    }

  int
  mmap_alloc(pagetable_t pagetable, uint64 va)
  {
    char *mem;
    struct proc *p = myproc();
    struct VMA *v;
    // find vma struct
    for (v = p->vma; v < p->vma + NVMA; v++) {
      if(v->used && va >= v->addr && va < v->end) {
        break;
      }
    }
    if (v == p->vma + NVMA) {
      return -1;
    }
    mem = kalloc();
    if(mem == 0){
      return -1;
    }
    memset(mem, 0, PGSIZE);
    begin_op();
    ilock(v->f->ip);
    int len;
    if((len = readi(v->f->ip, 0, (uint64)mem, va - v->addr, PGSIZE)) < 0) {
      iunlock(v->f->ip);
      end_op();
      return -1;
    }
    iunlock(v->f->ip);
    end_op();
    int f = PTE_U | (v->prot << 1);
    if(mappages(pagetable, va, PGSIZE, (uint64)mem, f) != 0) {
      kfree(mem);
      return -1;
    }
    return 0;
  }
  ```

- 实现`munmap`，找到对应的`VMA`，使用`uvmunmap` unmap 对应的内存，当一个`mmap`的所有内存都被 unmap 时，需要减少对应文件的引用计数；如果内存被修改过，且是以`MAP_SHARED`模式被`mmap`，那么需要先将内存内容写回文件。理想态下，我们只应当写回`dirty page`，但是测试中不会检查这一点，所以将所有内存写回文件即可了。

  ```c
  struct file*
  fileundup(struct file *f)
  {
    acquire(&ftable.lock);
    if(f->ref < 1)
      panic("filedup");
    f->ref--;

    release(&ftable.lock);
    return f;
  }

  uint64
  sys_munmap(void)
  {
    uint64 addr;
    int length;
    if(argaddr(0, &addr) < 0 || argint(1, &length) < 0) {
      return -1;
    }
    return s_munmap(addr, length);

  }

  uint64
  s_munmap(uint64 addr, int length) {
    struct proc *p = myproc();
    struct VMA *v;
    for (v = p->vma; v < p->vma + NVMA; v++) {
      if(v->used && v->addr <= addr && addr + length <= v->end) {
        break;
      }
    }
    if(v == p->vma + NVMA) {
      return -1;
    }

    uint64 end = addr + length;
    uint64 _addr = addr;
    while (addr < end) {
      // if already load in
      if(walkaddr(p->pagetable, addr)) {
        if(v->flags == MAP_SHARED && v->f->writable) {
          begin_op();
          ilock(v->f->ip);
          int size = min(end-addr, PGSIZE);
          if(writei(v->f->ip, 1, addr, addr - v->addr, size) < size) {
            iunlock(v->f->ip);
            end_op();
            return -1;
          }
          iunlock(v->f->ip);
          end_op();
        }
        uvmunmap(p->pagetable, addr, 1, 1);
      }
      addr += PGSIZE;
    }
    if(_addr == v->addr) {
      v->addr += length;
    } else if(_addr + length == v->end) {
      v->end -= length;
    }

    if (v->addr == v->end) {
      fileundup(v->f);
      v->used = 0;
    }

    return 0;
  }
  ```

  实现时遇到两个坑：

  - 在`uvmunmap`时，首先要判断该内存是否真的被`lazy allocation`了，否则要像`lazy`lab 中一样，修改`uvmunmap`，我觉得这样实现比较 ugly，因为破坏了`uvmunmap`发现错误的功能。
  - 最开始实现时，只要`v->flags == MAP_SHARED`就将文件写回，结果在`forktest`中父子进程内存内容不一致，查看`forktest`代码发现原来创建的只读文件，只要`prot`不标志为可写，那么制度文件也是可以用`MAP_SHARED`模式进行`mmap`的。所以还要加上`v->f->writable`或者`prot & PROT_WRITE`。

- 修改`exit`代码，使得`exit`被调用后，unmap 所有被`mmap`的内存。

  ```c
  struct VMA *v;
  for (v = p->vma; v < p->vma + NVMA; v++) {
    if(v->used) {
      if (s_munmap(v->addr, v->end - v->addr) < 0) {
        panic("exit:munmap");
      }
    }
  }
  ```

- 修改 fork 代码，使得子进程拥有和父进程相同的`mmap`文件。可以直接为子进程分配新的物理内存用于`mmap`，不用共享相同物理页面。

  ```c
  np->mmap_start = p->mmap_start;
  for(i = 0; i < NVMA; i++) {
    np->vma[i].addr = p->vma[i].addr;
    np->vma[i].end = p->vma[i].end;
    np->vma[i].used = p->vma[i].used;
    np->vma[i].flags = p->vma[i].flags;
    np->vma[i].prot = p->vma[i].prot;

    if(p->vma[i].used && p->vma[i].f) {
      np->vma[i].f = filedup(p->vma[i].f);
    }
  }
  ```
