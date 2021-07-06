<template>
  <!-- 对话框
      visible.sync属性控该弹窗口是否显示
      slot可以重写title
      width属性用于设置宽度
      show-close	是否显示关闭按钮
  
    -->
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" :show-close="false" width="600px" :close-on-click-modal='false' :close-on-press-escape='false'>
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="头像" prop="avatar">
        <!-- 上传头像 -->
        <el-upload
          class="avatar-uploader"
          :action="baseURL+'/uploads'"
          name="image" 
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" :show-password='true'></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item label="图形码" prop="code">
        <!-- 栅格布局 
              el-row  行
              el-col  列  :span="值1" :offset="值2" offset左移偏移栏数
        -->
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset='1'>
            <div>
              <!-- 点击 验证码切换，改变它的url地址就可以了，加个随机数就可以了-->
              <img :src='codeUrl' alt class="imgKey" style="width: 100%;height: 40px;" @click="changeUrl"/>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset='1'>
            <div>
              <el-button style="width: 100%;" @click="getCode" :disabled="totalTime!=60">获取验证码<span v-if="totalTime!=60">{{totalTime}}</span></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="isSure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios'
//  导入接口请求方法
import { getPhoneCode, register } from '@/api/register.js'
export default {
  name: "retister",
  data() {
    return {
      dialogFormVisible: false,
      imageUrl: "",
      // 图形验证码
      codeUrl: process.env.VUE_APP_URL + '/captcha?type=sendsms',
      baseURL: process.env.VUE_APP_URL,
      totalTime: 60,
      // 表单数据
      form: {
        username: "",
        phone: "",
        email: "",
        password: "",
        rcode: "",
        avatar: "",
        code: ""
      },
      // 验证规则
      rules: {
        username: [{ required: true, message: "请输入昵称", trigger: "change" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          //  自定义规则验证
          { validator: (rule,value,callback)=>{
            let _deg= /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            if(_deg.test(value)){
              callback();
            }else {
              callback('请输入正确的手机号');
            }
          },trigger: 'change'}
          ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          { validator: (rule, value, callback)=>{
              let _deg= /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if(_deg.test(value)){
                  callback();
              }else {
                  callback('请输入正确的邮箱格式');
              }
          },trigger: 'change'}
          ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { validator: (rule, value, callback)=>{
              let _deg= /^\w+$/;
              if(_deg.test(value)){
                  callback();
              }else {
                  callback('密码只能由英文,数字,下划线组成');
              }
          },trigger: 'change'},
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "change" }
        ],
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        code: [{ required: true, message: "请输入图形码", trigger: "change" }],
        rcode: [{ required: true, message: "请输入验证码", trigger: "change" }]
      }
    };
  },
  //  侦听器
  watch: {
    dialogFormVisible(newVal){
      if(newVal == false){
        this.$refs.form.resetFields();
        this.imageUrl = '';
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = this.baseURL+ '/' + res.data.file_path;
      this.form.avatar = res.data.file_path;
      //  根据头像是否上传来判断是否显示提示
      this.$refs.form.validateField('avatar');
      // console.log(res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //  注册按钮
    isSure(){
      this.$refs.form.validate((valid)=>{
        // window.console.log(valid);
        if(valid){
          //  调用发送请求方法
          register(this.form).then(()=>{
            // window.console.log(res);
            this.$message.success('注册成功!');
            this.dialogFormVisible = false;
          })
        }
      });
    },
    //  点击改变随机图片验证码(加随机数)
    changeUrl(){
      this.codeUrl= process.env.VUE_APP_URL + '/captcha?type=sendsms&t='+ Date.now();
    },
    //  点击获取验证码按钮
    getCode(){
      let _pass = true;
      this.$refs.form.validateField(['code','phone'],error=>{
        if(error != ''){
          _pass = false;
        }
      });
      if(_pass == false){
        return;
      }else {
        // 获取验证码倒计时
        this.totalTime--;
        let timeID = setInterval(() => {
          this.totalTime--;
          if(this.totalTime<= 0){
            clearInterval(timeID);
            this.totalTime= 60;
          }
        }, 1000);
        // 调用发送请求方法
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res=>{
          //成功回调
          // window.console.log(res)
          this.$message.success(res.data.captcha + '')
        });
      }
    }
  }
};
</script>

<style>
  .el-dialog__header {
    background-color: #109dfa;
    line-height: 35px;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
  .dialog-footer {
    text-align: center;
  }
  .avatar-uploader {
    text-align: center;
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
</style>