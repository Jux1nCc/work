<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    :show-close="true"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title" class="title">{{mode=='add'?'新增用户':'编辑用户'}}</div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <!-- 昵称 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option
            v-for="(value, key, index) in $store.state.roleObj"
            :key="index"
            :value="+key"
            :label="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
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
import { addUserData, editUserData } from "@/api/userList.js";
export default {
  // 父子间传值, 判断是新增框还是编辑框
  props: {
    mode: {
      type: String,
      default: "add" // 默认新增框
    }
  },
  data() {
    return {
      // 是否弹出对话框
      dialogFormVisible: false,
      // 表单数据
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        remark: "",
        status: ""
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _deg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_deg.test(value)) {
                callback();
              } else {
                callback("请输入正确邮箱");
              }
            },
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "change" },
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
        role_id: [{ required: true, message: "请输入角色", trigger: "change" }]
      }
    };
  },
  // 监听器
  watch: {
    dialogFormVisible(newVal) {
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
    // 确认按钮
    submit() {
      this.$refs.form.validate(res => {
        // window.console.log(res);
        if (res) {
          // 新增框
          if (this.mode == "add") {
            addUserData(this.form).then(() => {
              this.$message.success("新增成功!");
              this.dialogFormVisible = false;
              this.$emit("addSearch");
            });
          } else {
            // 编辑框
            editUserData(this.form).then(() => {
              this.$message.success("编辑成功!");
              this.dialogFormVisible = false;
              this.$emit("addSearch");
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>