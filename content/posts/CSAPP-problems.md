---
title: CS:APP解题记录
date: 2018-11-08 21:52:23
mathjax: true
categories:
  - CS:APP
tags:
  - CS:APP
---

# CS:APP 2.60

```c
#include <stdio.h>
unsigned replace_byte(unsigned x, int i, unsigned char b)
{
    x = x & (~(0XFF << (i << 3)));//相应字节置零
    x = x | (b << (i << 3));      //相应字节改为char b
    return x;
}
int main()
{
    unsigned ret = replace_byte(0X12345678, 1, 0XAB);
    printf("0X%X\n", ret);
    return 0;
}
```

> 0X1234AB78

利用按位运算$x \\& 1 = x , b | 0 = b$。

<!-- more -->

# Csapp 2.65

```c
#include <stdio.h>
int odd_ones(unsigned x)
{
    x ^= x >> 16;
    x ^= x >> 8;
    x ^= x >> 4;
    x ^= x >> 2;
    x ^= x >> 1;
    return x & 1;
}
int main()
{
    int x = odd_ones(0XB);
    printf("%d\n", x);
    return 0;
}
```

    1

对 32 位编码，1 亦或所有 0 仍为 1，偶数个 1 连续亦或结果为 0，奇数个 1 连续亦或结果为 1。对 32 位数，按照右移 16，8，4，2，1 依次右移使得前后各二分之一编码对齐，亦或结果存在后二分之一编码中，直至亦或总结过存于最低位中，结束，取最低位返回。

# Csapp 2.67

## A

在 int 为 w 位的机器中，移位长度不应该超过$w - 1$。

## B

```c
#include <stdio.h>
#include <limits.h>
int int_size_is_32()
{
    return 1 << 31 == INT_MIN;
}
int main()
{
    printf("%d\n", int_size_is_32());
    return 0;
}
```

    1

若 int 为 32 位,则$1 << 31 ==$ INT_MIN.

## C

```c
#include <stdio.h>
#include <limits.h>
int int_size_is_32_for_16()
{
    return (1 << 15 != INT_MIN) && ((1 << 31) == INT_MIN);
}
int main()
{
    printf("%d\n", int_size_is_32_for_16());
    return 0;
}
```

    1

当$1 << 15 !=$ INT_MIN，证明 int 非 16 位后，后面即可判断 int 是否为 32 位.

# Csapp 2.68

```c
#include <stdio.h>
int lower_one_mask(int n)
{
    return (int)(0XFFFFFFFFu >> (32 - n));
}
int main()
{
    printf("0X%X\n", lower_one_mask(6));
    return 0;
}
```

    0X3F

将无符号 int 最大值右移$(32 - n)$位，进行了逻辑右移，再强制转换为有符号 int。
