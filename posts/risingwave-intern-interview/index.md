# Risingwave Labs 实习面试


最近希望找个实习，提升下技术（🤏点烂钱）。其实我先面了DatenLord，对方有一个为期一周左右的代码考核，[代码](https://github.com/waruto210/kv_mpsc)倒是写挺好，不过因为一些其他原因闹掰了，NND。然后投了仰慕已久的S社（现已更名RisingWave Labs），岗位是Database Kernel (Rust)，感觉流式数据库确实是一个有意思的新东西，里面又有很多大佬，说话又好听。

## 总结

其实面试前我比较没有自信，因为还没真正做过这种System开发的工作，也就糊过PingCAP两个作业能拿来说说，而且看面经会考算法题，而我自从大三水了一波校招之后，就没刷过题了。面试官比较友好，也不是一直发问，而是提出一个问题，然后以一种双方讨论的方式进行面试，看了 [RinChanNOW](http://blog.rinchannow.top/2022-1-21-singularity-data-interview/)博客，我特别注意慢慢讲，有条理一点，避免太慌张导致面试官无法理解。然后两面写代码居然都没叫我写算法题，而是工程性比较强。

## 一面

面试官自称是RisingWave的产品经理，但也是工程师，应该是因为这种纯技术项目需要技术人才协调开发吧（或者他应该被叫做项目经理？）。

面试官顺着简历看了看，问我哪些比较熟悉。我答：GraphScope、TinyKV、SimpleDB。于是先聊了[GraphScope过滤下推](https://github.com/alibaba/GraphScope/issues/1530)的实现。

- 首先解释了GraphScope存算不分离的现状
- 然后解释我怎么把过滤下推到存储层

其实这个项目的名字有点忽悠，面试官大概以为是我自己根据优化算法把过滤算子的位置下推了，其实这个项目是过滤本身就在计算层的最下面的source那里，source调存储层的`get_all`之后执行过滤，而我只需要把这个过滤下推到存储层，变成`get(filter)`的形式，这样存储层和计算层的数据交互就变少了，就可以做存算分离了。面试官大概是有些失望的。

然后问，TiKV这样的Raft存储集群如果存不下了扩容过程是怎么样的。其实我不太清楚，只能大概像下面这样答：

- region分裂，减小一个region的控制的key range大小，迁移起来更快
- 某个节点（source）上存储压力过大，找一个比较空闲节点（target）新建raft实例，加入该raft group
- 移除source上的raft成员（可能涉及leader变更）
- leader向新加入的raft成员发送snapshot

此处可引用TinyKV这两张图。不过我似乎没有回答上面试官在意的关键点，他说算了，有些超纲了。

![balance](risingwave-intern-interview/balance1.png)

![balance](risingwave-intern-interview/balance2.png)

然后开始问我一些SimpleDB的东西。

- 在simple db中做了哪些内容？
- buffer pool可以干什么？buffer pool作为缓存，通过其获取所有page，便于统一控制事务加锁/释放。
- 优化做了什么？一些CBO统计信息，比如直方图
- 知道RBO吗？知道一些简单修建规则。



最后写代码，对方问我是不是对LRU挺熟，要不写个LRU吧，然后又突然说算了，LRU太简单了，写个HashMap吧。

其实我内心是窃喜的，LRU虽然简单，但是要用要用HashMap指向链表节点的引用，Rust搞这些可难受了（无脑套Rc也不是不行）。

然后我就直接写了一个最好实现的HashMap，用Vec充当bucket，每个元素是一个链表（链地址法）。

然后面试官让我写一个resize，并说一下复杂度，最简单的实现当然是new一个双倍size的Vec，然后把所有key迁移，复杂度O(n)。

然后问我HashMap特别大的时候，rehash时间太长怎么办？

我只想到可以用两层hash，这样绝大多数情况下，可以只扩容第二层。后来查了一下，应该是回答Redis的渐进式hash。同时持有新旧两个buckets，然后在每次操作时，move到新的位置。



## 二面

二面很快啊，一面完等了几分钟，就开始了。二面这位面试官该觉更和蔼，更平和。他先上来介绍了一下他自己的，然后让我自我介绍。

首先，也是问GraphScope，我照上面原样讲了一遍，感觉面试官也是有些失望的。

然后问我知不知道一些底层存储的知识，LSMTree，LevelDB知道吗？幸好我复习了LSMTree和LevelDB，然后就大概聊了以下内容：

- 分层结构
- 读写流程
- 缺点：读写放大
- 优化措施：block index， 步隆过滤器（原理是什么）。面试官想听到更多，但我没答上来。

然后看到我简历上的[simple-rust-kvstore](https://github.com/waruto210/simple-rust-kvstore)，开始问我对bitcask算法的实现，还好我面试前把简历上的东西都过了一遍。

- 索引全部维护在内容中，记录 文件、偏移量
- 所有读取直接读索引然后读文件/所有修改操作直接追加到文件
- 任意时刻只有一个active file，多个inactive file
- 触发log compaction时，将所有活跃数据（index指向的数据）合并到新的merged file
- 重启时遍历所有数据file重建索引

然后问缺点：

- 索引都在内存，占内存大
- 重启时重构索引开销大

问改进方式：

- 优化索引内存占用
- 可以在后台异步持久化索引，定期做checkpoint，读写流程仍和以前一样。重启后，最多丢失一小段最新索引，只需要再读一小段active file即可。面试官还问我索引在disk中如何存储，暂时没想出来。

然后时间差不多了，开始写代码。题目是写一个Redis的RESP协议parser，只需要实现[这个文档](https://moelove.info/2017/03/05/%E7%90%86%E8%A7%A3-Redis-%E7%9A%84-RESP-%E5%8D%8F%E8%AE%AE/#%E5%A4%9A%E8%A1%8C%E5%AD%97%E7%AC%A6%E4%B8%B2)中的部分。

临时用Rust写代码真的很不舒服，一些API不熟，平常都是打开 [doc.rs](doc.rs) 和 [doc.rust-lang.org](doc.rust-lang.org) 看，还有各种Option和Result要处理，至于i32不能做数组下标这种事就更多了。有人看着写代码，我比较紧张，本来很多逻辑可以写的更好，可以复用的，我直接复制粘贴糊💩了，最后有一个case parse不出来，不过时间已经很长了，面试官就让结束这个环节了。结束之后，我自己给它完善优化了下：

```rust
use anyhow::{Context, Error as AnyError, Result};
use std::{char, usize};
use thiserror::Error as ThisError;

#[derive(ThisError, Debug)]
enum ParseRespErr {
    #[error("invalid ending after {0}")]
    InvalidEnding(String),
    #[error("unsupport flag {0}")]
    UnsupportFlag(char),
    #[error("error while parse {0}")]
    ErrorWhileParse(String),
}

#[derive(Debug, PartialEq)]
pub enum RespMsg {
    SingleLine(String),
    ErrorMsg(String),
    Int(i64),
    MultiLine(String),
    Arr(Vec<RespMsg>),
}

impl RespMsg {
    fn parse_raw_int(s: &mut String) -> Result<i64> {
        let mut res = String::new();
        loop {
            let ch = s
                .pop()
                .context(ParseRespErr::ErrorWhileParse(res.clone()))?;
            if ch == '\r' {
                let ch = s.pop().context(ParseRespErr::InvalidEnding(res.clone()))?;
                if ch != '\n' {
                    return Err(ParseRespErr::InvalidEnding(res).into());
                }
                break;
            }
            res.push(ch);
        }
        let value = res
            .parse()
            .context(ParseRespErr::ErrorWhileParse(res.clone()))?;
        Ok(value)
    }

    fn parse_int(s: &mut String) -> Result<RespMsg> {
        Self::parse_raw_int(s).map(|v| RespMsg::Int(v))
    }

    fn parse_single_str(s: &mut String) -> Result<String> {
        let mut res = String::new();
        loop {
            let ch = s
                .pop()
                .context(ParseRespErr::ErrorWhileParse(res.clone()))?;
            if ch == '\r' {
                let ch = s.pop().context(ParseRespErr::InvalidEnding(res.clone()))?;
                if ch != '\n' {
                    return Err(ParseRespErr::InvalidEnding(res).into());
                }
                break;
            }
            res.push(ch);
        }
        Ok(res)
    }

    fn parse_single(s: &mut String) -> Result<RespMsg> {
        Self::parse_single_str(s).map(|s| RespMsg::SingleLine(s))
    }

    fn parse_err(s: &mut String) -> Result<RespMsg> {
        Self::parse_single_str(s).map(|s| RespMsg::ErrorMsg(s))
    }

    fn parse_multi(s: &mut String) -> Result<RespMsg> {
        let mut res = String::new();
        let str_len = Self::parse_raw_int(s)?;
        for _ in 0..str_len {
            let ch = s
                .pop()
                .context(ParseRespErr::ErrorWhileParse(res.clone()))?;
            res.push(ch);
        }

        if s.pop().context(ParseRespErr::InvalidEnding(res.clone()))? != '\r'
            || s.pop().context(ParseRespErr::InvalidEnding(res.clone()))? != '\n'
        {
            return Err(ParseRespErr::InvalidEnding(res).into());
        }
        Ok(RespMsg::MultiLine(res))
    }

    fn parse_arr(s: &mut String) -> Result<RespMsg> {
        let arr_len = Self::parse_raw_int(s)?;
        let mut res = Vec::with_capacity(arr_len as usize);
        for _ in 0..arr_len {
            let msg = Self::from_str(s)?;
            res.push(msg);
        }
        Ok(RespMsg::Arr(res))
    }

    fn from_str(s: &mut String) -> Result<RespMsg> {
        let flag = s.pop().context(ParseRespErr::ErrorWhileParse(s.clone()))?;

        match flag {
            '+' => Self::parse_single(s),
            '-' => Self::parse_err(s),
            ':' => Self::parse_int(s),
            '$' => Self::parse_multi(s),
            '*' => Self::parse_arr(s),
            _ => Err(ParseRespErr::UnsupportFlag(flag).into()),
        }
    }
}

impl TryFrom<String> for RespMsg {
    type Error = AnyError;
    fn try_from(s: String) -> Result<Self, Self::Error> {
        let mut reversed = s.chars().rev().collect::<String>();
        Self::from_str(&mut reversed)
    }
}
```

## RisingWave是什么

两次面试的提问环节，我都问RisingWave和Flink有什么不同，有什么优势。听对方的回答，感觉RisingWave主要还是注重易用性，至于性能方面，目前还在做优化，但据说benchmark表现不俗。我感觉RisingWave更像个流处理系统，而不是数据库。


