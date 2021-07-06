# day14-mobile

## 概述

### 复习

小智同学

+ 完成聊天内容的自动滚动
+ 使用插件完成移动端项目的自动适配

补充

+ 特性继承
  + props 属性
  + 非 props 属性
+ inheritAttrs
  + 用来设置是否进行特性继承
+ $attrs：
  + 用来得到父组件中所有的非 props 属性
  + 可以用来进行隔代组件之间的传参
+ $listeners：
  + 用来得到父组件中的方法
  + 可以用来进行隔代组件之间的传参
+ 组件之间的通讯方式总结：
  + ref & $parents
  + props & $emit
  + vuex
  + eventbus
  + \$attrs \& \$listeners
+ 动态组件
+ 异步组件：
  + 如果用在一般的组件上叫做：动态组件
  + 如果用在路由组件上叫做：路由懒加载
  + const xx = () => import('xxx')
+ 插槽
  + 基本使用
  + 具名插槽
  + 默认插槽
  + 作用域插槽
+ mock.js
  + 作用：在前后端联合开发时，可能后端的接口开发不及时，可以使用  mock.js 来模拟假数据
  + 关键词：前后端联调

### 今日内容

+ mock.js
+ 自己封装一个组件
+ scoped
+ /deep/
+ 双向绑定的原理
+ 生命周期
+ SPA
+ SEO

## 补充

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

[传送门](http://mockjs.com/)

作用： 生成随机数据，拦截 Ajax 请求(模拟后端的接口)

使用：

+ 生成随机数据

  + 步骤：

    + 1.0 下载 `mock`：

      ```bash
      npm i mockjs --save
      ```

    + 2.0 使用 `mock`

      ```js
      // 导入 Mock
      import Mock from 'mockjs'
      // 调用方法得到随机数据
      var data = Mock.mock({
      	`list|1-10`: [{
      		'id|+1': 1
      	}]
      })
      // 将数据进行打印
      console.log(data)
      ```

+ 拦截异步请求

  + 步骤：

    + 1.0 拦截异步请求

      ```js
      // 拦截异步请求
      //		第一个参数： 要拦截的请求路径
      //      第二个参数： 要拦截的请求方式
      //      第三个参数： 拦截之后，的处理逻辑（它是一函数）
      //			这个函数必须有一个返回值，这个返回就是返回给异步请求的结果
      Mock.mock('/getData', 'get', function() {
      	var data = Mock.mock({
      		'list|1-10': [{
                  'id|+1': 1
              }]
          })
          return data
      })
      ```

  + 注意点：

    + 一旦设置了 `mock` 来拦截异步请求，将来异步请求会被 `mock` 拦截下来，在浏览器的 `network` 中是看不到的。

+ 生成数据的规则

  +  **数据模板**

    + **每个属性由 3 部分构成：属性名、生成规则、属性值：** 

      ```
      // name: 属性名
      // rule：生成的规则
      // value：属性值
      'name|rule': value
      ```

  + **数据占位符**

    ```js
    Mock.mock({
        name: {
            first: '@FIRST',
            middle: '@FIRST',
            last: '@LAST',
            full: '@first @middle @last'
        }
    })
    ```

总结：

+ `mockjs` 的作用：生成随机数据 & 拦截异步请求
+ 在实际开发过程中，后端接口没有开发好，前端可以使用 `mock.js` 来模拟接口
+ 如果前期前端使用 `mockjs` 来模拟后端接口，等到后端的接口开发完成之后，需要将接口从 `mock` 中切换到后端接口中，这个过程叫做**前后端联调**
  + 往往自己使用 `mock` 来生成数据运行项目是没有问题的，但是一旦切换到后端的接口中后，可能会出现问题。所以一般前后端联调都是项目上线之前的最后一步。

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

### 复习上午

+ mock.js
  + 生成随机数据
  + 拦截 ajax 请求
  + 生成数据规范：
    + 数据模板
    + 占位符
+ 自己封装一个组件：
  + 可以以普通组件的方式来调用
  + 可以以 js 的方式来调用

### 补充 - scoped  

> vue 中的知识点：让 css 存在作用域，让 style 中的样式只在当前文件中起作用

结论：

+ 在 vue 中默认情况下，样式是全局的
+ 设置了 scoped 属性之后的样式就具有了作用域

![1587178125531](imgs\1587178125531.png)

### 补充 - deep

> 需求：在不去掉 App.vue 中 style 中的 scoped 属性的情况下，我们要将 .content 的样式作用到子组件中

名称：深度选择器（Vue-cli 中特有的）

作用：让设置了 `scoped` 属性的样式作用到子组件中

总结：

+ 在 vue 中设置的样式默认都是全局样式
+ 设置了 `scoped` 属性的 `style`  标签中的样式只能作用到当前文件中
+ 在设置了 `scoped` 属性的 `style` 标签中，再设置 `/deep/`  ，这样的样式可以作用到子组件中
+ `/deep/` 只能配合 `less` 来使用

### 补充 - 双向绑定的原理

基本概念：

+ 当视图上的数据发生改变时， data 中的数据也发生改变
+ 当 data 中的数据发生改变时，视图中的数据也发生改变

原理：

+ 主流使用的版本 2.x：

  + 关键字：`Object.defineProperty`

    ```js
    var data = {}
    document.querySelector('#ipt').oninput = function(e) {
    	data.name = e.target.value
    }
    Object.defineProperty(data, 'name', {
    	set: function(value) {
    		this._name = value
    		document.querySelector('#box').innerHTML = value
            document.querySelector('#ipt').value = value
    	},
    	get: function() {
    		return this._name
    	}
    })
    ```

+ 最新的版本 3.x

  + 关键字： `Proxy`
  + ![1589099419861](C:\Users\91300\Desktop\vue-mobile\day14\1-教学资料\imgs\1589099419861.png)

+ 注意点：

  + 我们这里讲的实现原理是实现的方法，其实在 vue 底层实现这玩意儿的时候用到一种模式：观察者模式。

### 补充 - 生命周期

> 前置知识点：
>
> > $mount() 方法：作用与 el 属性一样，都是可以将 vue 实例渲染到视图容器中
> >
> > template 属性：如果设置了这个属性，将来在页面上渲染时，会将 template 作为页面的内容进行渲染

+ 生命周期的流程
  + 1.0 创建一个 `vue` 的实例
  + 2.0 初始化事件 & 生命周期
    + 在创建 `vue` 实例时，这个对象其实是空的，到了这一步才慢慢开始执行一些内容
  + 3.0 初始化实例中 `data` 与 `method`
    + 在这一步之前 `data` 与 `method` 中其实是没有内容的
  + 4.0 判断并且生成虚拟 dom
    + 判断实例中是否存在 `el` 属性：(el：是否指定的渲染的容器)
      + 如果存在：
        + 继续向下执行
      + 如果不存在：
        + 当调用 `$mount` 方法时，继续向下执行
    + 判断实例中是否存在 `template` 属性
      + 如果存在：
        + 将 `template` 属性中对应的内容生成为一个虚拟 dom
      + 如果不存在：
        + 将`<div id="app"></div>` 中的内容生成为一个虚拟 dom
  + 5.0 将虚拟 `dom` 渲染到页面上
  + 6.0 页面会进入`挂载完毕`的状态等待 `data` 中数据的改变
    + 如果 `data` 中的数据发生改变：
      + 将虚拟 dom 重新渲染，并且更新到页面上，再次进行挂载完毕的状态
  + 7.0 销毁 vue 实例
+ 注意点：
  + el：是否指定的渲染的容器
  + `el` 与 `$mount` 其实是一样的，都是用来指定页面的渲染容器
  + template：
    + 如果 vue 实例中不存在，会直接将 `<div id=“app”></div>` 中的内容渲染到页面上
    + 如果 vue 实例中存在，会直接将 `template` 属性中的内容渲染到页面上
  + 虚拟 dom：
    + 相当于将内容渲染到页面上进行的一次 `打草稿`
+ 生命周期的钩子函数
  + 四组：
    + 在初始化 `data` & `method` 时执行
      + 之前：beforeCreate
      + 之后：created
    + 在将虚拟 dom 渲染到页面上时执行
      + 之前：beforeMount
      + 之后：mounted
    + 修改页面上的 data 时执行
      + 之前：beforeUpdate
      + 之后：updated
    + 销毁 vue 实例时执行
      + 之前：beforeDestroy
      + 之后： destoryed

### 补充 - SPA

> 在 vue 这个阶段中我们所学的： 黑马面面项目 & 黑马头条项目。其实都是单页面应用

全称：Single Page Application （单页面应用）

概念：

+ 网站的效果都是显示在一个静态页面中的
+ 在页面切换时，其实并没有从一个页面中跳转到另一个页面中，只是通过 js 动态的将内容进行了修改
+ 在网站的源代码中是看不到任何数据（关键字）的

特点：

+ **优点：**
  - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
  - 基于上面一点，SPA 相对对服务器压力小；
  - 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；
+ **缺点：**
  - 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
  - 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；（vue-router 已经解决了这个问题）
  - SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。
    - 因为单页应用的所有内容都在 index.html 中，页面的切换是通过 js 动态切换的
    - 由于所有的内容切换都是通过 js 动态切换的，所以在页面的源代码中是看不到任何的数据的
    - 由于源代码中看不到任何数据，这是非常不利于 SEO 的，所以我们说 SPA 在 SEO 上有其天然的弱势。
    - vue 中的 SSR 就可以用来解决这个问题。

### 补充 - SEO

> 总结: 用户在搜索关键字时，让我们的网站排名更加的靠前，这个过程叫做 SEO 优化

全称： Search Engine Optimization （搜索引擎优化）

作用：

+ 提高网站关键字的排名
+ 当我们在搜索引擎上搜索一些关键字，SEO 可以让我们的网站排名尽可能的靠前

具体的实现：

+ 1.0 花钱买排名（与程序员无关）
+ 2.0 可以广发外链（与程序员无关）
+ 3.0 结构语义化（与程序员相关）
  + 搜索引擎在搜索关键字时，会有自己的一套算法（网络爬虫）：
    + 网络爬虫会去目标网站上去抓取与关键字有联系的信息
    + 网络爬虫抓取的方式是：浏览网站的源代码，寻找与关键字相匹配的信息，最终将与关键字匹配度最高的网站进行显示。
  + 总结：如果要提高网站的排名，必须在源代码中有关键字信息。

## 渲染方式

> SPA 的渲染特点：页面上的数据，是通过 js 动态渲染的，所以在源代码是看不到数据的（像这种渲染方式，叫做：客户端渲染：CSR）

### 渲染方式 - CSR

全称：Client Sider Render（客户端渲染）

特点：

+ 1.0 完成实现了前后端分离
  + 后端：提供数据接口
  + 前端：调用接口，渲染数据
+ 2.0 由于数据的渲染是在前端完成了，并且是通过 js 动态完成的：所以在操作过程中网站的源代码中看不到任何数据。

案例：

+ 步骤：
  + 1.0 创建一个服务器
  + 2.0 响应一个客户端
  + 3.0 在服务器中提供一个数据响应的接口
  + 4.0 在客户端中通过异步请求去请求这个接口
  + 5.0 通过 js 将数据动态渲染到页面上

### 渲染方式 - SSR

全称：Server Sider Render（服务端渲染）

特点：

+ 1.0 没有前后端的分离：
  + 只有后端
    + 得到静态页面
    + 得到动态数据
    + 将页面与数据进行结合，形成一个完整的 html 结构，最终将 html 结构响应回浏览器
  + 没有前端
+ 2.0 由于数据是在服务端直接渲染完成的，所以在源代码中可以看到数据的 。
+ 3.0 相对 CSR，它对于 SEO 更加友好 

案例：

+ 步骤：
  + 1.0 创建一个服务器
  + 2.0 设置一个接口：用来返回一个完整的 html 页面（数据+结构）
  + 3.0 在浏览器中请求这个接口就可以了

## Nuxt.js

> 官网： https://zh.nuxtjs.org/ 
>
> 说明：nuxt.js 是 vue 中的一个服务端渲染框架

### Nuxt - 安装

从头开始新建项目

+ 步骤：

  + 1.0 创建一个文件夹 & 进入这个文件夹

  + 2.0 初始化这个项目

  + 3.0 设置启动指令：

    ```json
    // package.json
    {
    	"scripts": {
    		"dev": "nuxt"
    	}
    }
    ```

  + 4.0 安装 nuxt 

    ```bash
    npm i --save nuxt 
    ```

  + 5.0 创建 pages 目录

  + 6.0 在 pages 目录下新建一个 index.vue 项目

  + 7.0 启动项目

    ```bash
    npm run dev
    ```


### Nuxt - 路由

+ **基础路由**

  + ```js
    <!-- pages 下面的结构 -->
    pages/
    --| user/
    -----| index.vue
    -----| one.vue
    --| index.vue
    <!-- 生成路由 -->
    router: {
      routes: [
        {
          name: 'index',
          path: '/',
          component: 'pages/index.vue'
        },
        {
          name: 'user',
          path: '/user',
          component: 'pages/user/index.vue'
        },
        {
          name: 'user-one',
          path: '/user/one',
          component: 'pages/user/one.vue'
        }
      ]
    }
    ```

+ **动态路由**

  ```js
  // 结构
  pages/
  --| _slug/
  -----| comments.vue
  -----| index.vue
  --| users/
  -----| _id.vue
  --| index.vue
  // 生成的路由
  router: {
    routes: [
      {
        name: 'index',
        path: '/',
        component: 'pages/index.vue'
      },
      {
        name: 'users-id',
        path: '/users/:id?',
        component: 'pages/users/_id.vue'
      },
      {
        name: 'slug',
        path: '/:slug',
        component: 'pages/_slug/index.vue'
      },
      {
        name: 'slug-comments',
        path: '/:slug/comments',
        component: 'pages/_slug/comments.vue'
      }
    ]
  }
  ```

### Nuxt - 视图

> nuxt.js 允许我们定义一些类似于模板之间的结构，供所有的页面来使用

+ 模板
  + 作用：可以给页面提供默认的结构
  + 用法： 根目录下创建一个 `app.html` 的文件 
  + 注意点：创建之后，需要重启服务器
+ 布局：
  + 作用：与模板基本一致，但是布局中可以使用逻辑代码
  + 用法：根据目录下创建一个 layouts 文件夹，在文件夹下创建一个 default 文件

### Nuxt - 异步数据

> 使用 SSR 的方式为渲染数据

+ asyncData 函数：
  + 作用：可以让渲染数据变为 SSR 的方式
  + 注意点：
    + 1.0 asyncData 中无法使用 this
    
    + 2.0 如果需要将 asyncData 中的数据返回给外界使用，需要通过 return
    + 3.0 asyncData 中返回的数据用法与 data 中的数据一样

### Nuxt - nuxt 生命周期钩子函数

+ nuxt 中生命周期钩子函数的执行时机
  + 有一套自己的周期：
    + asyncData
    + beforeCreate
    + created