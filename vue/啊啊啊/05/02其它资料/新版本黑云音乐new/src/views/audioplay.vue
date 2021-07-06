<template>
  <div class="audioplay" v-if="info != ''">
    <h3 class="name">{{ info.al.name }}</h3>
    <p class="avatar">演唱者：{{ info.ar | filterAr }}</p>
    <img :src="info.al.picUrl" alt="" />
    <audio :src="musicUrl" controls autoplay></audio>
  </div>
</template>

<script>
import { playMusic, songInfo } from '@/api/index.js'
export default {
  data () {
    return {
      musicUrl: '',
      info: ''
    }
  },
  filters: {
    filterAr (arr) {
      return arr
        .map(item => {
          return item.name
        })
        .join('&')
    }
  },
  created () {
    this.playMusic()
  },
  methods: {
    playMusic () {
      let id = this.$route.query.id
      if (id) {
        playMusic({ id: id }).then(res => {
          this.musicUrl = res.data.data[0].url
        })
        songInfo({ ids: id }).then(res => {
          this.info = res.data.songs[0]
          window.console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="less">
.audioplay {
  text-align: center;
  width: 700px;
  margin: 0 auto;
  .name {
    margin-bottom: 20px;
  }
  .avatar {
    margin-bottom: 30px;
  }
  img {
    width: 100%;
  }
  audio {
    width: 100%;
  }
}
</style>
