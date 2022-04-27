# MIT 6.830 Lab6 Rollback and Recovery


## 简介

在lab4中，我们实现的事务是基于NO STEAL/FORCE的，no steal会影响BufferPool的可用空间；且真实场景中如果每次commit都把page数据落盘在返回，会导致性能很差。所以要做基于WAL的Rollback和Recovery。

SimpleDB提供的日志代码产生的日志记录用于进行全页undo和redo。当一个page第一次被读入时，代码会记录该页面的原始内容，作为一个before-image。当一个事务更新过一个page后，在写出到disk时（STEAL或者commit），会先将before-image写入日志， 然后将当前页面内容作为after-image写入日志，写出后，设置当前Page内容为新的before-image，用于后续事务。之后，可以使用before-image在abort时回滚，或者在Recovery期间撤销未commit的事务；使用after-image在Recovery期间redo成功的事务。

之所以可以通过整个物理页面的UNDO来完成abort和恢复，是因为SimpleDB使用页级锁。如果一个事务修改了一个Page，它一定有该Page的独占锁，这意味着没有其他事务在同时修改它，所以我们可以通过覆盖整个页面来UNDO对它的修改。

日志的格式如下图所示：

![logstructure](MIT-6.830-lab6-Rollback-and-Recovery/logstructure.png)

## Exercises

### 1. Rollback

SimpleDB提供了数据结构`tidToFirstLogRecord`来保存每个事务在logfile里的offset。我们只需要从开始处一直读，保存每个page的before image，然后将所有before image写回disk，即可完成rollback。

### 2. Recovery

如果数据库crash并且重启，那么会在开始执行事务之前，先调用`LogFile.recover()`进行恢复。

- 读取最新的checkpoint，获取活跃的事务；
- 从checkpoint向后读，checkpoint记录的活跃事务，但后续未提交的以及checkpoint之后开始但未提交的事务都是loser transaction，commit的都是winner transaction，同时记录before-image和after-image；
- 从最早开始的活跃事务日志开始读取，记录所有loser transaction的before-image；
- 先对对loser transaction undo，然后对winner transaction redo（注意顺序，否则较晚事务的redo会被较早事务的undo抹掉）。


