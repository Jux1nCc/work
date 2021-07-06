var timer;
var url = window.location;
var inviteCode = getUrlParam(url, 'code');
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
$(document).ready(
		function() {
			createIosShare();
		});

// 获取Url的参数
function getUrlParam(url, name) {
	var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
	var matcher = pattern.exec(url);
	var items = null;
	if (matcher != null) {
		try {
			items = decodeURIComponent(decodeURIComponent(matcher[1]));
		} catch (e) {
			try {
				items = decodeURIComponent(matcher[1]);
			} catch (e) {
				items = matcher[1];
			}
		}
	}
	return items;
}

// 显示时间
function createIosShare() {
	if (inviteCode != undefined && inviteCode.length<8) {
		$.ajax({
			url : "../iosShare/createIosShare",
			type : "POST",
			data : {
				"inviteCode" : inviteCode
			},
			dataType : "json",
			success : function(data) {
			},
			error : function(x, h, e) {
			}
		});
	}
}
