<template>
  <div class="newMv">
    <input
      type="text"
      v-model="inputValue"
      @keyup.enter="search"
      placeholder="请输入搜索的歌曲"
    />
    <musicList ref="musicList"></musicList>
  </div>
</template>
<script>
import musicList from '../components/musicList'
import axios from 'axios'
export default {
  components: {
    musicList
  },
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    search () {
      axios({
        url:
          'https://autumnfish.cn/search?type=1004&keywords=' +
          this.inputValue +
          '&sdgdsg=' +
          Math.random() * 999
      }).then(res => {
        let _temp = res.data.result.mvs
        _temp.forEach(item => {
          item.picUrl = item.cover
          item.song = {
            artists: item.artists,
            album: {
              name: item.name
            },
            duration: item.duration
          }
        })
        this.$refs.musicList.type = 'mv'
        this.$refs.musicList.list = _temp
      })
    }
  },
  created () {
    axios({
      url: 'https://autumnfish.cn/mv/all?wedrgdsfg=' + Math.random() * 999
    }).then(res => {
      let _temp = res.data.data
      _temp.forEach(item => {
        item.picUrl = item.cover
        item.song = {
          artists: item.artists,
          album: {
            name: item.name
          },
          duration: item.duration
        }
      })
      // 父传子数据
      this.$refs.musicList.type = 'mv'
      this.$refs.musicList.list = _temp
      window.console.log('mv:', res.data.data)
    })
  }
}
</script>
<style>
.newMv {
  text-align: center;
}
.newMv input {
  height: 30px;
  width: 350px;
}
</style>
