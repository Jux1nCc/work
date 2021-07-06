<template>
  <!-- style里面的样式不管是父组件还是子组件它都是全局的
如果在style里面加了scoped它就变私有样式了,但是它会影响到子组件最外层（我们能看到的都可以影响到）
不加scoped都是全局样式
 -->
  <div>
    <div class="box">我是父组件</div>
    <hr />
    <son></son>
  </div>
</template>
<script>
import son from './components/son'
export default {
  components: {
    son
  }
}
</script>
<style scoped>
.xxx {
  width: 900px;
  height: 900px;
  border: 10px solid green;
}
.box2 {
  width: 200px;
  height: 200px;
  background-color: #00f;
}
</style>
