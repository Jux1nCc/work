<template>
  <!-- 规范：
最大的父组件: App.vue
子组件集合：components文件夹
组件中套用其它组件
1:导入外部组件
 node :   let 名字=require(路径)    module.exports={}
 es6:    import 名字 from "路径"     export default {}
2：注册外部组件
   components:{
       组件名:导入时的组件名
   }
3：使用外部组件(当标签使用)  <组件名></组件名>
 -->
  <div class="app">
    <!-- 3：使用 -->
    <xxx></xxx>
  </div>
</template>
<script>
// 1：导入外部组件
import xxx from './components/son.vue'
export default {
  //2： 注册外部组件
  components: {
    // xxxooo: xxx
    xxx //xxx:xxx
  }
}
</script>
<style>
.app {
  width: 100%;
  height: 800px;
  border: 10px solid green;
  box-sizing: border-box;
}
</style>
