---
Title: "Understanding Python Internals: Execution Model, Memory, and Garbage Collection"
Created: "20 January 2023"
Tags: 
    - python
    - cpython
    - call-stack
    - heap
    - garbage-collection
    - memory-management
    - frames
    - namespaces
    - language-architecture
Description: "This note explores how Python programs actually run under the hood, focusing on CPython’s execution model, call stack frames, heap-allocated objects, and garbage collection. It explains how names, references, lifetimes, and scopes interact, providing a clear mental model for understanding functions, memory behavior, and program execution across Python implementations."
Image: "python_basics_img.png"
---

# Understanding python:

> 🟢 If you are using Python from python.org → this is CPython.
> 

- **CPython**, the *reference implementation* of Python.
- And ~95% of Python in the real world is CPython.

---

## 🧰 What is CPython-specific (implementation details)

These are true for CPython, but not *strictly required* by the language:

| Feature | CPython |
| --- | --- |
| Reference counting | ✅ Yes |
| `id()` = memory address | ✅ Yes |
| Immediate destruction | ✅ Often |
| Locals stored as dict | ⚠️ Optimized, but conceptually |
| Exact GC timing | ❌ Not guaranteed |

Other implementations *may* do things differently internally.

---

## 🧪 Other Python implementations (still same *concepts*)

| Implementation | Differences |
| --- | --- |
| PyPy | Tracing JIT GC instead of ref counting |
| Jython | Runs on JVM, uses JVM GC |
| IronPython | Runs on .NET CLR |
| MicroPython | Simplified GC |
| Stackless Python | No C stack dependency |

📌 **Even these still have:**

- Names
- Objects
- Lifetimes
- Call frames (logical)

They just implement them differently under the hood.

---

## 🟢 What never changes (this is the key)

No matter the implementation:

> A function cannot keep data alive unless something references it.
> 

> Execution state and data lifetime are separate concepts.
> 

That separation is fundamental to Python.

---

## 🧠 One-sentence mental model (keep forever)

> Python always executes code using frames, resolves names via namespaces, and manages data via references to heap objects.
> 

Everything else is just variation in *how* efficiently that’s done.

---

## ✅ The universal rule (true for *all* Python programs)

For **standard Python implementations**, *every* Python program follows the same **core execution model** :

### These are **always present**

- Call stack with frames
- Namespaces (name → object mappings)
- Heap-allocated objects
- Reference counting + garbage collection
- Function calls create frames
- Frames hold references, not objects
- Objects live as long as references exist

This is **not optional** — without these, Python couldn’t run.

———————————————————————————————————————————

# Python program - how call stack frames, heap and garbage collectors work

## 🎯 Why this matters (you’re asking the right questions)

Understanding this:

- Explains why mutable objects behave the way they do
- Explains closures, decorators, generators
- Explains memory leaks and cycles
- Makes debugging *much* easier
- Transfers well to other languages (JVM, CLR, Rust, etc.)

---

## When python program starts :

When you run ⇒   `python myfile.py`

- Python does some **interpreter bootstrap work first** (before *any* Python frame exists)

then…..

### Overview :

Python does **all** of the following:

1. Creates a **module object**
2. Sets its name to `"__main__"`
3. Creates a **global namespace (dict)**
4. Executes the file’s code **top to bottom** inside that namespace

That module object and its namespace **must exist**, or nothing could run.

---

### Stage 1:

1️⃣ Creates a **module object :**

- The **module object** itself is created **just before** the frame starts executing
- **then** it creates the **module execution frame**  <- Call Stack Frame
    - That module execution frame is what we usually call: `<module>  (__ **main** __)`
- module Object is **immediately associated** with the module frame

So conceptually (and practically), it belongs to the same stage.

You can think of it as:

```
[ interpreter setup ]
→ create module object
→ create module frame
→ link frame ↔ module
```

---

2️⃣ Sets its name to `"__main__"`

This happens **before execution**, but the value is stored in:

```python
__main__.__dict__['__name__'] ='__main__'
```

That dictionary *is* the **global namespace of the module frame**.

So this is directly tied to the first frame.

---

3️⃣ Creates a global ***namespace*** (dict)

The module frame contains:

- a globals dictionary
- a locals dictionary (same object for modules)

This dictionary **belongs to the module frame**.

These variables are names, Variables merely reference objects
Names → references → objects on the heap

---

🚨 GC(garbage collector) question (this is the payoff)

“References mentioned refers to all global or local variables in the frame that reference objects in the heap?”

✅ Yes — plus references from other objects

References come from:
- Local variables
- Global variables
- Object attributes
- Containers (lists, dicts, sets)
- Temporary references (expressions)

📌 Frames contain names, not objects.

Extra:

**Object attributes =**

- Fields on an object
- That store references to other objects
- Followed by the garbage collector during reachability analysis

They matter because **objects can stay alive without any variable pointing to them**.

Example :

### Concrete example

```python
classUser:
def__init__(self, profile):
self.profile = profile# ← object attribute

classProfile:
pass

p = Profile()
u = User(p)

```

Here:

- `u` is a reference (maybe from a local or global variable)
- `u.profile` is an **object attribute**
- `u.profile` **references the `Profile` object**

So even if there is **no variable** pointing to `p`, the object is still reachable because:

```
u → u.profile →p
```

That chain keeps `p` alive for the garbage collector.

---

### Stage 2 :

Executes the file top to bottom

This execution happens **inside the module frame**.

At this point, the call stack looks like:

```
┌────────────────────┐
│ <module> (__main__)│
└────────────────────┘
```

Any function call made from here creates **additional frames above it**.

```python
Important 
📌 Frames execute functions — they do not “hold instances”
```

---

### Tiny visualization

```
Interpreter startup
└── <module> frame created (__main__)
    ├── __name__ = "__main__"
    ├── globals dict
    ├── top-level statements executed
    └── function calls create new frames

```

---

### Extra :

### “Any function call made from here creates additional frames above it”

Now let’s **call** a function.

### Example code

```python
deffoo():
print("Inside foo")

foo()
```

### What happens step by step

1. Python is executing inside `<module>`
2. It reaches `foo()`
3. Python **pauses the module frame**
4. Python creates a **new frame for `foo`**
5. Execution moves into `foo`

---

### Visual: function call creates a new frame

Call stack when `foo()` is called

```
┌────────────────────┐
│foo()               │  ← currently executing
├────────────────────┤
│ <module> (__main__)│
└────────────────────┘

```

Key idea:

- **New frames are always pushed on top**
- The caller stays below
- Only the **top frame runs**

---

### Nested function calls (multiple frames)

Example

```python
defa():
    b()

defb():
    c()

defc():
print("Hello")

a()
```

### Stack evolution

After calling `a()`

```
┌────────────────────┐
│a()                 │
├────────────────────┤
│ <module> (__main__)│
└────────────────────┘
```

Inside `a()`, calling `b()`

```
┌────────────────────┐
│b()                 │
├────────────────────┤
│a()                 │
├────────────────────┤
│ <module> (__main__)│
└────────────────────┘
```

Inside `b()`, calling `c()`

```
┌────────────────────┐
│c()                 │  ← currently executing
├────────────────────┤
│b()                 │
├────────────────────┤
│a()                 │
├────────────────────┤
│ <module> (__main__)│
└────────────────────┘

```

---

### When a function returns

When `c()` finishes:

- Its frame is **destroyed**
- Control returns to `b()`

```
┌────────────────────┐
│b()                 │
├────────────────────┤
│a()                 │
├────────────────────┤
│ <module> (__main__)│
└────────────────────┘
```

Eventually:

- `b()` returns → frame removed
- `a()` returns → frame removed
- Back to `<module>`

---

## Future Research:

1. What happens when another python file is imported and function from that file is executed in the current file ?
2. What happens when decorators are implemented ?

———————————————————————————————————————————

# Python program - how heap and garbage collectors work

- As long as one live reference exists, the object stays alive.
- Python’s garbage collector only deletes objects when no references remain.

Key mental model (this is the “aha”)

- Variables do not store values
- Variables store addresses (references)

---

### What really happens at program end :

- The <module> frame exits
- Local variables like stack in that frame disappear
- References in the frame to heap objects → drop to zero
- And objects in the heap are freed once the references are all erased.
- Garbage collector frees the heap objects [Heap memory is freed because references disappear, not because frames disappear.]
- Program exits

---

### Heap:

- Stores objects
- Objects contain references to other objects
- The heap does not care about stack frames, Objects persists independent of the frames.
- The reference graph, not the call stack, determines lifetime.

---

### Call stack:

- Executes functions
- Frames are short-lived
- Contains local variables only
    - Contains references
- Destroyed after function returns

---

———————————————————————————————————————————

## 🔁 What *can* vary between programs

Different programs may:

- Create more frames
- Use recursion (deeper call stack)
- Allocate more heap objects
- Create reference cycles
- Trigger GC at different times

But the **mechanism itself does not change**.

---

## 🚨 What Python does *not* allow

There is **no Python program** where:

- Local variables survive after frame exit (unless referenced)
- Objects live on the call stack
- Names store values instead of references
- Heap follows LIFO order
- GC order is deterministic

If you see that behavior, it’s **not Python**.

---

## 🧠 What is guaranteed by the Python language

These are **language guarantees** (true everywhere):

- Variables are **names bound to objects**
- Objects have **identity**
- Functions create **new scopes**
- Objects live while reachable
- Garbage collection exists (conceptually)

These are part of Python’s **specification**.

———————————————————————————————————————————