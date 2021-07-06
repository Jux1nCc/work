# day07 - 黑马面面

## 反馈

1.  想告诉飞飞老师的是，不是我们有问题不问你，是有时候我们真的没啥问题，你讲的很细，完全不给我们犯错的机会啊，我也想给你找点问题，你让我实力不允许啊，哈哈哈(ಡωಡ)hiahiahia
2.  对element分页组件的方法的用途不是很清楚

## 回顾

1. 路由元信息

   1. meta:{ 可以自定义一些东西，比如标题之类的}

   2. ~~~
      导航守卫
      进入前守卫 
      router.beforeEach((to,from,next)=>{
      to:去哪里在的路由信息
      from :从哪来的路由信息
      next:
          next()正常通过 ，正常通过后就不会触 发beforeEach再次调用
          next("path")跳转到相应的路径，这里还是会触发新的beforeEach调用
      })
      进入后守卫
      router.afterEach((to,from)=>{
      to:当前已在的路由,
      from :从哪个路由过来的
      document.title=to.meta.title
      })
      
      
      ~~~

2. vuex  共享数据管理

   1. ~~~
      它是通过vuex插件
      1：安装  npm i vuex
      2:导入   import Vuex from 'vuex'
      3:注册   Vue.use(Vuex)
      4:实例化  const store=new Vuex.Store({
          state:{
          //这里就是放共享数据的
          xxx:123
          }
         })
      5：注入到vue实例
        new Vue({
        store
        })
        
        this.$store.state.xxx=123
      ~~~

3. 卡片

   1. el-card

4. select

   1. ~~~~
      el-select   v-model
          el-option   值  value    显示的文字  label
      ~~~~

5. el-form   :inline="true"

6. table

   1. ~~~
      el-table  :data="需要绑定的数据"  注意点，绑定的数据初始值也要是数组
         el-table-column  栏   prop="table绑定栏的数据字段名"  label"标题" width  设置宽度
         自定义栏
         1：在相应自定义栏里加入一个template标签
         2：在template加一个属性 slot-scope="局部变量名"  读取该行所有数据   
      ~~~

7. ~~~
        <el-pagination
        //页容量的点击改变  它后面的回调函数有一个参数，该参数就是当前选中的页容量
             @size-change="handleSizeChange"
          //改变页面时回调函数    它后面的回调函数有一个参数，该参数就是当前页
             @current-change="handleCurrentChange"
             current-page也就是默认页码
             :current-page="pagination.currentPage"
             //配制相应的页容量选项
             :page-sizes="[10, 20, 30, 40]"
             page-size   //默认的页容量大小
             :page-size="pagination.pageSize"
             layout配制相应功能
             layout="total, sizes, prev, pager, next, jumper"
             //总数
             :total="pagination.total"
           ></el-pagination>
   ~~~

   



## 学科模块 - 数据分页

> 数据越来越多了之后，使用分页器进行分页数据的处理

步骤:

1. 进入页面中之后，数据获取完毕之后，把总数设置到页面上
   
   1. 进入页面的搜索传入相应的页码信息,同时，获取到的数据总数与分页组件中的total绑定
   
      ~~~
        created() {
          let _pageInfo = {
            page: this.pagination.currentPage,
            limit: this.pagination.pageSize
          };
          getSubjectData(_pageInfo).then(res => {
            this.tableData = res.data.items;
            this.pagination.total = res.data.pagination.total;
            window.console.log(res);
          });
        },
      ~~~
   
      
   
      
   
2. 切换页码时，数据要同步，同时要执行搜索功能
   
   1. 先将created中的搜索调用单独封装成一个方法
   
      ~~~js
        created() {
          this.getData();
        },
        methods: {
          // 获取列表数据
          getData() {
            let _pageInfo = {
              page: this.pagination.currentPage,
              limit: this.pagination.pageSize
            };
            getSubjectData(_pageInfo).then(res => {
              this.tableData = res.data.items;
              this.pagination.total = res.data.pagination.total;
              window.console.log(res);
            });
          },
      ~~~
   
      
   
   2. 页面切换时做出页面改变，同时调用搜索接口
   
   ~~~js
     handleCurrentChange(page) {
      //当前页码改变时的回调
      this.pagination.currentPage = page;
         this.getData();
      window.console.log("当前页面：", page);
     }
   ~~~
   
   
   
3. 切换页容量时
   2. 页码回到1
   3. 数据同步

   ~~~js
       handleSizeChange(size) {
         //每页条数改变时回调
         this.pagination.pageSize = size;
         this.pagination.currentPage = 1;
           this.getData();
         window.console.log("每页条数:", size);
       },
   ~~~

   

## 学科模块 - 搜索功能

> 数据越来越多了，想要快速获取到，可以使用搜索功能

步骤：

1. 绑定搜索按钮事件

   ~~~html
      <el-form-item>
             <el-button type="primary" @click="search">搜索</el-button>
             <el-button>清除</el-button>
             <el-button type="primary">+新增学科</el-button>
           </el-form-item>
   ~~~

   

2. 实现搜索事件

   先调整getData方法，将表单数据 整合进去

   ~~~js
       // 获取列表数据
       getData() {
         let _pageInfo = {
           page: this.pagination.currentPage,
           limit: this.pagination.pageSize,
           ...this.form
         };
         window.console.log("页码信息:", _pageInfo);
         getSubjectData(_pageInfo).then(res => {
           this.tableData = res.data.items;
           this.pagination.total = res.data.pagination.total;
           window.console.log(res);
         });
       },
   ~~~

   搜索事件中将页码改成第一页，同时调用数据

   ~~~
       // 搜索事件
       search() {
         this.pagination.currentPage = 1;
         this.getData();
       }
   ~~~

   

## 学科模块 - 清除筛选

> 如果不想要搜索了，可以点击清除，把筛选的条件删除掉，数据要重新获取哦

步骤：

1. 为清空按钮绑定点击事件
   
   ~~~html
      <el-form-item>
             <el-button type="primary" @click="search">搜索</el-button>
             <el-button @click="resetClick">清除</el-button>
             <el-button type="primary">+新增学科</el-button>
           </el-form-item>
   ~~~
   
   
   
   1. 清空表单
   2. 返回第一页
   3. 重新获取数据
   
   ~~~js
       // 清空
       resetClick() {
         // 还原表单
         this.form = {
           name: "", //学科名字
           rid: "", //学科编号
           username: "", //创建者
           status: "" //状态
         };
         // 返回第一页，执行搜索
         this.search();
       }
   ~~~
   
   

## 学科模块 - 状态切换

> 点击切换学科的状态，显示的按钮和状态是相反的

步骤:



1. 先将按钮文字进行处理

   ~~~html
   <el-button @click="setStatus(scope)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
   ~~~
   
   
   
2. 为 启用，禁用按钮绑定点击事件

   ~~~html
        <el-table-column label="操作" width="300px">
             <template slot-scope="scope">
               <el-button>编辑</el-button>
               <el-button @click="setStatus(scope.row.id)">{{scope.row.status==1?'禁用':"启用"}}</el-button>
               <el-button>删除</el-button>
             </template>
           </el-table-column>
   ~~~

   

3. 定义状态调用api方法

   ~~~js
   import instance from '@/utils/request.js'
   function getSubjectData(params) {
       return instance({
           url: "/subject/list",
           method: "get",
           params
       })
   }
   function setSubjectStatus(data) {
       return instance({
           url: "/subject/status",
           method: "post",
           data
       })
   }
   
   export { getSubjectData, setSubjectStatus }
   ~~~

   

4. 调用接口

   1. 导入接口

      ~~~js
      import { getSubjectData, setSubjectStatus } from "@/api/subject.js";
      ~~~

      

5. 调用接口
   1. 成功，重新获取数据
   2. 失败，提示用户

~~~js
    // 启用禁用切换
    setStatus(id) {
      setSubjectStatus({ id: id }).then(() => {
        this.$message.success("状态设置成功！");
        this.search();
      });
    }
~~~



## 学科模块-序号显示优化

>让序号能真正代码是哪一条数据

来个数学题

已知道页码（当前页），与每页条数，与当前数据序号（从0开始），算出当前数据真实序号（从1开始）？

真实序号=（当前页-1）*每页条数+当前序号（从0开始）+1

~~~html
 <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
~~~



## 学科模块 - 删除学科

> 点击删除学科，需要用户的确认哦,如果确定了，那么删除服务器的就好了，本地记得也要重新获取哦

步骤：

1. 删除按钮绑定事件

   ~~~html
           <el-table-column label="操作" width="300px">
             <template slot-scope="scope">
               <el-button>编辑</el-button>
               <el-button @click="statusClick(scope.row.id)">{{scope.row.status==1?'禁用':"启用"}}</el-button>
               <el-button @click="del(scope.row.id)">删除</el-button>
             </template>
           </el-table-column>
   ~~~

2. 定义删除接口api方法

   ~~~js
   function delSubjectData(data) {
       return instance({
           url: "/subject/remove",
           method: "post",
           data
       })
   }
   ~~~

   

3. 弹出对话框 确认

   1. 确定
      1. 调用接口
         1. 导入接口
         
            ~~~js
            import { getSubjectData, setSubjectStatus,delSubjectData } from "@/api/subject.js";
            ~~~
         
            
         
         2. 传递参数
      2. .then
         1. 删除成功
            1. 提示用户
            2. 重新获取数据
         2. 失败：
            1. 提示用户
   2. 取消
      
      1. 关闭对话框

~~~js
    // 删除按钮点击
    del(id) {
      this.$confirm("你确定要删除该条数据吗", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'error'
        tyle: "warning"
        // type: "success"
      }).then(() => {
        delSubjectData({ id: id }).then(() => {
            //提示删除成功
          this.$message.success("删除成功！");
            //刷新表格数据
          this.search();
        });
      });
    }
~~~



## 学科模块 - 新增框基本功能整合

>先创建一个最基本的弹窗整合进来

1. 创建`/index/subject/components/subjectAdd.vue`

2. 在`subjectAdd`来一个最基本的`el-dialog`

   ~~~vue
   <template>
     <el-dialog class="subjectAdd" width="600px" :visible.sync="dialogFormVisible">
       <div slot="title" class="title">新增学科</div>
     </el-dialog>
   </template>
   
   <script>
   export default {
     data() {
       return {
         dialogFormVisible: false
       };
     }
   };
   </script>
   
   <style lang="less">
   .subjectAdd {
     .title {
       height: 53px;
       text-align: center;
     }
   }
   </style>
   ~~~

   

3. 在学科模块整合进去

   1. 导入，注册，当标签使用
      1. 导入   import subjectAdd from "./subjectAdd.vue";
      2. 注册   components: {  subjectAdd }
      3. 使用   <subjectAdd ref="subjectAdd"></subjectAdd>

4. 点击新增按钮，打开新增弹窗

   1. 在新增按钮绑定事件

      ~~~html
         <el-form-item>
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button @click="resetClick">清除</el-button>
                <el-button type="primary" @click="add">+新增学科</el-button>
              </el-form-item>
      ~~~

   2. ~~~js
          // 新增
          add() {
            this.$refs.subjectAdd.dialogFormVisible = true;
          }
      ~~~



## 学科模块-新增框布局

>完成新增框基本布局与表单验证，关闭等基本功能

~~~vue
<template>
  <el-dialog class="subjectAdd" width="600px" :visible.sync="dialogFormVisible">
    <div slot="title" class="title">新增学科</div>
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
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      },
      rules: {
        rid: [
          { required: true, message: "请输入学科编号！", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入学科名称！", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
      }
    }
  },
  methods: {
    submitClick() {
      this.$refs.form.submitClick();
    }
  }
};
</script>

<style lang="less">
.subjectAdd {
  .title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: #fff;
    background-color: rgb(16, 158, 249);
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close:hover {
    color: red;
  }
  .footer {
    text-align: center;
  }
}
</style>
~~~



## 学科模块 - 数据新增

> 有了新增框，就可以来实现数据的新增了，点击提交，在校验没有问题之后，就可以提交到服务器了哈



步骤:

1. 定义新增接口api方法

   ~~~js
   function addSubjectData(data) {
       return instance({
           url: "/subject/add",
           method: "post",
           data
       })
   }
   ~~~

   

2. 导入新增api方法

   ~~~js
   import { addSubjectData } from "@/api/subject.js";
   ~~~

   

3. 为新增框的确认按钮绑定点击事件
   1. 表单校验
      1. 通过：调用接口
         1. 成功：
            1. 关闭对话框
            3. 本地重新获取数据
         2. 失败：提示用户
      2. 不通关：提示用户

~~~js
    submitClick() {
      this.$refs.form.validate(result => {
        if (result) {
          addSubjectData(this.form).then(() => {
            this.$message.success("新增成功");
            this.dialogFormVisible = false;
            this.$parent.search();
          });
        }
      });
    }
~~~



## 组件传值之props与emit

> 父组件通过 props 向下传递数据给子组件；子组件通过 emit 给父组件发送消息。 

- 父组件传值子组件
  - 在子组件标签上定义一个属性
    - <子组件 :`自定义属性名`=“值”></子组件>
  - 在子组件中接收数据
    - 在props中接收，props放到
      - props:['`自定义属性名`']
    - 使用传递的数据
      - this.`自定义属性名`
  - 注意点：props传递过来的数据是单向数据流，不可修改。
- 子组件调用父组件方法
  - 在子组件上定义一个方法
    - <子组件 @`自定义方法名`=“`父组件方法`”></子组件>
  - 在子组件里调用该方法
    - this.$emit("`自定义方法名`",参数)，这样就会触发`父组件方法`





## 学科模块 - 修改01 - 进入修改

> 编辑框与新增框类似，所以一般这种类似的框都是做在同一个组件里，利于以后维护

步骤:

1. 用prop传参进行区别新增与编辑`mode`，

   ~~~html
   <subjectAdd ref="subjectAdd" :mode="mode" ></subjectAdd>
   //在data中定义mode默认值为"add"
   ~~~

   

2. 同时通过props传递需子组件要编辑的信息

   ~~~html
       <subjectAdd ref="subjectAdd" :mode="mode" :formData="formData"></subjectAdd>
       //在data中定义formData默认值为""
   ~~~

   

3. 根据props传递过来的值的不同进行不同处理

   1. 在新增组件中接收传递过来的数据

      ~~~js
       props: ["mode", "formData"],
      ~~~

      

   2. 用watch监听mode变化 进行不同处理

      当mode变化后，就改变内部表单数据

      ~~~js
          mode(newVal) {
            if (newVal == "add") {
              this.form = {
                rid: "", //学科编号
                name: "", //学科名称
                short_name: "", //学科简称
                intro: "", //学科简介
                remark: "" //备注
              };
            } else {
              this.form = JSON.parse(JSON.stringify(this.formData));
            }
          }
      ~~~

      

4. 新增按钮与编辑按钮点击 时，改变需要传递过去的值

   1. 新增按钮
      
      1. 新增时修改mode为add
      
         ~~~js
             // 新增
             add() {
               this.mode = "add";
               this.$refs.subjectAdd.dialogFormVisible = true;
             },
         ~~~
      
   2. 编辑按钮
      1. 编辑按钮事件绑定
         
         ~~~html
             <el-table-column label="操作" width="300px">
                   <template slot-scope="scope">
                     <el-button @click="edit(scope.row)">编辑</el-button>
                     <el-button @click="statusClick(scope.row.id)">{{scope.row.status==1?'禁用':"启用"}}</el-button>
                     <el-button @click="del(scope.row.id)">删除</el-button>
                   </template>
                 </el-table-column>
         ~~~
         
         
         
      2.   编辑事件
         
         ~~~js
             // 编辑
             edit(scope) {
               this.mode = "edit_" + Date.now();
               this.formData = scope;
               this.$refs.subjectAdd.dialogFormVisible = true;
             }
         ~~~
         
         
         
            



## 学科模块 - 修改02 -保存修改

> 当数据的修改没有问题之后，用户点击保存，我们就需要保存这次更改了哦

保存时为二种情况

- mode为add时，调用新增接口
- mode为edit时调用编辑接口
  - 先在相应api中定义编辑的api方法
  
    ~~~js
    function editSubjectData(data) {
        return instance({
            url: "/subject/edit",
            method: "post",
            data
        })
    }
    ~~~
  
    
  
  - 在编辑弹框里导入相应编辑api方法
  
    ~~~js
    import { addSubjectData, editSubjectData } from "@/api/subject.js";
    ~~~
  
    
  
  - 调用相应api方法并传递相应表单值

       ~~~js
    submitClick() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode === "add") {
            addSubjectData(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$parent.search();
            });
          }
        }
      });
    }
    ~~~

