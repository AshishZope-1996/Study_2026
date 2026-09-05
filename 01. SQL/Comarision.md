











<br>

# DELETE vs TRUNCATE vs DROP in SQL

<br>

| Feature         | DELETE                     | TRUNCATE                             | DROP                   |
| --------------- | -------------------------- | ------------------------------------ | ---------------------- |
| Removes         | Specific rows from a table | All rows from a table                | Entire table           |
| Command Type    | DML                        | DDL                                  | DDL                    |
| WHERE Clause    | Can use WHERE              | Cannot use WHERE                     | Cannot use WHERE       |
| Rollback        | Can be rolled back         | Cannot be rolled back*               | Cannot be rolled back* |
| Trigger         | `DELETE` trigger can fire  | Usually does not fire DELETE trigger | No DELETE trigger      |
| Table Structure | Remains                    | Remains                              | Removed                |
| Performance     | Slower                     | Faster                               | Fast                   |

---

<br>

# WHERE vs HAVING in SQL

<br>

| Feature                 | WHERE                                   | HAVING                      |
| ----------------------- | --------------------------------------- | --------------------------- |
| Purpose                 | Filters individual rows                 | Filters groups              |
| Applied                 | Before `GROUP BY`                       | After `GROUP BY`            |
| Filtering Level         | Row-level filtering                     | Group-level filtering       |
| Aggregate Functions     | Cannot directly use aggregate functions | Can use aggregate functions |
| `COUNT()`               | Cannot directly filter using `COUNT()`  | Can filter using `COUNT()`  |
| `SUM()`                 | Cannot directly filter using `SUM()`    | Can filter using `SUM()`    |
| `AVG()`                 | Cannot directly filter using `AVG()`    | Can filter using `AVG()`    |
| Used Without `GROUP BY` | Yes                                     | Database-dependent          |
| Example                 | `WHERE salary > 50000`                  | `HAVING COUNT(*) > 5`       |

---

<br>

# UNION vs UNION ALL in SQL

<br>

| Feature               | UNION                                 | UNION ALL                     |
| --------------------- | ------------------------------------- | ----------------------------- |
| Purpose               | Combines result sets                  | Combines result sets          |
| Duplicate Records     | Removes duplicates                    | Keeps duplicates              |
| Performance           | Slower                                | Faster                        |
| Duplicate Elimination | Yes                                   | No                            |
| Sorting/Processing    | Additional processing may be required | Less processing               |
| Number of Columns     | Must be same                          | Must be same                  |
| Column Data Types     | Must be compatible                    | Must be compatible            |
| Best Use              | When duplicate removal is required    | When all records are required |

---

<br>

# INNER JOIN vs LEFT JOIN vs RIGHT JOIN vs FULL JOIN**

<br>

| Feature              | INNER JOIN       | LEFT JOIN             | RIGHT JOIN             | FULL JOIN        |
| -------------------- | ---------------- | --------------------- | ---------------------- | ---------------- |
| Matching Rows        | Yes              | Yes                   | Yes                    | Yes              |
| All Left Rows        | No               | Yes                   | No                     | Yes              |
| All Right Rows       | No               | No                    | Yes                    | Yes              |
| Unmatched Left Rows  | Excluded         | Included              | Excluded               | Included         |
| Unmatched Right Rows | Excluded         | Included as NULL      | Included               | Included         |
| Main Purpose         | Matching records | Keep all left records | Keep all right records | Keep all records |
| NULL Values          | Usually fewer    | Possible              | Possible               | Possible         |

---

<br>

# JOIN vs UNION in SQL

<br>

| Feature           | JOIN                                   | UNION                        |
| ----------------- | -------------------------------------- | ---------------------------- |
| Combines          | Columns                                | Rows                         |
| Direction         | Horizontal                             | Vertical                     |
| Requirement       | Join condition usually required        | Compatible SELECT statements |
| Number of Columns | Can be different between source tables | Must match                   |
| Matching          | Based on related columns               | Appends result sets          |
| Example           | Customer + Order                       | Customers + Employees        |
| Main Purpose      | Combine related data                   | Combine similar datasets     |

---

<br>

# PRIMARY KEY vs UNIQUE KEY in SQL

<br>

| Feature               | PRIMARY KEY                      | UNIQUE KEY                              |
| --------------------- | -------------------------------- | --------------------------------------- |
| Purpose               | Uniquely identifies each row     | Ensures unique values                   |
| Duplicate Values      | Not allowed                      | Not allowed                             |
| NULL Values           | Not allowed                      | Database-dependent                      |
| Number per Table      | One primary key constraint       | Multiple unique constraints possible    |
| Foreign Key Reference | Commonly referenced              | Can be referenced depending on database |
| Main Usage            | Main row identifier              | Alternate unique identifier             |
| Index                 | Usually creates supporting index | Usually creates supporting index        |

---

<br>

# PRIMARY KEY vs FOREIGN KEY in SQL

<br>

| Feature            | PRIMARY KEY                | FOREIGN KEY                         |
| ------------------ | -------------------------- | ----------------------------------- |
| Purpose            | Identifies a row uniquely  | Creates relationship between tables |
| Duplicate Values   | Not allowed                | Allowed                             |
| NULL Values        | Not allowed                | Can be allowed                      |
| Uniqueness         | Must be unique             | Does not need to be unique          |
| Table Relationship | Parent identifier          | Child reference                     |
| Number per Table   | One primary key constraint | Multiple foreign keys possible      |
| Example            | `customer_id`              | `customer_id` in orders             |

---

<br>

# GROUP BY vs ORDER BY in SQL

<br>

| Feature                | GROUP BY                         | ORDER BY                      |
| ---------------------- | -------------------------------- | ----------------------------- |
| Purpose                | Groups rows                      | Sorts rows                    |
| Aggregation            | Commonly used with aggregates    | Not required                  |
| Changes Number of Rows | Can reduce rows with aggregation | Normally does not reduce rows |
| Sorting                | Does not guarantee final sorting | Explicitly sorts result       |
| Common Functions       | `COUNT()`, `SUM()`, `AVG()`      | `ASC`, `DESC`                 |
| Position               | Before `ORDER BY`                | Usually near end              |
| Example                | `GROUP BY department`            | `ORDER BY salary DESC`        |

---

<br>

# WHERE vs ON in SQL

<br>

| Feature           | WHERE                     | ON                              |
| ----------------- | ------------------------- | ------------------------------- |
| Purpose           | Filters records           | Defines JOIN matching condition |
| Main Usage        | General filtering         | JOIN condition                  |
| Applied           | After JOIN logically      | During JOIN matching            |
| LEFT JOIN Impact  | Can remove unmatched rows | Preserves unmatched left rows   |
| Typical Condition | `WHERE salary > 50000`    | `ON c.id = o.customer_id`       |
| Used Without JOIN | Yes                       | Usually associated with JOIN    |
| Main Focus        | Filter result             | Connect tables                  |

---

<br>

# EXISTS vs IN in SQL

<br>

| Feature          | EXISTS                             | IN                                              |
| ---------------- | ---------------------------------- | ----------------------------------------------- |
| Purpose          | Checks whether matching rows exist | Checks whether value exists in a set            |
| Result           | TRUE/FALSE condition               | Value comparison                                |
| Correlated Query | Commonly used                      | Less commonly correlated                        |
| Processing       | Can stop after finding a match     | Depends on query/database optimizer             |
| NULL Behavior    | Generally easier to reason about   | Can have surprising NULL behavior with `NOT IN` |
| Best Use         | Checking existence                 | Comparing against a list/set                    |
| Example          | `WHERE EXISTS (...)`               | `WHERE id IN (...)`                             |

---

<br>

# IN vs BETWEEN in SQL

<br>

| Feature         | IN                      | BETWEEN                         |
| --------------- | ----------------------- | ------------------------------- |
| Purpose         | Matches specific values | Matches a range                 |
| Values          | Discrete values         | Range of values                 |
| Example         | `IN (10, 20, 30)`       | `BETWEEN 10 AND 30`             |
| Use Case        | Specific options        | Numeric/date ranges             |
| Multiple Values | Yes                     | No, uses lower and upper bounds |
| Range Support   | No                      | Yes                             |
| Boundary Values | Exact values only       | Usually inclusive               |

---

<br>

# CTE vs SUBQUERY in SQL

<br>

| Feature          | CTE                                                     | SUBQUERY                                |
| ---------------- | ------------------------------------------------------- | --------------------------------------- |
| Syntax           | Uses `WITH`                                             | Uses nested `SELECT`                    |
| Readability      | Usually better for complex queries                      | Can become difficult when deeply nested |
| Multiple Queries | Multiple CTEs can be defined                            | Multiple nested subqueries possible     |
| Recursive Query  | Supported                                               | Not directly                            |
| Scope            | Statement                                               | Query/expression                        |
| Reusability      | Can reference a CTE multiple times within the statement | Usually repeated if needed              |
| Best Use         | Complex multi-step logic                                | Simple nested logic                     |

---

<br>

# CTE vs TEMP TABLE in SQL

<br>

| Feature     | CTE                                    | TEMP TABLE                    |
| ----------- | -------------------------------------- | ----------------------------- |
| Type        | Query expression                       | Temporary database object     |
| Storage     | No guaranteed physical storage         | Stores data                   |
| Scope       | Usually one statement                  | Session/transaction dependent |
| Index       | Cannot normally create an index on CTE | Can often create indexes      |
| Reuse       | Within the statement                   | Across multiple statements    |
| Best Use    | Query organization                     | Multi-step processing         |
| Persistence | Temporary logical result               | Temporary physical object     |

---

<br>

# RANK vs DENSE_RANK vs ROW_NUMBER in SQL

<br>

| Feature                  | ROW_NUMBER               | RANK                | DENSE_RANK           |
| ------------------------ | ------------------------ | ------------------- | -------------------- |
| Duplicate Ranking        | Gives different numbers  | Same rank for ties  | Same rank for ties   |
| Ranking Gaps             | No                       | Yes                 | No                   |
| Example for `100,100,90` | `1,2,3`                  | `1,1,3`             | `1,1,2`              |
| Tie Handling             | No tie                   | Supports ties       | Supports ties        |
| Unique Sequence          | Yes                      | No                  | No                   |
| Common Use               | Select one row per group | Competition ranking | Ranking without gaps |

---

<br>

# COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column)**

<br>

| Feature            | COUNT(*)      | COUNT(column)        | COUNT(DISTINCT column) |
| ------------------ | ------------- | -------------------- | ---------------------- |
| Counts             | All rows      | Non-NULL values      | Unique non-NULL values |
| Counts NULL        | Yes           | No                   | No                     |
| Removes Duplicates | No            | No                   | Yes                    |
| Typical Usage      | Total records | Records with a value | Unique values          |
| Example            | `COUNT(*)`    | `COUNT(email)`       | `COUNT(DISTINCT city)` |

---

<br>

# VIEW vs MATERIALIZED VIEW in SQL

<br>

| Feature                 | VIEW                              | MATERIALIZED VIEW                       |
| ----------------------- | --------------------------------- | --------------------------------------- |
| Stores Query Definition | Yes                               | Yes                                     |
| Stores Query Result     | Normally no                       | Yes                                     |
| Data Freshness          | Reflects source data when queried | Can become stale                        |
| Refresh Required        | No                                | Yes                                     |
| Storage Required        | Minimal                           | Requires storage                        |
| Query Performance       | Depends on underlying query       | Often faster for expensive aggregations |
| Best Use                | Logical abstraction               | Precomputed analytical results          |

---

<br>

# CHAR vs VARCHAR in SQL

<br>

| Feature     | CHAR                                 | VARCHAR                           |
| ----------- | ------------------------------------ | --------------------------------- |
| Length      | Fixed                                | Variable                          |
| Storage     | Fixed-length behavior                | Variable-length behavior          |
| Best For    | Fixed-size values                    | Variable-size strings             |
| Example     | Country code                         | Customer name                     |
| Padding     | May pad values depending on database | Generally no fixed-length padding |
| Flexibility | Lower                                | Higher                            |

---

<br>

# DECIMAL vs FLOAT in SQL

<br>

| Feature         | DECIMAL                       | FLOAT                                    |
| --------------- | ----------------------------- | ---------------------------------------- |
| Precision       | Exact decimal arithmetic      | Approximate                              |
| Best For        | Financial data                | Scientific calculations                  |
| Rounding Issues | More predictable              | Possible                                 |
| Storage         | Depends on precision/database | Typically compact for approximate values |
| Example         | `DECIMAL(18,2)`               | `FLOAT`                                  |
| Money Usage     | Recommended                   | Usually avoided                          |

---

<br>

# NULL vs 0 vs EMPTY STRING in SQL

<br>

| Feature            | NULL                            | 0               | Empty String         |
| ------------------ | ------------------------------- | --------------- | -------------------- |
| Meaning            | Missing/unknown value           | Numeric zero    | Empty text value     |
| Data Type          | Can occur across nullable types | Numeric         | Character/string     |
| Comparison         | `IS NULL`                       | `= 0`           | `= ''`               |
| Represents Nothing | Unknown/missing                 | A numeric value | A zero-length string |
| Example            | `phone IS NULL`                 | `salary = 0`    | `name = ''`          |

---

<br>

# OLTP vs OLAP**

<br>

| Feature          | OLTP                          | OLAP                         |
| ---------------- | ----------------------------- | ---------------------------- |
| Full Form        | Online Transaction Processing | Online Analytical Processing |
| Purpose          | Transaction processing        | Data analysis                |
| Operations       | INSERT, UPDATE, DELETE        | Mostly SELECT                |
| Query Type       | Simple and short              | Complex and analytical       |
| Data             | Current operational data      | Historical/analytical data   |
| Schema           | Often normalized              | Often denormalized           |
| Users            | Applications/end users        | Analysts/data teams          |
| Performance Goal | Fast transactions             | Fast analytical queries      |
| Data Volume      | Usually smaller transactions  | Large datasets               |
| Example          | Banking transaction system    | Data warehouse               |

---

<br>

# DELETE vs UPDATE in SQL

<br>

| Feature      | DELETE                               | UPDATE                                             |
| ------------ | ------------------------------------ | -------------------------------------------------- |
| Purpose      | Removes rows                         | Modifies existing rows                             |
| Data         | Removed                              | Retained with changed values                       |
| WHERE Clause | Supported                            | Supported                                          |
| SET Clause   | Not applicable                       | Required for column changes                        |
| Rollback     | Depends on transaction/database      | Depends on transaction/database                    |
| Example      | `DELETE FROM employee WHERE id = 10` | `UPDATE employee SET salary = 50000 WHERE id = 10` |

---

<br>

# STORED PROCEDURE vs FUNCTION in SQL

<br>

| Feature         | Stored Procedure                              | Function                          |
| --------------- | --------------------------------------------- | --------------------------------- |
| Purpose         | Performs operations/workflows                 | Performs reusable computation     |
| Return Value    | May return values/result sets depending on DB | Designed to return a value/result |
| Usage in SELECT | Database-dependent                            | Often usable in SQL expressions   |
| Parameters      | Supported                                     | Supported                         |
| DML             | Database-dependent                            | Database-dependent                |
| Best Use        | Business workflows                            | Reusable calculations             |
| Invocation      | Procedure-specific syntax                     | Function call syntax              |

---

<br>

# INDEX SCAN vs SEQUENTIAL SCAN in PostgreSQL

<br>

| Feature          | Index Scan               | Sequential Scan           |
| ---------------- | ------------------------ | ------------------------- |
| Access Method    | Uses index               | Reads table sequentially  |
| Best For         | Selective queries        | Large percentage of table |
| Random I/O       | Can involve random reads | Mostly sequential reads   |
| Index Required   | Yes                      | No                        |
| Small Result Set | Often efficient          | May be inefficient        |
| Large Result Set | May be less efficient    | Often efficient           |
| Decision         | Cost-based optimizer     | Cost-based optimizer      |

---

<br>

# PRIMARY KEY vs INDEX in SQL

<br>

| Feature          | PRIMARY KEY                           | INDEX                            |
| ---------------- | ------------------------------------- | -------------------------------- |
| Purpose          | Enforces row identity                 | Improves data retrieval          |
| Uniqueness       | Yes                                   | Optional                         |
| NULL             | Not allowed                           | Depends on index/database        |
| Constraint       | Yes                                   | No                               |
| Multiple Allowed | One PK constraint                     | Multiple indexes                 |
| Performance      | Provides supporting index in many DBs | Designed for query performance   |
| Foreign Key      | Can be referenced                     | Not automatically a relationship |

---

<br>

# NORMALIZATION vs DENORMALIZATION**

<br>

| Feature           | Normalization                | Denormalization                 |
| ----------------- | ---------------------------- | ------------------------------- |
| Main Goal         | Reduce redundancy            | Improve read performance        |
| Duplicate Data    | Minimized                    | May be intentionally introduced |
| JOINs             | More likely                  | Often reduced                   |
| Write Performance | Can be more complex          | Can be simpler                  |
| Read Performance  | Can require more joins       | Often faster for reads          |
| Data Integrity    | Generally easier to maintain | Requires more care              |
| Common Usage      | OLTP                         | OLAP / reporting                |
