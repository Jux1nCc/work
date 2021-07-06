<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :fullscreen="true"
  >
    <div slot="title" class="title">{{mode=='add'?'新增题库测试':'编辑题目'}}</div>
    <el-form :model="form" ref="form" :rules="rules" class="form" label-width="120px">
      <el-form-item label="学科" prop="subject">
        <el-select placeholder="请选择学科" v-model="form.subject">
          <el-option
            :value="item.id"
            :label="item.name"
            v-for="(item, index) in subject"
            :key="index"
            v-show="item.status==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select placeholder="请选择阶段" v-model="form.step">
          <el-option v-for="(item, key, index) in stepObj" :key="index" :value="+key" :label="item"></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item label="城市" prop="city">
        <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(item, key, index) in typeObj" :key="index" :label="+key">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio v-for="(item, key, index) in difficult" :key="index" :label="+key">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr />
      <el-form-item label="试题标题" prop="title" class="setMargin">
        <quillEditor
          v-model="form.title"
          :options="{placeholder:'请在这里输入'}"
          @change="editorChange('title')"
        ></quillEditor>
      </el-form-item>
      <el-form-item
        :label="typeObj[form.type]"
        :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]"
      >
        <allSelect :form="form" class="allSelect" @change="allSelectChange"></allSelect>
      </el-form-item>
      <hr />
      <el-form-item label="解析视频">
        <upload v-model="form.video" type="video"></upload>
      </el-form-item>
      <hr />
      <el-form-item label="答案解析" prop="answer_analyze" class="setMargin">
        <quillEditor
          v-model="form.answer_analyze"
          :options="{placeholder:'请在这里输入'}"
          @change="editorChange('answer_analyze')"
        ></quillEditor>
      </el-form-item>
      <hr />
      <el-form-item label="试题备注" prop="remark" style="margin-top:40px;" label-width="80px">
        <el-input v-model="form.remark" style="margin-top:40px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
// 导入富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import allSelect from "./allSelect.vue";
import upload from "./upload.vue";
import { addQuestionData, editQuestionData } from "@/api/question.js";
export default {
  components: {
    quillEditor,
    allSelect,
    upload
  },
  props: {
    mode: String,
    subject: Array,
    stepObj: Object,
    enterprise: Array,
    typeObj: Object,
    difficult: Object
  },
  // 监听器
  watch:{
    dialogFormVisible(newVal){
      if(newVal == false){
        this.$refs.form.resetFields();
      }
    },
    mode(){
      this.$nextTick(()=>{
        this.$refs.form.clearValidate();
      })
    }
  },
  data() {
    return {
      dialogVisible: false,
      options: regionData,
      form: {
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
      },
      rules: {
        title: { required: true, message: "请输入标题", trigger: "change" },
        subject: { required: true, message: "请输入学科", trigger: "change" },
        step: { required: true, message: "请输入阶段", trigger: "change" },
        enterprise: {
          required: true,
          message: "请输入企业",
          trigger: "change"
        },
        city: { required: true, message: "请输入城市", trigger: "change" },
        difficulty: {
          required: true,
          message: "请输入难度",
          trigger: "change"
        },
        type: { required: true, message: "请输入题型", trigger: "change" },
        single_select_answer: {
          required: true,
          message: "请输入单选题答案",
          trigger: "change"
        },
        multiple_select_answer: {
          required: true,
          message: "请输入多选题答案",
          trigger: "change"
        },
        short_answer: {
          required: true,
          message: "请输入简答题答案",
          trigger: "change"
        },
        answer_analyze: {
          required: true,
          message: "请输入答案解析",
          trigger: "change"
        },
        remark: { required: true, message: "请输入备注", trigger: "change" },
        select_options: {
          required: true,
          message: "请输入题目答案",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    submit() {
      // window.console.log(this.form.short_answer);
      this.$refs.form.validate(res => {
        // window.console.log(res);
        if (res) {
          if (this.mode == "add") {
            addQuestionData(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.$emit("addSearch");
            });
          } else {
            let _params = JSON.parse(JSON.stringify(this.form));
            _params.city = _params.city.join(',');
            editQuestionData(_params).then(() => {
              this.$message.success("编辑成功");
              this.dialogVisible = false;
              this.$emit("addSearch");
            });
          }
        }
      });
    },
    // 富文本验证
    editorChange(res) {
      this.$refs.form.validateField(res);
    },
    // 选项组件验证
    allSelectChange() {
      this.$refs.form.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    },
    optionSelect(res){
      window.console.log(res)
    }
  }
};
</script>

<style lang='less'>
.el-dialog__header {
  text-align: left;
}
.form {
  width: 832px;
  margin: 0 auto;
  .el-form-item__label {
    text-align: left;
  }
  .allSelect {
    .el-input__inner {
      border-color: #dcdfe6;
    }
  }
  .setMargin {
    margin-top: 30px;
    .el-form-item__content {
      margin-left: 0px !important;
      margin-top: 50px;
    }
    .ql-image,
    .ql-video {
      display: none;
    }
  }
  .avatar-uploader {
    text-align: left;
    margin-top: 20px;
  }
}
</style>