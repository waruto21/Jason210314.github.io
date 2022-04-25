---
title: 6.S081 lab5 lazy
date: 2021-02-25 21:46:35
categories:
  - OS
tags:
  - 6.S081
  - lazy allocation
---

## Eliminate allocation from sbrk()

这次实验的第一关非常简单，就是从`sbrk`调用中取消内存分配，为之后的`lay allocation`做准备。

```c
uint64
sys_sbrk(void)
{
  int addr;
  int n;

  if(argint(0, &n) < 0)
    return -1;
  struct proc *p = myproc();
  addr = p->sz;
	p->sz += n;

  return addr;
}
```

<!-- more -->

hints 提示我们，修改完代码后，尝试运行`echo hi`，会产生类似下面的结果:

```bash
$ echo hi
usertrap(): unexpected scause 0x000000000000000f pid=3
            sepc=0x0000000000001258 stval=0x0000000000004008
va=0x0000000000004000 pte=0x0000000000000000
panic: uvmunmap: not mapped
```

其实并不一定是`echo`才会导致 crash，其他的执行任意的命令或者输入无意义字符都会导致 crash。在`user/umalloc.c`中，`morecore`调用了`sbrk`，`malloc`调用了`morecore`。在`user/sh.c`中，shell 运行过程中不断地调用`malloc`为 command 申请分配空间，然后运行 command。这个过程中，malloc 并未真正分配空间，运行时访问到对应虚拟地址就会产生 page fault，导致 panic；

## Lazy allocation

这一关需要我们实现`lazy allocation`，在`usertrap()`中处理`page fault`，为产生`page fault`的虚拟地址分配一个真实的物理页面，并 map 到对应虚拟地址。

`r_scause()`用于获取 trap 产生的原因，为 13/15 时为`page fault`。

`r_stval()`获取`stval`寄存器值，它是导致`page fault`的虚拟地址值。

`uvmunmap()`会 panic，因为进程地址空间有些虚拟地址并未被 map，所要加以修改。

参照`uvmalloc()`，完成如下函数，为虚拟地址`va`分配一个真实物理页：

```c
uint64
lazy_uvmalloc(pagetable_t pagetable, uint64 va)
{
  char *mem;

  va = PGROUNDDOWN(va);
  mem = kalloc();
  if(mem == 0){
    return -1;
  }
  memset(mem, 0, PGSIZE);
  if(mappages(pagetable, va, PGSIZE, (uint64)mem, PTE_W|PTE_X|PTE_R|PTE_U) != 0) {
    kfree(mem);
    return -1;
  }
  return 0;
}
```

在`usertrap()`中加入对于`page fault`的处理：

```c
else if(cause == 13 || cause == 15) {
  uint64 va = r_stval();
  if(lazy_uvmalloc(p->pagetable, va) != 0) {
    p->killed = 1;
	}
}
```

添加以上代码之后，在`uvmunmap()`中添加如下修改，取消`panic`：

```c
if((pte = walk(pagetable, a, 0)) == 0)
  // panic("uvmunmap: walk");
  continue;
if((*pte & PTE_V) == 0)
  // panic("uvmunmap: not mapped");
  continue;
```

完成如上代码后，`echo hi`可以正常运行。

## Lazytests and Usertests

第三关需要处理第二关的一些遗留细节问题，完善`lazy allocation`，使之通过全部测试。

> - Handle negative sbrk() arguments.

对于负数参数，需要`unmap`对应页面:

```c
if(n < 0){
  p->sz = uvmdealloc(p->pagetable, p->sz, p->sz + n);
} else {
  p->sz += n;
}
```

> - Kill a process if it page-faults on a virtual memory address higher than any allocated with sbrk().
>
> - Handle faults on the invalid page below the user stack.

这里需要判断产生`page fault`的 va 是否在当前进程拥有的地址范围之外。

```c
if (va >= p->sz || va < p->trapframe->sp)
  p->killed = 1;
```

> - Handle the parent-to-child memory copy in fork() correctly.

在`fork()`中，使用如下代码将内存从父进程复制到子进程：

```c
// Copy user memory from parent to child.
if(uvmcopy(p->pagetable, np->pagetable, p->sz) < 0){
  freeproc(np);
  release(&np->lock);
  return -1;
}
```

进入`uvmcopy()`，做出如下修改：

```c
if((pte = walk(old, i, 0)) == 0)
  // panic("uvmcopy: pte should exist");
  continue;
if((*pte & PTE_V) == 0)
  // panic("uvmcopy: page not present");
  continue;
```

> - Handle the case in which a process passes a valid address from sbrk() to a system call such as read or write, but the memory for that address has not yet been allocated.

当进程进行`syscall`时，会陷入 kernel，此时`stap`切换为内核页表，`RISC-V`硬件无法再为用户地址空间产生`page fault`，所以当用户执行`read()`和`write()`，将用户地址空间的有效虚拟地址传递给内核时，如果该虚拟地址没有 map 到有效物理内存，将会导致程序 panic。kernel 运行时，使用`walkaddr`进行虚实地址转换，所以我们需要修改其中的代码，当虚拟地址有效而页表中未 map 时，尝试为其分配物理内存：

```c
uint64
walkaddr(pagetable_t pagetable, uint64 va)
{
  pte_t *pte;
  uint64 pa;
  struct proc *p = myproc();

  if(va >= MAXVA)
    return 0;

  pte = walk(pagetable, va, 0);
  if(pte == 0 || (*pte & PTE_V) == 0) {
    if (va >= p->sz || va < p->trapframe->sp) {
      return 0;
    }
    if(lazy_uvmalloc(pagetable, va) == 0) {
      pte = walk(pagetable, va, 0);;
    } else {
      return 0;
    }
  }
  if((*pte & PTE_U) == 0)
    return 0;
  pa = PTE2PA(*pte);
  return pa;
}
```

> - Handle out-of-memory correctly: if kalloc() fails in the page fault handler, kill the current process.

在关卡 2 中，已经做到了这一点，当`lazy_uvmalloc()`调用`kalloc()`失败时，返回非 0，杀掉进程：

```c
if(lazy_uvmalloc(p->pagetable, va) != 0) {
  p->killed = 1;
}
```

做完如上修改，便能通过所有测试。

