<template>
  <el-container class="layout">
  <el-header class="header">
    <div class="left">
      <i class="el-icon-s-fold logoIcon" @click='collapse=!collapse'></i>
      <img src="@/assets/img/loginLogo.png" alt class="logoImg" />
      <span class="logoLitle">黑马面面</span>
    </div>
    <div class="right">
      <img  alt class="userImg" :src="$store.state.userInfo.avatar" />
        <span class="userName">{{$store.state.userInfo.username}},你好</span>
        <el-button class="userBtn"  size="mini" type="primary" @click='quitBtn'>退出</el-button>
    </div>
  </el-header>
  <el-container>
    <el-aside class="aside" width='auto'>
      <el-menu :collapse='collapse' :router="true" :default-active="$route.fullPath" class="el-menu-vertical-demo">
        <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { getUserInfo, quit } from '@/api/home'
import { removeToken, getToken } from '@/utils/token'
export default {
  data() {
    return {
      userInfo: '',
      collapse: false
    }
  },
  created() {
    if(!getToken()){
      this.$router.push('/');
      return;
    }
    getUserInfo().then(res=>{
      console.log(res)
      this.userInfo = res.data
      this.userInfo.avatar = process.env.VUE_APP_URL + '/' + this.userInfo.avatar
      this.$store.state.userInfo = this.userInfo
      this.$store.state.role = res.data.role
      if(res.data.status == 0){
        this.$message.warning('您的账号已被禁用,请联系管理员!')
        removeToken()
        this.$router.push('/')
      }else {
        if(!this.$route.meta.rules.includes(res.data.role)){
          this.$message.warning('您无权访问该页面');
          removeToken(); 
          this.$router.push('/')
        }
      }
    })
  },
  methods: {
    quitBtn(){
      this.$confirm("请确认是否退出登录?", "温馨提示!", {
        confirmButtonText: "退出登录!",
        cancelButtonText: "算了,点错了!",
        type: "warning"
      }).then(()=>{
        this.$message({
          type: "success",
          message: "退出成功!"
        })
        quit().then(()=>{
          removeToken();
          this.$router.push('/')
        })
      }).catch(()=>{
        this.$message({
          type: "info",
          message: "已取消退出!"
        })
      })
    }
  },
}
</script>

<style lang='less'>
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .logoIcon {
        font-size: 24px;
      }
      .logoImg {
        width: 28px;
        margin-left: 20px;
        margin-right: 11px;
      }
      .logoLitle {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #49a1ff;
        letter-spacing: 1px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .userImg {
        width: 43px;
        margin-right: 10px;
      }
      .userBtn {
        margin-left: 10px;
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 5px 0px rgba(63, 63, 63, 0.35);
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  .main{
    background-color: #E8E9EC;
  }
}
</style>