# day08-mobile

## 概述

### 复习

首页数据：

+ 使用 dayjs 来将固定时间转为相对时间
  + 过滤器
  + dayjs 的使用：
    + 基本用法
    + 插件
    + 语言包

更多操作：

+ 封装了更多操作的面板

+ 完成不感兴趣：

  + 删除被点击的文章

  + 将被点击的文章信息提交到服务器

  + 报错：

    + 如果报错是 401：说明需要重新登录

    + 如果报错是 400：说明文章的 id 不对

+ 分析 400  的产生的原因：
  + 由于服务器返回的数据交给了 axios ，在 axios 的内容接收到这些信息时会进行 json.parse 将数据进行转换，json.parse 有一个特点：会将超过 js 处理范围的数字的精度造成丢失。
  + 解决方案：
    + 可以使用 json-bigint 来将数据进行转换
  + 实现步骤：
    + 在 axios 的创建实例时，传入一个 transformResponse 设置。在设置中通过 json-bigint 来转换服务器返回的数据就 OKEY 了
+ 完成反馈垃圾内容：
  + 切换垃圾内容的显示
  + 将文章信息提交到服务器

搜索：

+ 创建组件
+ 完成静态页面
+ 进行搜索跳转
+ 进行关键字联想
+ 点击联想关键字进行跳转

### 今日内容

搜索

+ 完善其它功能

搜索结果

判断登录相关的信息

## 搜索

### 搜索 - 关键字高亮

> 思路：将得到的联想数据中的关键字替换为 
>
> > \<span style="color:red" \>关键字\</span\>

步骤

+ a. 得到所有联想的结果

+ b. 遍历数据联想的结果的数据源，将里面所有包含关键字的内容进行内容的替换：

  ```html
  <!-- 原数据 -->
  'hello-world'
  <!-- 替换后的数据 -->
  '<span style="color:red">hello</span>-world'
  ```

+ c. 将数据在页面上遍历时，使用 v-html 来渲染

注意点：

+ bug:

  + 表现：高亮之后跳转到结果页面时，关键字被 `span` 标签包裹

  + 需求：跳转之后的关键字不应该被 `span` 包裹

  + 解决方案：

    + 跳转过来时不要带 `span`

    + 步骤：

      + 在遍历联想数据源时，替换后的数据改为一个对象

        ```js
        // 原本数据：
        ["abc", "abc-hahahahahahaha", "abc1", "abc12"]
        // 替换之后的数据
        [
            "<span style="color: red">abc</span>", 
            "<span style="color: red">abc</span>-hahahahahahaha", 
            "<span style="color: red">abc</span>1", 
            "<span style="color: red">abc</span>12"
        ]
        // 最终数据
        [
            { oldItem: 'abc', newItem: '"<span style="color: red">abc</span>"' }, 
            { oldItem: 'abc-hahahahahahaha', newItem: '"<span style="color: red">abc</span>-hahahahahahaha"' }, 
            { oldItem: 'abc1', newItem: '"<span style="color: red">abc</span>"' }, 
            { oldItem: 'abc12', newItem: '"<span style="color: red">abc</span>12"' }, 
        ]
        ```

        

### 搜索 - 判断搜索内容为空

任务：

+ 当输入框中的内容为空时：
  + 不应该发送请求到服务器请求数据
  + 联想区域的数据应该清空

步骤：

+ a. 在联想方法中，发送联想请求之前先进行判断
  + 判断输入框中的值是否为空：
    + 为空：
      + 不再发送请求到服务器
      + 将联想的结果进行清除
    + 非空：发送请求到服务器

### 搜索 - js 的抖动

概念：在 js 中给元素绑定事件后，一旦触发这个事件，会执行多次，多次中只有一次是有效的，多余的执行，我们叫做 js 的抖动

注意点：

+ 抖动不单单仅仅只是发生在 `input` 事件中
  + 例：
    + 窗口的滚动事件
    + 窗口的大小改变事件

解决方案：

+ 防抖：

  + 特点：在持续触发事件时，不执行业务逻辑。等到执行结束后，再执行业务逻辑。

  + 函数

    ```js
    function fangdou (callback, wait) {
      // 定义一个定时器
      var timer = null
      // 返回一个方法
      return function () {
      	clearTimeout(timer)
      	timer = setTimeout(function() {
    		callback()
    	}, wait)
      }
    }
    ```

+ 节流：

  + 特点：在持续触发事件时，每隔一段时间，也会执行一次业务逻辑
  
    ```js
    function jieliu (callback, wait) {
    	// 定义一个开始时间
    	var beginTime = Date.now()
    	// 定义一个定时器
    	var timer = null
    	return function () {
    		clearTimeout(timer)
    		// 定义一个当前时间
    		var currentTime = Date.now()
    		// 计算时间间隔
    		if (currentTime - beginTime >= 1000) {
    			callback()
    			// 保存当前执行的时间
    			beginTime = Date.now()
    		} else {
    			timer = setTimeout(function() {
                    callback()
                }, wait)
    		}
    	}
    }
    ```
  
    

### 搜索 - 解决 js 的抖动

步骤

+ 1.0 在 search 下的 data 中定义一个变量： timer
+ 2.0 在进行联想时：
  + 清除之前的定时器
  + 再重新设置定时器：
    + 如果输入内容就发送请求到服务器

### 复习上午

搜索：

+ 关键字的高亮
+ 判断搜索内容是否为空
+ js 的抖动
  + 解决抖动的两种方式：
    + 防抖
      + 基本概念
      + 代码实现
      + 函数的封装
    + 节流
      + 基本概念
      + 代码实现
      + 函数的封装

### 搜索 - 保存搜索历史

保存搜索历史：

+ 步骤：
  + a. 在 data 中定义一个变量 historyList
  + b.  当我们进行搜索时，将数据添加到 historyList 中：仅仅只是保存到了页面上，将来跳转之后就没有了
  + c. 还需要将数据保存到本地： localstorage 中

###  搜索 - 获取获取搜索历史

+ 步骤：
  + a. 在打开搜索页面时，应该先从 localstorage 中的 history 中得到数据
    + 如果有，就直接取出
    + 如果无，就直接设置默认数据

### 搜索 - 渲染搜索历史：

+ 步骤：
  + a. 将 historyList 中的数据渲染到搜索历史结构中

### 搜索 - 排序 & 去重

排序：

+ 步骤：
  + a. 将之前添加到 historyList 数组中元素的方法从 push 改为 unshfit

去重：

+ 步骤：

  + a. 在向数组中添加内容之后，使用 set 对象进行去重

    ```js
    this.historyList = [...new Set(this.historyList)]
    ```

### 搜索 - 点击历史数据跳转

步骤：

+ a. 给所有的搜索历史添加一个点击事件
+ b. 这个事件就是联想选项的点击事件

### 搜索 - 删除历史数据

步骤：

+ a. 给搜索历史中的选项中的叉叉添加点击事件
  + 默认事件冒泡：
    + vue 中有一个事件修饰符：.stop
+ b. 在事件中：
  + 得到当前搜索数据的下标
  + 通过下标将数据从 historyList 删除
  + 将删除后的结果保存到本地：localstorage 

### 搜索 - 清空历史数据

步骤：

+ a. 给垃圾桶添加一个点击事件
+ b. 在事件中：
  + 询问用户是否要清空搜索历史
    + 确定：
      + 将 historyList  清空
      + 将本地的记录也清除
    + 取消：
      + 不处理

##  搜索结果

###  搜索结果 - 页面结构&样式

+ 顶部的导航
  + 给导航的左侧箭头添加一个点击事件：
    + 在事件中应该回退到上一个页面
+ 新闻数据的渲染
  +  使用 list 组件来渲染数据
  +  将首页中的结构复制过来，稍作修改

注意点：

+ 在 `vue-router`  有一个方法可以回退到上一个页面： `this.$router.back()`

###  搜索结果 - 得到关键字对应的文章数据

步骤：

+ a. 在 mouted 中得到搜索的关键字
+ b. 在 list 组件的 onload 事件中发送请求到服务器得到关键字对应的文章数据
  + 请求的服务器的接口：（获取搜索结果）
+ c. 直接将文章数据渲染到页面上

### 搜索结果 - 完成上拉加载更多

步骤：

+ 1.0 在 onload 中将 list 的组件的加载状态设置为 false
+ 2.0 将得到的数据源进行接收，而不是覆盖
+ 3.0 在 onload 中每次进行让 page 加 1
+ 4.0 判断返回的结果是否为空

## 判断登录

### 判断登录 - 直接在评论按钮中完成登录判断

步骤：

+ a. 给评论按钮添加一个点击事件
  + 在事件中判断用户是否登录：判断 $store 中是否存在 token	
    + 用户登录：执行后续的逻辑代码（也就打印：评论功能）
    + 用户未登录：跳转到登录页面进行登录

### 判断登录 - 将登录验证封装为一个全局方法

> 如果将登录验证的方法直接写到逻辑代码中，将来重用不太方便，我们可以尝试将登录验证的代码封装为一个 `vue` 的全局方法

步骤：

+ a. 在 main.js 中向 Vue 的 prototype 中添加一个 $login 方法
  + 在方法中完成登录的验证
+ b. 在点赞按钮中通过: this.$login 方法来验证登录

### 判断登录 - 插件的使用

> $login 方法如果直接放到 main.js 中会造成 main.js 中的逻辑代码过多，代码结构不够清晰
>
> 可以将 $login 方法封装为 vue 的一个插件

基本概念：

+  插件通常用来为 Vue 添加全局功能 。一般在使用插件时都使用 `Vue.use(xxx)`

封装插件：

+ 使用插件：

  ```js
  // 调用 `MyPlugin.install(Vue)`
  Vue.use(MyPlugin)
  
  new Vue({
    // ...组件选项
  })
  ```

+ 创建插件：

  ```js
  // 定义一个插件对象
  var pluginObj = {}
  // 给插件对象添加一个 `install` 方法
  pluginObj.install = function (Vue) {
  	// 可以给 Vue 添加一些全局的方法了
  }
  // 将插件对象暴露出去
  export default pluginObj
  ```

注意点：

+ 使用插件：
  + 插件的使用代码必须放到创建 `vue` 实例之前
  + 使用 `use` 方法来使用插件
  + `use` 方法其实相当于是调用插件的 `install` 方法
+ 创建插件：
  + 插件必须有一个方法 install 方法
  + 这个 install 方法有一个参数： vue 构造器

### 判断登录 - 将登录验证方法封装为一个插件

步骤：

+ a. 在 utils 下面创建一个文件： `myplugin.js`
+ b. 在文件中：
  + 创建一个对象
  + 给对象添加一个 install 方法
  + 在 install 方法中给  `Vue` 添加一个 `$login` 方法
  + 导出这个对象
+ c. 在 `main.js` 中导入这个文件
+ d. 通过 `Vue.use` 来使用这个插件

### 判断登录 -  登录成功后回退到登录之前的页面

步骤：

+ a. 在 router 中给 login 组件再添加一个路由 checklogin
+ b. 在 login 组件的 login 方法中在登录成功之后的代码中添加判断：
  + 得到当前页面的路由
    + this.$route.path
  + 判断当前页面的路由
    + 如果路由名为 checkLogin ：就需要回退到上一个页面
      + 调用： this.$router.back()
    + 如果路由名为 login ： 就需要跳转到首页
      + 调用： this.$router.push('/home')
+ c. 在验证验证的 $login 方法中，如果判断出用户没有登录，应该跳转到 /checkLogin 中

### 判断登录 - token 失效的处理方式

步骤：

+ a. 先捕获到当前请求的错误信息
+ b. 判断当前请求的错误信息是否是 401，如果是 401 说明 token 过期了
+ c. 将 refresh_token 重新提交到服务器得到新的 token
+ d. 用新的 token 将过期的 token 覆盖掉

### 补充 - 动态路由