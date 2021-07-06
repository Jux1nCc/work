//图片预加载
(function () {
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    var loader = function (imgList, callback, timeout) {
        timeout = timeout || 5000;
        imgList = isArray(imgList) && imgList || [];
        callback = typeof(callback) === 'function' && callback;

        var total = imgList.length,
            loaded = 0,
            imgages = [],
            _on = function () {
                loaded < total && (++loaded, callback && callback(loaded / total));
            };

        if (!total) {
            return callback && callback(1);
        }

        for (var i = 0; i < total; i++) {
            imgages[i] = new Image();
            imgages[i].onload = imgages[i].onerror = _on;
            imgages[i].src = imgList[i];
        }
        setTimeout(function () {
            loaded < total && (loaded = total, callback && callback(loaded / total));
        }, timeout * total);

    };

    "function" === typeof define && define.cmd ? define(function () {
        return loader
    }) : window.imgLoader = loader;
})();


//用户信息
var customerId = getMyURLParameter("customerId");
var token = getMyURLParameter("token");
var isFrom = getMyURLParameter("isFrom");
var customerCode = getMyURLParameter("code");
var checkUserLongin = getMyURLParameter("checkUserFlag");
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var fromType = 0;
if (isFrom == "startPage") {
	fromType = 1;
}
if (isFrom == "mePage") {
	fromType = 1;
}
if (isFrom == "nearBanner") {
	fromType = 1;
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

function openInWebview() {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
        return false
    } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
        return false
    } else if (ua.match(/WeiBo/i) == "weibo") {
        return false
    } else {
        if (ua.match(/Android/i) != null) {
            return ua.match(/browser/i) == null
        } else if (ua.match(/iPhone/i) != null) {
            return ua.match(/safari/i) == null
        } else {
            return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
        }
    }
}

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

var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPaht=curWwwPath.substring(0,pos);


var browser = {
		versions : function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {
				android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				iPhone : u.indexOf('iPhone') > -1,
				iPad : u.indexOf('iPad') > -1,
				iPod : u.indexOf('iPod') > -1,

			};
		}(),
		language : (navigator.browserLanguage || navigator.language).toLowerCase()
	}

function openHomePage(uid) {
	if(fromType == 1){
		var customerId = String(uid);
	    if (browser.versions.android) {
	        client.jumpToHomePage(customerId);
	    } else {
	        window.webkit.messageHandlers.jumpToHomePage.postMessage({customerId:customerId});
	    }
	}else{
		openClient();
	}
    
}

function openHomePageNew(uid) {
    debugger;
    var customerId = String(uid);
    if (browser.versions.android) {
        client.jumpToHomePage(customerId);
    } else {
        window.webkit.messageHandlers.jumpToHomePage.postMessage({customerId:customerId});
    }
}

function jumpToMeNew(uid) {
    if (browser.versions.android){
        client.jumpToMe();
    } else {
        window.webkit.messageHandlers.jumpToMe.postMessage({customerId: uid});
    }
}
//分享官网
function shareHome() {
    sharingState = 1;
    var img = "https://jwmedia-oss.oss-cn-shenzhen.aliyuncs.com/rab-picture/image/201807271554124694164520892788913.png";
    var title = "陌生人的一对一私密视频";
    var subtitle = "在兔聊App，你可以和陌生的女孩子一对一私密视频聊天。无聊的时候，在兔聊App可以找附近的女孩子私密视频哦！线上聊，线下约。小恩小惠，女孩陪你聊到天亮";
    var url = localhostPaht + "/view/m/share.html?code="+shareCode;
    if (browser.versions.android) {
        client.jumpToShare(img,title,url,subtitle,sharingState);
    } else {
        window.webkit.messageHandlers.jumpToShare.postMessage({img:img,title:title,url:url,subtitle:subtitle,type:sharingState,shareLink:0});
    }
}


function openClient(){
    var ua = navigator.userAgent;
    if (ua.indexOf(" MicroMessenger/") > -1) {
        //微信中显示遮罩提示在浏览器中打开或进入应用宝
        //微信中显示遮罩提示在浏览器中打开或进入应用宝
        $('#alertbg').css('display', 'block');
        $('#alertTitle3').css('display', 'block');
        $('#abg').css('display', 'block');
    } else {
        if (ua.indexOf("Android") > -1) {
            window.location.href = 'rablive://';
            t = Date.now();
            setTimeout(function(){
                if (Date.now() - t < 1200) {
                    location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.folkcam.rablive.jwrablive';
                }
            }, 1000);
        } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
            location.href = 'jwlive://';
            t = Date.now();
            setTimeout(function(){
                if (Date.now() - t < 1200) {
                    location.href = 'https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8';
                }
            }, 1000);
        } else {
            window.location.href = "http://www.rabbitlive.cn";
        }
    }
}

function downClient(){
    var ua = navigator.userAgent;
    if (ua.indexOf(" MicroMessenger/") > -1) {
        //微信中显示遮罩提示在浏览器中打开或进入应用宝
        $('#alertbg').css('display', 'block');
        $('#alertTitle3').css('display', 'block');
        $('#abg').css('display', 'block');
    } else {
        if (ua.indexOf("Android") > -1) {
            //直接下载apk
            window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.folkcam.rablive.jwrablive";
        } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
            //直接进入appstore
            window.location="https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8";
        } else {
            window.location.href = "http://www.rabbitlive.cn";
        }
    }
}


