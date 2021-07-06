
/*
 * 关于cookies的操作类
 * 增加
 * Cookie.setCookie(name,value,time); (time)毫秒数
 * 获取
 * Cookie.getCookie(name);
 * 删除
 * Cookie.delCookie(name);
 *
 */
var Cookie={
	//保存cookie  cName:cookie名,cValue:cookie值,time:保存期限(毫秒)
	//time==-1  表示不设置保存期限,即关闭浏览器失效
	setCookie:function(cName, cValue, time) {
		var cookieStr = escape(cName) + "=" + escape(cValue) + ";";
		if(time!=-1){
			var date = new Date();
			date.setTime(date.getTime() + time);
			cookieStr = cookieStr+"expires=" + date.toGMTString() + ";";
		}
		document.cookie = cookieStr;
	},
	//根据cookie名取得其值
	getCookie:function(cName) {
		var cookieStr = document.cookie;
		cookieStr=decodeURIComponent(cookieStr);
		var cookies = cookieStr.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies;
			var theCookie = cookies[i].split("=");
					var theValue=unescape(theCookie["1"]);
					if(theValue=="undefined" || theValue==null){
						theValue="";
					}
			if (theCookie["0"] == escape(cName))
			{
				return theValue.replace(new RegExp("\"",'g'),"");
				break;
			}
		}
			return "";
	},
	//根据cookie名删除
	delCookie:function(cName) {
		var date = new Date();
			date.setTime(date.getTime() - 1000);
		var cookieStr = escape(cName) + "=; expires=" +date .toGMTString() + ";";
		document.cookie = cookieStr+"domain=goojje.com;";
	}
}
function getURLParameter(param) {
	var url = "";
	try {
		url = window.location.href;
	} catch (e) {
		url = document.URL;
	}
	for (;;) {
		if (url.endWith && url.endWith('#')) {
			url = url.substring(0, url.length - 1);
		} else {
			break;
		}
	}

	var params = (url.substr(url.indexOf("?") + 1)).split("&");

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

function rStr(str){ 
	str=str.replace(/\+/g,"%2B"); 
	return str; 
} 

DateFormat = (function(){
	 var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
	 var DEFAULT_PATTERN = 'yyyy-MM-dd';
	 function padding(s,len){
	  var len =len - (s+'').length;
	  for(var i=0;i<len;i++){s = '0'+ s;}
	  return s;
	 };
	 return({
	  format: function(date,pattern){
	   if (typeof date =='number'){
			date = new Date(date);
	   }

	   pattern = pattern||DEFAULT_PATTERN;
	   return pattern.replace(SIGN_REGEXP,function($0){
	    switch($0.charAt(0)){
	     case 'y' : return padding(date.getFullYear(),$0.length);
	     case 'M' : return padding(date.getMonth()+1,$0.length);
	     case 'd' : return padding(date.getDate(),$0.length);
	     case 'w' : return date.getDay()+1;
	     case 'h' : return padding(date.getHours(),$0.length);
	     case 'm' : return padding(date.getMinutes(),$0.length);
	     case 's' : return padding(date.getSeconds(),$0.length);
	    }
	   });
	  },
	  parse: function(dateString,pattern){
	   var matchs1=pattern.match(SIGN_REGEXP);
	   var matchs2=dateString.match(/(\d)+/g);
	   if(matchs1.length==matchs2.length){
	    var _date = new Date(1970,0,1);
	    for(var i=0;i<matchs1.length;i++){
	     var _int = parseInt(matchs2[i],10);
	     var sign = matchs1[i];
	    switch(sign.charAt(0)){
	     case 'y' : _date.setFullYear(_int);break;
	     case 'M' : _date.setMonth(_int-1);break;
	     case 'd' : _date.setDate(_int);break;
	     case 'h' : _date.setHours(_int);break;
	     case 'm' : _date.setMinutes(_int);break;
	     case 's' : _date.setSeconds(_int);break;
	    }
	    }
	    return _date;
	   }
	   return null;
	  }
	 });
	})();