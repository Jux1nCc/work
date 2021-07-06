<template>
  <div v-if="songInfo != ''" class="audioPlay">
    <h3>{{ songInfo.name }}</h3>
    <p>{{ songInfo.ar | filterAr }}</p>
    <img :src="songInfo.al.picUrl" alt="" />
    <audio :src="musicUrl" controls autoplay></audio>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      songInfo: '',
      musicUrl: ''
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
  //
  created () {
    axios({
      url:
        'https://autumnfish.cn/song/url?id=' +
        this.$route.query.id +
        '&sdgfsdg=' +
        Math.random() * 999
    }).then(res => {
      this.musicUrl = res.data.data[0].url
      window.console.log('歌曲url:', res)
    })
    // 获取歌曲图片等详情信息
    axios({
      url:
        'https://autumnfish.cn/song/detail?ids=' +
        this.$route.query.id +
        '&sdgfsdg=' +
        Math.random() * 999
    }).then(res => {
      this.songInfo = res.data.songs[0]
      window.console.log('歌曲图片等详情:', res)
    })
  }
}
</script>
<style>
.audioPlay {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
.audioPlay img {
  width: 100%;
}
</style>
