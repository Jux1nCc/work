<template>
  <div id="player">
    <h2 class="title" @click="goHome">黑云音乐</h2>
    <div class="search">
      <input type="text" v-model="inputValue" @keyup.enter="search" />
      <button>
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <!-- 路由出口 -->
        <router-view ref="son"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    search() {
      axios({
        url:
          "http://183.237.67.218:3000/search?keywords=" +
          this.inputValue +
          "&_t=" +
          Date.now()
      }).then(res => {
        // window.console.log(this.$refs.son);
        this.$router.push("/songs");
        this.$nextTick(() => {
          this.$refs.son.songs = res.data.result.songs;
        });

        // window.console.log(this.$refs.son, res.data.result.songs);
      });
    },
    // 获取歌曲视频
    getMv(mvid) {
      axios({
        url: "http://183.237.67.218:3000/mv/detail?mvid=" + mvid
      }).then(res => {
        this.$router.push("/mv");
        this.$nextTick(() => {
          this.$refs.son.mvInfo = res.data.data;
        });
        // window.console.log(res.data.data.brs[0]);
      });
    },
    goHome() {
      this.$router.push("/home");
    },
    getPlayer(item) {
      axios({
        url:
          "http://183.237.67.218:3000/song/url?id=" +
          item.id +
          "&_t=" +
          Date.now()
      }).then(res => {
        this.$router.push("/player");
        this.$nextTick(() => {
          this.$refs.son.audioUrl = res.data.data[0].url;
        });
        // window.console.log(res.data.data[0].url);
      });
    }
  }
};
</script>
<style>
/* <link rel="stylesheet" href="./css/index.css" />
  <link rel="stylesheet" href="./css/iconfont.css" /> */
@import url(./assets/css/index.css);
@import url(./assets/css/iconfont.css);
</style>