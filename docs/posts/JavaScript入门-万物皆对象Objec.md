---
title: JavaScript入门万物皆对象Object
date: 2025-04-25
tags:
  - 前端
  - Js基础
---
JavaScript入门之Object
---

## 1、Object对象

[**Object**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object") 是 JavaScript 的一种 数据类型，它用于存储各种键值集合和更复杂的实体，是一组数据和功能的集合。JS中几乎所有对象都是继承自Object，Array、RegExp、Math、Map、Set都是他的子类型。

- **标准对象结构**：**`{ key(字符串/Symbol) : value(任意类型), ...}`**
- **创建方式：**`new Ojbect()`、字面量`{key:value,key2:value2}`、 `Object.create(obj)`。
  - 使用`new 构造器()`，实现可重用的对象创建，任何函数都可以用于构造器（箭头函数除外），一般约定首字母大写，没有`return`返回值。
- **使用方式**：`对象.属性=value`，`对象["属性名"]=value`，属性(Key)存在则赋值，不存在则创建并赋值。
- **删除属性**：`delete obj.prop`
- **检测属性**：`"key" in obj`，返回`bool`
- **遍历属性**：`for(let key in obj)` 循环所有key。

| **属性/方法**                                                | **描述**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **✅静态属性/方法**                                           |                                                              |
| Object.[**create**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create")(proto, propertiesObject) | 使用指定的**原型对象**和**属性**创建一个新对象               |
| Object.[**assign**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign")(target,...source) IE🚫 | 合并多个`source`对象到`target`并返回，复制一级属性的值，不能作为深拷贝 |
| Object.[**defineProperty**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty")(obj,prop,descriptor) | 给对象**添加属性**，通过descriptor配置属性信息。这是Vue2实现双向绑定的关键（通过get、set拦截数据的变化） |
| Object.[**entries**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries")(obj) IE🚫 | 返回给定对象可枚举属性的`[key, value]` 数组（二维数组）      |
| Object.**keys**(obj)                                         | 返回给定对象可枚举属性`key`组成的数组                        |
| Object.**values**(obj) IE🚫                                   | 返回给定对象可枚举属性值`value`组成的数组                    |
| Object.[**freeze**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze")(obj) | 冻结对象：其他代码不能删除或更改任何属性，相当于**只读**     |
| Object.**getOwnPropertyDescriptor**(o,p)                     | 返回对象指定自有**属性**的描述符，IE🚫，描述符就是属性的详细描述信息 |
| Object.**getOwnPropertyNames**(obj)                          | 返回对象所有自有属性名（包括不可枚举属性，不包括 Symbol 名称的属性）组成的数组 |
| Object.**getPrototypeOf**(obj)                               | 返回指定对象的原型对象，同`obj.__proto__`，（prototype /ˈprəʊtətaɪp/ 原型） |
| Object.**is**(v1,v2)                                         | 判断两个值是否为同一个值，支持值类型、引用类型               |
| Object.**isSealed**()                                        | 判断对象是否被密封，`Object.seal(obj)`密封一个对象，只可读、写现有属性值 |
| **✅构造函数**                                                |                                                              |
| **Object**()                                                 | 构造函数将给定的值包装为一个新对象                           |
| **✅实例属性/方法**（Object.prototype.）                      |                                                              |
| [**constructor**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor") | 指向 Object 构造函数                                         |
| [**proto**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto") | 指向实例化的原型对象，推荐`Object.getPrototypeOf()`          |
| **hasOwnProperty**(prop)                                     | 判断指定对象自身是否存在指定属性                             |
| **propertyIsEnumerable**(prop)                               | 判断属性是否可枚举，枚举属性可被`for...in`循环迭代           |
| **isPrototypeOf**(obj)                                       | 判断是否在另一个对象的原型链上                               |
| **toString**()                                               | 返回字符串，可以重写。`toLocaleString()`默认调用 `toString()` |
| valueOf()                                                    | 返回对象的原始值，`(new Object(3)).valueOf(); //3`           |

```js
const obj1 = {};
const obj2 = {
  name: "zhagnsan",
  age: "3",
  school: {
    //属性值也是对象
    name: "龙腾幼儿园",
    address: "那边",
  },
  sayHello: function (name) {
    //属性值是函数
    console.log("hello " + name);
  },
};
obj2.sayHello("sam");
obj2.birthday = "2022-12-12"; //赋值操作：属性(Key)存在则赋值，不存在则创建+赋值

//可以用null为原型创建一个干净的对象，不会从从Object.prototype继承任何属性方法
const nobj = Object.create(null, { name: { value: "sam", enumerable: true } });
nobj.age = 20;
nobj.toString = Object.prototype.toString; //赋予toString()方法

Object.getOwnPropertyNames(["a", "b"]); //[ "0", "1", "length" ]
Object.keys(["a", "b"]); //[ "0", "1" ]
Object.getPrototypeOf([]); //Array []

const obj = { name: "sam", sex: "male", say: function () {} };
obj.hasOwnProperty("name"); //true
obj.propertyIsEnumerable("name"); //true
obj.toString = function () {
  return JSON.stringify(this);
};
```

### 1.1、对象属性**Descriptor**

🔸通过 Object.[**getOwnPropertyDescriptor**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor")(obj,propertyName) 方法可以获取一个属性的完整自有属性信息，返回的是一个“**属性描述符**”**Descriptor**对象。**Descriptor**主要结构如下，Object.**create**(proto, propertiesObject)的第二个参数也是用的这个结构来描述属性。

```js
let descriptor = {
  enumerable: false, //是否支持枚举
  configurable: false, //如果为 true，则此属性可以被删除
  writable: false, //是否只读，true=可读可写
  value: "value", //属性的值
  get() {},
  set() {},
};
let pobj = {
  //Object.create(proto, propertiesObject)的第二个参数
  proName1: descriptor,
  proName2: descriptor,
};
```

🔸通过 Object.[**defineProperty**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty")(obj, propertyName, descriptor) 方法可添加/设置一个属性，属性描述符`descriptor`默认值都是`false`。JS的一些内置属性就是只读、不可删除的，如`Math.PI`。

```js
function User(name, age) {
  this.name = name;
  this.age = age ? age : 18;
  function sayHi() {
    console.log("Hi,I'm " + name);
  }
}
let u1 = new User("sam");
let pname = Object.getOwnPropertyDescriptor(u1, "name");
//设置name值不可更改
Object.defineProperty(u1, "name", { writable: true });
```

![image.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291341492.webp)

### 1.2、getter/setter属性访问器

对象中常用的属性都属于“数据属性”，只存放数据没有额外逻辑。而**访问器属性（accessor property）**，表现形式和普通属性一样，本质上就是一个取值、设置值的函数，可自定义逻辑，如数据合法性验证。

- **set**(value)：**设置**数据的`setter`方法，参数为属性值
- **get**()：**获取**数据的`getter`方法，无参数，返回属性值。

» 通过字面量定义和使用：

```js
let obj = {
  age: 18,
  set name(value) {
    let vs = String(value);
    if (!vs || vs.length < 4 || vs.length > 12) {
      throw Error("值必须是4到12的有效字符");
    }
    this._name = value;
  },
  get name() {
    this._name ??= "empty";
    return this._name;
  },
};
//使用
obj.name = "sam"; //Uncaught Error: 值必须是4到12的有效字符
obj.name = "sam2";
console.log(obj.name); //sam2
Object.getOwnPropertyDescriptor(obj, "name"); //{enumerable: true, configurable: true, get: ƒ, set: ƒ}
```

» 通过 Object.**defineProperty**(obj, propertyName, descriptor) 给属性添加访问器：

```js
function User(name, age) {
  this.age = age ? age : 18;
  function sayHi() {
    console.log("Hi,I'm " + name);
  }
  Object.defineProperty(this, "name", {
    set(value) {
      if (!value || value.length < 4 || value.length > 12) {
        throw Error("值必须是4到12的有效字符");
      }
      this._name = value;
    },
    get() {
      return this._name;
    },
  });
}
let user = new User("sambo");
//使用
user.name = "sam"; //Uncaught Error: 值必须是4到12的有效字符
Object.getOwnPropertyDescriptor(user, "name"); //{enumerable: false, configurable: false, get: ƒ, set: ƒ}
```

> **💥问题**：通过上面的示例代码可以看出，使用getter/setter 包装的“私有”属性`_name`还是会暴露出去。

---

## 2、JSON数据

[**JOSN**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON")（JavaScript Object Notation _/nəʊˈteɪʃn/_）是一种描述对象数据的语法，是一种通用的键值数据格式，很多语言都支持，用来**存储**、**传输**数据。和Object定义相似，不同的是：

- **属性名**须双引号包起来的**字符串**。
- **属性值**仅允许字符串，数字，数组，true，false，null或其他（JSON）对象，**不支持函数**。

![image.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291341996.webp)

- **JSON.**[**stringify**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify")**(obj)**：对象转换（序列化）为字符串。
- **JSON.**[**parse**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse")**(jsonstr)**：字符串反序列化为Json对象。

```js
let user = {
  age: 18,
  set name(value) {
    if (!value || value.length < 4 || value.length > 12) {
      throw Error("值必须是4到12的有效字符");
    }
    this._name = value;
  },
  get name() {
    this._name ??= "empty";
    return this._name;
  },
  sayHi: function () {
    console.log("sayHi");
  },
};
// JSON序列化与反序列化
let userStr = JSON.stringify(user); //'{"age":18,"name":"empty","_name":"empty"}'
let user2 = JSON.parse(userStr);
user2.name = "sam"; //反序列化后的新对象，没有了get、set访问器方法了，只有数据
user2.sayHi(); //Uncaught TypeError: user2.sayHi is not a function

// 通过AJAX请求json数据，更新页面
const jurl =
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
let request = new XMLHttpRequest();
request.responseType = "json";
request.open("GET", jurl);
request.onload = function () {
  let jobj = request.response;
  console.log(jobj);
  let h1 = document.createElement("h1");
  h1.textContent = jobj.squadName;
  document.body.appendChild(h1);
};
request.send();
```

---

## 3、Array数组

[**Array**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array") 数组是按序号排列的一组数据，索引从0开始，数组没有大小限制（不管是否设置了数组大小），长度可变，数据类型可以任意。总之就是相当自由，没什么原则，随便你搞，也不会报越界的错误。

- 通过`array[索引下标]`访问、设置数组元素。
- 通过`length`属性获取长度。
- 可附加属性（Array属于对象），使用“非正整数”作为索引时，会附加属性，不影其数组`length`大小。

```js
var arr1 = [1, 2, 3, 4];
var arr2 = new Array(1, 2, 3, 4); //new并指定数据
var arr3 = new Array(3); //指定数组长度，别相信它，它是会变心的。
console.log(arr3.length); //3
console.log(arr3[6]); //可以越界访问，返回undefined
arr3[6] = "666";
console.log(arr3.length); //长度为7了
arr3.length = 10; //设置下长度

arr3["name"] = "sam"; //附加了属性name
console.log(arr3.name); //sam
arr3["12"] = "sam123"; //等同于arr3[12]
```

**🔸数组遍历**：

- **索引下标**：遍历索引下标进行访问。`for (let i = 0; i < arr3.length; i++) { arr3[i] }`
- **`for...in`** 遍历数组里面的所有下标（键），包括数字索引、附加属性`Key`。
- **`for...each`** 循环遍历集合的数值、索引下标，只有正常数组的部分。

## 🔸数组方法/属性

| [**Array**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array") **属性/方法** | **描述**                                                     | **备注**                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------- |
| **✅静态属性/方法**                                           |                                                              |                                       |
| Array.[**from**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from")() IE🚫 | 创建一个新的、浅拷贝的数组实例：Array.from(arrayLike,mapFn?) | `Array.from("123") //['1', '2', '3']` |
| Array.**isArray**(arr)                                       | 判断是否Array，和`instanceof Array`差不多                    | `Array.isArray([]); //true`           |
| Array.**of**() IE🚫                                           | 根据可变参数创建数组：Array.of(v0,v1,...vN)                  | `Array.of(1,2,3) //[1, 2, 3]`         |
| **✅构造函数**                                                |                                                              |                                       |
| **Array**()                                                  | 创建一个新的 Array 对象：new Array(v0,v1,...vN) 、new Array(len) | `new Array(1, 2, 3, 4)`               |
| **✅实例属性/方法**                                           | （Object.prototype.）                                        |                                       |
| **length**                                                   | 元素个数                                                     |                                       |
| **indexOf**(v)                                               | indexOf(value,start?)：查找值的索引位置，➡️从前往后，start默认0。 | `arr.indexOf(2);`                     |
| **lastIndexOf**(v)                                           | lastIndexOf(value,start?)：查找值的索引位置，⬅️**从后往前**   |                                       |
| [**find**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find")(func) IE🚫 | 查找符合条件的元素值，`findIndex(func)`返回索引              | 同类：findLast()、findLastIndex()     |
| **includes**(v) IE🚫                                          | 判断是否包含指定的值，返回bool                               | `arr.includes(2); //true`             |
| **push(v)、pop()**                                           | `push`末尾追加元素(n个)并返回长度，`pop`末尾移除(1个)并返回其值 | `arr.push('a','b');`                  |
| **unshift**(v)、**shift()**                                  | `unshift`在**头部**插入元素(n个)并返回长度，`shift`头部移除(1个)并返回，同上 | shift /ʃɪft/ 转移， 改变              |
| **copyWithin**(i) IE🚫                                        | 浅复制数组中的内容，数组内部的复制、粘贴                     | `copyWithin(target, start, end)`      |
| **fill**(v,s,e) IE🚫                                          | 填充指定的值，`arr.fill(value, start, end)`，不含end         | `arr.fill(0,1,3) //[1, 0, 0]`         |
| **keys**()/**values**()                                      | 数组索引、值的迭代器，及`entries()`                          |                                       |
| [**sort**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort")**()** | **字符排序**，注意默认是按字符串（码值）比较排序，可传入排序函数 | `arr1.sort(function(a,b))`            |
| **reverse**()                                                | 反转数组项的顺序                                             |                                       |
| **concat**(arr)                                              | 合并多个数组、元素，返回**新的**数组，原数据不变。           | `arr1.concat(7,["a","b"])`            |
| [**slice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice")(start,end?) | **截取数组**并返回，指定起止位置，**不含end**，无end则到末尾，**原数据不变** | `arr1.slice(2)`( slice /slaɪs/ 切片)  |
| [**splice**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice")() | **删除、插入和替换**：arr.**splice**(start, deleteCount,...items)`items`为待插入数据 | /splaɪs/移接                          |
| [**forEach**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach")(func) | 数组遍历，`forEach(function(element, index, array)`          |                                       |
|                                                              |                                                              |                                       |
| **map**(func)                                                | **数组遍历**执行函数，返回每次函数结果组成的数组             | `arr.map(function(v,index))`          |
| [**filter**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter")(func) | **遍历查询**，执行查询函数，返回满足过滤条件组成的数组。     | `arr.filter(function(v,index))`       |
| [**every**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every")(func) | **遍历是否都满足条件**，只有所有项都满足条件，才会返回true   | `arr.every((x,i)=>{return x>3;})`     |
| [**some**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some")(func) | **遍历是否都存在满足条件**，只要有一项满足条件，就会返回true。 | `arr.some((x,i,arr)=>x>3)`            |
| **join()**                                                   | 把数组转换成字符串，参数为连接符，默认`,`                    | `arr.join('-') //'1-2-3-4-5'`         |
| **toString()**                                               | 转换为字符串，逗号`,`连接                                    |                                       |
| [**reduce**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce")(func) | **递归+循环执行函数**：每个元素执行回调，结果作为下一次回调的参数 | `arr.reduce((p, v) => v + p)` //求和  |

```js
var arr1 = ["a", "b", "c", "d"];
console.log(arr1.pop()); //d
console.log(arr1.push("d", "e")); //5

arr1 = [13, 24, 51, 3, "6"];
console.log(arr1.sort()); // [13, 24, 3, 51, '6']
function sortN(a, b) {
  return a - b; // >0则a更大排到b后面
}
console.log(arr1.sort(sortN)); // [3, '6', 13, 24, 51]

var newarr = arr1.concat("7", ["a", "b"]); //newarr=[3, '6', 13, 24, 51, '7', 'a', 'b']

//splice
var arr = [1, 2, 3, 4];
console.log(arr.splice(0, 1)); //[1]
```

---

## 4、Date日期

[**Date**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date")：日期时间对象，创建、获取日期，日期是一个包含年月日时分秒、及相关时间方法的数据对象。Date 时间基于 Unix Time Stamp，即自 1970 年 1 月 1 日（UTC）起经过的毫秒数。

| **属性/方法**          | **描述**                                        | **备注**                                  |
| ---------------------- | ----------------------------------------------- | ----------------------------------------- |
| **✅静态属性/方法**     |                                                 |                                           |
| Date.**now**()         | 获取当期时间的时间戳                            | `Date.now(); //1660059491585`             |
| Date.**parse**(str)    | 解析日期字符串，并返回时间戳                    | `Date.parse('2021-12-1') //1638288000000` |
| Date.**UTC**(year,...) | 获取指定年月日时分秒的时间戳，参数同构造函数    |                                           |
| **✅构造函数**          |                                                 |                                           |
| **Date**()             | 创建Date对象的唯一方式，不加`new`返回的是字符串 |                                           |

\- 无参数，当期日期  
\- 年月日时分秒、毫秒，**注意**monthIndex从**0**开始  
\- Unix 时间戳、字符串  
 | `new Date()；//当前日期`  
`new Date(2022,10,11,10,1,1)`  
`Date(); //当期时间的字符串` |
| **✅实例属性/方法** | （Object.prototype.） | |
| **getDate**() | **获取日**，还有获取年、月、日、星期、时、分、秒 | `d.getDate() //11` |
| **setDate**(date) | **设置日**，还有设置年、月、日、时、分、秒 | `d.setDate(12)` |
| **getTime**() | 获取时间戳 | `d.getTime() //1668132061000` |
| toLocaleString() | 返回日期时间的本地格式化字符串 | `"2022/11/11 10:01:01"` |
| toString() | 返回字符串 | `"Fri Nov 11 2022 10:01:01 GMT+0800 (中国标准时间)"` |
| toLocaleDateString() | 返回日期的本地格式化字符串 | `"2022/8/10"` |
| toLocaleTimeString() | 返回时间的本地格式化字符串 | `"10:07:05"` |
| toJSON() | 转字符串，JSON序列化使用 | `"2022-08-10T02:14:39.138Z"` |
| valueOf() | 原始值（时间戳） | `1660097530418` |

```js
const today = new Date();
const birthday = new Date("1995-02-07T03:24:00");
const birthday2 = new Date(1995, 11, 17, 3, 24, 0);
//计算年龄
const v1 = today - birthday; //867998585554 日期相减得到的是时间间隔的毫秒数
const age = Math.floor(v1 / (365 * 24 * 60 * 60 * 1000)); //27岁
```

---

## 5、Math数学公式

[**Math**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math") 是一个内置对象，拥有一些数学常数属性和数学函数方法。

| **静态属性/方法**      | **描述**                             | **示例**                             |
| ---------------------- | ------------------------------------ | ------------------------------------ |
| Math.PI                | 圆周率                               | `3.141592653589793`                  |
| Math.**random**()      | 随机数，0到1的小数（不含1）          | `Math.random() //0.4710000565662491` |
| Math.**ceil**(1.23)    | 向上取整                             | `Math.ceil(1.23); //2`               |
| Math.**floor**(1.23)   | 向下取整                             | `Math.floor(1.23); //1`              |
| Math.**abs**(x)        | 绝对值                               | `Math.abs(-1); //1`                  |
| Math.**max**(x1,...xn) | 求最大值，对应的`Math.min()`求最小值 |                                      |
|                        |                                      |                                      |
| Math.**round**(x)      | 取四舍五入的整数                     | `Math.round(1.55) //2`               |
| Math.**pow**(x, y)     | 计算x的y次方                         |                                      |
| Math.**sqrt**(x)       | 计算平方根                           |                                      |

> **❗Math精度**：很多 Math 函数都有一个精度，而且这个精度在不同实现中也是不相同的。这意味着不同的浏览器会给出不同的结果，甚至，在不同的系统或架构下，相同的 JS 引擎也会给出不同的结果！

---

## 6、Map/Set带键集合

由**唯一、不可重复**`Key`值标记的键值`[key, value]`集合容器**Map**（IE11）**，**以及由**唯一、不可重复**`value`值`[value]`集合**Set**（IE11）。

> **📢键唯一判断**：[零值相等算法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness")，基于===比较，NaN与自身相对，-0、+0相等

| **类型/属性/方法**                                           | **描述**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **✅**[**Map**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map"){\[key, value\]} | **键值对**，顺序插入，支持任何类型作为建、值                 |
| **Map**(...\[iterable\])                                     | **构造函数**，创建 Map 对象，支持二维数组、可迭代对象，包括其他map（合并map） |
| **size**                                                     | 数量                                                         |
| **get**(key)                                                 | 获取键**值**                                                 |
| **set**(key,value)                                           | 添加/设置键值对                                              |
| **delete**(key)                                              | 删除键值对                                                   |
| **has**(key)                                                 | 判断key是否存在                                              |
| **clear**()                                                  | 清空                                                         |
| **keys**()/**values**()                                      | 获取键、值的迭代集合                                         |
| **entries**()                                                | 获取键值\[key, value\]迭代对象：`map.entries().next().value //['sex', 'male']` |
| **forEach**(func)                                            | 执行循环迭代：`forEach(function(value, key, map)`            |
| **✅**[**WeakMap**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap"){\[key, value\]} | **弱引用Map**，键必须是对象，而值可以是任意的。(Weak /wiːk/ 弱)。**键**（引用对象）被弱保持，没有被其他地方引用，会被GC回收。**Key不可枚举** |
| WeakMap()                                                    | **构造函数**，用法类似Map，没有迭代相关方法，无size、clear() |
| **✅**[**Set**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set"){key} | 不重复**值**的集合                                           |
| **Set**(...\[iterable\])                                     | **构造函数**，创建Set对象                                    |
| **add**(obj)                                                 | 添加值，其他属性方法类似Map                                  |
| **✅**[WeakSet](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet"){key} | **弱引用Set**，值必须是对象，如果没有被引用会被GC回收，**不可枚举** |

**Object与Map、Set的区别**：

|              | **Object**                                           | **Map**                    | **Set**           |
| ------------ | ---------------------------------------------------- | -------------------------- | ----------------- |
| **数据结构** | `{name:value,...}`                                   | `{key => value, ...}`      | `{key1, ...keyN}` |
| **默认键值** | 有一个原型                                           | 无-空无一物                | 无-空无一物       |
| **键**       | 字符串string或symbol                                 | 任意类型，有序（插入顺序） | 无                |
| **Size**     | 无， 自己计算                                        | size                       | size              |
| **迭代**     | 无迭代协议，不支持`for(of)`，可以用`for(in)`枚举属性 | 可迭代`for(of)`            | 可迭代`for(of)`   |
| **性能**     | 一般                                                 | 键值操作，性能良好         |                   |
| **序列化**   | 支持JSON的序列化方法                                 | 不支持                     | 不支持            |

```js
let map = new Map([
  [1, "N1"],
  ["age", 20],
]);
map.set(2, "N2"); //{1 => 'N1', 'age' => 20, 2 => 'N2'}

map.forEach((value, key) => {
  //注意是value在前面
  console.log(key + ":" + value); //1:N1 age:20 2:N2
});
console.log(JSON.stringify(map)); //{} 什么都没有

let set = new Set([1, 2, 3, "a"]);
console.log(set); //{1, 2, 3, 'a'}
set.forEach((value) => {
  console.log(value); //1, 2, 3, a
});
```

