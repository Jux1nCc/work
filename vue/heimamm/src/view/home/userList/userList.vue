<template>
  <div class="userList">
    <el-card class="cardHead" style="margin-bottom:20px">
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select placeholder="请选择角色" v-model="form.role_id">
            <el-option
              v-for="(value, key, index) in $store.state.roleObj"
              :key="index"
              :value="key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add" class="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="cardBody">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" width="80px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="setStatus(scope.row.id)"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button type="text" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addUserList ref="addUserList" @addSearch='search' :mode='mode'></addUserList>
  </div>
</template>

<script>
import { getUserData, setUserStatus,removeUserData } from "@/api/userList.js";
import addUserList from './addUserList.vue'
export default {
  components:{
    addUserList
  },
  data() {
    return {
      mode: 'add',
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 4
      },
      form: {
        username: "",
        email: "",
        role_id: ""
      }
    };
  },
  methods: {
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    reset() {
      this.form = {
        username: "",
        email: "",
        role_id: ""
      };
      this.search();
    },
    remove(id){
      this.$confirm("此操作将永久删除该数据, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 调用接口Api
          removeUserData({ id }).then(() => {
            this.$message.success("删除成功!");
            this.search();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getData() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getUserData(_params).then(res => {
        // console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    setStatus(id) {
      setUserStatus({ id }).then(() => {
        this.$message.success("设置成功");
        this.search();
      });
    },
    //  点击切换每页数量
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    // 点击跳转页码
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    add(){
      this.mode = 'add';
      this.$refs.addUserList.dialogFormVisible= true;
    },
    edit(row){
      this.mode = 'edit';
      this.$refs.addUserList.form= JSON.parse(JSON.stringify(row));
      this.$refs.addUserList.dialogFormVisible= true;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
.userList {
  .red {
    color: red;
  }
  .pageBox {
    text-align: center;
    margin-top: 30px;
  }
}
</style>