<template>
  <div class="result-wrapper">
    <div class="song" v-for="(item, index) in list" :key="index">
      <div class="name" @dblclick="goComment(item.id)">
        <span class="iconfont icon-play" @click="goPlayer(item.id)"></span>
        {{item.name}}
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid!=0"
          @click="goMv(item.mvid)"
        ></span>
      </div>
      <div class="singer">{{item.artists[0].name}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration}}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "songs",
  data() {
    return {
      list: []
    };
  },
  watch: {
    "$route.query.songName"() {
      this.getMusicList();
    }
  },
  created() {
    this.getMusicList();
  },
  methods: {
    goMv(id) {
      this.$router.push("/mv?mvid=" + id);
    },
    getMusicList() {
      axios({
        url:
          "http://183.237.67.218:3000/search?keywords=" +
          this.$route.query.songName
      }).then(res => {
        this.list = res.data.result.songs;
        window.console.log(res);
      });
    },
    goPlayer(id) {
      this.$router.push("/player?id=" + id);
    },
    goComment(id) {
      this.$router.push("/comment?id=" + id);
    }
  }
};
</script>
<style>
</style>