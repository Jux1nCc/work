<template>
  <div class="result-wrapper">
    <div class="song" v-for="(item, index) in songs" :key="index" @dblclick="goComment(item.id)">
      <div class="name">
        <span class="iconfont icon-play" @click="playerClick(item.id)"></span>
        {{item.name}}
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid"
          @click="goMv(item.mvid)"
        ></span>
      </div>
      <div class="singer">{{item.artists | formatArtists}}</div>
      <div class="album">{{item.alias[0]}}</div>
      <div class="time">{{item.duration | formatTime }}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      songs: [] //歌曲列表
    };
  },
  watch: {
    "$route.query.songName"() {
      this.getMusicList();
    }
  },
  filters: {
    formatArtists(value) {
      return value
        .map(item => {
          return item.name;
        })
        .join(" | ");
    },
    formatTime(time) {
      return (
        ("0" + Math.floor(time / 1000 / 60)).slice(-2) +
        ":" +
        ("0" + Math.floor((time / 1000) % 60)).slice(-2)
      );
    }
  },
  methods: {
    // 获取音乐数据
    getMusicList() {
      axios({
        url:
          "https://autumnfish.cn/search?keywords=" + this.$route.query.songName
      }).then(res => {
        // js写法完成路由跳转   push后面就是要跳转的路由path
        this.songs = res.data.result.songs;
        window.console.log(res.data.result.songs);
      });
    },
    // 跳转至播放页
    playerClick(id) {
      this.$router.push("./player?id=" + id);
    },
    //跳转至mv页
    goMv(mvid) {
      this.$router.push("./mv?mvid=" + mvid);
    },
    //跳至评论页
    goComment(id) {
      this.$router.push("./comment?id=" + id);
    }
  },

  created() {
    this.getMusicList();
  }
};
</script>
<style>
</style>