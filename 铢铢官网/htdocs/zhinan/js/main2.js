var browser = {
		versions: function () {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
				iPhone: u.indexOf('iPhone') > -1,
				iPad: u.indexOf('iPad') > -1,
				iPod: u.indexOf('iPod') > -1,

			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
		

function shareTc(){
    var img;
    var title;
    var subtitle;
    var url;
    img = "https://jwmedia-oss.oss-cn-shenzhen.aliyuncs.com/rab-picture/image/zq.jpg";
    title = "双旦活动的神秘大奖，会是属于你的吗？";
    subtitle = "这里有一份双旦大礼，等你来领！";
    url=localhostPaht+"/view/activityZq";
    var sharingState = 1;
    if (browser.versions.android) {
        client.jumpToShare(img,title,url,subtitle,sharingState);
    } else {
        window.webkit.messageHandlers.jumpToShare.postMessage({img:img,title:title,url:url,subtitle:subtitle,type:sharingState,shareLink:0});
    }
}   