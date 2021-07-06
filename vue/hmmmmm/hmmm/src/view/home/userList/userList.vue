<template>
  <div class="user">
    <el-card style="margin-bottom: 20px">
      <el-form inline :model="form" ref="form">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择角色">
            <el-option
              v-for="(item, index,key) in $store.state.roleObj"
              :key="key"
              :value="+index"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" class="el-icon-plus" @click="add">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table border :data="tableData">
        <el-table-column label="序号">
          <template slot-scope="scope">{{(pagination.current-1)*pagination.pageSize+scope.$index+1}}</template>
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
              :class="{red:scope.row.status==1}"
              @click="setStatus(scope.row.id)"
            >{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <el-pagination
          @size-change="pageChange"
          @current-change="currentChange"
          :page-size="pagination.pageSize"
          :current-page="pagination.current"
          :total="pagination.total"
          :page-sizes="[1,2,3,4]"
          layout="total,sizes,prev,pager,next,jumper"
        ></el-pagination>
      </div>
    </el-card>
    <addUser :mode="mode" ref="addUser" @search='search'></addUser>
  </div>
</template>

<script>
import addUser from "./addUser";
import { getUserData, setUserStatus, removeUserData } from "@/api/userList";
export default {
  components: {
    addUser
  },
  data() {
    return {
      mode: "add",
      tableData: [],
      pagination: {
        pageSize: 2,
        current: 1,
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
    // 改变页尺寸
    pageChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    // 改变页码
    currentChange(current) {
      this.pagination.current = current;
      this.getData();
    },
    // 获取数据
    getData() {
      let _params = {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        ...this.form
      };
      // 请求数据
      getUserData(_params).then(res => {
        // window.console.log(res)
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 搜索
    search() {
      this.pagination.current = 1;
      this.getData();
    },
    // 清除
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    // 改变状态
    setStatus(id) {
      setUserStatus({ id }).then(() => {
        this.$message.success("状态设置成功!");
        this.getData();
      });
    },
    // 删除
    remove(id) {
      this.$confirm("此项操作将删除该项数据,是否删除?", "温馨提示!", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          removeUserData({ id }).then(() => {
            this.$message.success("数据删除成功!");
            this.search();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    add() {
      this.mode = "add";
      this.$refs.addUser.dialogVisible = true
      this.$refs.addUser.form = {
        username: "",
        eamil: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      };
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addUser.dialogVisible = true
      this.$refs.addUser.form = JSON.parse(JSON.stringify(row));
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
.user {
  .pageBox {
    text-align: center;
    margin-top: 20px;
  }
  .red {
    color: red;
  }
}
</style>