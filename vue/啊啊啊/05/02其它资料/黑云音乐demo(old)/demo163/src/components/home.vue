<template>
  <div class="itemImg">
    <el-carousel indicator-position="outside" height="360px">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <img class="img" :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
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
    axios({ url: "https://autumnfish.cn/banner" }).then(res => {
      this.list = res.data.banners;
      window.console.log(res.data.banners);
    });
  }
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.img {
  width: 100%;
}
</style>