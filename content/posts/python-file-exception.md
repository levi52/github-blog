---
title: Python 文件操作与异常处理
date: "2026-08-30"
summary: Python 文件读写操作和异常处理机制详解，包括常用文件模式和上下文管理器。
categories: [Python, 教程]
tags: [Python, 文件操作, 异常处理]
series: Python 学习系列
seriesOrder: 2
---

## 文件读写

Python 使用 `open()` 函数进行文件操作。

```python
# 写入文件
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Hello, Python!\n")
    f.write("文件操作示例\n")

# 读取文件
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# 逐行读取
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

## 文件模式

| 模式 | 说明 |
|------|------|
| `r` | 只读（默认） |
| `w` | 写入（覆盖） |
| `a` | 追加 |
| `x` | 创建（已存在则报错） |
| `b` | 二进制模式 |

## 异常处理

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("除数不能为零")
except Exception as e:
    print(f"发生错误: {e}")
else:
    print("执行成功")
finally:
    print("无论如何都会执行")
```

## 常见异常

```python
# FileNotFoundError
try:
    with open("不存在的文件.txt") as f:
        pass
except FileNotFoundError:
    print("文件不存在")

# ValueError
try:
    num = int("abc")
except ValueError:
    print("无法转换为数字")

# KeyError
try:
    d = {"name": "Levi"}
    value = d["age"]
except KeyError:
    print("键不存在")
```

## 自定义异常

```python
class AgeError(Exception):
    def __init__(self, age, message="年龄必须大于0"):
        self.age = age
        self.message = message
        super().__init__(self.message)

def set_age(age):
    if age < 0:
        raise AgeError(age)
    return age

try:
    set_age(-5)
except AgeError as e:
    print(f"错误: {e}, 输入值: {e.age}")
```

## 总结

掌握文件操作和异常处理是编写健壮 Python 程序的关键。使用 `with` 语句可以自动管理文件资源，try-except 可以优雅地处理错误。
