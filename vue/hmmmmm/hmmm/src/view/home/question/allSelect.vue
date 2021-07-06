<template>
  <div>
    <div v-if="form.type == 1">1111</div>
    <div v-if="form.type == 2">2222</div>
    <div v-if="form.type == 3">3333</div>
  </div>
</template>

<script>
export default {
  props: {
    form: Array
  }
};
</script>

<style>
</style>