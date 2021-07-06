<template>
  <div class="newMusic">
    <div class="top">
      <input
        type="text"
        placeholder="请输入要搜索的歌曲"
        v-model="inputValue"
        @keyup.enter="search"
      />
    </div>
    <tableItem :musicList="musicList"></tableItem>
  </div>
</template>

<script>
import tableItem from '../components/tableItem'
import { getNewsong, searchMusic } from '@/api/index.js'
export default {
  components: {
    tableItem
  },
  data () {
    return {
      musicList: '',
      inputValue: ''
    }
  },
  created () {
    getNewsong().then(res => {
      this.musicList = res.data.result
    })
  },
  methods: {
    search () {
      searchMusic({ keywords: this.inputValue }).then(res => {
        res.data.result.songs.forEach(item => {
          item.song = {
            artists: item.artists,
            duration: item.duration,
            album: {
              name: item.name
            }
          }
        })
        this.musicList = res.data.result.songs
        window.console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
.newMusic {
  .top {
    text-align: center;
    input {
      width: 300px;
      height: 30px;
      padding-left: 10px;
      border: 1px solid #ccc;
    }
  }
}
</style>
