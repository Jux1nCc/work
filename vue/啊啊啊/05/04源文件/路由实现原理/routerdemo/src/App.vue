<template>
  <!-- 路由就是一个指向，根据不同路径指向不同组件 -->
  <div>
    <a href="#/sona">跳转到sona</a>
    <a href="#/sonb">跳转到sonb</a>
    <sona v-if="routerUrl == '#/sona'"></sona>
    <sonb v-else></sonb>
  </div>
</template>

<script>
import sona from './components/sona'
import sonb from './components/sonb'
export default {
  data () {
    return {
      routerUrl: ''
    }
  },
  created () {
    this.routerUrl = window.location.hash
    let _this = this
    window.onhashchange = function () {
      _this.routerUrl = window.location.hash
    }
  },
  components: {
    sonb,
    sona
  }
}
</script>

<style></style>
