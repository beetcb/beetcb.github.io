---
layout: post
title: 对ECMAScript数据类型的理解
author: beet
top: true
cover: false
toc: true
mathjax: false
post: 9
nailimg: https://tvax3.sinaimg.cn/large/005K67iLgy1gfg8iocebuj30sg0lcta1.jpg
img: https://tvax3.sinaimg.cn/large/005K67iLgy1gfg8iocebuj30sg0lcta1.jpg
coverImg: https://tvax3.sinaimg.cn/large/005K67iLgy1gfg8iocebuj30sg0lcta1.jpg
password:
summary: 复习ES中数据类型
categories: ES6
tags: 
- ECMAScript

---

### 数据类型和值 

一门语言是用来储存和传递信息的，在计算机世界中，这些信息一般叫做 `value` ; 再把 `value` 分类，产生了`data types`(数据类型)

先斗胆康康官方 spec 的规定：

> The ECMAScript language types are <code>Undefined, Null, Boolean, String, Symbol, Number, BigInt, and Object.</code> An ECMAScript language `value is a value that is characterized by an ECMAScript language type.`

嗯，应该很直观

![谁说直观的！！](https://tvax4.sinaimg.cn/large/005K67iLgy1gffvyod1b2g30b4063tru.gif)

ES 数据类型: 可分为 <code>原始类型(primitive)</code> 、<code>对象(引用类型)</code>  , 一个变量的类型可以动态变化，可在声明后改变(这说明了 JS是一种弱类型、动态类型的语言)：

> - 原始类型即上面提到的 <code>undefined, null, boolean, string, symbol, number, bigInt</code>
>
>   原始类型没有属性，如果不注意的话，会报错
>
>   TypeError
>
>   => cannot read property ... of undefined
>
> - 对象(引用类型) ： 
>
>   我们的对象大法在  JS 语言里囊括万物
>   
>   一个简单的解释就是：对象是属性和方法(方法提供了操作对象的接口)的集合，属性又可以包含基本类型和引用类型。

ES 值：对一个数据类型来说，值与之对应，是可以直观认识这种数据类型的方式 

> 1. 原始值( primitive values )：
>
> 原始类型的值都是原始值( 值本身无法被改变 =>  immutable value)，存储于 stack 栈内存空间
>
> 来看一个列子：
>
>  <code>let instanceP = 22;instanceP = 222;</code> 代码执行时，`22`这个原始值会储存在当前作用域下( 属于 stack 栈内存空间 ) ，当变量`instanceP`声明后，把值关联给变量( 赋值过程 )。
>
> 把`222` 赋值给变量时， `22` 并不会变化，因为num属于原始值，`222` 只能创建一个新的栈内存空间，重复如上的赋值过程
>
> 2. 引用值( reference values ):
>
> 对象类型的值即引用值，存储于 heap 堆内存空间 
>
> 附带一个可以访问的<code>16进制地址</code> (该地址一般放在栈内存中，作为对象的指针，用于引用对象)
>
> 3. 通俗理解 
>
> 原始值占的内存小，不需要重复利用，值不允许改变；
>
> 而引用值一般是一大坨东西，需要重复利用免得浪费

#### Undefined 

<code>value: undefined</code> => 未定义

未赋值的变量都有 `undefined` 这个值

控制台输入一个`没有返回值的语句` 返回undefined 

![console](https://tva3.sinaimg.cn/large/005K67iLgy1gfh0xoznjoj30c4053gln.jpg)

#### Null

<code>value: null</code>  => 空

比如`querySelector('#box')`  如果没有 id 为 box 的元素，则为<code>null</code>

#### Boolean

<code>value: true/false</code> => 逻辑判断 (真假)

``` js
Boolean(0);Boolean(NaN);//=> false
// 0/NaN/null/undefined/空str => 转换为boolean为false，其他都为true
```

#### String

<code>value: a set of "elements" of 16-bit unsigned integer values</code> => 字符串

'apple' 及 "pie" 表示文本数据 : 简单说由引号包裹的内容都视为字符串

#### Number （Numeric Types）

<code>value: The Number type has exactly 18437736874454810627ℝ (that is, 2ℝ64ℝ - 2ℝ53ℝ + 3ℝ) values</code> => 数字

> 也就是 2ℝ64ℝ - 2ℝ53ℝ + （**+∞**）+ （**-∞** ）+ NaN

> 其中 2ℝ64ℝ - 2ℝ53ℝ 为有限数（ finite number）

其中的特殊value：

- 正无穷 positive Infinity ：**+∞** 

- 负无穷 negative Infinity ：**-∞** 

- NaN => 不是一个有效的数字

  isNaN() 方法可以判断是否 不是一个有效的数字

- 正零 positive zero：+0

- 负零 negative zero：-0

#### BigInt （Numeric Types）

<code>value: arbitrary precision integer</code>  => 大数字

创建方法：

``` js
const bigInt = 1234567890123456789012345678901234567890n;
// 方式一：数字末尾加n
const sameBigint = BigInt("1234567890123456789012345678901234567890");
// 方式二：用BigInt()构造，注意字符串
```

注意：

``` js
1n + 2;
// 报错，不能混用
// 只能用 BigInt() 和 Number() 来相互转化
```

#### Symbol

<code>value: **unique** and **immutable** primitive value/non-String value</code>  

常用于对象属性名(key)

---

#### Object

<code>value:  属性的集合或[特殊的Object]</code>  

##### 属性(Properties) ：

① 属性名 (key)

只能是 str 或 Symbol

② 属性值 (value) 

可以是任何数据类型

> 两种已规定值的属性
>
> - data property
> - accessor property

③ 创建方式

``` js
let obj = {
	key: value,
	age:99
}; //多组键值对 
let o = new Object();
```

④ 一些特殊的对象

1. functions

   Functions are regular objects with the additional capability of being *callable*.

   函数只是可以被调用（未调用时，作为字符串储存起来）的对象,一个可以重复使用的功能体

   $ 创建方法：

   ``` js
   let funcOpt1 = function(n) {
       // function body
   };
   
   function funcOpt2(i) {
       // function body
   };
   
   let funcOpt3 = (m)=> {
   	//func Body
   }
   funcOpt3(1);// call this function
   ```
   $ 用于函数调用的形参和实参：

   ``` js
   // 此处的参数叫做形参: 入口，形参是变量(two 和 two2)
   function sumUp(two,two2){
       console.log(x+y);
   }
   // 此处传递的是实参：实参是具体的数据值
   sum(2,22);
   //按照次序形参变量接收
   ```

2. Array 

   [Arrays](https://developer.mozilla.org/en-US/docs/ js/Reference/Global_Objects/Array) are regular objects for which there is a particular relationship between integer-key-ed properties and the `length` property

   以数字为属性名索引、包含length属性的对象

   ![console](https://tvax4.sinaimg.cn/large/005K67iLgy1gfg662h445j30da05c0sw.jpg)

   $ 创建方法：

   ``` js
   let arr = new Array();
   let arr = [];
   ```

3.  Typed Array (类数组)

   比如由 `.getElementsByTagName('li')` 得到的 HTMLcollection

   ![console](https://cdn. jsdelivr.net/gh/beetcb/pic/a9/20200604131918.png)

4.  JSON 

5. Date日期

6. ...

#### 判断数据类型的方法

注意区分 <code>typeof</code> 和 <code>instanceof</code> 

##### <code>typeof</code>

用途：获得原始数据值的数据类型

返回值：原始数据类型、object、 function

比如：

``` js
// 如果直接输出，输出的是字符串
typeof 1 ;// "number"
typeof "";// "string"
typeof false;// "boolean"
// or 
console.log(typeof 1);// number
console.log(typeof '');// string
console.log(typeof true);// boolean

typeof function func(){};// "function"

typeof [];// "object"
```

问题：

①不能区分具体的Object类型

``` js
typeof new Date();// "object"
typeof /foo/;// "object"
```

②使用`new` 构造的数据都当成 "object"

``` js
typeof new String('foo') === 'object';
typeof new Number(1) === 'object';
```

③迷惑的`null` 

``` js
typeof null;// "object"
```

注意：typeof 一般不会报错，一般返回undefined；但是遇到let造成的暂时性死区时，报错"ReferenceError"

![console](https://tva4.sinaimg.cn/large/005K67iLgy1gfh1jhf6mrj30f406kwex.jpg)

##### <code>instanceof</code>

The `instanceof` operator tests whether the `prototype` property of a constructor appears anywhere in the prototype chain of an object<img src="https://tva3.sinaimg.cn/large/005K67iLgy1gfg7dzq9lcg306o06oq3a.gif" style="zoom:25%;" />

比如：

``` js
[] instanceof Array; // true 解决问题①②

class Foo {};
let foo = new Foo();
console.log(foo instanceof Foo);// true 可以识别自定义构造类 解决问题②

null instanceof Object; // "false"  解决问题 ③
```

一个经验易懂的解释

![stack overflow](https://tva3.sinaimg.cn/large/005K67iLgy1gfg8bmaok6j30gl104wi7.jpg)

后续补充......

#### 参考

- [ECMAScript Language Types](https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values)
- [ js data types and data structures](https://developer.mozilla.org/en-US/docs/Web/ js/Data_structures)
- [[  JS 进阶 \] 基本类型 引用类型 简单赋值 对象引用](https://segmentfault.com/a/1190000002789651)
