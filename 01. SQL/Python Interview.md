# 🐍 Python Interview Questions & Answers


## Q1. What is Python?

**Answer**

Python is a **high-level, interpreted, general-purpose programming language** with simple syntax and strong support for code readability.

It supports multiple programming paradigms:

| Paradigm | Typical use |
|---|---|
| Procedural | Step-by-step programs and utility scripts |
| Object-oriented | Reusable classes and maintainable applications |
| Functional | Functions as values, comprehensions, `map`, `filter`, and `reduce` |

Python is commonly used for data engineering, data science, machine learning, web development, automation, testing, and scripting.

> **Interview hint:** Describe Python by emphasizing readability, a large standard library, third-party ecosystem, cross-platform support, and dynamic typing.

---

## Q2. What are the main features of Python?

**Answer**

The main features of Python are:

1. Simple, readable syntax
2. Dynamically typed variables
3. Interpreted execution
4. Object-oriented and functional capabilities
5. Automatic memory management
6. Platform independence
7. A large standard library
8. A broad third-party package ecosystem
9. Open-source implementation
10. Support for modules and packages

> **Interview hint:** Python is a *strongly typed* language because incompatible types are not silently converted. It is dynamically typed because a variable's type is determined from the object assigned to it at runtime.

---

## Q3. Is Python compiled or interpreted?

**Answer**

Python uses **both compilation and interpretation** conceptually:

1. Python source code is compiled into bytecode.
2. The Python Virtual Machine (PVM) interprets that bytecode.
3. CPython may cache the bytecode in `.pyc` files to improve subsequent startup time.

Bytecode compilation does not usually produce machine code as a Java or C++ compiler does. This is why Python is commonly called an interpreted language.

> **Interview hint:** The correct interview answer is not simply "only interpreted." Explain the source-code → bytecode → PVM execution flow.

---

## Q4. What is a dynamically typed language?

**Answer**

A dynamically typed language determines the type of a variable **when the program runs**, rather than requiring explicit declarations.

```python
name = "Ashish"
age = 30

age = "Thirty"  # The variable can refer to a different type.
print(type(age))  # <class 'str'>
```

**Key distinction:**

- **Dynamic typing:** The type is checked at runtime.
- **Strong typing:** Python does not automatically allow unsafe operations, such as adding a string and an integer.

```python
print("10" + 5)  # Raises TypeError
```

---

## Q5. What is PEP 8?

**Answer**

**PEP 8** is Python's official style guide for writing readable and consistent code.

Important recommendations include:

- Use 4 spaces for indentation.
- Use `snake_case` for variables and functions.
- Use `PascalCase` for class names.
- Separate top-level functions and classes with two blank lines.
- Put two spaces around a top-level binary operator only where appropriate.
- Keep lines within roughly 79 characters.
- Add a single space after commas.
- Use descriptive names.

```python
def calculate_salary(employee_name: str, base_salary: float) -> float:
    return base_salary
```

Tools such as `ruff`, `flake8`, `black`, and `pylint` help enforce or format PEP 8 rules.

> **Hint:** PEP 8 is about readability and conventions. It does not control the Python language syntax.

---

## Q6. What is the difference between Python 2 and Python 3?

**Answer**

Python 3 is the supported, modern version of Python. Python 2 reached end of life in January 2020.

| Feature | Python 2 | Python 3 |
|---|---|---|
| Output | `print "Hello"` | `print("Hello")` |
| Text | `str` uses bytes; `unicode` is separate | `str` uses Unicode by default |
| Integer division | `/` may produce an integer | `/` produces a float |
| Range | `range()` creates a list; `xrange()` is lazy | `range()` is lazy |
| Input | `raw_input()` / `input()` behavior differs | `input()` returns a string |

```python
# Python 3
print(7 / 2)  # 3.5
print(7 // 2) # 3
```

---

## Q7. What are variables in Python?

**Answer**

A variable is a **name that refers to an object**. It is not a memory slot that stores a value in a language-specific type declaration.

```python
name = "Ashish"
age = 30
salary = 50000.50
```

Python creates or obtains the object, evaluates the expression, and binds the name to that object.

> **Hint:** If asked about assignment, mention object references, rebinding, and the possibility of multiple names referring to the same object.

---

## Q8. What are the built-in data types in Python?

**Answer**

| Category | Types |
|---|---|
| Numeric | `int`, `float`, `complex` |
| Text | `str` |
| Boolean | `bool` |
| Sequence | `list`, `tuple`, `range` |
| Mapping | `dict` |
| Set | `set`, `frozenset` |
| Binary | `bytes`, `bytearray`, `memoryview` |
| Null | `NoneType` (`None`) |

Use `type(value)` for the exact type and `isinstance(value, ClassName)` for type or inheritance-aware checks.

```python
isinstance(10, int)       # True
isinstance(True, int)     # True, because bool subclasses int
```

---

## Q9. What is the difference between mutable and immutable objects?

**Answer**

| Immutable | Mutable |
|---|---|
| Cannot change internal value after creation | Can change internal value after creation |
| Changes create a new object or binding | Changes modify the existing object |
| Examples: `int`, `float`, `str`, `tuple`, `frozenset`, `bytes` | Examples: `list`, `dict`, `set`, `bytearray` |

```python
text = "Python"
text = text + " 3"  # Creates a new string and rebinds text.

numbers = [1, 2]
numbers.append(3)   # Modifies the existing list.
```

> **Interview hint:** Mutability is important because mutable objects are vulnerable to unintended sharing. A function that modifies a list passed by reference affects the caller unless a copy is used.

---

## Q10. What is the difference between `==` and `is`?

**Answer**

| Operator | Checks |
|---|---|
| `==` | Whether the values are equal |
| `is` | Whether both references point to the same object |

```python
first = [10, 20, 30]
second = [10, 20, 30]

print(first == second)  # True
print(first is second)  # False
print(first is first)   # True
```

Use `is None`, not `== None`, when comparing with `None`.

> **Hint:** Avoid assuming small integers or interned strings have the same identity. Interning is an implementation optimization, not a rule for value comparison.

---

# Data Structures and Collections

## Q11. What is a list?

**Answer**

A list is an **ordered, mutable collection** that allows duplicate values and heterogeneous elements.

```python
numbers = [10, 20, 30, 40]
numbers.append(50)
numbers[0] = 5
```

Lists are implemented for efficient indexing and appending. Insertions or deletions near the beginning may require shifting elements, so they are not always ideal for queue operations.

---

## Q12. What is a tuple?

**Answer**

A tuple is an **ordered, immutable collection** that allows duplicate values.

```python
numbers = (10, 20, 30, 40)
coordinates = (12.5, 77.6)
```

A tuple is suitable for fixed records, dictionary keys when it contains only hashable values, and unpacking.

```python
name, age = ("Ashish", 30)
```

> **Hint:** Tuples are immutable containers, but an element may itself be mutable.

```python
sample = ([1, 2], "Python")
sample[0].append(3)  # The nested list can change.
```

---

## Q13. What is a dictionary?

**Answer**

A dictionary stores **key-value pairs**. Keys must be unique and hashable, while values can be any object.

```python
employee = {
    "name": "Ashish",
    "age": 30,
    "department": "Data Engineering"
}

print(employee["name"])
print(employee.get("location", "Not specified"))
```

Dictionaries preserve insertion order in current Python implementations and provide fast average-case key lookup.

> **Hint:** Avoid using mutable objects such as lists or dictionaries as keys. Use strings, numbers, or tuples containing only hashable values.

---

## Q14. What is a set?

**Answer**

A set is an **unordered collection of unique, hashable elements**.

```python
numbers = {10, 20, 30, 10}
print(numbers)  # Duplicate 10 is removed.
```

Sets support mathematical operations:

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)  # Union: {1, 2, 3, 4, 5}
print(a & b)  # Intersection: {3}
print(a - b)  # Difference: {1, 2}
```

Do not rely on set iteration order for a sorted or deterministic sequence.

---

## Q15. What is the difference between list, tuple, set, and dictionary?

**Answer**

| Collection | Ordered | Mutable | Allows duplicates | Representation |
|---|---|---|---|---|
| List | Yes | Yes | Yes | `[10, 20]` |
| Tuple | Yes | No | Yes | `(10, 20)` |
| Set | No | Yes | No | `{10, 20}` |
| Dictionary | Yes* | Yes | Unique keys | `{"key": "value"}` |

\*Dictionary insertion order is preserved in modern Python.

---

## Q16. What is list comprehension?

**Answer**

List comprehension creates a new list using a concise expression.

```python
numbers = [1, 2, 3, 4, 5]
squares = [number ** 2 for number in numbers]
even_squares = [number ** 2 for number in numbers if number % 2 == 0]
```

**General syntax:**

```python
[expression for item in iterable if condition]
```

> **Hint:** Use a normal loop if the logic becomes difficult to read. Comprehension should improve clarity, not reduce it.

---

## Q17. What is dictionary comprehension?

**Answer**

Dictionary comprehension creates a dictionary from an iterable.

```python
numbers = [1, 2, 3, 4]
squares = {number: number ** 2 for number in numbers}
print(squares)
```

**General syntax:**

```python
{key_expression: value_expression for item in iterable if condition}
```

---

## Q18. What is slicing?

**Answer**

Slicing extracts a portion of a sequence with `start`, `stop`, and `step`.

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])    # [20, 30, 40]
print(numbers[:3])     # [10, 20, 30]
print(numbers[::2])    # [10, 30, 50]
print(numbers[::-1])   # [50, 40, 30, 20, 10]
```

The `stop` index is excluded. Negative indexes count backward from the end.

---

## Q19. What is the difference between `append()` and `extend()`?

**Answer**

| Method | Behavior |
|---|---|
| `append(value)` | Adds one object as a single element |
| `extend(iterable)` | Adds each element of the iterable separately |

```python
numbers = [1, 2]
numbers.append([3, 4])
# [1, 2, [3, 4]]

numbers = [1, 2]
numbers.extend([3, 4])
# [1, 2, 3, 4]
```

---

## Q20. What is the difference between `remove()`, `pop()`, and `del`?

**Answer**

| Operation | Behavior | Return value |
|---|---|---|
| `remove(value)` | Removes the first matching value | None |
| `pop(index=-1)` | Removes and returns an element | Removed element |
| `del` | Deletes an index, slice, attribute, or variable binding | None |

```python
numbers = [10, 20, 30, 40]
numbers.remove(20)
removed = numbers.pop()  # 40
del numbers[0]
```

---

# Functions and Functional Concepts

## Q21. What is a function?

**Answer**

A function is a reusable block of code that performs a specific task.

```python
def add(first: int, second: int) -> int:
    return first + second

result = add(10, 20)
```

Benefits include code reuse, modular design, readability, and easier testing.

---

## Q22. What are the types of function arguments?

**Answer**

Python supports positional, keyword, default, `*args`, and `**kwargs` arguments.

```python
def employee(name, department="IT", *skills, **details):
    print(name)
    print(department)
    print(skills)
    print(details)

employee(
    "Ashish",
    "Data",
    "Python",
    "SQL",
    location="Pune"
)
```

| Argument type | Example |
|---|---|
| Positional | `employee("Ashish")` |
| Keyword | `employee(name="Ashish")` |
| Default | `department="IT"` |
| Variable positional | `*args` |
| Variable keyword | `**kwargs` |

> **Hint:** Follow this parameter order: positional parameters, default parameters, `*args`, keyword-only parameters, then `**kwargs`.

---

## Q23. What are `*args` and `**kwargs`?

**Answer**

- `*args` collects extra positional arguments in a tuple.
- `**kwargs` collects extra keyword arguments in a dictionary.

```python
def display(*args):
    print(args)

display(10, 20, 30)


def employee(**kwargs):
    print(kwargs)

employee(name="Ashish", age=30)
```

They make functions flexible while accepting an uncertain number of arguments.

---

## Q24. What is a lambda function?

**Answer**

A lambda is an anonymous function containing a single expression.

```python
square = lambda number: number ** 2
print(square(5))
```

Lambdas are useful for short operations passed to functions such as `map`, `filter`, `sorted`, or `groupby`.

```python
employees = [
    {"name": "Ashish", "salary": 70000},
    {"name": "Rahul", "salary": 90000}
]

highest_paid = sorted(
    employees,
    key=lambda employee: employee["salary"],
    reverse=True
)
```

---

## Q25. What is the difference between `map()`, `filter()`, and `reduce()`?

**Answer**

| Function | Purpose | Output |
|---|---|---|
| `map()` | Transform each element | Iterator of transformed values |
| `filter()` | Keep elements satisfying a condition | Iterator of selected values |
| `reduce()` | Combine elements into one value | One final result |

```python
from functools import reduce

numbers = [1, 2, 3, 4]

squares = list(map(lambda x: x ** 2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
total = reduce(lambda x, y: x + y, numbers)

print(squares)  # [1, 4, 9, 16]
print(evens)    # [2, 4]
print(total)    # 10
```

Comprehensions are often easier to read for `map` and `filter` operations.

---

## Q26. What is a generator?

**Answer**

A generator produces values one at a time using `yield`, so it does not need to store the complete result in memory.

```python
def generate_numbers(limit):
    for number in range(limit):
        yield number


for value in generate_numbers(5):
    print(value)
```

Generators provide:

- Lazy evaluation
- Lower memory usage
- Streaming of large or infinite sequences
- Efficient processing of one value at a time

A generator expression is a compact alternative:

```python
squares = (number ** 2 for number in range(1000000))
```

---

## Q27. What is an iterator?

**Answer**

An iterator is an object that returns elements one at a time.

The iterator protocol defines:

- `__iter__()` returns the iterator object.
- `__next__()` returns the next item or raises `StopIteration`.

```python
numbers = iter([10, 20, 30])

print(next(numbers))
print(next(numbers))
print(next(numbers))
```

Lists are iterable, but a list itself is not a stateful iterator.

---

## Q28. What is the difference between iterable and iterator?

**Answer**

| Iterable | Iterator |
|---|---|
| Can produce an iterator | Keeps its current iteration state |
| Implements `__iter__()` | Implements `__iter__()` and `__next__()` |
| May be traversed repeatedly | Usually consumed once |
| Examples: list, tuple, string, dict | Object returned by `iter()` |

```python
values = [1, 2, 3]       # Iterable
iterator = iter(values)  # Iterator
print(next(iterator))
```

---

## Q29. What is a decorator?

**Answer**

A decorator is a callable that wraps another callable and extends or modifies its behavior without changing the original function's source code.

```python
from functools import wraps


def log_calls(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        print(f"Calling {function.__name__}")
        result = function(*args, **kwargs)
        print(f"{function.__name__} finished")
        return result

    return wrapper


@log_calls
def add(first, second):
    return first + second


print(add(10, 20))
```

Decorators are commonly used for authentication, logging, caching, validation, and performance measurement.

---

## Q30. What is recursion?

**Answer**

Recursion occurs when a function calls itself to solve a smaller instance of the same problem.

A recursive function needs:

1. A **base case** that stops recursion.
2. A **recursive case** that moves toward the base case.

```python
def factorial(number):
    if number == 0:
        return 1
    return number * factorial(number - 1)


print(factorial(5))  # 120
```

> **Hint:** Python recursion uses the call stack and is subject to a recursion-depth limit. Iteration is usually preferable for very large sequences.

---

# Object-Oriented Programming

## Q31. What is object-oriented programming?

**Answer**

**Object-Oriented Programming (OOP)** organizes code into classes and objects that combine data and behavior.

The four core principles are:

| Principle | Purpose |
|---|---|
| Encapsulation | Bundle related data and methods |
| Inheritance | Reuse and specialize existing behavior |
| Polymorphism | Use a common interface across different types |
| Abstraction | Expose essential behavior and hide implementation |

---

## Q32. What is a class and an object?

**Answer**

A **class** is a blueprint or template. An **object** is an instance created from that class.

```python
class Employee:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return f"My name is {self.name}"


emp = Employee("Ashish")
print(emp.introduce())
```

Here, `Employee` is the class and `emp` is an instance.

---

## Q33. What is `__init__()`?

**Answer**

`__init__()` is the initializer method called automatically when an object is created.

```python
class Employee:
    def __init__(self, name, department):
        self.name = name
        self.department = department


employee = Employee("Ashish", "Data")
```

It is important to distinguish:

- `__new__()` creates the instance.
- `__init__()` initializes the already-created instance.

---

## Q34. What is `self`?

**Answer**

`self` is a convention for the **current object instance**. Python passes the instance as the first argument to instance methods.

```python
class Employee:
    def get_name(self):
        return self.name
```

`self` is not a keyword. Another name could technically be used, but `self` is strongly recommended.

---

## Q35. What is inheritance?

**Answer**

Inheritance allows a child class to reuse attributes and methods from a parent class.

```python
class Employee:
    def __init__(self, name):
        self.name = name


class DataEngineer(Employee):
    def build_pipeline(self):
        return "Building data pipeline"
```

Python supports:

- Single inheritance
- Multiple inheritance
- Multilevel inheritance
- Hierarchical inheritance

Use `super()` to call behavior from the parent class.

```python
class DataEngineer(Employee):
    def __init__(self, name, tool):
        super().__init__(name)
        self.tool = tool
```

---

## Q36. What is polymorphism?

**Answer**

Polymorphism means different classes can provide different implementations of the same operation or interface.

```python
class SQLWorker:
    def execute(self):
        return "Running SQL"


class SparkWorker:
    def execute(self):
        return "Running Spark"


for worker in (SQLWorker(), SparkWorker()):
    print(worker.execute())
```

Python also uses duck typing: an object is acceptable if it provides the required behavior, even if it does not inherit from a formal base class.

---

## Q37. What is encapsulation?

**Answer**

Encapsulation combines data and methods within a class and controls direct access to internal state.

Python visibility conventions include:

| Name | Convention | Meaning |
|---|---|---|
| `name` | Public | Intended for external use |
| `_name` | Protected by convention | Internal use is discouraged externally |
| `__name` | Name-mangled | Intended to reduce accidental collisions |

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
```

Python privacy is convention-based; it does not provide complete runtime hiding.

---

## Q38. What is abstraction?

**Answer**

Abstraction exposes essential functionality while hiding implementation details.

Python supports abstraction using the `abc` module and abstract base classes.

```python
from abc import ABC, abstractmethod


class DataProcessor(ABC):
    @abstractmethod
    def process(self):
        pass
```

An abstract class cannot normally be instantiated, and subclasses must implement abstract methods unless they are abstract themselves.

---

## Q39. What is method overloading and method overriding?

**Answer**

| Concept | Meaning |
|---|---|
| Overloading | Multiple signatures or behaviors for the same method name |
| Overriding | A child class replaces or extends a parent method implementation |

Python does not use traditional compile-time, signature-based overloading. It supports one method definition, while default arguments or `*args` and `**kwargs` can provide flexible behavior.

```python
class Employee:
    def work(self):
        return "Working"


class DataEngineer(Employee):
    def work(self):
        return "Building a data pipeline"
```

Use `super().work()` when the child implementation should include the parent's behavior.

---

## Q40. What is the difference between instance, class, and static methods?

**Answer**

| Method type | Decorator | First argument | Primary purpose |
|---|---|---|---|
| Instance | None | `self` | Access instance state |
| Class | `@classmethod` | `cls` | Access or update class state |
| Static | `@staticmethod` | None | Utility function logically related to the class |

```python
class Employee:
    company = "Example Corp"

    def __init__(self, name):
        self.name = name

    def introduce(self):
        return f"{self.name} works at {self.company}"

    @classmethod
    def change_company(cls, company):
        cls.company = company

    @staticmethod
    def calculate_bonus(salary):
        return salary * 0.10
```

---

# Advanced Python

## Q41. What is exception handling?

**Answer**

Exception handling detects and responds to runtime errors while keeping the program under control.

```python
try:
    result = 10 / 0
except ZeroDivisionError as error:
    print(f"Cannot divide by zero: {error}")
else:
    print("Division completed")
finally:
    print("Always executes")
```

| Block | Use |
|---|---|
| `try` | Code that may raise an exception |
| `except` | Handle selected exceptions |
| `else` | Execute only if no exception occurs |
| `finally` | Execute cleanup regardless of outcome |
| `raise` | Raise or re-raise an exception |

> **Hint:** Catch the specific exception first. Avoid a blanket `except:` unless it has a clearly justified boundary and re-raises or logs the error.

---

## Q42. What is the difference between a syntax error and a runtime error?

**Answer**

| Type | When detected | Example |
|---|---|---|
| Syntax error | Before execution, while parsing | Missing colon or unmatched parenthesis |
| Runtime error | While the program executes | Division by zero or invalid index |

```python
# SyntaxError
if True
    print("Hello")

# Runtime error
print(10 / 0)
```

Syntax errors prevent execution. Runtime errors require exception handling or correction of invalid program state.

---

## Q43. What is the `finally` block?

**Answer**

`finally` executes cleanup code whether the `try` block completes normally or raises an exception.

```python
file = open("sample.txt", "r")
try:
    data = file.read()
finally:
    file.close()
```

The `with` statement is cleaner because it guarantees resource cleanup:

```python
with open("sample.txt", "r", encoding="utf-8") as file:
    data = file.read()
```

---

## Q44. What is file handling?

**Answer**

File handling creates, reads, writes, and appends files using the built-in `open()` function.

| Mode | Purpose |
|---|---|
| `r` | Read; file must exist |
| `w` | Write; truncates existing content |
| `a` | Append to existing content |
| `x` | Exclusive creation; fails if file exists |
| `rb` / `wb` | Read or write binary data |

```python
with open("employees.txt", "w", encoding="utf-8") as file:
    file.write("Ashish\n")

with open("employees.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

> **Hint:** Always use `with` and specify encoding for text files where possible.

---

## Q45. What is the GIL?

**Answer**

The **Global Interpreter Lock (GIL)** is a lock in conventional CPython implementations that allows only one thread to execute CPython bytecode in an interpreter at a time.

It affects CPU-bound Python threads but does not prevent threads from making progress during many I/O operations or C-library calls.

| Workload | Recommended approach |
|---|---|
| I/O-bound | Threading, async I/O, or processes |
| CPU-bound Python | Multiprocessing, native libraries, or free-threaded options |

> **Hint:** Do not say that the GIL makes threads completely useless or prevents parallel I/O. Free-threaded CPython builds are available in newer Python releases, but extension compatibility and implementation details vary.

---

## Q46. What is garbage collection?

**Answer**

Garbage collection automatically identifies and reclaims memory used by objects that are no longer reachable.

CPython primarily uses:

1. **Reference counting** to immediately release objects when their reference count reaches zero.
2. A **cyclic garbage collector** to detect unreachable reference cycles.

The `gc` module can enable, disable, collect cycles, and inspect garbage collector state.

```python
import gc

gc.collect()
```

> **Hint:** Garbage collection is not the same as deleting every object immediately or preventing memory leaks in all Python code. Cyclic references and external resources still require good lifecycle management.

---

## Q47. What is the difference between shallow copy and deep copy?

**Answer**

| Copy type | Outer object | Nested objects |
|---|---|---|
| Shallow copy | New object | Shared references |
| Deep copy | New object | Recursively copied objects |

```python
import copy

original = {"numbers": [1, 2, 3]}

shallow = copy.copy(original)
deep = copy.deepcopy(original)

shallow["numbers"].append(4)
print(original)  # Nested list is also changed.

original = {"numbers": [1, 2, 3]}
deep = copy.deepcopy(original)
deep["numbers"].append(4)
print(original)  # [1, 2, 3]
```

Use deep copy only when the full independent object graph is required.

---

## Q48. What is the difference between multithreading and multiprocessing?

**Answer**

| Feature | Threading | Multiprocessing |
|---|---|---|
| Execution unit | Thread | Process |
| Memory | Shared within a process | Separate memory spaces |
| Communication | Shared variables, queues, locks | IPC, queues, pipes |
| Overhead | Lower | Higher |
| Best for | I/O-bound work | CPU-bound work |
| GIL impact | Limited for CPU-bound bytecode | Processes bypass the per-process GIL |

```python
from multiprocessing import Process


def run_task():
    print("Task running")


process = Process(target=run_task)
process.start()
process.join()
```

---

## Q49. What are modules and packages?

**Answer**

A **module** is a Python file containing reusable variables, functions, or classes.

A **package** is a directory of related modules. Modern Python packages can use `__init__.py`, although namespace packages may not require it.

```python
# math_utils.py
def calculate_average(values):
    return sum(values) / len(values)
```

```python
from math_utils import calculate_average

print(calculate_average([10, 20, 30]))
```

Examples of standard library modules include `math`, `datetime`, `json`, `os`, `sys`, `re`, and `logging`.

---

## Q50. What is the difference between Python and PySpark?

**Answer**

| Python | PySpark |
|---|---|
| General-purpose programming language | Python API for Apache Spark |
| Runs application logic on Python runtimes | Uses Spark for distributed data processing |
| Suitable for small to large local workloads | Suitable for cluster-scale datasets |
| Uses pandas, NumPy, and Python libraries | Uses Spark DataFrames, RDDs, and Spark SQL |

PySpark is commonly used for:

- Distributed ETL
- Large-scale filtering and joins
- Aggregations
- SQL analytics
- Batch and streaming data processing

```python
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder
    .appName("PythonInterview")
    .getOrCreate()
)

data = spark.createDataFrame(
    [(1, "Ashish"), (2, "Rahul")],
    ["id", "name"]
)

data.show()
```

> **Interview hint:** Python and PySpark are not competitors. PySpark is a Python interface to Spark. Most Spark transformations build a logical execution plan; work is distributed and optimized lazily until an action is triggered.

---

## ✅ Quick Revision: Frequently Asked Comparisons

| Pair | Main distinction |
|---|---|
| List vs tuple | Mutable vs immutable |
| `==` vs `is` | Value equality vs object identity |
| `append` vs `extend` | Add one object vs add iterable elements |
| Iterator vs iterable | Stateful element producer vs object that can produce an iterator |
| Map vs filter vs reduce | Transform vs select vs aggregate |
| Overloading vs overriding | Alternate method signatures vs child replacement |
| Instance vs class vs static | Object state vs class state vs utility |
| Syntax vs runtime error | Parse-time vs execution-time |
| Thread vs process | Shared memory vs separate memory |
| Shallow vs deep copy | Nested references shared vs nested objects copied |
