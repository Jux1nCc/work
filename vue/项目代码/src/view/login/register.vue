<template>
  <el-dialog :visible.sync="dialogFormVisible" class="register" width="600px" :show-close="false">
    <!-- 
      el-dialog
      visible.sync属性控该弹窗口是否显示
      slot可以重写title
      width属性用于设置宽度
      show-close	是否显示关闭按钮
    -->
    <!-- 
      label-width标题栏的宽度 
      label:标题
    -->
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" label-width="100px" ref="form" :rules="rules">
      <!-- 给头像加入表单验证 -->
      <el-form-item label="头像" prop="avatar">
        <!-- 上传东西
            el-upload
           1:上传地址  action
           2：参数     name="值" 该值就是上传文件的参数
           3:是否显示已上传文件列表    show-file-list 
           4:上传成功的回调函数   on-success
              成功回调函数里面有个res就是接口返回信息
              上传成功后须在form表单数据里面保存一下该图像avatar值
           5：上传前的处理（还没调用上传接口前的处理）       before-upload
              上传前处理它有一个file文件信息，通过file文件信息能够限制上传格式（file.type），大小等控制  (file.size以字节)
              该回调函数return的值就是控制让不让你通过  true通过  false不通过

        -->
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
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 邮箱  -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 手机  -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 密码  -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" :show-password="true"></el-input>
      </el-form-item>
      <!-- 图形码 
      el-row  行
      el-col  列  :span="值1" :offset="值2"   offset左移偏移栏数
      -->
      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 点击 验证码切换，改变它的url地址就可以了，加个随机数就可以了-->
            <img class="code" :src="codeUrl" @click="changeCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getRecode" :disabled="totalTime!=60">
              获取验证码
              <span v-if="totalTime!=60">{{totalTime}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 加一个确定按钮 -->
    <div slot="footer" class="center">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getPhoneCode, register } from "@/api/register.js";
export default {
  data() {
    return {
      totalTime: 60,
      dialogFormVisible: false,
      // 图形验证码
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 表单数据
      form: {
        // 头像地址,我们注册功能需要提交的数据
        avatar: "",
        username: "", //昵称
        email: "", //邮箱
        phone: "", //手机
        password: "", //手机
        code: "", //图形验证码
        rcode: "" //手机验证码
      },
      // 表单验证规则绑定
      rules: {
        // trigger主动触发在没有在元素里面使用v-model的情况它是无效的
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        username: [
          { required: true, message: "请填写昵称", trigger: "change" }
        ],
        /*
        自定义表单校验  
        validator:(rule,value,callback){
          rule:规则
          value:当前校验项的值
          cal;lback()   
          通过就callback()
          不通过callback("错误信息")
        }
        */

        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              // 正则校验
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱地址");
              }
            }
          }
        ],
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
          { min: 6, max: 12, message: "请输入6-12位密码", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "change" }
        ]
      },
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: "" //只是纯展示那个图片的地址
    };
  },
  // 监听器
  /*
  对某个值进行一个监听，如果它改变了，可以对它进行一些相应处理
  // 只要dialogFormVisible为false了就要清空表单
  1：放到watch:{}
  2：写要要监听的值  this.dialogFormVisible
  3：去掉this把该传转换成字符串 dialogFormVisible
  4:监听器本质就是一个function (newVal,oldval){}
     newVal当前值，oldVal修改前一刻的值
  */

  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        // 清空表单
        this.$refs.form.resetFields();
        // 将图片置空
        this.imageUrl = "";
      }
    }
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
      // res就是上传图片接口调用成功后的返回值
      window.console.log(res);
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      // 主动触发一下头像的表单验证validateField
      //它的第一个参数它可以传array|string 实际就是传它要验证的项
      //它还有第二个参数，是一个结果的回调函数,
      //如果前面传的是数组 ，有多个值时，它会有二条结果跑回来
      //该结果如果为空表示 没问题，如果不为空表示 验证不通过
      this.$refs.form.validateField("avatar");
    },
    // 注册确定按钮的点击
    submitClick() {
      // 全局验证
      // 1：在el-form上定义一个ref   2:调用el-form上的validate方法
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          register(this.form).then(res => {
            window.console.log("注册返回信息", res);
            // 如果 api封装的好，这个判断 是可以省掉的，如果在响应拦截里面把所有处理都写好了，这里只要能收到数据就是200的数据
            //
            this.$message.success("注册成功");
            this.dialogFormVisible = false;
          });
        }
      });
    },
    // 点击切换验证码
    changeCodeUrl() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 点击获取手机验证码
    getRecode() {
      // 访问el-form上的validateField该方法
      //该方法有二个参数，
      // 第一个是要验证的项,支持string|array  该项的值就是prop的值
      // 第二个参数是一个function function的参数是验证时的错误信息返回，当返回信息为空（没有错误），表示验证通过，不为空验证不通过
      // 需求是二次都通过才行
      let _pass = true;
      this.$refs.form.validateField(["code", "phone"], error => {
        if (error != "") {
          _pass = false;
        }
      });
      if (_pass === false) {
        return;
      } else {
        // 调用接口获取验证码
        // axios({
        //   url: process.env.VUE_APP_URL + "/sendsms",
        //   method: "post",
        //   data: {
        //     code: this.form.code,
        //     phone: this.form.phone
        //   },
        //   withCredentials: true //跨域照样协带cookie
        // })
        // 倒计时功能
        this.totalTime--;
        let _interval = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= 0) {
            clearInterval(_interval);
            this.totalTime = 60;
          }
        }, 1000);
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          window.console.log(res);
          this.$message.success(res.data.captcha + "");
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.register {
  .title {
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .center {
    text-align: center;
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
  .code {
    width: 100%;
    height: 40px;
    border: 1px dashed #ccc;
  }
}
</style>
