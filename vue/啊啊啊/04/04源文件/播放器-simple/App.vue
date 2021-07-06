<template>
  <div class="app">
    <input type="text" v-model="inputValue" @keyup.enter="search" />
    <!-- 放一个子组件 -->
    <musiclist ref="musiclist"></musiclist>
    <!-- audio:  src歌曲路径   controls:控制面板  autoplay自动播放-->
    <audio
      :src="musicUrl"
      @play="playEvent"
      @pause="pauseEvent"
      controls
      autoplay
    ></audio>
  </div>
</template>
<script>
// 组件中使用axios  1:装包（装到node_modules）  2：导包   3：用包
import axios from 'axios'
import musiclist from './components/musiclist'
export default {
  components: {
    musiclist
  },
  data () {
    return {
      inputValue: '',
      list: [],
      musicUrl: ''
    }
  },
  methods: {
    search () {
      axios({
        url: 'http://www.dongh5.com:9000/search?keywords=' + this.inputValue
      }).then(res => {
        // this.list = res.data.result.songs
        // 父传子   1：在子组件标签上定义一个ref ref=值  2：访问子组件this===this.$refs.值.list=歌曲列表数据
        this.$refs.musiclist.list = res.data.result.songs
      })
    },
    liClick (id) {
      axios({
        url: 'http://www.dongh5.com:9000/song/url?id=' + id
      }).then(res => {
        this.musicUrl = res.data.data[0].url
        window.console.log('歌曲url:', res)
      })
    },
    playEvent () {
      alert('正在播放音乐')
    },
    pauseEvent () {
      alert('音乐暂停')
    }
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.app {
  width: 600px;
  margin: 0 auto;
}
.app input {
  height: 30px;
  width: 100%;
}
.list {
  width: 100%;
  height: 500px;
  overflow: auto;
  border: 1px solid #ccc;
}
</style>
