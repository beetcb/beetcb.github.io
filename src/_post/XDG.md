---
layout: post
title: XDG 约定，与软件拉个勾
author: beet
post: '@18@'
date: 2020-08-24 09:50:04
nailimg: https://m.beetcb.com/postimg/17/download.jpeg
tags: linux
---

昨天在 youtube 摸鱼的时候，无意间发现了 luke 在用的神器，下面是介绍 `XDG 规约` 的一篇博文，一头雾水 🙄？请看下文：👇

### `$HOME`

都说回家的感觉真好，可是如果你和我一样使用的 `*unix` 系统：

```shell
# 回家
cd
# 看看家里情况
ls -ah
```

啊，一团糟！！！你会发现各种 `.***` 文件（夹），大家习惯性称为 `dotfiles`，像垃圾一样填充着你的 `$HOME`，真想一口气全部删掉 ...

### 别急，有 `XDG`

我猜你是一个理智的人，一定不会 `rm -rf .*` ，`dotfiles` 虽然多、杂、乱，但是十分重要 ，往往是各种程序的 `用户配置文件` ，这就是可恶之处 🤐
还好有 `XDG` （`XDG Base Directory`） ，这个规范定义了程序的相关文件应该被放置在什么地方，下面是此规范的简洁介绍（可以用来优化 dotfiles 的部分）：

- `$XDG_CONFIG_HOME` 环境变量所指代目录是所有用户配置文件的归属，默认设为 `$HOME/.config`。
- `$XDG_DATA_HOME` 环境变量所指代目录是所有用户数据文件的归属，默认设为 `$HOME/.local/share`。
- `$XDG_CACHE_HOME` 环境变量所指代目录是程序为用户缓存的文件的归属，默认设为 `$HOME/.cache`。
  bulabula ... 简单说，大部分现代程序都遵守这个约定，拿 neovim 来说，他的默认配置文件位于 `.config/nvim/` 目录下。
- 常见的支持 XDG 的程序还有：yarn、fish 、Emacs 、Git 等等 ...
- 不要意外，不支持的也有蛮多的：zsh、vim、bash（哈哈，当然）...
  想了解更多的 XDG 兼容性，可以参考 [Arch linux](https://wiki.archlinux.org/index.php/XDG_Base_Directory) 或者相关程序的文档，看看他们的环境变量情况。

### 支持的程序示例

我看了看我的 git 配置，很遗憾，它还是在 \$HOME 目录下，从这个 [commit](https://github.com/git/git/commit/0d94427) 可见它是支持 XDG 的，我还专门去官方文档去逛了逛:

> ~/.gitconfig or ~/.config/git/config file: Values specific personally to you, the user. You can make Git read and write to this file specifically by passing the --global option, and this affects all of the repositories you work with on your system.

所以我们要做的就是移动它到 `$XDG_CONFIG_HOME/git` 目录下，比如：

```shell
$ mkdir -p ~/.config/git &&
mv ~/.gitconfig $_/config
```

再尝试配置 `~/.config/git/config` 文件，用 `git config list` 测试一下，配置成功。如此，其他程序也可以依照此过程从 \$HOME 根目录搬家。

### 算是支持的程序示例

zsh 是不支持 XDG 的，所以需要绕一下圈子：

```shell
# 创建此文件更改 zsh 的环境变量
$ nvim ～/.zshenv
# 此文件内重新修改环境变量
export ZDOTDIR=$XDG_CONFIG_HOME/zsh
```

配置完 zsh 后，你会发现其他好多程序都要类似地设置环境变量，所以可以集中处理，（借用 luke 的 idea）在 ~/.zshenv 里 source 设置环境变量的文件。

- `~/.zshenv`

  ```shell
  #!/bin/zsh
  # loading environment variable
  . "~/.config/env"
  ```

- `~/.config/env`

  ```shell
  #!/bin/sh
  # for those(os) who dont support XDG
  export XDG_CONFIG_HOME="$HOME/.config"
  export XDG_DATA_HOME="$HOME/.local/share"
  export XDG_CACHE_HOME="$HOME/.cache"

  # set basic environment variables
  # npm: `npm config ls -l | grep /` > ensure env settings
  export NPM_CONFIG_USERCONFIG=$XDG_CONFIG_HOME/npm/config
  export NPM_CONFIG_CACHE=$XDG_CACHE_HOME/npm
  export NPM_CONFIG_TMP=$XDG_RUNTIME_DIR/npm

  # zsh related
  ## enhancd
  export ENHANCD_DIR=$XDG_CACHE_HOME/enhancd
  ## zsh
  export ZDOTDIR=$XDG_CONFIG_HOME/zsh
  ## zplug
  export ZPLUG_HOME=$XDG_CONFIG_HOME/zplug
  ```

上面是我个人设置的环境变量，有 zplug zsh enhancd npm 这几个，后期遇到有不支持 XDG 的直接添加到这里（如果可以的话，比如 bash 类的就不行）。
总之，保持 \$HOME 整洁对我而言还是很重要的（尽管生活中可能不是 😂），在此花了较多时间，不过以后管理备份同步 dotfiles 变得更加方便了，是值得的。
