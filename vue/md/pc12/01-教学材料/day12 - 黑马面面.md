# day12 - 黑马面面

## 反馈

1.	好绕啊,脑壳疼,听说明天更难,瑟瑟发抖....
1.	明天就是飞飞老师最后一天课了，沉默是今晚的康桥。难受😭 。
1.	我们遇到什么Bug也不要怕 解决bug最好的办法就是微笑的面对bug 坚持就是秃头 奥利给！！！
1.	转载： 1.老程序员的小习惯：剪了指甲敲键盘的感觉就是一个字：爽； 2.每个人都做好了秃头的准备与学习死磕，学到植发！！！ 3.老程序员用他多年的经验偷偷告诉了我们一个秘密：学习编程并不会脱发！！！ 4.上课犯困掐大腿，吞芥末！！！ 5. 现在多敲一行代码，未来的老婆就多漂亮一点！！！ 致敬出狱的精神领袖 —— 窃·格瓦拉 打工是不可能打工的，这辈子都不可能打工的！做生意又不会做，就是偷这种东西，才可以维持得了生活这样子
1.	飞飞老师人好好,舍不得飞飞老师,呜呜呜呜呜 T_T



## 回顾

props 与emit

1. 父传子数据

   ~~~
   1：在子组件标签上定义一个属性  属性名=值
   2：在子组件内获取该值   
       props:['属性名']
       props:{
         属性名：类型（Number,Object...）
         属性名:{
          type:"类型"
          default:默认值（注意点，基本数据类型直接写该值，引用类型数据function(){return 相应的值}）
         }
       }
   ~~~

2. 子调用父方法

   ~~~
   1：在子组件标签上定义一个方法  @子组件方法名=“父组件方法”
   2：在子组件内触发该方法  this.$emit("子组件方法名"，可以传参数）
   ~~~

3. v-model使用

   ~~~
   它只是一个语法糖
   相当于  props  使用的是一个value属性  
          emit    用的是一个input方法名
     子组件标签上定义一个   :value="父组件变量"   @input="只做一件事情 ，父组件变量=子组件emit过来的值"  它的简写就是v-model="父组件变量"
     
     在子组件内  props:['value']
               this.$emit("input",传递一个相应的值出去)
   ~~~

4. props传递数据

   1. 注意点：
      1. 当传递的数据是基本类型，它props接收后，该值不能改变
      2. 当传递的数据是引用类型，props接收后，它可以修改，而且它的修改会影响到父组件 相应的值，也就是说父组件相应的值与props接收的相应的引用值是一体的

















## 题库模块-新增组件试题备注

>将试题备注加入到新增组件中

1. 先在form表单按接口值定义

   ~~~js
         form: {
           subject: "", //学科
           step: "", //阶段
           enterprise: "", //企业
           city: [],
           type: "", //题型
           diffculty: "", //难度
           title: "", //试题标题
           single_select_answer: "", // 单选答案
           multiple_select_answer: [], //多选答案
           short_answer: "", //简答答案
           video: "", //解析视频
           remark: "", //试题备注
           // 题目选项
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
         },
   ~~~

   2.加入相应html并绑定值

   ~~~
         <el-form-item label="试题备注">
           <el-input type="textarea" v-model="form.remark" rows="2"></el-input>
         </el-form-item>
   ~~~



## 题库模块 -新增  表单校验整合

> 点击提交的时候，需要校验数据是否正确哦

```
// 学科 subject
// 阶段 step
// 企业 enterprise
// 城市 city
// 题型 type
// 难度 difficulty
// 标题 title
// 单选 single_select_answer
// 多选 multiple_select_answer
// 简答 short_answer
// 答案解析 answer_analyze
// 试题备注 remark
```

步骤:

1. data中定义`rules`
2. form上 设置`rules`，设置`ref`
3. 点击提交的时候 
   1. 调用校验方法，
      1. 通过了 提交数据
      2. 失败了 提示用户

~~~vue
<template>
  <el-dialog class="addQuestion" :visible.sync="dialogVisible" :fullscreen="true">
    <div slot="title" class="title">新增题库</div>
    <el-form class="form" label-width="80px" :model="form" ref="form" :rules="rules">
      <el-form-item label="学科" prop="subject">
        <el-select v-model="form.subject">
          <el-option
            v-for="(item, index) in subjectList"
            :key="index"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select placeholder="请选择阶段" v-model="form.step">
          <el-option :value="1" label="初级"></el-option>
          <el-option :value="2" label="中级"></el-option>
          <el-option :value="3" label="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-select placeholder="请选择企业" v-model="form.enterprise">
          <el-option
            v-for="(item, index) in businessList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-cascader
          v-model="form.city"
          size="large"
          :props="{value:'label'}"
          :options="options"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="diffculty">
        <el-radio-group v-model="form.diffculty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr />
      <el-form-item label="试题标题" prop="title">
        <quillEditor v-model="form.title" @change="editorChange"></quillEditor>
      </el-form-item>
      <el-form-item
        :label="{1:'单选',2:'多选',3:'简答'}[form.type]"
        :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]"
      >
        <allSelect  :form="form"></allSelect>
      </el-form-item>
      <el-form-item label="解析视频" prop="video">
        <uploadVideo type="video" v-model="form.video" @validateVideo="validateVideo"></uploadVideo>
      </el-form-item>
      <el-form-item label="试题备注" prop="remark">
        <el-input type="textarea" rows="2" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btnCenter">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button @click="submit">确定</el-button>
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
// 导入选项
import allSelect from "./allSelect";
// 导入视频上传组件
import uploadVideo from "./uploadImage";

export default {
  props: ["subjectList", "businessList"],
  components: {
    quillEditor,
    allSelect,
    uploadVideo
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        city: [],
        type: 1, //题型
        diffculty: "", //难度
        title: "", //试题标题
        single_select_answer: "", // 单选答案
        multiple_select_answer: [], //多选答案
        short_answer: "", //简答答案
        video: "", //解析视频
        remark: "", //试题备注
        // 题目选项
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
      },
      // 必填验证
      rules: {
        subject: [{ required: true, message: "必填哦！", trigger: "change" }],
        step: [{ required: true, message: "必填哦！", trigger: "change" }],
        enterprise: [
          { required: true, message: "必填哦！", trigger: "change" }
        ],
        city: [{ required: true, message: "必填哦！", trigger: "change" }],
        type: [{ required: true, message: "必填哦！", trigger: "change" }],
        diffculty: [{ required: true, message: "必填哦！", trigger: "change" }],
        title: [{ required: true, message: "必填哦！", trigger: "change" }],
        single_select_answer: [
          { required: true, message: "必填哦！", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "必填哦！", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "必填哦！", trigger: "change" }
        ],
        video: [{ required: true, message: "必填哦！", trigger: "change" }],
        remark: [{ required: true, message: "必填哦！", trigger: "change" }]
      },
      //   省市区数据
      options: regionData
    };
  },
  methods: {
    handleChange(val) {
      window.console.log(val);
    },
    edirotEvent(val) {
      window.console.log(val);
    },
    validateVideo() {
      this.$refs.form.validateField("video");
    },
    editorChange() {
      this.$refs.form.validateField("title");
    },
    // 确定按钮点击
    submit() {
      window.console.log(this.form);
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          //调用提交接口
        }
      });
    }
  }
};
</script>
<style lang="less">
.addQuestion {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    text-align: left;
    color: #fff;
    height: 53px;
    background-color: rgb(14, 156, 250);
    font-size: 18px;
    line-height: 53px;
  }
  .form {
    width: 800px;
    margin: 0 auto;
  }
  .inputW {
    width: 364px;
  }
  .btnCenter {
    text-align: center;
  }
}
</style>
~~~



## 题库模块 - 选项区域表单验证

> 根据题型的不同，选项区域有三种，分别是单选框组，多选框组，简答题,并且要联动哦，我们来整合一下

1. 在每个选项点击都绑定同一个change事件

   ~~~
           单选
           <el-radio
               @change="emitData"
               class="radioItem"
               :label="item.label"
               v-model="form.single_select_answer"
             >
               {{item.label}}
               <el-input v-model="item.text" class="input"></el-input>
             </el-radio>
             多选
                   <el-checkbox class="radioItem" :label="item.label" v-model="form.multiple_select_answer">
               {{item.label}}
               <el-input @change="emitData" v-model="item.text" class="input"></el-input>
             </el-checkbox>
             简答
             <el-input @change="emitData" type="textarea" rows="4" v-model="form.short_answer"></el-input>
   ~~~

   

2. 对change事件做一个emit处理，当数据改变时，都emit新增组件做一次表单验证

   1. 在新增组件中对选项组件绑定相应事件

      ~~~html
        <allSelect @data="getAnswer" :form="form"></allSelect>
      ~~~

   2. 同事在新增组件写下相应的getAnswer方法

      ~~~js
          // 处理收到的验证
          getAnswer() {
            this.$refs.form.validateField([
              "single_select_answer",
              "multiple_select_answer",
              "short_answer"
            ]);
          },
      ~~~

      

   3. 在选项组件中写好相应的emit

      ~~~js
          //   触发父组件表单验证
          emitData() {
            this.$emit("data");
          }
      ~~~

      

## 题库模块 - 数据提交

> 准备了这么多的数据，终于要提交啦，和之前的逻辑一样，新增成功之后，父组件重新获取即可

步骤：

1. 定义接口，在相应js定义api方法 

   ~~~js
   function addQuestionData(data) {
       return instance({
           url: "/question/add",
           method: "post",
           data
       })
   }
   ~~~

   

2. 导入接口

   ~~~
   import { addQuestionData } from "@/api/question.js";
   ~~~

   

3. 点击提交校验数据
   1. 失败提示
   2. 成功：提交数据
      1. 成功：
         1. 提示用户
         2. 关闭对话框
         4. 通知父组件重新获取数据
         
         

   ~~~js
       // 确定按钮点击
       submit() {
         window.console.log(this.form);
         this.$refs.form.validate(result => {
           window.console.log(result);
           if (result) {
             //调用提交接口
             window.console.log("form:", this.form);
             addQuestionData(this.form).then(() => {
               this.$message.success("添加成功");
               this.dialogVisible = false;
               this.$parent.search();
             });
           }
         });
       }
   ~~~

   

## 题库模块 - 进入编辑

> 点击编辑按钮 进入编辑状态,和之前的逻辑类似，一些细节需要处理一下

[传送门](https://element.eleme.cn/#/zh-CN/component/dialog)

分析：新增组件与编辑组件共用，只需传递一个mode值进行处理即可

​      新增：  mode=="add"     

​      编辑:      mode=="edit"

1. 点击编辑按钮，打开新增组件，并传递mode为edit,同时，需要将当前点击项数据传递过去
   
   1. 定义一个mode默认值为add
   
   2. 在新增组件上绑定相应属性
   
      ~~~vue
          <addQuestion
            :mode="mode"
            ref="addQuesition"
            :subjectList="subjectList"
            :businessList="businessList"
          ></addQuestion>
      ~~~
   
   3. 在编辑按钮上加入点击事件，点击时改变新增组件的form为当前行数据
   
      ~~~vue
       <el-table-column label="操作" width="260px">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)">编辑</el-button>
                  <el-button>{{scope.row.status==1?'禁用':"启用"}}</el-button>
                  <el-button>删除</el-button>
                </template>
              </el-table-column>
      ~~~
   
      注意：编辑数据的表单传值这里，一定要尝试克隆一下，以免受到影响
   
      ~~~js
          //编辑
          edit(rowData) {
            this.$refs.addQuestion.dialogVisible = true;
            this.$refs.addQuestion.form = JSON.parse(JSON.stringify(rowData));
            this.mode = "edit"
          }
      ~~~
   
   4. 调整以前新增，新增时需要修改mode为add,同时，form表单要还原
   
      ~~~js
          // 新增
          add() {
            this.mode = "add";
            this.$refs.addQuestion.dialogVisible = true;
            this.$refs.addQuestion.form = {
              subject: "", //学科
              step: "", //阶段
              enterprise: "", //企业
              city: [],
              type: 1, //题型
              difficulty: "", //难度
              title: "", //试题标题
              single_select_answer: "", // 单选答案
              multiple_select_answer: [], //多选答案
              short_answer: "", //简答答案
              video: "", //解析视频
              remark: "", //试题备注
              // 题目选项
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
          },
      ~~~
   
   5. 在新增组件中接收mode值
   
   ~~~js
     props: ["subjectList", "businessList", "mode"],
   ~~~
   
   6.由于城市与多选答案的数据是一个字符串，但我们要的是数组，需要特别处理一下
   
   可以在收到数据列表后就进行一次转换
   
   ~~~
       getData() {
         let _params = {
           ...this.form,
           ...{
             page: this.pagination.currentPage,
             limit: this.pagination.pageSize
           }
         };
         getQuesitionData(_params).then(res => {
         
           this.table = res.data.items;
             // 处理城市数据
           this.table.forEach(item => {
             item.city = item.city.split(",");
             item.multiple_select_answer = item.multiple_select_answer.split(",");
           });
           // 处理分页总数
           this.pagination.total = res.data.pagination.total;
   
           window.console.log("题库列表数据", res);
         });
       }
   ~~~
   
   

## 题库模块 - 保存修改

> 点击提交的时候，把我们进行准备的数据提交到服务器即可

步骤:

1. 在相应js写上编辑api方法

   ~~~js
   import instance from '@/utils/request.js'
   function getQuestionData(params) {
       return instance({
           url: "/question/list",
           method: "get",
           params
       })
   }
   function addQuestionData(data) {
       return instance({
           url: "/question/add",
           method: "post",
           data
       })
   }
   function editQuestionData(data) {
       return instance({
           url: "/question/edit",
           method: "post",
           data
       })
   }
   export { getQuestionData, addQuestionData, editQuestionData }
   ~~~

   

2. 在新增组件中导入编辑接口

   ~~~js
   import { addQuestionData, editQuestionData } from "@/api/quesition.js";
   ~~~

   

3. 在提交那里根据mode的不同做出相应处理即可

   修改成功与添加成功后，题库列表都得执行一次刷新 ，也就相当于一次搜索即可

   ~~~js
       // 确定按钮点击
       submit() {
         window.console.log(this.form);
         this.$refs.form.validate(result => {
           window.console.log(result);
           if (result) {
             //调用提交接口
             if (this.mode == "add") {
               addQuestionData(this.form).then(() => {
                 this.$message.success("添加成功");
                 this.dialogVisible = false;
                 this.$parent.search();
               });
             } else {
               editQuestionData(this.form).then(() => {
                 this.$message.success("修改成功");
                 this.dialogVisible = false;
                 this.$parent.search();
               });
             }
           }
         });
       }
   ~~~
   
   

## 题库模块 - 状态切换

> 点击切换状态的逻辑咱们来实现以下

步骤:

1. 在相应js定义状态切换的api方法

   ~~~js
   function setQuestionStatus(data) {
       return instance({
           url: "/question/status",
           method: "post",
           data
       })
   }
   ~~~

   

2. 为状态切换绑定点击事件 

   ~~~html
          <el-table-column label="操作" width="260px">
             <template slot-scope="scope">
               <el-button @click="edit(scope.row)">编辑</el-button>
               <el-button @click="setStatus(scope.row.id)">{{scope.row.status==1?'禁用':"启用"}}</el-button>
               <el-button>删除</el-button>
             </template>
           </el-table-column>
   ~~~

   

3. 导入状态处理api方法，并传递id,成功之后，重新获取数据

   ~~~js
       // 设置状态
       setStatus(id) {
         setQuestionStatus({ id: id }).then(() => {
             this.$message.success("状态修改成功！");
             this.search();
         });
       }
   ~~~
   
   



## 题库模块 - 点击删除

> 点击删除的逻辑我们来实现以下

步骤：

1. 定义删除api方法

   ~~~js
   function delQuestionData(data) {
       return instance({
           url: "/question/remove",
           method: "post",
           data
       })
   }
   ~~~

   

2. 点击删除按钮

   ~~~html
      <el-table-column label="操作" width="260px">
             <template slot-scope="scope">
               <el-button @click="edit(scope.row)">编辑</el-button>
               <el-button @click="setStatus(scope.row.id)">{{scope.row.status==1?'禁用':"启用"}}</el-button>
               <el-button @click="del(scope.row.id)">删除</el-button>
             </template>
           </el-table-column>
   ~~~

3. 导入相应api方法

   ~~~
   import {
     getQuestionData,
     setQuestionStatus,
     delQuestionData
   } from "@/api/quesition.js";
   ~~~

   

4. 弹框
   1. 确认：
      1. 调用接口 delQuestionData传递id
         1. 通过接口文档查看的数据
         2. 成功：重新获取数据
         3. 失败：提示用户
   2. 取消：
      1. 关闭

   ~~~
       // 删除
       del(id) {
         this.$confirm("你确定要删除这条数据吗？", "友情提示", {
           confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"
         })
           .then(() => {
             delQuestionData({ id: id }).then(() => {
                 this.$message.success("删除成功！");
                 this.search();
             });
           })
           .catch(() => {});
       }
   ~~~
   
   

## 统计模块 - 顶部布局

> 首先我们来实现顶部布局

步骤：

1. 顶部是一个卡片

2. 内部一堆圈圈

   

~~~vue
<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li>
          <div class="circle">0</div>
          <p class="txt">今日新增用户</p>
        </li>
        <li>
          <div class="circle">0</div>
          <p class="txt">总用户量</p>
        </li>
        <li>
          <div class="circle">0</div>
          <p class="txt">新增试题</p>
        </li>
        <li>
          <div class="circle">0</div>
          <p class="txt">总试题量</p>
        </li>
        <li>
          <div class="circle">0</div>
          <p class="txt">总刷题量</p>
        </li>
        <li>
          <div class="circle">0</div>
          <p class="txt">人均刷题量</p>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.chart {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .circle {
      border: 3px solid red;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    .txt {
      text-align: center;
    }
  }
}
</style>
~~~





## 统计模块 - 顶部数据获取

> 布局搞定了之后，我们来获取顶部的数据

步骤：

1. 抽取接口

   ~~~js
   import instance from '@/utils/request.js'
   function getChartData() {
       return instance({
           url: "/data/title"
       })
   }
   export { getChartData }
   ~~~

   

2. 导入接口

   ~~~
   import { getChartData } from "@/api/chart.js";
   ~~~

3. 调用接口

   ~~~js
   import { getChartData } from "@/api/chart.js";
   export default {
     data() {
       return {
         list: []
       };
     },
     created() {
       getChartData().then(res => {
         this.list = res.data;
       });
     }
   };
   ~~~

   

4. 渲染数据即可

   ~~~html
    <el-card>
         <ul class="list">
           <li>
             <div class="circle">{{courseData.increment_users}}</div>
             <p class="txt">今日新增用户</p>
           </li>
           <li>
             <div class="circle">{{courseData.total_users}}</div>
             <p class="txt">总用户量</p>
           </li>
           <li>
             <div class="circle">{{courseData.increment_questions}}</div>
             <p class="txt">新增试题</p>
           </li>
           <li>
             <div class="circle">{{courseData.total_questions}}</div>
             <p class="txt">总试题量</p>
           </li>
           <li>
             <div class="circle">{{courseData.total_done_questions}}</div>
             <p class="txt">总刷题量</p>
           </li>
           <li>
             <div class="circle">{{courseData.personal_questions}}</div>
             <p class="txt">人均刷题量</p>
           </li>
         </ul>
       </el-card>
   ~~~

   



## 统计模块 - 底部布局

> 底部使用的是 百度的`Echarts`，先整合进来

步骤:

1. 底部添加卡片
2. 整合echarts
   1. 下包 `npm install echarts`
   2. 导包 
   3. 用包`mounted`
      1. 记得写在 卡片内部的一个div中，不要直接用`el-card`

~~~js
<template>
  <div class="course">
    <el-card>
      <ul class="list">
        <li>
          <div class="circle">{{courseData.increment_users}}</div>
          <p class="txt">今日新增用户</p>
        </li>
        <li>
          <div class="circle">{{courseData.total_users}}</div>
          <p class="txt">总用户量</p>
        </li>
        <li>
          <div class="circle">{{courseData.increment_questions}}</div>
          <p class="txt">新增试题</p>
        </li>
        <li>
          <div class="circle">{{courseData.total_questions}}</div>
          <p class="txt">总试题量</p>
        </li>
        <li>
          <div class="circle">{{courseData.total_done_questions}}</div>
          <p class="txt">总刷题量</p>
        </li>
        <li>
          <div class="circle">{{courseData.personal_questions}}</div>
          <p class="txt">人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card>
      <div ref="echarts" class="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import { getChartData } from "@/api/chart.js";
import echarts from "echarts";
export default {
  data() {
    return {
      courseData: "",
      myEcharts: ""
    };
  },
  created() {
    getChartData().then(res => {
        this.courseData = res.data;
    });
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.echarts);
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: 10,
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ]
        }
      ]
    };
    this.myEcharts.setOption(option);
  }
};
</script>

<style lang="less">
.course {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .circle {
      border: 3px solid red;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    .txt {
      text-align: center;
    }
  }
  .echarts {
    height: 400px;
  }
}
</style>
~~~



## 统计模块 - 网络数据获取

> 底部的数据是联动的，我们通过接口来获取

步骤:

1. 定义相应api方法

   ~~~js
   
   function getStatistics() {
       return instance({
           url: "/data/statistics"
       })
   }
   
   ~~~
   
   
   
2. 导入相应api方法

   ~~~
   import { getChartData, getStatistics } from "@/api/chart.js";
   ~~~

   

3. 调用接口

4. 接口调用成功之后生成echarts

5. 数据部分是本地和网络数据的结合

~~~vue
<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li>
          <div class="circle">{{list.increment_users}}</div>
          <p class="txt">今日新增用户</p>
        </li>
        <li>
          <div class="circle">{{list.total_users}}</div>
          <p class="txt">总用户量</p>
        </li>
        <li>
          <div class="circle">{{list.increment_questions}}</div>
          <p class="txt">新增试题</p>
        </li>
        <li>
          <div class="circle">{{list.total_questions}}</div>
          <p class="txt">总试题量</p>
        </li>
        <li>
          <div class="circle">{{list.total_done_questions}}</div>
          <p class="txt">总刷题量</p>
        </li>
        <li>
          <div class="circle">{{list.personal_questions}}</div>
          <p class="txt">人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card>
      <div ref="echarts" class="echarts"></div>
    </el-card>
  </div>
</template>

<script>
import { getChartData, getStatistics } from "@/api/chart.js";
import echarts from "echarts";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    getChartData().then(res => {
      this.list = res.data;
    });
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.echarts);
    getStatistics().then(res => {
      if (res.code == 200) {
        window.console.log("echarts数据：", res);
        let legendData = res.data.map(item => {
          return item.name;
        });
        let option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            right: 10,
            data: legendData
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: res.data
            }
          ]
        };
        this.myEcharts.setOption(option);
      }
    });
  }
};
</script>

<style lang="less">
.chart {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .circle {
      border: 3px solid red;
      border-radius: 50%;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    .txt {
      text-align: center;
    }
  }
  .echarts {
    height: 400px;
  }
}
</style>
~~~



## vuex之mutation

>修改state的值都是使用mutation来修改

在store里面定义一个mutation方法

```
mutations:{
方法名(state(固定参数，会取到state的值),参数2（你调用该方法需要传递的参数）){
state.需要修改的值=值
}
}
```

调用该mutation方法

- 注意：这里面调用mutation方法时，要加上引号

this.$store.commit("方法名"，参数)

## 项目打包

> 代码写完了，一个命令即可实现打包，更为高级的优化需要学习了`webpack`才好展开哈

1. 今天记住一个命令即可

   1. 开发环境运行  npm run serve  
   2. 打包是走的生产环境  打包出来了，  npm run build

2. `npm run build`   

3. 打包之后开发环境的环境变量就失效了

4. 创建一个 生产环境的变量
   1. `.env.production`
   2. 配置地址

5. 打包前还有个地址需要处理，创建一个`vue.config.js`文件，加入如下代码

   ~~~js
   module.exports = {
       publicPath: './'
   }
   ~~~

   

6. `npm run build`自动读取 把代码中的所有`process.env.VUE_APP_URL`

7. 打包完以后，会多一个`dist`文件夹

8. 代码就在里面

9. `/js`文件夹下面的.map文件可以删除

## 项目打包01 - 生产环境地址设置

> 通过另外一个环境变量来配置生产环境的地址`.env.production`,打包的时候会自动读取这里面的值

1. 在线接口地址: http://123.57.150.216:8567



## 项目打包02 - 项目运行

> 项目的运行需要在服务器环境下，本地测试的话可以通过vsCode的`liver server`插件来实现

[传送门](https://www.cnblogs.com/shihaiming/p/10984394.html)

1. 正常打包完毕之后，是给后端，运维去部署
2. 自己通过vscode的 liver server插件运行
3. 必须通过服务器
4. 可以通过自己配置允许跨域的服务器来解决这个问题



## 项目开发流程

团队（10多人左右·）：

项目经理：也就是该团队老大，一般只有一个

产品经理：需求的，方案往往就是他提供的

前端架构 或者前端负责人   ：框架，难点 ，分配前端 任务

后端 架构 或者负责人

前端 开发，后端 开发

运维：项目上线，服务器等东西处理

测试：找bug之类

ui美工

外面使用量最大的是敏捷开发：将开发人员很友好的管理起来让他们快速做事

产品经理（需求出来了），他是分阶段一次给你们一点

前端负责人 拆解成多个小块  登陆模块（a,b），题库模块(c,d)，用户模块(e,f)。。。

你们还需要在上面把工作分得更细，

123456789个点要时间往往要和前端 负责人协商好具体时间

1：4小时    2：6小时   

把这些信息录入到网站里面去1  4小时   2：做xxx   6小时

开始做事了：点1开始 ，它就开始计时了，你要按时的完成

往往完成时间没那么完美，就是加加班搞定

每天早上会开一个晨会：每个人都要说一下：

昨天做了什么，今天准备做什么，有没有难点 ，能不能按时完成之类的

项目往往一个阶段后会开一个总结 会议：这段时间做这个项目出现了什么问题，有什么做得好的

做完了你得给测试测   做完了登陆模块---测试

简单的自己百度之类的，

搞不定的快点问人，认为小问题的话问一下黑马的老师或者小黑汪老师

大问题，问前端 负责人

最怕就是到时间问你做完没有，你说没开始，碰到 bug了

注意点：需求都不明确，在那里狂写代码





