<!------------------------------------------------------------------------------------------------------------------------->
<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; font-size: 50px; color: rgba(0,0,0,0.05); transform: rotate(-33deg); display: flex; font-weight: bold;flex-wrap: wrap; align-content: center; justify-content: center; pointer-events: none;">💼 LinkedIn · @AshishZope</div>
<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: flex; align-items: center; justify-content: center; transform: rotate(0deg);"><img src="../99. Master/profile-photo.png" alt="Watermark" style="width: 400px; opacity: 0.09;"></div>
<div style="position: fixed; inset: 0; background-image: url('watermark.png'); background-repeat: repeat; background-size: 280px; opacity: 0.02; transform: rotate(-33deg); pointer-events: none;"></div>

<style>.line { display: block; position: relative; padding-right: 160px; line-height: 1.6;}.line::after { content: " 💼 LinkedIn · @AshishZope"; position: absolute; right: 0; bottom: 0; font-size: 9px; font-weight: 500; letter-spacing: 1.1px; color: rgba(0, 0, 0, 0.5); white-space: nowrap; user-select: none; pointer-events: none; }</style>

<!------------------------------------------------------------------------------------------------------------------------->

<h1 style="color:#154360; text-align:center; font-size:2.5em; font-weight:bold; margin-bottom:0; letter-spacing:1px; font-family: 'Segoe UI', sans-serif;"><span style="color:#1C4980;">Azure Data Factory (ADF)</span></h1>

# Table of Contents

1. Introduction to Azure Data Factory
2. Why Use ADF
3. Core Concepts of ADF
4. ADF Architecture
5. Azure Data Factory Components
6. Azure Portal Basics
7. Creating Azure Free Account
8. Creating Azure Data Factory Instance
9. Understanding Integration Runtime
10. Linked Services
11. Datasets
12. Pipelines
13. Activities in ADF
14. Copy Data Activity
15. Data Flow
16. Control Flow Activities
17. Parameters and Variables
18. Expressions and Dynamic Content
19. Triggers
20. Monitoring and Debugging
21. Error Handling
22. Incremental Load
23. Full Load
24. ETL vs ELT in ADF
25. Connecting Different Data Sources
26. SQL Integration with ADF
27. File Handling in ADF
28. REST API Integration
29. Scheduling Pipelines
30. CI/CD in ADF
31. Git Integration
32. ARM Templates
33. Security in ADF
34. Managed Identity
35. Role-Based Access Control (RBAC)
36. Azure Key Vault Integration
37. Performance Optimization
38. Logging and Monitoring
39. Data Lake Integration
40. Synapse Integration
41. Databricks Integration
42. Snowflake Integration
43. SAP Integration
44. Real-Time Scenarios
45. End-to-End Projects
46. Best Practices
47. Common Interview Questions
48. ADF Developer Roadmap
49. ADF Naming Standards
50. Important Terminologies
51. Common Errors and Fixes
52. Certification Guidance
53. Learning Resources
54. Conclusion

---

# 1. Introduction to Azure Data Factory

Azure Data Factory (ADF) is Microsoft’s cloud-based data integration service used for:

* Data movement
* Data transformation
* Data orchestration
* ETL and ELT processing
* Scheduling and automation
* Building data pipelines

ADF helps organizations move data from multiple sources into data warehouses, data lakes, databases, APIs, and analytics platforms.

ADF is mainly used by:

* Data Engineers
* BI Engineers
* Cloud Engineers
* Analytics Teams
* Data Architects

---

# 2. Why Use ADF

## Advantages of ADF

* Fully cloud-based
* Scalable architecture
* Supports 100+ connectors
* Low-code/no-code environment
* Easy scheduling
* Supports ETL and ELT
* Cost-effective
* Enterprise-grade security
* Supports hybrid integration
* Easy monitoring

## Real-Time Uses

* Daily sales data loading
* Banking transaction processing
* API ingestion
* Data warehouse loading
* Data lake ingestion
* CRM data synchronization
* ERP integration
* Log processing

---

# 3. Core Concepts of ADF

## Main Building Blocks

| Component           | Description                     |
| ------------------- | ------------------------------- |
| Pipeline            | Group of activities             |
| Activity            | Single task inside pipeline     |
| Dataset             | Data structure reference        |
| Linked Service      | Connection string/configuration |
| Trigger             | Executes pipeline automatically |
| Integration Runtime | Compute infrastructure          |
| Data Flow           | Visual transformation engine    |

---

# 4. ADF Architecture

## ADF Architecture Flow

Source System → Linked Service → Dataset → Pipeline → Activity → Destination

## Layers

### Source Layer

* SQL Server
* Oracle
* SAP
* REST API
* Blob Storage
* AWS S3
* FTP
* Excel
* CSV

### Processing Layer

* Copy Activity
* Data Flow
* Databricks
* Stored Procedures

### Destination Layer

* Azure SQL
* Synapse
* Data Lake
* Snowflake
* Cosmos DB

---

# 5. Azure Data Factory Components

## 5.1 Pipelines

Pipeline is a logical grouping of activities.

Example:

* Extract customer data
* Transform data
* Load into SQL database
* Send notification email

## 5.2 Activities

Activities perform actual work.

### Types of Activities

| Activity Type    | Purpose               |
| ---------------- | --------------------- |
| Copy Activity    | Move data             |
| Data Flow        | Transform data        |
| Lookup           | Read small data       |
| ForEach          | Loop processing       |
| If Condition     | Conditional execution |
| Stored Procedure | Execute SQL procedure |
| Web Activity     | Call APIs             |
| Execute Pipeline | Call another pipeline |

## 5.3 Datasets

Datasets represent the structure of data.

Examples:

* CSV file
* SQL table
* JSON file
* Parquet file

## 5.4 Linked Services

Linked services define connection information.

Examples:

* SQL connection
* Blob storage connection
* REST API connection

## 5.5 Triggers

Triggers automate pipeline execution.

Types:

* Schedule Trigger
* Tumbling Window Trigger
* Event Trigger

---

# 6. Azure Portal Basics

## Important Azure Services

| Service            | Purpose                 |
| ------------------ | ----------------------- |
| Resource Group     | Container for resources |
| Storage Account    | Store files/data        |
| Azure SQL Database | Database service        |
| Key Vault          | Secrets management      |
| Virtual Network    | Networking              |
| Monitor            | Logging and monitoring  |

---

# 7. Creating Azure Free Account

## Steps

1. Go to Azure official website
2. Create Microsoft account
3. Verify mobile number
4. Add card details
5. Activate free subscription

## Free Services

* Free credits
* Limited free storage
* Free databases
* Limited compute

---

# 8. Creating Azure Data Factory Instance

## Steps

1. Login to Azure Portal
2. Search for Azure Data Factory
3. Click Create
4. Select subscription
5. Select resource group
6. Enter factory name
7. Select region
8. Click Review + Create
9. Click Create

---

# 9. Understanding Integration Runtime

Integration Runtime (IR) is the compute infrastructure used by ADF.

## Types of IR

| Type           | Purpose                 |
| -------------- | ----------------------- |
| Azure IR       | Cloud data movement     |
| Self-Hosted IR | On-premise connectivity |
| Azure SSIS IR  | Execute SSIS packages   |

## Self-Hosted IR Usage

Used when:

* Data is inside local servers
* Firewall restrictions exist
* Private network access required

---

# 10. Linked Services

Linked service acts like a connection manager.

## Common Linked Services

* Azure Blob Storage
* Azure SQL Database
* SQL Server
* Oracle
* Snowflake
* REST API
* Amazon S3
* FTP/SFTP

## Steps to Create Linked Service

1. Open Manage Hub
2. Click Linked Services
3. Click New
4. Select connector
5. Enter credentials
6. Test connection
7. Create

---

# 11. Datasets

Dataset defines data structure.

## Dataset Examples

| Dataset Type   | Example                  |
| -------------- | ------------------------ |
| Delimited Text | CSV file                 |
| JSON           | API response             |
| Parquet        | Optimized analytics file |
| SQL Table      | Employee table           |

## Parameters in Dataset

Datasets can use dynamic values.

Example:

* Dynamic file names
* Dynamic table names
* Dynamic folder paths

---

# 12. Pipelines

Pipeline is the main orchestration component.

## Pipeline Features

* Sequential execution
* Parallel execution
* Conditional execution
* Dynamic execution
* Scheduling

## Real-Time Example

1. Read CSV file
2. Validate data
3. Load to staging table
4. Execute stored procedure
5. Send success email

---

# 13. Activities in ADF

## 13.1 Copy Activity

Used to move data.

### Supported Sources

* SQL
* Oracle
* Blob
* S3
* FTP
* APIs

### Supported Destinations

* Synapse
* SQL Database
* Data Lake
* Snowflake

## 13.2 Lookup Activity

Used to fetch small amounts of data.

## 13.3 Get Metadata Activity

Used to retrieve:

* File names
* File size
* Last modified date

## 13.4 Delete Activity

Deletes files/folders.

## 13.5 Validation Activity

Validates file existence.

---

# 14. Copy Data Activity

Copy activity is the most used activity.

## Working Flow

Source → Staging → Destination

## Features

* Parallel copy
* Schema mapping
* Fault tolerance
* Compression support
* Incremental copy

## Copy Activity Settings

| Setting         | Purpose           |
| --------------- | ----------------- |
| Source          | Input data        |
| Sink            | Destination       |
| Mapping         | Column mapping    |
| Fault tolerance | Skip errors       |
| Staging         | Temporary storage |

---

# 15. Data Flow

Data Flow is used for visual data transformation.

## Types

| Type                | Purpose           |
| ------------------- | ----------------- |
| Mapping Data Flow   | Transformation    |
| Wrangling Data Flow | Power Query-based |

## Common Transformations

* Filter
* Derived Column
* Join
* Aggregate
* Sort
* Union
* Conditional Split
* Lookup
* Window

## Data Flow Architecture

Source → Transformation → Sink

---

# 16. Control Flow Activities

## Important Control Activities

| Activity     | Purpose                     |
| ------------ | --------------------------- |
| If Condition | Conditional logic           |
| Switch       | Multiple conditions         |
| Until        | Loop until condition met    |
| ForEach      | Iterate collections         |
| Wait         | Delay execution             |
| Fail         | Fail pipeline intentionally |

---

# 17. Parameters and Variables

## Parameters

Used to pass values dynamically.

### Example

* File name
* Table name
* Date value

## Variables

Used to store values temporarily.

### Variable Types

* String
* Boolean
* Array
* Integer

---

# 18. Expressions and Dynamic Content

ADF uses dynamic expressions.

## Common Functions

| Function    | Purpose           |
| ----------- | ----------------- |
| concat()    | Combine strings   |
| utcNow()    | Current UTC time  |
| pipeline()  | Pipeline metadata |
| variables() | Access variable   |
| activity()  | Activity output   |
| substring() | Extract text      |

## Example

```text
@concat('File_',utcNow(),'.csv')
```

---

# 19. Triggers

Triggers automate execution.

## 19.1 Schedule Trigger

Runs pipeline at fixed intervals.

Example:

* Daily at 9 PM
* Every hour

## 19.2 Tumbling Window Trigger

Processes data in chunks/windows.

Used in incremental loading.

## 19.3 Event Trigger

Executes when:

* File arrives
* Blob created
* Blob deleted

---

# 20. Monitoring and Debugging

## Monitoring Options

* Pipeline runs
* Activity runs
* Trigger runs
* Error logs

## Debug Mode

Used for testing pipelines.

## Monitoring Metrics

* Duration
* Throughput
* Queue time
* Rows copied

---

# 21. Error Handling

## Common Techniques

### Try-Catch Pattern

Use:

* Execute pipeline
* Failure path
* Success path

### Logging Errors

Store errors into:

* SQL table
* Blob storage
* Log analytics

## Retry Mechanism

ADF supports retries.

Example:

* Retry count = 3
* Retry interval = 30 sec

---

# 22. Incremental Load

Incremental load copies only new or changed data.

## Advantages

* Faster execution
* Lower cost
* Reduced load on systems

## Common Approaches

| Method          | Description         |
| --------------- | ------------------- |
| Watermark       | Based on date/time  |
| CDC             | Change Data Capture |
| Timestamp       | Last modified value |
| Identity Column | Max ID tracking     |

## Incremental Load Flow

1. Get max timestamp
2. Fetch new data
3. Load into target
4. Update watermark table

---

# 23. Full Load

Full load copies complete data every time.

## Advantages

* Simpler logic
* Easy implementation

## Disadvantages

* Higher execution time
* Higher cost
* Duplicate risk

---

# 24. ETL vs ELT in ADF

| Feature        | ETL            | ELT           |
| -------------- | -------------- | ------------- |
| Transformation | Before loading | After loading |
| Performance    | Slower         | Faster        |
| Compute        | External       | Target system |
| Example        | SSIS           | Synapse       |

## ETL Flow

Extract → Transform → Load

## ELT Flow

Extract → Load → Transform

---

# 25. Connecting Different Data Sources

## Supported Sources

* SQL Server
* Oracle
* MySQL
* PostgreSQL
* SAP
* Blob Storage
* S3
* Google Cloud Storage
* REST APIs
* Salesforce
* ServiceNow

---

# 26. SQL Integration with ADF

## Common SQL Operations

* Execute stored procedures
* Read SQL tables
* Insert/update data
* Merge operations

## Stored Procedure Activity

Used to execute SQL procedures.

## Example Use Cases

* Audit logging
* Data validation
* Merge operations
* Data cleansing

---

# 27. File Handling in ADF

## Supported File Formats

| Format  | Usage           |
| ------- | --------------- |
| CSV     | Flat file       |
| JSON    | Semi-structured |
| XML     | Hierarchical    |
| Parquet | Analytics       |
| Avro    | Big data        |
| Excel   | Reporting       |

## Compression Support

* ZIP
* GZIP
* BZIP2

---

# 28. REST API Integration

ADF can connect to APIs.

## Steps

1. Create REST linked service
2. Configure authentication
3. Create dataset
4. Use copy activity

## Authentication Types

* Anonymous
* Basic
* OAuth2
* Managed Identity

---

# 29. Scheduling Pipelines

## Scheduling Methods

| Method  | Example          |
| ------- | ---------------- |
| Hourly  | Every 1 hour     |
| Daily   | Daily at 10 PM   |
| Weekly  | Every Sunday     |
| Monthly | 1st day of month |

---

# 30. CI/CD in ADF

CI/CD means Continuous Integration and Continuous Deployment.

## Benefits

* Automated deployment
* Version control
* Faster release cycles
* Reduced manual effort

## Tools Used

* Azure DevOps
* GitHub
* ARM Templates

---

# 31. Git Integration

ADF supports Git integration.

## Supported Repositories

* Azure DevOps Git
* GitHub

## Benefits

* Version control
* Collaboration
* Rollback support
* Branching

---

# 32. ARM Templates

ARM templates are used for deployment automation.

## Uses

* Infrastructure deployment
* Environment migration
* Backup configuration

---

# 33. Security in ADF

## Security Features

* Encryption
* RBAC
* Managed Identity
* Private endpoints
* Key Vault integration

---

# 34. Managed Identity

Managed identity removes need for storing passwords.

## Benefits

* Secure authentication
* Passwordless access
* Easy integration

---

# 35. Role-Based Access Control (RBAC)

RBAC controls user permissions.

## Common Roles

| Role                     | Access           |
| ------------------------ | ---------------- |
| Owner                    | Full access      |
| Contributor              | Modify resources |
| Reader                   | Read-only        |
| Data Factory Contributor | ADF access       |

---

# 36. Azure Key Vault Integration

Key Vault stores secrets securely.

## Stored Items

* Passwords
* API keys
* Connection strings
* Certificates

## Advantages

* Improved security
* Centralized secrets management

---

# 37. Performance Optimization

## Optimization Techniques

* Parallel copy
* Partitioning
* Compression
* Incremental loading
* Proper IR selection
* Optimize data flow clusters

## Performance Metrics

* DIU usage
* Throughput
* Queue duration

---

# 38. Logging and Monitoring

## Monitoring Tools

* Azure Monitor
* Log Analytics
* Diagnostic logs
* Alerts

## Alert Examples

* Pipeline failure
* High execution time
* Integration runtime offline

---

# 39. Data Lake Integration

ADF integrates with Azure Data Lake.

## Advantages

* Scalable storage
* Cheap storage
* Big data processing

## Common Architecture

Source → ADF → Data Lake → Synapse/Databricks

---

# 40. Synapse Integration

ADF works closely with Azure Synapse.

## Use Cases

* Data warehouse loading
* ELT processing
* Analytics pipelines

---

# 41. Databricks Integration

ADF can execute Databricks notebooks.

## Common Use Cases

* PySpark processing
* Machine learning
* Big data transformation

---

# 42. Snowflake Integration

ADF supports Snowflake connectivity.

## Operations

* Data loading
* Data extraction
* Stored procedure execution

---

# 43. SAP Integration

ADF supports SAP connectors.

## SAP Connectors

* SAP Table
* SAP ECC
* SAP HANA
* SAP BW

---

# 44. Real-Time Scenarios

## Banking Scenario

* Extract transactions
* Validate records
* Load to warehouse
* Generate reports

## E-Commerce Scenario

* API ingestion
* Customer analytics
* Sales reporting

## Healthcare Scenario

* Patient records integration
* Daily ETL processing

---

# 45. End-to-End Projects

# Project 1: CSV to SQL Pipeline

## Flow

1. Read CSV from Blob
2. Validate file
3. Copy data to SQL
4. Archive file
5. Send notification

# Project 2: Incremental Load Pipeline

## Flow

1. Read watermark value
2. Extract changed data
3. Load target table
4. Update watermark

# Project 3: API to Data Lake

## Flow

1. Call API
2. Store JSON
3. Convert to Parquet
4. Load analytics layer

---

# 46. Best Practices

## Development Best Practices

* Use naming conventions
* Use parameterization
* Avoid hardcoding
* Implement logging
* Use reusable pipelines
* Use Git integration
* Enable monitoring

## Performance Best Practices

* Use partitioning
* Use incremental load
* Optimize data flows
* Use staging carefully

---

# 47. Common Interview Questions

## Beginner Level

1. What is Azure Data Factory?
2. What is Integration Runtime?
3. Difference between dataset and linked service?
4. What is a pipeline?
5. What are triggers?

## Intermediate Level

1. Explain incremental loading.
2. Difference between ETL and ELT?
3. Explain mapping data flow.
4. How does self-hosted IR work?
5. Explain parameterization.

## Advanced Level

1. How to optimize ADF performance?
2. Explain CI/CD in ADF.
3. How to handle pipeline failures?
4. Explain dynamic content.
5. How to secure ADF pipelines?

---

# 48. ADF Developer Roadmap

# Phase 1: Basics

* Azure basics
* Cloud concepts
* Storage concepts
* SQL fundamentals

# Phase 2: ADF Fundamentals

* Pipelines
* Activities
* Datasets
* Linked services
* Triggers

# Phase 3: Intermediate

* Data flow
* Dynamic content
* Incremental load
* API integration
* Error handling

# Phase 4: Advanced

* CI/CD
* Databricks integration
* Synapse integration
* Security
* Performance tuning

# Phase 5: Real Projects

* End-to-end projects
* Production scenarios
* Monitoring implementation

---

# 49. ADF Naming Standards

## Recommended Naming Conventions

| Component      | Naming Example     |
| -------------- | ------------------ |
| Pipeline       | PL_Copy_Customer   |
| Dataset        | DS_SQL_Employee    |
| Linked Service | LS_SQL_Server      |
| Trigger        | TR_Daily_Load      |
| Data Flow      | DF_Transform_Sales |

---

# 50. Important Terminologies

| Term  | Meaning                           |
| ----- | --------------------------------- |
| ETL   | Extract Transform Load            |
| ELT   | Extract Load Transform            |
| IR    | Integration Runtime               |
| CDC   | Change Data Capture               |
| DIU   | Data Integration Unit             |
| RBAC  | Role-Based Access Control         |
| CI/CD | Continuous Integration/Deployment |

---

# 51. Common Errors and Fixes

## Error: Authentication Failed

### Fix

* Check credentials
* Check firewall access
* Verify linked service

## Error: File Not Found

### Fix

* Verify path
* Verify folder structure
* Check trigger timing

## Error: IR Offline

### Fix

* Restart IR service
* Check connectivity
* Verify gateway

---

# 52. Certification Guidance

## Recommended Certifications

### Microsoft Certifications

* DP-203: Data Engineering on Microsoft Azure
* AZ-900: Azure Fundamentals
* DP-900: Data Fundamentals

## Preparation Strategy

1. Learn basics
2. Build projects
3. Practice labs
4. Solve interview questions
5. Attempt mock tests

---

# 53. Learning Resources

# Official Resources

* Microsoft Learn
* Azure Documentation
* Azure YouTube Channel

# Practice Platforms

* GitHub projects
* Hands-on labs
* SQL practice websites

# Important Skills Along with ADF

* SQL
* Python
* PySpark
* Azure Synapse
* Databricks
* Data Warehousing

---

# 54. Conclusion

Azure Data Factory is one of the most important cloud data integration tools for Data Engineers.

ADF helps organizations:

* Automate workflows
* Move large-scale data
* Build ETL/ELT pipelines
* Integrate multiple systems
* Create scalable cloud architectures

To become strong in ADF:

1. Learn fundamentals properly
2. Build hands-on projects
3. Practice real scenarios
4. Understand cloud concepts
5. Learn SQL deeply
6. Work on incremental loading
7. Understand monitoring and security

ADF combined with:

* SQL
* Python
* PySpark
* Synapse
* Databricks

creates a strong Data Engineering skill set.

---

# Final Learning Sequence

1. Azure Basics
2. SQL Fundamentals
3. Azure Storage
4. Azure Data Factory Basics
5. Pipelines
6. Activities
7. Triggers
8. Dynamic Content
9. Data Flow
10. Incremental Load
11. Error Handling
12. Monitoring
13. Git Integration
14. CI/CD
15. Synapse
16. Databricks
17. End-to-End Projects
18. Interview Preparation
19. Certification
20. Production-Level Architecture
