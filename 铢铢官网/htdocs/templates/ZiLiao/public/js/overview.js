$(document).ready(function(){
		var customerId = sessionStorage.getItem('customerId');	
		$.post(base_url +"/api/customer/myWorkbench", {
			"customerId": customerId
		},
		function(data) {
			//console.log(data);
			if(data.result == true && data.code == 0) {
				$(".personal_ID strong").text(data.data.nickName); //昵称
				$("#privacy_card").text(data.data.customerCode); //咨聊id
				$(".personal_name span").text(data.data.job); //工作
				var specialistFlag = data.data.customerType;
					if(specialistFlag == 0){
						$(".personal_Application").css("display", "block");
					} else if (specialistFlag == 1){
						specialistFlag = "专家入驻";
						$(".personal_join img").attr('src','../../img/user.png');
						$(".personal_Application").css("display", "none");
						$(".personal_join").css("display", "block");
						$(".personal_name").css("display", "block");
						
					} else {
						specialistFlag = "企业入驻";
						$(".personal_join img").attr('src','../../img/qy.png');
						$(".personal_Application").css("display", "none");
						$(".personal_join").css("display", "block");
						$(".personal_name").css("display", "block");
					}
				
				$(".personal_join a").text(specialistFlag); //入驻类型
				$("#Course_play_times").text(data.data.yPlayNum); //昨日播放次数
				$("#Course_play_cumulative").text(data.data.aPlayNum); //昨日播放累计次数
				$("#Views_Collections").text(data.data.yStoreNum);
				$("#Collection_accumulation").text(data.data.aStoreNum);
				$("#My_fans").text(data.data.yFansNum);
				$("#My_total_fans").text(data.data.aFansNum);
				$.post(base_url +"/api/customerHandel/getSpeById", {
					"customerId": customerId,
					"myCustomerId": customerId
				},function(data){
					//console.log(data)
					if(data.result == true && data.code == 0) {
						$(".info_Avatar img").attr('src',data.data.photo)
						
					}
				})
				
				
			}
			

		})
		
		
		
		$("#Overview_info").on("click", "#Application", function() {
			$.post(base_url +"/api/customerHandel/getSpeById", {
				"customerId": customerId,
				"myCustomerId": customerId
			}, function(data) {
				console.log(data)
				var account = data.data.phone;
				if(account == null){
					var str = "您的账号还未绑定手机号，是否前往绑定?"
					
					layer.open({
						type: 0,
						shade: 0,
						area: ['320px', '160px'], //弹框大小   
						offset: "auto",
						maxmin: true,
						content: str,
						btn: ['是', '否'], 
						yes: function() {
							window.location.href = "../phoneCode.html";
						},
						btn2: function() {
							layer.closeAll();
						}
					})
				} else{
					sessionStorage.setItem('account',account);
					$.post(base_url +"/api/customer/myWorkbench",{"customerId":customerId},
					function(data){
						var isAudit = data.data.isAudit;
						var customerType = data.data.customerType;
						if(customerType != 0){
							var str = "您已入驻成功";
							fun.layermsg(layer,str);
						}else{
							if(isAudit == 1){
								var str = "您申请的资料正在审核中，请耐心等待";
								fun.promptmsg(str);
								return;
							} else {
								$("#home_page").empty();
								window.location.href = "../Setting/application.html";
							}
						} 
					})
				}
			})
		})
	})