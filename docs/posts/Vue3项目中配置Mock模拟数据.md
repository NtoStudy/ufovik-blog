---
title: Vite+Ts+Vue3 项目中配置 Mock 模拟数据
date: 2024-07-29
tags:
  - 前端
  - Mock
---
在vue3项目使用mock模拟数据
---

如下是在 Vite+Ts+Vue3 项目中配置 Mock 模拟数据的方法

```bash
pnpm add -D mockjs @types/mockjs
```

```bash
mkdir mock
```

编写一个列表分页的mock

mock / index.ts

```ts
import * as Mock from "mockjs"

const Random = Mock.Random

interface DataList {
  date: string
  name: string
  address: string
}

const dataList: DataList[] = []
for (let i = 0; i < 100; i++) {
  const template = {
    date: Random.date(),
    name: Random.cname(),
    address:
      Random.county(true) + Random.city() + Random.province() + Random.zip(),
  }
  dataList.push(template)
}

Mock.mock("/api/list", "post", (params: any) => {
  let info = JSON.parse(params.body)
  let [index, size, total] = [info.current - 1, info.pageSize, dataList.length]
  let len = total / size
  let totalPages = Math.ceil(len)
  let newDataList = dataList.slice(index * size, (index + 1) * size)
  return {
    code: "200",
    message: "获取成功",
    data: {
      current: info.current,
      pageSize: size,
      rows: newDataList,
      total: total,
      totalPages: totalPages,
    },
  }
})
```

在对应的vue组件中使用即可

```ts
<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"
import "../../../mock/index.ts"
import type { TableOptions } from "@/components/table/src/interface.ts"

// 假数据
const tableData = ref([])
setTimeout(() => {
  tableData.value = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ]
}, 300)

// 表格配置
const options: TableOptions[] = [
  {
    label: "日期",
    prop: "date",
    align: "center",
    slot: "date",
  },
  {
    label: "姓名",
    prop: "name",
    align: "center",
    slot: "name",
    editable: true,
  },
  {
    label: "地址",
    prop: "address",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    action: true,
    align: "center",
  },
]

function handleEdit(row: any) {
  console.log(row)
}

onMounted(() => {
  axios
    .post("/api/list", {
      current: 2,
      pageSize: 30,
    })
    .then((res) => {
      console.log(res.data)
    })
})
</script>

<template>
  <yq-table :data="tableData" :options="options" elementLoadingText="加载中...">
    <template #action="{ scope }">
      <el-button size="small" type="text" @click="handleEdit(scope)"
        >编辑</el-button
      >
    </template>
    <template #date="{ scope }">
      <span class="text-red-700">{{ scope.row.date }}</span>
    </template>
    <template #name="{ scope }">
      <el-tag>
        <span>{{ scope.row.name }}</span>
      </el-tag>
    </template>
  </yq-table>
</template>

<style scoped></style>
```
