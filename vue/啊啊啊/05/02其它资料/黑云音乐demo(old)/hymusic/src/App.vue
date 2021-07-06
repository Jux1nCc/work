<template>
  <div id="player">
    <h2 class="title">黑云音乐</h2>
    <div class="search">
      <input type="text" v-model="inputValue" @keyup.enter="search" />
      <button @click="search">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    search () {
      this.$router.push('/results?searchVal=' + this.inputValue)
    }
  }
}
</script>

<style>
@import url(./assets/css/index.css);
@import url(./assets/css/iconfont.css);
</style>
