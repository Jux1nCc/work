webpackJsonp([21], {
    0: function (e, exports, t) {
        "use strict";
        t(1);
        var a = t(327),
            s = t(495),
            o = t(496),
            r = t(499),
            n = t(548),
            i = t(549),
            l = t(550),
            c = window.__data__ || {};
        a.render(s.createElement("div", {
            className: "com-body"
        }, s.createElement("div", {
            className: "com-main-wrap"
        }, s.createElement("div", {
            className: "com-main"
        }, s.createElement(l, {
            data: c
        })))), document.getElementById("body-wrap"))
    }, 539: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = t(497),
            o = a.createClass({
                displayName: "AuthorInfo",
                download: function () {
                    this.props.popQR()
                }, getPhotoUrl: function (e) {
                    var t = {};
                    return e.share_info ? (e.share_info || "").split("&").forEach(function (e) {
                        var a = e.split("=");
                        t[a[0]] = a[1]
                    }) : t = e, "/photo/" + (t.userId || "") + "/" + (t.photoId || "") + "/"
                }, render: function () {
                    var e = this,
                        t = this.props.data.counts.fanCount,
                        o = this.props.data.counts.followCount,
                        r = this.props.data.counts.photoCount || 1,
                        n = this.props.user.userId,
                        i = this.props.user.kwaiId,
                        l = this.props.user.userName,
                        c = this.props.user.headurl || this.props.user.headUrls && this.props.user.headUrls[0] && this.props.user.headUrls[0].url,
                        m = 0,
                        p = Object.assign({
                            app_seduce_download: "想看我更多作品？马上下载兔聊吧",
                            kwai_id: "兔聊ID",
                            kwaiId: "兔聊号",
                            follower: "粉丝",
                            following: "关注",
                            common_photo: "作品"
                        }, this.props.language),
                        d = this.props.languageCode && "zh" !== this.props.languageCode;
                    return a.createElement("div", {
                        className: "info"
                    }, a.createElement("div", {
                        className: "total-info"
                    }, a.createElement("div", {
                        className: "img-wrap"
                    }, a.createElement("a", {
                        href: "/live/user/" + n
                    }, a.createElement("img", {
                        src: c,
                        height: "90",
                        width: "90"
                    }))), a.createElement("h2", {
                        dangerouslySetInnerHTML: {
                            __html: l
                        }
                    }), i ? a.createElement("p", null, p.kwaiId, ":", i) : a.createElement("p", null, p.kwai_id, ":", n), a.createElement("div", {
                        className: "down-wrap"
                    }, a.createElement("span", {
                        onClick: this.download
                    }, p.app_seduce_download)), a.createElement("div", {
                        className: "work-info"
                    })))
                }
            });
        e.exports = exports = o
    }, 548: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = a.createClass({
                displayName: "Header",
                render: function () {
                    var e = "https://play.google.com/store/apps/details?id=com.smile.gifmaker";
                    return "id" === this.props.languageCode && (e = "https://play.google.com/store/apps/details?id=com.kwai.mercury"), a.createElement("div", {
                        className: "header-wrap"
                    }, a.createElement("div", {
                        className: "header-main"
                    }, a.createElement("a", {
                        href: "//www.kwai.com",
                        className: "header-logo"
                    }, a.createElement("span", {
                        className: "logo-img"
                    }), a.createElement("span", {
                        className: "logo-text"
                    })), a.createElement("ul", {
                        className: "list"
                    }, a.createElement("li", {
                        className: "item"
                    }, a.createElement("a", {
                        href: "//www.kwai.com",
                        className: "intl" === this.props.keyword ? "nav active" : "nav"
                    }, this.props.language.app_name)), a.createElement("li", {
                        className: "item"
                    }, a.createElement("a", {
                        href: "/intl/about.html",
                        className: "about" === this.props.keyword ? "nav active" : "nav"
                    }, this.props.language.app_about_us)), a.createElement("li", {
                        className: "item"
                    }, a.createElement("a", {
                        href: "/intl/download.html",
                        className: "download" === this.props.keyword ? "nav active" : "nav"
                    }, this.props.language.app_free_download)))), this.props.isHome && a.createElement("div", {
                        className: "theme-wrap"
                    }, a.createElement("h1", null, this.props.language.app_name), a.createElement("h2", null, this.props.language.slogan)), this.props.isHome && a.createElement("div", {
                        className: "download-wrap"
                    }, a.createElement("a", {
                        "data-tagname": "kwai-download-ios",
                        href: "https://itunes.apple.com/app/id440948110",
                        target: "_blank",
                        className: "download download-ios"
                    }), a.createElement("a", {
                        "data-tagname": "kwai-download-android",
                        href: e,
                        target: "_blank",
                        className: "download download-android"
                    })))
                }
            });
        e.exports = s
    }, 549: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = a.createClass({
                displayName: "Footer",
                getInitialState: function () {
                    return {
                        contactObj: {
                            en: [{
                                name: "facebook",
                                url: "https://www.facebook.com/kwaiapp"
                            }, {
                                name: "mail",
                                url: "mailto:admin@kuaishou.com"
                            }],
                            ko: [{
                                name: "naver",
                                url: "http://blog.naver.com/kwai_korea"
                            }, {
                                name: "facebook",
                                url: "https://www.facebook.com/kwaikorea"
                            }],
                            id: [{
                                name: "facebook",
                                url: "https://www.facebook.com/kwaiappindonesia/"
                            }, {
                                name: "twitter",
                                url: "https://twitter.com/kwaiapp"
                            }],
                            ru: [{
                                name: "instagram",
                                url: "https://www.instagram.com/kwairussia/"
                            }, {
                                name: "vk",
                                url: "https://vk.com/kwairussia"
                            }],
                            th: [{
                                name: "facebook",
                                url: "https://www.facebook.com/Thailand.kwaiapp"
                            }, {
                                name: "youtube",
                                url: "https://www.youtube.com/channel/UCscFnpstZqqE4xXWIo6kdaQ"
                            }]
                        }
                    }
                }, render: function () {
                    var e = [],
                        t = this.props.data.languageCode;
                    e = t && this.state.contactObj[t] ? this.state.contactObj[t] : this.state.contactObj.en;
                    var s = 0;
                    return a.createElement("div", {
                        className: "footer-wrap"
                    }, a.createElement("div", {
                        className: "footer-main"
                    }, a.createElement("div", {
                        className: "list"
                    }, a.createElement("a", {
                        href: "/intl/about.html",
                        className: "about" === this.props.keyword ? "item active" : "item",
                        target: "_blank"
                    }, this.props.data.language.app_about_us), a.createElement("a", {
                        href: "/intl/protocol.html",
                        className: "protocol" === this.props.keyword ? "item active" : "item",
                        target: "_blank"
                    }, this.props.data.language.www_footer_legal)), a.createElement("div", {
                        className: "copyright"
                    }, "©2017 Kwai"), a.createElement("div", {
                        className: "social"
                    }, e.map(function (e) {
                        return a.createElement("a", {
                            className: e.name,
                            href: e.url,
                            target: "_blank",
                            key: s++
                        })
                    }))))
                }
            });
        e.exports = s
    }, 550: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = t(327),
            o = t(497),
            r = t(551),
            n = t(552),
            i = t(539),
            l = t(554),
            c = t(532),
            m = a.createClass({
                displayName: "Photo",
                propTypes: {
                    data: a.PropTypes.object
                },
                componentDidMount: function () {
                    s.render(a.createElement(c, {
                        keyword: "kwaiQR"
                    }), document.getElementById("react-component-wrap"))
                }, popQR: function () {
                    o.myEmitter.emit("showQR")
                }, render: function () {
                    var e = this,
                        t = 0;
                    return a.createElement("div", {
                        className: "photo-wrap"
                    }, a.createElement("div", {
                        className: "photo"
                    }, a.createElement(r, {
                        data: this.props.data,
                        popQR: this.popQR
                    }), a.createElement("div", {
                        className: "comment-area"
                    }, this.props.data.comments.map(function (s) {
                        return a.createElement(n, {
                            data: s,
                            key: t++,
                            language: e.props.data.language
                        })
                    }), a.createElement("div", {
                        className: "show-more-wrap"
                    }, a.createElement("span", {
                        className: "show-more",
                        onClick: this.popQR
                    }, this.props.data.language.www_comment_see_more)))), a.createElement("div", {
                        className: "info-wrap"
                    }, a.createElement(i, {
                        popQR: this.popQR,
                        data: this.props.data,
                        user: this.props.data.photo,
                        language: this.props.data.language,
                        languageCode: this.props.data.languageCode
                    }), a.createElement(l, {
                        language: this.props.data.language
                    })))
                }
            });
        e.exports = m
    }, 551: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = t(552),
            o = t(497),
            r = t(553),
            n = a.createClass({
                displayName: "Video",
                download: function () {
                    this.props.popQR()
                }, render: function () {
                    var e = this.props.data.photo.likeCount,
                        t = this.props.data.photo.viewCount,
                        n = this.props.data.photo.commentCount,
                        i = this.props.data.photo.forwardCount,
                        l = this.props.data.photo.coverUrls && this.props.data.photo.coverUrls[0] && this.props.data.photo.coverUrls[0].url,
                        c = this.props.data.mp4Url,
                        m = this.props.data.languageCode && "cn" !== this.props.data.languageCode;
                    return a.createElement("div", {
                        className: "video-wrap"
                    }, this.props.data.photo.singlePicture ? a.createElement("img", {
                        src: l,
                        width: 480,
                        height: this.props.data.photo.height / this.props.data.photo.width * 480
                    }) : a.createElement(r, {
                        src: c,
                        cover: l,
                        disclaimer: this.props.data.photo.disclaimerMessage,
                        height: this.props.data.photo.height,
                        width: this.props.data.photo.width
                    }))
                }
            });
        e.exports = exports = n
    }, 552: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = t(497),
            o = a.createClass({
                displayName: "Comment",
                render: function () {
                    var e = s.commentTimeFormat(this.props.data.timestamp, this.props.language),
                        t = this.props.data.headurl || this.props.data.headUrls && this.props.data.headUrls[0] && this.props.data.headUrls[0].url;
                    return a.createElement("img", {
                        className: "user-photo",
                        width: "50",
                        height: "50",
                        src: t
                    }), a.createElement("div", {
                        className: "user-words"
                    }, a.createElement("span", null, e)), a.createElement("div", {
                        className: "words"
                    }, a.createElement("p", {
                        dangerouslySetInnerHTML: {
                            __html: this.props.data.caption || this.props.data.content
                        }
                    }))
                }
            });
        e.exports = exports = o
    }, 553: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = (t(552), t(497)),
            o = a.createClass({
                displayName: "VideoFix",
                getInitialState: function () {
                    var e = s.timeFormat(0);
                    return {
                        hasPlayed: !1,
                        audioSilent: !1,
                        playVideo: !1,
                        audioLeft: 100,
                        videoLeft: 0,
                        currentTime: e,
                        lastVolume: 100,
                        lessThanIE10: !1,
                        onhover: !1
                    }
                }, componentDidMount: function () {
                    s.lessThanIE10() && this.setState({
                        lessThanIE10: !0
                    })
                }, stopVideo: function () {
                    var e = this.refs.video;
                    e.pause(), this.setState({
                        playVideo: !1
                    })
                }, playVideo: function () {
                    var e = this.refs.video;
                    e.play(), this.setState({
                        playVideo: !0
                    })
                }, silent: function () {
                    var e = this.refs.video;
                    e.muted = !0, this.setState({
                        audioSilent: !0,
                        audioLeft: 0,
                        lastVolume: e.volume
                    }), e.volume = 0
                }, unSilent: function () {
                    var e = this.refs.video;
                    e.muted = !1;
                    var t = this.state.lastVolume;
                    this.setState({
                        audioSilent: !1,
                        audioLeft: 100 * t
                    }), e.volume = t
                }, changeAudio: function (e) {
                    var t = e.target.getBoundingClientRect(),
                        a = e.clientX - t.left,
                        s = (a / e.target.offsetWidth).toFixed(2);
                    a < 5 && (s = 0, a = 0), this.setAudioProgress(s), this.setState({
                        audioLeft: a,
                        audioSilent: 0 === a
                    })
                }, setAudioProgress: function (e) {
                    var t = this.refs.video;
                    t.volume = Math.min(e, 1)
                }, changeVideo: function (e) {
                    var t = e.target.getBoundingClientRect(),
                        a = e.clientX - t.left,
                        s = (a / e.target.offsetWidth).toFixed(2);
                    this.setVideoProgress(s), this.setState({
                        videoLeft: a
                    })
                }, setVideoProgress: function (e) {
                    var t = this.refs.video;
                    e = Math.min(e, 1);
                    var a = s.timeFormatReverse(this.state.duration);
                    t.currentTime = Math.floor(e * a);
                    var o = s.timeFormat(Math.floor(e * a));
                    this.setState({
                        currentTime: o
                    })
                }, timeUpdate: function (e) {
                    var t = this.refs.video,
                        a = s.timeFormatReverse(this.state.currentTime),
                        o = Math.floor(t.currentTime);
                    if (Math.abs(o - a) >= 1) {
                        var r = s.timeFormat(o),
                            n = s.timeFormatReverse(this.state.duration);
                        this.setState({
                            currentTime: r,
                            videoLeft: o / n * 480
                        })
                    }
                }, durationChange: function (e) {
                    var t = this.refs.video,
                        a = Math.floor(t.duration);
                    a = s.timeFormat(a), this.setState({
                        duration: a
                    })
                }, mouseEnter: function () {
                    this.setState({
                        onhover: !0
                    })
                }, mouseLeave: function () {
                    this.setState({
                        onhover: !1
                    })
                }, onPlay: function () {
                    this.setState({
                        hasPlayed: !0,
                        playVideo: !0
                    }), window.ksLog ? window.ksLog.sendVideoPlayTiming() : window._ksLog_videoPlayTime = Date.now()
                }, onError: function () {
                    var e = {
                        event: "exception",
                        exceptionType: "VIDEO"
                    };
                    window.ksLog ? window.ksLog.sendAction(e) : (window._ksLog = window._ksLog || [], window._ksLog.push(e))
                }, render: function () {
                    var e = this.state,
                        t = "",
                        s = "",
                        o = "",
                        r = this.props.height,
                        n = this.props.width,
                        i = Math.round(r / n * 480),
                        l = "",
                        c = this.props.disclaimer && this.props.disclaimer.replace(/\n/g, "<br />");
                    this.props.disclaimer && (l = a.createElement("div", {
                        className: "b-disclaimer " + (this.state.lessThanIE10 ? "b-disclaimer-fix" : "")
                    }, a.createElement("i", {
                        className: "iconfont icon-error"
                    }), a.createElement("span", {
                        dangerouslySetInnerHTML: {
                            __html: c
                        }
                    }))), t = this.state.audioSilent ? a.createElement("i", {
                        className: "iconfont icon-sound-close",
                        onClick: this.unSilent
                    }) : a.createElement("i", {
                        className: "iconfont icon-sound-open",
                        onClick: this.silent
                    }), s = this.state.playVideo ? a.createElement("i", {
                        className: "iconfont icon-video-stop",
                        onClick: this.stopVideo
                    }) : a.createElement("i", {
                        className: "iconfont icon-video-play",
                        onClick: this.playVideo
                    });
                    var m;
                    return m = e.hasPlayed ? e.onhover ? "control-layer" : "control-layer hide" : "control-layer", o = this.state.lessThanIE10 ? a.createElement("div", {
                        className: "video"
                    }, a.createElement("video", {
                        poster: this.props.cover,
                        height: i,
                        width: "480",
                        autoPlay: !0,
                        loop: "loop",
                        preload: "auto",
                        ref: "video",
                        controls: "controls",
                        onPlay: this.onPlay,
                        onError: this.onError
                    }, a.createElement("source", {
                        src: this.props.src,
                        type: "video/mp4"
                    })), l) : a.createElement("div", {
                        className: "video",
                        onMouseEnter: this.mouseEnter,
                        onMouseLeave: this.mouseLeave
                    }, a.createElement("video", {
                        src: this.props.src,
                        autoPlay: !0,
                        loop: "loop",
                        poster: this.props.cover,
                        height: i,
                        ref: "video",
                        width: "480",
                        preload: "auto",
                        onTimeUpdate: this.timeUpdate,
                        onDurationChange: this.durationChange,
                        onPlay: this.onPlay,
                        onError: this.onError
                    }), l, a.createElement("div", {
                        className: m
                    }, a.createElement("div", {
                        className: "progress",
                        onClick: this.changeVideo
                    }, a.createElement("div", {
                        className: "progressing",
                        style: {
                            width: this.state.videoLeft
                        }
                    })), a.createElement("div", {
                        className: "opt"
                    }, a.createElement("div", {
                        className: "stop-wrap"
                    }, s, a.createElement("span", {
                        className: "curr-time"
                    }, this.state.currentTime), a.createElement("span", {
                        className: "total-time"
                    }, " / "), a.createElement("span", {
                        className: "total-time"
                    }, this.state.duration)), a.createElement("div", {
                        className: "audio-wrap"
                    }, t, a.createElement("div", {
                        className: "audio-progress",
                        onClick: this.changeAudio
                    }, a.createElement("div", {
                        className: "audio-progressing",
                        style: {
                            width: this.state.audioLeft
                        }
                    }, a.createElement("span", {
                        className: "corner"
                    }))))))), a.createElement("div", null, o)
                }
            });
        e.exports = exports = o
    }, 554: function (e, exports, t) {
        "use strict";
        var a = t(495),
            s = a.createClass({
                displayName: "Pic",
                render: function () {
                    return a.createElement("div", {
                        className: "logo-qr"
                    }, a.createElement("span", {
                        className: "logo"
                    }), a.createElement("div", {
                        className: "qr-wrap"
                    }, a.createElement("span", {
                        className: "qr"
                    }), a.createElement("span", {
                        className: "qr-desc"
                    }, this.props.language.www_home_theme_qr)))
                }
            });
        e.exports = exports = s
    }
});