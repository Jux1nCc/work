<template>
  <div class="found">
    <el-carousel :interval="4000" type="card" height="311px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <img class="top-img" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <h3>推荐音乐</h3>
    <tableItem :musicList="musicList"></tableItem>
  </div>
</template>

<script>
import { getBannerList, getNewsong } from '@/api/index.js'
import tableItem from '@/components/tableItem'
export default {
  data () {
    return {
      list: [],
      musicList: []
    }
  },
  components: {
    tableItem
  },
  created () {
    getBannerList().then(res => {
      this.list = res.data.banners
      window.console.log(res)
    })
    getNewsong().then(res => {
      this.musicList = res.data.result
      window.console.log(res)
    })
  },
  methods: {
    playParentMusic (src) {
      alert(src)
      this.$parent.musicUrl = src
    }
  }
}
</script>

<style lang="less">
.found {
  .top-img {
    width: 100%;
  }
}
</style>
