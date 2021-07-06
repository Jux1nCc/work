<template>
  <div class="video">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{mvName}}</span>
      <span class="artist">{{artist}}</span>
    </div>
    <video :src="mvSrc" controls></video>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      mvSrc: "", //mv地址
      mvName: "", //mv歌曲名字
      artist: "" //演唱者
    };
  },
  created() {
    //获取mv url
    axios({
      url: "https://autumnfish.cn/mv/detail?mvid=" + this.$route.query.mvid
    }).then(res => {
      let _arr = Object.values(res.data.data.brs);
      this.mvSrc = _arr[_arr.length - 1];
      this.mvName = res.data.data.name;
      this.artist = res.data.data.artists.map(v => v.name).join(" | ");
      window.console.log("mv:", res);
    });
  }
};
</script>
<style>
</style>