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
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select placeholder="请选择企业" v-model="form.enterprise">
                <el-option
                  v-for="(item, index) in business"
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
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择难度" v-model="form.difficulty">
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
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
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
            <el-form-item label="标题">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="10px">
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" class="el-icon-plus" @click="add">新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <el-table border :data="tableData">
        <el-table-column label="序号">
          <template slot-scope="scope">{{(pagination.current-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="题目" prop="title">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" prop="subject_name+'.'+step">
          <template slot-scope="scope">{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</template>
        </el-table-column>
        <el-table-column label="题型" prop="type">
          <template slot-scope="scope">{{typeObj[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="setStatus(scope.row.id)"
              :class="{red:scope.row.status==1}"
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
    <addQuestion 
    :mode="mode"
     ref="addQuestion" 
     :subject='subject' 
     :business='business' 
     :stepObj='stepObj'
     :typeObj='typeObj'
     :difficult='difficult'
     ></addQuestion>
  </div>
</template>

<script>
import addQuestion from "./addQuestion";
import { getSubjectData } from "@/api/subject";
import { getBusinessData } from "@/api/business";
import {
  getQuestionData,
  setQuestionStatus,
  removeQuestionData
} from "@/api/question";
export default {
  components: {
    addQuestion
  },
  created() {
    // 获取选择框学科数据
    getSubjectData({ limit: 1000 }).then(res => {
      // window.console.log(res)
      this.subject = res.data.items;
    }),
      // 获取选择框企业数据
      getBusinessData({ limit: 1000 }).then(res => {
        // window.console.log(res)
        this.business = res.data.items;
      }),
      this.getData();
  },
  data() {
    return {
      form: {
        title: "", // 标题名称
        subject: "", // 学科ID
        enterprise: "", // 企业ID
        type: "", // 题目类型
        step: "", // 题目阶段
        username: "", // 作者
        status: "", // 状态
        difficulty: "", // 题目难度
        create_date: "" // 创建日期
      },
      pagination: {
        current: 1,
        pageSize: 3,
        total: 6
      },
      mode: "add",
      tableData: [], // 表格数据
      subject: [], // 学科数据
      business: [], // 企业数据
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, // 题目阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, // 题目类型
      difficult: { 1: "简单", 2: "一般", 3: "困难" } // 题目难度
    };
  },
  methods: {
    sizeChange(size) {
      this.pagination.pageSize = size;
      this.search();
    },
    currentChange(page) {
      this.pagination.current = page;
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
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 搜索
    search() {
      this.pagination.current = 1;
      this.getData();
    },
    // 设置状态
    setStatus(id) {
      setQuestionStatus({ id }).then(() => {
        this.$message.success("状态设置成功");
        this.search();
      });
    },
    // 删除
    remove(id) {
      this.$confirm("此项操作将删除该条数据,是否删除?", "温馨提示!", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          removeQuestionData({ id }).then(() => {
            this.$message.success("删除成功!");
            this.search();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除!");
        });
    },
    // 清空
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },
    add() {
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