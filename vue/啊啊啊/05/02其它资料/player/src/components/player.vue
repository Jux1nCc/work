<template>
  <div class="player">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" :src="picUrl" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{picName}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{person}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{album}}</span>
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
      musicUrl: "", //音乐播放地址
      picUrl: "", //歌曲图片
      picName: "", //歌曲名称
      person: "", //演唱者
      album: "", //所属专辑
      lrc: "" //歌词
    };
  },
  created() {
    //   拿到传值过来的id
    let _id = this.$route.query.id;
    // 获取 音乐url
    axios({
      url: "https://autumnfish.cn/song/url?id=" + _id
    }).then(res => {
      this.musicUrl = res.data.data[0].url;
    });
    // 得到音乐详情
    axios({
      url: "https://autumnfish.cn/song/detail?ids=" + _id
    }).then(res => {
      this.picUrl = res.data.songs[0].al.picUrl;
      this.picName = res.data.songs[0].name;
      this.person = res.data.songs[0].ar
        .map(item => {
          return item.name;
        })
        .join(" | ");
      this.album = res.data.songs[0].al.name;
    });
    //得到歌词
    axios({
      url: "https://autumnfish.cn/lyric?id=" + _id
    }).then(res => {
      this.lrc = res.data.lrc.lyric.split("\n");
      window.console.log("歌词:", res.data.lrc.lyric);
    });
  }
};
</script>
<style>
</style>