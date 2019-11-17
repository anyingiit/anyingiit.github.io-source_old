---
title: >-
  解决Docker ps时出现Cannot connect to the Docker daemon at
  unix:///var/run/docker.sock的问题
date: 2019-09-05 20:29:22
tags:
---

原因:docker服务未启动

命令

```shell
#Centos 7 
$ systemctl start docker
```

Done!