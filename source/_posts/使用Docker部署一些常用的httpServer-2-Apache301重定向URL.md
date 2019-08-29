---
title: 使用Docker部署一些常用的httpServer(2)--Apache301重定向URL
date: 2019-08-24 13:40:37
tags:
---

# 目标

访问`anyingiit.com:xx`,301重定向到`trustme.anyingiit.com`,使用Apache作为http服务器,这个过程要用docker实现.

## 配置`httpd.conf`

### 加载重定向功能模块

* 去除`httpd.conf`文件中`#LoadModule rewrite_module modules/mod_rewrite.so`前面的"#"号，以加载重定向功能模块;

### 启动重定向功能

在`httpd.conf`中书写如下规则：

```
#开启重定向功能

RewriteEngine on
```

### 配置重定向

重新追加一个虚拟主机,也就是`<VirtualHost *:80></VirtualHost>`块

```
<VirtualHost *:80>

ServerName anyingiit.com

RedirectMatch permanent ^/(.*) https://trustme.anyingiit.com/$1

</VirtualHost>
```

![](https://oss.trustme.anyingiit.com/images/20190824140755.png)

## 配置`Dockerfile`

```dockerfile
FROM httpd
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
CMD ["httpd-foreground"]
```

## 构建镜像

```shell
$ docker build -t apache-redirect-anyingblog:v0.4 .
```

![](https://oss.trustme.anyingiit.com/images/20190824141216.png)

## 运行!

```shell
$ docker run -d -p 902:80 apache-redirect-anyingblog:v0.4
```

![](https://oss.trustme.anyingiit.com/images/20190824141251.png)

## 验证

访问http://anyingiit.com:902

![](https://oss.trustme.anyingiit.com/images/20190824141611.gif)

![](https://oss.trustme.anyingiit.com/images/20190825141606.png)