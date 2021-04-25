---
title: 记录一次Windows10安装OpenSSH服务端的过程
date: 2021-04-25 14:04:01
tags:
---

# 记录一次Windows10安装OpenSSH服务端并配置仅证书登录的过程

## 目录

1. 安装OpenSSH
2. 配置OpenSSH
   1. 配置证书登录
   2. 关闭密码登录
3. 启动OpenSSH服务

```powershell
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```

## 1. 安装OpenSSH

```
设置->应用->应用和功能->可选功能->添加功能->搜索open->选择"OpenSSH 服务器"->安装
```



![image-20210425140641402](https://anying-blog-pic.oss-cn-beijing.aliyuncs.com/images/image-20210425140641402.png)

## 2. 配置OpenSSH

**注意: 所有操作均在`CMD`管理员权限下执行**

### 2.1. 配置文件

#### 关闭密码登录并开启证书登录

```
notepad %PROGRAMDATA%\ssh\sshd_config
```

```
PasswordAuthentication no #关闭密码登录(默认开启)
PubkeyAuthentication yes #开启证书登录(默认开启)
```

取消注释以下配置

```
Match Group administrators
       AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

### 2.2. 配置证书

1. 创建证书
2. 配置权限
   1. 如果如果欲SSH登录用户属于Administrator用户组需要额外配置

#### 2.2.1. 创建证书

```bash
:: (在CMD下)
cd %USERPROFILE%\.ssh
ssh-keygen -t rsa -f myssh
```

#### 2.2.2. 配置文件名以及权限

```bash
mv %USERPROFILE%\.ssh\myssh.pub authorized_keys
icacls %USERPROFILE%\.ssh\authorized_keys ::确保只有System, Administrators and owner可以访问
```

##### (*)2.2.2.1. (如果欲SSH登录用户属于Administrator用户组)

###### 复制公钥

```bash
cp %USERPROFILE%\.ssh\authorized_keys %PROGRAMDATA%\ssh\administrators_authorized_keys
```

###### 配置公钥权限

```bash
:: 这个文件只能SYSTEM和Administrators组访问
cd %PROGRAMDATA%\ssh\
icacls administrators_authorized_keys /inheritance:r
icacls administrators_authorized_keys /grant SYSTEM:`(F`)
icacls administrators_authorized_keys /grant BUILTIN\Administrators:`(F`)
```

## 启动OpenSSH服务

```bash
net stop ssh-agent
net stop sshd
net start ssh-agent
net start sshd
```

