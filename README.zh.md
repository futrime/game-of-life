# 康威生命游戏

[English](README.md) 简体中文

超有趣的康威生命游戏(Game of Life)实现，基于Javascript、Canvas和dat.GUI.

[演示](https://futrime.gitee.io/game-of-life)

#### 介绍
生命游戏是英国数学家约翰·何顿·康威在1970年发明的细胞自动机，并被证明了图灵完备性。它最初于1970年10月在《科学美国人》杂志中马丁·葛登能的“数学游戏”专栏出现。其原理十分简单，即在一个二维平面上生存着若干个细胞，其在下一时刻存活与否取决于周围8个格子内细胞存在情况，具体规则如下：

* 如果周围8格内有2个细胞，则此格保持原状态。
* 如果周围8格内有3个细胞，则此格出现细胞（或保持有细胞状态）
* 如果周围8格内细胞数量小于等于1或者大于等于4，则此格细胞因为孤独或过于拥挤而变为空格（或保持空格状态）

棋盘理论上无限大，但是囿于实际情况，只能做到尽量大。本项目是康威生命游戏的Web实现，运用纯净的Canvas和dat.GUI图形用户界面库。

#### 使用说明

* 如果不想自己配置，可以直接访问 [已经配置好的演示](https://futrime.gitee.io/game-of-life) 。

1. 修改`script.js`中 *const* 开头的相关参数。
1. 运行`index.html`，可以在右上角控制栏调节各种参数。
1. 选择适合的样式，在地图上点击即可放置。

#### 如何建立自己的Collection

Collection是一堆生命游戏样式的集合，可以在使用时被加载并被选择放置在地图上。

你可以参照 `collection.js` 的格式建立自己的Collection，并且在 `index.html` 插入你的Collection脚本、 `script.js` 里面对应的参数 `collection` 即可。

你也可以按照 `translator.py` 的指示，建立Plaintext文件(.cells)，然后用 `translator.py` 转换为对应的Collection脚本。

请不要打开 `all.js`，文件很大，可能会导致计算机系统崩溃。

#### 参与贡献

1. Fork 本仓库
2. 新建 feature/xxx 分支
3. 提交代码
4. 新建 Pull Request
