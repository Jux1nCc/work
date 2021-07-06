<template>
  <el-container class="app">
    <el-header class="header">黑云音乐</el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu :default-active="$route.path" :router="true">
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
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}
html,
body {
  height: 100%;
}
.app {
  height: 100%;
}
.header {
  background-color: #ededed;
  text-align: center;
  font-size: 26px;
  height: 40px !important;
}
.aside {
  background-color: #ededed;
}
</style>
