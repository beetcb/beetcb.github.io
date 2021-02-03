---
layout: post
title: sosf 部署教程
author: beet
post: '@22@'
date: 2020-12-05 08:23:23
nailimg: https://static.beetcb.com/nailimg/host.png
tags: severless
---

### sosf 简介

**S**everless **O**neDrive & **S**harePoint **F**unction

博主使用世纪互联 OneDrive 一年多了，之前一直使用 CloudFlare Worker 做分享索引。最近我不再阿里 OSS，所以想利用 OneDrive 来做图床，CloudFlare Worker 的问题是国内网络环境下它太慢了，特别是世纪互联用户，虽说是国内服务器，总有种毫无用武之地的感觉。于是 sosf 诞生了，它或许是**国内**访问最快的 OneDrive **免服务器**图床程序，专为**世纪互联**用户打造

> 注：SharePoint 文档储存功能和 OneDrive 网盘类似，本说明将他们统称为 OneDrive

sosf 有以下特点：

- 与现有免费图床服务的区别：我们有 OneDrive 😎，所以 sosf 可以托管任何文件(图片、视频、下载链接)，并且无储存空间限制(几乎，你甚至还可以用 SharePoint 扩展空间)

- 访问速度快：`sosf` 使用国内 Severless 供应商提供的免费服务(一般带有 CDN)，访问国内的世纪互联，速度自然有质的飞跃

- CLI 配置，简单快速：微软 Graph 的授权过程比较麻烦，为此我提供了一个 cli 工具来加快部署。用户填入所有的配置项后，该工具自动写入配置文件，无需多余操作

- 设计从简：`sosf` 只验证并获取 Onedrive 文件直链，并重定向过去(这也意味着它没有前端页面，如果你恰好有这种需求，[onedrive-cf-index](https://github.com/spencerwooo/onedrive-cf-index) 为不二之选)

- 教程完备：本说明带有十分叨唠的部署教程，各个平台都囊括其中

- 多平台部署支持

  - [Leancloud 云引擎开发版](https://www.leancloud.cn/engine/)：限制是每天 1GB 外网出流量，`sosf` 流量消耗少，我相信 1GB 完全够用了。此外，公网访问必须绑定备案域名，详见 [定价](https://www.leancloud.cn/pricing/)。
  - [腾讯云开发免费额度](https://cloud.tencent.com/product/tcb)：它的限制就多了，首先云函数每月有使用量限制 `执行内存(GB) * 执行时间(s)` 为 1000 GBs，并且云函数公网访问月流量限制为 1 GB，详见 [免费额度](https://cloud.tencent.com/document/product/876/39095)。 所以我推荐使用 leancloud。

  除此之外，[Vercel](https://vercel.com/docs/serverless-functions/introduction) 国内访问速度也不错，不需要备案，免费额度也绝对够用：云函数使用量 360000 GBs，月流量 100 GB, 详见 [Fair Use Policy](https://vercel.com/docs/platform/fair-use-policy)(良心！🌸)

- 遵守[合理使用](https://vercel.com/docs/platform/fair-use-policy)规范：在我们使用这些云服务商表示支持的同时，也要~~优雅薅羊毛~~合理使用

图床 DEMO 如下(测试链接为 https://static.beetcb.com/postimg/10/1.png):

![sosf DEMO](https://static.beetcb.com/postimg/10/1.png)

### 部署指南

#### OneDrive 配置并授权

1. Azure 控制台顶栏搜索`应用注册`⇢ 新注册 ⇢ 受支持的账户类型填入`任何组织目录(任何 Azure AD 目录 - 多租户)中的帐户`⇢ 重定向 uri 填入 `http://localhost`⇢ 获取 `应用程序(客户端) ID (client_id)`

2.

- OneDrive 用户左管理栏 API 权限 ⇢ 添加权限 `offine-access`、`files.read.all`、`files.read.write.all`⇢ 左管理栏证书和密码 ⇢ 创建并获取 `客户端密码 client-secret`
- SharePoint 用户左管理栏 API 权限 ⇢ 添加权限 `offine-access`、`sites.read.all`、`sites.read.write.all`⇢ 左管理栏证书和密码 ⇢ 创建并获取 `客户端密码 (client-secret)` ⇢ 创建并获取 client-secret 和以下两项额外参数:

  - hostName: 你的 SharePoint Host，比如 `cos.sharepoint.cn`
  - sitePath: 你的 SharePoint 网站相对位置，比如 `/sites/cos`

  比如我的 SharePoint 访问网址为 `https://odbeet.sharepoint.cn/sites/beet`，则 `hostName` 值为 `odbeet.sharepoint.cn`，`sitePath` 值为 `/sites/beet`，这是最快判断上述两者取值的方法

3. 得到上述配置参数后，请保存好留作后用

#### 云平台配置并部署

> 请在以下三种平台中任选其一。此外，`.env` 文件包含各种敏感参数，sosf 默认把它列入 .gitignore。因此，推荐使用各平台提供的 cli 命令行导入, 而不要使用 git repo 导入

一. Leancloud 云引擎

> leancloud 不支持导入模板应用，所以配置相对麻烦

0. 配置机密型环境变量：

   ```bash
   git clone https://github.com/beetcb/sosf.git && cd sosf
   npm i
   npm run auth
   # 在此根据提示开始配置
   ```

   配置完成后，sosf 会创建一个 `.env` 文件，内容大致如下：

   ![.env](https://static.beetcb.com/postimg/22/env0.png)

1. 注册 Leancloud 开发板并进入控制台
2. 创建开发版应用并进入应用管理界面
3. 左储存栏结构化数据 ⇢ 创建 `class` ⇢ 名称填入 `sosf`，其它默认 ⇢ 点击该 class 名称，右栏添加行 ⇢ 获取此行的 `ObjectId` 值(比如 `d1d037116a8d1c4ad56017e9`) ⇢ 在项目根目录 `.env` 文件里新增

   ```js
   dbId = 6017e9d1d037116a8d1c4ad5
   ```

   这一步是为了持久保存访问 graph 的 `access-token`，因为 severless function 是无状态的

   此时 `.env` 状态大概是这样：

   ![.env db](https://static.beetcb.com/postimg/22/env.png)

4. 安装 lean cli ⇢ 登录 ⇢ 部署你的 sosf 项目

- [安装文档](https://leancloud.cn/docs/leanengine_cli.html#hash1443149115)
- [部署文档](https://leancloud.cn/docs/leanengine_cli.html#hash-1210017446)

5. 部署成功后，我们回到控制台，左设置栏域名绑定 ⇢ 在此绑定你的域名并配置 DNS

6. 访问地址示例：`https://domain.com/path/to/file.md`

二. Vercel 云函数

0. 配置机密型环境变量：

   ```bash
   git clone -b vercel https://github.com/beetcb/sosf.git && cd sosf
   npm i
   npm run auth
   # 在此根据提示开始配置
   ```

1. 注册[国际 Leancloud 开发板](https://console.leancloud.app/)并进入控制台
2. 创建开发版应用并进入应用管理界面
3. 左储存栏结构化数据 ⇢ 创建 `class` ⇢ 名称填入 `sosf`，勾选`无限制`，其它默认 ⇢ 点击该 class 名称，右栏添加行 ⇢ 获取此行的 `ObjectId` 值(比如 d1d037116a8d1c4ad56017e9) ⇢ 左设置栏应用 keys，复制 Credentials 下的前两个参数的值(AppID AppKey) ⇢ 在项目根目录 `.env` 文件里新增这三项 key-value，例如：

   ```js
   dbId = d1d037116a8d1c4ad56017e9
   AppID = rrdYFdniaMdYXbMMIUGUusc64SMJTevMY
   AppKey = IkoR0JGItmcYnyAsqoySF7Fc
   ```

   同样，dbId 是为了持久保存访问 graph 的 `access-token`，因为 severless function 是无状态的。而且由于我们在 vercel 里面访问 leancloud 的数据库，需要额外的验证值(AppID AppKey)

4. 安装 vercel cli 并登录：

   ```bash
   npm i -g vercel
   vercel login
   ```

5. 部署：

   ```bash
   vercel --prod
   # 按照提示完成部署
   ```

   到此部署完成，访问地址可以在命令行或 vercel 官网看到。需要使用自定义域名，请参考 [custom-domains](https://vercel.com/docs/custom-domains#)

6. 访问地址示例：`https://domain.com/?path=/path/to/file.md`

三. 腾讯云开发 tcb

0. 配置机密环境变量：

   ```bash
   git clone -b tcb-scf https://github.com/beetcb/sosf.git && cd sosf
   npm i
   npm run auth
   # 在此根据提示开始配置
   ```

1. 进入云开发[控制台](https://console.cloud.tencent.com/tcb) ⇢ 空模板 ⇢ 确保选择计费方式`包年包月`, 套餐版本`免费版`(这样能够确保免费额度超出后不继续扣费) ⇢ 进入控制台
2. 环境总览下复制 `环境 ID(envId)` ⇢ 并改动本地代码中 `cloudbaserc.json` 中的 `envId`
3. 安装 tcb cli 并授权登录：

   ```bash
   npm i -g @cloudbase/cli
   tcb login
   ```

4. 部署云函数：

   ```bash
   tcb fn deploy
   ```

5. 指定 HTTP 访问路径：

   ```bash
   tcb service create -p / -f sosf
   # 让函数在根目录触发
   ```

6. 等待几分钟，就可以开始预览了，访问示例：`https://domain.com/path/to/file.md`

### 特别鸣谢

- [Tencent tcb](https://github.com/TencentCloudBase)
- [LeanCloud](https://github.com/leancloud)
- [Vercel](https://github.com/vercel/vercel)
