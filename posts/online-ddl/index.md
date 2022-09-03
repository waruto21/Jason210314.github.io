# Online DDL


## 异步Schema变更
多个计算层的DB节点，在线，异步变更schema，如果保证schema的一致？
### 基本思想
- 无法做到同时改变，那么可以规定确定长度的时间，在这个时长内做到同步，未能同步的节点自己下线，保障一定时长后达到同步。
- 在两个schema切换过程中，由一个或多个相互兼容的中间状态逐步递进

### F1 实现

#### 租约
Schema存储于Spanner中，每个F1 DB server也有一份。每个节点在租约到期后都要重新加载schema，加载失败则下线
#### 中间状态
> delete-only 和 write-only 。

delete-only 指的是 schema 元素的存在性只对删除操作可见。例如当某索引处于 delete-only 状态时，F1 服务器中执行对应表的删除一行数据操作时能“看到”该索引，所以会同时删除该行对应的索引，与之相对的，如果是插入一行数据则“看不到”该索引，所以 F1 不会尝试新增该行对应的索引。如果 schema 元素是 table 或 column ，该 schema 元素只对 delete 语句生效；如果 schema 元素是 index ，则只对 delete 和 update 语句生效，其中 update 语句修改 index 的过程可以认为是先 delete 后再 insert ，在 delete-only 状态时只处理其中的 delete 而忽略掉 insert 。

write-only 指的是 schema 元素对写操作可见，对读操作不可见。例如当某索引处于 write-only 状态时，不论是 insert 、 delete ，或是 update ，F1 都保证正确的更新索引，只是对于查询来说该索引仍是不存在的。

#### 示例
```txt
absent --> delete only --> write only --(reorg)--> public
```
absent 指该索引完全不存在，也就是schema变更的初始状态。 public 自然对应变更完成后就状态，即索引可读可写，对所有操作可见。reorg 指 “database reorganization”，不是一种 schema 状态，而是发生在 write-only 状态之后的一系列操作。这些操作是为了保证在索引变为 public 之前所有旧数据的索引都被正确地生成。

absent -> delete-only: 很显然这个过程中不会出现与此索引相关的任何数据。

delete-only -> write-only: 一旦某节点进入 write-only 状态后，任何数据变更都会同时更新索引。不可能所有节点同时进入 write-only 状态，但我们至少能保证没有节点还停留在 absent 状态， delete-only 或 write-only 状态的节点都能保证索引被正确清除。于是我们知道：从 write-only 状态发布时刻开始，数据库中不会存在多余的索引。

write-only -> reorg: 首先因为 delete-only 的存在，我们知道此时数据库中不存在多余的索引。另外此时不可能有节点还停留在 delete-only 状态，我们又知道从这时起，所有数据的变更都能正确地更新索引。所以 reorg 要做的就是取到当前时刻的snapshot，为每条数据补写对应的索引即可。当然 reorg 开始之后数据可能发生变更，这种情况下底层Spanner提供的一致性能保证 reorg 的写入操作要么失败（说明新数据已提前写入），要么被新数据覆盖。

### TiDB 实现

#### DDL 分类
将 DDL 分成两类，静态 DDL 和动态 DDL。系统 bootstrap 阶段只使用静态 DDL，同时必须在一个事务内完成，而后续所有的操作只允许使用动态 DDL。

#### 新概念

- **元数据记录**：为了简化设计，引入 system database 和 system table 来记录异步 schema 变更的过程中的一些元数据。
- **State**：根据 F1 的异步 schema 变更过程，中间引入了一些状态，这些状态要和 column，index， table 以及 database 绑定， 
  - **创建时**的state 顺序 none, delete only, write only, write reorganization, public；
  - **删除时**的state 顺序 相反，write reorganization 改为 delete reorganization
- **Lease**：同一时刻系统所有节点中 schema 最多有两个不同的版本，即最多有两种不同状态。正因为如此，一个租期内每个正常的节点都会自动加载 schema 的信息，如果不能在租期内正常加载，此节点会自动退出整个系统。那么要确保整个系统的所有节点都已经从某个状态更新到下个状态需要 2 倍的租期时间（一个租期超时load，第二个租期load失败推出）。
- **Job**： 每个单独的 DDL 操作可看做一个 job。在一个 DDL 操作开始时，会将此操作封装成一个 job 并存放到 job queue，等此操作完成时，会将此 job 从 job queue 删除，并在存入 history job queue，便于查看历史 job。
- **Worker**：每个节点都有一个 worker 用来处理 job。
- **Owner**：整个系统只有一个节点的 worker 能当选 owner 角色，每个节点都可能当选这个角色，当选 owner 后 worker 才有处理 job 的权利。owner 这个角色是有任期的，owner 的信息会存储在 KV 层中。worker定期获取 KV 层中的 owner 信息，如果其中 ownerID 为空，或者当前的 owner 超过了任期，则 worker 可以尝试更新 KV 层中的 owner 信息（设置 ownerID 为自身的 workerID），如果更新成功，则该 worker 成为 owner。在租期内这个用来确保整个系统同一时间只有一个节点在处理 schema 变更。
- **Background operations**：主要用于 delete reorganization 的优化处理，跟前面的 worker 处理 job 机制很像。所以引入了 background job， background job queue， background job history queue， background worker 和 background owner，它们的功能跟上面提到的角色功能一一对应，这里就不作详细介绍。


#### 变更流程

基本流程图如下：

![](online-ddl/online-ddl-procedure.jpg)

**模块**

- **TiDB Server**：包含了 TiDB 的 MySQL Protocol 层和 TiDB SQL 层，图中主要描述的是 TiDB SQL 层中涉及到异步 schema 变更的基本模块。
- **load schema**：是在每个节点（这个模块跟之前提到的 worker 一样，便于理解可以这样认为）启动时创建的一个 gorountine， 用于在到达每个租期时间后去加载 schema，如果某个节点加载失败 TiDB Server 将会自动挂掉。此处加载失败包括加载超时。
- **start job**：是在 TiDB SQL 层接收到请求后，给 job 分配 ID 并将之存入 KV 层，之后等待 job 处理完成后返回给上层，汇报处理结果。
- **worker**：每个节点起一个处理 job 的 goroutine，它会定期检查是否有待处理的 job。 它在得到本节点上 start job 模块通知后，也会直接去检查是否有待执行的 job 。
- **owner**：可以认为是一个角色，信息存储在 KV 层，其中包括记录当前当选此角色的节点信息。
- **job queue**：是一个存放 job 的队列，存储在 KV 层，逻辑上整个系统只有一个。
- **job history queue**：是一个存放已经处理完成的 job 的队列，存储在 KV 层，逻辑上整个系统只有一个。

假设系统中只有两个节点，TiDB Server 1 和 TiDB Server 2。其中 TiDB Server 1 是 DDL 操作的接收节点， TiDB Server 2 是 owner。

基本流程时序图

![](online-ddl/time-line1.jpg)



![](online-ddl/time-line2.jpg)

#### 优化删除

对于流程：public -> write only -> delete only -> delete reorganization -> none，去掉 delete reorganization 状态，减少了一个状态可以减少2倍lease等待时间，并且减少了删掉数据库或者数据表中大量数据所消耗的时间。把delete reorganization状态需要处理的元数据的操作放到 delete only 状态时，把具体删除数据的操作放到后台处理，然后直接把状态标为 none。

- 将删除具体数据这个操作异步处理。因为在把数据放到后台删除前，此数据表（假设这里执行的是删除表操作，后面提到也这么假设）的元数据已经删除，对外已经不能访问到此表了，那么对于它们下面的具体数据就更不能常规访问了。所以需要将元数据事先存在 job 信息中，就这么简单。只要保证先删除元数据（保证此事务提交成功）再异步删除具体数据是不会有问题的。
- 去掉了 delete reorganization 状态。本来 delete only 以及之前的状态都没做修改所以必然是没问题的，那么就是考虑 none 这个状态，即当整个系统由于接到变更信息先后不同处于 delete only 以及 none 这两个状态。那么就分析在这个状态下有客户端希望对此表进行一些操作。
- 客户端访问表处于 none 状态的 TiDB Server。这个其实更没有做优化前是一致的，即访问不到此表，这边不过多解释。
- 客户端访问表处于 delete only 状态的 TiDB Server。此时客户端对此表做读写操作会失败，因为 delete only 状态对它们都不可见。

流程差异：

- 判定 finish 操作为 true 后，判断如果是可以放在后台运行（暂时还只是删除数据库和表的任务），那么将其封装成 background job 放入 background job queue， 并通知本机后台的 worker 将其处理。
- 后台 job 也有对应的 owner，假设本机的 backgroundworker 就是 background owner 角色，那么他将从 background job queue 中取出第一个 background job， 然后执行对应类型的操作（删除表中具体的数据）。 如果执行完成，那么从 background job queue 中将此 job 删除，并放入 background job history queue 中。 注意（检查owner与处理job）需要在一个事务中执行。



 
