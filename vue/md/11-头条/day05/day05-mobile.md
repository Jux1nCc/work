# day05-mobile

## 概述

### 复习

登录

+ 将登录信息保存到 `localostrage` 中
+ 将操作 `localstorage` 的方法封装为一个单独的文件
+ 添加了登录的加载效果：
  + 给按钮添加一个 `loading` 属性
+ 使用 `try-catch` 来捕获异常
+ 使用 `toast` 添加提示信息

首页

+ 完成 `home` 的结构：
  + 设置了底部的 `tabBar`
  + 设置了其它页面为它的子路由
+ 完成首页的结构：
  + 完成头部结构
  + 完成频道区域
  + 完成频道下的文章区域
  + 给首页 & 频道 标题区域设置固定定位
  + 完成频道操作按钮的结构 & 样式
  + 动态渲染频道数据
  + 将 token 添加到请求拦截器中传入到服务器

### 今日内容

首页

+ 完成频道区域数据的渲染
+ 完成频道下的文章数据的渲染
+ 完成频道操作面板中的功能

## 问题反馈

### 问题反馈 - 频道数据的意义

+ 如果用户以游客身份（没有登录）：
  + 得到的频道数据是默认的 七条 频道数据
+ 如果用户登录了：
  + 得到的频道数据应该是用户操作过的频道数据

### 问题反馈 - 频道区域的样式不对

问题：如果频道数据不能占满一整行，那么频道区域的样式会出问题。（频道区域会掉下来）

原因：

+ 如果频道数据不能占满一整行，那么频道结构为的类名为：`.van-tabs__wrap.van-hairline--top-bottom`
+ 如果频道数据能够占满一整行，那么频道结构为的类名为：`.van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom`

解决方案：

+ 为了在占满一整行 & 不占满一整行的情况下样式都正常：
  + 可以将样式设置给： `.van-tabs__wrap.van-hairline--top-bottom`

## 首页

### 首页 - 判断频道数据

> 频道数据来源：
>
> > 如果登录
> >
> > > 直接从服务器中得到当前用户的频道数据
> >
> > 如果没有登录
> >
> > > 判断：之前是当前 localstorage 中是否存在频道数据
> > >
> > > > 存在：直接从 localstorage 中取出频道数据，进行渲染
> > > >
> > > > 不存在：直接从服务器中得到默认的 7 条频道数据

步骤：

+ 1.0 找到 `mounted`， 将直接获取频道数据的操作删除掉
+ 2.0 进行判断：
  + 判断用户是否登录（判断 `vuex` 中是否存在 `token`）
    + 如果登录：
      + 直接从服务器中得到用户自己的频道信息
    + 如果未登录：
      + 判断 `localstorage` 中是否存在频道数据
        + 如果存在：
          + 直接取出渲染到页面上
        + 如果不存在：
          + 直接从服务器中得到默认的 7条频道数据

### 首页 - 将不同频道下的数据分开

> 由于不同的频道下的数据源是不一样的，所以将来要正确渲染数据需要给每个频道都设置一组自己的数据
>
> > 文章的数据源：articleList
> >
> > list 组件的加载状态： loading
> >
> > list 组件的加载完结状态： finished
> >
> > pull-refresh 组件的加载状态： isLoading

步骤：

+ 1.0  当我们从服务器中得到了频道数据之后：

  ```json
  {
  	channels: [
  		{id:0,name:'推荐'},
  		{id:11,name:'后端'}
  	]
  }
  ```

+ 2.0 应该在每个频道数据下添加这些额外属性： articleList & loading & finished & isLoading

  ```json
  {
  	channels: [
  		{id:0,name:'推荐',articleList:[],loading:false,finished:false,isLoading:false},
  		{id:11,name:'后端',articleList:[],loading:false,finished:false,isLoading:false}
  	]
  }
  ```

+ 3.0 将添加的数据在页面上动态渲染

### 首页 - 渲染频道下的文章数据

> 得到当前选中频道的数据对象：可以给 van-tab 设置一个 `v-model` 属性

步骤：

+ 1.0 确定当前切换的频道的 id
  + 给 van-tbas 添加一个属性：`v-model=“active”`
  + 在 data 中添加一个属性：`active: 0` 
  + 可以通过以下表达式得到频道的 `id`：`this.channelList[this.active].id`
+ 2.0 在 `list` 组件的 `onload` 事件中添加逻辑代码
  + 得到当前切换的频道的 `id`
  + 发送请求到服务器去得到当前频道对应的文章数据（频道新闻推荐_V1.1）
  + 将数据渲染到页面上

注意点：

+ 1.0 请求频道下的新闻有两个接口，需要使用第二个：频道新闻推荐_V1.1
+ 2.0 请求时一定要注意：`频道新闻推荐_V1.1` 接口的地址与其它的不太一样：
  + 正常的请求地址：
    + `http://ttapi.research.itcast.cn/app/v1_0/user/channels`
  + `频道新闻推荐_V1.1`接口：
    + `http://ttapi.research.itcast.cn/app/v1_1/articles`
  + 如果我们设置的基地址是：`http://ttapi.research.itcast.cn/app/v1_0/`
    + 将来在请求 `频道新闻推荐_v1.1时需要完地址写完整`

### 首页 - 解决数据不能直接显示的 bug

问题：加载完文章数据之后，页面不会马上显示这个数据，先切换到另一个频道之后再切换回来才会显示

原因：

+ 因为我们的文章数据在后面通过动态的方式添加到对象中的，它不是一个响应式的数据。

解决方案：

+ 可通过 `this.$set` 来添加这些属性，以此来解决这些问题

  ```js
  this.$set(obj, key, value)
  // obj：动态添加属性的对象
  // key：动态添加的属性名
  // value：动态添加的属性值
  ```

  

### 复习上午：

+ 判断频道数据

  + 判断是否登录：

    + 如果登录：直接从服务器中得到频道数据

    + 如果未登录

      + 判断 localstorage 中是否存在数据

        + 如果有数据：从 localstorage 中得到数据并且渲染到页面上

        + 如果没有数据：从服务器中得到数据并且渲染到页面上

+ 将不同频道下的数据分开

  + 得到频道数据之后，遍历频道数据，依次给元素添加以下属性：
    + articleList
    + isLoading
    + loading
    + finished

+ 得到当前选中频道下的文章数据

  + 根据当前选中频道的 id 去得到对应的文章数据，将文章数据渲染到页面上

### 首页 - 上拉加载更多

+ 问题1：文章数据渲染完成之后，页面上一直处于加载状态。
  + 原因： list 刚执行完 load 事件，load事件会将 List的加载状态改为 true。
  + 解决方式：将当前频道下的 list 的加载状态手动改为 false
+ 问题2：当修改加载状态之后，页面就像抽风了一样。请求发一直发送，页面上显示的数据会一直切换。
  + 原因：就是我们每次得到数据之后，使用新的数据将老的数据覆盖掉了，我们页面上的数据永远只有一页的数据（10条）
  + 解决方式：只需要将每次得到的数据拼接到原来的数据中就可以了
+ 问题3：当我们切换到某一频道下时， 会一直发送请求，但是没有数据
  + 原因：是因为当前频道下面没有数据
  + 解决方式：只需要判断从服务器中返回的文章数据的长度是否为 0
    + 如果为 0 ：将当前频道下的 finished 属性改为 true
    + 如果不为0：不用理解

### 首页 - 下拉刷新

> 上拉之后已经加载了一部分的数据，下拉时应该将这些信息全部清除，重新请求最新的数据

步骤：

+ a. 在 `onRefresh` 事件中
  + 清除当前频道下的所有数据
  + 重新加载数据

注意点：

+ 由于下拉刷新之后的数据只有 10 条，无法将 list 撑开为一整列，为了解决这个问题，可以给每个 cell 添加一个 200 的高度

## 频道面板模块

### 频道面板 - 打开频道操作面板 

> 面板可以使用 vant 中的组件：[popup](https://youzan.github.io/vant/#/zh-CN/popup)
>
> 属性： v-model 控制面板的显示和隐藏的
>
> 特点：
>
> > v-model：设置为 true，面板就开启
> >
> > 点击黑色遮罩层区域，面板就关闭

步骤：

+ a. 在页面上添加一个频道操作面板：默认隐藏
+ b. 给操作面板按钮添加一个点击事件：将面板显示出来

### 频道面板 - 将频道操作面板封装为组件

> 1.0 由于频道操作是在 home 中完成了，home 中的逻辑已经足够多了，如果我们再将频道操作的逻辑也放到 home 中。将 来 home 页面的维护和更新会非常的麻烦。
>
> 2.0 在后面操作的过程中我们应该将频道操作面板单独封装为一个组件

步骤：

+ a. 在 index 目录下创建一个文件夹： com
+ b. 在 com 文件夹下创建一个组件：channel.vue
  + 用来处理频道操作面板中的所有的逻辑
+ c. 这个组件在 index/index.vue 中使用
  + 显示：点击频道操作面板的按钮
  + 隐藏：点击面板上方的黑色的遮罩层

### 频道面板 - 完成结构与样式

+ 我的频道
  + 标题区域
  + 频道列表区域
    + 给每个元素添加一个叉叉
+ 频道推荐
  + 标题区域
  + 频道列表区域

### 频道面板 - 渲染我的频道数据

> 前提：
>
> > 什么是我的频道：
> >
> > > 就是首页中频道区域中显示的内容

步骤：

+ a. 得到我的频道数据
  + 打开频道面板时，应该从 index/index.vue 中将当前页面上的频道数据传给 channel 组件
  
    + index.vue 与 channel 组件是父子关系
  
    + 数据要从 index.vue 传入到 channel 中
  
    + 可以使用 props：
  
      + 父传： 给子组件添加一个自定义属性： `<son :data="data" ></son>`
  
      + 子接：在子组件中通过 props 来接收：
  
        ```js
        export default {
        	props: [‘data’]
        }
        ```
  
  + 在 channel 组件中接收数据
+ b. 将频道数据进行渲染就 OKEY 了

### 频道面板 - 渲染频道推荐数据

> 强调：什么是频道推荐
>
> > 在黑马头条中有固定的频道数据，所谓的频道推荐指的就是所有频道数据中，除掉 我的频道数据的这部分数据

步骤：

+ a. 在打开页面时，请求服务器得到所有的频道数据
  + 请求服务器接口：**全部频道列表**
+ b. 将所有的频道数据保存起来
+ c. 从所有频道数据中将我的频道数据删除，得到一个新的数组就是频道推荐数据
  + 定义一个推荐频道的计算属性：在计算属性中将所有频道数据中的我的频道删除
+ d. 将频道推荐数据进行渲染

### 频道面板 - 计算属性的缓存问题

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <div id="app">
    <div>
      姓：<input type="text" v-model="firname"> 名：
      <input type="text" v-model="lastname">
    </div>
    <!-- 需求：将姓名结合到一起并且输入 -->
    <!-- 如果直接使用下面的方式去得到姓名：firname + lastname 这段代码要执行很多次，没有意义 -->
    <!-- 不建议直接使用 {{}} 相加，可以使用计算属性来完成 -->
    <div>
      姓名： {{ fullname }}
    </div>
    <div>
      姓名： {{ fullname }}
    </div>
    <div>
      姓名： {{ fullname }}
    </div>
    <div>
      姓名： {{ fullname }}
    </div>
    <div>
      姓名： {{ fullname }}
    </div>
    <!-- <div>
      姓名：{{ firname + lastname }}
    </div>
    <div>
      姓名：{{ firname + lastname }}
    </div>
    <div>
      姓名：{{ firname + lastname }}
    </div>
    <div>
      姓名：{{ firname + lastname }}
    </div>
    <div>
      姓名：{{ firname + lastname }}
    </div>
    <div>
      姓名：{{ firname + lastname }}
    </div>
    <div>
      姓名：{{ firname + lastname }}
    </div>
    <div>
      姓名：{{ firname + lastname }}
    </div> -->
  </div>
</body>
<script src="./node_modules/vue/dist/vue.min.js"></script>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      firname: '张', // 姓
      lastname: '三' // 名
    },
    computed: {
      // fullname 后面对应的这个函数：
      //    1.0 只会在第一次使用 fullname 时执行一次
      //    2.0 执行之后会将得到的结果进行缓存,下一次再用到 fullname,直接从缓存中取（不会再执行函数）
      //    3.0 当计算属性的依赖项发生改变时，会再次执行一次函数，并且会将得到的结果再次进行缓存
      fullname: function () {
        console.log('fullname')
        // 姓 + 名
        return this.firname + this.lastname
      }
    }
  })

</script>
</html>
```

注意点：

+ 1.0 计算属性在第一次使用时会执行一次后的函数
+ 2.0 会将函数执行的结果进行缓存，再使用这个计算属性直接从缓存中取
+ 3.0 一旦计算属性中的依赖项发生改变，函数需要再次执行一次，会再将执行的结果再次进行缓存
+ 4.0 计算属性的缓存依赖项指的是：在计算属性中用到的 data 中的数据

### 频道面板 - 从一个数组中删除另一个数组中的所有元素

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>

</body>
<script>
  // 数组1：所有的频道数组
  var allChannel = [
    { id: 0, name: 'C++' },
    { id: 1, name: 'java' },
    { id: 2, name: 'javascript' },
    { id: 3, name: 'go' },
    { id: 4, name: 'css' },
    { id: 5, name: 'vue' },
    { id: 6, name: 'jquery' },
  ]
  // 数组2：我的频道数据
  var myChannel = [
    { id: 0, name: 'C++' },
    { id: 1, name: 'java' },
    { id: 3, name: 'go' }
  ]
  // 任务：从数组1中删除所有数组2中的元素
  // 快速删除的方式：涉及到两个方法： map   filter
  // 1.0 得到我的频道数据中所有元素的 id 集合
  var ids = myChannel.map(item => {
    return item.id
  })
  console.log(ids) // [0, 1, 3]
  // 2.0 遍历所遥频道数数组：判断当前频道数据在 id 集合中是否存在，
  // 如果不存在，就直接返回，如果存在就不理会
  var channel = allChannel.filter(item => {
    return !ids.includes(item.id)
  })
  console.log(channel)

</script>
</html>
```

注意点：

+ 必须熟练使用： `map & filter & includes`

### 频道面板 - 添加频道

步骤：

+ a. 给频道推荐下的每个频道数据添加一个点击事件
+ b. 得到被点击的元素，直接将元素添加到我的频道数据中
+ c. 将修改后的频道数据进行保存

  + 判断：用户是否登录：

    + 未登录：

      + 应该将操作后的频道数据保存到本地的：localstorage 中

    + 已登录：

      + 应该将操作后的频道数据保存到服务器中

        + 请求服务器的接口：（批量修改用户频道列表（重置式））
+ 接收返回数据

注意点：

+ 只要修改了我的频道，推荐会自动修改：

  + 推荐频道中有一个依赖项叫做我的频道
  + 一旦我的频道发生改变，推荐频道会再次重新生成

+ 提交到服务器接口的数据格式为 

  ```json
  {
  	channels: [
  		{ id: 0, seq: 1 }, // id 频道的 id, seq 频道的顺序(seq 是从 1 开始的)
  		{ id: 1, seq: 2 }  // 注意点：seq = 1 的位置永远是给推荐留着的
  	]
  }
  ```

### 频道面板 -  删除频道

步骤：

+ a. 给叉叉添加一个点击事件：
  + 将当前点击的频道数据从我的频道中删除
  + 将修改后的频道数据保存起来
    + 判断用户是否登录：
      + 未登录：
        + 将修改后的数据保存到 localstorage 中
      + 已登录：
        + 直接将数据提交到服务器

注意点：

+ 有个 bug：
  + 添加完频道之后，关闭频道操作面板，直接跳转到新增的频道中去无法获取文章数据

### 频道面板 - 高亮选中频道

步骤：

+ 1.0 在频道操作面板中添加字体变红的样式
+ 2.0 将首页中选中的频道的下标传入到频道面板中
+ 3.0 在频道面板中接收属性
+ 4.0 根据接收到的属性设置选中的颜色
+ 5.0 给频道面板中的频道选项添加点击事件：
  + 要将 active 改为当前点击的频道的下标