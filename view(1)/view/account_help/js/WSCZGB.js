//充值方式值
//快捷支付：10；支付宝3；微信支付：11；银联：4；建行：1；手机支付：2
var paytypeInfo = {};

//活动组的支付方式 对应充值页面支付方式的值
//paytypeInfo["19"] = "10";
//paytypeInfo["10"] = "10";
//paytypeInfo["1"] = "3";
//paytypeInfo["11"] = "11";
//paytypeInfo["3"] = "4";
//paytypeInfo["4"] = "1";
//paytypeInfo["6"] = "2";
//
////如果是2则是全部充值方式可用
//paytypeInfo["2"] = "ALL";
paytypeInfo["19"] = "10";     //快捷
paytypeInfo["10"] = "10";     //快捷
paytypeInfo["5"] = "1";    //建行
paytypeInfo["2"] = "11";   //微信
paytypeInfo["3"] = "3";    //支付宝
paytypeInfo["4"] = "4";    //银联
paytypeInfo["6"] = "2";      //和包

//如果是2则是全部充值方式可用
paytypeInfo["0"] = "ALL";   //不限制支付方式

//var _ThePayTypeArray = new Array("10", "3", "11", "4", "1", "2");//充值方式直接定义并初始化
var _ThePayTypeArray = new Array("3", "11","10", "4", "1", "2");//充值方式直接定义并初始化

//支付方式的中文描述
var paytypeInfoWord = {};
paytypeInfoWord["19"] = "快捷支付";     //快捷
paytypeInfoWord["5"] = "建行支付";    //建行
paytypeInfoWord["2"] = "微信支付";   //微信
paytypeInfoWord["3"] = "支付宝支付";    //支付宝
paytypeInfoWord["4"] = "银联支付";    //银联
paytypeInfoWord["6"] = "和包支付";      //和包
paytypeInfoWord["0"] = "不限支付方式";   //不限制支付方式

var czqList = "";

//充值券列表（日期作为条件）
var czqListByDate = "";


$(document).ready(function () {
var defaultpaytype = $("#paytype").val();
	if(defaultpaytype == "10" || defaultpaytype == "19"){
		$("#czBtn").attr('first','no');
	}
	//$("#czBtn").removeAttr('first');	
//    $("#czBtn").bind("click", function () {
//        var click = $("#czBtn").attr("disabled");
//        if (click) return false;
//        WSCZGBBusiComp.zhifuFastPay();
//    });

    var ele = $("#mobile");
    addValueFormat(ele, [3, 4, 4]);
    ele.on("keyup", function () {
        var t = $(this);
        addValueFormat(t, [3, 4, 4]);

    });
    //支付按钮
    var value = $("#mobile").val();
    if (value.length != 13)  {
    	 $('.f_cz_rig-disabled').show();
    }
    //WSCZGBBusiComp.showMoney();

var featureId;
	var url = window.location.search.substr(1);//访问的url
	var reg0 = new RegExp("(^|&)flag=([^&]*)(&|$)");
	var r0 = url.match(reg0);
	if(r0 != null){
	featureId = unescape(r0[2]);
	}
	if(featureId == "2"){
		$('.tab_way ul li').addClass('cur').siblings().removeClass('cur');
		$("#cashid").addClass('cur');
		$("#divOne").hide();
		$("#divTwo").show();
		$("#divThree").hide();
		$("#firstIndexDiv div").eq(1).show();
	}else if(featureId == "3"){
		$('.tab_way ul li').addClass('cur').siblings().removeClass('cur');
		$("#wlwid").addClass('cur');
		$("#divOne").hide();
		$("#divTwo").hide();
		$("#divThree").show();
		$("#firstIndexDiv div").eq(1).hide();
		
	}else{
		$('.tab_way ul li').addClass('cur').siblings().removeClass('cur');
		$("#moneyid").addClass('cur');
		$("#divOne").show();
		$("#divTwo").hide();
		$("#divThree").hide();
		$("#firstIndexDiv div").eq(1).show();
	}

});

/**
 * 在线充值业务
 */




var WSCZGBBusiComp = {

		
    aas: function (obj) {
    	
    	
	  //充值档次
    obj.className = "sel";
    var value_a = $.trim(obj.innerHTML);
    var  dcValue = value_a.substring(0, value_a.length - 1);
	//获取当前选中的充值券所支持的支付方式
	var yhqAccount= $("#yhqAccount").val();
	  //获取当前选中的优惠券的优惠券的编码
    var czqVal = $("input[name='yhq']:checked").val();
    //如果没有优惠券就不用判断当前券是否支持该充值档次了
    if (czqVal != null && czqVal != "") {
    	 var czq_payaccount_tk = true;
    	  var payaccountstrs = new Array(); //定义一数组,充值方式
    	  payaccountstrs = yhqAccount.split("-"); //字符分割
    	   if (payaccountstrs != null && payaccountstrs.length > 0) {
    		   outlooklop:
               for (y = 0; y < payaccountstrs.length; y++) {
            	   if (payaccountstrs[y] == dcValue) {
            		   czq_payaccount_tk = false;
            		   break outlooklop;
                   }
               }
    	   }
    	   if(czq_payaccount_tk){
    		     //档次和充值方式被赋值(档次不符合当前选中的充值券的使用条件，故弹框提示，档次还是之前的)
    		   var accountHis = $("#accountHis").val();
    		     $(".czje ul li").removeClass('sel');
    		     //档次被选中的样式
    		     $("#" + accountHis + "y").addClass('sel');
    		     $("#amount").attr("value", accountHis);
    	         $("#czq_payaccount_War").show();
    	   }
      }else{
         $("#amount").val(dcValue);
         $("#accountHis").val(dcValue);
         $(".czje ul li").removeClass('sel');
	     //档次被选中的样式
	     $("#" + dcValue + "y").addClass('sel');
	     WSCZGBBusiComp.showMoney();
    	
    }

    },
    abs: function (obj,amount) {
    	
	  //充值档次
    obj.className = "sel";
    //var value_a = $.trim(amount);
    var dcValue = $.trim(amount);
   // var  dcValue = value_a.substring(0, value_a.length - 1);
	//获取当前选中的充值券所支持的支付方式
	var yhqAccount= $("#yhqAccount").val();
	  //获取当前选中的优惠券的优惠券的编码
    var czqVal = $("input[name='yhq']:checked").val();
    //如果没有优惠券就不用判断当前券是否支持该充值档次了
    if (czqVal != null && czqVal != "") {
    	 var czq_payaccount_tk = true;
    	  var payaccountstrs = new Array(); //定义一数组,充值方式
    	  payaccountstrs = yhqAccount.split("-"); //字符分割
    	   if (payaccountstrs != null && payaccountstrs.length > 0) {
    		   outlooklop:
               for (y = 0; y < payaccountstrs.length; y++) {
            	   if (payaccountstrs[y] == dcValue) {
            		   czq_payaccount_tk = false;
            		   break outlooklop;
                   }
               }
    	   }
    	   if(czq_payaccount_tk){
    		     //档次和充值方式被赋值(档次不符合当前选中的充值券的使用条件，故弹框提示，档次还是之前的)
    		   var accountHis = $("#accountHis").val();
    		     $("[name='zffs']").removeClass('sel');
    		     //档次被选中的样式
    		     $("#" + accountHis + "y").addClass('sel');
    		     $("#amount").attr("value", accountHis);
    	         $("#czq_payaccount_War").show();
    	   }
      }else{
         $("#amount").val(dcValue);
         $("#accountHis").val(dcValue);
         $("[name='zffs']").removeClass('sel');
	     //档次被选中的样式
	     $("#" + dcValue + "y").addClass('sel');
	     //WSCZGBBusiComp.showMoney();
    	
    }
    if($("#paytype").val() && $("#paytype").val() =='11'){
    	var html="<div class=\"f_cz_rig\" collect=\"CZSY_23\" nextarea=\"true\" " +
		"	style=\"width: 100%\" nextpage=\"true\" id=\"czBtn\" " +
		"	businessid=\"E051709351477646480bid\" businessname=\"bid\" " +
		"	onclick=\"javascript:submitMoney("+amount+");\" " +
		"	touchvid=\"T051709392996884432\" touchcode=\"CZSY_23\" " +
		"	collectready=\"true\">立即充值</div>";
    	$("#payTypeButton").html(html);
    }

    },

    //清空按钮的显示
    showclosebtn: function () {
        var mobile = $.trim($("#mobile").val());
        if (mobile != "" && mobile != null) {

            $('#closebtn').show();
        }

  $('#mobile').on('input propertychange', function() {
            $('#closebtn')[$.trim(this.value) ? 'show' : 'hide']();
         });

         $('#mobile').on('blur', function() {
            $('#closebtn').hide();

         });
         $('#closebtn').on('mousedown', false);
    },

    //清空按钮的显示
    czashowqc: function () {
        var cardNum = $.trim($("#cardNum").val());
        if (cardNum != "" && cardNum != null) {

            $('#closebtn2').show();
}
    },


 //清空按钮的隐藏
    //hideclosebtn: function () {
          //  $('#closebtn').hide();
   // },


    
    
    
    //切换号码
    YHQByMobile: function () {
    	//重新切换号码清空之前的list优惠券列表重新查询
    	czqListByDate = "";
        if ($("#mobile").val().length != 0) $("#closebtn").show();
        //被充值的号码
        //被充值的号码
        var mobile = $.trim($("#mobile").val());
        mobile = re = mobile.replace(/\s+/g, "");//删除所有空格;
        //当前支付方式
        //var paytype = $.trim($("#paytype").val());
       // var amount = $.trim($("#amount").val());
        //充值券显示区域拼接字段
        var areaHtml = "";
        //优惠券面值置空，如果切换的档次有符合条件的券就会重新赋值，否则就是空，不能懈怠之前的值，也许是其他用户的值
        $("#yhqMoneyValue").val("");
        //快捷支付的优惠券值ticketid+marketid+...清空
        $("#czqValFast").val("");
        if (mobile != null && mobile != "") {
        	if(mobile.length >= 4){
            $.busiReq({
                data: {
                    "reqUrl": "WSCZGBQuery",
                    "busiNum": "WSCZGB",
                    "operNum": "2",
                    "mobile": mobile,
                    "paytype": $("#paytype").val()
                    //"dcValue": amount
                },
                success: function (result) {
                    //优惠券区域
                    $("#yhqDiv").empty();
                    $("#yhqDiv2").empty();
                    if (result && result.resultCode == "0") {
                        //充值券
                    	//czqListByDate = result.resultObj.czqList;

                        //该优惠券的最小充值档次
                        var dcValue = "100";

                        //是否是首冲
                        var isFirstFund = result.resultObj.isFirstFund;
                        $("#isFirstFund").attr("value", isFirstFund);

                        //档次和充值方式被赋值
                       // $("#amount").attr("value", dcValue);
                       // $(".czje ul li").removeClass('sel');

                        //档次被选中的样式
                       // $("#" + dcValue + "y").addClass('sel');


                        //设置充值方式充值事件(默认)
                       // $("#paytype").attr("value", "10");
                        //快捷支付的支付方式被选中（默认）
                        // $("#fastZF").attr("checked", "checked");

                        
                        //最大优惠券金额(切换号码没有默认的优惠券需要用户选中)
                        $("#yhqMoneyValue").val("");


                        $("#ecpczq").val("");
                        $("#fastczq").val("");
                        $("#czqtype").val("");

                        //新版优惠券显示区域
                       areaHtml = areaHtml + "<div class='yhq-info'>";
                       areaHtml = areaHtml + "<a href='javascript:void(0);' onclick='javascript:WSCZGBBusiComp.showMyCZQList()'>优惠券<span>查看优惠券</span></a>";
                       areaHtml = areaHtml + "</div>";


                        //选中优惠券变更首页显示之前将之前首页上的清空了
                        $(".yhactinner").empty();
                      //充值券的区域展示
                        $(".yhactinner").html(areaHtml);
                      //默认选择第一个充值券
                        //$(".yhactinner").find("input").eq(0).attr("checked", "checked"); 


                        WSCZGBBusiComp.showMoney();

                    } else {
                        //温馨提示弹框
                        $("#nomobilemsg").html(result.resultMsg);
                        $("#nomobilewxts").show();


                    }
                }


            });
        	}else{
				  //优惠券区域
        		 $(".yhactinner").empty();
				areaHtml = areaHtml +"<div class='yhq-info'>";	
				areaHtml = areaHtml +"<a href='javascript:void(0);' onclick='javascript:WSCZGBBusiComp.showyhqNonePage()'>优惠券<span>查看优惠券</span></a>";
				areaHtml = areaHtml +"</div>";	
				 $(".yhactinner").html(areaHtml);
			}
        } else {

            //优惠券区域
            $("#yhqDiv").empty();
            $("#yhqDiv2").empty();
            $("#yhqMoneyValue").attr("value", "");
            //快捷支付的优惠券值ticketid+marketid+...清空
            $("#czqValFast").val("");

        }
    },

    
    
    
//    //我的充值券列表
//    showMyCZQList: function () {
//    	  //获取登陆号码
//        var loginmobile = $.trim($("#loginmobile").val()).replace(/\s+/g, "");
//        //获取当前输入框中手机号码
//        var mobile = $.trim($("#mobile").val()).replace(/\s+/g, "");
//        if(loginmobile != mobile){
//            $("#yhqwxts").show();
//        }else{
//    	
////    	//隐藏首页显示优惠券列表
////    	 $("#firstIndexDiv").hide();
////         $("#lishiDIV").hide();
//         
//         //获取当前输入框中手机号码
//         var mobile = $.trim($("#mobile").val()).replace(/\s+/g, "");
//         var amount = $.trim($("#amount").val());
//         //当前选中的优惠券的编码(从我的优惠券页面过来的充值首页会展示选中的券)
//      
//         var czqVal = $("input[name='yhq']:checked").val();
//         var czqVals = new Array(); //定义一数组,充值方式
//         var czqValStr1 = "";  //父编码
//         var czqValStr2 = "";   //子编码 
//         if (czqVal) {
//             czqVals = czqVal.split(","); //字符分割
//             if (czqVals != null && czqVals.length > 0) {
//                 if (czqVals.length == 1) {
//                     czqValStr1 = czqVals[0];
//                 } else if (czqVals.length > 1) {
//                     czqValStr1 = czqVals[0];
//                     czqValStr2 = czqVals[1];
//                 }
//             }
//         }
//       
//         //充值券显示区域拼接字段
//         var areaHtml = "";
//         if (mobile != null && mobile != "") {
//        	  //czqListByDate优惠券列表（有效期内）有值则不需要重新查询,需要重新拼接是因为用户在首页是否选中了券，这里的列表显示会不同
//             if(czqListByDate != null && czqListByDate != "" && czqListByDate.length >0){
//                 //$("#yhqAll").show();
//            	 //优惠券的总张数
//                 var sumCzqCount = czqListByDate.length;
//                 //普通充值券
//             
//                 if (czqListByDate && Object.keys(czqListByDate).length > 0) {
//                	 
//                    areaHtml = areaHtml + "<div class='loading'>";
//                	 areaHtml = areaHtml + "<div class='notice_01 notice_yhq'>";
//                	 areaHtml = areaHtml + "<div class='tit'>优惠券 <a class='close' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">&#10005;</a></div>";
//                	 areaHtml = areaHtml + "  <div class='yhq-list'>";
//                     $.each(czqListByDate, function (i, item) {
//                         var remark4 = "";
//                         var czqnum = "";
//                         //支付方式
//                         var remark3 = "";
//                         remark3 = item.remark3;
//                         //券类型
//                         var ticketType = "";
//                         if(item.ticketType){
//                        	 ticketType = item.ticketType;
//                         }        
//
//                         if (item.remark4) {
//                             remark4 = item.remark4;
//                         }
//                         //支持的档次
//                         var zcmoney = item.remark2.replace(/\,/g, "-");
//
//                         if (item.ecp_flag == "ecpflag") {
//                             czqnum = item.MTicketID + "," + item.ticketID + "," + item.privid + "," + item.remark1 + "," + remark4;
//                         } else {
//
//                             czqnum = item.addvalue_number;
//                         }
//                         if (item.showczq == "showczq") {
//                        	 
//                             //areaHtml = areaHtml + "<label onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + keyongCzqCount + "')\" id='yhqLabel'>";
//                        	   areaHtml = areaHtml + "<label  id='yhqLabel'>";
//                             if (czqVal) {
//                                 if (czqValStr1 == item.addvalue_number || czqValStr1 == item.MTicketID && czqValStr2 == item.ticketID) {
//
//                                     areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value + "' checked  onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + czqListByDate + "')\">";
//                                 } else {
//                                     areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value + "' onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + czqListByDate + "')\">";
//                                 }
//                             } else {
//                                 areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value + "' onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + czqListByDate + "')\">";
//
//                             }
//                             areaHtml = areaHtml + "<div class='yhq-intro'>";
//
//                                 areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
//                            
//
//                             if (item.fast_flag == "fastflag") {
//
//                                 areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                             } else {
//
//                                 areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                             }
//
//                             var sd = item.startDate.replace(/\-/g, ".");
//                             var ed = item.endDate.replace(/\-/g, ".");
//
//                             areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
//                             areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
//                             areaHtml = areaHtml + "</div>";
//                             if(ticketType == "9"){
//                            	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
//                             }else{
//                            	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
//                             }
//                             areaHtml = areaHtml + "</label>";
//                         }
//                         else {
//                             areaHtml = areaHtml + "<label class='disabled'>";
//                             areaHtml = areaHtml + "<input type='radio' name='yhqlist1' disabled>";
//                             areaHtml = areaHtml + "<div class='yhq-intro'>";
//                             
//                                 areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
//                            
//
//                             if (item.fast_flag == "fastflag") {
//                                 areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                             } else {
//
//                                 areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                             }
//                             var sd = item.startDate.replace(/\-/g, ".");
//                             var ed = item.endDate.replace(/\-/g, ".");
//                             areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
//                             areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
//                             areaHtml = areaHtml + "</div>";
//                             if(ticketType == "9"){
//                            	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
//                             }else{
//                            	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
//                             }
//                             areaHtml = areaHtml + "</label>";
//                         }
//
//                     });
//                     
//                     
//                 
//                 areaHtml = areaHtml + "<hr></div>";
//                 areaHtml = areaHtml + "<a class='close_btn' id='close_btn' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">确定</a>";
//                 areaHtml = areaHtml + "</div>";
//                 areaHtml = areaHtml + "</div>";
//                 
//                 }else{
//                	 //无优惠券页面
//                     $("#NOYHQList").show();
//                     return;
//                	 
//                 }
//                 
//                 
//                 
//                 
////                 areaHtml = areaHtml + "</div>";
////                 areaHtml = areaHtml + "<footer>";
////                 areaHtml = areaHtml + "<a class='f_cz_rig f_cz_rigall'  href='javascript:void(0)' onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">确定</a>";
////                 areaHtml = areaHtml + "</footer>";
////              
//                 //先清空优惠券的显示区域
//                 $("#yhqAll").empty();
//                 $("#yhqAll").html(areaHtml);
//                 $("#yhqAll").show();
//             
//         }else{
//        	 $.busiReq({
//                 data: {
//                     "reqUrl": "WSCZGBQuery",
//                     "busiNum": "WSCZGB",
//                     "operNum": "3",
//                     "mobile": mobile,
//                     "dcValue":amount
//                 },
//                 success: function (result) {
//
//                     //所有充值券
//                     czqListByDate = result.resultObj.czqList;
//                     //优惠券的总张数
//                     var sumCzqCount = czqListByDate.length;
//                     //普通充值券
//                    // areaHtml = areaHtml + "<div class='yhq-list'>";
//                     if (czqListByDate && Object.keys(czqListByDate).length > 0) {
//                    	 areaHtml = areaHtml + "<div class='loading' id='YOYHQList'>";
//                    	 areaHtml = areaHtml + "<div class='notice_01 notice_yhq'>";
//                    	 areaHtml = areaHtml + "<div class='tit'>优惠券 <a class='close' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">&#10005;</a></div>";
//                    	 areaHtml = areaHtml + "  <div class='yhq-list'>";
//                         $.each(czqListByDate, function (i, item) {
//                             var remark4 = "";
//                             var czqnum = "";
//                             //支付方式
//                             var remark3 = "";
//                             remark3 = item.remark3;
//                             //券类型
//                             var ticketType = "";
//                             if(item.ticketType){
//                            	 ticketType = item.ticketType;
//                             }  
//
//                             if (item.remark4) {
//                                 remark4 = item.remark4;
//                             }
//                             //支持的档次
//                             var zcmoney = item.remark2.replace(/\,/g, "-");
//
//                             if (item.ecp_flag == "ecpflag") {
//                                 czqnum = item.MTicketID + "," + item.ticketID + "," + item.privid + "," + item.remark1 + "," + remark4;
//                             } else {
//
//                                 czqnum = item.addvalue_number;
//                             }
//                             if (item.showczq == "showczq") {
//                            	 
//                                 //areaHtml = areaHtml + "<label onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + keyongCzqCount + "')\" id='yhqLabel'>";
//                            	   areaHtml = areaHtml + "<label  id='yhqLabel'>";
//                                 if (czqVal) {
//                                     if (czqValStr1 == item.addvalue_number || czqValStr1 == item.MTicketID && czqValStr2 == item.ticketID) {
//
//                                         areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value + "' checked  onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + czqListByDate + "')\">";
//                                     } else {
//                                         areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value + "' onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + czqListByDate + "')\">";
//                                     }
//                                 } else {
//                                     areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value + "' onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + czqListByDate + "')\">";
//
//                                 }
//                                 areaHtml = areaHtml + "<div class='yhq-intro'>";
//
//                                     areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
//                                
//
//                                 if (item.fast_flag == "fastflag") {
//
//                                     areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                                 } else {
//
//                                     areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                                 }
//
//                                 var sd = item.startDate.replace(/\-/g, ".");
//                                 var ed = item.endDate.replace(/\-/g, ".");
//
//                                 areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
//                                 areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
//                                 areaHtml = areaHtml + "</div>";
//                                 if(ticketType == "9"){//积分充值券
//                                	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
//                                 }else{
//                                	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
//                                 }
//                                 areaHtml = areaHtml + "</label>";
//                             }
//                             else {
//                                 areaHtml = areaHtml + "<label class='disabled'>";
//                                 areaHtml = areaHtml + "<input type='radio' name='yhqlist1' disabled>";
//                                 areaHtml = areaHtml + "<div class='yhq-intro'>";
//                                 
//                                     areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
//                                
//
//                                 if (item.fast_flag == "fastflag") {
//                                     areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                                 } else {
//
//                                     areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                                 }
//                                 var sd = item.startDate.replace(/\-/g, ".");
//                                 var ed = item.endDate.replace(/\-/g, ".");
//                                 areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
//                                 areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
//                                 areaHtml = areaHtml + "</div>";
//                                 if(ticketType == "9"){
//                                	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
//                                 }else{
//                                	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
//                                 }
//                                 areaHtml = areaHtml + "</label>";
//                             }
//
//                         });
//                         
//                         areaHtml = areaHtml + "<hr></div>";
//                         areaHtml = areaHtml + "<a class='close_btn' id='close_btn' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">确定</a>";
//                         areaHtml = areaHtml + "</div>";
//                         areaHtml = areaHtml + "</div>";
//                     }else{
//                    	 //无优惠券页面
//                         $("#NOYHQList").show();
//                         return;
//                     }
////                     areaHtml = areaHtml + "</div>";
////                     areaHtml = areaHtml + "<footer>";
////                     areaHtml = areaHtml + "<a class='f_cz_rig f_cz_rigall'  href='javascript:void(0)' onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">确定</a>";
////                     areaHtml = areaHtml + "</footer>";
////                  
//                     //先清空优惠券的显示区域
//                     $("#yhqAll").empty();
//                     $("#yhqAll").html(areaHtml);
//                     $("#yhqAll").show();
//                 }
//
//
//             });
//             }
//         }else{
// 	 //无优惠券页面
//                         $("#NOYHQList").show();
//                         return;
//}
//         
//        }    
//    },
    
    
    //我的充值券列表
    showMyCZQList: function () {
    	  //获取登陆号码
        var loginmobile = $.trim($("#loginmobile").val()).replace(/\s+/g, "");
        //获取当前输入框中手机号码
        var mobile = $.trim($("#mobile").val()).replace(/\s+/g, "");
        if(loginmobile != mobile){
            $("#yhqwxts").show();
        }else{
    	
//    	//隐藏首页显示优惠券列表
//    	 $("#firstIndexDiv").hide();
//         $("#lishiDIV").hide();
         
         //获取当前输入框中手机号码
         var mobile = $.trim($("#mobile").val()).replace(/\s+/g, "");
         var amount = $.trim($("#amount").val());
         //当前选中的优惠券的编码(从我的优惠券页面过来的充值首页会展示选中的券)
      
         var czqVal = $("input[name='yhq']:checked").val();
         var czqVals = new Array(); //定义一数组,充值方式
         var czqValStr1 = "";  //父编码
         var czqValStr2 = "";   //子编码 
         if (czqVal) {
             czqVals = czqVal.split(","); //字符分割
             if (czqVals != null && czqVals.length > 0) {
                 if (czqVals.length == 1) {
                     czqValStr1 = czqVals[0];
                 } else if (czqVals.length > 1) {
                     czqValStr1 = czqVals[0];
                     czqValStr2 = czqVals[1];
                 }
             }
         }
       
         //充值券显示区域拼接字段
         var areaHtml = "";
         if (mobile != null && mobile != "") {
        	  //czqListByDate优惠券列表（有效期内）有值则不需要重新查询,需要重新拼接是因为用户在首页是否选中了券，这里的列表显示会不同
             if(czqListByDate != null && czqListByDate != "" && czqListByDate.length >0){
                 //$("#yhqAll").show();
            	 //优惠券的总张数
                 var sumCzqCount = czqListByDate.length;
                 //普通充值券
                 var remark3shuzu = new Array(); //定义一数组,充值方式
                 if (czqListByDate && Object.keys(czqListByDate).length > 0) {
                	 
                    areaHtml = areaHtml + "<div class='loading'>";
                	 areaHtml = areaHtml + "<div class='notice_01 notice_yhq'>";
                	 areaHtml = areaHtml + "<div class='tit'>优惠券 <a class='close' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">&#10005;</a></div>";
                	 areaHtml = areaHtml + "  <div class='yhq-list'>";
                     $.each(czqListByDate, function (i, item) {
                         var remark4 = "";
                         var czqnum = "";
                         //支付方式
                         var remark3 = "";
                         remark3 = item.remark3;
                         remark3shuzu = remark3.split(","); //字符分割
                         var payTypeDesc = "";   //支付方式中文描述
                       if (remark3shuzu != null && remark3shuzu.length > 0) {
                    	   for (x = 0; x < _ThePayTypeArray.length; x++) {
                    	          for (i = 0; i < remark3shuzu.length; i++) {
                    	        	  if (paytypeInfo[remark3shuzu[i]] == "ALL") {
                    	        		  payTypeDesc =paytypeInfoWord[0];
                                      }
                                      else if (_ThePayTypeArray[x] == paytypeInfo[remark3shuzu[i]]) {
                                    	  payTypeDesc +=paytypeInfoWord[remark3shuzu[i]];
                                      }
                    	           }
                    	   }
                     }
                         //券类型
                         var ticketType = "";
                         if(item.ticketType){
                        	 ticketType = item.ticketType;
                         }        

                         if (item.remark4) {
                             remark4 = item.remark4;
                         }
                         //支持的档次
                         var zcmoney = item.remark2.replace(/\,/g, "-");

                         if (item.ecp_flag == "ecpflag") {
                             czqnum = item.MTicketID + "," + item.ticketID + "," + item.privid + "," + item.remark1 + "," + remark4;
                         } else {

                             czqnum = item.addvalue_number;
                         }
                         if (item.showczq == "showczq") {
                        	 
                             //areaHtml = areaHtml + "<label onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + keyongCzqCount + "')\" id='yhqLabel'>";
                        	   areaHtml = areaHtml + "<label  id='yhqLabel'>";
                        	   if (czqVal) {
                                   if (czqValStr1 == item.addvalue_number || czqValStr1 == item.MTicketID && czqValStr2 == item.ticketID) {
                                
                                       areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value +"' fast_flag='" + item.fast_flag + "' ecp_flag='" + item.ecp_flag + "' czqtype='" + item.czqtype +"' remark4='" +remark4 +"' ticketName='" + item.ticketName +"' remark3='" + remark3 +"' czqnum='" + czqnum +"' zcmoney='" + zcmoney +"' checked  data-checked='true'>";
                                   } else {
                                  	  areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value +"' fast_flag='" + item.fast_flag + "' ecp_flag='" + item.ecp_flag + "' czqtype='" + item.czqtype +"' remark4='" +remark4 +"' ticketName='" + item.ticketName +"' remark3='" + remark3 +"' czqnum='" + czqnum +"' zcmoney='" + zcmoney +"'   >";
                                   }
                               } else {
                              	  areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value +"' fast_flag='" + item.fast_flag + "' ecp_flag='" + item.ecp_flag + "' czqtype='" + item.czqtype +"' remark4='" +remark4 +"' ticketName='" + item.ticketName +"' remark3='" + remark3 +"' czqnum='" + czqnum +"' zcmoney='" + zcmoney +"'   >";

                               }
                             areaHtml = areaHtml + "<div class='yhq-intro'>";

                                 areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
                            
                                 areaHtml = areaHtml + "<p>使用范围："+payTypeDesc+"</p>";
//                             if (item.fast_flag == "fastflag") {
//
//                                 areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                             } else {
//
//                                 areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                             }

                             var sd = item.startDate.replace(/\-/g, ".");
                             var ed = item.endDate.replace(/\-/g, ".");

                             areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
                             areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
                             areaHtml = areaHtml + "</div>";
                             if(ticketType == "9"){
                            	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
                             }else{
                            	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
                             }
                             areaHtml = areaHtml + "</label>";
                         }
                         else {
                             areaHtml = areaHtml + "<label class='disabled'>";
                             areaHtml = areaHtml + "<input type='radio' name='yhqlist1' disabled>";
                             areaHtml = areaHtml + "<div class='yhq-intro'>";
                             
                                 areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
                            
                                 areaHtml = areaHtml + "<p>使用范围："+payTypeDesc+"</p>";
//                             if (item.fast_flag == "fastflag") {
//                                 areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                             } else {
//
//                                 areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                             }
                             var sd = item.startDate.replace(/\-/g, ".");
                             var ed = item.endDate.replace(/\-/g, ".");
                             areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
                             areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
                             areaHtml = areaHtml + "</div>";
                             if(ticketType == "9"){
                            	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
                             }else{
                            	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
                             }
                             areaHtml = areaHtml + "</label>";
                         }

                     });
                     
                     
           
                 areaHtml = areaHtml + "<hr></div>";
                 areaHtml = areaHtml + "<a class='close_btn' id='close_btn' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.selectYHQByOne()\">确定</a>";
                 areaHtml = areaHtml + "</div>";
                 areaHtml = areaHtml + "</div>";
                 
                 }else{
                	 //无优惠券页面
                     $("#NOYHQList").show();
                     return;
                	 
                 }
                 
                 
                 
                 
//                 areaHtml = areaHtml + "</div>";
//                 areaHtml = areaHtml + "<footer>";
//                 areaHtml = areaHtml + "<a class='f_cz_rig f_cz_rigall'  href='javascript:void(0)' onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">确定</a>";
//                 areaHtml = areaHtml + "</footer>";
//              
                 //先清空优惠券的显示区域
                 $("#yhqAll").empty();
                 $("#yhqAll").html(areaHtml);
                 $("#yhqAll").show();
                 var radio = $('input[name="yhqlist"]');
                 radio.on('click', function() {
                   var el = $(this);
                   var checked = el.data('checked');
                   radio.not(':checked').data('checked', false);
                   el.data('checked', !checked);
                   el.prop('checked', !checked);
                 });
             
         }else{
var link = window.location.href;
        	 $.busiReq({
                 data: {
                     "reqUrl": "WSCZGBQuery",
                     "busiNum": "WSCZGB",
                     "operNum": "3",
                     "mobile": mobile,
                     "dcValue":amount,
                     "isTest":link.indexOf("isTest=0")!=-1?"0":"1"
                 },
                 success: function (result) {

                     //所有充值券
                     czqListByDate = result.resultObj.czqList;
                     //优惠券的总张数
                     var sumCzqCount = czqListByDate.length;
                     //普通充值券
                    // areaHtml = areaHtml + "<div class='yhq-list'>";
                     if (czqListByDate && Object.keys(czqListByDate).length > 0) {
                    	 areaHtml = areaHtml + "<div class='loading' id='YOYHQList'>";
                    	 areaHtml = areaHtml + "<div class='notice_01 notice_yhq'>";
                    	 areaHtml = areaHtml + "<div class='tit'>优惠券 <a class='close' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">&#10005;</a></div>";
                    	 areaHtml = areaHtml + "  <div class='yhq-list'>";
                         $.each(czqListByDate, function (i, item) {
                             var remark4 = "";
                             var czqnum = "";
                             //支付方式
                             var remark3 = "";
                             remark3 = item.remark3;
                             remark3shuzu = remark3.split(","); //字符分割
                             var payTypeDesc = "";   //支付方式中文描述
                             if (remark3shuzu != null && remark3shuzu.length > 0) {
                          	   for (x = 0; x < _ThePayTypeArray.length; x++) {
                          	          for (i = 0; i < remark3shuzu.length; i++) {
                          	        	  if (paytypeInfo[remark3shuzu[i]] == "ALL") {
                          	        		  payTypeDesc =paytypeInfoWord[0];
                                            }
                                            else if (_ThePayTypeArray[x] == paytypeInfo[remark3shuzu[i]]) {
                                          	  payTypeDesc +=paytypeInfoWord[remark3shuzu[i]];
                                            }
                          	           }
                          	   }
                           }
                             //券类型
                             var ticketType = "";
                             if(item.ticketType){
                            	 ticketType = item.ticketType;
                             }  

                             if (item.remark4) {
                                 remark4 = item.remark4;
                             }
                             //支持的档次
                             var zcmoney = item.remark2.replace(/\,/g, "-");

                             if (item.ecp_flag == "ecpflag") {
                                 czqnum = item.MTicketID + "," + item.ticketID + "," + item.privid + "," + item.remark1 + "," + remark4;
                             } else {

                                 czqnum = item.addvalue_number;
                             }
                             if (item.showczq == "showczq") {
                            	 
                                 //areaHtml = areaHtml + "<label onclick=\"javascript:WSCZGBBusiComp.checkCZQListByOne(this,'" + item.fast_flag + "','" + item.ecp_flag + "','" + item.czqtype + "','" + remark4 + "','" + item.ticketName + "','" + remark3 + "','" + czqnum + "','" + zcmoney + "','" + keyongCzqCount + "')\" id='yhqLabel'>";
                            	   areaHtml = areaHtml + "<label  id='yhqLabel'>";
                            	   if (czqVal) {
                                       if (czqValStr1 == item.addvalue_number || czqValStr1 == item.MTicketID && czqValStr2 == item.ticketID) {
                                    
                                           areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value +"' fast_flag='" + item.fast_flag + "' ecp_flag='" + item.ecp_flag + "' czqtype='" + item.czqtype +"' remark4='" +remark4 +"' ticketName='" + item.ticketName +"' remark3='" + remark3 +"' czqnum='" + czqnum +"' zcmoney='" + zcmoney +"' checked  data-checked='true'>";
                                       } else {
                                      	  areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value +"' fast_flag='" + item.fast_flag + "' ecp_flag='" + item.ecp_flag + "' czqtype='" + item.czqtype +"' remark4='" +remark4 +"' ticketName='" + item.ticketName +"' remark3='" + remark3 +"' czqnum='" + czqnum +"' zcmoney='" + zcmoney +"'   >";
                                       }
                                   } else {
                                  	  areaHtml = areaHtml + "<input type='radio' name='yhqlist' value='" + czqnum + "' id='" + item.addvalue_value +"' fast_flag='" + item.fast_flag + "' ecp_flag='" + item.ecp_flag + "' czqtype='" + item.czqtype +"' remark4='" +remark4 +"' ticketName='" + item.ticketName +"' remark3='" + remark3 +"' czqnum='" + czqnum +"' zcmoney='" + zcmoney +"'   >";

                                   }
                                 areaHtml = areaHtml + "<div class='yhq-intro'>";

                                     areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
                                
                                     areaHtml = areaHtml + "<p>使用范围："+payTypeDesc+"</p>";
//                                 if (item.fast_flag == "fastflag") {
//
//                                     areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                                 } else {
//
//                                     areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                                 }

                                 var sd = item.startDate.replace(/\-/g, ".");
                                 var ed = item.endDate.replace(/\-/g, ".");

                                 areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
                                 areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
                                 areaHtml = areaHtml + "</div>";
                                 if(ticketType == "9"){//积分充值券
                                	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
                                 }else{
                                	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
                                 }
                                 areaHtml = areaHtml + "</label>";
                             }
                             else {
                                 areaHtml = areaHtml + "<label class='disabled'>";
                                 areaHtml = areaHtml + "<input type='radio' name='yhqlist1' disabled>";
                                 areaHtml = areaHtml + "<div class='yhq-intro'>";
                                 
                                     areaHtml = areaHtml + "<h1>" + item.ticketName + "</h1>";
                                
                                     areaHtml = areaHtml + "<p>使用范围："+payTypeDesc+"</p>";
//                                 if (item.fast_flag == "fastflag") {
//                                     areaHtml = areaHtml + "<p>使用范围：限快捷支付</p>";
//                                 } else {
//
//                                     areaHtml = areaHtml + "<p>使用范围：其他支付</p>";
//                                 }
                                 var sd = item.startDate.replace(/\-/g, ".");
                                 var ed = item.endDate.replace(/\-/g, ".");
                                 areaHtml = areaHtml + "<p>支持档次：" + zcmoney + "</p>";
                                 areaHtml = areaHtml + "<p>有效期：" + sd + " — " + ed + "</p>";
                                 areaHtml = areaHtml + "</div>";
                                 if(ticketType == "9"){
                                	 areaHtml = areaHtml + "<div class='yhq-type'>积分<br>充值券</div>";
                                 }else{
                                	 areaHtml = areaHtml + "<div class='yhq-type'>充值券</div>";
                                 }
                                 areaHtml = areaHtml + "</label>";
                             }

                         });
                         
                         
                         areaHtml = areaHtml + "<hr></div>";
                         areaHtml = areaHtml + "<a class='close_btn' id='close_btn' href=\"javascript:void(0)\" onclick=\"WSCZGBBusiComp.selectYHQByOne()\">确定</a>";
                         areaHtml = areaHtml + "</div>";
                         areaHtml = areaHtml + "</div>";
                     }else{
                    	 //无优惠券页面
                         $("#NOYHQList").show();
                         return;
                     }
//                     areaHtml = areaHtml + "</div>";
//                     areaHtml = areaHtml + "<footer>";
//                     areaHtml = areaHtml + "<a class='f_cz_rig f_cz_rigall'  href='javascript:void(0)' onclick=\"WSCZGBBusiComp.closeWin('yhqAll')\">确定</a>";
//                     areaHtml = areaHtml + "</footer>";
//                  
                     //先清空优惠券的显示区域
                     $("#yhqAll").empty();
                     $("#yhqAll").html(areaHtml);
                     $("#yhqAll").show();
                     
                     var radio = $('input[name="yhqlist"]');
                     radio.on('click', function() {
                       var el = $(this);
                       var checked = el.data('checked');
                       radio.not(':checked').data('checked', false);
                       el.data('checked', !checked);
                       el.prop('checked', !checked);
                     });
                 }


             });
             }
         }else{
 	 //无优惠券页面
                         $("#NOYHQList").show();
                         return;
}
         
        }    
    },
    
    
    //当前选中的优惠券 
    selectYHQByOne: function () {

	 var czqVal = $("input[name='yhqlist']:checked").attr("value");
	 if(czqVal == undefined){
		  WSCZGBBusiComp.closeWin('yhqAll');
		  //选中优惠券变更首页显示之前将之前首页上的清空了
		  $("input[name='yhq']").attr("checked",false);
          $("#czqValFast").attr("value", "");
		  $("#yhqMoneyValue").val("");
 	       $(".yhactinner").empty();
 	       var areaHtml = "";
 	      areaHtml = areaHtml + "<div class='yhq-info'>";
	      areaHtml = areaHtml + "<a href='javascript:void(0);' onclick='javascript:WSCZGBBusiComp.showMyCZQList()'>优惠券<span>查看优惠券</span></a>";
	      areaHtml = areaHtml + "</div>";
	      //充值券的区域展示
	   	   $(".yhactinner").html(areaHtml);
		    WSCZGBBusiComp.showMoney();
	 }else{
			//获取当前输入框中手机号码
	        var mobile = $.trim($("#mobile").val()).replace(/\s+/g, "");
	    	//当前档次下可用的优惠券
	    	var keSumByAccount = "0";
	    	var id =  $("input[name='yhqlist']:checked").attr("id");
	    	var fast_flag =  $("input[name='yhqlist']:checked").attr("fast_flag");
	    	var ecp_flag =  $("input[name='yhqlist']:checked").attr("ecp_flag");
	      	var czqtype =  $("input[name='yhqlist']:checked").attr("czqtype");
	    	var remark4 =  $("input[name='yhqlist']:checked").attr("remark4");
	    	var ticketName =  $("input[name='yhqlist']:checked").attr("ticketName");
	    	var remark3 =  $("input[name='yhqlist']:checked").attr("remark3");
	    	var czqnum =  $("input[name='yhqlist']:checked").attr("czqnum");
	    	var zcmoney =  $("input[name='yhqlist']:checked").attr("zcmoney");
	    	
//	    	alert(id);
//	    	alert(fast_flag);
//	    	alert(ecp_flag);
//	    	alert(czqtype);
//	    	alert(remark4);
//	    	alert(ticketName);
//	    	alert(remark3);
//	    	alert(czqnum);
//	    	alert(zcmoney);
	    	
	    	
	       //分割支持的支付档次的字符串
	       var payAccountArray = zcmoney.split("-");
	       var payAccount = "100";
	       if (payAccountArray != null && payAccountArray.length > 0) {
	    	   payAccount =  payAccountArray[0];
	       }
	       
	       //当前选中的优惠券所支持的支付档次(用于用户切换充值档次时候的判断)
	       $("#yhqAccount").attr("value", zcmoney);
	       
	     //档次和充值方式被赋值
	     $("#amount").attr("value", payAccount);
	     //当前选中的券（作为历史记录，用于用于切换不符合条件的券的时候恢复之前的选择）
	     $("#accountHis").val(payAccount);
	     $(".czje ul li").removeClass('sel');
	     //档次被选中的样式
	     $("#" + payAccount + "y").addClass('sel');
	   		 var areaHtml = "";
	   	        //当前选中的优惠券的面值
	   	        var currentSelectValue = id;
	   	        //新版优惠券显示区
	   	        if (czqnum) {
	   	            areaHtml = areaHtml + "<div class='yhq-info'>";
	   	            areaHtml = areaHtml + "<a href='javascript:void(0);' onclick='javascript:WSCZGBBusiComp.showMyCZQList()'>优惠券<span>查看优惠券</span></a>";
	   	            areaHtml = areaHtml + "</div>";
	   	            areaHtml = areaHtml + "<div class='yhq'>";
	   	        }


	   	        //当前被选中的优惠券的值
	   	        $("#yhqMoneyValue").val(currentSelectValue);
	   	        $("#czqValFast").attr("value", czqnum);
	   	        $("#ecpczq").val(ecp_flag);
	   	        $("#fastczq").val(fast_flag);
	   	        $("#czqtype").val(czqtype);
	   	        areaHtml = areaHtml + "<label class='yh_txt clearfix' onclick=\"javascript:WSCZGBBusiComp.selectJFczqVal(this,'" + fast_flag + "','" + ecp_flag + "','" + czqtype + "','" + zcmoney + "')\" id='yhqLabel'>";

	   	        //areaHtml = areaHtml + "<input type='radio'  name='yhq' value='" + czqnum + "' id='" + currentSelectValue + "' onclick='check(this)'>";
	          areaHtml = areaHtml + "<input type='checkbox'  name='yhq' value='" + czqnum + "' id='" + currentSelectValue + "'>"; 

	   	        if (ecp_flag == "ecpflag") {
	   	            areaHtml = areaHtml + "<span>" + ticketName;
	   	        } else {

	   	            areaHtml = areaHtml + "<span>" + currentSelectValue + "元充值券";
	   	        }

	   	        if (ecp_flag == "fastflag") {

	   	            areaHtml = areaHtml + "(限快捷支付使用)";
	   	        }


	   	        areaHtml = areaHtml + "</span>";
	   	        areaHtml = areaHtml + "</label>";

	   	        areaHtml = areaHtml + "</div>";
	   	        areaHtml = areaHtml + "</div>"
	   	        //选中优惠券变更首页显示之前将之前首页上的清空了
	   	        $(".yhactinner").empty();
	   	      //充值券的区域展示
	   	        $(".yhactinner").html(areaHtml);
	   	      //默认选择第一个充值券
	   	        $(".yhactinner").find("input").eq(0).attr("checked", "checked");  
	   	        WSCZGBBusiComp.checkPayTypeOnclickByCzqPayType(remark3);

	   	        WSCZGBBusiComp.showMoney();
	   	        WSCZGBBusiComp.closeWin('yhqAll');
		 
	 }
	
	
    },
    
    
    
    
    //从优惠券列表也选中某张优惠券显示在充值首页上
    checkCZQListByOne: function (obj, fast_flag, ecp_flag, czqtype, remark4, ticketname, remark3, czqnum,zcmoney,czqListByDate) {

    	//获取当前输入框中手机号码
        var mobile = $.trim($("#mobile").val()).replace(/\s+/g, "");
    	//当前档次下可用的优惠券
    	var keSumByAccount = "0";
    	
       //分割支持的支付档次的字符串
       var payAccountArray = zcmoney.split("-");
       var payAccount = "100";
       if (payAccountArray != null && payAccountArray.length > 0) {
    	   payAccount =  payAccountArray[0];
       }
       
       //当前选中的优惠券所支持的支付档次(用于用户切换充值档次时候的判断)
       $("#yhqAccount").attr("value", zcmoney);
       
     //档次和充值方式被赋值
     $("#amount").attr("value", payAccount);
     //当前选中的券（作为历史记录，用于用于切换不符合条件的券的时候恢复之前的选择）
     $("#accountHis").val(payAccount);
     $(".czje ul li").removeClass('sel');
     //档次被选中的样式
     $("#" + payAccount + "y").addClass('sel');
   		 var areaHtml = "";
   	        //当前选中的优惠券的面值
   	        var currentSelectValue = ($(obj).attr("id"));
   	        //新版优惠券显示区
   	        if (czqnum) {
   	            areaHtml = areaHtml + "<div class='yhq-info'>";
   	            areaHtml = areaHtml + "<a href='javascript:void(0);' onclick='javascript:WSCZGBBusiComp.showMyCZQList()'>优惠券<span>查看优惠券</span></a>";
   	            areaHtml = areaHtml + "</div>";
   	            areaHtml = areaHtml + "<div class='yhq'>";
   	        }


   	        //当前被选中的优惠券的值
   	        $("#yhqMoneyValue").val(currentSelectValue);
   	        $("#czqValFast").attr("value", czqnum);
   	        $("#ecpczq").val(ecp_flag);
   	        $("#fastczq").val(fast_flag);
   	        $("#czqtype").val(czqtype);
   	        areaHtml = areaHtml + "<label class='yh_txt clearfix' onclick=\"javascript:WSCZGBBusiComp.selectJFczqVal(this,'" + fast_flag + "','" + ecp_flag + "','" + czqtype + "','" + zcmoney + "')\" id='yhqLabel'>";

   	        //areaHtml = areaHtml + "<input type='radio'  name='yhq' value='" + czqnum + "' id='" + currentSelectValue + "' onclick='check(this)'>";
          areaHtml = areaHtml + "<input type='checkbox'  name='yhq' value='" + czqnum + "' id='" + currentSelectValue + "'>"; 

   	        if (ecp_flag == "ecpflag") {
   	            areaHtml = areaHtml + "<span>" + ticketname;
   	        } else {

   	            areaHtml = areaHtml + "<span>" + currentSelectValue + "元充值券";
   	        }

   	        if (ecp_flag == "fastflag") {

   	            areaHtml = areaHtml + "(限快捷支付使用)";
   	        }


   	        areaHtml = areaHtml + "</span>";
   	        areaHtml = areaHtml + "</label>";

   	        areaHtml = areaHtml + "</div>";
   	        areaHtml = areaHtml + "</div>"
   	        //选中优惠券变更首页显示之前将之前首页上的清空了
   	        $(".yhactinner").empty();
   	      //充值券的区域展示
   	        $(".yhactinner").html(areaHtml);
   	      //默认选择第一个充值券
   	        $(".yhactinner").find("input").eq(0).attr("checked", "checked");  
   	        WSCZGBBusiComp.checkPayTypeOnclickByCzqPayType(remark3);

   	        WSCZGBBusiComp.showMoney();
        	
    
    	
    },
    
    
    

   


    //解析当前优惠券的支付方式，选择适合的支付方式和支付事件
    checkPayTypeOnclickByCzqPayType: function (payTypestr) {
        //充值的支付方式(活动侧)
        //充值页面的支付方式的值
        var paytype = "";
        var payTypeshuzu = new Array(); //定义一数组,充值方式
        payTypeshuzu = payTypestr.split(","); //字符分割
        innerLoops:
            if (payTypeshuzu != null && payTypeshuzu.length > 0) {
                for (x = 0; x < _ThePayTypeArray.length; x++) {
                    for (y = 0; y < payTypeshuzu.length; y++) {

                        //活动组充值券支持的充值方式和充值页面的充值方式对比
                        //如果对比到一个值就跳出循环，当前支付方式就选中该支付方式

                        //如果优惠券的支持支付方式为2通用，则默认选中当前充值页面第一个顺位的支付方式
                        if (paytypeInfo[payTypeshuzu[y]] == "ALL") {
                            paytype = _ThePayTypeArray[0];
                            break innerLoops;

                        }
                        else if (_ThePayTypeArray[x] == paytypeInfo[payTypeshuzu[y]]) {
                            paytype = _ThePayTypeArray[x];
                            break innerLoops;
                        }

                    }
                }
            }

        //为页面的隐藏支付值赋值页面识别的支付类型的值
        $("#paytype").attr("value", paytype);


        //快捷支付的支付方式被选中
        if (paytype == "10" || paytype == "19") {
            $("#fastZF").attr("checked", "checked");
        }

        //支付宝
        if (paytype == "3") {
            $("#zfbZF").attr("checked", "checked");

        }

        //微信
        if (paytype == "11") {
            $("#wxZF").attr("checked", "checked");

        }
        //中国银联
        if (paytype == "4") {
            $("#zgylZF").attr("checked", "checked");

        }

        //建行直冲
        if (paytype == "1") {
            $("#jhzcZF").attr("checked", "checked");

        }

        //手机支付
        if (paytype == "2") {
            $("#sjZF").attr("checked", "checked");

        }

        //事件解绑
        $("#czBtn").unbind();

        //如果是快捷支付
        if (paytype == "10") {
       	 //$("#czBtn").removeAttr('first');
       	$("#czBtn").attr('first','no');
//            });

        } else {
        	//$("#czBtn").attr('first','no');
        	 $("#czBtn").removeAttr('first');

        }


    },


  



    //点击优惠券触发的事件
    selectJFczqVal: function (obj, obj2, obj3, obj4,zcmoney) {
        var fastChecked = ($(obj).find("input").attr("checked"));
        //如果选中的优惠券是限制快捷支付的
        var currentSelectValue = ($(obj).find("input").attr("id"));

        $("#fastczq").attr("value", obj2);
        $("#ecpczq").attr("value", obj3);
        $("#czqtype").attr("value", obj4);


        if (fastChecked == "checked") {
            //当前被选中的优惠券的值
            $("#yhqMoneyValue").val(currentSelectValue);

            //如果被选中的优惠券是快捷支付，则改变提交按钮的事件，指向快捷支付的方法
            if (obj2 == "fastflag") {

                //快捷支付的支付方式被选中
                $("#fastZF").attr("checked", "checked");
                //支付方式改为10快捷支付
                $("#paytype").val("10");
                //如果是快捷支付
                $("#czBtn").unbind();
                //$("#czBtn").removeAttr('first');
                $("#czBtn").removeAttr('no');
//                $("#czBtn").bind("click", function () {
//                    var click = $("#czBtn").attr("disabled");
//                    if (click) return false;
//
//                    WSCZGBBusiComp.zhifuFastPay();
//                });
            }
            
            //支付档次
            //分割支持的支付档次的字符串
            var payAccountArray = zcmoney.split("-");
            var payAccount = "100";
            if (payAccountArray != null && payAccountArray.length > 0) {
         	   payAccount =  payAccountArray[0];
            }
            //当前选中的优惠券所支持的支付档次(用于用户切换充值档次时候的判断)
            $("#yhqAccount").attr("value", zcmoney);
          //档次和充值方式被赋值
          $("#amount").attr("value", payAccount);
          //当前选中的券（作为历史记录，用于用于切换不符合条件的券的时候恢复之前的选择）
          $("#accountHis").val(payAccount);
          $(".czje ul li").removeClass('sel');
          //档次被选中的样式
          $("#" + payAccount + "y").addClass('sel');

        } else {
            $("#yhqMoneyValue").val("");
            //快捷支付的优惠券值ticketid+marketid+...清空
            $("#czqValFast").val("");
            //优惠券支持的支付档次清空
            $("#yhqAccount").val("");
            
            //优惠券取消选中，则优惠券区域 
            $(".yhactinner").empty();
  	       var areaHtml = "";
  	      areaHtml = areaHtml + "<div class='yhq-info'>";
 	      areaHtml = areaHtml + "<a href='javascript:void(0);' onclick='javascript:WSCZGBBusiComp.showMyCZQList()'>优惠券<span>查看优惠券</span></a>";
 	      areaHtml = areaHtml + "</div>";
 	      //充值券的区域展示
 	   	   $(".yhactinner").html(areaHtml);

        }


        WSCZGBBusiComp.showMoney();


    },

    


    //充值方式的选择事件
    selectPaytype: function (obj, num) {
//        //当前支付方式
//        var paytypeold = $("#paytype").val();
//        //获取当前选中的优惠券的优惠券的编码
//        var czqVal = $("input[name='yhq']:checked").val();
//        
//        //我的充值券页面过来的充值券加载时查询了充值券信息(czqListByDate用户点击切换档次和查询优惠券列表才有请求值)
//        var myczqPageList = $("#myczqPageList").val();
//        //支付方式
//        var remark3 = "";
//        var paytypestrs = new Array(); //定义一数组,充值方式
//        var czq_paytype_tk = true;
//        //如果没有优惠券就不用判断当前券是否支持该支付方式
//        if (czqVal != null && czqVal != "") {
//            if (czqListByDate && Object.keys(czqListByDate).length > 0) {
//                outlooklop:
//                    for (var j = 0; j < czqListByDate.length; j++) {
//                        //用当前优惠券编码对比list得到该优惠券的所有信息
//                        if (czqVal = czqListByDate[j].ticketID) {
//                            remark3 = czqListByDate[j].remark3;
//                            paytypestrs = remark3.split("-"); //字符分割
//                            if (paytypestrs != null && paytypestrs.length > 0) {
//                                for (y = 0; y < paytypestrs.length; y++) {
//                                    if (paytypeInfo[paytypestrs[y]] == "ALL") {
//                                        czq_paytype_tk = false;
//                                        break outlooklop;
//
//                                    }
//                                    else if (num == paytypeInfo[paytypestrs[y]]) {
//                                        czq_paytype_tk = false;
//                                        break outlooklop;
//                                    }
//                                }
//                            }
//
//                        }
//                    }
//            }else{
//            	//在czqListByDate没有值用来判断的情况下，对比当前充值方式和即将切换的充值方式是否一致即可
//                paytypestrs = paytypeold.split("-"); //字符分割
//                if (paytypestrs != null && paytypestrs.length > 0) {
//                	  outlooklop2:
//                    for (x = 0; x < paytypestrs.length; x++) {
//                        if (paytypeInfo[paytypestrs[x]] == "ALL") {
//                            czq_paytype_tk = false;
//                            break outlooklop2;
//
//                        }
//                        else if (num == paytypeInfo[paytypestrs[x]]) {
//                            czq_paytype_tk = false;
//                            break outlooklop2;
//                        }
//                    }
//                }
//            }
//               if (czq_paytype_tk) {
//                $("#czq_paytype_War").show();
//                //快捷支付的支付方式被选中
//                if (paytypeold == "10" || paytypeold == "19") {
//                    $("#fastZF").attr("checked", "checked");
//                }
//
//                //支付宝
//                if (paytypeold == "3") {
//                    $("#zfbZF").attr("checked", "checked");
//
//                }
//
//                //微信
//                if (paytypeold == "11") {
//                    $("#wxZF").attr("checked", "checked");
//
//                }
//                //中国银联
//                if (paytypeold == "4") {
//                    $("#zgylZF").attr("checked", "checked");
//
//                }
//
//                //建行直冲
//                if (paytypeold == "1") {
//                    $("#jhzcZF").attr("checked", "checked");
//
//                }
//
//                //手机支付
//                if (paytypeold == "2") {
//                    $("#sjZF").attr("checked", "checked");
//
//                }
//                
//                //支付宝签约
//                if (paytypeold == "30") {
//                    $("#zfbqyZF").attr("checked", "checked");
//
//                }
//
//                return;
//            }
//        }
//
//
//        //选中的充值方式的值赋值给隐藏的文本
//        $("#paytype").val(num);
//
//        //充值金额的实时变动
//        WSCZGBBusiComp.showMoney();
//
//        //事件解绑
//        $("#czBtn").unbind();
//
//        //如果是快捷支付
//        if (num == "10") {
//        	 //$("#czBtn").removeAttr('first');
//        	$("#czBtn").attr('first','no');
//
//        } else {
//        	 	//$("#czBtn").attr('first','no');
//        	 	$("#czBtn").removeAttr('first');
//
//        }
//
//        WSCZGBBusiComp.showMoney();
       	//alert("num"+num);
        //当前支付方式(input)
        var paytypeold = $("#paytype").val();
        //获取当前选中的优惠券的优惠券的编码
        var czqVal = $("input[name='yhq']:checked").val();//？？没有
        //alert("czqVal"+czqVal);
        var czqvalstrs = new Array(); //定义一数组,充值券信息
        var czqvalOne = null;
     	//我的充值券页面过来的标识(过来的充值券直接获取该券的支付方式)
        var myczq = $("input[name='yhq']").attr("myczq");
        //我的充值券页面过来的充值券加载时查询了充值券信息(czqListByDate用户点击切换档次和查询优惠券列表才有请求值)
        //var myczqPageList = $("#myczqPageList").val();
        //支付方式
        var remark3 = "";
        var paytypestrs = new Array(); //定义一数组,充值方式
        var czq_paytype_tk = true;
        //如果没有优惠券就不用判断当前券是否支持该支付方式
        if (czqVal != null && czqVal != "") {
        	czqvalstrs = czqVal.split(","); 
        	czqvalOne = czqvalstrs[1];  //获取选中的充值券的ticketID
            if (czqListByDate && Object.keys(czqListByDate).length > 0) {
            	//alert(1);
                outlooklop:
                    for (var j = 0; j < czqListByDate.length; j++) {
                        //用当前优惠券编码对比list得到该优惠券的所有信息
                        if (czqvalOne == czqListByDate[j].ticketID) {
                            remark3 = czqListByDate[j].remark3;
                            paytypestrs = remark3.split(","); //字符分割
                            if (paytypestrs != null && paytypestrs.length > 0) {
                                for (y = 0; y < paytypestrs.length; y++) {
                                    if (paytypeInfo[paytypestrs[y]] == "ALL") {
                                        czq_paytype_tk = false;
                                        break outlooklop;

                                    }
                                    else if (num == paytypeInfo[paytypestrs[y]]) {
                                        czq_paytype_tk = false;
                                        break outlooklop;
                                    }
                                }
                            }

                        }
                    }
            }
            else if(myczq == "myczqPage"){
            	//alert(2);
            	//我的充值券页面过来的充值券直接获取该券的支付方式
            	var myczqPageRemark3 = $("#myczqPageRemark3").val();
                  paytypestrs = myczqPageRemark3.split(","); //字符分割
                  if (paytypestrs != null && paytypestrs.length > 0) {
                	  outlooklop3:
                      for (y = 0; y < paytypestrs.length; y++) {
                          if (paytypeInfo[paytypestrs[y]] == "ALL") {
                              czq_paytype_tk = false;
                              break outlooklop3;

                          }
                          else if (num == paytypeInfo[paytypestrs[y]]) {
                              czq_paytype_tk = false;
                              break outlooklop3;
                          }
                      }
                  }
            }
            else{
            	//alert(3);
            	//在czqListByDate没有值用来判断的情况下，对比当前充值方式和即将切换的充值方式是否一致即可
                paytypestrs = paytypeold.split("-"); //字符分割
                if (paytypestrs != null && paytypestrs.length > 0) {
                	  outlooklop2:
                    for (x = 0; x < paytypestrs.length; x++) {
                        if (paytypeInfo[paytypestrs[x]] == "ALL") {
                            czq_paytype_tk = false;
                            break outlooklop2;

                        }
                        else if (num == paytypeInfo[paytypestrs[x]]) {
                            czq_paytype_tk = false;
                            break outlooklop2;
                        }
                    }
                }
            }
               if (czq_paytype_tk) {
                $("#czq_paytype_War").show();
                //快捷支付的支付方式被选中
                if (paytypeold == "10" || paytypeold == "19") {
                    $("#fastZF").attr("checked", "checked");
                }

                //支付宝
                if (paytypeold == "3") {
                    $("#zfbZF").attr("checked", "checked");

                }

                //微信
                if (paytypeold == "11") {
                    $("#wxZF").attr("checked", "checked");

                }
                //中国银联
                if (paytypeold == "4") {
                    $("#zgylZF").attr("checked", "checked");

                }

                //建行直冲
                if (paytypeold == "1") {
                    $("#jhzcZF").attr("checked", "checked");

                }

                //手机支付
                if (paytypeold == "2") {
                    $("#sjZF").attr("checked", "checked");

                }
                
                //支付宝签约
                if (paytypeold == "30") {
                    $("#zfbqyZF").attr("checked", "checked");

                }

                return;
            }
        }


        //选中的充值方式的值赋值给隐藏的文本
        $("#paytype").val(num);

        //充值金额的实时变动
        WSCZGBBusiComp.showMoney();

        //事件解绑
        $("#czBtn").unbind();//???????????????

        //如果是快捷支付
        if (num == "10") {
        	 //$("#czBtn").removeAttr('first');
        	$("#czBtn").attr('first','no');

        } else {
        	 	//$("#czBtn").attr('first','no');
        	 	$("#czBtn").removeAttr('first');

        }

        WSCZGBBusiComp.showMoney();
    },
    
    //充值方式的选择事件
    selectPaytypeSecond: function (obj, num) {
    	 if('3'==num){
         	$(".payAmountFordisplay1").attr("style","display:inline;color:black;font-weight:800;font-size:14px;");
         	$(".payAmountFordisplay").attr("style","display:inline;color:red;font-weight:800;font-size:14px;");
         	$("#imgFor3p").attr("src","./images/Alipay_p.png");
         	$("#imgFor11p").attr("src","./images/wechat_n.png");
         	var html="<div class=\"f_cz_rig\" collect=\"CZSY_23\" nextarea=\"true\" " +
									"	style=\"width: 100%\" nextpage=\"true\" id=\"czBtn\" " +
									"	businessid=\"E051709351477646480bid\" businessname=\"bid\" " +
									"	onclick=\"var cate = $('#czBtn').attr('first');if(cate==undefined) WSCZGBBusiComp.zhifuOtherPay();else WSCZGBBusiComp.zhifuFastPay();if(typeof(_tag)!='undefined'){_tag.dcsMultiTrack('WT.nv','WSCZ', 'WT.event','WSCZ_LJCZ_m');}\" " +
									"	touchvid=\"T051709392996884432\" touchcode=\"CZSY_23\" " +
									"	collectready=\"true\">立即充值</div>";
         	$("#payTypeButton").html(html);
         	
         }
         if('11'==num){
         	$(".payAmountFordisplay1").attr("style","display:none");
         	$(".payAmountFordisplay").attr("style","display:none");
         	$("#imgFor3p").attr("src","./images/Alipay_n.png");
         	
         	$("#imgFor11p").attr("src","./images/wechat_p.png");
         	var amount = $("#amount").val();
         	var html="<div class=\"f_cz_rig\" collect=\"CZSY_23\" nextarea=\"true\" " +
						"	style=\"width: 100%\" nextpage=\"true\" id=\"czBtn\" " +
						"	businessid=\"E051709351477646480bid\" businessname=\"bid\" " +
						"	onclick=\"javascript:submitMoney("+amount+");\" " +
						"	touchvid=\"T051709392996884432\" touchcode=\"CZSY_23\" " +
						"	collectready=\"true\">立即充值</div>";
         	$("#payTypeButton").html(html);
         }
           
        $("#paytype").val(num);
       // $("#amount").val();
        //事件解绑
        $("#czBtn").unbind();
        //如果是快捷支付
        if (num == "10") {
        	$("#czBtn").attr('first','no');
        } else {
        	 	$("#czBtn").removeAttr('first');
        }
    },

    //优惠金额和实际到账区域的展示（公共方法）
    showMoney: function () {
    	 //获取当天是否是周三
        var wednesday = $.trim($("#wednesday").val());
        //获取充值档次
        var amount = $.trim($("#amount").val());
        //获取充值方式
        var paytype = $.trim($("#paytype").val());
        //当前优惠券的面值
        var yhqMoneyValue = $.trim($("#yhqMoneyValue").val());
        //积分屏蔽
        //当前积分的兑换值
        //var  jfPayMoney = $.trim($("#jfPayMoney").val());


        //转换后的充值档次?????????
        var amountInt = "0";
        
        //应付金额
        var amountyf = "0";

        //转换后的积分兑换值(积分屏蔽)
        //var jfPayMoneyInt = "0";

        //实际的到账
        var sjPayMoney = "0";
        //本金区域
        var yfPayMoneyHtml = "";
        
        //优惠券的显示
        if (yhqMoneyValue != null && yhqMoneyValue != "" && yhqMoneyValue != "0") {
        	if($("#paytype").val()==3){
        		amountInt =  (parseInt(amount) )*100;   //实际到账（有优惠券）
        	}else if($("#paytype").val()==11){
        		amountInt =  (parseInt(amount) )*70;   //实际到账（有优惠券）
        	}else{
        		amountInt =  (parseInt(amount) )*70;   //实际到账（有优惠券）
        	}
            
            //本金显示
            if (amount != null && amount != "") {
            	amountyf = amount;
                $("#yfPayMoney").empty();
                $("#yfPayMoney").html("<span>" + amountyf + "</span>元");
                $("#yfPayMoney").show();
            } else {
                $("#yfPayMoney").empty();

            }
            
        } 
        
        else {
        	if($("#paytype").val()==3){
        		amountInt =  (parseInt(amount) )*100;   //实际到账（有优惠券）
        	}else if($("#paytype").val()==11){
        		amountInt =  (parseInt(amount) )*70;   //实际到账（有优惠券）
        	}else{
        		amountInt =  (parseInt(amount) )*70;   //实际到账（有优惠券）
        	}
            //本金显示
            if (amount != null && amount != "") {
            	amountyf = amount;
                
                if(wednesday == "y"){   //周三
                  	 if (amount == 1) {
                		 amountyf = 1;
                      }
                	 if (amount == 50) {
                		 amountyf = 50;
                      }
                	 if (amount == 100) {
                		 amountyf = 100;
                      }
                	 if (amount == 200) {
                		 amountyf = 200;
                      }
                	 if (amount == 500) {
                		 amountyf = 500;
                      }
                	 if (amount == 1000) {
                		 amountyf = 1000;
                      }
                }else{         //非周三
                 	 if (amount == 1) {
                		 amountyf = 1;
                      }
                	 if (amount == 50) {
                		 amountyf = 50;
                      }
                	 if (amount == 100) {
                		 amountyf = 100;
                      }
                	 if (amount == 200) {
                		 amountyf = 200;
                      }
                	 if (amount == 500) {
                		 amountyf = 500;
                      }
                	 if (amount == 1000) {
                		 amountyf = 1000;
                      }
                	 if (amount == 6) {
                		 amountyf = 660;
                      }
                	
                }
                
                $("#yfPayMoney").empty();
                $("#yfPayMoney").html("<span>" + amountyf + "</span>元");
                $("#yfPayMoney").show();
            } else {
                $("#yfPayMoney").empty();

            }
        }

        $("#sumMoney").html(amountInt);


        //e币的赠送
        if (paytype == 2) {

            $("#eb").empty();
            $("#yhPayMoneyEM").empty();
        }

    },

    
    
//    //优惠金额和实际到账区域的展示（公共方法）
//    showMoney: function () {
//        //获取充值档次
//        var amount = $.trim($("#amount").val());
//        //获取充值方式
//        var paytype = $.trim($("#paytype").val());
//        //当前优惠券的面值
//        var yhqMoneyValue = $.trim($("#yhqMoneyValue").val());
//        //积分屏蔽
//        //当前积分的兑换值
//        //var  jfPayMoney = $.trim($("#jfPayMoney").val());
//
//
//        //转换后的充值档次
//        var amountInt = "0";
//
//        //转换后的积分兑换值(积分屏蔽)
//        //var jfPayMoneyInt = "0";
//
//        //实际的到账
//        var sjPayMoney = "0";
//
//        //本金区域
//        var yfPayMoneyHtml = "";
//
//
//        //本金显示
//        if (amount != null && amount != "") {
//            amountInt = amount;
//            $("#yfPayMoney").empty();
//            $("#yfPayMoney").html("<span>" + amount + "</span>元");
//            $("#yfPayMoney").show();
//        } else {
//            $("#yfPayMoney").empty();
//
//        }
//
//        //优惠券的显示
//        if (yhqMoneyValue != null && yhqMoneyValue != "" && yhqMoneyValue != "0") {
////            $("#yhPayMoneyEM").empty();
////            $("#yhPayMoneyEM").html("+<span>" + yhqMoneyValue + "</span>元");
////            $("#yhPayMoneyEM").show();
//            amountInt =  parseInt(amount) + parseInt(yhqMoneyValue);
//        } else {
//            if (paytype == "10") {
//                $("#yhPayMoneyEM").empty();
//
//                var isFirstFund = $.trim($("#isFirstFund").val());
//                //首冲
//                if (isFirstFund == "1") {
//                    if (amount == 100) {
////                        $("#yhPayMoneyEM").empty();
////                        $("#yhPayMoneyEM").html("+<span>" + 5 + "</span>元");
////                        $("#yhPayMoneyEM").show();
//                    	amountInt = 100+5;
//                    }
//                } else if (isFirstFund == "0") {
//                    if (amount == 50) {
////                        $("#yhPayMoneyEM").empty();
////                        $("#yhPayMoneyEM").html("+<span>" + 1 + "</span>元");
////                        $("#yhPayMoneyEM").show();
//                    	amountInt = 50+1;
//                    }
//
//                    if (amount == 100) {
////                        $("#yhPayMoneyEM").empty();
////                        $("#yhPayMoneyEM").html("+<span>" + 2 + "</span>元");
////                        $("#yhPayMoneyEM").show();
//                    	amountInt = 100+2;
//                    }
//
//                    if (amount == 200) {
////                        $("#yhPayMoneyEM").empty();
////                        $("#yhPayMoneyEM").html("+<span>" + 4 + "</span>元");
////                        $("#yhPayMoneyEM").show();
//                    	amountInt = 200+4;
//                    }
//
//                    if (amount == 500) {
////                        $("#yhPayMoneyEM").empty();
////                        $("#yhPayMoneyEM").html("+<span>" + 10 + "</span>元");
////                        $("#yhPayMoneyEM").show();
//                    	amountInt = 500+10;
//                    }
//
//                    if (amount == 1000) {
////                        $("#yhPayMoneyEM").empty();
////                        $("#yhPayMoneyEM").html("+<span>" + 20 + "</span>元");
////                        $("#yhPayMoneyEM").show();
//                    	amountInt = 1000+20;
//                    }
//
//                }
//
//
//            } else {
//                if (amount == 50) {
////                    $("#yhPayMoneyEM").empty();
////                    $("#yhPayMoneyEM").html("+<span>" + 0.5 + "</span>元");
////                    $("#yhPayMoneyEM").show();
//                	amountInt = 50+0.5;
//                }
//                else if (amount == 100) {
////                    $("#yhPayMoneyEM").empty();
////                    $("#yhPayMoneyEM").html("+<span>" + 1 + "</span>元");
////                    $("#yhPayMoneyEM").show();
//                	amountInt = 100+1;
//                }
//
//                else if (amount == 200) {
////                    $("#yhPayMoneyEM").empty();
////                    $("#yhPayMoneyEM").html("+<span>" + 2 + "</span>元");
////                    $("#yhPayMoneyEM").show();
//                	amountInt = 200+2;
//                }
//
//                else if (amount == 500) {
////                    $("#yhPayMoneyEM").empty();
////                    $("#yhPayMoneyEM").html("+<span>" + 5 + "</span>元");
////                    $("#yhPayMoneyEM").show();
//                	amountInt = 500+5;
//                }
//
//                else if (amount == 1000) {
////                    $("#yhPayMoneyEM").empty();
////                    $("#yhPayMoneyEM").html("+<span>" + 10 + "</span>元");
////                    $("#yhPayMoneyEM").show();
//                	amountInt = 1000+10;
//                }
//
//                else {
//                    $("#yhPayMoneyEM").empty();
//
//                }
//            }
//
//        }
//
//
//       // $("#sumMoney").html(amount);
//        $("#sumMoney").html(amountInt);
//
//
//        //e币的赠送
//        if (paytype == 2) {
//
//            $("#eb").empty();
//            $("#yhPayMoneyEM").empty();
//        }
//
//        //if (paytype != "2") {
//
//
//            //if (amount == 10) {
//             //   $("#eb").html("+<span>1</span>e币");
//            //}
//            //if (amount == 30) {
//                //i$("#eb").html("+<span>3</span>e币");
//            //}
//            //if (amount == 50) {
//            //    $("#eb").html("+<span>5</span>e币");
//            //}
//            //if (amount == 100) {
//           //     $("#eb").html("+<span>10</span>e币");
//           // }
//           // if (amount == 200) {
//           //     $("#eb").html("+<span>20</span>e币");
//           // }
//           // if (amount == 500) {
//           //    $("#eb").html("+<span>50</span>e币");
//          // }
//            // if (amount == 1000) {
//             //    $("#eb").html("+<span>1000</span>e币");
//            // }
//
//        // }
//    },


    //其他充值方式（非快捷支付）
    zhifuOtherPay: function () {
        //Modified By Wmerake ON 2016-10-10 大数据插码获取BID 误删！！！
        var bid = (window['$$XWBD_API'] && typeof $$XWBD_API.getBid == 'function') ? ($$XWBD_API.getBid(1) ? $$XWBD_API.getBid(1) : "BID NULL") : "LOAD FAIL";

       //$(".banner").hide();

        //被充值号码
        var targetPhone = $.trim($("#mobile").val());
        targetPhone = re = targetPhone.replace(/\s+/g, "");//删除所有空格;
        //校验是否是移动号码
//        if (!chkMobileNumber(targetPhone)) {
//            $("#mobileWar").show();
//            return;
//
//        }
        //登陆号码
        var loginmobile = $.trim($("#loginmobile").val());

        if (loginmobile == targetPhone) {

        }

        //充值方式
        var paytype = $("#paytype").val();
        if (paytype == "12") {
            window.location.href = "XYCZ.thtml";
        }


        //充值金额
        var amount = $("#amount").val();
        
        //优惠券的编码
        var czqVal = $("input[name='yhq']:checked").val();
        //官微openid
        var openid = $.trim($("#openid").val());

        //积分的值(积分屏蔽)
        //var scoreValue = $("input[name='jifen']:checked").val();
        //"scoreValue"    :scoreValue,
        //是否是ECP测优惠券数据
        var ecpczq = $("#ecpczq").val();

        //充值按钮不可用
        //$("#czBtn").unbind();
        $("#czBtn").attr("disabled", true);

        $.busiReq(
            {
                data: {
                    "reqUrl": "WSCZGB",
                    "busiNum": "WSCZGB",
                    "operNum": "2",
                    "amount": amount,
                    "mobile": targetPhone,
                    "paytype": paytype,
                    "czqVal": czqVal,
                    "B_ID": bid,
                    "ecpczq": ecpczq,
                    "openid": openid
                },
                success: function (result) {
                	 if (result && result.resultCode == "0") {
                		 if(paytype && paytype == "11"){
                			 $("#pay_account").html("<button id='czqrczback' collect='CZSY_28' nextPage='true' class='btn min160' onclick=\"javascript:submitMoney("+amount+");\" style='height: 37px;background-color:#FC7216;border:0' value=''>确认充值</button>");
                		 }else{
                        	 $("#pay_account").html(result.resultObj.form);
                         }
                		
                	 }
                	
                	/*
                	$(".banner").hide();
                    if (result && result.resultCode == "0") {
                        var mobile = result.resultObj.mobile;
                        var unionPaySrl = result.resultObj.unionPaySrl;
                        var amount = result.resultObj.amount;
                        var actualmoneyStr = result.resultObj.actualmoneyStr;
                        var payTypeFormat = result.resultObj.payTypeFormat
                        var formData = result.resultObj.formData;
                        var czqFlag = result.resultObj.czqFlag;
                        var payTypeFormat = result.resultObj.payTypeFormat;
                        var paytype = result.resultObj.paytype;
                        var sessionid = result.resultObj.sessionid;

                        var htmlValue = "";
                        htmlValue += "<section class='se'>";
                        htmlValue += "<table width='100%'>";
                        htmlValue += "<colgroup><col width='130' /></colgroup>";
                        htmlValue += "<tbody>";
                        htmlValue += "<tr>";
                        htmlValue += "<th>充值号码：</th>";
                        htmlValue += "<td>" + mobile + "</td>";
                        htmlValue += "</tr>";
                        htmlValue += "<tr>";
                        htmlValue += "<th>充值金额：</th>";
                        htmlValue += "<td>" + amount + "元</td>";
                        htmlValue += "</tr>";
                        htmlValue += "<tr>";
                        htmlValue += "<th>充值方式：</th>";
                        htmlValue += "<td>" + payTypeFormat + "</td>";
                        htmlValue += "</tr>";
                        htmlValue += "<tr>";
                        htmlValue += "<th>实际到账：</th>";
                        htmlValue += "<td>" + actualmoneyStr + "聊币</td>";
                        htmlValue += "</tr>";
                        htmlValue += "<tr>";
                        htmlValue += "<th>订单编号：</th>";
                        htmlValue += "<td>" + unionPaySrl + "</td>";
                        htmlValue += "</tr>";
                        htmlValue += "</tbody>";
                        htmlValue += "</table>";
                        htmlValue += "</section>";
                        if (paytype && paytype == "4") {
                            htmlValue += "<div class=\"warning\" style=\"margin:36px 10px 10px 10px;\">";
                            htmlValue += "<p class=\"f-gray3\">";
                           // htmlValue += "本功能需配合银联手机安全支付控件使用，请确认本地已下载安装。点击快速下载安装<a href=\"http://mpay.unionpay.com/getclient?platform=android&amp;type=securepayplugin\" target=\"_blank\">Android版</a>或者<a href=\"http://mpay.unionpay.com/getclient?platform=ios&amp;type=securepayplugin\" target=\"_blank\">iOS版；</a>";
                            htmlValue += " 本功能需银联手机安全支付控件支持，如未下载，点击下载安装 ：<a href=\"http://mpay.unionpay.com/getclient?platform=android&amp;type=securepayplugin\" target=\"_blank\">Android版</a>或<a href=\"http://mpay.unionpay.com/getclient?platform=ios&amp;type=securepayplugin\" target=\"_blank\">IOS版</a>";
                            
                            
                            htmlValue += "</p>";
                            htmlValue += "</div>";
                        }

//                        htmlValue += "<form  method='get' name='SendOrderForm' action='WSCZTSNEW.html'>";
//                        htmlValue += formData;
//                        htmlValue += "<p class='mb10 clearfix' align='center'>";
//                        htmlValue += "<input collect='CZSY_28' nextPage='true' class='btn min160' type='submit' style='height: 37px;background-color:#FC7216' value='确认充值'/>";
//                        htmlValue += "&nbsp;&nbsp;";
//                        htmlValue += "<a class='btn-grey min160' collect='CZSY_29' style='padding:0px 0px 3px 0px' href='WSCZYL.thtml'>返回</a>";
//                        htmlValue += "</p>";
//                        htmlValue += "</form>";
                        if(paytype && paytype == "1" || paytype == "4"){
                       	 htmlValue += "<form  method='get' name='SendOrderForm' action='WSCZTSNEW.html'>";
                            htmlValue += formData;
                            htmlValue += "<p class='mb10 clearfix' align='center'>";
                            htmlValue += "<input id='czqrczback' collect='CZSY_28' nextPage='true' class='btn min160' type='submit' style='height: 37px;background-color:#FC7216' value='确认充值'/>";
                            htmlValue += "&nbsp;&nbsp;";
                            //htmlValue += "<a class='btn-grey min160' collect='CZSY_29' style='padding:0px 0px 3px 0px' href='WSCZYL.thtml'>返回</a>";
							htmlValue += "<a id='czback' class='btn-grey min160' collect='CZSY_29' style='padding:0px 0px 3px 0px' href='javascript:window.location.reload();'>返回</a>";
							
                            htmlValue += "</p>";
                            htmlValue += "</form>";
                       }
                       else{
                        htmlValue += "<p class='mb10 clearfix' align='center'>";
                        if(paytype && paytype == "11"){
                        	htmlValue += "<button id='czqrczback' collect='CZSY_28' nextPage='true' class='btn min160' onclick=\"javascript:submitMoney("+amount+");\" style='height: 37px;background-color:#FC7216;border:0' value=''>确认充值</button>";
                        }else{
//                        	htmlValue += "<button id='czqrczback' collect='CZSY_28' nextPage='true' class='btn min160' onclick=\"window.location.href='http://localhost:8080/folkcam-rablive-app/view/wapRechage/tpfWapFormTrans.html?sessionid="+sessionid+"'\" style='height: 37px;background-color:#FC7216;border:0' value=''>确认充值</button>";
//                        	htmlValue += "<button id='czqrczback' collect='CZSY_28' nextPage='true' class='btn min160' onclick=\"window.location.href='http://apptest.rablive.cn:8080/view/wapRechage/tpfWapFormTrans.html?sessionid="+sessionid+"'\" style='height: 37px;background-color:#FC7216;border:0' value=''>确认充值</button>";
                            htmlValue += "<button id='czqrczback' collect='CZSY_28' nextPage='true' class='btn min160' onclick=\"window.location.href='http://p2pcluster.folkcam.cn/view/wapRechage/tpfWapFormTrans.html?sessionid="+sessionid+"'\" style='height: 37px;background-color:#FC7216;border:0' value=''>确认充值</button>";
                        }
                        
                       // htmlValue += "<input collect='CZSY_28' nextPage='true' class='btn min160' onclick=\"window.location.href='http://www.js.10086.cn/upay/wps/service/tpfWapFormTrans.xhtml?sessionid="+sessionid+"'\" style='height: 37px;background-color:#FC7216' value='确认充值'/>";
                        htmlValue += "&nbsp;&nbsp;";
                        //htmlValue += "<a class='btn-grey min160' collect='CZSY_29' style='padding:0px 0px 3px 0px' href='WSCZYL.thtml'>返回</a>";
						htmlValue += "<a id='czback' class='btn-grey min160' collect='CZSY_29' style='padding:0px 0px 3px 0px' href='javascript:window.location.reload();'>返回</a>";
                        htmlValue += "</p>";
                        //htmlValue += "</form>";
                       	
                       }

                        if (null != czqFlag && "" != czqFlag && "null" != czqFlag && "-1" != czqFlag) {
                            htmlValue += "<section class='alamo'>";
                            htmlValue += "<p align='center' class='orange1'>";
                            htmlValue += "确认充值后请勿刷新页面或中断充值操作，以防充值赠送券使用失败，无法享受优惠。";
                            htmlValue += "</p>";
                            htmlValue += "</section>";
                        }

                        $("#firstIndexDiv").hide();
                        $("#confirmPage").html(htmlValue);
                        $("#confirmPage").show();
                        //Modified By Wmerake ON 2016-10-17 表单生成成功之后 调用页面日志的api
                        $$XWBD_API.changeArea("CZDDQR");
                    }
                    else {

                        var htmlValue = "";
                        htmlValue += "<section class='alamo'>";
                        htmlValue += "<p align='center'>";
                        htmlValue += "<span class='red1'>" + result.resultMsg + "</span>";
                        htmlValue += "</p>";
                        htmlValue += "</section>";
                        htmlValue += "<p align='center' class='mb10'>";
                        htmlValue += "<a href='WSCZYL.thtml' class='btn-grey cen-btn'>返回继续办理</a>";
                        htmlValue += "</p>";
                        $("#firstIndexDiv").hide();
                        $("#confirmPage").html(htmlValue);
                        $("#confirmPage").show();
                    }
                */}
            })
        ;

    },

    //快捷支付）
    zhifuFastPay: function () {

        var mobile = $.trim($("#mobile").val());
        mobile = re = mobile.replace(/\s+/g, "");//删除所有空格;
        //校验是否是移动号码
        /*if (!chkMobileNumber(mobile)) {
            $("#mobileWar").show();
            return;
        }*/
        //快捷支付的优惠券值ticketid+marketid+...清空
        $("#czqValFast").val("");
        //登陆号码
        var loginmobile = $.trim($("#loginmobile").val());
        alert(loginmobile);
//        if (loginmobile == mobile) {

            //优惠券的编码
            var czqVal = $("input[name='yhq']:checked").val();
            $("#czqValFast").attr("value", czqVal);
            var link = window.location.href;
            var isTest = link.indexOf("isTest=0")!=-1?"0":"1";
            $("#isTest").attr("value", isTest);
            $("#form1").submit();
//        }
//        else {
//            //提示不是登陆号码不能快捷支付充值
//            $("#fastWar").show();
//
//        }
    },


    /**
     * 提交充值（充值卡相关）
     */
    czkSubmit: function () {
        var mobileVal = $.trim($("#mobile").val());
        mobileVal = re = mobileVal.replace(/\s+/g, "");//删除所有空格;
        var cardNumVal = $.trim($("#cardNum").val());
        $("#mobileWar").hide();
        $("#cardNumWar").hide();
        //校验是否是移动号码
        if (!chkMobileNumber(mobileVal)) {
            $("#mobileWar").show();
            return;
        }


        //校验充值密码
        if (cardNumVal.length != 18) {
            $("#cardNumWar").show();
            return;
        }
        //查询手机归属地
        WSCZGBBusiComp.payCZKCZ();
    },

//    /**
//     * 查询手机归属地（充值卡相关）
//     */
//    searchGSD: function () {
//        var mobileVal = $.trim($("#mobile").val());
//        mobileVal = re = mobileVal.replace(/\s+/g, "");//删除所有空格;
//        $.busiReq(
//            {
//                data: {
//                    "reqUrl": "queryNumBelong",
//                    "busiNum": "CZKCZ",
//                    "queryMobileNum": mobileVal
//                },
//                success: function (result) {
//
//                    if (result && result.resultCode == "0") {
//                        $("#mobileXQ").html(+mobileVal);
//                        $("#gsdXQ").html(result.resultObj.gsd);
//                        $("#czkczXQ").show();
//                        $("#czkpaySuccess").hide();
//                    	
//                    }
//                    else {
//                        GlobalDialog.showConfirmDialog(
//                            {
//                                msg: "查询归属地失败"
//                            }
//                        );
//                    }
//                }
//            });
//    },


    /**
     * 充值卡充值
     */
    payCZKCZ: function () {
        var mobileVal = $.trim($("#mobile").val());
        mobileVal = re = mobileVal.replace(/\s+/g, "");//删除所有空格;
        var cardNumVal = $.trim($("#cardNum").val());
        
        //清除密码框内容
        $("#cardNum").val("");
        $.busiReq(
            {
                data: {
                    "reqUrl": "CZKCZ",
                    "busiNum": "CZKCZ",
                    "mobile": mobileVal,
                    "cardNum": cardNumVal
                },
                success: function (result) {
                    if (result && result.resultCode == "0") {
                        $("#czkczXQ").hide();
                        $("#czkpaySuccess").show();
                    }
                    else {
                        $("#czkczXQ").hide();
                        $("#czkpaySuccess").hide();
                        var errorMsg = "";
                        if (result.logicCode == '-4009') {
                            errorMsg = result.resultMsg;
                            BmonPage.showFailureDialog(result.resultObj);
                        } else if ('12182' == result.logicCode) {
                            errorMsg = "此卡号已充过值,不能重复充值";
                        } else if ('98720' == result.logicCode) {
                            errorMsg = "不满足业务办理的条件，原因:手机号码【" + mobileVal + "】：为携号转出状态，不允许办理该业务";
                        } else if ('-1112' == result.logicCode) {
                            errorMsg = "此用户不存在";
                        } else {
                            errorMsg = result.resultMsg;
                        }
                        GlobalDialog.showConfirmDialog(
                            {
                                msg: errorMsg
                            }
                        );
                    }
                }
            });
    },
    
    payWLW : function() {
    	var mobile = $.trim($("#wlwNum").val());
        mobile = mobile.replace(/\s+/g, "");
        var amount = $("#wlwAmount .sel").attr("money");
        if(mobile == "" || mobile == null || (mobile.length != 11 && mobile.length != 13)) {
        	$("#yhqwxts").find("p").html("请输入正确的兔聊号");
        	$("#yhqwxts").show();
        	return;
        }

        $.busiReq({
			data: {
			    "reqUrl"	: "WLWCZ",
			    "busiNum"	: "WLWCZ",
			    "mobile"	: mobile,
			    "amount"	: amount,
			    "method"	: "1"
			},
			success: function (result) {
			    if (result && result.resultCode == "0") {
			    	$("#yhqwxts").find("p").html("您本次兔聊充值流水号为：" + result.resultObj.unionPaySrl + "，请记录，以便核查充值进度。");
			    	$(".close_btn").attr("href", result.resultObj.url);
				} else if(result.systemCode == "900900") {
					$("#yhqwxts").find("p").html("请输入正确的兔聊号");
				} else {
					$("#yhqwxts").find("p").html("兔聊充值失败");
				}
			    $("#yhqwxts").show();
			}
		});
    },


    /**
     * 关闭弹框
     */
    closeWin: function (closeDiv) {
        if (closeDiv == "czkczXQ") {
            $("#czkczXQ").hide();
        }

        //积分温馨提示
        if (closeDiv == "jifenwxts") {
            $("#jifenwxts").hide();
        }

        //手机号码不能充值温馨提示
        if (closeDiv == "nomobilewxts") {
            $("#nomobilewxts").hide();
        }


        //营销活动详情
        if (closeDiv == "yxxq") {
            $("#yxxq").hide();
        }


        //非登陆号码无法参与营销活动提示
        if (closeDiv == "loginmark") {
            $("#loginmark").hide();
        }

        //充值已提交关闭
        if (closeDiv == "czkpaySuccess") {
            $("#czkpaySuccess").hide();
        }

        //充值卡号码输入有误
        if (closeDiv == "mobileWar") {
            $("#mobileWar").hide();
        }

        //充值卡密码输入有误
        if (closeDiv == "cardNumWar") {
            $("#cardNumWar").hide();
        }

        //快捷支付不能给其他号码充值提示
        if (closeDiv == "fastWar") {
            $("#fastWar").hide();
        }

        //所选择充值方式不符合当前优惠券的使用条件
        if (closeDiv == "czq_paytype_War") {
            $("#czq_paytype_War").hide();
        }

        //优惠券页面
        if (closeDiv == "yhqAll") {
            $("#yhqAll").hide();
            $("#firstIndexDiv").show();
            $("#lishiDIV").show();
        }

        //无优惠券页面
        if (closeDiv == "yhqNonePage") {
            $("#yhqNonePage").hide();
            $("#firstIndexDiv").show();
            $("#lishiDIV").show();
        }

//家庭付号
							if (closeDiv == "jtfhDiv") {
								$("#jtfhDiv").hide();
							}
							
							//充值档次不符合条件
							if (closeDiv == "czq_payaccount_War") {
								$("#czq_payaccount_War").hide();
							}
							//非登陆号码查看优惠券的提示
							if (closeDiv == "yhqwxts") {
								$("#yhqwxts").hide();
							}
							
							//无充值券列表
							if (closeDiv == "NOYHQList") {
								$("#NOYHQList").hide();
							}
							//有充值券列表
							if (closeDiv == "yhqAll") {
								$("#yhqAll").hide();
							}
							
							
    },


    /**
     * 关闭弹框
     */
    showyhqNonePage: function () {
  
        //无优惠券页面
        $("#NOYHQList").show();

    },

    /**
     * 选中最近充值的信息
     */
    getOtherUserInfo: function (obj, obj2) {
        //最近充值的号码
        var mobileother = $(obj).find("#mobileother").val();
        //最近充值的金额
        var mobileamoney = ($(obj).find("#mobileamoney").val());
        //最近充值的支付方式
        var mobiletype = ($(obj).find("#mobiletype").val());

        //充值档次
        $("#amount").val(mobileamoney);
        //当前支付方式
        $("#paytype").val(mobiletype);

        if (mobileother != null && mobileother != "") {
            //充值文本框赋值
            $("#mobile").val(mobileother);


            addValueFormat($("#mobile"), [3, 4, 4]);
        }


        if (mobileamoney != null && mobileamoney != "") {
            $(".czje ul li").removeClass('sel');
            $("#" + mobileamoney + "y").addClass('sel');
        }


        if (mobiletype != null && mobiletype != "") {

            //快捷支付的支付方式被选中
            if (mobiletype == "10" || mobiletype == "19") {
                $("#fastZF").attr("checked", "checked");
            }

            //支付宝
            if (mobiletype == "3") {
                $("#zfbZF").attr("checked", "checked");

            }

            //微信
            if (mobiletype == "11") {
                $("#wxZF").attr("checked", "checked");

            }
            //中国银联
            if (mobiletype == "4") {
                $("#zgylZF").attr("checked", "checked");

            }

            //建行直冲
            if (mobiletype == "1") {
                $("#jhzcZF").attr("checked", "checked");

            }

            //手机支付
            if (mobiletype == "2") {
                $("#sjZF").attr("checked", "checked");

            }


            //事件解绑
            $("#czBtn").unbind();
            if (mobiletype == "10") {
            	 //$("#czBtn").removeAttr('first');
            	 $("#czBtn").attr('first','no');

            } else {
            	//$("#czBtn").attr('first','no');
            	$("#czBtn").removeAttr('first');

            }

        }
        //选择其他历史充值用户，则清空优惠券区域的内容
        $("#yhqMoneyValue").val("");
        //快捷支付的优惠券值ticketid+marketid+...清空
        $("#czqValFast").val("");
        //优惠券支持的支付档次清空
        $("#yhqAccount").val("");
        
        //优惠券取消选中，则优惠券区域 
        $(".yhactinner").empty();
	      var areaHtml = "";
	      areaHtml = areaHtml + "<div class='yhq-info'>";
	      areaHtml = areaHtml + "<a href='javascript:void(0);' onclick='javascript:WSCZGBBusiComp.showMyCZQList()'>优惠券<span>查看优惠券</span></a>";
	      areaHtml = areaHtml + "</div>";
	      //充值券的区域展示
	   	   $(".yhactinner").html(areaHtml);
        WSCZGBBusiComp.showMoney();
    },


   

//
//    /**
//     * 营销活动详情
//     */
//    getYHHDdetail: function (msg, title) {
//        //温馨提示弹框
//        $("#yxxqtitle").html(title);
//        $("#yxxqmsg").html(msg);
//        $("#yxxq").show();
//    },


//    /**
//     * 营销活动券的选择
//     */
//    selectYYHD: function (obj, obj1, obj2, obj3, obj4, obj5) {
//        var yyhdChecked = ($(obj).find("input").attr("checked"));
//
//        //获取账本现金余额
//        var moneyyue = $.trim($("#moneyyue").val());
//        if (yyhdChecked == "checked") {
//
//            $("#marketFirstPkid").attr("value", obj1);
//            $("#marketSecondPkid").attr("value", obj2);
//            $("#viewName").attr("value", obj3);
//            $("#second_view_name").attr("value", obj4);
//
//            //已选中的营销案
//            $("#yxhdSelected").html("已选营销案:" + obj4);
//
//            //如果obj5,充值金额大于用户余额则隐藏话费支付按钮
//            if (obj5 > moneyyue * 1) {
//
//                $("#hfmarket").hide();
//
//                var marketType = $.trim($("#marketType").val());
//                if (marketType == "3") {
//                    $("#marketType").attr("value", "4");
//
//                    //支付宝的支付方式被选中
//                    $("#marketzfb").attr("checked", "checked");
//                }
//
//
//            }
//
//
//        } else {
//            //取消选中则赋值都为空
//            $("#marketFirstPkid").val("");
//            $("#marketSecondPkid").val("");
//            $("#viewName").val("");
//            $("#second_view_name").val("");
//
//            //清空已选中的营销案
//            $("#yxhdSelected").html("");
//
//            //防止被隐藏过，只要不选中就显示
//            $("#hfmarket").show();
//        }
//    },
//
//    /**
//     * 营销活动充值
//     */
//    yyhdPay: function () {
//
//        //一级营销案ID
//        var marketFirstPkid = $.trim($("#marketFirstPkid").val());
//        //二级营销案ID
//        var marketSecondPkid = $.trim($("#marketSecondPkid").val());
//        //营销案一级名称
//        var viewName = $.trim($("#viewName").val());
//        //二级名称
//        var second_view_name = $.trim($("#second_view_name").val());
//
//        //营销案支付方式
//        var marketType = $.trim($("#marketType").val());
//
//        //登陆号码
//        var loginmobile = $.trim($("#loginmobile").val());
//
//        //输入框中当前号码
//        var currentmobile = $.trim($("#mobile").val());
//        currentmobile = re = currentmobile.replace(/\s+/g, "");//删除所有空格;
//
//        //非登陆号码无法办理营销案
//        if (loginmobile != "" && loginmobile == currentmobile) {
//
//
//            if (marketFirstPkid != null && marketFirstPkid != "" && marketSecondPkid != null && marketSecondPkid != "") {
//
//                //http://wap.js.10086.cn/WBLYHHD.thtml!20670?bs=20611
//                window.location.href = "WBLYHHD.thtml!" + marketFirstPkid + "?bs=" + marketSecondPkid + "&paytype=" + marketType + "&innerch=1";
//
//            }
//        } else {
//
//            //提示用户非登陆号码不能参与营销活动
//            $("#loginmark").show();
//
//        }
//
//    },


    /**
     * 支付方式
     */
    selectMarketPaytype: function (typenum) {
        //选中的充值方式赋值
        $("#marketType").val(typenum);

    },

    //一键清除充值卡密码

    clearCZK: function (obj) {
        //选中的充值方式赋值
        if (obj == "m") {

            $("#mobile").val("");
            $('#closebtn').hide();
            $('.f_cz_rig-disabled').show();
 $("#mobile").focus();
 $("#mobile").attr('placeholder','请输入您要充值的兔聊号');
        } else {

            $("#cardNum").val("");
            $('#closebtn2').hide();
        }


    } 

};

//获取通讯录功能
function getAddr() {
    var shareNum = document.getElementById("mobile").value;
    try {
        to_contacts.startContactActivity(shareNum, '1', 'http://wap.js.10086.cn/activity/138');
    } catch (e) {
        var arrayObj = shareNum.split(",");
        sendCommand("getAddresslist", "1", arrayObj);
        sendCommandOld("getAddresslist", "1", arrayObj);
    }
}

//新版IOS掌厅客户端通讯录功能
function sendCommand(cmd, max, param) {
    // var url="ecmcphonebook://"+cmd+"??"+max+"??"+param;
    // document.location = url;
}


//旧版IOS掌厅客户端通讯录功能
function sendCommandOld(cmd, max, param) {
    var url = "ecmcApp://" + cmd + ":" + max + ":" + param;
    document.location = url;
}


function getAndroidMobile(jsondata) {
    document.getElementById("mobile").value = jsondata;
    $('.f_cz_rig-disabled').hide();
    WSCZGBBusiComp.YHQByMobile();
}

function androidGetAddr() {
    var shareNum = document.getElementById("mobile").value;
    to_contacts.startContactActivity(shareNum, '5', 'http://wap.js.10086.cn/activity/138');
}

function getAddresslist(max) {
    var shareNum = document.getElementById("mobile").value;
    var arrayObj = shareNum.split(",");
    sendCommand("getAddresslist", max, arrayObj);
    sendCommandOld("getAddresslist", max, arrayObj);
}

function inputPhone(phone) {
    document.getElementById("mobile").value = phone;
    $('.f_cz_rig-disabled').hide();
    WSCZGBBusiComp.YHQByMobile();
}

$(function () {

    $(".cz_num").find("img").click(function () {
        getAddr();
    });
    var link = window.location.href;
    if (link.indexOf("ch=02") != -1 || link.indexOf("ch=03") != -1) {
        $(".cz_num").find("img").show();
    } else {
        $(".cz_num").find("img").hide();
    }

    var czBtn = $("#czBtn"),
        input = $("#mobile");

//	alert(input.length)

    input.on("keyup input propertychange", function () {
    	var reg = new RegExp("-","g");//g,表示全部替换。
 	    var newstr =  $.trim($("#mobile").val()).replace(reg,"");
 	    $("#mobile").val(newstr);
     	  var ele = $("#mobile");
     	    addValueFormat(ele, [3, 4, 4]);
     	    ele.on("keyup", function () {
     	        var t = $(this);
     	        addValueFormat(t, [3, 4, 4]);

     	    });
     	    //支付按钮
           var length = $.trim($("#mobile").val()).replace(/\s+/g, "").length;
     	    if (length >= 4) {
     	    	$('.f_cz_rig-disabled').hide()
     	    	 WSCZGBBusiComp.YHQByMobile();
     	    }
     	    else {
     	    	$('.f_cz_rig-disabled').show();
     	    	 WSCZGBBusiComp.YHQByMobile();
     	    }
     	    WSCZGBBusiComp.showMoney();
    });
});


function addValueFormat(o, s) {
    var value = o.val().split(""),
        maxlength = o.attr("maxlength") || 13,
        SPACE = " ",
        newValue = [],
        temp = [],
        result = [],
        line = 0;

    if (value.length >= maxlength) {
        o.blur();
    }
    if (value.length == 0) {
        $("#closebtn").hide();
        $("#mobile").attr('placeholder','请输入您要充值的兔聊号');
        $("#wlwNum").attr('placeholder','请输入物联网号码');
    }

    o.attr("currentLength", value.length);

    for (var i = 0, l = value.length; i < l; i++) {
        if (value[i] != SPACE) newValue.push(value[i]);
    }

    for (var i = 0; i < s.length - 1; i++) {
        if (i == 0) {
            temp.push(s[i]);
        } else {
            temp.push(temp[i - 1] + s[i] + line);
            line++;
        }
    }

    for (var i = 0; i < newValue.length; i++) {
        for (var x = 0; x < temp.length; x++) {
            if (i == temp[x]) result.push(SPACE);
        }
        result.push(newValue[i]);
    }

    o.attr("currentNumber", result.join(''));
    o.val(result.join(''));
    
}
var money;
function submitMoney(obj) {
	money = obj;
//	alert(money);
}

