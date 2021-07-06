<template>
  <ul class="list">
    <li v-for="(item, index) in list" :key="index" @click="liClick(item.id)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    liClick (id) {
      //子传父  拿到父组件this  ====this.$parent    this.$parent.liClick(id)
      window.console.log(id)
      this.$parent.liClick(id)
    }
  }
}
</script>

<style></style>
