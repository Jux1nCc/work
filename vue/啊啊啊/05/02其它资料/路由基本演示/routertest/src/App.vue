<template>
  <div>
    <div>
      <a href="#/xxx">跳转至xxx</a>
    </div>
    <br />
    <a href="#/ooo">跳转至ooo</a>
    <!-- 路由的出口 搬运工
    <xxx></xxx>
    -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.ooo {
  color: blue;
}
</style>
