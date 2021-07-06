$(function(){
    	
    	var customerId = $.cookie('customerId');



		//关闭微信支付
		$("#close_weixin").click(function(){
			$("#weixinWebPay").css("display","none")
			location.reload();
		})
    	$(".l_header_back").click(function(){
			sessionStorage.clear()
			window.location.href="login.html";
    	})
    	if(sessionStorage.getItem('customerId')!=null){ 	
    		$.get(base_url +"/api/cashOut/findMyCapital",{"customerId":sessionStorage.getItem('customerId')},function(data){
    			$(".l_pay_balan span").html(data.data.rechargeBal);
    		})
    		//出发接口，填充页面
    		var customerId = sessionStorage.getItem('customerId')
    		$(".l_sesame_head_nam p").text(sessionStorage.getItem('nickName'))
    		$(".l_sesame_head_nam span").text(sessionStorage.getItem('customerCode'));
    		$(".l_sesame_head_img img").attr('src',sessionStorage.getItem('photo'));
    		
	    	
    		
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
	                //支付宝
	                $(".weixin").css("display","none")
	                cashInWay=3;
	                sessionStorage.setItem('cashInWay',cashInWay);
	                
	            }else{
	                $('.l_money em').show();
	                //微信
	                 $(".weixin").css("display","block")
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
	    		
		        $.post(base_url +"/api/pay/insertCashIn",{
		        	"customerId":customerId,
		        	"amt":amt,
		        	"sourceType":cashInWay,
		        	"cashInWay":2
		        },function(data){
		        	//console.log(data)
		        	if(data.result==true&&data.code==0){
		        		//sessionStorage.setItem('cashInId',data.data.cashInId);
		        		var cashInId = data.data.cashInId
		        			if( cashInWay == 2){
		        				//console.log(cashInId)
		        				$.post(base_url +"/api/pay/aliWebPay",{"orderId":cashInId},
		        				function(data){
		        					//console.log(data)
		        					if(data.result==true&&data.code==0){
		        						sessionStorage.setItem('result',data.data.result);
		        						var result = sessionStorage.getItem('result')
										$(".l_recharge").empty();
										$(".close_prompt").append(result)

										//window.location.href = "paysecc.html?"+encodeURI(customerId); 
		
		        					} else {
		        						alert(充值失败);
		        						window.location.href = "pay.html"
		        					}
		        				})
		        			} else if(cashInWay == 3) {
		        				//console.log(cashInId)
		        				$.post(base_url +"/api/pay/weixinWebPay",{"orderId":cashInId,"ipv4":"196.168.1.157"},function(data){
		        					
		        					if(data.result==true&&data.code==0){
		        						$.post(base_url +"/api/pay/QRcode",{
		        							"codeUrl":data.data.code_url,
		        							"customerId":customerId
		        						},function(data){
		        							//console.log(data)
		        							if(data.result==true&&data.code==0){
		        								$("#weixinWebPay").css("display","block")
		        								$("#weixinWebPay").css("display","block")
		        								$("#weixinWebPayshow").attr('src',data.data)
		        								$("#weixinerq_qier").text(amt)
		        							}
		        						})
		        						//http://192.168.1.57:8080/api/cashIn/QRcode？codeUrl=&customerId=
			        					
		        					} else {
		        						alert(充值失败);
		        						window.location.href = "pay.html"
		        					}
		        				})
		        			}
		        	} 
		        	
		        })
			})
	        
    		}else{
    		window.location.href="login.html";
    	}
    	
		var cashInId = sessionStorage.getItem('cashInId');
		var datetime = Date.parse(new Date());
		$.get(base_url +"/api/account/getMyWallet",{
			"customerId":customerId,
			"datetime":datetime,
			"targetCustomerId":cashInId
		},function(data){
			//console.log(data)
		})
        
    });