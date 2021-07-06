<template>
  <div class="song_wrapper" ref="wrapper">
    <ul class="song_list">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="$parent.liClick(item.id)"
      >
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
      myIscroll: ''
    }
  },
  methods: {
    refresh () {
      this.$nextTick(() => {
        this.myIscroll.refresh()
      })
    }
  },
  mounted () {
    this.myIscroll = new iscroll(this.$refs.wrapper, {
      mouseWHeel: true,
      scrollbars: true
    })
  }
}
</script>

<style></style>
