<template>
  <div class="player" v-if="musicInfo!=''">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" :src="musicInfo.al.picUrl" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{musicInfo.name}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{musicInfo.ar | filterAr}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{musicInfo.al.name}}</span>
      </div>
      <audio class="audio" controls :src="musicUrl"></audio>
      <ul class="lyric-container">
        <li class="lyric" v-for="(item, index) in lrc" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      musicUrl: "",
      musicInfo: "",
      lrc: []
    };
  },
  filters: {
    filterAr(arr) {
      return arr
        .map(item => {
          return item.name;
        })
        .join(" | ");
    }
  },
  created() {
    //   获取歌曲url
    axios({
      url: "http://183.237.67.218:3000/song/url?id=" + this.$route.query.id
    }).then(res => {
      this.musicUrl = res.data.data[0].url;
      window.console.log(res);
    });
    // 获取歌曲图片等信息
    axios({
      url: "http://183.237.67.218:3000/song/detail?ids=" + this.$route.query.id
    }).then(res => {
      this.musicInfo = res.data.songs[0];
      window.console.log("歌曲详情:", res);
    });
    // 获取歌词
    axios({
      url: "http://183.237.67.218:3000/lyric?id=" + this.$route.query.id
    }).then(res => {
      this.lrc = res.data.lrc.lyric.split("\n");
      window.console.log("歌词", res);
    });
  }
};
</script>
<style>
</style>