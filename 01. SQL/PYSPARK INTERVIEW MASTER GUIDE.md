# PySpark Interview Master Guide

<!-- ## SECTION 1: PYSPARK FUNDAMENTALS -->

### Q1. What is PySpark?

**Answer:**

PySpark is the Python API for Apache Spark, an open-source distributed computing framework used to process large datasets across multiple machines.

It allows developers to perform distributed data processing using Python.

**Key Features:**
- Distributed data processing.
- In-memory computation.
- Lazy evaluation.
- Fault tolerance.
- Parallel execution.
- DataFrame and SQL processing.
- Integration with cloud storage.

**Syntax:**
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("AshishApplication") \
    .master("local[*]") \
    .getOrCreate()

print(spark.version)
```

### Q2. What is Apache Spark?

**Answer:**

Apache Spark is an open-source distributed computing engine designed to process large volumes of data efficiently.

It supports batch processing, real-time stream processing, SQL queries, machine learning and graph processing.

**Main Components:**
- Spark Core
- Spark SQL
- Structured Streaming
- MLlib
- GraphX

### Q3. What is SparkSession?

**Answer:**

SparkSession is the entry point for working with Spark DataFrames, Spark SQL and structured data processing.

It was introduced in Spark 2.0 and provides a unified interface for Spark SQL functionality.

**Syntax:**
```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("AshishApplication") \
    .config("spark.sql.shuffle.partitions", "8") \
    .getOrCreate()

print(spark)
```

**Important Methods:**
- `spark.read`
- `spark.sql()`
- `spark.createDataFrame()`
- `spark.table()`
- `spark.stop()`

### Q4. What is SparkContext?

**Answer:**

SparkContext is the entry point for lower-level Spark functionality, particularly RDD operations.

It connects the Spark application to the cluster execution environment.

**Syntax:**
```python
sc = spark.sparkContext

print(sc.appName)
print(sc.master)
print(sc.version)
```

### Q5. What is an RDD?

**Answer:**

RDD stands for Resilient Distributed Dataset.

It is an immutable distributed collection of records that can be processed in parallel across multiple machines.

**Important Characteristics:**
- Resilient: Supports recovery through lineage.
- Distributed: Data is distributed across partitions.
- Immutable: Existing RDDs cannot be modified.
- Lazy: Transformations are evaluated when an action executes.

**Syntax:**
```python
sc = spark.sparkContext

rdd = sc.parallelize([10, 20, 30, 40, 50])

result = rdd.map(lambda x: x * 2)

print(result.collect())
```

### Q6. What is a DataFrame in PySpark?

**Answer:**

A DataFrame is a distributed collection of data organized into named columns with a defined schema.

It is similar to a relational database table.

**Syntax:**
```python
data = [
    (1, "Ashish", 50000),
    (2, "Rahul", 60000),
    (3, "Amit", 70000)
]

columns = ["id", "name", "salary"]

df = spark.createDataFrame(data, columns)

df.show()
df.printSchema()
```

### Q7. What is lazy evaluation in PySpark?

**Answer:**

Lazy evaluation means Spark does not execute transformations immediately.

Instead, Spark builds an execution plan and executes the transformations when an action is called.

**Syntax:**
```python
df = spark.read.csv(
    "/data/employees.csv",
    header=True,
    inferSchema=True
)

filtered_df = df.filter(
    df.salary > 50000
)

# Execution gets triggered
filtered_df.show()
```

### Q8. What are transformations in PySpark?

**Answer:**

Transformations are operations that create a new DataFrame or RDD from an existing one without immediately executing the computation.

Common transformations:
- select()
- filter()
- where()
- withColumn()
- drop()
- groupBy()
- join()
- distinct()
- repartition()

**Syntax:**
```python
df_filtered = df.filter(df.salary > 50000)

df_selected = df_filtered.select(
    "employee_id",
    "employee_name",
    "salary"
)
```

### Q9. What are actions in PySpark?

**Answer:**

Actions trigger Spark execution and either return results to the driver or write results to an external storage system.

Common actions:
- show()
- count()
- collect()
- take()
- first()
- write.save()

**Syntax:**
```python
df.show(10)

print(df.count())

rows = df.take(5)

print(rows)
```

### Q10. What is the difference between RDD and DataFrame?

**Answer:**

RDD is a lower-level distributed collection of objects, whereas a DataFrame is a structured distributed dataset with named columns and schema.

DataFrames are generally preferred for structured data processing because Spark can optimize their execution using Catalyst.

In PySpark, DataFrames are commonly used for production data engineering pipelines.

<!-- ## SECTION 2: SPARK ARCHITECTURE -->

### Q11. Explain Apache Spark Architecture.

**Answer:**

Spark follows a distributed execution architecture.

Its major components are:

1. Driver: Controls the Spark application.
2. SparkSession: Entry point for Spark operations.
3. Cluster Manager: Allocates resources.
4. Executors: Execute tasks and store cached data.
5. Tasks: Smallest execution units.
6. Jobs: Created when an action triggers execution.
7. Stages: Groups of tasks separated by shuffle boundaries.

**Execution Flow:**

Application → Driver → Cluster Manager → Executors → Tasks → Results.

### Q12. What is a Driver in Spark?

**Answer:**

The Driver is the process responsible for coordinating and managing Spark application execution.

**Responsibilities:**
- Creates SparkSession.
- Builds execution plans.
- Schedules jobs and tasks.
- Requests cluster resources.
- Tracks task execution.
- Collects results when required.

### Q13. What is an Executor in Spark?

**Answer:**

Executors are worker processes that execute Spark tasks and store intermediate or cached data.

**Responsibilities:**
- Execute assigned tasks.
- Process data partitions.
- Cache and persist data.
- Perform shuffle operations.
- Report execution status.

### Q14. What is a Job in Spark?

**Answer:**

A Job is created when an action triggers execution of a Spark computation.

For example, calling `count()` or `show()` can trigger a job.

**Syntax:**
```python
df = spark.read.csv(
    "/data/employees.csv",
    header=True,
    inferSchema=True
)

df.filter(df.salary > 50000).count()
```

### Q15. What is a Stage in Spark?

**Answer:**

A Stage is a group of tasks that can execute without requiring another shuffle boundary between them.

Spark divides jobs into stages based on dependencies between transformations.

### Q16. What is a Task in Spark?

**Answer:**

A Task is the smallest unit of execution in Spark.

A task generally processes one partition of data.

For example, if a stage has 10 partitions, Spark typically creates 10 tasks for that stage.

### Q17. What is DAG in Spark?

**Answer:**

DAG stands for Directed Acyclic Graph.

It represents the sequence and dependencies of transformations in a Spark application.

Spark uses DAG information to organize execution into stages and optimize processing.

### Q18. What is Shuffle in Spark?

**Answer:**

Shuffle is the process of redistributing data across partitions or executors.

It commonly happens during operations such as:
- groupBy()
- distinct()
- repartition()
- orderBy()
- Certain joins.

Shuffle is expensive because it can involve network communication, disk I/O, sorting and serialization.

**Syntax:**
```python
df.groupBy("department").count().show()

df.repartition(10)
```

<!-- ## SECTION 3: FILE READING AND WRITING -->

### Q19. How do you read a CSV file in PySpark?

**Answer:**

We use `spark.read.csv()` or `spark.read.format("csv")` to read CSV files.

**Syntax:**
```python
df = spark.read \
    .format("csv") \
    .option("header", "true") \
    .option("inferSchema", "true") \
    .option("mode", "PERMISSIVE") \
    .load("/data/employees.csv")

df.show()
```

### Q20. How do you write a CSV file in PySpark?

**Answer:**

We use the DataFrameWriter API to write DataFrames into CSV format.

**Syntax:**
```python
df.write \
    .format("csv") \
    .option("header", "true") \
    .mode("overwrite") \
    .save("/output/employees")
```

### Q21. What are the different write modes in PySpark?

**Answer:**

PySpark supports four commonly used write modes.

1. Append: Adds new records to existing data.
2. Overwrite: Replaces existing data.
3. Ignore: Skips writing if the destination already exists.
4. ErrorIfExists: Throws an error if the destination exists.

**Syntax:**
```python
df.write.mode("append").csv("/output/employees")

df.write.mode("overwrite").parquet("/output/employees")

df.write.mode("ignore").json("/output/employees")

df.write.mode("errorifexists").csv("/output/employees")
```

### Q22. How do you read a Parquet file?

**Answer:**

Parquet is a columnar storage format commonly used in big data processing.

It supports compression, column pruning and efficient analytical queries.

**Syntax:**
```python
df = spark.read.parquet(
    "/data/employees.parquet"
)

df.show()
```

### Q23. How do you read a JSON file?

**Answer:**

PySpark supports reading JSON files using the DataFrameReader API.

**Syntax:**
```python
df = spark.read \
    .format("json") \
    .option("multiline", "true") \
    .load("/data/employees.json")

df.show()
```

### Q24. How do you define a custom schema while reading CSV?

**Answer:**

We can define the schema using StructType and StructField instead of relying on schema inference.

**Benefits:**
- Avoids schema inference overhead.
- Ensures consistent data types.
- Improves data quality.
- Makes data processing predictable.

**Syntax:**
```python
from pyspark.sql.types import (
    StructType,
    StructField,
    IntegerType,
    StringType,
    DoubleType
)

schema = StructType([
    StructField("employee_id", IntegerType(), True),
    StructField("employee_name", StringType(), True),
    StructField("salary", DoubleType(), True)
])

df = spark.read \
    .option("header", "true") \
    .schema(schema) \
    .csv("/data/employees.csv")
```

### Q25. How do you handle corrupt records while reading CSV?

**Answer:**

We can use the `mode` option to control how Spark handles malformed records.

- PERMISSIVE: Handles malformed records and places corrupt data in a designated column when configured.
- DROPMALFORMED: Drops malformed records.
- FAILFAST: Throws an exception when malformed records are encountered.

**Syntax:**
```python
df = spark.read \
    .option("header", "true") \
    .option("mode", "PERMISSIVE") \
    .option("columnNameOfCorruptRecord", "_corrupt_record") \
    .csv("/data/employees.csv")
```

<!-- ## SECTION 4: PARTITIONING AND PERFORMANCE -->

### Q26. What is Partitioning in PySpark?

**Answer:**

Partitioning divides a large dataset into smaller logical chunks that can be processed in parallel.

Each partition can be processed by a separate task.

**Benefits:**
- Parallel processing.
- Better resource utilization.
- Distributed execution.
- Improved scalability.

**Syntax:**
```python
print(df.rdd.getNumPartitions())

df = df.repartition(10)

print(df.rdd.getNumPartitions())
```

### Q27. What is the difference between repartition() and coalesce()?

**Answer:**

`repartition()` redistributes data across partitions and generally performs a shuffle.

`coalesce()` is primarily used to decrease the number of partitions while avoiding a full shuffle by default.

**Syntax:**
```python
# Increase or decrease partitions
df_repartitioned = df.repartition(10)

# Reduce partitions
df_coalesced = df.coalesce(2)
```

### Q28. What is Broadcast Join in PySpark?

**Answer:**

Broadcast Join is an optimization technique where Spark distributes a small table to executors so it can be joined locally with a large table.

It avoids shuffling the large table for that join.

**When to use it?**
- One table is small.
- The table fits comfortably in executor memory.
- A shuffle-based join would be more expensive.

**Syntax:**
```python
from pyspark.sql.functions import broadcast

result = large_df.join(
    broadcast(small_df),
    "department_id",
    "inner"
)

result.show()
```

### Q29. What is Cache in PySpark?

**Answer:**

Cache stores a DataFrame or RDD's computed partitions for reuse.

It avoids recomputing the same intermediate result when it is used multiple times.

**Syntax:**
```python
df.cache()

df.count()

df.show()

df.unpersist()
```

### Q30. What is Persist in PySpark?

**Answer:**

Persist is used to store intermediate data using a specified storage level.

It provides more control over how Spark stores the data.

**Syntax:**
```python
from pyspark import StorageLevel

df.persist(
    StorageLevel.MEMORY_AND_DISK
)

df.count()

df.unpersist()
```

### Q31. What is Data Skew in Spark?

**Answer:**

Data skew occurs when certain partitions contain significantly more data than other partitions.

It causes uneven task execution and can slow down the entire Spark job.

**Solutions:**
- Broadcast joins.
- Salting techniques.
- AQE skew join optimization.
- Better partitioning.
- Filtering unnecessary data.

### Q32. What is Adaptive Query Execution (AQE)?

**Answer:**

AQE is a Spark SQL optimization feature that uses runtime statistics to improve execution plans.

It supports:
- Coalescing shuffle partitions.
- Skew join optimization.
- Runtime join strategy optimization.

**Syntax:**
```python
spark.conf.set(
    "spark.sql.adaptive.enabled",
    "true"
)
```

### Q33. What is the difference between Cache and Checkpoint?

**Answer:**

Cache or persist stores intermediate results for reuse.

Checkpoint saves computed data to reliable storage and truncates the existing lineage.

Checkpointing is useful when the lineage becomes very long or when reliable recovery is required.

**Syntax:**
```python
spark.sparkContext.setCheckpointDir(
    "/tmp/ashish_checkpoints"
)

checkpointed_df = df.checkpoint()
```

<!-- ## SECTION 5: DATABRICKS AND MAGIC COMMANDS -->

### Q34. What are Magic Commands in Databricks?

**Answer:**

Magic Commands are special notebook commands used to execute different languages, access filesystems, install libraries and manage notebook execution.

**Important Magic Commands:**

**%python**
```python
%python
print("Hello Ashish")
```

**%sql**
```sql
%sql
SELECT * FROM employees;
```

**%scala**
```scala
%scala
val name = "Ashish"
println(name)
```

**%md**
```text
%md
# Ashish Data Engineering Notebook
This notebook processes employee records.
```

**%fs**
```text
%fs ls /Volumes/production/default/raw/
```

**%run**
```text
%run ./Common_Utilities
```

**%pip**
```python
%pip install pandas
```

**%sh**
```text
%sh
echo "Hello Ashish"
```

### Q35. What is the difference between %run and dbutils.notebook.run()?

**Answer:**

`%run` executes another notebook inline and makes its definitions available in the current notebook context.

`dbutils.notebook.run()` executes another notebook as a separate notebook run and can return a string result.

**Syntax – %run:**
```python
%run ./Common_Utilities
```

**Syntax – dbutils.notebook.run():**
```python
result = dbutils.notebook.run(
    "./Child_Notebook",
    60,
    {"environment": "dev"}
)

print(result)
```

### Q36. What is DBFS?

**Answer:**

DBFS stands for Databricks File System.

Historically, it provided a filesystem abstraction over cloud object storage.

Modern Databricks environments increasingly recommend Unity Catalog volumes and external locations for governed storage access.

**Syntax:**
```python
dbutils.fs.ls("/Volumes/production/default/raw/")
```

### Q37. What is Unity Catalog?

**Answer:**

Unity Catalog is Databricks' centralized governance solution for managing data and AI assets.

Its major capabilities include:
- Access control.
- Data discovery.
- Data lineage.
- Auditing.
- Centralized governance.

**Syntax:**
```sql
%sql

SELECT *
FROM production.sales.orders;
```

### Q38. What is Delta Lake?

**Answer:**

Delta Lake is an open-source storage framework that adds transaction log-based reliability and ACID transaction capabilities to data stored in formats such as Parquet.

Important features:
- ACID transactions.
- Schema enforcement.
- Schema evolution.
- Time travel.
- MERGE operations.
- Updates and deletes.

**Syntax:**
```python
df.write \
    .format("delta") \
    .mode("overwrite") \
    .save("/data/delta/employees")
```

<!-- ## SECTION 6: PYSPARK DATAFRAME OPERATIONS -->

### Q39. How do you select specific columns?

**Answer:**

The select() method is used to retrieve specific columns from a DataFrame.

**Syntax:**
```python
df.select(
    "employee_id",
    "employee_name",
    "salary"
).show()
```

### Q40. How do you filter records in PySpark?

**Answer:**

The filter() or where() method is used to retrieve records based on specified conditions.

**Syntax:**
```python
df.filter(
    df.salary > 50000
).show()
```

Alternative:
```python
df.where(
    "salary > 50000"
).show()
```

### Q41. How do you add a new column?

**Answer:**

The withColumn() method creates a new column or replaces an existing column.

**Syntax:**
```python
from pyspark.sql.functions import col

df = df.withColumn(
    "annual_salary",
    col("salary") * 12
)
```

### Q42. How do you rename and drop columns?

**Answer:**

Use withColumnRenamed() to rename a column and drop() to remove a column.

**Syntax:**
```python
df = df.withColumnRenamed(
    "emp_name",
    "employee_name"
)

df = df.drop("temporary_column")
```

### Q43. How do you remove duplicate records?

**Answer:**

The dropDuplicates() method removes duplicate records from a DataFrame.

**Syntax:**
```python
# Remove completely duplicated records
df = df.dropDuplicates()

# Remove duplicates based on employee_id
df = df.dropDuplicates(
    ["employee_id"]
)
```

### Q44. How do you perform GroupBy and Aggregation?

**Answer:**

The groupBy() method groups records based on specified columns, while agg() performs aggregate calculations.

**Syntax:**
```python
from pyspark.sql.functions import (
    sum,
    avg,
    count,
    max,
    min
)

result = df.groupBy("department") \
    .agg(
        sum("salary").alias("total_salary"),
        avg("salary").alias("average_salary"),
        count("*").alias("employee_count"),
        max("salary").alias("maximum_salary"),
        min("salary").alias("minimum_salary")
    )

result.show()
```

### Q45. How do you perform Joins in PySpark?

**Answer:**

The join() method combines two DataFrames based on a common column or join condition.

Supported join types include:
- inner
- left
- right
- full
- left_semi
- left_anti
- cross

**Syntax:**
```python
result = employees.join(
    departments,
    employees.department_id == departments.department_id,
    "inner"
)

result.show()
```

### Q46. How do you use Window Functions in PySpark?

**Answer:**

Window functions perform calculations across a group of related rows without collapsing the rows into a single aggregate result.

Common functions:
- row_number()
- rank()
- dense_rank()
- lag()
- lead()
- sum()
- avg()

**Syntax:**
```python
from pyspark.sql.window import Window

from pyspark.sql.functions import (
    row_number,
    col
)

window_spec = Window \
    .partitionBy("department") \
    .orderBy(col("salary").desc())

result = df.withColumn(
    "row_number",
    row_number().over(window_spec)
)

result.show()
```

### Q47. How do you handle NULL values?

**Answer:**

PySpark provides fillna(), dropna(), isNull(), isNotNull() and coalesce() for handling NULL values.

**Syntax:**
```python
# Replace NULL values
df.fillna(0)

# Remove NULL records
df.dropna()

# Filter NULL records
df.filter(
    col("salary").isNull()
)

# Filter non-NULL records
df.filter(
    col("salary").isNotNull()
)
```

### Q48. What is the difference between union() and unionByName()?

**Answer:**

union() combines DataFrames based on column positions.

unionByName() combines DataFrames based on column names.

**Syntax:**
```python
# Union by column position
df1.union(df2)

# Union by column name
df1.unionByName(
    df2,
    allowMissingColumns=True
)
```

<!-- ## SECTION 7: ADVANCED PYSPARK CONCEPTS -->

### Q49. What is a UDF in PySpark?

**Answer:**

UDF stands for User Defined Function.

It allows developers to implement custom Python logic and apply it to Spark DataFrame columns.

Python UDFs can introduce serialization and execution overhead, so built-in Spark SQL functions are generally preferred when available.

**Syntax:**
```python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

def categorize_salary(salary):
    if salary >= 100000:
        return "High"
    return "Low"

salary_udf = udf(
    categorize_salary,
    StringType()
)

df = df.withColumn(
    "salary_category",
    salary_udf("salary")
)
```

### Q50. What is a Pandas UDF?

**Answer:**

A Pandas UDF is a vectorized user-defined function that processes data in batches using Pandas and Apache Arrow.

It can improve performance compared with conventional scalar Python UDFs for suitable workloads.

**Syntax:**
```python
import pandas as pd

from pyspark.sql.functions import pandas_udf
from pyspark.sql.types import DoubleType

@pandas_udf(DoubleType())
def calculate_bonus(salary: pd.Series) -> pd.Series:
    return salary * 0.10

df = df.withColumn(
    "bonus",
    calculate_bonus("salary")
)
```

### Q51. What is Catalyst Optimizer?

**Answer:**

Catalyst is Spark SQL's query optimization framework.

It optimizes logical and physical execution plans to improve query performance.

Important optimization techniques:
- Predicate pushdown.
- Column pruning.
- Constant folding.
- Join optimization.
- Logical plan optimization.
- Physical plan selection.

### Q52. What is Tungsten in Spark?

**Answer:**

Tungsten refers to Spark's execution engine improvements focused on efficient memory and CPU utilization.

Important areas include:
- Binary memory management.
- Whole-stage code generation.
- Cache-aware computation.
- Efficient execution.

### Q53. What is the difference between collect(), show() and take()?

**Answer:**

collect() returns all records to the driver.

show() displays a limited number of records.

take(n) returns the first n records to the driver.

**Syntax:**
```python
df.show(10)

rows = df.take(5)

all_rows = df.collect()
```

**Important:** Avoid collect() on large datasets because it can cause driver out-of-memory errors.

### Q54. What is checkpointing in Spark?

**Answer:**

Checkpointing saves computed data to reliable storage and truncates the existing lineage.

It is useful when Spark applications have very long dependency chains.

**Syntax:**
```python
spark.sparkContext.setCheckpointDir(
    "/tmp/ashish_checkpoints"
)

checkpointed_df = df.checkpoint()
```

### Q55. What is Salting in PySpark?

**Answer:**

Salting is a technique used to solve data skew problems.

An additional artificial key is introduced to distribute heavily skewed records across multiple partitions.

It is particularly useful for large joins and aggregations.

### Q56. What is the difference between explode() and explode_outer()?

**Answer:**

explode() generates a separate row for each array or map element.

explode_outer() also preserves a row for NULL or empty collections, producing NULL for the generated element.

**Syntax:**
```python
from pyspark.sql.functions import (
    explode,
    explode_outer
)

df.select(
    "employee_id",
    explode("skills").alias("skill")
).show()
```

### Q57. What is the difference between collect_list() and collect_set()?

**Answer:**

collect_list() collects values into an array while preserving duplicates.

collect_set() collects distinct values into an array.

**Syntax:**
```python
from pyspark.sql.functions import (
    collect_list,
    collect_set
)

result = df.groupBy("department").agg(
    collect_list("employee_name").alias("all_employees"),
    collect_set("employee_name").alias("unique_employees")
)
```

### Q58. How do you check the execution plan of a DataFrame?

**Answer:**

The explain() method displays the logical and physical execution plans.

It helps identify scans, joins, exchanges, filters and other execution operations.

**Syntax:**
```python
df.explain()

df.explain("extended")

df.explain("formatted")

df.explain("cost")
```

<!-- ## SECTION 8: REAL-WORLD PYSPARK SCENARIOS -->

### Q59. Your PySpark job processes 1 TB of data, but one task takes 40 minutes while other tasks finish in 5 minutes. What could be the reason?

**Answer:**

The most likely reason is data skew, where some partitions contain significantly more data than others.

Other possibilities include:
- Uneven partition distribution.
- Slow storage access.
- Executor resource contention.
- Excessive disk spilling.

**Solutions:**
1. Inspect Spark UI.
2. Check task duration and shuffle metrics.
3. Identify skewed keys.
4. Apply salting where appropriate.
5. Use AQE skew join optimization.
6. Reconsider partitioning strategy.

### Q60. How would you optimize a slow PySpark job?

**Answer:**

I would follow a systematic approach:

1. Analyze Spark UI.
2. Identify slow stages.
3. Check data skew.
4. Reduce unnecessary shuffle.
5. Use broadcast joins for suitable small tables.
6. Apply filters early.
7. Select only required columns.
8. Avoid unnecessary Python UDFs.
9. Use appropriate partition counts.
10. Prefer Parquet or Delta for analytical storage.
11. Use cache or persist when intermediate results are reused.
12. Enable AQE where appropriate.
13. Review executor memory and garbage collection.
14. Inspect physical execution plans.

**Syntax:**
```python
df.explain("formatted")

spark.conf.set(
    "spark.sql.adaptive.enabled",
    "true"
)

spark.conf.set(
    "spark.sql.shuffle.partitions",
    "200"
)
```

<!-- ## SECTION 9: IMPORTANT DATABRICKS COMMANDS -->

### Q61. How do you list files in Databricks?

**Answer:**

We can use dbutils.fs.ls() to list files and directories.

**Syntax:**
```python
dbutils.fs.ls(
    "/Volumes/production/default/raw/"
)
```

### Q62. How do you copy files in Databricks?

**Answer:**

We can use dbutils.fs.cp() to copy files between supported filesystem locations.

**Syntax:**
```python
dbutils.fs.cp(
    "/Volumes/production/default/raw/input.csv",
    "/Volumes/production/default/backup/input.csv"
)
```

### Q63. How do you create widgets in Databricks?

**Answer:**

Widgets are used to pass dynamic input parameters to notebooks.

**Syntax:**
```python
dbutils.widgets.text(
    "environment",
    "dev"
)

environment = dbutils.widgets.get(
    "environment"
)

print(environment)
```

### Q64. How do you pass parameters between notebooks?

**Answer:**

We can use dbutils.notebook.run() to execute another notebook and pass parameters.

**Syntax:**
```python
result = dbutils.notebook.run(
    "./Child_Notebook",
    60,
    {
        "environment": "dev",
        "owner": "Ashish"
    }
)

print(result)
```

### Q65. How do you return a value from a Databricks notebook?

**Answer:**

Use dbutils.notebook.exit() to return a string result from a notebook.

**Syntax:**
```python
dbutils.notebook.exit(
    "AshishApplication Completed Successfully"
)
```

<!-- ## SECTION 10: 30-DAY PYSPARK INTERVIEW PREPARATION PLAN -->

**Week 1 – Fundamentals**
- What is PySpark?
- SparkSession and SparkContext.
- RDD and DataFrames.
- Lazy evaluation.
- Transformations and actions.
- Spark architecture.

**Week 2 – Practical PySpark**
- CSV, JSON and Parquet.
- DataFrame operations.
- Joins.
- Window functions.
- GroupBy and aggregation.
- NULL handling.

**Week 3 – Advanced Spark**
- Partitions.
- Repartition and coalesce.
- Broadcast joins.
- Shuffle.
- Data skew.
- Cache and persist.
- Checkpointing.
- Catalyst Optimizer.

**Week 4 – Databricks and Production**
- Magic commands.
- DBFS and Unity Catalog.
- Delta Lake.
- Spark UI.
- Performance optimization.
- Real-world scenarios.
- Mock interviews.

# FINAL INTERVIEW PREPARATION ADVICE

Before attending a PySpark interview, make sure you can explain:

1. What happens internally when you execute a Spark DataFrame action?
2. How does Spark distribute data across executors?
3. Why is shuffle expensive?
4. How does broadcast join work internally?
5. What causes data skew?
6. What happens when an executor fails?
7. Why is Parquet preferred over CSV for analytical workloads?
8. How does Catalyst optimize queries?
9. When should you use cache, persist and checkpoint?
10. How do you troubleshoot a slow Spark job using Spark UI?

**Remember:**

A PySpark developer knows how to write DataFrame transformations.

A senior Data Engineer understands Spark architecture, distributed execution, optimization, resource management and production troubleshooting.

**END OF PYSPARK INTERVIEW MASTER GUIDE**