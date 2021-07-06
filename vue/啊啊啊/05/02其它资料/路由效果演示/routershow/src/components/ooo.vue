<template>
  <div class="ooo">{{info}}</div>
</template>

<script>
export default {
  data() {
    return {
      info: "我是ooo组件"
    };
  }
};
</script>

<style>
.ooo {
  width: 100%;
  height: 100px;
  background-color: #f00;
}
</style>