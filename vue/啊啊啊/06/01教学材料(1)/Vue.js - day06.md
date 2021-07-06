## 反馈

 从开始两天不适应、到现在已跟上飞哥的节奏。相对之前的老师，感觉飞哥貌似更了解实际开发环境。每晚磕磕跘跘写完作业，第二天飞哥再讲一遍逻辑，自己再写一遍，思路更清晰、也更顺畅了。飞哥虽不爱开玩笑，但是态度好好、很负责，给飞哥点赞。采访一下飞哥：没有加班费，还天天陪着我们，请问是责任、是爱吗？（开玩笑，主要是飞哥太严肃了），哈哈哈..话说pc端项目飞哥还坐堂吗？虽然我不问问题，但是你在我就很安心，hahhaha.. 



## 回顾

1. css作用域  scoped

   1. 加：局部使用，只作用当前组件，但是它还会作用于子组件最外层
   2. 不加：全局使用

2. 路由基本使用

3. ~~~
   1:安装插件  npm i vue-router
   2:导入：  import VurRouter from 'vue-router'
   3:注册  Vue.use(VueRouter)
   4:实例化  const router=new VueRouter({
     routes:[
     {
     path:"地址",
     component:组件名
     }
     ]
   })
   5:注入到new Vue({
   router
   })
   6:路由出口  router-view
   
   router-link  to="path"
   ~~~

4. ~~~
   this.$router.push(path)
   获取当前路由信息   this.$route   this.$route.path
   ~~~

5. element

   1. ~~~
      安装  npm i element-ui
      导入 import elementUi from 'element-ui'
          导入css
      注册   Vue.use(elementUi)
      ~~~

6. 导航

   1. ~~~
      el-menu   default-active:  默认选中项  router路由模式  boolean值
           :default-active=“$route.path”
      el-menu-item   index每一项的值
      ~~~

      





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
     this.$router.push("路径?name=xxx&xxx=123")
     ```

2. **接参**（接收参数是在路由跳转到xxx组件后，在xxx组件里面接收）

   - ```javascript
     this.$route.query.name      //这里就可以收到whis.$router.push传递过来的参数了  
     //在相应组件接收参数
     ```





## 路由重定向

>路由重定向就是改变当前的路由地址到另一个路由地址

当访问的某些地址没有在路由中配置时，让它指向一个固定path



```
new VueRouter({
routes:[
{
   //路由重定向： 匹配不到的地址，我们让它跳转至哪里，这里redirect后面的地址就是重定向去的地址
      path: "*",  //需要重定向的地址
      redirect: "/"  //重定向到哪里去
}
]
})
```





## 黑云音乐demo

>展示

- https://autumnfish.cn/banner                                                   获取轮播图图片

- https://autumnfish.cn/personalized/newsong                         获取推荐音乐列表

- https://autumnfish.cn/song/url?id=310574                             获取音乐url（需传id）

- https://autumnfish.cn/search?keywords= 神话                      搜索歌曲时接口获取音乐列表(需传参keywords)

- https://autumnfish.cn/song/detail?ids=310574                      获取音乐详情如图片，演唱者等(需传参数ids)

- https://autumnfish.cn/mv/all                                                      获取mv歌曲列表

- https://autumnfish.cn/search?type=1004&keywords=神话    搜索歌曲mv时接口获取mv列表(需传参type=1004(固定)与keywords)

- https://autumnfish.cn/mv/url?id=10930186                   获取某首歌曲mv的视频地址（需传参id）

- https://autumnfish.cn/mv/detail?mvid=10930186          获取歌曲mv图片等详情（需传参mvid）



## 路由抽取

export default 输出一个东西（一个js只能有一个）,它与import 配对使用

使用： import 名字 from “路径”   





## moment

基本使用：moment().format("YYYY年MM月DD日  HH:mm:ss")

取当前时间并按某格式输出 ： moment().format("时间格式")

给出一个毫秒时间，并按某格式输出 

​                 moment(毫秒时间).format("时间格式")

- Y年   M月   D日    
- H小时，以24小时计   h以12小时计
- m分钟    s 秒

官方文档： [http://momentjs.cn/docs/#/parsing/string/]( http://momentjs.cn/docs/#/parsing/string/ ) 



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

  - 字符加工（特点：它不能使用this）

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

1. axios.defaults.baseURL='设置接口基地址'

2. Vue.prototype.$axios=axios 



## 生命周期之beforeDestroy与destroyed

beforeCreate:创建前，它不能访问访问data与methods

created:创建后，它可以访问data与methods,但是还不能访问vue渲染后的dom

beforeMount:渲染前，它还不能访问vue渲染后的dom

mounted:渲染后，它可以访问vue渲染后的dom

beforeUpdate:更新前，数据已修改，但是页面还没有完成渲染

updated:更新后，数据已修改，且页面已完成渲染

beforeDestroy:销毁前，啥都可以访问，但是准备要销毁了，一般用于善后工作

destroyed:销毁后，中止了渲染，但是还是可以访问data再来methods,但是不能访问vue渲染后的dom,还是可以做善后工作

## export，   export default，   import的基本使用

export default 一个js里只能写一个 

export default 它配套的import不用写import {}它是import 名字  from 路径

export  配套的import  import {名字（export 中对应的名字）}  from "路径"

但是export 可以写多个

使用exporrt default导出的值，在import 名字  from "路径",这个名字可以随便定义

但是使用export 导出的值，在import {名字} from "路径"  这里的名字必须和export的名字对应上



## Vue基础总结

1. 第一天

   1. vue.js是什么：

      1. 它是一个js框架，它只关心数据，无须操作dom,组件化开发

   2. vue基本使用

      1. 导入  2：布局  3：实例化

      2. ~~~
         new Vue({
         el:""  querySelector  不能选择html，body，
         data(){
         return {}
         }，
         methods:{},
         filters:{},过滤器
         computed:{}
         })
         ~~~

   3. vtext

      1. v-text="一句话表达式"  1：变量  2：基本运算  3：三元表达式

   4. {{插值语法}}   1:v-text用于标签上  {{}}用于文本区域

   5. v-html  :用于富文本（带标签的字符串）解析

   6. v-model:用于表单(input textarea,select)元素双向绑定

   7. v-on  

      1. 用法：   @事件名="一句话表达式或者function"

   8. this:vue实例对象

      1. html:不需要加this,
      2. vue里面使用一定要加this,this只管到第一层

   9. v-bind:用于属性绑定

      1. :属性名="一句话表达式"
      2. :class="{class类名:boolean值}"
         1. true:使用它所对应的class类   flase:不使用它所对应的class类

   10. v-for

      1. v-for="(item,index) in 数组" :key="index"  
      2. v-for="(value,key,index) in 对象" :key="index"

   11. v-if/v-show

       1. v-if:用于控制是否渲染该标签  
       2. v-show用于控制 标签是否显示（display:none）

2. 第二天

   1. key:有时候标签长得太像vue也不一定认识

   2. v-cloak

      1. 在vue实例化后会消失
      2. [v-cloak]{display:none}

   3. v-once:只执行一次vue语法

   4. v-pre:不执行vue语法

   5. axios:ie8+

      1. ~~~
         axios.get(url,{params:{get请求参数}}).then.catch
         axios.post(url,{post传参}).then(res=>成功处理).catch(err=>{错误处理})
         axios({
         url:"接口地址",
         method:"get/post"，
         params:{}
         data:{}
         }).then(res=>{成功处理}).catch(err=>{错误处理})
         ~~~

   6. 生命周期

      1. ~~~
         beforeCreate:创建前，它还不能访问data与methods
         created:创建后，可以访问data与methods,但是不能访问vue渲染后的dom,常用于进入页面接口请求
         beforeMount:渲染前，还不能访问vue渲染后的dom
         mounted:渲染后，可以访问vue渲染后的dom,常用于进入页面dom操作
         beforeUpdate:更新前，vue页面上使用的数据已修改，但是还没有完成页面渲染
         updated:更新后，vue页面上使用的数据已修改，且页面已完成相关渲染
         
         ~~~

   7. 计算属性

      1. 使用场景：依赖一个或者多个值产生一个新的值，而且该值是实时响应
      2. 用法：放在computed:{}
      3. 本质是一个function 一定要return一个值，可以当属性使用（缓存了产生的新值）

3. 第三天

   1. ref
      1. 用于dom获取
      2. 1：在相应标签上加一个ref  ref="值"
      3. 2：this.$refs.值====该标签dom
   2. $nextTick,setTimeout高级版本，计算好了渲染所需要时间，它是一个异步操作
   3. 单元素动画
      1. 条件 ：进入/离开   v-if/v-show
      2. 使用
         1. 用tranistion包住
         2. 在transition标签上加一个name  name的值就是后面css的前缀
         3. .xxx-enter-active:进入动画执行体
         4. .xxx-leave-active:离开动画执行体
         5. .xxx-enter:进入前，从什么状态到正常状态
         6. .xxx-leave-to:离开时，从正常状态变到什么状态
   4. 多元素动画
      1. 用transition-group包住
      2. 每一个项都要加一个key值

4. 第四天

   1. .vue

      1. ~~~
         html:template  
           注意点：必须要用一个标签包住
          js:
          el:不需要了，因为template就是它的使用范围
          data(){
          return {
          
          }
          }
          css:导入时有些不同
            @import url(路径)
         ~~~

   2. 组件套用组件

      1. 导入
      2. 注册   components:{}
      3. 使用，当标签使用

   3. 组件中使用外部插件

      1. 装包  npm i 插件名
      2. 导入  import 名字  from "插件名"
      3. 使用  名字 

   4. 组件传值

      1. 父传子：
         1. 在子组件标签上定义一个ref属性  ref="值"
         2. 访问子组件的this ===this.$refs.值
      2. 子传父
         1. this.$parent===父组件this

   5. 脚手架目录结构 

      1. ~~~
         src
            components:公用子组件
            views:路由对应页面组件
            App.vue:最大的父组件
            main.js:进入页面的js（将index.html与App.vue建立 联系）
            router：路由文本件
            api:接口调用
            assets:静态资源 
         ~~~

5. 第五天

   1. css

      1. scoped:
         1. 加：只管当前组件，还有子组件最外层
         2. 不加：全局使用

   2. 路由：

   3. ~~~
      1：安装  vue-router
      2:导入  import VueRouter from 'vue-router'
      3:注册  Vue.use(VueRouter)
      4:实例化
         const router=new VueRouter({
         routes:[
         {
         path:"地址",
         component:组件名
         }，
         {
         path:"*"，
         redirect:"/"
         }
         ]
         })
        5:注入到new Vue({router})
        6:路由出口  router-view
      ~~~

6. ~~~
   router-link  to="path"
   ~~~

7. ~~~
   this.$router.push({
   path:"地址",
   query:{
   参数名:参数值
   }
   })
   this.$route.query.参数名
   ~~~

8. ~~~
   1:安装  npm i element-ui
   2:导入”  import elementUi from 'element-ui'
      导入css
      Vue.use(elementUi)
   ~~~

9. ~~~
   导航菜单
     el-menu   default-active:默认选中哪一项
               router:true使用路由模式
       el-menu-item   index:每一项的值  index="path"
   ~~~

10. 路由传值

11. 过滤器

    1. 字符加工

    2. 定义~~~

    3. ~~~
       放到filters:{
       方法名(参数){
       return 值
       }
       }
       调用  ：{{参数 | 方法名}} 和v-bind 
       ~~~

第六天

1. ~~~
   moment
       moment().format("YYYY年MM月DD日 HH时mm分ss秒")
      moment(时间戳).format("YYYY年MM月DD日 HH时mm分ss秒")
   ~~~

2. ~~~
   axios基地址配制
   axios.defaults.baseURL="基地址"
   Vue.prototype.$axios=axios
   this.$axios
   ~~~

3. ~~~
   export default  与  import 
   export 与import 
   export可以写多个，但是export default只能写一个
   export {a}  export {b}  =====  export {a,b}
   export {值，方法}    import {值，方法}  from "路径"
   ~~~

4. 













































