$(function() {

	if(navigator.userAgent.indexOf('.MSIE') > 0) {
		$(".l_sesame_con").on("input propertychange", "#Unam", function() {
			funzz.inputdelay("Unam", "真实姓名");
		});

		$(".l_sesame_con").on("input propertychange", "#Upha", function() {
			funzz.inputdelay("Upha", "支付宝账户");
		});

	} else {
		$(".l_sesame_con").on("input oninput", "#Unam", function() {
			funzz.inputdelay("Unam", "真实姓名");
		})

		$(".l_sesame_con").on("input oninput", "#Upha", function() {
			funzz.inputdelay("Upha", "支付宝账户");
		})
	}

	$(".l_header_back").click(function() {
		sessionStorage.clear()
		window.location.href = "login.html";
	})
	console.log(sessionStorage.getItem('customerId'))
	var customerId = sessionStorage.getItem('customerId')
	if( customerId != null) {
		$.get(base_url +"/api/cashOut/findMyCapital", {
			"customerId": sessionStorage.getItem('customerId')
		}, function(data) {
			console.log(data);
			
			sessionStorage.setItem("gainsBal", data.data.gainsBal) //可提现收益
			sessionStorage.setItem("targetName", data.data.enterpriseName) //用户名
			sessionStorage.setItem("mobile", data.data.mobile)
			sessionStorage.setItem("photo", data.data.photo)
			if(data.data.enterpriseName == null) {
				$('#Unam').attr("placeholder", "请输入真实姓名")
			} else {
				$('#Unam').val(sessionStorage.getItem('targetName')); //姓名
			}
			$('.Upha').val(sessionStorage.getItem('targetAcct')); //支付宝账号
			$('#Upha').attr("placeholder", "请输入支付宝账号")
			$(".l_sesame_head_nam > p").html(data.data.nickName); //昵称
			$(".l_sesame_head_nam h2 span").html(data.data.customerCode); //咨聊id
			$(".l_pay_balan p span").html(data.data.gainsBal); //可提现金额
			$('#l_sesame_img').attr('src', data.data.photo)
			// 	        	$('.l_sesame_head_img img').attr("src",data.data.photo)
			var mobile = sessionStorage.getItem("mobile")

			var mobile = "发送到" + data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11);
			$(".Ucod").attr('placeholder', mobile);
		});

	} else {
		window.location.href = "login.html";
	}

	//支付方式选择
	$('.l_recharge_con1 ul li').click(function() {
		$(this).addClass('on').siblings().removeClass('on');
	});
	//充值金额币选择
	$('.l_recharge_con2 .l_money').click(function() {
		$(this).parent('li').addClass('on').siblings().removeClass('on');
	});

	//点击提现规则跳锚点
	$('#scroll_l').click(function() {
		var height = $('.l_withd_rule').offset().top;
		$('body,html').animate({
			scrollTop: height - 150
		}, 500);
	});

	//点击获取验证码
	$('#btninfo').click(function() {
		var phone = sessionStorage.getItem('mobile');
		//console.log(phone)
		//      	alert(phone);
		//      	$.post("http://192.168.1.41:9090/api/validateCode/sendCode",{"account":phone,"specifier":4},function(data){
		//      		//specifier   0.注册，1.登录确认，2.忘记密码，4.活动，5.身份验证，6.提现，8.绑定手机，9.异常登录10.修改手机号，11.绑定邮箱，12.修改邮箱
		//      		console.log(data)
		//      		if(data.code==0&&result==true){settime($(this));
		//      			$(".l_withd_code button").html("发送成功");
		//      		}
		//      	})
		$.post(base_url +"/api/validateCode/sendCode", {
			"customerId": sessionStorage.getItem('customerId'),
			"account": phone,
			"specifier": 6
		}, function(data) {
			//specifier   0.注册，1.登录确认，2.忘记密码，4.活动，5.身份验证，6.提现，8.绑定手机，9.异常登录10.修改手机号，11.绑定邮箱，12.修改邮箱
			//console.log(data)
			if(0 == data.code) {
				$(".l_withd_code button").html("发送成功");
			} else {
				alert(data.message)
			}
		})
		var id = document.getElementById('btninfo');
		settime(id, $(this));

	})

	//输入提现金额触发事件
	$(".Uwit").bind("input propertychange", function() {
		var Uwit = $('.Uwit').val(); //输入框输入的值
		//获取可提现收益
		var cashAmt = sessionStorage.getItem('gainsBal'); //可提现金额
		if(parseInt(Uwit) > parseInt(cashAmt)) {
			funzz.tixian();
		} else {

			if(Uwit <= 2) {
				$(".Umon").val("0");
			}
			if(cashAmt < 50) {
				alert("可提现余额不足")
				$(".Uwit").val("0.00");
				$(".Umon").val("0.00");
			} else {
				if(Uwit < 50 && Uwit > 2) {
					$(".Umon").val(new Number(Uwit - 2).toFixed(2));
				}
				if(Uwit > 5000) {
					$(".Uwit").val("5000")
					$(".Umon").val(4975);
				}
				//正常计算提现费用
				if(Uwit >= 50 && Uwit <= 5000) {
					var money = Uwit * 0.005;
					if(money <= 2) {
						//      				$(".Umon").attr("placeholder",2+"元")
						$(".Umon").val(new Number(Uwit - 2).toFixed(2));
					}
					if(money >= 25) {
						//      				$(".Umon").attr("placeholder",25+"元")
						$(".Umon").val(new Number(Uwit - 25).toFixed(2));
					}
					if(money > 2 && money < 25) {

						money = Math.round(parseFloat(money) * 100) / 100;
						if(money.toString().indexOf(".") < 0) {
							money = money.toString() + ".00";
						}

						//      				$(".Umon").attr("placeholder",money+"元")
						$(".Umon").val(new Number(Uwit - money).toFixed(2));
					}
				}
			}
		}
		//      	$(".Umon").attr("placeholder",11+"元")

	});
	//点击全部提现
	$(".l_withd_tx").click(function() {
		//获取可提现收益
		funzz.tixian();
	});

	//点击请求认证
	$('.l_public_btn').click(function() {
		var Unam = $('#Unam').val(); //姓名
		var Upha = $('#Upha').val(); //支付宝账号
		var Ucod = $(".Ucod").val(); //验证码
		var Uwit = $('.Uwit').val(); //提现聊币
		var Umon = $(".Umon").val(); //实际到账金额

		//校验验证码
		$.post(base_url +"/api/validateCode/check", {
			"account": sessionStorage.getItem('mobile'),
			"specifier": 6,
			"code": Ucod,
			"customerId": sessionStorage.getItem('customerId'),
		}, function(data) {
			//console.log(data)
			if(data.result == false) {
				var str = data.message
				funzz.promptmsg(str);
			} else {
				//验证通过，提现
				var reg = /\S/;
				if((!reg.test(Unam)) || (!reg.test(Upha))) {
					var str = "姓名支付宝账号不能为空";
					funzz.promptmsg(str);
					return;
				} else {
					$.post(base_url +"/api/cashOut/addWithZhiFuBao", {
						"customerId": sessionStorage.getItem('customerId'),
						"amt": Uwit,
						"targetAcct": sessionStorage.getItem('mobile'),
						"targetName": Unam,
						"TargetType": 2
					}, function(data) {
						//console.log(data)
						if(data.result == true) {
							var str = "提现成功";
							funzz.layermsg(lay, str);
						} else {
							var str = data.message;
							funzz.promptmsg(str);
						}
					})
				}
			}
		});

	})

	funzz = {
		layermsg: function(lay, str) {
			layer.msg(str, {
				title: false,
				time: 20000, //20s后自动关闭
				area: ['300px', '150px'],
				btn: ['关闭'],
				content: '<div style="padding-top: 50px">' + str + '</div>',
				btnAlign: 'c', //按钮居中
				end: function() {
					location.reload();
				}
			})
		},
		tixian: function() {
			var cashAmt = sessionStorage.getItem('gainsBal');
			if(cashAmt < 50) {
				alert("可提现余额不足");
				$(".Uwit").val("0.00");
				$(".Uwit").val("0.00");
			}
			if(cashAmt > 5000) {
				$(".Uwit").val("5000.00");
				$(".Umon").val(4975);
			}
			if(cashAmt >= 50 && cashAmt <= 5000) {
				var money = cashAmt * 0.005;

				if(money >= 2 && money <= 25) {
					$(".Uwit").val(cashAmt);
					$(".Umon").val(new Number(cashAmt - money).toFixed(2));
				}
				if(money < 2) {
					$(".Uwit").val(cashAmt);
					$(".Umon").val(new Number(cashAmt - 2).toFixed(2));
				}
				if(money > 25) {
					$(".Uwit").val("5000");
					$(".Umon").val(new Number(cashAmt - 25).toFixed(2));
				}
			}
		},
		promptmsg: function(str) {
			layer.msg(str, {
				title: false,
				time: false, //20s后自动关闭
				area: ['300px', '150px'],
				btn: ['关闭'],
				content: '<div style="padding-top: 50px">' + str + '</div>',
				btnAlign: 'c', //按钮居中
				end: function() {
					//location.reload();
				}
			})
		},

		inputdelay: function(inputid, sqlid) {
			try {
				if($("#" + inputid).val() == "") {
					$("#" + inputid + "hint").html(sqlid + "不能为空")
				} else {
					$("#" + inputid + "hint").html("")
				}
			} catch(e) {
				console.log(e);
			}
		},
	}

});

var countdown = 60; 
function settime(id, obj) { 
	//console.log(obj)
	if(countdown == 0) {   
		obj.attr("disabled", false);       
		id.value = "获取验证码";     
		countdown = 60;     
		return;  
	} else {    
		obj.attr("disabled", true);  //给input添加 disabled
		id.value = "重新发送(" + countdown + ")";     
		countdown--;   
	} 
	setTimeout(function() {   
		settime(id, obj)   
	}, 1000)

}