---
title: uniapp运行到IOS真机调试
date: 2025-08-22
tags:
  - App
  - IOS
  - 真机调试
---
uniapp之运行到ios真机
---


#### uniapp运行到IOS真机调试（windows系统）

- [工具](#_3)
- [步骤](#_13)
- - [1.首先数据线连接电脑和手机](#1_14)
  - [2.右键点击桌面上的HBuilder，打开文件所在位置](#2HBuilder_15)
  - [3.打开HBuilder编辑器里要运行的项目，点击运行=>运行到手机或模拟器=>运行到IOS APP基座=>勾选你的iPhone 和 使用标准基座运行（如果项目有自定义基座也可以使用自定义基座）=>点击运行](#3HBuilderIOS_APPiPhone___21)
  - [4\. 打开爱思助手点击工具箱找到IPA签名](#4_IPA_25)
  - [5.点击添加IPA文件](#5IPA_27)
  - [6.选择你的HBuilder路径\\plugins\\launcher\\base\\下的ios基座： iPhone_base.ipa](#6HBuilderpluginslauncherbaseios_iPhone_baseipa_29)
  - [7.勾选HBuilder和自己的设备后点击开始签名](#7HBuilder_33)
  - [接下来你可能会签名失败](#_37)
  - [如果运行到手机上后点击HBuilder会弹出一个弹框提示你：未受信任的企业级开发者](#HBuilder_47)
  - [如果签名成功，会在状态那看到 ，然后再点击 “打开已签名IPA位置”](#__IPA_51)
  - [点击打开打开已签名IPA位置会弹出个文件夹](#IPA_53)
  - [接下来打开HBuilder点击运行=>运行到手机或模拟器=>运行到IOS APP基座就可以了](#HBuilderIOS_APP_59)
  - [如果没运行出来，可能是由于 iphone 没有开启 “开发者模式”，需要自己手动将开发者模式打开设置---隐私与安全---开发者模式 ，打开后会提示重启手机。但是如果你的ios系统是 16 以上，可能在 设置---隐私与安全 里面没有 “开发者模式这一项” ，需要利用 爱思助手 来将选项打开。](#_iphone___ios_16________60)

第一次用IOS开发app，所以我对IOS真机调试的过程不太了解，通过百度，我找到了能够将项目成功运行到IOS上的方法

## 工具

首先用到的工具就是

- HBuilder编辑器
- uniapp框架搭建的项目
- 爱思助手 （[https://www.i4.cn/](https://www.i4.cn/)）
- 苹果手机链接电脑的数据线

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221500508.png) ![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221457514.png)![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221500657.png)

## 步骤

### 1.首先数据线连接电脑和手机

### 2.右键点击桌面上的HBuilder，打开文件所在位置

```text
找到HBuilder路径下 \plugins\launcher\base\ 的ios基座： iPhone_base.ipa
找到后先别管，一会儿就用到了
```

### 3.打开HBuilder编辑器里要运行的项目，点击运行=>运行到手机或模拟器=>运行到IOS APP基座=>勾选你的iPhone 和 使用标准基座运行（如果项目有自定义基座也可以使用自定义基座）=>点击运行

如果运行不了的话，请看下一步操作，不能运行的原因是因为你还没有签名，如果可以运行的话请忽略

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221457319.png)

### 4\. 打开爱思助手点击工具箱找到IPA签名

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221457509.png)

### 5.点击添加IPA文件

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221457643.png)

### 6.选择你的HBuilder路径\\plugins\\[launcher](https://so.csdn.net/so/search?q=launcher&spm=1001.2101.3001.7020)\\base\\下的ios基座： iPhone_base.ipa

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221457799.png)  
![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221457603.png)

### 7.勾选HBuilder和自己的设备后点击开始签名

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221457339.png)

### 接下来你可能会签名失败

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221458639.png)  
很有可能是你的手机号或者密码输入错误，重新输入一下密码就好了  
如果不是，请看这篇文档  
[苹果ipa签名申请失败](http://platform.yimenapp.com/info/ping-guo-ipa-qian-ming-shen-qing-shi-bai-22981.html)

### 如果运行到手机上后点击HBuilder会弹出一个弹框提示你：未受信任的企业级开发者

解决办法是：打开手机的设置=>通用=>[VPN](https://so.csdn.net/so/search?q=VPN&spm=1001.2101.3001.7020)与设备管理=>开发者APP 然后点击“信任”就可以了

### 如果签名成功，会在状态那看到 ，然后再点击 “打开已签名IPA位置”

![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221458156.png)

### 点击打开打开已签名IPA位置会弹出个文件夹

然后将该[文件重命名](https://so.csdn.net/so/search?q=%E6%96%87%E4%BB%B6%E9%87%8D%E5%91%BD%E5%90%8D&spm=1001.2101.3001.7020)为 iPhone_base_signed.ipa ，并且将这个文件拷贝到  
HBuilderX安装目录\\plugins\\launcher\\base 目录下面  
![在这里插入图片描述](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221458819.png)

### 接下来打开HBuilder点击运行=>运行到手机或模拟器=>运行到IOS APP基座就可以了

### 如果没运行出来，可能是由于 iphone 没有开启 “开发者模式”，需要自己手动将开发者模式打开设置—隐私与安全—开发者模式 ，打开后会提示重启手机。但是如果你的ios系统是 16 以上，可能在 设置—隐私与安全 里面没有 “开发者模式这一项” ，需要利用 爱思助手 来将选项打开。

步骤：

- 打开爱思助手，最好更新到最新版，并且通过数据线连接手机。
- 工具箱 ---- 虚拟定位
- 随便输入一个经纬度，点击 修改 ，然后就会提示 需要手动打开手机上的 “开发者模式”
- 在手机上，设置—隐私与安全性 里面，就能看到有”开发者选项“了，开启，然后提示重启手机。完成即可。
- 项目再运行过程中，还会出现提示 “未受信用的企业级开发者”，需要在：设置—通用------设备管理-----点击Digtial Heaven 开头的…—信任"Digtial Heaven…信任。
- 完成以上操作后，就能再 ios 上，打开 HBuilder App ，就能运行你现在的项目了。

详细请看文档：  
[windows系统运行uniapp到ios基座](https://blog.csdn.net/m0_54239438/article/details/130222278)

（有哪里写的不对的地方欢迎指正~）
