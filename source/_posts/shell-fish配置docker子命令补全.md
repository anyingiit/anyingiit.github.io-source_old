---
title: Shell(fish)配置docker子命令补全
date: 2019-08-21 13:53:38
tags:
---

## 目标

`docker container`命令经常使用,但是没有代码补全很难受,每次都要手动输入,所以我们要让`docker`可以补全子命令`container`

#### 获取位置

通过`$fish_complete_path`可以得知fish的补全文件位置

![](https://oss.trustme.anyingiit.com/images/20190821135501.png)

在遍历的所有的目录后发现docker的补全文件在`/usr/share/fish/vendor_completions.d/`

![](https://oss.trustme.anyingiit.com/images/20190821135618.png)

#### 配置`docker.fish`文件

##### complete

`complete -c 命令 -s 短选项 -l 长选项 -a 子命令 --description "可选描述"`

```shell
-c lsusb 是我希望添加补全的命令 
	-s 后接短选项，类似-v形式
	-l 后接长选项，类似--verbose形式
	-a 是子命令,类似于docker的docker container
	--description 是选项的解释，可有可无
```

编辑`docker.fish`文件并在底部加入

```
# container
complete -c docker -a container --description "docker option container"
```

Done!