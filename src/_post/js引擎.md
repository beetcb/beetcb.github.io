---
layout: post
title: BrowserStack-JS引擎机理(浅解)
author: beet
post: '@15@'
date: 2020-07-21 08:14:22
nailimg: https://static.beetcb.com/nailimg/v8.png
tags: JS
---

### 首先从加载 js 说起

**浏览器如何加载 js 的**

简单来说，在读取 HTML 文档时，遇到 `<script>` 标签，就开始下载 js 文档，下载完毕立即执行（这两个过程都是同步的，也就是说先暂停对 html 的读取，等 js 下载执行才能继续读取）

**defer async**

可以看到上面的方法是同步执行的，为了优化，通过在 `<script>` 标签里加上 defer 或 async，可以达到异步处理的效果，两者区别就是前者在 HTML 加载完成之后再执行 js，后者是在下载完马上执行 js

> 注意：,defer 和 async 只能在加载外部 js 文件才有作用，直接写在 html 文档里面的不会生效

### 先说 JS 引擎极大作用

> 所谓的代码引擎、运行引擎、垃圾回收引擎只是方便理解编出来的词条，官方没有相关说法，把它们都当成强大的 js 引擎就对了。

- 原始代码相关(涉及读、编译、优化等) ——> 代码引擎
- 代码运行相关(涉及事件循环) ——> 运行引擎
- 垃圾回收相关 ——> 垃圾回收引擎
- 其他引擎

### JS 代码引擎

这里标题说所的代码引擎是指引擎对代码的处理操作。

> JS 代码引擎的组件预览
>
> - Parser
> - AST
> - Interpreter
> - Profiler（JIT）
> - Compiler（JIT）
> - Optimized code（JIT）

> 前奏：在下载 js 文件时，读取就已经开始了(这样下载完就可以立即执行)，我们知道，下载过程传输的是`字节`，那么就可以说 js 文件就是一个`字节流`，通过字节流解码系统，把下载的字节解码成 `进制编码`
> 比如采用 16 进制编码，得到的进制编码就可能是 `2c 25 34...`。

#### Parser（读取）

AST(Abstract syntax tree)，他的工作是在 `Parser` 得到 `进制编码` 后，将其解码成 `tokens`

> 承接上文，这一步得到的就是 `let...`

#### AST (生成语法数)

得到 `tokens` 后，再将其根据语法规范创建 node 节点，进而构建 `syntax tree` 数据结构。

> 具体大概就是 js 根据 tokens 判断关键字和保留字，分类和标记各个不同代码段的不同功能，方便解释代码

比如我们在编辑器里写的一段代码：

```js
function fooMe() {
  console.log('syntax')
}

function foo() {
  console.log('tree')
}

function printTree() {
  console.log(fooMe() + foo())
}
```

通过前三步生成的 `syntax tree` 使用 JSON 可以表示如下[显示太长请右上角折叠]

> 注：https://astexplorer.net/ 是一个很好用的 AST 生成工具

```json
{
  "type": "Program",
  "start": 0,
  "end": 146,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 47,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 14,
        "name": "fooMe"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 17,
        "end": 47,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 20,
            "end": 41,
            "expression": {
              "type": "CallExpression",
              "start": 20,
              "end": 41,
              "callee": {
                "type": "MemberExpression",
                "start": 20,
                "end": 31,
                "object": {
                  "type": "Identifier",
                  "start": 20,
                  "end": 27,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 28,
                  "end": 31,
                  "name": "log"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 32,
                  "end": 40,
                  "value": "syntax",
                  "raw": "'syntax'"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "FunctionDeclaration",
      "start": 49,
      "end": 88,
      "id": {
        "type": "Identifier",
        "start": 58,
        "end": 61,
        "name": "foo"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 64,
        "end": 88,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 67,
            "end": 86,
            "expression": {
              "type": "CallExpression",
              "start": 67,
              "end": 86,
              "callee": {
                "type": "MemberExpression",
                "start": 67,
                "end": 78,
                "object": {
                  "type": "Identifier",
                  "start": 67,
                  "end": 74,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 75,
                  "end": 78,
                  "name": "log"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 79,
                  "end": 85,
                  "value": "tree",
                  "raw": "'tree'"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "FunctionDeclaration",
      "start": 90,
      "end": 146,
      "id": {
        "type": "Identifier",
        "start": 99,
        "end": 108,
        "name": "printTree"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 111,
        "end": 146,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 114,
            "end": 142,
            "expression": {
              "type": "CallExpression",
              "start": 114,
              "end": 142,
              "callee": {
                "type": "MemberExpression",
                "start": 114,
                "end": 125,
                "object": {
                  "type": "Identifier",
                  "start": 114,
                  "end": 121,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 122,
                  "end": 125,
                  "name": "log"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "BinaryExpression",
                  "start": 126,
                  "end": 141,
                  "left": {
                    "type": "CallExpression",
                    "start": 126,
                    "end": 133,
                    "callee": {
                      "type": "Identifier",
                      "start": 126,
                      "end": 131,
                      "name": "fooMe"
                    },
                    "arguments": []
                  },
                  "operator": "+",
                  "right": {
                    "type": "CallExpression",
                    "start": 136,
                    "end": 141,
                    "callee": {
                      "type": "Identifier",
                      "start": 136,
                      "end": 139,
                      "name": "foo"
                    },
                    "arguments": []
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```

#### Interpreter（解释器）

v8 里的 Interpreter 叫做 `Ignition`
解释器会遍历 `AST` ，生成 `byte code`（字节码），等到字节码全部生成完毕，马上就从内存清除。

解释器出来的代码已经可以执行，但是没有经过优化，只是一行一行傻傻的执行，现在大多数浏览器 js 内核都使用 JIT 把它编译成`optimized code`，并结合`byte code`， 可以大大优化执行的效率。

所以得出结论，`byte code`和`optimized code`都是最后（经过一点编译）可以执行的代码。

> `RUNTIME`下文会讲到

#### JIT Compiler(实时编译优化)

现在许多流行的编译器都实现了 JIT(just-in-time compiler)编译器，v8 的 JIT 叫做 `TurboFan JIT`，他可以在 `RUNTIME` 实时编译出优化的机器代码，JIT 分以下三个操作 => **三个操作各自占有自己的线程，可异步执行**

- Profiler（监视器）

  在`RUNTIME`过程中，`profiler`会监控和记录那些需要优化的部分，以便最后的优化操作

- Compiler (编译成机器码)
  也叫翻译器，将上文的 `byte code` 翻译成机器能看懂的 `machine code`。
- Optimized code（优化机器码）
  结合 profiler 的信息优化机器码，发送给 compiles，最终得到优化后的代码

以上便是读取、编译代码的整个流程，可以总结如下

![](https://static.beetcb.com/postimg/15/1.png)

---

### JS 运行引擎

`RUNTIME` 是指 js 代码运行时的环境。js 引擎参与（也处在）这个环境中。理解这个环境对 js 中的同步与异步很用帮助

> 概括：
> ![](https://static.beetcb.com/postimg/15/2.png)
>
> - Memory Heap
> - Call Stack
> - Web APIs
> - Callback Queue
> - Event loop

如上 `RUNTIME` 里一共有五个容器。其实在上面处理代码的过程中，js 就已经将其不同的代码放入对应的容器中。

#### Memory Heap

内存堆，在处理代码过程中，储存对象类型值

#### Call Stack

调用栈是追踪函数执行流的一种机制，在处理代码的过程中，遇到函数执行就放到调用栈中。每个调用都在栈中开辟一个空间，这个空间叫 `call frame` （调用帧，储存当前函数的调用位置、变量信息）

Call Stack 满足[栈数据结构 LIFO](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)的特点。_那么这种数据结构的作用何在？_ 请看下一个例子，foo() 执行时会卡在 call stack，此时 bar() 会根据 call stack 的数据结构继续加入，所以执行顺序是：`bar()` -> `foo()`

```javascript
function foo() {
  function bar() {
    console.trace()
  }
  bar()
}
foo()
```

它在 `RUNTIME` 里处理的机制是；

- 在函数被放入栈中时，web apis 会验证当前函数是否需要等待执行，如果是，立即抽出加入 web apis
- 一旦有立即执行的函数调用，立即放入栈的头部
- 在头部的调用立即执行
- 执行完毕的函数立即从 stack 中清除
- 当调用次数过多时会发生 `stack overflow`

因为 js 是单线程（`single thread`）的，代码运行期间只能有一个 `call stack`，但是因为有了机制的第一条，js 拥有了异步处理的能力；具体处理请往下读。

> 补充：callstack 可以在浏览器的 `inspect -> sources -> callstack` 使用 debug 查看过程。

#### Web APIs

[Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) 是浏览器提供的接口，js 调用十分方便, 常用的有 `DOM` `CSSOM` `Timer` 等。
在 `RUNTIME` 里，Web APIs 有利用`AJAX requests` 、 `setTimeout` 、 `DOM 里的 EventTarget`等等完成异步处理。

web apis 不断验证等待执行的函数，当等待条件不在满足时，立刻抽出并加入到`callback queue`

#### Callback Queue

回调队列，FIFO 原则，先进先执行，当 `event loop` 触发后，回调队列满足 FIFO 的那个事件被抽出，加入到 `call stack` 中。

#### Event Loop

事件循环，它的任务是不断检测当前 `call stack` 是否为空，若为空，触发回调队列

实列演示可以通过[ Philip Robert’s tool ](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D) 很方便地查看动画演示

### JS 垃圾回收引擎(只说标记清除)

垃圾回收（Garbage collection）主要目的是清理内存，提高运行速度
c 语言提供`malloc()` `free()`来实现手动释放内存；
而 js 垃圾回收是自动的，它的机制就是从根对象开始，向下定期检查是否有**不可达**的对象，是则不再需要，应该对其回收。

### 其他引擎

在 js 机制中，还有其他用于优化的机制 `shaps` `Inline Caches`，笔者还没研究，在此不去深入。

可以参考 [avaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics) 去深入了解

[Digging into the TurboFan JIT](https://v8.dev/blog/turbofan-jit)

[A brief explanation of the Javascript Engine and Runtime](https://medium.com/@sanderdebr/a-brief-explanation-of-the-javascript-engine-and-runtime-a0c27cb1a397)

[How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code
](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)

> 欢迎指正、讨论
