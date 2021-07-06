## day07 路由

### 1. prop

+ 作用：用来 从 父组件 向 子组件 直接 传参的
+ 特点：可以 直接 把数据 通过 子组件标签 属性 来传递
+ 语法：
  + 子组件 通过 props 属性 来 "暴露" 对象 给 父组件传值
    + 注意：props 中添加的 属性 的值 不要写，只要规定类型就可以了
  + 父组件：通过 子组件标签 属性 直接赋值
    + 静态传值： `属性名="属性值"`
    + 动态传值：` :属性名 = "data.中的数据"`

![image-20200331165448834](assets/image-20200331165448834.png)



### 2.css作用域

+ 语法：`scoped `
+ 实现原理：
  + 一旦 子组件中 的 style 标签 添加了 scoped 属性
  + 那么，在渲染dom时，就会 
    + 为 当前 style 标签中 所有的 样式 都加上一个 `属性选择器 [v-asdjfka]`
    + 为 当前 子组件 template 中的 标签中 也加入   v-asdjfka 属性

![image-20200331170017293](assets/image-20200331170017293.png)

### 3.main.js 文件

+ 是整个 vue 项目的 入口文件
+ 作用：将 App.vue 加载 并 挂载到 index.html 中

![image-20200331170337247](assets/image-20200331170337247.png)

![image-20200331170320734](assets/image-20200331170320734.png)



### 4.路由

+ 概念：本质上 就是 只  根据 不同 url 执行 不同的 子组件

+ 依赖： **vue-router** 的插件

+ 步骤：

  + 1.载插件  **vue-router** -> 在 项目文件夹根目录
  + 2.在 **main.js**  导入  **vue-router**
  + 3.注册  **vue-router ** -> `Vue.use( VueRouter)`
  + 4.创建  **vue-router** 实例对象，并 设置 路由规则

+ 类别：静态路由 和 动态路由

  ```js
  //3.创建 路由对象
  let myRouter = new VueRouter({
    // 路由匹配 列表 - 里面的 path 就不需要加 #号了
    routes: [
      //【静态路由】
      //3.1 hello 匹配规则
      {
        path: '/hello',
        component: HelloWorld
      },
      //3.2 showlove 匹配规则
      {
        path: '/show',
        component: ShowLove
      },
      //【动态路由】
      //3.3 showTo 动态路由规则
      //    在 某段数据前 加上 : ，就变成了动态路由
      //    未来 url中 出现了 匹配的 数据
      //    就会 自动 将 相同位置的 值 设置给
      //    ShowTo 组件中的 $route.params中
      {
        path:'/showTo/:gfname',
        component:ShowTo
      }
    ]
  });
  ```

  

### 5.编程导航

+ 三种方式中，只有 超链接 需要 加入 `#`，其他两个都是由 vuerouter 自动添加
  + 超链接 `<a href="/#/show">表白咯~~</a>`
  + 标签 `<router-link to="/show" >表白谁不会呀~~~</router-link>`
    + 原理：最终生成的 就是一个 超链接
  + 按钮js 

  ```html
  <button @click="go1">我也要向她表白</button>
  
  <script>
  export default {
    data() {
      return {
        strName: ""
      };
    },
    methods: {
      // 可以通过 js 代码 实现 路由的切换
      //                地址栏中的url 就会改变
      go1() {
        this.$router.push("/show");
      },
      go2() {
        this.$router.push("/showto/" + this.strName);
      }
    }
  };
  </script>
  ```

  

















