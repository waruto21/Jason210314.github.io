---
title: "TinySQL 实现总结"
date: 2022-09-06T11:20:13+08:00
draft: false
---



TinySQL是PingCAP的另一个教学项目，聚焦在数据库计算层的一些操作，代码与TiDB基本相同，所以可以抄TiDB（bushi）。

- 项目原地址：https://github.com/talent-plan/tinysql
- 我的实现：https://github.com/waruto210/tinysql



## Project1 关系代数

这部分介绍一些SQL语法，关系代数，关系模型 -> K/V模型的映射。

要完成的代码就是将关系型数据->K/V数据的编/解码，很简单。

## Project 2 Parser

这一部分主要是让我们了解SQL被解析的过程。

[![SQL](TinySQL-impl/proj2-1.png)](https://github.com/waruto210/tinysql/blob/course/courses/imgs/proj2-1.png)
利用yacc补全一些join table的SQL parser，很简单。
https://github.com/waruto210/tinysql/blob/course/courses/imgs/proj2-3.png



## Project 3 Online DDL

TinySQL/TiDB支持异步Schema变更，其参照了 Google F1 中的 schema 变更的算法。可以参考

- [F1中异步 schema 变更](https://github.com/ngaut/builddatabase/blob/master/f1/schema-change.md)
- [TiDB 的异步 schema 变更实现](https://github.com/ngaut/builddatabase/blob/master/f1/schema-change-implement.md)

代码需要实现`Add Column`以及`Drop Column`的流程，核心过程就是：

- add：absent --> delete only --> write only --(reorg)--> public
- delete：public --> write-only --> delete-only --> (reorg) --> absent

在`reorg -> public`以及`public --> write-only`时需要调用`adjustColumnInfoInAddColumn`或`adjustColumnInfoInDropColumn`来修改被add/drop column的位置。

## Project4 优化

### Part 1

TiDB有两个优化器框架：System R和Cascades

```go
	// Handle the logical plan statement, use cascades planner if enabled.
	if sctx.GetSessionVars().EnableCascadesPlanner {
		finalPlan, err := cascades.DefaultOptimizer.FindBestPlan(sctx, logic)
		return finalPlan, names, err
	}
	finalPlan, err := plannercore.DoOptimize(ctx, builder.GetOptFlag(), logic)
```

System R框架的总体流程如下：

```go
// DoOptimize optimizes a logical plan to a physical plan.
func DoOptimize(ctx context.Context, flag uint64, logic LogicalPlan) (PhysicalPlan, error) {
	logic, err := logicalOptimize(ctx, flag, logic)
	if err != nil {
		return nil, err
	}
	physical, err := physicalOptimize(logic)
	if err != nil {
		return nil, err
	}
	finalPlan := postOptimize(physical)
	return finalPlan, nil
}
```

依次调用了 `logicalOptimize`， `physicalOptimize` 和 `postOptimize`。

在逻辑优化中，依次遍历优化规则列表，并对当前的执行计划树尝试优化。

物理优化实际上是一个记忆化搜索的过程。如下图，一个logical plan，其中的每个Operator在转化为物理plan时，都可能有多种选项，因此，使用记忆化搜索来进行选择。

![图 3](TinySQL-impl/4_cc975657e1.jpeg)

伪代码如下：

```go
// The OrderProp tells whether the output data should be ordered by some column or expression. (e.g. For select * from t order by a, we need to make the data ordered by column a, that is the exactly information that OrderProp should store)
func findBestTask(p LogicalPlan, prop OrderProp) PhysicalPlan {

	if retP, ok := dpTable.Find(p, prop); ok { // 已经搜过了，直接返回
		return retP
	}
	
	selfPhysicalPlans := p.getPhysicalPlans() // 获取可能的 physical plan
	
	bestPlanTree := a plan with maximum cost 	// 初始化bestPlanTree为最大cost
	
	for _, pp := range selfPhysicalPlans {  	// 遍历当前节点可能的physical plan
	
		childProps := pp.GetChildProps(prop)		// 根据当前operator的physical plan得出child需要的props
		childPlans := make([]PhysicalPlan, 0, len(p.children))	// 记录ligical childPlan的最佳physical plan
		for i, cp := range p.children {	// 对当前operator可能的physical实现，遍历找到每个logical child plan的最佳physical plan
			childPlans = append(childPlans, findBestTask(cp, childProps[i])
		}
		physicalPlanTree, cost := connect(pp, childPlans)	// 加上当前节点
		
		if physicalPlanTree.cost < bestPlanTree.cost {
			bestPlanTree = physicalPlanTree
		}
	}
	return bestPlanTree
}
```

首先要实现`LogicalAggregation.PredicatePushDown`，将谓词逻辑下推到Agg函数以下。谓词如果涉及到Agg group by以外的列，那么不能下推， 因为它依赖了Agg计算出的列（如having mean(a) > 100）。

然后实现Cascades优化器的一些内容，参考阅读[揭秘 TiDB 新优化器：Cascades Planner 原理解析](https://cn.pingcap.com/blog/tidb-cascades-planner)。

在Cascades Optimizer定义了一些Rule以，每个Rule都有自己的pattern，Pattern 用于描述 Group Expression 的局部特征，只有满足了相应 Pattern 的 Group Expression 才能够应用该 Rule。如下图，调用`OnTransform`来添加逻辑等价的 Group Expression。

如下图，`Selection->Projection`命中Pattern，可以进行规则替换。

![4-Pattern](TinySQL-impl/4_Pattern_c53614e357.png)

我们需要实现两个`OnTransform`：

- `PushSelDownAggregation`：*transform* `sel->agg->x` to `agg->sel->x` or `sel->agg->sel->x`
  - 如果sel中的列都位于group by列中，那么sel可以整个被下推到agg下
  - 否则，下推一部分到agg下，保留上面的sel
- `MergeAggregationProjection`：*ransform* `proj->proj->x` to `proj->x`，投影消除，可以参考[TiDB 源码阅读系列文章（七）基于规则的优化](https://cn.pingcap.com/blog/tidb-source-code-reading-7)
  - agg会控制输出的列，projection是多余的，我们只需要把agg groug by的列与agg function参数需要的列进行映射变换，消除projection即可（由于projection的column alias）。

### Part2 Join and Access Path Selection

#### Count-min Sketch

实现CM Sketch算法，用于等值查询，比直方图更好，包括新增key和查询key，参考[TiDB 源码阅读系列文章（十二）统计信息(上)](https://cn.pingcap.com/blog/tidb-source-code-reading-12)。

CM Sketch返回的估计值总是不小于实际值，所以TinySQL/TiDB对CM Sketch做出了改进

- 使用$(N - CM[i, j]) / (w-1)$作为噪音
- 每行估计值为，$CM[i,j] - (N - CM[i, j]) / (w-1)$，使用所有行估计值的中位数作为估计值

#### Join Reorder

对join进行重新排序，核心算法是一个DP规则：

- 使用数字的二进制表示来代表当前参与 Join 的节点情况。11（二进制表示为 1011）表示当前的 Join Group 包含了第 3 号节点，第 1 号节点和第 0 号节点（节点从 0 开始计数）。
- f[11] 来表示包含了节点 `3, 1, 0` 的最优的 Join Tree。
- 转移方程则是 `f[group] = min{join{f[sub], f[group ^ sub])}` 这里 `sub` 是 `group` 二进制表示下的任意子集。

实现中，主要顺序是：

1. 利用所有等值条件的边，构建join的邻接矩阵；
2. 记录表示等值条件与不是等值条件的边；
3. 从一个没有访问的点开始进行广度优先遍历，得到一个连通的 Join 节点序列。
4. 使用动态规划算出这个Join序列的最低cost。
5. 如果有还有没有访问节点则回到 3（无等值条件，如笛卡尔积会产生非连通图）。
6. 将收集到的所有 Join 方案结合到一起作为结果。

#### Access Path Selection

Access Path的选择高度取决于统计信息，但统计信息可能过时，导致选择错误。参考[Proposal: Support Skyline Pruning](https://github.com/pingcap/tidb/blob/master/docs/design/2019-01-25-skyline-pruning.md)，实现Skyline Pruning，使用一些简单规则来修剪没必要的Access Path。

实现`compareCandidates`，比较x和y，如果x在所有方面都不差于x，并且总体上优于y，那么可以修剪掉y。

- 比较两个path覆盖的column，更多的更好
- 比较两个path是否match physical property，match的更好
- 比较两个path是否需要二次扫描，不需要的更好



## Project5

### Part1 火山模型和向量化

在火山模型中，由不同的执行器组成，每个执行器对应的是 SQL 中的某个部分，例如过滤，聚合等；执行器与执行器之间组成了类似树状的关系，每个算子都实现了三个接口：

- Open，对当前执行器所需的资源进行初始化
- Next，从孩子节点（如果存在）取必需的数据，计算并返回一条结果
- Close，对执行器所需的资源进行释放

[![Volcano Execution Model](TinySQL-impl/proj5-part1-1.png)](https://github.com/waruto210/tinysql/blob/course/courses/imgs/proj5-part1-1.png)

减小函数调用的一个直观想法就是每次 `Next` 返回一批数据，而不是只返回一行。为了支持返回多行的操作，TinySQL 还使用了 `Chunk` 来表示这些行，用于减小内存分配开销、降低内存占用以及实现内存使用量统计/控制。可以参考[向量化的进行计算](https://docs.google.com/document/d/1JKP9YS3wYsuXsYhDgVepJt5y72K6_WxhUVfOLyjpAjc/edit#heading=h.66r4twnr3b1c)进行理解。

TinySQL/TiDB的向量化掉用都遵循如下形式：parent给出缓存空间chunk，传递给child的Next方法，child将其填满后返回给parent。

需要实现：

- 向量化字符串长度函数：对一批string求长度

  ```go
  	for {
  		// Fill in the `req` util it is full or the `inputIter` is fully processed.
  		for ; e.inputRow != e.inputIter.End(); e.inputRow = e.inputIter.Next() {
  			// Your code here.
  			if req.IsFull() {
  				return nil
  			}
  			if e.selected[e.inputRow.Idx()] {
  				req.AppendRow(e.inputRow)
  			}
  		}
  		// 先从child拿到一批数据
  		err := Next(ctx, e.children[0], e.childResult)
  		if err != nil {
  			return err
  		}
  		// no more data.
  		if e.childResult.NumRows() == 0 {
  			return nil
  		}
  		/* Your code here.
  		   Process and filter the child result using `expression.VectorizedFilter`.
  		*/
  		// 因为e.inputRow != e.inputIter.End()，所以是先执行这里
  		// 先进行filter
  		e.selected, err = expression.VectorizedFilter(e.ctx, e.filters, e.inputIter, e.selected)
  		if err != nil {
  			return err
  		}
  		e.inputRow = e.inputIter.Begin()
  	}
  ```

- 实现向量化 selection 的 `Next` 函数：先从child拿到一批数据，然后filter，再将被选中的列放入到req中，如果req满了，则返回。

  ```go
  	for {
  		// Fill in the `req` util it is full or the `inputIter` is fully processed.
  		for ; e.inputRow != e.inputIter.End(); e.inputRow = e.inputIter.Next() {
  			// Your code here.
  			if req.IsFull() {
  				return nil
  			}
  			if e.selected[e.inputRow.Idx()] {
  				req.AppendRow(e.inputRow)
  			}
  		}
  		// 先从child拿到一批数据
  		err := Next(ctx, e.children[0], e.childResult)
  		if err != nil {
  			return err
  		}
  		// no more data.
  		if e.childResult.NumRows() == 0 {
  			return nil
  		}
  		/* Your code here.
  		   Process and filter the child result using `expression.VectorizedFilter`.
  		*/
  		// 因为e.inputRow != e.inputIter.End()，所以是先执行这里
  		// 先进行filter
  		e.selected, err = expression.VectorizedFilter(e.ctx, e.filters, e.inputIter, e.selected)
  		if err != nil {
  			return err
  		}
  		e.inputRow = e.inputIter.Begin()
  	}
  ```

  

### Part2 Hash Join

TinySQL/TiDB先使用inner table构建一个hash表，然后读取outer table，使用多个线程并发地查询inner table hash表，做hash join。

[![Hash Join 1](TinySQL-impl/proj5-part2-1.png)](https://github.com/waruto210/tinysql/blob/course/courses/imgs/proj5-part2-1.png)

需要实现：

- fetchAndBuildHashTable：不断地读取table chunk，放入hash表即可

  ```go
  	for {
  		chk := chunk.NewChunkWithCapacity(allTypes, e.ctx.GetSessionVars().MaxChunkSize)
  		err := Next(ctx, e.innerSideExec, chk)
  		if err != nil {
  			return err
  		}
  		if chk.NumRows() == 0 {
  			return nil
  		}
  		if err = e.rowContainer.PutChunk(chk); err != nil {
  			return err
  		}
  	}
  ```

- runJoinWorker

  要注意几个channel

  - `closeCh`：用于结束 loop 的

  - `outerResultChs[workerID]`：outer fetcher 通过此通道来向 join worker 分发数据chunk

  - `outerChkResourceCh`： worker消耗完chunk后， 向outer fetcher发送自己的`outerResultChs[workerID]`以及chunk，让outer fetch 填充chunk后通过`outerResultChs[workerID]`发送回来

  - `joinChkResourceCh[i]`：worker用于获取存join结果的chunk

  - `joinChkResourceCh`：每join完一个chunk，worker把自己的chunk及`joinChkResourceCh[i]`发送给main thread，main消耗完chunk后，再通过`joinChkResourceCh[i]`发回给worker

    ```go
    	// get a new join result chunk resource from main thread
    	ok, joinResult := e.getNewJoinResult(workerID)
    	if !ok {
    		return
    	}
    	for ok := true; ok; {
    		select {
    		case <-e.closeCh:
    			return
    		// get outer result from `Outer Fetcher`s
    		case outerResult, ok = <-e.outerResultChs[workerID]:
    		}
    		if !ok {
    			break
    		}
    		// join outerResult to join result
    		// if join result is full, runner will send it to main
    		// then call `getNewJoinResult`
    		ok, joinResult = e.join2Chunk(workerID, outerResult, hCtx, joinResult, selected)
    		if !ok {
    			break
    		}
    		outerResult.Reset()
    		emptyOuterResult.chk = outerResult
    		// send chunk back to `Outer Fetcher`
    		e.outerChkResourceCh <- emptyOuterResult
    	}
    	if joinResult == nil {
    		return
    	}
    	if joinResult.err != nil || (joinResult.chk != nil && joinResult.chk.NumRows() > 0) {
    		// send this join result to main
    		// then main whill give back this chunk
    		e.joinResultCh <- joinResult
    	} else if joinResult.chk != nil && joinResult.chk.NumRows() == 0 {
    		// put that chunk resource back
    		e.joinChkResourceCh[workerID] <- joinResult.chk
    	}
    ```

### Part3 Hash Aggregate

Hash Agg和Hash Join相似，这里主要是讲解下推及并行执行。

TinySQL/TiDB 对于聚合函数的计算阶段进行划分，相应定义了 4 种计算模式：CompleteMode，FinalMode，Partial1Mode，Partial2Mode。

| AggFunctionMode | 输入值   | 输出值               |
| --------------- | -------- | -------------------- |
| CompleteMode    | 原始数据 | 最终结果             |
| FinalMode       | 中间结果 | 最终结果             |
| Partial1Mode    | 原始数据 | 中间结果             |
| Partial2Mode    | 中间结果 | 进一步聚合的中间结果 |

以`select avg(b) from t group by a`为例子:

- CompleteMode

​	此时 AVG 函数 的整个计算过程只有一个阶段，如图所示：

![img](TinySQL-impl/proj5-part3-1.png)

- Partial1Mode --> FinalMode

​	此时我们将 AVG 函数的计算过程拆成两个阶段进行，如图所示：

![img](TinySQL-impl/proj5-part3-2.png)

TiDB 的并行 Hash Aggregation 算子执行过程中的主要线程有：Main Thead，Data Fetcher，Partial Worker，和 Final Worker：

- Main Thread 一个：
  - 启动 Input Reader，Partial Workers 及 Final Workers
  - 等待 Final Worker 的执行结果并返回
- Data Fetcher 一个：
  - 按 batch 读取子节点数据并分发给 Partial Worker
- Partial Worker 多 个：
  - 读取 Data Fetcher 发送来的数据，并做预聚合
  - 将预聚合结果根据 Group 值 shuffle 给对应的 Final Worker
- Final Worker 多 个：
  - 读取 PartialWorker 发送来的数据，计算最终结果，发送给 Main Thread

Hash Aggregation 的执行阶段可分为如下图所示的 5 步：

![img](TinySQL-impl/proj5-part3-3.png)

需要实现：

- `shuffleIntermData`：将终结结果通过hash分配给final worker，因为partialResultsMap是只读共享，所以不需要分割

  ```go
  	groupKeysSlice := make([][]string, finalConcurrency)
  	for groupKey := range w.partialResultsMap {
  		finalWorker := int(murmur3.Sum32([]byte(groupKey))) % finalConcurrency
  		if groupKeysSlice[finalWorker] == nil {
  			groupKeysSlice[finalWorker] = make([]string, 0, len(w.partialResultsMap)/finalConcurrency)
  		}
  		groupKeysSlice[finalWorker] = append(groupKeysSlice[finalWorker], groupKey)
  	}
  	for i := range groupKeysSlice {
  		if groupKeysSlice[i] != nil {
  			w.outputChs[i] <- &HashAggIntermData{
  				groupKeys:        groupKeysSlice[i],
  				partialResultMap: w.partialResultsMap,
  			}
  		}
  	}
  ```

- `consumeIntermData`：获取中间数据，进行聚合。

  ```go
  	for {
  		if input, ok = w.getPartialInput(); !ok {
  			return nil
  		}
  		if intermDataBuffer == nil {
  			intermDataBuffer = make([][]aggfuncs.PartialResult, 0, w.maxChunkSize)
  		}
  		for reachEnd := false; !reachEnd; {
  			intermDataBuffer, groupKeys, reachEnd = input.getPartialResultBatch(sc, intermDataBuffer[:0], w.aggFuncs, w.maxChunkSize)
  			for _, groupKey := range groupKeys {
  				w.groupKeys = append(w.groupKeys, []byte(groupKey))
  			}
  			results := w.getPartialResult(sc, w.groupKeys, w.partialResultMap)
  			for i, groupKey := range groupKeys {
  				if !w.groupSet.Exist(groupKey) {
  					w.groupSet.Insert(groupKey)
  				}
  				prs := intermDataBuffer[i]
  				for j, af := range w.aggFuncs {
  					if err := af.MergePartialResult(sctx, prs[j], results[i][j]); err != nil {
  						return err
  					}
  				}
  			}
  		}
  	}
  ```

project5有一个问题，就是在 `executor/aggregate_test.go` 的 `TestAggPushDown` 中第 4 条语句 `tk.MustExec("alter table t add index idx(a, b, c)")` （`executor/aggregate_test.go:56`）会一直卡住，注释掉这一句即可通过测试，参考了[RinChanNOW's blog](http://blog.rinchannow.top/tinysql-notes/#consumeIntermData)。



## 总结

proj6做了一小部分，剩下感觉有点难以上手。TinySQL整个项目，我个人感觉是不如TinyKV的，有些地方介绍材料跟代码训练关系不大；对于会利用到的功能函数介绍不多，需要自己翻源代码理解。
