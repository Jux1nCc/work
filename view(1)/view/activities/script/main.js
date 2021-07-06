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

var hoseNumber = 0;//袜子数
var clickNumber = [1,1,1];//记录砸了多少次 次数为-1
var zzsdNumber = 0;//初始砖石蛋总数
var zjdNumber = 0;//初始金当总数
var zydNumber = 0;//初始银蛋总数

//用户信息
var customerId = getMyURLParameter("customerId");
var token = getMyURLParameter("token");

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

//获取画布环境
var cantext = document.getElementById("myCanvas");
cantext.width = eSize(750*2);
cantext.height = eSize(1334*2);
var cxt = cantext.getContext("2d");

//请求礼物总数


$(function(){
   $("#page1-time1").html("活动时间：2017\0/12\0/24-2018\0/1\0/2");
});

var checkUserFlag = false;
function checkUser(){
	if(customerId && token ){
		$.ajax({
	        type:"GET",
	        url:server+"api/christmasActivity/checkUser?customerId="+ customerId +"&token="+token,
	        dataType: 'JSON',
	        success:function(e){
	        	if(e.code && e.code != 0){
	        		myAlert();
	        		checkUserFlag = false;
	        		return false;
	        	}else{
	        		checkUserFlag = true;
	        		return true;
	        	}
	        }
	    });
	}else{
		myAlert();
		checkUserFlag = false;
		return false;;
	}
	
}

function jumpToLogin(){
	client.jumpToLogin();
}

function myAlert(){
	layer.open({
	    content: '登陆之后，才能操作此功能。'
	    ,btn: ['立刻登录', '取消']
	    ,yes: function(index){
	      layer.close(index);
	      $('#bbbb').trigger("click");
	    },no: function(index){
	    	layer.close(index);
	    }
	  });
}

//音乐播放
/*var audio1 = document.getElementById("audio1");
audio1.play();
document.addEventListener("WeixinJSBridgeReady",function(){
    audio1.play();
});

var audio2 = document.getElementById("audio2");
audio2.play();
document.addEventListener("WeixinJSBridgeReady",function(){
    audio2.play();
});
audio2.pause();
document.addEventListener("WeixinJSBridgeReady",function(){
    audio2.pause();
});*/

//预加载资源
imgLoader(["images/bg-2.png"],function(number){
//    if(number == 1){
        $("#logding").css({"background-image":" url(images/bg-2.png)"});
        imgLoader([
            "images/bg-1.png",
            "images/cz.png",
            "images/hddt.png",
            "images/hdgz.png",
            "images/hqgzxq.png",
            "images/jd.png",
            "images/jds.png",
            "images/yd.png",
            "images/yds.png",
            "images/zsd.png",

            "images/zsds.png",
            "images/jps1.png",
            "images/jps2.png",
            "images/jps4.png",
            "images/jps5.png",
            "images/jps6.png",
            "images/jps8.png",
            "images/jps9.png",
            "images/jps10.png",
            "images/jps11.png",
            "images/jps12.png",
            "images/jps16.png",
            "images/jps17.png",
            "images/jps18.png",
            "images/jps19.png",
            "images/jps20.png",

            "images/jpbg.png",
            "images/qd.png",

            "images/wzan.png",
            "images/zs-1.png",
            "images/zs-2.png",
            "images/zt.png"
        ],function(number){
            $("#logdingtext").html(parseInt((number*100)) + "%");
            $("#page1-wzsl").html(hoseNumber+"个");
            $("#page1-ydNumber").html(5*clickNumber[0]);
            $("#page1-jdNumber").html(50*clickNumber[1]);
            $("#page1-zsdNumber").html(200*clickNumber[2]);
            $("#wzannuber").html(hoseNumber);
            $("#popBox").css({"background-image": "url(images/jpbg.png)"});
            $("#logding").remove();
            $("#page1").show();
            mainCanvas();
            if(number == 1){
                getDeg();
                getUserAward();
                gethoseNumber();
//                mainCanvas();
                clickdang();
            }
        } );
//    }
} );
//服务器域名地址
var server = "../../";
//获取蛋总数量
function getDeg(){

    requestAnimationFrame(function(){
        $.ajax({
            type:"GET",
            url:server+"api/christmasActivity/sumGiftNum",
            dataType: 'JSON',
            success:function(e){
                zzsdNumber = Number(e.data.diamondEggNum);
                zjdNumber = Number(e.data.goldenEggNum);
                zydNumber = Number(e.data.silverEggNum);
                $("#page1-zydNumber").html(zydNumber);
                $("#page1-zzsdNumber").html(zzsdNumber);
                $("#page1-zjdNumber").html(zjdNumber);

                if(zzsdNumber > 0 || zjdNumber > 0 || zydNumber > 0 ){
                    AnimentNumber(1,10000,function(e){
                        if(e == 10000){
                            requestAnimationFrame(function(){
                                getDeg();
                            })
                        }
                    },10000)
                }
            }
        });
    });
}
var jdImg = "images/jd.png";
var ydImg = "images/yd.png";
var zsdImg = "images/zsd.png";
var popElemnetImg = "images/jp15.png";
var mainCanvas = function(){

    var canWidth = cantext.width;
    var canHeight = cantext.height;

    this.bgImg = new Image();
    this.bgImg.src = "images/bg-2.png";

    this.title = new Image();
    this.title.src = "images/zt.png";

    this.star = new Image();
    this.star.src = "images/zs-1.png";
    this.star.opc = 0;

    this.small = new Image();
    this.small.src = "images/zs-2.png";
    this.small.deg = [-2,6,-6];

    this.snowfieldbox = new Image();
    this.snowfieldbox.src = "images/bg-1.png";

    this.goldBall = new Image();
    this.goldBall.src = jdImg;

    this.silverEgg = new Image();
    this.silverEgg.src = ydImg;

    this.masonry = new Image();
    this.masonry.src = zsdImg;

    this.flowerBox = new Image();
    this.flowerBox.src = "images/hddt.png";

    this.hammer = new Image();
    this.hammer.src = "images/cz.png";
    this.hammer.wz = 1;
    this.hammer.op = 0;
    this.hammer.deg = 30;

    this.roundnesNumber = 624;
    this.roundnesB = [];
    this.roundnesP = [];
    this.roundnesY = [];
    this.roundnesX = [];


    this.dImg = function(){
        this.goldBall = new Image();
        this.goldBall.src = jdImg;

        this.silverEgg = new Image();
        this.silverEgg.src = ydImg;

        this.masonry = new Image();
        this.masonry.src = zsdImg;
    };

    var roundnesnumber = this.roundnesNumber;


    this.canvaser = function(){

        if(this.roundnesB.length<roundnesnumber){
            for (var B = this.roundnesB.length; B<roundnesnumber;B++){
                var numberB = Math.random();
                this.roundnesB.push(numberB);
            }
        }
        if(this.roundnesP.length<roundnesnumber){
            for (var P = this.roundnesP.length; P<roundnesnumber;P++){
                var numberP = Math.random();
                this.roundnesP.push(numberP);
            }
        }
        if(this.roundnesY.length<roundnesnumber){
            for (var Y = this.roundnesY.length; Y<roundnesnumber;Y++){
                var numberY = Math.random();
                this.roundnesY.push(numberY);
            }
        }
        if(this.roundnesX.length<roundnesnumber){
            for (var X = this.roundnesX.length; X<roundnesnumber;X++){
                var numberX = Math.random();
                this.roundnesX.push(numberX);
            }
        }

        cxt.clearRect(0,0,canWidth,canHeight);
        cxt.drawImage(this.bgImg,0,0,canWidth,canHeight);
        cxt.save();

        for(var x = 0;x<this.roundnesB.length;x++){
            var boxX = this.roundnesX[x] * (cantext.width - 10);
            var boxY = this.roundnesY[x] * eSize(580*2);
            var boxB = this.roundnesB[x] * 6;
            var boxP = this.roundnesP[x];

            cxt.fillStyle = "#FFFFFF";
            cxt.globalAlpha = boxP;
            cxt.beginPath();
            cxt.arc(boxX,boxY,boxB,0,2*Math.PI);
            cxt.closePath();
            cxt.fill();
            cxt.restore();
        }

        cxt.globalAlpha = 1;
        cxt.drawImage(this.snowfieldbox,0,0,canWidth,canHeight);
        cxt.save();

        cxt.drawImage(this.title,eSize(45*2),eSize(62*2),eSize(658*2),eSize(282*2));
        cxt.save();

        cxt.translate(eSize(4*2),0);
        cxt.rotate((this.small.deg[0])*Math.PI/180);
        cxt.drawImage(this.small,eSize(4*2),0,eSize(44*2),eSize(166*2));
        cxt.restore();
        cxt.save();

        cxt.translate(eSize(66*2),0);
        cxt.rotate((this.small.deg[1])*Math.PI/180);
        cxt.drawImage(this.small,eSize(0),-eSize(24*2),eSize(39*2),eSize(147*2));
        cxt.restore();
        cxt.save();

        cxt.translate(eSize(720*2),0);
        cxt.rotate((this.small.deg[2])*Math.PI/180);
        cxt.drawImage(this.small,eSize(-50),0,eSize(39*2),eSize(147*2));
        cxt.restore();
        cxt.save();

        cxt.globalAlpha = this.star.opc;
        cxt.drawImage(this.star,eSize(596*2),eSize(22*2),eSize(67*2),eSize(66*2));
        cxt.restore();
        cxt.save();

        cxt.drawImage(this.goldBall,eSize(4*2),eSize(488*2),eSize(257*2),eSize(342*2));
        cxt.save();

        cxt.drawImage(this.silverEgg,eSize(492*2),eSize(488*2),eSize(257*2),eSize(342*2));
        cxt.save();

        cxt.drawImage(this.masonry,eSize(245*2),eSize(581*2),eSize(257*2),eSize(342*2));
        cxt.save();


        switch (this.hammer.wz){
            case 1:
                cxt.translate(eSize(710*2),eSize(548*2));
                break;
            case 2:
                cxt.translate(eSize(354*2),eSize(548*2));
                break;
            case 3:
                cxt.translate(eSize(534*2),eSize(588*2));
                break;
        }
        cxt.rotate((this.hammer.deg)*Math.PI/180);
        cxt.globalAlpha = this.hammer.op;
        cxt.drawImage(this.hammer,eSize(-277*2),eSize(-248*2),eSize(277*2),eSize(148*2));
        cxt.restore();
        cxt.save();

        cxt.drawImage(this.flowerBox,eSize(162*2),eSize(1028*2),eSize(435*2),eSize(241*2));
        cxt.save();
    };

};
canvasAnimet();
var mainCanvasAnimet = new mainCanvas();
var baidong = [1,2,1];
var staropc = 1;
function canvasAnimet(){
    var canAnimet = requestAnimationFrame(function(){

        //改变雪花
        var boxY = [];
        for(var i=0;i<mainCanvasAnimet.roundnesY.length;i++){
            var numberY = mainCanvasAnimet.roundnesY[i] + mainCanvasAnimet.roundnesB[i]/85;
            boxY.push(numberY);
        }
        mainCanvasAnimet.roundnesY = boxY;
        for (var j=0;j<mainCanvasAnimet.roundnesY.length;j++){
            if(mainCanvasAnimet.roundnesY[j]>1){
                mainCanvasAnimet.roundnesY[j]=0;
                mainCanvasAnimet.roundnesB.splice(j,1,Math.random());
                mainCanvasAnimet.roundnesP.splice(j,1,Math.random());
                mainCanvasAnimet.roundnesX.splice(j,1,Math.random());
            }
        }

        //摆动铃铛
        for(var d =0;d<mainCanvasAnimet.small.deg.length;d++){
            if(baidong[d] == 1){
                mainCanvasAnimet.small.deg[d] = mainCanvasAnimet.small.deg[d] + 0.1;
                if(mainCanvasAnimet.small.deg[d] >= 6){
                    baidong[d] = 2;
                }
            }
            if(baidong[d] == 2){
                mainCanvasAnimet.small.deg[d] = mainCanvasAnimet.small.deg[d] - 0.1;
                if(mainCanvasAnimet.small.deg[d] <= -6){
                    baidong[d] = 1;
                }
            }
        }

        //控制星星
        if(staropc == 1){
            mainCanvasAnimet.star.opc = mainCanvasAnimet.star.opc + 0.01;
            if(mainCanvasAnimet.star.opc >= 1){
                staropc=2;
            }
        }
        if(staropc == 2){
            mainCanvasAnimet.star.opc = mainCanvasAnimet.star.opc - 0.01;
            if(mainCanvasAnimet.star.opc <= 0.4){
                staropc=1;
            }
        }



        mainCanvasAnimet.canvaser();
        canvasAnimet();
    });

}
var clickPrevent = 1;//防止多次点击；
var czdeg = 30;//锤子摆动角度
//用户砸蛋
function clickdang(){
    cantext.addEventListener("click",function(e){
    	layer.open({
            content: '圣诞活动已结束！'
            ,skin: 'msg'
            ,time: 1 //2秒后自动关闭
          });
    })
}
//用户砸蛋
function spoilFunction(number){
    var egtype;
    if(number == 1){
        egtype = 3;
    }
    if(number == 2){
        egtype = 2;
    }
    if(number == 3){
        egtype = 1;
    }
    setTimeout(function(){
        jdImg = "images/jd.png";
        ydImg = "images/yd.png";
        zsdImg = "images/zsd.png";
        mainCanvasAnimet.dImg();
        mainCanvasAnimet.hammer.op = 0;
        clickPrevent = 1;
    },600);
    layer.open({
        content: '圣诞活动已结束！'
        ,skin: 'msg'
        ,time: 1 //2秒后自动关闭
      });
    //用户砸蛋
   
};
$("#qdinput").on("click",function(){
    $("#popBox").hide();
});
var uerText = [];//滚动条展示信息
var textNuber = 1;//记录之前渲染信息条数
var scantext = document.getElementById("sjCanvas");
var sheight = parseFloat($("#sjcs").css('height'));
var swidth = parseFloat($("#sjcs").css('width'));
scantext.height = sheight;
scantext.width = swidth;
var scxt = scantext.getContext("2d");
function scanvas(){
    scxt.clearRect(0,0,scantext.width,scantext.height);
    scxt.fillStyle = "#df2822";
    scxt.font= eSize(18*2)+"px Helvetica";

    var number = uerText.length;
    textNuber = number;

    if(uerText.length<5){
        for (var i = 0;i<uerText.length;i++){
            scxt.fillText(uerText[i],eSize(30*2),50-(number-i)*eSize(24*2));
        }
    }else {
        for (var j = (number-4);j<number;j++){
            scxt.fillText(uerText[j],eSize(30*2),136-(number-j)*eSize(24*2));
        }
    }
};
var vs = 0;
setInterval(function(){
    uerText.push(uerText[vs]);
    vs++;
    if(vs > uerText.length){
        vs = 0;
    }
    scanvas();
},1000);
//获取中奖用户信息
function getUserAward(){
    $.ajax({
        type:"GET",
        url:server+"api/christmasActivity/prizeCustomerInfo",
        dataType: 'JSON',
        success:function(e){
            var texts=[];
            for(var i in e.data){
                var text = "恭喜用户"+ (e.data[i].customerId ? e.data[i].customerId:"xxxxxx") +"砸中: "+ (e.data[i].gift ? e.data[i].gift:"xxxxxx") +"!";
                texts.push(text);
            }
            uerText = texts;
            vs = 0;

            AnimentNumber(1,10000,function(e){
                if(e == 10000){
                    requestAnimationFrame(function(){
                        getUserAward()
                    })
                }
            },10000)
        }
    });
}
//获取用户圣诞袜数量
function gethoseNumber(){
    $.ajax({
        type:"get",
        url:server+"api/christmasActivity/myChristmasStockingNum?customerId="+ customerId +"&token="+token,
        dataType: 'JSON',
        success:function(e){
            hoseNumber = e.data.myNum;
            $("#wzannuber").html(hoseNumber);
        }
    });
}
$("#hdgz").on("click",function(){
    $("#hdgzbox").show();
});
$("#gzqdinput").on("click",function(){
    $("#hdgzbox").hide();
});
//根据传入px长度单位获取等比单位
function eSize(number){
    return ((parseFloat(document.getElementsByTagName("html")[0].style.fontSize)) / 100) * number;
}
//数字加减动画
function AnimentNumber(number1,number2,callbk,tiem){
    var number = number1;
    var tiems = new Date().getTime();
    var bs = tiem*(6/100);
    var tiemx = true;
    numberAnimet();
    function numberAnimet(){
        var tiems2 = new Date().getTime();
        if(tiemx){
            if((tiems2-tiems)>(tiem/bs) && (tiems2-tiems)<(tiem/bs)*2){
                if(number2>number1){
                    number =(number2-number1)/bs + number;
                    if(number>=number2){
                        number=number2;
                        tiemx = false;
                    }
                }else {
                    number = number - (number1-number2)/bs;
                    if(number <= number2 ){
                        number=number2;
                        tiemx = false;
                    }
                }
                tiems+=(tiem/bs);

            }else if((tiems2-tiems)>(tiem/bs)*2){
                if(number2>number1){
                    number =((number2-number1)/bs)*2 + number;
                    if(number>=number2){
                        number=number2;
                        tiemx = false;
                    }
                }else {
                    number = number - ((number1-number2)/bs)*2;
                    if(number <= number2 ){
                        number=number2;
                        tiemx = false;
                    }
                }
                tiems+=(tiem/bs)*2;
            }

            requestAnimationFrame(numberAnimet);
            callbk(number);
        }
    }
}
