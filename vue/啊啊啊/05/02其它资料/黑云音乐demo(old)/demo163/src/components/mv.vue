<template>
  <div class="video" v-if="mvInfo!=''">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{mvInfo.name}}</span>
      <span class="artist">{{mvInfo.artists | filterArtists}}</span>
    </div>
    <video :src="mvInfo.brs | filterBrs" controls></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mvInfo: ""
    };
  },
  filters: {
    filterBrs(brs) {
      let _k = 0;
      for (let key in brs) {
        if (_k < key) {
          _k = key;
        }
      }
      return brs[_k];
    },
    filterArtists(artists) {
      let _arr = [];
      for (var i = 0; i < artists.length; i++) {
        _arr.push(artists[i].name);
      }
      return _arr.join(" | ");
    }
  }
};
</script>
<style>
</style>