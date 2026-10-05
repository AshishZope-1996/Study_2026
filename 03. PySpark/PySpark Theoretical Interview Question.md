# PySpark Theoretical Interview Questions

## Basic → Intermediate → Advanced → Production



## 1. PySpark Fundamentals

### 1. What is PySpark?
> - PySpark is the Python API for Apache Spark, an open-source distributed computing framework designed for big data processing and analytics. 
> 
> - It allows developers to write Spark applications using Python, enabling them to leverage the power of Spark's distributed computing capabilities while using the familiar syntax and libraries of Python. 
> 
> - PySpark provides support for various data processing tasks, including batch processing, streaming, machine learning, and graph processing.

### 2. What is Apache Spark?
> - Apache Spark is an open-source distributed computing system that provides a fast and general-purpose cluster-computing framework for big data processing.

### 3. Why is Spark used for Big Data processing?
> - Spark is used for big data processing because it provides a unified analytics engine that can handle large-scale data processing tasks efficiently. 
> 
> - It offers in-memory computing capabilities, which significantly speeds up data processing compared to traditional disk-based systems. 
> 
> - Spark supports various data processing paradigms, including batch processing, streaming, machine learning, and graph processing, making it versatile for different use cases. 
> 
> - Additionally, Spark's ability to scale horizontally across clusters allows it to process massive datasets that cannot fit into a single machine's memory.

### 4. What are the major components of Apache Spark?
> The major components of Apache Spark include:
> 1. **Spark Core**: The foundation of Spark, providing essential functionalities such as task scheduling, memory management, fault recovery, and distributed data processing.
> 2. **Spark SQL**: A module for structured data processing that allows querying data using SQL and provides support for DataFrames and Datasets.
> 3. **Spark Streaming**: A module for processing real-time streaming data, enabling the development of applications that can handle continuous data streams.
> 4. **MLlib**: A machine learning library that provides various algorithms and utilities for building scalable machine learning models on large datasets.
> 5. **GraphX**: A library for graph processing and analysis, allowing users to work with graph data structures and perform graph-parallel computations.
> 6. **SparkR**: An R package that provides an interface for using Spark from the R programming language, enabling data scientists to leverage Spark's capabilities within the R environment.
> 7. **PySpark**: The Python API for Spark, allowing developers to write Spark applications using Python and access Spark's distributed computing capabilities.

### 5. What are the advantages of PySpark?
> The advantages of PySpark include:
> 1. **Ease of Use**: PySpark provides a simple and intuitive API for writing Spark applications in Python, making it easier for Python developers to leverage Spark's capabilities.
> 2. **Rich Ecosystem**: PySpark integrates seamlessly with the extensive Python ecosystem, allowing developers to utilize popular libraries such as Pandas, NumPy, and Scikit-learn alongside Spark.
> 3. **Productivity**: The Python language is known for its readability and ease of development, which enhances productivity when building Spark applications.
> 4. **Interactivity**: PySpark supports interactive development environments like Jupyter Notebooks, enabling data scientists and analysts to experiment with data and build models iteratively.

### 6. What are the limitations of PySpark?
> The limitations of PySpark include:
> 1. **Performance Overhead**: PySpark may introduce some performance overhead compared to native Spark implementations in Scala or Java, as it involves serialization and communication between the Python and JVM environments.
> 2. **Limited API Coverage**: While PySpark provides a comprehensive set of APIs, there may be certain advanced features or functionalities available in Scala or Java that are not fully supported in PySpark.
> 3. **Dependency Management**: Managing dependencies and ensuring compatibility between Python libraries and Spark versions can sometimes be challenging, especially when working with complex data processing pipelines.
> 4. **Resource Consumption**: PySpark applications may consume more memory and CPU resources compared to native Spark implementations, which can impact performance and scalability in certain scenarios.

### 7. What is the difference between Spark and PySpark?

| **Aspect**               | **Spark**                                                                                 | **PySpark**                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Definition**           | Apache Spark is a distributed computing engine/framework for large-scale data processing. | PySpark is the **Python API for Apache Spark**.                                                   |
| **Programming Language** | Primarily developed using **Scala**, with Java APIs also available.                       | Uses **Python** to interact with Spark.                                                           |
| **Purpose**              | Provides the core distributed processing engine.                                          | Allows Python developers to use Spark's distributed processing capabilities.                      |
| **Execution Engine**     | Spark's core engine executes the distributed workload.                                    | PySpark applications ultimately execute on the same Spark engine.                                 |
| **Ease of Use**          | Requires knowledge of Spark's native APIs/languages.                                      | Easier for Python developers because it uses Python syntax.                                       |
| **Performance**          | Native Scala Spark can have less Python serialization overhead.                           | Can have additional Python/JVM communication overhead in some operations, especially Python UDFs. |
| **Common Usage**         | Used for large-scale data processing, streaming, SQL, ML, and distributed computing.      | Widely used for Data Engineering, ETL, Data Analytics, and Databricks workloads.                  |

> Apache Spark is the core distributed computing framework used for large-scale data processing, while PySpark is the Python API that allows us to interact with Spark using Python. Spark is primarily developed in Scala and runs on the JVM, whereas PySpark enables Python developers to leverage Spark's distributed processing capabilities.
> 
> - Spark = distributed processing engine
> 
> - PySpark = Python API for Spark


### 8. What are the different APIs available in Spark?
| **API** | **Description** |
| ------- | --------------- |
| **Spark Core** | The foundational API for building distributed applications. |
| **Spark SQL** | API for working with structured and semi-structured data. |
| **Spark Streaming** | API for processing real-time streaming data. |
| **MLlib** | Machine learning library for scalable machine learning. |
| **GraphX** | API for graph processing and analysis. |


### 9. What is Spark SQL?
> Spark SQL is a module of Apache Spark used to process and analyze structured and semi-structured data using SQL queries and DataFrame APIs. 
> 
> It allows users to perform operations such as filtering, joining, grouping, and aggregating large datasets in a distributed manner. 
> 
> Spark SQL also uses the Catalyst Optimizer to optimize query execution.

### 10. What is a DataFrame in PySpark?
> A DataFrame in PySpark is a distributed collection of data organized into named columns, similar to a table in a relational database. 
> 
> It supports structured data processing and allows operations such as filtering, joining, grouping, and aggregation across large datasets. 
> 
> DataFrames also benefit from Spark's Catalyst Optimizer for efficient query execution.

### 11. What is an RDD?
> An RDD (Resilient Distributed Dataset) is the fundamental data structure of Spark. It is an immutable, fault-tolerant collection of elements that can be processed in parallel across a cluster.
> 
> RDDs are created by loading data from external storage systems (like HDFS, S3) or by transforming existing RDDs.
> 
> They support two types of operations: transformations (which create a new RDD from an existing one) and actions (which return a value to the driver program or write data to external storage).

### 12. What is the difference between RDD and DataFrame?

| Aspect           | RDD                                         | DataFrame                                                   |
| ---------------- | ------------------------------------------- | ----------------------------------------------------------- |
| **Definition**   | Low-level distributed collection of objects | Distributed collection of data organized into named columns |
| **Structure**    | Unstructured                                | Structured / semi-structured                                |
| **API Level**    | Low-level API                               | High-level API                                              |
| **Optimization** | Limited optimization                        | Optimized using **Catalyst Optimizer**                      |
| **Performance**  | Generally slower                            | Generally faster                                            |
| **Ease of Use**  | More complex                                | Easier to use                                               |
| **Data Type**    | Objects/records                             | Rows and columns                                            |
| **Use Case**     | Low-level/custom processing                 | ETL, SQL, analytics, data engineering                       |

> RDD is a low-level distributed data structure that provides more control but requires more manual processing. DataFrame is a high-level, structured API organized into rows and columns, which provides better optimization and performance through Spark's Catalyst Optimizer.


### 13. Why are DataFrames preferred over RDDs?
> DataFrames are preferred over RDDs for several reasons:
> 
> 1. **Ease of Use**: DataFrames provide a higher-level API that is easier to work with compared to the low-level RDD API. They allow developers to express complex data transformations and queries in a more concise and readable manner.
> 
> 2. **Performance**: DataFrames are optimized using Spark's Catalyst Optimizer, which can automatically optimize query execution plans for better performance. RDDs do not benefit from this optimization.
> 
> 3. **Structured Data**: DataFrames are designed to work with structured and semi-structured data, making them more suitable for tasks like ETL, SQL queries, and analytics. RDDs are unstructured and require more manual handling of data.
> 
> 4. **Integration with SQL**: DataFrames can be easily queried using SQL syntax, allowing developers to leverage their existing SQL knowledge. RDDs do not have built-in support for SQL queries.


### 14. What is a Dataset?
> A Dataset is a distributed collection of data that combines the benefits of RDDs and DataFrames. It provides the type safety and object-oriented programming features of RDDs while also offering the optimizations and high-level API of DataFrames.

### 15. What is SparkSession?
> SparkSession is the entry point to programming with Spark. 
> 
> It provides a unified interface for interacting with Spark's various components, including Spark SQL, DataFrames, and Datasets.

### 16. What is SparkContext?
> SparkContext is the entry point for low-level Spark functionality. 
> 
> It represents the connection to a Spark cluster and allows users to create RDDs, accumulators, and broadcast variables.

### 17. What is the difference between SparkSession and SparkContext?
| Aspect | SparkSession | SparkContext |
| ------ | ------------ | ------------ |
| **Definition** | Entry point for high-level Spark APIs (DataFrames, Datasets, SQL) | Entry point for low-level Spark functionality (RDDs, accumulators, broadcast variables) |
| **Purpose** | Provides a unified interface for interacting with Spark's components | Represents the connection to a Spark cluster and allows users to create RDDs and other low-level constructs |

### 18. Do we need to create a SparkSession every time?
> No, you do not need to create a new SparkSession every time. 
> 
> You can use the existing SparkSession instance throughout your application. 
> 
> The `getOrCreate()` method can be used to either retrieve the existing SparkSession or create a new one if it does not already exist. 
> 
> This helps in managing resources efficiently and avoids unnecessary overhead of creating multiple SparkSession instances.

### 19. What happens when `getOrCreate()` is used?
> When `getOrCreate()` is used, Spark checks if a SparkSession already exists in the current context.
> 
> - If a SparkSession exists, it returns the existing instance.
> 
> - If no SparkSession exists, it creates a new one with the specified configuration and returns it.

### 20. What is the role of a Spark application?
> A Spark application is a self-contained program that runs on a Spark cluster and performs data processing tasks.

## 2. Spark Architecture

### 21. Explain Spark architecture.
> Spark architecture consists of a cluster manager and worker nodes. 
> 
> The cluster manager is responsible for managing the resources and scheduling tasks, while the worker nodes execute the tasks.


### 22. What is a Driver?

### 23. What is an Executor?

### 24. What is a Cluster Manager?

### 25. What is the relationship between Driver and Executor?

### 26. What responsibilities does the Driver have?

### 27. What responsibilities does an Executor have?

### 28. What is a worker node?

### 29. What is a cluster?

### 30. What is a Spark application?

### 31. What happens when a Spark application starts?

### 32. How does the Driver communicate with Executors?

### 33. Can a Spark application have multiple Drivers?

### 34. What happens if the Driver fails?

### 35. What happens if an Executor fails?

### 36. How does Spark achieve fault tolerance?



## 3. DataFrames

### 37. What is a PySpark DataFrame?

### 38. How do you create a DataFrame?

### 39. How do you read a CSV file?

### 40. How do you read JSON data?

### 41. How do you read Parquet data?

### 42. How do you read Delta data?

### 43. What is schema inference?

### 44. What are the disadvantages of `inferSchema=True`?

### 45. Why should we define an explicit schema?

### 46. What is `StructType`?

### 47. What is `StructField`?

### 48. What are common PySpark data types?

### 49. How do you inspect a DataFrame schema?

### 50. What is the difference between `show()`, `head()`, `first()` and `collect()`?



## 4. Transformations

### 51. What is a transformation?

### 52. What is an action?

### 53. What is lazy evaluation?

### 54. Why does Spark use lazy evaluation?

### 55. Give examples of transformations.

### 56. Give examples of actions.

### 57. What is the difference between transformation and action?

### 58. Is `groupBy()` a transformation or an action?

### 59. Is `show()` a transformation or an action?

### 60. Is `write()` an action?

### 61. What happens internally when an action is called?



## 5. Narrow and Wide Transformations

### 62. What is a narrow transformation?

### 63. What is a wide transformation?

### 64. What is the difference between narrow and wide transformations?

### 65. Give examples of narrow transformations.

### 66. Give examples of wide transformations.

### 67. Why are wide transformations expensive?

### 68. What is shuffle?

### 69. Why does shuffle happen?

### 70. Which operations cause shuffle?

### 71. Does `filter()` cause shuffle?

### 72. Does `select()` cause shuffle?

### 73. Does `groupBy()` cause shuffle?

### 74. Does `orderBy()` cause shuffle?

### 75. Does `distinct()` cause shuffle?



## 6. Partitions

### 76. What is a partition?

### 77. Why does Spark divide data into partitions?

### 78. How does partitioning improve performance?

### 79. What happens if there are too few partitions?

### 80. What happens if there are too many partitions?

### 81. What is `repartition()`?

### 82. What is `coalesce()`?

### 83. Difference between `repartition()` and `coalesce()`?

### 84. Can `repartition()` increase partitions?

### 85. Can `coalesce()` increase partitions?

### 86. Does `repartition()` cause shuffle?

### 87. Does `coalesce()` cause shuffle?

### 88. How do you decide the number of partitions?



## 7. Spark Execution

### 89. What is a Job?

### 90. What is a Stage?

### 91. What is a Task?

### 92. Explain Job → Stage → Task.

### 93. What creates a new Spark Job?

### 94. What creates a new Stage?

### 95. What is a stage boundary?

### 96. What is an Exchange operator?

### 97. What is a task?

### 98. How many tasks are created for a partition?

### 99. How are tasks distributed across Executors?

### 100. What is task parallelism?



## 8. Lazy Evaluation

### 101. Explain lazy evaluation with an example.

### 102. Why doesn't Spark immediately execute transformations?

### 103. What are the benefits of lazy evaluation?

### 104. What is a logical execution plan?

### 105. What is a physical execution plan?

### 106. What is lineage?

### 107. How does Spark use lineage for fault tolerance?



## 9. Catalyst Optimizer

### 108. What is Catalyst Optimizer?

### 109. Why is Catalyst important?

### 110. What are the stages of query optimization?

### 111. What is an unresolved logical plan?

### 112. What is an analyzed logical plan?

### 113. What is an optimized logical plan?

### 114. What is a physical plan?

### 115. What is predicate pushdown?

### 116. What is column pruning?

### 117. What is constant folding?

### 118. How does Catalyst optimize joins?



## 10. Tungsten

### 119. What is Project Tungsten?

### 120. What problem does Tungsten solve?

### 121. What is whole-stage code generation?

### 122. How is Tungsten different from Catalyst?

Remember:

```text
Catalyst
→ Query optimization

Tungsten
→ Efficient execution
```



## 11. Joins

### 123. What is a join?

### 124. What types of joins are supported by PySpark?

### 125. Explain INNER JOIN.

### 126. Explain LEFT JOIN.

### 127. Explain RIGHT JOIN.

### 128. Explain FULL OUTER JOIN.

### 129. What is CROSS JOIN?

### 130. What is LEFT SEMI JOIN?

### 131. What is LEFT ANTI JOIN?

### 132. Difference between LEFT SEMI and LEFT ANTI join?

### 133. What is a broadcast join?

### 134. When should you use a broadcast join?

### 135. What are the advantages of broadcast join?

### 136. What are the disadvantages of broadcast join?

### 137. What happens if you broadcast a very large table?

### 138. What is Sort Merge Join?

### 139. What is Shuffle Hash Join?

### 140. What is Broadcast Hash Join?

### 141. How does Spark decide which join strategy to use?



## 12. Data Skew

### 142. What is data skew?

### 143. Why is data skew a problem?

### 144. How can you identify data skew?

### 145. How can you handle data skew?

### 146. What is salting?

### 147. Explain salting with an example.

### 148. How does AQE help with skew?

### 149. What is a skewed join?

### 150. What is a straggler task?



## 13. Aggregations

### 151. What happens internally during `groupBy()`?

### 152. Why is `groupBy()` expensive?

### 153. What is partial aggregation?

### 154. What is shuffle aggregation?

### 155. Difference between `groupBy().count()` and `count()`?

### 156. What is `agg()`?

### 157. What is `countDistinct()`?

### 158. Difference between `collect_list()` and `collect_set()`?



## 14. Window Functions

### 159. What is a window function?

### 160. Why are window functions used?

### 161. What is `Window.partitionBy()`?

### 162. What is `Window.orderBy()`?

### 163. Difference between `row_number()`, `rank()` and `dense_rank()`?

### 164. What is `lag()`?

### 165. What is `lead()`?

### 166. How do you find the second-highest salary per department?

### 167. How do you find the top 3 employees per department?

### 168. How do you calculate a running total?

### 169. How do you calculate previous month's value?

### 170. Why can window functions be expensive?



## 15. UDF

### 171. What is a UDF?

### 172. Why are Python UDFs generally slower than built-in functions?

### 173. What is a Pandas UDF?

### 174. What is vectorization?

### 175. When should you use a UDF?

### 176. When should you avoid a UDF?

### 177. What is Apache Arrow?

### 178. How does Arrow improve Pandas UDF performance?



## 16. Cache and Persistence

### 179. What is caching?

### 180. Why do we cache DataFrames?

### 181. What is `cache()`?

### 182. What is `persist()`?

### 183. Difference between cache and persist?

### 184. When should you cache a DataFrame?

### 185. When should you NOT cache?

### 186. What happens if you cache a huge DataFrame?

### 187. What does `unpersist()` do?

### 188. Is cache automatically triggered immediately?

Important:

```text
cache()
   ↓
lazy

First action
   ↓
data gets materialized
```



## 17. collect()

### 189. What does `collect()` do?

### 190. Why is `collect()` dangerous for large datasets?

### 191. What is driver OOM?

### 192. Difference between `collect()` and `show()`?

### 193. When is `collect()` acceptable?



## 18. File Formats

### 194. What is CSV?

### 195. What is Parquet?

### 196. What is Delta Lake?

### 197. Why is Parquet better than CSV for analytics?

### 198. What is a columnar format?

### 199. What is row-based storage?

### 200. What is compression?

### 201. What is predicate pushdown in Parquet?

### 202. What is column pruning in Parquet?



## 19. Delta Lake

### 203. What is Delta Lake?

### 204. Why do we need Delta Lake?

### 205. What is ACID?

### 206. How does Delta provide ACID transactions?

### 207. What is schema enforcement?

### 208. What is schema evolution?

### 209. What is Delta Time Travel?

### 210. What is Delta versioning?

### 211. What is `MERGE`?

### 212. Why is MERGE useful?

### 213. What is `OPTIMIZE`?

### 214. What is `VACUUM`?

### 215. What is the difference between OPTIMIZE and VACUUM?

### 216. What is Delta transaction log?

### 217. What information is stored in the Delta transaction log?



## 20. SCD

### 218. What is a Slowly Changing Dimension?

### 219. What is SCD Type 1?

### 220. What is SCD Type 2?

### 221. Difference between Type 1 and Type 2?

### 222. How do you implement SCD Type 2 using Delta MERGE?

### 223. What columns are commonly used for SCD Type 2?

Example:

```text
start_date
end_date
is_current
```



## 21. Partitioning and Bucketing

### 224. What is partitioning?

### 225. Why do we partition data?

### 226. What is partition pruning?

### 227. What columns should be used for partitioning?

### 228. What is high-cardinality partitioning?

### 229. Why can high-cardinality partitioning be bad?

### 230. What is bucketing?

### 231. Difference between partitioning and bucketing?



## 22. Performance Optimization

### 232. How do you optimize a PySpark job?

### 233. What is predicate pushdown?

### 234. What is column pruning?

### 235. How can you reduce shuffle?

### 236. How can you optimize joins?

### 237. How can you handle skew?

### 238. How can you optimize partition count?

### 239. Why should unnecessary UDFs be avoided?

### 240. Why should unnecessary `distinct()` be avoided?

### 241. Why should unnecessary `orderBy()` be avoided?

### 242. Why is `collect()` discouraged?

### 243. How do you optimize small-file problems?

### 244. What is partition pruning?

### 245. What is Adaptive Query Execution?



## 23. Adaptive Query Execution

### 246. What is AQE?

### 247. Why was AQE introduced?

### 248. How does AQE improve Spark performance?

### 249. How does AQE handle skew?

### 250. How does AQE change join strategies?

### 251. What is dynamic partition coalescing?



## 24. Structured Streaming

### 252. What is Structured Streaming?

### 253. How is Structured Streaming different from batch processing?

### 254. What is a streaming DataFrame?

### 255. What is a streaming query?

### 256. What is a checkpoint?

### 257. Why are checkpoints required?

### 258. What is a watermark?

### 259. Why do we need watermarks?

### 260. What is late-arriving data?

### 261. What are output modes?

### 262. Explain append mode.

### 263. Explain complete mode.

### 264. Explain update mode.

### 265. What is event time?

### 266. What is processing time?

### 267. Difference between event time and processing time?

### 268. What is exactly-once processing?

### 269. What is at-least-once processing?



## 25. RDD

### 270. What does RDD stand for?

### 271. What are the characteristics of RDD?

### 272. Why is RDD fault tolerant?

### 273. What is RDD lineage?

### 274. What is `map()`?

### 275. What is `flatMap()`?

### 276. What is `reduceByKey()`?

### 277. What is `groupByKey()`?

### 278. Difference between `reduceByKey()` and `groupByKey()`?

### 279. Why is `reduceByKey()` generally preferred?

### 280. Why are RDDs less commonly used in modern Data Engineering?



## 26. Spark Memory

### 281. How does Spark manage memory?

### 282. What is executor memory?

### 283. What is driver memory?

### 284. What is memory overhead?

### 285. What causes executor OOM?

### 286. What causes driver OOM?

### 287. How can you avoid memory issues?

### 288. What happens when cached data doesn't fit in memory?



## 27. Spark UI

### 289. What is Spark UI?

### 290. Why is Spark UI useful?

### 291. What information can you get from Spark UI?

### 292. How do you identify a slow stage?

### 293. How do you identify data skew in Spark UI?

### 294. How do you identify shuffle?

### 295. How do you identify executor problems?

### 296. How do you debug a failed Spark job?



## 28. Databricks

### 297. What is Databricks?

### 298. What is a Databricks workspace?

### 299. What is Databricks compute?

### 300. What is Serverless compute?

### 301. What is Dedicated compute?

### 302. What is a Databricks cluster?

### 303. What is Unity Catalog?

### 304. What is a catalog?

### 305. What is a schema?

### 306. What is a table?

### 307. Explain the three-level namespace.

```text
catalog.schema.table
```

### 308. Managed vs external table?

### 309. What are Databricks Workflows?

### 310. What is a Databricks Job?



## 29. Medallion Architecture

### 311. What is Medallion Architecture?

### 312. What is Bronze layer?

### 313. What is Silver layer?

### 314. What is Gold layer?

### 315. Why do we separate Bronze, Silver and Gold?

### 316. Where should data cleansing happen?

### 317. Where should business aggregations happen?

### 318. How would you design a production PySpark pipeline using Medallion Architecture?



## 30. Incremental Processing

### 319. What is incremental processing?

### 320. Full load vs incremental load?

### 321. Why is incremental processing important?

### 322. What is CDC?

### 323. What is a watermark column in batch processing?

### 324. How would you process only newly arrived records?

### 325. How would you handle updated records?

### 326. How would you prevent duplicate processing?

### 327. What is idempotency?

### 328. Why is idempotency important in Data Engineering?



## 31. Production-Level Questions

### 329. How would you design a PySpark pipeline for 1 TB of data?

### 330. How would you process 1 billion records?

### 331. How would you handle a job that suddenly became slow?

### 332. How would you handle executor OOM?

### 333. How would you handle driver OOM?

### 334. How would you handle data skew?

### 335. How would you handle small files?

### 336. How would you handle duplicate records?

### 337. How would you handle bad records?

### 338. How would you implement data quality checks?

### 339. How would you implement retry logic?

### 340. How would you make a PySpark pipeline idempotent?

### 341. How would you monitor a production Spark pipeline?

### 342. How would you implement logging?

### 343. How would you implement alerting?

### 344. How would you recover from a failed pipeline?



## 32. Very Important "Explain Internally" Questions

These are particularly important for a Senior Data Engineer interview.

### 345. What happens internally when you execute:

```python
df.filter(col("salary") > 1000000).show()
```

### 346. What happens internally when you execute:

```python
df.groupBy("department").count().show()
```

### 347. What happens internally during a join?

### 348. What happens internally during a shuffle?

### 349. What happens internally when `repartition()` is called?

### 350. What happens internally when `cache()` is called?

### 351. What happens internally when `collect()` is called?

### 352. What happens internally when Spark writes a DataFrame to Delta?

### 353. How does Spark recover from executor failure?

### 354. How does Spark recover lost partitions?



## 33. Most Important Senior-Level Questions

If you are interviewing for a **Senior Data Engineer / 5+ years role**, prioritize these:

### Spark Internals

1. Explain Driver, Executor and Cluster Manager.
2. Explain Job → Stage → Task.
3. Explain lazy evaluation.
4. Explain lineage.
5. Explain narrow vs wide transformations.
6. Explain shuffle.
7. Explain Catalyst.
8. Explain Tungsten.
9. Explain AQE.

### Performance

10. How do you optimize a Spark job?
11. How do you handle data skew?
12. How do you optimize joins?
13. Broadcast join vs Sort Merge Join?
14. How do you determine partition count?
15. How do you solve small-file problems?
16. How do you debug a slow Spark job?
17. How do you debug OOM?
18. How do you reduce shuffle?

### Data Engineering

19. Full load vs incremental load.
20. What is CDC?
21. What is idempotency?
22. Explain SCD Type 1 and Type 2.
23. Explain Delta MERGE.
24. Explain Delta Time Travel.
25. Explain Bronze/Silver/Gold.

### Streaming

26. Structured Streaming.
27. Watermark.
28. Checkpoint.
29. Event time vs processing time.
30. Exactly-once semantics.



## 34. Rapid-Fire Round

Be able to answer these in 10–20 seconds each:

1. What is PySpark?
2. What is Spark?
3. What is DataFrame?
4. What is RDD?
5. What is SparkSession?
6. What is lazy evaluation?
7. Transformation vs action?
8. Narrow vs wide transformation?
9. What is shuffle?
10. What is partition?
11. repartition vs coalesce?
12. What is broadcast join?
13. What is data skew?
14. What is salting?
15. What is cache?
16. What is persist?
17. What is Catalyst?
18. What is Tungsten?
19. What is AQE?
20. What is UDF?
21. What is Pandas UDF?
22. What is Parquet?
23. What is Delta Lake?
24. What is Time Travel?
25. What is MERGE?
26. What is SCD Type 2?
27. What is partition pruning?
28. What is predicate pushdown?
29. What is checkpoint?
30. What is watermark?
31. What is idempotency?
32. What is incremental processing?
33. What is Medallion Architecture?
34. What is Unity Catalog?
35. What is Spark UI?



## 35. The Interviewer's Follow-Up Pattern

For almost every PySpark question, expect the interviewer to go one level deeper.

Example:

**Interviewer:** What is broadcast join?

You:

> Broadcast join sends a small dataset to the executors so Spark can avoid shuffling the large dataset.

Then expect:

**Follow-up 1:** How does it improve performance?

**Follow-up 2:** What happens if the broadcast table is too large?

**Follow-up 3:** How do you force a broadcast?

**Follow-up 4:** How do you identify whether Spark used broadcast join?

**Follow-up 5:** What other join strategies exist?



## 36. Your Priority Order

For your current Senior Data Engineer preparation, revise in this order:

```text
LEVEL 1
PySpark basics
DataFrames
Transformations
Actions
Functions
        ↓
LEVEL 2
Aggregations
Joins
Window Functions
        ↓
LEVEL 3
Partitions
Shuffle
Repartition
Coalesce
        ↓
LEVEL 4
Spark Architecture
Jobs
Stages
Tasks
        ↓
LEVEL 5
Catalyst
Tungsten
AQE
        ↓
LEVEL 6
Performance Optimization
Broadcast
Skew
Salting
Caching
        ↓
LEVEL 7
Parquet
Delta Lake
MERGE
Time Travel
SCD
        ↓
LEVEL 8
Streaming
Checkpoint
Watermark
        ↓
LEVEL 9
Databricks
Unity Catalog
Medallion Architecture
        ↓
LEVEL 10
Production Scenarios
System Design
Debugging
Optimization
```

## Final Interview Rule

Don't memorize only definitions.

For every major concept, prepare these **5 things**:

```text
1. What is it?
2. Why is it used?
3. How does it work internally?
4. When should you use it?
5. What are its limitations/trade-offs?
```

For example, for **Broadcast Join**, you should be able to explain:

```text
Definition
   ↓
Why it improves performance
   ↓
How data moves
   ↓
When to use it
   ↓
When NOT to use it
   ↓
How to verify it in Spark UI / explain()
```

That style of preparation will take you from **"I know PySpark syntax"** to **"I understand PySpark as a Data Engineer."**

