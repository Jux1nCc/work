<template>
  <!-- html  css js 
tempolate包住的就是html部分
注意：要有一个标签包住
-->
  <div class="main">
    <div class="box">123456</div>
    <div>{{ num }}</div>
  </div>
</template>
<script>
/*  js      
new Vue({
    el:"确定使用范围",
    data:{}
})
export default后面对象就等效于new Vue里面的对象
1：不用写el了，因为template就是我们vue使用范围
2:data必须是一个function 再return 一个对象
*/

export default {
  data () {
    return {
      num: '这是一个寂寞的天'
    }
  },
  methods: {
    test () {
      alert('test')
    }
  },
  mounted () {
    this.test()
  }
}
</script>
<style>
/* 导入外部css */
/* css
导入外部css:  @import url(路径(尽量都写一下./    ../上一层))
 */
@import url(./main.css);
.box {
  width: 300px;
  height: 300px;
  background-color: #f00;
}
</style>
