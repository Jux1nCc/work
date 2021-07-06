<template>
  <div class="pageA">
    {{ msg }}
    <p>id:{{ id }}</p>
    <p>xxx:{{ xxx }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '我是pageA页面',
      id: this.$route.query.id,
      xxx: this.$route.query.xxx
    }
  },
  created () {
    this.msg = this.$route.query.id
    // window.console.log(this.$route.query.)
  }
}
</script>
<style>
.pageA {
  width: 500px;
  height: 500px;
  background-color: #f00;
}
</style>
