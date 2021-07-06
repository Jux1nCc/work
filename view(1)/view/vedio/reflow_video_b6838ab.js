//define("pagelet/reflow_video/reflow_video",["require","exports","module"],function(require,exports,module){var DETAIL=function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<div class="video-container">\n    <div class="poster-page" style="width: '+(null==(__t=data.posterPageW)?"":__t)+";height: "+(null==(__t=data.posterPageH)?"":__t)+"; margin-top: "+(null==(__t=data.posterPageMt)?"":__t)+';">\n        <a class="poster-link" href="javascript:;">\n            <div class="img-wrap">\n                <img class="poster-image" alt="" src="'+(null==(__t=data.video.cover.url_list[0])?"":__t)+'" onerror="this.src=\''+(null==(__t=data.video.cover.url_list[0])?"":__t)+'\'" />\n            </div>\n            <div class="play-btn"></div>\n        </a>\n        <div class="player-container" data-src="'+(null==(__t=data.video.url_list[0])?"":__t)+'" data-poster-src="'+(null==(__t=data.video.cover.url_list[0])?"":__t)+'"></div>\n    </div>\n</div>\n<div class="right-box">\n    <div class="user-area clearfix">\n        <div class="avatar">\n            <span class="span-avatar"><img src="'+(null==(__t=data.author.avatar_thumb.url_list[0])?"":__t)+'" alt=""></span>\n        </div>\n        <div class="info">\n            <p class="nickname">'+(null==(__t=_.escape(data.author.nickname))?"":__t)+'</p>\n            <!-- <p class="text">'+(null==(__t=data.stats.play_count)?"":__t)+'次播放</p> -->\n        </div>\n    </div>\n    <div class="qrcode-wrap">\n        <p class="title">【扫码下载火山小视频，观看TA的视频】</p>\n        <div class="qrcode">\n            <p class="qrcode-img"></p>\n        </div>\n    </div>\n</div>';return __p};module.exports=Pagelet.extend({el:"#pageletReflowVideo",events:{},channels:{},init:function(t){var a=this;if(!t.data.id)if(t.data.user_id){var e=5,i=null,s=function(){return 0==e?(clearTimeout(i),void(location.href="/share/user/"+t.data.user_id+"/"+location.search)):(a.$dom.countText.text(e),e--,void(i=setTimeout(s,1e3)))};s()}else a.$dom.skipText.css("visibility","hidden");if(t.data&&t.data.id){var r=t.data;r.posterPageW=r.video.width,r.posterPageH=r.video.height,r.posterPageMt=0;var d=0;if(r.video.height&&r.video.width&&(d=r.video.height/r.video.width),videoArea=320,d){var n=videoArea,o=Math.ceil(d*n);r.posterPageW=n+"px",r.posterPageH=o+"px",r.posterPageMt=-o/2+"px"}this.$el.append(DETAIL({data:r})),this.doBind()}},doBind:function(){var t=null;$(this.el).on("click",".poster-page",function(a){if($(a.target).hasClass("upload-video"))return void(t.paused||t.pause());var e=$(this),i=e.find(".poster-link"),s=e.parent().find(".player-container"),r=(e.find(".poster"),s.data("src"),s.data("posterSrc"),$("<video>",{"class":"upload-video",src:s.data("src"),poster:s.data("posterSrc"),type:"video/mp4",controls:"true",width:"100%"}));s.empty().append(r).show(),r[0].play(),i.hide(),t=r[0]}),$(this.$el).on("contextmenu","video",function(){return!1})}})});

define("pagelet/reflow_video/reflow_video",["require","exports","module"],function(require, exports, module) {
    var DETAIL = function(obj) {
        {
            var __t, __p = "";
            Array.prototype.join
        }
        with(obj || {}) __p += '<div class="video-container">\n    <div class="poster-page" style="width: ' + (null == (__t = data.posterPageW) ? "": __t) + ";height: " + (null == (__t = data.posterPageH) ? "": __t) + "; margin-top: " + (null == (__t = data.posterPageMt) ? "": __t) + ';">\n        <a class="poster-link" href="javascript:;">\n            <div class="img-wrap">\n                <img class="poster-image" alt="" src="' + (null == (__t = data.video.cover.url_list[0]) ? "": __t) + '" onerror="this.src=\'' + (null == (__t = data.video.cover.url_list[0]) ? "": __t) + '\'" />\n            </div>\n            <div class="play-btn"></div>\n        </a>\n        <div class="player-container" data-src="' + (null == (__t = data.video.url_list[0]) ? "": __t) + '" data-poster-src="' + (null == (__t = data.video.cover.url_list[0]) ? "": __t) + '"></div>\n    </div>\n</div>\n<div class="right-box">\n    <div class="user-area clearfix">\n        <div class="avatar">\n            <span class="span-avatar"><img src="' + (null == (__t = data.author.avatar_thumb.url_list[0]) ? "": __t) + '" alt=""></span>\n        </div>\n        <div class="info">\n            <p class="nickname">' + (null == (__t = _.escape(data.author.nickname)) ? "": __t) + '</p>\n            <!-- <p class="text">' + (null == (__t = data.stats.play_count) ? "": __t) + '次播放</p> -->\n        </div>\n    </div>\n    <div class="qrcode-wrap">\n       <p class="title">【扫码下载火山小视频2，观看TA的视频】</p>\n        <div class="qrcode">\n            <p class="qrcode-img"></p>\n        </div>\n    </div>\n</div>';return __p
    };
    module.exports = Pagelet.extend({
        el: "#pageletReflowVideo",
        events: {},
        channels: {},
        init: function(t) {
            var a = this;
            if (!t.data.id) if (t.data.user_id) {
                var e = 5,
                i = null,
                s = function() {
                    return 0 == e ? (clearTimeout(i), void(location.href = "/share/user/" + t.data.user_id + "/" + location.search)) : (a.$dom.countText.text(e), e--, void(i = setTimeout(s, 1e3)))
                };
                s()
            } else a.$dom.skipText.css("visibility", "hidden");
            if (t.data && t.data.id) {
                var r = t.data;
                r.posterPageW = r.video.width,
                r.posterPageH = r.video.height,
                r.posterPageMt = 0;
                var d = 0;
                if (r.video.height && r.video.width && (d = r.video.height / r.video.width), videoArea = 320, d) {
                    var n = videoArea,
                    o = Math.ceil(d * n);
                    r.posterPageW = n + "px",
                    r.posterPageH = o + "px",
                    r.posterPageMt = -o / 2 + "px"
                }
                this.$el.append(DETAIL({
                    data: r
                })),
                this.doBind()
            }
        },
        doBind: function() {
            var t = null;
            $(this.el).on("click", ".poster-page",
            function(a) {
                if ($(a.target).hasClass("upload-video")) return void(t.paused || t.pause());
                var e = $(this),
                i = e.find(".poster-link"),
                s = e.parent().find(".player-container"),
                r = (e.find(".poster"), s.data("src"), s.data("posterSrc"), $("<video>", {
                    "class": "upload-video",
                    src: s.data("src"),
                    poster: s.data("posterSrc"),
                    type: "video/mp4",
                    controls: "true",
                    width: "100%"
                }));
                s.empty().append(r).show(),
                r[0].play(),
                i.hide(),
                t = r[0]
            }),
            $(this.$el).on("contextmenu", "video",
            function() {
                return ! 1
            })
        }
    })
}
);