<template>
  <el-container class="App">
    <el-header class="header">
      <div class="title">黑云音乐</div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu class="menu" :default-active="$route.path" router>
          <el-menu-item index="/">
            <i class="el-icon-search"></i>
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/newMusic">
            <i class="el-icon-tickets"></i>
            <span slot="title">最新音乐</span>
          </el-menu-item>
          <el-menu-item index="/newMv">
            <i class="el-icon-video-camera"></i>
            <span slot="title">最新MV</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      musicUrl: ''
    }
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: 0;
  list-style: none;
}
html,
body,
.App {
  height: 100%;
}
.App {
  height: 100%;
  .header {
    height: 50px !important;
    background-color: #ededed;
    .title {
      line-height: 50px;
      font-size: 26px;
      font-weight: 500;
      color: #333;
      text-align: center;
    }
  }
  .aside {
    background-color: #ededed;
    // .menu {
    //   padding-left: 20px;
    // }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f1f3f4;
    audio {
      width: 100%;
    }
  }
}
</style>
