---
title: Into Hexo Blog Inset Image
date: 2019-08-16 20:54:12
tags:
typora-root-url: Into-Hexo-Blog-Inset-Image
---

# 在Hexo博客中添加图片

## 安装插件

在Hexo博客根目录安装`hexo-asset-image`插件

```shell
# npm install hexo-asset-image --save#我信你个鬼,这个版本太老了,用下面的命令
npm install https://github.com/xcodebuild/hexo-asset-image.git
```

## 配置自动创建文件夹

在`_config.yml`修改`post_asset_folder: true`以在创建新文章的时候自动创建同名文件夹

## 图片效果展示

![](https://oss.trustme.anyingiit.com/images/20190820154425.jpg)

注:博主后来使用了阿里的OSS桶,使用插件毕竟还有弊端,会导致某些插件不能正确配置.

# 等等!好像没那么容易结束...

原本文章在这里就结束了,作者本来只想简单的记录一下设置图片的过程,没想到踩了一个大坑!也许你注意到了,上面的安装`hexo-asset-image`的代码第一行被注释掉了,作者弄了两个小时,就是无法生成正确的引用图片地址,气死我了,各种升级依赖,各种google,然后发现就是以前的版本有一个生成Bug,导致图片的位置一直引用的地址为

```html
src="/.com//xxPic.jpg"
```

气死我了,希望看到文章的您不要再使用`npm install hexo-asset-image --seve`了!!