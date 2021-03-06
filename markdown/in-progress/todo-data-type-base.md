---
typora-root-url: ..\..
---

# 数据类型

## 概述

JavaScript 是一门弱类型的、动态的语言，它拥有 8 种数据类型，其中 7 种是原始类型，1 种是引用类型。

在为变量赋值之前就需要确定变量的数据类型的语言就被称为静态语言，反之，在代码运行过程中才需要确定变量的数据类型的语言被称为动态语言。支持隐式类型转换的语言被称为弱类型语言，反之，则称为强类型语言。

![语言的类型](/static/image/markdown/javascript/data-type-base/language-type.png)

## 类型

### 原始类型

原始类型又称为基本数据类型，原始类型的值称为原始值，JavaScript 拥有 7 种原始类型，分别是：

| 类型名    | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| Boolean   | `true` 和 `false`                                            |
| Null      | `null`                                                       |
| Undefined | `undefined`，是未赋值的变量的默认值，也是变量被提升时的默认值 |
| Number    | 基于 IEEE-754 标准的双精度 64位二进制格式的值，安全存储范围： `[ -2^53 - 1, 2^53 - 1]` |
| BigInt    | 另一种数字类型，它可以安全的存储任意精度的数字，即使超出了 Number 的安全整数范围 |
| String    | 字符串，JavaScript 中的字符串是不可更改的                    |
| Symbol    | 符号，其值是唯一的且不可修改的                               |

### 引用类型

引用类型又称为复杂数据类型，引用类型的值称为引用值，JavaScript 拥有 1 种引用类型，就是 Object，它是字典数据结构，你可以通过本博客的另一篇文章《V8 Object》来了解它的实现。

| 类型名 | 描述         |
| ------ | ------------ |
| Object | 字典数据结构 |

## 存储位置

之所以会区分出原始类型和引用类型，是因为原始类型和引用类型的数据被分别存放在不同的地方，

原始值和引用值分别存储在内存中的不同位置，这也是原始值和引用值的根本区别。在 JavaScript 的执行过程中asdas
TODO
TODO
TODO
TODO

## 区别

### 存储方式

> ？？？
>
> 首先，在存储方式上，原始值存储在栈空间中，引用值存储在堆空间中。
>
>  JavaScript 引擎可以直接获取存储在栈空间中的值，对于存储在堆空间中的值， JavaScript 引擎必须先从栈空间中获得指向引用值的指针（地址字符串），然后再根据指针从堆空间中获取引用值。
>
> 之所以要这么设计，是为了加快查找值的速度，因为所有原始值所占的存储空间大小是固定不变的，如果栈空间中只存储原始值，那么每个原始值的地址都相差 N 个偏移量

