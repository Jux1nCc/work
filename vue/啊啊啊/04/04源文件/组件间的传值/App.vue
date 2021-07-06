<template>
  <!--父子组件传值 
  父：App
  子：son
  1:父传子
     a:在子组件标签身上定义一个ref属性  ref=值
     b:拿到子组件身上的this===this.$refs.值
  2：子传父
     a:拿到父组件this   ====  this.$parent
   -->
  <div class="app">
    <button @click="AppClick">我要传值给son组件</button>
    <p>{{ appMsg }}</p>
    <son ref="son"></son>
  </div>
  <!-- 组件套用组件
  1：导入
  2：注册  components:{}
  3:使用  
   -->
</template>
<script>
import son from './components/son'
export default {
  data () {
    return {
      appMsg: '我是父组件'
    }
  },
  components: {
    son
  },
  methods: {
    AppClick () {
      //修改子组件里面的msg
      this.$refs.son.msg = '这是父组件修改的：' + Math.random() * 999
      window.console.log(this.$refs.son)
    },
    alertEvent (msg) {
      alert(msg)
    }
  }
}
</script>
<style>
.app {
  width: 900px;
  height: 700px;
  border: 10px solid green;
}
</style>
