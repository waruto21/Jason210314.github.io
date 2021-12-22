# 6.S081 lab3 page tables


# 环境配置

前两个 lab 比较基础，就不写博客记录了，于是从 lab3 开始。

环境配置参考[官网](https://pdos.csail.mit.edu/6.S081/2020/tools.html) 。如果使用`ubuntu20.04`的话，环境配置比较简单，只需要从[qemu 官网](https://www.qemu.org/download/#source)下载源码，手动 build 就完成了；或者使用`archlinux`，一条命令便全部配置完成。笔者使用的平台是`macOS 11.2.1`，使用`homebrew`安装的`qemu`在前两个 lab 没有问题，但是在第三个 lab 出现了 crash，改为从源码手动编译安装`qemu 5.1.0`解决了。

<!-- more -->

2021-02-24 修正：做 lab4 查看`call.asm`，发现.text 指令长度不一，有的为 2，有的为 4，遂找人请教，猜测是指令压缩导致，于是联想到之前几乎所有人都遇到的一个问题，使用 gdb 打断点调试时，出现："Cannot access memory at address xxx"。经过大佬查阅并尝试，发现在`.gdbinit.tmpl-riscv`中加入`set riscv use-compressed-breakpoints yes`可以有效解决。

# Print a page table

该部分的内容是打印出第一个进程的用户页表。这个非常简单：

参照`freewalk`函数，首先在`kernel/vm.c`添加`vmprint`:

```c
void
_vmprint(pagetable_t pagetable, int level) {
  int j;
  // there are 2^9 = 512 PTEs in a page table.
  for(int i = 0; i < 512; i++){
    pte_t pte = pagetable[i];
    if(pte & PTE_V){
      for(j = 0; j <= level; j++) {
        if(j == 0)
          printf("..");
        else
          printf(" ..");
      }
      uint64 child = PTE2PA(pte);
      printf("%d: pte %p pa %p\n", i, pte, child);
      // this PTE points to a lower-level page table.
      if ((pte & (PTE_R | PTE_W | PTE_X)) == 0) {
        _vmprint((pagetable_t)child, level + 1);
      }
    }
  }
}
// print the page tables
void
vmprint(pagetable_t pagetable) {
  printf("page table %p\n", pagetable);
  _vmprint(pagetable, 0);
}
```

然后在`exec.c`中插入代码打印第一个进程的用户页表：

```c
if(p->pid == 1) {
  vmprint(p->pagetable);
}
```

启动后打印出如下内容：

```bash
page table 0x0000000087f67000
..0: pte 0x0000000021fd8c01 pa 0x0000000087f63000
.. ..0: pte 0x0000000021fd8801 pa 0x0000000087f62000
.. .. ..0: pte 0x0000000021fd901f pa 0x0000000087f64000
.. .. ..1: pte 0x0000000021fd840f pa 0x0000000087f61000
.. .. ..2: pte 0x0000000021fd801f pa 0x0000000087f60000
..255: pte 0x0000000021fd9801 pa 0x0000000087f66000
.. ..511: pte 0x0000000021fd9401 pa 0x0000000087f65000
.. .. ..510: pte 0x0000000021fdd807 pa 0x0000000087f76000
.. .. ..511: pte 0x0000000020001c0b pa 0x0000000080007000
```

在用户地址空间最高处，511，510 entry 对应`trampoline`和`trapframe`。在用户地址空间最低处，0，1，2 entry 对应`text\data`，`guard page`，`stack`，如果修改下`_vmprint`打印出更多信息，可以发现 entry 1 的`PTE_U`是无效的，可以防止栈溢出。顶级页表只使用到第 255 个 entry，因为`xv6`只使用了 38 位地址。

# A kernel page table per process

第二部分是让每个进程拥有单独的内核页表，为第三部分直接使用用户虚拟地址做准备。

首先在`kernel/proc.h`中的`struct proc`定义中添加

```c
pagetable_t kpagetable;
```

仿照`kvminit`，实现一个初始化进程内核页表的函数：

```c
pagetable_t
proc_kvminit(void)
{
  int i;
  pagetable_t proc_kpagetable = uvmcreate();
  if (proc_kpagetable == 0) {
    return 0;
  }
  for(i = 1; i < 512; i++) {
    proc_kpagetable[i] = kernel_pagetable[i];
  }

  ukvmmap(proc_kpagetable, UART0, UART0, PGSIZE, PTE_R | PTE_W);
  ukvmmap(proc_kpagetable, VIRTIO0, VIRTIO0, PGSIZE, PTE_R | PTE_W);
  ukvmmap(proc_kpagetable, CLINT, CLINT, 0x10000, PTE_R | PTE_W);
  ukvmmap(proc_kpagetable, PLIC, PLIC, 0x400000, PTE_R | PTE_W);

  return proc_kpagetable;
}

void
ukvmmap(pagetable_t kernel_pagetable ,uint64 va, uint64 pa, uint64 sz, int perm)
{
  if(mappages(kernel_pagetable, va, sz, pa, perm) != 0)
    panic("kvmmap");
}
```

根据后续实验，我们能修改的内核地址空间不超过顶级页表的第一个 entry 的地址范围，所以我们和`kernel_pagetable`共享其他 entry，直接进行复制，这样能够节约次级页表占用的内存空间。

`kernel/proc.c`中的`allocproc`函数，负责分配、初始化进程，在其中如下调用：

```c
p->kpagetable = proc_kvminit();
if (p->kpagetable == 0) {
  freeproc(p);
  release(&p->lock);
  return 0;
}
```

之后，官网的`hint`提到需要为每个进程初始化`kernel stack`，可能需要将`proinit`中的部分代码转移到`allocproc`中，由于我们和`kernel_pagetable`共享了顶级页表 entry 1 意外的所有页表，所以仍可以将`kernel stack`的初始化代码留在`procinit`中。

接下来，修改`scheduler`，当调度到进程执行时，将进程的内核页表载入`stap`寄存器（参考`kvminithart`），当没有进程运行时，使用`kernel_pagetable`：

```c
if(p->state == RUNNABLE) {
  // Switch to chosen process.  It is the process's job
  // to release its lock and then reacquire it
  // before jumping back to us.
  p->state = RUNNING;
  c->proc = p;

  w_satp(MAKE_SATP(p->kpagetable));
  sfence_vma();
  swtch(&c->context, &p->context);

  // Process is done running for now.
  // It should have changed its p->state before coming back.
  c->proc = 0;
  kvminithart();
  found = 1;
}
```

之后，我们需要在`free_proc`中添加释放内核页表的代码：

```c
if(p->kpagetable) {
  proc_freekpagetable(p->kpagetable);
}


void
proc_freekpagetable(pagetable_t kpagetable) {
  pte_t pte = kpagetable[0];
  pagetable_t level1 = (pagetable_t) PTE2PA(pte);
  for (int i = 0; i < 512; i++) {
    pte_t pte = level1[i];
    if (pte & PTE_V) {
      uint64 level2 = PTE2PA(pte);
      kfree((void *) level2);
      level1[i] = 0;
    }
  }
  kfree((void *) level1);
  kfree((void *) kpagetable);
}
```

注意，由于和`kernel_pagetable`进行了共享，所以仅释放第一个 entry 对应的次级页表；如果没有共享则需释放整个三级页表（都不能释放物理内存）。

此外，如果将`kernel stack`的初始化代码放置在了`allocproc`中，那么需要在`freeproc`中释放并 ummap`kernel stack`，并且需要在`kvmpa`做出修改，使用：

```c
pte = walk(myproc()->kpagetable, va, 0);
```

# Simplify `copyin/copyinstr`

该部分需要利用第二部分中的进程内核页表简化`copyin/copyinstr`函数，使之不需要传递用户页表。

根据提示，将进程的用户页表复制到其内核页表中，这样每个进程内核页表都有其对应用户页表的副本。复制的用户页表虚拟地址不能超过`PLIC`，之上是`kernel`占有的地址空间，所以需要判断。

```c
void
u2kvmcopy(pagetable_t pagetable, pagetable_t kpagetable, uint64 oldsz, uint64 newsz)
{
  uint64 va;
  pte_t *upte;
  pte_t *kpte;

  if(newsz >= PLIC)
    panic("u2kvmcopy: newsz too large");

  for (va = oldsz; va < newsz; va += PGSIZE) {
    upte = walk(pagetable, va, 0);
    kpte = walk(kpagetable, va, 1);
    *kpte = *upte;
    // because the user mapping in kernel page table is only used for copyin
    // so the kernel don't need to have the W,X,U bit turned on
    *kpte &= ~(PTE_U|PTE_W|PTE_X);
  }
}
```

注意将复制到内核页表的 entry 取消`PTE_U`权限。

之后在`exec/fork/sbrk`中，每次用户页表发生改变时，复制到内核页表中。

对于`exec`:

```c
if(p->pid == 1) {
  vmprint(p->pagetable);
}

u2kvmcopy(p->pagetable, p->kpagetable, 0, p->sz);
```

对于`fork`:

```c
u2kvmcopy(np->pagetable, np->kpagetable, 0, np->sz);

release(&np->lock);

return pid;
```

对于`sbrk`，修改`growproc`:

```c
if(n > 0){
  if (PGROUNDUP(sz + n) >= PLIC)
    return -1;
  if((sz = uvmalloc(p->pagetable, sz, sz + n)) == 0) {
    return -1;
  }
} else if(n < 0){
  sz = uvmdealloc(p->pagetable, sz, sz + n);
  // clean that pte bits
}
u2kvmcopy(p->pagetable, p->kpagetable, p->sz, sz);
```

之后，在`userinit`中，将第一个进程的用户页表复制到内核页表：

```c
p->state = RUNNABLE;

u2kvmcopy(p->pagetable, p->kpagetable, 0, p->sz);

release(&p->lock);
```

最后，将原`cpoyin/copyinstr`修改为对`cpoyin_new/copyinstr_new`的调用即可。

在`copyin_new`中，做了`srcva + len < srcva`判断条件。这是为了防止`len`过大，导致溢出。

最终代码见[github 仓库](https://github.com/waruto210/xv6-labs-2020/tree/pgtbl)。

