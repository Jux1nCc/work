# day02 - 黑马面面

## 反馈

 今天感觉还是不错的，就是知识点有点多，细节也不少，有一丢丢跟不上。

## 回顾

1. 创建并运行项目

   1. 创建：vue create 项目名  （不要大写字母）
   2. 运行  npm run serve

2. git回顾

   ~~~
   将远程仓库地址添加到本地
   git remote add origin 仓库地址
   提交所有代码到远程仓库同时建立分支联系
   git push -u origin master
   将代码添加到暂存
   git add .
   记录一下更改
   git commit -m"注释信息"
   提交上去
   git push
   查看一下杠地状态
   git status
   查看一下记录信息
   git log
   查看一行的记录信息
   git log --oneline
   查看本地分支
   git branch
   创建分支
   git branch 分支名
   切换分支
   git checkout 分支名
   将指定分支合并到当前分支
   git merge 分支名
   删除分支
   git branch -d 分支名
   
   ~~~

3. 路由

   ~~~
   1：安装插件  
     npm i vue-router
   2:导入插件
      import VueRouter from 'vue-router'
   3:注册
      import Vue from "vue"
      Vue.use(VueRouter)
   4:实例化
      const router = new VueRouter({
      //写一些路由配制
      routes:[]
      })
      输出出去   export default router
   5:注入到vue实例
     import router from '路径'
      new Vue({
      router
      })
   6：在App.vue相应位置加上router-view路由出口
   
   ~~~

4. element的全局引入 

   1. 安装  npm i element-ui
   2. 导入  import ElementUi from "element-ui"
   3. 导入css  import "css路径在官网复制"
   4. 注册   Vue.use(ElementUi )

5. @的使用

   1. 在html与js中使用@相当于src
   2. 在style里面使用~@相当于src

6. el-input

   1. v-model双向绑定值
   2. prefix-icon在input框前面加上图标

7. 栅格系统 

   分24栅栏

   el-row  代表一行

   el-row下el-col 代表栏   它有一个属性span的值就是它的栏数   :span=“值”

8. 多选框

   el-checkbox

   1. v-model就是双向绑定的值
      1. 当v-model的默认值为字符串时，当选中checkbox与不选中，那它的值为true/false，
      2. 当v-model的默认值是数组时，它的值就是在该数组中是否添加当前选项的label值
   2. 它每一项的值是用label表示 

9. 表单  el-form

   1. 值的绑定:model="值"
   2. 表单的标题宽度  label-width
   3. 表单元素的每一个字项我们都是用el-form-item包住，
   4. el-form-item它有一个label属性该label属性就是这一项的标题



## Element - ui 表单元素 基本使用

> 表单元素的使用有挺多需要设置的内容，比如绑定数据时，需要遵守他的格式哦、

表单的数据绑定

```html
    <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动地点">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="活动性质">
                <el-checkbox v-model="form.isChecked">是否同意用户协议</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
```

1. el-form设置`:model`绑定整个表单数据对象
2. 表单元素通过`数据对象.属性`进行数据绑定

## 登录模块 - 表单布局 - 输入框

> 表单区域的内容，我们基于Element-ui的默认结构调整为需要的样子，先调整输入框

1. 拷贝el-form到左侧盒子
2. 调整结构，设置属性
3. 调整样式即可

~~~html
              <!-- 
        1:加一个el-form表单，再加入子项el-form-item
           :model属性，绑定表单元素的值
        2:在el-form-item下加入一个el-input
           v-model双向绑定表单元素的值
           placeholder
           prefix-icon  input前面图标
           show-password是否显示密码图标，以点点形式显示           
      -->
<el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :show-password="true"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
~~~



## 登录模块 - 表单布局 - 验证码

> 验证码部分的布局，用到了栅格，我们来整合一下

步骤:

1. 使用栅格把这一行分为2份
   1. 栅格一行 24份
2. 左侧输入框
3. 右侧是图片

~~~html
       <!-- 栅栏处理共24栏
             el-row：行
                它有一个子项是el-col 代表栏 多少栏  :span="栏数"
        -->
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img src="@/assets/img/key.jpg" class="key" alt />
            </el-col>
          </el-row>
        </el-form-item>
~~~



##  登录模块 - 表单布局 - 协议

> 协议部分用到了复选框，以及文字链接，我们来整合一下

步骤:

​      整体使用`el-checkbox`

~~~html
     <!-- 
          el-checkbox
          v-model默认值可以来一个空字符串，这样的的选择结果就是true/false
          el-link  type决定颜色 
        -->
        <el-form-item>
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
~~~



## 登录模块 - 表单布局 - 底部按钮

> 底部的按钮，需要稍微调整一下样式，动起手来

步骤:

1. 按钮的类型都是蓝色`primary`
2. 宽度设置100%
3. 第二个按钮顶部间隙26px

~~~html
        <!-- el-button
             type="值"  值决定按钮的颜色
        -->
        <el-form-item>
          <el-button class="btn" type="primary">登陆</el-button>
          <br />
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
~~~



注意:

1. 这里可以添加自定义的类名来编写样式

2. 如果样式不生效
   1. 选择器没有命中 `审查元素`
   2. 权重不够`加权重`
      1. 不要用`!important`，太过暴力，行内样式都无法覆盖
   
   ~~~vue
   <template>
     <div class="login">
       <div class="left">
         <div class="title">
           <img src="@/assets/img/title_logo.png" alt />
           <span class="titleName">黑马面面</span>
           <span class="titleLine">|</span>
           <span class="titleName2">用户登陆</span>
         </div>
         <el-form class="form">
           <!-- prefix-icon是输入框头部图标，后面的值为icon的对应字符串 -->
           <el-form-item>
             <el-input prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
           </el-form-item>
           <el-form-item>
             <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" show-></el-input>
           </el-form-item>
           <el-form-item>
             <el-row :gutter="0">
               <el-col :span="16">
                 <el-input placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
               </el-col>
               <el-col :span="8">
                 <img class="code" src="@/assets/img/key.jpg" alt />
               </el-col>
             </el-row>
           </el-form-item>
           <el-form-item>
             <el-checkbox>
               <span>
                 我已阅读并同意
                 <span class="color1">用户协议</span>和
                 <span class="color1">隐私条款</span>
               </span>
             </el-checkbox>
           </el-form-item>
           <el-form-item>
             <el-button class="btn" type="primary">登陆</el-button>
             <br />
             <el-button class="btn" type="primary">注册</el-button>
           </el-form-item>
         </el-form>
       </div>
       <div class="right">
         <img src="@/assets/img/login_banner_ele.png" alt />
       </div>
     </div>
   </template>
   <script>
   export default {
     name: "login"
   };
   </script>
   <style lang="less">
   .login {
     /* 弹性盒子布局 */
     display: flex;
     /* 水平布局 */
     justify-content: space-around;
     /* 垂直居中 */
     align-items: center;
     height: 100%;
     background: linear-gradient(
       225deg,
       rgba(20, 147, 250, 1),
       rgba(1, 198, 250, 1)
     );
     .left {
       width: 478px;
       height: 550px;
       padding: 42px;
       background-color: #f5f5f5;
       .title {
         display: flex;
         align-items: center;
         .titleName {
           font-size: 24px;
           font-weight: 400;
           color: rgba(12, 12, 12, 1);
           margin: 0 15px;
         }
         .titleName2 {
           font-size: 22px;
           font-weight: 400;
           color: rgba(12, 12, 12, 1);
           margin: 0 15px;
         }
       }
       // 表单布局
       .form {
         padding-top: 30px;
         .code {
           width: 100%;
           height: 40px;
           padding-top: 3px;
           border: 1px dashed #ccc;
         }
         .color1 {
           color: #3296fa;
         }
         .btn {
           width: 100%;
         }
         .btn:last-child {
           margin-top: 26px;
         }
       }
     }
   }
   </style>
   ~~~
   
   



## Element - ui表单 - 表单验证

> 用户输入了的内容是不可控的，咱们需要使用表单验证功能哦

[传送门](https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng)

数据验证:

1. 基本上接口都会验证数据，目的是避免错误数据提交
2. 前端一般也会验证数据，避免`正常用户的误操作`，降低服务器的性能消耗

~~~
        <!-- el-form:整个表单  
            label-width整个表单下面所有标题的宽度
            model:绑定值,就是绑定整个表单的值 
            el-form-item是表单元素的每一项   label属性就是该项的标题
            rules绑定验证规则
              rules:{
                  名字：[]//后面是一个数组
                  名字（该名字来自于el-form-item里面的prop属性的值，它一定要是表单元素v-model的值）
                  例：el-form-item下的表单元素的v-model="ruleForm.name" 那么el-form-item下的prop一定要是name
                  需要验证的子项才写prop
                  验证规则参数说明
                   { required: true, message: '请输入活动名称', trigger: 'blur' },
                   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                   required：必填，如果没填报错误信息message的值
                   message:错误提示信息
                   trigger:在什么情况下触发这个验证，有二个值供我们选择blur失焦  change  值改变的时候触发
                   min:最小长度
                   max：最大长度                   
              }
        -->
~~~



```html
<body>
    <!-- 挂载的元素 -->
    <div id="app">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 引入组件库 -->
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script>
        const app = new Vue({
            el: "#app",
            data: {
                ruleForm: {
                    name: '',
                    password: '',
                },
                rules: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
                    ],
                }
            }
        })
    </script>

</body>
```

注意:

1. <el-form 
   1. rules属性，传入验证规则
2. form-item
   1. prop属性 和验证的规则相对应
3. data中定义rules属性
   1. 设置校验的规则
      1. required:必须
      2. message：提示的消息
      3. trigger：失去焦点
      4. min:最短长度
      5. max:最长长度

## Element - ui表单 - 验证方法及表单重置

> 默认的验证只局限于单个元素，如果想全部验证，要如何实现呢？

[传送门](https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze)

```javascript
methods: {
    submitForm(formName) {
        // 上面传入的 formName是 ruleForm
        // $refs作用是 获取 页面中使用ref标记的元素
        // 等同于 this.$refs['ruleForm'] 相当于获取到了el-form的this
        // this.$refs['ruleForm'] 等同于 this.$refs.ruleForm
        // validate这个方法是Element-ui的表单el-form的组件方法
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('对啦!');
                // 验证正确
            } else {
                alert("错啦")
                // 验证错误
                return false;
            }
        });
    },
    // 重置表单
    resetForm(formName) {
        // 等同于 this.$refs['ruleForm'] 相当于获取到了el-form的this
        // this.$refs['ruleForm'] 等同于 this.$refs.ruleForm
        // resetFields 也是Element-ui表单的方法
        this.$refs[formName].resetFields();
    }
}
```

注意:

1. element-ui示例代码中 通过`this.$refs[xxx]`的语法获取表单元素
2. 等价于`this.$refs.xxx`
3. `resetFields`,`validate`这两个方法都是element-ui提供的，其他元素无法使用







## 回顾表单验证

表单验证

1. 首先写好相应布局，绑定好相应数据

   ~~~
   el-form :   :model="表单对象"  
   el-form-item     el-input  v-model="表单对象的值"        
   ~~~

2. 定义绑定验证规则属性

   ~~~
   el-form rules属性   :rules="rules"
   rules它是一个对象
   ~~~

3. 设定需要验证的值，设置el-form-item  里面的prop属性

   ~~~
   el-form-item  prop属性的值就是表单元素后面v-model绑定的值，名字要一样
   v-model="form.phone"    prop="phone"
   ~~~

4. 在rules里面写相应的验证规则

   ~~~
   rules:{
   名字（prop定义的值）：[
   {required:true(是否必填), message:"错误信息",trigger:"blur/change"}
   {min:最小长度,max:最大长度，message:"",trigger:"blur/change"}
   ]
   }
   ~~~

js实现全表单验证

执行el-form组件上的validate方法

通过访问el-form组件的this来该用它的方法

1. 在el-form上定义一个ref属性  ref="值"
2. 访问el-form的this    this.$refs.值==el-form的this
3. this.$refs.值.validate((result)=>{//这里的result相当于就是全表单验证的结果true/false})

表单数据重置

this.$refs.值.resetFields()





## Element - ui 消息提示

> 默认的alert并不好看，工作中也基本不会使用，Element-ui为咱们封装好了提示组件，如何使用呢？

[传送门](https://element.eleme.cn/#/zh-CN/component/message#message-xiao-xi-ti-shi)



```javascript

    this.$message('默认弹框')

    // this.$message({
    //     message: "你成功啦！！",
    //     type: 'success'
    // })
    this.$message.success('你成功啦')

    this.$message.warning('这是一个警告哦！！')

    this.$message.error('这是一个错误哦！！')

```



## 登录模块 - 表单验证整合

> 将刚刚弄好的表单验证整合到登录模块中，点击登录要触发验证哦

步骤

1. 密码:非空验证，6-12位长度验证
2. 验证码：非空，4位长度验证
3. `<el-form`,
   1. `ref=loginForm`
   2. `:rules=rules`
      1. rules定义在data中
4. `<el-item`
   1. `prop`校验的字段相对应
5. 登录按钮绑定点击事件
   1. 触发校验方法
      1. 对：成功弹框
      2. 错：错误弹框

~~~vue
<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/title_logo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登陆</span>
      </div>
      <el-form class="form" :model="form" ref="form" :rules="rules">
        <!-- prefix-icon是输入框头部图标，后面的值为icon的对应字符串 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="0">
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="code" src="@/assets/img/key.jpg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            <span>
              我已阅读并同意
              <span class="color1">用户协议</span>和
              <span class="color1">隐私条款</span>
            </span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submit">登陆</el-button>
          <br />
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        phone: "", //手机号
        password: "", //密码
        code: "", //验证码
        isCheck: []
      },
      rules: {
        phone: [
          { required: true, message: "请填入手机号！", trigger: "change" }
        ],
        password: [
          { required: true, message: "请填入密码！", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "请输入6-12位密码！",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            min: 4,
            max: 4,
            message: "请填入验证码！",
            trigger: "change"
          }
        ],
        isCheck: [
          { required: true, message: "请填入用户名！", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submit() {
      window.console.log(this.form);
      this.$refs.form.validate(result => {
        window.console.log(result);
      });
    }
  }
};
</script>
<style lang="less">
.login {
  /* 弹性盒子布局 */
  display: flex;
  /* 水平布局 */
  justify-content: space-around;
  /* 垂直居中 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    padding: 42px;
    background-color: #f5f5f5;
    .title {
      display: flex;
      align-items: center;
      .titleName {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
      .titleName2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
    }
    // 表单布局
    .form {
      padding-top: 30px;
      .code {
        width: 100%;
        height: 40px;
        padding-top: 3px;
        border: 1px dashed #ccc;
      }
      .color1 {
        color: #3296fa;
      }
      .btn {
        width: 100%;
      }
      .btn:last-child {
        margin-top: 26px;
      }
    }
  }
}
</style>
~~~



git 记录

```bash
git add .
git commit -m"登录模块 - 整合表单验证"
```







## Element - ui 对话框

> 点击弹出的那个框框，是Element-ui提供的对话框组件

[传送门](https://element.eleme.cn/#/zh-CN/component/dialog#dialog-dui-hua-kuang)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <style>
        .el-dialog__header {
            background: linear-gradient(to right, #02c6fc, #1394fb);
        }

        .el-dialog__title {
            color: white;
        }
    </style>
</head>

<body>
    <!-- 挂载的元素 -->
    <div id="app">
        <!-- Form -->
        <el-button type="text" @click="isSHow = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog center width="603px" title="用户注册" :visible.sync="isSHow">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isSHow = false">取 消</el-button>
                <el-button type="primary" @click="isSHow = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 引入组件库 -->
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script>
        const app = new Vue({
            el: "#app",
            data: {
                isSHow: true,
                form: {
                    name: '',
                },
                // 左侧文本的间隙
                formLabelWidth: '120px'
            }
        })
    </script>

</body>

</html>
```

注意：

1. `el-dialog`
   1. 需要添加到页面上
   2. center
      1. 设置了就居中
      2. 不设置 两边
   3. width:对话框的宽度
   4. :visible.sync 是否显示
2. 内部可以嵌套其他的标签，用和该标签是一样的





## 注册模块 - 分支切换

> 登录模块除接口调用，都写完了，接口的部署明天来做，接下来我们做注册模块，先把分支操纵一波

步骤：

1. 某个分支的逻辑写完了之后，合并到主分支，并删除这个分支

   ~~~
   将某分支合并到当前分支
   git merge 分支名
   删除
   git branch -d 分支名
   ~~~

   

2. 开始写新功能了，创建该功能对应的分支，并切换过去

3. 切换到`master`主分支

4. 将`login`分支合并到主分支

5. 删除`login`分支



注意:

1. 分支的目的，方便代码的管理，中间试错的过程中，不会影响其他分支
2. 删除的目的：
   1. 先确定，代码已经`合并`
   2. 多余的分支删除，更加利于观察
3. 如何确定合并成功
   1. sourceTree点击主分支，发现，进度和合并的分支相同
4. 分支合并



## 注册模块 - 组件抽取

> 注册模块的的逻辑挺多的，咱们将他抽取为组件，方便代码管理



步骤：

1. 创建组件`register.vue`
2. `login.vue`中导入，注册并使用
3. `login.vue`中为注册按钮绑定点击事件，弹出`register`
   1. 本质是通过ref修改一个布尔值

register.vue

~~~vue
<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>
<style>
</style>
~~~

login.vue

~~~vue
<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/title_logo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登陆</span>
      </div>
      <el-form class="form" :model="form" ref="form" :rules="rules">
        <!-- prefix-icon是输入框头部图标，后面的值为icon的对应字符串 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="0">
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="code" src="@/assets/img/key.jpg" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            <span>
              我已阅读并同意
              <span class="color1">用户协议</span>和
              <span class="color1">隐私条款</span>
            </span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="loginClick">登陆</el-button>
          <br />
          <el-button class="btn" type="primary" @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
    <register ref="register"></register>
  </div>
</template>
<script>
import register from "./register.vue";
export default {
  name: "login",
  components: {
    register
  },
  data() {
    return {
      form: {
        phone: "", //手机号
        password: "", //密码
        code: "", //验证码
        isCheck: []
      },
      rules: {
        phone: [
          { required: true, message: "请填入手机号！", trigger: "change" }
        ],
        password: [
          { required: true, message: "请填入密码！", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "请输入6-12位密码！",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            min: 4,
            max: 4,
            message: "请填入验证码！",
            trigger: "change"
          }
        ],
        isCheck: [
          { required: true, message: "请填入用户名！", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //   登陆点击
    loginClick() {
      window.console.log(this.form);
      this.$refs.form.validate(result => {
        window.console.log(result);
      });
    },
    // 注册点击
    registerClick() {
      this.$refs.register.dialogFormVisible = true;
    }
  }
};
</script>
<style lang="less">
.login {
  /* 弹性盒子布局 */
  display: flex;
  /* 水平布局 */
  justify-content: space-around;
  /* 垂直居中 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    padding: 42px;
    background-color: #f5f5f5;
    .title {
      display: flex;
      align-items: center;
      .titleName {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
      .titleName2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
    }
    // 表单布局
    .form {
      padding-top: 30px;
      .code {
        width: 100%;
        height: 40px;
        padding-top: 3px;
        border: 1px dashed #ccc;
      }
      .color1 {
        color: #3296fa;
      }
      .btn {
        width: 100%;
      }
      .btn:last-child {
        margin-top: 26px;
      }
    }
  }
}
</style>
~~~



## 注册模块-标题栏样式处理

>按照设计稿完成标题（用户注册）基本样式

```vue
<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogFormVisible"
    class="register"
    :show-close="false"
    width="600px"
  >
    <h1 slot="title" class="dialogTitle">用户注册</h1>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .dialogTitle {
    text-align: center;
    color: #fff;
    height: 53px;
    background-color: rgb(14, 156, 250);
    font-size: 18px;
    line-height: 53px;
  }
}
</style>
```



## Vue-cli 环境变量

> 为了方便我们设置数据，脚手架提供了`环境变量功能`，可以用来保存任何数据，开发中保存基地址居多，鉴于此我们可以把`环境变量`理解为一个变量就可以了

[传送门](https://cli.vuejs.org/zh/guide/mode-and-env.html)

2个环境

   1. 开发环境（development）：
      1. `npm run serve`是开发环境

       	2. 正在编码，代码还没有写好

2. 生产环境（production）：
      1. `npm run build`生产环境
      2. 代码写好了，项目打包的时候，代码会被部署到线



**使用步骤:**

1. 项目根目录下创建`.env.development`文件
2. 内部通过如下格式定义键值对
   1. `VUE_APP_xxx`=`值`
   2. 必须以`VUE_APP_`开头
   3. 可以写任意个值
3. 项目的代码中通过`process.env.VUE_APP_xx`



**注意:**

1. 如果修改了`.env.development`内部的值，必须重新`npm run serve`
2. 键值对必须以固定值开头
3. 任意的代码中都可以获取
4. 访问的方式通过`process.env`

## 环境变量整合

> 我们把本地接口的基地址通过环境变量整合到项目中

步骤:

1. 基地址:http://127.0.0.1/heimamm/public
2. 项目`根目录`下创建`.env.development`文件
3. 内部写上键值对
   1. `VUE_APP_名字`=基地址
   2. 环境变量在vue中使用规则：以`VUE_APP_`开头
4. 测试一下
   1. 页面中访问环境变量定义的值是：`process.env.VUE_APP_名字`
   2. 它就相当于定义了一个全局变量





