# SQL INTERVIEW MASTER GUIDE

### Q1. Find the second-highest salary in every department.

**Tables:** `employees(employee_id, employee_name, department_id, salary)`

**Question:** Find the second-highest distinct salary in each department. Return the department ID, employee name and salary. Handle ties correctly.

**Answer:**
```sql
WITH ranked_employees AS (
    SELECT *,
           DENSE_RANK() OVER (
               PARTITION BY department_id
               ORDER BY salary DESC
           ) AS salary_rank
    FROM employees
)
SELECT department_id,
       employee_name,
       salary
FROM ranked_employees
WHERE salary_rank = 2;
```

**Follow-up:** What changes if the interviewer wants exactly one employee per department?

### Q2. Identify users whose activity increased for three consecutive days.

**Table:** `user_activity(user_id, activity_date, activity_count)`

**Question:** Find users whose activity count increased every day for at least three consecutive days.

**Answer:**
```sql
WITH daily_activity AS (
    SELECT user_id,
           activity_date,
           activity_count,
           LAG(activity_count) OVER (
               PARTITION BY user_id
               ORDER BY activity_date
           ) AS previous_activity,
           LAG(activity_date) OVER (
               PARTITION BY user_id
               ORDER BY activity_date
           ) AS previous_date
    FROM user_activity
)
SELECT user_id
FROM daily_activity
WHERE activity_date = previous_date + 1
  AND activity_count > previous_activity
GROUP BY user_id
HAVING COUNT(*) >= 2;
```

**Interview trap:** Three consecutive days require two consecutive day-to-day comparisons. Check that the first row of the sequence is also accounted for when extending this solution.

### Q3. Calculate the 90th percentile of order values for each category.

**Table:** `orders(order_id, category_id, order_amount)`

**Answer:**
```sql
SELECT category_id,
       PERCENTILE_CONT(0.90)
       WITHIN GROUP (
           ORDER BY order_amount
       ) AS percentile_90
FROM orders
GROUP BY category_id;
```

**Follow-up:** How would you handle outliers and optimize this query on a billion-row table?

### Q4. Find employees earning more than their department average.

**Table:** `employees(employee_id, employee_name, department_id, salary)`

**Answer:**
```sql
SELECT employee_id,
       employee_name,
       department_id,
       salary
FROM (
    SELECT *,
           AVG(salary) OVER (
               PARTITION BY department_id
           ) AS department_avg
    FROM employees
) t
WHERE salary > department_avg;
```




### Q5. Calculate Daily Active Users (DAU) and Monthly Active Users (MAU).

**Table:** `user_activity(user_id, activity_date)`

**Answer – DAU:**
```sql
SELECT activity_date,
       COUNT(DISTINCT user_id) AS dau
FROM user_activity
GROUP BY activity_date
ORDER BY activity_date;
```

**Answer – MAU:**
```sql
SELECT DATE_TRUNC('month', activity_date)::date AS month,
       COUNT(DISTINCT user_id) AS mau
FROM user_activity
GROUP BY 1
ORDER BY 1;
```

**Follow-up:** Calculate DAU/MAU stickiness for every day using a rolling 30-day active-user population.

### Q6. Find users who liked a post but never commented on it.

**Table:** `post_actions(user_id, post_id, action_type)`

**Answer:**
```sql
SELECT DISTINCT l.user_id,
       l.post_id
FROM post_actions l
WHERE l.action_type = 'like'
  AND NOT EXISTS (
      SELECT 1
      FROM post_actions c
      WHERE c.user_id = l.user_id
        AND c.post_id = l.post_id
        AND c.action_type = 'comment'
  );
```

### Q7. Find the percentage of users who returned within seven days of registration.

**Tables:**
- `users(user_id, signup_date)`
- `user_activity(user_id, activity_date)`

**Answer:**
```sql
SELECT
    ROUND(
        100.0 * COUNT(DISTINCT a.user_id)
        / NULLIF(COUNT(DISTINCT u.user_id), 0),
        2
    ) AS retention_percentage
FROM users u
LEFT JOIN user_activity a
    ON u.user_id = a.user_id
   AND a.activity_date > u.signup_date
   AND a.activity_date <= u.signup_date + 7;
```

**Follow-up:** Calculate retention for day 1, day 7 and day 30 separately.

### Q8. Find the top three posts by engagement in each country.

**Tables:**
- `posts(post_id, user_id, country)`
- `post_engagement(post_id, likes, comments, shares)`

**Answer:**
```sql
WITH engagement AS (
    SELECT p.country,
           p.post_id,
           COALESCE(e.likes, 0)
           + COALESCE(e.comments, 0)
           + COALESCE(e.shares, 0) AS total_engagement
    FROM posts p
    JOIN post_engagement e
      ON p.post_id = e.post_id
),
ranked AS (
    SELECT *,
           DENSE_RANK() OVER (
               PARTITION BY country
               ORDER BY total_engagement DESC
           ) AS rnk
    FROM engagement
)
SELECT *
FROM ranked
WHERE rnk <= 3;
```



### Q9. Find customers who placed orders in three consecutive months.

**Table:** `orders(order_id, customer_id, order_date)`

**Answer:**
```sql
WITH monthly_orders AS (
    SELECT DISTINCT
           customer_id,
           DATE_TRUNC('month', order_date)::date AS order_month
    FROM orders
),
numbered AS (
    SELECT *,
           order_month
           - (ROW_NUMBER() OVER (
               PARTITION BY customer_id
               ORDER BY order_month
           )::int * INTERVAL '1 month') AS grp
    FROM monthly_orders
)
SELECT customer_id
FROM numbered
GROUP BY customer_id, grp
HAVING COUNT(*) >= 3;
```

### Q10. Find the top-selling product in each category.

**Tables:**
- `orders(order_id, product_id, quantity)`
- `products(product_id, product_name, category_id)`

**Answer:**
```sql
WITH product_sales AS (
    SELECT p.category_id,
           p.product_id,
           p.product_name,
           SUM(o.quantity) AS total_quantity
    FROM products p
    JOIN orders o
      ON p.product_id = o.product_id
    GROUP BY p.category_id,
             p.product_id,
             p.product_name
),
ranked AS (
    SELECT *,
           ROW_NUMBER() OVER (
               PARTITION BY category_id
               ORDER BY total_quantity DESC,
                        product_id
           ) AS rn
    FROM product_sales
)
SELECT *
FROM ranked
WHERE rn = 1;
```

### Q11. Identify customers who purchased again within 30 days.

**Table:** `orders(order_id, customer_id, order_date, amount)`

**Answer:**
```sql
WITH purchase_history AS (
    SELECT customer_id,
           order_date,
           LEAD(order_date) OVER (
               PARTITION BY customer_id
               ORDER BY order_date
           ) AS next_order_date
    FROM orders
)
SELECT DISTINCT customer_id
FROM purchase_history
WHERE next_order_date > order_date
  AND next_order_date <= order_date + 30;
```

### Q12. Calculate customer lifetime value (CLV).

**Table:** `orders(order_id, customer_id, order_amount, refund_amount, order_date)`

**Question:** Calculate net customer spending over the last 12 months.

**Answer:**
```sql
SELECT customer_id,
       SUM(
           order_amount - COALESCE(refund_amount, 0)
       ) AS lifetime_value
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY customer_id
ORDER BY lifetime_value DESC;
```

**Follow-up:** Exclude fully refunded orders, calculate average order value and identify high-value customers.




### Q13. Find users who watched more than five episodes in a single day.

**Table:** `watch_history(user_id, content_id, watch_date, watch_duration)`

**Answer:**
```sql
SELECT user_id,
       watch_date,
       COUNT(DISTINCT content_id) AS episodes_watched
FROM watch_history
GROUP BY user_id, watch_date
HAVING COUNT(DISTINCT content_id) > 5;
```

### Q14. Find the most-watched content in each month.

**Table:** `watch_history(user_id, content_id, watch_date, watch_duration)`

**Answer:**
```sql
WITH monthly_views AS (
    SELECT DATE_TRUNC('month', watch_date)::date AS month,
           content_id,
           COUNT(*) AS total_views
    FROM watch_history
    GROUP BY 1, 2
),
ranked AS (
    SELECT *,
           DENSE_RANK() OVER (
               PARTITION BY month
               ORDER BY total_views DESC
           ) AS rnk
    FROM monthly_views
)
SELECT *
FROM ranked
WHERE rnk = 1;
```

### Q15. Identify users who stopped watching the platform.

**Table:** `watch_history(user_id, watch_date)`

**Question:** Find users who were active last month but have no activity this month.

**Answer:**
```sql
SELECT DISTINCT user_id
FROM watch_history
WHERE watch_date >= DATE_TRUNC(
          'month', CURRENT_DATE
      ) - INTERVAL '1 month'
  AND watch_date < DATE_TRUNC(
          'month', CURRENT_DATE
      )

EXCEPT

SELECT DISTINCT user_id
FROM watch_history
WHERE watch_date >= DATE_TRUNC(
          'month', CURRENT_DATE
      )
  AND watch_date < DATE_TRUNC(
          'month', CURRENT_DATE
      ) + INTERVAL '1 month';
```




### Q16. Find users who renewed their subscription without interruption.

**Table:** `subscriptions(user_id, start_date, end_date)`

**Answer:**
```sql
WITH subscription_history AS (
    SELECT user_id,
           start_date,
           end_date,
           LAG(end_date) OVER (
               PARTITION BY user_id
               ORDER BY start_date
           ) AS previous_end_date
    FROM subscriptions
)
SELECT DISTINCT user_id
FROM subscription_history
WHERE previous_end_date = start_date;
```

**Follow-up:** How would you handle overlapping subscriptions and renewal grace periods?

### Q17. Find customers whose spending increased every month.

**Table:** `monthly_sales(customer_id, sale_month, total_amount)`

**Answer:**
```sql
WITH comparison AS (
    SELECT customer_id,
           sale_month,
           total_amount,
           LAG(total_amount) OVER (
               PARTITION BY customer_id
               ORDER BY sale_month
           ) AS previous_amount
    FROM monthly_sales
)
SELECT customer_id
FROM comparison
GROUP BY customer_id
HAVING COUNT(*) FILTER (
           WHERE previous_amount IS NOT NULL
             AND total_amount > previous_amount
       ) = COUNT(*) - 1;
```

**Note:** This checks consecutive rows in the available data. Verify that months are continuous before interpreting it as an increase every calendar month.




### Q18. Delete duplicate records while retaining the latest record.

**Table:** `customer_data(id, email, updated_at)`

**Answer:**
```sql
WITH duplicates AS (
    SELECT id,
           ROW_NUMBER() OVER (
               PARTITION BY email
               ORDER BY updated_at DESC, id DESC
           ) AS rn
    FROM customer_data
)
DELETE FROM customer_data
WHERE id IN (
    SELECT id
    FROM duplicates
    WHERE rn > 1
);
```

**Interview trap:** Always verify the rows to be deleted with a SELECT before executing DELETE in production.

### Q19. Find gaps in sequential transaction IDs.

**Table:** `transactions(transaction_id)`

**Answer:**
```sql
WITH transaction_sequence AS (
    SELECT transaction_id,
           LEAD(transaction_id) OVER (
               ORDER BY transaction_id
           ) AS next_id
    FROM transactions
)
SELECT transaction_id + 1 AS gap_start,
       next_id - 1 AS gap_end
FROM transaction_sequence
WHERE next_id > transaction_id + 1;
```

### Q20. Calculate a seven-day moving average of sales.

**Table:** `daily_sales(sale_date, revenue)`

**Answer:**
```sql
SELECT sale_date,
       revenue,
       ROUND(
           AVG(revenue) OVER (
               ORDER BY sale_date
               ROWS BETWEEN 6 PRECEDING
                        AND CURRENT ROW
           ), 2
       ) AS moving_average
FROM daily_sales;
```

**Follow-up:** What happens when dates are missing? How would you build a date spine to guarantee seven calendar days?

### Q21. Identify consecutive login streaks for every user.

**Table:** `user_logins(user_id, login_date)`

**Answer:**
```sql
WITH numbered AS (
    SELECT DISTINCT user_id,
           login_date,
           login_date -
           ROW_NUMBER() OVER (
               PARTITION BY user_id
               ORDER BY login_date
           )::int AS grp
    FROM user_logins
)
SELECT user_id,
       MIN(login_date) AS streak_start,
       MAX(login_date) AS streak_end,
       COUNT(*) AS streak_days
FROM numbered
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;
```

### Q22. Calculate revenue contribution percentage by product.

**Table:** `sales(product_id, revenue)`

**Answer:**
```sql
SELECT product_id,
       SUM(revenue) AS product_revenue,
       ROUND(
           100.0 * SUM(revenue)
           / NULLIF(SUM(SUM(revenue)) OVER (), 0),
           2
       ) AS revenue_percentage
FROM sales
GROUP BY product_id
ORDER BY product_revenue DESC;
```

### Q23. Find the median salary for every department.

**Table:** `employees(employee_id, department_id, salary)`

**Answer:**
```sql
SELECT department_id,
       PERCENTILE_CONT(0.50)
       WITHIN GROUP (
           ORDER BY salary
       ) AS median_salary
FROM employees
GROUP BY department_id;
```

### Q24. Find users who performed all three actions: signup, purchase and review.

**Table:** `user_events(user_id, event_type)`

**Answer:**
```sql
SELECT user_id
FROM user_events
GROUP BY user_id
HAVING COUNT(DISTINCT event_type) FILTER (
    WHERE event_type IN (
        'signup', 'purchase', 'review'
    )
) = 3;
```

### Q25. Calculate conversion rate at each stage of a sales funnel.

**Table:** `funnel_events(user_id, event_type)`

Stages: Visit → Signup → Purchase.

**Answer:**
```sql
WITH user_stages AS (
    SELECT user_id,
           MAX((event_type = 'visit')::int) AS visited,
           MAX((event_type = 'signup')::int) AS signed_up,
           MAX((event_type = 'purchase')::int) AS purchased
    FROM funnel_events
    GROUP BY user_id
)
SELECT
    SUM(visited) AS visitors,
    SUM(signed_up) AS signups,
    SUM(purchased) AS purchases,
    ROUND(
        100.0 * SUM(signed_up)
        / NULLIF(SUM(visited), 0), 2
    ) AS visit_to_signup_pct,
    ROUND(
        100.0 * SUM(purchased)
        / NULLIF(SUM(signed_up), 0), 2
    ) AS signup_to_purchase_pct
FROM user_stages;
```

**Important:** This assumes the events belong to the same user and does not enforce chronological event order. A production funnel should validate timestamps and stage sequence.



Prepare these questions for theoretical and technical discussions.

1. What is the difference between ROW_NUMBER(), RANK() and DENSE_RANK()?
2. What is the difference between WHERE and HAVING?
3. What is the difference between UNION and UNION ALL?
4. What is the difference between INNER JOIN and LEFT JOIN?
5. What happens when NULL is compared with NULL?
6. What is the difference between NOT IN and NOT EXISTS?
7. What is a correlated subquery?
8. What is a recursive CTE?
9. What is the difference between a CTE and a temporary table?
10. What are clustered and non-clustered indexes?
11. How do composite indexes work?
12. What is a covering index?
13. What is the difference between DELETE, TRUNCATE and DROP?
14. What is a database execution plan?
15. What is the difference between ROWS and RANGE in window functions?
16. What is database normalization?
17. What are ACID properties?
18. What are transaction isolation levels?
19. What is a deadlock and how can you prevent it?
20. How would you optimize a query scanning 500 million records?




For senior-level interviews, be prepared to explain these scenarios.

### Example: Optimize a slow query

**Original:**
```sql
SELECT *
FROM orders
WHERE DATE(order_date) = DATE '2026-01-01';
```

**Improved:**
```sql
SELECT *
FROM orders
WHERE order_date >= TIMESTAMP '2026-01-01 00:00:00'
  AND order_date <  TIMESTAMP '2026-01-02 00:00:00';
```

Consider an index:
```sql
CREATE INDEX idx_orders_order_date
ON orders(order_date);
```

Verify the actual improvement with:
```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE order_date >= TIMESTAMP '2026-01-01 00:00:00'
  AND order_date <  TIMESTAMP '2026-01-02 00:00:00';
```




| Week | Topics |
|||
| Week 1 | SQL fundamentals, joins, aggregations |
| Week 2 | Subqueries, CTEs, correlated queries |
| Week 3 | Window functions, ranking, LAG, LEAD |
| Week 4 | Business scenarios, retention, cohorts |
| Week 5 | Advanced SQL, gaps and islands |
| Week 6 | Optimization, indexing, mock interviews |

## FINAL INTERVIEW ADVICE

When solving SQL interview questions:

1. Understand the expected output before writing SQL.
2. Identify the table relationships and join keys.
3. Check whether duplicate rows are possible.
4. Handle NULL values explicitly.
5. Clarify whether ties should be included.
6. Consider date boundaries and missing dates.
7. Explain your approach before writing the query.
8. Test your query against edge cases.
9. Discuss performance when the dataset is large.
10. Explain alternative solutions when appropriate.

**Remember:** Senior SQL interviews are not just about writing a query that works. They test whether you understand the business problem, data quality, edge cases, scalability and performance.
