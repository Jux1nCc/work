<template>
  <el-carousel indicator-position="outside" height="362px" class="swiper">
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <img class="img" :src="item.imageUrl" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    axios.defaults.baseURL = 'http://183.237.67.218:3000/'
    axios({
      url: 'banner/id=2'
    }).then(res => {
      this.list = res.data.banners
    })
  }
}
</script>

<style scoped>
.img {
  width: 100%;
}
</style>
