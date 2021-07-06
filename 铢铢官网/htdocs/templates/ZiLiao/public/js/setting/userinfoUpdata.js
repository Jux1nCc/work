var funv = {
	getAlbumInfo: function(recTag, customerId) {

		//localStorage.setItem('customerId',customerId);
		$.post(base_url + "/api/customerHandel/getSpeById", {
			"myCustomerId": customerId,
			"customerId": customerId
		}, function(data) {
			//console.log(data)

			if(data.result == true && data.code == 0) {
				init();
				getCity();
				fun.showUserInfo(recTag, data.data);

			} else {
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
		$("#Userinfo_update").on("input propertychange", "#username", function() {
			fun.inputdelay("username", "昵称");
		});

		$("#Userinfo_update").on("input propertychange", "#userself", function() {
			fun.inputdelay("userself", "自我介绍");
		});
	} else {
		$("#Userinfo_update").on("input oninput", "#username", function() {
			fun.inputdelay("username", "昵称");
		})

		$("#Userinfo_update").on("input oninput", "#userself", function() {
			fun.inputdelay("userself", "自我介绍");
		})
	}
})