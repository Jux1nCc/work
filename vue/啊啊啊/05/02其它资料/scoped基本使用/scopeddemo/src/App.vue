<template>
  <div class="main">
    <sona></sona>
    <!-- <sonb></sonb> -->
    <div class="sona">我是父组件</div>
  </div>
</template>

<script>
import sona from "./components/sona";
// import sonb from "./components/sonb";
export default {
  components: {
    sona
    // sonb
  }
};
</script>

<style scoped>
/* scoped能阻止该style里面的样式影响其它组件，
但是它也同样还是能作用于子组件的最外层那个元素 */

.main .sona {
  height: 300px;
  background-color: greenyellow;
}
/* .main .box {
  width: 50px;
} */
</style>


