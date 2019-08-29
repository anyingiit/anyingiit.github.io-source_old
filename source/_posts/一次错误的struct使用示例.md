---
title: 一次错误的struct使用示例
date: 2019-08-26 21:33:29
tags: [Golang,struct]
---

先看代码

```go
package main

import "fmt"

type student struct {
    Name string
    Age  int
}

func pase_student() {
    m := make(map[string]*student)
    stus := []student{
        {Name: "zhou", Age: 24},
        {Name: "wrh", Age: 22},
        {Name: "qiang", Age: 21},
    }
    for _, stu := range stus {
        m[stu.Name] = &stu
    }

    for _,va:= range m{
        fmt.Println(va.Name,":",va)
    }
}

func main() {
    pase_student()
}
```

猜一下结果?

```go
//结果
qiang : &{qiang 21}
qiang : &{qiang 21}
qiang : &{qiang 21}
```

????????

看看问题在哪里↓↓↓↓↓

```go
    for _, stu := range stus {//每次循环并不会为stu新开一块内存,而是修改stu指向的值!!!
        m[stu.Name] = &stu//这里的"stu"其实是值类型的,但是每次遍历都是存储 "stu" 的指针,虽然每次range操作是修改了stu对应的值,但是stu的指针地址是从来都没有变,所以这里不能绝对这么使用!!!!!
    } 
```

```go
//正确的思路(1) *推荐 : 既然用了指针就要用到底
package main

import "fmt"

type student struct {
    Name string
    Age  int
}

func pase_student() {
    m := make(map[string]*student)
    stus := []*student{//这里的student使用了指针,毕竟用指针就要用到底嘛
        {Name: "zhou", Age: 24},
        {Name: "wrh", Age: 22},
        {Name: "qiang", Age: 21},
    }
    for _, stu := range stus {
        m[stu.Name] = stu
    }

    for _,va:= range m{
        fmt.Println(va.Name,":",*va)//输出的时候使用了指针
    }
}

func main() {
    pase_student()
}
//结果
zhou : {zhou 24}
wrh : {wrh 22}
qiang : {qiang 21}

//正确的思路(2) : 既然不用指针,就都不要用指针,全部传数值!
package main

import "fmt"

type student struct {
    Name string
    Age  int
}

func pase_student() {
    m := make(map[string]student)
    stus := []student{
        {Name: "zhou", Age: 24},
        {Name: "wrh", Age: 22},
        {Name: "qiang", Age: 21},
    }
    for _, stu := range stus {
        m[stu.Name] = stu//这里的"stu"其实是值,但是每次遍历都是存储 "stu" 的指针,虽然每次range操作是修改了stu对应的值,但是stu的指针地址是从来都没有变,所以这里不能这么使用!!!!!
    }

    for _,va:= range m{
        fmt.Println(va.Name,":",va)
    }
}

func main() {
    pase_student()
}
//结果
zhou : {zhou 24}
wrh : {wrh 22}
qiang : {qiang 21}
```

