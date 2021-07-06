<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
  >
    <div slot="title" style="text-align:center">{{mode=='add'?'新增用户':'编辑用户'}}</div>
    <el-form label-width="80px" :model="form" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select placeholder="请选择角色" v-model="form.role_id">
          <el-option
            v-for="(item, index,key) in $store.state.roleObj"
            :key="key"
            :value="+index"
            :label="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select placeholder="请选择状态" v-model="form.status">
          <el-option value="1" label="启用"></el-option>
          <el-option value="0" label="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUserData, editUserData } from "@/api/userList";
export default {
  props: {
    mode: String
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        username: "",
        eamil: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addUserData(this.form).then(() => {
              this.$message.success("新增成功!");
              this.dialogVisible = false
              this.$emit("search");
            });
          } else {
            editUserData(this.form).then(() => {
              this.$message.success("编辑成功!");
              this.dialogVisible = false
              this.$emit("search");
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>