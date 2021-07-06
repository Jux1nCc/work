<template>
  <div class="question">
    <el-card style="margin-bottom:20px">
      <el-form label-width="80px" :model="form" ref="form">
        <el-row>
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select placeholder="请选择学科" v-model="form.subject">
                <el-option
                  v-for="(item, index) in subject"
                  :value="item.id"
                  :label="item.name"
                  :key="index"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select placeholder="请选择阶段" v-model="form.step">
                <el-option
                  v-for="(item, index, key) in stepObj"
                  :key="index"
                  :value="+key"
                  :label="item"
                ></el-option>
                <!-- <el-option value="1" label="初级"></el-option>
                <el-option value="2" label="中级"></el-option>
                <el-option value="3" label="高级"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item, index) in enterprise"
                  :value="item.id"
                  :label="item.name"
                  :key="index"
                  v-show="item.status==1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select placeholder="请选择题型" v-model="form.type">
                <el-option
                  v-for="(item, index, key) in typeObj"
                  :key="index"
                  :value="+key"
                  :label="item"
                ></el-option>
                <!-- <el-option :value="1" label="单选"></el-option>
                <el-option :value="2" label="多选"></el-option>
                <el-option :value="3" label="简答"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择难度" v-model="form.difficulty">
                <!-- <el-option :value="1" label="简单"></el-option>
                <el-option :value="2" label="一般"></el-option>
                <el-option :value="3" label="困难"></el-option>-->
                <el-option
                  v-for="(item, index, key) in difficult"
                  :key="index"
                  :value="+key"
                  :label="item"
                ></el-option>
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
                <el-option :value="0" label="禁用"></el-option>
                <el-option :value="1" label="启用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.create_date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input label-width="400px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" class="el-icon-plus" @click="addData">新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name+'.'+step" label="学科.阶段">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
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
    <addQuestion
      :mode="mode"
      ref="addQuestion"
      @addSearch="search"
      :subject="subject"
      :stepObj="stepObj"
      :enterprise="enterprise"
      :typeObj="typeObj"
      :difficult="difficult"
    ></addQuestion>
  </div>
</template>

<script>
import { getSubjectData } from "@/api/subject.js";
import { getBusinessData } from "@/api/business.js";
import {
  getQuestionData,
  setQuestionStatus,
  removeQuestionData
} from "@/api/question.js";
import addQuestion from "./addQuestion.vue";
export default {
  components: {
    addQuestion
  },
  created() {
    getSubjectData({ limit: 1000 }).then(res => {
      // window.console.log(res);
      this.subject = res.data.items;
    });
    getBusinessData({ limit: 1000 }).then(res => {
      // window.console.log(res);
      this.enterprise = res.data.items;
    });
    this.getData();
  },
  data() {
    return {
      form: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: ""
      },
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 3
      },
      subject: [],
      enterprise: [],
      tableData: [],
      stepObj: { 1: "初级", 2: "中级", 3: "高级" },
      typeObj: { 1: "单选", 2: "多选", 3: "简答" },
      difficult: { 1: "简单", 2: "一般", 3: "困难" },
      mode: "add"
    };
  },
  methods: {
    search() {
      // window.console.log(this.form);
      this.pagination.currentPage = 1;
      this.getData();
    },
    getData() {
      let _params = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getQuestionData(_params).then(res => {
        // window.console.log(res);
        this.tableData = res.data.items;
        this.tableData.forEach(item => {
          item.city = item.city.split(",");
          item.multiple_select_answer = item.multiple_select_answer.split(",");
        });
        this.pagination.total = res.data.pagination.total;
      });
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.getData();
    },
    setStatus(id) {
      setQuestionStatus({ id }).then(() => {
        this.$message.success("设置成功");
        this.search();
      });
    },
    remove(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 调用接口Api
          removeQuestionData({ id }).then(() => {
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
    reset() {
      this.form = {
        username: "",
        email: "",
        role_id: ""
      };
      this.search();
    },
    addData() {
      this.mode = "add";
      this.$refs.addQuestion.form = {
        title: "", // 标题
        subject: "", // 学科ID标识
        step: "", // 阶段 1初级, 2中级, 3高级
        enterprise: "", // 企业ID标识
        city: [], // [省,市,区]
        type: 1, // 题型 1单选, 2多选, 3简答
        difficulty: 1, // 题目难度 1简单, 2一般, 3困难
        single_select_answer: "", // 单选题答案
        multiple_select_answer: [], // 多选题答案
        short_answer: "", // 简单题答案
        video: "", // 视频解析地址
        answer_analyze: "", // 答案解析
        remark: "", // 答案备注
        select_options: [
          // 选项,介绍,图片介绍
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
      this.$refs.addQuestion.dialogVisible = true;
    },
    edit(row) {
      this.mode = "edit";
      this.$refs.addQuestion.form = JSON.parse(JSON.stringify(row));
      this.$refs.addQuestion.dialogVisible = true;
    }
  }
};
</script>

<style lang='less'>
.question {
  .red {
    color: red;
  }
  .pageBox {
    text-align: center;
    margin-top: 30px;
  }
}
</style>