<template>
  <div class="video" v-if="info != ''">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{ info.name }}</span>
      <span class="artist">{{ info.artists | formatAr }}</span>
    </div>
    <video :src="info.brs | formatBrs" controls></video>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      info: ''
    }
  },
  filters: {
    formatAr (val) {
      return val
        .map(item => {
          return item.name
        })
        .join('&')
    },
    formatBrs (val) {
      return val[Math.max(...Object.keys(val))]
    }
  },
  created () {
    axios({
      url: 'http://183.237.67.218:3000/mv/detail?mvid=' + this.$route.query.mvid
    }).then(res => {
      this.info = res.data.data
      window.console.log(res)
    })
  }
}
</script>

<style></style>
