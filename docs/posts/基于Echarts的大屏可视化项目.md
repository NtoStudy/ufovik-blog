---
title: 基于Echarts的大屏可视化项目
date: 2024-08-26 19:03:31
tags: 
  - 前端
  - 大屏可视化
---
基于Echarts的大屏可视化项目
---

## 效果图

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271124994.png" />

基于vue3+echarts+Tailwind CSS技术实现

## 实现思路

### 新建一个新项目

找任一目录进行

~~~ 
pnpm create vite@latest
~~~

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271124105.png" />

选择vue和js开始项目

### 导入tailwindcss

https://tailwindcss.com/

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271124996.png" />

选择vue按照里面的步骤一步一步完成即可

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125320.png" />

将事先准备好的资料导入到assets包中即可
<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125241.png" />

### 写入项目的内容

将app.vue中的内容更改为

~~~js
<template>
  <div class="bg-[url('src/assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-3 flex">
    <!--  左-->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
    </div>
    <!--  中-->
    <div class="w-1/2 mr-5 flex flex-col">
    </div>
    <!--  右-->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
    </div>
  </div>
</template>
~~~

此时项目的样式为
<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125160.png" />

页面可被分为八个部分，分别是左边三个（见上完整图示），右边三个，中间两个

此时可以新建八个页面，分别为八个子组件，app.vue是父组件

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125652.png" />

导入子组件，并且更改每个组件的图占比


```js
<script setup>
import HorizontalBar from './components/HorizontalBar.vue';
import RadarBar from './components/RadarBar.vue';
import Relation from './components/Relation.vue';
import ToatlData from './components/TotalData.vue';
import MapChart from './components/MapChart.vue';
import VerticalBar from './components/VerticalBar.vue';
import RingBar from './components/RingBar.vue';
import WordCloud from './components/WordCloud.vue';
</script>


<template>
  <div>
    <!-- 自定义背景,背景bg,[]中放置图片路径 -->
    <div class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden">
      <!-- 左 -->
      <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
        <!-- 横向柱状图 -->
        <HorizontalBar class="h-1/3 box-border pb-4"/>
        <!-- 雷达图 -->
        <RadarBar class="h-1/3 box-border pb-4"/>
        <!-- 关系图 -->
        <Relation class="h-1/3"/>
      </div>
      <!-- 中 -->
      <div class="w-1/2 mr-5 flex flex-col">
        <!-- 数据总览图 -->
        <ToatlData class="bg-opacity-50 bg-slate-800 p-3"/>
        <!-- 地图可视化 -->
        <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1"/>
      </div>
      <!-- 右 -->
      <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
        <!-- 竖向柱状图 -->
        <VerticalBar class="h-1/3 box-border pb-4"/>
        <!-- 环形图 -->
        <RingBar class="h-1/3 box-border pb-4"/>
        <!-- 文档云图 -->
        <WordCloud class="h-1/3"/>
      </div>
    </div>
    
  </div>
</template> 
```

此时的图片就成了这个样子

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125505.png" />

### 配置拦截器，并调接口

在src目录中新建utils/request.js

~~~js
import axios from 'axios'

const service = axios.create({
    baseURL: 'https://api.imooc-web.lgdsunday.club/api',
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers.icode = 'hellosunday' // 这里的icode关注公众号获得
        return config // 必须返回配置
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use((response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
        return data
    } else {
        return Promise.reject(new Error(message))
    }
})

export default service
~~~

在src目录中新建api/visualization.js

~~~js
import request from "../utils/request.js";
export const getVisualization = () => request({
    url:'/visualization',
    method:'GET'
})
~~~

此时就可以获取后台返回的数据了

 在app.vue父组件中获取接口返回的数据

~~~js
// 获取大屏可视化的数据
const data = ref();
const getData = async () => {
  data.value = await getVisualization()
}
getData()

// 每五秒更新一下数据
setInterval(() => {
  getData()
}, 5000)
~~~

data.value中的数据是这样的

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125823.png" />

之后就可以将获取的数据传递给子组件

~~~js
<template>
  <div class="bg-[url('src/assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-3 flex overflow-hidden ">
    <!--  左-->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--横向柱状图-->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data.regionData"/>
      <!--雷达图-->
      <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData"/>
      <!--关系图-->
      <Relation class="h-1/3" :data="data.relationData"/>
    </div>
    <!--  中-->
    <div class="w-1/2 mr-5 flex flex-col">
      <!--数据总览柱状图-->
      <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData"/>
      <!--地图可视化-->
      <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1" :data="data.mapData"/>
    </div>
    <!--  右-->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!--竖向柱状图-->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData"/>
      <!--环形图-->
      <RingBar class="h-1/3 box-border pb-4" :data="data.abnormalData"/>
      <!--数据云图-->
      <WordCloud class="h-1/3" :data="data.wordCloudData"/>
    </div>
  </div>
</template>
~~~

### 横竖两个柱状图

1. 横

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125589.png" />

在components的HorizontalBar.vue里面进行配置
代码如下

```js
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2.构建option配置对象
const renderChart = () => {
  const options = {
    // X 轴展示数据
    xAxis: {
      // 数据展示
      type: 'value',
      // 不显示轴
      show: false,
      // 最大值（防止触顶）
      max: function (value) {
        // 取整
        return parseInt(value.max * 1.2)
      }
    },
    // Y 轴展示选项
    yAxis: {
      type: 'category',
      // 根据根据服务端数据筛选
      data: props.data.regions.map((item) => item.name),
      // 反向展示
      inverse: true,
      // 不展示轴线
      axisLine: {
        show: false
      },
      // 不展示刻度
      axisTick: {
        show: false // 取消 Y 轴刻度
      },
      // 文字色值
      axisLabel: {
        color: '#9EB1C8'
      }
    },
    // echarts 网格绘制的位置，对应 上、右、下、左
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      // 计算边距时，包含标签
      containLabel: true
    },
    // 柱形图核心配置
    series: [
      {
        // 图表类型
        type: 'bar',
        // 数据筛选
        data: props.data.regions.map((item) => ({
          name: item.name,
          value: item.value
        })),
        // 显示背景
        showBackground: true,
        // 背景色
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        // 每个轴的样式
        itemStyle: {
          color: '#479AD3', // 设置柱子的颜色
          barBorderRadius: 5, // 设置柱子的圆角
          shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
          shadowBlur: 5 // 设置柱子的阴影模糊大小
        },
        // 轴宽度
        barWidth: 12,
        // 轴上的字体
        label: {
          show: true,
          // 设置标签位置为右侧
          position: 'right',
          textStyle: {
            // 设置标签文本颜色
            color: '#fff'
          }
        }
      }
    ]
  }

  mChart.setOption(options)
}

watch(
    () => props.data,
    () => {
      renderChart()
    }
)
</script>

<template>
  <div>
    <div>【大区数据信息 - 按行业分类】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
```


2. 竖

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125449.png" />

在components/VerticalBar.vue 中进行配置，代码如下

~~~js
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2.构建option配置对象
const renderChart = () => {
  const options = {
    // X 轴展示数据
    xAxis: {
      // 数据展示
      type: 'value',
      // 不显示轴
      show: false,
      // 最大值（防止触顶）
      max: function (value) {
        // 取整
        return parseInt(value.max * 1.2)
      }
    },
    // Y 轴展示选项
    yAxis: {
      type: 'category',
      // 根据根据服务端数据筛选
      data: props.data.regions.map((item) => item.name),
      // 反向展示
      inverse: true,
      // 不展示轴线
      axisLine: {
        show: false
      },
      // 不展示刻度
      axisTick: {
        show: false // 取消 Y 轴刻度
      },
      // 文字色值
      axisLabel: {
        color: '#9EB1C8'
      }
    },
    // echarts 网格绘制的位置，对应 上、右、下、左
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      // 计算边距时，包含标签
      containLabel: true
    },
    // 柱形图核心配置
    series: [
      {
        // 图表类型
        type: 'bar',
        // 数据筛选
        data: props.data.regions.map((item) => ({
          name: item.name,
          value: item.value
        })),
        // 显示背景
        showBackground: true,
        // 背景色
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        // 每个轴的样式
        itemStyle: {
          color: '#479AD3', // 设置柱子的颜色
          barBorderRadius: 5, // 设置柱子的圆角
          shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
          shadowBlur: 5 // 设置柱子的阴影模糊大小
        },
        // 轴宽度
        barWidth: 12,
        // 轴上的字体
        label: {
          show: true,
          // 设置标签位置为右侧
          position: 'right',
          textStyle: {
            // 设置标签文本颜色
            color: '#fff'
          }
        }
      }
    ]
  }

  mChart.setOption(options)
}

watch(
    () => props.data,
    () => {
      renderChart()
    }
)
</script>

<template>
  <div>
    <div>【大区数据信息 - 按行业分类】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
~~~

### 雷达图与饼图

1. 雷达图

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125550.png" />

RadarBar.vue代码如下

```js
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart =  echarts.init(target.value)
  renderChart()
} )
// 2.构建option配置对象
const renderChart = () => {
  const options = {
    // 雷达图坐标系配置
    radar: {
      // 坐标系名
      name: {
        textStyle: {
          color: '#05D5FF',
          fontSize: 14
        }
      },
      // 雷达绘制类型。polygon 多边形
      shape: 'polygon',
      // 居中
      center: ['50%', '50%'],
      // 边境
      radius: '80%',
      // 开始的角度（可以避免绘制到边框之外）
      startAngle: 120,
      // 轴线配置
      axisLine: {
        lineStyle: {
          color: 'rgba(5, 213, 255, .8)'
        }
      },
      // 网格线配置
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(5, 213, 255, .8)' // 设置网格的颜色
        }
      },
      // 指示器文字
      indicator: props.data.risks.map(item=>({
        name: item.name,
        max: 100
      })),
      // 不展示拆分区域
      splitArea: {
        show: false
      }
    },
    // 坐标居中
    polar: {
      center: ['50%', '50%'], // 默认全局居中
      radius: '0%'
    },
    // 坐标角度
    angleAxis: {
      // 坐标轴刻度最小值
      min: 0,
      // 坐标轴分割间隔
      interval: 5,
      // 刻度增长逆时针
      clockwise: false,
      // 不显示坐标轴刻度
      axisTick: {
        show: false
      },
      // 不显示坐标轴文字
      axisLabel: {
        show: false
      },
      // 不显示坐标轴线
      axisLine: {
        show: false
      },
      // 不显示分割线
      splitLine: {
        show: false
      }
    },
    // 径向轴
    radiusAxis: {
      // 最小值
      min: 0,
      // 间隔
      interval: 20,
      // 不显示分割线
      splitLine: {
        show: true
      }
    },
    // 图表核心配置
    series: [
      {
        // 雷达图
        type: 'radar',
        // 拐点的样式，还可以取值'rect','angle'等
        symbol: 'circle',
        // 拐点的大小
        symbolSize: 10,
        // 折线拐点标志的样式
        itemStyle: {
          normal: {
            color: '#05D5FF'
          }
        },
        // 区域填充样式
        areaStyle: {
          normal: {
            color: '#05D5FF',
            opacity: 0.5
          }
        },
        // 线条样式
        lineStyle: {
          width: 2,
          color: '#05D5FF'
        },
        // 图形上的文本标签
        label: {
          normal: {
            show: true,
            formatter: (params) => {
              return params.value
            },
            color: '#fff'
          }
        },
        // 数据
        data: [
          {
            value: props.data.risks.map(item=>item.value)
          }
        ]
      }
    ]
  }

  mChart.setOption(options)
}

watch(
    () => props.data,
    () => {
      renderChart()
    }
)
</script>

<template>
  <div>
    <div>云端报警风险</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>

```



2. 饼图

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125775.png" />

RingBar.vue代码如下

```js
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})


/**
 * 双环形图绘制原理：
 * 1. 环形图通过饼图绘制。内外边距的距离减小，即为环形。环形中心点需要不断改变，否则会重叠
 * 2. 环形图绘制分为 上层和底层 两部分。上层作为绘制进度，底层作为背景图
 * 3. 依据 getSeriesData 生成对应的 上层和底层 series 数据，进行渲染
 */
const getSeriesData = () => {
  const series = []

  props.data.abnormals.forEach((item, index) => {
    // 上层环形绘制
    series.push({
      name: item.name,
      // 使用饼图绘制，减少饼图宽度即为环形图
      type: 'pie',
      // 逆时针排布
      clockWise: false,
      // 不展示鼠标移入动画
      hoverAnimation: false,
      // 半径位置，需要依次递减，否则会重复在一处进行展示
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      // 中心点
      center: ['55%', '55%'],
      // 不展示 label
      label: { show: false },
      // 数据配置
      data: [
        // 设置数据与名称
        { value: item.value, name: item.name },
        // 最大数据，展示比例
        {
          value: 1000,
          name: '',
          itemStyle: { color: 'rgba(0,0,0,0)', borderWidth: 0 },
          tooltip: { show: false },
          hoverAnimation: false
        }
      ]
    })

    // 底层图
    series.push({
      name: item.name,
      type: 'pie',
      // 图形不响应事件
      silent: true,
      // z-index: 置于底层
      z: 1,
      // 逆时针排布
      clockWise: false,
      // 不展示鼠标移入动画
      hoverAnimation: false,
      // 半径位置，需要依次递减，否则会重复在一处进行展示
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      // 中心点
      center: ['55%', '55%'],
      // 不展示 label
      label: { show: false },
      // 数据
      data: [
        // 绘制底线 75%
        {
          value: 7.5,
          itemStyle: { color: 'rgb(3, 31, 62)', borderWidth: 0 },
          tooltip: { show: false },
          hoverAnimation: false
        },
        // 绘制底线 25% 透明区域
        {
          value: 2.5,
          name: '',
          itemStyle: { color: 'rgba(0,0,0,0)', borderWidth: 0 },
          tooltip: { show: false },
          hoverAnimation: false
        }
      ]
    })
  })

  return series
}

const renderChart = () => {
  const options = {
    // 图例配置
    legend: {
      show: true,
      // 图例色块
      icon: 'circle',
      // 位置
      top: '14%',
      left: '60%',
      // 展示数据
      data: props.data.abnormals.map((item) => item.name),
      // 总宽度（一列）
      width: -5,
      // 每个色块的宽
      itemWidth: 10,
      // 每个色块的高度
      itemHeight: 10,
      // item 间距
      itemGap: 6,
      // 展示内容
      formatter: function (name) {
        return '{title|' + name + '}'
      },
      // 字体配置
      textStyle: {
        rich: {
          title: {
            fontSize: 12,
            lineHeight: 5,
            color: 'rgba(255,255,255,0.8)'
          }
        }
      }
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a}<br>{b}:{c}({d}%)'
    },
    // Y 轴展示选项
    yAxis: [
      {
        type: 'category',
        // 反向展示
        inverse: true,
        // 不展示轴线
        axisLine: {
          show: false
        },
        // 不展示刻度
        axisTick: {
          show: false
        }
      }
    ],
    // X 轴不展示
    xAxis: [
      {
        show: false
      }
    ],
    // 每两个标记一条线
    series: getSeriesData()
  }

  mChart.setOption(options)
}

watch(
    () => props.data,
    () => {
      renderChart()
    }
)
</script>

<template>
  <div>
    <div>【大区异常处理】</div>
    <div ref="target"  class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
```

### 关系图

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125961.png" />

Relation.vue中代码如下

~~~js
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart =  echarts.init(target.value)
  renderChart()
} )
// 2.构建option配置对象

// 渲染图表
const renderChart = () => {
  const options = {
    // X 轴不需要展示
    xAxis: {
      show: false,
      type: 'value'
    },
    // X 轴不需要展示
    yAxis: {
      show: false,
      type: 'value'
    },
    // 核心数据配置
    series: [
      {
        // 用于展现节点以及节点之间的关系数据
        type: 'graph',
        // 不采用任何布局
        layout: 'none',
        // 使用二维的直角坐标系
        coordinateSystem: 'cartesian2d',
        // 节点标记的大小
        symbolSize: 26,
        // z-index
        z: 3,
        // 边界标签（线条文字）
        edgeLabel: {
          normal: {
            show: true,
            color: '#fff',
            textStyle: {
              fontSize: 14
            },
            formatter: function (params) {
              let txt = ''
              if (params.data.speed !== undefined) {
                txt = params.data.speed
              }
              return txt
            }
          }
        },
        // 圆饼下文字
        label: {
          normal: {
            show: true,
            position: 'bottom',
            color: '#5e5e5e'
          }
        },
        // 边两端的标记类型
        edgeSymbol: ['none', 'arrow'],
        // 边两端的标记大小
        edgeSymbolSize: 8,
        // 圆数据
        data: props.data.relations.map((item) => {
          // id 为 0 ，表示数据中心，数据中心单独设置
          if (item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              active: true,
              speed: `${item.speed}kb/s`,
              // 位置
              value: item.value
            }
          } else {
            return {
              name: item.name,
              // 位置
              value: item.value,
              // 数据中心圆的大小
              symbolSize: 100,
              // 圆的样式
              itemStyle: {
                normal: {
                  // 渐变色
                  color: {
                    colorStops: [
                      { offset: 0, color: '#157eff' },
                      { offset: 1, color: '#35c2ff' }
                    ]
                  }
                }
              },
              // 字体
              label: { normal: { fontSize: '14' } }
            }
          }
        }),
        // 线
        links: props.data.relations.map((item, index) => ({
          // 方向
          source: item.source,
          target: item.target,
          // 线上的文字
          speed: `${item.speed}kb/s`,
          // 线的样式
          lineStyle: { normal: { color: '#12b5d0', curveness: 0.2 } },
          // 文字位置
          label: {
            show: true,
            position: 'middle',
            offset: [10, 0]
          }
        }))
      },
      {
        // 用于带有起点和终点信息的线数据的绘制
        type: 'lines',
        // 使用二维的直角坐标系
        coordinateSystem: 'cartesian2d',
        // z-index
        z: 1,
        // 线特效的配置
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: 'arrow',
          color: 'rgba(55,155,255,0.5)',
          symbolSize: 12
        },
        // 线的样式
        lineStyle: {
          normal: {
            curveness: 0.2
          }
        },
        // 线的数据级，前后线需要重合。数据固定
        data: [
          [{ coord: [0, 300] }, { coord: [50, 200] }],
          [{ coord: [0, 100] }, { coord: [50, 200] }],
          [{ coord: [50, 200] }, { coord: [100, 100] }],
          [{ coord: [50, 200] }, { coord: [100, 300] }]
        ]
      }
    ]
  }

  mChart.setOption(options)
}
watch(
    () => props.data,
    () => {
      renderChart()
    }
)
</script>

<template>
  <div>
    <div>【关系数据传递图】</div>
    <div ref="target"  class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
~~~

### 词云图

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125029.png" />


在使用词云图的时候需要安装一个插件echarts-worldcloud

~~~js
pnpm i --save echarts-wordcloud@2.1.0
~~~

在WordClooud.vue代码实现

~~~js
<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts'
import 'echarts-wordcloud'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})
// 2.构建option配置对象
const randomRGB = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}
const renderChart = () => {
  const options = {
    // 定义一个词云图配置对象
    series: [
      {
        type: 'wordCloud', // 图表类型为词云图
        sizeRange: [12, 60], // 词云图中词语的大小范围
        rotationRange: [0, 0], // 词云图中词语的旋转角度范围
        gridSize: 0, // 词云图中词语之间的网格大小
        layoutAnimation: true, // 是否开启布局动画
        textStyle: {
          color: randomRGB // 词语的样式，颜色为随机RGB颜色
        },
        emphasis: {
          textStyle: {
            fontWeight: 'bold', // 强调时的字体样式，加粗
            color: '#000' // 强调时的颜色，黑色
          }
        },
        data: props.data.datas
      }]
  }

  // 3.通过实例.setOptions(option)
  mChart.setOption(options)
}

watch(
    () => props.data,
    () => {
      renderChart()
    }
)
</script>

<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>
~~~

### 数据展示图

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125822.png" />

这部分的数据在点开页面的时候会慢慢增长，实现这种效果需要安装另外一个组件countup.js

~~~js 
npm i --save countup.js@2.6.2
~~~

TotalData.vue中的代码

~~~js
<script setup>
import {CountUp} from 'countup.js'
import {onMounted, ref} from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const totalCountTarget = ref(null)
const city1 = ref(null)
const city2 = ref(null)
const city3 = ref(null)
const city4 = ref(null)
const city5 = ref(null)
const city6 = ref(null)

onMounted(() => {
  new CountUp(totalCountTarget.value, props.data.total).start()
  new CountUp(city1.value, props.data.hb).start()
  new CountUp(city2.value, props.data.db).start()
  new CountUp(city3.value, props.data.hd).start()
  new CountUp(city4.value, props.data.zn).start()
  new CountUp(city5.value, props.data.xn).start()
  new CountUp(city6.value, props.data.xb).start()
})
</script>

<template>
  <div class="p-6">
    <div class="text-slate-300 text-center">
      数据总量：
      <span
          ref="totalCountTarget"
          class="text-7xl ml-2 mr-2 font-bold font-[Electronic] text-gradient"
      >
				679,473,929
			</span>
      条记录
    </div>
    <div class="mt-3 flex flex-wrap">
      <div class="w-1/3 text-center text-slate-400 text-sm">
        华北：
        <span ref="city1" class="text-[#5DC5EF] text-3xl font-[Electronic]">
					8,778,988
				</span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        东北：<span
          ref="city2"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
      >8,778,988</span
      >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        华东：<span
          ref="city3"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
      >8,778,988</span
      >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        中南：<span
          ref="city4"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
      >8,778,988</span
      >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        西南：<span
          ref="city5"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
      >8,778,988</span
      >
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        西北：<span
          ref="city6"
          class="text-[#5DC5EF] text-3xl font-[Electronic]"
      >8,778,988</span
      >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
~~~

### 五年数据统计图

<img src="https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504271125638.png" />

在MapChart.vue中写入

~~~js
<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts'
import mapJson from "../assets/MapData/china.json";
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
// 1.初始Echarts实例对象
let mChart = null
const target = ref(null);
onMounted(() => {
  echarts.registerMap('china',mapJson)
  mChart =  echarts.init(target.value)
  renderChart()
} )
// 2.构建option配置对象
const renderChart = () => {
  // echarts 渲染
  echarts.registerMap('china', mapJson)

  let options = {
    // 时间线，提供了在多个 ECharts option 间进行切换
    timeline: {
      // 数据
      data: props.data.voltageLevel,
      // 类目轴
      axisType: 'category',
      // 自动切换
      autoPlay: true,
      // 间隔时间
      playInterval: 3000,
      // 位置
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      // 轴的文本标签
      label: {
        // 默认状态
        normal: {
          textStyle: {
            color: '#ddd'
          }
        },
        // 高亮状态
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      // 文字大小
      symbolSize: 10,
      // 线的样式
      lineStyle: {
        color: '#555'
      },
      // 选中点的样式
      checkpointStyle: {
        borderColor: '#888',
        borderWidth: 2
      },
      // 控件样式
      controlStyle: {
        // 上一步按钮
        showNextBtn: true,
        // 下一步按钮
        showPrevBtn: true,
        // 默认样式
        normal: {
          color: '#666',
          borderColor: '#666'
        },
        // 高亮样式
        emphasis: {
          color: '#aaa',
          borderColor: '#aaa'
        }
      }
    },
    // 柱形图右侧展示
    baseOption: {
      grid: {
        right: '2%',
        top: '15%',
        bottom: '10%',
        width: '20%'
      },

      // 中国地图
      geo: {
        // 展示
        show: true,
        // 中国地图
        map: 'china',
        // 开启缩放
        roam: true,
        // 初始缩放
        zoom: 0.8,
        // 中心点
        center: [113.83531246, 34.0267395887],
        // 默认状态的省份样式
        itemStyle: {
          normal: {
            // 边框色值
            borderColor: 'rgba(147, 235, 248, 1)',
            // 边框宽度
            borderWidth: 1,
            // 区域颜色
            areaColor: {
              // 经向色值
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                // 0% 处的颜色
                {
                  offset: 0,
                  color: 'rgba(147, 235, 248, 0)'
                },
                // 100% 处的颜色
                {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)'
                }
              ],
              // 缺省为 false
              globalCoord: false
            }
          },
          // 鼠标移入的色值
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        }
      }
    },
    // 绑定时间轴的多个图表
    options: []
  }

  // 为每一年度的图表添加数据
  props.data.voltageLevel.forEach((item, index) => {
    options.options.push({
      // 背景色
      backgroundColor: '#142037',
      title: [
        // 主标题，对应地图
        {
          text: '2019-2023 年度数据统计',
          left: '0%',
          top: '0',
          textStyle: {
            color: '#ccc',
            fontSize: 30
          }
        },
        // 副标题，对应柱形图
        {
          id: 'statistic',
          text: item + '年数据统计情况',
          right: '0%',
          top: '4%',
          textStyle: {
            color: '#ccc',
            fontSize: 20
          }
        }
      ],
      // X 轴配置
      xAxis: {
        // 数据轴
        type: 'value',
        // 脱离 0 值比例
        scale: true,
        // 位置
        position: 'top',
        // 不显示分割线
        splitLine: {
          show: false
        },
        // 不显示轴线
        axisLine: {
          show: false
        },
        // 不显示刻度尺
        axisTick: {
          show: false
        },
        // 类别文字
        axisLabel: {
          margin: 2,
          textStyle: {
            color: '#aaa'
          }
        }
      },
      // Y 轴
      yAxis: {
        // 选项轴
        type: 'category',
        // 轴线
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        // 轴刻度
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        // 轴标签
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#ddd'
          }
        },
        // 根据年份，获取对应数据
        data: props.data.categoryData[item].map((item) => item.name)
      },
      // 核心配置
      series: [
        // 柱形图
        {
          zlevel: 1.5,
          // 柱形图
          type: 'bar',
          // 每个柱子的色值
          itemStyle: {
            normal: {
              color: props.data.colors[index]
            }
          },
          // 根据年份，获取对应数据
          data: props.data.categoryData[item].map((item) => item.value)
        },
        // 散点图
        {
          // 散点（气泡）图
          type: 'effectScatter',
          // 使用地理坐标系
          coordinateSystem: 'geo',
          // 数据
          data: props.data.topData[item],
          // 标记大小
          symbolSize: function (val) {
            return val[2] / 4
          },
          // 绘制完成后显示特效
          showEffectOn: 'render',
          // 展示涟漪特效
          rippleEffect: {
            brushType: 'stroke'
          },
          // 文字
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          // 每一项的配置
          itemStyle: {
            normal: {
              color: props.data.colors[index],
              // 阴影配置
              shadowBlur: 5,
              shadowColor: props.data.colors[index]
            }
          },
          zlevel: 1
        }
      ]
    })
  })

  mChart.setOption(options)
}

</script>

<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped>

</style>

~~~

