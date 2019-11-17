---
title: 一次错误的flag使用示例
date: 2019-09-08 19:44:33
tags: go
---

### 错误的代码

分享一下学习使用flag踩得坑,看代码

```go
package main

import (
	"flag"
	"fmt"
)
var numTest int
func init() {
	numTest =  *flag.Int( "num",0,"numInput")
}
func main() {
	flag.Parse()
	fmt.Println(&numTest)
	fmt.Println(numTest)
}
```

```shell
$ falgApp -num 10
0xc0000120c8
0
```

####  问题分析

??? 明明已经使用了参数`-num 10`并且正确执行了,但是打印出的数字仍然为默认值0??

再仔细看一遍flag的指南发现,flag会先将默认值赋给变量,只有在执行了`flag.Parse()`解析后才将内存指向的值修改为真正输入的值.

也就是说导致出现问题的原因就是:**在初始化阶段只是将初始化值赋给了变量,而不是指针,在后期解析的时候虽将内存指向的值修改为了真正输入的值,但是由于变量接受的值而不是指针,所以不会随之改变**

### 修改后的代码

```go
//解决方案一
package main

import (
	"flag"
	"fmt"
)
var numTest *int//存入其指针,解析后其指向的值会随之改变
func init() {
	numTest =  flag.Int( "num",0,"numInput")
}
func main() {
	flag.Parse()
	fmt.Println(numTest)
	fmt.Println(*numTest)
}
//解决方案二(推荐)
package main

import (
	"flag"
	"fmt"
)
var numTest int
func init() {
	flag.IntVar(&numTest, "num",0,"numInput")
}
func main() {
	flag.Parse()
	fmt.Println(&numTest)
	fmt.Println(numTest)
}
```

