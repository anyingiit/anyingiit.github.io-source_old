---
title: fish(Shell)永久设置编码格式
date: 2019-08-31 19:40:56
tags:
---

### 检查系统是否支持

查看系统编码是否支持中文： locale -a |grep "zh_CN"

![](https://oss.trustme.anyingiit.com/images/20190831194253.png)

### 设置`/etc/profile`

在底部添加两行

```shell
#fix encodig
export LANG="zh_CN.UTF8"
```

![](https://oss.trustme.anyingiit.com/images/20190831194455.png)

### 设置`~/.config/fish/config.fish`

```shell
# 注:这个文件的内容会在每次执行shell的时候执行
$ vim ~/.config/fish/config.fish
```

可能提示为新文件,是正常的

添加一行

```shell
export LANG="zh_CN.UTF8"
```



Done!

