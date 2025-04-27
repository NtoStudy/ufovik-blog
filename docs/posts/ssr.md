---
title: SSR
date: 2025-04-26
tags:
  - 前端
  - 服务端渲染
---
易于SEO, 搜索引擎优化（当然, 搜索引擎也是不断在进化的）
---


### SSR 简介

全名: Server Side Rendering，即服务端渲染。

其相对比的就是 CSR(Client Side Rendering)，即客户端渲染。

SSR 并不是什么新的事物, 早在 JSP、ASP、PHP Web1.0 的时候就是SSR, 那个时候就是以展示为主，后来到了 Web2.0 之后, CSR 技术就开始流行起来了, 在最近的几年客户端渲染也是出现了一些问题, 现在有些场景下需要一些性能、体验啥的, 就需要考虑一下 SSR 了。

但是这个时候的 SSR 不是1.0的SSP了, 而是SSR、CSS、框架、组件相结合的SSR。

SSR 不是新的概念, 他不是100%的创新, 是一种技术组合。

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271131192.png" />

SSR 的优点：

性能好

易于SEO, 搜索引擎优化（当然, 搜索引擎也是不断在进化的）

缺点

开发成本高: 前端框架 + Nodejs （全栈框架）

应用场景

性能要求高的系统

比如 H5、弱网环境

操作交互比较简单的系统, 否则开发的复杂度会比较高。

如 B 端, 就是不适合用 SSR（性能要求不高，操作复杂）

常见的 SSR 框架

1. Next.js
2. Nuxt.js
3. Gatsby.js
4. Remix
5. Sapper

总结

SSR 是一个技术组合, 它不是100%的创新, 而是一种技术组合。

PS: 注意区分 Next、Nuxt、Nest 
