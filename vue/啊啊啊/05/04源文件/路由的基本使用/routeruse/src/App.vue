<template>
  <div>
    <a href="#/xxx">跳转至xxx</a>
    <br />
    <a href="#/ooo">跳转至ooo</a>
    <button @click="btnClick">点我啊</button>
    <!-- 路由出口，搬运工：看到什么路由地址了，就搬动相应组件过来 -->
    <router-view></router-view>
    <!-- <ccc></ccc> -->
  </div>
</template>

<script>
// import ccc from './components/ccc'
export default {
  components: {
    // ccc
  },
  methods: {
    btnClick () {
      window.console.log(this.$refs.son)
    }
  }
}
</script>

<style></style>
