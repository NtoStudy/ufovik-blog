---
title: JavaScript入门-判断数据类型
date: 2025-05-26
tags:
  - 前端
  - Js基础
---
JavaScript入门之判断数据类型
---
## 引言

JavaScript中有七种原始数据类型和几种引用数据类型，本文将清楚地介绍四种用于类型判断的方法，分别是`typeOf`、`instanceOf`、`Object.prototype.toString.call()`、`Array.isArray()`，并介绍其使用方法和判定原理。

## typeof

1.  可以准确判断除`null`之外的所有原始类型，`null`会被判定成object
2.  `function`类型可以被准确判断为`function`，而其他所有引用类型都会被判定为`object`

```js
let s = "123"; // string
let n = 123; // number
let f = true; // boolean
let u = undefined; // undefined
let nu = null; // null
let sy = Symbol(123); // Symbol
let big = 1234n; // BigInt

let obj = {};
let arr = [];
let fn = function () {};
let date = new Date();

console.log(typeof s); // string    typeof后面有无括号都行
console.log(typeof n); // number
console.log(typeof f); // boolean
console.log(typeof u); // undefined
console.log(typeof sy); // symbol
console.log(typeof big); // bigint

console.log(typeof nu); // object

console.log(typeof obj); // object
console.log(typeof arr); // object
console.log(typeof date); // object

console.log(typeof fn); // function
```

### 判定原理

typeof是通过将值转换为二进制之后，判断其前三位是否为0：都是0则为object，反之则为原始类型。因为原始类型转二进制，前三位一定不都是0；反之引用类型被转换成二进制前三位一定都是0。

`null`是原始类型却被判定为`object`就是因为它在机器中是用一长串0来表示的，可以把这看作是一个史诗级的bug。

所以用`typeof`判断接收到的值是否为一个对象时，还要注意排除null的情况：

```csharp
function isObject() {
    if(typeof(o) === 'object' && o !== null){
        return  true
    }
    return false
}
```

你丢一个值给`typeof`，它会告诉你这个字值是什么类型，但是它无法准确告诉你这是一个`Array`或是`Date`，若想要如此精确地知道一个对象类型，可以用`instanceof`告诉你是否为某种特定的类型

## instanceof

**只能精确地判断引用类型，不能判断原始类型**

```js
console.log(obj instanceof Object); // true
console.log(arr instanceof Array); // true
console.log(fn instanceof Function); // true
console.log(date instanceof Date); // true
console.log(s instanceof String); // false
console.log(n instanceof Number); // false
console.log(arr instanceof Object); // true
```

### 判定原理

`instanceof`既能把数组判定成`Array`，又能把数组判定成`Object`，究其原因是原型链的作用————顺着数组实例 arr 的隐式原型一直找到了 Object 的构造函数，看下面的代码：

```js
arr.__proto__ = Array.prototype;
Array.prototype.__proto__ = Object.prototype;
```

所以我们就知道了，`instanceof`能准确判断出一个对象是否为某种类型，就是**依靠对象的原型链来查找**的，一层又一层地判断直到找到`null`为止。

### 手写instanceOf

根据这个原理，我们可以手写出一个`instanceof`:

```js
function myinstanceof(L, R) {
  while (L != null) {
    if (L.__proto__ === R.prototype) {
      return true;
    }
    L = L.__proto__;
  }
  return false;
}

console.log(myinstanceof([], Array)); // true
console.log(myinstanceof({}, Object)); // true
```

> 对象的隐式原型 等于 构造函数的显式原型！可看文章 [给我三分钟，带你完全理解JS原型和原型链前言](https://juejin.cn/post/7400271712359661620#heading-3 "https://juejin.cn/post/7400271712359661620#heading-3")

## Object.prototype.toString.call()

可以判断任何数据类型

在浏览器上执行这三段代码，会得到`'[object Object]'`，`'[object Array]'`，`'[object Number]'`

```js
var a = {}
Object.prototype.toString.call(a)

var a = []
Object.prototype.toString.call(a)

var a = 123
Object.prototype.toString.call(a)
```

### 原型上的toString的内部逻辑

调用`Object.prototype.toString`的时候执行会以下步骤： [参考官方文档：带注释的 ES5](https://es5.github.io/#x15.2.4.2 "https://es5.github.io/#x15.2.4.2")

1.  如果此值是`undefined`类型，则返回 `‘[object Undefined]’`
2.  如果此值是`null`类型，则返回 `‘[object Null]’`
3.  将 O 作为 `ToObject(this)` 的执行结果。`toString`执行过程中会调用一个`ToObject`方法，执行一个类似包装类的过程，我们访问不了这个方法，是JS自己用的
4.  定义一个`class`作为内部属性`[[class]]`的值。toString可以读取到这个值并把这个值暴露出来让我们看得见
5.  返回由 `"[object"` 和 `class` 和 `"]"` 组成的字符串

### 为什么结合call就能准确判断值类型了呢？

① 首先我们要知道`Object.prototype.toString(xxx)`往括号中不管传递什么返回结果都是`'[object Object]'`，因为根据上面五个步骤来看，它内部会自动执行`ToObject()`方法，`xxx`会被执行一个类似包装类的过程然后转变成一个对象。所以单独一个`Object.prototype.toString(xxx)`不能用来判定值的类型

② 其次了解**call方法的核心原理**就是：比如`foo.call(obj)`，利用隐式绑定的规则，让obj对象拥有foo这个函数的引用，从而让foo函数的this指向obj，执行完foo函数内部逻辑后，再将foo函数的引用从obj上删除掉。手搓一个call的源码就是这样的：

```js
// call方法只允许被函数调用，所以它应该是放在Function构造函数的显式原型上的
Function.prototype.mycall = function (context) {
  // 判断调用我的那个哥们是不是函数体
  if (typeof this !== "function") {
    return new TypeError(this + "is not a function");
  }

  // this(函数)里面的this => context对象
  const fn = Symbol("key"); // 定义一个独一无二的fn，防止使用该源码时与其他fn产生冲突
  context[fn] = this; // 让对象拥有该函数  context={Symbol('key'): foo}
  context[fn](); // 触发隐式绑定
  delete context[fn];
};
```

③ 所以`Object.prototype.toString.call(xxx)`就相当于 `xxx.toString()`，把toString()方法放在了xxx对象上调用，这样就能精准给出xxx的对象类型

> toString方法有几个版本：
>
> 1.  `{}.toString()` 得到由"\[object" 和 class 和 "\]" 组成的字符串
> 2.  `[].toString()` 数组的toString方法重写了对象上的toString方法，返回由数组内部元素以逗号拼接的字符串
> 3.  `xx.toString()` 返回字符串字面量，比如
>
> ```javascript
> let fn = function () {};
> console.log(fn.toString()); //  "function () {}"
> ```

## Array.isArray(x)

只能判断是否是数组，若传进去的x是数组，返回true，否则返回false

## 总结

**typeOf**：原始类型除了null都能准确判断，引用类型除了function能准确判断其他都不能。依靠值转为二进制后前三位是否为0来判断

**instanceOf**：只能把引用类型丢给它准确判断。顺着对象的隐式原型链向上比对，与构造函数的显式原型相等返回true，否则false

**Object.prototype.toString.call()**:可以准确判断任何类型。要了解对象原型的toString()内部逻辑和call()的核心原理，二者结合才有精准判定的效果

**Array.isArray()**：是数组则返回true，不是则返回false。判定范围最狭窄
