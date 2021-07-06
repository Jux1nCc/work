<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <img class="img" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
// 组件中使用axios  1:安装axios  2:导入axios  3:使用axios
import axios from 'axios'
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    axios({
      url: 'https://autumnfish.cn/banner?t=' + Math.random() * 999
    }).then(res => {
      this.list = res.data.banners
      window.console.log(res)
    })
  }
}
</script>
<style>
.img {
  width: 100%;
}
</style>
