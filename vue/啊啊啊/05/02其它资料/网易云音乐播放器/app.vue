<template>
  <div class="wrap">
    <div class="play_wrap" id="player">
      <div class="search_bar">
        <img src="./images/player_title.png" alt />
        <input type="text" v-model="inputValue" @keyup.enter="search" />
      </div>
      <div class="center_con">
        <!-- 歌曲列表 -->
        <list ref="list"></list>
        <!-- 歌曲动画部分 -->
        <div class="player_con">
          <img src="./images/player_bar.png" class="play_bar" :class="{playing:playing}" />
          <!-- 黑胶碟片 -->
          <img src="./images/disc.png" class="disc autoRotate" :class="{playing:playing}" />
          <img :src="cover" class="cover autoRotate" :class="{playing:playing}" />
        </div>
        <!-- 歌曲评论部分 -->
        <comment ref="comment"></comment>
      </div>
      <div class="audio_con">
        <!-- 通过audio事件控制动画播放与暂停   
         play是audio标签自带的播放事件
         pause是audio标签的暂停事件
        -->
        <audio
          @play="playing=true"
          @pause="playing=false"
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
/*流程：
1. 创建app.vue，将html里面的布局移入app.vue，实现基本样式
2. 完成搜索功能
   1. input框v-model绑定，同时@keyup.enter绑定搜索事件
   2. 搜索事件调用axios
      1. 安装 axios 
      2. app.vue中导入axios
      3. 在搜索事件中调用axios获取歌曲列表
   3. 将歌曲列表抽离成组件
      1. 在components里创建一个列表组件
      2. 在app.vue中导入列表组件
      3. 注册列表组件
      4. 在html相应位置放入列表组件
   4. 通过父子传值将搜索事件中的列表数据传入列表组件 
   5. 实现歌曲播放功能
      1. 在歌曲列表里绑定事件，传入歌曲id
      2. 在app.vue中写方法调用axios获取歌曲url
      3. 在歌曲列表中调用app.vue中的方法
      4. 将歌曲获得的url绑定到audio上
   6. 实现中间动画部分功能
      1. 动画播放是通过控制 playing的class去控制的
      2. 所以在获取歌曲url后，动画就应该立马播放，所以通过v-bind控制playing为true
      3. audio有二个事件也需要控制 动画，
         1. play播放状态时，
         2. pause暂停状态时
   7. 完成评论组件
      1.获取 歌曲url的同时调用评论接口
      2。通过axios得到评论数据
      3。传递给comment组件
      4。在comment组件里面渲染出相应的数据
      5。使用iscroll完成滚动功能
      */

// 导入axios
import axios from "axios";
// 导入列表组件
import list from "./components/list.vue";
import comment from "./components/comment.vue";
import coverImg from "./images/cover.png";
export default {
  // 注册组件
  components: {
    list,
    comment
  },
  data() {
    return {
      cover: coverImg,
      inputValue: "", //搜索框的值
      musicUrl: "", //音乐的url
      playing: false //播放状态控制
    };
  },
  methods: {
    //   搜索出相应的歌曲列表
    search() {
      axios({
        url: " http://183.237.67.218:3000/search?keywords=" + this.inputValue
      }).then(res => {
        //   获取子组件歌曲list组件this，给子组件传递歌曲列表
        this.$refs.list.songs = res.data.result.songs;
        //要在这里刷新iscroll,由于上面数据渲染到页面是需要时间的，所以加nextTick处理
        this.$nextTick(() => {
          this.$refs.list.refreshIscroll();
        });
        window.console.log(res.data.result.songs);
      });
    },

    getUrl(id) {
      // 获取歌曲url
      axios({
        url: "http://183.237.67.218:3000/song/url?id=" + id
      }).then(res => {
        //   拿到歌曲url
        this.musicUrl = res.data.data[0].url;
        // 控制播放状态
        this.playing = true;
        window.console.log(res.data.data[0].url);
      });
      // 得到歌曲图片
      axios({
        url: "http://183.237.67.218:3000/song/detail?ids=" + id
      }).then(res => {
        this.cover = res.data.songs[0].al.picUrl;
        window.console.log("歌曲图片地址：", res.data.songs[0].al.picUrl);
      });
      // 得到评论列表
      axios({ url: "http://183.237.67.218:3000/comment/music?id=" + id }).then(
        res => {
          this.$refs.comment.list = res.data.comments;
          this.$nextTick(() => {
            this.$refs.comment.refreshComment();
          });
          window.console.log(res.data.comments);
        }
      );
    }
  }
};
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
  background: url("images/bg.jpg") no-repeat;
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
  background: url("images/zoom.png") 265px center no-repeat
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
  background: url("images/line.png") right center no-repeat;
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
  background: url("images/line.png") left center no-repeat;
  overflow: hidden;
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