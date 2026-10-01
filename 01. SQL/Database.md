-- =========================================================
-- EMPLOYEE SQL INTERVIEW PRACTICE DATABASE
-- PostgreSQL
-- =========================================================

```sql

-- CREATE DATABASE "EmployeeDB";
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS leaves CASCADE;
DROP TABLE IF EXISTS performance_reviews CASCADE;
DROP TABLE IF EXISTS salaries CASCADE;
DROP TABLE IF EXISTS employee_projects CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS departments CASCADE;


-- =========================================================
-- 1. DEPARTMENTS
-- =========================================================

CREATE TABLE departments (
    department_id   INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location        VARCHAR(100),
    budget          NUMERIC(15,2),
    created_date    DATE DEFAULT CURRENT_DATE
);


-- =========================================================
-- 2. EMPLOYEES
-- =========================================================

CREATE TABLE employees (
    employee_id     INT PRIMARY KEY,
    first_name      VARCHAR(50) NOT NULL,
    last_name       VARCHAR(50) NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    gender          VARCHAR(10),
    date_of_birth   DATE,
    hire_date       DATE NOT NULL,

    department_id   INT,
    manager_id      INT,

    job_title       VARCHAR(100),
    employment_type VARCHAR(30),
    city            VARCHAR(100),
    status          VARCHAR(20) DEFAULT 'ACTIVE',

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id),

    CONSTRAINT fk_employee_manager
        FOREIGN KEY (manager_id)
        REFERENCES employees(employee_id)
);


-- =========================================================
-- 3. SALARIES
-- =========================================================

CREATE TABLE salaries (
    salary_id       INT PRIMARY KEY,
    employee_id     INT NOT NULL,
    salary          NUMERIC(12,2) NOT NULL,
    effective_from  DATE NOT NULL,
    effective_to    DATE,

    CONSTRAINT fk_salary_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
);


-- =========================================================
-- 4. PROJECTS
-- =========================================================

CREATE TABLE projects (
    project_id      INT PRIMARY KEY,
    project_name    VARCHAR(150) NOT NULL,
    department_id   INT,
    start_date      DATE,
    end_date        DATE,
    budget          NUMERIC(15,2),
    status          VARCHAR(30),

    CONSTRAINT fk_project_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);


-- =========================================================
-- 5. EMPLOYEE PROJECT MAPPING
-- =========================================================

CREATE TABLE employee_projects (
    employee_id     INT,
    project_id      INT,
    role            VARCHAR(100),
    allocation_pct  NUMERIC(5,2),
    assigned_date   DATE,

    PRIMARY KEY (employee_id, project_id),

    CONSTRAINT fk_ep_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id),

    CONSTRAINT fk_ep_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
);


-- =========================================================
-- 6. PERFORMANCE REVIEWS
-- =========================================================

CREATE TABLE performance_reviews (
    review_id       INT PRIMARY KEY,
    employee_id     INT NOT NULL,
    review_year     INT NOT NULL,
    rating          NUMERIC(3,2),
    performance     VARCHAR(30),
    reviewer_id     INT,
    comments        TEXT,

    CONSTRAINT fk_review_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id),

    CONSTRAINT fk_review_reviewer
        FOREIGN KEY (reviewer_id)
        REFERENCES employees(employee_id)
);


-- =========================================================
-- 7. ATTENDANCE
-- =========================================================

CREATE TABLE attendance (
    attendance_id   BIGINT PRIMARY KEY,
    employee_id     INT NOT NULL,
    attendance_date DATE NOT NULL,
    status          VARCHAR(20),
    check_in        TIME,
    check_out       TIME,

    CONSTRAINT fk_attendance_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
);


-- =========================================================
-- 8. LEAVES
-- =========================================================

CREATE TABLE leaves (
    leave_id       INT PRIMARY KEY,
    employee_id    INT NOT NULL,
    leave_type     VARCHAR(50),
    start_date     DATE NOT NULL,
    end_date       DATE NOT NULL,
    status         VARCHAR(20),
    reason         TEXT,

    CONSTRAINT fk_leave_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
);

INSERT INTO departments
(department_id, department_name, location, budget)
VALUES
(1, 'Engineering',       'Pune',      25000000),
(2, 'Data Engineering',  'Pune',      18000000),
(3, 'Data Analytics',    'Mumbai',     9000000),
(4, 'Human Resources',   'Pune',       6000000),
(5, 'Finance',            'Mumbai',    12000000),
(6, 'Marketing',          'Bangalore',  8000000),
(7, 'Sales',              'Delhi',     15000000),
(8, 'IT Support',         'Pune',       7000000),
(9, 'Product',            'Bangalore', 14000000),
(10,'Risk & Compliance',  'Mumbai',    10000000);

INSERT INTO employees
(employee_id, first_name, last_name, email, gender,
 date_of_birth, hire_date, department_id, manager_id,
 job_title, employment_type, city, status)
VALUES

-- Engineering
(101, 'Amit', 'Sharma', 'amit.sharma@company.com', 'Male',
 '1990-05-12', '2018-01-15', 1, NULL,
 'Engineering Manager', 'FULL_TIME', 'Pune', 'ACTIVE'),

(102, 'Rahul', 'Patil', 'rahul.patil@company.com', 'Male',
 '1994-08-21', '2020-03-10', 1, 101,
 'Senior Software Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

(103, 'Priya', 'Deshmukh', 'priya.deshmukh@company.com', 'Female',
 '1995-02-15', '2021-06-14', 1, 101,
 'Software Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

(104, 'Sneha', 'Kulkarni', 'sneha.kulkarni@company.com', 'Female',
 '1993-11-03', '2019-09-20', 1, 101,
 'Senior Software Engineer', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(105, 'Vikas', 'Joshi', 'vikas.joshi@company.com', 'Male',
 '1996-01-18', '2022-01-10', 1, 104,
 'Software Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

-- Data Engineering
(106, 'Ashish', 'Zope', 'ashish.zope@company.com', 'Male',
 '1996-12-17', '2022-11-14', 2, NULL,
 'Senior Data Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

(107, 'Neha', 'Shinde', 'neha.shinde@company.com', 'Female',
 '1995-07-11', '2021-02-01', 2, 106,
 'Data Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

(108, 'Karan', 'More', 'karan.more@company.com', 'Male',
 '1997-04-25', '2023-01-16', 2, 106,
 'Data Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

(109, 'Pooja', 'Jadhav', 'pooja.jadhav@company.com', 'Female',
 '1998-09-09', '2023-07-03', 2, 106,
 'Junior Data Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

(110, 'Rohit', 'Chavan', 'rohit.chavan@company.com', 'Male',
 '1992-03-22', '2019-04-08', 2, 106,
 'Lead Data Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

-- Data Analytics
(111, 'Anjali', 'Pawar', 'anjali.pawar@company.com', 'Female',
 '1994-12-19', '2020-08-17', 3, NULL,
 'Analytics Manager', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(112, 'Sagar', 'Thakur', 'sagar.thakur@company.com', 'Male',
 '1996-06-07', '2022-02-14', 3, 111,
 'Data Analyst', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(113, 'Megha', 'Rane', 'megha.rane@company.com', 'Female',
 '1997-10-12', '2022-09-19', 3, 111,
 'Data Analyst', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(114, 'Nikhil', 'Bhosale', 'nikhil.bhosale@company.com', 'Male',
 '1995-03-05', '2021-11-01', 3, 111,
 'Senior Data Analyst', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

-- HR
(115, 'Kavita', 'Mehta', 'kavita.mehta@company.com', 'Female',
 '1989-04-17', '2017-05-15', 4, NULL,
 'HR Manager', 'FULL_TIME', 'Pune', 'ACTIVE'),

(116, 'Riya', 'Shah', 'riya.shah@company.com', 'Female',
 '1995-08-30', '2021-01-11', 4, 115,
 'HR Executive', 'FULL_TIME', 'Pune', 'ACTIVE'),

(117, 'Manish', 'Verma', 'manish.verma@company.com', 'Male',
 '1993-12-08', '2019-10-21', 4, 115,
 'HR Business Partner', 'FULL_TIME', 'Pune', 'ACTIVE'),

-- Finance
(118, 'Deepak', 'Gupta', 'deepak.gupta@company.com', 'Male',
 '1988-01-14', '2016-03-21', 5, NULL,
 'Finance Manager', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(119, 'Swati', 'Agrawal', 'swati.agrawal@company.com', 'Female',
 '1994-05-27', '2020-05-18', 5, 118,
 'Financial Analyst', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(120, 'Akshay', 'Kale', 'akshay.kale@company.com', 'Male',
 '1996-02-09', '2022-06-13', 5, 118,
 'Accountant', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

-- Marketing
(121, 'Sonal', 'Nair', 'sonal.nair@company.com', 'Female',
 '1991-09-18', '2018-07-09', 6, NULL,
 'Marketing Manager', 'FULL_TIME', 'Bangalore', 'ACTIVE'),

(122, 'Varun', 'Singh', 'varun.singh@company.com', 'Male',
 '1995-11-23', '2021-04-12', 6, 121,
 'Marketing Executive', 'FULL_TIME', 'Bangalore', 'ACTIVE'),

(123, 'Isha', 'Kapoor', 'isha.kapoor@company.com', 'Female',
 '1998-01-07', '2023-03-06', 6, 121,
 'Marketing Analyst', 'FULL_TIME', 'Bangalore', 'ACTIVE'),

-- Sales
(124, 'Rajesh', 'Yadav', 'rajesh.yadav@company.com', 'Male',
 '1987-07-25', '2015-02-16', 7, NULL,
 'Sales Director', 'FULL_TIME', 'Delhi', 'ACTIVE'),

(125, 'Mohit', 'Gupta', 'mohit.gupta@company.com', 'Male',
 '1992-10-14', '2019-06-03', 7, 124,
 'Sales Manager', 'FULL_TIME', 'Delhi', 'ACTIVE'),

(126, 'Aarti', 'Mishra', 'aarti.mishra@company.com', 'Female',
 '1996-03-16', '2022-04-18', 7, 125,
 'Sales Executive', 'FULL_TIME', 'Delhi', 'ACTIVE'),

(127, 'Vivek', 'Kumar', 'vivek.kumar@company.com', 'Male',
 '1995-12-20', '2021-09-27', 7, 125,
 'Sales Executive', 'FULL_TIME', 'Delhi', 'ACTIVE'),

-- IT
(128, 'Sameer', 'Joshi', 'sameer.joshi@company.com', 'Male',
 '1990-06-11', '2018-11-12', 8, NULL,
 'IT Manager', 'FULL_TIME', 'Pune', 'ACTIVE'),

(129, 'Pankaj', 'Mane', 'pankaj.mane@company.com', 'Male',
 '1994-02-28', '2020-12-07', 8, 128,
 'System Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

(130, 'Komal', 'Sawant', 'komal.sawant@company.com', 'Female',
 '1997-05-06', '2023-02-20', 8, 128,
 'Support Engineer', 'FULL_TIME', 'Pune', 'ACTIVE'),

-- Product
(131, 'Arjun', 'Malhotra', 'arjun.malhotra@company.com', 'Male',
 '1989-11-11', '2017-08-14', 9, NULL,
 'Product Manager', 'FULL_TIME', 'Bangalore', 'ACTIVE'),

(132, 'Tanvi', 'Joshi', 'tanvi.joshi@company.com', 'Female',
 '1994-07-29', '2020-09-14', 9, 131,
 'Product Analyst', 'FULL_TIME', 'Bangalore', 'ACTIVE'),

(133, 'Harsh', 'Patel', 'harsh.patel@company.com', 'Male',
 '1996-09-17', '2022-10-10', 9, 131,
 'Product Analyst', 'FULL_TIME', 'Bangalore', 'ACTIVE'),

-- Risk
(134, 'Nitin', 'Saxena', 'nitin.saxena@company.com', 'Male',
 '1988-12-02', '2016-11-21', 10, NULL,
 'Risk Manager', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(135, 'Shruti', 'Joshi', 'shruti.joshi@company.com', 'Female',
 '1995-01-31', '2021-03-15', 10, 134,
 'Risk Analyst', 'FULL_TIME', 'Mumbai', 'ACTIVE'),

(136, 'Omkar', 'Pawar', 'omkar.pawar@company.com', 'Male',
 '1997-06-22', '2023-05-08', 10, 134,
 'Risk Analyst', 'FULL_TIME', 'Mumbai', 'ACTIVE');


INSERT INTO salaries
(salary_id, employee_id, salary, effective_from, effective_to)
VALUES

(1,101,1800000,'2018-01-15','2020-01-31'),
(2,101,2200000,'2020-02-01','2022-03-31'),
(3,101,2800000,'2022-04-01',NULL),

(4,102,1000000,'2020-03-10','2022-03-31'),
(5,102,1350000,'2022-04-01','2024-03-31'),
(6,102,1750000,'2024-04-01',NULL),

(7,103,700000,'2021-06-14','2023-03-31'),
(8,103,900000,'2023-04-01','2025-03-31'),
(9,103,1200000,'2025-04-01',NULL),

(10,104,1200000,'2019-09-20','2021-09-30'),
(11,104,1550000,'2021-10-01','2024-03-31'),
(12,104,2000000,'2024-04-01',NULL),

(13,105,650000,'2022-01-10','2024-03-31'),
(14,105,850000,'2024-04-01',NULL),

(15,106,900000,'2022-11-14','2023-03-31'),
(16,106,1200000,'2023-04-01','2025-03-31'),
(17,106,1800000,'2025-04-01',NULL),

(18,107,850000,'2021-02-01','2023-03-31'),
(19,107,1100000,'2023-04-01',NULL),

(20,108,700000,'2023-01-16','2024-03-31'),
(21,108,950000,'2024-04-01',NULL),

(22,109,500000,'2023-07-03','2025-03-31'),
(23,109,700000,'2025-04-01',NULL),

(24,110,1400000,'2019-04-08','2022-03-31'),
(25,110,1800000,'2022-04-01','2024-03-31'),
(26,110,2300000,'2024-04-01',NULL),

(27,111,1600000,'2020-08-17','2023-03-31'),
(28,111,2000000,'2023-04-01',NULL),

(29,112,700000,'2022-02-14','2024-03-31'),
(30,112,950000,'2024-04-01',NULL),

(31,113,650000,'2022-09-19','2024-03-31'),
(32,113,900000,'2024-04-01',NULL),

(33,114,1000000,'2021-11-01','2023-03-31'),
(34,114,1350000,'2023-04-01',NULL),

(35,115,1500000,'2017-05-15','2020-03-31'),
(36,115,1900000,'2020-04-01',NULL),

(37,116,600000,'2021-01-11','2023-03-31'),
(38,116,800000,'2023-04-01',NULL),

(39,117,1000000,'2019-10-21','2022-03-31'),
(40,117,1250000,'2022-04-01',NULL),

(41,118,1700000,'2016-03-21','2020-03-31'),
(42,118,2200000,'2020-04-01',NULL),

(43,119,750000,'2020-05-18','2023-03-31'),
(44,119,1000000,'2023-04-01',NULL),

(45,120,600000,'2022-06-13','2024-03-31'),
(46,120,800000,'2024-04-01',NULL),

(47,121,1400000,'2018-07-09','2022-03-31'),
(48,121,1900000,'2022-04-01',NULL),

(49,122,700000,'2021-04-12','2024-03-31'),
(50,122,950000,'2024-04-01',NULL),

(51,123,550000,'2023-03-06','2025-03-31'),
(52,123,750000,'2025-04-01',NULL),

(53,124,2500000,'2015-02-16','2020-03-31'),
(54,124,3200000,'2020-04-01',NULL),

(55,125,1300000,'2019-06-03','2022-03-31'),
(56,125,1700000,'2022-04-01',NULL),

(57,126,650000,'2022-04-18','2024-03-31'),
(58,126,850000,'2024-04-01',NULL),

(59,127,700000,'2021-09-27','2024-03-31'),
(60,127,900000,'2024-04-01',NULL),

(61,128,1500000,'2018-11-12','2022-03-31'),
(62,128,1900000,'2022-04-01',NULL),

(63,129,750000,'2020-12-07','2023-03-31'),
(64,129,1000000,'2023-04-01',NULL),

(65,130,550000,'2023-02-20','2025-03-31'),
(66,130,700000,'2025-04-01',NULL),

(67,131,2000000,'2017-08-14','2021-03-31'),
(68,131,2600000,'2021-04-01',NULL),

(69,132,850000,'2020-09-14','2023-03-31'),
(70,132,1100000,'2023-04-01',NULL),

(71,133,650000,'2022-10-10','2024-03-31'),
(72,133,850000,'2024-04-01',NULL),

(73,134,1900000,'2016-11-21','2020-03-31'),
(74,134,2500000,'2020-04-01',NULL),

(75,135,800000,'2021-03-15','2024-03-31'),
(76,135,1100000,'2024-04-01',NULL),

(77,136,600000,'2023-05-08','2025-03-31'),
(78,136,800000,'2025-04-01',NULL);



INSERT INTO projects
(project_id, project_name, department_id, start_date, end_date, budget, status)
VALUES
(201,'Customer 360',2,'2023-01-01','2024-12-31',5000000,'COMPLETED'),
(202,'EMI Platform',1,'2022-04-01',NULL,8000000,'ACTIVE'),
(203,'Data Lake Migration',2,'2024-01-01',NULL,10000000,'ACTIVE'),
(204,'Fraud Detection',10,'2023-06-01',NULL,6000000,'ACTIVE'),
(205,'Sales Analytics',3,'2024-02-01',NULL,3500000,'ACTIVE'),
(206,'Mobile Banking',1,'2021-05-01','2023-12-31',7000000,'COMPLETED'),
(207,'HR Automation',4,'2024-04-01',NULL,2500000,'ACTIVE'),
(208,'Marketing Analytics',6,'2023-08-01',NULL,3000000,'ACTIVE'),
(209,'Cloud Migration',8,'2024-01-15',NULL,5500000,'ACTIVE'),
(210,'Product Recommendation',9,'2024-05-01',NULL,4500000,'ACTIVE');

INSERT INTO employee_projects
(employee_id, project_id, role, allocation_pct, assigned_date)
VALUES

(102,202,'Backend Developer',80,'2022-04-01'),
(103,202,'Backend Developer',70,'2022-04-01'),
(104,206,'Senior Developer',80,'2021-05-01'),
(105,202,'Developer',60,'2022-04-01'),

(106,201,'Data Engineer',50,'2023-01-01'),
(106,203,'Lead Data Engineer',80,'2024-01-01'),
(106,205,'Data Engineer',30,'2024-02-01'),

(107,201,'Data Engineer',80,'2023-01-01'),
(107,203,'Data Engineer',70,'2024-01-01'),

(108,203,'Data Engineer',80,'2024-01-01'),
(108,204,'Data Engineer',30,'2024-01-01'),

(109,203,'Junior Data Engineer',70,'2024-01-01'),

(110,201,'Lead Data Engineer',60,'2023-01-01'),
(110,203,'Lead Data Engineer',80,'2024-01-01'),
(110,209,'Technical Lead',40,'2024-01-15'),

(112,205,'Data Analyst',80,'2024-02-01'),
(113,205,'Data Analyst',70,'2024-02-01'),
(114,201,'Senior Analyst',40,'2023-01-01'),
(114,205,'Senior Analyst',80,'2024-02-01'),

(116,207,'HR Analyst',80,'2024-04-01'),

(119,205,'Financial Analyst',30,'2024-02-01'),

(122,208,'Marketing Executive',80,'2023-08-01'),
(123,208,'Marketing Analyst',80,'2023-08-01'),

(125,205,'Sales Manager',30,'2024-02-01'),

(129,209,'System Engineer',80,'2024-01-15'),
(130,209,'Support Engineer',60,'2024-01-15'),

(132,210,'Product Analyst',80,'2024-05-01'),
(133,210,'Product Analyst',80,'2024-05-01');

INSERT INTO performance_reviews
(review_id, employee_id, review_year, rating, performance, reviewer_id, comments)
VALUES
(1,101,2023,4.50,'EXCELLENT',NULL,'Strong leadership'),
(2,102,2023,4.20,'EXCELLENT',101,'Excellent technical skills'),
(3,103,2023,3.80,'GOOD',101,'Consistent performance'),
(4,104,2023,4.60,'EXCELLENT',101,'Strong ownership'),

(5,106,2023,4.40,'EXCELLENT',NULL,'Strong data engineering skills'),
(6,106,2024,4.70,'EXCELLENT',NULL,'Excellent project delivery'),

(7,107,2023,4.00,'GOOD',106,'Good technical growth'),
(8,108,2024,3.70,'GOOD',106,'Good progress'),
(9,109,2024,3.50,'GOOD',106,'Needs more experience'),

(10,110,2023,4.60,'EXCELLENT',106,'Excellent leadership'),
(11,110,2024,4.80,'EXCELLENT',106,'Outstanding performance'),

(12,111,2023,4.30,'EXCELLENT',NULL,'Strong analytics leadership'),
(13,112,2024,3.90,'GOOD',111,'Good analytical skills'),
(14,113,2024,4.10,'GOOD',111,'Good performance'),
(15,114,2024,4.50,'EXCELLENT',111,'Strong analytical ownership'),

(16,115,2023,4.40,'EXCELLENT',NULL,'Strong HR leadership'),
(17,116,2024,3.80,'GOOD',115,'Good HR operations'),

(18,118,2023,4.50,'EXCELLENT',NULL,'Strong financial management'),
(19,119,2024,4.00,'GOOD',118,'Good financial analysis'),

(20,121,2023,4.10,'GOOD',NULL,'Strong marketing leadership'),
(21,122,2024,3.80,'GOOD',121,'Good execution'),

(22,124,2023,4.70,'EXCELLENT',NULL,'Excellent sales leadership'),
(23,125,2024,4.30,'EXCELLENT',124,'Strong sales management'),

(24,128,2023,4.20,'EXCELLENT',NULL,'Strong IT leadership'),
(25,129,2024,3.90,'GOOD',128,'Good technical support'),

(26,131,2023,4.60,'EXCELLENT',NULL,'Excellent product leadership'),
(27,132,2024,4.10,'GOOD',131,'Good product analysis'),

(28,134,2023,4.50,'EXCELLENT',NULL,'Strong risk management'),
(29,135,2024,4.00,'GOOD',134,'Good risk analysis');

INSERT INTO leaves
(leave_id, employee_id, leave_type, start_date, end_date, status, reason)
VALUES
(1,102,'CASUAL','2024-01-10','2024-01-11','APPROVED','Personal work'),
(2,103,'SICK','2024-02-05','2024-02-07','APPROVED','Health'),
(3,106,'CASUAL','2024-03-15','2024-03-15','APPROVED','Personal work'),
(4,107,'SICK','2024-04-10','2024-04-12','APPROVED','Health'),
(5,108,'CASUAL','2024-05-20','2024-05-21','APPROVED','Personal work'),
(6,109,'SICK','2024-06-03','2024-06-04','APPROVED','Health'),
(7,110,'CASUAL','2024-07-15','2024-07-17','APPROVED','Vacation'),
(8,112,'CASUAL','2024-08-01','2024-08-02','APPROVED','Personal work'),
(9,113,'SICK','2024-09-10','2024-09-12','APPROVED','Health'),
(10,114,'CASUAL','2024-10-21','2024-10-22','APPROVED','Personal work'),
(11,116,'CASUAL','2024-11-11','2024-11-12','APPROVED','Personal work'),
(12,119,'SICK','2024-12-05','2024-12-06','APPROVED','Health');


INSERT INTO attendance
(attendance_id, employee_id, attendance_date, status, check_in, check_out)
VALUES
(1,101,'2024-01-01','PRESENT','09:15','18:20'),
(2,102,'2024-01-01','PRESENT','09:30','18:10'),
(3,103,'2024-01-01','ABSENT',NULL,NULL),
(4,104,'2024-01-01','PRESENT','09:05','18:00'),
(5,106,'2024-01-01','PRESENT','09:20','18:30'),
(6,107,'2024-01-01','LATE','10:15','19:00'),
(7,108,'2024-01-01','PRESENT','09:40','18:15'),
(8,109,'2024-01-01','ABSENT',NULL,NULL),
(9,110,'2024-01-01','PRESENT','09:00','18:30'),
(10,111,'2024-01-01','PRESENT','09:10','18:00'),
(11,112,'2024-01-01','PRESENT','09:25','18:10'),
(12,113,'2024-01-01','LATE','10:30','19:15'),
(13,114,'2024-01-01','PRESENT','09:05','18:05'),
(14,115,'2024-01-01','PRESENT','09:00','18:00'),
(15,116,'2024-01-01','ABSENT',NULL,NULL),
(16,118,'2024-01-01','PRESENT','09:10','18:15'),
(17,119,'2024-01-01','PRESENT','09:20','18:00'),
(18,121,'2024-01-01','PRESENT','09:30','18:30'),
(19,124,'2024-01-01','PRESENT','09:00','18:45'),
(20,125,'2024-01-01','LATE','10:00','19:00');




```