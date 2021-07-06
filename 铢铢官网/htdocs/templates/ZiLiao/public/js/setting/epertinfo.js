var funv={
			getAlbumInfo: function(recTag, customerId){
				
				$.post(base_url +"/api/customerHandel/getSpeById",{   //进来首先请求数据
					"myCustomerId":customerId, 
					"customerId":customerId 
				},function(data){
					//console.log(data)
					if(data.result==true&&data.code==0){
						init();
						getCity();
						fun.showEpertInfo(recTag,data.data)  
						
					} else{
						alert(data.message)
					}
				})
			},
			}
		
		$(document).ready(function(){  
			var customerId = sessionStorage.getItem('customerId');
			//console.log(customerId)
			funv.getAlbumInfo("recTag", customerId)
			
			if(navigator.userAgent.indexOf('.MSIE') > 0) {
				$("#Expert_info").on("input propertychange", "#Expertname", function() {
					fun.inputdelay("Expertname", "昵称");
				});
				
				$("#Expert_info").on("input propertychange", "#ExpertInstitution", function() {
					fun.inputdelay("ExpertInstitution", "任职机构");
				});
				
				$("#Expert_info").on("input propertychange", "#Expertjob", function() {
					fun.inputdelay("Expertjob", "职位/头衔");
				});
				
				
				$("#Expert_info").on("input propertychange", "#Expertself", function() {
					fun.inputdelay("Expertself", "自我介绍");
				});
			} else {
				$("#Expert_info").on("input oninput", "#Expertname", function() {
					fun.inputdelay("Expertname", "昵称");
				});
				
				$("#Expert_info").on("input oninput", "#ExpertInstitution", function() {
					fun.inputdelay("ExpertInstitution", "任职机构");
				});
				
				$("#Expert_info").on("input oninput", "#Expertjob", function() {
					fun.inputdelay("Expertjob", "职位/头衔");
				});
				
				
				$("#Expert_info").on("input oninput", "#Expertself", function() {
					fun.inputdelay("Expertself", "自我介绍");
				});
			}
		})