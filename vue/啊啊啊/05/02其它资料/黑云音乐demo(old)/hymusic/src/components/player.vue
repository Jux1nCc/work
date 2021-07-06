<template>
  <div class="player" v-if="musicInfo != ''">
    <div class="left">
      <img
        class="disc"
        src="../assets/img/disc.png"
        :class="{ running: playing }"
        alt=""
      />
      <img
        class="cover"
        :src="musicInfo.al.picUrl"
        :class="{ running: playing }"
        alt=""
      />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt="" /><span>{{
          musicInfo.name
        }}</span>
      </div>
      <div class="singer">
        歌手: <span>{{ musicInfo.ar | formatAr }}</span>
      </div>
      <div class="album">
        所属专辑: <span>{{ musicInfo.al.name }}</span>
      </div>
      <audio
        @play="playing = true"
        @pause="playing = false"
        class="audio"
        controls
        :src="musicUrl"
      ></audio>
      <ul class="lyric-container">
        <li class="lyric" v-for="(item, index) in lrc" :key="index">
          {{ item }}
        </li>
        <li class="lyric">初次见你</li>
        <li class="lyric">那双迷人的小眼睛</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      musicUrl: '',
      playing: false,
      musicInfo: '',
      lrc: ''
    }
  },
  filters: {
    formatAr (val) {
      return val
        .map(item => {
          return item.name
        })
        .join('&')
    }
  },
  created () {
    let id = this.$route.query.id
    axios({
      url: 'http://183.237.67.218:3000/song/url?id=' + id
    }).then(res => {
      this.musicUrl = res.data.data[0].url
    })
    axios({
      url: 'http://183.237.67.218:3000/song/detail?ids=' + id
    }).then(res => {
      this.musicInfo = res.data.songs[0]
    })
    axios({
      url: 'http://183.237.67.218:3000/lyric?id=' + id
    }).then(res => {
      window.console.log(res)
      this.lrc = res.data.lrc.lyric.split('\n')
    })
  }
}
</script>

<style>
.cover,
.disc {
  animation: move 5s linear infinite paused;
}
.running {
  animation-play-state: running;
}

@keyframes move {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
