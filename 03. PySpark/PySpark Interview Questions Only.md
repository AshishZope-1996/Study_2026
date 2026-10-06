## PySpark Interview Questions — Beginner to Advanced

### 🟢 Level 1 — PySpark & Spark Basics

### 1. What is Apache Spark?

> **Apache Spark is an open-source, distributed data processing framework used to process large volumes of data efficiently across multiple machines. It supports batch processing, SQL analytics, real-time streaming, machine learning, and graph processing.**

1. What is PySpark?
2. What is the difference between Spark and PySpark?
3. Why is Spark faster than traditional MapReduce?
4. What are the main components of Apache Spark?
5. What is Spark Core?
6. What is Spark SQL?
7. What is Spark Streaming?
8.  What is MLlib?
9.  What is GraphX?
10. What is a Spark application?
11. What is a SparkSession?
12. What is a SparkContext?
13. Do we need to create a SparkSession every time?
14. What is a DataFrame in PySpark?
15. What is an RDD?
16. What is a Dataset?
17. Difference between RDD, DataFrame, and Dataset.
18. Why are DataFrames preferred over RDDs?
19. What is a schema?
20. What is schema inference?
21. What is an explicit schema?
22. How do you create a DataFrame?
23. How do you read a CSV file?
24. How do you read a JSON file?
25. How do you read a Parquet file?
26. How do you display a DataFrame?
27. Difference between `show()` and `display()`.
28. How do you check DataFrame schema?
29. How do you get the number of rows and columns?

---

# 🟢 Level 2 — DataFrame Operations

31. How do you select columns in PySpark?
32. How do you rename a column?
33. How do you add a new column?
34. How do you remove a column?
35. How do you filter records?
36. Difference between `filter()` and `where()`.
37. How do you filter using multiple conditions?
38. How do you use `isin()`?
39. How do you use `between()`?
40. How do you sort a DataFrame?
41. Difference between `sort()` and `orderBy()`.
42. How do you use ascending and descending order?
43. How do you remove duplicate records?
44. Difference between `distinct()` and `dropDuplicates()`.
45. How do you handle NULL values?
46. Difference between `dropna()`, `fillna()`, and `replace()`.
47. How do you use `when()` and `otherwise()`?
48. How do you use `lit()`?
49. What is `alias()`?
50. What is `selectExpr()`?
51. How do you perform calculations on columns?
52. How do you concatenate columns?
53. How do you convert data types?
54. What is `cast()`?
55. How do you extract year/month/day from a date?
56. How do you work with timestamps?
57. How do you calculate date differences?
58. How do you extract data from a string?
59. How do you split a string column?
60. How do you work with arrays?

---

# 🟡 Level 3 — Aggregations & Joins

61. What is aggregation in PySpark?
62. How does `groupBy()` work?
63. Explain `count()`, `sum()`, `avg()`, `min()`, and `max()`.
64. How do you perform multiple aggregations?
65. What is `countDistinct()`?
66. Difference between `count()` and `countDistinct()`.
67. How do you group by multiple columns?
68. How do you filter aggregated results?
69. Difference between `filter()` and `having()` conceptually.
70. What is a join?
71. What are the different types of joins in PySpark?
72. Explain INNER JOIN.
73. Explain LEFT JOIN.
74. Explain RIGHT JOIN.
75. Explain FULL OUTER JOIN.
76. Explain LEFT SEMI JOIN.
77. Explain LEFT ANTI JOIN.
78. What is a CROSS JOIN?
79. How do you join two DataFrames?
80. What happens when join keys contain NULLs?
81. How do you handle duplicate column names after a join?
82. How do you join DataFrames using multiple columns?
83. What is a broadcast join?
84. When should you use a broadcast join?
85. What happens if you broadcast a very large DataFrame?
86. How do you identify duplicate records after joining?

---

# 🟡 Level 4 — Transformations & Actions

87. What is a transformation?
88. What is an action?
89. Difference between transformation and action.
90. What are narrow transformations?
91. What are wide transformations?
92. Give examples of narrow transformations.
93. Give examples of wide transformations.
94. What is lazy evaluation?
95. Why does Spark use lazy evaluation?
96. What happens when you call `filter()`?
97. When does Spark actually execute transformations?
98. What is a DAG?
99. What is a Spark job?
100. What is a stage?
101. What is a task?
102. Explain Job → Stage → Task.
103. What causes a stage boundary?
104. What is a shuffle?
105. Why is shuffle expensive?

---

# 🟠 Level 5 — Window Functions

106. What is a Window Function?
107. Why do we use Window Functions?
108. What is `Window.partitionBy()`?
109. What is `orderBy()` inside a Window?
110. Explain `row_number()`.
111. Explain `rank()`.
112. Explain `dense_rank()`.
113. Difference between `rank()` and `dense_rank()`.
114. Explain `lag()`.
115. Explain `lead()`.
116. How do you find the second-highest salary?
117. How do you find the highest-paid employee per department?
118. How do you find the top 3 employees per department?
119. How do you calculate running totals?
120. How do you calculate cumulative averages?
121. How do you compare the current row with the previous row?
122. How do you identify duplicate records using Window Functions?
123. How do you get the latest record for each customer?

---

# 🟠 Level 6 — UDF & Advanced Functions

124. What is a UDF?
125. Why should UDFs generally be avoided?
126. What is a Python UDF?
127. What is a Pandas UDF?
128. Difference between Python UDF and Pandas UDF.
129. What is `mapInPandas()`?
130. What is `mapInArrow()`?
131. When would you use a UDF?
132. How can you replace a UDF with built-in Spark functions?
133. Why are built-in functions usually faster?
134. What are higher-order functions?
135. Explain `transform()`.
136. Explain `filter()` for arrays.
137. Explain `explode()`.
138. Difference between `explode()` and `posexplode()`.
139. What is `collect_list()`?
140. Difference between `collect_list()` and `collect_set()`.

---

# 🔴 Level 7 — Partitioning & Performance

141. What is partitioning in Spark?
142. Why is partitioning important?
143. What is a Spark partition?
144. How do you check the number of partitions?
145. What is `repartition()`?
146. What is `coalesce()`?
147. Difference between `repartition()` and `coalesce()`.
148. When should you use `repartition()`?
149. When should you use `coalesce()`?
150. What is data skew?
151. How do you identify data skew?
152. What causes data skew?
153. How can you solve data skew?
154. What is a skewed join?
155. What is salting?
156. Explain salting with an example.
157. What is partition pruning?
158. What is predicate pushdown?
159. What is column pruning?
160. What is caching?
161. What is persistence?
162. Difference between `cache()` and `persist()`.
163. When should you cache a DataFrame?
164. When should you NOT cache?
165. What is `unpersist()`?
166. What is broadcast optimization?
167. What is Adaptive Query Execution (AQE)?
168. How does AQE improve performance?
169. What is dynamic partition coalescing?
170. What is dynamic join selection?

---

# 🔴 Level 8 — Spark SQL & Catalyst

171. What is Spark SQL?
172. How is Spark SQL different from DataFrame API?
173. What is Catalyst Optimizer?
174. What is Tungsten?
175. What is query optimization?
176. What is logical plan?
177. What is physical plan?
178. What is an optimized logical plan?
179. How do you inspect the execution plan?
180. What does `explain()` do?
181. What is WholeStageCodegen?
182. How does Spark optimize DataFrame operations?
183. What is predicate pushdown?
184. What is projection/column pruning?
185. What is constant folding?
186. What is join reordering?
187. How does Spark select a join strategy?

---

# 🔴 Level 9 — File Formats & Data Engineering

188. Difference between CSV, JSON, Parquet and ORC.
189. Why is Parquet preferred for Data Engineering?
190. What is a columnar file format?
191. What is compression?
192. Which compression formats are commonly used?
193. What is Snappy?
194. How does Spark read Parquet efficiently?
195. What is partitioned data?
196. What is bucketing?
197. Difference between partitioning and bucketing.
198. What is schema evolution?
199. How do you handle schema changes?
200. How do you process millions/billions of records efficiently?

---

# 🔴 Level 10 — Delta Lake & Databricks

201. What is Delta Lake?
202. Why use Delta instead of Parquet?
203. What is ACID in Delta Lake?
204. What is a Delta table?
205. What is Delta transaction log?
206. What is Delta Time Travel?
207. How do you perform Time Travel?
208. How do you restore an older version?
209. What is `OPTIMIZE`?
210. What is `ZORDER`?
211. What is Liquid Clustering?
212. What is `VACUUM`?
213. Difference between `OPTIMIZE` and `VACUUM`.
214. What is schema enforcement?
215. What is schema evolution?
216. How do you enable schema evolution?
217. What is `MERGE INTO`?
218. How do you implement UPSERT?
219. How do you implement CDC using Delta?
220. How do you handle late-arriving data?
221. What is Change Data Feed (CDF)?
222. What is Delta Live Tables / Lakeflow Declarative Pipelines?
223. What is Unity Catalog?
224. Explain Catalog → Schema → Table.
225. Managed vs external tables.

---

# 🔥 Level 11 — Real-World Scenario Questions

226. You have **1 billion records**. How would you process them efficiently?

227. A Spark job suddenly became **3 hours instead of 20 minutes**. How would you troubleshoot?

228. One partition contains 80% of your data. What would you do?

229. A join between two huge tables is extremely slow. How would you optimize it?

230. One DataFrame is 500 MB and another is 500 GB. How would you join them?

231. Your Spark application is running out of memory. What would you check?

232. You have millions of small files. How would you solve the small-file problem?

233. Your job creates too many output files. How would you control them?

234. How would you design an incremental PySpark pipeline?

235. How would you process only newly arrived records?

236. How would you implement an idempotent pipeline?

237. How would you handle duplicate records?

238. How would you implement SCD Type 1?

239. How would you implement SCD Type 2?

240. How would you handle late-arriving records?

241. How would you handle bad/corrupt records?

242. How would you implement data-quality checks?

243. How would you implement reconciliation between source and target?

244. Source has **100 million records**, target has **99.9 million**. How would you investigate?

245. How would you validate that source and target data are identical?

---

# 🚀 Level 12 — Senior Data Engineer Questions

246. Explain complete Spark architecture.

247. Explain Driver, Executor, Cluster Manager and Worker Node.

248. What happens internally when you execute:

```python
df.filter(col("salary") > 50000).groupBy("department").count().show()
```

249. Explain the complete lifecycle of a Spark job.

250. Explain DAG → Stage → Task with a real example.

251. Explain Spark shuffle in detail.

252. How does Spark handle failures?

253. What is fault tolerance?

254. What is lineage?

255. What happens if an Executor fails?

256. How does Spark recover lost data?

257. What is speculative execution?

258. How do you tune Spark memory?

259. What are driver-memory and executor-memory?

260. What is executor core?

261. How do you decide the number of executors?

262. What is dynamic allocation?

263. What is executor OOM?

264. What is driver OOM?

265. How do you troubleshoot both?

---

# 💀 Level 13 — Expert / Production Scenarios

266. Design a PySpark pipeline processing **10 TB/day**.

267. Design a CDC pipeline using PySpark + Delta Lake.

268. Design a real-time pipeline using Kafka + Spark Structured Streaming.

269. How would you handle exactly-once processing?

270. What is checkpointing?

271. What is watermarking?

272. Difference between event time and processing time.

273. How do you handle late-arriving events in Structured Streaming?

274. What are output modes in Structured Streaming?

275. Explain append, update and complete modes.

276. What is a streaming trigger?

277. How do you recover a failed streaming job?

278. How do you design a restartable Spark pipeline?

279. How do you monitor Spark jobs in production?

280. What metrics would you monitor?

281. How would you reduce a Spark job from 2 hours to 15 minutes?

282. How would you debug a job with high shuffle read/write?

283. How would you debug executor GC problems?

284. How would you solve a massive data-skew problem?

285. How would you design a scalable Medallion Architecture?

286. Explain Bronze → Silver → Gold architecture.

287. How would you implement data quality across Bronze, Silver and Gold?

288. How would you implement audit logging?

289. How would you implement reconciliation?

290. How would you design a fault-tolerant ETL pipeline?

---

## ⭐ Most Important Questions for Your Interview

If you're preparing for a **Senior Data Engineer** role, don't try to memorize all 290 equally.

Focus heavily on these:

**Must Know 🔥**

* Spark vs PySpark
* DataFrame vs RDD
* SparkSession
* Transformations vs Actions
* Lazy Evaluation
* Narrow vs Wide Transformation
* DAG / Job / Stage / Task
* Shuffle
* Joins
* Broadcast Join
* Window Functions
* `repartition()` vs `coalesce()`
* Data Skew
* Salting
* Caching
* AQE
* Catalyst Optimizer
* Predicate Pushdown
* Partition Pruning
* Parquet
* Delta Lake
* Time Travel
* `MERGE`
* SCD Type 1/2
* CDC
* Structured Streaming
* Checkpointing
* Watermarking
* Spark memory
* Driver vs Executor
* Performance optimization
* Real-world troubleshooting

### 🎯 Final Interview Rule

For every important PySpark concept, prepare these **4 things**:

> **1. What is it? → 2. Why is it used? → 3. How does it work? → 4. Give a real-world example.**

That approach will take you from **“I know PySpark syntax”** to **“I can answer Senior Data Engineer interview questions.”**
