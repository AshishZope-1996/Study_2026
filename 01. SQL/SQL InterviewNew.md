# SQL Interview Question: Delete Duplicate Rows

## Scenario

An `employees` table contains duplicate records due to multiple data imports. You need to remove duplicate rows while keeping only one record.

### Sample Table


emp_id | emp_name | email              | salary
-------|----------|--------------------|--------
1      | Amit     | amit@gmail.com     | 50000
2      | Rahul    | rahul@gmail.com    | 60000
3      | Amit     | amit@gmail.com     | 50000
4      | Neha     | neha@gmail.com     | 70000
5      | Rahul    | rahul@gmail.com    | 60000


## Solution 1: Using `ROW_NUMBER()` (Recommended for PostgreSQL)

```sql
WITH duplicates AS (
    SELECT *,
           ROW_NUMBER() OVER (
               PARTITION BY email
               ORDER BY emp_id
           ) AS rn
    FROM employees
)
DELETE FROM employees
WHERE emp_id IN (
    SELECT emp_id
    FROM duplicates
    WHERE rn > 1
);
```

### Explanation

* `PARTITION BY email` groups duplicate emails.
* `ROW_NUMBER()` assigns:

  * First record → `rn = 1` (kept)
  * Remaining records → `rn > 1` (deleted)

---

## Solution 2: Delete Exact Duplicate Rows (Multiple Columns)

If duplicates are identified by `emp_name`, `email`, and `salary`:

```sql
WITH duplicates AS (
    SELECT *,
           ROW_NUMBER() OVER (
               PARTITION BY emp_name, email, salary
               ORDER BY emp_id
           ) AS rn
    FROM employees
)
DELETE FROM employees
WHERE emp_id IN (
    SELECT emp_id
    FROM duplicates
    WHERE rn > 1
);
```

---

## Output After Deletion

```text
emp_id | emp_name | email              | salary
-------+----------+--------------------+--------
1      | Amit     | amit@gmail.com     | 50000
2      | Rahul    | rahul@gmail.com    | 60000
4      | Neha     | neha@gmail.com     | 70000
```

---

## Best Practices

* **Always preview duplicates before deleting:**

```sql
SELECT *,
       ROW_NUMBER() OVER (
           PARTITION BY email
           ORDER BY emp_id
       ) AS rn
FROM employees;
```

* **Take a backup** before running `DELETE`.
* Use a **primary key** (like `emp_id`) in the `ORDER BY` clause to decide which record to keep.

---

## Interview Follow-up Questions

**Q1. Why use `ROW_NUMBER()` instead of `RANK()`?**

* `ROW_NUMBER()` gives a unique sequence (1, 2, 3...), making it easy to keep exactly one row.
* `RANK()` and `DENSE_RANK()` can assign the same rank to multiple rows, so they're not suitable for deleting duplicates.

**Q2. How do you keep the latest record instead of the oldest?**

```sql
ROW_NUMBER() OVER (
    PARTITION BY email
    ORDER BY created_date DESC
)
```

This keeps the most recently created record and deletes the older duplicates.
