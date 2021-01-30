---
layout: post
title: 微信推文能用上的svg特效 | 文字篇
author: beet
post: '@2@'
date: 2020-04-15 15:44:46
nailimg: https://static.beetcb.com/nailimg/svg.png
tags: svg
---

<style>
aside  {display:inline-block;background-color: white; border-radius: 5px;box-shadow: 0 3px 5px rgba(0, 0, 0, .12);line-height:15px;margin-top:5px} code {background: #fff6ea;font-size:14px}
</style>

#### 基于 SVG 的文字动画

**一波儿<code>特效</code>展示**

> 点击 [ tweeanimate ] 字体查看效果
> 代码放在[CodePen](https://codepen.io/beetcb/pen/jObbBdN),请自行获取

写了很多，先列举七个小 hulu，爷爷给他们取名叫 <code>傻跳娃、近视娃、闪现娃、别扭娃、弹簧娃、上吊娃和徐坤娃。</code>:joy:。

<aside class="center-align waves-effect "><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="26" width="130" viewbox="0 0 130 26"
      preserveAspectRatio="xMidYMid meet">
      <text fill=pink font-size="20px" font-family="microsoft yahei" y="22" x="0"
        preserveAspectRatio="xMidYMid meet">tweeanimate
        <animateTransform attributeName="transform" attributeType="XML" type="rotate" begin="click" calcMode="spline"
          additive="sum"
          values="0 30 20;1.5 30 20;-.5 30 20;-1.5 30 20;-1.5 30 20;1.5 30 20;1.5 30 20;1.5 30 20;1.5 30 20;-1.5 30 20;2.5 30 20;
        -1.5 30 20;1.5 30 20;0.5 30 20;1.5 30 20;2.5 30 20;-.5 30 20;-.5 30 20;-1.5 30 20;2.5 30 20;-1.5 30 20;0.5 30 20;2.5 30 20;2.5 30 20;1.5 30 20;2.5 30 20;2.5 30 20;.5 30 20;-1.5 30 20;-2.5 30 20;.5 30 20;.5 30 20;-2.5 30 20;-1.5 30 20;.5 30 20;.5 30 20;2.5 30 20;2.5 30 20;2.5 30 20;1.5 30 20;-.5 30 20;-1.5 30 20;2.5 30 20;1.5 30 20;0.5 30 20;-.5 30 20;.5 30 20;1.5 30 20;-2.5 30 20;-1.5 30 20;0 30 20"
          keyTimes="0;0.03;0.05;0.08;0.09;0.1;0.13;0.15;0.18;0.19;0.2;0.23;0.25;0.28;0.29;0.30;0.33;0.35;0.38;.39;.4;0.43;0.45;0.48;.49;0.5;0.53;0.55;0.58;0.59;0.6;0.63;0.65;0.68;0.69;0.7;0.73;0.75;0.78;0.79;0.8;0.83;0.85;0.88;0.89;0.9;0.93;0.95;0.98;.99;1"
          keySplines=".19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21"
          dur="5" repeatCount="1">
        </animateTransform>
        <animate attributeName="y" dur="4s" calcMode="spline" additive="sum"
          keySplines=".19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21;.19 .65 .76 .21"
          values="0;1.5;.5;.5;.5;-.5;.5;1.5;1.5;1.5;2.5;.5;.5;2.5;1.5;2.5;1.5;.5;.5;0;1.5;.5;-.5;-.5;.5;-.5;.5;2.5;1.5;2.5;1.5;1.5;.5;1.5;.5;.5;2.5;1.5;0.5;-1.5;.5;-.5;.5;1.5;.5;1.5;.5;1.5;1.5;.5;0"
          repeatCount="1" begin="click">
        </animate>
      </text>
    </svg></aside>

<aside class="center-align waves-effect "><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="26" width="130" viewbox="0 0 130 26">
      <text fill=pink font-size="20px" font-family="microsoft yahei" y="22" x="0"
        preserveAspectRatio="xMidYMid meet">tweeanimate
        <animateTransform attributeName="transform" attributeType="XML" type="scale" begin="click" dur="1s"
          values="1;1.1;1" additive="sum" repeatCount="1">
        </animateTransform>
        <animateTransform attributeName="transform" attributeType="XML" type="translate" begin="click" dur="1s"
          values="0,0;-6.5,-1.8;0,0" additive="sum" repeatCount="1">
        </animateTransform>
      </text>
    </svg></aside>

<aside class="center-align waves-effect "><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="26" width="130" viewbox="0 0 130 26">
      <text fill=pink font-size="20px" font-family="microsoft yahei" y="22" x="0"
        preserveAspectRatio="xMidYMid meet">tweeanimate
        <animate attributeName="opacity" attributeType="CSS" begin="click" dur="3s" values="1;0;1;0;1"
          keyTimes="0;.25;.5;.75;1" repeatCount="2">
        </animate>
      </text>
    </svg></aside>

<aside class="center-align waves-effect "><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="26" width="130" viewbox="0 0 130 26">
      <text fill=pink font-size="20px" font-family="microsoft yahei" y="22" x="0"
        preserveAspectRatio="xMidYMid meet">tweeanimate
        <animateTransform attributeName="transform" attributeType="XML" type="scale" begin="click" dur="1s"
          values="1,1;1.23,0.8;0.8,1.25;1.15,0.85;1.05,0.95;1,1" repeatCount="1">
        </animateTransform>
        <animateTransform attributeName="transform" attributeType="XML" type="translate" begin="click" dur="1s"
          values="0,0;-14.95,3.59;13,-4.5;-9.75,2.7;-3.25,0.9;0,0" additive="sum" repeatCount="1">
        </animateTransform>
      </text>
    </svg></aside>

<aside class="center-align waves-effect "><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="26" width="130" viewbox="0 0 130 26">
      <text fill=pink font-size="20px" font-family="microsoft yahei" y="22" x="0"
        preserveAspectRatio="xMidYMid meet">tweeanimate
        <animate attributeName="x" begin="click" dur="2s" values="0;8;-8;8;-8;8;-8;8;-8;8;-8;8;-8;1;-1;0"
          repeatCount="1">
        </animate>
      </text>
    </svg></aside>

<aside class="center-align waves-effect "><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="26" width="130" viewbox="0 0 130 26">
      <text fill=pink font-size="20px" font-family="microsoft yahei" y="22" x="0"
        preserveAspectRatio="xMidYMid meet">tweeanimate
        <animateTransform attributeName="transform"  attributeType="XML" type="rotate" begin="click"
          values="10 50 0;-10 50 0;8 50 0;-8 50 0;7 50 0;-7 50 0;5 50 0;-5 50 0;-2 50 0;0 50 0"
          keyTimes="0;0.1;0.2;0.3;0.4;0.5;0.6;0.7;.85;1"
          dur="3s" repeatCount="1">
        </animateTransform>
      </text>
    </svg></aside>
<aside class="center-align waves-effect "><svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="26" width="130" viewbox="0 0 130 26"
      preserveAspectRatio="xMidYMid meet">
      <text fill=pink font-size="20px" font-family="microsoft yahei" y="22" x="0"
        preserveAspectRatio="xMidYMid meet">tweeanimate
        <animate attributeName="y" attributeType="XML" begin="click" dur="3s" calcMode="spline"
          values="25;13; 25; 17; 25; 20; 25; 24.5; 25" keyTimes="0; 0.15; 0.2; 0.3; 0.45; 0.6; 0.75; 0.9; 1"
          keySplines="0.42 0 1 1;0.42 0 1 1;0 0 0.59 1;0.42 0 1 1;0 0 0.59 1;0.42 0 1 1;0 0 0.59 1;0.42 0 1 1"
          repeatCount="2">
        </animate>
      </text>
    </svg></aside>

#### 使用方法

既然特效都做出来了，也希望每个小甜菜们都能用上并且反馈。

只需选择你喜欢的效果，根据注释粘贴 <code>svg</code> 标签段到任何编辑器源码区，改一改、补一补，文字就能就跳动啦。

当然，动画特效只是给人良好的交互体验，最重要的还是<code>内容本身</code>

> "We believe that writing is about content, about what you want to say – not about fancy formatting."
>
> 我们坚信写作写的是内容，所思所想，而不是花样格式。

#### code 几点简单注解

##### 1. 简单的控制说明

触发、持续时间、结束、重启

```svg
<animate
begin="click"
dur="1s"
fill="freeze"
restart="always"
/>
<!--for optional choices list：参考A Guide to SVG Animations (SMIL)-->
```

##### 2. **为什么写得重复且没有复用性**

说到痛处了，微信图文内嵌代码是不支持引用的，比如 xlink:href="#somekindofreference" 这里引用不会生效，所以最好写在内部且避免引用。

同样因为引用问题,<code>css animation</code> 和 <code>tranform</code>更显鸡肋，em... js 写动画，公众号平台好像也不支持，这也是我选择 svg 的原因。

##### 3. **寻求复杂的自定义效果**

可以参考<code>[A Guide to SVG Animations (SMIL\)](https://css-tricks.com/guide-svg-animations-smil/)</code>
感谢<code>animate.css</code>作者,动画形式上,也从中盗取了不少灵感

##### 4. **记录一个小坑**

问题 ##

<code>scale</code>属性输出动画时，并不沿着中心缩放

原因 ##

svg 缩放并无中心问题，可以理解为 x y 轴的拉伸。必须要强调的是，不仅仅是元素本身拉伸，包括左、上间距同样拉伸

解决 ##

累加<code>translate</code>动画，把脱缰的马儿给拽回来，我写了两个个公式：

$$
translateX = (leftmargin + \frac{width}{2})  \times (1-scale)
$$

$$
translateY = (topmargin + \frac{height}{2})  \times (1-scale)
$$

注意 ##

两段动画持续时间必须一样，否则任意时刻的 <code>骚动</code>可不大好看哦

#### 长期更新其他动画（美丽的 flag:dog:）
