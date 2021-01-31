---
layout: post
title: 刷机pixelExp，获得原生安卓体验
author: beet
post: '@16@'
date: 2020-08-06
nailimg: https://static.beetcb.com?path=/nailimg/google.png
tags: share
---

> 本文记录 beet 尝鲜 `pixel experience` 的小小体验

<video class="responsive-video" controls="">
    <source src="https://tcxz.coding.net/api/share/download/f2bc2dc5-7ea5-40e6-b193-21536714e62c" type="video/mp4">
</video>

### 为何重装系统

最近接触了某些个流氓应用，功能及其简单，却一再索要各种权限，体验极其不佳，手机迟早要被它们玩透支。所以是时候 root 一下，夺回主权。

root 中解锁 `bootLoader` 必须格式化，于是指引我想到换一个干净的 ROM 来替代我用惯的 `OOS` (一加手机的国外 ROM )

### `pixel experience OS?`

`pixel experience OS?` 提供类 pixel 的原生安卓体验，自带谷歌全家桶。还有，它是开源的自定义 ROM ，拥有无限可能。

> 国内大多数手机厂商预装的都是自定义 ROM，不开源而且大部分阉割 GMS 和谷歌全家桶( 因为国情，也没有办法 )
> ![wiki](https://static.beetcb.com?path=/postimg/16/1.png)

所以，安排！！！

### 预备（备份、环境、下载）

#### 1.备份、设置

备份手机内容（尽量规避手机系统自带的备份，以免不能恢复）

进入开发者选项 => 打开`usb调试` 和`OEM unlocking`

#### 2.`SDK`&&`Fastboot`调试环境

> 简单说：这一步允许我们通过电脑调试手机，完成一些高级设置

建议新手直接下载安装工具包：[UniversalAdbDriver](http://download.clockworkmod.com/test/UniversalAdbDriverSetup.msi)
可以直接获得 `sdk` 和 `fastboot` 这两个调试工具，在电脑上构建调试环境。

linux 或者 macos 可以参考 [minimal_adb_fastboot](https://github.com/simmac/minimal_adb_fastboot)

如果你是安卓开发者，已有 SDK 环境，那自然不必执行上一步操作了。

### 解锁 bootloader

#### 1.重启进入 bootloader

通过数据线连接手机(确保手机允许电脑的验证)，打开命令行：

```bash
adb reboot bootloader
# 如果顺利执行，命令行则不会有任何输出，手机会自动重启
```

此时不要操作手机，再次输入：

```bash
fastboot oem unlock
# 如果顺利执行，会返回成功提示
```

成功解锁手机！接下来，需要一个易操作的恢复程序来帮助我们安装系统——TWRP

### 下载 TWRP、ROM、Magisk

> TWRP 提供安装的环境，而我们需要刷入的主体就是 pixel experience, magisk 则是 root 工具

`TWRP` 和 `pixel experience ROM`
两者都需要去[官网](https://download.pixelexperience.org/)按照对应机型下载，注意前者需要下载`.img`镜像用于加载（也可以下载压缩文件进行安装，我就不装了）

Magisk 则可以到官方 repo 的 releases 页面下载最新版 => [地址](https://github.com/topjohnwu/Magisk/releases)

三者最好放到电脑上同一个文件夹，方便命令行操作

### 正式刷入 ROM + Magisk

#### 1.刷入 ROM

```bash
adb reboot bootloader
# 再重启进入bootloader
fastboot boot path/to/twrp.img
# 加载TWRP构建恢复环境
adb sideload path/to/rom.zip
# 把电脑上的rom传输到手机的同时进行刷入
```

安装完成后，选择 `reboot`-> `bootloader`，再安装 magisk

```bash
fastboot boot path/to/twrp.img
# 加载TWRP构建恢复环境
adb sideload path/to/magisk.zip
# 安装magisk
```

安装完成后，选择 `reboot`-> `system`，重启进入系统。恢复备份。

至此，刷机和 root 已经完成，可以当成 pixel 把玩啦！！！

> 题外话：前面提到的权限管理，可以通过 `App Ops` 给程序提供假权限，干掉那些不给权限不给用的流氓软体
