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

var hostUrl = "";
var checkUserFlag = false;


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

//用户分享信息
var customerId = getMyURLParameter("customerId");
var code = getMyURLParameter("code");
var isFrom = getQueryString("isFrom");
var clientType = getMyURLParameter("clientType");
var isFrom = getMyURLParameter("isFrom");
var shareType = getMyURLParameter("shareType");
var isVideoCollection = getMyURLParameter("isVideoCollection");
var shareOfValue = getMyURLParameter("shareOfValue");

var customerCode ;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端



var clientWidth = document.documentElement.clientWidth;
if(clientWidth>720){
	clientWidth = 720;
}
var clientHeight = document.documentElement.clientHeight;

var sc = clientWidth / 750;

var type = 0;
$(function() {
	var witht=$(window).width();
	var url = window.location;
	var str = "";
	if(code){
		str += "code="+code;
	}
	if(isVideoCollection){
		str += "&isVideoCollection="+isVideoCollection;
	}
	if(shareType){
		str += "&shareType="+shareType;
	}
	if(shareOfValue){
		str += "&shareOfValue="+shareOfValue;
	}
	console.log("------------str=" +str);
	if(isVideoCollection == 0){
		window.location.href="shareVideoMobile.html?"+str;
	}else{
		window.location.href="shareVideosMobile.html?"+str;
	}
	
});


function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}

var server = "../../../";

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

function jumpToHomePageClient(obj){
	if (browser.versions.android) {
		client.jumpToHomePage(obj);
	} else {
		window.webkit.messageHandlers.jumpToHomePage.postMessage({customerId:obj});
	}
}

function jumpToLoginClient(){
	if (isAndroid) {
		client.jumpToLogin();
	} else if(isiOS) {
		window.webkit.messageHandlers.jumpToLogin.postMessage({customerId:'2001'});
	}
}

var curWwwPath=window.document.location.href;
var pathName=window.document.location.pathname;
var pos=curWwwPath.indexOf(pathName);
var localhostPaht=curWwwPath.substring(0,pos);
//邀请分享 20180131
function jumpToShareClient(){
	var img="https://nocheckimgs.oss-cn-shenzhen.aliyuncs.com/actiivityPhoto/shuoming.jpg";
    var title="心动不止520";
    var subtitle="我在兔聊520活动中向你表白了，快来听听我跟你说了什么吧";
    var url=localhostPaht+"/view/share.html?code="+customerCode;
    if (browser.versions.android) {
          client.jumpToShare(img,title,url,subtitle);
    } else {
	  window.webkit.messageHandlers.jumpToShare.postMessage({img:img,title:title,url:url,subtitle:subtitle});
    }
   $.ajax({
        type:"GET",
        url:server+"view/activity520/invitationShare?customerId="+ customerId +"&token="+token,
        dataType: 'JSON',
        success:function(e){

        },
        error : function(x, h, e) {
		}

    });
}

//应用内邀请分享 20180131
function shareTc(){
	var img="https://nocheckimgs.oss-cn-shenzhen.aliyuncs.com/actiivityPhoto/shuoming.jpg";
	var title="心动不止520";
	var subtitle="我在兔聊520活动中向你表白了，快来听听我跟你说了什么吧";
	var url=localhostPaht+"/view/activities/520Activity/index.html?code="+customerCode+"&isFrom=share";
	if (browser.versions.android) {
		client.jumpToShare(img,title,url,subtitle);
	} else {
		window.webkit.messageHandlers.jumpToShare.postMessage({img:img,title:title,url:url,subtitle:subtitle});
	}
    $.ajax({
        type:"GET",
        url:server+"view/activity520/appWithinShare?customerId="+ customerId +"&token="+token,
        dataType: 'JSON',
        success:function(e){
        },
        error : function(x, h, e) {
        }

    });
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

function bgclick() {
    closeAlert();
    $('#alertbg').css('display', 'none');
    $('#abg').css('display', 'none');
}
function closeAlert() {
    $('#alertbg').css('display', 'none');
    $('#alert1').css('display', 'none');
    $('#alertTitle').css('display', 'none');
    $('#alertTitle2').css('display', 'none');
    $('#alertTitle3').css('display', 'none');
}