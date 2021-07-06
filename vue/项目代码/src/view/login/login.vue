<template>
  <!-- 最外层标签的class名字使用组件名     -->
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginLogo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登陆</span>
      </div>
      <!-- 
        1:加一个el-form表单，再加入子项el-form-item
           :model属性，绑定表单元素的值
        2:在el-form-item下加入一个el-input
           v-model双向绑定表单元素的值
           placeholder
           prefix-icon  input前面图标
           show-password是否显示密码图标，以点点形式显示 

     加入表单验证
       1：实现基本布局与数据绑定
       2：在el-form上绑定一个rules属性  rules属性的值要是一个对象（需在data里定义rules的值）
       3:在需要验证的项的el-form-item上定义一个prop属性，prop的值为该项内表单元素v-model绑定的值
       4:在rules里写相应项的验证规则
          [{required:true,message:"手机号必填哦",trigger:"change"}]
          min:最小值，max:最大值

      登陆的点击校验
         1.在el-form上定义一个ref  ref="值"
         2.为登陆按钮绑定一个事件
         3.调用el-form的表单验证方法
           this.$refs.form.validate(result=>{
             result它是一个boolean值，
             true验证通过
             false表示 验证不通过
           })
                  
      -->
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :show-password="true"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 栅栏处理共24栏
             el-row：行
                它有一个子项是el-col 代表栏 多少栏  :span="栏数"
        -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="code" @click="codeClick" class="key" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 
          el-checkbox
          v-model默认值可以来一个空字符串，这样的的选择结果就是true/false
          el-link  type决定颜色 
        -->
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- el-button
             type="值"  值决定按钮的颜色
        -->
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
    <!-- 组件中套用其它组件
    1：导入子组件   import 名字 from 路径
    2:注册   components:{register}
    3:当标签使用  
    
    
    -->
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./register.vue";
import { toLogin } from "@/api/login.js";
import { saveToken, getToken } from "@/utils/token.js";
export default {
  name: "login",
  components: {
    register
  },
  data() {
    return {
      code: process.env.VUE_APP_URL + "/captcha?type=login",
      //表单绑定的值
      form: {
        phone: "", //手机号
        password: "", //密码
        code: "", //验证码
        isCheck: "" //   是否同意协议
      },
      //表单验证规则
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              // 正则校验
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号");
              }
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "请输入6到12位长度密码",
            trigger: "change"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          {
            min: 4,
            max: 4,
            message: "请正确输入验证码",
            trigger: "change"
          }
        ],
        isCheck: [
          { required: true, message: "请勾选协议", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value === true) {
                callback();
              } else {
                callback("请勾选协议");
              }
            }
          }
        ]
      }
    };
  },
  created() {
    //有token   getToken()为真
    //没token   getToken()为undefined
    if (getToken()) {
      //这里有token,跳到首页
      this.$router.push("/home");
    }
  },
  mounted() {},
  methods: {
    // 登陆点击
    loginClick() {
      // 登陆全局校验
      this.$refs.form.validate(result => {
        // 登陆接口调用
        if (result == true) {
          toLogin(this.form).then(res => {
            this.$message.success("登陆成功");
            window.console.log("登陆信息：", res);
            // 保存token
            saveToken(res.data.token);
            this.$router.push("/home");
          });
        }
      });
    },
    // 注册点击
    registerClick() {
      // 打开register里的弹窗组件
      // 1：在register组件 上定义一个ref属性  ref=值
      //2：通过this.$refs.值.dialogFormVisible=true
      this.$refs.register.dialogFormVisible = true;
    },
    //验证码点击切换
    codeClick() {
      this.code =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  // 弹性盒子布局
  display: flex;
  //   主轴布局
  justify-content: space-around;
  //   侧轴居中
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
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .title {
      margin-bottom: 20px;
      .titleName {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 15px;
        margin-right: 15px;
      }
      .titleLine {
        color: #ccc;
        font-size: 24px;
      }
      .titleName2 {
        font-size: 22px;
        margin-left: 15px;
      }
    }
    .key {
      width: 100%;
      height: 40px;
    }
    .btn {
      width: 100%;
    }
    .btn:nth-child(1) {
      margin-bottom: 26px;
    }
  }
}
</style>