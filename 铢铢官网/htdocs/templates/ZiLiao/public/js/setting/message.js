$(document).ready(function() { //把保存的点击事件拿回来

			//console.log(window.parent.fun.getMessageSet())  
			var customerId = sessionStorage.getItem('customerId')
			fun.messageSetting(window.parent.fun.getMessageSet())
			var all = window.parent.fun.getMessageSet();
			//console.log(all)

			$("#setting_message").on("click", ".message_notic_save", function() {
				if(MesAlbum.checked) {
					MesAlbum.value = 1;
				} else {
					MesAlbum.value = 0;
				}
				if(MesCourses.checked) {
					MesCourses.value = 1;
				} else {
					MesCourses.value = 0;
				}
				if(MesComment.checked) {
					MesComment.value = 1;
				} else {
					MesComment.value = 0;
				}
				if(MesBill.checked) {
					MesBill.value = 1;
				} else {
					MesBill.value = 0;
				}

				var pcUai = MesAlbum.value; //专辑评价通知
				var pcCci = MesCourses.value;
				var pcAci = MesComment.value;
				var pcAi = MesBill.value; //账单通知
				$.post(base_url +"/api/cstomerConfig/updateCustomerConfig", {
					"customerId": customerId,
					"acctProtectFlag": 0,
					"pcUai": pcUai,
					"pcCci": pcCci,
					"pcAci": pcAci,
					"pcAi": pcAi

				}, function(data) {
					if(data.result == true && data.code == 0) {
						var str = "设置成功";
						fun.promptmsg(str); //还是跨页面的问题
						all.pcUai = pcUai;
						all.pcCci = pcCci;
						all.pcAci = pcAci;
						all.pcAi = pcAi;
						//console.log(all)
						window.parent.fun.setMessageSet(all)
					} else {
						var str = data.message; //失败
						fun.promptmsg(str);
					}
					//console.log(data);

				})

			})
		})