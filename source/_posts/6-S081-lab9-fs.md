---
title: 6.S081 lab9 fs
date: 2021-03-02 21:03:42
categories:
  - OS
tags:
  - 6.S081
  - file system
---

# Large files

本关需要为`xv6`添加对大文件的支持。`xv6`的 inode 默认使用 12 个直接块指针和 1 个间接块指针（指向一个存储着块指针的数据块），所以`xv6`支持的最大文件尺寸是`12 + 1*256=268`个 block。我们需要将一个直接块指针修改为双重间接块指针（执行一个存储着间接块指针的数据块），将`xv6`的最大文件尺寸扩展到`11 + 1*256 + 1*256*256= 65803`个 block。

<!-- more -->

首先我们修改`kernel/fs.h`中的相关宏定义：

```c
#define NDIRECT 11
#define NINDIRECT (BSIZE / sizeof(uint))
#define NDOUBLEINDIRECT ((BSIZE / sizeof(uint)) * (BSIZE / sizeof(uint)))
#define MAXFILE (NDIRECT + NINDIRECT + NDOUBLEINDIRECT)
```

然后修改`dinode`和`inode`中的地址数组定义：

```c
uint addrs[NDIRECT+2];
```

接下来修改`bmap`函数，该函数用于将一个文件的逻辑块号转换为设备的物理块号，类似于虚实地址转换：

```c
static uint
bmap(struct inode *ip, uint bn)
{
  uint addr, *a;
  struct buf *bp;

  if(bn < NDIRECT){
    if((addr = ip->addrs[bn]) == 0)
      ip->addrs[bn] = addr = balloc(ip->dev);
    return addr;
  }
  bn -= NDIRECT;

  if(bn < NINDIRECT){
    // Load indirect block, allocating if necessary.
    if((addr = ip->addrs[NDIRECT]) == 0)
      ip->addrs[NDIRECT] = addr = balloc(ip->dev);
    bp = bread(ip->dev, addr);
    a = (uint*)bp->data;
    if((addr = a[bn]) == 0){
      a[bn] = addr = balloc(ip->dev);
      log_write(bp);
    }
    brelse(bp);
    return addr;
  }
  bn -= NINDIRECT;
  if(bn < NDOUBLEINDIRECT){
    // Load double-indirect block, allocating if necessary.
    if((addr = ip->addrs[NDIRECT+1]) == 0)
      ip->addrs[NDIRECT+1] = addr = balloc(ip->dev);
    bp = bread(ip->dev, addr);
    a = (uint*)bp->data;
    uint level1 = bn / NINDIRECT;
    if((addr = a[level1]) == 0){
      a[level1] = addr = balloc(ip->dev);
      log_write(bp);
    }
    brelse(bp);

    bp = bread(ip->dev, addr);
    a = (uint*)bp->data;
    uint level2 = bn % NINDIRECT;
    if((addr = a[level2]) == 0){
      a[level2] = addr = balloc(ip->dev);
      log_write(bp);
    }
    brelse(bp);

    return addr;
  }

  panic("bmap: out of range");
}
```

然后修改`itrunc`函数，在 truncate 文件时，释放我们新添加的双重间接数据块（不要忘了释放指针块本身）：

```c
void
itrunc(struct inode *ip)
{
  int i, j, k;
  struct buf *bp, *nbp;
  uint *a, *na;

  for(i = 0; i < NDIRECT; i++){
    if(ip->addrs[i]){
      bfree(ip->dev, ip->addrs[i]);
      ip->addrs[i] = 0;
    }
  }

  if(ip->addrs[NDIRECT]){
    bp = bread(ip->dev, ip->addrs[NDIRECT]);
    a = (uint*)bp->data;
    for(j = 0; j < NINDIRECT; j++){
      if(a[j])
        bfree(ip->dev, a[j]);
    }
    brelse(bp);
    bfree(ip->dev, ip->addrs[NDIRECT]);
    ip->addrs[NDIRECT] = 0;
  }

  if(ip->addrs[NDIRECT+1]){
    bp = bread(ip->dev, ip->addrs[NDIRECT+1]);
    a = (uint*)bp->data;
    for(j = 0; j < NINDIRECT; j++){
      // level1
      if(a[j]) {
        nbp = bread(ip->dev, a[j]);
        na = (uint*)nbp->data;
        for(k = 0; k < NINDIRECT; k++) {
          // level2
          if(na[k]) {
            bfree(ip->dev, na[k]);
          }
        }
        bfree(ip->dev, a[j]);
        brelse(nbp);
      }
    }
    brelse(bp);
    bfree(ip->dev, ip->addrs[NDIRECT+1]);
    ip->addrs[NDIRECT+1] = 0;
  }

  ip->size = 0;
  iupdate(ip);
}
```

运行`bigfile`测试，看到测试创建了一个 size 为`65803`个 block 的最大文件。

```bash
$ bigfile
..................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................
wrote 65803 blocks
bigfile done; ok
```

# Symbolic links

这次我们需要实现一个`syscall`，用于创建符号连接，符号链接不会增加实际文件`inode`的 link 数，只是使用路径指向被 link 的文件。

首先，按照之前熟悉的方法添加新的`syscall`。

在`kernel/stat.h`中添加符号文件类型：

```c
#define T_SYMLINK 4
```

在`kernel/fcntl.h`中添加：

```c
#define O_NOFOLLOW 0x800
```

用于标识是要读取符号文件本身还是符号链接指向的文件。

之后我们实现`symlink`本身：

```c
uint64
sys_symlink(void) {

  char target[MAXPATH], path[MAXPATH];;
  struct inode *ip;

  if(argstr(0, target, MAXPATH) < 0|| argstr(1, path, MAXPATH) < 0) {
    return -1;
  }

  begin_op();

  if ((ip = create(path, T_SYMLINK, 0, 0)) == 0){
    end_op();
    return -1;
  }
  int len = strlen(target);
  // write target path len
  if(writei(ip, 0, (uint64)&len, 0, sizeof(len)) < sizeof(len)) {
    iunlockput(ip);
    end_op();
    return -1;
  }
  // write target path
  if(writei(ip, 0, (uint64)target, sizeof(len), len + 1) < 0) {
    iunlockput(ip);
    end_op();
    return -1;
  }

  iunlockput(ip);
  end_op();

  return 0;
}
```

首先我们为符号文件创建一个新的`inode`，然后向其数据区写入指向的目标。在写入目标时，使用了`[len, target]`的格式，方便我们之后能准确地从文件系统中读取出`target`。

然后，我们需要修改`sys_open`，使之正确的处理符号文件。

> - Modify the `open` system call to handle the case where the path refers to a symbolic link. If the file does not exist, `open` must fail. When a process specifies `O_NOFOLLOW` in the flags to `open`, `open` should open the symlink (and not follow the symbolic link).
> - If the linked file is also a symbolic link, you must recursively follow it until a non-link file is reached. If the links form a cycle, you must return an error code. You may approximate this by returning an error code if the depth of links reaches some threshold (e.g., 10).

当没有设置`O_NOFOLLOW`时，`open`调用需要打开符号文件指向的真实文件，如果被符号文件指向的文件也是符号文件，则需要递归查找，指导找到真实文件。为了防止循环引用，当查找次数一定数值时，可以判断失败。

```c
#define MAXSYMLINK 10

if (!(omode & O_NOFOLLOW)) {
  int cnt = MAXSYMLINK;
  int len = 0;
  while (cnt-- > 0) {
    ilock(ip);
    if (ip->type == T_SYMLINK) {
      if (readi(ip, 0, (uint64)&len, 0, sizeof(len)) < sizeof(len)) {
        iunlockput(ip);
        end_op();
        return -1;
      }
      if (readi(ip, 0, (uint64)path, sizeof(len), len + 1) < len + 1) {
        iunlockput(ip);
        end_op();
        return -1;
      }
      iunlockput(ip);
    } else {
      iunlock(ip);
      break;
    }
    if((ip = namei(path)) == 0){
      end_op();
      return -1;
    }
  }
  if (cnt <= 0) {
    end_op();
    return -1;
  }
}
```

完整代码见[GitHub 仓库](https://github.com/Jason210314/xv6-labs-2020/tree/fs)。
