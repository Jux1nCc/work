<template>
  <div class="newMusic">
    <input type="text" v-model="inputValue" @keyup.enter="search" />
    <!-- 歌曲列表
    组件套用组件
    1：导入
    2：注册
    3：使用
    父组件传值子组件
    1：在子组件标签上定义一个ref属性    
    2:访问子组件this===this.$refs.musicList
     -->

    <musicList ref="musicList"></musicList>
  </div>
</template>
<script>
import musicList from '../components/musicList'
import axios from 'axios'
import { getSong } from '../api/index.js'
export default {
  components: {
    musicList
  },
  data () {
    return {
      inputValue: ''
    }
  },
  created () {
    axios({
      url:
        'https://autumnfish.cn/personalized/newsong?sdgsdg=' +
        Math.random() * 9999
    }).then(res => {
      // 父传子歌曲列表
      this.$refs.musicList.list = res.data.result
    })
  },
  methods: {
    search () {
      getSong({ keywords: this.inputValue }).then(res => {
        let _temp = res.data.result.songs
        _temp.forEach(item => {
          item.song = {
            artists: item.artists,
            album: item.album,
            duration: item.duration
          }
        })
        this.$refs.musicList.list = _temp
        window.console.log('搜索歌曲列表：', res.data.result.songs)
      })
      // axios({
      //   url: 'https://autumnfish.cn/search?keywords=' + this.inputValue
      // }).then(res => {
      //   let _temp = res.data.result.songs
      //   _temp.forEach(item => {
      //     item.song = {
      //       artists: item.artists,
      //       album: item.album,
      //       duration: item.duration
      //     }
      //   })
      //   this.$refs.musicList.list = _temp
      //   window.console.log('搜索歌曲列表：', res.data.result.songs)
      // })
    }
  }
}
</script>
<style>
.newMusic {
  text-align: center;
}
.newMusic input {
  width: 320px;
  height: 30px;
  margin-bottom: 20px;
}
</style>
