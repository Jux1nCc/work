var maxstrlen = 500;
		
		var func={
			getAlbumInfo: function(recTag, unionId, customerId){
				
			//localStorage.setItem('customerId',customerId);
			$.get(base_url +"/api/union/findAlbumDetails",{   
				"unionId":unionId, 
				"customerId":customerId 
			},function(data){
				//console.log(data)
				if(data.result==true&&data.code==0){ 					
				//console.log("有返回值")
					fun.showAlbumInfo(recTag,data.data)
					//console.log(data)
					var num = data.data.unionIntroduction.length;
					//进来的时候获取长度
					var maxlen = 500 - num
					maxstrlen = maxlen
					//console.log("获取长度： " +num)  //这个才是获取的长度
					
					$("#wordCheck").text(maxlen);  //这个是剩余能输入的长度
				} else{
					//console.log("无返回值")
					alert(data.message)
				}
			})
			},
			}
		
		$(document).ready(function(){  
			
			
		
			
			var unionId = location.href.split("Albummodify/")[0].split("?")[1];
			var customerId = sessionStorage.getItem('customerId');
			//console.log(customerId)
			func.getAlbumInfo("recTag", unionId, customerId)
			
	    	if(navigator.userAgent.indexOf('.MSIE') > 0) {
				$("#Modify_album").on("input propertychange", "#albumename", function() {
					fun.inputdelay("albumename", "专辑名");
				});
				
				$("#Modify_album").on("input propertychange", "#Introduction", function() {
					fun.inputdelay("Introduction", "简介");
				});
				
				$("#Modify_album").on("input propertychange", "#editprice", function() {
					fun.inputdelay("editprice", "价格");
				});
				
				
			} else {
				$("#Modify_album").on("input oninput", "#albumename", function() {
					fun.inputdelay("albumename", "专辑名");
				});
				
				$("#Modify_album").on("input oninput", "#Introduction", function() {
					fun.inputdelay("Introduction", "简介");
				});
				
				$("#Modify_album").on("input oninput", "#editprice", function() {
					fun.inputdelay("editprice", "价格");
				});
				
				
				
			}
			
			
		})
		
		
		
		
		
		function Q(s) {
			return document.getElementById(s);
		}

		function checkWord(c) {
			
			len = maxstrlen;  //这里是剩余的长度
			var str = c.value;
			//console.log(str)
			myLen = str.length;
			//console.log("我当前的长度: " + myLen)  
			var wck = Q("wordCheck");
			if(myLen >= 500){
				maxstrlen = 0;
				wck.innerHTML = 0;
				c.value = str.substring(0, 500);
				return;
			}
			len = maxstrlen = 500 - str.length;
			if(len == 0){
				c.value = str.substring(0, 500);  //我想想
			}
			if(len >= (500 - myLen)){  //如果剩余的长度大于总长度减去目前的长度，就还可以输入
				maxstrlen = 500 - myLen;  //赋值给剩余的长度
				wck.innerHTML = maxstrlen;
			}else{   //剩余的长度小于总长度减去目前的长度
				maxstrlen = 0;
				wck.innerHTML = 0;
				c.value = str.substring(0, 500);
			}
//			console.log("剩余的长度: " + maxstrlen)
//			console.log("中介长度: " + len)
//			if(myLen > len * 2) {
//				c.value = str.substring(0, i + 1);
//			} else {
//				wck.innerHTML = Math.floor((len * 2 - myLen) / 2);
//			}
		}

		function getStrleng(str) {
			myLen = 0;
			i = 0;
			for(;
				(i < str.length) && (myLen <= maxstrlen * 2); i++) {
				if(str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128)
					myLen++;
				else
					myLen += 2;
			}
			return myLen;
		}
		
		
//		var ipt = $('#editprice');
//	    ipt.on('keyup',function(){
//	        if(! /^\d+$/.test(this.value)){
//	            this.value='';
//	        }
//	    })