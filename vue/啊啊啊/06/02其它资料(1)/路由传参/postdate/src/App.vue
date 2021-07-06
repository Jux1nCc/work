<template>
  <div id="app">
    <input type="text" v-model="msg" />
    <button @click="btnClick">至home</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: ""
    };
  },
  components: {},
  methods: {
    btnClick() {
      // 传参
      this.$router.push("/home?msg=" + this.msg);
    }
  }
};
</script>

<style>
</style>
