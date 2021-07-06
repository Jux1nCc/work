<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="true"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title">{{mode == 'add'?'新增企业':'编辑企业'}}</div>
    <el-form label-width="80px" :model="form" ref="form" :rules="rules">
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
    <div slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addBusinessData, editBusinessData } from "@/api/business";
export default {
  props: {
    mode: String
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "change" }],
        name: [
          { required: true, message: "请输入企业名称", trigger: "change" }
        ],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "change" }
        ],
        intro: [
          { required: true, message: "请输入企业简介", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addBusinessData(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.$emit('search')
            });
          } else {
            editBusinessData(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.$emit('search')
            });
          }
        }
      });
    }
  },
  watch: {
      dialogVisible(newVal){
          if(newVal == false){
              this.$refs.form.resetFields()
          }
      },
      mode(){
          this.$nextTick(()=>{
              this.$refs.form.clearValidate()
          })
      }
  }
};
</script>

<style>
</style>