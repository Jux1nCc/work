/**
 * 平台弹出框
 */
var GlobalDialog =
{
	isConfirm : '',
	//用于在发送短信验证码时传递参数
	LAST_REQ_OPTIONS : null,
	//二次确认的确认方法
	DIALOG_CALLBACK_YES : null,
	//普通确认信息的确认方法
	COMMON_DAILGO_CALLBACK_YES : null,
	//普通确认信息的取消方法
	COMMON_DAILGO_CALLBACK_NO : null,
	//记录当前弹出框的个数，避免多个弹出窗蒙尘效果
	SHOW_DIALOG_LEN : 0,
	//请求加载蒙尘时间
	loadDialogCounterId : null,

	//结果弹出处理
	showResultDialog : function(ret, msg, resultUrl)
	{
		if(ret == "0")
		{
			window.location = resultUrl;
		}
	},

	showCheckResult:function(data){
		//标题
		if(data.titleTip){
			$("#commonConfirmTitle").html(data.titleTip);
		}
		//显示内容
		$("#commonConfirmInfo").html(data.msg);
		//注册确认方法
		this.COMMON_DAILGO_CALLBACK_YES = function(){
			data.yesCallback && data.yesCallback();
			//GlobalDialog.closeDialog($("#commonConfirm"));
		};
		//注册取消方法
		this.COMMON_DAILGO_CALLBACK_NO = function(){
			data.noCallback && data.noCallback()
			GlobalDialog.closeDialog($("#commonConfirm"));
		};
		//业务弹出框显示
		GlobalDialog.popPosition($("#commonConfirm"));
	},

	/**
	 * 流量迁移二次确认弹窗
	 */
	showOperConfrimDialogLLQY : function(result, reqOption, dialogFlg){
		this.LAST_REQ_OPTIONS = reqOption;
		$('#mask').show();
		//校验方式 二次确认类型;1：短信密码校验；2：服务密码校验
		var checkConfimType = '';
		var actRet = null;
		if(result.ELst)
		{
			var eLst = result.ELst;
			for(var i = 0; i < eLst.length; i ++)
			{
				if(eLst[i].b == 'checkSms')
				{
					actRet = eLst[i].e;
					break;
				}
			}
		}
		if(actRet){
			checkConfimType = actRet.checkConfimType;
		}
		//选择的档次
		var chooseLevel = reqOption['data'].chooseLevel;
		if(chooseLevel == "1"){
			$("#ll").empty().append("500M");
			$("#je").empty().append("30元/月");
			$("#zh").empty().append("58元/月");
		}else if(chooseLevel == "2"){
			$("#ll").empty().append("1G");
			$("#je").empty().append("50元/月");
			$("#zh").empty().append("78元/月");
		}else if(chooseLevel == "3"){
			$("#ll").empty().append("2G");
			$("#je").empty().append("70元/月");
			$("#zh").empty().append("98元/月");
		}
		popPosition_new('.mk_1');
		if(checkConfimType == '1'){
			if(dialogFlg == '2'){
				$("#dialogSmsWarning").html("您输入的短信验证码错误!");
				$("#dialogSmsWarning").show();
			}else{
				//发送短信验证码
				smsValidatorComponent.resetSmsDialog();
			}
			$('#sms').show();
		}
		this.DIALOG_CALLBACK_YES = function(){
			var smsNum = $("#dialogSmsNum").val();
			if(actRet.checkConfimType == '3'){//图片验证码校验
				smsValidatorComponent.validatePic();
			}else if(actRet.checkConfimType != '0'){
				smsValidatorComponent.validateLLQY();
			}else{
				$('#mk_1').hide();
				$.extend(reqOption["data"], {"confirmFlg":"1"});
				$.busiReq(reqOption);
			}
		};
	},
	/**
	 * 二次确认弹出框
	 */
	showOperConfrimDialog : function(result, reqOption, dialogFlg){
		this.LAST_REQ_OPTIONS = reqOption;
		//操作方式
		var operType = reqOption['data'].operType;
		//生效类型
		var chooseFlag = reqOption['data'].chooseFlag;
		var confirmMsg = reqOption['data'].confirmMsg;
		var actRet = null;
		if(result.ELst)
		{
			var eLst = result.ELst;
			for(var i = 0; i < eLst.length; i ++)
			{
				if(eLst[i].b == 'checkSms')
				{
					actRet = eLst[i].e;
					break;
				}
			}
		}
		//是否需要业务确认
		var isConfirm = '';
		//是否需要短信验证
		var isSms = '';
		//校验方式 二次确认类型;1：短信密码校验；2：服务密码校验
		var checkConfimType = '';
		if(actRet)
		{
			isConfirm = actRet.isConfirm;
			this.isConfirm = isConfirm;
			isSms = actRet.isSms;
			checkConfimType = actRet.checkConfimType;
		}

		//信息块防止重复显示
		$("#dialogBusiInfo").hide();
		$("#dialogDataInfo").hide();

		//内容信息
		if(confirmMsg != null && confirmMsg != "")
		{
			$("#dialogWarning").html(confirmMsg);
			$("#dialogDataInfo").show();
			$("#dialogWarning").show();
		}
		else
		{
			$("#dialogDataInfo").hide();
		}

		//业务信息块
		if(isConfirm == '1' && actRet && actRet.busiInfo)
		{
			//获取操作名称,针对聚合页面中的二次确认弹框信息作处理，例如，LLKCB聚合页面和单独的页面中二次确认弹框
             var pageName =  reqOption['data'].pageName;
             if(undefined == pageName && null == pageName){
            	 pageName = "";
             }
			var operString = BusinessUtil.generBusiBtn(operType);
			if("GJTGAMY"==reqOption['data'].busiNum&&operType==1){
				$("#dialogTip").html("<p  class=\"warning\" >如果您未开通国际/台港澳长途，系统自动为您开通台港澳和国际长途。开通时间、关闭时间、台港澳和国际漫游时间一致.您确定要开通？</p><p>请确认您要<strong>" + operString +"</strong>的业务信息</p>");
			}else{
				$("#dialogTip").html("请确认您要<strong>" + operString +"</strong>的业务信息");
			}
			if((reqOption['data'].busiNum.indexOf("GPRSDJB_") != -1&&operType==1 )|| (reqOption['data'].busiNum.indexOf("GPRS4G_DJB") != -1&&operType==1)){
				$("#dialogBusiName").html(""+ actRet.busiInfo.busiName+"");
			}else if(reqOption['data'].busiNum.indexOf("GPRS4G_") != -1 && (operType==2 || operType==1)){
				$("#dialogBusiName").html(actRet.busiInfo.busiName);
			}else if(reqOption['data'].busiNum.indexOf("LLKCB_") != -1 && (operType==2 || operType==1) && pageName.indexOf("HYLBY") == -1){//流量快餐包
				$("#dialogBusiName").html(actRet.busiInfo.busiName);
			} else if (reqOption['data'].busiNum.indexOf("GJJGATMYSJLL_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogBusiName").html(actRet.busiInfo.busiName);
			} else if (reqOption['data'].busiNum.indexOf("2016NMX_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogBusiName").html(actRet.busiInfo.busiName);
			} else if (reqOption['data'].busiNum.indexOf("GPRSLL_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogBusiName").html("业务名称："+actRet.busiInfo.busiName);
			}else if (reqOption['data'].busiNum.indexOf("YLYD_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogBusiName").html(actRet.busiInfo.busiName);
			}else if (reqOption['data'].busiNum.indexOf("GATSD") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogBusiName").html(actRet.busiInfo.busiName);
			}else if (reqOption['data'].busiNum.indexOf("ZSLLB") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogBusiName").html("业务名称："+actRet.busiInfo.busiName);
			} else if (reqOption['data'].busiNum.indexOf("LLZZB_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogBusiName").html(actRet.busiInfo.busiName);
			}
			else {
				$("#dialogBusiName").html("业务名称："+ actRet.busiInfo.busiName);
			}


			//业务资费
			var fee = actRet.busiInfo.fee;
			if("ZDJYB60YB1GB"==actRet.busiInfo.busiNum){
				fee = (fee ? fee/100+"元/1G" : "免费");
			}else if("LLZDJYB"==actRet.busiInfo.busiNum){
				fee = (fee ? fee/100+"元/100M" : "免费");
			}else if("GPRS4G_DJB_10Y" == actRet.busiInfo.busiNum || "GPRSDJB_5Y" == actRet.busiInfo.busiNum
				|| actRet.busiInfo.busiNum.indexOf("LLKCB_") != -1)//针对流量加油包和流量快餐包的单位修改
			{
				fee = (fee ? fee/100+"元/次" : "免费");
			}else if(actRet.busiInfo.busiNum.indexOf("GJJGATMYSJLL_") != -1 ){
				fee = fee/100+"元";
			}else if(actRet.busiInfo.busiNum.indexOf("GATSD") != -1 ){
				fee = fee/100+"元/次";
			}
			else if(actRet.busiInfo.busiNum.indexOf("YLYD_") != -1 ){
				fee = fee/100+"元/次";
			}
			else if (actRet.busiInfo.busiNum.indexOf("AYLLB_") != -1) {
				fee = fee / 100 + "元/次";
			}
			else if(actRet.busiInfo.busiNum.indexOf("2016NMX_") != -1 ){
				fee = fee/100+"/次";
			}
			else if(actRet.busiInfo.busiNum.indexOf("XXCS_ZKTS") != -1 ){//中考听说100包年
				fee = (fee ? fee/100+"元/年" : "免费");
			}
			else if(actRet.busiInfo.busiNum.indexOf("GPRSLL_") != -1 ){//流量季包
				if(actRet.busiInfo.busiNum.indexOf("GPRSLL_30YJB") != -1 || actRet.busiInfo.busiNum.indexOf("GPRSLL_60YJB") != -1 || actRet.busiInfo.busiNum.indexOf("GPRSLL_90YJB") != -1){
					fee = fee / 100 + "元/季";
				}else{
					fee = fee / 100 + "元/半年";
				}				
			}
			else{
				fee = (fee ? fee/100+"元/月" : "免费");
			}


			//同事网,乡情网没有业务的固定资费，需要页面传递过来
			if("JTVW"==reqOption['data'].busiNum||"XQW"==reqOption['data'].busiNum){
				if(reqOption['data'].fee&&reqOption['data'].fee!=""){
					fee=reqOption['data'].fee;

				}
			}
			if((reqOption['data'].busiNum.indexOf("GPRSDJB_") != -1||reqOption['data'].busiNum.indexOf("GPRS4G_DJB_10Y") != -1)&&operType==1){
				$("#dialogFee").html(fee);
			}else if(reqOption['data'].busiNum.indexOf("GPRS4G_") != -1 && (operType==2 || operType==1)){
				$("#dialogFee").html(fee);
			}else if(reqOption['data'].busiNum.indexOf("LLKCB_") != -1 && (operType==2 || operType==1) && pageName.indexOf("HYLBY") == -1){
				$("#dialogFee").html(fee);
			}else if(reqOption['data'].busiNum.indexOf("GJJGATMYSJLL_") != -1 && (operType==2 || operType==1)){
				$("#dialogFee").html(fee);
			}else if(reqOption['data'].busiNum.indexOf("2016NMX_") != -1 && (operType==2 || operType==1)){
				$("#dialogFee").html(fee);
			}else if(reqOption['data'].busiNum.indexOf("GQYYYW") != -1 && (operType==2 || operType==1)){
				$("#dialogFee").html("业务功能费："+ fee);
			} else if (reqOption['data'].busiNum.indexOf("GPRSLL_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogFee").html("业务资费："+fee);
			} else if (reqOption['data'].busiNum.indexOf("YLYD_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogFee").html(fee);
			}else if (reqOption['data'].busiNum.indexOf("GATSD") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogFee").html(fee);
			}else if (reqOption['data'].busiNum.indexOf("ZSLLB") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogFee").html("业务资费："+fee);
			}else if (reqOption['data'].busiNum.indexOf("LLZZB_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogFee").html(fee);
			}else if (reqOption['data'].busiNum.indexOf("LL1T1G_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogFee").html("业务资费：1元/天");
			}else {
				$("#dialogFee").html("业务资费："+ fee);
			}


			//业务状态
			var state = "";
			var currentState = reqOption['data'].busiState;
			if(reqOption['data'].busiNum == "YHTFJ"){
				if(currentState == "1"){
					state = "开机状态";
				}else{
					state = "停机状态";
				}
			}else{
				if(currentState)
				{
					state = BusinessUtil.generBusiState(currentState);
				}
				else
				{
					state = BusinessUtil.generBusiState(operType);
				}
			}

			if((reqOption['data'].busiNum.indexOf("GPRSDJB_") != -1&&operType==1 )|| (reqOption['data'].busiNum.indexOf("GPRS4G_DJB") != -1&&operType==1)){
				$("#dialogState").html(state);
			}else if(reqOption['data'].busiNum.indexOf("GPRS4G_") != -1 && (operType==2 || operType==1)){
				$("#dialogState").html(state);
			}else if(reqOption['data'].busiNum.indexOf("LLKCB_") != -1 && (operType==2 || operType==1) && pageName.indexOf("HYLBY") == -1){
				$("#dialogState").html(state);
			}else if(reqOption['data'].busiNum.indexOf("GJJGATMYSJLL_") != -1 && (operType==2 || operType==1)){
				$("#dialogState").html(state);
			}else if(reqOption['data'].busiNum.indexOf("2016NMX_") != -1 && (operType==2 || operType==1)){
				$("#dialogState").html(state);
				//Modified by Wmerake on 2016-07-05 修改流量季包半年包提示样式，现不再补偿添加说明，以下同等
			} else if (reqOption['data'].busiNum.indexOf("GPRSLL_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogState").html("当前状态："+ state);
			} else if (reqOption['data'].busiNum.indexOf("YLYD_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogState").html(state);
			}else if (reqOption['data'].busiNum.indexOf("GATSD") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogState").html(state);
			}  else if (reqOption['data'].busiNum.indexOf("ZSLLB") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogState").html("当前状态："+state);
			} else if (reqOption['data'].busiNum.indexOf("LLZZB_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogState").html(state);
			}else {
				$("#dialogState").html("当前状态："+ state);
			}

			if((reqOption['data'].busiNum.indexOf("GPRSDJB_") != -1&&operType==1 )|| (reqOption['data'].busiNum.indexOf("GPRS4G_DJB") != -1&&operType==1)){
				//生效方式
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			}else if(reqOption['data'].busiNum.indexOf("GPRS4G_") != -1 && (operType==2 || operType==1)){
				//生效方式
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			}else if(reqOption['data'].busiNum.indexOf("LLKCB_") != -1 && (operType==2 || operType==1) && pageName.indexOf("HYLBY") == -1){
				//生效方式
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			}else if(reqOption['data'].busiNum.indexOf("GJJGATMYSJLL_") != -1 && (operType==2 || operType==1)){
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			}else if(reqOption['data'].busiNum.indexOf("2016NMX_") != -1 && (operType==2 || operType==1)){
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			} else if (reqOption['data'].busiNum.indexOf("GPRSLL_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogeffectWay").html("生效方式："+BusinessUtil.generEffectWay(chooseFlag));
			}else if (reqOption['data'].busiNum.indexOf("YLYD_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			}else if (reqOption['data'].busiNum.indexOf("GATSD") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			}else if (reqOption['data'].busiNum.indexOf("ZSLLB") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogeffectWay").html("生效方式："+BusinessUtil.generEffectWay(chooseFlag));
			}else if (reqOption['data'].busiNum.indexOf("LLZZB_") != -1 && (operType == 2 || operType == 1)) {
				$("#dialogeffectWay").html(BusinessUtil.generEffectWay(chooseFlag));
			}else if ((reqOption['data'].busiNum.indexOf("GJTGACT") != -1 || reqOption['data'].busiNum.indexOf("GJTGAMY") != -1) && reqOption['data'].type == "2") {
				$("#dialogeffectWay").html("生效方式：预约");
			}
			else {
				//生效方式
				$("#dialogeffectWay").html("生效方式："+BusinessUtil.generEffectWay(chooseFlag));
			}
			
			var busiNumOfPage = $("#busiNumOfPage").val();
			if("GPRS4G"==busiNumOfPage){
				var chooseFlag=$("#effectWay ul[name='effectWay']").find(".selected").val(); 
				if(chooseFlag=="1" || chooseFlag=="2"){
					$("#WXTS").show();
				}else{
					$("#WXTS").hide();
				}
			}
			
			if((reqOption['data'].busiNum.indexOf("GPRSDJB_") != -1&&operType==1 )|| (reqOption['data'].busiNum.indexOf("GPRS4G_DJB") != -1&&operType==1)){
				$("#loading").show();
				$("#dialogBusiInfo").show();
			}else{
				$("#dialogBusiInfo").show();
			}
		}else{
			$("#dialogBusiInfo").hide();
		}

		//短信验证块
		$("#dialogSmsMsg").hide();
		$("#dialogSmsWarning").hide();
		$("#dialogSmsWarning").html("");
		$("#Dialog_smsTitle").html("");
		$("#dialogSms_Tip").html("");

		if(checkConfimType == '2')
		{
			$("#Dialog_smsTitle").html("服务密码：");
			$("#dialogSmsNum").attr("placeholder","请输入服务密码");
			$("#canSendSMS").hide();
			$("#dialogSms_Tip").html("<li>服务密码是我们通常所说的10086密码。</li>"
				+ "<li>若您不知道或者忘记了密码，可以点击“<a href='MMFW_MMCZ.thtml'>点击此处找回</a>”进行重置。</li>");
			if(dialogFlg == '2')
			{
				$("#dialogSmsWarning").html("您输入的" + $("#Dialog_smsTitle").html().replace(/：/g, "") + "错误!");
				$("#dialogSmsWarning").show();
			}

			$("#dialogSmsMsg").show();
			$("#dialogSMSCounter").hide();
		}
		else if(checkConfimType == '1')
		{
			$("#Dialog_smsTitle").html("短信验证码：");
			$("#dialogSmsNum").attr("placeholder","请输入短信验证码");
			$("#dialogSms_Tip").html("<li>验证码在5分钟内有效，3次输入错误后失效。</li>");

			if(dialogFlg == '2')
			{
				$("#dialogSmsWarning").html("您输入的" + $("#Dialog_smsTitle").html().replace(/：/g, "") + "错误!");
				$("#dialogSmsWarning").show();
			}
			else
			{
				//发送短信验证码
				smsValidatorComponent.resetSmsDialog();
			}
			$("#dialogSmsMsg").show();
			if(reqOption['data'].busiNum == 'GDTH' || reqOption['data'].busiNum == 'GDTHCT' || reqOption['data'].busiNum == 'GDTCTH' || reqOption['data'].busiNum == 'ZZBTH'){
				$("#ok").attr("style","display: block");
				$("#ok1").attr("style","display: block");
			}

		}else if(checkConfimType == '3'){//需要图片验证码
			var verCodeHtml = "";
			if(dialogFlg == '2')
			{
				verCodeHtml = "<p id=\"dialogPicWarning\" style=\"display: block;\" class=\"orange1\">请输入正确的验证码</p>" +
					"<input type=\"text\" id=\"picNum\"/>" +
					"<label class=\"codeImg\" id=\"dialogVerCode\">" +
					"<img id=\"imageVerifyCodeImg1\" width=\"100%\" src=\"imageVerifyCode.jsp?t="+new Date().getTime()+"\">" +
					"</label>";
			}else{
				verCodeHtml = "<p id=\"dialogPicWarning\" style=\"display: none;\" class=\"orange1\"></p>" +
					"<input type=\"text\" id=\"picNum\"/>" +
					"<label class=\"codeImg\" id=\"dialogVerCode\">" +
					"<img id=\"imageVerifyCodeImg1\" width=\"100%\" src=\"imageVerifyCode.jsp?t="+new Date().getTime()+"\">" +
					"</label>";
			}
			$("#dialogVerCode").empty().append(verCodeHtml);
			$("#dialogVerCode").show();
		}

		var display=$('#dialogSmsMsg').css('display');
		if(display=='none'){
			$(".scroll").css({"height":"auto",'overflow-y':'hidden'});
		}else{
			$(".scroll").css({'height':'260px','overflow-y':'scroll'});
		}
		if ((reqOption.data.busiNum).substring(0, 6) == 'GPRS4G') {
			$(".qx").click(function () {
				//取消办理按钮 modified by Wmerake 2016-06-06
				$(".loading,.remind").hide();
				$(".mask").hide();
				insCode = (reqOption.data.busiNum).substring(7, (reqOption.data.busiNum).length);
				insCode = insCode.replace("Y", "TYLL");
				Webtrends.multiTrack({
					args: {"WT.si_n": "TYLLB", "WT.si_s": insCode, "WT.si_x": "24"}
				});
			});

		}
		this.DIALOG_CALLBACK_YES = function()
		{
			var insCode = null;

			if(reqOption.data.busiNum =='ZXTC'){
				insCode =reqOption.data.typeLL+"_"+reqOption.data.typeYY+"_"+reqOption.data.typeDX+"_"+reqOption.data.typeCX;
				//插码点击三次确认按钮 Modified by Wmerake on 2016-06-06
				Webtrends.multiTrack({
					args: {"WT.si_n" : reqOption.data.busiNum ,"WT.si_s" : insCode,"WT.si_x" : "23"}
				});

			}else if (reqOption.data.busiNum =='PPTCBG'){

				var ppfinal=reqOption.data.packageNamefinal;
				insCode =ppfinal.substring(6,9);
				if(insCode.indexOf("元")>=0){
					insCode = insCode.replace("元", "FXTC");
				}
				/* 插码点击三次确认按钮 Modified by Wmerake on 2016-06-06 */
				Webtrends.multiTrack({
					args: {"WT.si_n" : reqOption.data.busiNum ,"WT.si_s" : insCode,"WT.si_x" : "23"}
				});
			}else if((reqOption.data.busiNum).substring(0,6)=='GPRS4G') {
				insCode =(reqOption.data.busiNum).substring(7,(reqOption.data.busiNum).length);
				insCode =insCode.replace("Y","TYLL");
				//插码点击三次确认按钮 Modified by Wmerake on 2016-06-06
				Webtrends.multiTrack({
					args: {"WT.si_n" : "TYLLB" ,"WT.si_s" : insCode,"WT.si_x" : "22"}
				});
			}

			var smsNum = $("#Dialog_smsNum").val();
			var display=$('#yyyghform2').css('display');
			if(display =='block'){
				var referee = $("input[name='yyygh']").val();
				if(referee !=null && referee !=""){
					if(isNaN(referee)){
						$("#errorYyy").html("对不起！请您输入数字！");
						$("#errorYyy").show();
						return ;
					}
				}
				$.extend(reqOption["data"], {"referee":referee});
			}
			if(actRet.checkConfimType == '3'){//图片验证码校验
				smsValidatorComponent.validatePic();
			}else if(actRet.checkConfimType != '0')
			{
				smsValidatorComponent.validate();
			}
			else
			{
				$('#mk_1').hide();
				GlobalDialog.closeDialog($("#confrimDialog"));
				$.extend(reqOption["data"], {"confirmFlg":"1"});
				if(reqOption.data.busiNum =='GDTH' || reqOption.data.busiNum =='GDTHCT' || reqOption.data.busiNum =='GDTCTH'|| reqOption.data.busiNum =='ZZBTH'){
					$("#ok").attr("style","display:none");
					$("#ok1").attr("style","display:none");
				}
				$.busiReq(reqOption);

			}
		};

		

		//业务弹出框显示
		GlobalDialog.popPosition($("#confrimDialog"));
		//Modified by Wmerake on 2016-07-05 添加通用的取消点击方法
		$(".qx").click(function () {
			$(".loading,.remind").hide();
			$(".mask").hide();

		});
	},

	//请求加载蒙尘时间滚动
	loadDialogCountTime : function ()
	{
		if(this.loadDialogCounterId){window.clearInterval(this.loadDialogCounterId);}
		var count = 30;
		$("#dialogLoadCounter").find("em").html(count);
		//$("#dialogLoadCounter").css("display", "inline-block");
		$("#dialogLoadCounter").show();
		this.loadDialogCounterId = window.setInterval(function()
		{
			$("#dialogLoadCounter").find("em").html(--count);
			if (count < 1)
			{
				if(this.loadDialogCounterId)
				{
					window.clearInterval(this.loadDialogCounterId);
					GlobalDialog.closeDialog($("#loadDialog"));
					//this.canSend(true);
				}
			}
		}.bind(this), 1000);
	},

	showLoadingDialog : function()
	{
		GlobalDialog.popPosition($("#loadDialog"));
		GlobalDialog.loadDialogCountTime();
	},

	/*popbox*/
	//弹出框显示
	popPosition : function (dom){
		//页面显示的弹出框个数加1
		GlobalDialog.SHOW_DIALOG_LEN = GlobalDialog.SHOW_DIALOG_LEN + 1;
		var windowHeight,popupHeight,checkpos;
		var windowHeight = $(window).height();
		windowWidth = $(window).width();
		popupHeight = $(dom).height();
		//popupHeight = 400;
		//popupWidth = $(dom).width();
		popupWidth = 320;
		var posiTop = (windowHeight - popupHeight)/2-10;
		var posiLeft = (windowWidth - popupWidth)/2-10;
		$(dom).css({'width':popupWidth,"left":posiLeft,"top":posiTop}).show();
		$('.mark').show().css({'height':$(window).height()});
	},

	//关闭弹出框
	closeDialog : function(dom){
		//页面显示的弹出框个数减1
		GlobalDialog.SHOW_DIALOG_LEN = GlobalDialog.SHOW_DIALOG_LEN - 1;
		if(GlobalDialog.SHOW_DIALOG_LEN <= 0){
			$('.mark').fadeOut();
		}
		$(dom).hide();
	},

	//确定弹出处理
	showConfirmDialog : function(data)
	{
		//标题
		if(data.titleTip){
			$("#commonConfirmTitle").html(data.titleTip);
		}
		//显示内容
		$("#commonConfirmInfo").html(data.msg);
		//注册确认方法
		this.COMMON_DAILGO_CALLBACK_YES = function(){
			var result = data.yesCallback && data.yesCallback();
			if(result == null){
				GlobalDialog.closeDialog($("#commonConfirm"));
			}
		};
		//注册取消方法
		this.COMMON_DAILGO_CALLBACK_NO = function(){
			data.noCallback && data.noCallback()
			GlobalDialog.closeDialog($("#commonConfirm"));
		};
		//业务弹出框显示
		GlobalDialog.popPosition($("#commonConfirm"));
	}
};