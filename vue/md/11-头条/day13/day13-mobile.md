# day13-mobile

## 概述

面试精华：

+ [传送门一](http://blog.poetries.top/FE-Interview-Questions/excellent/)
+ [传送门二](https://juejin.im/post/5d59f2a451882549be53b170)

### 复习

websocket：

+ websocket 是什么
+ weboscket 有什么用
+ websocket 的基本用法

完成客户端的 websocket demo

使用 websocket 完成小智同学

小智同学：

+ 完成静态页面
+ 动态渲染聊天内容
+ 使用 socket.io-client 完成聊天

### 今日内容

继续完成小智同学

+ 滚动的 bug
+ vant 的自适应

补充内容：

+ 面试时出现频率比较高的面试题

## 小智同学

### 小智同学 - 解决滚动的 bug

步骤：

+ 1.0 给聊天区域设置一个 `overflow: auto`
+ 让聊天区域可以出现滚动条
  
+ 2.0 给 `chatbox` 容器设置一个 ` dom.scrollTop = dom.scrollHeight`
+ 让聊天区域超出内容之后，自动滚动到底部
  
+ bug：
    + 表现：添加了自动滚动的代码，结构依旧不能自动滚动
    + 原因：在于滚动的代码执行的太快了
    + 解决方案：
      + 将滚动的代码放到 $nextTick 中

### 项目 - 适配

> PC 端与移动端最大的区别就是页面的布局（移动端需要页面的自适应，PC端不需要）
>
> [传送门](https://www.jianshu.com/p/8f9aab666c4a)

步骤：

+ 1.0  首先把安装amfe-flexible，这里使用npm install 

  ```bash
  npm i -S amfe-flexible
  ```

+ 2.0  在入口文件`main.js`中引入 

  ```
  import 'amfe-flexible/index.js'
  ```

+ 3.0  在根目录的index.html 的头部加入手机端适配的meta代码 

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  ```

+ 4.0  安装`postcss-pxtorem`是一款 postcss 插件，用于将单位转化为 rem 

  ```bash
  npm i postcss-pxtorem --save-dev
  ```

+ 5.0  在`package.json`配置 

  ```json
    "postcss": {
      "plugins": {
        "autoprefixer": {
          "browsers": [
            "Android >= 4.0",
            "iOS >= 7"
          ]
        },
        "postcss-pxtorem": {
          "rootValue": 37.5,
          "propList": [
            "*"
          ]
        }
      }
    }
  ```

  如果要解决警告问题：应该将以上配置写到 vue.config.js 中： 在`vue.config.js`中配置（**此文件需要在根目录下新建**） 

  ```js
  const autoprefixer = require('autoprefixer');
  const pxtorem = require('postcss-pxtorem');
  
  module.exports = {
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            autoprefixer({
              browsers: ['Android >= 4.0', 'iOS >= 7']
            }),
            pxtorem({
              rootValue: 37.5,
              propList: ['*'],
            })
          ]
        }
      }
    }
  };
  ```

  解决警告的方案：

  ```js
  const autoprefixer = require('autoprefixer');
  const pxtorem = require('postcss-pxtorem');
  
  module.exports = {
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            autoprefixer({
              browsers: ['Android >= 4.0', 'iOS >= 7'],
              overrideBrowserslist: [
                    "Android 4.1",
                    "iOS 7.1",
                    "Chrome > 31",
                    "ff > 31",
                    "ie >= 8"
                    //'last 10 versions', // 所有主流浏览器最近10版本用
              ]
            }),
            pxtorem({
              rootValue: 37.5,
              propList: ['*'],
            })
          ]
        }
      }
    }
  };
  ```

  

## 补充

### 补充 - 准备工作

使用 `vue-cli` 来搭建一个项目结构

### 补充 - 特性继承

> 在父组件中使用子组件时，如果给子组件传入一些非 props 属性，那么这些属性会作用到子组件的根元素上

`props` 属性：

+ 在组件使用过程中经常出现父组件给子组件传参， `props` 就是用来进行父传子的

非 `props`  属性：

+ 父组件传给子组件中的属性，没有通过 props 来接收

### 补充 - inheritAttrs

>  取值  a. true：（默认）启用继承特性   b. false 禁用继承特性

作用：可以用来禁用特性继承

![1587092260239](img\1587092260239.png)

### 补充 - $attrs

作用：用来得到当前子组件中所有的非 props 属性

应用：可以进隔代传参

![1588995769543](img\1588995769543.png)

### 补充 - $listeners

作用：用来得到父组件中的事件

应用：可以用来进行孙传父

![1588996992212](img\1588996992212.png)

### 复习上午：

+ 小智同学：
  + 完成信息自动滚动
  + 完成项目的自动适配
+ 补充：
  + 特性继承
    + props 属性
    + 非 props 属性
      + 父组件传入到子组件中的属性没有通过 props 来接收
  + $attrs：
    + 作用：用来得到所有的非 props 属性
    + 应用：隔代组件之间的传参
  + $listeners：
    + 作用：用来得到所有的父组件中设置的事件
    + 应用：隔代组件之间的传参

### 补充 - 组件间通信方式

方式：

+ ref \& \$parents \&  $children
  + 父子组件之间的传参
+ vuex
  + 父子组件之间的传参
  + 兄弟组件之间的传参
  + 隔代组件之间的传参
  + 注意点：vuex 比较庞大，如果参数只是两个组件之间使用不建议使用 vuex
+ props & $emit
  + 父组件之间的传参
+ eventbus 
  + 兄弟组件之间的传参数
  + 隔代组件之间的传参
+ \$attrs \& \$listeners
  + 隔代组件之间的传参

### 补充 - 动态组件

>  Vue.js 提供了一个特殊的元素 <component> 用来动态地挂载不同的组件,使用 is 属性可以来设置要挂载的组件

![1587094259184](img\1587094259184.png)

### 补充 - 异步组件

>  在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。 

回顾：

+ 项目的打包： `npm run build`
  + 项目根目录下生成一个 `dist` 文件夹
    + css：当前项目中所有打包后的样式文件
    + js：当前项目中所有打包后的 js 文件
      + app.js 所有 src 目录下内容打包后的结果
      + app.js.map：上面文件的映射文件
      + chunk.js：所有第三方包打包后的文件
      + chunk.js.map：上面文件的映射文件
    + index.html：项目的静态页面

问题：

+ 表现：打包之后的项目，运行之后，会一口气将当前项目中所有的文件全部加载出来
+ 影响：第一次加载页面时会非常慢，用户体验不好。
+ 解决方案：
  + 可以使用异步组件来解决这个问题

用法：

+ 同步组件（之前我们使用组件的方式就是同步组件）：
  + 导入方式：
    + `import login from './login.vue'`
  + 特点：
    + 在打包时，会一并打包到 `app.js` 中
    + 请求页面时，会随着 `app.js`  一并请求出来
+ 异步组件
  + 导入方式：
    + `const login = () => import './login.vue'`
  + 特点：
    + 在打包时，不会打包到 app.js 中，而是会单独打包为一个`js` 文件
    + 请求页面时，只要在请求到时，才会加载出来

注意点：

+ 如果用 vue 中的组件上，它的名称为：异步组件
+ 如果用在路由上，它的名称为：路由的懒加载

### 补充 - 自己封装一个组件

借鉴一个 `demo` 来实现， [传送门](https://vuejs.org/v2/examples/modal.html)

特点：

+ 1.0 可以使用**普通组件**中的方式来调用

  + 导入组件
  + 注册组件
  + 使用组件

+ 2.0 **直接通过 `js` 的方式**来调用

  + `this.$modal()`

  + 核心代码

    ```js
    // 将 $modal 封装为一个插件
    // 导入 modal
    import modal from '../components/mymodal.vue'
    export default {
      install: function(Vue) {
      	var myModal = Vue.extend(modal)
      	Vue.prototype.$modal = function() {
      		var newModal = new myModal()
      		newModal.show = true
      		var html = newModal.$mount().$el
      		document.body.appendChild(html)
      	}
      }
    }
    ```

总结：

+ 并不是所有的组件都适合以这两种方式来封装：
  + 之所以这个组件可以这样子去做，原因在于这个组 件对位置没有要求
+ 目的
  + 面试题：请说说你之前有没有自己封装过组件

### 补充 - 插槽

> 概念：在父组件中，使用子组件时，子组件中的内容可能是固定的。但是有时候又需要将子组件中固定的内容进行替换。就可以使用插槽。

+ 基本使用

  + 在子组件中设置插槽

    ```html
    <div>
        我是头部
    </div>
    <div>
        <slot>我的内容</slot>
    </div>
    <div>
        我是底部
    </div>
    ```

  + 在父组件中替换插槽中的内容

    ```html
    <son>default body</son>
    ```

    ![1587110137558](img\1587110137558.png)

+ 具名插槽

  > 如果一个组件内部有多个需要被替换的部分，可以使用具名插槽

  ![1587111417340](img\1587111417340.png)

+ 默认插槽

  > 如果不给插槽设置 name 属性，那么将父组件中的默认内容就是用来替换这个不设置 name 属性的内容

  ![1587111713320](img\1587111713320.png)

+ 作用域插槽

  > 如果希望在父组件中的插槽中使用到子组件中对应插槽的数据源，可以使用作用域插槽（子组件 slot 中用到的数组中可以传给父组件来使用）

  ![1587112685295](img\1587112685295.png)

注意点：

+ 插件的替换可以使用：
  + v-slot:header
  + slot-scope:header （element-ui）
  + \#header （vant）

### 补充 - mock.js

> 在项目开发过程中：
>
> > 前端：根据静态页面完成结构 & 样式 ，根据接口文档完成数据渲染
> >
> > 后端：开发接口
>
> 问题：
>
> > 前端的静态页面已经写完，后端的接口文档还没有开发完成
>
> mock.js 可以用来解决：
>
> > 当前端的静态页面写完，但是接口还没有出来，就可以使用 mock.js 来模拟后端的接口
> >
> > 等待后端将接口开发完成，再将接口从 mock 中切换到 后端接口中就可以了（这个步骤叫做：前后端联调）

[传送门](http://mockjs.com/)

作用：模拟后端的接口

+ 生成随机数据

  + 步骤：

    + 1.0 下载`mock` : `npm i mockjs --save`

    + 2.0 导入 `mock`： `import mock from 'mockjs'`

    + 3.0 生成随机数据：

      ```js
      mock.mock({
        	'list|1-10': [
        		{'id|+1': 0}
        	]
        })
      ```

+ 拦截异步请求

+ 生成数据的规则

### 补充 - 双向绑定的原理

### 补充 - 生命周期
