var GLOBAL_INFO = {
//	BUSINESS_REQ_URI : '/js_mobile_service/actionDispatcher.do',
//	URL_PREFIX : "http://127.0.0.1:8080/folkcam-rablive-app/",
	BUSINESS_REQ_URI : '../../AliWapPay',
	URL_PREFIX : "./",
	SMS_REQ_URI : '/sms.do',
    DEFAULT_ANCHOR : '#home',
    PAGE_CONTAINER : '__mainPage',
	LOAD_PAGE_FOLDER : '/pages/',
	RESOURCE_TIMESTAMP : '?t=201309050627',
	BUSI_NAME : 'WSCZGB'
};

var EcuPage = 
{
	fillArea : function(pagelet)
	{
		$("#busiArea").removeClass();
		$("#busiArea").addClass("gridMain");
		$("#" + pagelet.containerId).html(pagelet.htmlContent);
	}
};

//鐭俊楠岃瘉鐮佺粍浠�
var smsValidatorComponent ={
	id : 'smsValidator',
	name : '鐭俊楠岃瘉鐮佺粍浠�',
	pageLoadingTime : 3000,
	loadOnce : true,
	user_options : null,
	busiNum : '',
	mobile : '',
	counterId : null,
//	counterIdA : null,

	//鍙戦€佺煭淇￠獙璇佺爜
	getCode : function ()
	{
		this.counterId = null;
//		this.counterIdA = null;
		smsValidatorComponent.canSend(false);
		var params =
		{
			"reqUrl"  : "smsVerifyCode",
			'busiNum' : this.busiNum,
			'mobile'  : this.mobile
		};

		$.busiReq({
			url : GLOBAL_INFO.BUSINESS_REQ_URI,
			type : 'POST',
			data : params,
			timeout : 10000,
			success : function(ret)
			{
				$("#dialogSmsNum").val("");
				var obj = ret;
				if(obj)
				{
					if(obj.resultCode == "0")
					{
						$("#dialogSmsWarning").hide();
						$("#dialogSmsWarning").html("");
						smsValidatorComponent.countTime();
					}
					else if(obj.logicCode == "-4060"){
						$("#dialogSmsWarning").show();
						$("#dialogSmsWarning").html("鍔ㄦ€佸瘑鐮佸凡鍙戦€佸埌鎮ㄧ殑鎵嬫満锛�30绉掑悗鍐嶉噸鏂拌幏鍙�!");
						smsValidatorComponent.canSend(true);
					}
					else
					{
						$("#dialogSmsWarning").show();
						$("#dialogSmsWarning").html("楠岃瘉鐮佸彂閫佸け璐ワ紝璇风偣鍑婚噸鏂板彂閫侊紒");
						smsValidatorComponent.canSend(true);
					}
				}
				else
				{
					$("#dialogSmsWarning").show();
					$("#dialogSmsWarning").html("楠岃瘉鐮佸彂閫佸け璐ワ紝璇风偣鍑婚噸鏂板彂閫侊紒");
					smsValidatorComponent.canSend(true);
				}
			},
			error: function(ret, errorMsg)
			{
				$("#dialogSmsWarning").show();
				$("#dialogSmsWarning").html("鐭俊楠岃瘉鐮佸彂閫佸け璐ワ紝璇风偣鍑婚噸鏂板彂閫侊紒");
				smsValidatorComponent.canSend(true);
			},
			complete: function()
			{
			}
		});
	},
	
	//鎺у埗鍓嶅彴椤甸潰鏄惁鑳藉鐐瑰嚮
	canSend : function(can)
	{
		if (can)
		{
			$('#canSendSMS').bind("click", function() {
				smsValidatorComponent.getCode();
			});
			$('#canSendSMS').show();
			$("#dialogSMSCounter").css("display", "none");
			$("#dialogSMSCounter2").css("display", "none");
			//$("#smsSendTips").css("display", "none");
		}
		else
		{
			$('#canSendSMS').unbind("click");
			$('#canSendSMS').hide();
		}
	},
	
	/**
	 * 鍔炵悊鎴愬姛璋冩暣椤甸潰
	 */
	sendSuccessMessage : function(busiNum,message,oprType,busiName){
		$('#bljgForm').find("input[name='ywBusiNum']").val(busiNum);
		$('#bljgForm').find("input[name='message']").val(message);
		$('#bljgForm').find("input[name='busiName']").val(busiName);
		$('#bljgForm').submit();
	},
	
	/**
	 * 鍙戦€佺煭淇￠獙璇佺爜
	 */
	resetSmsDialog : function()
	{
		this.user_options = GlobalDialog.LAST_REQ_OPTIONS;
		this.busiNum = this.user_options['data'].busiNum;
		this.mobile = this.user_options['data'].mobile;
		window.clearInterval(this.counterId);
//		window.clearInterval(this.counterIdA);
		//this.canSend(true);
		this.getCode();
		
		$("#dialogSmsNum").val("");
	},
	
	/**
	 * 鏍￠獙鐭俊楠岃瘉鐮侊紝鎴愬姛鍚庢彁浜�
	 */
	validate : function()
	{
		this.user_options = GlobalDialog.LAST_REQ_OPTIONS;
		var smsNum = $("#dialogSmsNum").val();
		if(smsNum == null || smsNum == "")
		{
			$("#dialogSmsWarning").html("璇疯緭鍏ラ獙璇佺爜");
			$("#dialogSmsWarning").show();
			return;
		}
		if (/^\d{6}$/.test(smsNum))
		{
			GlobalDialog.closeDialog($("#confrimDialog"));
			if(this.user_options["data"].busiNum == 'YHTFJ'){
				this.user_options["data"].checkStep = "2";
			}
			$.extend(this.user_options["data"], {"confirm_smsPassword":smsNum, "confirmFlg":"1"});
			$("#dialogSmsMsg").hide();
			if(this.user_options["data"].busiNum == 'GDTH' || this.user_options["data"].busiNum == 'GDTHCT' || this.user_options["data"].busiNum == 'GDTCTH' || this.user_options["data"].busiNum == 'ZZBTH'){
				$("#ok").attr("style","display:none");
				$("#ok1").attr("style","display:none");
			}
			$.busiReq(this.user_options);
		}
		else
		{
			$("#dialogSmsWarning").html("璇锋纭～鍐欓獙璇佺爜");
			$("#dialogSmsMsg").show();
			return;
		}
	},
	
	/**
	 * 鍥剧墖楠岃瘉鐮佹牎楠�
	 */
	validatePic : function(){
		this.user_options = GlobalDialog.LAST_REQ_OPTIONS;
		var picNum = $("#picNum").val();//杈撳叆鐨勫浘鐗囬獙璇佺爜
		if(picNum == null || picNum == ""){
			$("#dialogPicWarning").html("璇疯緭鍏ラ獙璇佺爜");
			$("#dialogPicWarning").show();
			return;
		}
		if(/^\d{4}$/.test(picNum)){
			GlobalDialog.closeDialog($("#confrimDialog"));
			GlobalDialog.closeDialog($("#dialogVerCode"));
		    this.user_options["data"].checkStep = "1";
//			this.user_options["data"].isConfirm = "3";
			$.extend(this.user_options["data"], {"confirm_smsPassword":picNum, "confirmFlg":"1"});
			$("#dialogSmsMsg").hide();
			$.busiReq(this.user_options);
		}else{
			$("#dialogPicWarning").html("璇锋纭～鍐欓獙璇佺爜");
			$("#dialogPicWarning").show();
			return;
		}
	},

	//鏃堕棿婊氬姩
	countTime : function ()
	{
		if(this.counterId){window.clearInterval(this.counterId);}
//		if(this.counterIdA){window.clearInterval(this.counterIdA);}
		var count = 30;
        var intDiff = 10;
		$("#dialogSMSCounter").find("em").html(count);
		$("#dialogSMSCounter").css("display", "inline-block");
		//$("#smsSendTips").css("display", "inline-block");
		this.counterId = window.setInterval(function()
		{
			$("#dialogSMSCounter").find("em").html(--count);
			if (count < 1)
			{
				if(this.counterId)
				{
					window.clearInterval(this.counterId);
					this.canSend(true);
				}
			}
		}.bind(this), 1000);
//		$("#dialogSMSCounter2").find("em").html(count);
		/*$("#dialogSMSCounter2").css("display", "inline-block");
		this.counterIdA = window.setInterval(function(){
			    var day=0,
			        hour=0,
			        minute=0,
			        second=0;//鏃堕棿榛樿鍊�
			    if(intDiff > 0){
			        day = Math.floor(intDiff / (60 * 60 * 24));
			        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
			        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
			        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			    }
			    if (minute <= 9) minute = '0' + minute;
			    if (second <= 9) second = '0' + second;
//			    $('#day_show').html(day+"澶�");
//			    $('#hour_show').html('<s id="h"></s>'+hour+':');
			    $("#dialogSMSCounter2").find('#minute_show').html('<s></s>'+minute+':');
			    $("#dialogSMSCounter2").find('#second_show').html('<s></s>'+second);
			    intDiff--;
//			    alert(intDiff < 1);
			    if (intDiff < 1)
				{
					if(this.counterIdA)
					{
						window.clearInterval(this.counterIdA);
						this.canSend(true);
					}
				}
			    }.bind(this), 1000);*/
	}
};

/**
 * 鏍￠獙鏄惁涓虹Щ鍔ㄥ彿鐮�
 * @param {Object} value
 */
function chkMobileNumber(value){
	var mobile13 = /^13[4-9]\d{8}$/;
    var mobile15 = /^15[012789]\d{8}$/;
    var mobile14 = /^14[7]\d{8}$/;
    var mobile18 = /^18[23478]\d{8}$/;
    var mobile19 = /^178\d{8}$/;
    return (mobile13.test(value) || mobile15.test(value) || mobile14.test(value) || mobile18.test(value)|| mobile19.test(value));
}

/**
 * 鏍￠獙瀵嗙爜鏄惁涓�6浣嶆暟瀛�
 * @param {Object} value
 */
function chkPassword(value){
    var pattern = /^([0-9]){6}$/;
    return pattern.test(value);
}

/**
 * 鏍￠獙鍥剧墖楠岃瘉鐮佹槸鍚︿负4浣嶆暟瀛�
 * @param {Object} value
 */
function chkImageVerify(value){
    var pattern = /^([A-Za-z0-9]){4}$/;
    return pattern.test(value);
}

/**
 * 妫€楠屽唴瀹规槸鍚︿负绌�
 * @param {Object} value
 */
function chkRequired(value){
    if(null==value||value==""){
    	return false;
    }else{
    	return true;
    }
}

/**
 * 楠岃瘉鍐呭闀垮害鍦ㄦ煇涓尯闂�
 */
function chkLengthRange(value,min,max){
    if(value.length<min||value.length>max){
    	return true;
    }else{
    	return false;
    }
}

/**
 * 楠岃瘉琛ㄥ崟鍐呭鏄惁鍏ㄤ负鏁板瓧绫诲瀷
 */
function chkNumber(value){
	var checkNum = /^[0-9]*[0-9][0-9]*$/;
	return checkNum.test(value);
}

/**
 * 楠岃瘉瀵嗙爜鏄惁鐩哥瓑
 */
function chkLengthRange(value1,value2){
    if(value1==value2){
    	return true;
    }else{
    	return false;
    }
}

/**
 * 楠岃瘉鏃ユ湡鏄惁鏄痽yyymmdd
 */
function chkDateYYYMMDD(value){
	var pattern =/^(\d{4})(\d{2})(\d{2})$/;
	return pattern.test(value);
}

/**
 * 鏅€氫笟鍔¤姹傦紝涓嶆敮鎸佸姞杞借挋灏�
 */
jQuery.extend({
    busiReq : (function(){
        var default_options = {
            "type"        :    "post",
            "timeout"     :    "60000",
            "contentType" :    "application/x-www-form-urlencoded; charset=UTF-8",
			"url"         :    GLOBAL_INFO.BUSINESS_REQ_URI,
			dataType      :    "json",
            "success"     :    function(data){
                alert("Ajax Success!");
            },
            "error"       :    function(request, textStatus, errorThrown){
            },
            "complete"    :    function(){
            }
        };
        return function(user_options){
            var options = {};
            
            //缁熶竴澶勭悊寮瑰嚭灞�
            var new_options = {};
            for(var key in user_options)
            {
            	if(key != 'success' && key != 'confirmMsg')
            	{
            		new_options[key] = user_options[key];
            	}
            }
            new_options['success'] = function(result)
            {
            	if(result){
            		if(result && result.resultCode == '1')
                	{
            			
            			// 鍒ゆ柇鐢ㄦ埛鏈櫥褰曟槸鍚︿篃灞曠幇鏁版嵁
                        var unloginShowBusi = false;
                        if (result.systemCode == '-200010' && result.resultObj != null)
                        {
                        	if(result.resultObj.unloginShowBusi == "unloginShowBusi"){
                        		unloginShowBusi = true;
                        	}
                        }
            			//鐧诲綍璺宠浆
            			if(result.systemCode == '-200010' && !unloginShowBusi)
                		{
            				if('GXYX2016' == user_options['data'].busiNum){
            					location.href = GLOBAL_INFO.URL_PREFIX + "js_login.thtml";
            				}else{
            					location.href = GLOBAL_INFO.URL_PREFIX + "login.thtml?redirectURL=" + window.location.href;
            				}
                		}
                		//涓氬姟纭
            			else if(result.systemCode == '-200011')
                		{
                			GlobalDialog.showOperConfrimDialog(result, user_options, '0');
                		}
                		// 闇€瑕佺煭淇￠獙璇佺爜鏍￠獙
                		else if(result.systemCode == '-200008' || result.systemCode == '-200057')
                		{
                			GlobalDialog.showOperConfrimDialog(result, user_options, '1');
                		}
                		//楠岃瘉鐮佹牎楠屽け璐�
                		else if(result.systemCode == '-200009')
                		{
                			GlobalDialog.showOperConfrimDialog(result, user_options, '2');
                		}
                		//浣跨敤鍏叡缁撴灉缁勪欢锛屽け璐ョ粍浠�
                        else if(user_options['data'].resultCommon == "1"){
                        	// 涓氬姟寮瑰嚭妗嗘樉绀� 
                        	if('TCJYWCX_MWYW' == user_options['data'].busiNum){
                    			$("#resultMsgFalse").html("閫€璁�" + GLOBAL_INFO.BUSI_NAME + "澶辫触!");
                    		} else if(user_options['data'].busiNum.indexOf("GATSD") != -1 || user_options['data'].busiNum.indexOf("YLYD") != -1
                    				|| user_options['data'].busiNum.indexOf("GJJGATMYSJLL") != -1){                    			
                    			if(result.errorCode == '60108037266'){
                    				$("#resultMsgFalse").html("鎮ㄤ笉鑳藉姙鐞嗚涓氬姟锛屽師鍥犱负鎮ㄧ殑鍙风爜灏氭湭寮€閫氬浗闄�/娓境鍙版极娓稿姛鑳姐€�");
                    			}else{                    				
                    			$("#resultMsgFalse").html(result.resultMsg);
                    			}
                    			//绉垎鍏戞崲涓埆涓氬姟鐭俊
                    		}else if('JFDH_JFDHXYW' == user_options['data'].busiNum){
                    			var busiNum = "JFDH_JFDHXYW";
        		                var busiName = "绉垎鍏戞崲";
        		                var mobile = $.trim($("#mobile").val());
        		                //errorMsg = errorMsg+"<br><a href=\"javascript:void(0);\" onclick=\"javascript:ZZD.goZZD('"+busiNum+"','"+busiName+"','"+mobile+"')\">鍜ㄨ涓嬭惀涓氬巺</a>";
        						var buttons= "<button onclick=\"hide('#resultCommonFalse')\" class=\"gray\">鐭ラ亾浜�</button>" +
        								"<button href=\"javascript:void(0);\" onclick=\"javascript:ZZD.goZZD('"+busiNum+"','"+busiName+"','"+mobile+"')\">鍜ㄨ涓嬭惀涓氬巺</button>"
								var errorMsg = result.resultMsg;
        						if(errorMsg == ""){
        							errorMsg = "绯荤粺蹇欙紝璇风◢鍚庡啀璇曪紒";
        						}
        						$("#resultMsgFalse").html(errorMsg);
        						$("#resultCommonFalse #change-footer").empty().html(buttons);
                    		}
                    		else {
                    			
                    			$("#resultMsgFalse").html(result.resultMsg);
                    		}
                        	var msg = result.resultMsg;
						    if (msg != null && (msg.match(".*鐢ㄦ埛涓嶅瓨鍦�.*") || msg.match(".*鍙栦笉鍒版搷浣滃憳.*"))) {
							    msg = "钀ヤ笟鍛樺伐鍙疯緭鍏ラ敊璇紒璇峰啀娆¤緭鍏ユ垨涓嶈緭鍏ュ伐鍙风洿鎺ュ姙鐞嗕笟鍔�";
							    $("input[name='yyygh']").val("");//灏嗚惀涓氬憳宸ュ彿璁句负绌�
							    $("#upComing,#businessDesc,#willClose").hide();//灏嗗嵆灏嗗紑閫氬拰涓氬姟璇︽儏闅愯棌
							    $("#errorYyy").html(msg);//钀ヤ笟鍛橀敊璇俊鎭�
							    $("#confrimDialog,#dialogBusiInfo,#errorYyy").show();
							    $(".scroll").css({"height":"auto",'overflow-y':'hidden'});
						     }else{
								GlobalDialog.popPosition($("#resultCommonFalse"));
						     }
                        }
                        
                		else
                		{
                			user_options['success'](result);
                		}
                	}
                	else
                	{
                		//浣跨敤鍏叡缁撴灉缁勪欢锛屾垚鍔熺粍浠�
                        if(user_options['data'].resultCommon == "1"){
                        	//涓氬姟寮瑰嚭妗嗘樉绀�  
                    		GlobalDialog.popPosition($("#resultCommonSuccess"));
                    		if('TCJYWCX_MWYW' == user_options['data'].busiNum){
                    			$("#resultMsgSuccess").html("閫€璁�" + GLOBAL_INFO.BUSI_NAME + "鎴愬姛!");
                    		} else {
                    			$("#resultMsgSuccess").html(result.resultMsg);
                    		}
                        }
                		user_options['success'](result);
                	}
            	}
            };
            
            $.extend(options, default_options, new_options);
            $.ajax(options);
        };
    })()
});

/**
 * 鏀寔鍔犺浇钂欏皹涓氬姟璇锋眰
 */
jQuery.extend({
    busiReqLoad : (function(){
        var default_options = {
            "type"        :    "post",
            "timeout"     :    "60000",
            "contentType" :    "application/x-www-form-urlencoded; charset=UTF-8",
			"url"         :    GLOBAL_INFO.BUSINESS_REQ_URI,
			dataType      :    "json",
            "success"     :    function(data){
                alert("Ajax Success!");
            },
            "error"       :    function(request, textStatus, errorThrown){
            	GlobalDialog.closeDialog($("#loadDialog"));
            },
            "complete"    :    function(){
            }
        };
        return function(user_options){
            var options = {};
            
            //缁熶竴澶勭悊寮瑰嚭灞�
            var new_options = {};
            for(var key in user_options)
            {
            	if(key != 'success' && key != 'confirmMsg')
            	{
            		new_options[key] = user_options[key];
            	}
            }
            new_options['success'] = function(result)
            {
            	GlobalDialog.closeDialog($("#loadDialog"));
            	if(result){
            		if(result && result.resultCode == '1')
                	{
            			// 鍒ゆ柇鐢ㄦ埛鏈櫥褰曟槸鍚︿篃灞曠幇鏁版嵁
                        var unloginShowBusi = false;
                        if (result.systemCode == '-200010' && result.resultObj != null)
                        {
                        	if(result.resultObj.unloginShowBusi == "unloginShowBusi"){
                        		unloginShowBusi = true;
                        	}
                        }
            			//鐧诲綍璺宠浆
            			if(result.systemCode == '-200010' && !unloginShowBusi)
                		{
            				location.href = GLOBAL_INFO.URL_PREFIX + "login.thtml?redirectURL=" + window.location.href;
                		}
                		//涓氬姟纭
            			else if(result.systemCode == '-200011')
                		{
                			GlobalDialog.showOperConfrimDialog(result, user_options, '0');
                		}
                		// 闇€瑕佺煭淇￠獙璇佺爜鏍￠獙
                		else if(result.systemCode == '-200008' || result.systemCode == '-200057')
                		{
                			GlobalDialog.showOperConfrimDialog(result, user_options, '1');
                		}
                		//鐭俊楠岃瘉鐮佹牎楠屽け璐�
                		else if(result.systemCode == '-200009')
                		{
                			GlobalDialog.showOperConfrimDialog(result, user_options, '2');
                		}
                		//浣跨敤鍏叡缁撴灉缁勪欢锛屽け璐ョ粍浠�
                        else if(user_options['data'].resultCommon == "1"){
                        	// 涓氬姟寮瑰嚭妗嗘樉绀�
                        	if('TCJYWCX_MWYW' == user_options['data'].busiNum){
                    			$("#resultMsgFalse").html("閫€璁�" + GLOBAL_INFO.BUSI_NAME + "澶辫触!");
                    		}else if(result.resultObj.wjdc.content!=null&&result.resultObj.wjdc.content!=''){
                    			var ss =result.resultMsg+ '<br/><a href='+result.resultObj.wjdc.url+'>'+result.resultObj.wjdc.content+'</a><br/>';
                    			$("#resultMsgSuccess").html(ss);
                    		} else {
                    			$("#resultMsgFalse").html(result.resultMsg);
                    		}
                        	GlobalDialog.popPosition($("#resultCommonFalse"));
                        }
                        
                		else
                		{
                			user_options['success'](result);
                		}
                	}
                	else
                	{
                		//浣跨敤鍏叡缁撴灉缁勪欢锛屾垚鍔熺粍浠�
                        if(user_options['data'].resultCommon == "1"){
                        	//涓氬姟寮瑰嚭妗嗘樉绀�  
                    		GlobalDialog.popPosition($("#resultCommonSuccess"));
                    		if('TCJYWCX_MWYW' == user_options['data'].busiNum){
                    			$("#resultMsgSuccess").html("閫€璁�" + GLOBAL_INFO.BUSI_NAME + "鎴愬姛!");
                    		} else if(result.resultObj.wjdc.content!=null&&result.resultObj.wjdc.content!=''&&
                    				result.resultObj.wjdc.url!=null&&result.resultObj.wjdc.url!=''){
                    			var ss =result.resultMsg+ '<br/><a href='+result.resultObj.wjdc.url+'>'+result.resultObj.wjdc.content+'</a><br/>';
                    			$("#resultMsgSuccess").html(ss);
                    		}else{
                    			$("#resultMsgSuccess").html(result.resultMsg);
                    		}
                        }
                		user_options['success'](result);
                	}
            	}
            };
            
            $.extend(options, default_options, new_options);
            GlobalDialog.showLoadingDialog();
            $.ajax(options);
        };
    })()
});