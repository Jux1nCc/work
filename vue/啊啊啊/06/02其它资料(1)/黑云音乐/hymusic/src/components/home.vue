<template>
  <el-carousel indicator-position="outside" height="360px">
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <img class="img" :src="item.imageUrl" alt />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    axios({
      url: "http://183.237.67.218:3000/banner"
    }).then(res => {
      this.list = res.data.banners;
      window.console.log(res);
    });
  }
};
</script>
<style scoped>
.img {
  width: 100%;
}
</style>