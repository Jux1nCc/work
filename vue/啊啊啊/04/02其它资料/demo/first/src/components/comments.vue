<template>
  <div class="comment_list" ref="comment_list">
    <div>
      <dl v-for="(item, index) in list" :key="index">
        <dt>
          <img :src="item.user.avatarUrl" alt="" />
        </dt>
        <dd class="name">{{ item.user.nickname }}</dd>
        <dd class="detail">
          {{ item.content }}
        </dd>
      </dl>
    </div>
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
    this.myIscroll = new iscroll(this.$refs.comment_list, {
      mouseWheel: true,
      scrollbars: true
    })
  }
}
</script>

<style></style>
