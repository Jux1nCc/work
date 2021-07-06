$(document).ready(function(){ 
			//console.log(window.parent.fun.getMessageSet())  
			var customerId = sessionStorage.getItem('customerId')
			fun.privacySetting(window.parent.fun.getMessageSet());
			var all = window.parent.fun.getMessageSet();
			
			
				//隐私设置
	$("#privacy_setting").on("click", ".privacy_btn_save", function() { //提交设置
		var commentFlag = $("input[type='radio']:checked").val();
		var replyFlag = $("input[type='radio']:checked").val();
		
		$.post(base_url +"/api/cstomerConfig/updateCustomerConfig", {
				"customerId": customerId,
				"acctProtectFlag": 0,
				"commentFlag": commentFlag,
				"replyFlag": replyFlag
			},
			function(data) {
				if(data.result==true&&data.code==0){
					all.replyFlag = replyFlag;
					all.commentFlag = commentFlag;
					window.parent.fun.setMessageSet(all);  
					var str = "设置成功";
					fun.promptmsg(str);
				} else {
					var str = data.message;
					fun.promptmsg(str);
					
				}
				

			})
	})
		})