<template>
  <!-- 
el-dialog visible.sync  控制 该弹框的显示与隐藏    width
    slot="title/footer"
  -->
  <el-dialog class="addBusiness" :visible.sync="dialogVisible" width="600px">
    <div slot="title" class="title">{{mode=='add'?'新增企业':'编辑企业'}}</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addBusinessDate, editBusinessDate } from "@/api/business.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      },
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //备注
      }
    };
  },
  methods: {
    submitClick() {
      //全局验证表单
      //1：在el-form上定义一个ref  2:this.$refs.值.validate(result=>{})
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          if (this.mode == "add") {
            //验证通过，调用接口  1导入接口，2调用
            addBusinessDate(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogVisible = false;
              // 刷新企业列表
              this.$parent.search();
            });
          } else {
            // 调用编辑接口
            editBusinessDate(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogVisible = false;
              // 刷新企业列表
              this.$parent.search();
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less">
.addBusiness {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: rgb(14, 156, 250);
    line-height: 53px;
  }
  .footer {
    text-align: center;
  }
}
</style>