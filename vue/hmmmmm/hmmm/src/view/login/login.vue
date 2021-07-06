<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/img/loginLogo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleLogin">用户登录</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="imgUrl" alt class="imgKey" @click="changeImg"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree" style="color:#999">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="submit">登录</el-button>
          <br />
          <el-button type="primary" class="btn" @click="register">注册</el-button>
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
import  {Login } from '@/api/login'
import { setToken, getToken } from '@/utils/token'
import register from './register.vue'
export default {
  components:{
    register
  },
  data() {
    return {
      imgUrl: process.env.VUE_APP_URL + '/captcha?type=login',
      form: {
        phone: "",
        password: "",
        code: "",
        agree: ""
      },
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
        agree: [
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
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          Login(this.form).then(res=>{
            this.$message.success('登录成功')
            setToken(res.data.token)
            this.$refs.form.resetFields();
            this.$router.push("/home");
          })
        }
      });
    },
    register() {
      this.$refs.register.dialogVisible = true
      this.$refs.form.resetFields();
    },
    changeImg(){
      this.imgUrl = process.env.VUE_APP_URL + '/captcha?type=login&t=' + Date.now();
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 43px;
    .title {
      margin-bottom: 31px;
      .titleName,
      .titleLogin {
        font-size: 22px;
        font-weight: 600;
        margin: 2px 10px;
      }
      .titleLine {
        font-size: 30px;
        color: #ccc;
      }
    }
    .imgKey {
      width: 100%;
    }
    .btn {
      width: 100%;
      margin-bottom: 26px;
    }
  }
}
</style>