## day03-axios-生命周期-计算属性-箭头函数this

### 1.axios

+ 特点：
  + 轻量级的 单纯 的 异步请求 JS库
  + 体积小，网络传输快
  + 支持 Promise 语法，避免回调地狱

+ 语法

  + get请求 `axios.get(url , {params{ key:value }}, resFn(res){ }  ,  errFn(res){ });`

  + post请求 `axios.post(url , { key:value}, resFn(res){ }  ,  errFn(res){ });`

  + 配置方式请求

    ​	 `axios({ url, method, data{} , params{} , resFn(res){ }  ,  errFn(res){ } });`

### 2.生命周期

+ vue 的 生命周期 ： 指的是 vue实例 从 创建 到 销毁的 整个过程
+ vue 提供钩子函数：在 vue生命周期的 若干个 环节， 提供 程序员 进行 编码 的 机会
+ 今天学的两个钩子：
  + beforeCreate - vue对象创建好，但 内部数据 尚未 初始化 的时候 执行
  + **created (非常重要，相当于 window.onload)**          - vue对象创建好，且 内部数据 都已经 初始化完毕



### 3.计算属性

+ 语法

```html
<div id="app">
    <input type="text" v-model="loverName" />
    <input type="text" v-model="loverName2" />
    <span>
        {{getName()}}
        {{getName()}}
        
        {{get2Name}}   - 第一次调用：会执行 计算属性的 内部代码，并把 返回值 缓存
        {{get2Name}}   - 第n次调用：直接从 缓存中获取 数据
    </span>
</div>

<script>
    let vm = new Vue({
        el:'#app',
        data:{
            loverName:'小白白1',
            loverName2:'小白白21',
        },
        method:{
            getName(){
                return this.loverName +this.loverName2;
            }
        },
        computed:{ // 计算属性 会有缓存
            get2Name(){
                return this.loverName +this.loverName2;
            }
        }
    });
</script>
```





### 4.作用域是什么？

+ 通俗的说，就是 【函数的 大括号】！！！
+ 原理上说，作用域 就是指  函数 在 【被调用时】 产生的 一个 用来 保存 上下文数据 的 对象。

+ 所以：箭头函数中 因为本身 没有 this，它就去 上级 作用域 拿this 来用

  ​             而上级作用域，就是指  离箭头函数 最近的 函数体！！！





