---
title: 使用Docker部署一些常用的httpServer(3)--Caddy使用HTML跳转
date: 2019-08-24 19:29:48
tags:
---

# 目标

访问`anyingiit.com:xx`,HTML跳转到`trustme.anyingiit.com`,使用Caddy作为http服务器,这个过程要用docker实现.

## 编写`index.html`

其他的都很简单,核心就一行

```html
<meta http-equiv="refresh" content="0;url=https://trustme.anyingiit.com">
```

## 配置`Caddyfile`

博主这里不得不说,Caddy的配置语法真的很简单!理解起来毫不费力.

```Caddyfile
http://anyingiit.com { #等同于anyingiit.com:80 
	root /srv #设置根目录
	index index.html #设置默认页面
}
```

## 配置`Dockerfile`

```dockerfile
FROM abiosoft/caddy
COPY Caddyfile /etc/Caddyfile
COPY index.html /srv/index.html
ENTRYPOINT ["/bin/parent", "caddy"] #设置入口点
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout", "--agree=$ACME_AGREE"]
```

## 构建镜像

```shell
$ docker build -t caddy-jump-anyingblog:v0.4 .
```

![](https://oss.trustme.anyingiit.com/images/20190824193512.png)

## 运行!

### 窥视运行状态

```shell
$ docker run -it -p 903:80  caddy-jump-anyingblog:v0.4
```

![](https://oss.trustme.anyingiit.com/images/20190824193724.png)

嗯,没闪退,没`ERR`,准备完毕!

### 正式运行

```shell
$ docker run -d -p 903:80  caddy-jump-anyingblog:v0.4
```

![](https://oss.trustme.anyingiit.com/images/20190824193831.png)

## 验证

打开 http://anyingiit.com:903

![](https://oss.trustme.anyingiit.com/images/20190824194202.gif)

![](https://oss.trustme.anyingiit.com/images/20190825141716.png)