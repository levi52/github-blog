---
title: Python 基础语法入门
date: "2026-08-31"
summary: Python 语言基础语法介绍，包括变量、数据类型、条件语句和循环结构。
categories: [Python, 教程]
tags: [Python, 基础, 入门]
series: Python 学习系列
seriesOrder: 1
---

## 变量与数据类型

Python 是动态类型语言，变量不需要声明类型。

```python
# 字符串
name = "Levi"
age = 25

# 数字
score = 98.5
count = 100

# 布尔值
is_active = True

# 列表
fruits = ["apple", "banana", "cherry"]

# 字典
person = {"name": "Levi", "age": 25}
```

## 条件语句

```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

## 循环结构

```python
# for 循环
for i in range(5):
    print(i)

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1

# 列表推导式
squares = [x**2 for x in range(10)]
```

## 函数定义

```python
def greet(name, greeting="Hello"):
    """打招呼函数"""
    return f"{greeting}, {name}!"

print(greet("Levi"))
print(greet("Levi", greeting="Hi"))
```

## 总结

Python 语法简洁明了，适合初学者入门。掌握这些基础概念后，可以继续学习面向对象编程和模块化开发。
