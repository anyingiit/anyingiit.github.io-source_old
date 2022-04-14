---
title: >-
  Unity Vrchat_Aatar_SDK3.0 报错解决方案 error CS0117: 'PlayerSettings' does not
  contain a definition for 'SetVirtualRealitySDKs' 
date: 2022-04-15 01:35:59
tags:
---

## 报错信息

### 发生时间

```
2022年4月15日01:37:12
```

### 提示信息

报错原信息如下

```
Assets\VRCSDK\Dependencies\VRChat\Editor\EnvConfig.cs(445,28): error CS0117: 'PlayerSettings' does not contain a definition for 'SetVirtualRealitySDKs'
```

### 影响程度

无法正常使用`Vrchat Avatar 3.0 SDK`

## 报错原因

经过查看文档得知`Vrchat Avatar 3.0`的SDK对非`Unity 2019.4.31f1`版本的Unity编辑器不支持

## 修复建议

请查看官方文档页面[https://docs.vrchat.com/v2022.1.2/docs/current-unity-version#current-unity-version](https://docs.vrchat.com/v2022.1.2/docs/current-unity-version#current-unity-version)获取最新SDK支持版本信息
