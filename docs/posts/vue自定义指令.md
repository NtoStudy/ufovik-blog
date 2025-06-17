---
title: 自定义指令
date: 2025-06-16
tags:
  - 前端面经
---
前端面试题之自定义指令
---
## 前言

我们需要明白为什么需要自定义一个指令，其实就是想更加简洁地重复使用操作DOM的逻辑，这就和组件化和组合式函数差不多。

不管是Vue内置的指令还是自定义的指令，都有类似于组件的生命周期，我们可以在不同的生命周期完成不同的逻辑操作，并绑定到组件元素上，这样就产生了自定义指令。在Vue3中，我们有三种方式可以定义指令：

1.  如果是在`<script setup>`定义组件内的指令，有一个语法糖可以使用：任何以`v`开头的驼峰式命名的变量都可以被用作一个自定义指令，然后在模板中使用。举一个简单的例子：在输入框渲染后自动聚焦

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

    运行效果：

![image-20220608171805506.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202506161405733.webp)

2.  如果是使用选项式，则自定义指令需要在`directives`选项中注册。同上一个例子：

    ```vue
    <script>
    export default{
      setup(){},
      directives: {
        // 指令名
        focus: {
          // 生命周期
          mounted(el) {
            // 处理DOM的逻辑
            el.focus();
          },
        }
      }
    }
    </script>
    <template>
      <input v-focus />
    </template>
    ```

    实现的效果也是和上一个例子一样。

3.  除了注册组件内指令，我们还可以自定义全局指令，这样在所有的组件中都可以使用该指令

    ```js
    // main.js
    import { createApp } from "vue";
    import App from "./App.vue";
    
    const app = createApp(App);
    app.directive("focus", {
      mounted(el) {
        el.focus();
      },
    });
    app.mount("#app");
    ```

    实现效果也是一样的。

这三种方式我们选择最后一种，其他两种方式可以按照类似的方式实现。

## 生命周期

指令的生命周期和组件的生命周期类似：

```js
app.directive("focus", {
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("unmounted");
  },
});
```

运行结果：

![image-20220609155136201.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202506161406588.webp)

注意指令没有`beforeCreated`钩子。

- created：在绑定元素的属性前，或者事件监听器应用前调用
- beforeMount：在元素被插入到DOM前调用，例如我们想要实现输入框的自动聚焦，就不能在beforeMount钩子中实现
- mounted：在绑定元素的父组件以及自己的所有子节点都挂载完毕后调用，这个时候DOM已经渲染出来，我们实现输入框自动聚焦也是在这个钩子函数中实现
- beforeUpdate：绑定元素的父组件更新前调用
- updated：在绑定元素的父组件以及自己的所有子节点都更新完毕后调用
- beforeUnmount：绑定元素的父组件卸载前调用
- unmounted：绑定元素的父组件卸载后调用

每个钩子函数都有对应的参数，接下来继续看钩子参数。

## 钩子的参数

指令是为了能重用对DOM的操作逻辑，因此指令参数可以有1-4个参数，其中必需的参数就是当前绑定的DOM元素。

语法：

> created(el, binding, vnode, preVnode) {}

参数比较多，我们一个一个来学习。

- `el`：指令绑定到的DOM元素，可以用于直接操作当前元素，默认传入钩子的就是el参数，例如我们开始实现的`focus`指令，就是直接操作的元素DOM
- `binding`：这是一个对象，包含以下属性：

  - `value`：在元素上使用指令时，传递给指令的值。例如：`<div v-reverse="'hello'"></div>`，传递给`reserve`指令的值就是`hello`，我们可以拿到值并做相关处理
  - `oldValue`：之前的值，一般用于`beforeUpate`和`updated`钩子函数中，例如：`beforeUpdate(el, {oldValue: ''})`
  - `arg`：传递给指令的参数，非必需，例如`<div v-reverse:foo="'hello'"></div>`，那么传递给指令的参数就是`foo`
  - `modifiers`：一个由修饰符构成的对象，例如`<div v-reverse.foo.bar="'hello'"></div>`，那么该修饰符对象为`{foo: true, bar: true}`，我们经常使用到的事件修饰符，其实和这个差不多。
  - `instance`：使用该指令的组件实例，注意不是DOM
  - `dir`：指令的定义对象

- `vnode`：绑定元素的地城VNode
- `preVnode`：之前的渲染中代表指令所绑定的元素的VNode，一般用于`beforeUpate`和`updated`钩子函数中

可能看这些参数会一时迷糊，我们来看一个例子：

定义一个可翻转输入框输入的指令，注意钩子函数要选择`beforeUpdate`

```js
app.directive("reserve", {
  beforeUpdate(el, binding) {
    console.log(binding);
    el.innerText = binding.value
      ? binding.value.split("").reverse().join("")
      : "";
  },
});
```

在模板中使用：输入框输入值，`div`会显示反转后的值

```vue
<script setup>
import {ref} from 'vue'
let hello = ref('')
</script>
<template>
  <input v-focus v-model="hello" />
  <div v-reserve:foo.bar="hello"></div>
</template>
```

运行结果：

![image-20220609165007188.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202506161406406.webp)

![image-20220609165736539.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202506161407619.webp)

结合该图，是不是就更能理解钩子参数的含义了。

### 简化形式

我们在写指令的时候，可以具体指定在哪些钩子中执行一些逻辑。有时候指令的钩子不止一个，但是又是重复的逻辑操作时，重复写一遍代码显然有点不够优雅。在Vue中，如果我们在自定义指令时，需要在`mounted`和`updated`中实现相同的行为，并且不关心其他钩子的情况，那么我们开可以采用简写：

```js
app.directive("color", (el, binding) => {
  // 这将会在mounted和updated时调用
  el.style.color = binding.value;
});
```

### 对象字面量

我们之前的例子中，传递给指令的值只有一个，如果我们想给指令传入多个值应该怎么操作呢？很简单，传入一个字面量对象即可，可以直接在模板中声明，也可以使用响应式对象，在使用时`binding.value`就是一个对象了，而不是一个普通的值。

```vue
<script setup>
import {ref, reactive} from 'vue'
let hello = ref('')
const obj = reactive({
  hello: '',
  world: ''
})
</script>
<template>
  <input v-focus v-model="obj.hello" />
  <div v-reserve:foo.bar="obj"></div>
  <!-- <div v-reserve:foo.bar="{hello: obj.hello, world: obj.world}"></div> -->
</template>
```

对应的，我们的指令也要小小的修改一下：

```vue
el.innerText = binding.value
  ? binding.value.hello.split("").reverse().join("")
  : "";
```

实现的效果还是和上面的保持一致。

### 在组件上使用指令

在元素上直接使用指令，我们可以在指令中操作DOM，这个已经没有问题了。那如果在组件上使用指令会怎样呢？组件其实就是把一些DOM元素封装起来，Vue3和Vue2不同，Vue3的模板中可以不止一个根节点。

我们新建一个`Reverse.vue`，以便后续作为组件引入。

`Vue2`：模板中只能有一个根节点，因此会报错

```vue
// Reverse.vue
<template>
  <div></div>
  <div></div>
</template>
```

`Vue3`：模板中可以不止一个根节点，正常

```vue
// Reverse.vue
<template>
  <div></div>
  <div></div>
</template>
```

既然指令是为了操作DOM元素，如果只有单个根节点那不会有问题，例如：

```vue
<script setup>
import ReverseVue from './Reserve.vue'
</script>
<template>
  <ReverseVue v-reserve="obj"/>
</template>
```

```vue
// Reverse.vue
<template>
    <!-- v-reserve 指令会被应用在此处 -->
    <div></div>
</template>
```

如果模板中是多个根节点，就会抛出警告，并且不执行指令

```vue
// Reverse.vue
<template>
    <!-- v-reserve 不会作用，并且会抛出警告 -->
    <div></div>
    <div></div>
</template>
```

结论：尽量不要在组件上使用自定义指令，除非能确定只会有一个根节点

## 几个实用的自定义指令

以下举例的指令都是全局指令

### 自动聚焦`v-focus`

聚焦比较特殊，兄弟元素间只会有一个聚焦，即将该指令作用于两个兄弟输入框上，只会自动聚焦一个

```vue
app.directive("focus", (el) => {
  el.focus();
});
```

### 防抖`v-debounce`

在实际项目开发中，经常会听到服务端的同事抱怨：前端怎么不做限流呀。前端做”限流“一般会采用防抖和节流，我们先来看如何实现防抖。

步骤：

- 首先我们得知道怎么写一个防抖函数
- 然后需要将防抖函数与el节点绑定，为了通用的话，还需要考虑传入事件类型
- 最后是卸载定时器等操作

```vue
app.directive("debounce", {
  mounted(el, binding) {
    // 至少需要回调函数以及监听事件类型
    if (typeof binding.value.fn !== "function" || !binding.value.event) return;
    let delay = 200; // 默认延迟时间
    el.timer = null;
    el.handler = function () {
      if (el.timer) {
        clearTimeout(el.timer);
        el.timer = null;
      }
      el.timer = setTimeout(() => {
        binding.value.fn.apply(this, arguments);
        el.timer = null;
      }, binding.value.delay || delay);
    };
    el.addEventListener(binding.value.event, el.handler);
  },
  // 元素卸载前也记得清理定时器并且移除监听事件
  beforeUnmount(el, binding) {
    if (el.timer) {
      clearTimeout(el.timer);
      el.timer = null;
    }
    el.removeEventListener(binding.value.event, el.handler);
  },
});
```

在模板中使用：

```vue
<script setup>
const handleClick = () => {
  console.log('防抖点击');
}
</script>
<template>
  <button v-debounce="{fn: handleClick, event: 'click', delay: 200}">点击试试</button>
</template>
```

运行结果：

快速点击按钮并不会立即触发`handleClick`，而是会在指定的延迟时间后才会触发。

### 节流`v-throttle`

节流和防抖类似，都是用于前端”限流“。不同的是，防抖是限制执行次数，多次密集的触发只会执行最后一次，无规律，更关注结果；节流是限制执行频率，有节奏的执行，有规律， 更关注过程。

节流的实现和防抖差不多：

```vue
app.directive("throttle", {
  mounted(el, binding) {
    // 至少需要回调函数以及监听事件类型
    if (typeof binding.value.fn !== "function" || !binding.value.event) return;
    let delay = 200;
    el.timer = null;
    el.handler = function () {
      if (el.timer) return;
      el.timer = setTimeout(() => {
        binding.value.fn.apply(this, arguments);
        el.timer = null;
      }, binding.value.delay || delay);
    };
    el.addEventListener(binding.value.event, el.handler);
  },
  // 元素卸载前也记得清理定时器并且移除监听事件
  beforeUnmount(el, binding) {
    if (el.timer) {
      clearTimeout(el.timer);
      el.timer = null;
    }
    el.removeEventListener(binding.value.event, el.handler);
  },
});
```

在模板中使用：

```vue
<script setup>
import {reactive} from 'vue'
const obj = reactive({
  hello: '',
  world: ''
})
const handleInput = () => {
  console.log('节流输入框的值：', obj.hello);
}
</script>
<template>
  <input v-throttle="{fn: handleInput, event: 'input', delay: 1000}" v-model="obj.hello" />
</template>
```

运行结果：

`handleInput`并不会因为我在输入框输入时的快慢而触发，而是在固定的时间间隔内触发一次，这就是节流。

### 弹窗隐藏`v-hide`

在实际开发时会有这样的需求：点击某一个按钮出现一个弹窗，然后点弹窗的其他区域时需要关闭弹窗，如果是点击的弹窗本身，除非是关闭操作，否则不关闭弹窗。

想要实现这种效果，大多数人都会想到全局监听`click`事件，并且判断点击的目标元素和我们的弹窗元素是不是同一个，如果不是那就隐藏弹窗。那么我们就来看看具体应该怎么实现：

```vue
app.directive("hide", {
  mounted(el, binding) {
    el.handler = function (e) {
      // 如果点击范围在绑定的元素范围内，那么将不执行指令操作，而是执行原点击事件
      if (el.contains(e.target)) return;
      if (typeof binding.value.fn === "function") {
        // 绑定给指令的如果是一个函数，那么将回调并指定this
        binding.value.fn.apply(this, arguments); // 并不推荐使用style的方式来隐藏元素，这样的话控制弹窗的变量就无法改变，所以推荐使用回调函数
        // el.style.display = 'none';
        // 解除事件绑定
        document.removeEventListener("click", el.handler);
      }
    }; // 监听全局的点击事件
    document.addEventListener("click", el.handler); // 如果同步绑定全局事件不生效，可以采用异步的方式
    // setTimeout(() => {
    //   document.addEventListener('click', el.handler)
    // }, 0);
  },
  // 解除事件绑定
  beforeUnmount(el) {
    document.removeEventListener("click", el.handler);
  },
});
```

在模板中使用：

```vue
<script setup>
import {ref} from 'vue'
let isShowModal = ref(false)
const showModal = () => {
  isShowModal.value = true;
}
const cancleModal = () => {
  console.log('cancleModal');
  isShowModal.value = false;
}
</script>
<template>
  <button @click.stop="showModal">点击显示弹窗</button>
  <div class="modal" v-hide="{fn: cancleModal}" v-if="isShowModal">
    <p>我是弹窗</p>
    <button @click.stop="cancleModal">关闭</button>
  </div>
</template>
```

运行结果：

![image-20220610115505154.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202506161406063.webp)

## 总结

本文尽量采用通俗易懂的方式，完整的梳理了如何在Vue3中自定义指令。合理的使用指令，可以更快的帮助我们解决问题，值得注意的是：

- 选择指令的钩子函数时需要明确，不同的钩子函数呈现的效果是不一样的
- 应该及时卸载钩子函数定义的全局变量、定时器、事件绑定等，**避免影响其他组件使用，以及内存泄漏**
- 如果是涉及DOM操作的，我们第一时间应该想到是不是可以抽离成指令的方式
