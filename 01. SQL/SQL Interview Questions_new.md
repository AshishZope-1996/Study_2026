
## 20-question SQL interview practice se

### 1. Find all employees from the `employees` table.

```sql
SELECT * FROM employees;
```

### 2. Find the first name, last name, and email of all employees.

```sql
SELECT fname, lastname, email FROM employees;
```

### 3. Find all employees who live in Pune.
   
```sql
SELECT first_name, last_name, email FROM employees WHERE city = 'Pune';
```

### 4. Find all employees who live in Mumbai.

```sql
SELECT * FROM employees WHERE city = 'Mumbai';
```
### 5. Find all employees who live in Delhi.

```sql
SELECT * FROM employees WHERE city = 'Delhi';
```
### 6. Find all employees whose status is `ACTIVE`.

```sql
SELECT * FROM employees WHERE status = 'ACTIVE';
```
### 7. Find all employees hired after `2022-01-01`.

```sql
SELECT * FROM employees WHERE hire_date > '2022-01-01'::DATE;
```
### 8. Find all employees hired before `2020-01-01`.

```sql
SELECT * FROM employees WHERE hire_date < '2020-01-01'::DATE;
```

### 9.  Find all employees whose job title is `Data Engineer`.

```sql
SELECT * FROM employees WHERE 
```
### 10. Find all female employees.

```sql
SELECT 1;
```
### 11. Find all male employees.

```sql
SELECT 1;
```
### 12. Find employees whose first name starts with `A`.

```sql
SELECT 1;
```
### 13. Find employees whose last name ends with `i`.

```sql
SELECT 1;
```
### 14. Find employees whose email contains `data`.

```sql
SELECT 1;
```
### 15. Find employees born after `1995-01-01`.

```sql
SELECT 1;
```
### 16. Find employees hired between `2020-01-01` and `2023-12-31`.

```sql
SELECT 1;
```
### 17. Find all distinct cities from the `employees` table.

```sql
SELECT 1;
```
### 18. Find all distinct job titles.

```sql
SELECT 1;
```
### 19. Find the total number of employees.

```sql
SELECT 1;
```
### 20. Find the number of active employees.

```sql
SELECT 1;
```
### 21. Find the number of employees in Pune.

```sql
SELECT 1;
```

---

## 🟢 Level 2 — Aggregation & GROUP BY (21–40)

21. Find the average salary of all employees.
22. Find the maximum salary.
23. Find the minimum salary.
24. Find the total salary paid to all employees.
25. Find the number of employees in each department.
26. Find the average salary in each department.
27. Find the maximum salary in each department.
28. Find the minimum salary in each department.
29. Find the total salary by department.
30. Find departments having more than 3 employees.
31. Find departments having an average salary greater than ₹15 lakh.
32. Find cities having more than 5 employees.
33. Find the number of employees for each job title.
34. Find the average salary for each job title.
35. Find the highest-paid job title.
36. Find the department with the highest number of employees.
37. Find the department with the lowest number of employees.
38. Find the department with the highest total salary.
39. Find the average employee salary by city.
40. Find the number of employees hired in each year.

---

## 🟡 Level 3 — JOINs (41–60)

41. Display employee name and department name.
42. Display employee name, department name, and city.
43. Display employee name and current salary.
44. Display employee name, department name, and salary.
45. Find all employees working in `Data Engineering`.
46. Find all employees working in `Engineering`.
47. Find all employees working in Pune along with their department name.
48. Find employees earning more than ₹15 lakh along with their department name.
49. Find each department and the number of employees in it.
50. Find each department and its average salary.
51. Find departments that currently have no projects.
52. Find employees who are not assigned to any project.
53. Find employees assigned to at least one project.
54. Display employee name and project name.
55. Display employee name, project name, and project role.
56. Find employees working on the `Data Lake Migration` project.
57. Find all projects and the number of employees assigned to each.
58. Find projects having more than 2 employees.
59. Find employees working on projects belonging to a different department.
60. Find the department name, project name, and project budget.

---

## 🟡 Level 4 — Subqueries (61–75)

61. Find employees earning more than the average salary.
62. Find employees earning less than the average salary.
63. Find employees earning the maximum salary.
64. Find the second-highest salary.
65. Find employees earning the second-highest salary.
66. Find employees earning more than the average salary of their department.
67. Find employees earning less than their department's average salary.
68. Find the department having the highest average salary.
69. Find employees who work in the department with the highest average salary.
70. Find employees who have never been assigned to a project.
71. Find employees who have worked on at least one project.
72. Find employees who have worked on more than one project.
73. Find projects whose budget is greater than the average project budget.
74. Find employees whose salary is greater than the salary of employee `106`.
75. Find employees whose salary is greater than all employees in the `Data Analytics` department.

---

# 🟠 Level 5 — Window Functions (76–95)

76. Rank employees by salary across the entire company.
77. Rank employees by salary within each department.
78. Find the top 3 highest-paid employees in each department.
79. Find the second-highest-paid employee in each department.
80. Find the third-highest salary in each department.
81. Assign a sequential number to employees based on salary.
82. Calculate the difference between each employee's salary and the department's average salary.
83. Calculate the percentage contribution of each employee's salary to their department's total salary.
84. Find the highest-paid employee in each department using `ROW_NUMBER()`.
85. Find the highest-paid employee in each department using `RANK()`.
86. Find employees whose salary rank is 1 within their department.
87. Find the previous salary for every employee using `LAG()`.
88. Find the next salary for every employee using `LEAD()`.
89. Calculate salary growth between consecutive salary records.
90. Find the latest salary record for every employee.
91. Find the previous performance rating for every employee.
92. Find employees whose latest performance rating is higher than their previous rating.
93. Find the highest-rated employee in every department.
94. Calculate a running total of salaries ordered by employee ID.
95. Calculate a running average salary ordered by employee ID.

---

# 🔴 Level 6 — Salary History & Advanced Queries (96–110)

96. Find employees who received more than one salary revision.
97. Find employees with exactly one salary record.
98. Find the first salary of every employee.
99. Find the latest salary of every employee.
100. Find the salary increase amount for every employee.
101. Find the salary increase percentage for every employee.
102. Find the employee with the highest salary increase amount.
103. Find the employee with the highest salary increase percentage.
104. Find employees whose salary increased by more than 20%.
105. Find employees whose salary increased more than once.
106. Find employees whose salary increased in every revision.
107. Find employees whose latest salary is lower than their previous salary.
108. Find the average salary increase percentage by department.
109. Find the department with the highest average salary growth.
110. Find the top 5 employees based on salary growth percentage.

---

# 🔴 Level 7 — Manager / Hierarchical Queries (111–120)

111. Display each employee along with their manager's name.
112. Find employees who do not have a manager.
113. Find managers who have more than 2 direct reports.
114. Find the number of employees reporting to each manager.
115. Find employees earning more than their manager.
116. Find employees earning less than their manager.
117. Find the highest-paid employee reporting to each manager.
118. Find managers whose average team salary is greater than ₹10 lakh.
119. Find employees who report directly to the Data Engineering manager.
120. Find the complete employee-manager hierarchy using a recursive CTE.

---

## 🔥 Bonus — Real Interview Scenarios (121–150)

121. Find duplicate employee email addresses.

122. Find duplicate employee records based on first name, last name, and date of birth.

123. Find employees who share the same salary.

124. Find employees who share the same manager and salary.

125. Find departments where every employee earns more than ₹10 lakh.

126. Find departments where at least one employee earns more than ₹20 lakh.

127. Find employees who are not assigned to any project.

128. Find employees assigned to more than 2 projects.

129. Find the employee working on the maximum number of projects.

130. Find the project with the highest number of employees.

131. Find the employee with the highest total project allocation percentage.

132. Find employees whose total project allocation exceeds 100%.

133. Find projects where total employee allocation exceeds 100%.

134. Find employees working on projects from multiple departments.

135. Find employees whose department and project department are different.

136. Find the average project allocation by department.

137. Find the highest-budget project in each department.

138. Find the second-highest-budget project in each department.

139. Find projects that started but have no employees assigned.

140. Find employees who have never received a performance review.

141. Find employees whose latest performance rating is above 4.0.

142. Find the average performance rating by department.

143. Find the department with the highest average performance rating.

144. Find employees whose salary is above their department average but whose performance rating is below the department average.

145. Find employees who received an `EXCELLENT` performance rating and have a salary below their department average.

146. Find employees who have received salary increases but whose performance rating decreased.

147. Find employees who have both the highest salary and highest performance rating in their department.

148. Find the department with the highest salary cost per employee.

149. Find the top 10 employees based on a combination of salary and performance rating.

150. Create a department-level report containing **employee count, average salary, maximum salary, minimum salary, total salary, average performance rating, and project count**.

### 🚀 Challenge Order

For your **Senior Data Engineer SQL interview preparation**, solve them in this order:

**1–40 → Fundamentals**
**41–60 → JOINs**
**61–75 → Subqueries**
**76–95 → Window Functions**
**96–110 → Salary Analytics**
**111–120 → Recursive/Manager SQL**
**121–150 → Real-world interview scenarios**

Send me **Q1's query** when you're ready. I'll act as the interviewer and evaluate your SQL without immediately giving you the answer.
