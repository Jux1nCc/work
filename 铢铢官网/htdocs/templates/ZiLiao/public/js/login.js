  $(document).ready(function(){
	//登陆 
	var number='';
	var text='';
	
	$(".l_public_btn").click(function(){ 
		 number = $("#number").val();
		 //text = md5($("#text").val());//md5加密
		 text = $("#text").val()
		if(number.trim() == 0  || text.trim() == 0 ){
			$(".l_login_cue span").text("请输入用户名/密码");
			return;
		} 
	   //alert(text)
	    //console.log(text);
	  	$.post("/api/customer/login",{"mobile":number,"password":text,"type":1},    
	  	function(data){
		 		//console.log(data);
	  	 	if(data.result==true&&data.code==0){
	  	 		//存放用户信息。。。
	  	 		sessionStorage.setItem('customerCode',data.data.customerCode);//咨聊id
	  	 		sessionStorage.setItem('nickName',data.data.nickName);//昵称
	  	 		
	  	 		sessionStorage.setItem('specialistFlag',data.data.specialistFlag);//公司职位
	  	 		
	  	 		sessionStorage.setItem('customerId',data.data.customerId);//唯一标识id
	  	 		sessionStorage.setItem('photo',data.data.photo);//头像
	  	 		sessionStorage.setItem('expertolId',data.data.expertolId);
	  	 		var customerId = data.data.customerId;
	  	 		var mycustomerId = $.cookie('customerId',customerId);
	  	 		$(".info_Avatar img").attr('src',data.data.photo);
	  			
	  	 		
	  	 		var tag = sessionStorage.getItem("loginTag","home");  //默认为home
	  	 		console.log(tag)
	  	 		if(tag == "pay"){
	  	 				window.location.href="pay.html"; 
	  	 		}else if(tag == "withdraw"){
	  	 			window.location.href="withdraw.html"; 
	  	 		}else{  
	  	 			window.location.href="index.html";
	  	 		}
	  	 		//alert(sessionStorage.getItem('customerId'))
	  	 	  
	  	 	}else{
	  	 		if(data.data == "null" || data.data == 'null' || data.data == null){
	  	 			
	  	 			if(data.code == -2 )
	  	 				$(".l_login_cue span").text("请输入用户名/密码");
	  	 			else
	  	 				$(".l_login_cue span").text(data.message);
	  	 		} else{
	  	 			$(".l_login_cue span").text(data.data);
	  	 		}
	  	 		
	  	 		//window.location.href="Login.html"; 
	  	 		
	  	 	}
	  	})
	})
	
	//回车搜索
	$('body').bind('keyup', function(event) {
	　　if (event.keyCode == "13") {
	　　　　//回车执行查询
	　　　　$('#btn').click();
	　　}
	});
	
	if(sessionStorage.getItem('customerId')!=null){
		$(".info_Avatar img").attr('src',sessionStorage.getItem('photo'));
		$(".l_sesame_head_img fl img").attr('src',sessionStorage.getItem('photo'));
		var customerId = $.cookie('customerId',customerId);
	}
});