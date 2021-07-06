<template>
  <div id="app" class="box">
    <Cell @click='onClickCell(0,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(1,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(2,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(3,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(4,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(5,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(6,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(7,$event)' :n='n' :isOver='isOver' :result='result'/>
    <Cell @click='onClickCell(8,$event)' :n='n' :isOver='isOver' :result='result'/>
    <div class="refresh" @click='reload'>重新开始</div>
    <div v-if="isOver" class="over">游戏结束 : {{result}}</div>
  </div>
</template>

<script>
import Cell from './components/Cell.vue'

export default {
  name: 'App',
  components: {
    Cell
  },
  data(){
    return {
      n:1,
      result:'',
      isOver:false,
      arr:[null,null,null,null,null,null,null,null,null,]
    }
  },
  methods: {
    onClickCell(i,msg){
      this.n++
      this.arr[i] = msg
      this.tell(this.arr)
    },
    tell(arr){
      if(arr[0] != null && arr[0] == arr[1] && arr[0] == arr[2]){
        this.result = '胜方为'+arr[0]
        this.isOver = true
      }else if(arr[0] != null && arr[0] == arr[3] && arr[0] == arr[6]){
        this.result = '胜方为'+arr[0]
        this.isOver = true
      }else if(arr[0] != null && arr[0] == arr[4] && arr[0] == arr[8]){
        this.result = '胜方为'+arr[0]
        this.isOver = true
      }else if(arr[1] != null && arr[1] == arr[4] && arr[1] == arr[7]){
        this.result = '胜方为'+arr[1]
        this.isOver = true
      }else if(arr[2] != null && arr[2] == arr[5] && arr[2] == arr[8]){
        this.result = '胜方为'+arr[2]
        this.isOver = true
      }else if(arr[2] != null && arr[2] == arr[4] && arr[2] == arr[6]){
        this.result = '胜方为'+arr[2]
        this.isOver = true
      }else if(arr[3] != null && arr[3] == arr[4] && arr[3] == arr[5]){
        this.result = '胜方为'+arr[3]
        this.isOver = true
      }else if(arr[6] != null && arr[6] == arr[7] && arr[6] == arr[8]){
        this.result = '胜方为'+arr[6]
        this.isOver = true
      }else if(!arr.includes(null)){
        this.result = '平局'
        this.isOver = true
      }
    },
    reload(){
      location.reload()
    }
  },
}
</script>

<style>
.box {
  width: 306px;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
}
#cell{
  border: 1px solid #00a;
  background-color: rgba(0,0,255,0.1);
  color: #00a;
}
.refresh, .over{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 102px;
  height: 30px;
  color: #00a;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #00a;
  background-color: rgba(0,0,255,0.1);
}
</style>
