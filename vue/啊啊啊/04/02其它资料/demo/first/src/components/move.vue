<template>
  <div class="player_con">
    <img
      src="../assets/images/player_bar.png"
      class="play_bar "
      :class="{ playing: playing }"
    />
    <!-- 黑胶碟片 -->
    <img
      src="../assets/images/disc.png"
      class="disc autoRotate "
      :class="{ playing: playing }"
    />
    <img :src="cover" class="cover autoRotate " :class="{ playing: playing }" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      playing: false,
      cover: require('../assets/images/cover.png')
    }
  }
}
</script>

<style></style>
