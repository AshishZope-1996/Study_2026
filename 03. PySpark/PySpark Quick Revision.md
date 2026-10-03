# PySpark Quick Revision

### Scratch → Intermediate → Advanced → Production → Interview



# 1. What is PySpark?

**PySpark** is the Python API for **Apache Spark**, a distributed data-processing framework.

Spark is used to process large datasets across multiple machines.

### Why PySpark?

Traditional Python/Pandas:

```text
Data
 ↓
Single Machine
 ↓
CPU / Memory limitation
```

PySpark:

```text
Large Data
     ↓
Spark Cluster
 ┌───┼────┬────┐
 ↓   ↓    ↓    ↓
Node Node Node Node
```

### Important characteristics

* Distributed processing
* In-memory computation
* Fault tolerance
* Lazy evaluation
* Parallel processing
* Supports SQL, DataFrames, Streaming, ML
* Works with AWS, Azure, GCP and Databricks



# 2. Apache Spark Architecture

Main components:

```text
Driver
  |
  |- Cluster Manager
  |
  |- Executors
           |
           |- Tasks
```

### Driver

The driver:

* Creates SparkSession
* Builds execution plan
* Coordinates jobs
* Communicates with executors

### Executor

Executors:

* Execute tasks
* Perform transformations/actions
* Store cached data
* Return results to driver

### Cluster Manager

Allocates resources.

Examples:

* Spark Standalone
* YARN
* Kubernetes
* Databricks



# 3. SparkSession

SparkSession is the entry point to Spark.

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("EmployeeApp") \
    .getOrCreate()
```

You normally **don't create a new SparkSession for every DataFrame operation**.

In Databricks, `spark` is generally already available.

```python
df = spark.read.csv("employees.csv", header=True, inferSchema=True)
```



# 4. DataFrame

A DataFrame is a distributed collection of data organized into named columns.

Example:

```python
df_emp = spark.read.csv(
    "/FileStore/employees.csv",
    header=True,
    inferSchema=True
)
```

Inspect:

```python
df_emp.show()
df_emp.printSchema()
df_emp.columns
df_emp.dtypes
df_emp.count()
df_emp.describe().show()
```



# 5. Schema

Example:

```python
from pyspark.sql.types import *

schema = StructType([
    StructField("employee_id", IntegerType(), False),
    StructField("first_name", StringType(), True),
    StructField("salary", DoubleType(), True)
])
```

Read:

```python
df = spark.read.schema(schema).csv(
    "employees.csv",
    header=True
)
```

### Why explicit schema?

Better than:

```python
inferSchema=True
```

because explicit schemas:

* Improve performance
* Prevent incorrect type inference
* Make pipelines predictable
* Are preferred in production



# 6. Data Types

Common PySpark types:

```text
StringType
IntegerType
LongType
DoubleType
FloatType
BooleanType
DateType
TimestampType
DecimalType
ArrayType
MapType
StructType
```



# 7. Selecting Columns

```python
df_emp.select("first_name", "salary").show()
```

Using `col()`:

```python
from pyspark.sql.functions import col

df_emp.select(
    col("first_name"),
    col("salary")
).show()
```

Alias:

```python
df_emp.select(
    col("first_name").alias("f_name")
).show()
```



# 8. selectExpr()

Useful for SQL-style expressions.

```python
df_emp.selectExpr(
    "first_name as f_name",
    "salary",
    "salary * 1.10 as increased_salary"
).show()
```

Remember:

```python
select()
```

works mainly with column objects/column names.

```python
selectExpr()
```

accepts SQL expressions as strings.



# 9. withColumn()

Create or modify a column.

```python
df_emp.withColumn(
    "salary_10_percent",
    col("salary") * 10 / 100
).show()
```

Increase salary:

```python
df_emp.withColumn(
    "new_salary",
    col("salary") * 1.10
)
```

Rename:

```python
df_emp.withColumnRenamed(
    "first_name",
    "employee_first_name"
)
```



# 10. filter() / where()

```python
df_emp.filter(
    col("salary") > 700000
).show()
```

Multiple conditions:

```python
df_emp.filter(
    (col("salary") > 700000) &
    (col("salary") < 1500000)
).show()
```

OR:

```python
df_emp.filter(
    (col("department") == "IT") |
    (col("department") == "HR")
)
```

### Important

Don't write:

```python
df_emp.filter(col("job_id") in (2,3))
```

Correct:

```python
df_emp.filter(
    col("job_id").isin(2, 3)
)
```



# 11. Sorting

```python
df_emp.orderBy("salary").show()
```

Descending:

```python
df_emp.orderBy(
    col("salary").desc()
).show()
```

Multiple columns:

```python
df_emp.orderBy(
    col("department"),
    col("salary").desc()
)
```



# 12. distinct() and dropDuplicates()

```python
df.distinct()
```

Remove duplicate rows:

```python
df.dropDuplicates()
```

Based on columns:

```python
df.dropDuplicates(["email"])
```



# 13. Null Handling

Find nulls:

```python
df.filter(
    col("salary").isNull()
).show()
```

Not null:

```python
df.filter(
    col("salary").isNotNull()
)
```

Drop nulls:

```python
df.dropna()
```

Fill nulls:

```python
df.fillna(0)
```

Specific column:

```python
df.fillna(
    {"salary": 0}
)
```



# 14. when() / otherwise()

SQL CASE WHEN equivalent.

```python
from pyspark.sql.functions import when

df.withColumn(
    "salary_category",
    when(col("salary") > 1000000, "High")
    .when(col("salary") > 500000, "Medium")
    .otherwise("Low")
)
```



# 15. Common String Functions

```python
from pyspark.sql.functions import *

upper("name")
lower("name")
trim("name")
length("name")
substring("name", 1, 3)
concat("first_name", "last_name")
concat_ws(" ", "first_name", "last_name")
regexp_replace("name", "old", "new")
split("name", " ")
```

Example:

```python
df.withColumn(
    "full_name",
    concat_ws(" ", "first_name", "last_name")
)
```



# 16. Date Functions

```python
current_date()
current_timestamp()
year()
month()
day()
datediff()
date_add()
date_sub()
to_date()
date_format()
```

Example:

```python
df.withColumn(
    "joining_year",
    year("joining_date")
)
```

Date difference:

```python
df.withColumn(
    "experience_days",
    datediff(current_date(), "joining_date")
)
```



# 17. Aggregations

```python
df.agg(
    avg("salary").alias("avg_salary"),
    max("salary").alias("max_salary"),
    min("salary").alias("min_salary"),
    sum("salary").alias("total_salary"),
    count("*").alias("employee_count")
).show()
```



# 18. groupBy()

```python
df.groupBy("department") \
  .count() \
  .show()
```

Multiple aggregations:

```python
df.groupBy("department").agg(
    count("*").alias("employee_count"),
    avg("salary").alias("avg_salary"),
    max("salary").alias("max_salary")
).show()
```



# 19. Window Functions

Very important for interviews.

```python
from pyspark.sql.window import Window

window_spec = Window.partitionBy(
    "department"
).orderBy(
    col("salary").desc()
)
```

### row_number()

```python
df.withColumn(
    "rn",
    row_number().over(window_spec)
)
```

### rank()

```python
rank().over(window_spec)
```

### dense_rank()

```python
dense_rank().over(window_spec)
```

Difference:

```text
salary
100
100
90
```

rank:

```text
1
1
3
```

dense_rank:

```text
1
1
2
```

row_number:

```text
1
2
3
```



# 20. Top N Employees Per Department

Classic interview question.

```python
window_spec = Window.partitionBy(
    "department"
).orderBy(
    col("salary").desc()
)

result = df.withColumn(
    "rn",
    row_number().over(window_spec)
).filter(
    col("rn") <= 3
)
```



# 21. Running Total

```python
window_spec = Window \
    .partitionBy("department") \
    .orderBy("joining_date") \
    .rowsBetween(
        Window.unboundedPreceding,
        Window.currentRow
    )

df.withColumn(
    "running_salary",
    sum("salary").over(window_spec)
)
```



# 22. Lag and Lead

```python
lag("salary", 1).over(window_spec)
```

```python
lead("salary", 1).over(window_spec)
```

Useful for:

* Previous transaction
* Next transaction
* Salary comparison
* Event analysis



# 23. Joins

Main types:

```text
INNER
LEFT
RIGHT
FULL
LEFT SEMI
LEFT ANTI
CROSS
```

Example:

```python
df_emp.join(
    df_dept,
    df_emp.department_id == df_dept.department_id,
    "inner"
)
```



# 24. Left Join

```python
df_emp.join(
    df_dept,
    "department_id",
    "left"
)
```



# 25. Left Semi Join

Returns rows from the left DataFrame where a match exists.

```python
df_emp.join(
    df_dept,
    "department_id",
    "left_semi"
)
```

Think:

```text
Give me employees whose department exists.
```



# 26. Left Anti Join

Returns rows from left where no match exists.

```python
df_emp.join(
    df_dept,
    "department_id",
    "left_anti"
)
```

Think:

```text
Give me employees whose department does NOT exist.
```

Very useful for data-quality checks.



# 27. Broadcast Join

If one table is small:

```python
from pyspark.sql.functions import broadcast

df_large.join(
    broadcast(df_small),
    "department_id"
)
```

Why?

Normally Spark may shuffle both datasets.

Broadcast:

```text
Small table
     ↓
All Executors

Large table
     ↓
Processed locally
```

This can reduce expensive shuffle.



# 28. Narrow vs Wide Transformations

### Narrow transformation

No data movement between partitions.

Examples:

```text
map
filter
select
withColumn
```

### Wide transformation

Requires shuffle.

Examples:

```text
groupBy
join
distinct
orderBy
repartition
```

Interview keyword:

**Shuffle = expensive data movement between partitions.**



# 29. Transformations vs Actions

### Transformations

Lazy.

Examples:

```python
select()
filter()
withColumn()
groupBy()
join()
```

### Actions

Trigger execution.

Examples:

```python
show()
count()
collect()
first()
take()
write()
```



# 30. Lazy Evaluation

Spark doesn't immediately execute transformations.

Example:

```python
df2 = df.filter(col("salary") > 500000)
df3 = df2.select("name", "salary")
```

Nothing substantial executes yet.

When:

```python
df3.show()
```

Spark builds and executes the plan.

Benefits:

* Optimization
* Predicate pushdown
* Column pruning
* Reduced unnecessary computation



# 31. Catalyst Optimizer

Spark SQL uses **Catalyst Optimizer**.

It optimizes query plans.

Example:

```text
Logical Plan
     ↓
Analyzed Logical Plan
     ↓
Optimized Logical Plan
     ↓
Physical Plan
```

Common optimizations:

* Predicate pushdown
* Projection/column pruning
* Constant folding
* Join optimization



# 32. Tungsten

Tungsten improves Spark execution efficiency.

Focus areas:

* Memory management
* CPU efficiency
* Binary processing
* Whole-stage code generation

Interview distinction:

```text
Catalyst → query optimization

Tungsten → execution efficiency
```



# 33. Explain Plan

Extremely important for debugging.

```python
df.explain()
```

Detailed:

```python
df.explain(True)
```

Look for:

```text
Exchange
BroadcastHashJoin
SortMergeJoin
Filter
Project
```

### Exchange

Usually indicates shuffle.



# 34. Partitions

Spark divides data into partitions.

```text
Dataset
 ↓
Partition 1
Partition 2
Partition 3
Partition 4
```

Each partition can be processed independently.



# 35. repartition()

Changes partition count and usually causes shuffle.

```python
df.repartition(10)
```

By column:

```python
df.repartition(
    10,
    "department"
)
```

Use when you intentionally want redistribution.



# 36. coalesce()

Reduces partitions with less/no full shuffle.

```python
df.coalesce(2)
```

Common use:

```text
Many partitions
      ↓
coalesce()
      ↓
Fewer partitions
```

### Interview

```text
repartition → can increase/decrease, shuffle

coalesce → generally used to decrease, avoids full shuffle
```



# 37. collect() Warning

```python
df.collect()
```

Brings all data to the driver.

Danger:

```text
Huge Data
   ↓
Driver Memory
   ↓
OOM
```

Avoid `collect()` on large datasets.

Instead:

```python
df.show(20)
df.take(10)
```



# 38. Cache and Persist

If a DataFrame is reused:

```python
df.cache()
```

or:

```python
df.persist()
```

Example:

```python
df.cache()

df.count()
df.groupBy("department").count().show()
```

The first action materializes the cache.

Check:

```python
df.is_cached
```

Remove:

```python
df.unpersist()
```



# 39. cache() vs persist()

```python
cache()
```

uses default storage level.

```python
persist()
```

allows specifying storage level.

Conceptually:

```text
cache = convenient default
persist = configurable storage
```



# 40. UDF

User Defined Function.

```python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

@udf(StringType())
def salary_category(salary):
    if salary > 1000000:
        return "High"
    return "Low"
```

Use:

```python
df.withColumn(
    "category",
    salary_category("salary")
)
```

### Why avoid UDFs when possible?

Built-in Spark functions are generally:

* Faster
* Optimizable
* Better integrated with Catalyst

Prefer:

```python
when()
regexp_replace()
concat()
```

over Python UDF when possible.



# 41. Pandas UDF

Also called vectorized UDF.

Uses Apache Arrow for efficient transfer between Spark and Python.

Useful when normal Spark functions cannot solve the problem efficiently.



# 42. RDD

RDD = Resilient Distributed Dataset.

Older Spark abstraction.

```python
rdd = spark.sparkContext.parallelize(
    [1,2,3,4,5]
)
```

Modern Data Engineering generally prefers:

```text
DataFrame
    ↓
Spark SQL
```

over manually working with RDDs.

Also remember your Databricks experience:

**Some Serverless compute environments do not support arbitrary RDD APIs.**



# 43. DataFrame vs RDD

| DataFrame             | RDD                        |
|  | -- |
| Structured            | Unstructured               |
| Schema                | No schema requirement      |
| Catalyst optimization | Less SQL optimization      |
| Easier                | More low-level             |
| Preferred for DE      | Used for specialized cases |



# 44. Reading Data

### CSV

```python
df = spark.read \
    .option("header", True) \
    .option("inferSchema", True) \
    .csv(path)
```

### JSON

```python
df = spark.read.json(path)
```

### Parquet

```python
df = spark.read.parquet(path)
```

### Delta

```python
df = spark.read.format("delta").load(path)
```



# 45. Writing Data

```python
df.write \
  .mode("overwrite") \
  .parquet(path)
```

Modes:

```text
append
overwrite
ignore
error / errorifexists
```



# 46. Parquet

Columnar file format.

Advantages:

* Column pruning
* Compression
* Predicate pushdown
* Efficient analytics
* Schema information

For analytical workloads:

```text
CSV < Parquet
```

in many common scenarios.



# 47. Delta Lake

Delta Lake adds reliability and transaction capabilities on top of data lakes.

Important features:

* ACID transactions
* Schema enforcement
* Schema evolution
* Time travel
* MERGE
* UPDATE
* DELETE
* Version history



# 48. Delta Table

Example:

```python
df.write \
  .format("delta") \
  .mode("overwrite") \
  .save("/delta/employees")
```

Read:

```python
df = spark.read \
    .format("delta") \
    .load("/delta/employees")
```



# 49. Delta Time Travel

Read an older version:

```python
df = spark.read \
    .format("delta") \
    .option("versionAsOf", 5) \
    .load(path)
```

Using timestamp:

```python
.option(
    "timestampAsOf",
    "2026-10-01 10:00:00"
)
```

SQL:

```sql
SELECT *
FROM employees VERSION AS OF 5;
```

Useful for:

* Auditing
* Recovery
* Debugging
* Historical analysis



# 50. MERGE

Extremely important in Data Engineering.

Example:

```sql
MERGE INTO target t
USING source s
ON t.employee_id = s.employee_id

WHEN MATCHED THEN
  UPDATE SET *

WHEN NOT MATCHED THEN
  INSERT *;
```

Common use:

```text
Source
  ↓
New + Updated Records
  ↓
MERGE
  ↓
Target Delta Table
```



# 51. SCD

Slowly Changing Dimensions.

### SCD Type 1

Overwrite old value.

```text
Old:
Salary = 50K

New:
Salary = 60K

Target:
Salary = 60K
```

No history.

### SCD Type 2

Maintain history.

Typical columns:

```text
employee_id
salary
start_date
end_date
is_current
```

Example:

```text
101 | 50K | Jan | Mar | false
101 | 60K | Apr | NULL | true
```



# 52. Schema Evolution

Allows compatible changes to schema.

Example:

```text
Old:
id
name

New:
id
name
department
```

Delta can support schema evolution depending on configuration.



# 53. Partitioning

Partition large datasets by frequently filtered columns.

Example:

```python
df.write \
  .partitionBy("year", "month") \
  .format("delta") \
  .save(path)
```

Directory:

```text
year=2026/
month=10/
```

Benefits:

* Partition pruning
* Less data read

Don't partition blindly on high-cardinality columns.

Bad candidates can include:

```text
customer_id
transaction_id
```

when they have extremely high cardinality.



# 54. Bucketing

Bucketing distributes data into fixed buckets based on a column.

Useful for certain join/query patterns.

Concept:

```text
employee_id
     ↓
Hash
     ↓
Bucket 1
Bucket 2
Bucket 3
...
```

Partitioning and bucketing are different concepts.



# 55. Data Skew

Data skew occurs when some partitions contain much more data than others.

Example:

```text
Partition 1 → 10 MB
Partition 2 → 12 MB
Partition 3 → 11 MB
Partition 4 → 900 MB
```

One task becomes a straggler.

Common causes:

* Highly skewed join key
* Popular customer
* NULL key
* Uneven data distribution

Solutions:

* Broadcast join
* Salting
* AQE
* Repartitioning
* Better join strategy



# 56. Salting

Used to handle skewed keys.

Example:

```text
customer_id = 100
```

has millions of records.

Add random salt:

```text
100_1
100_2
100_3
...
```

Then distribute work across partitions.



# 57. Adaptive Query Execution (AQE)

AQE allows Spark to optimize execution based on runtime statistics.

Can help with:

* Dynamic partition coalescing
* Skew join handling
* Join strategy optimization

Important interview topic.



# 58. Predicate Pushdown

Instead of reading everything:

```text
Read entire dataset
      ↓
Filter
```

Spark/storage can often push filter closer to the data source:

```text
Filter
  ↓
Read only required data
```

Example:

```python
df.filter(col("salary") > 1000000)
```

This can reduce I/O.



# 59. Column Pruning

If you need:

```python
df.select("employee_id", "salary")
```

Spark can avoid reading unnecessary columns from suitable columnar sources.



# 60. Join Strategies

Common Spark strategies:

### Broadcast Hash Join

Small table + large table.

### Sort Merge Join

Common for large datasets.

### Shuffle Hash Join

Can be used in suitable cases.

### Broadcast Nested Loop Join

Special cases; potentially expensive.

Interview question:

**How do you optimize a large-large join?**

Discuss:

* Filter early
* Select required columns
* Check skew
* Repartition appropriately
* AQE
* Join strategy
* Avoid unnecessary shuffle



# 61. Spark SQL

Register temporary view:

```python
df.createOrReplaceTempView("employees")
```

Query:

```sql
SELECT department,
       AVG(salary)
FROM employees
GROUP BY department;
```

Run:

```python
spark.sql("""
SELECT *
FROM employees
WHERE salary > 1000000
""").show()
```



# 62. Temporary View vs Global Temporary View

Temporary:

```python
createOrReplaceTempView()
```

Available within current Spark session.

Global temporary view:

```python
createOrReplaceGlobalTempView()
```

Access:

```sql
SELECT *
FROM global_temp.employees;
```



# 63. Databricks Architecture

Typical Azure Databricks pipeline:

```text
Source
  ↓
ADLS Gen2
  ↓
Databricks
  ↓
PySpark
  ↓
Bronze
  ↓
Silver
  ↓
Gold
  ↓
Power BI / Consumers
```



# 64. Medallion Architecture

### Bronze

Raw data.

```text
Source → Bronze
```

Minimal transformation.

### Silver

Cleaned/conformed data.

```text
Bronze → Silver
```

Typical operations:

* Remove duplicates
* Handle nulls
* Standardize formats
* Data validation
* Join/reference data

### Gold

Business-ready data.

```text
Silver → Gold
```

Examples:

* KPIs
* Aggregates
* Reporting tables
* Business metrics



# 65. Production PySpark Pipeline

A good pipeline typically follows:

```text
Read
 ↓
Validate
 ↓
Filter
 ↓
Transform
 ↓
Join
 ↓
Aggregate
 ↓
Optimize
 ↓
Write
 ↓
Monitor
```



# 66. Incremental Processing

Instead of processing everything every day:

```text
Full load:
1 TB → process 1 TB
```

Incremental:

```text
1 TB existing
+
10 GB new
↓
Process only 10 GB
```

Common techniques:

* Watermark
* Last modified timestamp
* CDC
* Delta Change Data Feed
* Source-specific incremental keys



# 67. Checkpoint vs Cache

### Cache

Used to improve performance by reusing computed data.

### Checkpoint

Used to truncate lineage and provide recovery/state semantics depending on use case.

Streaming applications commonly use checkpoints for maintaining progress/state.



# 68. Structured Streaming

Spark Structured Streaming processes continuously arriving data using DataFrame/Dataset APIs.

Example:

```python
stream_df = spark.readStream \
    .format("cloudFiles") \
    .option("cloudFiles.format", "json") \
    .load(input_path)
```

Write:

```python
stream_df.writeStream \
    .format("delta") \
    .option("checkpointLocation", checkpoint_path) \
    .start(output_path)
```



# 69. Output Modes

Structured Streaming supports:

```text
append
complete
update
```

### Append

Only new rows.

### Complete

Entire result table.

### Update

Only changed rows.



# 70. Watermark

Used to handle late-arriving data and limit state retention.

Concept:

```text
Event time
   ↓
Watermark
   ↓
Older events eventually excluded from state
```

Example:

```python
df.withWatermark(
    "event_time",
    "10 minutes"
)
```



# 71. Exactly-Once Concept

In distributed systems, exactly-once processing depends on the entire architecture and sink semantics.

Delta Lake + Structured Streaming can provide strong exactly-once processing semantics in appropriate configurations.

Interview question:

**Exactly once vs at least once?**

```text
At least once:
A record may be processed multiple times.

At most once:
A record may be lost.

Exactly once:
Each record's effect is committed once.
```



# 72. Spark Performance Optimization

Remember this checklist:

```text
1. Filter early
2. Select only required columns
3. Avoid unnecessary shuffles
4. Broadcast small tables
5. Handle data skew
6. Choose partitions carefully
7. Use Parquet/Delta
8. Avoid unnecessary UDFs
9. Cache only reused data
10. Use AQE
11. Avoid collect()
12. Check explain()
```



# 73. Small Files Problem

Example:

```text
1 million files × 10 KB
```

can be inefficient compared with fewer appropriately sized files.

Causes:

* Too many partitions
* Frequent small writes
* Streaming micro-batches
* Poor partition design

Solutions:

* Optimize file layout
* Compact files
* Avoid excessive partition counts
* Use appropriate write strategies



# 74. Common Databricks Concepts

Know these:

```text
Workspace
Notebook
Cluster
Compute
Serverless
Dedicated Compute
Catalog
Schema
Table
View
Volume
Jobs
Workflows
Unity Catalog
Delta Lake
DBFS / cloud storage concepts
```



# 75. Unity Catalog

Three-level namespace:

```text
catalog.schema.table
```

Example:

```sql
SELECT *
FROM employee_catalog.employee_db.employees;
```

You have been using this structure in Databricks.



# 76. Managed vs External Tables

### Managed table

Databricks manages table storage/location lifecycle according to the platform/table configuration.

### External table

Data exists at an externally managed storage location.

Important interview topic:

**Metadata and data lifecycle can differ between managed and external tables.**



# 77. Views

### View

Logical query.

```sql
CREATE VIEW employee_view AS
SELECT *
FROM employees;
```

### Materialized view

Stores/maintains materialized results depending on platform capabilities and configuration.



# 78. Common PySpark Functions You Must Know

```python
col
lit
when
otherwise

sum
avg
min
max
count
countDistinct

row_number
rank
dense_rank
lag
lead

concat
concat_ws
split
trim
upper
lower
regexp_replace

to_date
to_timestamp
date_format
datediff
date_add
date_sub

coalesce
nullif

explode
explode_outer
posexplode

array
array_contains
collect_list
collect_set

broadcast
```



# 79. explode()

Array:

```text
["SQL", "PySpark", "Python"]
```

After:

```python
explode("skills")
```

becomes:

```text
SQL
PySpark
Python
```

Example:

```python
df.select(
    "employee_id",
    explode("skills").alias("skill")
)
```



# 80. collect_list vs collect_set

```python
collect_list("skill")
```

keeps duplicates.

```python
collect_set("skill")
```

removes duplicates.



# 81. JSON / Nested Data

Suppose:

```json
{
  "employee_id": 101,
  "address": {
    "city": "Pune",
    "state": "Maharashtra"
  }
}
```

Access:

```python
df.select(
    "employee_id",
    "address.city",
    "address.state"
)
```



# 82. Handling Arrays and Structs

Struct:

```python
df.select("address.city")
```

Array:

```python
df.select(
    explode("skills").alias("skill")
)
```

This is commonly tested in interviews.



# 83. Error Handling in Production

Use:

```python
try:
    ...
except Exception as e:
    ...
```

But don't silently swallow errors.

Good pipeline:

```text
Input validation
 ↓
Transformation
 ↓
Data quality checks
 ↓
Write
 ↓
Logging
 ↓
Alerting
```



# 84. Data Quality Checks

Examples:

```text
Null checks
Duplicate checks
Schema validation
Row count validation
Referential integrity
Business-rule validation
```

Example:

```python
if df.filter(col("employee_id").isNull()).count() > 0:
    raise Exception("Invalid employee IDs")
```



# 85. Idempotency

Very important production concept.

An idempotent pipeline can be rerun without producing incorrect duplicate results.

Bad:

```text
Run 1 → 100 rows
Run 2 → same 100 rows appended again
→ 200 rows
```

Better:

```text
MERGE / overwrite partition / deterministic processing
```

so rerunning gives the same correct result.



# 86. PySpark Coding Pattern

A clean production structure:

```python
from pyspark.sql import functions as F

def transform(df):

    return (
        df
        .filter(F.col("salary").isNotNull())
        .withColumn(
            "salary_category",
            F.when(F.col("salary") > 1000000, "HIGH")
             .otherwise("NORMAL")
        )
        .select(
            "employee_id",
            "salary",
            "salary_category"
        )
    )
```

Then:

```python
df_transformed = transform(df)
```



# 87. Most Important Interview Questions

## Basic

1. What is PySpark?
2. What is Spark?
3. What is SparkSession?
4. What is DataFrame?
5. DataFrame vs RDD?
6. What is lazy evaluation?
7. Transformation vs action?
8. What is a partition?
9. What is shuffle?
10. Narrow vs wide transformation?



# 88. Intermediate Interview Questions

11. repartition vs coalesce?
12. cache vs persist?
13. What is broadcast join?
14. What is data skew?
15. How do you handle skew?
16. What is Catalyst?
17. What is Tungsten?
18. What is predicate pushdown?
19. What is column pruning?
20. How does Spark optimize queries?



# 89. Advanced Interview Questions

21. Explain Spark architecture.
22. Driver vs executor?
23. What happens internally when you call `show()`?
24. Explain job → stage → task.
25. What causes a new stage?
26. What is shuffle?
27. How does Spark handle failures?
28. What is speculative execution?
29. Explain AQE.
30. Explain join strategies.
31. How would you optimize a slow join?
32. How would you handle 1 TB dataset?
33. How would you debug a slow Spark job?
34. How do you identify data skew?
35. How do you optimize a PySpark pipeline?



# 90. Scenario-Based Interview Questions

### Scenario 1

You have:

```text
Employee = 500 million rows
Department = 100 rows
```

How would you join?

Expected discussion:

```text
Broadcast Department
```



### Scenario 2

One customer contains 50% of all records.

Problem?

```text
Data skew
```

Possible solution:

```text
Salting
AQE
Broadcast if applicable
Better partitioning
```



### Scenario 3

Your Spark job is very slow.

Check:

```text
Spark UI
Explain plan
Shuffle
Skew
Partitions
Join strategy
Input size
File count
Caching
UDFs
```



### Scenario 4

You have 10,000 tiny output files.

Problem:

```text
Small files problem
```

Solutions:

```text
Reduce partitions
Compact files
Optimize write strategy
```



### Scenario 5

Pipeline failed after processing 70%.

How can you safely rerun?

Discuss:

```text
Checkpointing where applicable
Idempotency
Incremental processing
MERGE
Transactional Delta writes
```



# 91. SQL → PySpark Mapping

| SQL        | PySpark        |
| - | -- |
| SELECT     | select         |
| WHERE      | filter / where |
| GROUP BY   | groupBy        |
| ORDER BY   | orderBy        |
| JOIN       | join           |
| CASE       | when           |
| DISTINCT   | distinct       |
| COUNT      | count          |
| AVG        | avg            |
| SUM        | sum            |
| ROW_NUMBER | row_number     |
| RANK       | rank           |
| LAG        | lag            |
| LEAD       | lead           |



# 92. Your Core PySpark Mental Model

Whenever you see a PySpark problem, think:

```text
1. What is the input?
        ↓
2. What is the schema?
        ↓
3. What transformation is required?
        ↓
4. Will it cause shuffle?
        ↓
5. How many partitions?
        ↓
6. Is there data skew?
        ↓
7. Can I filter/project early?
        ↓
8. Can I broadcast?
        ↓
9. Is caching useful?
        ↓
10. What does explain() show?
        ↓
11. How will I write the result?
        ↓
12. Is the pipeline idempotent?
```



# 93. 30-Second Interview Revision

If an interviewer asks:

### "Explain PySpark."

Say:

> PySpark is the Python API for Apache Spark, a distributed processing framework used for large-scale data processing. It provides DataFrame and SQL APIs, supports distributed transformations and actions, and uses lazy evaluation and query optimization to execute workloads efficiently across a cluster.

### "How do you optimize PySpark?"

Think:

```text
Filter early
↓
Select required columns
↓
Avoid unnecessary shuffle
↓
Broadcast small datasets
↓
Handle skew
↓
Tune partitions
↓
Use Parquet/Delta
↓
Avoid unnecessary UDFs
↓
Cache reused data
↓
Use AQE
↓
Inspect Spark UI + explain()
```



# 94. Final PySpark Revision Roadmap

You should be able to explain this entire chain:

```text
Python
  ↓
PySpark
  ↓
SparkSession
  ↓
DataFrame
  ↓
Schema
  ↓
select / filter / withColumn
  ↓
Functions
  ↓
Aggregations
  ↓
Joins
  ↓
Windows
  ↓
Transformations
  ↓
Actions
  ↓
Lazy Evaluation
  ↓
Partitions
  ↓
Shuffle
  ↓
Stages
  ↓
Tasks
  ↓
Catalyst
  ↓
Tungsten
  ↓
AQE
  ↓
Optimization
  ↓
Parquet
  ↓
Delta Lake
  ↓
MERGE
  ↓
SCD
  ↓
Incremental Processing
  ↓
Structured Streaming
  ↓
Databricks
  ↓
Production Pipelines
```

# 95. Must-Remember Interview Checklist

Before your interview, make sure you can explain **without looking at notes**:

* [ ] Spark architecture
* [ ] Driver / Executor
* [ ] SparkSession
* [ ] DataFrame
* [ ] Schema
* [ ] Transformations
* [ ] Actions
* [ ] Lazy evaluation
* [ ] Narrow / Wide transformations
* [ ] Partitions
* [ ] Shuffle
* [ ] repartition / coalesce
* [ ] groupBy
* [ ] joins
* [ ] broadcast join
* [ ] window functions
* [ ] UDF / Pandas UDF
* [ ] RDD vs DataFrame
* [ ] Catalyst
* [ ] Tungsten
* [ ] AQE
* [ ] Predicate pushdown
* [ ] Column pruning
* [ ] Data skew
* [ ] Salting
* [ ] Cache / persist
* [ ] Explain plan
* [ ] Parquet
* [ ] Delta Lake
* [ ] Time Travel
* [ ] MERGE
* [ ] SCD Type 1 / Type 2
* [ ] Partitioning
* [ ] Small files
* [ ] Incremental processing
* [ ] Idempotency
* [ ] Structured Streaming
* [ ] Watermark
* [ ] Checkpoint
* [ ] Medallion architecture
* [ ] Unity Catalog
* [ ] Databricks production architecture
* [ ] Performance optimization
* [ ] Debugging Spark jobs
* [ ] Scenario-based questions

## The 5 concepts you should master most deeply

If you have very limited revision time, focus especially on:

**1. Transformations + Lazy Evaluation**

**2. Partitions + Shuffle + Stages + Tasks**

**3. Joins + Broadcast + Data Skew**

**4. Window Functions + Aggregations**

**5. Delta Lake + MERGE + Incremental Processing + SCD**

These five areas connect a large part of real-world PySpark Data Engineering work and interview questions.
