---
title: JavaScript入门-原型与继承
date: 2025-04-26
tags:
  - 前端
  - Js基础
---
JavaScript入门之原型与继承
---

## 1、Object原型&继承

JavaScript 中的所有对象本质上都是通过`new ()`创建出来的，包括字面量的`{obj}`，也是`new Object()`的语法糖。每一个实例对象都有自己的原型，基于原型创建这个对象，`Function`本身也是一个对象。

❓那创建对象的原型到底是什么呢？

### 1.1、obj.\[\[Prototype\]\]原型

JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板，从原型**继承**方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推，这种关系常被称为**原型链 (prototype chain)**。

**🔵 **obj.**\[\[Prototype\]\] 原型**：每个对象都有这个隐藏（不可访问）属性，他就是指向该对象的**原型对象**的**引用**，也可以说是该对象的父级。

![image.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291558652.webp)

- obj.\***\*proto\*\***（前后双下划线）：设置、获取对象的原型。`__proto__` 是 `[[Prototype]]` 的 `getter/setter` **访问器属性**，是历史遗留下来的访问方式，不过还挺好用。

```js
let bird = {
  name: "bird",
  sayHi() {
    console.log(this.name + " hi!");
  },
};
let duck = {
  __proto__: bird, //设置原型__proto__
};
duck.__proto__ = bird; //效果同上，设置原型__proto__

console.log(bird.name, duck.name); //bird bird
bird.name = "bird2";
console.log(bird.name, duck.name); //bird2 bird2 //共享原型（父）的属性

//父新增一个方法
bird.fly = function () {
  console.log(this.name + " fly!");
};
duck.name = "duck";
duck.fly(); //duck fly!  //新鲜出炉的方法也被继承了
```

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291558142.webp)

- Object.**getPrototypeOf**(obj)、Object.**setPrototypeOf**(obj,proto)，是新加入的替代 `__proto__`，用于获取、设置对象原型的方法。

```js
const arr = [1, 2];
const t1 = Object.getPrototypeOf(arr); //Array []
const t2 = Object.getPrototypeOf(t1); //Object { … }
const t3 = Object.getPrototypeOf(t2); //null
console.log(t1, t2, t3); //Array []  Object { … }  null
//获取对象的原型链
function getPrototype(obj, arr = []) {
  if (obj === null) {
    return arr;
  }
  const t = Object.getPrototypeOf(obj);
  arr.push(t);
  return getPrototype(t, arr);
}
console.log(getPrototype(1)); //Number  Object { … } null
console.log(getPrototype(true)); //Boolean Object { … } null
console.log(getPrototype("a")); //String  Object { … } null
```

上面示例代码可以看到，所有对象都继承自`Object`，`Object`又继承自`null`。

![image](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291558641.webp)

> **❗不要轻易更改原型，影响性能**。当使用 **`Object.setPrototypeOf`** 或 **`obj.__proto__`** “即时”更改原型是一个非常缓慢的操作，因为它破坏了对象属性访问操作的内部优化。

### 1.2、F.prototype继承

**F.prototype** 指的是构造函数 **`F`** 的一个名为 "prototype" 的常规属性，指向一个**原型对象**——默认只有`constructor`（构造器）属性的对象，构造器`constructor` 指向函数自身 **`F`**。

用构造函数 **`F()`** 创建新的对象时，**①** 构造函数里的属性、方法每次都会重新创建并赋值给`this`，**②** 然后新对象会继承`F.prototype`，获得他的属性、方法财产。`F.prototype`可以被重写，可以修改（增、删除属性方法）。

> **📢构造函数**：就是一个函数，不过是为了创建对象用的。必须是`function`声明创建的函数：`function FuncName(){ }`
>
> - 所有属性、方法都赋值给`this`，没有`return`语句。
> - 约定大驼峰命名，用来区分普通函数。
> - 使用`new F()` 来创建对象。这里new关键字的步骤：**①** 创建一个空对象；**②** 赋值`this`；**③** 执行构造函数中的代码，给`this`添加属性方法；**④** 返回新对象。

```js
function Duck(name) {
  this.name = name;
  this.cry = function () {
    console.log(this.name + " cry！");
  };
}
Duck.prototype.place = "china"; //原型上添加的属性会被继承（共享）
let duck = new Duck("duck"); //1、执行构造函数，初始化this属性、方法；2、this原型=Duck.prototype，完成继承仪式
console.log(Duck.prototype.constructor == Duck); //true
console.log(duck.__proto__ == Duck.prototype); //true
console.log(duck.constructor == Duck); //true
console.log(duck.__proto__.constructor == Duck); //true
```

![](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291558348.webp)

**🔸**obj.**constructor**：对象构造器，就是构造函数

> - 可以用对象的原型构造器`constructor`来创建一个和该对象类似的新对象：`new duck.constructor("kfc")`，等效`new Duck()`。
> - **`F.prototype.constructor == F`**：函数的`prototype`的属性`constructor`等于他自己。

**🔸new F()**：用构造函数`F()`创建对象，分配`F.prototype`到新对象的原型`[[Prototype]]`

> - `F.prototype` 只在`new F()` 创建新对象是使用，设置为新对象的`[[Prototype]]`原型。`F.prototype`只支持对象、null，其他值会被忽略。
> - 如果`F.prototype`后面变更了，前后对象不影响，新的继承新的，旧的对象还是原有的。

```js
function Duck(name) {
  this.name = name;
  this.cry = function () {
    console.log(this.name + " cry！");
  };
}
let duck0 = new Duck("duck");
let cbird = {
  place: "china",
};
let jbird = {
  place: "jepan",
};
//修改构造函数Duck的原型对象为cbird
Duck.prototype = cbird;
let cduck = new Duck("cduck");
//再次修改构造函数Duck的原型对象为jbird
Duck.prototype = jbird;
let jduck = new Duck("jduck");
//两个对象的原型各不相同，互不影响
console.log(cduck.place); //china
console.log(jduck.place); //jepan
console.log(duck0.__proto__, cduck.__proto__, jduck.__proto__); //{constructor: ƒ} {place: 'china'} {place: 'jepan'}
```

**🌰**再来一个构造函数+原型继承的示例：

```js
let bird = {
  name: "bird",
  fly: function () {
    console.log(this.name + " fly！");
  },
};
function Duck(name) {
  this.name = name;
  this.cry = function () {
    console.log(this.name + " cry！");
  };
}
Duck.prototype = bird; //原型继承，让new Duck()创建的实例对象都继承自bird，bird作为原型就是共享的
Duck.prototype.type = "bird"; //增加原型属性，也就是给bird对象添加属性
let duck = new Duck("duck");
duck.fly(); //duck fly！
duck.cry(); //duck cry！
console.log(Duck.prototype == bird); //true
console.log(duck.__proto__ == bird); //true
console.log(duck.constructor == Duck); //false 因为构造函数的默认原型被更改了，duck就没有构造器了
```

该示例的图形化分析如下图，`bird`实际上是由new Object()创建的，`bird`的构造函数就是`Object()`构造函数了。

![image](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291558041.webp)

### 1.3、object万物之源

JS中基本所有对象都继承自 **`Object`**，准确的说是`Object.prototype`，`Object.prototype`的原型是 **`null`**，算是继承的尽头。所谓“道生一，一生二，二生三，三生万物”。还有很多内置对象Array、Function等，每一个原型对象都内置了很多属性、方法。当我们创建这些对象时，就继承了他们的丰富财富。

**📢 对于基本值类型稍有不同：**

- **值包装器**：值类型String、NUmber、Boolean，只有数据值，不是对象，因此本身并没有什么属性、方法。当我们访问其属性、方法（如`str.length`）时,会产生一个临时的对象包装器对象，这个包装器对象就是基于其对应的`String()`、`Number()`、`Boolean()`构造器创建的。
- **null、undefined** 没有对象包装器，也就么有任何属性、方法。

```js
[1, 2, 3].__proto__ == Array.prototype; //true
(() => {}).__proto__ == Function.prototype; //true
(5).__proto__ == Number.prototype; //true

let bird = { name: "bird" };
let duck = { color: "red" };
duck.__proto__ = bird; //继承bird
console.log(duck.__proto__ == bird); //true
console.log(duck.__proto__.__proto__ == bird.__proto__); //true
console.log(duck.__proto__.__proto__ == Object.prototype); //true
```

![image](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291558221.webp)

> **📢原型共享**：（内置）原型也是可以修改的，也可以借用（复制），属性方法都存储在`prototype` 中（Array.prototype、Object.prototype）。原型`prototype`是全局共享的，需要注意！

```js
//给string扩展一个全局方法: 转换数据为整数
if (!String.prototype.toInt) {
  String.prototype.toInt = function (defaultValue = 0) {
    const num = parseInt(this);
    return num ? num : defaultValue;
  };
}
//借给（复制）给其他原型
Number.prototype.toInt = String.prototype.toInt;
"123a".toInt(); //123
(123.11).toInt(); //123

//扩展一个函数包装器defer，让任何函数延迟执行
Function.prototype.defer = function (ms) {
  let f = this;
  return function (...args) {
    setTimeout(() => {
      f.apply(this, args);
    }, ms);
  };
};
//延迟3s执行方法
console.log.defer(3000)("123a");
alert.defer(3000)("Hi!");
```

### 1.4、到底继承了些什么东西？-原型链

继承是一层一层的，逐级往上，直到`Oject`（Object.**prototype**），形成了一个**原型链**。被继承的财富就藏在每一层原型上，当访问属性、方法时，先在自己内部查找，自己没有的属性/方法，会在原型链上向上查找，直到宇宙尽头`null`，都没找到就返回`undefined`。

![image.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291559697.webp)

```js
function Bird() {
  this.name = "bird";
  this.foods = []; //注意这个数组——共享财产
  this.eat = function (food) {
    this.foods.push(food);
  };
}
function Duck(name) {
  this.color = "white";
}
Duck.prototype = new Bird(); //修改原型对象，继承自Bird实例对象
//修正constructor，不修正也没啥，就是别人用new duck.constructor("gaga")创建对象时不对
Duck.prototype.contructor = Duck;
Duck.prototype.fly = function () {
  console.log(this.name + " fly!");
};

let duck1 = new Duck();
let duck2 = new Duck();
console.log(duck1.__proto__.__proto__.__proto__ == Object.prototype); //true

duck1.eat("rose");
console.log(duck1.foods, duck2.foods); //['rose'] ['rose']  //共享属性foods，这不是我们想要的！
Duck.prototype.name = "duck"; //在原型上修改值
duck1.__proto__.name = "duck"; //效果同上
console.log(duck1.name, duck2.name); //duck duck  //都会生效，共享属性name
duck2.name = "duck2"; //重新赋值属性值，不会影响原型
console.log(duck1.name, duck2.name); //duck duck2  //duck2有自己的属性name值了
duck2.foods.push("apple");
console.log(duck1.foods, duck2.foods); //['rose', 'apple'] ['rose', 'apple']  //共享属性foods
duck2.foods = ["私有food"];
console.log(duck1.foods, duck2.foods); //['rose', 'apple'] ['私有food']  //duck2的私有foods
```

上面示例代码的原型链图：

![image](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291559408.webp)

通过示例得到如下结论：

**📢只能继承一个**：一个对象只能继承一个原型对象，可以修改原型，会覆盖+有性能影响，尽量不这样做。

**❓继承的财产在什么地方？**

- 对于示例对象，在`obj.__proto__`访问器属性上，实际是在`obj.[[Prototype]]`属性。
- 对于构造函数、内置的原型对象，财产都存在他们的构造器的`prototype`上，如`F.prototype`、`.prototype`、`Array.prototype`。

**❓继承了些什么东西？**——共享属性（使用共享，修改变私有）

- **方法都继承了**，技能都是靠血脉传承的，这个好理解。
- **继承了所有属性-共享**，但属性的继承有一点特别，继承是单向的，可以用父类的属性&值，原型属性值变更后，所有实例对象的该属性值都跟着变，他们用的是同一个属性，属性是共享的。
- **修改变私有**：这个继承的属性只能看，不能模。不能通过实例对象修改（重新赋值）原型上的属性值，如`duck2.name = "duck2"`，当重新赋值时，会创建一个私有的同名属性，实际上是将属性添加到自己身上。
- **属性值为引用对象**：当修改引用对象内部数据时，并不影响共享，如`duck2.foods.push("apple")`，属性的引用地址并没有变更，大家共享了同一个食品库。
- **构造函数不是继承**：执行构造函数时，先创建新对象指向`this`，然后给`this`添加属性，都是是私有的，不是继承。

**⁉️ 关于共享属性**

- 有时共享是**需要**的， 如统一型号的玩具，其基本属性如尺寸、颜色外观都是统一的，所有商品都共用即可，不用单独创建属性。
- 有时**不需要**，如每一个用户都有自己的姓名、积分数量。不需要时怎么办呢，请看后文的实现继承的N中姿势！

![image.png](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291559969.webp)

**⁉️ 怎么判断是不是亲生的？**

判断属性是自己的，还是继承的。判断、获取自己的属性方法：

- obj.**hasOwnProperty**(propName)：判断是否自己的亲生的属性，返回bool值。
- Object.**keys**(obj)，获取obj自己的可枚举**属性数组**，不包含原型（父级）的属性。`for(in)`会循环所有的可枚举属性，包括原型链上的。

---

## 2、class类

> JS终于有点像样的东西了——类Class。看完后之后：也就那样，坑也不少啊。

**class** 定义一个类，可以更好的面向对象编程。`class`的本质上是函数，像构造函数的“语法糖”，构造器、原型继承基本都一样。不过他不是一般的语法糖，是JS内置的、有特殊标志的构造函数。

|              | **function 构造函数**        | **class 类**                                           |
| ------------ | ---------------------------- | ------------------------------------------------------ |
| **枚举属性** | 属性方法都可枚举             | 类方法不可枚举，默认enumerable = false，**属性可以**   |
| **严格模式** | 默认模式                     | 自动严格模式，`use strict`                             |
| **提升**     | 有提升效果，可先使用、后定义 | 不会提升                                               |
| **使用方式** | 可以当普通函数使用           | 不能直接调用，只能`new`创建对象                        |
| **构造函数** | 就是函数本身                 | 类中的`constructor()`函数，没有也会自动生成一个        |
| **命名方式** | 推荐大驼峰                   | 大驼峰                                                 |
| **语法**     | \-                           | 方法申明不需要`function`关键字：`method(){}`           |
| **继承方式** | 设置`__proto__`              | `extends`                                              |
| **原型链**   | `F.prototype`                | 和`function`相同，多了类本身之间的继承（实现静态继承） |

### 2.1、class基本语法

```js
class ParentClass {}
class MyClass extends ParentClass {
  #name; //私有属性，#开头
  size = 100; //正常属性
  // 构造器
  constructor(type) {
    super();
    this.type = type; //传统字段申明
  }
  // 方法
  method1() {}
  #method2() {} //私有方法
  //...
  //getter/setter
  get name() {}
  set name(value) {}
}
//使用new创建实例对象
let obj = new MyClass(); //自动调用构造器方法创建对象
```

- **`class`** 申明一个类，类名 建议大驼峰命名，首字母大写。
- **`constructor`** 定义构造器函数，创建对象时默认调用`constructor`，可以没有（会自动创建）
- 方法申明，**`method(para){}`**，和函数申明略有不同。
- 访问器属性 **`getters/setters`**，同对象中的申明方式。
- **`extends`** 继承另一个类，可以继承自定义的类，也可以继承JS的原生类，如Array、Map，然后实现更多扩展。（不过原生类的静态属性方法不会被继承）
- **`supper`** 调用父级，在继承的内部可以通过`supper`调用父类的构造函数、属性方法。
- **`static`** 申明静态的属性、方法。
- **`#`** 私有属性、方法，`#`开头命名的字段、方法为私有的，**不可外部访问，不可继承**，肥水不流外人田。在这之前，大家都是约定下划线\_开头命名，表示私有，哎，可怜的程序员！

> **📢 注意**：方法间没有逗号`,`、冒号`;`，其他语句同函数。方法默认是不可枚举的，默认`enumerable = false`，属性可以。

**🌰**一个简单的示例：

```js
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}
let user = new User("sam");
console.log(typeof User); // function
console.log(user.__proto__ === User.prototype); // true
console.log(user.constructor === User.prototype.constructor); // true
console.log(user.constructor === User); // true
console.log(User === User.prototype.constructor); // true
```

上面是一个非常简单的类，实例对象`user`和类`User`的原型关系，同构造器函数是一样的，如下图。

![image](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291559106.webp)

**简写的class类表达式**：同函数表达式写法。

```js
let Bird = class {
  name = "sam";
};
let Duck = class MyDuck {
  name = "sam";
};
```

### 2.2、extends继承

类的继承同样遵从原型链的规则，都继承了Object原型，继承的子类可以重写父类的属性方法。

- 📢 **`constructor`** 重写，必须**先**调用父类的构造函数 **`supper()`**。
  - 如不重写构造函数，会自动生成并调用`supper()`。
  - 为什么必须调用父类构造函数？子类是基于父类创建的，必须先构造父类，获得`this`对象，完成继承，再执行子类的构造函数，最终完成`this`的创建。
- **方法重写**，同名的方法会覆盖父类的方法，可以通过 **`super.method()`** 来调用 父类的方法。
- **字段重写**，同方法，不过字段（属性）的重写很怪异的一点，😱，父类的构造函数总数调用自己的字段，而不是被重写的。
  - **❓为什么会这样？** 是由于奇特的执行顺序：先初始化父类字段 >> `supper()`执行父类构造函数 >> 初始化自己的字段 >> 执行自己的构造函数。
  - so，执行父类构造函数时，他还不知道自己的字段被绿了。解决方式就是在子类构造函重新赋值。
- **单一继承**/Mixin 模式：extends只能继承一个类。如果希望获得多个类的属性、方法，需要配合其他方式，如拷贝`Object.assign()`。

**🌰**一个继承的示例：

```js
class Bird {
  #name;
  colors = ["red"];
  static type = "bird"; //静态属性，通过Bird.type访问
  constructor(name) {
    this.name = name;
  }
  cry() {
    console.log(this.name + " cry!");
  }
  get name() {
    return this.#name;
  }
  set name(value) {
    this.#name = value;
  }
}
class Duck extends Bird {
  weight;
  constructor(name, weight) {
    super(name);
    this.weight = weight;
  }
}
let duck = new Duck("gaga", 10);
console.log(Duck.__proto__ == Bird); //true 类本身的继承
console.log(duck.__proto__ == Duck.prototype); //true
console.log(duck.__proto__.__proto__ == Bird.prototype); //true
console.log(duck.constructor == Duck); //true
console.log(duck.__proto__.__proto__.constructor == Bird); //true
duck.colors.push("yellow");
console.log(duck.colors, new Duck().colors); //['red', 'yellow'] ['red'] colors属性是私有的
```

上面的代码中，类 **`Duck`** 继承自父类 **`Bird`**，`extends` 产生了两方面的原型继承，主要是多了**类本身**（构造函数）**的继承**。

- **构造函数继承（获得静态属性）**：类`Duck` 继承自 类`Bird`，为构造函数之间继承，这样就继承了父类的静态属性、方法。
- **原型继承**：`Duck.prototype` 继承自 `Bird.prototype`，这是对象实例继承的原型链。

![image](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291559652.webp)

> **⚠️箭头函数没有自己的this、supper**：注意this、supper的丢失，例如通过`setTimeout`在另一个上下文环境中执行，可用箭头函数；或复制有`supper`代码的方法。

### 2.3、static静态属性方法

**static** 静态定义的属性、方法属于这个类本身，不属于其任何实例，静态方法中的`this`也是指向的是类本身。通过类名进行调用，可以被类继承，就像我们常用的`Object.keys(obj)`。

- **内部定义**，static申明。
- **外部赋值**，通过类申明，与对象原型类似。

```js
class User {
  static Type = "VIP"; //内部用static申明定义静态属性、方法
  static showType() {
    console.log(this.Type);
  }
}
//外部定义静态属性、函数
User.Level = 99;
//继承
class SupperUser extends User {
  static showType = function () {
    console.log(this.Type + 2);
  };
}

User.showType(); //VIP
SupperUser.showType(); //VIP2
console.log(SupperUser.Level, SupperUser.Level); //99 99
```

---

## 3、实现继承的几种姿势

贴心的JavaScript为我们准备了N多种实现继承的姿势，体验丰富、欲生欲死、欲罢不能！了解前三个就基本可以了。

![image](https://blog-pic-1338675647.cos.ap-nanjing.myqcloud.com/blog/202504291559506.webp)

|  
 | **实现方式** | **优缺点** |
| --- | --- | --- |
| **原型继承** | 手动设置原型链实现继承：  
🔸 `subObj.__proto__ == parentObj`  
🔸 `Object.setPrototypeOf(obj , parentObj)`  
🔸 `SubFunc.prototype = parentObj`  
🔸 `Object.create(proto, propertiesObject)` | 🔴原型`__proto__`对象是共享的，大家共享原型上的属性值（特别是值为引用）  
🔴无法向父类传递参数 |
| **借用构造函数** | 调用构造函数，借用其`this`的属性、方法，本质是复制，没有“继承”关系。`parentFunc.call(this)` | 🟢避免了属性共享，可以传递参数  
🔴方法无法复用，每个实例对象都重新创建方法 |
| **组合继承** | 上面两种的组合：  
🔸 借用构造函数：实现属性”继承“  
🔸 原型继承：实现方法继承、复用  
 | 🟢实现了方法的重用，解决了属性共享  
🔴至少调用两次父级构造函数？好像也不是什么大事 |
| **寄生组合** | 组合继承的改进版，添加了用一个空构造函数包装父级原型 | 🟢在组合继承基础上，减少了一次父类构造函数的调用。  
🔴子级的原型`prototype`被覆盖了 |
| **增强寄生组合** | 寄生组合的改进版，把子类原型中的属性手动加回来 | 🟢解决了上面的问题 |
| **class类继承** | extends，属性并没有在`class.prototype`里 | 🟢属性是私有的，方法是共享的，支持传参 |

- **借用构造函数**：`parentFunc.call(this)`，借鸡生蛋！

```js
function Bird() {
  this.type = "sam";
  this.hi = function () {
    console.log("hi");
  };
}
function Duck() {
  Bird.call(this); //强制修改Bird()的this，借鸡下蛋
}
let duck = new Duck();
console.log(duck instanceof Bird); //false  和Bird没继承关系
console.log(duck instanceof Duck); //true
```

- **组合继承**：借用构造函数 + 原型继承

```js
function Bird(name) {
  this.name = name;
  this.colors = ["red"];
}
Bird.prototype.fly = function () {
  console.log(this.name + " fly!");
};
Bird.prototype.type = "鸟类"; //需要共享的属性

function Duck(name) {
  Bird.call(this, name); //借用构造函数：实现属性”继承“。调用一次Bird构造函数
  this.price = 100;
}
Duck.prototype = new Bird(); //原型继承：实现方法继承、复用。调用一次Bird构造函数
//修正constructor，不修正也没啥，就是别人用new duck.constructor("gaga")创建对象时不对
Duck.prototype.constructor = Duck;

let duck = new Duck("sam");
console.log(duck instanceof Bird); //true
console.log(duck instanceof Duck); //true
console.log(duck.fly == new Duck().fly); //true
duck.colors.push("green");
console.log(duck.colors, new Duck("ww").colors); // ['red', 'green'] ['red'] //没有共享
```

- **寄生组合式继承**：基本思路同组合继承，算是组合继承的改进版，直接设置子级的原型`F.prototype`，减少一次父级构造函数的调用。

```js
function inherit(parentFunc, childFunc) {
  let SuperF = function () {}; //用一个空构造函数封装父级
  SuperF.prototype = parentFunc.prototype;
  childFunc.prototype = new SuperF(); //new 这个空构造函数，不用调用父级构造函数了。
  childFunc.constructor = childFunc;
}
//更粗暴的做法
function inherit2(parentFunc, childFunc) {
  childFunc.prototype = parentFunc.prototype; //修改prototype
  childFunc.constructor = childFunc;
}
//父级
function Bird(name) {
  this.name = name;
  this.colors = ["red"];
}
Bird.prototype.fly = function () {
  console.log(this.name + " fly!");
};

//子类
function Duck(name) {
  Bird.call(this, name);
  this.price = 100;
}
Duck.prototype.cry = function () {
  console.log(this.name + " cry!");
}; //Duck.prototype原有的属性被后面覆盖了
Duck.prototype = Bird.prototype; //修改prototype
Duck.constructor = Duck;
// inherit2(Bird, Duck);    //同上

let duck = new Duck("sam");
console.log(duck instanceof Bird); //true
console.log(duck instanceof Duck); //true
console.log(duck.fly == new Duck().fly); //true
duck.colors.push("green");
console.log(duck.colors, new Duck("ww").colors); // ['red', 'green'] ['red'] //没有共享
```

- **增强寄生组合**：寄生组合的继续改进版，把子类原型中的属性手动加回来

```js
function inherit(parentFunc, childFunc) {
  let proto = parentFunc.prototype;
  //把子类原型的所有属性复制到一起
  Object.keys(childFunc.prototype).forEach((key) =>
    Object.defineProperty(proto, key, { value: childFunc.prototype[key] }),
  );
  childFunc.prototype = proto;
  childFunc.constructor = childFunc;
}
//父级
function Bird(name) {
  this.name = name;
  this.colors = ["red"];
}
Bird.prototype.fly = function () {
  console.log(this.name + " fly!");
};
//子类
function Duck(name) {
  Bird.call(this, name);
  this.price = 100;
}
Duck.prototype.cry = function () {
  console.log(this.name + " cry!");
};
inherit(Bird, Duck);

let duck = new Duck("sam");
duck.cry(); //sam cry!  //没有丢失
console.log(duck instanceof Bird); //true
console.log(duck instanceof Duck); //true
console.log(duck.fly == new Duck().fly); //true
duck.colors.push("green");
console.log(duck.colors, new Duck("ww").colors); // ['red', 'green'] ['red'] //没有共享
```

---

## 4、补充

## 判断数据类型方法

|  
 | **描述** | **返回值** |
| --- | --- | --- |
| **typeof** | 原始数据类型 | string |
| **{}.toString** | 原始数据类型、内建对象，包含 `Symbol.toStringTag` 属性的对象 | string |
| **instanceof** | 对象，会检测其原型链，只要在原型链上都返回`true` | true/false |

```js
class Bird {
  [Symbol.toStringTag] = "Bird"; //内置特殊属性[Symbol.toStringTag]，自定义toString方法的值。
}
let bird = new Bird();
console.log(bird.toString()); //[object Bird]

console.log(typeof 1); //number
console.log(typeof "1"); //string

let ftype = Object.prototype.toString; //用最原始的toString方法
ftype = {}.toString; //或者这样
console.log(ftype.call(1)); //[object Number]
console.log(ftype.call("1")); //[object String]
console.log(ftype.call(ftype)); //[object Function]
console.log(ftype.call({})); //[object Object]
console.log(ftype.call([1, 2])); //[object Array]
console.log(ftype.call(bird)); //[object Bird]

console.log(bird instanceof Bird); //true
console.log(bird instanceof Object); //true
```

