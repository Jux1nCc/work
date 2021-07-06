# day03 - 黑马面面

## 反馈

讲课细致入微 我很喜欢 得空一起去洗jio

飞飞老师讲的很细，容易理解，奥利给，虽然我们班基础好像是弱了点，但是老师讲原理拓展啥的，我们也要听。😌 😌 😌 /storage/emulated/0/Android/data/com.baidu.input_huawei/cache/emotion/4ac2d1b50295c591989f61d0c34d0f050be5b54246d7543c427d3304bc76ab82.0.jpeg

主体element    ant-design

移动端ui组件库特别多

综合应用做出黑马面面项目----小知识点，git，

## 回顾

表单验证（element里面的一些关键词不是一定要你们记住，关键是会用就可以）

1. 写好布局，绑定好相应数据

   ~~~
   el-form      :model="绑定表单数据"   
   el-form-item   el-input   v-model="表单对象的值"
   ~~~

2. 绑定验证规则属性

   ~~~
   el-form   rules属性   表单验证规则都写里面    :rules="值（rules）"
   rules值是一个对象
   ~~~

3. el-form-item上的prop属性（设置需要验证项的prop属性）

   ~~~
   el-form-item   prop="值（与该表单项表单元素绑定的值相同）"
   el-input   v-model="form.name"    prop="name"
   ~~~

4. 写出相应验证规则

   ~~~
   rules：{
   name:[
   {required:true,message:"错误信息",trigger:"blur/change"}
   ]
   }
   ~~~

5. 全局验证与重置

   1. 都是调用el-form组件上的一个方法validate   resetFields

   2. 父组件调用子组件里面的方法

      1. 在子组件相应标签上定义一个ref属性   ref="值"
      2. 通过访问子组件this来调用子组件方法
         1. this.$refs.值.方法()

   3. 全局验证

      1. 在el-form   ref="form"

      2. ~~~
         this.$refs.form.validate(result=>{
         result就是全局验证的结果
         所有验证都通过，result=true
         只要有一个验证不能过  result=false
         })
         ~~~

   4. 重置表单数据

      this.$refs.form.resetFields()

6. 消息提醒

   ~~~
   this.$message("默认提醒")
   this.$message.success("成功提醒")
   this.$message.error("错误提醒")
   this.$message.warning("警告提醒")
   ~~~

7. 弹窗  el-dialog

   ~~~
   visible.sync 值就是控制该弹窗是否显示 
   width  宽度
   show-close是否显示关闭按钮
   
   主体有个注意点，它里面可以通过slot重写某一部分
   slot="title/footer"
   <el-dialog>
   <div slot="title"></div>
   <div slot="footer"></div>
   </dl-dialog>
   ~~~

   

## 昨天出错最多的点

scoped上面

加上scoped它会控制style里面的样式只管当前组件和子组件最外层

scoped只管你看得到的



## Vue-cli 环境变量

> 为了方便我们设置数据，脚手架提供了`环境变量功能`，可以用来保存任何数据，开发中保存基地址居多，鉴于此我们可以把`环境变量`理解为一个变量就可以了

[传送门](https://cli.vuejs.org/zh/guide/mode-and-env.html)

2个环境

   1. 开发环境（development）：

      1. `npm run serve`是开发环境

        2. 正在编码，代码还没有写好
2. 生产环境（production）：
      1. `npm run build`生产环境（打包上线）
      2. 代码写好了，项目打包的时候，代码会被部署到线
   3. 后端 接口会不会也有二环境
         1. 开发环境 
         2. 生产环境
         3. 后端接口是不是就会有二个接口地址



**使用步骤:**

1. 项目根目录下创建`.env.development`文件
2. 内部通过如下格式定义键值对
   1. `VUE_APP_xxx`=`值`
   2. 必须以`VUE_APP_`开头
   3. 可以写任意个值
3. 项目的代码中通过`process.env.VUE_APP_xx`



总结：

1. 定义

   1. 开发环境定义

      1. 创建一个.env.development
      2. 在该文件下可以定义一些开发环境使用的全局变量
         1. 名字有一个规则  必须 VUE_APP_开头

   2. 生产环境

      1. 创建一个.env.production 
      2. 在该文件下可以定义一些生产环境使用的全局变量
         1. 名字有一个规则  必须 VUE_APP_开头

      、

2. 使用定义的变量

   1. 固定写法：process.env.变量名（VUE_APP_开头的变量）

3. 注意点：

   1. 定义好后要重新执行npm run serve才能使用定义的变量
   2. 它是全局变量，任何生命同期都可调用



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
   3. 不要在html里面使用`process.env.VUE_APP_名字`

## Element - ui 文件上传

> 文件是一个比较常见的功能,Element-ui也帮我们封装好了哦，底层用的其实还是`formData`，上传成功的回调函数中可以获取到服务器的响应值哦

[传送门](https://element.eleme.cn/#/zh-CN/component/upload#yong-hu-tou-xiang-shang-chuan)

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
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    </style>
</head>

<body>
    <!-- 挂载的元素 -->
    <div id="app">
        <!-- 
            action:上传的接口地址
             :on-success:上传成功的回调函数
             :before-upload 上传之前
         -->
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <!-- imageUrl有值，显示图片 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <!-- imageUrl没有值 显示的是i标签 -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 引入组件库 -->
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script>
        const app = new Vue({
            el: "#app",
            data: {
                imageUrl: ""
            },
            methods: {
                // 上传成功
                // file 文件的各种信息
                // file.raw 文件对象
                // res是接口响应的数据
                handleAvatarSuccess(res, file) {
                    console.log(res)
                    console.log(file)
                    // URL.createObjectURL 生成的是本地的临时路径，刷新就没用了
                    this.imageUrl = URL.createObjectURL(file.raw);
                },
                // 上传之前
                // file 是文件 对象
                beforeAvatarUpload(file) {
                    console.log(file)
                    const isJPG = file.type === 'image/jpeg';
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isJPG) {
                        this.$message.error('上传头像图片只能是 JPG 格式!');
                    }
                    if (!isLt2M) {
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                    }
                    return isJPG && isLt2M;
                }
            }
        })
    </script>

</body>

</html>
```

注意:

1. 内部还是调用了ajax，通过formData将文件提交到了服务器
2. 默认提交的参数名`file`，如有必要需要调整一下



## 注册模块-文件上传基本功能实现

> 上传组件整合到注册模块的页面中，上传的地址替换为本地的接口地址

步骤:

1. 顶部增加文件上传组件，通过`el-form-item`包裹
2. 把需要的属性进行设置
   1. 上传地址
   2. 本地预览地址
   3. 上传成功的回调函数
3. 样式

`html部分`

​		**action:**上传接口地址

​		**name:**上传的file文件传数名

​		**show-file-list：** 是否显示已上传文件列表 

​		**with-credentials：**上传接口调用时支持带上cookie

​		**on-success：**上传成功后的回调函数

​		**before-upload：**上传前的回调函数

~~~html
      <el-form-item label="头像">
            <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/uploads'"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>


~~~



js部分

~~~js
 data() {
    return {
      dialogFormVisible: false,
      // 表单数据
      form: {
        // 头像地址
        avatar: ""
      },
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: ""
    };
  },
  methods: {
    // 上传前处理
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 它return的值就是控制让不让你通过  true通过  false不通过
      // return false
      return isJPG && isLt2M;
    },
    // 上传成功处理
    handleAvatarSuccess(res) {
      window.console.log(res);
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
    }
  }
~~~

css部分

~~~css
<style lang="less" scoped>
.register {
  .title {
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
}
</style>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
~~~





注意:

1. 默认的地址是Element-ui的 需要调整为自己的
2. 默认的参数是`file`需要更改通过`name`属性进行设置

## 上午回顾

1. 环境变量使用

   1. 定义
      1. 开发环境   .env.development     VUE_APP_开头
      2. 生产环境    .env.production          VUE_APP_开头
   2. 调用，它是全局变量，在js任意地方都可使用，不要在html里面使用
      1. process.env.变量名（VUE_APP_开头的值）

2. 文件上传

   1. el-upload

      1. action  上传接口地址

      2. name   上传接口的参数   name="参数名"

      3. show-file-list   是否显示上传文件列表

      4. before-upload  上传前的回调函数

         1. 往往用于文件类型与大小判断 处理
         2. 该回调函数里面有一个file参数
         3. 该回调函数需要return一个值，true表示 通过，false表示 不通过

      5. on-success 上传成功后的回调函数

         1. 返回调用上传成功接口后的返回值，该值就是回调函数的第一个参数

            







## 注册模块-文件上传加入检验

流程

1. 加入下面取消与确定按钮，加入了全局验证

   1. 也就是在el-dialog 下面加了个div  slot="footer",来了二按钮
   2. 在确定按钮上来了一个全局验证
      1. 在el-form  定义一个ref
      2. 调用el-form的全局验证方法  this.$refs.form.validate(result=>{})

2. 在加入上传验证

   1. 在el-form上绑定一个rules属性
   2. 在el-form-item的上传项上加一个  prop="avatar"
   3. 写rules上写相应的验证规则   
   4. 由于上传图片该组件的值不能双向绑定，所以它要主动触发验证
      1. this.$refs.form.validateField(需要验证的项)

   

图片上传需要额外加一个处理，就是图片上传成功后的回调函数里要加入一个上传的检验

注意：图片上传成功后，表单的自定义检验不会自动执行，需要人工触发一次

~~~js
  //这里validateField方法就是自定义只需要单独检验某项表单元素，
//这里的regirest为form上定义的ref属性，通过ref调用form表单的validateField方法
  this.$refs.regirest.validateField("avatar", error => {
        window.console.log("错误信息：", error);
      });
~~~



## 注册模块-昵称基本功能

html

~~~js
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
~~~

js

~~~js
//1:data的form中加入username
//2:在rules中加入相应检验
  username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ]
~~~



## 注册模块-邮箱基本功能

html

~~~
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
~~~

js

~~~
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" }
        ]
~~~



## Element - ui 自定义校验规则

> 如果只是简单的非空验证，长度验证，使用默认的设置即可，如果要验证格式，就需要用到自定义校验规则了

[传送门](https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze)

1. validator后面会跟一个回调函数，回调函数后面有三个参数
   1. rule规则
   2. value要校验元素的值
   3. callback返回方法，成功就用callback() 不通过需要显示什么错误信息就用callback(new Error(错误信息)) 该错误信息会以红字显示在相应表单元素下面

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
</head>

<body>
    <!-- 挂载的元素 -->
    <div id="app">
        <el-form status-icon  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
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
        const checkName = (rule, value, callback) => {
            // value 校验的数据
            // console.log(value)
            if (value.length < 2) {
                callback(new Error("你的名字长度不够哦，检查一下"))
            } else {
                // 正确的回调
                callback()
            }
            // callback 回调函数 成功失败都需要调用
        }

        // 验证手机号的 函数
        const checkPhone = (rule,value,callback)=>{
            // 接收参数 value
            // 定义正则表达式
            const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
            // 使用正则校验格式是否满足
            if(reg.test(value)==true){
                // 对
                callback()
            }else{
                // 错
                callback(new Error('手机号格式不对哦，请检查'))

            }
        }
       
        // 验证 邮箱的 函数
        // rule 校验规则，一般不用
        // value 校验的数据  表单元素中的数据
        // callback 回调函数 ，通过执行这个函数 告诉 element-ui 成功或者失败
        const checkEmail = (rule,value,callback)=>{
            // 获取数据 value
            // 定义正则表达式 定义了一个正则对象
            const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            // 校验方法 test 方法 是正则对象
            // 对 返回的是 true
            // 错 返回的是 false
            // console.log(reg.test(value))
            if(reg.test(value)==true){
                callback()
            }else{
                callback(new Error("邮箱的格式不对哦"))
            }
        }
        const app = new Vue({
            el: "#app",
            data: {
                ruleForm: {
                    name: '',
                    // 手机号
                    phone: "",
                    // 邮箱
                    email:""
                },
                rules: {
                    name: [
                        { required: true, trigger: 'blur' },
                        // trigger 触发是执行 validator设置的函数
                        { validator: checkName, trigger: "blur" }
                    ],
                    phone: [
                        { required: true,message:"手机号不能为空", trigger: 'blur' },
                        // trigger 触发是执行 validator设置的函数
                        { validator: checkPhone, trigger: "blur" }
                    ],
                    email: [
                        { required: true,message:"邮箱不能为空", trigger: 'blur' },
                        { validator: checkEmail, trigger: "blur" }
                    ]
                }
            }
            , methods: {
                submitForm(formName) {
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
                    this.$refs[formName].resetFields();
                }
            }
        })
    </script>

</body>

</html>
```



## 注册模块-邮箱加入自定义验证

html

~~~html
   <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
~~~

js

- data的form中加入相应绑定的元素
- 定义相应的rules规则

~~~js
email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱");
              }
            },
            trigger: "change"
          }
]
~~~



## 注册模块-手机与密码基本功能

html

~~~html
  <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
~~~

js

- data的form中加入相应绑定的元素
- 定义相应的rules规则

~~~js
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号");
              }
            }
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          },
          {
            min: 6,
            max: 12,
            message: "密码必须在6到12之间",
            trigger: "change"
          }
        ],
~~~



## Element-ui 列偏移

> 如何让栅格之间有一些间隙呢？

[传送门](https://element.eleme.io/#/zh-CN/component/layout#fen-lan-pian-yi)

```html
<el-row>
  <el-col class="item" :span="6"></el-col>
  <el-col class="item" :offset="6" :span="6"></el-col>
  <!-- 用掉了 6+6+6 = 18 -->
  <!-- 24-18=6 -->
  <el-col class="item2" :span="6"></el-col>
</el-row>
```

注意:

1. 列偏移+栅格的比例只要超过了24就会换行
2. 栅格默认只是一个容器，没有任何的外观样式，要看得到必须增加对应样式

## 注册模块 - 图形码验证码基本功能实现

> 通过列偏移来实现注册区域的小间隙

步骤：

1. 找到 注册对话框的 验证码 和 获取验证码按钮区域
2. 使用`:offset`设置1即可
3. 保证整体的和为24

注意:

1. 属性设置 不加:会解析为 `字符串`，加了会解析为 `js`

html

~~~html
     <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img  class="code_img"  alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button class="full_btn" @click="getRcode">
              获取验证码
        
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
~~~

js部分

- data的form中加入相应绑定的元素
- 定义相应的rules规则

~~~js
       
code: [
          { required: true, message: "请输入验证码！", trigger: "change" }
        ],
        rcode: [
          {
            required: true,
            message: "请输入手机验证码!",
            trigger: "change"
          }
        ]
~~~





## 注册模块 - 图片验证码功能实现

> 图片验证码应该不是固定的值，需要通过接口来获取哦

步骤:

1. 注册组件内
2. 通过`环境变量`+`/captcha?type=sendsms`
3. 拼接为验证码地址
4. 设置给 验证码图片的src属性
   1. `:src`



## 注册模块 - 图片验证码点击刷新

> 如果看不清楚文字，点击图片应该会重新获取一张，如何实现呢

需求: 点击重新获取验证码

步骤:

1. 为验证码绑定点击事件

2. 重新设置验证码的地址，为了避免浏览器缓存，需要在后面跟上随机值

   1. 时间戳
   2. 随机数
   
   `html`

~~~html
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img @click="codeClick" class="registerCode" :src="codeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
~~~

`js`

~~~js
    // 点击 切换图形验证码
    codeClick() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    }
~~~






## 注册模块 - 短信验证码获取

> 手机获取短信，这里需要和服务器进行交互了，本地接口会直接返回验证码，在线接口可以正常获取短信

`http://183.237.67.218:3002  `（能够收短信的，少用，）

	1. 把基地址设置为这个，就可以正常获取短信了
 	2. 不要一直浪费，测试成功即可
 	3. 开发阶段还是用`本地`

需求:

1. 点击底部的获取验证码按钮，调用接口，将短信和验证码发到服务器
2. 获取短信验证码

步骤:

1. 为底部的按钮绑定点击事件

2. 点击 事件在调用接口获取验证码前需要先验证手机号与图形码是否已成功填写，可利用表单元素局部定义方式来自定义验证

   1. ~~~js
      this.$refs.regirest.validateField(["phone", "code"], error =>error)
      //这后面的error如果没返回错误。也就是返回错误为空，说明验证成功
      ~~~

      

3. 调用接口提交数据

   1. 安装axios
   2. 导入 并调用接口
   3. 地址`/sendsms`
   4. 方法:`post`
   5. 参数:
      1. `code`：验证码
      2. `phone`：手机号
   6. 跨域调用接口时，如果涉及到`cookie`，必须设置一个属性

4. 回调函数中，获取到验证码

   1. 在线接口短信获取验证码




## 注册模块 - 短信获取倒计时

> 为了防止正常用户的误操作，短信的获取加上时间间隔，两次获取的需要有时间间隔

步骤:

1. 获取短信验证码内部开启定时器
2. 时间（60秒）递减
3. 倒计时结束之前，按钮不能再次被点击，看起来也是禁用状态
   1. 正常:`点击获取验证码`
   2. 倒计时:`还有XX秒继续获取`



```javascript
<template>
  <el-dialog
    title="收货地址"
    :visible.sync="dialogFormVisible"
    class="register"
    :show-close="false"
    width="600px"
  >
    <h1 slot="title" class="dialogTitle">用户注册</h1>
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img @click="codeClick" class="registerCode" :src="codeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getRcode" :disabled="timeout>0 && timeout<60">
              获取验证码
              <span v-if="timeout>0 && timeout<60">{{timeout}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      //头像上传地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      // 图形验证码地址
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 发送短信验证码60秒不允许 再调用
      timeout: 60,
      form: {
        avatar: "", //用户头像
        username: "", //用户昵称
        email: "", //邮箱
        phone: "", //手机
        password: "", //密码
        code: "", //图形码
        rcode: "" //手机验证码
      },
      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        username: [
          { required: true, message: "请输入用户名称", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱");
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机");
              }
            },
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "chnage" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位图形码", trigger: "chnage" }
        ]
      },
      imageUrl: "" //图像本地
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      window.console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      window.console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确定按钮点击事件
    submitClick() {
      this.$refs.form.validate(result => {
        window.console.log(result);
      });
    },
    // 点击 切换图形验证码
    codeClick() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取验证码点击
    getRcode() {
      let _isPass = true;
      this.$refs.form.validateField(["phone", "code"], error => {
        if (error != "") {
          _isPass = false;
        }
      });
      if (_isPass == false) {
        return;
      } else {
        this.timeout--;
        let interTime = setInterval(() => {
          this.timeout--;
          if (this.timeout == 0) {
            this.timeout = 60;
            clearInterval(interTime);
          }
        }, 1000);

        // 调用接口获取手机验证码
        axios({
          url: process.env.VUE_APP_URL + "/sendsms",
          method: "post",
          data: {
            code: this.form.code,
            phone: this.form.phone
          },
          withCredentials: true //跨域带cookie
        }).then(res => {
          this.$message.success(res.data.data.captcha + "");
          window.console.log(res);
        });
      }
    }
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
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .registerCode {
    width: 100%;
    height: 40px;
    border: 1px dashed #ccc;
  }
}
</style>
```



## axios之create,拦截器

>axios进一步加深理解 

get 请求可用接口： https://autumnfish.cn/api/joke/list?num=10

create创建一个axios的副本，自定义一些axios一些默认属性

~~~
let  interface=axios.create({
//自定义的一些配制
baseURL:"基地址"
timeout:30000
})
interface就相当于是axios副本
~~~

~~~js
        let interface = axios.create({
            baseURL: "https://autumnfish.cn/api/joke"
        })

        // 添加请求拦截器
        interface.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            //config所有请求的相关信息
            window.console.log("拦截的数据", config)
            config.url = "/list?num=100"
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        interface.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            // response所有返回的相关信息
            window.console.log("响应的数据拦截", response)
            response.data.jokes = response.data.jokes.slice(0, 1)
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });





        //    interface相当于就是一个定义了一些默认属性的axios
        interface({
            url: "/list?num=10"
        }).then(res => {
            window.console.log(res)
        })

~~~





## axios.create的抽离

>登陆模块与首页模块都用到了axios.create，这种相同的东西最好抽离 

`/src/utils`下创建request的js   `require.js`

在require.js中写入

~~~js
import axios from 'axios'

var instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
});
export default instance
~~~

在到相应的登陆模块与首页模块相应api中导入instance

~~~
import instance from '@/utils/request.js'
~~~





## axios 拦截器

> 服务器响应的内容每次都写两次`data`,也是多余的哦 , 咱们通过axios的拦截器来优化这部分内容

[传送门](https://github.com/axios/axios#interceptors)

概念:

1. 拦截器是`axios`提供给开发者的一组回调函数，让我们可以在特定的时候添加自定义的逻辑
   1. 请求拦截器
      1. 发送请求的时候触发的回调函数
   2. 响应拦截器
      1. 数据响应回来之后，触发的回调函数

```javascript
// 添加一个请求拦截器
// 发送请求时，执行了，
// config 一些配置信息
// 可以动态的添加一些请求头,比如携带token
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器')
    console.log(config)
    config.headers.info="i have a secret"
    config.headers.message="not tell you"
    // 在发送之前 干一些事情
    return config;
}, function (error) {
    // 如果请求出错了 干一些事情
    return Promise.reject(error);
});

// 注册一个相应拦截器
// 调用接口时.then方法执行之前会触发的回调函数
// 统一的进行一些处理，比如异常的错误提示
// 如果不想要额外的.data 可以在return的时候 把.data拿掉
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器')
    console.log(response)
    // 可以对响应的值进行一些处理
    // return response;
    return response.data
}, function (error) {
    // 可以在这里对错误进行一些处理
    return Promise.reject(error);
});
```



## 注册模块 - api方法抽取

> 之前axios是直接使用的，接下来我们使用抽取的api方法来替换那些写在页面内部的接口调用逻辑

步骤:

1. 为了方便管理接口调用，一般会抽取为函数，根据模块进行抽取
2. 抽取的位置一般来说`/src/api/`文件夹
3. 不同的模块，定义不同的文件，
   1. 注册:`register.js`
4. 内部通过函数的方式来抽取接口调用
5. 暴露出来   `export`
6. 页面内部导入并使用    import {名字}   from '路径'

~~~js
import axios from "axios"
let instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    window.console.log(config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log('响应拦截器')
    console.log(response)
    // 可以对响应的值进行一些处理
    // return response;
    return response.data
}, function (error) {
    // 可以在这里对错误进行一些处理
    return Promise.reject(error);
});
function sendsms(data) {
    return instance({
        url: "/sendsms",
        method: "post",
        data: data,
    })
}
export { sendsms }

~~~







