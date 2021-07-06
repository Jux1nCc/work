<template>
  <div class="business">
    <el-card>
      <!-- el-form
     :inline="true"  不让子元素独占一行
     :model  绑定表单的对象
     :rules  写一些相应验证规则
     label-width  设置子项标题宽度
     el-form-item 子项   
      prop  子项绑定相应的值，可以让表单相应方法调用时可控制
      label:标题
      -->
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="setWidth" v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="setWidth" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <!-- el-select
             el-option   label 我们看到的文本   value  该项的值
          -->
          <el-select class="setWidth" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="tableCard">
      <!-- el-table
       el-table :data  用于表单数据绑定  注意点：data后面的值要是数组
       el-table-column  每一栏 
          label:每一栏的标题 prop  绑定该栏数据所对应字段 
          width设置每栏的宽度
          自定义样栏
              1：在需要自定义的拦里加一个template（占位符）
              2：获取该行全部数据  <template slot-scope="局部变量">
                局部变量.$index  当前数据下标从0开始
                局部变量.row  整行的所行数据
      -->
      <el-table :data="tableData">
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="企业编号" prop="eid"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态" width="80px">
          <!-- template只是一个占位符，它是不会渲染成标签的 -->
          <template slot-scope="scope">
            <!-- class绑定    :class={class类名：boolean值   true:使用该class,false:不使用该class} -->
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <!-- 编辑编辑的是整行数据 -->
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setStatus(scope.row.id)"
              :type="scope.row.status==1?'info':'success'"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- 分页组件
        el-pagination
         current-page  当前页的默认值
         page-size   页容量的默认值
         page-sizes  页容量的选项
         layout你需要什么功能就在里面加什么
         total  总数显示
         size-change  页容量改变时的回调方法  该方法里有个size参数就是当前容量的值
         current-change 页码改变的回调函数  该方法里有个page参数就是当前页码的值
        -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 200, 300, 400,500,600]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <addBusiness ref="addBusiness" :mode="modeFather"></addBusiness>
  </div>
</template>
<script>
import {
  getBusinessDate,
  delBusinessDate,
  setBusinessStatus
} from "@/api/business.js";
// 导入，注册，使用
import addBusiness from "./addBusiness.vue";
export default {
  components: {
    addBusiness
  },
  data() {
    return {
      modeFather: "add", //默认是新增
      // 分页数据
      pagination: {
        currentPage: 1, //当前 页
        pageSize: 1,
        total: 10
      },
      form: {
        name: "", //企业名称
        eid: "", //企业id
        username: "", //用户名
        status: "" //状态
      },
      tableData: [] //表格数据
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getBusinessDate(_params).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
        window.console.log("企业列表：", res);
      });
    },
    search() {
      //调用接口
      this.pagination.currentPage = 1;
      this.getData();
      window.console.log(this.form);
    },
    handleSizeChange(val) {
      //页容量改变
      this.pagination.pageSize = val;
      this.search();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //页码改变时
      this.pagination.currentPage = val;
      this.getData();
      console.log(`当前页: ${val}`);
    },
    //清空
    reset() {
      //调用form表单的还原成默认值方法，但前置条件是要清空的选项已prop绑定好相应数据
      this.$refs.form.resetFields();
      // this.form = {
      //   eid: "", //企业编号
      //   name: "", //企业名称
      //   username: "", //创建者s
      //   status: "" //状态
      // };
      //调用搜索
      this.search();
    },
    //新增
    add() {
      //通过ref修改新增 组件里面的dialogVisible为true   1:在子组件身上定义一下ref  2this.$refs.值.dialogVisible
      this.modeFather = "add";
      this.$refs.addBusiness.form = {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //备注
      };
      this.$refs.addBusiness.dialogVisible = true;
    },
    //状态修改
    setStatus(id) {
      setBusinessStatus({ id: id }).then(() => {
        this.$message.success("状态修改成功！");
        // 刷新一下数据
        this.getData();
      });
    },
    //删除功能
    del(id) {
      /* 
      删除前提醒
      this.$confirm("内容","标题",{
        confirmButtonText:"确定按钮文本",
        cancelButtonText:"取消按钮文本",
        type:"warning/success/error"
      }).then(()=>{
        //点击确定后回调函数
      }).catch(()=>{
        //点击取消时回调函数 
      })
      */

      this.$confirm("你确定要删除该条信息吗？", "友情提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消操作",
        type: "warning"
      }).then(() => {
        //确定删除调用接口
        delBusinessDate({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    //编辑
    edit(row) {
      // row就是我们需要编辑的表单数据
      /*
      1：新增与编辑写到一个组件里面，既然 是一个组件，我们来了一个mode参数让新增组件可以区别当前是在做哪一步
      props传值   1:在子组件身上定义一个属性   属性名=属性值  2子级件接收该值   props:["属性名"]
      2:要编辑数据得传递给子组件，通过ref修改新增组件的form数据    
         通过refs访问子组件的form表单，给他重新赋值
         1：在子组件身上定义一个ref  ref="值"
         2：通过ref访问子组件里面的from 
            this.$refs.值.form=row的数据  
            尝试克隆   JSON.parse(JSON.stringify())
            
      3:打开子组件弹框
      4:子组件提交接口数据得区别对待
         1：定义编辑接口
         2:在新增组件点击确定时，且mode="edit"时，进行编辑接口调用
      5:修改一下新增处理
         1：修改一下mode
         2:将子组件的form表单数据=原始数据
         3：打开子组件弹框
      */
      this.modeFather = "edit";
      this.$refs.addBusiness.form = JSON.parse(JSON.stringify(row));
      this.$refs.addBusiness.dialogVisible = true;
      window.console.log(row);
    }
  }
};
</script>
<style lang="less">
.business {
  .setWidth {
    width: 150px;
  }
  .pagination {
    text-align: center;
    padding-top: 20px;
  }
  .tableCard {
    margin-top: 25px;
  }
  .red {
    color: red;
  }
}
</style>