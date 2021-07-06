<template>
  <div class="song_wrapper" ref="songs">
    <ul class="song_list">
      <li @click="liClick(item.id)" v-for="(item, index) in songs" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
// 导入iscroll
import iscroll from "iscroll";
export default {
  data() {
    return {
      songs: [], //歌曲列表
      scroll: ""
    };
  },
  mounted() {
    //   实例化iscroll
    this.scroll = new iscroll(this.$refs.songs, {
      mouseWheel: true,
      scrollbars: true
    });
  },
  methods: {
    //   刷新 iscroll
    refreshIscroll() {
      this.scroll.refresh();
    },
    // 歌曲点击事件
    liClick(id) {
      // 调用父级方法并传递父级方法相应歌曲id
      this.$parent.getUrl(id);
    }
  }
};
</script>

<style>
</style>