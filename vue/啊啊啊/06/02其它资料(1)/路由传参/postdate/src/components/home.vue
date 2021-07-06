<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "我是home页"
    };
  },
  created() {
    //当前的路由信息
    window.console.log(this.$route);
    this.msg = this.$route.query.msg;
  }
};
</script>

<style>
</style>