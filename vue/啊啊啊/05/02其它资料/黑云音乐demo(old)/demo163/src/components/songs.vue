<template>
  <div class="result-wrapper">
    <div class="song" v-for="(item, index) in songs" :key="index">
      <div class="name">
        <span class="iconfont icon-play" @click="goPlayer(item)"></span>
        {{item.name}}
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid!=0"
          @click="getAppMv(item.mvid)"
        ></span>
      </div>
      <div class="singer">{{item.artists | formatUser}}</div>
      <div class="album">{{item.album.name}}</div>
      <div class="time">{{item.duration | filterDur}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songs: []
    };
  },
  //   过滤器
  filters: {
    filterDur(time) {
      return (
        ("0" + Math.floor(time / 1000 / 60)).slice(-2) +
        ":" +
        ("0" + Math.floor((time / 1000) % 60)).slice(-2)
      );
    },
    formatUser(arr) {
      let temp = [];
      for (var i = 0; i < arr.length; i++) {
        temp.push(arr[i].name);
      }
      return temp.join(" | ");
    }
  },
  methods: {
    getAppMv(mvid) {
      this.$parent.getMv(mvid);
    },
    goPlayer(item) {
      this.$parent.getPlayer(item);
    }
  }
};
</script>
<style>
</style>