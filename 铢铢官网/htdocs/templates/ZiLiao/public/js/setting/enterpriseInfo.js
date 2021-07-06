var funv = {
	getAlbumInfo: function(recTag, customerId) {

		//localStorage.setItem('customerId',customerId);
		$.post(base_url + "/api/customerHandel/getSpeById", {
			"myCustomerId": customerId,
			"customerId": customerId
		}, function(data) {
			//console.log(data)

			if(data.result == true && data.code == 0) {
				//console.log("有返回值")
				init();
				getCity();
				fun.showEnterInfo(recTag, data.data)

			} else {
				//console.log("无返回值")
				alert(data.message)
			}
		})
	},
}

$(document).ready(function() {

	var customerId = sessionStorage.getItem('customerId');
	//console.log(customerId)
	funv.getAlbumInfo("recTag", customerId)

	if(navigator.userAgent.indexOf('.MSIE') > 0) {
		$("#enterprise_info").on("input propertychange", "#Expertname", function() {
			fun.inputdelay("Expertname", "昵称");
		});

		$("#enterprise_info").on("input propertychange", "#Expertbirthday", function() {
			fun.inputdelay("Expertbirthday", "所在地");
		});

		$("#enterprise_info").on("input propertychange", "#Expertjob", function() {
			fun.inputdelay("Expertjob", "一句话概括");
		});

		$("#enterprise_info").on("input propertychange", "#Expertself", function() {
			fun.inputdelay("Expertself", "企业介绍");
		});
	} else {
		$("#enterprise_info").on("input oninput", "#Expertname", function() {
			fun.inputdelay("Expertname", "昵称");
		});

		$("#enterprise_info").on("input oninput", "#Expertbirthday", function() {
			fun.inputdelay("Expertbirthday", "所在地");
		});

		$("#enterprise_info").on("input oninput", "#Expertjob", function() {
			fun.inputdelay("Expertjob", "一句话概括");
		});

		$("#enterprise_info").on("input oninput", "#Expertself", function() {
			fun.inputdelay("Expertself", "企业介绍");
		});
	}
})