<template>
  <div class="mvPlay" v-if="mvInfo != ''">
    <h3>{{ mvInfo.name }}</h3>
    <p>演唱者:{{ mvInfo.artists | filterAr }}</p>
    <video :src="mvUrl" controls autoplay></video>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      mvUrl: '',
      mvInfo: ''
    }
  },
  filters: {
    filterAr (arr) {
      return arr
        .map(item => {
          return item.name
        })
        .join(' & ')
    }
  },
  created () {
    axios({
      url: 'https://autumnfish.cn/mv/url?id=' + this.$route.query.id
    }).then(res => {
      this.mvUrl = res.data.data.url
    })
    // 获取详情
    axios({
      url: 'https://autumnfish.cn/mv/detail?mvid=' + this.$route.query.id
    }).then(res => {
      this.mvInfo = res.data.data
      window.console.log('mv信息:', res)
    })
  }
}
</script>
<style>
.mvPlay {
  text-align: center;
}
.mvPlay video {
  width: 600px;
  height: 400px;
}
</style>
