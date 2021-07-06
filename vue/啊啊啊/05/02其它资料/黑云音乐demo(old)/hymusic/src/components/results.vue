<template>
  <div class="result-wrapper">
    <div
      class="song"
      v-for="(item, index) in list"
      :key="index"
      @dblclick="goComment(item.id)"
    >
      <div class="name">
        <span class="iconfont icon-play" @click="goPlayer(item.id)"></span>
        {{ item.name }}
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid != 0"
          @click="$router.push('/mv?mvid=' + item.mvid)"
        ></span>
      </div>
      <div class="singer">{{ item.artists | filterAr }}</div>
      <div class="album">《{{ item.album.name }}》</div>
      <div class="time">{{ item.duration | formatTime }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  data () {
    return {
      list: []
    }
  },
  watch: {
    '$route.query.searchVal' () {
      this.getData()
    }
  },
  filters: {
    filterAr (val) {
      return val
        .map(item => {
          return item.name
        })
        .join('&')
    },
    formatTime (val) {
      return moment(val).format('mm:ss')
    }
  },
  methods: {
    getData () {
      axios({
        url: 'search?keywords=' + this.$route.query.searchVal
      }).then(res => {
        this.list = res.data.result.songs
        window.console.log(res)
      })
    },
    goPlayer (id) {
      this.$router.push('/player?id=' + id)
    },
    goComment (id) {
      this.$router.push('/comment?id=' + id)
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style></style>
