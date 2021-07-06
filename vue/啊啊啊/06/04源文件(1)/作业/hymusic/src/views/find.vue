<template>
  <div>
    <!-- 走马灯 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <img class="img" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <h3>推荐音乐</h3>
    <musicList ref="musicList"></musicList>
    <!-- <table class="table">
      <tr>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
      <tr
        v-for="(item, index) in musicList"
        :key="index"
        @click="goAudioPlay(item.id)"
      >
        <td>
          <div class="item-tr">
            <span class="index">{{ index + 1 }}</span>
            <img class="table-img" :src="item.picUrl" alt="" />
            <span>{{ item.name }}</span>
          </div>
        </td>
        <td>{{ item.song.artists | filterAr }}</td>
        <td>{{ item.song.album.name }}</td>
        <td>{{ item.song.duration | filterTime }}</td>
      </tr>
    </table> -->
  </div>
</template>
<script>
// import ooo from './xxx.js'
// import { xxx } from './xxx.js'
// import axios from 'axios'
// import moment from 'moment'
import musicList from '../components/musicList'
import { getBanners, getMusicList } from '../api/index.js'
// { getBanners }  ={ getBanners:function(){return axios(...)} }
export default {
  components: {
    musicList
  },
  data () {
    return {
      list: [],
      musicList: []
    }
  },
  methods: {
    // goAudioPlay (id) {
    //   this.$router.push('/audioPlay?id=' + id)
    // }
  },
  created () {
    // xxx()
    // this.$axios({
    //   url: '/banner?sdgvsdg=' + Math.random() * 9999
    // }).then(res => {
    //   this.list = res.data.banners
    // })
    getBanners().then(res => {
      this.list = res.data.banners
    })
    // 获取推荐音乐列表
    getMusicList().then(res => {
      this.$refs.musicList.list = res.data.result
    })
    // this.$axios({
    //   url:
    //     'https://autumnfish.cn/personalized/newsong?sdgsdg=' +
    //     Math.random() * 9999
    // }).then(res => {
    //   this.musicList = res.data.result
    // this.$refs.musicList.list = res.data.result
    //   this.musicList.forEach(item => {
    // window.console.log(item)
    // item.artists = item.song.artists.map(item2 => {
    //   return item2.name
    // })
    // let _m = ('0000' + Math.floor(item.song.duration / 1000 / 60)).slice(-2)
    // let _s = (
    //   '000000000' + Math.floor((item.song.duration / 1000) % 60)
    // ).slice(-2)
    // item.musicTime = _m + ':' + _s
    //   })
    //   window.console.log(res)
    // })
  }
}
</script>
<style>
.img {
  width: 100%;
}
</style>
