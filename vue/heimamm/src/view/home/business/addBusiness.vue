<template>
  <el-dialog
    width="600px"
    :visible.sync="dialogFormVisible"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <!-- 自定义标题 -->
    <div slot="title" class="title">{{mode=='true'?'新增企业':'编辑企业'}}</div>
    <el-form :model="form" ref="form" label-width="80px" :rules="rules">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入axios请求
import { addBusinessData, editBusinessData } from "@/api/business.js";
export default {
  // 传值mode 判断是新增还是编辑
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [
          { required: true, message: "请输入企业编号", trigger: "change" },
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
  // 监听器
  watch: {
    dialogFormVisible(val) {
      if (val == "false") {
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
        window.console.log(res);
        if (res) {
          if (this.mode == "add") {
            addBusinessData(this.form).then(() => {
              this.$message.success('新增成功');
              // 传方法
              this.$emit('addSearch');
              this.dialogFormVisible = false;
            });
          } else {
            editBusinessData(this.form).then(() => {
              this.$message.success('编辑成功');
              this.$emit('addSearch');
              this.dialogFormVisible = false;
            });
          }
        }
      });
    }
  }
};
</script>

<style lang='less'>
</style>