<template>
  <!-- 组件套用组件
1：导入
2：注册
3：使用
 -->
  <div class="app">
    <top></top>
    <middle></middle>
    <bottom></bottom>
  </div>
</template>
<script>
// 导入
import top from './components/top'
import middle from './components/middle.vue'
import bottom from './components/bottom.vue'
export default {
  components: {
    //   注册
    top, //top:top
    middle,
    bottom
  }
}
</script>
<style>
.app {
  width: 1200px;
  margin: 0 auto;
}
img {
  width: 100%;
}
</style>
