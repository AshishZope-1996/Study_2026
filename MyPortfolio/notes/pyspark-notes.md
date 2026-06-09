# PySpark Notes

## 1. Spark Fundamentals
- Use `SparkSession` to start distributed processing.
- Prefer DataFrame APIs for readability and performance.
- Use `select`, `filter`, `groupBy`, and `join` for transformations.

## 2. Optimization Tips
- Cache intermediate results when reused multiple times.
- Avoid small file reads and prefer partitioning strategies.
- Leverage built-in functions for faster and cleaner ETL logic.

## 3. Interview Angle
- Explain how you handle large datasets and distributed execution.
- Show how you validate output quality using counts and checkpoints.
- Mention how you optimize pipelines for scale and reliability.
