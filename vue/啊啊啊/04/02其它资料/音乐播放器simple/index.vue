<template>
  <div class="main">
    <input type="text" v-model="inputValue" />
    <button @click="btnEvent">点我啊</button>
    <div class="box">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="getUrl(item.id)">{{item.name}}</li>
      </ul>
    </div>
    <audio :src="musicUrl" controls autoplay></audio>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      inputValue: "",
      list: [],
      musicUrl: ""
    };
  },
  methods: {
    btnEvent() {
      axios({
        url: "https://autumnfish.cn/search?keywords=" + this.inputValue
      }).then(res => {
        this.list = res.data.result.songs;
        window.console.log(res);
      });
    },
    getUrl(id) {
      axios({
        url: "https://autumnfish.cn/song/url?id=" + id
      }).then(res => {
        this.musicUrl = res.data.data[0].url;
        window.console.log(res);
      });
    }
  },
  created() {}
};
</script>
<style>
.main {
  width: 500px;
  height: 500px;
  /* border: 1px solid red; */
  margin: 0 auto;
}
.box {
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
  overflow: auto;
}
li {
  cursor: pointer;
}
audio {
  width: 100%;
}
</style>