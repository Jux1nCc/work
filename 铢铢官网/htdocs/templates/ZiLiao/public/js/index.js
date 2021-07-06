
$(document).ready(function() {
	
	$(".l_header_back").click(function(){
		sessionStorage.clear()
		window.location.href="login.html";
	})

if( sessionStorage.getItem('customerId') == null){
		alert("请先登录");
		window.location.href="login.html";
		
}
		initPageoverload();
	
		initPagestyle();
	
		initLoadinginfo();
})



var allSetting = new Object; 
//页面重载
function initPageoverload() {
	//点击入主页面触发
	var releaseVideo = sessionStorage.getItem('releaseVideo', true);
	sessionStorage.setItem('releaseVideo',true);
	




	//点击编辑课程信息触发
	$("#Mycourse_edit").on("click", "#coures_return_btn", function() {
		$("#course_mine").empty();
		window.location.href = "mycourses.html";
	})

}

//页面样式
function initPagestyle() {
	//编辑课程信息---->是否试学单选
	$('.edit_info_select').find('input[type=checkbox]').bind('click', function() {
		$('.edit_info_select').find('input[type=checkbox]').not(this).attr("checked", false);
	});

}

//加载页面
function ces(aid) {  
	sessionStorage.setItem("loginTag","index"); 
	var aaa = sessionStorage.getItem('releaseVideo', true);
	var aidd = "#" + aid;//获取A标签点击的ID
	    //$(this).attr('_href')
    var url = $(aidd).attr('_href')//获取自定义属性 _href的值
	//console.log("aaa: " + aaa)   
    if(aaa == false || aaa == 'false' || aaa == "false"){     
    var str = "视频还未发布你确定要退出吗？";
    layer.open({
		type: 0,
		shade: 0,
		area: ['320px', '160px'], //弹框大小   
		offset: "auto",
		maxmin: true,
		content: str,
		btn: ['确认', '取消'], //只是为了演示
		yes: function() {
			$("#iframeindex").attr("src", url);//更换iframe 的src 实现跳转
			layer.closeAll();
			sessionStorage.setItem('releaseVideo', true);
		},
		btn2: function() {
			layer.closeAll();//关闭当前弹框
		}
	})
	   
	} else {
		if(aid == 'indexMessage'){  
			fun.messageSetting(allSetting);
			$("#iframeindex").attr('src','Setting/message.html?' + encodeURI(allSetting));
		} else if(aid == 'indexPrivacy') {
			fun.privacySetting(allSetting);
			$("#iframeindex").attr('src','Setting/privacy.html?' + encodeURI(allSetting));
		}
		 $("#iframeindex").attr("src", url);//更换iframe 的src 实现跳转
	}
	
	
	

}

 var myMap = {
	"新媒体":"newxmt",
	"SEO":"newseo",
	"竞价排名":"newjjpm",
	"渠道建设":"newjsqd",
	"品牌推广":"newpptg",
	"公关":"newgg",
	"整合营销":"newztyx",
	"走向海外":"newzxhw",
	"博览":"newbl",
	"产品":"newcp"
	
	
};
   var myMapTest = {
	"1":"1",
	"2":"2",
	"3":"3",
	"4":"4",
	"5":"5",
	"6":"6",
	"7":"7",
	"8":"8",
	"9":"9",
	"10":"10"
	
};
var base_url = "";
var proveAlbumList = [];
var indexProveList = [];
var oldUserInfo = new Object();
var industry = [];
var canSave = false; //课程修改后回到当前页
var mySIndex = 0; //课程修改后回到当前页
var unionSave = false;
var unionIndex = 0
var unionType;
var editCourse = [];
//页面信息加载
function initLoadinginfo() {
	var selNum = [];
	
	var allCourse = []; //全部
	var passCourse = [];
	var passIngCourse = [];
	var noPassCourse = [];
	
	var currentCourse = new Object;
	var albunInfoList = new Object;
	var oldSelectDiv = null;
	var editEnable = false;
	var postAulm = true;
	
	

	
	//获取登录传过来的id
	var customerId = $("#customerId").text();
//	var imageData = [];
	customerId = sessionStorage.getItem('customerId');
	
	
	//console.log(customerId)
	//获取登录身份
	//var expertolId 
	var specialistFlag = $("#specialistFlag").text();
	specialistFlag = sessionStorage.getItem('specialistFlag');
	//修改用户头像
	$("#home_page").on("click", ".album_modify", function() {  
		$(this).hide();
		$(".album_hide").css("display","block");
		$("#showImg").css("display","block");
		$(".updata_imgs").css("display","block");
		$("#install_img").css("display","block");
		$("#img_show").css("display","block");
		$("#modif_prompt").css("display","block");
		if($(".imgUpdate label").length == 8){
			$("#album_install_images").css("display","none");
			
		} else{
			$("#album_install_images").css("display","block");
		}
		editEnable = true;
	});
	
	//修改头像 取消
	$("#home_page").on("click", ".album_cancel", function(){
		editEnable = false;
		$(".album_hide").css("display","none");
		$(".album_modify").css("display","block");
		$("#showImg").css("display","none");
		$("#album_install_images").css("display","none");
		$(".updata_imgs").css("display","none");
		$("#img_show").css("display","none");
		$("#modif_prompt").css("display","none");
	});
	
	
	//修改用户头像
	$('#home_page').on('change', '#showImg', function(e) {
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		console.log(imgUrl)
		var f = this.files[0]; //获取上传图片
		console.log(f)
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var photo = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-icon')
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { 
					var obj = eval('(' + this.response + ')');
					photo = obj.url;
					sessionStorage.setItem('photo', photo);
					$("#updata_img").attr('src', photo);
				}
			}
		}

	})
	
	var photoCount = 0;
	//新增头像 多图
	$('#home_page').on('change', '#showImage', function(e) {  
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			if(photoCount >= 8){  
				alert("最多只能上传8张");
			}else{
				var xhr = new XMLHttpRequest();
				var fd = new FormData();
				var photos = "";
				if(undefined != f) { //上传头像
					fd.append('files', f);
					fd.append('address',imgUrl);
					fd.append('icon','expertol-icon')
					fd.append("jsonpCallback", 'jsonpCallback');
					
					xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
					xhr.send(fd);
					var that = this;
					xhr.onload = function(e) { //回调
						photoCount ++;
						var obj = eval('(' + this.response + ')');
						photos = obj.url;
						sessionStorage.setItem('photos', photos);
						$.post(base_url +"/api/photo/insertPhoto",{
							"photo": photos,
							"customerId" :customerId
						},function(data){
							var photoid = data.data;
							
							sessionStorage.setItem('photoid',photoid)
						})
						if(photoCount == 8){  
							var album_install = document.getElementById('album_install_images');
							album_install.style.display = 'none';
						}
						if ($('.imgUpdate img').length < 8) {
							var photoid = sessionStorage.getItem('photoid')
							$(".imgUpdate").append('<label><img src="'+photos+'"><button class="updata_imgs" id="'+photoid+'"></button></label>');
						} else {
							alert("最多只能上传8张");
						}
					}
				}
			}
		}

	})
	
	//删除头像
	$("#home_page").on("click", ".updata_imgs", function(){  
		if(editEnable == "false" || editEnable == false || editEnable == 'false'){   
			
		}else{
		var photoId = $(this).attr('id');
		var str = "<span style='position: relative;left:25px;color: #666;'>确定要删除此照片吗?删除后不可恢复！</span>";  
		//console.log(albumthisid);
		layer.open({
			type: 0,
			shade: 0,
			area: ['320px', '160px'], //弹框大小   
			offset: "auto",
			maxmin: true,
			content: str,
			btn: ['确认', '取消'], //只是为了演示
			yes: function() {
				$.post(base_url +"/api/photo/deletePhoto",{
					"photoId":photoId,
					"customerId":customerId
				},function(data){
					//console.log(data)
					if(data.result==true&&data.code==0){
						str = data.message;
						var img = document.getElementById(photoId);
						var father = img.parentElement;
						photoCount -- ;
						father.remove();
						if(photoCount < 8){
							var album_install = document.getElementById('album_install_images');
								album_install.style.display = 'block';
						}
						fun.promptmsg(str)
					} else{
						str = data.message;
					}
				})
			},
			btn2: function() {
				layer.closeAll();
			}
		})
		}
		
	});
	
	$("#home_page").on("click", ".album_save", function(){
		var photoId = sessionStorage.getItem('photoId');
		var photo = sessionStorage.getItem('photo');
		//sessionStorage.removeItem('photo');
		//console.log("photoid: " + photoId + "photo: " +photo + "customerId : " +customerId)
		$.post(base_url +"/api/photo/updatePhoto",{
			"customerId":customerId,
			"photoId":photoId,
			"photo":photo
		},function(data){
			//console.log(data);
			if(data.result==true&&data.code==0){
				alert("修改成功");
				$(".album_hide").css("display","none");
				$(".album_modify").css("display","block");
				$("#showImg").css("display","none");
				$("#img_show").css("display","none");
				$(".updata_imgs").css("display","none")
				$("#install_img").css("display","none")
				$("#modif_prompt").css("display","none");
				$("#album_install_images").css("display","none");
			} else {
				alert("修改失败，请稍后再试");
				location.reload();
			}
			
		})
		
		

	})
	

	//设置--->主页个人信息 --- 普通用户资料修改 update_submit
	$("#Userinfo_update").on("click", "#update_submit", function() {  //修改资料
		var nickName = $("#username").val(); //昵称
		var selfIntroduction = $("#userself").val(); //自我介绍
		var time = $("#userbirthday").val(); //生日  
		var date = new Date(time);
		var birthday = date.getTime();
		
		
		var citys = $("#userpermanent").val(); //常驻城市 
		var province = $("#province").val();
		var city = province + "-" + citys;
		var sex = $("input[type='radio']:checked").val(); //性别
		var otherDate = new Object();
		otherDate.city = city;
		otherDate.sex = sex;
		otherDate.birthday = birthday;
		console.log(birthday)
			var myInfoMap = new Map();
			myInfoMap.set(1,otherDate);  
			myInfoMap.set(0,nickName);
			myInfoMap.set(3,selfIntroduction);
			
			//console.log(myInfoMap)
		var reg =  /\S/;
		if((!reg.test(selfIntroduction)) || (!reg.test(nickName))  || (!reg.test(birthday)) || (!reg.test(city)) ){			
			
			var str = "修改资料不能为空"
			fun.promptmsg(str);
		} else {
			fun.editOtherInfo(customerId,city,sex,birthday,selfIntroduction,nickName);
			

			
		}
	});
	
	
	
	
	

	//修改专家资料
	$(".Expert_add_input").on("click", "button", function() {
		$(this).toggleClass("activebtn").siblings();//选中变色 再选取消
		var Num = selNum.length; //获取选中的个数
		var flagObj = {
			flag: true
		};
		if(industry.length <= 10) {
			if(flagObj.flag) {
				$(this).addClass('on');
				selNum.push({
					key: $(this).attr('key'),
					txt: $(this).text()
				});
			} else {
				$(this).removeClass('on');
				selNum.splice(i, 1);
			}
			
		}
		
		var buts = document.getElementsByTagName('button');
            var vaule = $(this).val();
            if(industry.indexOf(vaule) != -1 && industry.length <= 10 ){     
            	industry.splice(industry.indexOf(vaule),1);
            	flagObj.flag = true
            }else if(industry.length >= 10 ) { //当选中的数量大于5个的时候强制不能再选
        		flagObj.flag = false
				alert('选择的数量已达到上限');
				$(this).removeClass("activebtn");

			} else{
         	 	industry.push(vaule);  				
			}

	})
	$("#Expert_info").on("click", "#infoadd_submit", function() {
		
		var nickName = $("#Expertname").val();
		var enterpriseName = sessionStorage.getItem('realname');
		var customerCode = sessionStorage.getItem('customerCode');
		var sex = $("input[type='radio']:checked").val(); 
		var birthday = $("#Expertbirthday").val();
		
		var date = new Date(birthday);
		var time1 = date.getTime();
		var citys = $("#userpermanent").val();
		
		var province = $("#province").val();
		var city = province + "-" + citys;
		var industryExperience = $("#Expertworking").val();
		var company = $("#ExpertInstitution").val();
		var job = $("#Expertjob").val()
		var selfIntroduction = $("#Expertself").val();
		
		var report = $("#Experthtml").val()
		var reg =  /\S/;
		
		//console.log("industry: "+ industry+"-nickName:"+nickName + "-enterpriseName：" + enterpriseName +"-selfIntroduction：" +selfIntroduction + "-job："+job +"-company："+company + "-industryExperience：" +industryExperience + "-city："+ city +"-sex：" + sex+ "-birthday" + birthday)
		if((!reg.test(industry)) || (!reg.test(nickName)) || (!reg.test(enterpriseName)) || (!reg.test(selfIntroduction)) ){
			var str = "专家资料填写不能为空";
			fun.promptmsg(str);
			return;
		} else {
			$.post(base_url +"/api/customerHandel/submitSpe", {
				"industry": industry+'',
				"nickName": nickName,
				"enterpriseName": enterpriseName,
				"selfIntroduction": selfIntroduction,
				"customerId": customerId,
				"expertolId": customerCode,
				"customerType": 1,
				"job": job,
				"company": company,
				"industryExperience": industryExperience,
				"city":city,
				"sex":sex,
				"birthday":time1,
				"report":report
			}, function(data) {
				//console.log(data)
				if(data.result == true && data.code == 0) {
					alert("修改成功");
					window.location.href = "homepage.html";
				} else{
					alert(data.message)
					
				}
			});
			
		}

	})

	
	//修改企业
	$(".Enterprise_add_input").on("click", "button", function() {
		$(this).toggleClass("activebtn").siblings();//选中变色 再选取消
		var Num = selNum.length; //获取选中的个数
		var flagObj = {
			flag: true
		};
		if(industry.length <= 10) {
			if(flagObj.flag) {
				$(this).addClass('on');
				selNum.push({
					key: $(this).attr('key'),
					txt: $(this).text()
				});
			} else {
				$(this).removeClass('on');
				selNum.splice(i, 1);
			}
			
		}
		
		var buts = document.getElementsByTagName('button');
            var vaule = $(this).val();
            if(industry.indexOf(vaule) != -1 && industry.length <= 10 ){     
            	industry.splice(industry.indexOf(vaule),1);
            	flagObj.flag = true
            }else if(industry.length >= 10 ) { //当选中的数量大于5个的时候强制不能再选
        		flagObj.flag = false
				alert('选择的数量已达到上限');
				$(this).removeClass("activebtn");

			} else{
         	 	industry.push(vaule);  				
			}
	})
	$("#enterprise_info").on("click", "#infoadd_submit", function() {
		
		var nickName = $("#Expertname").val();
		var customerCode = sessionStorage.getItem('customerCode')
		var sex = $("input[type='radio']:checked").val(); //性别
		var citys = $("#userpermanent").val();
		var province = $("#province").val();
		var city = province + "-" + citys;
		
		var enterpriseName = $("#EnterpriseName").val();
		
		var industryExperience = $("#Expertworking").val();
		var company = $("#ExpertInstitution").val();
		var job = $("#Expertjob").val();//一句话概括
		var selfIntroduction = $("#Expertself").val(); //自我介绍
		//var enterpriseName = sessionStorage.getItem('enterpriseName');
		var report = $("#Experthtml").val()
		var reg =  /\S/;
		if((!reg.test(industry)) || (!reg.test(nickName)) || (!reg.test(enterpriseName)) || (!reg.test(selfIntroduction)) ){
			//alert("不能为空");
			var str = "企业资料不能为空";
			fun.promptmsg(str)
		} else {
			$.post(base_url +"/api/customerHandel/submitSpe", {
				"industry": industry+'',
				"nickName": nickName,
				"enterpriseName": enterpriseName,
				"selfIntroduction": selfIntroduction,
				"customerId": customerId,
				"expertolId": customerCode,
				"customerType": 2,
				"job": job,
				"company": company,
				"industryExperience": industryExperience,
				"city":city,
				"report":report
			}, function(data) {
				//console.log(data)
				if(data.result == true && data.code == 0) {
					alert("修改成功");
					window.location.href = "homepage.html";
				}
			});
			
		}

	})

	//芝麻信用入驻
	//上传身份证正反面
	$('#certification_Alipay').on('change', '#file1', function(e) {
		
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		//console.log(imgUrl)
		var f = this.files[0]; //获取上传图片
		//console.log(f)
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var identityFront = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-qualifications')
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					identityFront = obj.url;
					sessionStorage.setItem('identityFront', identityFront);
					document.getElementById('identityFront').style.backgroundImage =  "url("+identityFront+")"
					
				}
			}
		}

	})
	
	$('#certification_Alipay').on('change', '#file2', function(e) {
		
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var identityReverse = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-qualifications')
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					identityReverse = obj.url;
					sessionStorage.setItem('identityReverse', identityReverse);
					document.getElementById('identityReverse').style.backgroundImage =  "url("+identityReverse+")"
					
				}
			}
		}

	})
	
	
	$("#certification_Alipay").on("click", "#Next_step", function() {
		
		var realname = $("#realname").val();
		var IDcard = $("#IDcard").val();
		var regIdNo=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
		if(!regIdNo.test(IDcard)){  
			var str = "请填写正确的身份证号码";
			fun.promptmsg(str);
		    return;  
		} 
		var identityReverse = sessionStorage.getItem('identityReverse');
		var identityFront = sessionStorage.getItem('identityFront');
		
		if(identityFront == null || identityReverse ==null){
			var str = "身份证照片不能为空";
			fun.promptmsg(str);
			return;
		}
		sessionStorage.setItem('realname',realname)
		sessionStorage.setItem('IDcard',IDcard)
		var reg =  /\S/;
		if((!reg.test(identityFront)) || (!reg.test(identityReverse)) || (!reg.test(realname)) || (!reg.test(IDcard)) ){
			var str = "用户信息不能为空";
			fun.promptmsg(str);
			return;  
			//alert("不能为空")
		} else {
			window.location.href = "userInfo.html";
		}
	});

	//芝麻认证
	$("#Sesamecertif_User").on("click", "#Get_address", function() {
		var name = $("#name").val();
		var Caedid = $("#number").val();
		var reg =  /\S/;
		var regIdNo=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
		if(!regIdNo.test(Caedid)){  
				var str = "请填写正确的身份证号码";
				fun.promptmsg(str);
			    return;  
		} 
		if(!reg.test(name) || !reg.test(Caedid)) {
			var str = "姓名身份证不能为空"
			fun.promptmsg(str)
			return;  
		} else{
			$.post(base_url +"/api/zMauth/zmCertification", {
				"name": name,
				"nomber": Caedid
			}, function(data) {
				//console.log(data)
				if(sessionStorage.getItem('customerId') != null) {
					$("#Sesamecertif_QRcode").css("display","block")
					var addressUrl = data.url;
					//$("#Sesam_QRcodeurl").attr('src', addressUrl);
				}
			})
		}
		
	});
	
	//关闭认证
	$("#Sesamecertif_User").on("click", "#Sesam_codeclose", function(){
		$("#Sesamecertif_QRcode").css("display","none");
		location.reload();
	})

	//入住申请资料填写
	$("#user_add_input").on("click", "button", function() {
		$(this).toggleClass("activebtn").siblings();//选中变色 再选取消
		var Num = selNum.length; //获取选中的个数
		var flagObj = {
			flag: true
		};
		if(industry.length <= 10) {
			if(flagObj.flag) {
				$(this).addClass('on');
				selNum.push({
					key: $(this).attr('key'),
					txt: $(this).text()
				});
			} else {
				$(this).removeClass('on');
				selNum.splice(i, 1);
			}
			
		}
		
		var buts = document.getElementsByTagName('button');
            var vaule = $(this).val();
            if(industry.indexOf(vaule) != -1 && industry.length <= 10 ){     
            	industry.splice(industry.indexOf(vaule),1);
            	flagObj.flag = true
            }else if(industry.length >= 10 ) { //当选中的数量大于5个的时候强制不能再选
        		flagObj.flag = false
				//alert('选择的数量已达到上限');
				//$(this).removeClass("activebtn");

			} else{
         	 	industry.push(vaule);  				
			}
		
	});
	
	
	var proveAlbumCount = 0;
	//新增头像 多图
	$('#userinfo').on('change', '#userImg', function(e) { 
		
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			
			if(proveAlbumList.length >= 10){  
				alert("最多只能上传10张");
			}else{
				var xhr = new XMLHttpRequest();
				var fd = new FormData();
				var photos = "";
				if(undefined != f) { //上传头像
					fd.append('files', f);
					fd.append('address',imgUrl);
					fd.append('icon','expertol-icon')
					fd.append("jsonpCallback", 'jsonpCallback');
					xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
					xhr.send(fd);
					var that = this;
					xhr.onload = function(e) { //回调
						proveAlbumCount ++;  //这个，做id
						var obj = eval('(' + this.response + ')');
						photos = obj.url;
						proveAlbumList.push(photos);
						indexProveList.push(proveAlbumCount);
						//console.log(proveAlbumCount)

						//console.log("上传的url-->"+photos)  
						if(proveAlbumList.length == 10){  
							var album_install = document.getElementById('user_img');
							album_install.style.display = 'none';
						}
						if ($('.img_picture img').length < 10) {  
							
							$(".img_picture").append('<label><img src="'+photos+'"><button class="upadta_imgUser" id="'+proveAlbumCount+'"></button></label>');
						} else {
							alert("最多只能上传10张");
						}
					}
				}
			}
		}

	})
	
	$("#userinfo").on("click",".upadta_imgUser", function(){  
		var id = $(this).attr('id');  //
		var bid = document.getElementById(id)
		var aid = bid.parentElement; 
		aid.remove();
		//console.log(indexProveList)
		var deleteIndex = indexProveList.indexOf(parseInt(id));  
		if(deleteIndex != -1){
			proveAlbumList.splice(deleteIndex,1);
			indexProveList.splice(deleteIndex,1);
		}
		
	})
	
	

	
	
	$("#userinfo").on("click", "#infoadd_submit", function() {
		//console.log(industry)
		var customerCode = sessionStorage.getItem('customerCode')
		
		fun.UserApplication(customerId,industry,customerCode);
	});
	
	//企业入住
	$("#enter_add_input").on("click", "button", function() {
		$(this).toggleClass("activebtn").siblings();//选中变色 再选取消
		var Num = selNum.length; //获取选中的个数
		var flagObj = {
			flag: true
		};
		if(industry.length <= 10) {
			if(flagObj.flag) {
				$(this).addClass('on');
				selNum.push({
					key: $(this).attr('key'),
					txt: $(this).text()
				});
			} else {
				$(this).removeClass('on');
				selNum.splice(i, 1);
			}
			
		}
		
		var buts = document.getElementsByTagName('button');
            var vaule = $(this).val();
            if(industry.indexOf(vaule) != -1 && industry.length <= 10 ){     
            	industry.splice(industry.indexOf(vaule),1);
            	flagObj.flag = true
            }else if(industry.length >= 10 ) { //当选中的数量大于5个的时候强制不能再选
        		flagObj.flag = false
//				alert('选择的数量已达到上限');
//				$(this).removeClass("activebtn");

			} else{
         	 	industry.push(vaule);  				
			}
		
	});
	
	//营业执照
	$('#enterpriseinfo').on('change', '#entet_img', function(e) {
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var businessLicense = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-qualifications')
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					businessLicense = obj.url;
					sessionStorage.setItem('businessLicense', businessLicense);
					$("#enter_job").attr('src',businessLicense)
					//document.getElementById('identityReverse').style.backgroundImage =  "url("+identityReverse+")"
				}
			}
		}
	})
	//上传身份证正反面
	$('#enterpriseinfo').on('change', '#Businesspositive', function(e) {
		
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var ententpositive = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-qualifications')
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					ententpositive = obj.url;
					sessionStorage.setItem('ententpositive', ententpositive);
					$("#ententpositive").attr('src',ententpositive)
					
				}
			}
		}

	})
	
	$('#enterpriseinfo').on('change', '#Businessanti', function(e) {
		
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var ententsanti = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-qualifications')
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					ententsanti = obj.url;
					sessionStorage.setItem('ententsanti', ententsanti);
					$("#ententsanti").attr('src',ententsanti)
					
				}
			}
		}

	})
	$("#enterpriseinfo").on("click", "#enter_submit", function(){
		fun.EnterApplication(customerId, industry);
	})

	
	
//	$(".layui-side-scroll").on("click", "#indexEdit",function(){
//
//		if(specialistFlag == 0 ){
//			var str = "非专家或企业用户不可创建专辑";
//			layer.open({
//				type: 0,
//				shade: 0,
//				area: ['320px', '160px'], //弹框大小   
//				offset: "auto",
//				maxmin: true,
//				content: str,
//				btn: ['去入驻', '取消'], //只是为了演示
//				yes: function() {
//					var url = "Setting/application.html";
//					$("#iframeindex").attr("src", url);
//					layer.closeAll();
//				},
//				btn2: function() {		
//					window.location.href = "index.html";
//					//layer.closeAll();//关闭当前弹框
//					
//					
//				}
//			})
//		} else {
//			
//			
//		}
//	})
			
		

	//创建专辑
	//上传专辑封面  
	$('#creat_edit').on('change', '#showImg', function(e) {   //上传的专辑封面
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var unionPhoto = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-cover')
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					unionPhoto = obj.url;
					sessionStorage.setItem('unionPhoto',unionPhoto)
					//console.log("上传的url-->"+unionPhoto)
					document.getElementById('creat_edit_uploadimg').style.backgroundImage = "url("+unionPhoto+")";
					$(".creat_edit_uploadimg").css("background","unionPhoto")
					
				}
			}
		}

	})

	//新增专辑
	//分类选择
	$("#creat_edit_input").on("click", "button", function(){
		
		//$(this).toggleClass("activebtn").siblings();//选中变色 再选取消
		$(this).addClass("activebtn").siblings().removeClass("activebtn");
		unionType = $(this).val();
	})
	$("#creat_edit").on("click",".junm_appliction",function(){
		window.location.href= "../Setting/application.html"
	})
	$("#creat_edit").on("click", "#creat_submit", function() {  
			//console.log(unionType)
			var videoType = $("input[type='radio']:checked").val(); 
			//console.log(videoType)
			var unionPhoto = sessionStorage.getItem('unionPhoto');
			if(unionPhoto == null ){
				var str = "专辑封面不能为空";
				fun.promptmsg(str);
				return;
			}
			var unionName = $("#editname").val();
	
			var unionIntroduction = $("#Introduction").val();
			var unionAmt = $("#editprice").val();
			if(unionAmt == 0){
				var isCharge = 0;
			} else {
				var isCharge = 1;
			}
			//console.log(unionAmt)
			var reg =  /\S/;
			if( (!reg.test(unionAmt)) || (!reg.test(unionName)) || (!reg.test(unionPhoto)) || (!reg.test(unionIntroduction)) ){
				
				var str = "专辑信息不能为空";
				fun.promptmsg(str);
				return;
			} else if(unionAmt > 2000){
				var str = "价格设置区间0~2000聊币";
				fun.promptmsg(str);
				return;
			} else if(unionType == undefined || unionType == 'undefined' || unionType == "undefined"){
				var str = "专辑分类不能为空"
				fun.promptmsg(str);
				return;
			} else {
			//console.log(postAulm)
				if(postAulm == true){
					postAulm = false;
					$.post(base_url +"/api/union/saveUnion", {
						"customerId": customerId, //用户id
						"unionName": unionName, //专辑标题
						"unionPhoto": unionPhoto, //专辑封面
						"unionIntroduction": unionIntroduction, //专辑介绍
						"unionAmt": unionAmt,
						"unionType":unionType,
						"isCharge":isCharge,
						"videoType":videoType
					},
					function(data) {
						//industr = undefined;   
						if(data.result == true && data.code == 0) {
							//成功
							var str = "创建专辑成功"
							//$("#creat_edit").empty();
							layer.msg(str, {
								title: false,
								time: false, //20s后自动关闭
								area: ['300px', '150px'],
								btn: ['确定'],
								content: '<div style="padding-top: 50px">' + str + '</div>',
								btnAlign: 'c', //按钮居中
								end: function() {
									window.location.href = "myalbum.html";
								}
							})
						} else {
							postAulm = true;
							var str = data.message;
							fun.promptmsg(str);
							//return;
						}
						
					})
					
				}
				
		
	
				
	
			}
		
	})
	
	

	//删除专辑
	$("#Album_table").on("click", ".album_delect", function() {
		var albumthisid = $(this).parent().parent().parent().parent().attr("aid");
		//console.log(albumthisid)
		var str = "<span style='position: relative;left:25px;color: #666;'>确定要删除此专辑吗?删除后不可恢复！</span>";
		//console.log(albumthisid);
		layer.open({
			type: 0,
			shade: 0,
			area: ['320px', '160px'], //弹框大小   
			offset: "auto",
			maxmin: true,
			content: str,
			btn: ['确认', '取消'], //只是为了演示
			yes: function() {
				$.get(base_url +"/api/union/findUnionCanBeDelete", {
					"customerId": customerId, 
					"unionId": albumthisid //专辑id
				}, function(data) {
					//console.log(data)
					if(data.result == true && data.code == 0) {
						$.post(base_url +"/api/union/delUnion", { 
							"unionId":albumthisid,
							"customerId":customerId
						},function(data){
							//console.log(data)
							if(data.result == true && data.code == 0) {
								str = "删除成功";
								fun.layermsg(layer, str)
							} else {
								str = data.message
								fun.layermsg(layer, str)
							}
						})
					} else {
						str = data.message;
						fun.layermsg(layer, str)
					}
					
				})
			},
			btn2: function() {
				layer.closeAll();
			}
		})
	});

	//编辑专辑页面跳转
	$("#Album_table").on("click", ".album_update", function() {  
		var albumthisid = $(this).parent().parent().parent().parent().attr("aid");
		unionSave  = true;
		//console.log(unionSave )
		var myUnionSave	= sessionStorage.getItem('unionIndex');  //没有获取到  在编辑的地方第一次取
		//console.log(myUnionSave)  //在编辑的时候,第二次存
		sessionStorage.setItem('unionsecond',myUnionSave);
		
		location.href = "albummodify.html?" + encodeURI(albumthisid); 
		
		
		//获取修改专辑信息
	
	})
	//编辑专辑
	var unionId = location.href.split("Albummodify/")[0].split("?")[1];
	
	$('#Modify_album').on('change', '#showImg', function(e) {
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var unionPhoto = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-cover');
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					unionPhoto = obj.url;
					//console.log(unionPhoto)
					sessionStorage.setItem('unionPhoto',unionPhoto);
					document.getElementById('Album_update').style.backgroundImage="url("+unionPhoto+")";
				}
			}
		}

	})
	//选择分类
	$("#Myalbum_edit_input").on("click", "button", function(){
		//$(this).toggleClass("activebtn").siblings();
		$(this).addClass("activebtn").siblings().removeClass("activebtn");
		unionType = $(this).val();
	})
		
	
	$("#Modify_album").on("click", "#Myalbum_submit", function() { //提交
		
		var unionName = $("#albumename").val(); //专辑名
		var unionIntroduction = $("#Introduction").val(); //简介
		var unionAmt = $("#editprice").val();
		var videoType = $("input[type='radio']:checked").val(); 
		if(unionAmt == 0){
			var isCharge = 0;
		} else {
			var isCharge = 1;
		}
		var photomodify = sessionStorage.getItem('photoAblumModify');  //获取到的封面
		var unionPhoto = sessionStorage.getItem('unionPhoto');  //为什么，这里的值是上一个的
		sessionStorage.removeItem('unionPhoto');  
		var ablumPhoto;
		
		if(unionPhoto == null){
			ablumPhoto = photomodify;
		} else {
			ablumPhoto = unionPhoto;
		}
		var reg =  /\S/;
		if((!reg.test(unionAmt)) || (!reg.test(unionName)) || (!reg.test(ablumPhoto)) || (!reg.test(unionIntroduction)) || (!reg.test(unionType)) ){
			
			var str = "专辑资料不能为空";
			fun.promptmsg(str)
			return;
		} if(unionAmt > 2000){
				var str = "价格设置区间0~2000聊币";
				fun.promptmsg(str);
				return;
		}else {
			//console.log("unionName: " + unionName + "   简介: " + unionIntroduction + "   价格:" + unionAmt + "   类型: " + industr + "   unionId: "+ unionId +" 用户id: "+customerId + "封面:" + unionPhoto)
			$.post(base_url +"/api/union/updateUnion", {
				"unionId": unionId,
				"unionPhoto" :ablumPhoto,
				"customerId": customerId,
				"unionIntroduction": unionIntroduction,
				"unionName": unionName,
				"unionAmt": unionAmt,
				"unionType": unionType,
				"isCharge":isCharge,
				"videoType":videoType
			}, function(data) {
				console.log(data)
			
				//console.log("第三次获取: " + unionIndex);
				
				if(data.result == true && data.code == 0) {
					var unionIndex = sessionStorage.getItem('unionsecond');  //没有获取到  第三次获取
						sessionStorage.setItem('unionIndex',unionIndex);  //第三次
						location.href = "myalbum.html";
					alert("修改成功")
					
		
				} else {
					var str = data.message
					fun.promptmsg(str);
				}
			})
		}

	});

	//根据专辑id获取专辑下所有课程
	$("#Album_table").on("click", ".album_operat", function() {     //
		var albumthisid = $(this).parent().parent().parent().parent().attr("aid");  
		sessionStorage.setItem("myunionId",albumthisid);
		sessionStorage.setItem("rootOpera",1);
		location.href = "operatAlbum.html?" + encodeURI(albumthisid);   //跳转到当前专辑的课程页面
		
		//点击课程管理
	
		
		
		
		
	})
	
	
	
	//替换课程
	$("#operating_ablum").on("click",".operating_table_replace", function(){  
		var curriculumId = $(this).parent().parent().attr("aid");
		//console.log(curriculumId)   //获取到哪个课程
		for(var index = 0 ; index < editCourse.length ; index ++){
			if(curriculumId == editCourse[index].curriculumId){
				fun.setcurrentCourse(editCourse[index]);
				break;
			}
		}
		$(".operating_replace").css("display","block");
		
	})
	
	
	//关闭弹框
	$("#replace_close").click(function(){
		var releaseVideo = sessionStorage.getItem('releaseVideo', true);
		
    
	    if(releaseVideo == false || releaseVideo == 'false' || releaseVideo == "false"){   
	    var str = "确定要退出吗？";
	    layer.open({
				type: 0,
				shade: 0,
				area: ['320px', '160px'], //弹框大小   
				offset: "auto",
				maxmin: true,
				content: str,
				btn: ['确认', '取消'], //只是为了演示
				yes: function() {
					$(".operating_replace").css("display","none")
					layer.closeAll();
					location.reload();
					sessionStorage.setItem('releaseVideo', true);
				},
				btn2: function() {
					layer.closeAll();
					
				}
			})
		   
		} else {
			$(".operating_replace").css("display","none")
			location.reload();
		}
		
	})



	//取消上传
	$("#content_recharge").click(function(){
		var releaseVideo = sessionStorage.getItem('releaseVideo', true);
		
    
	    if(releaseVideo == false || releaseVideo == 'false' || releaseVideo == "false"){   
	    var str = "确定要退出吗？";
	    layer.open({
				type: 0,
				shade: 0,
				area: ['320px', '160px'], //弹框大小   
				offset: "auto",
				maxmin: true,
				content: str,
				btn: ['确认', '取消'], //只是为了演示
				yes: function() {
					
					window.location.href="upload.html"
					sessionStorage.setItem('releaseVideo', true);
				},
				btn2: function() {
					layer.closeAll();
					
				}
			})
		   
		} else {
		}
		
	})
	
	
	//根据专辑下id获取课程 删除
	$("#operating_ablum").on("click", ".operating_table_delect", function(){
		var unionId = $(this).attr("id");
		var curriculumId = $(this).parent().parent().attr("aid");
//		console.log(unionId);
//		console.log(curriculumId);
		var str = "<span style='position: relative;left:25px;color: #666;'>确定要删除此课程吗?删除后不可恢复！</span>";
		layer.open({
			type: 0,
			shade: 0,
			area: ['320px', '160px'], //弹框大小   
			offset: "auto",
			maxmin: true,
			content: str,
			btn: ['确认', '取消'],
			yes: function() {
				$.post(base_url +"/api/curriculum/delCurriculum", {
					"curriculumId": curriculumId,
					"customerId": customerId,
					"unionId":unionId
				}, function(data) {
					//console.log(data)
					if(data.result == true && data.code == 0) {
						str = "删除成功!";
					} else {
						str = data.message
					}
					fun.layermsg(layer, str)
				})
			},
			btn2: function() {
				layer.closeAll();
			}
		})

	})

	//根据专辑下id获取课程 设为试学
	$("#operating_ablum").on("click", ".operating_table_testFlag", function(){   //
		var curriculumId = $(this).parent().parent().attr("aid");
		//console.log(unionId)    //这个是哪来的unionId 这个没取
		if(unionId == undefined){
			unionId = localStorage.getItem('unionId');
		}
		localStorage.setItem('unionId', unionId);
		//var curriculumName = $(this).parent().parent().attr("bid");
		sessionStorage.setItem("rootOpera",1);
		location.href = "coumodify.html?"+ encodeURI(curriculumId);
		//console.log(curriculumName + " ; " + curriculumId )
		//var testFlag = $(this).parent().parent().attr("pid");
		//var str ;
		//console.log(testFlag)
//		if(testFlag == "0"){
//			str = "是否要将当前课程设为试学?试学后,用户可以免费观看本节课程";
//			
//		}else{
//			str = "是否要将当前课程取消试学?";
//		}
//		layer.open({
//				type: 0,
//				shade: 0,
//				area: ['340px', '180px'], //弹框大小   
//				offset: "auto",
//				maxmin: true,
//				content: str,
//				btn: ['确认', '取消'], //只是为了演示
//				yes: function() {   
//					if(testFlag == "0"){
//						testFlag = "1";
//					}else{
//						testFlag = "0";
//					}
//					$.post(base_url +"/api/curriculum/updateCurriculumById",{
//						"curriculumId":curriculumId, //课程id
//						"customerId":customerId,//
//						"curriculumName":curriculumName,
//						"testFlag":testFlag
//					},function(data){
//						//console.log(data)
//						if(data.result == true && data.code == 0) {
//							//console.log(data)
//							
//							str = "操作成功!";
//						} else {
//							str = data.data
//						}
//						fun.layermsg(layer, str)
//					})
//					
//				},
//				btn2: function() {
//					layer.closeAll();
//				}
//			})	
			
		    
		
	})
	
	//根据专辑下id获取课程 排序
	$("#operating_ablum").on("click", ".operating_table_Sort", function(){  //弹出排序框
		var curriculumId = $(this).parent().parent().attr("aid");
		var firstRank = $(this).parent().parent().attr("id");
		var currid = document.getElementById(curriculumId + "_sort");
		//console.log(currid)
		var inputNum = document.getElementById(curriculumId + "_num");
		inputNum.onkeyup = new Function("this.value=this.value.replace(/^-[1-9]\d*$/,'')"); 
		//console.log(inputNum)
		if(oldSelectDiv == null){
			
		}else{
			
			oldSelectDiv.style.display = "none";
		}
		oldSelectDiv = currid;
		currid.style.display = "block";
		
		
		sessionStorage.setItem('curriculumId',curriculumId);
		sessionStorage.setItem('firstRank',firstRank)
		
		
	})
	//根据专辑下id获取课程 排序
	$("#operating_ablum").on("click", "#operting_sort_ser", function(){  
		
		var curriculumId = sessionStorage.getItem('curriculumId')
		var lastRank = $("#"+curriculumId+"_num").val();  
	
		if(lastRank =="" || lastRank.indexOf(".") != -1 || lastRank.indexOf("-") != -1|| parseInt(lastRank) == 0){ 
			var str = "请输入正整数";  
			fun.promptmsg(str);
			$("#"+curriculumId+"_num").val("");
			return;
		} else {
			var firstRank = sessionStorage.getItem('firstRank');
			$.post(base_url +"/api/curriculum/rankCurr",{
				"curriculumId":curriculumId,
				"firstRank":firstRank,
				"lastRank":lastRank
			},function(data){
				//console.log(data)
				if(data.result==true&&data.code==0){
					location.reload();
				} else {
					alert(data.message)
					location.reload();
				}
			})
		}
	})
	
	
	$("#operating_ablum").on("click", "#opreting_sort_close", function(){
		oldSelectDiv.style.display = "none";
	})
	
	
	

	//我的专辑 
	$.get(base_url +"/api/union/myWorks", {
		"customerId": customerId
	}, function(data) {
		//console.log(data)
		$("#coures_video_list").empty();
		var pageIndex = data.data.unionList.length; //总条数
		
		fun.FindInfoPage(pageIndex,data.data.unionList);
	})

	//我的课程 
	
		$.get(base_url +"/api/curriculum/getAllCurriculumById", {
			"customerId": customerId,
			"type": 1
		}, function(data) {  //课程结果
			//console.log(data)
			var pageIndex = data.data.length; //总条数
			//console.log(pageIndex)
			
			allCourse = data.data;
			for(var i = 0 ; i < data.data.length ; i ++){
				var auditState = data.data[i].auditState;
				if(auditState == 0){
					passIngCourse.push(data.data[i]);
				} else if(auditState == 1){
					passCourse.push(data.data[i]);
				}else if(auditState == 2){
					noPassCourse.push(data.data[i]);
				}else if(auditState == 3){
					
				}
			}
			
		
			var customerId = sessionStorage.getItem('customerId');
			fun.FindPage(pageIndex,data.data);  
	
		})
	

	//课程状态筛选  点击显示隐藏
	$("#course_mine").on("click", "#Courses_sort", function(){
		$(".courese_list").css("display","block")
	})
	//全部课程
	$(".courese_list").on("click","#Courses_all", function(){
		$("#Courses_table").empty();
		$(".courese_list").css("display","none")
		fun.FindPage(allCourse.length,allCourse);
	});
	
	//已发布
	$(".courese_list").on("click","#Courses_pass", function(){
		$("#Courses_table").empty();
		$(".courese_list").css("display","none")
		fun.FindPage(passCourse.length,passCourse);
	});
	//审核中
	$(".courese_list").on("click","#Courses_passing", function(){
		$("#Courses_table").empty();
		$(".courese_list").css("display","none")
		fun.FindPage(passIngCourse.length,passIngCourse);
	});
	
	//不通过
	$(".courese_list").on("click","#Courses_nopass", function(){
		$("#Courses_table").empty();
		$(".courese_list").css("display","none")
		fun.FindPage(noPassCourse.length,noPassCourse);
	});
	
	//课程搜索
	$("#course_mine").on("click","#course_search", function(){
		var curriculumName = $("#course_text").val();
		$.post(base_url +"/api/curriculum/getAllCurrByCurrName",{
			"curriculumName":curriculumName,
			"customerId":customerId
		},function(data){
			//console.log(data.data)
			fun.FindPage(data.data.length,data.data);  
		})
	});
	//回车搜索
	$('#course_text').bind('keyup', function(event) {
	　　if (event.keyCode == "13") {
	　　　　//回车执行查询
	　　　　$('#course_search').click();
	　　}
	});
	
	
	//专辑搜索
	$("#album_mine").on("click","#album_search", function(){
		var unionName = $("#albun_text").val();
		//console.log(unionName)
		//console.log(customerId)
		$.post(base_url +"/api/union/getAllUnionByUnionName",{
			"unionName":unionName,
			"customerId":customerId
		},function(data){
			//console.log(data.data.length)
			fun.FindInfoPage(data.data.length,data.data);
			
		})
	});
	
	$('#albun_text').bind('keyup', function(event) {
	　　if (event.keyCode == "13") {
	　　　　//回车执行查询
	　　　　$('#album_search').click();
	　　}
	});
	
	
	//触发设置
	$("#setting_click").click(function(){  
		fun.SettingPrivacy(); 
	})



	

	//课程删除 
	$("#Courses_table").on("click", ".coures_delect", function() {
		var auditState = $(this).parent().parent().parent().parent().attr("id")
		if( auditState == "审核中"){
			var str = "未通过课程不允许删除";
			fun.promptmsg(str)
			
		} else{
			var curriculumId = $(this).parent().parent().parent().parent().attr("aid");
			var unionId = $(this).parent().parent().parent().parent().attr("pid");
//			console.log(unionId);
//			console.log(curriculumId);
//			console.log(customerId)
			var str = "<span style='position: relative;left:25px;color: #666;'>确定要删除此课程吗?删除后不可恢复！</span>";
			layer.open({
				type: 0,
				shade: 0,
				area: ['320px', '160px'], //弹框大小   
				offset: "auto",
				maxmin: true,
				content: str,
				btn: ['确认', '取消'],
				yes: function() {
					$.post(base_url +"/api/curriculum/delCurriculum", {
						"curriculumId": curriculumId,
						"customerId": customerId,
						"unionId":unionId
					}, function(data) {
						//console.log(data)
						if(data.result == true && data.code == 0) {
							str = "删除成功!";
						} else {
							str = data.message
						}
						
						fun.layermsg(layer, str)
					})
				},
				btn2: function() {
					layer.closeAll();
				}
			})
			
		}

	})

	//课程编辑
	$("#Courses_table").on("click", ".coures_update", function() {
		
		var albumthisid = $(this).parent().parent().parent().parent().attr("aid");
		var auditState = $(this).parent().parent().parent().parent().attr("id");
		var  unionId = $(this).parent().parent().parent().parent().attr("pid");
		var page = $(this).parent().parent().parent().parent().attr("pageid");
		sessionStorage.setItem('page',page);
		localStorage.setItem('unionId', unionId);
		
		if(auditState != "已发布"){
			alert("你的课程还未发布成功，暂时无法修改。");
		} else {
			canSave = true;
			//console.log(canSave)
			var myIndexSave	= sessionStorage.getItem('mySIndex');  //没有获取到  在编辑的地方第一次取
			//console.log(myIndexSave)  //在编辑的时候,第二次存
			sessionStorage.setItem('second',myIndexSave);
			sessionStorage.setItem("rootOpera",0);
			location.href = "coumodify.html?"+ encodeURI(albumthisid);
			//location.href = "coumodify.html?" ;  
		}
		
	})
	
	$('#Mycourse_edit').on('change', '#showImg', function(e) {
		var imgUrl = window.URL.createObjectURL(this.files[0]); // 获取选择上传的图片路径
		var f = this.files[0]; //获取上传图片
		if(f.size > 3145728) {
			alert("您添加的图片超过3M，无法上传，请更换！")
		} else {
			var xhr = new XMLHttpRequest();
			var fd = new FormData();
			var curriculumPhoto = "";
			if(undefined != f) { //上传头像
				fd.append('files', f);
				fd.append('address',imgUrl);
				fd.append('icon','expertol-cover');
				fd.append("jsonpCallback", 'jsonpCallback');
				xhr.open("POST", base_url +"/api/customer/dataImport"); //请求
				xhr.send(fd);
				var that = this;
				xhr.onload = function(e) { //回调
					var obj = eval('(' + this.response + ')');
					curriculumPhoto = obj.url;
					sessionStorage.setItem('curriculumPhoto',curriculumPhoto);
					document.getElementById('updateshowimg').style.backgroundImage = "url("+curriculumPhoto+")"
				
				}
			}
		}

	})
	var curriculumId = location.href.split("albummodify/")[0].split("?")[1];
	$("#Mycourse_edit").on("click", "#Mycourse_submit", function() {   
		var currsPhoto = sessionStorage.getItem('curriculumPhoto');//新上传的封面  
		var photomodify = sessionStorage.getItem('photomodify');  //获取到的封面
		//sessionStorage.removeItem('curriculumPhoto');   
		var curriculumPhoto ;
		if(currsPhoto == null){
			curriculumPhoto = photomodify;
		} else {
			curriculumPhoto = currsPhoto;
		}
		
		var curriculumName =$("#Mycoursename").val();
		var testFlag = $("input[type='radio']:checked").val(); 
		//console.log(testFlag)
		//var curriculumId = sessionStorage.getItem('albumthisid');
		//console.log("照片: " + curriculumPhoto + "课程名:"+ curriculumName + "    是否为试学: "+ testFlag  + "curriculumId: " + curriculumId);
		var reg =  /\S/;
		if((!reg.test(curriculumName)) || (!reg.test(testFlag)) || (!reg.test(curriculumId)) ){
			var str = "修改课程信息不能为空"
			fun.promptmsg(str);
			return;
		} else {
			var rootOpera = sessionStorage.getItem("rootOpera",1);
				//console.log(rootOpera)
			$.post(base_url +"/api/curriculum/updateCurriculumById",{
				"curriculumName":curriculumName,
				"customerId":customerId,
				"curriculumPhoto":curriculumPhoto,
				"testFlag":testFlag,
				"curriculumId":curriculumId
				
			},function(data){  //在修改的时候第三次取
					
					//console.log("点击编辑: " + recIndex);
				//console.log(data)
				if(data.result==true&&data.code==0){  //在这里存第二次
						var recIndex = sessionStorage.getItem('second');  //没有获取到  第三次获取
						//console.log("第三次保存: " + recIndex)
					alert("修改成功");
					if(rootOpera == 1){
						sessionStorage.setItem('fourTime',recIndex);  //第三次
						window.location.href = "operatAlbum.html"; //成功后要跳转到当前页 咋啥都没有  页面错了
					}else{
						sessionStorage.setItem('recIndex',recIndex);  //第三次
						window.location.href = "mycourses.html"; //成功后要跳转到当前页
					}
					
					
				} else {
					var str = data.message;
					fun.promptmsg(str);
				}
			})
		}
		
	})

	//获取视频播放地址
	$("#Courses_table").on("click", ".video_curriculumPhoto", function(){
		var vid = $(this).attr('id');
		//console.log(vid)
		
		$.post(base_url +"/api/app/ParameterManagement/getVideoEvidence",{
			"vid":vid
		},function(data){
			//console.log(data)
			if(data.result==true&&data.code==0){  
			//console.log(data)
			$('#J_prismPlayer').empty();
			$("#J_prismPlayer_play").css("display","block")

			$.post(base_url + "/api/app/ParameterManagement/getVideoAdderss",{
				"vid":vid
			},function(data){
				// console.log(data)
				// console.log(data.data.PlayInfoList.PlayInfo)
				
				var PlayInfo = data.data.PlayInfoList.PlayInfo;
				for (var i = 0 ;i < PlayInfo.length; i++){
					var Encrypt = data.data.PlayInfoList.PlayInfo[i].Encrypt;
					var EncryptType = data.data.PlayInfoList.PlayInfo[i].EncryptType;
					var PlayURL = data.data.PlayInfoList.PlayInfo[i].PlayURL;
					var StreamType = data.data.PlayInfoList.PlayInfo[i].StreamType;
				}
					if(EncryptType == 'AliyunVoDEncryption'){ //私有加密
						//alert("私有加密")
						$.post(base_url + "/api/app/ParameterManagement/getVideoEvidence",{
							vid:vid
						},function(data){
							//console.log(data)
							player = new Aliplayer({
							  	id: "J_prismPlayer",
								autoplay: true,
				               	vid: vid,
								playauth: data.data.playAuth,
					       	});
						})
//						
					} else if(EncryptType == 'HLSEncryption'){ //标准加密
						//alert("标准加密")
						var player = new Aliplayer({
				            id: 'J_prismPlayer',
				            width: '100%',
				            autoplay: true,
				            //支持播放地址播放,此播放优先级最高
				            source : PlayURL
				        })
					} else { 


						var player = new Aliplayer({
							id: 'J_prismPlayer',
							width: '100%',
							autoplay: true,
							//支持播放地址播放,此播放优先级最高
							source : PlayURL,
						})
						
						
					}


				
			})
			
			} else{
				var str = "我们正在努力为您上传的课程转码，请稍后再试。";
				fun.promptmsg(str);
			}
			

		})
	})
	
	//关闭视频
	$("#J_prismPlayer_play").on("click", "#viode_close", function(){
		$("#J_prismPlayer_play").css("display","none");
		window.location.reload()
		
	})
	
	
	

	//实时监控值得变化
	
}

var fun = {
	
	//函数延迟
	inputdelay: function(inputid, sqlid) {
		try {
			if($("#" + inputid).val() == "") {
				$("#" + inputid + "hint").html(sqlid + "不能为空")
			} else {
				$("#" + inputid + "hint").html("")
			}
		} catch(e) {
			//console.log(e);
		}
	},

	//封装弹框
	layermsg: function(lay, str) {
		layer.msg(str, {
			title: false,
			time: false, //20s后自动关闭
			area: ['300px', '150px'],
			btn: ['关闭'],
			content: '<div style="padding-top: 50px">' + str + '</div>',
			btnAlign: 'c', //按钮居中
			end: function() {
				location.reload();
			}
		})
	},
	
	
	//封装弹框
	promptmsg: function(str) {
		layer.msg(str, {
			title: false,
			time: 20000, //20s后自动关闭
			area: ['300px', '150px'],
			btn: ['关闭'],
			content: '<div style="padding-top: 50px">' + str + '</div>',
			btnAlign: 'c', //按钮居中
			end: function() {
				//location.reload();
			}
		})
	},

	//修改普通用户资料
	editNormalInfo: function(changeType,content,customerId,selfIntroduction){ //理一理顺序,首先进来的是修改昵称,changeType = 0;第二次执行changeType = 3
		var nickName = oldUserInfo.nickName;
		if(changeType == 0 ){  //只有修改昵称的时候才需要判断 为0就是修改昵称,第一次执行,为0 ;不满足,直接else
			if(content == nickName){  //判断昵称是否修改,如果没改
				fun.editNormalInfo(3,selfIntroduction,customerId,selfIntroduction);  //直接第二次执行,
			} else{
				$.post(base_url +"/api/customer/updateCusById", {  
					"customerId": customerId,
					"changeType": parseInt(changeType),
					"content": content,
					
				},function(data) { 
//					console.log("修改昵称")
//					console.log(data)
				
					if(data.result==true&&data.code==0){   
							if(changeType == 0){   //修改昵称成功了,就修改自我介绍  
								
								fun.editNormalInfo(3,selfIntroduction,customerId,selfIntroduction);  //
							}else{
								//alert("修改成功");
								//window.location.href = "homepage.html";
							}
						
					} else {
						var str = data.data;
						fun.promptmsg(str);
						return;
					}
					
				});
			}
		}else{  //else 里面要再写一个请求
			$.post(base_url +"/api/customer/updateCusById", {  //修改个人介绍
				"customerId": customerId,
				"changeType": parseInt(changeType),
				"content": content,
			},function(data) { 
//				console.log("修改个人介绍")
//				console.log(data)
			
				if(data.result==true&&data.code==0){ 
					window.location.href = "homepage.html";   //唯一能跳转的地方
				} else {
					var str = data.data;
					fun.promptmsg(str);
					return;
				}
				
			});
		}
		
	
	},
	
	//修改普通用户生日等资料
	editOtherInfo :function(customerId,city,sex,birthday,selfIntroduction,nickName){
		
			
	 	$.post(base_url +"/api/customer/updateCus",{
				"customerId":customerId,
				"city":city,
				"sex":parseInt(sex),
				"birthday":birthday
			},
			function(data){
				//console.log(data)  //打印的data
				fun.editNormalInfo(0,nickName,customerId,selfIntroduction);  //先修改昵称
				if(data.result==true&&data.code==0){
					//alert("修改成功");
					//window.location.href = "homepage.html";
					//console.log(data)
				} else {
					var str = "普通用户" + data.message
					fun.promptmsg(str);
					return;
				}
			})
	},

	//个人资料申请
	UserApplication: function(customerId,industry,customerCode) {
		var realname = sessionStorage.getItem('realname');//真实姓名
		var identityReverse = sessionStorage.getItem('identityReverse');
		var identityFront = sessionStorage.getItem('identityFront');
		var nickName = $("#username").val(); //昵称
		var birthday = $("#userbirthday").val(); //生日
		var citys = $("#userpermanent").val(); //常驻城市
		var province = $("#province").val();
		var city = province + "-" +  citys;
		var industryExperience = $("#userworking").val(); //行业经验
		var company = $("#userInstitution").val(); //任职机构
		var job = $("#userjob").val(); //执业
		var sex = $("input[type='radio']:checked").val(); //性别
		var selfIntroduction = $("#userself").val(); //自我介绍
		var report = $("#userhtml").val(); //媒体报道
		//手机号
		var account = sessionStorage.getItem('account');
		//console.log(account)
		var operatorType = sessionStorage.getItem('IDcard')
		
		
		var reg =  /\S/;
		birthday = birthday.substring(0,19);    
		birthday = birthday.replace(/-/g,'/'); 
		var timestamp = new Date(birthday).getTime();

		
		
		
		
		
		if(proveAlbumList.length == 0){
			var str = "职业证明材料不能为空";
			fun.promptmsg(str)
			return;
		}
		if( (!reg.test(company)) || (!reg.test(city)) || (!reg.test(birthday)) || (!reg.test(industry)) || (!reg.test(nickName)) || (!reg.test(selfIntroduction)) ||  (!reg.test(industryExperience)) || (!reg.test(job))  ){
			var str = "专家资料不能为空";
			fun.promptmsg(str)
			return;
		} else {
			
		var myIndustry = "";
		if(industry.length == 1){
			myIndustry = industry[0];
		}else{
			for(var i = 0;i < industry.length ; i++){
				if( i < industry.length - 1){
					myIndustry += industry[i] + ",";  
				}else{
					myIndustry += industry[i];
				}
			}
		}
		
			$.post(base_url +"/api/customerHandel/submitSpe", { 
				"customerType": 1, 
				"proveType" : 1,
				"expertolId": customerCode, 
				"nickName": nickName, 
				"customerId": customerId,
				"selfIntroduction": selfIntroduction, 
				"enterpriseName": realname,
				"industry": myIndustry,
				"proveAlbum":proveAlbumList +'',
				"sex":sex,
				"industryExperience":industryExperience,
				"company":company,
				"job":job,
				"identityFront" : identityFront,
				"identityReverse" :identityReverse,
				"contactPhone":account,
				"report":report,
				"birthday":timestamp,
				"city" :city,
				"operatorType" : 0 ,//证件类型
				"operatorNum" : operatorType
				
			}, function(data) {
				if(data.result == true && data.code == 0) {
					alert("资料正在审核,请稍后");
					window.location.href = "../Overview/overview.html";
				} else {
					var str = data.message + data.data;
					fun.promptmsg(str);
					return;
				}
			})
		}
	},
	setcurrentCourse : function(currentC){
		currentCourse = currentC;
		//console.log(currentCourse)
	},
	
	getcurrentCourse: function(){  
		return currentCourse;
	},
	
	//企业入住
	EnterApplication : function(customerId,industry){
		var industr;
		if(industry != null && industry.length != 0){  
			industr = industry[0];
			for(var i = 1 ; i < industry.length ; i++ ){
				if(industry.length == 1){
					industr += industry[i];
				} else {
					industr += ","+industry[i];
				}
			}
		}
		var account = sessionStorage.getItem('account');
		console.log(account)
		
		var customerCode = sessionStorage.getItem('customerCode')
		var enterpriseName = $("#entername").val();//企业名称
		var companyCity = $("#enterbirthday").val();//所在地
		var citys = $("#userpermanent").val();//常驻城市
		var province = $("#province").val();
		var city = province + "-" + citys;
		var industryExperience = $("#enterworking").val();//行业经验
		var selfIntroduction = $("#enterself").val();//公司介绍
		var job = $("#enterone").val();//一句话介绍
		var report = $("#enterhtml").val();//媒体报道链接
		var operatorName = $("#Businessname").val();//营业者姓名
		var operatorNum = $("#Businessnum").val();//营业者证件号
		var code = $("#btnverification").val();//验证码
		//var account = $("#iphonenum").val();  //手机号
		var nickName = $("#nickName").val(); //昵称
		//sessionStorage.setItem('enterpriseName',enterpriseName);
		var businessLicense = sessionStorage.getItem('businessLicense');//营业执照
		var identityFront	 = sessionStorage.getItem('ententpositive');//真面
		var identityReverse = sessionStorage.getItem('ententsanti');//反面
		var regIdNo=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
		if(!regIdNo.test(operatorNum)){  
				var str = "请填写正确的身份证号码";
				fun.promptmsg(str);
			    return;  
		} 
//		console.log("customerId 用户id: " + customerId + "  ," + "-expertolId 咨聊id: " + customerCode +"  ," + "-nickName昵称: "+ nickName +"  ,-selfIntroduction 自我介绍: " + selfIntroduction + "  ,enterpriseName 专家真实姓名: " +  enterpriseName + "  ,industry 所在行业: " +industr )
//		console.log("companyCity 公司注册地:" + companyCity + "   ,city 常驻城市: " + city + "   ,industryExperience 从业经验: " + industryExperience + "   ,job 一句话简介 : " + job + "   ,operatorName 营业者姓名: " + operatorName + "  ,营业者证件号 operatorNum : " + operatorNum )
		if(businessLicense == null || businessLicense == null || businessLicense == null){
			var str = "营业执照不能为空";
			fun.promptmsg(str);
			return;
		}
		if(identityFront == null || identityFront == null || identityFront == null){
			var str = "身份证正反面不能为空";
			fun.promptmsg(str);
			return;
		}
		if(identityReverse == null || identityReverse == null || identityReverse == null){
			var str = "身份证正反面不能为空";
			fun.promptmsg(str);
			return;
		}
		
		var reg =  /\S/;
		if( (!reg.test(companyCity)) || (!reg.test(operatorName)) ||  (!reg.test(enterpriseName)) || (!reg.test(nickName)) || (!reg.test(job)) || (!reg.test(selfIntroduction)) ){ 
			//alert("不能为空")
			var str = "企业资料填写不能为空";
			fun.promptmsg(str);
			return;
		} else if (industr == undefined || industr == 'undefined' || industr == "undefined"){
			var str = "擅长领域不能为空";
			fun.promptmsg(str);
			return;
		} else {
			$.post(base_url +"/api/customerHandel/submitSpe",{
				"customerId":customerId,
				"expertolId" :customerCode,
				"customerType": 2,
				"nickName":nickName,
				"enterpriseName":enterpriseName,
				"selfIntroduction":selfIntroduction,
				"operatorName":operatorName,
				"industry":industr,
				"operatorNum":operatorNum,
				"identityReverse":identityReverse,
				"businessLicense":businessLicense,
				"identityFront":identityFront,
				"job":job,
				"companyCity":companyCity,
				"city":city,
				"industryExperience":industryExperience,
				"report":report,
				"contactPhone":account
			
			},function(data){
				//console.log(data)
				if(data.result == true && data.code == 0) {
					alert("申请成功，请耐心等待审核");

					window.location.href = "../Overview/overview.html";
				} else {
					alert(data.data)
					window.location.href = "#"; //资料填写失败
				}
			})
			
		}
	},
	
	//我的课程分页
	FindPage : function(pageIndex,data){  
		
		var indexGet = sessionStorage.getItem('recIndex',0); 
		sessionStorage.removeItem('recIndex');
		
		if(indexGet != null && indexGet != 0){
		
		}else{
			indexGet = 0;
		}
			
		var totalPagr = parseInt(pageIndex / 4);
		var countNum = pageIndex % 4;
		var showNum = 4;
		var page = 1;
		if(countNum != 0) {
			totalPagr += 1;
		}
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage,
				layer = layui.layer;
			if(page == totalPagr) {
				showNum = countNum;
			}
			laypage.render({
				elem: 'coures_viode_page',
				count: pageIndex,
				limit: showNum,
				curr:indexGet,
				layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip'],
				jump: function(obj, first) {
					mySIndex = obj.curr;
					//console.log(canSave)
					if( canSave == false || canSave == "false" || canSave =='false'){
						sessionStorage.setItem('mySIndex',mySIndex);  
					}
					
					//console.log("当前页: " + mySIndex);   
					
					var pageItemCount = obj.curr; 
					if(pageIndex != 0 == 0 ){
						$("#Courses_table").empty();
						$("#Courses_table").append("无数据");
					} else {
						page = pageItemCount;
						if(page == totalPagr && countNum != 0) {
							var sum = (page - 1) * 4;
							fun.FindCoures(data, sum, pageIndex);
						} else {
							var sum = page * 4;
							fun.FindCoures(data, (page - 1) * 4, sum);
							page += 1;
						}
					}
				}
					
			})
		})
		
	},
	
	//我的专辑分页
	FindInfoPage : function(pageIndex,data){  
		
		var indexGet = sessionStorage.getItem('unionIndex',0); 
		sessionStorage.removeItem('unionIndex');
		
		if(indexGet != null && indexGet != 0){
		
		}else{
			indexGet = 0;
		}
		var totalPagr = parseInt(pageIndex / 4);
		var countNum = pageIndex % 4;
		var showNum = 4;
		var page = 1;
		if(countNum != 0) {
			totalPagr += 1;
		}
		layui.use(['laypage', 'layer'], function() {
			var laypage = layui.laypage,
				layer = layui.layer;
			if(page == totalPagr) {
				showNum = countNum;
			}
			laypage.render({
				elem: 'aldum_viode_page',
				count: pageIndex,
				limit: showNum,
				curr:indexGet,
				layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip'],
				jump: function(obj, first) {
					unionIndex = obj.curr;
					if( unionSave == false || unionSave == "false" || unionSave =='false'){
						sessionStorage.setItem('unionIndex',unionIndex);  
					}
					//console.log("当前页: " + unionIndex); 
					var pageItemCount = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
					if(pageIndex != 0 == 0 ){
						$("#Courses_table").empty();
						$("#Courses_table").append("无数据");
					} else {
						page = pageItemCount;
						if(page == totalPagr && countNum != 0) {
							var sum = (page - 1) * 4;
							fun.FindInfo(data,sum,pageIndex);
							
						} else {
							var sum = page * 4;
							fun.FindInfo(data,(page - 1) * 4, sum);
							page += 1;
						}
					}
				}
			})
		})
	},
	
	//我的课程 分页
	FindCoures: function(data, pageIndex, pageindex2) {
		
		
		$("#Courses_table").empty();
		for(var i = pageIndex; i < pageindex2; i++) {  
			var time = data[i].curriculumTime;
			var times = (Math.floor(time/60))+":"+(time-Math.floor(time/60)*60);
			//创建时间			
			var createTime = data[i].createTime;
			var date = new Date(createTime);
			var Y = date.getFullYear() + '-';
	        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	        var D = date.getDate() + ' ';
	        var h = date.getHours() + ':';
	        var m = date.getMinutes() + ':';
	        var s = date.getSeconds();
			var createTimes = Y+M+D+h+m+s; 
			//课程状态
			var auditState = data[i].auditState;
			if(auditState == 0){
				auditState = "审核中"
			} else if(auditState == 1){
				auditState = "已发布"
			}else if(auditState == 2){
				auditState = "不通过"
			}else if(auditState == 3){
				auditState = "未提交"
			}
			var curriculumName = data[i].curriculumName;
//			if(curriculumName.indexOf(".") == -1){
//				
//			}else{
//				var current = new Array();
//				current = curriculumName.split(" ");
//				curriculumName = current[1];
//			}

			
			var str = "<tr class='Video_list' id='"+auditState+"' aid='" + data[i].curriculumId +"' pid='"+data[i].unionId+"' >";
			str += "<td>";
			str += "<img class='video_curriculumPhoto' id='"+data[i].vid+"' src='" + data[i].curriculumPhoto +"'>";
			str += "<p>";
			str += "<label>" + curriculumName + "</label>"
			str += "</p>";
			str += "<p class='list_info'>";
			str += "<img src='../../img/played_small.png'>";
			str += "<span>" + data[i].playNum + "</span>";
			str += "<img src='../../img/comment_small_999.png'>";
			str += "<span>" + data[i].commentNum + "</span>";
			str += "<img src='../../img/time_small_999.png'>";

			str += "<span>" + times + "</span>";
			str += "</p>";
			str += "<p >ID:" + data[i].curriculumId + "</p>";
			str += "</td>";
			str += "<td>"+data[i].unionName+"</td>";
			str += "<td>";
			str += "<p>" + createTimes + "</p>";
			
			str += "<p style='margin-left: 25px;'>"+auditState+"</p>";
			str += "</td>";
			str += "<td>";
			str += "<ul class='table_operating'>";
			str += "<li style='display:none'><a>分享</a></li>";
			str += "<li><a href='#' class='coures_update'>编辑</a></li>";
			str += "<li style='display:none'><a>下载</a></li>";
			str += "<li><a href='#' class='coures_delect'>删除</a></li>";
			str += "</ul>";
			str += "</td>";
			str += "</tr>";
			$("#Courses_table").append(str);
		}
	
	},
	
	getMessageSet:function(){  
		return allSetting;
	},
	

	setMessageSet:function(message){
		allSetting = message;
	},
	
	//手机号
	getPhoneCode :function(){
		return iphoneCode;
	},
	
	setPhoneCode : function(phoneCode){
		iphoneCode = phoneCode;
		//console.log(iphoneCode) 
	},
	
	//获取专辑信息
	
	setAlbumInfo : function(setalbunInfoList){
		albunInfoList = setalbunInfoList;
	},
	

	//获取专辑信息
	showAlbumInfo: function(recTag,data){
		//console.log(data)
		var videoType = data.videoType;
		var video = document.getElementById('video');
		var audios = document.getElementById('audio');
		if(videoType == 1 ){
			if(video != null){
				video.checked = true;
			}
			
		} else {
			if(audios != null){
				audios.checked = true;	
			}
			
		}
		
		
		
		$("#albumename").val(data.unionName);
		$("#Introduction").val(data.unionIntroduction);
		
		var unionAmt = data.unionAmt;
		if(unionAmt == 0){
			$("#editprice").attr("readOnly","true")
		}
		$("#editprice").val(unionAmt);
		
		var photo = data.unionPhoto;
		//console.log(photo)
		sessionStorage.setItem('photoAblumModify',photo)   //专辑信息里面的
		document.getElementById('Album_update').style.backgroundImage="url("+photo+")";
		var unionType = data.unionType;
		//console.log(unionType);
		
		document.getElementById(unionType).setAttribute('class','activebtn');
	},
	
	//获取课程信息
	showCoureseInfo : function(recTag,data){
		$("#Mycoursename").val(data.curriculumName);
		var photomodify = data.curriculumPhoto;
		sessionStorage.setItem('photomodify',photomodify)
		document.getElementById('updateshowimg').style.backgroundImage="url("+photomodify+")";
		var testFlag = data.testFlag;
		//console.log(testFlag);
		var staunchYes = document.getElementById('staunchYes');
		var staunchNo = document.getElementById('staunchNo');
		if(testFlag == 0){
			if(staunchYes != null)
			staunchYes.checked = false;
		} else {
			if(staunchYes != null)
			staunchYes.checked = true;
		}
		if(testFlag == 1){
			if(staunchNo != null)
			staunchNo.checked = false;
		} else {
			if(staunchNo != null)
			staunchNo.checked = true;
		}
		
	},
	
	//获取普通用户资料
	showUserInfo : function(recTag, data){  //最外面  你那里普通用户,执行了这里
		oldUserInfo = data;
		//console.log(data) 
		$("#username").val(data.nickName);
		
		var proveDates = data.birthday;

		var time = new Date(parseInt(proveDates));
		var Y = time.getFullYear() + '-';
        var M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
        var D = time.getDate() + ' ';
//      var h = time.getHours() + ':';
//      var m = time.getMinutes() + ':';
//      var s = time.getSeconds();
		var birthday = Y+M+D;
		//$("#Expertbirthday").val(data.birthday);//生日
		
		$("#userbirthday").val(birthday);
		
		//$("#userpermanent").val(data.city);
		
		
		
		//console.log(data.city)
		if(data.city != null){
//			var city = data.city.split("-");
//			$("#province").val(city[0]);  
//			$("#userpermanent").attr(city[1])
			setCity(data.city);  
			
			
		}
			
		
		
		
		
		$("#userself").val(data.selfIntroduction);
		
		var sex = data.sex;
		var man = document.getElementById('man');
		var woman = document.getElementById('woman');
		if(sex == 1 ){
			if(man != null){
				man.checked = true;
			}
			
		} else {
			if(woman != null){
				woman.checked = true;	
			}
			
		}
	
	},
	//获取专家资料
	showEpertInfo : function(recTag, data){
		$("#Expertname").val(data.nickName);//昵称
		var birthday = data.birthday;
		var date = new Date( parseInt(birthday) );
		var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
//      var h = date.getHours() + ':';
//      var m = date.getMinutes() + ':';
//      var s = date.getSeconds();
		var proveDates = Y+M+D;
		
		$("#Expertbirthday").val(proveDates);//生日
		
		
		
		$("#Expertself").val(data.selfIntroduction);//自我介绍
		$("#Expertworking").val(data.industryExperience);//经验
		$("#ExpertInstitution").val(data.company);//机构
		$("#Expertjob").val(data.job);//头衔
		
		$("#Experthtml").val(data.report);//媒体报道
		
		var sex = data.sex;
		var man = document.getElementById('man');
		var woman = document.getElementById('woman');
		if(sex == 1 ){
			if(man != null){
				man.checked = true;
			}
			
		} else {
			if(woman != null){
				woman.checked = true;	
			}
			
		}
		
		var arrayTest = data.industry.split(",");
		if(arrayTest.length != 0){
			for(var i = 0 ; i < arrayTest.length ; i ++){  
				var id = myMap[arrayTest[i]];
				document.getElementById(id).setAttribute('class','activebtn');
				industry.push(arrayTest[i]);  
			}
			
			
		}
		if(data.city != null){
			var city = data.city.split("-");
			
//			$("#province").val(city[0]);  
//			$("#userpermanent").attr(city[1]);
			setCity(data.city);
		}
	},
	
	
	//企业资料修改
	showEnterInfo : function(recTag, data){
		//console.log(data)
		$("#Expertname").val(data.nickName);//昵称

		//$("#userpermanent").val(data.city);//常驻城市
		$("#Expertbirthday").val(data.companyCity);//所在地  
		
		$("#Expertself").val(data.selfIntroduction);//自我介绍
		$("#Expertworking").val(data.industryExperience);//从业经验
		$("#Experthtml").val(data.report);//媒体报道
		$("#Expertjob").val(data.job);
		
		
		$("#Expertqyname").val(data.enterpriseName);
		var arrayTest = data.industry.split(",");
		
		
		
		
		
		if(arrayTest.length != 0){
			for(var i = 0 ; i < arrayTest.length ; i ++){  
				var id = myMap[arrayTest[i]];
				//console.log(id)
				document.getElementById(id).setAttribute('class','activebtn');
				industry.push(arrayTest[i]);  
			}
			
			
		}
		if(data.city != null){
			var city = data.city.split("-");
			
//			$("#province").val(city[0]);  
//			$("#userpermanent").attr(city[1]);
			setCity(data.city);
		}
		
		
		
		
	},

	//消息设置
	messageSetting : function(myAllSetting,type){
		//console.log(myAllSetting)
        var mesCourses =document.getElementById('MesCourses');//课程评价通知
		var mesAlbum =document.getElementById('MesAlbum');//专辑评价
		var mesBill =document.getElementById('MesBill');//账单通知
		var mesComment =document.getElementById('MesComment');//动态评价通知
		
		if(myAllSetting != null){   //消息设置  "pcAci": "PC端动态评论通知(0:否;1:是)"   "pcAi": "PC端账单通知(0:否;1:是)"  "pcCci": "PC端课程评论通知(0:否;1:是)" "pcUai": "PC端专辑评价通知(0:否;1:是)"
  		
	   		if(myAllSetting.pcAci == 0 || myAllSetting.pcAci == '0' || myAllSetting.pcAci == "0"){ //动态 	
	   			if(mesComment != null)
				mesComment.checked = false;
	   		}else{   
	   			if(mesComment != null)
	   			mesComment.checked = true;
	   		}
	   			
			if(myAllSetting.pcAi == 0 || myAllSetting.pcAi == '0' || myAllSetting.pcAi == "0"){
	   			if(mesBill != null)
	   			mesBill.checked = false;
	   		}else{
	   			if(mesBill != null)
	   			mesBill.checked = true;
	   		}
	   		
			if(myAllSetting.pcCci == 0 || myAllSetting.pcCci == '0' || myAllSetting.pcCci == "0"){ //课程评价  MesCourses
	   			if(mesCourses != null)
				mesCourses.checked = false;
	   		}else{
	   			if(mesCourses != null)
	   			mesCourses.checked = true;
	   		}
	   		
			if(myAllSetting.pcUai == 0 || myAllSetting.pcUai == '0' || myAllSetting.pcUai == "0"){ //专辑评价  MesAlbum
	   			if(mesAlbum != null)
				mesAlbum.checked = false;
	   		}else{
	   			if(mesAlbum != null)
				mesAlbum.checked = true;
	   		}
			
		}
		
	},
	//隐私设置
	privacySetting : function(myAllSetting){
		//console.log(myAllSetting)
		var allmore =document.getElementById('allmore');
		var myfriend =document.getElementById('myfriend');
		var onlyfriend =document.getElementById('onlyfriend');
		var close =document.getElementById('close');//课程评价通知
		
		
		//提到我 
		var timemore =document.getElementById('timemore');
		var timefriend =document.getElementById('timefriend');
		var timeonlyfriend =document.getElementById('timeonlyfriend');//课程评价通知
		if(myAllSetting != null){ 
			
			
			
			if(myAllSetting.commentFlag == 0 ){
				if(allmore != null){
					allmore.checked = true;
				}
				
				
			} else if(myAllSetting.commentFlag == 1){
				if(myfriend != null){
					myfriend.checked = true;
				}
			} else if(myAllSetting.commentFlag == 2){
				if(onlyfriend != null){
					onlyfriend.checked = true;
				}
			} else {
				if(close != null){
					close.checked = true;
				}
				
			}
			
			
			//@我
			if(myAllSetting.replyFlag == 2){ //  @提到我权限(0:所有人;1:我关注、已入驻专家、关注我的人;2:关注我的人)
				if(timeonlyfriend != null){
					timeonlyfriend.checked = true;
				}
			} else  if(myAllSetting.replyFlag == 1 ){
				if(timefriend != null){
					timefriend.checked = false;
				}
				
			} else {
				if(timemore != null){
					timemore.checked = true;
				}
				
			}
			
			
			
			
			
			
		}
		
		
		
		
	},

	//我的专辑 分页 渲染
	FindInfo: function(data, pageIndex, pageindex2) {
		$("#Album_table").empty();
		//console.log(data)
		

		for(var i = pageIndex; i < pageindex2; i++) {
			//console.log(data[i].unionPhoto)
			var unionAmt = data[i].unionAmt;
			if(unionAmt == 0) { //不是 
				unionAmt = "免费"
			} else {
				unionAmt = data[i].unionAmt + "聊币";
			}
			
			var updateTime = data[i].updateTime;
			var date = new Date(updateTime);
			var Y = date.getFullYear() + '-';
	        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	        var D = date.getDate() + ' ';
	        var h = date.getHours() + ':';
	        var m = date.getMinutes() + ':';
	        var s = date.getSeconds();
			var updateTimes = Y+M+D+h+m+s;
			var str = "<tr class='Video_list' aid='" + data[i].unionId + "'>";
			str += "<td>";
			str += "<img src=' " + data[i].unionPhoto + " ' id='table_list_img'>";
			str += "<p>" + data[i].unionName + "</p>";
			str += "<p class='list_info'>"
			str += "<img src='../../img/played_small.png'>"
			str += "<span>" + data[i].playNum + "</span>"
			str += "<img src='../../img/video.png'>"
			str += "<span>" + data[i].curriculumNum + "集</span>"
			str += "<span>" + unionAmt + "</span>"
			str += "</p>";
			str += "<p>ID:<span>" + data[i].unionId + " </span></p>";
			str += "</td>";
			str += "<td> " + updateTimes + " </td>";
			str += "<td>";
			str += "<ul class='table_operating'>";
			str += "<li style='display:none'><a>分享</a></li>";
			str += "<li><a href='javascript:void(0);' class='album_operat'>课程管理</a></li>";
			str += "<li><a href='javascript:void(0);' class='album_update'>编辑</a></li>";
			str += "<li><a href='javascript:void(0);' class='album_delect'>删除</a></li>";
			str += "</ul>";
			str += "</td>";
			str += "</tr>";
			$("#Album_table").append(str);
		}

	},
	
	
	//当前专辑的课程数据请求方法,方法在页面初始化的时候调用
	
	postCurrByUnionId : function(myUnionId){  //传入当前专辑的id作为参数
		
		
		
		var customerId = sessionStorage.getItem('customerId');   //用户id
		var unionId = myUnionId;   
		if(unionId == null){
			unionId = sessionStorage.getItem('myunionId');
		}
	//console.log("专辑id: " + unionId)
	$.post(base_url +"/api/curriculum/getAllCurrByUnionId", {  
		"unionId": unionId,
		"customerId": customerId,
		"type":1
	}, function(data) {   
		console.log(data)
		
		if(data.result == true && data.code == 0) {   
			sessionStorage.setItem('unionAmt', data.data.unionAmt), //标题   播放次数   集  时长  id  评分
			sessionStorage.setItem('unionName', data.data.unionName),
			sessionStorage.setItem('unionPhoto', data.data.unionPhoto),   //这里是专辑里面的
			sessionStorage.setItem('playCount', data.data.playCount),
			sessionStorage.setItem('assessmentValue', data.data.assessmentValue),
			sessionStorage.setItem('unionId', data.data.unionId),
			sessionStorage.setItem('count', data.data.count);
			var myData = [];
			for(var i = 0 ; i < data.data.curriculumList.length ; i ++){  
				if(data.data.curriculumList[i].handleStatus == 1){  
					myData.push(data.data.curriculumList[i]);
				}
			}
			
			
			
			//获取专辑内课程总条数
			$("#courese").text(myData.length)
			if(myData.length == ""){
				$("#operating_table").empty();
				$("#operating_table").append("数据为空");
			} else {
					for(var i = 0 ;  i < myData.length ; i ++){
						for(var j = 0 ; j <myData.length - 1 -i ; j++){
							if(parseInt(myData[j].seqNum) > parseInt(myData[j + 1].seqNum)){ 
								var temp = myData[j];
								myData[j] = myData[j +1];
								myData[j + 1] = temp;
							} 
						}
					}


				editCourse = myData;
				var pageIndex = myData.length;
				var customerId = sessionStorage.getItem('customerId');
				var page = 1;
				var customerId = sessionStorage.getItem('customerId');
				var totalPagr = parseInt(pageIndex / 4);
				var countNum = pageIndex % 4;
				var showNum = 4;
				if(countNum != 0) {
					totalPagr += 1;
				}
				
					var indexPos = sessionStorage.getItem('fourTime',0); 
					sessionStorage.removeItem('fourTime');
					//console.log("第四次获取的: " + indexPos)
					if(indexPos != null && indexPos != 0){
					}else{
						indexPos = 0;
					}
				layui.use(['laypage', 'layer'], function() {
					var laypage = layui.laypage,
						layer = layui.layer;
		
					if(page == totalPagr) {
						showNum = countNum;
					}
					laypage.render({
						elem: 'operating_viode_page',
						count: pageIndex, //页面总条数
						limit: showNum, //每页显示数  
						curr:indexPos,
						layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip'],
						jump: function(obj, first) {
							var pageItemCount = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
							if(pageIndex != 0 == 0 ){
								$("#operating_table").empty();
								$("#operating_table").append("无数据");
							} else {
								//pageItemCount当前是第几页
								page = pageItemCount;
								if(page == totalPagr && countNum != 0) {
									var sum = (page - 1) * 4;
									fun.ManageInfo(myData, sum, pageIndex);  
			
								} else {
									var sum = page * 4;
									//console.log(sum)
									fun.ManageInfo(myData, (page - 1) * 4, sum);
									page += 1;
								}
							}
		
						}
					})
				})
					
			}	
		}       
		if(sessionStorage.getItem('customerId') != null) {
			$("#table_list_img").attr('src', sessionStorage.getItem('unionPhoto')); //封面,这是默认的封面显示到页面
			$("#table_list_title").text(sessionStorage.getItem('unionName')); //标题
			$("#table_list_play").text(sessionStorage.getItem('playCount')); //播放次数
			$("#table_list_episode").text(sessionStorage.getItem('count')); //课程数
			var unionAmt = sessionStorage.getItem('unionAmt');
			if(unionAmt == 0) {
				unionAmt = "免费"
				$("#opera_list_score").css("display","none")
			} else {
				unionAmt = sessionStorage.getItem('unionAmt') + "聊币";
				$("#opera_list_score").css("display","block")
				$("#table_list_score").text(sessionStorage.getItem('assessmentValue')); //评分
			}
			$("#table_list_piece").text(unionAmt); //价格
			$("#table_list_id").text(sessionStorage.getItem('unionId')); //id
			
		
		}
	})
	},
	
	
	
	
	
	//课程管理列表   
	ManageInfo : function(data, pageIndex, pageindex2){  
		//console.log(data)
		$("#operating_table").empty();
		for(var i = pageIndex; i < pageindex2; i++){    
			var playNum = data[i].playNum;
			var commentNum = data[i].commentNum;
			var currTime = data[i].curriculumTime;
			var curriculumTime = (Math.floor(currTime/60))+":"+(currTime-Math.floor(currTime/60)*60);
			
			
			if( (currTime == null || currTime == 'null' || currTime == "null" )){
				currTime = 0;
			}
			if((playNum == null || playNum == 'null' || playNum == "null" ) ){
					playNum = 0;
			}
			if((commentNum == null || commentNum == 'null' || commentNum == "null" ) ){
				commentNum = 0;
			}
	
			var handleStatus = data[i].handleStatus;
			
			if(handleStatus == 0){    
				handleStatus = "审核中"
			} else if(handleStatus == 1){
				handleStatus = "已发布"
			}else if(handleStatus == 2){
				handleStatus = "不通过"
			}else if(handleStatus == 3){
				handleStatus = "未提交"
			}
			
			var createTime = data[i].createTime;
			var date = new Date(createTime);
			var Y = date.getFullYear() + '-';
	        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	        var D = date.getDate() + ' ';
	        var h = date.getHours() + ':';
	        var m = date.getMinutes() + ':';
	        var s = date.getSeconds();
			var createTimes = Y+M+D+h+m+s; 
		
			var unionId = data[i].unionId
			var curriculumId = data[i].curriculumId;//课程id  
			var seqNum = data[i].seqNum//排序
			
			var curriculumName = data[i].curriculumName//课程名
			//console.log(seqNum)
		
			
			
			var str = "<tr aid='"+curriculumId+"' id='"+seqNum+"' pid='"+data[i].testFlag+"' bid='"+curriculumName+"'>";  
				str += "<td>"+seqNum+"</td>";
				str += "<td class='coures_list'>";
				str += "<img src='"+data[i].curriculumPhoto+"' id='coures_video_name'>";
				str += "<p id='coures_video_title'><span style='color:green;display:none;float: left;' id='"+curriculumId+"0'>[试学]</span>"+curriculumName+"</p>";
				str += "<p class='list_info'>";
				str += "<img src='../../img/played_small.png'>";
				str += "<span id='coures_video_play'>"+playNum+"</span>";
				str += "<img src='../../img/comment_small_999.png'>";
				str += "<span id='coures_video_num'>"+commentNum+"</span>";
				str += "<img src='../../img/time_small_999.png'>";
				str += "<span id='coures_video_time'>"+curriculumTime+"</span>";
				str += "</p>";
				str += "<p>ID:"+curriculumId+"</p>"
				str += "</td>";
				str += "<td>";
				str += "<p ><span>"+createTimes+"</span></p>";
				str += "<p class='coures_list_stata'>"+handleStatus+"</p>";
				
				str += "</td>";
				str += "<td class='operating_table_operating'>";
				//str += "<a href='javascript:void(0);' class='operating_table_testFlag' id='"+curriculumId+"1' style='display:block'>设为试学</a>";
				str += "<a href='javascript:void(0);' class='operating_table_testFlag' id='"+curriculumId+"1' style='display:block'>编辑</a>"
				str += "<a href='javascript:void(0);' class='operating_table_noFlag' style='display:none'></a>";
				str += "<a href='javascript:void(0);' class='operating_table_Sort'>排序</a>";
				str += "<div class='operating_input_sort' id='"+curriculumId+"_sort'><span>排至第<input type='number' id='"+curriculumId+"_num' >位</span><input type='button' id='operting_sort_ser' value='确定'><input type='button' id='opreting_sort_close' value='取消'></div>"
				str += "<a href='javascript:void(0);' class='operating_table_delect' id='"+unionId+"'>删除</a>";
				str += "<a href='javascript:void(0);' class='operating_table_replace'>替换</a>";
				str += "</td>";
				str += "</tr>";
				/^[1-9]\d*$/
			$("#operating_table").append(str);
			
			//var aTage = document.getElementById(data[i].curriculumId + "1");  
			var atageid = document.getElementById(data[i].curriculumId + "0");  
			
//			 if(data[i].testFlag == "1"){   
//				aTage.innerHTML = "取消试学" ; 
//				atageid.style.display = "block"
//				
//				
//			}else if(data[i].testFlag == "0"){
//				aTage.innerHTML = "设为试学" ;
//				atageid.style.display = "none"
//			}
		}
		
	},

	//隐私设置
	SettingPrivacy: function() { 
		var customerId = sessionStorage.getItem('customerId');
		$.post(base_url +"/api/cstomerConfig/getCustomerConfigById", {  
				"customerId": customerId
			},
			function(data) {
				//console.log(data)
				
				if(data.result == true && data.code == 0) {
					allSetting = data.data;
				
				}

		
			})

	},

	
}

//选择入住类型
function onclickuser(customerType) {
	if(customerType == 1) {
		window.location.href = "userApplic.html";
	} else {
		window.location.href="enterprise.html"
	}

}

function Cretifivation(proveType) {
	if(proveType == 1) {
		window.location.href = "sesamecertif.html";
	} else {
		window.location.href = "userCertification.html";
	}
}

var countdown = 60; 
function settime(id, obj) { 
	if(countdown == 0) {   
		obj.attr("disabled", false);       
		id.value = "获取验证码";     
		countdown = 60;     
		return;  
	} else {    
		obj.attr("disabled", true); //给input添加 disabled
		id.value = "重新发送(" + countdown + ")";     
		countdown--;   
	} 
	setTimeout(function() {   
		settime(id, obj)   
	}, 1000)

}

