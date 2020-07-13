---
layout: post
title: Git 快扶我入门
author: beet
top: false
cover: true
toc: true
mathjax: false
post: 4
date: 2020-04-28
nailimg: https://www.nelsonkmc.com/img/github-logo.jpg
coverImg:
password:
summary: git getting started 我在Pluralsight学过的git课程，做个总结
tags:
- git
- github
categories:
- git
keywords:
- git教程
- git入门
---



> 我正在 <code>pluralsight</code> 上学习 Git 原理 ，先写一篇文章总结一些简单的 <code>git基础</code> 吧！
>
> 本文部分图片引用自：
>
> [getting-started-git](https://app.pluralsight.com/library/courses/getting-started-git/table-of-contents)

#### Git简介

##### 

##### 0. Git不仅仅为开发者服务

Git完美适配开源：*Linus Torvalds* 大佬写出Git的目的也是为了对自己linux开源项目的管理，再加上github，git也成为开源项目必备协作工具。

Git作为现在最流行的**版本控制系统**(VCS) ，不仅用于开发，还用于项目管理、团队合作、学校事务等；此外，掌握Git，编程能力并非刚需。

总之，如果你想追踪项目的更改，提升多项目管理效率，就适合学习Git。

##### 1.分散式与集中式

把 git 再精确一点说，他是 `分散式版本控制系统`  ：可以一台电脑做版控、可以没网络做版控、还可以找台 git 服务器一群人做版控

与之对比的是 `集中式版本控制系统`  比如CVS、SVN，必须依赖一台集中处理版本的服务器，不联网（准确是不连接服务器）就不能做版控。

##### 2. 它可能是个时光鸡吧

Git 为记录文件更改而设计，它能还原之前版本的项目或文件，并清楚呈现各种更改的对比。对，当你用好了Git ，你就拥有了一台<code>时光鸡</code> 。

先预告一下它时光鸡的功能（前提：此目录是一个git目录）：

##### 3. 理解文件更改的三种状态(git tracked)

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/p1.png)

Git 已追踪文件的状态（注意`untracked`：未被git追踪的状态）


**<code>Modified</code>** 

更改中&未准备commit&还可添加更多更改

**<code>Staged</code>** 

暂存&准备commit

**<code>Committed</code>** 

写入历史记录的更改

> 实际上在一个 Git 项目中，文件还有一个<code>untracked</code> 状态。Git 参与这种状态的文件的管理

> 冷门的几个文件状态：
>
> - deleted ：已在工作区删除，只有 git add 之后git才会真正帮你删除
> - 

##### 4. 理解 Git 工程的三种状态

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/p2.png)


**<code>Working Directory</code>**

工作区，不进入staging area的更改不会被commit

**<code>Staging Area（index）</code>**

暂存区，储存想要 commit 的更改

**<code>.git Directory</code>**

把更改写入历史 也就是commit之后所处的状态

通常也说成生成项目的 **snapshot**


#### 开始Git之旅（不严谨的睡前故事,）

一切从小胖开始...

在某个人人都用git的国度里，小胖要交一份英文作文（假如你是李强...），于老师批改，来看他的操作（看完这个故事，你应该可以去<code>github</code> 帮大佬们贡献代码改 bug 了，内含pull request 和 merge）

先google 一份学霸作文，用某 seo 伪原创工具替换关键词，"写"成了一篇新的文章

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/lq.png)

打开命令行（git  bash） ，git it ！！！（含完整返回结果作参考）

``` bash
# fork 老师的作业仓库到自己的账号下，因为老师不可能给我仓库的访问权
# fork 后我（小胖）的 repo 为 https://github.com/beetcb/teacher.git

$ cd cheat_english

$ mkdir git_example

$ cd git_example

$ git init
Initialized empty Git repository in E:/cheat_english/git_example/.git/
# 初始化本地仓库

$ git clone https://github.com/beetcb/teacher.git
remote: Enumerating objects: 9, done.
remote: Counting objects: 100% (9/9), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 9 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (9/9), 1.46 KiB | 10.00 KiB/s, done.
From https://github.com/beetcb/teacher
 * branch            HEAD       -> FETCH_HEAD
# 拉取最新的repo信息到本地 ，经常还会用到 git pull 用于更新并与本地merge
 
$ echo "xipangs hard_work" >> hard_work_by_xiaopang.md
# 做作业

$ git add .
warning: LF will be replaced by CRLF in hard_work_by_xiaopang.md.
The file will have its original line endings in your working directory
# 把作业放到暂存区（此warning 是linux和windows的锅，可暂时忽略）
# 或者使用 git add hard_work_by_xiaopang.md

$ git commit -m "hard_work_by_xiangpang"
[master ddfa044] hard_work_by_xiangpang
 1 file changed, 1 insertion(+)
 create mode 100644 hard_work_by_xiaopang.md
# 确认需要提交该作业

$ # 一切准备就绪  交作业了

$ git remote add origin https://github.com/beetcb/teacher.git
# 建立与github的连接 origin只是默认名字，可更改

$ git push -u origin master
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 8 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 340 bytes | 340.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/beetcb/teacher.git
   ea2bb71..ddfa044  master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
# 正式提交到repo

$ # 提交完还得检查一下

$ start https://github.com/beetcb/teacher
# 打开repo查看作业 嗯 写滴不错
# 然后回到 github 点击右边绿色的 [Compare & pull request]即可提交申请
# 老师看到小胖的作业，先merge ，再批改。
# 小胖想查看修改后的作业，只需更新下 fork 源（网上很多教程），就行了
```



以上故事纯属虚构，如有雷同，怎么可能会有？

**好了，进入正题:**

##### Git 之外[在命名行操作的必备命令]

|     COMMAND      |            explain             |
| :--------------: | :----------------------------: |
|                  |                                |
| <code>pwd</code> |    print working directory     |
|                  |                                |
| <code>cd</code>  |    change working directory    |
|                  |                                |
|      ls/dir      |    list files or directory     |
|                  |                                |
|   touch/mkdir    | creat new emply file&directory |
|                  |                                |

##### 安装 Git

###### linux

``` bash
sudo apt-get install git
# debain
sudo yum install git
# fedora
```

###### Windows  & mac

[下载链接](https://git-scm.com/) — 手动安装 & 或如下命令行

``` bash
brew install git 
# mac only
```

##### 配置 Git

设置全局身份

``` bash
git config --global user.name "beet"
# 设置全局用户名
git config --global user.email "sweetcbebe@gmail.com"
# 设置全局邮箱
```

已在用git？显示配置信息

``` bash
git config --list
git config user.name
```

不小心忘记了Git命令？

``` bash
man git 
# git 全指南
git help
# git 简化指南
```

##### 本地创建 Git 仓库

**新建repo **

``` bash
git init 
# 初始化当前所在目录
git init [new dir]
# 新建new dir 文件夹并初始化
```

在此repo下会创建<code>.git</code> 文件夹，保存了所有git的用于版本控制的信息

引用stack overflow的介绍 ，<code> .git</code> 目录主要包含

> <code>4 sub-directories:</code>
>
> - hooks/ : example scripts
> - info/ : `exclude` file for ignored patterns
> - objects/ : all "objects"
> - refs/ : pointers to commit objects
>
> <code>4 files:</code>
>
> - HEAD : current branch
> - config : configuration options
> - description
> - index : staging area
>
> <code>Here "object" includes:</code>
>
> - blobs(files)
> - trees(directories)
> - commits(reference to a tree, parent commit, etc)

**本地拉取云端项目**

``` bash
git clone [url] [directory]
# 克隆master到自定义目录
git clone -b [branch][remote_repo]
# 克隆branch分支
git pull [url]
# 把本地项目更新 相当于git fetch +git merge
```

#####  Git repo 云托管

几个有名的 Git 托管服务 <code>Github</code> <code>Gitlab</code> <code>Bitbucket</code> 

以Github 为例，首先完成 <code>sign up</code> 、<code>creat new repository</code>  

先看看Github 官方中文作弊表

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/git-cheat-sheet.png)

###### https / ssh 安全管理

两者区别，详见 

> [Which remote URL should I use?](https://help.github.com/en/github/using-git/which-remote-url-should-i-use)

#### 还有很多 Git 命令

先来张图压压惊

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/git-doc.png)

好吧好吧，来张常用的

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/p3.png)

前面已经提过了 <code>init</code> <code>clone</code> <code>pull</code>  <code>add</code> <code>commit</code>   <code>push</code>  

先列举几个我用到的

**<code>git commit -a -m "somemessage"</code>**

 git add 同时 commit  （untracked 状态的文件不会被commit  ，例如新建的 new.txt 文件，会出现如下结果）

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/gita.png)

**<code>git status</code>**

显示工作目录和暂存区的状态

还有一个显示仓库名的小命令 <code>git remote show</code>  默认仓库名在 remote add 时定义，很有可能会忘掉，此命令为健忘正解。

**<code>git tag</code>**

**为分支、版本打标签**

``` bash
git tag [tagname] [commitid]
# commitid 可选，留空则为最新commit
git push origin master --tags
# push 所有标签
```



**<code>git reset/checkout/revert</code>**

三者都可进行撤销操作，详见：

[代码回滚：Reset、Checkout、Revert 的选择](https://github.com/geeeeeeeeek/git-recipes/wiki/5.2-代码回滚：Reset、Checkout、Revert-的选择)

这张图太直观了，必须放上来（git reset 对比）

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/p5.png)

**<code>git diff</code>**

**比较工作目录中当前文件和暂存区域快照之间的差异**

例如：git diff --staged

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/p4.png)



**<code>git log</code>**

显示 commit 历史 (完全显示hash 、author、date)

用不同的git log 命令，可以精确显示你想要的信息

``` bash
git log -6
# 只显示最近 6 条 commits
git log --onelist
# 简化显示
git log --stat
# 次详细——显示文件更改
git log --patch
# 最详细——显示文件内容更改
```





**<code>git rm/mv</code>**

简单删除和重命名

**git rm didntwantfiles**

不被Git 所追踪的同时删除了文件

**git rm -cached didntdelete**

不被Git 所追踪的同时不删除文件

**<code>git mv prename.md ranametheprename.md</code>**

改名 prename.md 为 ...

#### Git的分支系统

单纯的用文字描述容易被绕晕，我推荐这个在线网站，通过可视化的图片理解Git branch

[visualizing-git](http://git-school.github.io/visualizing-git)

你可以尝试这几条命令入门

分支相当于<code>自立门派,相当于贴纸一样附在commit上面</code> , 不影响主分支，更不会影响commit物件

``` bash
git branch
# 查看所有分支
git branch new_branch_no_checkout
# 创建新的分支[new_branch_no_checkout] 但未切换
git checkout -b new_branch
# 创建并切换到 [new_branch] 分支
git checkout master
# 切回主分支
```

#### issues

目前遇到两个问题，解决也很简单

##### 1.push rejected

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/i1.png)

解决：[git error: failed to push some refs to remote](https://stackoverflow.com/questions/24114676/git-error-failed-to-push-some-refs-to-remote)

##### 2.remote denied

![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/i2.png)

多数情况下是在用https push 时出现

原因可能是你更换了账户，而win 保存了原账户的用户名密码，自然不匹配

解决：<code>使用ssh</code>  或者 <code>修改git 凭据</code>

**修改git 凭据的方法** （win）

控制面板 用户账务 凭据管理器  管理win 凭据 修改对应凭据

 ![](https://cdn.jsdelivr.net/gh/beetcb/pic/a5/i22.png)

#### 道阻且艰

除了这些，还有其他的更多命令，更要理解Git 的原理，了解它是如何工作的，提升工作效率和问题解决能力。

我觉得必须掌握的还有 commit 的规范，优秀的commits 会让我们的生活没有那么难。<code>Chris Beams </code>的博客写好了七个最重要的commit指南，一起学习吧！。

> https://chris.beams.io/posts/git-commit



<cite>行文仓促，望指正</cite>