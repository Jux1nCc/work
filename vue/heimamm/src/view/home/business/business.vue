<template>
  <div class="business">
    <el-card class="cardHead" style="margin-bottom:20px">
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="businessNum" v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="businessName" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="create" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="select" placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button class="el-icon-plus" type="primary" @click="add">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="cardBody">
      <el-table style="width: 100%" :data="tableData">
        <el-table-column label="序号" width="100px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope"><div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div></template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="setStatus(scope.row.id)"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button type="text" @click="remove(scope.row.id)" v-if="$store.state.role.includes('管理员')">删除</el-button>
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
    <addBusiness ref="addBusiness" @addSearch='search' :mode='mode'></addBusiness>
  </div>
</template>

<script>
import {
  getBusinessData,
  removeBusinessData,
  setBusinessStatus
} from "@/api/business.js";
import addBusiness from "@/view/home/business/addBusiness.vue";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      mode: 'add',
      pagination: {
        currentPage: 1, // 当前页
        total: 10, // 总数量
        pageSize: 3 // 每页数量
      },
      form: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: []
    };
  },
  methods: {
    getData() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getBusinessData(_params).then(res => {
        // window.console.log(res);
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    reset() {
      this.$refs.form.resetFields();
      this.getData();
    },
    remove(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeBusinessData({ id }).then(() => {
            this.$message.success("删除成功");
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
    setStatus(id) {
      setBusinessStatus({ id }).then(()=> {
        this.$message.success("状态设置成功");
        this.search();
      });
    },
    add(){
      this.mode = 'add';
      this.$refs.addBusiness.form = {
        eid: '',
        name: '',
        short_name: '',
        intro: '',
        remark: ''
      }
      this.$refs.addBusiness.dialogFormVisible= true;
    },
    edit(row){
      this.mode = 'edit';
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
      this.$refs.addBusiness.dialogFormVisible= true;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
.business {
  .businessNum,
  .create {
    width: 120px;
  }
  .red{
    color:red;
  }
  .pageBox {
    text-align: center;
    margin-top: 30px;
  }
}
</style>