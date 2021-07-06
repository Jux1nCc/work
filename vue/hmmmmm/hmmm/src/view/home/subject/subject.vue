<template>
  <div class="subject">
    <el-card style="margin-bottom:20px">
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="subjectNum" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="subjectName" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="create" v-model="form.username"></el-input>
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
          <el-button class="el-icon-plus" type="primary" @click="add">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
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
              :class="{red:scope.row.status==1}"
              @click="setStatus(scope.row.id)"
            >{{scope.row.status==1?'禁用':'启用'}}</el-button>
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
    <addSubject :mode="mode" ref="addSubject" @search="search"></addSubject>
  </div>
</template>

<script>
import {
  getSubjectData,
  setSubjectStatus,
  removeSubjectData
} from "@/api/subject";
import addSubject from "./addSubject";
export default {
  // 子组件
  components: {
    addSubject
  },
  data() {
    return {
      // 表单元素
      form: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      // 分页
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 10
      },
      // 表格数据
      tableData: [],
      // 添加 or 编辑
      mode: "add"
    };
  },
  methods: {
    //  点击切换每页数量
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 点击跳转页码
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    // 获取数据
    getData() {
      let _pramas = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      // 发送请求
      getSubjectData(_pramas).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 搜索
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 清除筛选
    reset() {
      // 重置表单
      this.$refs.form.resetFields();
      this.search();
    },
    // 设置状态
    setStatus(id) {
      setSubjectStatus({ id }).then(() => {
        this.$message.success("状态设置成功");
        this.search();
      });
    },
    // 删除数据
    remove(id) {
      this.$confirm("此操作将永久删除该数据,是否继续?", "温馨提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeSubjectData({id}).then(() => {
            this.$message.success("删除成功!");
            this.search();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    // 添加学科
    add() {
      this.$refs.addSubject.dialogVisible = true;
      this.mode = "add";
      // 重置新增表单数据
      this.$refs.addSubject.form = {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
    },
    edit(row) {
      this.$refs.addSubject.dialogVisible = true;
      this.mode = "edit";
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row));
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang='less'>
.subject {
  .subjectNum,
  .create {
    width: 120px;
  }
  .red {
    color: red;
  }
  .pageBox {
    text-align: center;
    margin-top: 30px;
  }
}
</style>