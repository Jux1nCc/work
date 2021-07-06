var config = {
    _env: 'development',
    _img: 'image/default.png',
    _path: {
        development: 'http://192.168.1.42:8090',
        developmentJiaWen: 'http://192.168.1.42:8081',
        developziwen: 'http://192.168.1.122:8090',
        developXuWei: 'http://192.168.1.233:8080',
        demo: 'http://120.76.100.6:8080',//大版本测试环境
        demoMini: 'http://47.112.125.109:80', //小版本测试环境
        demoMax: 'http://120.79.53.29:8082',
        demoQS: 'https://testcall.zzright.cn', //铢铢测试环境        
      	prodQS: 'https://call.zzright.cn', //铢铢线上环境
        prod: 'http://app.expertol.cn',
        production: 'http://app.expertol.cn',
    },
    browser: {
        versions: function () {
            var u = navigator.userAgent;
            return {
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1,
                iPad: u.indexOf('iPad') > -1,
                iPod: u.indexOf('iPod') > -1,

            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    timer: null,
    _bind: function () {
        var _this = this;
        return _this._path[_this._env]
    },
    _init: function () {
    },
    toUrl: function (env, url) {
        config._env = env || 'demo';
        var BASE_URL = config._bind()
        return BASE_URL + url;
    },
    // 获取路径拼接中的参数query
    getQueryStringByName: function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    },
    setQueryConfig: function (queryConfig) {
        var _str = "";
        for (var o in queryConfig) {
            if (queryConfig[o] || queryConfig[o] == 0) {
                _str += o + "=" + queryConfig[o] + "&";
            }
        }
        var _str = _str.substring(0, _str.length - 1);
        return _str;
    },
    getQueryAll: function () {
        var path = window.location.href;
        var arr = (path.split("?")[1] || '').split("&");
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            (function (index) {
                obj[arr[index].split('=')[0]] = arr[index].split('=')[1]
            })(i)
        }
        return obj;
    },
    yfAlert: function (title) {
        layer.msg(title, { shade: 0.5 });
    },
    dialogComm: function (contain, className) {
        layer.closeAll()
        layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            shade: .85,
            closeBtn: 0,
            scrollbar: false,
            skin: className || 'yourclass',
            content: contain,
            end: function () {
            }
        })
        $('.dialog-close').on('click', function () {
            layer.closeAll()
        })
    },
    substrLen: function (str, index) {
        var encode = config.utf16toEntities(str || '暂无');
        var result = (encode || '').substr(0, index) + ((encode || '').length > index ? '…' : '');
        if (result.indexOf('&#') > -1) {
            result = result.substr(0, result.indexOf('&#')) + config.uncodeUtf16(encode.substr(encode.indexOf('&#'), encode.indexOf(';')))
        }
        if (result.indexOf('&') > -1) {
            result = result.substr(0, result.indexOf('&')) + config.uncodeUtf16(encode.substr(encode.indexOf('&'), encode.indexOf(';')))
        }

        return result;
        // try{
        // if(!Array.from){
        // Array.from = function(iterable){
        // return [].slice.call(new Uint8Array(iterable));
        // }
        // }
        // return (Array.from(str || '').slice(0, index).join('') || (str || '').substr(0, index))  + ((str || '').length>index?'…':'')
    },
    utf16toEntities: function (str) {
        var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
        str = str.replace(patt, function (char) {
            var H, L, code;
            if (char.length === 2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                return "&#" + code + ";";
            } else {
                return char;
            }
        });
        return str;
    },
    uncodeUtf16: function (str) {
        var reg = /\&#.*?;/g;
        var result = str.replace(reg, function (char) {
            var H, L, code;
            if (char.length == 9) {
                code = parseInt(char.match(/[0-9]+/g));
                H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
                L = (code - 0x10000) % 0x400 + 0xDC00;
                return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
            } else {
                return char;
            }
        });
        return result;
    },
    isEmojiCharacter: function (substring) {
        for (var i = 0; i < substring.length; i++) {
            var hs = substring.charCodeAt(i);
            if (0xd800 <= hs && hs <= 0xdbff) {
                if (substring.length > 1) {
                    var ls = substring.charCodeAt(i + 1);
                    var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                    if (0x1d000 <= uc && uc <= 0x1f77f) {
                        return true;
                    }
                }
            } else if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                if (ls == 0x20e3) {
                    return true;
                }
            } else {
                if (0x2100 <= hs && hs <= 0x27ff) {
                    return true;
                } else if (0x2B05 <= hs && hs <= 0x2b07) {
                    return true;
                } else if (0x2934 <= hs && hs <= 0x2935) {
                    return true;
                } else if (0x3297 <= hs && hs <= 0x3299) {
                    return true;
                } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                    || hs == 0x2b50) {
                    return true;
                }
            }
        }
    },
    toThousands: function (num) {
        var num = (num || 0).toString(), result = '', date = num.split('.')[0];
        while (date.length > 3) {
            result = ',' + date.slice(-3) + result;
            date = date.slice(0, date.length - 3);
        }
        if (date) { result = date + result; }
        if (num.split('.')[1]) { result += '.' + num.split('.')[1] }
        return result;
    },
    openOutApp: function () {
        if (!openInWebview()) {
            config.dialogComm($('#openOutApp'), 'openOutApp');
            return;
        }
    },
    isLogin: function () {
        config.dialogComm($('#isLogin'), 'isLogin');
        return;
    },
    openTip: function () {
        config.dialogComm($('#clue'), 'clue');
        return;
    },
    openMask: function () {
        var ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/QQ/i) == 'qq') { // 微信浏览器判断,  QQ浏览器判断
            if (ua.match(/Android/i) != null) {  //安卓客户端浏览器
                config.dialogComm('<div id="mask-android"></div>', 'mask');
                return false;
            } else if (ua.match(/iPhone/i) != null) {  //iphone手机客户端
                $config.dialogComm('<div id="mask-ios"></div>', 'mask');
                return false;
            }
        }
        return true;
    },
    checkPhone: function (phone) {
        const reg = /^1[356789]\d{9}$/;
        return reg.test(phone);
    },
    checkEmail: function (email) {
        const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        return reg.test(email);
    },
    loading: function () {
        layer.load(1, {
            success: function (layero) {
                layero.find('.layui-layer-content').css({
                    'padding-top': '40px',
                    'width': '70px',
                    'background-position-x': '16px',
                    'color': '#fff',
                });
            }
        });
    },
    closeLoading: function () {
        layer.closeAll('loading')
    },
    addObserver: function () {
        var observer = new IntersectionObserver(function (changes) {
            for (var i = 0; i < changes.length; i++) {
                (function (num) {
                    //target：被观察的目标元素，是一个 DOM 节点对象
                    var item = changes[num]
                    if (item.isIntersecting) {
                        if (item.target.nodeName == 'IMG') {
                            item.target.src = item.target.dataset.src;
                        } else {
                            item.target.style.backgroundImage = 'url(' + item.target.dataset.src + ')'
                        }
                        observer.unobserve(item.target)
                    }
                })(i)
            }
        });
        $('[data-src]').each(function (index, ele) {
            // $('.lazy')
            //实例的observe方法可以指定观察哪个DOM节点
            //开始观察  observe的参数是一个 DOM 节点对象
            observer.observe(ele);
        })
    },
    getStatusBarHeight: function () {
        var immersed = 0;
        var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
        if (ms && ms.length >= 3) { // 当前环境为沉浸式状态栏模式
            immersed = parseFloat(ms[2]);// 获取状态栏的高度
        }
        return immersed;
    },
    changeParams: function (query, value) {
        var params = window.location.href.split('?')[1], str = ''
        if (params.indexOf(query) > -1) {
            var arr = params.split('&');
            for (var i = 0; i < arr.length; i++) {
                (function (num) {
                    var obj = arr[num]
                    if (obj.indexOf(query) > -1) {
                        arr.splice(num, 1, query + '=' + value);
                        return;
                    }
                })(i)
            }
            str = arr.join('&')
        } else {
            str = params + '&' + query + '=' + value
        }
        return str
    },
    clock: function (time, fn) {  //倒计时
        fn(time)
        clearInterval($config.timer);
        $config.timer = setInterval(function () {
            time--;
            if (time < 0) return;
            fn(time)
            if (time == 0) {
                clearInterval($config.timer);
            }
        }, 1000);
    },
    confirm: function (text, btnArr, fn) {
        var btnStr = ''
        for (var i = 0; i < btnArr.length; i++) {
            btnStr += (function (num) {
                return '<span class="popup-button">' + btnArr[num] + '</span>'
            })(i)
        }
        var str = '<div id="confirm"><div class="confirm-wrap"><h1 class="popup-inner">' + text + '</h1></div><div class="popup-btn-wrap flexbox between">' + btnStr + '</div></div>'
        $config.dialogComm(str, 'confirm');
        $('.popup-button').each(function (index, ele) {
            $(ele).on('click', function () {
                if (fn) {
                    fn(index);
                }
                layer.closeAll()
            })
        })
    },
    lazyLoad: function (ele) {
        // 一开始没有滚动的时候，出现在视窗中的图片也会加载
        config.start(ele);
        // 当页面开始滚动的时候，遍历图片，如果图片出现在视窗中，就加载图片
        var clock; //函数节流
        $(window).on('scroll', function () {
            if (clock) {
                clearTimeout(clock);
            }
            clock = setTimeout(function () {
                config.start(ele)
            }, 200)
        })
    },
    start: function (ele) {
        $(ele).not('[data-isLoading]').each(function () {
            if (config.isShow(this)) {
                config.loadImg(this);
            }
        })
    },
    isShow: function (node) {
        return $(node).offset().top <= $(window).height() + $(window).scrollTop();
    },
    loadImg: function (img) {
        if (img.localName == 'img') {
            $(img).attr('src', $(img).attr('data-src'));
        } else {
            $(img).css('background-image', 'url(' + $(img).attr('data-src') + ')');
        }
        $(img).attr('data-isLoading', 1);
    },
    showEllipsis: function (ele) {
        ele.each(function () {
            var len = $(this).text().length;
            if (len > 5) {
                var str = "";
                str = $(this).text().substring(0, 5) + "...";
                $(this).html(str);
            }
        });
    },
    splitComma: function (s) {
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
        var l = s.split(".")[0].split("").reverse();
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("");
    }
}
function goBack() {
    if (config.browser.versions.android) {
        client.jumpToMe();
    } else {
        window.webkit.messageHandlers.jumpToMe.postMessage({});
    }
}
function openHang() {
    if (config.browser.versions.android) {
        client.jumpToOpenActivity();
    } else {
        window.webkit.messageHandlers.jumpToOpenActivity.postMessage({});
    }
}
var $config = config;