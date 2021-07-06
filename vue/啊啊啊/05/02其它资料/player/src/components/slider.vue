<template>
  <el-carousel indicator-position="outside" height="400px">
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <!-- <h3>{{ item.imageUrl }}</h3> -->
      <img :src="item.imageUrl" class="img" alt />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
// 导入axios
import axios from "axios";
export default {
  data() {
    return {
      banners: []
    };
  },
  created() {
    axios({
      url: "https://autumnfish.cn/banner?_t=" + Math.random() * 999,
      method: "get"
    }).then(res => {
      this.banners = res.data.banners;
      window.console.log(res.data.banners);
    });
  }
};
</script>
<style>
.img {
  height: 100%;
  object-fit: cover;
}
</style>