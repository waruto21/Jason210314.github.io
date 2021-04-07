---
title: 6.S081 lab4 traps
date: 2021-02-25 00:35:58
categories:
  - OS
tags:
  - 6.S081
  - traps
---

# RISC-V assembly

这是一个简单的`RISC-V`汇编热身关卡。

<!-- more -->

我们需要查看`user/call.asm`来回答一些问题，其主要内容如下：

```assembly
int g(int x) {
   0:	1141                	addi	sp,sp,-16
   2:	e422                	sd	s0,8(sp)
   4:	0800                	addi	s0,sp,16
  return x+3;
}
   6:	250d                	addiw	a0,a0,3
   8:	6422                	ld	s0,8(sp)
   a:	0141                	addi	sp,sp,16
   c:	8082                	ret

000000000000000e <f>:

int f(int x) {
   e:	1141                	addi	sp,sp,-16
  10:	e422                	sd	s0,8(sp)
  12:	0800                	addi	s0,sp,16
  return g(x);
}
  14:	250d                	addiw	a0,a0,3
  16:	6422                	ld	s0,8(sp)
  18:	0141                	addi	sp,sp,16
  1a:	8082                	ret

000000000000001c <main>:

void main(void) {
  1c:	1141                	addi	sp,sp,-16
  1e:	e406                	sd	ra,8(sp)
  20:	e022                	sd	s0,0(sp)
  22:	0800                	addi	s0,sp,16
  printf("%d %d\n", f(8)+1, 13);
  24:	4635                	li	a2,13
  26:	45b1                	li	a1,12
  28:	00000517          	auipc	a0,0x0
  2c:	7b850513          	addi	a0,a0,1976 # 7e0 <malloc+0xea>
  30:	00000097          	auipc	ra,0x0
  34:	608080e7          	jalr	1544(ra) # 638 <printf>
  exit(0);
  38:	4501                	li	a0,0
  3a:	00000097          	auipc	ra,0x0
  3e:	276080e7          	jalr	630(ra) # 2b0 <exit>
```

> Which registers contain arguments to functions? For example, which register holds 13 in main's call to `printf`?

根据`RISC-V`的 calling convention，`a0-a7`,`fa0-fa7`包含了函数的参数。调用`printf`时，`a0`为格式化字符串，`a1`是 12，`a2`是 13。

> Where is the call to function `f` in the assembly code for main? Where is the call to `g`? (Hint: the compiler may inline functions.)

由于`f`和`g`函数都是简单的常数计算，传递的参数也是常数 8，所以函数调用被编译器优化掉了，在`0x26`位置，直接将函数调用结果立即数 12 载入寄存器`a1`。

> At what address is the function `printf` located?

从代码中看，很显然，在`0x638`得位置。

> What value is in the register `ra` just after the `jalr` to `printf` in `main`?

`jalr`指令是链接并跳转，将返回地址保存到`ra`寄存器，所以应为`0x38`。

> ```c
> unsigned int i = 0x00646c72;
> printf("H%x Wo%s", 57616, &i);
> ```

运行以上代码，输出`HE110 World`。数字 57616 的 16 进制表示为 0xE110；`RISC-V`采用小端法表示，16 进制的 72、6c、64、00 表示字符串“rld\0”，如果改为大端法，则应反过来，变为`i=0x726c6400`。

> ```c
> printf("x=%d y=%d", 3);
> ```

该`printf`调用少了一个参数，根据 calling convention，对`y=%d`会取`a2`的值进行输出。

# Backtrace

该步骤需要实现一个`backtrace`函数，打印出调用轨迹，即每次调用的返回地址。

xv6 运行时的 stack 结构如下图：

![image-20210225005912570](image-20210225005912570.png)

`s0/fp`中存储着当前的 frame pointer，`fp-8`指向返回地址，`fp-16`指向上一个`fp`地址。

所以我们只需要不断打印当前`fp`的返回地址并向前追溯，直到 stack 顶部。

首先在`kernel/riscv.h`添加内联汇编函数以获取`fp`值：

```c
static inline uint64
r_fp()
{
  uint64 x;
  asm volatile("mv %0, s0" : "=r" (x) );
  return x;
}
```

然后在`kernel/printf.c`实现`backtrace`：

```c
void
backtrace(void) {
  uint64 fp, top;
  fp = r_fp();
  top = PGROUNDUP(fp);
  while(1) {
    if (fp == top) break;
    printf("%p\n", *(uint64*)(fp-8));
    fp = *(uint64*)(fp-16);
  }
}
```

之后在`sys_sleep`和`panic`中加入对`backtrace`的调用即可。

# Alarm

本关需要实现一个`sigalarm(interval, handler)`系统调用，cpu 每消耗 interval 个 ticks 后，调用一次 handler 函数。

首先要在`user/user.h`添加对新系统调用的用户接口：

```c
int sigalarm(int ticks, void (*handler)());
int sigreturn(void);
```

`sigreturn`是一个被设计用来帮助我们实现`sigalarm`的函数，每个`handler`执行结束后，都调用`sigreturn`。

首先要在`proc`中添加新的字段，记录`interval`，`handler`以及所需的辅助变量，在`allocpoc`中对它们进行初始化，在系统调用执行时，保存相应的值到`proc`中。

```c
uint64
sys_sigalarm(void)
{
  struct proc *p = myproc();
  if (argint(0, &(p->alarm_interval)) < 0)
    return -1;
  if (argaddr(1, &(p->alarm_hanlder)) < 0)
    return -1;
  return 0;
}
```

之后，我们需要在`usertrap`识别到 timer interrupt 时，进行处理，hints 告诉我们，是`which_dev == 2`。

```c
// give up the CPU if this is a timer interrupt.
if(which_dev == 2) {
  p->passed++;
  if (p->passed == p->alarm_interval) {
    p->passed = 0;
    p->trapframe->epc = p->alarm_hanlder;
  }
  yield();
}
```

此时只需让`sigreturn`直接返回 0，这样简单地添加代码，可以让`test0`打印出 alarm，但是随后，程序便逻辑崩溃，无法通过测试。这是因为当 kernle 处理完 time interru，回到用户模式，pc 指向 handler 的位置，之后开始执行 handler 函数，在 handler 函数尾部，调用`sigreturn`陷入 kernel，并无操作，再次返回用户态，执行 handler 尾部的`ret`。此时用于`ret`指令的返回地址寄存器`ra`所存储的值，是在 time interrupt 之时，test 函数执行中产生的`ra`的值，并非是 time interrupt 发生时，正在执行的代码地址，所以程序不能返回正确位置，并且 handler 执行过程中，修改了的部分寄存器也需要恢复。

于是，我们需要在 handler 执行前保存`tramframe`，在执行后的`sigreturn`中恢复`tramframe`，让代码返回到正确的位置执行，并使寄存器的数值复原。同时，根据 hints，为了防止 handler 执行过程中被重复调用，添加`permission`字段来进行控制，此外，`interval==0`时，意味着取消 alarm。

```c
uint64
sys_sigreturn(void)
{
  struct proc* p = myproc();
  p->permission = 1;
  *p->trapframe = p->alarm_frame;
  printf("ra:%p\n", p->trapframe->ra);
  return 0;
}
```

在`usertrap`中：

```c
if(which_dev == 2) {
  p->passed++;
  if (p->permission &&
      p->alarm_interval &&
      p->passed == p->alarm_interval) {
    p->passed = 0;
    p->permission = 0;
    p->alarm_frame = *p->trapframe;
    p->trapframe->epc = p->alarm_hanlder;
  }
  yield();
}
```

到此，便完成了 lab4 traps。

此外，还有一点，笔者曾尝试只保存`tramframe`中的`caller save`寄存器，但是无法通过测试。最终查看`asm`文件发现：`callee save`寄存器是在被调用函数尾部的 ret 指令前进行恢复的，但是在`sigreturn`中通过恢复`epc`的方式，将`pc`直接指向了被 time interrupt 打断执行的代码位置，所以`callee save`寄存器在被修改后并未被复原，我们必须保存`trapframe`中的所有寄存器。

最终代码见[github 仓库](https://github.com/Jason210314/xv6-labs-2020/tree/traps)。
