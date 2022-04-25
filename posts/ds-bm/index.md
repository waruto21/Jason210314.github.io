# 数据结构:BM算法


## 设计思路

BM 算法是一种后缀匹配算法,其具有比 KMP 算法更优秀的性能表现.其核心思想有二
,第一是坏字符,坏字符就是 pattern 与 text 从右往左第一失配的在 text 中的字符,
二是好后缀,好后缀就是 pattern 与 text 从右往左连续匹配成功的子串.对于坏字符
和好后缀,有各自的模式串移动规则,可以确定各自失配时需要移动的位数,最终选
择二者中移动位数较大者移动.在主函数中,让用户输入文档名与需要查找的单词.
每次从文档中读取一行进行匹配搜索,每次使用 BM 算法搜索完成后,若搜索到单词,
则将主串中开始匹配的位置定为查找到单词的下一行,使用 BM 算法进行下一个匹配
搜索,直至搜索完当前行.而后循环直至匹配完整个文档.

<!-- more -->

## 代码说明

```cpp
int* CreateBC(char* pattern, int len);
```

传入模式串及其长度,返回根据坏字符的跳转数组.

```cpp
int* CreateSuffix(char* pattern, int len);
int* CreateGS(char* pattern, int len);
```

两个函数都需要传入模式串及其长度,第一个函数返回其后缀数组,第二个函数调
用第一个函数返回根据好后缀的跳转数组.

```cpp
int bm_search(char* text, int text_len, char* pattern, int pattern_len, int *bc, int *gs);
```

传入主串及其长度,模式串及其长度,坏字符跳转数组,好后缀跳转数组.返回在主串
中查找到模式串的第一个位置,未查找到,则返回-1.

```cpp
char* get_line(FILE *article, char (&text)[1000]);
```

从给定的 article 文件中读取最大 1000 字符的一行,存在 text 位置,读取到文件末尾
则返回 NULL.

## 运行结果

![运行结果](ds-bm/ret.png)

此为从马丁路德金的 I hava a dream 演讲稿中查找 dream 得出的结果.

