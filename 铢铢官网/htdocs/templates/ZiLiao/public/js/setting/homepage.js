var specialistFlag;
$(document).ready(function() {
	var customerId = sessionStorage.getItem('customerId');
	$.post(base_url + "/api/customer/myWorkbench", {
		"customerId": customerId
	}, function(data) {
		//console.log(data)
		if(data.result == true && data.code == 0) {
			specialistFlag = data.data.customerType;
			var aFansNum = data.data.aFansNum;
			sessionStorage.setItem('aFansNum', aFansNum)
			if(specialistFlag == 0) {
				$(".home_page_Introduction").css("display", "block");
				$("#home_page_zj").css("display", "block");
				$(".Home_Entering").css("display", "none");
				$.post(base_url + "/api/customerHandel/getSpeById", {
					"customerId": customerId,
					"myCustomerId": customerId
				}, function(data) {
					//console.log(data)
					if(data.result == true && data.code == 0) {

						var photoId = data.data.photos[0].photoId;
						sessionStorage.setItem('photoId', photoId)
						var customerCode = data.data.customerCode;
						$(".album_idcard").text(customerCode); //id
						var selfIntroduction = data.data.selfIntroduction
						var nickName = data.data.nickName
						//imageData = data.data.photos;un
						//console.log(data.data.photos)
					}

					photoCount = data.data.photos.length - 1; //
					for(var i = 0; i < data.data.photos.length; i++) { //
						if(data.data.photos[i].isUse == 1) {
							var photo = data.data.photos[i].photo;
							$("#updata_img").attr('src', photo);
						} else {
							$(".imgUpdate").append('<label><img id="' + data.data.photos[i].isUse + '" src="' + data.data.photos[i].photo + '"><button class="updata_imgs" id="' + data.data.photos[i].photoId + '"></button></label>');
						}
					}
					$("#updata_img").attr('src', sessionStorage.getItem('photo')); //头像
					$(".album_name").text(nickName); //昵称
					var aFansNum = sessionStorage.getItem('aFansNum');
					$(".album_Fan").text(aFansNum); //粉丝
					var attentionCnt = sessionStorage.getItem('attentionCnt');
					if(attentionCnt == null || attentionCnt == 'null' || attentionCnt == "null") {
						attentionCnt = 0;
					}
					$(".album_attention").text(attentionCnt); //关注人数

					if(selfIntroduction == null || selfIntroduction == 'null' || selfIntroduction == "null") {
						selfIntroduction = "无"
					}
					$(".album_introduction").text(selfIntroduction); //自我介绍

				})
			} else if(specialistFlag != 0) {
				$("#home_page_zj").css("display", "none");
				$(".home_page_Introduction").css("display", "none");
				$(".Home_Entering").css("display", "block");
				$.post(base_url + "/api/customerHandel/getSpeById", {
					"customerId": customerId,
					"myCustomerId": customerId
				}, function(data) {
					//console.log(data)
					if(data.result == true && data.code == 0) {
						$(".Entering_name").text(data.data.nickName); //
						$(".Entering_position").text(data.data.job);
						$(".Entering_attention").text(data.data.attentionCnt); //关注
						$(".Entering_Fan").text(data.data.fansCnt); //粉丝
						$(".Entering_idcard").text(data.data.customerCode); //id
						var customerType = data.data.customerType;
						if(customerType == 1) {
							customerType = "专家入驻"
							$(".Enter_mechanism").css("display", "block");
						} else {
							customerType = "企业入驻"
							$(".Enter_mechanism").css("display", "none");
						}
						$(".Entering_type").text(customerType); //入驻方式
						var photoId = data.data.photos[0].photoId;
						sessionStorage.setItem('photoId', photoId)
						//console.log(data.data.photos)
						$(".Entering_field").text(data.data.industry); //擅长领域
						$(".Entering_city").text(data.data.city); //常驻城市
						$(".Entering_year").text(data.data.industryExperience); //从业时间
						$(".Entering_mechanism").text(data.data.company); //任职机构
						var report = data.data.report
						if(report == null || report == 'null' || report == "null") {
							report = "无"
						}
						$(".Entering_html").text(report); //媒体报道
						$(".Entering_Introd").text(data.data.selfIntroduction); //自我介绍 
					}

					photoCount = data.data.photos.length - 1;
					for(var i = 0; i < data.data.photos.length; i++) {
						if(data.data.photos[i].isUse == 1) {
							var photo = data.data.photos[i].photo;
							$("#updata_img").attr('src', photo); //头像
						} else {
							$(".imgUpdate").append('<label><img id="' + data.data.photos[i].isUse + '" src="' + data.data.photos[i].photo + '"><button class="updata_imgs" id="' + data.data.photos[i].photoId + '"></button></label>');
						}
					}

					var proveDate = data.data.proveDate;
					var date = new Date(proveDate);
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					var D = date.getDate() + ' ';
					var h = date.getHours() + ':';
					var m = date.getMinutes() + ':';
					var s = date.getSeconds();
					var proveDates = Y + M + D + h + m + s;
					$(".Entering_time").text(proveDates); //入驻时间

				})

			}
		}
	})

	$("#home_page").on("click", "#updateexpertinfo", function() {
		if(specialistFlag == 0) {
			window.location.href = "userinfoUpdate.html";

		} else if(specialistFlag == 1) {
			window.location.href = "epertinfo.html";
		} else {
			window.location.href = "enterpriseInfo.html";
		}
	})

	$("#home_page").on("click", "#Application", function() {
		$.post(base_url + "/api/customerHandel/getSpeById", {
			"customerId": customerId,
			"myCustomerId": customerId
		}, function(data) {
			//console.log(data)
			var account = data.data.phone;
			sessionStorage.setItem('account', account);
			if(account == null) {
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
						window.location.href = "phoneCode.html";
					},
					btn2: function() {
						layer.closeAll();
					}
				})
			} else {
				$.post(base_url + "/api/customer/myWorkbench", {
						"customerId": customerId
					},
					function(data) {
						//console.log(data)
						var isAudit = data.data.isAudit;
						var customerType = data.data.customerType;
						if(customerType != 0) {
							var str = "您已入驻成功";
							fun.layermsg(layer, str);
						} else {
							if(isAudit == 1) {
								var str = "您申请的资料正在审核中，请耐心等待";
								fun.promptmsg(str);
								return;
							} else {
								$("#home_page").empty();
								window.location.href = "application.html";
							}
						}
					})
			}

		})

	})
})