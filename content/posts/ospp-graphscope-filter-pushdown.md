---
title: "GraphScope过滤下推"
date: 2022-09-23T16:53:04+08:00
draft: False
---

## 简介

[*GraphScope交互式查询引擎过滤条件下推*](https://github.com/alibaba/GraphScope/issues/1530)这个项目来自中科院软件所主办的[开源之夏](https://summer-ospp.ac.cn)活动，由[GraphScope](https://github.com/alibaba/GraphScope)社区提供。

我觉得开源之夏是一个非常好的平台，开源社区的项目、Idea能够获得更多的展示机会；在校学生也能够在此获取到参与开源的机会，打开开源世界的大门。

说回GraphScope，它是阿里巴巴达摩院智能计算实验室研发并开源的一站式图计算平台。在GraphScope的交互式查询引擎中，对于带有过滤条件的查询，计算层会从存储层中读取数据后进行过滤。目前GraphScope采用的是存算不分离的shared-nothing架构，计算和存储位于一个进程内，这种方式没有性能问题。但GraphScope准备演进到存算分离架构，存储层将通过网络向计算层传输数据，如果在存储层不做过滤，传输开销将非常巨大。为了降低存储层与计算层的数据传输开销，需要将计算层数据源处的过滤下推到存储层。

为了能够方便的支持多种图查询语言，GraphScope交互式查询引擎抽象出了一套统一的、简洁的、语言无关的中间层GAIA-IR（下面简称IR），也即是交互式查询引擎的计算层。而存储层，则有基于vineyard的v6d存储，以及基于RocksDB的groot存储，存储层通过查询接口向IR返回Vertex/Edge（统称Entity）。根据GraphScope的演进计划，本次过滤下推实现在groot存储上。

## 过滤下推

GraphScope目前支持的查询语言为Gremlin，以如下Gremlin语句为例子，来讲解过滤下推的作用和逻辑：

```gremlin
g.V().has("name","gremlin").
  values("age")
```

其作用就是查询所有name为“gremlin”的节点的age。将其转化为类似的SQL语句，如下：

```sql
select age from g.v where name="gremlin";
```

在关系型数据库中，数据是以行为单位的，每一行包括多个列的信息。行过滤就是基于某种条件（上面的`name="gremlin"`）选中/放弃整行数据；列过滤则是选中/放弃某些列（上面的`age`）进行输出。那么，我们可以很直接地对应到图数据上，行就是图数据中的实体：Entity；列就是这些Entity上的一些属性（Property）：name，age等。因此，行过滤能减少输出的Entity的数量；列过滤能减少输出的每个Entity的大小。

GraphScope的交互式查询引擎目前仅有行过滤，在IR开始计算前，对存储层返回的数据进行一次行过滤，但没有列过滤。

### 行过滤

现有的行过滤逻辑位于数据源位置，那么只需要将其“挪动”到存储层即可。因此，如何“挪动”就成了关键。

目前行过滤相关数据结构如下，`SingleItem`表示Entity需要有某个Property；`Predicate`表示Entity的某个Property和某个值满足一种逻辑运算，如`age > 18`；其余的则是组合条件，可以表示更复杂的查询。

```rust
pub enum Predicates {
    Init,
    SingleItem(Operand),
    Predicate(Predicate),
    Not(Box<Predicates>),
    And((Box<Predicates>, Box<Predicates>)),
    Or((Box<Predicates>, Box<Predicates>)),
}

pub enum Operand {
    Const(Object),
    Var { tag: Option<NameOrId>, prop_key: Option<PropKey> },
    Vars(Vec<Operand>),
    VarMap(Vec<Operand>),
}

pub struct Predicate {
    pub(crate) left: Operand,
    pub(crate) cmp: common_pb::Logical,
    pub(crate) right: Operand,
}
```

对于上面的Gremlin语句，其`name=gremlin`的过滤条件， 会被IR转换为如下结构（假设name这个property的内部id为2）：

```rust
Predicates(Predicate(Predicate { left: Var { tag: None, prop_key: Some(Key(Id(2))) }, cmp: Eq, right: Const(String("gremlin")) }))
```

这套数据结构在IR中不仅用于简单的过滤，还用于更加high level的图运算，里面有一些冗余结构，例如`Operand`里的`Vars`与`VarMap`在过滤中都不会被用到。因此，不适合把这套数据结构直接传递到存储层。所以，我们设计了一种更为简洁的`Condition`。

`Condition`的定义如下。`PredCondition::HasProp`对应上方的`SingleItem`；`CmpCondition`对应上方的`Predicate`；另外，此处的`Operand`也进行了简化。

```rust
pub enum Condition {
    And(AndCondition),
    Or(OrCondition),
    Not(NotCondition),
    Pred(PredCondition),
}

pub enum PredCondition {
    HasProp(PropId),
    Cmp(CmpCondition),
}

pub struct CmpCondition {
    left: Operand,
    op: CmpOperator,
    right: Operand,
}

pub enum Operand {
    Const(Property),
    PropId(PropId),
    Label,
    Id,
}
```

上面的`name=gremlin`过滤条件可以对应到如下`Condition`，可见表达式简介了很多。并且，两者的结构十分相似，后续IR层要支持更多查询逻辑，那么只需要添加新的`CmpOperator`。

```rust
Pred(Cmp(CmpCondition { left: PropId(2), op: Equal, right: Const(String("gremlin")) }))
```

然后，为`Condition`实现如下的`ElemFilter` trait，用于过滤Vertex/Edge。

```rust
pub trait ElemFilter {
    fn filter_vertex<V: Vertex>(&self, vertex: &V) -> GraphResult<bool>;
    fn filter_edge<E: Edge>(&self, edge: &E) -> GraphResult<bool>;
}
```

最后如下，groot对底层存储返回的Iterator应用该condition filter。

```rust
if let Some(condition) = condition.cloned() {
  iter = Box::new(iter.filter(move |v| {
    v.is_ok()
    && condition
    .filter_vertex(v.as_ref().unwrap())
    .unwrap_or(false)
  }))
}
```

### 列过滤

目前的groot，并不支持任何列过滤，会直接返回所有Property，IR在计算时取用需要的Property。

而在上面的查询中，根据`values("age")`，我们知道，其实只需要传输节点的age属性即可。对于一个复杂的图，其中的Entity可能会有10个以上的属性，那么在存算分离+列过滤缺失的情况下，对于该查询，要传输10倍以上的额外数据，overhead过大了，甚至可能导致系统的性能低到不可用。

存算分离后，查询结果的发送逻辑大致会如下：

```rust
for entity in query_result {
  let props = entity.get_properties();
  send(props);
}
```

最初的想法是在Vertex/Edge外面再套一层，并控制其输出的Property，那么就能控制最终被传输的prop，达到列过滤目的。对于`values("age")`的列过滤，如下图所示：

![column_filter](ospp-graphscope-filter-pushdown/column_filter1.png)

但这样主要有两点问题：

- 需要对现有接口返回的Vertex/Edge类型进行修改，造成的连锁改动会比较多；
- groot的Vertex/Edge的Property以bytes格式存储，在调用get_properties时，返回一个lazily decode的Iterator，如果在其外部进行列过滤，需要先解码全部Property然后过滤，造成了额外开销。
- 此外，多一层包裹会导致Vertex/Edge的底层实现丧失了直接暴露bytes数据的能力，后续实现存算分离时，也可能直接传输过滤后的bytes数据，省去解码开销。

所以，最终选择将需要的property信息嵌入到groot Vertex/Edge的具体实现中，为其添加一个`columns`成员；并且修改`CommonIterDecoder`，添加`Spec`与`Empty`两种解码器，`Spec`仅解码`columns`中指定的列，`Empty`则不返回任何Property。

当对其调用`get_property(prop_id)`时，首先检查prop_id是否在`columns`内，然后决定是否要解码某个Property；调用`get_properties`时，会根据`columns`决定使用`All`、`Spec`或者`Empty`三种CommonIterDecoder之一。对于`values("age")`的列过滤，如下图所示：

![](ospp-graphscope-filter-pushdown/column_filter2.png)

相关数据结构如下：

```rust
pub struct RocksVertexImpl {
    vertex_id: VertexId,
    label_id: LabelId,
    decoder: Option<Decoder>,
    raw_bytes: RawBytes,
    columns: Option<HashSet<PropId>>,
}


impl RocksVertexImpl {
    pub fn set_columns(&mut self, columns: Option<HashSet<PropId>>) {
        self.columns = columns;
    }
}

pub struct PropertiesIter<'a> {
    decode_iter: CommonIterDecoder<'a>,
}

impl<'a> PropertiesIter<'a> {
    pub fn all_columns(decode_iter: IterDecoder<'a>) -> Self {
        PropertiesIter { decode_iter: CommonIterDecoder::All(decode_iter) }
    }
    pub fn spec_columns(decode_iter: SpecIterDecoder<'a>) -> Self {
        PropertiesIter { decode_iter: CommonIterDecoder::Spec(decode_iter) }
    }
    pub fn empty() -> Self {
        PropertiesIter { decode_iter: CommonIterDecoder::Empty }
    }
}
```

如下代码，groot对完成了行过滤的查询结果设置`columns`，实现列过滤。

```rust
let columns = Self::parse_columns(property_ids);
Ok(Box::new(iter.map(move |v| match v {
  Ok(mut v) => {
    v.set_columns(columns.clone());
    Ok(v)
  }
  Err(e) => Err(e),
})))
```

## 经验总结

完成这个项目，从中我也获得了一些经验感悟。

- 首先，如果参与的是一个很大的项目，不要总想着把代码细节都搞清楚再动手，GraphScope的交互式查询引擎就有18万行代码，还同时包含Java/Python/Cpp/Rust这四种语言，如果耗费大量时间纠结代码细节，将得不偿失。例如，某函数叫`parse_property`，从名字就可以知道其作用，而对于其实现，暂时不用关心。应该先大致了解自己工作涉及到的模块，然后在进行项目的过程中，对模块关系，项目代码得到更加清晰、准确的理解。
- 在动手进行代码编写前，应该仔细思考并设计。在我的实现过程中，Condition就被重构了一次。第一次，由于对IR层的Predicates考虑不够，导致行过滤接入后，某些case无法转换成Condition，并且如果要在已有Condition上修复这些问题，代码将非常ugly。这又引出下一点。
- 我认为，在代码中开始出现因为fix bug/加feature而产生的ugly code时，应该尽快着手重构，防止问题代码越堆越多，最后天怒人怨，下大力气重写。
- Rust是一门好语言，我学习Rust快两年半了，也进行过一段使用Rust进行开发的实习。它有着很强的抽象能力，同时又提供了c/cpp级别的性能，还有完善的依赖管理机制，最重要的是：保障安全（虽然经常因此跟编译器作斗争）。在完成GraphScope项目的过程中，只要代码通过编译，我就只需要检查是否出现逻辑错误，而无需担心内存/并发 Bug，这是写c/cpp，乃至golang/java都从未有过的体验。





