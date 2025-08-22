---
title: uniapp-Android云教打包
date: 2025-08-22
tags:
- App
- android
- 真机调试
---
uniapp之云打包到android
---
### 前言

本教程将指导您完成[uni-app项目](https://so.csdn.net/so/search?q=uni-app%E9%A1%B9%E7%9B%AE&spm=1001.2101.3001.7020)的Android云打包过程。

### 一、申请应用标识

#### 1.1 获取DCloud AppID

1.  登录[DCloud开发者中心](https://dev.dcloud.net.cn/)

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221506365.png)

2.  创建一个新应用

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221506256.png)

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221506160.png)

3.  点击创建后的项目

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221506657.png)

4.  创建证书，需要等一会儿时间，1 分钟左右，可能更快，（可以尝试刷新页面）

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221506109.png)

5.  创建完成，下载，后面使用

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221506107.png)

6.  新增平台，这块需要用到刚刚创建的证书

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221506635.png)

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221507228.png)

注意：这边开了 2 个窗口，左边的窗口在第 5 步，点击查看证书  
![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221507877.png)

7.创建平台完成  
![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221507617.png)

### 二、准备打包资源

#### 2.1 使用云打包

1.  HBuilderX中操作，可以创建一个新项目，供测试

![image-20250822151258145](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221512356.png)

2.  将申请的证书文件填写到下方位置

![image-20250822151316210](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221513423.png)

直接点击打包即可

### 三、常见问题

| 问题            | 导致原因                                         | 解决方案                                                     |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| 打包进度卡在40% | 使用的非HbuilderX开发的，目录结构是以src是根目录 | 先使用pnpm run build:app进行打包，找到/dist/build/app。以app目录作为根目录在进行打包，如图 |

### ![image-20250822152117466](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221521702.png)![image-20250822152220911](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202508221522990.png)

### 参考资料

- [一招解决Gradle下载慢：本地路径配置指南](https://blog.csdn.net/weixin_44297859/article/details/144844504?spm=1001.2014.3001.5501)
- [解决uniapp安卓打包targetSdkVersion报错](https://blog.csdn.net/weixin_44297859/article/details/144848152?spm=1001.2014.3001.5501)
- [uni-app离线打包文档](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android)
- [Android打包发布指南](https://developer.android.com/studio/publish)

---
