<template>
  <!-- 组件中使用外部插件
1：安装插件  npm i 插件名   插件是安装到node_modules文件夹下的
2：导入插件  import 名字 from 插件名
3:使用(使用的名字就是import的名字)
(装包，导包，用包)
 -->
  <div>
    <input type="text" v-model="inputValue" @keyup.enter="search" />
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
// 导入
import axios from 'axios'
export default {
  data () {
    return {
      inputValue: '',
      list: []
    }
  },
  created () {},
  methods: {
    search () {
      axios({
        url: 'http://www.dongh5.com:9000/search?keywords=' + this.inputValue
      }).then(res => {
        window.console.log(res)
        this.list = res.data.result.songs
      })
    }
  }
}
</script>
<style></style>
