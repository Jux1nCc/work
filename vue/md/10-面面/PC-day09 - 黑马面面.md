# day9 - 黑马面面

## 反馈

1.	今天收获很大,老师辛苦了
1.	越来越有底了
1.	昨天最后一小时是真的懵，今天的最后一小时思路理解了70%
1.	今天课程主体是逻辑思维
   1.	学习快：1：记性好  相差不大 2：逻辑能力   相差很大，学过程序的  3学习态度占的最高
   1.	学得好，做东西快，没什么巧，多做多练，
   1.	身体自然反应：有一个自然反应
      1.	input   v-model
      1.	父子传值  
         1.	ref   2:props
      1.	组件套用组件
         1.	导入注册使用



## 回顾

1. props与emit
   1. 父传子数据
      1. 在子组件标签上定义一个属性   属性名="值"
      2. 在子组件内用props接收
         1. 不定义类型   props:['属性名']
         2. 限制 类型写法 props:{属性名:类型}
         3. 加入默认值写法  props:{属性名:{type:类型，default:默认值}}
         4. 注意点：基本数据类型props的值不能修改（Number,String,Boolean,undefined,null）
         5. 能修改的是引用类型的数据 ：Object,Array,Function
   2. 子调用父方法
      1. 在子组件标签上定义一个方法   @子组件方法名="父组件方法"
      2. 在子组件内触发父组件方法
         1. this.$emit("子组件方法名"，参数)
2. 在组件中套用其它组件
   1. 导入
   2. 注册 components:{名字}
   3. 当标签使用
3. ref
   1. 父组件调用子组件内的方法
      1. 在子组件身上定义一个ref   ref="值"
      2. 通过访问子组件this实现方法调用  父组件this.$refs.值===子组件this











## 用户模块 - 分支操作

> 企业模块做完了，分支来切换一波

步骤：

1. 切换到`master`分支
2. 合并`business`分支
3. 删除`business`分支
4. 创建并切换到`user`分支

~~~
git add .
git commit -m"企业模块完成"
git push
git checkout master
git merge business
git push
git branch user
git checkout user
~~~





## 用户模块 - 布局

> 和 企业模块 类似的逻辑 

步骤

复制粘贴

1. 复制企业模块所有文件到用户列表目录下
2. 修改business.vue文件名为  userList
3. 修改addBusiness.vue名字为 addUserList.vue
4. 在userList.vue内，全部 替换addBusiness为addUserList



## 用户模块-角色信息vuex处理

>角色信息在实际项目中是常出现维护的，最好是公用管理

1. 游戏：超级管理员（游戏数据都能修改） 管理员（有时候封你帐号）  你（游戏玩家）你只有玩游戏功能   角色 处理

2. 

3. 

4. 在vuex的state中定义相应的角色字段,定义规则后端会给到我们

   - ~~~js
             roleObj: {
                 1："超级管理员"
                 2: "管理员",
                 3: "老师",
                 4: "学生"
         },
     ~~~

5. 在用户模块结合vuex处理相应的select

   1. v-for循环对象   v-for="(value,key,index(从0开始)) in 对象"

   ~~~html
        <el-form-item label="角色">
             <!-- el-select
             el-select
                 el-option  label 我们看到的选项文本   value 我们选中该项后的值
             -->
             <el-select class="setWidth">
               <!-- v-for  
                数组  v-for="(item,index) in 数组" 
                对象  v-for="(value,key,index(序号，从0开始) in 对象)"
               -->
               <!-- vuex访问   this.$store.state.roleObj -->
               <el-option
                 v-for="(value,key,index) in $store.state.roleObj"
                 :key="index"
                 :value="key"
                 :label="value"
               ></el-option>
             </el-select>
   ~~~

   



## 用户模块 - 接口抽取

> 将接口抽取一下

步骤:

1. 创建`user.js`
2. 根据接口调整即可
3. 因为命名的规则是一样的，所以直接c+v`business.js`
4. 然后修改里面的名字与路径

```javascript
import instance from '@/utils/request.js'
function getUserData(params) {
    return instance({
        url: "/user/list",
        method: "get",
        params
    })
}
function addUserData(data) {
    return instance({
        url: "/user/add",
        method: "post",
        data
    })
}
function delUserData(data) {
    return instance({
        url: "/user/remove",
        method: "post",
        data
    })
}
function setUserStatus(data) {
    return instance({
        url: "/user/status",
        method: "post",
        data
    })
}
function editUserData(data) {
    return instance({
        url: "/user/edit",
        method: "post",
        data
    })
}
export { getUserData, addUserData, delUserData, setUserStatus, editUserData }
```



## 用户模块 - 初始数据获取

> 进入页面，获取数据

步骤:

1. created中调用列表接口
2. 获取数据并渲染
3. 注意字段的对应关系即可



## 用户模块 - 数据筛选

> 点击筛选按钮，对数据进行筛选

步骤:

1. 绑定对应的字段
2. 调用接口集合
3. 逻辑和之前的类似，只需要调整接口





## 用户模块 - 清除筛选

> 点击清除按钮，清除筛选状态，重新获取数据

步骤

1. 为筛选按钮绑定点击事件
2. 清除表单，然后重新调用接口
3. 记得返回第一页



## 用户模块 - 数据分页

> 将分页组件和数据联动起来

步骤

1. 这里的逻辑可以直接复用



## 用户模块 - 删除数据

> 点击提示用户并删除数据

1. 这里的逻辑可以直接复用，修改相应接口名即可



## 用户模块 - 状态修改

> 点击修改状态

步骤

1. 这里的逻辑可以直接复用，修改相应接口名即可

## 用户模块 - 列表处理

>对照设计与字段 名将列表数据显示正常

## 用户模块 - 数据新增

> 点击修改状态

步骤

1. 这里的逻辑和 企业的新增对话框复用
2. 修改接口，数据的字段，和表单的校验规则即可

## 用户模块 - 数据修改

> 点击进入编辑状态，然后保存修改

步骤

1. 这里的逻辑直接复用企业编辑对话框中的
2. 修改接口即可

`addUserList组件`

~~~vue
<template>
  <!-- 
el-dialog visible.sync  控制 该弹框的显示与隐藏    width
    slot="title/footer"
  -->
  <el-dialog class="addUserList" :visible.sync="dialogVisible" width="600px">
    <div slot="title" class="title">{{mode=='add'?'新增用户':'编辑用户'}}</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select class="setWidth" v-model="form.role_id">
          <el-option
            v-for="(value,key,index) in $store.state.roleObj"
            :key="index"
            :value="+key"
            :label="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select placeholder="请选择状态" v-model="form.status">
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addUserData, editUserData } from "@/api/user.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        // 自定义表单验证
        /*
        validator:(rule,value,callback)=>{
          rule:规则,
          value:当前 需要验证项的值 
          callback()  这样就是正常验证通过
          callback("错误信息") 表示 不验证通过，同时报出内面的错误信息
        }
        */
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入邮箱号！");
              }
            },
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请正确输入手机号！");
              }
            },
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      }
    };
  },
  methods: {
    submitClick() {
      //全局验证表单
      //1：在el-form上定义一个ref  2:this.$refs.值.validate(result=>{})
      this.$refs.form.validate(result => {
        window.console.log(result);
        if (result) {
          if (this.mode == "add") {
            //验证通过，调用接口  1导入接口，2调用
            addUserData(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogVisible = false;
              // 刷新企业列表
              this.$parent.search();
            });
          } else {
            // 调用编辑接口
            editUserData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogVisible = false;
              // 刷新企业列表
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
.addUserList {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: rgb(14, 156, 250);
    line-height: 53px;
  }
  .footer {
    text-align: center;
  }
}
</style>
~~~

`userList组件`

~~~vue
<template>
  <div class="userList">
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
        <el-form-item label="用户名称" prop="username">
          <el-input class="setWidth" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="setWidth" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <!-- el-select
          el-select
              el-option  label 我们看到的选项文本   value 我们选中该项后的值
          -->
          <el-select class="setWidth" v-model="form.role_id">
            <!-- v-for  
             数组  v-for="(item,index) in 数组" 
             对象  v-for="(value,key,index(序号，从0开始) in 对象)"
            -->
            <!-- vuex访问   this.$store.state.roleObj -->
            <el-option
              v-for="(value,key,index) in $store.state.roleObj"
              :key="index"
              :value="key"
              :label="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
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
      <el-table :data="tableData" :border="true">
        <el-table-column label="序号" width="50px">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
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
    <addUserList ref="addUserList" :mode="modeFather"></addUserList>
  </div>
</template>
<script>
import { getUserData, delUserData, setUserStatus } from "@/api/user.js";
// 导入，注册，使用  ctrl+d
import addUserList from "./addUserList.vue";
export default {
  components: {
    addUserList
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
        username: "", //昵称
        email: "", //邮箱
        role_id: "" //角色
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
      getUserData(_params).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
        window.console.log("用户列表：", res);
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
      this.$refs.addUserList.form = {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      };
      this.$refs.addUserList.dialogVisible = true;
    },
    //状态修改
    setStatus(id) {
      setUserStatus({ id: id }).then(() => {
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
        delUserData({ id }).then(() => {
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
      window.console.log("整行数据：", row);
      this.$refs.addUserList.form = JSON.parse(JSON.stringify(row));
      this.$refs.addUserList.dialogVisible = true;
      window.console.log(row);
    }
  }
};
</script>
<style lang="less">
.userList {
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
~~~



## 用户模块-表单清除验证通用处理

~~~js
  // 打开弹框时清空一下验证就OK了
  watch: {
    // 写出需要监听的值，转换成去this的字符串，它本质是一个function(newVal,oldVal){}
    dialogVisible(newVal) {
      if (newVal == true) {
        //  执行一次清空验证处理
        // 使用表单的clearValidate()
        // 注意点，第一次打开弹框时，form表单根本没渲染出来，我们是访问不了的，需要加一个延时处理
        //$nextTick
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
~~~





## 权限功能 - 状态判断

> 如果用户是禁用状态，那么不应该可以访问到后台页面哦,如何判断呢

分析:

1. 如果是禁用的状态，是无法访问内部页面的
2. 必须等待管理员审核通过你这个用户才可以
3. 在哪里判断用户的状态？
   1. 获取用户信息后就可进行一个判断 
      
      1. 进行用户信息的status判断 
      
         ~~~js
             // 获取用户信息调用
             getUserInfo().then(res => {
               this.userInfo = res.data;
               this.userInfo.avatar =
                 process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
               this.$store.state.userInfo = this.userInfo;
               if (res.data.status == 0) {
                 // 当帐号让禁用时提示一下
                 this.$message.warning("您帐号已让禁用，请联系管理员！");
                 //清理掉token
                 removeToken();
                 //跳回登陆页
                 this.$router.push("/");
               }
               window.console.log("用户信息：", res);
             });
         ~~~
      
         
      
      



## 权限功能 - 用户& 角色

> 网站为了方便管理，会将用户分为不同的角色，通过角色来管理同一类的用户

2. 角色是什么？

   1. 用户注册之后，在不同的状态下，能够干的事情是不相同的
   2. 为了区分用户的不同状态，很多的网站都会通过给用户贴标签的方式进行管理
   3. 这个标签（角色）
   4. 3个角色
      1. 超级管理员（啥都可以干）
      2. 管理员  （管理整个网站）
      3. 老师 （你添加个学科是可以的，但是你删除别人一些东西肯定是不给的）
      4. 学生  （只能查看一下学科的东西）
   5. 用户：很多个
   6. 注册网站之后
      1. 默认给了你一个角色
      2. 除非你干了某些事，你一直都是学生的角色
   7. 热门网站中，用户多，角色多
      1. 用户多，
      2. 角色少
         1. 根据需求，默认会创建几个，如果有必要，可以添加
      3. 某一个角色用户，应该会有多个
   8. 代码中直接管理角色即可，就不需要为每个用户进行管理

   

3. 用户和角色的关系?

   1. 用户一般会被分配某个角色
   2. 一个角色，多个用户可以拥有

4. 如何管理？

   1. 直接管理角色即可
   2. 通过角色去判断这个用户能够干的事情
   3. 如果希望修改某个用户能干的事情，进入的页面
   4. 只需要调整用户的角色即可

   





## 权限功能 - 页面访问权限定义

> 通过路由元信息，配置不同路由的访问权限

1. 需求：

   1. 不同的角色，能够进入的页面是不相同的
   2. 如果你非要去不允许进入的页面，直接提示无法访问
3. 超级管理员：一般是任何页面都可访问，任何权限都有，像(18511111111这个帐号)
   
2. 分析

   1. 为了开发方便，初期没有做任何限制
   2. 实际工作中，会事先做好一个约定
   3. 现在我们来做一个约定
      1. `登录`
         1. 管理员，老师，学生
      2. `数据概览`
         1. 管理员，老师
      3. `用户列表`
         1. 管理员
      4. `题库列表`
         1. 管理员，老师
      5. `企业列表`
         1. 管理员，老师
      6. `学科列表`
         1. 管理员，老师，学生
   4. 用户访问页面的时候，判断是否有访问的权限
      1. 有：放走
      2. 没有：提示没有权限
      3. 写在代码的哪里？
         1. 获取到用户信息，拿到权限后处理
         2. 导航守卫中也要处理，就是每进入一个页面都需要根据当前用户的角色先验证一下
         3. 二个地方都需要使用到用户角色 ，所以一般这种公用数据我们都是用vuex存储一下，在然后定义一个公用方法处理路由，然后在到首页模块用户信息与导航守卫二处使用
   
3. 实现

   1. 在路由里配制路由元信息

      ~~~js
      //实例化路由
      const router = new VueRouter({
          // 路由相关配制信息
          routes: [
              {
                  path: "/",
                  component: login,
                  meta: {
                      title: "登陆",
                      rules: ["超级管理员“,"管理员", "老师", "学生"]
                  }
              },
              {
                  path: "/layout",
                  component: layout,
                  redirect: "/layout/subject",
                  children: [
                      {
                          path: 'subject',
                          component: subject,
                          meta: {
                              title: "学科列表",
                              rules: ["超级管理员“,"管理员", "老师", "学生"]
                          }
                      },
                      {
                          path: 'course',
                          component: course,
                          meta: {
                              title: "数据概览",
                              rules: ["超级管理员“,"管理员", "老师"]
                          }
                      },
                      {
                          path: 'quesition',
                          component: quesition,
                          meta: {
                              title: "题库列表",
                              rules: ["超级管理员“,"管理员", "老师"]
                          }
                      },
                      {
                          path: 'business',
                          component: business,
                          meta: {
                              title: "企业列表",
                              rules: ["超级管理员“,"管理员", "老师"]
                          }
                      },
                      {
                          path: 'userList',
                          component: userList,
                          meta: {
                              title: "用户列表",
                              rules: ["超级管理员“,"管理员"]
                          }
                      }
                  ]
              }
      
          ]
      })
      ~~~

      

   2. 在vuex中定义一个state变量`role`用于存储用户角色 ，并且默认用`超级管理员`

      之所以要用`超级管理员`是因为进入页面时导航守卫就会执行，我们如果定义一个学生，它一进来的页面是学生不能进入的页面的话，就会让拦截，还没获取到用户信息就让拦截是不合理的，所以默认先给一个都能进入的角色 

      ~~~
      // 实例化vuex
      const store = new Vuex.Store({
          // 共享数据就是这里的state
          state: {
              username: "123",
              avatar: "",
              roleObj: {
                  1:"超级管理员"，
                  2: "管理员",
                  3: "老师",
                  4: "学生"
              },
              // 定义一下默认角色为超级管理员
              role: "超级管理员"
          }
      })
   ~~~
   
3. 在首页模块中获取到用户信息后，保存到vuex中
   
      ~~~js
          // 获取用户信息调用
          getUserInfo().then(res => {
            this.userInfo = res.data;
            this.userInfo.avatar =
              process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
            this.$store.state.userInfo = this.userInfo;
            this.$store.state.role = res.data.role;
            // 一般情况我们会将角色存储到vuex，以便其它地方使用
            if (res.data.status == 0) {
              // 当帐号让禁用时提示一下
              this.$message.warning("您帐号已让禁用，请联系管理员！");
              //清理掉token
              removeToken();
           //跳回登陆页
              this.$router.push("/");
         } 
          });
   ~~~
   
      

      
   
   4. 在首页登陆模块中处理角色权限
   
      2. 获取到用户角色 后做出相应判断 处理，与前面的status处理一样的方式
   
         ~~~js
             // 获取用户信息调用
             getUserInfo().then(res => {
               this.userInfo = res.data;
               this.userInfo.avatar =
                 process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
               this.$store.state.userInfo = this.userInfo;
               this.$store.state.role = res.data.role;
               // 一般情况我们会将角色存储到vuex，以便其它地方使用
               if (res.data.status == 0) {
                 // 当帐号让禁用时提示一下
                 this.$message.warning("您帐号已让禁用，请联系管理员！");
                 //清理掉token
                 removeToken();
                 //跳回登陆页
                 this.$router.push("/");
               } else {
                 //判断 该用户可不可以访问该页面
                 window.console.log("当前路由的元信息：", this.$route.meta);
                 if (!this.$route.meta.rules.includes(res.data.role)) {
                   //不允许 访问处理
                   // 当帐号让禁用时提示一下
                   this.$message.warning("您无权访问该页面！");
                   //清理掉token
                   removeToken();
                   //跳回登陆页
                   this.$router.push("/");
                 }
               }
         
             });
         ~~~
   
   6. 在导航守卫中处理相应的角色权限
   
   2. 在导航守卫中加入处理
   
      ~~~js
         import { Message } from 'element-ui';
      import { removeToken } from "@/utils/token.js"
      import store from "@/store/index.js"
      router.beforeEach((to, from, next) => {
          // 进度条开启
             NProgress.start()
             /*
          to:到哪个路由去
             from:从哪里过来的
       next:  next() 正常通过
                   next("path")把你甩到其它地方去    
             */
             //to.meta.rules.includes(this.$store.state.role))
             if (to.meta.rules.includes(store.state.role)) {
                 next()
          } else {
                 // 弹出提示
                 Message.warning("您无权访问该页面！")
                 // 清除token
                 removeToken()
                 next("/")
             }
         })
         ~~~
         
         

## 权限功能 - 菜单显示权限

> 路由既然不能访问，那么页面中的菜单没权限的干脆就不显示了，直接隐藏起来,用`v-if/v-show`指令

1. 需求

   1. 对首页模块的菜单选项根据不同权限显示与隐藏
      1. v-if(操纵Dom)
   
2. 实现

   1. 对不同菜单选项根据路由元信息处理菜单的显示与隐藏，如果写死不利于维护，像下面处理是不利于维护的

   ~~~html
    <el-menu-item index="/layout/course" v-if="['管理员', '老师'].includes($store.state.role)">
               <i class="el-icon-time"></i>
               <span slot="title">数据概览</span>
             </el-menu-item>
   ~~~

   用`this.$router.options` 其实是可以获取到路由里面的信息的，结合`v-for`处理就可以了

   路由信息里面缺少的菜单名字是可以通过路由元在相应路由

   1. 先拿到菜单选项所需路由信息，

      ~~~
        data() {
          return {
            // username: "",
            // avatar: "",
            collapse: false,
            isShow: false,
            menu: this.$router.options.routes[1].children //路由相应信息
          };
        },
      ~~~

   2. 菜单里面的图标我们路由元信息里没有，这里就需要我们去额外配制一下图标信息

      ~~~js
      //实例化路由
      const router = new VueRouter({
          // 路由相关配制信息
          routes: [
              {
                  path: "/",
                  component: login,
                  meta: {
                      title: "登陆",
                      rules: ["管理员", "老师", "学生"]
                  }
              },
              {
                  path: "/layout",
                  component: layout,
                  redirect: "/layout/subject",
                  children: [
                      {
                          path: 'subject',
                          component: subject,
                          meta: {
                              title: "学科列表",
                              rules: ["管理员", "老师", "学生"],
                              icon: "el-icon-notebook-2"
                          }
                      },
                      {
                          path: 'course',
                          component: course,
                          meta: {
                              title: "数据概览",
                              rules: ["管理员", "老师"],
                              icon: "el-icon-time"
                          }
                      },
                      {
                          path: 'quesition',
                          component: quesition,
                          meta: {
                              title: "题库列表",
                              rules: ["管理员", "老师"],
                              icon: "el-icon-edit-outline"
                          }
                      },
                      {
                          path: 'business',
                          component: business,
                          meta: {
                              title: "企业列表",
                              rules: ["管理员", "老师"],
                              icon: "el-icon-office-building"
                          }
                      },
                      {
                          path: 'userList',
                          component: userList,
                          meta: {
                              title: "用户列表",
                              rules: ["管理员"],
                              icon: "el-icon-user"
                          }
                      }
                  ]
              }
      
          ]
      })
      ~~~

      

   3. 渲染菜单相应信息

      ~~~html
      <el-menu-item
       v-for="(item, index) in menu"
        :key="index"
        :index="item.path"
        v-show="$store.state.role=='超级管理员' || item.meta.rules.includes($store.state.role)"
                >
          <i :class="{[item.meta.icon]:true}"></i>
          <span slot="title">{{item.meta.title}}</span>
       </el-menu-item>
      ~~~

      



## 权限功能 - 按钮级别的权限管理

> 除了页面级别的权限管理以外，有时候我们还需要精确的操纵按钮，使用什么指令呢？

 需求：

1. 学生，只能够查看学科信息
2. 老师，可以新增，修改数据  ，不能删除
3. 管理员，增删改数据

步骤:

2. `v-if`将角色信息和当前用户的角色进行匹配
   
   1. 设置元素的显示以及隐藏即可
   
      ~~~html
              <el-table-column label="操作" width="270px" v-if="$store.state.role!='学生'">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)">编辑</el-button>
                  <!-- scope 获取了整行数据   $index 数据索引项  0开始   row  接口返回的整行数据-->
                  <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
                  <el-button @click="del(scope.row.id)" v-if="$store.state.role.includes('管理员')">删除</el-button>
                </template>
              </el-table-column>
      ~~~
      
      
      
      
      
      
      
      
      
      













