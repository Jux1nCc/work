<template>
  <!-- 分析
1：实现搜索功能
   input  v-model   @keyup.enter="搜索事件"
   搜索事件 调用axios获取歌曲列表 （1：装包  2：导入3:使用） 
2:渲染列表（列表抽取出来成单独组件） 
  a:完成列表组件抽离
     创建列表组件
     在App.vue中导入列表组件（导入，注册，使用）
     列表组件数据通过父传传递过来（1：在列表组件标签上加一个ref2:通过this.$refs.值） 
3:点击列表歌曲播放音乐，同时，实现动画部分
  li来一个点击事件，点击后获取歌曲url,并传递到audio的src身上
  点击列表调用App.vue方法并传递id，让app.vue获取歌曲url
  子传父（this.$parent）
  播放暂停的控制
  歌曲播放时，动画就动
  歌曲暂停时，动画暂停
  audio  play  pause 
  图片获取：调用axios获取图片并渲染
4:评论功能
  调用接口获取评论。渲染评论
 -->
  <div class="wrap">
    <div class="play_wrap" id="player">
      <div class="search_bar">
        <img src="./assets/images/player_title.png" alt="" />
        <input type="text" v-model="inputValue" @keyup.enter="search" />
      </div>
      <div class="center_con">
        <!-- 列表组件 -->
        <songs ref="songs"></songs>
        <div class="player_con">
          <img
            src="./assets/images/player_bar.png"
            class="play_bar "
            :class="{ playing: playing }"
          />
          <!-- 黑胶碟片 -->
          <img
            src="./assets/images/disc.png"
            class="disc autoRotate "
            :class="{ playing: playing }"
          />
          <img
            :src="picUrl"
            class="cover autoRotate "
            :class="{ playing: playing }"
          />
        </div>
        <!-- 评论组件 -->
        <comment ref="comment"></comment>
      </div>
      <div class="audio_con">
        <audio
          @play="playing = true"
          @pause="playing = false"
          :src="musicUrl"
          controls
          autoplay
          loop
          class="myaudio"
        ></audio>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import songs from './components/songs.vue'
import comment from './components/comment.vue'
export default {
  components: {
    songs,
    comment
  },
  data () {
    return {
      inputValue: '',
      musicUrl: '',
      playing: false,
      picUrl: require('./assets/images/cover.png')
    }
  },
  methods: {
    search () {
      axios({
        url: 'http://www.dongh5.com:9000/search?keywords=' + this.inputValue
      }).then(res => {
        this.$refs.songs.list = res.data.result.songs
        this.$nextTick(() => {
          this.$refs.songs.myscroll.refresh()
        })
      })
    },
    getMusicData (id) {
      // 获取歌曲url
      axios({
        url: 'http://www.dongh5.com:9000/song/url?id=' + id
      }).then(res => {
        this.musicUrl = res.data.data[0].url
        window.console.log(res.data.data[0].url)
      })
      // 获取 图片
      axios({
        url: 'http://www.dongh5.com:9000/song/detail?ids=' + id
      }).then(res => {
        this.picUrl = res.data.songs[0].al.picUrl
        window.console.log('歌曲图片:', res.data.songs[0].al.picUrl)
      })
      // 评论获取
      axios({
        url: 'http://www.dongh5.com:9000/comment/music?id=' + id
      }).then(res => {
        this.$refs.comment.list = res.data.hotComments
        window.console.log('评论数据', res.data.hotComments)
      })
    }
  }
}
</script>
<style>
body,
ul,
dl,
dd {
  margin: 0px;
  padding: 0px;
}

.wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url('./assets/images/bg.jpg') no-repeat;
  background-size: 100% 100%;
}

.play_wrap {
  width: 800px;
  height: 544px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -272px;
  /* background-color: #f9f9f9; */
}

.search_bar {
  height: 60px;
  background-color: #1eacda;
  overflow: hidden;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 11;
}

.search_bar img {
  margin-left: 23px;
}

.search_bar input {
  margin-right: 23px;
  width: 296px;
  height: 34px;
  border-radius: 17px;
  border: 0px;
  background: url('./assets/images/zoom.png') 265px center no-repeat
    rgba(255, 255, 255, 0.45);
  text-indent: 15px;
  outline: none;
}

.center_con {
  height: 435px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
}

.song_wrapper {
  width: 200px;
  height: 435px;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  background: url('./assets/images/line.png') right center no-repeat;
  position: relative;
  overflow: hidden;
}

.song_list li {
  font-size: 12px;
  color: #333;
  line-height: 36px;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.song_list .active {
  color: #da651e;
}

.player_con {
  width: 400px;
  height: 435px;
  position: relative;
}

.disc {
  position: absolute;
  left: 73px;
  top: 60px;
  z-index: 9;
}

.cover {
  position: absolute;
  left: 125px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 8;
}

.comment_list {
  width: 200px;
  height: 435px;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  background: url('./assets/images/line.png') left center no-repeat;
  overflow: auto;
  position: relative;
}

.comment_list dl {
  padding-left: 55px;
  position: relative;
  margin-bottom: 20px;
}

.comment_list dt {
  position: absolute;
  left: 4px;
  top: 0px;
}

.comment_list dt img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.comment_list dd {
  font-size: 12px;
}

.comment_list .name {
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}

.comment_list .detail {
  color: #666;
  margin-top: 5px;
  line-height: 18px;
}

.audio_con {
  height: 50px;
  background-color: #f1f3f4;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.myaudio {
  width: 800px;
  height: 40px;
  margin-top: 5px;
  outline: none;
  background-color: #f1f3f4;
}

/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}

/* 旋转的类名 */
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
}

/* 是否正在播放 */
.playing {
  animation-play-state: running;
}

.play_bar {
  position: absolute;
  left: 200px;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}

/* 播放杆 转回去 */
.play_bar.playing {
  transform: rotate(0);
}
</style>
