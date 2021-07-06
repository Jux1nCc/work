function resetTabs() {
    $("#content > div").hide();
    $("#tabs a").attr("id", "");
}
var myUrl = window.location.href;
var myUrlTab = myUrl.substring(myUrl.indexOf("#"));
var myUrlTabName = myUrlTab.substring(0, 4);
var server = "../../../";
var checkUserFlag = false;
var chooseFlag = false;
var times = null;
var fistShowMySelect=true;
var showChooseFlag = 0;
var clientWidth = document.documentElement.clientWidth;
if(clientWidth>720){
	clientWidth = 720;
}
var clientHeight = document.documentElement.clientHeight;



window.onload=function(){
}

var sc = clientWidth / 750;
$(function () {
	layer.msg("1223"+customerId);
	$('#alertbg').width(750 * sc);
	$('#alertbg').height(clientHeight);
	$('#abg').width(750 * sc);
	$('#abg').height(1207 * sc);
	window.onscroll=function(){
		var top1=document.body.scrollTop;
		if(top1>=0)
			$("#alertbg").css("position","absolute").css("top",top1);       //300为div初始位置，当滚动条距离顶部的距离大于300时，使div与滚动条保持相同高度
		else
			$("#alertbg").css("position","absolute").css("top",0);
	}
	
    $("#content > div").hide();
    $("#tabs li:first a").attr("id", "current");
    $("#content > div:first").fadeIn();

    $("#tabs a").on("click", function (e) {
        e.preventDefault();
        if ($(this).attr("id") == "current") {
            return
        }
        else {
            resetTabs();
            $(this).attr("id", "current");
            $($(this).attr('name')).fadeIn();
        }
    });
    for (i = 1; i <= $("#tabs li").length; i++) {
        if (myUrlTab == myUrlTabName + i) {
            resetTabs();
            $("a[name='" + myUrlTab + "']").attr("id", "current");
            $(myUrlTab).fadeIn();
        }
    }
    checkLogin();
});

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

window.onload=function(){ document.documentElement.style.webkitTouchCallout='none'; };

function initPageInfo(){
	$.ajax({
        type: "GET",
        url: server+"/view/activitySpring/initInfo?time="+new Date(),
        dataType: "json",
        data:{"customerId":customerId,"token":token},
        success: function(obj){
            if (obj.code == 0) {
            	$("#menList").html("");
            	$("#womenList").html("");
            	$(".howmany").text(obj.data.nianNum);
            	$("#currPay").text("剩余"+obj.data.payCurrNum+"次");
            	$("#currPayHidden").text(obj.data.payCurrNum);
            	var payInfo = obj.data.listPay;
            	var gainInfo = obj.data.listGain;
            	var html = "<li><p>排名</p ><p>达人头像</p ><p>名称</p ><p>聊币数</p ></li>";
            	for (var i = 0; i < payInfo.length; i++) {
            		html+="<li> "+
                    "<p class=\"number\">NO."+(i+1)+"</p>"+
                    "<p class=\"img\"><img src=\""+payInfo[i].photo+"\" alt=\"\"  ></p>"+
                   	"<p class=\"name\">"+payInfo[i].nickName+"</p>"+
                  	"<p class=\"property\">"+payInfo[i].payTotalAmt+"</p>"+
                  	"</li>";
            	}
            	$("#menList").append(html);
            	html =  "<li><p>排名</p ><p>达人头像</p ><p>名称</p ><p>聊币数</p ></li>";
            	for (var i = 0; i < gainInfo.length; i++) {
            		html+="<li> "+
                    "<p class=\"number\">NO."+(i+1)+"</p>"+
                    "<p class=\"img\" onclick=\"openHomePage("+gainInfo[i].customerId+")\"><img src=\""+gainInfo[i].photo+"\" alt=\"\" ></p>"+
                   	"<p class=\"name\">"+gainInfo[i].nickName+"</p>"+
                  	"<p class=\"property\">"+gainInfo[i].gainsTotalAmt+"</p>"+
                  	"</li>";
            	}
            	$("#womenList").append(html);
            } else {
            }
        },
        error: function (obj) {

        }
    });
}

function checkLogin(){
	initPageInfo();
	if(customerId && token){
		$.ajax({
	        type:"GET",
	        url:server+"/view/activitySpring/checkUser?customerId="+ customerId +"&token="+token,
	        dataType: 'JSON',
	        success:function(e){
	        	if(e.code && e.code != 0){
	        		checkUserFlag = false;
	        		//  没有登陆兔聊号弹窗 
	                 layer.open({
	                     type: 1,
	                     shadeClose: false,
	                     title: false,
	                     closeBtn: 0,
	                     scrollbar: false,
	                     skin: 'yourclass',
	                     area: ['5.05rem', ''],
	                     content: $('#nologin'),
	                     success: function () {
	                         $("body").addClass('dontmove');
	                     },
	                     end: function () {
	                         $("body").removeClass("dontmove");
	                     }
	                 });
	        	}else{
	        		checkUserFlag = true;
	        	}
	        }
	    });
	}else{
		checkUserFlag = false;
		//  没有登陆兔聊号弹窗 
		alertUserFlag();
        /*layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            skin: 'yourclass',
            area: ['5.05rem', ''],
            content: $('#nologin'),
            success: function () {
                $("body").addClass('dontmove');
            },
            end: function () {
                $("body").removeClass("dontmove");
            }
        });*/
	}
}


var code= 0 ;
var message= "";
function duihuan(){
	if(checkUserFlag){
		$.ajax({
	        type:"POST",
	        url:server+"/view/activitySpring/drawforType1?customerId="+ customerId +"&token="+token,
	        dataType: 'JSON',
	        success:function(e){
	        	
	        	if(e.code && e.code != 0){
	        		code = e.code;
	        		message= e.message;
	        	}else{
	        		code = e.code;
	        		message= e.message;
	        	}
	        	if(code == 0){
	        		$(".howmany").text(e.data.nianNum);
	        		$(".chatmoney").html(e.data.guftAmt+"聊币");
	        		//  积分兑换成功
		              layer.open({
		                 type: 1,
		                 shadeClose: false,
		                 title: false,
		                 closeBtn: 0,
		                 scrollbar: false,
		                 skin: 'yourclass',
		                 area: ['5.05rem', ''],
		                 content: $('#forsuccessful'),
		                 success: function () {
		                    
		                 },
		                 end: function () {
		                     
		                 }
		             });
	        	}
	        		
	        	if(code == -1){
					//积分兑换失败  2 年兽
					$("#nianNum").text("还差 "+message+" 只方可领取红包");
	                 layer.open({
	                    type: 1,
	                    shadeClose: false,
	                    title: false,
	                    closeBtn: 0,
	                    skin: 'yourclass',
	                    area: ['5.05rem', ''],
	                    content: $('#integralfailure2'),
	                    success: function () {
	                       
	                    },
	                    end: function () {
	                       
	                    }
	                });
	        	}else if(code == -2){
	        		layer.msg(message);
	        	}else if(code == -3){
	        		layer.msg(message);
	        	}else if(code == -4){
	        		layer.msg(message);
	        	}else if(code == -5){
//	        		layer.msg(message);
	        		layer.open({
	                    type: 1,
	                    shadeClose: false,
	                    title: false,
	                    closeBtn: 0,
	                    scrollbar: false,
	                    skin: 'yourclass',
	                    area: ['5.05rem', ''],
	                    content: $('#manlogin'),
	                    success: function () {
	                        $("body").addClass('dontmove');
	                    },
	                    end: function () {
	                        $("body").removeClass("dontmove");
	                    }
	                });
	        	}else if(code == -6){
	        		$("#giftCha").text("还差 "+message+" 聊币方可领取红包");
	        		layer.open({
	                type: 1,
	                shadeClose: false,
	                title: false,
	                closeBtn: 0,
	                skin: 'yourclass',
	                scrollbar: false,
	                area: ['5.05rem', ''],
	                content: $('#integralfailure1'),
	                success: function () {

	                },
	                end: function () {

	                }
	            	}); 
	        	}
	        }
	    });
	}else{
		//  没有登陆兔聊号弹窗 
        layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            skin: 'yourclass',
            area: ['5.05rem', ''],
            content: $('#nologin'),
            success: function () {
                $("body").addClass('dontmove');
            },
            end: function () {
                $("body").removeClass("dontmove");
            }
        });
	}
	
}

function chouJiang(type){
	alert(type);
	if(checkUserFlag){
		$.ajax({
	        type:"POST",
	        url:server+"/view/activitySpring/drawforType2?customerId="+ customerId +"&token="+token+"&type="+type,
	        dataType: 'JSON',
	        success:function(e){
	        	alert(e.code);
	        	if(e.code && e.code != 0){
	        		code = e.code;
	        		message= e.message;
	        	}else{
	        		code = e.code;
	        		message= e.message;
	        	}
	        	alert(code +","+message);
	        	if(code == 0){
	        		layer.msg(message);
	        	}
	        	if(code == -1){
	        	}else if(code == -2){
	        		layer.msg(message);
	        	}else if(code == -3){
	        		layer.msg(message);
	        	}else if(code == -4){
	        		layer.msg(message);
	        	}else if(code == -5){
	        		layer.msg(message);
	        	}else if(code == -6){
	        	}
	        }
	    });
	}else{
		//  没有登陆兔聊号弹窗 
        layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            skin: 'yourclass',
            area: ['5.05rem', ''],
            content: $('#nologin'),
            success: function () {
                $("body").addClass('dontmove');
            },
            end: function () {
                $("body").removeClass("dontmove");
            }
        });
	}
	
}

function chouJiangList(){
	if(checkUserFlag){
		$.ajax({
	        type:"GET",
	        url:server+"/view/activitySpring/getdrawforType2List?customerId="+ customerId +"&token="+token,
	        dataType: 'JSON',
	        success:function(e){
	        	$(".record_modlist").html("");
	        	if(e.code && e.code != 0){
	        		code = e.code;
	        		message= e.message;
	        	}else{
	        		code = e.code;
	        		message= e.message;
	        	}
	        	if(code == 0){
//	        		layer.msg(message);
	        		var html = "";
	        		var listInfo = e.data.listInfo;
	            	for (var i = 0; i < listInfo.length; i++) {
	            		html+="<li> "+
	                       " <p><img src=\"images/record"+(listInfo[i].awardType)+".png\" alt=\""+listInfo[i].awardContent+"\"></p>"+
	                       " <p>"+listInfo[i].awardContent+"</p>"+
	                       " <p>"+listInfo[i].showTime+"</p>"+
	                       "</li>";
	            	}
	        		$(".record_modlist").append(html);
	        		if(null != listInfo[0] && listInfo[0].sex == 0){
	        			$("#recordText").text("体验金已直接纳入您的“收益聊币”中");
	        		}
	            	layer.open({
	                    type: 1,
	                    shadeClose: false,
	                    title: false,
	                    closeBtn: 0,
	                    skin: 'yourclass',
	                    scrollbar: false,
	                    area: ['5.42rem', ''],
	                    content: $('#record'),
	                    success: function () {
	                        $("body").addClass('dontmove');
	                    },
	                    end: function () {
	                        $("body").removeClass("dontmove");
	                    }
	                });
	        	}else{
	        		layer.msg(message);
	        	}
	        },error:function(e){
	        	layer.msg("网络异常");
	        }
	    });
	}else{
		//  没有登陆兔聊号弹窗 
        layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            skin: 'yourclass',
            area: ['5.05rem', ''],
            content: $('#nologin'),
            success: function () {
                $("body").addClass('dontmove');
            },
            end: function () {
                $("body").removeClass("dontmove");
            }
        });
	}
	
}

function alertUserFlag(){
	if(openInWebview()){
		//  没有登陆兔聊号弹窗 
        layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            skin: 'yourclass',
            area: ['5.05rem', ''],
            content: $('#nologin'),
            success: function () {
                $("body").addClass('dontmove');
            },
            end: function () {
                $("body").removeClass("dontmove");
            }
        });
	}else{
		layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            scrollbar: false,
            skin: 'yourclass',
            area: ['5.05rem', ''],
            content: $('#intheapp'),
            success: function () {
                $("body").addClass('dontmove');
            },
            end: function () {
                $("body").removeClass("dontmove");
            }
        });
	}
}


function openHomePage(uid) {
	if(openInWebview()){
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

function jumpToLoginClient(){
	if(openInWebview()){
		//应用内
		if (isAndroid) {
			client.jumpToLogin();
		} else if(isiOS) {
			window.webkit.messageHandlers.jumpToLogin.postMessage({customerId:'2001'});
		}
	}else{
		openClient();
	}
	
}

function jumpToBill(){
	if(openInWebview()){
		//应用内
		if (isAndroid) {
			client.jumpToBill();
		} else if(isiOS) {
			window.webkit.messageHandlers.jumpToBill.postMessage({customerId:'2001'});
		}
	}else{
		openClient();
	}
}

function jumpToHot(){
	if(openInWebview()){
		//应用内
		if (isAndroid) {
			client.jumpToHot();
		} else if(isiOS) {
			window.webkit.messageHandlers.jumpToHot.postMessage({customerId:'2001'});
		}
	}else{
		openClient();
	}
}

function jumpToPackage(){
	if(openInWebview()){
		//应用内
		if (isAndroid) {
			client.jumpToPackage();
		} else if(isiOS) {
			window.webkit.messageHandlers.jumpToPackage.postMessage({customerId:'2001'});
		}
	}else{
		openClient();
	}
}

function openClient(){
    var ua = navigator.userAgent;
    if (ua.indexOf(" MicroMessenger/") > -1) {
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

function shareh5(){
	$.ajax({
        type: "POST",
        url: server+"/view/activityZq/shareh5?time="+new Date(),
        dataType: "json",
        data:{},
        success: function(obj){
            
        },
        error: function (obj) {

        }
    });
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

var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
var localhostPaht = curWwwPath.substring(0,pos);


function shareTc(){
    var img;
    var title;
    var subtitle;
    var url;
    img = "https://jwmedia-oss.oss-cn-shenzhen.aliyuncs.com/rab-picture/image/newyear.png";
    title = "兔聊新春豪礼送不停，8888份福利免费抢！";
    subtitle = "你离获得福利还差 1 次点击，快来！";
    url=localhostPaht+"/view/activitySpring/";
    var sharingState = 3;
    if (browser.versions.android) {
        client.jumpToShare(img,title,url,subtitle,sharingState);
    } else {
        window.webkit.messageHandlers.jumpToShare.postMessage({img:img,title:title,url:url,subtitle:subtitle,type:sharingState,shareLink:0});
    }
} 