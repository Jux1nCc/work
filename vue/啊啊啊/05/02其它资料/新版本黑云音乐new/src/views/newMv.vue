<template>
  <div class="newMv">
    <div class="top">
      <input
        type="text"
        placeholder="请输入要搜索的歌曲"
        v-model="inputValue"
        @keyup.enter="search"
      />
    </div>
    <div v-if="mvUrl" class="mv">
      <video :src="mvUrl" controls autoplay></video>
    </div>
    <tableItem :musicList="musicList" type="mv"></tableItem>
  </div>
</template>

<script>
import { getMv, searchMusic } from '@/api/index.js'
import tableItem from '@/components/tableItem'
export default {
  components: {
    tableItem
  },
  data () {
    return {
      musicList: '',
      mvUrl: '',
      inputValue: ''
    }
  },

  created () {
    getMv().then(res => {
      res.data.data.forEach(item => {
        item.picUrl = item.cover
        item.song = {
          artists: item.artists,
          duration: item.duration,
          album: {
            name: item.name
          }
        }
      })
      window.console.log(res.data.data)
      this.musicList = res.data.data
    })
  },
  methods: {
    search () {
      searchMusic({ keywords: this.inputValue, type: 1004 }).then(res => {
        res.data.result.mvs.forEach(item => {
          item.picUrl = item.cover
          item.song = {
            artists: item.artists,
            duration: item.duration,
            album: {
              name: item.name
            }
          }
        })
        this.musicList = res.data.result.mvs
        window.console.log(this.musicList)
      })
    }
  }
}
</script>

<style lang="less">
.newMv {
  .top {
    text-align: center;
    input {
      width: 300px;
      height: 30px;
      padding-left: 10px;
      border: 1px solid #ccc;
    }
  }
  .mv {
    text-align: center;
    video {
      width: 600px;
    }
  }
}
</style>
