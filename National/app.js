var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPaht = curWwwPath.substring(0, pos);
var browser = {
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
}
function getPath(path){
    var dns = 'http://activity.folkcam.cn'
    return dns + path
}

// 是否在app内打开
function openInWebview() {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
        return false
    } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
        return false
    } else if (ua.match(/WeiBo/i) == "weibo") {
        return false
    } else {
        if (ua.match(/Android/i) != null) {  //安卓客户端浏览器
            return ua.match(/browser/i) == null
        } else if (ua.match(/iPhone/i) != null) {  //iphone手机客户端
            return ua.match(/safari/i) == null
        } else {
            return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
        }
    }
}
// 跳转到登录页面
function jumpToMe() {
    //应用内
    if (browser.versions.android) {
        client.jumpToLogin();
    } else {
		// 不需要传值时 postMessage(null)
        window.webkit.messageHandlers.jumpToLogin.postMessage({customerId: '2001'});
    }
}
function jumpToPersonal(customerId) {
    //应用内
    if (browser.versions.android) {
        client.jumpToHomePage(customerId);
    } else {
        window.webkit.messageHandlers.jumpToHomePage.postMessage({customerId: customerId});
    }
}

/* // 分享的方法
function shareTc(img, title, subTitle) {
    var img=img, 
        title=title, 
        subtitle=subTitle;
    var url =  curWwwPath;
	var sharingState = 4;
	if (browser.versions.android) {
        client.jumpToShare(img, title, url, subtitle, sharingState);
    } else {
        window.webkit.messageHandlers.jumpToShare.postMessage({
            img: img,
            title: title,
            url: url,
            subtitle: subtitle,
            type: sharingState,
            shareLink: 0
        });
    }
} */
// 分享的方法
function shareComm(img, title, subTitle, url){
    var img=img, 
        title=title, 
        subtitle=subTitle;
	var sharingState = 4;
	var path = window.location.href.split('?')[0], url = '',
			arr = window.location.href.split('?')[1].split('&'), result = [];
		for (var i = 0; i < arr.length; i++) {
			(function (index) {
				var item = arr[index];
				if (item.indexOf('customerId') < 0 && item.indexOf('token') < 0 && item.indexOf('isFrom') < 0) {
					result.push(item)
				}
			})(i)
		}
		result.push('isFrom=h5');
		query = result.join('&');
		url = path + '?' + query;
	if (browser.versions.android) {
        client.jumpToShare(img, title, url, subtitle, sharingState);
    } else {
        window.webkit.messageHandlers.jumpToShare.postMessage({
            img: img,
            title: title,
            url: url,
            subtitle: subtitle,
            type: sharingState,
            shareLink: 0
        });
    }
}

function openClient(){
	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;//安卓终端
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	
	if (isAndroid) { //判断为安卓手机
		 window.location.href = "http://share.folkcam.cn:8080/view/share.html";
	}
	if (isIOS) {//判断为苹果手机	
		var ua = navigator.userAgent.toLowerCase();//抓取浏览器UA值
		if(/\sQQ/i.test(u) || ua.indexOf('qq')>-1 || ua.indexOf('mobile mqqbrowser')>-1){//ios下的qq
			 window.location.href = "http://share.folkcam.cn:8080/view/share.html";
		}else if (ua.indexOf('micromessenger') > -1) {
			 window.location.href = "http://share.folkcam.cn:8080/view/share.html";
		}else{
			location.href = 'jwlive://';
            t = Date.now();
            setTimeout(function(){
                if (Date.now() - t < 1200) {
                    location.href = 'http://www.ningmeng.store/install/1540527246.html';
                }
            }, 1000);
		}
	}
}
function openStore(){
	window.location.href = "http://share.folkcam.cn:8080/view/share.html";
}
function doMail(){
    window.location.href="http://activity.folkcam.cn/christmas/dev/index.html/mail"
}
