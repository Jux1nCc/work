## 一.核心内容

### 1.Vue-cli 入口文件main.js分析

+ main.js中
  + 创建了最外层的 Vue实例
  + 把App.vue这个组件，当做Vue实例内部的最顶级组件并渲染出来
  + 和public/index.html 中的那个id为`app`的div关联起来

![image-20200330211058415](assets/image-20200330211058415.png)



### 2.css作用域控制 

> 不加scoped是全局样式，引入它的地方都可以用，加了scoped，只管自己和自己子组件最外层 

![image-20200331102238421](assets/image-20200331102238421.png)

> 为style 添加加 scoped 属性，变成“私有”样式表

![image-20200331102324663](assets/image-20200331102324663.png)

1. scoped处理css,让它作用域只是相对自己当前组件，不包括自己子组件，但同时可控制子组件最外层的标签样式
2. 简单理解 就是加了scoped就是只是作用于当前自己这个vue文件，不包括其它任何文件（但当前自己组件的子组件的最外层还是可以控制到），但不加就会造成在使用该组件时，它里面的样式就变成了全局样式，








### 3.路由是什么

>路由其实就是一个指向，把路径指向相应的组件地址



#### 3.1 路由的原理

根据hash值的不同展示 不同的组件







#### 3.2 路由效果演示

>能够实现路由基本跳转，不同地址对应不同组件内容

1在公司，领导安排工作，别人已做好了一个A页面，你模仿做一个B页面（稍有不同），因为它们功能很相似





#### 3.3 路由的基本使用

>在vue中要实现路由是vue-router来实现

1. 安装插件（注意在项目所在目录进行安装）

   - ```html
     npm i vue-router
     ```

2. 导入插件

   - 在哪里导入插件呢？vue-router是vue的一个插件，也是一个全局的控制 ，所以最终是要挂载到new Vue上的,new Vue是在main文件中执行的，所以vue-router也就得在main文件中导入

   - ```javascript
     import  VueRouter  from  'vue-router'
     ```

3. 注册插件

   - 在vue中，router在vue中要全局使用，是需要注册才行的

   - ```vue
      Vue.use(VueRouter) 
     ```

4. 实例化router

   - ```javascript
      let router = new VueRouter({  })    //router实例化
     ```

   - ```javascript
     //配制router使用规则 
      let router = new VueRouter({  
       routes:[ // 路由规则配置，我们说了，路由就是一个地址与组件的一个指向，这个规则就是配制在这里的
           {
           path: 地址路径，    //这里配制一个路径地址
           component: 组件名   //这里对应一个.vue组件 ，也就是import一个组件，在这对应上
           }
           ] 
      })
     ```

5.  把实例注入到 new Vue 

   - ```javascript
      new Vue({
      router    //这里的router就是上面所实例化的router
      })
     ```

6. 路由出口，告诉router，需要把组件渲染在哪一个位置

      app.vue中写上一个标签，<router-view></router-view>

      router-view标签将来会被匹配到的路径对应的组件替换掉

   **main.js中加入router写法代码**

   ```javascript
   import Vue from 'vue'
   import App from './App.vue'
   // 1:导入vue-router
   import VueRouter from "vue-router"
   //这里Home是自己components下创建的一个组件 
   import Home from "./components/Home"
   // 2:注册vue-router
   Vue.use(VueRouter)
   // 3:实例化vue-router
   const router = new VueRouter({
     // 配制vue-router
     routes: [
       {
         path: "/home",     //路径地址
         component: Home    //路径地址所对应的组件
       }
     ]
   
   })
   Vue.config.productionTip = false
   
   new Vue({
     render: h => h(App),
     router    //4:注入到new Vue实例里面
   }).$mount('#app')
   
   ```

### 4. router-link

用法:

```
<router-link to='/foo(路径)'>跳转至foo</router-link>
//相当于a标签   <a href="#/foo">跳转至foo</a>
//router-link相当于a标签的一种vue写法写法
```






### 5. 编程式导航

>更灵活的控制路由跳转

**用法**

```javascript
this.$router.push('路径')   //这里的路径就是前面路由routes所配制的path
```



**作用**

用js编写路由跳转来实现页面切换

## 二.核心案例

### 1.黑云音乐demo

>展示

-  http://183.237.67.218:3000/banner                                          获取轮播图图片接口地址
-  http://183.237.67.218:3000/search?keywords= 神话               搜索歌曲时接口获取音乐列表
-  http://183.237.67.218:3000/song/url?id=310574                      获取音乐url
-  http://183.237.67.218:3000/comment/music?id=310574         获取 用户评论列表
-  http://183.237.67.218:3000/song/detail?ids=310574                获取音乐详情如图片，演唱者等
-  http://183.237.67.218:3000/lyric?id=310574                              获取歌词
-  http://183.237.67.218:3000/mv/detail?mvid=  mvid                 获取歌曲视频
-   http://183.237.67.218:3000/ 



### 2.在vue-cli中使用elementUI

>学习elementUI在vue中的使用，如何快速完成网站搭建
>
>让我们写更少的js代码，更少的css,拿过来就用

[直通车](https://element.eleme.cn/#/zh-CN/component/installation)

1. 装包（安装elementUI）

   - ```html
     npm i element-ui -S
     ```

2. 导包（因为elementui也有css，所以css也需要导入）

   - ```javascript
     //在main.js中导入以便全局使用
     import ElementUI from 'element-ui';
     import 'element-ui/lib/theme-chalk/index.css';
     ```

3. 注册

   - ```javascript
     Vue.use(ElementUI);
     ```

4. 使用。

   - 在需要使用elementui的组件里面按官网用法复制代码进去使用。



### 3. element轮播图

1. 创建vue-cli    vue create 项目名

2. 安装elementui

3. 导入elementui

   1. ```
      // 导入组件与css
      
      import ElementUI from 'element-ui';
      
      import 'element-ui/lib/theme-chalk/index.css';
      
      // 注册
      
      Vue.use(ElementUI);
      ```

4. 使用组件

   1. 复制粘贴







### 4.黑云音乐轮播图

>用elementUI与axios完成一个轮播图开发

获取轮播图图片接口地址：https://autumnfish.cn/banner?sdgsdg=Math.random()*999





### 5.路由传值

+ 基本使用
  + this.$router.push("/home？id=值")

+ created(){   this.$route.query.id   }



### 6.过滤器的基本使用

>有的时候，有些数据没法直接拿来用，就需要对这些数据进行过滤处理，过滤器就是用来做这个功能的

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



## 三.扩展内容

### 1. props 父组件为子组件传参‘

+ 概念：子组件的 props 属性 可以接收父组件数据

+ 语法：

  + 子组件定义

  ```html
  <template>
  	{{msg}} - 2.在模板中访问 props 属性
  </template>
  
  <script>
  export default {
    props: {
      msg: String // 1.注意：为属性 指定 数据类型
    },
    data() {
      return {
        // 保存 当前 音乐 播放 与否的状态
        isPlay: false,
        coverImg: "/static/images/cover.png"
      };
    }
  };
  </script>
  ```

  + 在父组件中传值

    + 静态数据

    ```html
    <template>
    	<Mid msg="讨厌，死鬼"/> - msg 不需要加:
    </template>
    ```

    + 动态数据

    ```html
    <template>
    	<Mid :msg="loverName"/>
    </template>
    
    <script>
    export default {
      data() {
        return {
          loverName:'Lucy~'
        };
      }
    };
    </script>
    ```

    ![image-20200331094338378](assets/image-20200331094338378.png)

