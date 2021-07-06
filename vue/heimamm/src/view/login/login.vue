<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginLogo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleLogin">用户登录</span>
      </div>
      <!-- 绑定form表单 -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 手机号文本框 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <!-- 图片验证码 -->
        <el-form-item prop="code">
          <!-- 栅格布局(24) -->
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="imgUrl" alt class="imgKey" @click="changeImg" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item prop="agreen">
          <el-checkbox v-model="form.agreen" style="color:#999">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="onLogin">登录</el-button>
          <br />
          <el-button class="btn" type="primary" @click="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" />
    </div>
    <!-- 注册组件标签 -->
    <retister ref="retister"></retister>
  </div>
</template>

<script>
// 导入注册组件
import retister from "./register.vue";
// 导入登录axios
import { login } from "@/api/login.js";
// 导入token设置
import { setToken, getToken } from "@/utils/token.js";
export default {
  name: "login",
  // 注册子组件
  components: {
    retister
  },
  data() {
    return {
      // 设置验证图片地址
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=login",
      // 绑定表单值
      form: {
        phone: "", //手机号
        password: "", //密码
        code: "", //图片验证码
        agreen: "" //勾选
      },
      // 表单验证规则
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              //  手机号正则式
              let _deg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_deg.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号");
              }
            },
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _deg = /^\w+$/;
              if (_deg.test(value)) {
                callback();
              } else {
                callback("密码只能由英文,数字,下划线组成");
              }
            },
            trigger: "change"
          },
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "change" }
        ],
        agreen: [
          { required: true, message: "请勾选协议", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              // 是否勾选
              if (value == true) {
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
    if (getToken()) {
      this.$router.push("/home");
    }
  },
  methods: {
    // 登录点击事件
    onLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 调用登录接口
          login(this.form).then(res => {
            // window.console.log(res);
            this.$message.success("登录成功!");
            // 调用保存token方法
            setToken(res.data.token);
            // 清空表单
            this.$refs.form.resetFields();
            this.$router.push("/home");
          });
        }
      });
    },
    //  注册点击事件
    onRegister() {
      // 打开对话框
      this.$refs.retister.dialogFormVisible = true;
      // 重置登录表单信息
      this.$refs.form.resetFields();
    },
    // 改变图片验证码点击事件
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now(); // 利用随机数
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 195, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;
    .title {
      margin-bottom: 31px;
      .titleName {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 15px;
        margin-right: 15px;
      }
      .titleLine {
        color: #ccc;
        font-size: 24px;
      }
      .titleLogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 15px;
      }
    }
    .imgKey {
      height: 40px;
      width: 100%;
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