## day08 过滤器 侦听器 和 黑云音乐

### 1. prop 传参

+ 作用：用来 从 父组件 向 子组件 传值

+ 语法：

  + 子组件：

  ```html
  <template>
    <div>
        <!--使用 props 里面的 数据-->
        {{msg}}，讨厌，死鬼~~~
    </div>
    </el-carousel>
  </template>
  
  
  <script>
  export default {
    name: "Home",
    // 用来 给 父组件来访问的 数据对象 - 常用来 接收 父组件传递的数据
    props:{
        msg:String,
        arr:Array // []
    }
  };
  </script>
  ```

  + 父组件

    标签上 的 值 就被 传递给了 子组件 props 中对应的 属性

  ```html
  //导入 子组件.vue
  //注册 子组件
  //添加 子组件标签 -- 注意 没有加 : 内容都是字符串类型
  //                        加了: 内容是 js 代码
  <子组件 msg="小白" :arr="[1,2,3]" />
  ```

### 2.$router 和 #route 区别

> $router【路由管理器对象】  -> routes【路由信息数组】 -> $route【路由信息对象】

+ $router 【路由管理器对象】

  +  是 在 main.js 文件中 导入 并创建 并 被注入到 Vue实例中 的 VueRouter 对象

+ $route 【路由信息对象】

  + 包含常见属性： path(url路径规则) , component(子组件) 

    ​                             params(动态路由参数对象) , query(get参数对象)

![image-20200401170159897](assets/image-20200401170159897.png)



### 3.路由传值

+ 动态路由传参

  + 模拟url : `localhost:8080/#/showLove/小白`
  + 在 路由信息对象 中 定义 `{ path:"/showLove/:gfname" ,component : ShowLove }`
  + 在 ShowLove.vue 子组件中 ，可以通过 `this.$route.params.gfname ` 获取 `小白`

+ get参数传参

  + 模拟url： `localhost:8080/#/showInof?age=18&gender=女`

  + 在 路由信息对象中 定义 `{path:"/showInfo",component:ShowInfo}`

  + 在 ShowInfo.vue 子组件中，可以通过 `this.$route.qeury.age` 获取 `18`

    ​                                                  可以通过 `this.$route.qeury.gender` 获取 `男`

### 4.过滤器

+ 作用：是用来 处理 文本 格式转换的！！！

+ 特点：过滤器中 不要使用 this!! （ 以为 vue作者 不推荐大家这样做，并且 过滤器中的this 是 window）

+ 语法：

  + 1.定义

    ```js
    data:{
        strName:'江泽民'
    },
    filters:{
        // 过滤器 中 一定是 处理 传入的 数据信息
        proName(val){
            // 返回 名字长度
            return val.length;
        }
    }
    ```

  + 2.使用

  ```html
  <div>
      {{strName | proName}}
  </div>
  ```

  ![image-20200401171054404](assets/image-20200401171054404.png)



### 5.侦听器

+ 作用：监控 data中 单个 属性 数据 是否发生改变的
+ 语法：

```html
<template>
    <div>
        {{strName}}
    </div>
</template>
<script>
data:{
    strName:'江泽民'
},
watch:{
    // 侦听器 名称 必须 和 要侦听 的 属性名 保持一致
    strName(newV,oldV){
        // 处理 数据 变化后的 业务
    }
}
</script>
```

