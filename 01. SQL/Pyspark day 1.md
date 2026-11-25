# **PySpark – Day 1 Revision Notes**



Day 1 Completed

Beginner to Intermediate



**Topics Covered:**

1. Spark Session – Creation and Configuration
2. Creating DataFrames in PySpark
3. DataFrame Joins – Types and Examples
4. Union vs Union All – Differences and Syntax

# **1. Spark Session in PySpark**

### **What is a Spark Session?**

A SparkSession is the entry point to programming with PySpark. It allows us to interact with Spark functionality, create DataFrames, read and write files, execute SQL queries, and manage Spark configurations.

### **How to create a Spark Session?**

```
from pyspark.sql import SparkSessionspark = SparkSession.builder \    .appName("AshishApplication") \    .master("local[*]") \    .getOrCreate()
```

### **Explanation of each method**

| Method          | Description                                   |
| --------------- | --------------------------------------------- |
| `SparkSession`  | Main entry point to PySpark                   |
| `builder`       | Starts Spark session configuration            |
| `appName()`     | Assigns application name                      |
| `master()`      | Defines where Spark runs                      |
| `local[*]`      | Uses all available local CPU cores            |
| `getOrCreate()` | Gets an existing session or creates a new one |

### **How to check Spark version?**

```
print(spark.version)
```

### **How to stop Spark Session?**

```
spark.stop()
```

**Important Interview Question:** What is the difference between SparkContext and SparkSession?

- SparkContext is the lower-level entry point for Spark functionality.
- SparkSession is the unified entry point for working with DataFrames, SQL, and Spark functionality.
- SparkSession internally provides access to SparkContext.

# **2. Creating DataFrames in PySpark**

### **What is a DataFrame?**

A DataFrame is a distributed collection of data organized into named columns, similar to a relational database table.

### **Method 1: Create DataFrame using List**

```
data = [    (1, "Ashish", 50000),    (2, "Rahul", 60000),    (3, "Amit", 70000)]columns = ["ID", "Name", "Salary"]df = spark.createDataFrame(data, columns)df.show()
```

### **Output**

```
+---+------+------+
| ID|  Name|Salary|
+---+------+------+
|  1|Ashish| 50000|
|  2| Rahul| 60000|
|  3|  Amit| 70000|
+---+------+------+
```

### **Method 2: Create DataFrame using Row**

```
from pyspark.sql import Rowdata = [    Row(ID=1, Name="Ashish", Salary=50000),    Row(ID=2, Name="Rahul", Salary=60000)]df = spark.createDataFrame(data)df.show()
```

### **Method 3: Create DataFrame using CSV**

```
df = spark.read \    .option("header", True) \    .option("inferSchema", True) \    .csv("employees.csv")df.show()
```

**Important CSV options:**

| Option        | Purpose                                |
| ------------- | -------------------------------------- |
| `header`      | Uses the first row as column names     |
| `inferSchema` | Automatically detects data types       |
| `delimiter`   | Specifies the separator                |
| `mode`        | Controls handling of malformed records |

### **Method 4: Create DataFrame using Explicit Schema**

```
from pyspark.sql.types import *schema = StructType([    StructField("ID", IntegerType(), True),    StructField("Name", StringType(), True),    StructField("Salary", IntegerType(), True)])data = [    (1, "Ashish", 50000),    (2, "Rahul", 60000)]df = spark.createDataFrame(data, schema)df.printSchema()
```

### **Important DataFrame methods**

```
df.show()           # Display recordsdf.printSchema()    # Display column data typesdf.columns          # Get column namesdf.count()          # Count total recordsdf.describe()       # Statistical summarydf.collect()        # Bring records to driverdf.head(5)          # Fetch first 5 recordsdf.limit(5).show()  # Display first 5 records
```

# **3. DataFrame Joins in PySpark**

### **What is a Join?**

A Join combines records from two or more DataFrames based on a common column or joining condition.

Let's consider two DataFrames.

**Employee DataFrame**

| EmpID | Name   |
| ----- | ------ |
| 1     | Ashish |
| 2     | Rahul  |
| 3     | Amit   |
| 4     | Sneha  |

**Department DataFrame**

| EmpID | Department |
| ----- | ---------- |
| 1     | IT         |
| 2     | HR         |
| 5     | Finance    |

### **Common Join Syntax**

```
df1.join(    df2,    df1.EmpID == df2.EmpID,    "inner")
```

### **1. Inner Join**

Returns only matching records from both DataFrames.

```
df1.join(df2, "EmpID", "inner").show()
```

Matching records only

### **2. Left Join (Left Outer Join)**

Returns all records from the left DataFrame and matching records from the right DataFrame.

If no match exists, right-side columns contain NULL.

```
df1.join(df2, "EmpID", "left").show()
```

### **3. Right Join (Right Outer Join)**

Returns all records from the right DataFrame and matching records from the left DataFrame.

```
df1.join(df2, "EmpID", "right").show()
```

### **4. Full Outer Join**

Returns all records from both DataFrames.

Non-matching records contain NULL values for the missing side.

```
df1.join(df2, "EmpID", "full").show()
```

### **5. Left Semi Join**

Returns only matching records from the left DataFrame.

It returns columns only from the left DataFrame.

```
df1.join(df2, "EmpID", "left_semi").show()
```

**Remember:** Left Semi Join works like an existence check.

### **6. Left Anti Join**

Returns records from the left DataFrame that do not have matching records in the right DataFrame.

```
df1.join(df2, "EmpID", "left_anti").show()
```

**Remember:** Left Anti Join is useful for finding missing or unmatched records.

### **7. Cross Join**

Returns the Cartesian product of both DataFrames.

If the first DataFrame has 4 records and the second has 3 records:

Total records = 4 × 3 = 12.

```
df1.crossJoin(df2).show()
```

### **Important Interview Point**

PySpark supports these join types and their aliases:

- `inner`
- `left`, `left_outer`, `leftouter`
- `right`, `right_outer`, `rightouter`
- `outer`, `full`, `full_outer`, `fullouter`
- `left_semi`, `leftsemi`, `semi`
- `left_anti`, `leftanti`, `anti`
- `cross`

**Important:** When joining using a common column name directly, such as `join(df2, "EmpID")`, Spark produces one shared join-key column. When using an equality condition, both key columns can remain in the result.

# **4. Union vs Union All in PySpark**

### **What is Union?**

Union combines records from two DataFrames by stacking one DataFrame's rows below another DataFrame's rows.

**Example:**

DataFrame 1:

| ID | Name   |
| -- | ------ |
| 1  | Ashish |
| 2  | Rahul  |

DataFrame 2:

| ID | Name  |
| -- | ----- |
| 2  | Rahul |
| 3  | Amit  |

### **1. Union**

In PySpark, `union()` combines two DataFrames and retains duplicate records.

```
df3 = df1.union(df2)df3.show()
```

### **2. Union All**

In PySpark, `unionAll()` also combines two DataFrames and retains duplicate records.

```
df3 = df1.unionAll(df2)df3.show()
```

### **3. Union with Duplicate Removal**

If you want to remove duplicate rows, use `distinct()` after union.

```
df3 = df1.union(df2).distinct()df3.show()
```

### **Important Difference**

| Operation            | Duplicate Records  |
| -------------------- | ------------------ |
| `union()`            | Retains duplicates |
| `unionAll()`         | Retains duplicates |
| `union().distinct()` | Removes duplicates |

**Important Interview Question:** Is there any difference between Union and Union All in PySpark?

**Answer:** Unlike SQL, PySpark's `union()` and `unionAll()` both retain duplicate records. To remove duplicates, use `distinct()` or `dropDuplicates()`.

### **Union by Column Name**

If two DataFrames have columns in different orders, use `unionByName()`.

```
df3 = df1.unionByName(df2)
```

If some columns are missing, you can use:

```
df3 = df1.unionByName(    df2,    allowMissingColumns=True)
```

**Important:** Union operations require compatible schemas. `union()` matches columns by position, whereas `unionByName()` matches columns by name.

# **5. Important Interview Questions – Day 1**

1. What is SparkSession in PySpark?
2. Why do we use `getOrCreate()`?
3. What is the difference between SparkContext and SparkSession?
4. How can we create a DataFrame in PySpark?
5. What is the difference between `show()` and `display()`?
6. What is the purpose of `printSchema()`?
7. What is the difference between `collect()` and `count()`?
8. What is an Inner Join?
9. What is the difference between Left Join and Right Join?
10. What is the difference between Full Outer Join and Inner Join?
11. What is Left Semi Join?
12. What is Left Anti Join?
13. What is Cross Join?
14. What is the difference between Union and Union All in PySpark?
15. What is the difference between `union()` and `unionByName()`?

# **6. Quick Revision – Day 1**

| Topic               | Remember                          |
| ------------------- | --------------------------------- |
| Spark Session       | Entry point to PySpark            |
| `getOrCreate()`     | Creates or reuses session         |
| `createDataFrame()` | Creates DataFrame                 |
| `read.csv()`        | Reads CSV file                    |
| `show()`            | Displays records                  |
| `printSchema()`     | Displays schema                   |
| Inner Join          | Matching records                  |
| Left Join           | All left + matching right         |
| Right Join          | All right + matching left         |
| Full Outer          | All records from both             |
| Left Semi           | Matching left records only        |
| Left Anti           | Non-matching left records         |
| Cross Join          | Cartesian product                 |
| Union               | Combines rows, retains duplicates |
| Union All           | Combines rows, retains duplicates |
| Distinct            | Removes duplicate rows            |
| Union By Name       | Matches columns by name           |
