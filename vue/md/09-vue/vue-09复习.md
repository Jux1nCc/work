## 路由传值

>当我们进行路由跳转时，时常是需要带一些参数过去的。

1. **传参**（在需要跳转路由的页面跳转路由时传递参数）

   - ```javascript
     二种写法：
     1：配制写法
     this.$router.push({
     path:"路径xxx",
     query:{
     //这里的query就好比在url上串了一些参数，类似于接口get请求传参
     name:"xxx"
     }
     })
     2：路径拼接写法，类似于get请求
     this.$router.push("路径?name=xxx")
     ```

2. **接参**（接收参数是在路由跳转到xxx组件后，在xxx组件里面接收）

   - ```javascript
     this.$route.query.name      //这里就可以收到whis.$router.push传递过来的参数了  
     //在相应组件接收参数
     ```

## $router与$route的区别

- $router相当于整个路由的管理者，是做整个路由管理工作的，能实现路由跳转之类的事情
  + this.$router.push使用$router
- $route就是一个 存放在 $router.routes 中的 一条 路由信息对象，保存：
  - url ：配置的 路径
  - 子组件对象：和 url 匹配的 子组件
  - 注意：在 子组件中 就可以 通过 $route 获取 【路由信息对象】

![image-20200401101604986](assets/image-20200401101604986.png)

## 路由传值与组件传值的使用场景

+ 通过 url 字段 传递参数 (动态路由传参)
  + 模拟url：` localhost:8080/showlove/小白白`
  + 路由设置 **：动态字段** `url = /showlove/:gfname`
  + 使用字段：实在 对应的 `子组件` 中 通过 `this.$route.params.gfname`

+ 通过 url 参数 传递参数  (get参数传参)

  + 模拟url： `localhost:8080/showInfo?age=18`
  + 使用参数： 在 子组件中 通过 `this.$route.query.age`

+ 两种传参方式原理图：

  + 动态路由传参图

  ![image-20200401110446244](assets/image-20200401110446244.png)

  + url传参原理图

![image-20200401110423049](assets/image-20200401110423049.png)





## vue浏览器插件

+ 作用
  + 可以侦查出 当前访问的 页面是否使用了vue
  + 如果使用了：



## 黑云音乐demo

>展示

-  https://autumnfish.cn/banner                                          获取轮播图图片接口地址
-  https://autumnfish.cn/search?keywords= 神话               搜索歌曲时接口获取音乐列表
-  https://autumnfish.cn/song/url?id=310574                      获取音乐url
-  https://autumnfish.cn/comment/music?id=310574         获取 用户评论列表
-  https://autumnfish.cn/song/detail?ids=310574                获取音乐详情如图片，演唱者等
-  https://autumnfish.cn/lyric?id=310574                              获取歌词
- https://autumnfish.cn/mv/detail?mvid=  mvid                 获取歌曲视频

  

完整流程

1. 基本结构配制
   1. 路由配制
      1. 安装路由
      2. 在main中导入路由  import VueRouter from 'vue-router'
      3. 注册路由  Vue.use(VueRouter)
      4. 实例化路由   new VueRouter({routes:[{path:'/',component:组件名}]})
      5. 注入到new Vue
      6. 给路由来个出口
         1. 在app.vue的相应位置写入<router-view></router-view>
2. 完成首页轮播图
   1. 创建首页组件
      1. 把element的轮播图用入该首页组件中
         1. 安装element-ui
         2. 在main.js中引入 element
         3. 在首面组件中使用elementui
   2. 配制首页路由信息
   3. 调用axios获取图片信息
      1. 安装 axios
      2. 导入axios
      3. 使用axios获取图片信息
   4. 渲染图片信息
3. 完成歌曲列表
   1. 输入处理
   2. 跳转至列表组件页面
      1. 创建列表页面
      2. 配制列表页面路由
   3. 路由传入输入框的值
   4. 列表页面接收传入的值
   5. axios查询列表数据
   6. 渲染列表数据
4. 完成mv播放功能
   1. 创建mv页面
   2. 配制mv页面路由
   3. 点击歌曲列表页小图标跳转至mv页面，同时带上mvid一个参数
   4. 在mv页面调用axios获取mv视频
   5. 渲染到mv页面，实现视频播放
5. 完成歌曲播放
   1. 创建歌曲页面
   2. 配制歌曲页面路由
   3. 点击歌曲列表里面的播放跳转至歌曲页面，同时带上id传递过来
   4. 在歌曲页面通过axios获取数据
   5. 渲染数据
6. 完成歌曲评论
   1. 创建歌曲评论页面
   2. 配制歌曲评论路由
   3. 双击歌曲列表跳转至歌曲评论页面，同时带上id传递过来
   4. 在评论页面通过axios获取评论数据
   5. 渲染评论数据








## 黑云音乐---歌曲搜索列表

完成歌曲列表组件

1. 在路由中配制歌曲列表组件：songs
2. 创建列表组件songs
3. 搜索歌曲页面搜索歌曲时，将歌曲名通过路由传参传给歌曲列表组件songs。
4. 在created里面获取到歌曲搜索的关键词，然后调用接口，得到歌曲列表数据
5. v-for相应数据
6. filters过滤器处理时间与演唱者



## 黑云音乐---播放MV

1. 创建mv组件
2. 配制mv路由
3. 点击歌曲列表中mv，跳转到mv组件页面，同时传递mvid参数给mv组件
4. 调用接口获取数据
5. 将数据信息渲染到页面

## 黑云音乐---播放歌曲

处理音乐播放页面

1. 创建音乐播放组件player
2. 配制播放组件路由
3. 点击音乐列表歌曲，跳转路由，并传递歌曲id
4. 调用接口
5. 通过id获取歌曲详情，并渲染到页面上
6. 通过id获取歌曲歌词，并渲染到页面上
7. 通过id获取 歌曲url,并渲染到页面上

5. 

## 黑云音乐---歌曲评论

处理歌曲评论和页面（和其它页面一样）

1. 创建评论组件comment
2. 配制评论组件路由
3. 双击歌曲列表，跳转路由至comment组件页，并传递id
4. 通过id获取 评论列表数据，将数据渲染到页面上。

## 过滤器的基本使用

>有的时候，有些数据没法直接拿来用，就需要对这些数据进行加工处理，过滤器就是用来做这个功能的

- **全局过滤器** （ 全局过滤器定义后，所有组件都可使用）

  - 定义（在main.js中做全局定义）

    - ```javascript
      //value是过滤器的要过滤的值，这里return的值就是最终过滤器的值 
      Vue.filter("过滤器名字",function(value){
        return  返回值        
      })
      ```

  - 使用

    - ```javascript
      //这里的value就是过滤器方法里面的参数，也就是要过滤的值
      <div class="time">{{value | 过滤器名字 }}</div>
      ```

- **局部过滤器**（只能应用于当前组件）

  - 定义（在自己所在组件里面定义）

    - ```javascript
      //上面的value是过滤器的要过滤的值，return的值就是过滤器定义的结果
      filters: {
          过滤器名字(value) {
            return 返回值 
          }
        }
      
      ```

  - ```css
    //这里的value就是过滤器方法里面的参数，也就是要过滤的值
    <div class="time">{{value | 过滤器名字 }}</div>
    ```

  **作用：**平时项目中用的较多的，就是对一些字符串加工之类的，如：接口传了你一个时间戳，你需要转换成相应的正常时间格式等。        

**Demo**

```vue
<template>
  <div>{{time | formatTime}}</div>
</template>
<script>
export default {
  data() {
    return {
      time: "1546275661000"
    };
  },
  filters: {
    formatTime(str) {
      let _date = new Date(+str);
      let _year = _date.getFullYear();
      let _month = ("0" + _date.getMonth() + 1).slice(-2);
      let _day = ("0" + _date.getDate()).slice(-2);
      let _h = ("0" + _date.getHours()).slice(-2);
      let _m = ("0" + _date.getMinutes()).slice(-2);
      let _s = ("0" + _date.getMinutes()).slice(-2);
      return (_year + "-" + _month + "-" + _day + "  " + _h + ":" + _m + ":" + _s
      );
    }
  }
};
</script>
<style>
</style>
```



## moment

基本使用：moment().format("YYYY年MM月DD日  HH:mm:ss")

官方文档： [http://momentjs.cn/docs/#/parsing/string/]( http://momentjs.cn/docs/#/parsing/string/ ) 



## 黑云音乐总结







## 侦听器

>watch：可以侦听某个数据是否发生变化，如果发生变化会立刻调用相关函数

**基本数据的侦听**

```javascript
watch:{
        // watch要监听的值要写成字符串，且不用this
    //1：写出那个值
    //2：去掉this
    //3:写成字符串
    //后面函数跟二个值，一个是newValue是目前的值，后面还有一个oldValue就是修改前的值
    //只要监听的值有变化 ，就会调用后面的函数
    "数据名":function(newVal,oldVal){
        
        //newVal是新的数据，oldVal是没修改前的数据
        //这里可以执行数据变动后的处理
    }
}
```





## axios基地址配制与全局调用

1. axios.defaults.baseURL='http://183.237.67.218:3000'

2. Vue.prototype.$axios=axios 

   

## 路由抽取



















## Vue基础总结

- 第一天

  - vue是什么，就是js框架 ，只关心数据，无须操作dom,它是组件式开发
  - vue基本使用
    - 导包
    - 布局
    - 实例化
      - el:""  确定范围    querySelector
  - v-text
    - v-text    它类似于innerText  ,它是全标签的替换
    - {{}}插值语法   部 分替换
  - v-html
    - 用于富文本   带标签的字符串
  - v-model
    - 表单元素
    - 双向绑定
    - input  v-model=“值‘    input框的值与v-model的值双向绑定在一起
  - v-on
    - @事件名="简短的js或者function"
  - this   vue的实例
  - 三个修饰符
    - @keyup.enter   回车才执行
    - .stop   阻止冒泡
    - .prevent  阻止默认事件
  - v-bind基本用法
    - ：属性名=”属性值“
  - v-bind的class用法
    - :class="{class类名:boolean值}"
    - true使用该class   false不使用
  - v-for  
    - v-for="(item,index) in 数组"   ：key="index"
  - v-if  v-else-if v-else
  - forEach
    - 数组.forEach((item,index)=>{   代码})
    - 遍历数组
    - 停不下来，哪怕用了return它也停不下来

- 第二天

  - key值
    - 为了让vue更好识别
    - key=值
  - v-show/v-if
    - v-if控制标签是否渲染
    - v-show控制 标签是否显示   display:none
  - v-cloak  
    - vue实例化后会去掉该属性
    - [v-cloak]{display:none}
  - v-once  只执行一次
  - v-pre保持原样
  - axios
    - axios.get(url,{params:{参数}}).then(res=>{成功返回}).catch(err=>{错误返回})
    - axios.post(url,{}).then(res=>{}).catch(err=>{})
    - axios({method:"get/post",url:"",params:{get传参},data:{post传参}}).then().catch()
  - vue生命周期
    - beforeCreate:创建前，它还不能访问data与methods
    - created:创建后，可以访问data与methods，但是还不能访问vue渲染后的dom,
    - beforeMount:渲染前，还是不能访问vue渲染后的dom
    - mounted:渲染后，可以访问vue渲染后的dom
    - beforeUpdate:更新前，数据（页面中使用的数据）已修改，但是页面还没有完成渲染
    - updated:更新后，数据已修改，且页面已完成渲染
  - 计算属性
    - 使用场景：依赖一个或者多个数据产生一个新的数据
    - 放在computed:{}
    - 本质是一个函数 
    - return一个值，这个值就是它的结果 
    - 它可以当属性使用
    - 它是实时响应

- 第三天

  - ref基本使用
    - 在标签上定义一个ref属性   ref="名字"
    - 获取dom   this.$refs.名字
  - IScroll基本使用
    - 导包
    - 布局
      - 三层dom结构
      - css  去掉滚动条
      - 加上一个定位
    - 实例化
      - myIscroll=new IScroll(dom,{mouseWheel:true,scrollbars:true})
      - myIscroll.refresh()
  - 单元素动画
    - 使用场景：进入/离开    v-if/v-show
    - 用transition包住
    - 给一个name   name是class的前缀
    - .xxx-enter-active  进入动画的执行体
    - .xxx-leave-active  离开动画的执行体
    - .xxx-enter   进入前的状态
    - .xxx-leave-to  离开时的状态
  - 多元素动画
    - 用transtion-group包住
    - 每一个元素都要加一个key值
  - findIndex
    - 返回值=数组.findIndex((item,index)=>{return boolean值})
    - boolean值为true时返回当前的index
    - 如果 全都为false,返回值=-1

- 第四天

  - 什么叫组件
    - 功能模块的封闭，html  css  js的综合封装
  - 基本结构
    - template   
      - 要用一个标签包住
    - script
      - 不需要el
      - data(){return {//数据}}
    - style
      - @import url(//路径)
  - 组件套组件
    - import 组件名 from "组件路径"
    - 注册   components:{组件名}
    - 使用   <组件名></组件名>
  - 在组件中使用axios
    - 安装axios   npm i axios
    - 导入axios   import axios from 'axios'
    - 使用
  - 组件间的传值
    - 父传子
      - 在子组件定义一个ref
        - ref="名字"
      - 访问子组件this   this.$refs.名字
    - 子传父
      - 访问父组件this
        - this.$parent
  - export default     import 

- 第五天

  - css作用域
    - scoped  加入后只管自己，如果 有子组件，管到子组件最外层
  - 路由就是一个指向，把相应url后面地址指向一个组件
  - 路由基本使用
    - 安装路由   npm i vue-router
    - 导入    import  VueRouter from 'vue-router'
    - 注册   Vue.use(VueRouter)
    - 实例化   const router=new VueRouter({routes:[{path:"地址"，component:组件名}]})
    - 注入   new Vue({router})
    - 路由出口   router-view
  - router-link  相当于a标签   
    - router-link  to="地址"
    - ：to=“{path:"地址"}”
    - tag="div"
  - 编程式导航
    - this.$router.push(路径)

- element-ui

  - 安装   npm i element-ui
  - 导入   复制
  - 使用  复制

- 路由传值

  - this.$router.push("地址？名字=值")
  - this.$route.query.名字

- 过滤器基本使用

  - 定义一个过滤器方法
    - filters:{ 方法(参数){return 值}}
  - 调用   {{ 参数   |  方法名}}

- 

- 第六天

  - $router  管理者，管理整 个路由

  - $route  获取当前路由基本信息

  - moment

    - moment().format("YYYY-MM-DD HH:mm:ss")

  - 侦听器

    - 放在watch:{}

    - 写一个需要侦听的值

    - 去掉this

    - 转换成字符串

    - 写一个方法

      - newVal当前 值
      - oldVal修改前一刻的值

      只要值变化 ，这就会执行

- axios基地址

  - axios.defaults.baseURL
  - Vue.prototype.$axios=axios

- 路由抽取

  - export default  router
    - npm i vue-router
    - import VueRouter from "vue-router"
    - Vue.use(VueRouter)
    - const router=new VueRouter({routes:[{path:"地址"，component:"组件 名"}]})
    - export default router
    - 在main中导入   import router from '地址'
    - new Vue({router})

  

  







































