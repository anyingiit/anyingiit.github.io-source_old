---
title: 记录一次在windows docker搭建下搭建cloudreve文件服务器的过程
date: 2021-05-03 22:14:07
tags:
---

# 详细记录一次在windows docker搭建下搭建cloudreve文件服务器的过程

### 拉取

```powershell
> docker pull xavierniu/cloudreve
> docker pull p3terx/aria2-pro
> docker pull mysql:5.7.19
```

### 预创建配置目录以及配置文件

#### 预创建docker volume根目录

```powershell
> mkdir H:\dockerVolume\
```

#### cloudreve相关

##### 预创建目录

```powershell
> cd H:\dockerVolume\
> mkdir datas
> mkdir config
> cd .\datas\
> mkdir avatar
> mkdir downloads
> mkdir ssl
> mkdir uploads
```

```
H:\DOCKERVOLUME
└─cloudreveVolume
  ├─config
  └─datas
      ├─avatar
      ├─downloads
      ├─ssl
      └─uploads
```

##### 预创建配置文件

```powershell
> cd .\dockerVolume\cloudreveVolume\config\
> new-item conf.ini -type file
> new-item cloudreve.db -type file
```

###### 修改配置文件设置

```powershell
> vim conf.ini
```

```
[Database]
Type = mysql
Port = 3306
User = root
Password = 123456
Host = mysql_5.7.19
Name = cloudreve
TablePrefix = cd
[SSL]
Listen = :443
CertPath = /ssl/public.pem
KeyPath = /ssl/private.key
```

##### 准备网站SSL证书

1. 将公钥放在`H:\dockerVolume\cloudreveVolume\datas\ssl\public.pem`
2. 将私钥放在`H:\dockerVolume\cloudreveVolume\datas\ssl\private.key`

#### aria2 相关

```powershell
> cd H:\dockerVolume
> mkdir aria2Volume
> cd aria2Volume
> mkdir config
```

```
H:\DOCKERVOLUME
└─aria2Volume
  └─config
      └─script
```

#### mysql 相关

```powershell
> cd H:\dockerVolume\
> mkdir mysqlVolume
> cd .\mysqlVolume\
> mkdir cloudreve_mysql_5.7.19\
> cd .\cloudreve_mysql_5.7.19\
> mkdir datas
> mkdir logs
```

```
H:\DOCKERVOLUME
└─mysqlVolume
    └─cloudreve_mysql_5.7.19
        ├─datas
        └─logs
```

#### 最终目录总览

```
H:\DOCKERVOLUME
├─aria2Volume
│  └─config
├─cloudreveVolume
│  ├─config
|  |      cloudreve.db
|  |      conf.ini
│  └─datas
│      ├─avatar
│      ├─downloads
│      ├─ssl
|      |      private.key
|      |      public.pem
│      └─uploads
└─mysqlVolume
    └─cloudreve_mysql_5.7.19
        ├─datas
        └─logs
```



### 配置docker

#### 配置docker network

```powershell
> docker network create docker-cloudreve
```

### 启动服务

#### 启动 mysql

```powershell
> docker run -d `
    --name=cloudreve_mysql_5.7.19 `
    -e MYSQL_ROOT_PASSWORD=123456 `
    -v H:\dockerVolume\mysqlVolume\cloudreve_mysql_5.7.19\datas:/var/lib/mysql `
    -v H:\dockerVolume\mysqlVolume\cloudreve_mysql_5.7.19\logs:/var/log/mysql `
    --network docker-cloudreve `
    --network-alias mysql_5.7.19 `
    mysql:5.7.19
```

##### 配置mysql

###### 通过另一个docker创建cloudreve的数据库

因为mysql没有配置外网通讯, 所以必须通过启动一个和mysql服务器在同一网络环境下, 并且安装有mysql客户端的docker容器配置服务端mysql

```powershell
> docker run -it `
    --name=cloudreve_mysql_connecter_neeed_delete `
    --network docker-cloudreve `
    mysql:5.7.19 `
    bash
```

```bash
$ mysql -hmysql_5.7.19 -uroot -p123456
```

```mysql
mysql> CREATE DATABASE `mydb` CHARACTER SET utf8 COLLATE utf8_general_ci;
```

```
Query OK, 1 row affected (0.12 sec);
```

#### 启动 aria2

```powershell
> docker run -d `
    --name cloudreve_aria2 `
    --restart unless-stopped `
    --log-opt max-size=1m `
    -e RPC_SECRET="<YOU ARIA2 SECRET>" `
    -v H:\dockerVolume\aria2Volume\config:/config `
    -v H:\dockerVolume\cloudreveVolume\datas\downloads:/downloads `
    --network docker-cloudreve `
    --network-alias aria2 `
    p3terx/aria2-pro
```

#### 启动 cloudreve

```powershell
> docker run -d `
    --name cloudreve `
    -e TZ="Asia/Shanghai" `
    -p 5212:5212 `
    -p 5213:443 `
    --restart=unless-stopped `
    -v H:\dockerVolume\cloudreveVolume\datas\uploads:/cloudreve/uploads `
    -v H:\dockerVolume\cloudreveVolume\config\conf.ini:/cloudreve/conf.ini `
    -v H:\dockerVolume\cloudreveVolume\config\cloudreve.db:/cloudreve/cloudreve.db `
    -v H:\dockerVolume\cloudreveVolume\datas\avatar:/cloudreve/avatar `
    -v H:\dockerVolume\cloudreveVolume\datas\downloads:/downloads `
    -v H:\dockerVolume\cloudreveVolume\datas\ssl\public.pem:/ssl/public.pem `
    -v H:\dockerVolume\cloudreveVolume\datas\ssl\private.key:/ssl/private.key `
    --network docker-cloudreve `
    --network-alias cloudreve `
    xavierniu/cloudreve
```

### 配置服务

#### 配置 cloudreve离线下载

进入控制面板 -> 参数设置 -> 离线下载

按照如下配置

![image-20210504105247539](https://anying-picture-universal-public-read.oss-cn-beijing.aliyuncs.com/notes-images/image-20210504105247539.png)

##### 参数说明

* RPC 服务器地址: http://aria2:6800/
* RPC Secret: 在启动arir2时设置的变量`RPC_SECRET`
* 临时下载目录: /downloads

其他参数无修修改, 测试连接正常后保存即可

###### 高级配置

可以配置全局任务参数设置线程最大数以及tracker服务器, 下面给出例子

```json
{
	"max-concurrent-downloads": 10,
	"bt-tracker": [
		"udp://tracker.coppersurfer.tk:6969/announce",
		"udp://tracker.opentrackr.org:1337/announce",
		"udp://tracker.leechers-paradise.org:6969/announce"
	]
}
```

## Done!