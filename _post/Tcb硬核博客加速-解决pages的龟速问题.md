---
layout: post
title: 'tcb硬核博客加速,解决pages的龟速问题'
author: beet
post: "@7@"
date: 2020-05-17 13:15:34
nailimg: 
tags: share
---

本文将介绍：
- tcb可见的优点
- 利用github actions自动部署到tcb
- 针对 hexo 的额外配置
- tcb免费额度和价格

#### 前言

> 相信搭建过静态博客的小伙伴们在部署时都或多或少有过不愉快的体验，比如<code>各大pages</code> （Github , Gitee , Coding），速度、稳定、价格只能选一个，不可兼得。
>
> 最近学    github actions 时看到了这篇文章 [比快更快，Github Action + 云开发部署静态网站](https://cloud.tencent.com/developer/article/1613125)
>
> 作者安利了腾讯云开发（以下简称<code>tcb</code>）的种种优势，本来当成广告去看的，抱着学习和实践 github actions 的态度(其实是发现 tcb 这简称与我网站域名颇有几分缘分🤤)，发现了一块新大陆。

#### 硬核加速个人体验报告

实际测试我的服务器套阿里cdn 和 tcb静态部署的表现不相上下，毕竟都是国内服务器+ cdn ，无比较的意义；如果和 github pages比较一下呢。

1.tcb 静态托管

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.6ping.png)

2.Github pages （部分资源已套cdn）

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.7ping.png)

#### 利用Github actions 自动部署到 tcb

> 准备：自定义域名必须备案

##### 了解价格 避免采坑

当然了，云开发4月底刚刚发布，有一年的小福利（需要站点运营3个月以上）

详见[网站托管「9.9包年」赞助计划](https://cloud.tencent.com/act/pro/wh99)

如果在没有羊毛的情况下，构建首个云开发环境赠送资源如下，也够博客的基本使用了

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.10png.png)

具体定价参考 [静态网站托管](https://cloud.tencent.com/document/product/1210/42854)

可以看到用于网站托管的按量计费在容量上基本不花钱（我20M的网站数据100天花费0.0086）

那么剩下的就是流量了，我做个不严谨的估算：假设1位用户访问花费5M流量（顶多），一块钱可以支撑500次访问量，对于我这样的小博客够用了（叫我不搞 seo  🤤）

实际上，比如我的阿里 cdn ，两个月来花费的流量是 ... 4Gb (哈哈哈)

##### 进入正题，先去开通tcb

登录 [腾讯云云开发控制台](https://console.cloud.tencent.com/tcb) ，创建环境 ，记录环境ID备用

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.11.png)

等待创建成功后，进入所创建的环境，左侧菜单栏找到静态网络托管，开启使用，进入基础配置，绑定域名并配置证书（和cdn的配置类似）

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.13.png)

##### 访问管理（获取 secretId&secretKey）

进入 [访问管理](https://console.cloud.tencent.com/cam/capi)页面，创建子账号，获取 <code>secretId & secretKey</code>  **保存备用**

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.14.png)

##### 配置github actions

<code>github actions</code> 简单来说就是用 github 的虚拟机帮你完成一些重复性的操作（actions），更好的是这些集成操作的脚本很多都已经由其他开发者共享，使得它拥有一个良好的生态。详细可以参考 [阮老师的教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

所以，为了更方便地部署，腾讯开发者完善了 [<code>Tencent CloudBase Github Action</code> ](https://github.com/marketplace/actions/tencent-cloudbase-github-action) ，可以轻易地上传到tcb啦！

> 本次教程以 hexo 为例，其他环境类似或更为简单

<code>source</code> 目录下新建<code>.github/workflow/tcb_deploy.yml</code> 

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.1dir.png)

<code>tcb_deploy.yml</code> 中写入

``` yaml
name: DeployBeetcbToTcb #workflow在github显示的名字

on: push #触发workflows的方式 多条件触发写法 on: [push,pull_request]

jobs:
  deploy: #job ID 
    runs-on: ubuntu-latest #运行job的系统
    name: Tcb Github Action Deploy Job #job在github显示的名称
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Deploy static to Tcb
        id: beetcbTcb
        uses: TencentCloudBase/cloudbase-action@v1.1.0 #使用tcb的github action
        with:  #tcb相关配置,前三项去github配置
          secretId: ${{ secrets.SECRET_ID }}
          secretKey: ${{ secrets.SECRET_KEY }}
          envId: ${{ secrets.ENV_ID }}
          staticSrcPath: ./ #推送目录,当前为根目录
```

> workflow语法详细解释：https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#name

##### 适配 hexo （就是填坑而已）

1. 让 hexo 不要渲染 workflow 下的 <code>yaml</code> 文件

   在根目录配置文件里配置<code>skip_render</code>

   ``` yaml
   skip_render: '.github/**/*' #不对yaml渲染
   ```

2. 让 hexo 不要忽略 <code>.github</code> 目录

   hexo 默认忽略隐藏文件夹 ，要解决这个问题，在根目录配置文件里配置<code>include</code>  

   ``` yaml
   include:
     # 取消忽略.github文件夹
     - ".github/**/*"
   ```

3. 解决git推送时不推送<code>.</code> 前缀的问题

   在 配置文件的 deploy 下添加

   ``` yaml
   ignore_hidden: false
   ```

   如下图：

   ![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.15.png)

##### 在repo里添加机密

``` yaml
secretId: ${{ secrets.SECRET_ID }}
secretKey: ${{ secrets.SECRET_KEY }}
envId: ${{ secrets.ENV_ID }}
```

在<code>tcb_deploy.yml</code> 文件里，上面的三行代码就是连接tcb 与 github actions的机密；出于安全考虑，我们不可能把这些内容直接写进源文件，而是把机密添加进repo，由 github 相对安全地保管起来。然后 yaml 文件调用。具体操作：

在项目 Setting/ Secrets 里依次配置提前保存的 <code>SECRET_ID</code> 、<code>SECRET_KEY</code>、<code>ENV_ID</code> 信息

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.2github.png)

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.3githubs.png)

##### <code>hexo cl && hexo g && hexo d</code> 享受成果吧

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a7/7.4deploy.png)

#### 补充

可能机智的胖友们已经想到了，可以利用 github actions 自动完成 hexo 的相关操作，确实可以（网上教程很多，不再赘述，同时也解决了换电脑需要重装hexo的痛处），再配合 tcb ，写博客就无比方便啦！

还不快去试试！！！

> 如有错误，恳请指正
