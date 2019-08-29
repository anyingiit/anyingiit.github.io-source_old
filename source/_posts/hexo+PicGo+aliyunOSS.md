---
title: 阿里云OSS+PicGo加速GitPage
date: 2019-08-20 15:09:50
tags:
---

# 配置hexo配合PicGo使用阿里云OSS

## 配置阿里云OSS

### 创建Bucket

![](https://oss.trustme.anyingiit.com/images/20190820152317.png)

### 配置域名(可选)

![](https://oss.trustme.anyingiit.com/images/20190820152433.png)

#### 配置证书

![](https://oss.trustme.anyingiit.com/images/20190820152743.png)

### 配置`子用户Access Key`

#### 选择使用`子用户Access Key`

![](https://oss.trustme.anyingiit.com/images/20190820152723.png)

#### 新建用户

![](https://oss.trustme.anyingiit.com/images/20190820152840.png)

#### 创建`AccessKey`

![](https://oss.trustme.anyingiit.com/images/20190820153112.png)

![](https://oss.trustme.anyingiit.com/images/20190820153251.png)

## 配置PicGo

![](https://oss.trustme.anyingiit.com/images/20190820153721.png)

1. 刚刚获取到的Access Key
2. 刚刚获取到的Access Key
3. 你创建的Bucket名称
4. 注意,只要前半部分,不要后面的域名后缀
   1. ![](https://oss.trustme.anyingiit.com/images/20190820153927.png)
5. 存储到Bucket的路径
6. 你刚刚设定的域名



