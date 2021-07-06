<template>
  <div class="comment_list" ref="commentList">
    <div>
      <dl v-for="(item, index) in list" :key="index">
        <dt>
          <img :src="item.user.avatarUrl" alt />
        </dt>
        <dd class="name">{{item.user.nickname}}</dd>
        <dd class="detail">{{item.content}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import iscroll from "iscroll";
export default {
  data() {
    return {
      list: [],
      scroll: ""
    };
  },
  mounted() {
    this.scroll = new iscroll(this.$refs.commentList, {
      mouseWheel: true,
      scrollbars: true
    });
  },
  methods: {
    refreshComment() {
      this.scroll.refresh();
    }
  }
};
</script>
<style>
</style>