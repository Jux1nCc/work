<template>
  <div class="pageB">
    {{ msg }}
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'pageB'
    }
  }
}
</script>
<style>
.pageB {
  width: 900px;
  height: 900px;
  background-color: #00f;
}
</style>
