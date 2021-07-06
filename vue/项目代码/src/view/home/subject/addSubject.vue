<template>
  <!-- visible.sync="设置弹框显示与消失" -->
  <el-dialog class="addSubject" :visible.sync="dialogFormVisible" width="600px">
    <div slot="title" class="title">{{mode=='add'?'新增学科':"编辑学科"}}</div>
    <!-- el-form    lable-width设置下面每一项标题宽度   :model="绑定数据"
         el-form-item   label:标题  prop绑定相应属性值
             子项里面表单元素的v-model绑定的值要相同    
    -->
    <!-- 加入校验
    1:el-form   :rules="rules"  
       data里面定义相关的rules:{}
    2:el-form-item把需要校验的项绑定prop
 

    3:加入全局校验  el-form组件里面的方法 validate
       1：在el-form上定义一个ref属性
       2：this.$refs.值.validate((result)=>{
           //验证后的处理
       })
    
    -->
    <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 导入新增接口
import { addSubjectData, editSubjectData } from "@/api/subject.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      dialogFormVisible: false, //设置弹框显示与消失
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //学科备注
      },
      rules: {
        rid: [{ required: true, message: "请填入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请填入学科名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        // 清空表单  注意，需要清空的项一定要在el-form-item上加上prop绑定相应字段
        this.$refs.form.clearValidate();
      } else {
        //打开弹框的时候
        // 当第一次打开时form表单都不存在，所以无法调用clearValidate
        // setTimeou高级版本，它会在页面渲染完成后进行调用，它计算好了最近的页面渲染所需时间
        //它计算好了渲染from所需时间后进行调用
        //处理验证红色问题，也可以通过设置rules里面的trigger为blur就不会有这个问题
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  methods: {
    //   点击确定
    submitClick() {
      // 全局验证 反选rules里面的校验
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              // 新增成功处理  1：提示一下用户  2：关掉对话框  3：新增完成了，要重新执行一下父组件的搜索
              this.$message.success("新增成功!");
              this.dialogFormVisible = false;
              // this.$parent.search();
              // 使用emit实现
              //1：在父组件使用该组件身上绑定相应方法  @方法名="search"
              //2在该组件身上触发方法  this.$emit("方法名")
              this.$emit("add");
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功!");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less">
.addSubject {
  .title {
    text-align: center;
    color: #fff;
    background-color: rgb(14, 159, 249);
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .footer {
    text-align: center;
  }
}
</style>