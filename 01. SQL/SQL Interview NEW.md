If you're targeting **Senior Data Engineer / Data Engineer / SQL Developer (3–8+ years)** interviews at companies like Bajaj Finserv, TCS, Infosys, Accenture, Capgemini, Deloitte, Amazon, Microsoft, etc., these are the kinds of **theoretical, tricky, and thought-provoking SQL interview questions** that are asked.

---

# Top 50 Tricky SQL Interview Questions

## SQL Fundamentals

### 1. What is the difference between `WHERE` and `HAVING`?

> Follow-up:
> Can HAVING be used without GROUP BY?

---

### 2. What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?

Interview Twist:

* Which one can be rolled back?
* Which resets identity?
* Which logs every row?

---

### 3. What is NULL?

Follow-up:
Why is

```sql
NULL = NULL
```

False?

---

### 4. Difference between `COUNT(*)`, `COUNT(column)`, and `COUNT(DISTINCT column)`?

---

### 5. Why does SQL use Three-Valued Logic?

(TRUE, FALSE, UNKNOWN)

---

## Joins

### 6. Explain all JOIN types with real examples.

---

### 7. Difference between INNER JOIN and EXISTS?

When is EXISTS faster?

---

### 8. Difference between LEFT JOIN and NOT EXISTS?

---

### 9. Can FULL OUTER JOIN be replaced?

How?

---

### 10. Why does joining two tables sometimes create duplicate rows?

How do you fix it?

---

## GROUP BY

### 11. Why must every non-aggregated column appear in GROUP BY?

---

### 12. Difference between GROUP BY and DISTINCT?

---

### 13. Can GROUP BY return duplicate rows?

---

### 14. Execution order of GROUP BY?

---

### 15. What happens if GROUP BY contains NULL values?

---

## Window Functions

### 16. Difference between

* ROW_NUMBER()
* RANK()
* DENSE_RANK()

---

### 17. Why are window functions faster than correlated subqueries?

---

### 18. Can window functions be used in WHERE?

Why not?

---

### 19. Difference between PARTITION BY and GROUP BY?

---

### 20. Explain LAG() and LEAD() with practical scenarios.

---

## EXISTS vs IN

### 21. Difference between

```sql
IN
```

and

```sql
EXISTS
```

---

### 22. Difference between

```sql
NOT IN
```

and

```sql
NOT EXISTS
```

Very tricky.

---

### 23. Why does NOT IN fail when NULL exists?

---

### 24. Which is faster?

IN or EXISTS?

Depends on what?

---

## CTE & Subqueries

### 25. Difference between

* CTE
* Subquery
* Derived Table
* Temporary Table

---

### 26. Can CTE improve performance?

---

### 27. Recursive CTE use cases?

---

### 28. Correlated Subquery vs Non-correlated Subquery?

---

### 29. Can a CTE reference itself?

---

## Indexes

### 30. What is an Index?

---

### 31. Clustered vs Non-clustered Index?

---

### 32. Why do indexes make INSERT slower?

---

### 33. Why isn't every column indexed?

---

### 34. Composite Index

Why does index

```
(A,B,C)
```

not work for

```
WHERE B=10
```

---

### 35. What is Index Selectivity?

---

## Query Optimization

### 36. Explain Query Execution Order.

Actual order?

```
SELECT
FROM
JOIN
WHERE
GROUP BY
HAVING
WINDOW
SELECT
DISTINCT
ORDER BY
LIMIT
```

---

### 37. What is Predicate Pushdown?

---

### 38. What is Cardinality?

Why is it important?

---

### 39. What causes Full Table Scan?

---

### 40. Why is

```sql
SELECT *
```

considered bad?

---

## Transactions

### 41. What is ACID?

Explain every property.

---

### 42. What are Transaction Isolation Levels?

---

### 43. Explain

* Dirty Read
* Non-repeatable Read
* Phantom Read

---

### 44. What is Deadlock?

How do databases resolve it?

---

### 45. Difference between COMMIT and ROLLBACK?

---

## Advanced SQL

### 46. Explain Normalization.

Why isn't 6NF commonly used?

---

### 47. Difference between Primary Key, Unique Key, Candidate Key, Alternate Key, and Foreign Key?

---

### 48. What is Database Denormalization?

When should you use it?

---

### 49. Explain Materialized View vs View.

When should each be used?

---

### 50. Why can two SQL queries returning the same result have vastly different execution times?

What factors influence performance?

---

# Bonus: 15 Very Tricky Rapid-Fire Questions

1. Why is SQL called a declarative language?
2. Why is `ORDER BY` not guaranteed without explicitly specifying it?
3. Why are indexes not always used even if they exist?
4. Why can `DISTINCT` be expensive?
5. Can `UNION` remove duplicates? How?
6. Difference between `UNION` and `UNION ALL`?
7. Why is `LIMIT` applied after `ORDER BY`?
8. Difference between `CHAR` and `VARCHAR`?
9. What happens when an aggregate function encounters `NULL` values?
10. Can a foreign key reference a unique key instead of a primary key?
11. Can a table have multiple primary keys?
12. What is the difference between logical and physical database design?
13. Why is `EXPLAIN` important in query tuning?
14. What are covering indexes, and how do they improve performance?
15. Why is `COALESCE()` generally preferred over vendor-specific functions like `ISNULL()` or `NVL()` when writing portable SQL?

---

## Interview Tip

Many interviewers go beyond definitions and ask **"Why?"** questions to assess your understanding. Examples include:

* Why does `NOT IN` fail with `NULL` values?
* Why can an index slow down writes?
* Why is `EXISTS` often faster than `IN` for large datasets?
* Why can't window functions be used directly in the `WHERE` clause?
* Why does `GROUP BY` require all non-aggregated columns?
* Why can two identical-looking queries have very different execution plans?
* Why does a composite index follow the leftmost-prefix rule?
* Why does `COUNT(column)` ignore `NULL` while `COUNT(*)` does not?
* Why is `SELECT *` discouraged in production systems?
* Why do transaction isolation levels affect both consistency and concurrency?

These "why" questions are among the most frequently used to distinguish candidates with practical SQL expertise from those who have only memorized syntax.
