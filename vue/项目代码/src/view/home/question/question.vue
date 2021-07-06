<template>
  <div class="question">
    <el-card>
      <!-- 
栅栏   24栏
行  el-row
栏  el-col   多少栏  :span="5"  offset偏移
      -->
      <el-form :model="form" label-width="80px" ref="form">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select placeholder="请选择学科" v-model="form.subject">
                <el-option
                  v-for="(item, index) in subjectData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select placeholder="请选择阶段" v-model="form.step">
                <el-option
                  v-for="(value,key,index) in stepObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
                <!-- <el-option label="初级" value="1"></el-option>
                <el-option label="中级" value="2"></el-option>
                <el-option label="高级" value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item, index) in businessData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select placeholder="请选择题型" v-model="form.type">
                <el-option
                  v-for="(value,key,index) in typeObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
                <!-- <el-option label="单选" :value="1"></el-option>
                <el-option label="多选" :value="2"></el-option>
                <el-option label="简答" :value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择难度" v-model="form.difficulty">
                <el-option
                  v-for="(value,key,index) in difficultyObj"
                  :key="index"
                  :label="value"
                  :value="+key"
                ></el-option>
                <!-- <el-option label="简单" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select placeholder="请选择状态" v-model="form.status">
                <!-- 值是什么？ -->
                <el-option :value="0" label="禁用"></el-option>
                <el-option :value="1" label="启用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- label-width 设置el-form-item上的标题宽度（当自己身上有label-width是优先听从自己的） -->
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="content">
      <!-- 
    el-table   data绑定整个表格的数据   border边框，它是一个boolean值   width 宽度
       el-table-column  栏   label标题  width设置宽度   prop绑定该栏对应的字段名
           自定义栏使用  1：在需要自定义的栏里加入一个template
                        2:通过slot-scope="局部变量"获取该行所有数据
  
      -->
      <el-table :data="tableData" :border="true">
        <el-table-column label="序号" width="50px">
          <!-- (当前页码-1)*页容量+$index+1 -->
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
          <!-- 对象.值   。语法有一个规定，后面的值要符合变量命名  不能数字 开头，不能是中文等
          有什么解决方法  对象[]语法 它没有变量命名的限制 规则
          -->
        </el-table-column>
        <el-table-column label="题型" width="50px">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username" width="150px"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status==0?'禁用':'启用'}}</template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads" width="90px"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <!-- 编辑编辑的是整行数据 -->
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              :type="scope.row.status==1?'info':'success'"
              @click="setStatus(scope.row.id)"
            >{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[5, 200, 300, 400,500,600]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 
      父传子数据   props
      1:在子组件标签上定义一个属性   属性名=值
      2：在子组件上获取该属性值   props:['属性名']
    -->
    <addQuestion
      ref="addQuestion"
      :subjectData="subjectData"
      :stepObj="stepObj"
      :businessData="businessData"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
      :mode="mode"
    ></addQuestion>
  </div>
</template>
<script>
import { getSubjectData } from "@/api/subject.js";
import { getBusinessDate } from "@/api/business.js";
import {
  getQuestionData,
  setQuestionStatus,
  delQuestionData
} from "@/api/question.js";
import addQuestion from "./addQuestion.vue";
export default {
  components: {
    addQuestion
  },
  data() {
    return {
      mode: "add",
      // 分页信息
      pagination: {
        currentPage: 1, //当前页
        pageSize: 5, //页容量
        total: 10 //总数
      },
      // 搜索表单信息
      form: {
        title: "", //标题
        subject: "", // 学科
        enterprise: "", //企业
        type: "", //类型
        step: "", //阶段
        username: "", //创建者
        status: "", //状态
        difficulty: "", //难度
        create_date: "" //创建时间
      },
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //类型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }, //难度
      subjectData: [], //学科列表数据
      businessData: [], //企业列表数据
      tableData: [] //题库列表数据
    };
  },
  created() {
    getSubjectData({ limit: 1000 }).then(res => {
      this.subjectData = res.data.items;
    });
    getBusinessDate({ limit: 1000 }).then(res => {
      this.businessData = res.data.items;
    });
    this.getData();
  },
  methods: {
    // 获取题库列表
    getData() {
      let _query = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getQuestionData(_query).then(res => {
        window.console.log("题库列表数据:", res);
        this.tableData = res.data.items;
        //在这里就转，在源头上搞定
        /*
        forEach   数组的循环释遍历
        数组.forEach((item,index)=>{
          它可以循环处理数组内全部数据，能改变源数组，
          但是它的循环根本停不下来（加return它都不会停下来），
          它没有返回值，返回值为undefined
        })        
        */

        this.tableData.forEach(item => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });

        //赋值给total
        this.pagination.total = res.data.pagination.total;
      });
    },
    //页容量改变
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    //页码改变
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    //搜索
    search() {
      window.console.log("所有数据:", this.form);
      this.pagination.currentPage = 1;
      this.getData();
    },
    // 清除
    reset() {
      // 1：清空表单数据   2：调用search
      this.$refs.form.resetFields();
      this.search();
    },
    //新增
    add() {
      // 1:修改mode为add
      this.mode = "add";
      // 2:传递默认数据过去到form
      this.$refs.addQuestion.form = {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        city: [], //城市
        title: "", //标题
        type: 1, //题型
        difficulty: 1, //难度
        single_select_answer: "", //单选答案
        multiple_select_answer: [], //多选答案
        short_answer: "", //简答答案
        video: "", //解析视频地址
        answer_analyze: "", //答案解析
        remark: "", //试题备注
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      };
      // 3:打开弹框
      this.$refs.addQuestion.dialogVisible = true;
    },
    // 设置状态
    setStatus(id) {
      setQuestionStatus({ id }).then(() => {
        this.$message.success("设置状态成功");
        this.getData();
      });
    },
    //删除
    del(id) {
      //提醒一下
      this.$confirm("您确定要删除此信息吗？", "友情提醒", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消删除",
        type: "warning"
      })
        .then(() => {
          //点击 确定的处理)
          delQuestionData({ id }).then(() => {
            this.$message.success("删除成功");
            this.search();
          });
        })
        .catch(() => {
          //点击 取消的处理
        });
    },
    //编辑
    edit(row) {
      window.console.log("整行数据:", row);
      //将row的所有数据全部传递给新增组件form，同时还要修改mode为edit,打开新增组件弹框
      this.mode = "edit";
      //访问form表单
      this.$refs.addQuestion.form = JSON.parse(JSON.stringify(row));
      this.$refs.addQuestion.dialogVisible = true;
    }
  }
};
</script>
<style lang="less">
.question {
  .content {
    margin-top: 20px;
  }
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>