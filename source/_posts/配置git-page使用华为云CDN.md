---
title: 配置git page使用华为云CDN
date: 2019-08-20 13:49:06
tags:
---

## 先决条件

1. 有一个域名
2. 配置好的git page
   1. 域名指向
   2. 可以正常访问
3. 有CDN产品的华为云账号

## 开始配置

### 配置华为云

#### 添加域名

![得出源站IP](https://oss.trustme.anyingiit.com/images/20190821091133.png)

![添加域名](https://oss.trustme.anyingiit.com/images/20190821090943.png)

#### 配置HTTPS

##### 申请证书并导入证书

![](https://oss.trustme.anyingiit.com/images/20190821091432.png)

### 配置域名

#### 复制CNAME

![](https://oss.trustme.anyingiit.com/images/20190821092531.png)

#### 配置CNAME

![](https://oss.trustme.anyingiit.com/images/20190821092717.png)

