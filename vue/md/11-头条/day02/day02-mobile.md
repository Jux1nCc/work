# day02-mobile

## 概述

### 复习

webpack:

+ 为什么要学习 webpack：因为 webpack 是 vue-cli 的底层实现
+ webpack 是什么：

准备工作：

+ 使用 js 完成一个计算器

+ 模块化的思想来封装这个计算器

  + 问题： 浏览器无法解析模块化的关键字

  + 方案：使用 webpack 将项目进行打包

webpack使用：

+ 基本使用
+ 添加配置文件

配置项：

+ 入口
+ 出口
+ 模式
+ 解析：
  + 别名
  + 扩展名
+ source map（源码映射）

+ 相关的配置项有很多：[详情请见官网](https://www.webpackjs.com/configuration/)

loader：

+ 打包 css：style-loader css-loader
+ 打包 less：less-loader
+ 打包 sass：sass-loader
+ 打包图片：file-loader
+ 打包字体：file-loader
+ 打包 es6 为 es5：babel-loader
+ 打包 .vue：vue-loader

+ 相关的 loader 很多：[详情请见官网](https://www.webpackjs.com/loaders/)

plugin：

+ html-webpack-plugin
+ cleanwebpckplugin
+ webpack-dev-server
+ 热更新
+ 相关的 plugin 很多：[详情请见官网](https://www.webpackjs.com/plugins/)

### 今日内容

# 黑马头条

## 准备工作

### 准备工作 - 预览项目

[在线地址传送门](http://toutiao.research.itcast.cn/#/login) 

建议：下载一个今日头条 App

项目内容：

+ 登录页面
  + 默认帐号 & 验证码
    + 13911111111
    + 246810
+ 首页
+ 搜索页面
+ 搜索结果
+ 文章详情
  + 文章的评论 & 评论的回复
+ 我的页面
+ 个人信息
+ 小智机器人

### 准备工作 - 项目开发流程

阶段：

+ 产品经理：
  + 分析需求：
    + 整理出一个需求文档
  + 绘制流程图
  + 绘制原型图
+ 视觉设计师（ui）
  + 以原型图为基础
    + 设计出来设计稿
+ 项目经理
  + 根据需求文档
    + 整理出一个开发文档
+ 后端工程师：
  + 根据开发文档
    + 开发接口
+ 前端工程师：
  + 根据设计稿
    + 完成静态页面
  + 根据开发文档
    + 完成数据渲染
+ 测试小哥哥（小姐姐）
  + 测试项目的 bug
+ 运维
  + 发布上线

注意点：

+ 在实际开发过程中可能我们的开发环境会比上面要少一个到多个环节

### 准备工作 - 前端的职责

+ 负责：
  + 根据设计稿来书写静态页面
  + 根据接口文档来调用接口渲染数据
+ 需要准备的材料：
  + 设计稿
  + 接口文档

### 准备工作 - 技术的选型

> 一般技术造型是由项目的负责人来负责的

主体技术：

+ vue

其它技术：

+ 搭建项目结构： vue-cli
+ 管理路由：vue-router
+ 管理页面上的全局数据：vuex
+ 发送网络请求： axios
+ 完成页面结构的搭建：vant
  + 它是基于 vue 的组件库
  + 它是移动端的组件库（自动适配屏幕）
+ ....

## 搭建项目结构

### 搭建项目结构 - 使用脚手架来搭建项目(vue-cli)

步骤：

+ 1.0 在桌面上打开终端
+ 2.0 使用终端创建一个项目
  + 执行指令： `vue create heimatt`
    + 生成项目时选择： ` Manually select features`
    + 选择自己项目中需要用到的特性： `babel、vuex、vue-router、css Pre-process、eslint`
    + 是否开启 `history` 模式
    + 选择一个 css 预处理器
    + 选择 eslint 的校验时机
    + 设置保存特性的位置
    + 将以上操作保存为单独的选项
    + 设置选项的名称
    + 下载项目

注意点：

+ 1.0 以前在使用 vue 创建项目时，只用到了 default 选项

+ 2.0 将选好的特性保存为一个单独的选项之后：

  + 这个选项会出现在

    ![1585798751388](img\1585798751388.png)

问题：

+ 1.0 项目创建好了，但是不知道在哪里

  + 一般在终端中创建出来的项目都在终端现在处于的位置中

+ 2.0  cmd 与 powershell 的区别

  + CMD 与 powershell 一样都是终端，也都是 window 系统自带的

+ 3.0 怎么打开 powershell

  + 方式 1：
    
+ 在桌面 : shift + 右键 ----> 在此处打开 powershell
    
  + 方式 2：
    + window + R  ---> 输入  powershell 
    
    + 切换到桌面
    
      ![1587543718131](img\aabb)

### 搭建项目结构 - lint ***“标准”*** 规范

> 创建项目时选择的特性有：
>
> > babel： 将 es6 转为 es5 的语法
> >
> > Router: 在项目中使用 vue-router
> >
> > Vuex：在项目中使用 Vuex
> >
> > CSS Pre-processors：使用  css 预处理器
> >
> > Linter：说明这个玩意儿

Linter

+ 作用：用来规范 js 的写法。它就是一个规范

+ 类型：
  + Airbnb：爱彼迎规范
    + 是国外的一家叫 `爱彼迎` 的公司出产的规范
  + Standard：标准规范
    + 这种规范的名字叫做 `标准`

Standard 具体规定：[传送门](https://github.com/standard/standard/blob/master/docs/README-zhcn.md)

+ 1.0 缩进使用两个空格

+ 2.0 字符串使用单引号

+ 3.0 句未不能以分号结尾

+ 4.0 行首不要以 (, [ 开头

+ 5.0 关键字后面必须加空格

+ 6.0 函数名后面必须加空格

+ 7.0 不要有冗余的变量

+ 8.0 使用 `===` 替换 `==`

+ 9.0 使用浏览器全局变量时加上 window 前辍

+ 10.0 注释的双斜杠后面必须加一个空格

+ 11.0 行未千万不加空格

+ 12.0 每个文件结束之后必须添加一个新的换行

+ 13.0 空行不能同时存在多个

注意点：

+ 如果错误过多，可以使用一个指令来一次性将错误全部修复：`npm run lint --fix`
  + 这个指定有个限制：只能帮助我们修改语法错误，不能帮助我们修改代码
+ 使用了这个 `标准` 规范之后，不要再使用 vscode 中的格式化快捷键

作业：

+ 在网上可以找到自动修复语法错误的方法，大家自动解决试试

### 搭建项目结构 - 项目的运行流程

静态页面：

+ `public/index.html`：用来显示内容
  + 提供了一个  id="App" 的容器

逻辑代码：

+ 入口： `src/main.js`
  + 导入了 `Vue` & `App.vue` & `router` & `store`
  + 创建一个 Vue 实例：
    + 挂载了  `router` ： vue-router
    + 挂载了 `store`： vuex
    + 将 `App` 根组件渲染到了 Vue 实例中
    + 将 `vue` 实例挂载到页面上  id="App" 的容器中
+ 根组件： `src/App.vue`
  + 标准的 `.vue` 文件：
    + template
    + script
    + style
+ 路由： `src/router.js`
  + 创建路由信息
+ 仓库： `src/store.js`
  + 创建 `仓库` 对象

### 搭建项目结构 - 改造项目结构

删除不需要的文件：

+ 将 `compoents` 下面的所有内容全部删除
+ 将 `views` 下面的所有内容删除
+ 将 `App.vue` 中的内容全部清除，只留下一个 `<router-view></router-view>`
+ 将 `router.js` 中导入的路由文件删除，清空路由信息

添加文件夹：

+ `api`：管理所有的网络请求
+ `style`：管理所有的全局样式
+ `utils`：管理所有的自己定义工具类
+ `router`：管理路由
  + 将 `router.js` 添加到 `router` 目录下，并且改名为 `index.js`
+ `store`：管理仓库
  + 将 `store.js` 添加到 `store` 目录下，并且改名为 `index.js`
+ assets：管理所有的静态资源
+ components：管理全局的组件
+ views：管理当前项目中的页面组件

## vant

> [官网传送门](https://youzan.github.io/vant/#/zh-CN/)
>
> 作用：轻量、可靠的移动端 Vue 组件库 

### vant - vant 的使用 

使用步骤：

+ 1.0 安装 vant ：`npm i vant -S `

+ 2.0 导入组件（导入所有组件的方式）

  ```js
  import Vue from 'vue'
  import Vant from 'vant'
  import 'vant/lib/index.css'
  // 使用 vant
  Vue.use(Vant)
  ```

+ 3.0 使用 vant

  + 单独创建一个 .vue 文件来使用

使用 vant 中的组件：

+ 按钮的使用：

  ![1585816446710](img\1585816446710.png)

+ 单元格的使用

  ![1585816596050](img\1585816596050.png)

+ icon 图标的使用

![1585816755001](img\1585816755001.png)

### vant - vant 中的插槽

> 如果需要在 cell（单元格之内添加其它的图标），必须使用插槽

总结：

+ 将要使用插槽的组件，从单标签改为双标签
+ 添加一个容器 `template`
+ 给 `template` 添加插槽的属性: `#title` & `#default`
+ 在 `template` 标签之中添加内容

## 登录

### 登录 - 用户故事

项目类型：黑马头条（类似于：今日头条）

特点：

+ 1.0 用户登录是可以访问的，用户不登录也应该可以访问
+ 2.0 如果用户之前登录过：
  + 直接输入之前登录过的信息，就可以再次登录
+ 3.0 如果用户之前没有登录：
  + 直接输入用户的手机号 & 验证码，就可以创建一个新的用户，并且进行登录

### 登录 - 完成静态页面

添加一个登录页面：

+ 创建一个 login 组件
+ 设置 login 路由
+ 完成静态页面

组成：

+ 头部标题

  > 使用 vant 中 navBar 组件  [传送门](https://youzan.github.io/vant/#/zh-CN/nav-bar)

+ 手机号 & 验证码输入框

  > 使用 vant 中 field 组件 [传送门](https://youzan.github.io/vant/#/zh-CN/field)

+ 登录按钮

  > 使用 vant 中的 button 组件 [传送门](https://youzan.github.io/vant/#/zh-CN/button)

### 登录 - 使用 iconfont 

> 由于输入框之前有两个图标，在 vant 的图标库中没有这两个图标，为了解决这个问题 ，我们需要使用 iconfont 来加载这个图标

步骤：

+ a. 生成 css 文件
  + 1.0 打开 iconfont 的官网 [传送门](https://www.iconfont.cn/)
  + 2.0 去官网中找到自己要的图标 & 添加到购物车中
  + 3.0 将我们需要的图标添加一个项目中
  + 4.0 生成这个图标的 css 文件
+ b. 在项目中使用 iconfont
  + 1.0 复制生成的 css 代码
  + 2.0 在项目中的 `src/style` 中创建一个 `index.css`  并且将 css 代码粘贴到文件中
  + 3.0 在 `main.js` 中导入这个文件
  + 4.0 使用： `<i class="iconfont 图标的名称"></i>`


### 登录 - 完成参数的合法性验证 

### 登录 -  提交登录的参数

### 登录 -  封装 axios 请求文件

### 登录 - 封装网络请求文件

### 登录 - async & await 的作用

### 登录 - async & await 整合

### 登录 - 保存登录信息到 vuex & localstorage 中

### 登录 - localstoreage 的操作方法封装

### 登录 -  给登录添加加载效果

### 登录 - 给登录失败添加提示框
