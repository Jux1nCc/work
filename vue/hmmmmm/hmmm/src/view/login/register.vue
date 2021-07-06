<template>
  <el-dialog
    title="用户注册"
    :visible.sync="dialogVisible"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title" class="title">用户注册</div>
    <el-form label-width="80px" :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" prop="avatar">
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
      <el-form-item label="图形码">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img
              :src="codeUrl"
              style="width: 100%;height: 40px;"
              alt
              class="imgKey"
              @click="changeImg"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button @click="getCode" :disabled="totalTime!=60">
              获取验证码
              <span v-if="totalTime!=60">{{totalTime}}</span>
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPhoneCode, register } from "@/api/register";
export default {
  data() {
    return {
      dialogVisible: false,
      baseURL: process.env.VUE_APP_URL,
      imageUrl: "",
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      totalTime: 60,
      form: {
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: ""
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入昵称", trigger: "change" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          //  自定义规则验证
          {
            validator: (rule, value, callback) => {
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
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _deg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_deg.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱格式");
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
        avatar: [{ required: true, message: "请上传头像", trigger: "change" }],
        code: [{ required: true, message: "请输入图形码", trigger: "change" }],
        rcode: [{ required: true, message: "请输入验证码", trigger: "change" }]
      }
    };
  },
    watch: {
      dialogVisible(newVal) {
        if (newVal == false) {
          this.$refs.form.resetFields();
          this.imageUrl = "";
        }
      }
    },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = this.baseURL + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      //  根据头像是否上传来判断是否显示提示
      this.$refs.form.validateField("avatar");
      // console.log(res);
    },
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
      return isJPG && isLt2M;
    },
    changeImg() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    submit() {
      this.$refs.form.validate(valid => {
        // window.console.log(valid);
        if (valid) {
          //  调用发送请求方法
          register(this.form).then(() => {
            // window.console.log(res);
            this.$message.success("注册成功!");
            this.dialogVisible = false;
          });
        }
      });
    },
    getCode() {
      let _pass = true;
      this.$refs.form.validateField(["code", "phone"], error => {
        if (error != "") {
          _pass = false;
        }
      });
      if (_pass == false) {
        return;
      } else {
        // 获取验证码倒计时
        this.totalTime--;
        let timeID = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= 0) {
            clearInterval(timeID);
            this.totalTime = 60;
          }
        }, 1000);
        // 调用发送请求方法
        getPhoneCode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          //成功回调
          // window.console.log(res)
          this.$message.success(res.data.captcha + "");
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
.el-dialog__footer {
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