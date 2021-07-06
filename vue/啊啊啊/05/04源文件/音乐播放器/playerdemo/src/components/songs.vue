<template>
  <div class="song_wrapper" ref="song_wrapper">
    <ul class="song_list">
      <li v-for="(item, index) in list" :key="index" @click="liClick(item.id)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import iscroll from 'iscroll'
export default {
  data () {
    return {
      list: [],
      myscroll: ''
    }
  },
  methods: {
    liClick (id) {
      // 调用父组件方法（获取歌曲url方法）
      this.$parent.getMusicData(id)
    }
  },
  mounted () {
    this.myscroll = new iscroll(this.$refs.song_wrapper, {
      mouseWheel: true,
      scrollbars: true
    })
  }
}
</script>

<style></style>
