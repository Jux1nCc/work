<template>
  <!-- 布局 -->
  <el-container class="app">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- el-menu菜单
        default-active:默认选中哪一项  对应我们当前路由的path   this.$route.path
        router  :如果router:true,使用vue-router模式，点击菜单子项后会跳转路由地址为index的值
          el-menu-item  index代表当前项的值
        点击有路由跳转功能 
       当前路由信息  this.$route  (秘书 )
       整个路由控制  this.$router   (公司老板)     
       
      
         -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <!-- router-link  to="path" -->
          <el-menu-item index="/find">
            <i class="el-icon-search"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/newMusic">
            <i class="el-icon-tickets"></i>
            <span slot="title">最新音乐</span>
          </el-menu-item>
          <el-menu-item index="/newMv">
            <i class="el-icon-video-camera"></i>
            <span slot="title">最新Mv</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    window.console.log(this.$route.path)
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body,
html {
  height: 100%;
}
.app {
  height: 100%;
}
.header {
  background-color: #f00;
}
.aside {
  background-color: #ccc;
}
.main {
  background-color: green;
}
</style>
