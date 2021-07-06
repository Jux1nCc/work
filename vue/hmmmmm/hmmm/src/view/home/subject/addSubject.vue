<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="true"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title" class="title">{{mode=='add'?'新增学科':'编辑学科'}}</div>
    <el-form label-width="80px" :model="form" :rules="rules" ref="form">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubjectData, editSubjectData } from "@/api/subject";
export default {
  props: {
    mode: String
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      }
    };
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
      }
    },
    mode() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              this.$message.success("新增成功!");
              this.dialogVisible = false;
              this.$emit("search");
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功!");
              this.dialogVisible = false;
              this.$emit("search");
            });
          }
        }
      });
    }
  }
};
</script>

<style lang='less'>
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>