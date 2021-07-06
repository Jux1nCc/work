<template>
  <div class="subject">
    <el-card>
      <!-- inline就是将表单form下面的form-item由块级元素转换成行级块元素，不让他们独占一行 
      :model="form"  绑定全表单的数据
      -->
      <el-form :model="form" label-width="90px" :inline="true" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="setWidth" v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="setWidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" class="setWidth" v-model="form.status">
            <!-- option里，label代表我们看见的选项文字，value就代表当前项的值 -->
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <!-- 学生不能新增 -->
          <el-button type="primary" @click="add" v-if="$store.state.role!='学生'">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <!-- 
        el-table   data绑定全部数据  
        el-table-column  栏   label当前栏的标题   width可以设置宽度  prop="当前栏对应数据字段名"
      自定义栏
          1：在需要自定义的栏里面加入template
          2:在该template上获取当前 行的所有数据   slot-scope="变量"
          注意点：该变量是一个局部变量，只能用于template里面
            变量.$index="当前数据的序号，从0开始"
            变量.row  当前 行的所有字段 数据      
      
      -->
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="学科编号 " prop="rid"></el-table-column>
        <el-table-column label="学科名称 " prop="name"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者 " prop="username"></el-table-column>
        <el-table-column label="创建日期 " prop="create_time"></el-table-column>
        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="270px" v-if="$store.state.role!='学生'">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <!-- scope 获取了整行数据   $index 数据索引项  0开始   row  接口返回的整行数据-->
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)" v-if="$store.state.role.includes('管理员')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[3, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addSubject ref="addSubject" @add="search" :mode="mode"></addSubject>
  </div>
</template>
<script>
// 导入搜索接口
import {
  getSubjectData,
  setSubjectStatus,
  delSubjectData
} from "@/api/subject.js";
// 导入新增组件
import addSubject from "./addSubject.vue";
export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "add", //用于子组件区分当前是新增还是编辑  add新增 ，edit:编辑
      pagination: {
        pageSize: 3, //每页条数
        currentPage: 1, //当前页
        total: 40 //总条数
      },
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      },
      tableData: [] //列表数据
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 进入页面获取学科列表数据
      let _params = {
        page: this.pagination.currentPage, //页码
        limit: this.pagination.pageSize, //页容量
        ...this.form
      };
      getSubjectData(_params).then(res => {
        this.tableData = res.data.items;
        window.console.log(res);
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 设置状态
    setStatus(id) {
      setSubjectStatus({ id: id }).then(() => {
        // 调用状态成功
        this.$message.success("设置状态成功");
        // 刷新table数据
        this.search();
      });
    },
    // 页容量改变时
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 页码改变时
    handleCurrentChange(page) {
      //调用接口前做一些简单判断 处理，判断 一下该page是否是合理的值，total/每页数量 >page
      this.pagination.currentPage = page; //
      // 改变页码了，我们就得重新调用接口

      this.getData();
    },
    // 搜索点击
    search() {
      // 注意了，搜索时，我不管它当前 在多少页，我一定要让回到第一页

      this.pagination.currentPage = 1;

      this.getData();
    },
    // 清除功能
    reset() {
      // 调用表单的resetFields,
      // 1:它使用前提是参数都有相应的prop绑定
      //2:在form表单上定义一个ref=值   通过ref调用resetFields
      //this.$refs.form.resetFields();
      this.form = {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      };
      //调用搜索
      this.search();
    },
    //删除功能
    del(id) {
      // 调用接口删除，删除是大功能，要注意的功能
      /*
      对话框提示组件
      confirm
      this.$confirm("内容","标题",{
        confirmButtonText:"确定",
        concelButtonText:"取消",
        type:"warning/error/success"
      }).then(()=>{
        //点击确认的处理
      }).catch(()=>{
        //点击 取消的处理
      })
      */
      this.$confirm("您是要删除此条数据吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确认的处理
          // 调用接口
          window.console.log(id);
          delSubjectData({ id: id }).then(() => {
            this.$message.success("删除成功");
            // 调用搜索更新数据
            this.search();
          });
        })
        .catch(() => {
          //点击 取消的处理
        });
    },
    //新增
    add() {
      // 通过ref修改子组件里面的属性
      //1：在子组件身上定义一个ref  ref="值"
      //2： this.$refs.值  ==子组件this
      this.mode = "add";
      this.$refs.addSubject.form = {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学科备注
      };
      this.$refs.addSubject.dialogFormVisible = true;
    },
    edit(row) {
      window.console.log(row);
      this.mode = "edit";
      // 通过ref属性修改addSubject组件的form表单的值
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row)); //row是不是一样对象
      this.$refs.addSubject.dialogFormVisible = true;
    }
  }
};
</script>
<style lang="less">
.subject {
  .setWidth {
    width: 120px;
  }
  .pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>