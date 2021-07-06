<template>
  <table class="table">
    <tr>
      <th>音乐标题</th>
      <th>歌手</th>
      <th>专辑</th>
      <th>时长</th>
    </tr>
    <tr
      v-for="(item, index) in list"
      :key="index"
      @click="goAudioPlay(item.id)"
    >
      <td>
        <div class="item-tr">
          <span class="index">{{ index + 1 }}</span>
          <img class="table-img" :src="item.picUrl" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </td>
      <td>{{ item.song.artists | filterAr }}</td>
      <td>{{ item.song.album.name }}</td>
      <td>{{ item.song.duration | filterTime }}</td>
    </tr>
  </table>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      list: [],
      type: 'mp3'
    }
  },
  filters: {
    filterAr (arr) {
      return arr
        .map(item => {
          return item.name
        })
        .join(' & ')
    },
    filterTime (num) {
      return moment(num).format('mm:ss')
    }
  },
  methods: {
    goAudioPlay (id) {
      // 歌曲跳转
      if (this.type == 'mp3') {
        this.$router.push('/audioPlay?id=' + id)
      } else {
        this.$router.push('/mvPlay?id=' + id)
      }
      // mv跳转
    }
  }
}
</script>
<style>
.table {
  width: 100%;
}
.table-img {
  width: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
.index {
  width: 60px;
}
.item-tr {
  display: flex;
  align-items: center;
}
</style>
