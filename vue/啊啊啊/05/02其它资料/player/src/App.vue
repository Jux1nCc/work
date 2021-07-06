<template>
  <div id="player">
    <h2 class="title">
      <router-link to="/">黑云音乐</router-link>
    </h2>
    <div class="search">
      <input type="text" v-model="inputValue" @keyup.enter="search" />
      <button @click="search">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <!-- 路由出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      inputValue: "" //搜索框的值
    };
  },
  methods: {
    search() {
      if (this.inputValue.trim() == "") {
        return;
      }
      this.$router.push("/list?songName=" + this.inputValue);
    }
  },
  components: {}
};
</script>

<style>
/*   <link rel="stylesheet" href="./css/index.css" />
  <link rel="stylesheet" href="./css/iconfont.css" /> */
@import url(./assets/css/index.css);
@import url(./assets/css/iconfont.css);
.title a {
  color: #dd021a;
}
</style>
