<template>
  <div class="video" v-if="mvInfo!=''">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{mvInfo.name}}</span>
      <span class="artist">{{mvInfo.artists[0].name}}</span>
    </div>
    <video :src="mvInfo.brs['240']" controls></video>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      mvInfo: ""
    };
  },
  created() {
    axios({
      url: "http://183.237.67.218:3000/mv/detail?mvid=" + this.$route.query.mvid
    }).then(res => {
      this.mvInfo = res.data.data;
      window.console.log(res);
    });
  }
};
</script>
<style>
</style>