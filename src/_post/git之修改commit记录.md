---
layout: post
title: Git之修改commit记录
author: beet
post: '@11@'
date: 2020-06-22 19:50:04
nailimg: https://static.beetcb.com/nailimg/git.png
tags: git
---

> 在很多影视作品里，就算主人公乘上了时光鸡，还是无法修改历史（或者说修改后造成十分严重的后果）；而现在，在 Git 的强力驱动下，修改历史变得简单又相对安全。
>
> 本文叨叨修改 commit 历史的问题

#### 应用场景

① 刚刚的提交不小心打错了 👋 能更改吗？

比如`Sun of a Beach with canvas` 写成了 `son of a b**ch with canvas`

② 刚刚的提交漏掉了文件 👋 能追加吗？

③ 以前写的 commit 很菜 👋 能更改吗？

可能你的 commit 是这样的 :

`fix bug`

`fix another bug`

`fix final bug`

`oh anotherOne wtf?`

![](https://static.beetcb.com/postimg/11/1.png)

#### 魔法一：git coomit --amend -m ''🃏

对于场景 ①，可以这样急救

```bash
git coomit --amend -m 'Sun of a Beach with canvas'
```

**实际效果图**：

![](https://static.beetcb.com/postimg/11/2.png)

如果没有加 <code>-m</code>参数的话，会弹出 vim 让你编辑最近一次的 commit

**注意**：

- <code>--amend</code> 只能修改最近的一次 commit
- 最近的那一次 commit 物件的 SHA1 被新的 SHA1 值替代，因为对于 `commit 物件` 来说它的内容发生了改变
- commit 的时间并未被修改，因为时间作者信息是由 `tree物件` 储存，文件、文件目录结构啥都没变，tree 物件不可能变化

同时，对于场景二 ，<code>--amend</code> 也能处理

```bash
#先把漏掉的文件加入缓存区
git add careless.less
#再使用--amend参数进行commit,下面--no-edit 表示保留原有message信息
git commit --amend --no-edit
```

注意：

- commit 的时间并会发生变化

#### 魔法二：git reset🃏

对于场景 ②，另一种处理方式是<code>git reset</code>指令

<code>git reset</code>指令是跳回之前的某次 commit （而非字面重置的意思）

> 附加知识：定位到那一次 commit 的多种方式
>
> - 通过 HEAD 或当前分支（比如 master） => 像贴纸一样指向当前的 commit，
>
>   再加上 <code>^</code> 表示当前 commit 的前一次 ，或者<code>~n</code> 表示当前 commit 的前 n 次
>
> - 通过 SHA1 值的简写 => 比如 `e2d2873`

所以可以退回到之前的 commit => 重新添加文件 => 再次 commit

退回上一次的 commit 的三种写法：

```bash
git reset e2d273 #opt1：利用上一次的SHA1简写值
git reset HEAD^ #opt2: 利用HEAD
git reset master^ #opt3: 利用当前所在分支
```

**实际效果图**：

![](https://static.beetcb.com/postimg/11/3.png)

#### 魔法三：git rebase🃏

对于情景 ③，当你写了‘折磨多’无用 commit，别急着删掉 .git 目录 👻；先试试 <code>git rebase</code>(只涉及到 rebase 附加的一个小小的应用，在接下来的应用中可以想象成 HEAD 一直顺着 commit 往下走，遇到非`pick` 的 commit 就会停下来，等待你操作这个 commit)

##### 1.git log 看看现有的 commit

```javascript
git log --oneline
```

![](https://static.beetcb.com/postimg/11/4.png)

##### 2.确定操作的范围

```javascript
git rebase -i 4d11e38
#此处-i表示interactive 交互式的rebase过程
```

![](https://static.beetcb.com/postimg/11/5.png)

##### 3.把需要修改的 commit 前面 <code>pick</code> 改为 <code>r</code>

![](https://static.beetcb.com/postimg/11/6.png)

保存并退出 vim 编辑器

##### 4.正式修改 commit

`go to jail` 改成 `go to party` 是不是潇洒的多呢 🐶

退出保存后，再次查看 commit

![](https://static.beetcb.com/postimg/11/7.png)

我们再重新看看这张图，

![](https://static.beetcb.com/postimg/11/8.png)

细心的你有没有发现 除了可以 `r`(也就是 reword commit) 还有很多强大的操作，这里举两个栗子：

- `e` ：edit commit ，可以实现对 commit 的高级修改：比如干掉这个 commit，重新提交
- `s` ：squash commit，可以实现合并多个 commit：会向更早的邻居 commit 物件去合并，同时会给你修改 message 的机会
- `d `：drop commit ，把它丢掉=> 把这个 commit 删除
- 另外一个骚操作：只要在 rebase 弹出的编辑器里面手动修改 commit 行的位置，就可以实现`修改commit的顺序`的效果。同理啦，删掉某一行也就实现了`删掉了这个commit`的效果

#### 你可能会想：reset 回去改 commit 信息

> 既然 <code>git reset</code> 可以跳回之前的 commit ，两次相反的 reset 不就回到了当前提交吗？

> 对于情景 ③，利用这一点，我们可以依次跳到各个 commit ，搬砖 ... 最后利用 <code>git reflog</code> 查找 commit 信息跳回来

但是，新的 commit 物件并没有被之后的 commit 所指到 ，当你再次 reset 回去的时候，一切还是原来的样子。不信你看

![](https://static.beetcb.com/postimg/11/9.png)

除非你愿意去手动修改 commit 的指向，可能会生效吧

#### 但是

如果是真实开发的话，已经 push 出去的 commit 不要修改了（会引发许多麻烦），就让往事都随风吧 o((>ω< ))o。

![](https://tvax4.sinaimg.cn/large/005K67iLgy1gg1fq053dsg30dw092whw.gif)
