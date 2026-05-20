# PySpark Notes

## Getting started with PySpark

- SparkSession
- DataFrame operations
- RDD transformations

## Example

```python
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName('StudyPortal').getOrCreate()
df = spark.read.csv('employees.csv', header=True, inferSchema=True)
df.show()
```
