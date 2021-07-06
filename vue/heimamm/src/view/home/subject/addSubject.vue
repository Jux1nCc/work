<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    :show-close="true"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title" class="title">{{mode=='add'?'新增学科':'编辑学科'}}</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
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
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入axios接口Api
import { addSubjectData, editSubjectData } from "@/api/subject.js";
export default {
  // 父子间传值, 判断是新增框还是编辑框
  props:{
    mode: {
      type: String,
      default: 'add'  // 默认新增框
    }
  },
  data() {
    return {
      // 是否弹出对话框
      dialogFormVisible: false,
      // 表单数据
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 验证规则
      rules: {
        rid: [
          { required: true, message: "请输入学科编号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _deg = /^[a-z0-9]+$/i;
              if (_deg.test(value)) {
                callback();
              } else {
                callback("只能由字母和数字组成");
              }
            },
            trigger: "change"
          }
        ],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      }
    };
  },
  // 监听器
  watch:{
    dialogFormVisible(newVal){
      if(newVal == false){
        this.$refs.form.resetFields();
      }
    },
    mode(){
      this.$nextTick(()=>{
        this.$refs.form.clearValidate();
      })
    }
  },
  methods: {
    // 确认按钮
    submit() {
      this.$refs.form.validate(res => {
        window.console.log(res);
        if (res) {
          // 新增框
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              this.$message.success("新增成功!");
              this.dialogFormVisible = false;
              this.$emit('addSearch');
            });
          } else {
            // 编辑框
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功!");
              this.dialogFormVisible = false;
              this.$emit('addSearch');
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