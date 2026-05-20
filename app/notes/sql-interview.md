# SQL Interview Notes

## Common questions

- What is the difference between INNER JOIN and LEFT JOIN?
- How do you use indexes to optimize performance?
- Explain GROUP BY with HAVING.

## Example answer

```sql
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```
