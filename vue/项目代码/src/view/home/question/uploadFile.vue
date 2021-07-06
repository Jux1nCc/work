<template>
  <div class="uploadFile">
    <!-- 
     el-upload
     action  :上传接口地址
     name：上传接口调用的参数名
     show-file-list  是否显示上传文件列表
     before-upload上传前的回调函数  它里面有文件相应信息  比如文件类型，文件大小之类
     on-success  上传成功处理，可以在该回调函数获取上传成功后的结果

    -->
    <el-upload
      class="avatar-uploader"
      :action="baseUrl+'/question/upload'"
      name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div v-if="type=='video'">
        <video v-if="value" :src="baseUrl+'/'+value" class="avatar" controls></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else>
        <img v-if="value" :src="baseUrl+'/'+value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ["value", "type"],
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      this.$emit("input", res.data.url);
      window.console.log("上传结果：", res);
    },
    beforeAvatarUpload(file) {
      if (this.type == "video") {
        window.console.log(file);
        const isVideo = file.type === "video/mp4";
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isVideo) {
          this.$message.error("上传视频只能是 mp4 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传视频大小不能超过 4MB!");
        }
        return isVideo && isLt2M;
      } else {
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
      }
    }
  }
};
</script>

<style lang="less">
.uploadFile {
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