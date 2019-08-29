---
title: 使用Docker部署一些常用的httpServer(1)--Nginx301重定向指定URL
date: 2019-08-23 13:38:15
tags:
---

# 目标

访问`anyingiit.com:xx` ,301重定向到`trustme.anyingiit.com`,这个过程要使用Docker实现.

## 配置`nginx.config`

```nginx
	server 
	{
		listen 80;#监听80端口
		server_name anyingiit.com;#访问域名
		rewrite ".*" https://trustme.anyingiit.com permanent; #匹配任意访问,跳转至 https://trustme.anyingiit.com,使用301重定向跳转.
	}
}
```

## 制作镜像

### 配置`上下文目录(Context)`

#### 将`nginx.conf`移入`Context`

```shell
$ mkdir nginxRedirectToAnYingBlog
$ mv nginx.conf nginxRedirectToAnYingBlog/
```

#### 配置`Dockerfile`

##### 建立`Dockerfile`

```shell
$ cd nginxRedirectToAnYingBlog/
$ touch Dockerfile
```

##### 配置`Dockerfile`

```dockerfile
FROM nginx#基础镜像为nginx
COPY nginx.conf /etc/nginx/
CMD ["nginx", "-g", "daemon off;"]
```

> ##### CMD一开始着实踩了一个大坑_1
>
> 一开始的代码
>
> ```dockerfile
> FROM nginx#基础镜像为nginx
> COPY nginx.conf /etc/nginx/
> RUN service reload nginx#注意,reload的操作是重载配置后重启!
> ```
>
> 本来想着`nginx`默认镜像会自动运行主进程,那我COPY文件之后当然要`service reload nginx`一下重载配置.
>
> 后来才知道是我还在用传统系统级虚拟机的思想在想docker,docker是进程级容器,`docker container`一旦主进程被关闭(哪怕一瞬间)就会导致`docker`的自动退出,
>
> ##### CMD一开始着实踩了一个大坑_2
>
> 后来的代码
>
> ```dockerfile
> FROM nginx#基础镜像为nginx
> COPY nginx.conf /etc/nginx/
> CMD nginx -g deameon off
> ```
>
> 看起来好像没什么问题...但是实际上各种运行后闪退
>
> ![](https://oss.trustme.anyingiit.com/images/20190823171902.png)
>
> 后来才知道CMD有两种运行方式`shell`or`exec`
>
> `shell`模式会执行类似于`/bin/sh -c xxxxCommand xxx`的东西,`sh`会在执行命令成功后随之退出,从而主进程退出,从而容器退出!!!!
>
> ![](https://oss.trustme.anyingiit.com/images/20190823172216.png)图转,类似于这样的东西
>
> `exec`在PID1进程执行(这快我现在也不是很明白)
>
> ![](https://oss.trustme.anyingiit.com/images/20190823172610.png)
>
> 类似于这样的东西
>
> 所以代码
>
> ```dockerfile
> FROM nginx#基础镜像为nginx
> COPY nginx.conf /etc/nginx/
> CMD ["nginx", "-g", "daemon off;"]
> ```

## 构建镜像

```shell
$ docker build -t nginx-redirect-anyingblog:v0.8 .
```

> 指定镜像名字及标签为"nginx-redirect-anyingblog:v0.1"并且Context目录为当前目录
>
> 不要问我为什么是0.8,鬼知道我踩了多少坑

```
root@iz2ze9t07tpudth4raqstiz ~/nginxRedirectToAnYingBlog# docker build -t nginx-redirect-anyingblog:v0.1 .
Sending build context to Docker daemon  3.584kB
Step 1/3 : FROM nginx
 ---> 5a3221f0137b
Step 2/3 : COPY nginx.conf /etc/nginx/
 ---> Using cache
 ---> 5bdbaabaf3fa
Step 3/3 : CMD nginx -g deameon off
 ---> Using cache
 ---> a5fa8becc614
Successfully built a5fa8becc614
Successfully tagged nginx-redirect-anyingblog:v0.1
```

![](https://oss.trustme.anyingiit.com/images/20190823155933.png)

## 启动容器!

```shell
$ docker run -d -p 901:80 nginx-redirect-anyingblog:v0.8
```

> 启动名为"nginx-redirect-anyingblog:v0.1"的镜像,后台运行,指定端口映射 901(host) ==> 80(container)

![](https://oss.trustme.anyingiit.com/images/20190823155918.png)

## 验证

访问http://anyingiit.com:901

![](https://oss.trustme.anyingiit.com/images/20190823175155.gif)

![](https://oss.trustme.anyingiit.com/images/20190825141530.png)