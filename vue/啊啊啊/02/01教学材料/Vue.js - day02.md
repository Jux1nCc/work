# Vue.js - day02

## 反馈

1.	林哥：偶尔炸麦 偶尔爽 飞哥：一直炸麦 一直爽 耳朵要‘怀孕’了
1.	nice，再多点互动就好了
1.	奥利给!!~~,会讲作业题吗
1.	怎么说呢,第一天感觉不错,老师讲课铿锵有力,同桌上课都不打瞌睡了
1.	作业做不完啊（吴远铭）
1.	收货不错
1.	普通话太有味了 爱了
1.	👍👍



## 回顾

1. vue.js是什么：

   1. js框架，它只关心数据，无须操作dom

2. 基本使用

   1. 导包

   2. 布局

   3. 实例化

   4. ~~~
      new Vue({
      el:"确定使用范围"   querySelector 不能使用html与body
      data:{},
      methods:{}
      })
      ~~~

3. v-text类似于innerText

   1. 用法:   v-text="一句话表达式"
      1. 变量
      2. 基本运算
      3. 三元表达式

4. {{}}插值语法

   1. 使用地方：它是用于文本区域
   2. 它是部分文本内容替换

5. v-html  用于富文本解析

6. v-model:表单数据双向绑定

   1. 表单：input textarea  select
   2. 将表单元素的值与v-model的值合二为一
   3. v-model="变量"

7. v-on

   1. 用法：  @事件名="一句话表达式或者function"

8. 修饰符

   1. .stop  阻止冒泡
   2. .prevent 阻止默认事件
   3. .enter回车事件

9. this

   1. this就是vue实例对象
   2. 在html里不要加this
   3. 在methods里一定要加this

10. v-bind

    1. 用于绑定属性控制属性的值
    2. 用法   :属性名="属性值"

11. v-bind对象用法

    1. :class="{class类名:boolean值}"
    2. true:使用它对应的class
    3. false不使用它对应class

12. v-for

    1. 用于列表渲染
    2. 用法： v-for="(item,index) in 数组"
    3. item:数组每一项   index 数组索引

13. v-if

    1. 作用：控制标签是否渲染

    2. 用法:   v-if="boolean值"

    3. true:  渲染它所在标签

    4. false:不渲染它所在标签

    5. v-else-if  v-else

       1. 一定要是相连的兄弟标签

       



















## 第一天英雄完整demo分析与讲解

1. 列表处理
   1. v-for循环处理数组
   2. 点击事件   @click=""
      1. heroIndex去保存当前点击项
      2. heroIndex=0
   3. ：class=“{active:heroIndex==自已当前索引}”
2. 详情处理
   1. 姓名：{{}} hero[heroIndex].name
   2. 图片   :src="hero[heroIndex].img"
   3. 英雄特征
      1. v-for="item  in hero[heroIndex].roles"   
      2. {{item}}
   4. 英雄故事
      1. 富文本   v-html="hero[heroIndex].story"
3. 搜索处理
   1. input框
      1. 双向绑定  v-model  表单元素的value与v-model的值绑定在一起了
      2. @keyup.enter="搜索事件"
   2. button按钮
      1. @click="搜索事件"
   3. 搜索事件
      1. 遍历处理
      2. 每一项匹配
         1. item.name.indexOf(输入框的值)！=-1
         2. heroIndex=找到项的index
         3. return
   4. 优化
      1. 隐藏列表中不相关的
         1. v-if="item.name.indexOf(输入框的值)！=-1"
         2. 希望回车时才响应
            1. 回车时存储一下输入框的值
            2. v-if使用这个存储的值
      2. 找不到数据的处理
         1. 通过搜索时给heroIndex=-1的初始值如果 没找到heroIndex最终为-1
         2. 通过v-if判断 heroIndex是否为-1来确定是否显示暂无数据

















1. 列表部分处理
   1. v-for对数组进行遍历处理，显示 出相应name就OK了
   2. 完成相应状态的绑定v-bind:{active:bol}   当前点击项是否是v-for里面的当前项，通过索引 与index进行比较就OK了
   3. 给列表绑定一个事件，保存一下当前点击项的索引值
2. 英雄详情处理
   1. 根据heroIndex（点击项的索引）取出相应数据 hero[heroIndex]
   2. 英雄名字{{}}
   3. 图片  :src
   4. 英雄特征  v-for
   5. 英雄故事  v-html
3. 英雄名字索引功能处理
   1. input框来一个v-model   @keyup.enter
   2. buttton按钮也来一个@click   
   3. 搜索事件处理
      1. 对hero数组进行遍历处理
      2. 找出第一项名字中包含相应字符的  name.indexOf(输入框的值)
      3. 改变heroIndex为相应的索引值
      4. 列表做一个v-if处理，name.indexOf(输入框的值)！=-1
4. 搜索不到数据的处理
   1. 搜索时给heroIndex=-1来个初始值，如果 找到了，heroIndex就不会为-1了
   2. 通过v-if=“heroIndex==-1”来确定是否有数据，来显示相应的暂无 数据





## v-for用于对象

用法： v-for="(value,key,index(序号：从0开始)) in 对象"







## key值的基本使用

>有时候标签长得太像，vue也不一定能识别

[直通车](https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0)

**用法：**

```html
  <div  key="1"></div> 
  //  这里的key也可用于属性绑定，兄弟标签间，最好独一无二的值(常结合for一起使用，用于for循环里面的索引值传递给key,以达到for的每一次都是独一无二)，如:
 <div v-for="(item,index) in list" :key="index"></div> 
```

**功能：**当我们写的一些html标签相似度太高时，vue识别的时候是有可能 识别不出来 的，加上key相当于加了个编号 ，让vue更准确的识别出来，不至于我们在进行一些值修改什么的时候出错。

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
        <button @click="isShow=!isShow">点我切换</button>
        <!-- 不加key值前，在input框输入值了切换，vue是识别不出来的
              加入key值，给标签加了一个身份，这时它就能识别了
        -->
        <div v-if="isShow">
            <!-- <div v-if="isShow" key="1"> -->
            <p>用户名</p>
            <input type="text" placeholder="请输入姓名">
        </div>
        <div v-else>
            <p>密码</p>
            <input type="text" placeholder="请输入密码">
        </div>
    </div>
    <script src="./vue.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                isShow: true
            },
            methods: {

            }
        })

    </script>
</body>

</html>
```







## v-show指令

>控制标签是否显示

[直通车](https://cn.vuejs.org/v2/guide/conditional.html#v-show)

**用法：**和v-if类似   如:   

` v-show="一句话表达式（最后转换成boolean值，如果为真，则进行该标签显示，如果为假则该标签将display:none隐藏）" ` 

 **功能：**进行所在标签的显示与隐藏，但不管显示与隐藏，这标签都会渲染出来

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
        <button @click="isShow=!isShow">点我切换</button>
        <!-- v-show只是设置标签的显示与隐藏display:none， 
        input框的值还能保留下来，v-if是不能保留下来这个值的
        -->
        <div v-show="isShow" key="1">
            <p>用户名</p>
            <input type="text" placeholder="请输入姓名">
        </div>
        <div v-show="!isShow">
            <p>密码</p>
            <input type="text" placeholder="请输入密码">
        </div>

    </div>
    <script src="./vue.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                isShow: true
            },
            methods: {

            }
        })

    </script>
</body>

</html>
```



## v-if与v-show对比

>`v-if`是对标签控制是否进行渲染。
>
>如果true   渲染该标签
>
>如果为false  不会渲染该标签
>
>`v-show`只是控制标签的显示与隐藏（display:none）。



**应用场景：**

- 当某些标签需要频繁切换使用时，建议优先考虑`v-show`,主要是在性能方向会更佳一些
- 当某些标签需要判断 条件较多，且切换不太频繁，就优先考虑`v-if`      



## v-cloak指令（了解）

>控制vue实例化完成前的dom样式

[直通车](https://cn.vuejs.org/v2/api/#v-cloak)

**用法：**

```html
/* 通过属性选择器获取该属性所在标签来改变样式 */
[v-cloak] {
  display: none;
}
    <!-- 给标签加一个v-cloak属性（这时候可通过这个属性控制标签在vue实例化前的样式了），在vue实例化完成之后，v-cloak属性会消失 -->
<div id="#app" v-cloak>
  {{ message }}
</div>
```

 **功能：**用于vue进行实例渲染完成前这段时间标签的样式处理，像上面代码就不至于让用户在vue渲染完成前看到{{message}}这些字符



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    /* 通过属性选择器获取该属性所在标签来改变样式 */
    [v-cloak] {
        display: none;
    }
</style>

<body>
    <!-- 给标签加一个v-cloak属性（这时候可通过这个属性控制标签在vue实例化前的样式了），在vue实例化完成之后，v-cloak属性会消失 -->
    <div id="app" v-cloak>
        {{msg}}
    </div>
    <script src="./vue.js"></script>
    <script>
        setTimeout(() => {
            new Vue({
                el: "#app",
                data: {
                    msg: "测试一下"
                }
            })
        }, 2000)
    </script>
</body>

</html>
```







## v-once指令（了解）

>让该标签所有指令只执行一次

[直通车](https://cn.vuejs.org/v2/api/#v-once)

**用法：**

```html
 <span v-once>This will never change: {{msg}}</span> 
```

 **功能：**让它所在标签只接受一次渲染，渲染一次后，后面再有值的改变它也不会再变化 

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
        <button @click="index+=1">点我改变</button>
        <!-- 用了v-once后该p标签里面的index是会取一次值，取完一次后，index将不再允许改变 -->
        <p v-once>{{index}}</p>

    </div>
    <script src="./vue.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                index: 0
            }
        })
    </script>
</body>

</html>
```



## v-pre指令（了解）

> 不能该标签进行值的处理，原样输出

[直通车](https://cn.vuejs.org/v2/api/#v-pre)

**用法：**

```html
<span v-pre>{{ message }}</span>
```

 **功能：**用了v-pre的标签，里面是什么内容，就展示什么内容，对它而言，不存在变量什么的，像上面用法里面例 子，它只会打印出{{message}}   而不会解析出message变量。

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
    <!-- 标签里加入了v-pre后就不存在插值语法之类的操作了，就是标签里面所有内容都是纯文本内容，这东西基本用不上，了解就可以了 -->
    <div id="app" v-pre>
        {{msg}}
    </div>
    <script src="./vue.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                msg: "123"
            }
        })
    </script>
</body>

</html>
```



## axios基本介绍 

> ajax请求

[官网地址](http://www.axios-js.com/zh-cn/docs/#%E7%89%B9%E6%80%A7)

vue全家桶

vue-cli脚手架  axios  router vuex element

> **axios也是一种ajax请求。**
>
> **为什么用axios？**
>
> - 原生的ajax过于麻烦，调用不方便。
> - jquery相比ajax过于宠大，我们有时候公公只需要一个网络接口请求功能。
> - axios只做接口请求，体积较小，网络加载会快些，而且功能还挺丰富如（请求拦截，数据 返回拦截等。后面会讲） 

## axios之get请求

get 请求可用接口： https://autumnfish.cn/api/joke/list?num=10

**用法：**

```javascript
//get请求
axios.get('请求接口路径', 
          //params就是要传的参数，也可直接串到路径上
          {params: {
              ID: 12345
           }}
           )
    .then(response=>{console.log("成功的处理");})  
    .catch(error=>{console.log("错误的处理");});
```

**Demo:**

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
        <button @click="clickEvent">点我获取数据</button>
        <ul>
            <li v-for="(item, index) in axiosRes" :key="index">{{item}}</li>
        </ul>
    </div>
    <script src="./vue.js"></script>
    <!-- 要使用axios，首先要要导包进来 -->
    <script src="./axios.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                axiosRes: ""
            },
            methods: {
                clickEvent() {

                    // axios.get(url).then(//正常返回).catch(//错误返回)  参数直接写url上
                    //axios.get(url,{params:{//参数}}).then(//正常返回).catch(//错误返回)

                    //箭头函数用法
                    // axios.get('https://autumnfish.cn/api/joke/list?num=10')
                    //     .then(res => {
                    //         this.axiosRes = res.data.jokes
                    //     })
                    //     .catch((error) => {
                    //         console.log(error)
                    //     });

                    // 传统用法
                    let _this = this
                    axios.get('https://autumnfish.cn/api/joke/list?num=10')
                        .then(function (res) {
                            _this.axiosRes = res.data.jokes
                        })
                        .catch((error) => {
                            console.log(error)
                        });

                }
            }
        })

    </script>


</body>

</html>
```

## axios之post请求

post请求可用接口： https://autumnfish.cn/api/user/reg       参数:   username 

**用法**

```javascript
//post请求
axios.post('请求接口路径',          
           {     //接口请求参数
            firstName: 'Fred',
            lastName: 'Flintstone'
             })
    .then(response=>{console.log("成功的处理");})  
    .catch(error=>{console.log("错误的处理");});
```

**Demo**

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
        <input type="text" v-model="username">
        <button @click="poseEvent">调用post</button>
        <div>
            {{msg}}
        </div>


    </div>
    <script src="./vue.js"></script>
    <script src="./axios.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                username: "",
                msg: ""
            },
            methods: {
                poseEvent() {
                    // axios.post(url，{//需要传递的参数}).then((res)=>{//成功返回}).catch(err=>{//错误返回})
                    axios.post("https://autumnfish.cn/api/user/reg", {
                        username: this.username
                    }).then(res => {
                        this.msg = res
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        })
    </script>
</body>

</html>
```



## axios之config配制模式使用

**用法**

- ```javascript
  //axios(config)模式  
  axios({
      	method: '请求方法如:post.get',
          url: '请求接口路径',
      //post需要传递的参数
          data: {
          xxx: 'oooo'
           },
      //get接口地址上需要传递的参数
          params: {
                ID: 12345
           }    
  }).then(response=>{console.log("成功的处理");})  
    .catch(error=>{console.log("错误的处理");});
  ```
  
    **注意：推荐大家学习上面的config模式，更加灵活，企业里面主体使用也是这种模式。**
  
  get 请求可用接口： https://autumnfish.cn/api/joke/list?num=10
  
  post请求可用接口： https://autumnfish.cn/api/user/reg       参数:   username 
  
  **config模式下的get与post请求**



## es6补充forEach与map

 forEach

forEach:没返回值(undefined)，能改变原始数组,它的循环根本停不下来

 map

 返回值=数组.map((item,index)=>{

   return 值  它return什么，它的返回值就push什么，如果你不写return ,它就push(undefined)

 })







## vue生命周期之beforeCreate、created

>在vue中如果在页面加载时获取数据呢？

[直通车](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

> **`beforeCreate`:创建前，不能访问`data`与`methods`**，在当前 vue实例生命周期，只会执行一次
>
> **`created`:创建后，能访问`data`与`methods`**,**但是也还是不能访问`dom，`**在当前 vue实例生命周期，只会执行一次
>
> **注：所有的生命周期都是函数** 

**用法：**

它是用在vue实例化里面的

```javascript
new Vue({
  el: '#app',
  methods: {
  },
  beforeCreate(){},
  created(){}
})
```

**功能：**  

- `beforeCreate`:基本没啥用，可能以后项目很长一段时间你们都用不到

- `created`:能用于取数据,比如url上参数，接口取值等 ，目前主体是接口在这调用最合适。



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
        <ul>
            <li v-for="(item,index) in list" :for="index">{{item}}</li>
        </ul>
    </div>
    <script src="./vue.js"></script>
    <script src="./axios.js"></script>
    <script>
        // 实例化
        new Vue({
            el: "div",
            data: {
                list: []
            },
            methods: {
                test(msg) {
                    console.log(msg);
                }
            },
            beforeCreate() {
                // beforeCreate无法访问data里面的属性与methods里面的方法，
                // this.test("beforeCreate")
                console.log("beforeCreate:", this.list)

            },
            created() {
        // created是能够访问data里面的属性也能访问methods里面的方法，但不能访问dom（vue所加工处理后的dom，这点后面会讲）
                this.test("created")
                console.log("created:", this.list)
                axios({
                    url: "https://autumnfish.cn/api/joke/list",
                    method: "get",
                    params: {
                        num: 10
                    }
                }).then(response => {
                    this.list = response.data.jokes
                    console.log(response)
                })
            }
        })
    </script>
</body>

</html>
```



## 英雄Demo网络版本

**所需要接口:**

-  查询英雄名称接口：  https://autumnfish.cn/api/lol/search   
  - 请求方式：get     参数：q:英雄名（可选）
- 根据英雄id查询英雄详情的接口： https://autumnfish.cn/api/lol/info
  - 请求方式：get     参数:  id:英雄id

通过上述接口优化完成英雄Demo成动态数据

一定要用findIndex includes



1. 列表功能
   1. created调用接口获取 数据
      1. axios   get 
   2. 列表渲染 
      1. v-for
      2. class处理  :class=“{active:bol}”
      3. 列表要加点击事件
         1. 存储当前点击索引
2. 详情功能
   1. 在created调用列表接口之后调用详情接口
   2. 获取第一个英雄详情
   3. 在data中来个info存储起来
   4. 将info渲染出来
      1. 名字： {{}}   
      2. 图片   :src
      3. 英雄特征  v-for
      4. 英雄故事  v-html
3. 完善点击功能
   1. 通过heroIndex将详情与列表联系起来
4. 完成搜索功能
   1. input框  v-model  @keyup.enter=搜索事件
   2. 搜索按钮  @click="搜索事件"
   3. 搜索事件
      1. 直接调用接口
      2. axios  get    q=输入框的值
      3. 获取到列表
      4. 替换以前的列表
5. 优化
   1. 搜索时将heroIndex=0



















流程：

1. 进入页面调用接口，获取 英雄列表
2. 将列表渲染出来
3. 实现class绑定
4. 实现点击 调用详情
5. 将详情数据绑定到html
6. 处理默认展示第一个人物详情
7. 实现搜索
8. 处理查询 不到数据时的v-if

## 计算属性computed

>依赖一个或者多个数据而生成一个新的数据时，考虑用计算属性

**用法：**

```javascript
           //计算属性都是写在vue中的computed对象下面的
           // 计算属性实质是一个函数 ，它的值就是它return的结果 
           // 我们可以直接当属性去使用它  所以使用时就是：计算属性名字，
           computed: {                
                计算属性名字() {
                    return 需要返回的结果，这里也是计算属性的值
                }
            }
```

**作用：**对data中数据进行二次加工，同时会实时的响应data中数据变化 ，data中数据变了，它立马会改变，同时不改变data中的数据，自己得到的结果 也会缓存 起来当属性使用。

**计算属性实质就是一个函数 ，只不过函数return什么，它的结果 就是什么，它可以直接当一个属性去使用**

[直通车](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)

**计算属性基本使用demo**

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
        <p>{{msg}}</p>
        <p>{{msg.split("").reverse().join("")+"."}}</p>
        <br>
        <br>
        <br>
        <br>
        <p>{{msg.split("").reverse().join("")+"."}}</p>
        <br>
        <br>
        <br>
        <p>{{msg.split("").reverse().join("")+"."}}</p>
        <h3>{{formatMsg.length}}</h3>
        <h3>{{formatMsg}}</h3>
        <h3>{{formatMsg}}</h3>
        <h3>{{formatMsg}}</h3>
        <h3>{{formatMsg}}</h3>
    </div>
    <script src="./vue.js"></script>
    <script src="./axios.js"></script>
    <script>
        new Vue({
            el: "#app",
            data: {
                msg: "abcde"

            },
            computed: {
                // 计算属性实质是不是一个函数 ，它的值就是它return的结果 
                // 因为我们可以直接当属性去使用它,它一定要放在computed
                formatMsg() {
                    return this.msg.split("").reverse().join("") + 123
                }
            },
            methods: {

            }
        })
    </script>
</body>

</html>
```



## es6方法补充

1. forEach

   1. 循环遍历数组

   2. 用法:  

   3. ~~~
      数组.forEach((item,index)=>{
      item代表数组每一项值，index代表数组下标
      })
      特点：根本停不下来，一定要执行到循环结束，return也停不下来，没有返回值
      ~~~

   4. 

2. findIndex

   1. 用于查找 数据中符合条件的下标

   2. ~~~
      返回值=数组.findIndex((item,index)=>{
      return boolean值
      如果boolean值=true 返回值=index,中止循环
      如果boolean值=false 继续循环直到循环结果都全是false的话，返回值=-1
      })
      ~~~

3. includes:

   1. 用于查找 数组与字符串中是否包含某个字符

   2. ~~~
      返回值=数组.includes(str)
      如果数组包含str刚返回值为true
      不包含就是false
      ~~~

   3. ~~~
      返回值=字符串.includes(str)
      如果字符串中包含str刚返回值为true
      不包含就是false
      ~~~

   4. ~~~
      注意点:[].includes('')   返回值false
            "xxx".includes('') 返回值true
      ~~~

   5. 





## 今天一定要掌握的知识点

1. v-for用于对象

   1. v-for="(value,key,index) in 对象"

2. key:有时候标签长得太像vue也无法识别时，给标签加一个身份标识 

   1. v-for  

3. v-if与v-show

   1. v-if用于控制 标签是否渲染/v-show用于控制标签是否显示（display:none）
   2. 使用场景：多条件（v-if）  频繁切换用v-show,实际项目主体使用v-if

4. v-cloak

   1. 如果在标签上加了一个v-cloak属性，在new Vue实例化后会消失

   2. ~~~
      [v-cloak]{
      display:none
      }
      ~~~

5. v-once:只执行一次vue语法

6. v-pre:不执行vue语法

7. axios

8. ~~~
   axios.get(url,{params:{//get参数}}).then(res=>{
   //成功处理
   }).catch(err=>{
   //错误处理
   })
   axios.post(url,{post参数}).then(res=>{
   //成功处理
   }).catch(err=>{
   //错误处理
   })
   axios({
   url:"请求地址",
   method:"get/post",
   params:{},
   data:{}
   }).then(res=>{
   成功处理
   }).catch(err=>{
   错误处理
   })
   ~~~

9. 生命周期

   1. ~~~
      所有生命周期都是回调函数，它都是自动执行
      beforeCreate:创建前，还不能访问data与methods
      created:创建后，可以访问data与methods.进入页面接口请求
      ~~~

10. 计算属性

    1. 使用场景：依赖一个或者多个值产生一个新的值，而且该值是实时响应
    2. 用法：放在computed:{},本质是一个function ,它一定要return 一个值，而且该值就是该属性产生的新值，可以当属性使用
