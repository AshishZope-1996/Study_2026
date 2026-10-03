

<br>

# DELETE vs TRUNCATE vs DROP in SQL

<br>

| Feature | DELETE | TRUNCATE | DROP |
|---|---|---|---|
| Removes | Specific rows from a table | All rows from a table | Entire table |
| Command Type | DML | DDL | DDL |
| WHERE Clause | Can use WHERE | Cannot use WHERE | Cannot use WHERE |
| Rollback | Can be rolled back | Cannot be rolled back* | Cannot be rolled back* |
| Trigger | `DELETE trigger can fire` | Usually does not fire DELETE trigger | No DELETE trigger |
| Table Structure | Remains | Remains | Removed |
| Performance | Slower | Faster | Fast |