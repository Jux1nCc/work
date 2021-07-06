# day07-mobile

## 概述

### 复习

频道操作：

+ 渲染频道推荐数据：
  + 计算属性
  + 从一个数组中删除另一个数据中已经存在的元素
+ 添加频道：
  +  点击频道推荐数据，将点击的数据添加到我的频道中
  + 将操作之后的频道数据进行保存：
    + 已登录：将操作后的频道数据提交到服务器
    + 未登录：将操作后的频道数据保存到 localstorage 中
+ 删除频道
  +  点击我的频道数据，将点击的数据从我的频道中进行删除
  + 将操作之后的频道数据进行保存：
    + 已登录：将操作后的频道数据提交到服务器
    + 未登录：将操作后的频道数据保存到 localstorage 中
+ 将选中的频道高亮显示
+ 使用 .sync 来改造代码
  + 作用与 v-model 一样：
    + 都可以用来进行双向绑定数据
    + 区别：
      + 一个组件只能使用 v-model 绑定一个属性
      + .sync 可以多次使用
    + 用法：
      + v-model: 
        + 传入到子组件: :value="msg"
        + 接收子组件： $emit('input', msg)
      + .sync
        + 使用到子组件： :active="active"
        + 接收子组件中的参数： $emit('update:active', active)

首页数据：

+ 完成首页结构与样式
+ 动态渲染数据
+ 使用 vant 中的懒加载来加载图片
+ 使用 dayjs 

### 今日内容

首页数据：

+ 使用 dayjs 来处理日期

更多操作

搜索页面

## 首页数据

### 首页数据 - dayjs 的使用

> 将具体时间改为相对时间（可以使用一个第三方包： dayjs （与 Moment.js 的用户基本一致））

[dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)：

+ 作用：与 moment.js 一样，可以用来进行时间处理

+ 特点：

  + 用法与 moment.js 一样
  + 大小比 moment.js 要小得多，只有 2 kb 
  + dayjs 的 API 设置与 moment.js 完全一样 

+ 使用步骤：

  + 1.0 安装第三方包：`npm install dayjs --save`

  + 2.0 导入 `dayjs` ： `import dayjs from 'dayjs'`

  + 3.0 调用 API： `dayjs().fromat('YYYY-MM-DD hh:mm:ss')`

  + 4.0 使用 dayjs 的相对时间插件

    ```js
    // 导入相对时间的插件
    import relativeTime from 'dayjs/plugin/relativeTime'
    // 将插件使用到 dayjs 中
    dayjs.extend(relativeTime)
    // 得到相对时间
    var time = dayjs().from(dayjs('1990'))
    console.log(time) // 30 年以前
    ```

  + 5.0 使用 dayjs 中的语言包

    ```js
    // 导入中文语言包
    import 'dayjs/locale/zh-cn'
    // 全局使用语言包
    dayjs.locale('zh-cn')
    ```

### 首页数据 - 修改时间

> 思路：将 dayjs 封装为一个过滤器，在要修改时间的位置使用一下就可以了
>
> 复习过滤器：
>
> > 定义过滤器: `Vue.filter('myfilter', function(value) { return xxx })`
> >
> > 使用过滤器：`{{ msg | myfilter }}`

步骤：

+ 1.0 在 `src` 目录下创建一个 `filter` 文件夹
+ 2.0 在 `filter` 下面添加一个文件： `myfilter.js`
+ 3.0 在文件中定义一个过滤器：
  + 使用 `dayjs` 将时间进行处理
+ 4.0 在 `main.js` 使用这个过滤器
+ 5.0 在需要的地方使用这个过滤器

## 更多操作

### 更多操作 - 将面板封装为一个组件

步骤：

+ 1.0 在 `index/com` 中创建一个文件： `more.vue`
+ 2.0 在 `more.vue` 中完成结构
+ 3.0 给更多操作按钮添加一个点击事件：
  + 在事件中修改控制 `more.vue` 显示和隐藏的属性

### 更多操作 - 不感兴趣

步骤：

+ 1.0 打开更多操作面板时：
  + 记录当前点击的文章数据的 id
  + 将文章的 id 传入到更多面板中
+ 2.0 在更多操作面板中接收文章的 id
+ 3.0 给不感兴趣添加点击事件：
  + 将 id 对应的文章从页面上删除
    + 将 id 传回到首页中
    + 在首页中根据 id 将文章对应的数据进行删除
  + 将 id 对应的文章提交到服务器标记为 `不喜欢`
    + 请求服务器接口：对文章不喜欢

注意点：

+ 1.0 如果要对文章不感兴趣，必须用户已经登录：
  + 如果没有登录报的错误是： `User must be authorized`
  + 错误的状态： `401`
+ 2.0 登录之后还是会报一个 ` 400 ` 的错误
  + 报错信息是： ` Invalid target article id ` (无效的文章 id)
  + 错误的状态： `400`

### 更多操作 - 分析错误

错误的提示信息：无效的文章 id

错误的原因：

+ 由于黑马头条中的新闻信息非常多

+ 在存储这些信息时，会给这些信息设置一个唯一的标识的 `art_id`

+ `art_id`: 它是一个 Number 类型的数据，存储在服务器中

+ 将来这个 `art_id` 会在请求数据时，返回给浏览器：

  + 浏览器中有一个 `bug`：处理数字时是有范围的最大值最多为 `9007199254740992` （也就是 2 的 53 次方）

  + 由于新闻数据非常多：`art_id` 已经远远超过了 js 处理的最大数字 
  + js 在遇到比它处理范围要大的数字时，会偷懒：
    + 丢失精度

总结：

+ 由于新闻的 id 太长，超过了浏览器中 js 的处理范围，造成了 id 精度的丢失。页面最终报错

### 更多操作 - 错误产生的原理

原理：

+ 1.0 服务器返回的数据中的 id 超过 js 的处理范围
+ 2.0 在浏览器中接收到这些数据（JSON 格式的字符串）之后，会将数据进行处理 （JSON.parse）
+ 3.0 JSON.parse 在处理时，会对超过范围的数据进行（造成精度的丢失）

### 复习上午：

+ 首页数据：

  + 使用 dayjs 封装一个过滤器：处理时间

+ 更多操作：

  + 封装了更多操作的面板

  + 完成不感兴趣：

    + 1.0 点击不感兴趣之后：需要将选中的文章从页面上删除
    + 2.0 点击不感兴趣之后：需要将选中的文章的 id 提交到服务器，标识为不喜欢

    + 注意点：
      + 点击不感兴趣必须保证用户已经登录
      + 登录之后会报一个错误： 400（无效的文章 id）

  + 分析错误：

    + 服务器返回的数据中的 id 超过了 js 处理数字的范围，造成了精度的丢失

  + 解决方案：

    + 使用 json-bigint 来处理从服务器得到的数据就可以

### 更多操作 - 解决数字超过 js 的处理范围

> 如果要解决以上问题：可以使用第三方 [json-bigint](https://github.com/sidorares/json-bigint)
>
> > json-bigint 的使用步骤：
> >
> > > 1.0 下载 json-bigint ： `npm i json-bigint --save`
> > >
> > > 2.0 导入 json-bigint ： `import JSONbig from 'json-bigint'`
> > >
> > > 3.0 使用 json-bigint：`JSONbig.parse(xx)`
>
> 说明：
>
> > 1.0 由于现在服务器返回的数据是交给 axios 的
> >
> > 2.0 axiso 为了能够让数据可以交给 js 直接访问，会对数据进行处理
> >
> > > 在 axios  的一个配置项中进行处理：transformResponse：会通过 json.parse 来进行处理
> > >
> > > 这也是文章 id 丢失精度的一个原因。

步骤：

+ 1.0 下载 `json-bigint`

+ 2.0 在 `myhttp.js` 中导入 `jsonbigint`

+ 3.0 在接收响应信息的位置将转换的代码从 `JSON.parse` 改为 `jsonbigint.parse`
  + 在 `transformResponse` 中添加一个响应信息的转换代码

+ 4.0 给 `jsonbig.parse` 添加一个 `try-catch` 防止将来响应的数据为空时，代码报错

### 更多操作 - 反馈垃圾内容

步骤：

+ 1.0 在更多操作面板中添加另一个 van-cell-group
+ 2.0 给反馈垃圾内容添加一个点击事件
  + 在事件中将举报详情显示出来： isReport 设置为 true
+ 3.0 在举报详情中添加一个向左的箭头
  + 给箭头添加一个点击事件：在事件中将  isReport 设置为 false
+ 4.0 给每个举报选项添加一个点击事件
  + 得到当前要举报的文章的 id
  + 得到当前要举报的类型 id
  + 发送请求到服务器举报文章
  + 添加举报的提示框
  + 将面板切换到不感兴趣结构
  + 关闭面板

### 更多操作 - 拉黑作者

## 搜索

### 搜索 - 创建组件

> 将问答结构改为搜索

步骤：

+ 1.0 创建文件 `views/search/index.vue`
+ 2.0 设置路由： `search` 
  + 它应该是 `layout` 的子路由
+ 3.0 将问答改为搜索

### 搜索 - 完成结构 & 样式

+ 头部搜索框
  + 使用 vant 中的组件：[search](https://youzan.github.io/vant/#/zh-CN/search)
+ 联想区域
+ 搜索历史区域

### 搜索 - 数据搜索

> 任务：
>
> > 在搜索框中输入内容，点击回车，将输入的内容传入到搜索结果页面中

步骤：

+  在 onSearch 方法中
   + 得到输入框中的关键字
   + 跳转到搜索结果页面中
   + 在跳转时还应该将参数传入到搜索结果页面中

注意点：

+ 在跳转到搜索结果页面之后，需要创建一个单独的搜索结果页面
  + 这个搜索结果页面不是 `home`的子组件
+ 在搜索结果页面中得到搜索的关键字
  + 页面之间的传参：
    + query：
      + 传参：
        + 将参数放到路径后面: `searchResult?key=abc`
      + 接参：
        + 在目标页面接收：`this.$route.query.key`

### 搜索 - 完成联想

步骤：

+ a. 给输入框添加一个输入事件：input
  + 只要输入框中的内容发生了改变，就得到内容提交到服务器去获取联想的结果
    + 请求服务器的接口（获取联想建议（自动补全））
  + 将结果保存起来
  + 最后将结果渲染到联想区域
+ b. 联想区域与搜索历史区域只显示一个：
  + 如果联想区域中有内容，就显示联想的内容
  + 如果联想区域中没内容，就显示搜索历史

### 搜索 - 点击联想跳转

步骤：

+ a. 给所有联想选择添加一个点击事件
+ b. 在事件中：
  + 得到当前被点击的数据
  + 以这个数据为参数跳转到搜索结果页面

总结：

+ 只需要将 `onSearch` 事件挂载到联想选项中

### 搜索 - 关键字高亮

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
  + 例：窗口的滚动事件

### 搜索 - 解决 js 的抖动

步骤

+ 1.0 在 search 下的 data 中定义一个变量： timer
+ 2.0 在进行联想时：
  + 清除之前的定时器
  + 再重新设置定时器：
    + 如果输入内容就发送请求到服务器

### 搜索 - 保存 & 获取搜索历史 & 渲染搜索历史

保存搜索历史：

+ 步骤：
  + a. 在 data 中定义一个变量 historyList
  + b.  当我们进行搜索时，将数据添加到 historyList 中：仅仅只是保存到了页面上，将来跳转之后就没有了
  + c. 还需要将数据保存到本地： localstorage 中

获取搜索历史

+ 步骤：
  + a. 在打开搜索页面时，应该先从 localstorage 中的 history 中得到数据
    + 如果有，就直接取出
    + 如果无，就直接设置默认数据

渲染搜索历史：

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

### 补充 - 动态路由

明天讲