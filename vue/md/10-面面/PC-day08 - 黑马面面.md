# day8 - 黑马面面

## 反馈

1.  今天从props就开始有点懵,好方 
    1.  props没熟悉  
    2.  对象的深度克隆 更加不熟悉
2.  明天又是一场没有硝烟的战争 




## 回顾

1. props与emit

   1. 父传子数据

      1. 在子组件标签上定义一个属性      属性名=“值”

      2. 在子组件中接收该值

         1. 最简单的接收   props:["属性名"]

         2. 定义类型   props:{  属性名：类型（Object,String,Array,null,undefined,function,Number）}

         3. 定义类型与默认值 

            ~~~
            props:{
            属性名:{
            type:"类型",
            default:"默认值"
            }
            }
            ~~~

   2. 子调用父方法

      1. 在子组件上面绑定一方法

         1. <子组件 @子组件方法名="父组件方法名">
         2. <button  @click="父组件方法名">

      2. 在子组件中触发该方法

         this.$emit("子组件方法名")





## 企业模块(business) - 分支操作

> 学科模块做完了，分支来切换一波

步骤：

1. 切换到 主分支
2. 合并学科分支到主分支
3. 删除学科分支
4. 创建`business`分支

~~~
git add .
git commit -m"学科模块完成"
git push
git checkout  master
git merge subject
git push
git branch business
git checkout business
~~~





## 企业模块 - 头部布局

> 和 学科模块 类似的逻辑 

 

```vue
<template>
  <div class="business">
    <el-card class="header">
      <el-form :inline="true" class="form" :model="form">
        <el-form-item label="企业编号">
          <el-input v-model="form.eid" class="inputW"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="form.name" class="inputW"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="form.username" class="inputW"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="inputW" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="不启用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        username: "", //创建者
        status: "" //状态
      }
    };
  }
};
</script>
<style lang="less">
.business {
  .header {
    height: 100%;
    .form {
      .inputW {
        width: 150px;
      }
    }
  }
}
</style>
```



## 企业模块 - 接口抽取

> 将接口抽取一下

步骤:

1. 在api目录创建`/api/business.js`
2. 导入axios副本
3. 定义相应接口调用方法
4. 暴露出去 

```javascript
import instance from '@/utils/request.js'
function getBusinessData(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params
    })
}
export { getBusinessData }
```

## 企业模块-初始数据获取

> 进入企业模块下面就有列表，数据怎么来呢？

进入页面接口调用

- 导入`getBusinessData`接口   import {getBusinessData} from "@/api/business.js"

- 进入页面调用获取数据,在created调用该接口

  - 由于还没实现数据处理，先传一个空对象到接口（接口没有哪项数据是必填）

  - ~~~js
    import { getBusinessData } from "@/api/business.js";
    export default {
      data() {
        return {
            tableList:[],  //列表数据
          form: {
            eid: "", //企业编号
            name: "", //企业名称
            username: "", //创建者
            status: "" //状态
          }
        };
      },
      created() {
        getBusinessData({}).then(res => {
            this.tableList = res.data.items;
          window.console.log("获取企业列表数据", res);
        });
      }
    };
    ~~~

## 企业模块-根据获得数据完成table渲染

>根据接口返回参数绑定相应table数据

~~~html
  <!-- table布局 -->
    <el-card>
        //tableList为接口获取的列表数据
      <el-table :data="tableList">
        <el-table-column label="序号">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="企业编号" prop="eid"></el-table-column>
        <el-table-column label="企业名称" prop="name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button>编辑</el-button>
            <el-button>{{scope.row.status==1?'启用':'禁用'}}</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
~~~

## 企业模块-加入分页基本处理

1. 加入分页组件的布局

   1. ~~~html
            <!-- 加入分页html部分 -->
            <el-pagination
              v-if="pagination.total>0"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="[1, 20, 30, 40]"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total"
            ></el-pagination>
         <!-- data部分 -->
            pagination: {
              currentPage: 1, //当前页
              pageSize: 1, //每页条数
              total: 2 //总条数
            }
      <!-- 加入分页js部分 -->
        methods: {
          handleSizeChange(size) {
            //每页条数改变时回调
      this.pagination.pageSize = size;
          },
          handleCurrentChange(page) {
            //当前页码改变时的回调
      this.pagination.currentPage = page;
          }
        }
      ~~~

   

## 企业模块 - 搜索+分页点击处理

> 点击搜索按钮和分页相应按钮点击时，对数据进行筛选

步骤：

1. 为企业顶部的筛选按钮绑定点击事件

   ~~~html
   <el-button type="primary" @click="search">搜索</el-button>
   ~~~

   搜索事件处理

   1. 将页面改为第一页
   2. 调用接口，把筛选的数据传递到服务器

2. 分页功能处理，当改变页面与改变每页条数时都需要调用接口获取数据

   注意：由于进入页面时的接口调用与搜索的调用基本代码一样，可以整合到一个方法里

   ~~~js
   import { getBusinessData } from "@/api/business.js";
   export default {
     data() {
       return {
         form: {
           eid: "", //企业编号
           name: "", //企业名称
           username: "", //创建者
           status: "" //状态
         },
         tableList: [],
         pagination: {
           currentPage: 1, //当前页
           pageSize: 1, //每页条数
           total: 2 //总条数
         }
       };
     },
     methods: {
       handleSizeChange(size) {
         //每页条数改变时回调
         this.pagination.pageSize = size;
         // 调用接口
         this.getData();
       },
       handleCurrentChange(page) {
         //当前页码改变时的回调
         this.pagination.currentPage = page;
         // 调用接口
         this.getData();
       },
       search() {
         // 改变页面
         this.pagination.currentPage = 1;
         // 调用接口
         this.getData();
       },
       getData() {
         let _params = {
           name: this.form.name, //企业名称
           page: this.pagination.currentPage, //页码
           limit: this.pagination.pageSize, //每页条数
           eid: this.form.eid, //企业编号
           username: this.form.username, //创建者
           status: this.form.status //状态
         };
         getBusinessData(_params).then(res => {
             this.tableList = res.data.items;
             this.pagination.total = res.data.pagination.total;   
           window.console.log("获取企业列表数据", res);
         });
       }
     },
     created() {
       this.getData();
     }
   };
   ~~~

## 企业模块 -table序号优化

>table序号需要结合页面算出它的最终位置

真实序号=每页条数*（当前页码-1）+当前数据所在下标+1

~~~html
        <el-table-column label="序号">
          <template
            slot-scope="scope"
          >{{pagination.pageSize*(pagination.currentPage-1)+scope.$index+1}}</template>
        </el-table-column>
~~~

## 企业模块 - 清除筛选

> 点击清除按钮，清除筛选状态，重新获取数据

步骤:

1. 为清除搜索按钮绑定点击事件   @click="reset"
2. 清空表单
3. 返回第一页
4. 重新调用接口

~~~js
   // 清空
    reset() {
      this.form = {
        eid: "", //企业编号
        name: "", //企业名称
        username: "", //创建者s
        status: "" //状态
      };
      // 执行搜索  因为搜索里已有相应页面改变为第一页与接口重新调用
      this.search();
    }
~~~

## 企业模块 -数据新增布局处理

>抽离企业模块数据新增组件

步骤

- 定义企业新增组件 

  - 使用el-dailog

- 在企业模块中引入该组件

  - 导入，

    ~~~
    import  addBusiness  from "./addBusiness.vue";
    ~~~

    

  - 注册，

    ~~~
      components: {    addBusiness  }
    ~~~

    

  - 使用

    ~~~
    <addBusiness></addBusiness>
    ~~~

    

- 点击新增按钮完成新增组件显示

  - 在新增组件上绑定ref

    ~~~
    <addBusiness ref="addBusiness"></addBusiness>
    ~~~

    

  - 通过ref改变el-dailog参数控制 

    - 新增按钮绑定事件

      ~~~html
   <el-button type="primary" @click="add">+新增企业</el-button>
      ~~~
    
    - 新增方法处理
    
      ~~~js
          add() {
            this.$refs.addBusiness.dialogVisible = true;
          }
      ~~~
    
      

- 新增组件按设计完成基本布局
  - el-dailog
  - el-form
- 对照接口传参数据完成相应数据绑定
  
  - 对照接口返回相应字段名v-model
- 表单数据验证的定义
  - 在相应的el-form-item上绑定相应的prop
  - 在el-form上绑定验证规则   :rule="rule"
  - 定义每个字段的相应规则
- 点击确定时完成表单验证
  - 确定按钮绑定点击事件
  - 定义相应表单的ref   ref=值
  - 执行表单验证方法  this.$refs.valitate(result=>{  //验证结果  })

~~~vue

<template>
  <el-dialog class="addBusiness" :visible.sync="dialogVisible" width="600px">
    <!-- 重写标题部分 -->
    <h1 slot="title" class="title">企业新增</h1>
    <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <!-- 重写底部按钮部分 -->
    <div slot="footer" class="btnCenter">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //备注
      },
      rules: {
        eid: [{ required: true, message: "企业编号必填哦！", trigger: true }],
        name: [{ required: true, message: "企业名称必填哦！", trigger: true }],
        short_name: [
          { required: true, message: "企业简称必填哦！", trigger: true }
        ],
        intro: [{ required: true, message: "企业简介必填哦！", trigger: true }]
      }
    };
  },
  methods: {
    //   确定按钮点击
    sure() {
      this.$refs.form.validate(result => {
        window.console.log(result);
      });
    }
  }
};
</script>
<style lang="less">
.addBusiness {
  .title {
    text-align: center;
    color: #fff;
    height: 53px;
    background-color: rgb(14, 156, 250);
    font-size: 18px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-icon-close.el-icon {
    color: #fff;
  }
  .btnCenter {
    text-align: center;
  }
}
</style>
~~~

## 企业模块-数据新增加入接口

>新增模块接口调用完善

- 接口定义，在企业模块中定义一个新增api

  - ~~~js
    function addBusinessData(data) {
        return instance({
            url: "/enterprise/add",
            method: "post",
            data
        })
    }
    export { getBusinessData, addBusinessData }
    ~~~

    

- 在新增组件中引入 定义的新增方法

  - ~~~
    import { addBusinessData } from "@/api/business.js";
    ~~~

  - 

- 新增组件中点击确定按钮在表单验证为truje时调用接口获取数据

  - 如果新增成功，提示新增成功，关闭弹窗，同时重新调用企业模块搜索方法

  ~~~js
      //   确定按钮点击
      sure() {
        this.$refs.form.validate(result => {
          window.console.log(result);
          if (result) {
            addBusinessData(this.form).then(res => {
              if (res.code == 200) {
                // 新增成功了提示一下
                this.$message.success("新增成功");
                //   关闭弹窗
                this.dialogVisible = false;
                //   调用父级刷新表单数据
                this.$parent.search();
              }
              window.console.log("企业新增返回结果:", res);
            });
          }
        });
      }
  ~~~

  



## 企业模块 - 删除数据

> 点击提示用户并删除数据

步骤：

1. 定义删除接口api方法

   1. ~~~js
      // 删除
      function delBusinessData(data) {
          return instance({
              url: "/enterprise/remove",
              method: "post",
              data
          })
      }
      export { getBusinessData, addBusinessData, delBusinessData }
      ~~~

2. 导入删除api方法

   ~~~js
   import { getBusinessData,delBusinessData } from "@/api/business.js";
   ~~~

   

3. 点击删除，弹出对话框

   1. 在删除按钮上绑定删除事件

      ~~~html
           <template slot-scope="scope">
                  <el-button>编辑</el-button>
                  <el-button>{{scope.row.status==1?'启用':'禁用'}}</el-button>
                  <el-button @click="del(scope.row.id)">删除</el-button>
                </template>
      ~~~

      

   2. 取消：什么都不干

   3. 确定：调用删除接口，删除数据
      1. 成功：提示用户，重新获取数据
      2. 失败：提示用户

~~~js
    // 删除按钮点击
    del(id) {
      this.$confirm("你确定要删除这条数据吗？", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delBusinessData({ id: id }).then(res => {    
              this.$message.success("删除成功！");
              this.search();         
          });
        })
        .catch(() => {});
    }
~~~



## 企业模块 - 状态修改

> 点击修改状态

步骤：

1. 在相应api定义状态修改方法

   1. ~~~js
      // 状态修改
      function setBusinessStatus(data) {
          return instance({
              url: "/enterprise/status",
              method: "post",
              data
          })
      }
      ~~~
      

2. 为状态修改按钮绑定点击事件

   1. ~~~html
                 <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                      <el-button>编辑</el-button>
                      <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
                      <el-button @click="del(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
      ~~~

      

3. 导入相应修改状态接口

   ~~~
   //导入修改状态api方法
   import { getBusinessData, delBusinessData, setBusinessStatus } from "@/api/business.js";
   ~~~

   

4. 调用接口，提交数据，修改成功之后，重新获取数据即可

     ~~~js
    //修改状态
    setStatus(id) {
      setBusinessStatus({ id: id }).then(res => {
          this.$message.success("状态修改成功！");
          this.search();
      });
    }
    ~~~







## 企业模块 - 编辑功能-进入

> 编辑框与新增框类似，所以一般这种类似的框都是做在同一个组件里，利于以后维护

步骤:

1. 用prop传参二个参数

   1. 进行区别新增与编辑`mode`，（mode用于区别是新增还是编辑）

   2. 需要编辑的数据  `editData`（`editData`为表单用于编辑的所有数据）

   3. 在新增组件使用标签里绑定相应数据作为需要传递给新增组件的数据

      ~~~js
        //在相应标签绑定mode属性=”值“
        <addBusiness ref="addBusiness" :mode="mode" :editData="editData"></addBusiness>
        //该值在data里定义一个默认值为add
        data() {
          return {
          //定义mode默认值为add
            mode: "add",
          //存储需要编辑的数据传递给新增组件
            editData: {},
            form: {...},
            tableList: [],
            pagination: {...}
          };
        },
      ~~~

2. 在新增组件中接收props传递过来的值

   ~~~js
     props: ["mode", "editData"],
   ~~~

3. 根据props传递过来的值的不同进行不同处理

   1. 用watch监听不管哪一项改变数据都会变化 的eid 进行不同处理

      当eid变化后，就改变内部表单数据

      ~~~js
          mode(newVal) {
            if (newVal == "add") {
              this.form = {
                eid: "", //企业编号
                name: "", //企业名称
                short_name: "", //企业简称
                intro: "", //企业简介
                remark: "" //备注
              };
            } else {
              this.form = JSON.parse(JSON.stringify(this.editData));
            }
          }
      ~~~

4. 对新增模块做相应的处理，新增 时需要修改mode为add,还有editData要置空数据

   ~~~js
       // 新增按钮点击
       add() {
         // 改变模式为新增
         this.mode = "add";
         this.$refs.addBusiness.dialogVisible = true;
       },
   ~~~
   
5. 点击编辑按钮，修改mode为'edit'，同时传递当前编辑行的所有数据

   1. 在编辑按钮上绑定编辑事件，同时传递当前点击行所有数据

      ~~~html
      <el-button @click="edit(scope.row)">编辑</el-button>
      ~~~

   2. 定义相应edit方法，修改mode与editData

      1. 注意这里的mode后面要加一个时间戳是为了点击不同的编辑时让新增 组件的watch都能执行做出相应处理

   ~~~js
       edit(row) {
         // 改变模式为编辑
         this.mode = "edit_" + Date.now();
         //改变传递过去的表单数据为当前行数据
         this.editData = row;
         this.$refs.addBusiness.dialogVisible = true;
       },
   ~~~

   

## 企业模块 - 编辑功能-保存

> 新增组件里面有二种状态下的保存是调用不一样的接口，要做出不同处理

1. 在新增组件保存时，根据父组件传递过来的mode区别调用编辑还是新增接口

   1. 如果mode='add',保存时调用新增接口

      ~~~js
          //   确定按钮点击
          sure() {
            this.$refs.form.validate(result => {
              window.console.log(result);
              if (result) {
                if (this.mode == "add") {
                  addBusinessData(this.form).then(() => {
      
                      // 新增成功了提示一下
                      this.$message.success("新增成功");
                      //   关闭弹窗
                      this.dialogVisible = false;
                      //   调用父级刷新表单数据
                      this.$parent.search();
      
                  });
                } else {
                  //调用保存编辑接口
                  
                }
              }
            });
          }
      ~~~
      

2. 当mode不为add时，执行编辑处理
   
   1. 定义编辑api方法
   
      1. 在business.js中定义编辑api方法
   
         ~~~js
            // 编辑数据
            function editBusinessData(data) {
                return instance({
                    url: "/enterprise/edit",
                    method: "post",
                    data
                })
            }
            
         ~~~
   
   2. 在新增组件中导入编辑api方法
   
      ~~~
         import { addBusinessData,editBusinessData } from "@/api/business.js";
      ~~~
   
   3. 调用编辑api
   
      ~~~js
             //   确定按钮点击
             sure() {
               this.$refs.form.validate(result => {
                 window.console.log(result);
                 if (result) {
                   if (this.mode == "add") {
                     addBusinessData(this.form).then(() => {
                       // 新增成功了提示一下
                       this.$message.success("新增成功");
                       //   关闭弹窗
                       this.dialogVisible = false;
                       //   调用父级刷新表单数据
                       this.$parent.search();
                     });
                   } else {
                     editBusinessData(this.form).then(() => {
                       // 新增成功了提示一下
                       this.$message.success("编辑成功");
                       //   关闭弹窗
                       this.dialogVisible = false;
                       //   调用父级刷新表单数据
                       this.$parent.search();
                     });
                   }
                 }
               });
             }
      ~~~
      
         

## 补充：props与深度克隆

引用类型：Object,Array,function       

存储就是一个引用值

基本类型：Number,String,null,undefined，Boolean

直接存储到栈里面

数据类型存储问题

var num=123