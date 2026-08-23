

Q 1. What is SQL?
SQL stands for Structured Query Language. It is a
programming language used for managing and
manipulating relational databases.
Ans:


Q 2. What is a database?
A database is an organized collection of data stored
and accessed electronically. It provides a way to
store, organize, and retrieve large amounts of data
efficiently.
Ans:


Q 3. What is a primary key?
A primary key is a column or combination of columns
that uniquely identifies each row in a table. It
enforces the entity integrity rule in a relational
database.
Ans:
01


Q 4. What is a foreign key?
A foreign key is a column or combination of columns
that establishes a link between data in two tables. It
ensures referential integrity by enforcing
relationships between tables.
Ans:
02


Q 5. What is the difference between a primary key
and a unique key?
A primary key is used to uniquely identify a row in a
table and must have a unique value. On the other
hand, a unique key ensures that a column or
combination of columns has a unique value but does
not necessarily identify the row.
Ans:
First Normal Form (1NF)
Second Normal Form (2NF)
Third Normal Form (3NF)
Boyce-Codd Normal Form (BCNF)
Fourth Normal Form (4NF)
Fifth Normal Form (5NF) or Project-Join Normal
Form (PJNF)
The different types of normalization are:


Q 6. What is normalization?
Normalization is the process of organizing data in a
database to minimize redundancy and dependency.
It involves breaking down a table into smaller tables
and establishing relationships between them.
Ans:
03


Q 7. What are the different types of
normalization?
Ans:


Q 8. What is a join in SQL?
A join is an operation used to combine rows from two
or more tables based on related columns. It allows
you to retrieve data from multiple tables
simultaneously.
Ans:


Q 9. What is the difference between DELETE and
TRUNCATE in SQL?
The DELETE statement is used to remove specific
rows from a table based on a condition. It can be
rolled back and generates individual delete
operations for each row.
TRUNCATE, on the other hand, is used to remove all
rows from a table. It cannot be rolled back, and it is
faster than DELETE as it deallocates the data pages
instead of logging individual row deletions.
Ans:
04


Q 10. What is the difference between UNION
and UNION ALL?
UNION and UNION ALL are used to combine the
result sets of two or more SELECT statements.
UNION removes duplicate rows from the combined
result set.
whereas UNION ALL includes all rows, including
duplicates.
Ans:


Q 11. What is the difference between the HAVING
clause and the WHERE clause?
The WHERE clause is used to filter rows based on a
condition before the data is grouped or aggregated.
It operates on individual rows.
The HAVING clause, on the other hand, is used to
filter grouped rows based on a condition after the
data is grouped or aggregated using the GROUP BY
clause.
Ans:
05


Q 12. What is a transaction in SQL?
A transaction is a sequence of SQL statements that
are executed as a single logical unit of work. It
ensures data consistency and integrity by either
committing all changes or rolling them back if an
error occurs.
Ans:


Q 13. What is the difference between a clustered
and a non-clustered index?
A clustered index determines the physical order of
data in a table. It changes the way the data is stored
on disk and can be created on only one column. A
table can have only one clustered index.
A non-clustered index does not affect the physical
order of data in a table. It is stored separately and
contains a pointer to the actual data. A table can
have multiple non-clustered indexes.
Ans:
06
Clustered Index Non-Clustered Index
Atomicity ensures that a transaction is treated as
a single unit of work, either all or none of the
changes are applied.
Consistency ensures that a transaction brings
the database from one valid state to another.
Isolation ensures that concurrent transactions
do not interfere with each other.
Durability ensures that once a transaction is
committed, its changes are permanent and
survive system failures.
ACID stands for Atomicity, Consistency, Isolation,
and Durability. It is a set of properties that guarantee
reliable processing of database transactions.


Q 14. What is ACID in the context of database
transactions?
Ans:
07
A deadlock occurs when two or more transactions
are waiting for each other to release resources,
resulting in a circular dependency. As a result, none
of the transactions can proceed, and the system may
become unresponsive.


Q 15. What is a deadlock?
Ans:
08
A database is a container that holds multiple objects,
such as tables, views, indexes, and procedures. It
represents a logical grouping of related data.
A schema, on the other hand, is a container within a
database that holds objects and defines their
ownership. It provides a way to organize and manage
database objects.


Q 16. What is the difference between a database
and a schema?
Ans:
A temporary table is a table that is created and exists
only for the duration of a session or a transaction. It
can be explicitly dropped or is automatically
dropped when the session or transaction ends.
A table variable is a variable that can store a tablelike structure in memory. It has a limited scope
within a batch, stored procedure, or function. It is
automatically deallocated when the scope ends.


Q 17. What is the difference between a temporary
table and a table variable?
Ans:
09
The GROUP BY clause is used to group rows based
on one or more columns in a table. It is typically used
in conjunction with aggregate functions, such as
SUM, AVG, COUNT, etc., to perform calculations on
grouped data.


Q 18. What is the purpose of the GROUP BY
clause?
Ans:
CHAR is a fixed-length string data type, while
VARCHAR is a variable-length string data type.


Q 19. What is the difference between CHAR and
VARCHAR data types?
Ans:
10
A stored procedure is a set of SQL statements that
are stored in the database and can be executed
repeatedly. It provides code reusability and better
performance.


Q 20. What is a stored procedure?
Ans:
A subquery is a query nested inside another query. It
is used to retrieve data based on the result of an
inner query.


Q 21. What is a subquery?
Ans:
A view is a virtual table based on the result of an SQL
statement. It allows users to retrieve and manipulate
data as if


Q 22. What is a view?
Ans:
11
A cross join (Cartesian product) returns the
combination of all rows from two or more tables.
An inner join returns only the matching rows based
on a join condition.


Q 23. What is the difference between a cross join
and an inner join?
Ans:
12
The COMMIT statement is used to save changes
made in a transaction permanently. It ends the
transaction and makes the changes visible to other
users.


Q 24. What is the purpose of the COMMIT
statement?
Ans:
The ROLLBACK statement is used to undo changes
made in a transaction. It reverts the database to its
previous state before the transaction started.


Q 25. What is the purpose of the ROLLBACK
statement?
Ans:
NULL represents the absence of a value or unknown
value. It is different from zero or an empty string and
requires special handling in SQL queries.


Q 26. What is the purpose of the NULL value in
SQL?
Ans:
13
A materialized view is a physical copy of the view's
result set stored in the database, which is updated
periodically. It improves query performance at the
cost of data freshness.


Q 27. What is the difference between a view and a
materialized view?
Ans:
A correlated subquery is a subquery that refers to a
column from the outer query. It executes once for
each row processed by the outer query.


Q 28. What is a correlated subquery?
Ans:
14
The DISTINCT keyword is used to retrieve unique
values from a column or combination of columns in a
SELECT statement.


Q 29. What is the purpose of the DISTINCT
keyword?
Ans:
CHAR stores fixed-length character strings, while
VARCHAR stores variable-length character strings.
The storage size of CHAR is constant, while
VARCHAR adjusts dynamically.


Q 30. What is the difference between the CHAR
and VARCHAR data types?
Ans:
15
The IN operator checks for a value within a set of
values or the result of a subquery. The EXISTS
operator checks for the existence of rows returned
by a subquery.


Q 31. What is the difference between the IN and
EXISTS operators?
Ans:
The TRIGGER statement is used to associate a set of
SQL statements with a specific event in the
database. It is executed automatically when the
event occurs


Q 32. What is the purpose of the TRIGGER
statement?
Ans:
A unique constraint ensures the uniqueness of
values in one or more columns, while a unique index
enforces the uniqueness and also improves query
performance.


Q 33. What is the difference between a unique
constraint and a unique index?
Ans:
16
The TOP (in SQL Server) or LIMIT (in MySQL) clause is
used to limit the number of rows returned by a
query. It is often used with an ORDER BY clause.


Q 34. What is the purpose of the TOP or LIMIT
clause?
Ans:
UNION combines the result sets of two or more
SELECT statements vertically, while JOIN combines
columns from two or more tables horizontally based
on a join condition.


Q 35. What is the difference between the UNION
and JOIN operators?
Ans:
17
A data warehouse is a large, centralized repository
that stores and manages data from various sources.
It is designed for efficient reporting, analysis, and
business intelligence purposes.


Q 36. What is a data warehouse?
Ans:
A primary key is a chosen candidate key that
uniquely identifies a row in a table.
A candidate key is a set of one or more columns that
could potentially become the primary key.


Q 37. What is the difference between a primary key
and a candidate key?
Ans:
18
The GRANT statement is used to grant specific
permissions or privileges to users or roles in a
database.


Q 38. What is the purpose of the GRANT statement?
Ans:
A correlated update is an update statement that
refers to a column from the same table in a
subquery. It updates values based on the result of
the subquery for each row.


Q 39. What is a correlated update?
Ans:
19
The CASE statement is used to perform conditional
logic in SQL queries. It allows you to return different
values based on specified conditions.


Q 40. What is the purpose of the CASE statement?
Ans:
The COALESCE function returns the first non-null
expression from a list of expressions. It is often used
to handle null values effectively.


Q 41. What is the purpose of the COALESCE
function?
Ans:
The ROW_NUMBER() function assigns a unique
incremental number to each row in the result set.
It is commonly used for pagination or ranking
purposes.ll values effectively.


Q 42. What is the purpose of the ROW_NUMBER()
function?
Ans:
20
A natural join is an inner join that matches rows
based on columns with the same name in the joined
tables. It is automatically determined by the
database.


Q 43. What is the difference between a natural
join and an inner join?
Ans:
The CASCADE DELETE constraint is used to
automatically delete related rows in child tables
when a row in the parent table is deleted.


Q 44. What is the purpose of the CASCADE
DELETE constraint?
Ans:
21
The CASCADE DELETE constraint is used to
automatically delete related rows in child tables
when a row in the parent table is deleted.


Q 45. What is the purpose of the ALL keyword in
SQL?
Ans:
22
The EXISTS operator returns true if a subquery
returns any rows, while the NOT EXISTS operator
returns true if a subquery returns no rows.


Q 46. What is the difference between the EXISTS
and NOT EXISTS operators?
Ans:
23
The CROSS APPLY operator is used to invoke a tablevalued function for each row of a table expression. It
returns the combined result set.


Q 47. What is the purpose of the CROSS APPLY
operator?
Ans:
A self-join is a join operation where a table is joined
with itself. It is useful when you want to compare
rows within the same table based on related
columns. It requiresbined result set.


Q 48. What is a self-join?
Ans:
24
ALIAS command in SQL is the name that can be given
to any table or a column. This alias name can be
referred in WHERE clause to identify a particular
table or a column.


Q 49. What is an ALIAS command?
Ans:
To perform some calculations on the data
To modify individual data items
To manipulate the output
To format dates and numbers
To convert the data types
SQL functions are used for the following purposes:


Q 50. Why are SQL functions used?
Ans: