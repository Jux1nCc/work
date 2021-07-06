<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :fullscreen="true"
  >
    <div slot="title">{{mode == 'add'? '新增题库测试':'编辑题目'}}</div>
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item label="学科" prop="subject">
        <el-select placeholder="请选择学科" v-model="form.subject">
          <el-option
            v-for="(item, index) in subject"
            :key="index"
            :value="item.id"
            :label="item.name"
            v-show="item.status==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select placeholder="请选择阶段" v-model="form.step">
          <el-option v-for="(item, index, key) in stepObj" :key="index" :value="+key" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-select placeholder="请选择企业" v-model="form.enterprise">
          <el-option
            v-for="(item, index) in business"
            :key="index"
            :value="item.id"
            :label="item.name"
            v-show="item.status==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(item, index, key) in typeObj" :key="key" :label="+index">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio v-for="(item, index, key) in difficult" :key="key" :label="+index">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr>
      <el-form-item label="标题" prop="title">
        <quillEditor v-model="form.title" :options='{placeholder:"请在此输入内容"}'></quillEditor>
      </el-form-item>
      <el-form-item :label="typeObj[form.type]" :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]">
        <allSelect :form='form'></allSelect>
      </el-form-item>
      <hr>
      <el-form-item label="解析视频" prop="video">
        <upLoad v-model="form.video" type='video'></upLoad>
      </el-form-item>
      <hr>
      <el-form-item label="答案解析" prop="answer_analyze">
        <quillEditor v-model="form.answer_analyze" :options='{placeholder:"请在此输入内容"}'></quillEditor>
      </el-form-item>
      <hr>
      <el-form-item label="试题备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
// 导入富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import allSelect from './allSelect'
import upLoad from './upLoad'
export default {
  // 子组件
  components:{
    quillEditor,
    allSelect,
    upLoad
  },
  // 传值
  props: {
    mode: String,
    business: Array,
    subject: Array,
    stepObj: Object,
    typeObj: Object,
    difficult: Object
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
      }
    };
  }
};
</script>

<style lang='less'>
.el-dialog__header {
  text-align: left;
}
</style>