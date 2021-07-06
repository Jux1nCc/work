## 一.核心知识

### 1.组件间的传值

>如果A组件中引入了B组件 ，这样我们称A组件为父组件，B为子组件

#### 1.1 父组件传值给子组件

- 在子组件标签上定义一个ref属性

  ```html
    <组件名 ref="xxx"></组件名> 
  ```

- 在需要给子组件传值的地方写入：

  ```javascript
  this.$refs.xxx   //这就代表了子组件xxx的vue实例
  //这里xxx代码标签中定义的ref属性名这里就可访问到子组件里面的data属性与methods方法
  //如要修改子组件里面data里的某个值：          this.$refs.xxx.子组件里data属性名
  //如果需要调用子组件里面methods里某个方法：   this.$refs.xxx.子组件里面methods里方法名   
  ```

#### 1.2 子组件传值给父组件

```javascript
    this.$parent    //这就代表父组件的vue实例
    //如要修改父组件里面data里的某个值：         this.$parent.父组件里data属性名
    //如果需要调用父组件里面methods里某个方法：   this.$parent.父组件里面methods里方法名   
```

+ 注意：`ref`获取到的dom信息在这里与`document.getElementById`是有本质 区别的
  + getElementById 返回的 **纯dom** 只包含了 dom 属性
  + ref 返回的 **包装后的dom** 包含了 dom属性 和 vue实例成员

```html
//两个组件，这个是father.vue
<template>
  <div>
    <button @click="btnClick">点我获取数据</button>
    <div>你选中的当前歌曲:{{localSong}}</div>
    <son ref="son" id="son"></son>
  </div>
</template>
<script>
// 组件使用，导包，注册，使用
//1：导包
import axios from "axios";
import son from "./son.vue";
export default {
  data() {
    return {
      songs: [],
      localSong: ""
    };
  },
    //2：注册
  components: {
    son
  },
  methods: {
    btnClick() {
      window.console.log("ref访问：", this.$refs.son.$el);
      window.console.log("原生访问:", document.getElementById("son"));
      //要调接口，是不是要使用axios
      //装包，导包，用包
      axios({
        url:
          "https://autumnfish.cn/search?keywords=神话&_t=" + Math.random() * 100
      }).then(res => {
        //   父组件传递子组件值，在子组件上定义一个ref,通过this.$refs.名字，我们就能访问子组件的实例，也就是可访问子组件data属性与methods方法
        this.$refs.son.songs = res.data.result.songs;
        this.$refs.son.alertEvent();
        window.console.log(res.data.result.songs);
      });
    }
  }
};
</script>
<style>
</style>
```

```vue
//son.vue
<template>
  <ul>
    <li v-for="(item, index) in songs" :key="index" @click="liCLick(item.name)">{{item.name}}</li>
  </ul>
</template>
<script>
// 子组件访问父组件里的data与methods更简单，只需要this.$parent就够了
export default {
  data() {
    return {
      songs: []
    };
  },
  methods: {
    liCLick(name) {
      this.$parent.localSong = name;
      window.console.log("访问父组件：", name, this.$parent);
    },
    alertEvent() {
      alert(123);
    }
  }
};
</script>
<style>
</style>
```



#### * 播放器列表组件抽取







### 2.export与impot 插件

> 我们可以 自己写插件，然后使用 export 导出 和 import 导入 插件

+ 输出：export default   值

```js
// a.js
export default { name: 'ruiky'};
```

+ 导入：import 名字  form  路径

```js
// b.js 
import MyA from './a';
```



### 3.悦听音乐播放器

>用单文件组件 方式实现音乐播放器，
>
>需求：音乐列表，评论列表都要抽离成单独组件。

![image-20200327075439015](assets/image-20200327075439015.png)

接口：

http://183.237.67.218:3000/

-  http://183.237.67.218:3000/search?keywords= 神话               搜索歌曲时接口获取音乐列表
-  http://183.237.67.218:3000/song/url?id=310574                      获取音乐url
-  http://183.237.67.218:3000/comment/music?id=310574         获取 用户评论列表
-  http://183.237.67.218:3000/song/detail?ids=310574                获取 音乐详情   如图片，演唱者等

流程：

1. 创建app.vue，将html里面的布局移入app.vue，实现基本样式
2. 完成搜索功能
   1. input框v-model绑定，同时@keyup.enter绑定搜索事件
   2. 搜索事件调用axios
      1. 安装 axios 
      2. app.vue中导入axios
      3. 在搜索事件中调用axios获取歌曲列表
   3. 将歌曲列表抽离成组件
      1. 在components里创建一个列表组件
      2. 在app.vue中导入列表组件
      3. 注册列表组件
      4. 在html相应位置放入列表组件
   4. 通过父子传值将搜索事件中的列表数据传入列表组件 
   5. 实现歌曲播放功能
      1. 在歌曲列表里绑定事件，传入歌曲id
      2. 在app.vue中写方法调用axios获取歌曲url
      3. 在歌曲列表中调用app.vue中的方法
      4. 将歌曲获得的url绑定到audio上
   6. 实现中间动画部分功能
      1. 动画播放是通过控制 playing的class去控制的
      2. 所以在获取歌曲url后，动画就应该立马播放，所以通过v-bind控制playing为true
      3. audio有二个事件也需要控制 动画，
         1. play播放状态时，
         2. pause暂停状态时
   7. 完成评论组件
      1. 通过歌曲id获取评论接口





### 4.Vue-cli项目创建

[直通车](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

> 什么是脚手架？
> 脚手架 就是个项目模板 ， 相当于把整个文件基本目录结构搭好了，把必要的文件也建好 了，让我们省了很多事情。

#### 4.1 创建项目

+ 1.创建时路径不要选错，就是命令的路径要是需要创建项目的文件夹下

+ 2.运行创建命令

```html
vue create 项目名      //这里项目名不要有中文，不要有大写字母，不要搞特殊符号，尽可能有意义 ，像普通变量命名一样
```

+ 3.弹出的对话框先选择默认的选项（如下图）

![](assets/1562485415022.png)

+ 稍等一会，等进度条走完 提示如下画面说明成功了,如下图：

![](assets/1562485530804.png)

#### 4.2 运行项目

+ 进入项目文件夹(就是项目名的文件夹)
  
+ `cd 项目名` 直接根据提示即可 
  
+ 运行项目：`  npm run serve`

  稍等片刻 ，出现如下效果说明成功了

![](assets/1562485640647.png)



#### 4.3 报错的原因

1. ![1562485820281](assets/1562485820281.png)

   创建的命令输入错误`create`输入成了`creat`

2. ![1562485879426](assets/1562485879426.png)

   1. 网络问题，有线换无线，无线换4G
   2. 终端的权限问题；新建管理员模式的终端
   3. 当前这个文件夹，这个文件被其他软件占用：关闭所有可能影响的软件（重启）
   4. npm包管理工具的问题:（前面安装时已做说明）
      1. 用yarn来安装
      2. 执行``npm cache clean -f`` 在重新创建项目

3. ![1562486092416](assets/1562486092416.png)

   创建项目时，用到了第三方模块，文件太多了git人为没有必要管，提示你一下，选择不再显示就OK了

   vue-cli创建项目时，已经设置了git忽略文件 就在`.gitignore`中



#### 4.4 实在无法创建项目的解决方案（重要）

1. vue-cli创建项目的本质是：

   1. 创建文件夹
   2. 下载第三方模块
   3. 创建项目的基本结构
   4. 设置各个文件之间的关系
   5. 创建git仓库

2. 找一个可以创建项目的人，创建一个项目

   1. 删除`node_modules`
   2. 发给你
   3. 你使用`npm i `安装项目中用到的第三方模块
   4. 运行项目`npm run serve`

### 5.Vue-cli项目结构

**项目结构说明：**

![image-20191226162056314](assets/image-20191226162056314.png)

- node_modules       第三方模块包，也就是项目所需要用到的依赖包
- public
  - favicon.ico     运行项目时在网页上显示 的小图标
  - index.html      项目的页面模板 ，也就是项目运行最开始，是先执行这个模板html的
- src                            项目开发主体就是在这个src目录下面
  - assets               项目所需要的静态资源，如css,图片等文件
  - components     项目中的单文件组件都放这里
  - App.vue             入口组件 ，可以理解为一个项目就是一个app.vue的单文件组件，只不过里面包括了很多小组件
  - main.js              入口js文件，进入项目会优先执行main.js以此来运行app.vue
- .gitignore                让git忽略某些文件，文件夹
- babel.config.js           js编译的设置，比如把高版本的js转为低版本的js,让项目达到更好兼容性
- package-lock.json     项目模块详细信息，包括来源。
- package.json              项目基本信息
- README.md                项目说明



### 6.Vue-cli 入口文件main.js分析

1. main.js中
   1. 创建了最外层的Vue实例
   2. 把App.vue这个组件，当做Vue实例内部的最顶级组件并渲染出来
   3. 和public/index.html 中的那个id为`app`的div关联起来