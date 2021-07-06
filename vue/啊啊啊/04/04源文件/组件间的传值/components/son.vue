<template>
  <div class="son">
    {{ msg }}
    <br />
    <button @click="sonClick">我要传值给父组件</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '我是son子组件',
      xxx: 123456
    }
  },
  methods: {
    sonClick () {
      this.$parent.appMsg = '这是son子组件修改的:' + Math.random() * 999
      this.$parent.alertEvent('这是一个寂寞的天')
      window.console.log(this.$parent)
    }
  }
}
</script>
<style>
.son {
  width: 500px;
  height: 500px;
  background-color: #f00;
}
</style>
