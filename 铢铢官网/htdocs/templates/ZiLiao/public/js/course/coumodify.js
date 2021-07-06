var funh = {
	getAlbumInfo: function(recTag, curriculumId, customerId, unionId) {

		//localStorage.setItem('customerId',customerId);

		$.get(base_url + "/api/curriculum/findCurriculumDetails", {
			"curriculumId": curriculumId,
			"customerId": customerId,
			"unionId": unionId
		}, function(data) {
			//console.log(data)
			if(data.result == true && data.code == 0) {
				//console.log("有返回值")
				fun.showCoureseInfo(recTag, data.data)

			} else {
				//console.log("无返回值")
				alert(data.message)
			}
		})
	},
}

$(document).ready(function() {
	var unionId = localStorage.getItem('unionId');
	var curriculumId = location.href.split("Albummodify/")[0].split("?")[1];
	var customerId = sessionStorage.getItem('customerId');
	console.log(unionId)
	if(unionId != null) {
		funh.getAlbumInfo("recTag", curriculumId, customerId, unionId)
	}

	if(navigator.userAgent.indexOf('.MSIE') > 0) {
		$("#Modify_album").on("input propertychange", "#Mycoursename", function() {
			fun.inputdelay("Mycoursename", "课程名");
		});
	} else {
		$("#Modify_album").on("input oninput", "#Mycoursename", function() {
			fun.inputdelay("Mycoursename", "课程名");
		});

	}
})