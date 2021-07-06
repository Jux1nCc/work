<template>
  <div>
    <div class="header">
      <img src="./assets/logo.jpg" alt="" />
      <!-- <a href="#/find">发现音乐</a> -->
      <router-link to="/find">发现音乐123</router-link>
      <a href="#/my">我的音乐</a>
      <button @click="btnClick">朋友</button>
      <a href="#/friend"> 朋友</a>
      <img src="./assets/right.jpg" alt="" />
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  // 进入页面就跳转至朋友
  //this.$router.push(path)
  created () {
    this.$router.push('/friend')
  },
  methods: {
    btnClick () {
      window.console.log(this.$router)
      this.$router.push('/friend')
    }
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
}
.header a {
  color: #fff;
  margin-left: 20px;
  text-decoration: none;
  background-color: #242424;
}
.main {
  width: 1200px;
  margin: 0 auto;
}
.main img {
  width: 100%;
}
</style>
