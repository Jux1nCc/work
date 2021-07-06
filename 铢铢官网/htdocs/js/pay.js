

	$(document).ready(function () {
		
		   $(window).scroll(function(event){
			    var wScrollY = window.scrollY; // 当前滚动条位置  
			    var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）  
			    var bScrollH = document.body.scrollHeight; // 滚动条总高度      
			    if (wScrollY + wInnerH >= bScrollH) {          
			       $(".bottom_t").css("display","block")//显示底部
			    }  
			});	
		customerId = getURLParameter("customerId");
    		$.get("/api/cashOut/findMyCapital",{"customerId":customerId},
    		function(data){
    			console.log(data)
    			$(".l_pay_balan span").html(data.data.rechargeBal);
    			$(".l_sesame_head_img img").attr('src',data.data.photo);
    			$(".l_sesame_head_nam label").text(data.data.nickName)
    			$(".l_sesame_head_nam span").text(data.data.customerCode);
    		})
    		//出发接口，填充页面
    		//充值金额币选择
	        $('.l_recharge_con2 .l_money').click(function(){
	            $(this).parent('li').addClass('on').siblings().removeClass('on');
	            amt='';
	            amt=$('.l_recharge_con2 .l_money').html();
				amt=$(this).parent('li').children().next().children().text()
				//console.log(amt);
				
				sessionStorage.setItem('amt',amt);
				
	        })
	        //选择充值方式
	        $('.l_recharge_con1 ul li').click(function(){
	        	
	            $(this).addClass('on').siblings().removeClass('on');
	            if ($('.weix').hasClass('on')){
	                $('.l_money em').hide();
	                $(".weixin").css("display","none")
	                //支付宝
	                cashInWay=3;
	                sessionStorage.setItem('cashInWay',cashInWay);
	                
	            }else{
	                $('.l_money em').show();
	                $(".weixin").css("display","block")
	                //微信
	                cashInWay=2;
	                sessionStorage.setItem('cashInWay',cashInWay);
	            }
	            sessionStorage.setItem('cashInWay',cashInWay);
	          
	        });
	        var cashInWay=2;
	    	var amt=6;
	    	sessionStorage.setItem('amt',amt);
	    	sessionStorage.setItem('cashInWay',cashInWay);
	    	$('#btn').click(function(){
		        $.post("/api/pay/insertCashIn",{
		        	"customerId":customerId,
		        	"amt":amt,
		        	"sourceType":cashInWay,
		        	"cashInWay":2
		        },function(data){
		        	console.log(data)
		        	if(data.result==true&&data.code==0){
		        		var cashInId = data.data.cashInId;
		        			if(amt==''||amt==null){
			        			alert('请选择金额');
			        		}else{
			        			console.log(cashInWay)
			        			if( cashInWay == 2){
			        				console.log(cashInId)
			        				$.post("/api/pay/aliH5Pay",{"orderId":cashInId},
			        				function(data){
			        					console.log(data)
			        					if(data.result==true&&data.code==0){
			        						sessionStorage.setItem('form',data.data.form);
			        						var form = sessionStorage.getItem('form')
			        						//console.log(form)
											$(".c-rechange-body").empty();
											$(".close_prompt").append(form)
			
			        					} else {
			        						alert(data.data);
			        						window.location.href = "pay.html"
			        					}
			        				})
			        			} else if(cashInWay == 3) {
			        				console.log(cashInId)
			        				
			        				$.post("/api/pay/weixinH5Pay",{"orderId":cashInId,"ipv4":"183.12.66.148"},function(data){
			        					
			        					if(data.result==true&&data.code==0){
			
											var mweb_url = data.data.mweb_url;
											window.location.href = mweb_url
				        					
			        					} else {
			        						alert(data.message);
//			        						window.location.href = "pay.html"
			        						window.location.href = "cash_success.html"
			        					}
			        				})
			        			}
			        		}
		        	} 
		        	
		        })
		    })
    	var cashInId = sessionStorage.getItem('cashInId');
		
		var datetime = Date.parse(new Date());
		$.get("/api/account/getMyWallet",{
			"customerId":customerId,
			"datetime":datetime,
			"targetCustomerId":cashInId
		},function(data){
			//console.log(data)
		})
        
        	
	
	
	
	});