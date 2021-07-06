
define("lib/smoothScroll", [], function () {
        var e = function (e) {
            return 1 - (1 - e) * (1 - e)
        };
        return function (t, i) {
            if (!(i < 0)) {
                var n = $(window).scrollTop(),
                    o = Date.now(),
                    r = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.setTimeout;
                r(function s() {
                    var a = Date.now() - o;
                    a < i ? r(s, 12) : a = i;
                    var c = n + (t - n) * e(a / i);
                    window.scrollTo(0, c)
                }, 12)
            }
        }
    }), define("lib/util", [], function () {
        function e(e, t) {
            if ("object" != typeof e) return "";
            var i = [];
            for (var n in e) e.hasOwnProperty(n) && (t ? i.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n])) : i.push(n + "=" + e[n]));
            return i.join("&")
        }

        function t(e, t, i, n, o) {
            function r() {
                if (--t > 0) {
                    var o = a.replace("${0}", t);
                    e.text(o), setTimeout(r, 1e3)
                } else i && e.removeClass(i), e.html(s), n && n()
            }
            var s = e.html();
            t = parseInt(t, 10), i && e.addClass(i);
            var a = o || "${0}s";
            return r(),
                function () {
                    t = 0
                }
        }

        function i(e) {
            if (!e) return !1;
            e = e.toUpperCase();
            var t = e,
                i = {
                    11: "北京",
                    12: "天津",
                    13: "河北",
                    14: "山西",
                    15: "内蒙古",
                    21: "辽宁",
                    22: "吉林",
                    23: "黑龙江",
                    31: "上海",
                    32: "江苏",
                    33: "浙江",
                    34: "安徽",
                    35: "福建",
                    36: "江西",
                    37: "山东",
                    41: "河南",
                    42: "湖北",
                    43: "湖南",
                    44: "广东",
                    45: "广西",
                    46: "海南",
                    50: "重庆",
                    51: "四川",
                    52: "贵州",
                    53: "云南",
                    54: "西藏",
                    61: "陕西",
                    62: "甘肃",
                    63: "青海",
                    64: "宁夏",
                    65: "新疆",
                    71: "台湾",
                    81: "香港",
                    82: "澳门",
                    91: "国外"
                },
                n = !0;
            if (t && /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(t))
                if (i[t.substr(0, 2)]) {
                    if (18 === t.length) {
                        t = t.split("");
                        for (var o = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], r = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2], s = 0, a = 0, c = 0, l = 0; l < 17; l++) a = t[l], c = o[l], s += a * c;
                        r[s % 11].toString() !== t[17].toString() && (n = !1)
                    }
                } else n = !1;
            else n = !1;
            return n
        }

        function n(e) {
            return /[\u4e00-\u9FA5]+/.test(e)
        }

        function o(e, t) {
            for (var i = e.split("."), n = t.split("."), o = 0; o < n.length; o++)
                if (i[o] !== n[o]) return i[o] = isNaN(i[o]) ? 0 : i[o], n[o] = isNaN(n[o]) ? 0 : n[o], i[o] - n[o];
            return 0
        }

        function r(e, t) {
            return o(e, t) >= 0
        }

        function s(e, t) {
            var i, n = {};
            for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
            for (i in t) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
            return n
        }

        function a(e) {
            return !/^1\d{10}$/.test(e)
        }

        function c(e) {
            var t = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };
            return "string" == typeof e && (e = e.replace(/[&<>"']/g, function (e) {
                return t[e] || ""
            })), e
        }

        function l() {
            var e = arguments[0];
            if (!e || "string" != typeof e) return e;
            var t = [].splice.call(arguments, 1),
                i = 0;
            return e.replace(/(%s)/g, function () {
                return void 0 !== t[i] ? t[i++] : arguments[0]
            })
        }

        function u() {
            var e = arguments,
                t = e[0];
            if (!t) return ""; - 1 !== t.indexOf("%s") && (t = l.apply(null, e));
            for (var i = 1; i < e.length; i++) {
                var n = "${" + (i - 1) + "}"; - 1 !== t.indexOf(n) && (t = t.split(n).join(e[i]))
            }
            return t
        }

        function d(e, t) {
            var i, n = +new Date - e;
            return t = Object.assign({
                num_minutes_ago: "%s分钟前",
                num_minute_ago: "%s分钟前",
                num_hours_ago: "%s小时前",
                num_hour_ago: "%s小时前",
                num_days_ago: "%s天前",
                num_day_ago: "%s天前",
                num_months_ago: "%s个月前",
                num_month_ago: "%s个月前",
                num_years_ago: "%s年前",
                num_year_ago: "%s年前",
                just_now: "刚刚"
            }, t), n < 6e4 ? t.just_now : n < 36e5 ? (i = Math.floor(n / 6e4), i > 1 ? t.num_minutes_ago.replace("%s", i) : t.num_minute_ago.replace("%s", i)) : n < 864e5 ? (i = Math.floor(n / 36e5), i > 1 ? t.num_hours_ago.replace("%s", i) : t.num_hour_ago.replace("%s", i)) : n < 26784e5 ? (i = Math.floor(n / 864e5), i > 1 ? t.num_days_ago.replace("%s", i) : t.num_day_ago.replace("%s", i)) : n < 314496e5 ? (i = Math.floor(n / 2592e6), i > 1 ? t.num_months_ago.replace("%s", i) : t.num_month_ago.replace("%s", i)) : (i = Math.floor(n / 31536e6), i > 1 ? t.num_years_ago.replace("%s", i) : t.num_year_ago.replace("%s", i))
        }
        return {
            objToQueryString: e,
            isValidIdCard: i,
            isChinese: n,
            countDown: t,
            compareAppVersion: o,
            isGteVersion: r,
            extend: s,
            isAvailableMobile: a,
            encodeHtmlEntity: c,
            formatLanguage: u,
            commentTimeFormat: d
        }
    }), define("lib/cookie", ["./util"], function (e) {
        function t(e) {
            for (var t, i = document.cookie.split("; "), n = 0; n < i.length; n++)
                if (t = i[n].split("="), t[0] == e) return unescape(t[1] || "");
            return ""
        }

        function i(t, i, n) {
            if (n = e.extend({
                path: "/"
            }, n), "number" == typeof n.expires) {
                var o = new Date;
                o.setMilliseconds(o.getMilliseconds() + 864e5 * n.expires), n.expires = o
            }
            n.expires = n.expires ? n.expires.toUTCString() : "", i = encodeURIComponent(String(i)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = encodeURIComponent(String(t)), t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), t = t.replace(/[\(\)]/g, escape);
            var r = "";
            for (var s in n) n[s] && (r += "; " + s, !0 !== n[s] && (r += "=" + n[s]));
            document.cookie = t + "=" + i + r
        }
        return {
            getCookie: t,
            setCookie: i
        }
    }), define("lib/device", ["./cookie"], function (e) {
        var t = navigator.userAgent,
            i = {
                isIOS: function () {
                    return !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                }, isAndroid: function () {
                    return t.indexOf("Android") > -1 || t.indexOf("Adr") > -1
                }, getIOSVersion: function () {
                    if (!i.isIOS()) return !1;
                    var e = t.match(/OS (\d+)_(\d+)_?(\d+)?/);
                    if (!e || e.length < 3) return !1;
                    var n = parseFloat(parseInt(e[1], 10) + .1 * e[2]);
                    return n > 0 && n
                },  isInWeChat: function () {
                    return /MicroMessenger/i.test(t)
                }, isInEnterpriseWeChat: function () {
                    return / wxwork\//i.test(t)
                }, isInWeibo: function () {
                    return /Weibo/i.test(t)
                }, isInQQ: function () {
                    return / QQ\//i.test(t)
                }, isInQzone: function () {
                    return /Qzone\//i.test(t)
                }, isInTBS: function () {
                    return / TBS\//i.test(t)
                }, isInQQWebBrowser: function () {
                    return /MQQBrowser/i.test(t) && !this.isInWeChat() && !this.isInQQ() && !this.isInQzone() && !this.isInTBS()
                }, isInBaidu: function () {
                    return / baiduboxapp\//i.test(t)
                }, isInUC: function () {
                    return / UCBrowser\//i.test(t)
                }, isInXiaomi: function () {
                    return / XiaoMi\//i.test(t)
                }, isInKakaoTalk: function () {
                    return /KAKAOTALK/i.test(t)
                }, isInPinterest: function () {
                    return /Pinterest\//i.test(t)
                }, isInZalo: function () {
                    return /Zalo/i.test(t)
                }, supportUniversalLink: function () {
                    return this.getIOSVersion() >= 9
                }, getBrowserDesc: function () {
                    return this.isInQQ() ? "qq" : this.isInWeChat() ? "wechat" : this.isInQzone() ? "qzone" : this.isInWeibo() ? "weibo" : this.isInBaidu() ? "baidu" : this.isInUC() ? "uc" : this.isIOS() ? "ios" : this.isAndroid() ? "android" : ""
                }, getDeviceHeightAndWidth: function () {
                    var e = {
                        dph: window && window.screen && window.screen.availHeight || 1,
                        dpw: window && window.screen && window.screen.availWidth || 1
                    };
                    return void 0 !== window.devicePixelRatio && (e.dph *= window.devicePixelRatio, e.dpw *= window.devicePixelRatio), e
                }
            };
        return i
    }), define("lib/url", [], function () {
        function e() {
            var e = {},
                t = window.location.search;
            if (!(t = t.replace(/^\?/g, ""))) return {};
            for (var i, n = t.split("&"), o = null, r = 0, s = n.length; r < s; r++) i = n[r].indexOf("="), i < 0 ? (i = n[r].length, o = !0) : o = decodeURIComponent(n[r].slice(i + 1)), e[decodeURIComponent(n[r].slice(0, i))] = o;
            return e
        }

        function t(e) {
            var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                i = window.location.search.substr(1).match(t);
            return null != i ? decodeURIComponent(i[2]) : null
        }

        function i(e) {
            for (var t = e.split("?"), i = t[t.length - 1], n = i === e ? [] : i.split("&"), o = {}, r = 0; r < n.length; r++) {
                var s = n[r],
                    a = s.split("=");
                o[decodeURIComponent(a[0] || "")] = decodeURIComponent(a[1] || "")
            }
            return o
        }

        function n(e, t) {
            var n, o = i(e),
                r = e.indexOf("?"),
                s = -1 === r ? e : e.substr(0, r),
                a = [];
            for (n in t) t.hasOwnProperty(n) && (o[n] = t[n]);
            for (n in o)
                if (o.hasOwnProperty(n)) {
                    var c = o[n] || "";
                    a.push(encodeURIComponent(n) + "=" + encodeURIComponent(c))
                }
            return a.length && (s += "?" + a.join("&")), s
        }

        function o(e) {
            return /^http(s?):\/\/[a-z0-9_-]+(\.[a-z0-9_-]+)?\.(kuaishou|kwai|gifshow|uyouqu)\.(com|cn)(\/|\?|$)/i.test(e)
        }
        return {
            addParam: n,
            parseQS: i,
            parseQuery: e,
            getUrlParam: t,
            isValidKuaishouUrl: o
        }
    }), define("lib/popup", [], function () {
        function e(e, t) {
            t = t || "error";
            var i = ["error", "warn", "info"];
            if (-1 === $.inArray(t, i)) return void console.error("invalid type of toast");
            var o = t ? t + "-tip" : "error-tip",
                r = t ? "msg-toast-" + t : "msg-toast",
                s = $("#" + r);
            s.length || ($("body").append('<div id="' + r + '" class="' + o + ' animated hide"></div>'), s = $("#" + r)), n && clearTimeout(n), s.removeClass("hide").addClass("slideInDown").text(e), n = setTimeout(function () {
                s.removeClass("slideInDown").addClass("slideOutUp"), n = setTimeout(function () {
                    s.removeClass("slideOutUp").addClass("hide")
                }, 2e3)
            }, 3e3)
        }

        function t() {
            var e = $("#loading");
            e.length ? e.show() : $("body").append('<div id="loading" class="loading" style="display:block;"><div class="loading-mask"></div><div class="loading-img-tran"></div></div>')
        }

        function i() {
            $("#loading").hide()
        }
        var n = 0;
        return {
            toast: e,
            showLoading: t,
            hideLoading: i
        }
    }), define("lib/ajax", ["./popup"], function (e) {
        var t = {
            result: 997,
            error_msg: -1 === (navigator.languages + "," + navigator.language).indexOf("zh-CN") ? "Check your Internet connection" : "请检查下网络连接是否正常"
        };
        return {
            defaultParams: {},
            send: function (i, n, o, r) {
                var s = this,
                    a = {},
                    c = {
                        type: "POST",
                        dataType: "json",
                        timeout: "30000",
                        data: {},
                        processData: !1,
                        contentType: "application/json; charset=utf-8",
                        crossDomain: !0,
                        beforeSend: function (e) {
                            try {
                                e.withCredentials = !0
                            } catch (i) {
                                var t = e.open;
                                e.open = function () {
                                    var i = t.apply(e, arguments);
                                    return e.withCredentials = !0, i
                                }
                            }
                        }
                    };
                "string" == typeof i ? (a = $.extend({}, s.defaultParams, n), c.url = i, c.data = JSON.stringify(a), c.success = function (e) {
                    o && o(e)
                }, c.error = function (e) {
                    r && r(e)
                }) : (c = $.extend({}, s.defaultParams, c, i), c.contentType && -1 !== c.contentType.indexOf("application/json") && c.data && "object" == typeof c.data && (c.data = JSON.stringify(c.data)), c.enableErrorTip && (c.error = function () {
                    e.toast(t && t.error_msg, "error")
                }))
            }, ajax: function (e, i, n) {
                var o = this,
                    r = $.extend({}, o.defaultParams, i);
                return $.ajax({
                    url: e,
                    type: "POST",
                    dataType: "json",
                    timeout: 3e4,
                    data: JSON.stringify(r),
                    contentType: "application/json; charset=utf-8",
                    success: function (e) {
                        n && n(e)
                    }, error: function () {
                        n && n(t)
                    }
                })
            }
        }
    }), define("lib/wxReady", ["lib/ajax"], function (e) {
        var t, i = [];
        return function (n) {
                function o() {
                    ++s < 2 || (t.config($.extend({
                        beta: !0,
                        jsApiList: ["launchApplication", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
                    }, r, n)), t.ready(function () {
                        for (var e = 0; e < i.length; e++) i[e](t);
                        i = null
                    }))
                }
                if (/ MicroMessenger\//.test(navigator.userAgent)) {
                    var r, s = 0;
                    e.ajax("/rest/wd/wemedia/signShareUrl", {
                        url: location.href
                    }, function (e) {
                        1 === e.result && (r = {
                            appId: e.appId,
                            timestamp: e.timestamp,
                            nonceStr: e.nonceStr,
                            signature: e.signature
                        }, o())
                    }), require(["wx"], function (e) {
                        t = e, t.error(function (e) {
                            window.ksLog.sendAction({
                                event: "exception",
                                exceptionType: "JS",
                                message: "weixin-jsapi: " + e.errMsg
                            })
                        }), o()
                    })
                }
            }(),
            function (e) {
                e && (i ? i.push(e) : e(t))
            }
    }),
    function (e, t, i) {
        var n = function (e, t) {
            "use strict";

            function i(e, t, i) {
                var n;
                for (n in t)(t.hasOwnProperty(n) && !(n in e) || i) && (e[n] = t[n]);
                return e
            }

            function n(e, t) {
                var i, n, o, r;
                for (e = String(e).split("."), t = String(t).split("."), i = 0, r = Math.max(e.length, t.length); i < r; i++) {
                    if (n = isFinite(e[i]) && Number(e[i]) || 0, o = isFinite(t[i]) && Number(t[i]) || 0, n < o) return -1;
                    if (n > o) return 1
                }
                return 0
            }

            function o(t) {
                var i = window.MQQfirebug;
                if (e.debuging && i && i.log && "pbReport" !== t.method) try {
                    i.log(t)
                } catch (e) {}
            }

            function r(t, i, n, o, r) {
                if (t && i && n) {
                    var s, a, c, l, u = t + "://" + i + "/" + n;
                    if (o = o || [], !r || !j[r] && !window[r])
                        for (r = null, a = 0, c = o.length; a < c; a++)
                            if (s = o[a], e.isObject(s) && (s = s.callbackName || s.callback), s && (j[s] || window[s])) {
                                r = s;
                                break
                            }
                    r && (N[r] = {
                        from: "reportAPI",
                        ns: i,
                        method: n,
                        uri: u,
                        startTime: Date.now()
                    }, (l = String(r).match(/__MQQ_CALLBACK_(\d+)/)) && (N[l[1]] = N[r])), C.send(u, B)
                }
            }

            function s(e) {
                var t = e.split("."),
                    i = window;
                return t.forEach(function (e) {
                    !i[e] && (i[e] = {}), i = i[e]
                }), i
            }

            function a(t, i, n) {
                var o, r;
                if (t = e.isFunction(t) ? t : window[t]) return o = c(t), r = "__MQQ_CALLBACK_" + o, window[r] = function () {
                    var e = P.call(arguments);
                    u(o, e, i, n)
                }, r
            }

            function c(e) {
                var t = "" + z++;
                return e && (j[t] = e), t
            }

            function l(e) {
                var t, i, n, o = ["retCode", "retcode", "resultCode", "ret", "code", "r"];
                for (i = 0, n = o.length; i < n; i++)
                    if (o[i] in e) {
                        t = e[o[i]];
                        break
                    }
                return t
            }

            function u(n, r, s, a) {
                var c, u, d, p = e.isFunction(n) ? n : j[n] || window[n],
                    h = Date.now();
                r = r || [], c = r[0], e.isUndefined(a) && (a = !0), e.isObject(c) && ("data" in c || (c.data = i({}, c)), "code" in c || (c.code = l(c) || 0), c.msg = c.msg || ""), e.isFunction(p) ? a ? setTimeout(function () {
                    p.apply(null, r)
                }, 0) : p.apply(null, r) : console.log("mqqapi: not found such callback: " + n), s && (delete j[n], delete window["__MQQ_CALLBACK_" + n]), N[n] && (d = N[n], delete N[n], o({
                    from: "fireCallback",
                    ns: d.ns,
                    method: d.method,
                    ret: JSON.stringify(r),
                    url: d.uri
                }), Number(n) && delete N["__MQQ_CALLBACK_" + n], c && (c.code !== t ? u = c.code : /^-?\d+$/.test(String(c)) && (u = c)), C.send(d.uri + "#callback", u, h - d.startTime))
            }

            function d(t) {
                var i = P.call(arguments, 1);
                e.android && i && i.length && i.forEach(function (t, n) {
                    e.isObject(t) && "r" in t && "result" in t && (i[n] = t.result)
                }), u(t, i)
            }

            function p() {}

            function h(t, i) {
                var n = null,
                    o = e.platform,
                    r = t.split("."),
                    a = t.lastIndexOf("."),
                    c = r[r.length - 2],
                    l = r[r.length - 1],
                    u = s(t.substring(0, a));
                u[l] && !e.debuging || ((n = i[e.platform]) || "browser" === o || ((n = e.iOS && i.iOS) ? o = "iOS" : (n = e.android && i.android) && (o = "android")), n && i.supportInvoke && (M[c + "." + l] = n), u[l] = n || p, i.support && i.support[o] && (R[c + "." + l] = i.support[o]))
            }

            function f(t) {
                var i, n, o = t.split("."),
                    r = o[o.length - 2] + "." + o[o.length - 1];
                return i = R[r] || R[t.replace("qw.", "mqq.").replace("qa.", "mqq.")], e.isObject(i) && (i = i[e.iOS ? "iOS" : e.android ? "android" : "browser"]), !!i && (n = i.split("-"), 1 === n.length ? e.compare(n[0]) > -1 : e.compare(n[0]) > -1 && e.compare(n[1]) < 1)
            }

            function m(i, n, r, s) {
                function a() {
                    d(s, {
                        r: -201,
                        result: "error"
                    })
                }
                o({
                    from: "openURL",
                    ns: n,
                    method: r,
                    url: i
                });
                var c, l = document.createElement("iframe");
                return l.style.cssText = "display:none;width:0px;height:0px;", e.iOS && (l.onload = a, l.src = i), (document.body || document.documentElement).appendChild(l), e.android && (l.onload = a, l.src = i), c = e.__RETURN_VALUE, e.__RETURN_VALUE = t, setTimeout(function () {
                    l && l.parentNode && l.parentNode.removeChild(l)
                }, 0), c
            }

            function v(t, i) {
                if ("AndroidQQ" === e.platform) {
                    if (e.compare("4.7.2") < 0) return !0;
                    if (X[t] && e.compare(X[t]) < 0) return !0
                }
                return !1
            }

            function g(i, n, o, s) {
                if (!i || !n || window !== window.top || -1 === window.navigator.userAgent.indexOf("QQ")) return null;
                var a, l, d, p;
                if (d = P.call(arguments, 2), s = d.length && d[d.length - 1], e.isFunction(s) ? d.pop() : e.isUndefined(s) ? d.pop() : s = null, o = d[0], l = c(s), -1 === V.indexOf(n) && r("jsbridge", i, n, d, l), s && e.isObject(o) && !o.callback && (window["__MQQ_CALLBACK_AUTO_" + l] = s, o.callback = "__MQQ_CALLBACK_AUTO_" + l), v(i, n))
                    if (e.compare("4.5") > -1 || /_NZ\b/.test(E)) a = "jsbridge://" + encodeURIComponent(i) + "/" + encodeURIComponent(n) + "/" + l, d.forEach(function (t) {
                        e.isObject(t) && (t = JSON.stringify(t)), a += "/" + encodeURIComponent(String(t))
                    }), m(a, i, n, l);
                    else if (window[i] && window[i][n]) {
                    if (p = window[i][n].apply(window[i], d), !s) return p;
                    u(l, [p])
                } else s && u(l, [e.ERROR_NO_SUCH_METHOD]);
                else if (a = "jsbridge://" + encodeURIComponent(i) + "/" + encodeURIComponent(n), d.forEach(function (t, i) {
                    e.isObject(t) && (t = JSON.stringify(t)), a += 0 === i ? "?p=" : "&p" + i + "=", a += encodeURIComponent(String(t))
                }), "pbReport" !== n && (a += "#" + l), p = m(a, i, n), e.iOS && p !== t && p.result !== t) {
                    if (!s) return p.result;
                    u(l, [p.result])
                }
                return null
            }

            function _(t, i, n, o) {
                var r = M[t + "." + i];
                return e.isFunction(r) ? r.apply(this, P.call(arguments, 2)) : g.apply(this, P.call(arguments))
            }

            function w(t, i, n, o, s) {
                if (!t || !i || !n) return null;
                var c, l, u = P.call(arguments);
                e.isFunction(u[u.length - 1]) ? (s = u[u.length - 1], u.pop()) : s = null, o = 4 === u.length ? u[u.length - 1] : {}, s && (o.callback_type = "javascript", c = a(s), o.callback_name = c), o.src_type = o.src_type || "web", o.version || (o.version = 1), l = t + "://" + encodeURIComponent(i) + "/" + encodeURIComponent(n) + "?" + b(o), m(l, i, n), r(t, i, n, u, c)
            }

            function y(e) {
                var t, i, n, o, r = e.indexOf("?"),
                    s = e.substring(r + 1).split("&"),
                    a = {};
                for (t = 0; t < s.length; t++) o = s[t], r = o.indexOf("="), -1 === r ? a[o] = "" : (i = o.substring(0, r), n = o.substring(r + 1), a[i] = decodeURIComponent(n));
                return a
            }

            function b(e) {
                var t, i, n = [];
                for (t in e) e.hasOwnProperty(t) && (t = String(t), i = String(e[t]), "" === t ? n.push(i) : n.push(t + "=" + encodeURIComponent(i)));
                return n.join("&")
            }

            function S(e, t) {
                var i, n = document.createElement("a");
                return n.href = e, n.search && (i = y(String(n.search).substring(1)), t.forEach(function (e) {
                    delete i[e]
                }), n.search = "?" + b(i)), e = n.href, n = null, e
            }

            function x(e, t) {
                if ("qbrowserVisibilityChange" === e) return document.addEventListener(e, t, !1), !0;
                var i = "evt-" + e;
                return (j[i] = j[i] || []).push(t), !0
            }

            function k(e, t) {
                var i, n = "evt-" + e,
                    o = j[n],
                    r = !1;
                if (!o) return !1;
                if (!t) return delete j[n], !0;
                for (i = o.length - 1; i >= 0; i--) t === o[i] && (o.splice(i, 1), r = !0);
                return r
            }

            function T(e) {
                var t = "evt-" + e,
                    i = j[t],
                    n = P.call(arguments, 1);
                i && i.forEach(function (e) {
                    u(e, n, !1)
                })
            }

            function A(t, i, n) {
                var o, s = {
                    event: t,
                    data: i || {}, options: n || {}
                };
                e.android && !1 === s.options.broadcast && e.compare("5.2") <= 0 && (s.options.domains = ["localhost"], s.options.broadcast = !0), "browser" !== e.platform && (o = "jsbridge://event/dispatchEvent?p=" + encodeURIComponent(JSON.stringify(s) || ""), m(o, "event", "dispatchEvent"), r("jsbridge", "event", "dispatchEvent"))
            }
            var C, E = navigator.userAgent,
                I = window.MQQfirebug,
                P = Array.prototype.slice,
                O = Object.prototype.toString,
                $ = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/,
                D = /\bAndroid([^;]+)/,
                Q = /\bQQ\/([\d\.]+)/,
                U = /\bIPadQQ\/([\d\.]+).*?\bQQ\/([\d\.]+)/,
                q = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/,
                L = /\bTribe\/([\d\.]+)/,
                j = e.__aCallbacks || {},
                N = e.__aReports || {},
                R = e.__aSupports || {},
                M = e.__aFunctions || {},
                z = 1,
                B = -1e5,
                X = {
                    qbizApi: "5.0",
                    pay: "999999",
                    SetPwdJsInterface: "999999",
                    GCApi: "999999",
                    q_download: "999999",
                    qqZoneAppList: "999999",
                    qzone_app: "999999",
                    qzone_http: "999999",
                    qzone_imageCache: "999999",
                    RoamMapJsPlugin: "999999"
                },
                V = ["pbReport", "popBack", "close", "qqVersion"];
            return I ? (e.debuging = !0, E = I.ua || E) : e.debuging = !1, i(e, function () {
                var e = {};
                return "Object,Function,String,Number,Boolean,Date,Undefined,Null".split(",").forEach(function (t, i) {
                    e["is" + t] = function (e) {
                        return O.call(e) === "[object " + t + "]"
                    }
                }), e
            }()), e.iOS = $.test(E), e.android = D.test(E), e.iOS && e.android && (e.iOS = !1), e.version = "20160412001", e.QQVersion = "0", e.clientVersion = "0", e.ERROR_NO_SUCH_METHOD = "no such method", e.ERROR_PERMISSION_DENIED = "permission denied", e.compare = function (t) {
                return n(e.clientVersion, t)
            }, e.platform = function () {
                var i, o, r = "browser";
                return e.android && ((i = E.match(q)) && i.length ? (e.QQVersion = e.clientVersion = (n(i[1], i[3]) >= 0 ? i[1] : i[3]) || "0", r = "AndroidQQ") : (i = E.match(L)) && i.length && (e.clientVersion = i[1] || "0", r = "AndroidTribe"), window.JsBridge = window.JsBridge || {}, window.JsBridge.callMethod = g, window.JsBridge.callback = d, window.JsBridge.compareVersion = e.compare), e.iOS && (e.__RETURN_VALUE = t, (i = E.match(U)) && i.length ? (e.clientVersion = i[1] || "0", e.QQVersion = i[2] || e.clientVersion, r = "iPadQQ") : (i = E.match(Q)) && i.length ? (e.QQVersion = e.clientVersion = i[1] || "0", r = "iPhoneQQ") : (i = E.match(L)) && i.length ? (e.clientVersion = i[1] || "0", r = "iOSTribe") : !(o = g("device", "qqVersion")) || (e.QQVersion = e.clientVersion = o, r = "iPhoneQQ"), window.iOSQQApi = e), r
            }(), z = function () {
                var e, t = 1;
                for (e in j) j.hasOwnProperty(e) && (e = Number(e), isNaN(e) || (t = Math.max(t, e)));
                return ++t
            }(), C = function () {
                function t() {
                    var i, s = n,
                        u = {};
                    n = [], r = 0, s.length && (u.appid = a, u.typeid = c, u.releaseversion = d, u.sdkversion = e.version, u.qua = p, u.frequency = l, u.t = Date.now(), u.key = ["commandid", "resultcode", "tmcost"].join(","), s.forEach(function (e, t) {
                        u[t + 1 + "_1"] = e[0], u[t + 1 + "_2"] = e[1], u[t + 1 + "_3"] = e[2]
                    }), u = new String(b(u)), e.compare("4.6") >= 0 ? setTimeout(function () {
                        mqq.iOS ? mqq.invokeClient("data", "pbReport", {
                            type: String(10004),
                            data: u
                        }) : mqq.invokeClient("publicAccount", "pbReport", String(10004), u)
                    }, 0) : (i = new Image, i.onload = function () {
                        i = null
                    }, i.src = "http://wspeed.qq.com/w.cgi?" + u), r = setTimeout(t, o))
                }

                function i(e, i, a) {
                    i === B && (i = 0, 1 != Math.round(Math.random() * l) % l) || (n.push([e, i || 0, a || 0]), r || (s = Date.now(), r = setTimeout(t, o)))
                }
                var n = [],
                    o = 500,
                    r = 0,
                    s = 0,
                    a = 1000218,
                    c = 1000280,
                    l = 100,
                    u = String(e.QQVersion).split(".").slice(0, 3).join("."),
                    d = e.platform + "_MQQ_" + u,
                    p = e.platform + e.QQVersion + "/" + e.version;
                return {
                    send: i
                }
            }(), e.__aCallbacks = j, e.__aReports = N, e.__aSupports = R, e.__aFunctions = M, e.__fireCallback = u, e.__reportAPI = r, i(e, {
                invoke: _,
                invokeClient: g,
                invokeSchema: w,
                build: h,
                callback: a,
                support: f,
                execGlobalCallback: d,
                addEventListener: x,
                removeEventListener: k,
                dispatchEvent: A,
                execEventCallback: T,
                mapQuery: y,
                toQuery: b,
                removeQuery: S
            }, !0), e
        }(this.mqq = this.mqq || {});
        "function" == typeof define && (define.amd || define.cmd) ? define("dep/qqapi.custom", n) : "object" == typeof module && (module.exports = n)
    }(), mqq.build("mqq.app.checkAppInstalled", {
        android: function (e, t) {
            mqq.invokeClient("QQApi", "checkAppInstalled", e, t)
        }, supportInvoke: !0,
        support: {
            android: "4.2"
        }
    }), mqq.build("mqq.app.downloadApp", {
        android: function () {
            var e, t = {},
                i = 0,
                n = function (e) {
                    if (i > 0) {
                        var n, o, r = 0,
                            s = e.length;
                        if ("object" == typeof e && s)
                            for (; n = e[r]; r++)(o = t[n.appid]) && o(n);
                        else(o = t[e.appid]) && o(e)
                    }
                };
            return function (o, r) {
                !e && r && (e = !0, mqq.invokeClient("q_download", "registerDownloadCallBackListener", mqq.callback(n))), r && "function" == typeof r && (i++, t[o.appid] = r), mqq.invokeClient("q_download", "doDownloadAction", o)
            }
        }(),
        supportInvoke: !0,
        support: {
            android: "4.5"
        }
    }), mqq.build("mqq.app.launchApp", {
        iOS: function (e) {
            mqq.invokeSchema("cn.folkcam.rablive.jwrablive", "app", "launch", e)
        }, android: function (e) {
            mqq.invokeClient("QQApi", "startAppWithPkgName", "cn.folkcam.rablive.jwrablive")
        }, supportInvoke: !0,
        support: {
            iOS: "4.2",
            android: "4.2"
        }
    }), define("lib/openApp", ["lib/device", "lib/util", "lib/url", "lib/cookie", "lib/ajax", "lib/wxReady", "dep/qqapi.custom"], function (e, t, i, n, o, r) {
        function s(e) {
            var t = $.extend({}, S, e.appParams, {
                    position: e.position
                }),
                i = l("rablive://", "openFrom", t),
                n = a(e, i);
            return {
                jumpUrl: c(i, e.universalLinkUrl, e.ulFallbackUrl, t),
                schemeUrl: "rablive://",
                downloadUrl: "https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8"
            }
        }

        function a(e, t) {
            var i;
            return i = e.query.adid ? l(e.adidDownloadUrl, "adid", e.query.adid) : e.query.channel ? l(e.downloadUrl, "channel", e.query.channel) : e.downloadUrl, i = u(i, e.extraParam), !/(\?|\&)scheme=\w/i.test(i) && t && (i = l(i, "scheme", t)), i
        }

        function c(t, i, n, o) {
            var r = t;
            return !e.supportUniversalLink() || e.isInQQ() || e.isInWeChat() || (r = i || p(t) || t, n && !/(\?|\&)fallbackUrl=\w/i.test(r) && (n = l(n, "openFrom", o), r = l(r, "fallbackUrl", n))), r
        }

        function l(e, t, i) {
            var n = "string" == typeof i ? i : JSON.stringify(i);
            return e && e.indexOf("?") >= 0 ? e += "&" : e += "?", e = e + t + "=" + encodeURIComponent(n)
        }

        function u(e, t) {
            return t = t || {}, e = e || "", Object.keys(t).forEach(function (i) {
                e = l(e, i, t[i])
            }), e
        }

        function d(e, t) {
            t = t || 50, setTimeout(function () {
                if (window.top !== window.self && /^https?:\/\//i.test(e)) try {
                    window.top.location.href = e
                } catch (t) {
                    location.href = e
                } else location.href = e
            }, t)
        }

        function p(e) {
            var t = e.match(/^(\w+):\/\/(.*)$/);
            if (!t || t.length < 3) return "";
            var i = t[1].toLowerCase();
            return w[i] ? w[i] + t[2] : ""
        }

        function h(e, t, i) {
            var n = 0,
                o = +new Date;
            t = t || "";
            var r = setInterval(function () {
                n++;
                var s = +new Date - o;
                n > 49 && (clearInterval(r), s < 1300 && (f("APP_DOWNLOAD", t, i), d(e)))
            }, 20)
        }

        function f(e, t, i) {
            window.ksLog && window.ksLog.sendAction({
                event: "task",
                action: e,
                position: t || "",
                appCode: i || ""
            })
        }

        function m() {
            var e = $(".open-in-browser-dialog");
            if (e.length) return void e.show();
            var t = ['<div class="open-in-browser-dialog">', '<div class="mask"></div>', '<div class="content">', '<div class="arrow-top-right"></div>', '<div class="line"><span class="text">点击右上角</span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>', '<div class="line text">选择 "在浏览器中打开"</div>', "</div>", "</div>"].join("");
            $(document.body).append(t), $(".open-in-browser-dialog").on("click", function () {
                $(this).hide()
            })
        }

        function v(e) {
            e.schemeUrl = e.schemeUrl.replace(/^kwai/, "ikwai"), e.appid = "1155891716", e.packageName = "cn.folkcam.rablive.jwrablive"
        }
        var g = e.isAndroid() && e.isInQQ() && window.mqq,
            _ = !1,
            w = {
                kwai: "https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8",
                ikwai: "https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8"
            },
            y = {
                INSTALLED: 1,
                NOT_INSTALLED: 2,
                UNKNOWN: 0
            },
            b = {
                packageName: "cn.folkcam.rablive.jwrablive",
                appid: "1155891716",
                via: "tuliao",
                appName: "兔聊",
                appCode: "tuliao",
                downloadStatus: "undownload",
                extraParam: {},
                ulFallbackUrl: "",
                downloadUrl: location.host.match(/\w+\.(s|test)\.gifshow\.com/) ? "/download/kwai" : "https://m.uyouqu.com/download/kwai",
                adidDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=cn.folkcam.rablive.jwrablive",
                schemeUrl: "jwlive://",
                installStatus: y.UNKNOWN
            },
            S = {
                url: location.href,
                cc: i.getUrlParam("cc") || "",
                fid: i.getUrlParam("fid") || "",
                did: n.getCookie("did") || "",
                from: e.getBrowserDesc()
            };
        return function () {
            function e(e) {
                b.extraParam.isForeign = _ = e
            }
            /^\/(photo|user|live)\//.test(location.pathname) ? e($(document.body).hasClass("ikwai")) : o.send({
                url: "/api/rest/o/user/info",
                data: {},
                success: function (t) {
                    1 === t.result && e(t.isForeign)
                }
            })
        }(), {
            init: function (e) {
                if (e && e.$element) {
                    e.query = i.parseQS(location.href), this._config = e = $.extend({}, b, e), _ && v(e), g && window.mqq.app.checkAppInstalled(e.packageName, function (t) {
                        /\d+\.\d+/i.test(t) ? e.installStatus = y.INSTALLED : 0 == +t && (e.installStatus = y.NOT_INSTALLED)
                    });
                    var t = e.downloadUrl.match(/\/download\/(\w+)?(\?|\/|$)/i);
                    t && t.length > 2 && (e.appCode = t[1].toUpperCase());
                    var n = this;
                    e.$element.on("click", function (e) {
                        e.preventDefault();
                        var t = $(this);
                        n.openOrDownload({
                            position: t.data("position"),
                            schemeUrl: t.data("scheme-url"),
                            universalLinkUrl: t.data("universal-link"),
                            ulFallbackUrl: t.data("ul-fallback-url")
                        })
                    })
                }
            }, openOrDownload: function (e) {
                var i = $.extend({}, this._config, e);
                _ && v(i);
                var n = s(i),
                    o = this;
                f("APP_GOTO", i.position, i.appCode);
                var a = / MicroMessenger\/([0-9.]+)/.exec(navigator.userAgent);
                if (a && t.isGteVersion(a[1], "6.5.16") && "KWAI" === i.appCode) {
                    var c = n.schemeUrl.split("://")[1];
                    r(function (e) {
                        e.invoke("launchApplication", {
                            appID: "wx9227d48257374438",
                            parameter: c
                        }, function (e) {
                            "launchApplication:ok" !== e.err_msg && o.openOrDownloadStep2(i, n)
                        })
                    })
                } else this.openOrDownloadStep2(i, n)
            }, openOrDownloadStep2: function (t, i) {
                var n = i.jumpUrl,
                    o = i.downloadUrl;
                if (t.installStatus === y.INSTALLED) return f("APP_OPEN", t.position, t.appCode), void d(n);
                if (e.isAndroid()) {
                    if (e.isInWeibo() || e.isInQzone() || e.isInEnterpriseWeChat()) return void m();
                    if (e.isInWeChat() || e.isInQQWebBrowser() || t.installStatus === y.NOT_INSTALLED) return t.installStatus === y.NOT_INSTALLED && f("APP_DOWNLOAD", t.position, t.appCode), void d(o);
                    if (e.isInXiaomi() && /MiuiBrowser\/2/i.test(navigator.userAgent)) return void(location.href = o)
                }
                /^https?:\/\//i.test(n) ? d(n) : (h(o, t.position, t.appCode), e.isInKakaoTalk() || e.isInPinterest() || e.isInZalo() || (location.href = n))
            }, open: function (e) {
                var t = $.extend({}, this._config, e);
                _ && v(t);
                var i = s(t);
                f("APP_GOTO", t.position, t.appCode), d(i.jumpUrl)
            }
        }
    }),
    function (e, t) {
        "use strict";
        var i = function (e) {
                if ("object" != typeof e.document) throw new Error("Cookies.js requires a `window` with a `document` object");
                var t = function (e, i, n) {
                    return 1 === arguments.length ? t.get(e) : t.set(e, i, n)
                };
                return t._document = e.document, t._cacheKeyPrefix = "cookey.", t._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC"), t.defaults = {
                    path: "/",
                    secure: !1
                }, t.get = function (e) {
                    return t._cachedDocumentCookie !== t._document.cookie && t._renewCache(), t._cache[t._cacheKeyPrefix + e]
                }, t.set = function (e, i, n) {
                    return n = t._getExtendedOptions(n), n.expires = t._getExpiresDate(void 0 === i ? -1 : n.expires), t._document.cookie = t._generateCookieString(e, i, n), t
                }, t.expire = function (e, i) {
                    return t.set(e, void 0, i)
                }, t._getExtendedOptions = function (e) {
                    return {
                        path: e && e.path || t.defaults.path,
                        domain: e && e.domain || t.defaults.domain,
                        expires: e && e.expires || t.defaults.expires,
                        secure: e && void 0 !== e.secure ? e.secure : t.defaults.secure
                    }
                }, t._isValidDate = function (e) {
                    return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
                }, t._getExpiresDate = function (e, i) {
                    if (i = i || new Date, "number" == typeof e ? e = e === 1 / 0 ? t._maxExpireDate : new Date(i.getTime() + 1e3 * e) : "string" == typeof e && (e = new Date(e)), e && !t._isValidDate(e)) throw new Error("`expires` parameter cannot be converted to a valid Date instance");
                    return e
                }, t._generateCookieString = function (e, t, i) {
                    e = e.replace(/[^#$&+\^`|]/g, encodeURIComponent), e = e.replace(/\(/g, "%28").replace(/\)/g, "%29"), t = (t + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent), i = i || {};
                    var n = e + "=" + t;
                    return n += i.path ? ";path=" + i.path : "", n += i.domain ? ";domain=" + i.domain : "", n += i.expires ? ";expires=" + i.expires.toUTCString() : "", n += i.secure ? ";secure" : ""
                }, t._getCacheFromString = function (e) {
                    for (var i = {}, n = e ? e.split("; ") : [], o = 0; o < n.length; o++) {
                        var r = t._getKeyValuePairFromCookieString(n[o]);
                        void 0 === i[t._cacheKeyPrefix + r.key] && (i[t._cacheKeyPrefix + r.key] = r.value)
                    }
                    return i
                }, t._getKeyValuePairFromCookieString = function (e) {
                    var t = e.indexOf("=");
                    return t = t < 0 ? e.length : t, {
                        key: decodeURIComponent(e.substr(0, t)),
                        value: decodeURIComponent(e.substr(t + 1))
                    }
                }, t._renewCache = function () {
                    t._cache = t._getCacheFromString(t._document.cookie), t._cachedDocumentCookie = t._document.cookie
                }, t._areEnabled = function () {
                    var e = "1" === t.set("cookies.js", 1).get("cookies.js");
                    return t.expire("cookies.js"), e
                }, t.enabled = t._areEnabled(), t
            },
            n = "object" == typeof e.document ? i(e) : i;
        "function" == typeof define && define.amd ? define("dep/cookies-1.2.1", [], function () {
            return n
        }) : "object" == typeof exports ? ("object" == typeof module && "object" == typeof module.exports && (exports = module.exports = n), exports.Cookies = n) : e.Cookies = n
    }("undefined" == typeof window ? this : window), define("lib/plog", ["dep/cookies-1.2.1"], function (e) {
//        var t = {
//            page: window.pageLogId || 0,
//            platform: / Android /.test(navigator.userAgent) ? 8 : 9,
//            did: e("did") || "",
//            product: 1,
//            sendLog: function (e) {
//                $.ajax({
//                    url: "/rest/kd/log/collect",
//                    type: "POST",
//                    dataType: "json",
//                    timeout: 3e3,
//                    data: JSON.stringify({
//                        log: {
//                            event: [e]
//                        }
//                    }),
//                    contentType: "application/json; charset=utf-8"
//                })
//            }, sendEvent: function (e) {
//                for (var t in e) {
//                    var i = e[t],
//                        n = i.url_package;
//                    n || (n = i.url_package = {}), n.page = n.page || this.page
//                }
//                this.sendLog({
//                    client_timestamp: +new Date,
//                    event_package: e,
//                    common_package: {
//                        app_package: {
//                            platform: this.platform,
//                            product: 1
//                        },
//                        identity_package: {
//                            device_id: this.did
//                        }
//                    }
//                })
//            }, sendClick: function (e, t) {
//                this.sendEvent({
//                    click_event: {
//                        element_package: {
//                            action: {
//                                action: e
//                            }
//                        },
//                        content_package: t
//                    }
//                })
//            }, sendShare: function (e) {
//                this.sendEvent({
//                    share_event: e
//                })
//            }, _sendShow: function () {
//                window.location.pathname;
//                this.sendEvent({
//                    show_event: {
//                        action: 1,
//                        url_package: {
//                            params: window.location.search.slice(1)
//                        }
//                    }
//                })
//            }
//        };
//        return t._sendShow(), t
    }), define("lib/wxShareAsync", ["lib/wxReady", "lib/plog"], function (e, t) {
        return function (i, n) {
            if (n = n || {}, i) {
                var o = i.extlog;
                delete i.extlog, e(function (e) {
                    function r(e) {
                        var r = {
                            source: n.source,
                            content_type: n.content_type,
                            platform: e,
                            url_params: o,
                            url: i.link
                        };
                        return $.extend({
                            success: function () {
                                t.sendShare($.extend({
                                    status: 2
                                }, r))
                            }, fail: function () {
                                t.sendShare($.extend({
                                    status: 3
                                }, r))
                            }
                        }, i)
                    }
                    e.onMenuShareTimeline(r(3)), e.onMenuShareAppMessage(r(5)), e.onMenuShareQQ(r(6)), e.onMenuShareWeibo(r(7)), e.onMenuShareQZone(r(4))
                })
            }
        }
    }), define("pages/play/log", ["dep/cookies-1.2.1"], function (e) {
        var t = $("body"),
            i = function (e) {
                window.ksLog.sendAction({
                    event: "task",
                    action: "CLICK",
                    elementName: e
                })
            },
            n = function (e, t) {
                var i = $(e),
                    n = [],
                    o = i.attr(t);
                o && n.push(o);
                for (var r = i;;) {
                    if (r = r.parent().closest("[logp]"), 0 === r.length) break;
                    var s = r.attr("logp");
                    s && n.push(s)
                }
                return n.reverse().join(" ")
            };
        t.on("click", "[log]", function () {
            i(n(this, "log"))
        }).on("click", "[logj]", function () {
            e("logj", n(this, "logj"), {
                path: "/"
            })
        });
        var o = e("logj");
        o && (i(o), e("logj", "", {
            path: "/"
        }))
    }), define("pages/play/video", ["lib/device", "lib/url", "lib/cookie", "lib/openApp"], function (e, t, i, n) {
        var o = window.pageData.video,
            r = {
                $box: null,
                init: function () {
                    var s = this,
                        a = $("#video-box");
                    if (this.$box = a, a.length) {
                        r.resizeCount = 0, r.fixTbsAndQQWebBrowserVedio();
                        var c = $("#video-player");
                        this.$video = c;
                        var l = c[0],
                            u = $("#play_btn");
                        c.click(function () {
                            l.paused && l.play()
                        }), $("#refresh_btn").click(function () {
                            window.location.reload()
                        });
                        var d = +i.getCookie("st_open_app"),
                            p = t.getUrlParam("no_app");
                        d && p && document.addEventListener("WeixinJSBridgeReady", function () {
                            document.getElementById("video-player").play(), window.ksLog && window.ksLog.sendCountTag("live_auto_play")
                        }, !1), u.on("click", function () {
                            if ("live" === o.type && window.pageData.openAppOnPlay && e.isInWeChat() && e.supportUniversalLink() && !d) {
                                i.setCookie("st_open_app", 1, {
                                    expires: 1 / 24 / 60
                                });
                                var t = (location.href.indexOf("?") > 0 ? "&" : "?") + "no_app=1",
                                    r = "https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8",
                                    a = e.getIOSVersion() < 11 ? r : location.href + t;
                                n.open({
                                    schemeUrl: r,
                                    ulFallbackUrl: a,
                                    position: "live_play_btn"
                                })
                            }
                            s.renderStat("loading"), l.play()
                        }), c.css({
                            maxHeight: screen.height
                        }), c.one("playing", function () {
                            "live" === o.type && s.liveFeedInit(), s.renderStat("playing")
                        }), $(".in_open_hide").on("click", function () {
                            $(".in_open").hide()
                        }), this.disclaimerInit()
                    }
                }, disclaimerInScreen: !1,
                disclaimerInit: function () {
                    var e = this,
                        t = $("#disclaimer");
                    if (0 !== t.length) {
                        var i = $(window),
                            n = $("#video-box");
                        i.on("scroll", function () {
                            var o = n.offset().top + n.height() > i.scrollTop() + i.height();
                            e.disclaimerInScreen !== o && (e.disclaimerInScreen = o, o ? t.appendTo("body") : t.appendTo(n))
                        }).trigger("scroll")
                    }
                }, _stat: "",
                renderStat: function (e) {
                    e !== this._stat && (this._stat = e, this.$box.attr("class", function (e, t) {
                        return t.replace(/\bst-\S*/, "st-" + status)
                    }))
                }, liveFeedInit: function () {
                    var e, t = this,
                        i = 2,
                        n = [],
                        r = $("#comment_box"),
                        s = o.liveStreamId;
                    ! function o() {
                        $.ajax({
                            url: "/wap/live/feed",
                            data: {
                                liveStreamId: s,
                                cursor: e
                            },
                            success: function (s) {
                                "string" == typeof s && (s = JSON.parse(s)), 1 == s.result ? (e = s.cursor, i = s.pullCycleSeconds, n = n.concat(s.liveStreamFeeds).slice(-7), r.html(_.map(n, function (e) {
                                        return '<div class="comment"><div class="name">' + e.author.userName + '：</div><div class="content">' + e.content + "</div></div>"
                                    }).join("")).scrollTop(999),
                                    setTimeout(o, 1e3 * i)) : 601 === s.result && t.renderStat("end")
                            }, error: function () {
                                setTimeout(o, 1e3 * i)
                            }
                        })
                    }()
                }, fixTbsAndQQWebBrowserVedio: function () {
                    var e = $("#video-box");
                    if (r.getHackPopDownloadBrowser()) {
                        $("#download_pop").find(".play_download_pop_box").find(".img").remove()
                    }
                    $(window).on("resize", function () {
                        r.resizeCount++, r.getHackPopDownloadBrowser() && r.resizeCount % 2 != 0 && $(".play_download_pop_box").css({
                            top: e.offset().top,
                            "-webkit-transform": "translateX(-50%)",
                            webkit: "translateX(-50%)"
                        })
                    })
                }, resizeCount: 0,
                getHackPopDownloadBrowser: function () {
                    return e.isAndroid() && e.isInQQWebBrowser() || e.isInTBS() && e.isInWeChat()
                }
            };
        r.init()
    }), define("dep/lazyload", [], function () {
        function e() {}

        function t(e, t) {
            return (t._$container == u ? ("innerHeight" in l ? l.innerHeight : u.height()) + u.scrollTop() : t._$container.offset().top + t._$container.height()) <= e.offset().top - t.threshold
        }

        function i(e, t) {
            return (t._$container == u ? u.width() + ($.fn.scrollLeft ? u.scrollLeft() : l.pageXOffset) : t._$container.offset().left + t._$container.width()) <= e.offset().left - t.threshold
        }

        function n(e, t) {
            return (t._$container == u ? u.scrollTop() : t._$container.offset().top) >= e.offset().top + t.threshold + e.height()
        }

        function o(e, t) {
            return (t._$container == u ? $.fn.scrollLeft ? u.scrollLeft() : l.pageXOffset : t._$container.offset().left) >= e.offset().left + t.threshold + e.width()
        }

        function r(e, r) {
            var s = 0;
            e.each(function (a, c) {
                function l() {
                    u.trigger("_lazyload_appear"), s = 0
                }
                var u = e.eq(a);
                if (!(u.width() <= 0 && u.height() <= 0 || "none" === u.css("display")))
                    if (r.vertical_only)
                        if (n(u, r));
                        else if (t(u, r)) {
                    if (++s > r.failure_limit) return !1
                } else l();
                else if (n(u, r) || o(u, r));
                else if (t(u, r) || i(u, r)) {
                    if (++s > r.failure_limit) return !1
                } else l()
            })
        }

        function s(e) {
            return e.filter(function (t, i) {
                return !e.eq(t)._lazyload_loadStarted
            })
        }

        function a(e, t) {
            function i() {
                s = 0, a = +new Date, r = e.apply(n, o), n = null, o = null
            }
            var n, o, r, s, a = 0;
            return function () {
                n = this, o = arguments;
                var e = new Date - a;
                return s || (e >= t ? i() : s = setTimeout(i, t - e)), r
            }
        }
        var c, l = window,
            u = $(l),
            d = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                effect_params: null,
                container: l,
                data_attribute: "original",
                data_srcset_attribute: "original-srcset",
                skip_invisible: !0,
                appear: e,
                load: e,
                vertical_only: !1,
                check_appear_throttle_time: 300,
                url_rewriter_fn: e,
                no_fake_img_loader: !1,
                placeholder_data_img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
                placeholder_real_img: "http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png"
            };
        c = function () {
            var e = Object.prototype.toString;
            return function (t) {
                return e.call(t).replace("[object ", "").replace("]", "")
            }
        }(), $.fn.hasOwnProperty("lazyload") || ($.fn.lazyload = function (t) {
            var i, n, o, p = this;
            return $.isPlainObject(t) || (t = {}), $.each(d, function (e, i) {
                var n = c(t[e]); - 1 != $.inArray(e, ["threshold", "failure_limit", "check_appear_throttle_time"]) ? "String" == n ? t[e] = parseInt(t[e], 10) : "Number" != n && (t[e] = i) : "container" == e ? (t.hasOwnProperty(e) ? t[e] == l || t[e] == document ? t._$container = u : t._$container = $(t[e]) : t._$container = u, delete t.container) : !d.hasOwnProperty(e) || t.hasOwnProperty(e) && n == c(d[e]) || (t[e] = i)
            }), i = "scroll" == t.event, o = 0 == t.check_appear_throttle_time ? r : a(r, t.check_appear_throttle_time), n = i || "scrollstart" == t.event || "scrollstop" == t.event, p.each(function (i, o) {
                var r = this,
                    a = p.eq(i),
                    c = a.attr("src"),
                    l = a.attr("data-" + t.data_attribute),
                    u = t.url_rewriter_fn == e ? l : t.url_rewriter_fn.call(r, a, l),
                    d = a.attr("data-" + t.data_srcset_attribute),
                    h = a.is("img");
                if (1 == a._lazyload_loadStarted || c == u) return a._lazyload_loadStarted = !0, void(p = s(p));
                a._lazyload_loadStarted = !1, h && !c && a.one("error", function () {
                    a.attr("src", t.placeholder_real_img)
                }).attr("src", t.placeholder_data_img), a.one("_lazyload_appear", function () {
                    function i() {
                        n && a.hide(), h ? (d && a.attr("srcset", d), u && a.attr("src", u)) : a.css("background-image", 'url("' + u + '")'), n && a[t.effect].apply(a, o ? t.effect_params : []), p = s(p)
                    }
                    var n, o = $.isArray(t.effect_params);
                    a._lazyload_loadStarted || (n = "show" != t.effect && $.fn[t.effect] && (!t.effect_params || o && 0 == t.effect_params.length), t.appear != e && t.appear.call(r, a, p.length, t), a._lazyload_loadStarted = !0, t.no_fake_img_loader || d ? (t.load != e && a.one("load", function () {
                        t.load.call(r, a, p.length, t)
                    }), i()) : $("<img />").one("load", function () {
                        i(), t.load != e && t.load.call(r, a, p.length, t)
                    }).attr("src", u))
                }), n || a.on(t.event, function () {
                    a._lazyload_loadStarted || a.trigger("_lazyload_appear")
                })
            }), n && t._$container.on(t.event, function () {
                o(p, t)
            }), u.on("resize load", function () {
                o(p, t)
            }), $(function () {
                o(p, t)
            }), this
        })
    }),
    function (e, t, i) {
        function n(i, n) {
            this.wrapper = "string" == typeof i ? t.querySelector(i) : i, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                disablePointer: !r.hasPointer,
                disableTouch: r.hasPointer || !r.hasTouch,
                disableMouse: r.hasPointer || r.hasTouch,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0,
                bindToWrapper: void 0 === e.onmousedown
            };
            for (var o in n) this.options[o] = n[o];
            this.translateZ = this.options.HWCompositing && r.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = r.hasTransition && this.options.useTransition, this.options.useTransform = r.hasTransform && this.options.useTransform, this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? r.ease[this.options.bounceEasing] || r.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, !0 === this.options.tap && (this.options.tap = "tap"), this.options.useTransition || this.options.useTransform || /relative|absolute/i.test(this.scrollerStyle.position) || (this.scrollerStyle.position = "relative"), this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
        }
        var o = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) {
                e.setTimeout(t, 1e3 / 60)
            },
            r = function () {
                function n(e) {
                    return !1 !== s && ("" === s ? e : s + e.charAt(0).toUpperCase() + e.substr(1))
                }
                var o = {},
                    r = t.createElement("div").style,
                    s = function () {
                        for (var e = ["t", "webkitT", "MozT", "msT", "OT"], t = 0, i = e.length; t < i; t++)
                            if (e[t] + "ransform" in r) return e[t].substr(0, e[t].length - 1);
                        return !1
                    }();
                o.getTime = Date.now || function () {
                    return (new Date).getTime()
                }, o.extend = function (e, t) {
                    for (var i in t) e[i] = t[i]
                }, o.addEvent = function (e, t, i, n) {
                    e.addEventListener(t, i, !!n)
                }, o.removeEvent = function (e, t, i, n) {
                    e.removeEventListener(t, i, !!n)
                }, o.prefixPointerEvent = function (t) {
                    return e.MSPointerEvent ? "MSPointer" + t.charAt(7).toUpperCase() + t.substr(8) : t
                }, o.momentum = function (e, t, n, o, r, s) {
                    var a, c, l = e - t,
                        u = i.abs(l) / n;
                    return s = void 0 === s ? 6e-4 : s, a = e + u * u / (2 * s) * (l < 0 ? -1 : 1), c = u / s, a < o ? (a = r ? o - r / 2.5 * (u / 8) : o, l = i.abs(a - e), c = l / u) : a > 0 && (a = r ? r / 2.5 * (u / 8) : 0, l = i.abs(e) + a, c = l / u), {
                        destination: i.round(a),
                        duration: c
                    }
                };
                var a = n("transform");
                return o.extend(o, {
                    hasTransform: !1 !== a,
                    hasPerspective: n("perspective") in r,
                    hasTouch: "ontouchstart" in e,
                    hasPointer: !(!e.PointerEvent && !e.MSPointerEvent),
                    hasTransition: n("transition") in r
                }), o.isBadAndroid = function () {
                    var t = e.navigator.appVersion;
                    if (/Android/.test(t) && !/Chrome\/\d/.test(t)) {
                        var i = t.match(/Safari\/(\d+.\d)/);
                        return !(i && "object" == typeof i && i.length >= 2) || parseFloat(i[1]) < 535.19
                    }
                    return !1
                }(), o.extend(o.style = {}, {
                    transform: a,
                    transitionTimingFunction: n("transitionTimingFunction"),
                    transitionDuration: n("transitionDuration"),
                    transitionDelay: n("transitionDelay"),
                    transformOrigin: n("transformOrigin"),
                    touchAction: n("touchAction")
                }), o.hasClass = function (e, t) {
                    return new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
                }, o.addClass = function (e, t) {
                    if (!o.hasClass(e, t)) {
                        var i = e.className.split(" ");
                        i.push(t), e.className = i.join(" ")
                    }
                }, o.removeClass = function (e, t) {
                    if (o.hasClass(e, t)) {
                        var i = new RegExp("(^|\\s)" + t + "(\\s|$)", "g");
                        e.className = e.className.replace(i, " ")
                    }
                }, o.offset = function (e) {
                    for (var t = -e.offsetLeft, i = -e.offsetTop; e = e.offsetParent;) t -= e.offsetLeft, i -= e.offsetTop;
                    return {
                        left: t,
                        top: i
                    }
                }, o.preventDefaultException = function (e, t) {
                    for (var i in t)
                        if (t[i].test(e[i])) return !0;
                    return !1
                }, o.extend(o.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }), o.extend(o.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function (e) {
                            return e * (2 - e)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function (e) {
                            return i.sqrt(1 - --e * e)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function (e) {
                            return (e -= 1) * e * (5 * e + 4) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function (e) {
                            return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function (e) {
                            return 0 === e ? 0 : 1 == e ? 1 : .4 * i.pow(2, -10 * e) * i.sin((e - .055) * (2 * i.PI) / .22) + 1
                        }
                    }
                }), o.tap = function (e, i) {
                    var n = t.createEvent("Event");
                    n.initEvent(i, !0, !0), n.pageX = e.pageX, n.pageY = e.pageY, e.target.dispatchEvent(n)
                }, o.click = function (i) {
                    var n, o = i.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(o.tagName) || (n = t.createEvent(e.MouseEvent ? "MouseEvents" : "Event"), n.initEvent("click", !0, !0), n.view = i.view || e, n.detail = 1, n.screenX = o.screenX || 0, n.screenY = o.screenY || 0, n.clientX = o.clientX || 0, n.clientY = o.clientY || 0, n.ctrlKey = !!i.ctrlKey, n.altKey = !!i.altKey, n.shiftKey = !!i.shiftKey, n.metaKey = !!i.metaKey, n.button = 0, n.relatedTarget = null, n._constructed = !0, o.dispatchEvent(n))
                }, o.getTouchAction = function (e, t) {
                    var i = "none";
                    return "vertical" === e ? i = "pan-y" : "horizontal" === e && (i = "pan-x"), t && "none" != i && (i += " pinch-zoom"), i
                }, o.getRect = function (e) {
                    if (e instanceof SVGElement) {
                        var t = e.getBoundingClientRect();
                        return {
                            top: t.top,
                            left: t.left,
                            width: t.width,
                            height: t.height
                        }
                    }
                    return {
                        top: e.offsetTop,
                        left: e.offsetLeft,
                        width: e.offsetWidth,
                        height: e.offsetHeight
                    }
                }, o
            }();
        n.prototype = {
            version: "5.2.0-snapshot",
            _init: function () {
                this._initEvents()
            }, destroy: function () {
                this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
            }, _transitionEnd: function (e) {
                e.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
            }, _start: function (e) {
                if (1 != r.eventType[e.type]) {
                    if (0 !== (e.which ? e.button : e.button < 2 ? 0 : 4 == e.button ? 1 : 2)) return
                }
                if (this.enabled && (!this.initiated || r.eventType[e.type] === this.initiated)) {
                    !this.options.preventDefault || r.isBadAndroid || r.preventDefaultException(e.target, this.options.preventDefaultException) || e.preventDefault();
                    var t, n = e.touches ? e.touches[0] : e;
                    this.initiated = r.eventType[e.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this.startTime = r.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, t = this.getComputedPosition(), this._translate(i.round(t.x), i.round(t.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = n.pageX, this.pointY = n.pageY, this._execEvent("beforeScrollStart")
                }
            }, _move: function (e) {
                if (this.enabled && r.eventType[e.type] === this.initiated) {
                    this.options.preventDefault && e.preventDefault();
                    var t, n, o, s, a = e.touches ? e.touches[0] : e,
                        c = a.pageX - this.pointX,
                        l = a.pageY - this.pointY,
                        u = r.getTime();
                    if (this.pointX = a.pageX, this.pointY = a.pageY, this.distX += c, this.distY += l, o = i.abs(this.distX), s = i.abs(this.distY), !(u - this.endTime > 300 && o < 10 && s < 10)) {
                        if (this.directionLocked || this.options.freeScroll || (o > s + this.options.directionLockThreshold ? this.directionLocked = "h" : s >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                            if ("vertical" == this.options.eventPassthrough) e.preventDefault();
                            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                            l = 0
                        } else if ("v" == this.directionLocked) {
                            if ("horizontal" == this.options.eventPassthrough) e.preventDefault();
                            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                            c = 0
                        }
                        c = this.hasHorizontalScroll ? c : 0, l = this.hasVerticalScroll ? l : 0, t = this.x + c, n = this.y + l, (t > 0 || t < this.maxScrollX) && (t = this.options.bounce ? this.x + c / 3 : t > 0 ? 0 : this.maxScrollX), (n > 0 || n < this.maxScrollY) && (n = this.options.bounce ? this.y + l / 3 : n > 0 ? 0 : this.maxScrollY), this.directionX = c > 0 ? -1 : c < 0 ? 1 : 0, this.directionY = l > 0 ? -1 : l < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(t, n), u - this.startTime > 300 && (this.startTime = u, this.startX = this.x, this.startY = this.y)
                    }
                }
            }, _end: function (e) {
                if (this.enabled && r.eventType[e.type] === this.initiated) {
                    this.options.preventDefault && !r.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
                    var t, n, o = (e.changedTouches && e.changedTouches[0], r.getTime() - this.startTime),
                        s = i.round(this.x),
                        a = i.round(this.y),
                        c = i.abs(s - this.startX),
                        l = i.abs(a - this.startY),
                        u = 0,
                        d = "";
                    if (this.isInTransition = 0, this.initiated = 0, this.endTime = r.getTime(), !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(s, a), !this.moved) return this.options.tap && r.tap(e, this.options.tap), this.options.click && r.click(e), void this._execEvent("scrollCancel");
                        if (this._events.flick && o < 200 && c < 100 && l < 100) return void this._execEvent("flick");
                        if (this.options.momentum && o < 300 && (t = this.hasHorizontalScroll ? r.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                            destination: s,
                            duration: 0
                        }, n = this.hasVerticalScroll ? r.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                            destination: a,
                            duration: 0
                        }, s = t.destination, a = n.destination, u = i.max(t.duration, n.duration), this.isInTransition = 1), s != this.x || a != this.y) return (s > 0 || s < this.maxScrollX || a > 0 || a < this.maxScrollY) && (d = r.ease.quadratic), void this.scrollTo(s, a, u, d);
                        this._execEvent("scrollEnd")
                    }
                }
            }, _resize: function () {
                var e = this;
                clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function () {
                    e.refresh()
                }, this.options.resizePolling)
            }, resetPosition: function (e) {
                var t = this.x,
                    i = this.y;
                return e = e || 0, !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), (t != this.x || i != this.y) && (this.scrollTo(t, i, e, this.options.bounceEasing), !0)
            }, disable: function () {
                this.enabled = !1
            }, enable: function () {
                this.enabled = !0
            }, refresh: function () {
                r.getRect(this.wrapper), this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight;
                var e = r.getRect(this.scroller);
                this.scrollerWidth = e.width, this.scrollerHeight = e.height, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, r.hasPointer && !this.options.disablePointer && (this.wrapper.style[r.style.touchAction] = r.getTouchAction(this.options.eventPassthrough, !0), this.wrapper.style[r.style.touchAction] || (this.wrapper.style[r.style.touchAction] = r.getTouchAction(this.options.eventPassthrough, !1))), this.wrapperOffset = r.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
            }, on: function (e, t) {
                this._events[e] || (this._events[e] = []), this._events[e].push(t)
            }, off: function (e, t) {
                if (this._events[e]) {
                    var i = this._events[e].indexOf(t);
                    i > -1 && this._events[e].splice(i, 1)
                }
            }, _execEvent: function (e) {
                if (this._events[e]) {
                    var t = 0,
                        i = this._events[e].length;
                    if (i)
                        for (; t < i; t++) this._events[e][t].apply(this, [].slice.call(arguments, 1))
                }
            }, scrollBy: function (e, t, i, n) {
                e = this.x + e, t = this.y + t, i = i || 0, this.scrollTo(e, t, i, n)
            }, scrollTo: function (e, t, i, n) {
                n = n || r.ease.circular, this.isInTransition = this.options.useTransition && i > 0;
                var o = this.options.useTransition && n.style;
                !i || o ? (o && (this._transitionTimingFunction(n.style), this._transitionTime(i)), this._translate(e, t)) : this._animate(e, t, i, n.fn)
            }, scrollToElement: function (e, t, n, o, s) {
                if (e = e.nodeType ? e : this.scroller.querySelector(e)) {
                    var a = r.offset(e);
                    a.left -= this.wrapperOffset.left, a.top -= this.wrapperOffset.top;
                    var c = r.getRect(e),
                        l = r.getRect(this.wrapper);
                    !0 === n && (n = i.round(c.width / 2 - l.width / 2)), !0 === o && (o = i.round(c.height / 2 - l.height / 2)), a.left -= n || 0, a.top -= o || 0, a.left = a.left > 0 ? 0 : a.left < this.maxScrollX ? this.maxScrollX : a.left, a.top = a.top > 0 ? 0 : a.top < this.maxScrollY ? this.maxScrollY : a.top, t = void 0 === t || null === t || "auto" === t ? i.max(i.abs(this.x - a.left), i.abs(this.y - a.top)) : t, this.scrollTo(a.left, a.top, t, s)
                }
            }, _transitionTime: function (e) {
                if (this.options.useTransition) {
                    e = e || 0;
                    var t = r.style.transitionDuration;
                    if (t && (this.scrollerStyle[t] = e + "ms", !e && r.isBadAndroid)) {
                        this.scrollerStyle[t] = "0.0001ms";
                        var i = this;
                        o(function () {
                            "0.0001ms" === i.scrollerStyle[t] && (i.scrollerStyle[t] = "0s")
                        })
                    }
                }
            }, _transitionTimingFunction: function (e) {
                this.scrollerStyle[r.style.transitionTimingFunction] = e
            }, _translate: function (e, t) {
                this.options.useTransform ? this.scrollerStyle[r.style.transform] = "translate(" + e + "px," + t + "px)" + this.translateZ : (e = i.round(e), t = i.round(t), this.scrollerStyle.left = e + "px", this.scrollerStyle.top = t + "px"), this.x = e, this.y = t
            }, _initEvents: function (t) {
                var i = t ? r.removeEvent : r.addEvent,
                    n = this.options.bindToWrapper ? this.wrapper : e;
                i(e, "orientationchange", this), i(e, "resize", this), this.options.click && i(this.wrapper, "click", this, !0), this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(n, "mousemove", this), i(n, "mousecancel", this), i(n, "mouseup", this)), r.hasPointer && !this.options.disablePointer && (i(this.wrapper, r.prefixPointerEvent("pointerdown"), this), i(n, r.prefixPointerEvent("pointermove"), this), i(n, r.prefixPointerEvent("pointercancel"), this), i(n, r.prefixPointerEvent("pointerup"), this)), r.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(n, "touchmove", this), i(n, "touchcancel", this), i(n, "touchend", this)), i(this.scroller, "transitionend", this), i(this.scroller, "webkitTransitionEnd", this), i(this.scroller, "oTransitionEnd", this), i(this.scroller, "MSTransitionEnd", this)
            }, getComputedPosition: function () {
                var t, i, n = e.getComputedStyle(this.scroller, null);
                return this.options.useTransform ? (n = n[r.style.transform].split(")")[0].split(", "), t = +(n[12] || n[4]), i = +(n[13] || n[5])) : (t = +n.left.replace(/[^-\d.]/g, ""), i = +n.top.replace(/[^-\d.]/g, "")), {
                    x: t,
                    y: i
                }
            }, _animate: function (e, t, i, n) {
                function s() {
                    var p, h, f, m = r.getTime();
                    if (m >= d) return a.isAnimating = !1, a._translate(e, t), void(a.resetPosition(a.options.bounceTime) || a._execEvent("scrollEnd"));
                    m = (m - u) / i, f = n(m), p = (e - c) * f + c, h = (t - l) * f + l, a._translate(p, h), a.isAnimating && o(s)
                }
                var a = this,
                    c = this.x,
                    l = this.y,
                    u = r.getTime(),
                    d = u + i;
                this.isAnimating = !0, s()
            }, handleEvent: function (e) {
                switch (e.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(e);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(e);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(e);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(e);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(e);
                    break;
                case "keydown":
                    this._key(e);
                    break;
                case "click":
                    this.enabled && !e._constructed && (e.preventDefault(), e.stopPropagation())
                }
            }
        }, n.utils = r, "undefined" != typeof module && module.exports ? module.exports = n : "function" == typeof define && define.amd ? define("dep/iscroll-5.2.0/iscroll-lite", [], function () {
            return n
        }) : e.IScroll = n
    }(window, document, Math), define("pages/play/userVideos", ["dep/iscroll-5.2.0/iscroll-lite"], function (e) {
        ({
            init: function () {
                $("#other_video").length && new e("#other_video", {
                    eventPassthrough: !0,
                    scrollX: !0,
                    scrollY: !1
                })
            }
        }).init()
    }), require(["lib/smoothScroll", "lib/device", "lib/openApp", "lib/wxShareAsync", "dep/cookies-1.2.1", "pages/play/log", "pages/play/video", "dep/lazyload", "pages/play/userVideos"], function (e, t, i, n, o) {
        var r = window.pageData;
        r && r.share && n(r.share, {
            source: "live" === r.video.type ? 4 : 2,
            content_package: "live" === r.video.type ? 1 : 2
        });
        var s = r.showDownLoadBarAlways || !1,
            a = {
                init: function () {
                    this.downloadBarInit(), this.audioInit(), !r.video || "images" !== r.video.type && "image_long" !== r.video.type || this.imagesInit(), i.init({
                        $element: $("._download"),
                        extraParam: t.getDeviceHeightAndWidth()
                    }), this.openAppLimit(), this.heartbeatLog(), $("#hots .col").each(function () {
                        $("[data-lazy]", this).lazyload({
                            threshold: 200,
                            vertical_only: !0,
                            data_attribute: "lazy"
                        })
                    }), $("#fuser_close").click(function () {
                        $("#fuser").remove()
                    }), $("video").on("x5videoenterfullscreen", function () {
                        $("body").addClass("x5-fullscreen")
                    }).on("x5videoexitfullscreen", function () {
                        $("body").removeClass("x5-fullscreen")
                    }), this.addBackPage(), setTimeout(a.abAuth, 50)
                }, abAuth: function () {
                    var e = Math.floor(Date.now() / 864e5);
                    /\.gifshow\.com$/.test(location.host) && !o("ab0109") && t.isInWeChat() && (parseInt((o("did") || "").slice(-2), 16) || 0) % 8 == e % 8 && (window.ksLog.sendAction({
                        event: "task",
                        action: "CLICK",
                        elementName: "ab0109"
                    }), o("ab0109", "1", {
                        expires: "2020/02/28",
                        domain: location.host.split(".").slice(-2).join(".")
                    }), setTimeout(function () {
                        window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?" + $.param({
                            appid: "wx9227d48257374438",
                            redirect_uri: "https://www.kuaishoupay.com/rest/wd/wechat/share/oauth1",
                            response_type: "code",
                            scope: "snsapi_userinfo",
                            state: location.href
                        }) + "#wechat_redirect"
                    }, 100))
                }, addBackPage: function () {
                    var e = r.user;
                    if (e && t.isInWeChat() && 1 === history.length) {
                        var i = "/user/" + e.id,
                            n = location.href;
                        history.replaceState({
                            page: "weixinlist"
                        }, null, i), history.pushState({
                            page: "weixindetail"
                        }, null, n), window.onpopstate = function (e) {
                            e.state && "weixinlist" === e.state.page && location.reload()
                        }
                    }
                }, openAppLimit: function () {
                    var e = o("share_open_app_limit") || "1";
                    e = Number(e);
                    var t = $("#download_pop");
                    t.find("._cancel").click(function () {
                        t.hide()
                    }), e > 10 ? (t.show(), o("share_open_app_limit", "", {
                        path: "/"
                    })) : (o("share_open_app_limit", e + 1, {
                        path: "/",
                        expires: 600
                    }), setTimeout(function () {
                        t.show()
                    }, 18e4))
                }, heartbeatLog: function () {
                    var e = [$("body").attr("logp") || ""];
                    e.push("hb");
                    var i = t.getBrowserDesc();
                    "android" == i || "ios" === i ? (e.push(i), e.push("other")) : (e.push(t.isAndroid() ? "android" : "ios"), e.push(i)), e.push(r.autoPlay ? "autoplay" : "noauto"), e = e.join(" ");
                    var n = [0, .05, .1, .2, .5, 1, 3];
                    _.each(n, function (t) {
                        setTimeout(function () {
                            window.ksLog.sendAction({
                                event: "task",
                                action: "CLICK",
                                elementName: e + " " + t
                            })
                        }, 60 * t * 1e3)
                    })
                }, imagesInit: function () {
                    var t = $("#play_images_box");
                    t.one("click", function () {
                        e(t.height() + t.offset().top, 800), t.addClass("open"), t.find("[data-lazy]").lazyload({
                            threshold: 200,
                            vertical_only: !0,
                            data_attribute: "lazy"
                        })
                    })
                }, audioInit: function () {
                    var e = $("#play_images_audiobtn"),
                        t = $("#play_images_audio")[0];
                    t && ($("body").one("touchstart", function () {
                        t.play()
                    }), e.click(function () {
                        t.paused ? (e.removeClass("disabled"), t.play()) : (e.addClass("disabled"), t.pause())
                    }))
                }, downloadBarInit: function () {
                    $(function () {
                        var e = $(window),
                            t = $("#download_bar"),
                            i = $("#download_offset"),
                            n = 350 - e.height(),
                            o = !1;
                        !0 === s ? (o = !0, t.toggle(o)) : e.on("scroll", function () {
                            var r = e.scrollTop() > i.offset().top + n;
                            o !== r && (o = r, t.toggle(o))
                        }).trigger("scroll")
                    })
                }
            };
        a.init()
    }), define("pages/play/play", function () {});
    var hostUrl = "";
    function getMyURLParameter(param) {
    	try {
    		hostUrl = window.location.href;
    		getMyUrl(hostUrl);
    	} catch (e) {
    		hostUrl = document.URL;
    		getMyUrl(hostUrl);
    	}
    	for (;;) {
    		if (hostUrl.endWith && hostUrl.endWith('#')) {
    			hostUrl = hostUrl.substring(0, hostUrl.length - 1);
    		} else {
    			break;
    		}
    	}

    	var params = (hostUrl.substr(hostUrl.indexOf("?") + 1)).split("&");
    	if (params != null) {
    		for (var i = 0; i < params.length; i++) {
    			var strsName = params[i].substr(0, params[i].indexOf("="));
    			var strsValue = params[i]
    					.substr(params[i].indexOf("=") + 1);
    			if (strsName == param) {
    				return strsValue;
    			}
    		}
    	}
    }    
    function getMyUrl(uri){
    	var counter = 0;
    	var index = 0;
    	for(var i=0;i<uri.length;i++){
    		if(uri[i]==='?' && index < 2){
    			counter = i;
    			index++;
    		}
    	}
    	if(index>1){
    		hostUrl = uri.substring(0,counter);
    	}else{
    		hostUrl = uri;
    	}

    }

    function getMyURLParameter(param) {
    	try {
    		hostUrl = window.location.href;
    		getMyUrl(hostUrl);
    	} catch (e) {
    		hostUrl = document.URL;
    		getMyUrl(hostUrl);
    	}
    	for (;;) {
    		if (hostUrl.endWith && hostUrl.endWith('#')) {
    			hostUrl = hostUrl.substring(0, hostUrl.length - 1);
    		} else {
    			break;
    		}
    	}

    	var params = (hostUrl.substr(hostUrl.indexOf("?") + 1)).split("&");
    	if (params != null) {
    		for (var i = 0; i < params.length; i++) {
    			var strsName = params[i].substr(0, params[i].indexOf("="));
    			var strsValue = params[i]
    					.substr(params[i].indexOf("=") + 1);
    			if (strsName == param) {
    				return strsValue;
    			}
    		}
    	}
    }