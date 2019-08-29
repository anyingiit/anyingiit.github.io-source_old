---
title: 使用Docker部署一些常用的httpServer(4)--nodejsExpress框架渲染HTML实现跳转
date: 2019-08-25 13:48:46
tags:
---

# 目标

访问`anyingiit.com:xx`,`nodejsExpress`渲染HTML,HTML跳转到`trustme.anyingiit.com`,使用`Express`最为http服务器,这个过程要用docker实现.

## 编写`index.html`

其他的都很简单,核心就一行

```html
<meta http-equiv="refresh" content="0;url=https://trustme.anyingiit.com">
```

## 编写`app.js`

```javascript
const express = require('express')//express框架
const app = express()

app.get('/', function (req, res) {//访问根目录就渲染index.html
  res.sendfile('index.html'); 
})

app.listen(3000)//监听3000端口
```

## 编写`Dockerfile`

使用的是Vrakfall的镜像,以下内容只有`COPY`部分是自己写的

```dockerfile
FROM node:latest
MAINTAINER Vrakfall <jeremy@artphotolaurent.be>

RUN npm install express serve-favicon config morgan async node-minify \
    handlebars lodash walk pm2

VOLUME ["/usr/src/app"]

EXPOSE 3000

WORKDIR /usr/src/app

COPY app.js /usr/src/app/app.js
COPY index.html /usr/src/app/index.html

CMD ["node", "app.js"]
```

## 构建镜像

```shell
$ docker build -t nodejs_express-jump-anyingblog:v0.7 .
```

![](https://oss.trustme.anyingiit.com/images/20190825135447.png)

## 运行!

```shell
$ docker run -d -p 904:3000 nodejs_express-jump-anyingblog:v0.7
```

![](https://oss.trustme.anyingiit.com/images/20190825135613.png)

## 验证

访问http://anyingiit.com:904

![](https://oss.trustme.anyingiit.com/images/20190825135909.gif)

![](https://oss.trustme.anyingiit.com/images/20190825141756.png)