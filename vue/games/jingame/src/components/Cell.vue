<template>
  <div id="cell" @click="isClick">
    <template v-if="a">{{msg}}</template>
    <template v-else></template>
  </div>
</template>

<script>

export default {
  props:['n','result','isOver'],
  name: 'Cell',
  data(){ 
    return {
      a:false,
      msg:''
    }
  },
  methods: {
    isClick(){
      if(this.msg !== ''){
        return
      }
      if(this.isOver){
        alert(`游戏结束 : 胜方为${this.result}`)
        return
      }
      this.a = true
      this.msg = this.n % 2 == 0 ? 'o' : 'x'
      this.$emit('click',this.msg)
    }
  },
}
</script>

<style>
#cell{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  font-size: 30px;
}
</style>
