"Common"in window||(window.Common={Util:{htmlEntities:function(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},getUrlParam:function(e,n){for(var t=e,o=t.indexOf("?")+1,i=t.substr(o,t.length),r=i.split("&"),l=0;l<r.length;l++){var a=r[l].split("=");if(a[0]==n)return a[1]}return""},setUrlParam:function(e,n,t){for(var o=e,i=o.indexOf("?")+1,r=o.substr(i,o.length),l=o.substr(0,i),a=r.split("&"),s=0;s<a.length;s++){var d=a[s].split("=");d[0]==n?l+=d[0]+"="+t:void 0!=d[1]&&(l+=d[0]+"="+d[1]),s!=a.length-1&&(l+="&")}return l.indexOf(n)<0&&(l+=0==i?"?"+n+"="+t:"&"+n+"="+t),l},stopEvent:function(e,n){e.stopPropagation(),e.stopImmediatePropagation(),n!==!1&&e.preventDefault()},setScroll:function(e,n){n=n||document,e?$(n).off("touchmove"):$(n).off("touchmove").on("touchmove",function(e){Common.Util.stopEvent(e)})},initScrollEvents:function(e){function n(e){var n=document.height||document.body.scrollHeight;scrollY>=n-innerHeight-o&&$(window).trigger("scrollBottom",e.type),"scroll"==e.type&&(t&&clearTimeout(t),t=setTimeout(function(){$(window).trigger("scrollEnd")},50))}var t,o=e||100;$(window).on("scroll load afterflow",n)},versionCompare:function(e,n,t){function o(e){return(i?/^\d+[A-Za-z]*$/:/^\d+$/).test(e)}var i=t&&t.lexicographical,r=t&&t.zeroExtend,l=e.split("."),a=n.split(".");if(!l.every(o)||!a.every(o))return 0/0;if(r){for(;l.length<a.length;)l.push("0");for(;a.length<l.length;)a.push("0")}i||(l=l.map(Number),a=a.map(Number));for(var s=0;s<l.length;++s){if(a.length==s)return 1;if(l[s]!=a[s])return l[s]>a[s]?1:-1}return l.length!=a.length?-1:0},getVersion:function(){var e=$.browser.version||0;return e=e.indexOf(".")>-1?parseInt(e.split(".").join(""),10):parseInt(e,10)}},Nano:function(e,n){return e.replace(/\{\{([\w\.]*)\}\}/g,function(e,t){for(var o=t.split("."),i=n[o.shift()],r=0,l=o.length;l>r;r++)i=i[o[r]];return"undefined"!=typeof i&&null!==i?i:""})},Alert:function(e){var n=this,t=$('<div style="position: absolute;font-size: 0.24rem;display: block;left: 50%;top: 50%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);background-color: white;border-radius: 0.2rem;width: 5rem;"></div>'),o=$('<div style="text-align: center;padding: 0.7rem;"></div>');o.text(e);var i=$('<div style="text-align:center;color:blue;padding:0.2rem;border-top: solid 1px #aaaaaa;font-size:0.28rem">濂�</div>');t.append(o),t.append(i);var r=$('<div style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;background-color: rgba(0,0,0,0.4);"></div>');r.append(t),$(document.body).append(r),n.Util.setScroll(!1),i.on("click",function(e){r.remove(),n.Util.setScroll(!0),e&&"function"==typeof e&&e()})}}),!function(){function e(e,n){return e.replace(/\{\{([\w\.]*)\}\}/g,function(e,t){for(var o=t.split("."),i=n[o.shift()],r=0,l=o.length;l>r;r++)i=i[o[r]];return"undefined"!=typeof i&&null!==i?i:""})}function n(n,t){var o=i[n]||null;return o&&(o=e(o,t||{})),t&&t.gd_label&&(o+="&gd_label="+t.gd_label),o}function t(e){$("body").append("<iframe id='app_iframe' src='"+e+"' style='display:none'></iframe>")}function o(e){var n="";return n=r+encodeURIComponent(e)}var i={room:"snssdk1112://room?id={{room_id}}",item:"snssdk1112://item?id={{item_id}}&detail_label=return_page",item_follow:"snssdk1112://item?id={{item_id}}&auto_follow=1&detail_label=return_page",home:"snssdk1112://",profile:"snssdk1112://profile?id={{user_id}}",profile_follow:"snssdk1112://profile?id={{user_id}}&auto_follow=1",webview:"snssdk1112://webview?url={{url}}&title={{title}}"},r="//huoshan.com/redirect/?redirect_url=";window.jumpToNativeApp=function(e,i){var r=n(e,i);if(r)if($.os.ios){var l=location.href,a=parseFloat($.os.version),s=parseInt(a,10)>=9;if(!s)return void t(r);if(s&&!$.browser.qqbrowser){var d=o(r);return void(location.href=d)}setTimeout(function(){location.href=r,setTimeout(function(){(document.hidden||document.webkitHidden)&&(location.href=l)},1300)},10)}else $.browser.weixin||t(r)},window.getSchema=function(e,t){return n(e,t)}}(),!function(){function e(e){window.jumpToNativeApp&&window.jumpToNativeApp(e.type,e.params)}function n(e){e.downloadLink&&(location.href=e.downloadLink)}function t(e){function n(n){e(n>1e3||document.hidden||document.webkitHidden?!0:!1)}var t,o=0,i=+new Date;t=setInterval(function(){o++;var e=+new Date-i;(o>=25||e>1e3)&&(clearInterval(t),n(e))},20)}window.downloadAction={init:function(e){this.apploadHandler(e)},apploadHandler:function(o){if($.os.ios){var i=parseFloat($.os.version),r=$.os.ios&&i>=9;return void(!$.browser.weixin&&$.browser.safari&&r?(n(o),setTimeout(function(){e(o)},1e3)):(e(o),setTimeout(function(){t(function(e){!e&&n(o)})},1e3)))}if($.browser.weixin){var l=window.getSchema(o.type,o.params);if(l){var a=[o.downloadLink,"?android_scheme=",l].join("");location.href=a}}else e(o),t(function(e){!e&&n(o)})}}}();