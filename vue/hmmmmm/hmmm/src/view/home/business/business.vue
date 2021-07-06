<template>
  <div class="business">
    <el-card style="margin-bottom:20px">
      <el-form inline :model="form" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="form.status">
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
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">{{(pagination.current-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
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
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[1,2,3,4]"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-card>
    <addBusiness :mode="mode" ref="addBusiness" @search="search"></addBusiness>
  </div>
</template>

<script>
import addBusiness from "./addBusiness";
import {
  getBusinessData,
  setBusinessStatus,
  removeBusinessData
} from "@/api/business";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      form: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      pagination: {
        current: 1,
        pageSize: 2,
        total: 8
      },
      tableData: [],
      mode: "add"
    };
  },
  methods: {
    // 点击切换每页数量
    sizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.current = 1;
      this.getData();
    },
    // 点击跳转页码
    currentChange(page) {
      this.pagination.current = page;
      this.getData();
    },
    // 获取列表数据
    getData() {
      let _params = {
        page: this.pagination.current,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getBusinessData(_params).then(res => {
        // console.log(res)
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
      // 重置表单
      this.$refs.form.resetFields();
      this.search();
    },
    // 设置状态
    setStatus(id) {
      setBusinessStatus({ id }).then(() => {
        this.$message.success("状态设置成功");
        this.search();
      });
    },
    // 删除
    remove(id) {
      this.$confirm("此项操作将删除该条数据,是否删除?", "温馨提示!", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeBusinessData({ id }).then(() => {
            this.$message.success("删除成功!");
            this.search()
          });
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    // 编辑
    edit(row) {
      // window.console.log(row);
      this.mode = "edit";
      this.$refs.addBusiness.dialogVisible = true;
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
    },
    // 添加
    add() {
      this.mode = "add";
      this.$refs.addBusiness.dialogVisible = true;
      this.$refs.addBusiness.form = {
        eid: "",
        name: "",
        username: "",
        status: ""
      };
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
.business {
  .red {
    color: red;
  }
  .pageBox {
    text-align: center;
    margin-top: 30px;
  }
}
</style>