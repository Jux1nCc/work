function resetTabs() {
    $("#content > div").hide();
    $("#tabs a").attr("id", "");
}
var myUrl = window.location.href;
var myUrlTab = myUrl.substring(myUrl.indexOf("#"));
var myUrlTabName = myUrlTab.substring(0, 4);
var server = "../../../";
var checkUserFlag = 0;
(function () {
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
})()


function jumpToLoginClient(){
    if(openInWebview()){
        //应用内
        if (isAndroid) {
            client.jumpToLogin();
        } else if(isiOS) {
            window.webkit.messageHandlers.jumpToLogin.postMessage({customerId:customerId});
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
            window.webkit.messageHandlers.jumpToBill.postMessage({customerId:customerId});
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
            window.webkit.messageHandlers.jumpToHot.postMessage({customerId:customerId});
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
            window.webkit.messageHandlers.jumpToPackage.postMessage({customerId:customerId});
        }
    }else{
        openClient();
    }
}

function shareh5(){
    $.ajax({
        type:"GET",
        url:server+"view/activityValentine/shareh5?customerId="+ customerId +"&token="+token,
        dataType: 'JSON',
        success:function(e){
        },
        error : function(x, h, e) {
        }

    });
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

//应用内邀请分享 20180131
function shareTc(){

    var img;
    var title;
    var subtitle;
    var url;
    img = "http://jw-version.oss-cn-shenzhen.aliyuncs.com/android/t_picture_new1566806350194.png";
    title= "点亮周星榜上热门";
    subtitle= "集爱作战火热开启，聊币奖励等你来领！";
    url=localhostPaht+"/view/activityWeekStar?isFrom=share";
    var sharingState = 1;
    if (browser.versions.android) {
        client.jumpToShare(img,title,url,subtitle,sharingState);
    } else {
        window.webkit.messageHandlers.jumpToShare.postMessage({img:img,title:title,url:url,subtitle:subtitle,type:sharingState,shareLink:0});
    }

}

