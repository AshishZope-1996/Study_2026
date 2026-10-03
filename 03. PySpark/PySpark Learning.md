# PySpark learning + revision roadmap [Part 1]

### 1. What is PySpark?

> * **PySpark** is the **Python API for Apache Spark**.
>
> It is used to **process and analyze very large amounts of data quickly** by distributing the work across multiple computers.
>
> **Simple example:**  
>
> * Python → processes data mainly on one machine
> * PySpark → processes huge data using multiple machines
>
> 👉 **PySpark = Python + Apache Spark**
> Commonly used in **Data Engineering, ETL, Databricks, Big Data, and data processing**.

### 2. Why it is required

> PySpark is required when you need to **process huge amounts of data efficiently**.
> 
> ### Why PySpark?
> 
> * ⚡ **Fast** processing of large datasets
> * 📊 Handles **millions/billions of records**
> * 🖥️ Can use **multiple machines** together
> * 🔄 Useful for **ETL/Data Pipelines**
> * ☁️ Widely used with **Databricks, AWS, Azure**
> * 💼 Important skill for **Data Engineers**
> 
> **Example:** Processing 1 TB of customer data is difficult with normal Python/Pandas, but PySpark can distribute the work across machines.

### 3. How PySpark works internally

> Simple flow:
> 
> **PySpark Code → Driver → Cluster → Executors → Tasks → Result**
> 
> 1. **Driver** – Runs your PySpark program and creates the execution plan.
> 2. **Cluster Manager** – Allocates resources/machines.
> 3. **Executors** – Run the actual data processing.
> 4. **Data is divided into partitions** – Each partition is processed separately.
> 5. **Tasks** – Executors process these partitions in parallel.
> 6. **Result** – Processed data is returned/stored.
> 
> **Example:**
> 
> ```text
> 1 TB Data
>    ↓
> Partitions
>    ↓
> Executor 1 → Part 1
> Executor 2 → Part 2
> Executor 3 → Part 3
>    ↓
> Combined Result
> ```
> 
> 👉 **Main idea: PySpark divides large data into smaller partitions and processes them in parallel.**


### 4. Basic PySpark Syntax

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("MyApp") \
    .getOrCreate()

df = spark.read.csv("data.csv", header=True, inferSchema=True)

df.show()
```

### Common syntax

```python
df.select("name", "age")
df.filter(df.age > 25)
df.groupBy("city").count()
df.withColumn("new_col", ...)
df.orderBy("age")
```

### 5. Multiple practical PySpark examples.

#### Create DataFrame

```python
data = [
    (1, "Ashish", 50000),
    (2, "Rahul", 60000),
    (3, "Amit", 45000)
]

df = spark.createDataFrame(data, ["id", "name", "salary"])

df.show()
```

#### Select columns

```python
df.select("name", "salary").show()
```

#### Filter data

```python
df.filter(df.salary > 50000).show()
```

#### Add new column

```python
from pyspark.sql.functions import col

df = df.withColumn("bonus", col("salary") * 0.10)
df.show()
```

#### Rename column

```python
df = df.withColumnRenamed("salary", "monthly_salary")
```

#### Sort data

```python
df.orderBy(col("salary").desc()).show()
```

#### Group By

```python
df.groupBy("city").count().show()
```

#### Aggregation

```python
from pyspark.sql.functions import avg, max, min, sum

df.groupBy("city").agg(
    avg("salary").alias("avg_salary"),
    max("salary").alias("max_salary")
).show()
```

#### Read CSV

```python
df = spark.read.csv(
    "employees.csv",
    header=True,
    inferSchema=True
)
```

#### Read JSON

```python
df = spark.read.json("employees.json")
```

#### Write Parquet

```python
df.write.mode("overwrite").parquet("output/employees")
```

#### Join two DataFrames

```python
result = employees.join(
    departments,
    employees.dept_id == departments.dept_id,
    "inner"
)

result.show()
```

#### Remove duplicates

```python
df.dropDuplicates(["id"]).show()
```

#### Handle NULL values

```python
df.fillna({"salary": 0}).show()
```

#### SQL with PySpark

```python
df.createOrReplaceTempView("employees")

result = spark.sql("""
    SELECT name, salary
    FROM employees
    WHERE salary > 50000
""")

result.show()
```

#### Real-world Data Engineering flow

```text
CSV / API / Database
        ↓
    PySpark Read
        ↓
    Transform
        ↓
Filter / Join / GroupBy
        ↓
   Data Quality
        ↓
    Write Parquet
        ↓
ADLS / S3 / Data Lake
```