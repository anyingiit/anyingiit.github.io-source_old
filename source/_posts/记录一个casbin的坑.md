---
title: 记录一个casbin的坑
date: 2021-04-24 15:41:16
tags:
---

### 事件详情

在`casbin`加载配置文件时报如下错误

```
panic: runtime error: invalid memory address or nil pointer dereference
[signal 0xc0000005 code=0x0 addr=0x40 pc=0x10deb95]

goroutine 1 [running]:
github.com/casbin/casbin/v2/persist.LoadPolicyLine(0xc0000a7000, 0xf, 0xc000087680)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/persist/adapter.go:42 +0x375
github.com/casbin/casbin/v2/persist/file-adapter.(*Adapter).loadPolicyFile(0xc00008acd0, 0xc000087680, 0x158b598, 0x0, 0x0)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/persist/file-adapter/adapter.go:98 +0x162
github.com/casbin/casbin/v2/persist/file-adapter.(*Adapter).LoadPolicy(0xc00008acd0, 0xc000087680, 0x14dbc40, 0x15152a0)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/persist/file-adapter/adapter.go:58 +0x96
github.com/casbin/casbin/v2.(*Enforcer).LoadPolicy(0xc0000ca780, 0x163f9a0, 0xc00008acd0)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/enforcer.go:275 +0x5a
github.com/casbin/casbin/v2.(*Enforcer).InitWithModelAndAdapter(0xc0000ca780, 0xc000087680, 0x163f9a0, 0xc00008acd0, 0x0, 0xc00008acd0)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/enforcer.go:169 +0x117
github.com/casbin/casbin/v2.(*Enforcer).InitWithAdapter(0xc0000ca780, 0x156a151, 0x16, 0x163f9a0, 0xc00008acd0, 0xc0000e2000, 0x0)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/enforcer.go:146 +0x85
github.com/casbin/casbin/v2.(*Enforcer).InitWithFile(...)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/enforcer.go:136
github.com/casbin/casbin/v2.NewEnforcer(0xc00029fea8, 0x2, 0x2, 0xc00008ac40, 0x147b2c0, 0xc00008ac50)
	F:/golangGOPATH/pkg/mod/github.com/casbin/casbin/v2@v2.28.2/enforcer.go:90 +0x2d1
qq_black_user_list/pkg/casbin.InitCasbin(0x0, 0x0)
	F:/Project/qq_black_user_list/pkg/casbin/initCasbin.go:10 +0x7e
main.main()
	F:/Project/qq_black_user_list/main.go:24 +0x52

```

### 事件原因

最后查证为`casbin`的`model`文件语法错误

### 解决方案

使用`casbin`官网的编辑器进行语法检查后更新`model`文件