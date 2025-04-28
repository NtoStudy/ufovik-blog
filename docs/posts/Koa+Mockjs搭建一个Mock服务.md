---
title: Koa+Mockjs搭建一个Mock服务
date: 2025-04-26
tags:
  - 前端
  - Mock
---
在koa中使用mock模拟数据
---

如下是一个简单搭建的过程, 为了开发快速, 不使用 TypeScript, 可以使用 JSDOC

对应 commit: 

```bash
mkdir project-mock
```

```bash
cd project-mock
```

```bash
pnpm init
```

```bash
pnpm add mockjs
```

```bash
pnpm add koa koa-router
```

```bash
pnpm add -D nodemon
```

package.json 新增

```json
{
  "scripts":{
    "dev": "nodemon index.js"
  }
}
```

```bash
mkdir mock
```

<img src="https://github.com/user-attachments/assets/b7726b15-a7a8-4346-a8b6-74d7b1e5c4e2" />

modules 中放置 mock 模块, index.js 进行统一导出

例：

/mock/modules/question.js

```js
const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
    {
        url: '/api/question',
        method: 'get',
        response() {
            return {
                code: 200,
                data: {
                    id: Random.id(),
                    title: Random.ctitle(),
                }
            }
        }
    }
]
```

/mock/index.js

```js
const questionMock = require('./modules/question');

module.exports = [
    ...questionMock
]
```

新建index.js，进行路由初始化

<img src="https://github.com/user-attachments/assets/53d9325b-d4a5-46e5-91d6-e59a2e069f2a" />

```js
const Koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index')

const app = new Koa()
const router = new Router()

// 增加响应时间
async function getRes(fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      const res = fn()
      resolve(res)
    }, 1000)
  })
}

// 注册Mock路由
mockList.forEach(item => {
  if (!item.method || !item.url || !item.response) {
    console.error('Invalid mock item:', item)
    return
  }

  router[item.method](item.url, async (ctx) => {
    console.log(`Handling request for ${item.method.toUpperCase()} ${item.url}`)
    ctx.body = await getRes(item.response)
  })
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
```

测试（模拟get请求）：

<img src="https://github.com/user-attachments/assets/dba6edf6-a1dc-43f3-94e0-92104aea3ec9" />
