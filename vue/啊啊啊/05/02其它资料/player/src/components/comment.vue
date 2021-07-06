<template>
  <div class="comment-wrapper">
    <div class="items">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{item.user.nickname}}:</span>
            <span class="content">{{item.content}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{item.time | formatTimeGlobal}}</div>
            <div class="like-wrapper">
              <span>👍</span>
              ({{item.likedCount}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      list: [] //评论列表
    };
  },
  filters: {
    formatTime(time) {
      return moment(time).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  created() {
    axios({
      url: "https://autumnfish.cn/comment/music?id=" + this.$route.query.id
    }).then(res => {
      this.list = res.data.comments;
      //   window.console.log("评论:", res);
    });
  }
};
</script>
<style>
</style>