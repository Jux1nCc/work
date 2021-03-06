/*
	JavaScript封装:
	
	1. Countdown(obj,classname,num)    //倒计时  1.点击的对象  2.类  3.数值
	
	2. autotop(obj,ops,valt)    //垂直翻滚 1.li集合  2.距离  3.个数
	
	3. click_cgimg(obj,index,imgname)    //切换图片  1.对象  2.索引值  3.图片名称
	
	4. click_addname(obj,className,allt)    //给对象添加类  1.点击的对象  2.类名  3.是否清除所有-非零[可选]
	
	5. slideshow(click_show,obj_open,class_name)    //三级菜单展开  1.点击的对象  2.展开的对象  3.添加类名旋转图标
	
	6. suspension(click_obj,move_obj,distance,className)    //悬浮  1.点击的对象  2.移动的对象  3.距离右边的数值 4.类名
	
	7. full_screen(number,click_left,click_right,click_cirl)    //全屏左右滚动轮播 1.数量  2.左点击  2.右点击  3.小圆点点击
	
	8. autobox(obj,oble,value,pase)    //居中 1.对象  2. 0-[左边] 1-[右边]  3.宽度  4.偏移量
	
	9. Cutimg(obj)    //裁图后 垂直水平居中  1.图片对象
	
	10. eject(hover_obj,hide_obj)    //弹出菜单  1.移上去的对象  2.隐藏的对象
	
	11. replaimg(obj)    //HOVER变颜色的图标 1.移上去的对象
	
	12. scrollTop(obj_fixed,ClassName,value)    //当元素滚动到一定时就固定定位  1.定位的对象  2.加入一个类  3.默认值不可更改
	
	13. tabs_cg(Oobj,Otabch,event,ClassName,Find,level){//选项卡切换  1.点击的对象  2.切换的的对象  3.事件   4.类名  5.查找下一级   6.如果Find实参存在,缺少值是为 1
	
	14. two_scroll(number,cli_left,cli_right,click_cirl,textp,ovalue,ots){//滚动轮播 1.元素的个数	2.左点击对象	3.右点击对象	4.小圆点对击对象[可选项] 5.文字变化 6.滚动的距离[必选项] 7.滚动的个数[必选项]
	
	15. down_drop(a,b,c)    //下拉列表	1.点击获取文本内容  2.点击对像显示下拉  3.下拉这个Div对像
	
	16. fade(banner,cirl,timer,click_left,click_right)    //淡入淡出轮播  1.切换的对像	2.小圆点控制的对像	 3.时间值[必选]  4.左点击  5.右点击
	
	17. cli_cgimg(obj) //点击图标状态切换  1.点击的对象
	
	18. checkbox(obj,findbel){//复选框
	
	19.cli_cgpic(obj)  //按下图标切换
	
	匹配正则:
	
	一、letter(str_par)	[密码必须由6-15位数字加字母组成]
	二、number(str_par)	[账号由6-15位字符串组成]
	三、CheckMail(mail)	[邮箱正则]
	四、checkPhone()		[手机号正则] #phone
	
*/

function addInput(obj){//复选框选择
	$(obj).click(function(){
		if($(this).find("input[type='checkbox']").is(':checked')==true){
					$(this).find("input").addClass("check");
				}else{
						$(this).find("input").removeClass("check");
					}
	});
};
function checkbox(obj,findbel){//复选框
		$(obj).click(function(){
			if($(this).find("input[type='checkbox']").is(':checked')==true){
					$(this).find(findbel).show();
				}else{
						$(this).find(findbel).hide();
					}
		})	;
		}
		
function cli_cgpic(obj){//两色图标切换   cli_cgpic(".list ul li h2");
$(obj).click(function(){
		if($(this).attr("ter")=="1"){
            var path_img=$(this).find('img').attr('src');
			var new_path=path_img.replace("-1.",".");
			$(this).find('img').attr('src',new_path);
			$(this).attr("ter","0");
		}else{
		var path_img=$(this).find('img').attr('src');
		var new_path=path_img.replace(".","-1.");
		$(this).find('img').attr('src',new_path);
		$(this).attr("ter","1");
		}
	})
}

function checkPhone(){ 
    var phone = document.getElementById('phone').value;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){ 
        alert("手机号码有误，请重填");  
        return false; 
    }
}
function Countdown(obj,classname,num){//倒计时  1.点击的对象  2.类  3.数值
	var jte=num;
	var tee=null;
	$(obj).click(function(){
			$(this).addClass(classname);
			 tee=setInterval(function(){
				jte--;
			if(jte<=0) {$(obj).removeClass(classname).text('获取短信验证码');jte=60;}
			$(obj+'.'+classname).text('重新发送('+jte+')');
		},1000);
		})
}

function  autotop(obj,ops,valt){//垂直翻滚 1.li集合  2.距离  3.个数 autotop('.main_push .center_con ul',106,3)
	var eft=0;
	setInterval(ett,3000);
	$(obj).css({"position":"absolute"})
	var oelnt=$(obj).find('li').length;

	function ett(){
		eft++
		if(eft>oelnt-valt) eft=0;
		$(obj).animate({"top":-eft*ops+"px"},600);		
	}
}
cli_cgimg(".top .list_ico ul li");
function cli_cgimg(obj){
$(obj).click(function(){
		$(obj).each(function(index, element) {
            var path_img=$(this).find('img').attr('src');
			var new_path=path_img.replace("-1.",".");
			$(this).find('img').attr('src',new_path);
        });
		var path_img=$(this).find('img').attr('src');
		var new_path=path_img.replace(".","-1.");
		$(this).find('img').attr('src',new_path);
		
	})
}
function click_cgimg(obj,index,imgname){//切换图片  1.对象  2.索引值  3.图片名称
	$(obj).eq(index).click(function(){
	if($(this).attr('adimg')=="1"){
			$(this).attr('adimg','0');
			$(this).find('img').attr("src","img/"+imgname+".png");
		}else{
				$(this).find('img').attr("src","img/"+imgname+"-1.png");
				$(this).attr('adimg','1');
			}
	})
}
	

function click_addname(obj,className,allt){//给对象添加类  1.点击的对象  2.类名  3.是否清除所有-非零[可选] 
		if(allt>0){
		$(obj).click(function(){
				$(obj).removeClass(className);
				$(this).addClass(className);
			})
			}else{
					$(obj).click(function(){
					$(this).addClass(className).siblings().removeClass(className);				
			})
				}
	}

function slideshow(click_show,obj_open,class_name){//三级菜单展开  1.点击的对象  2.展开的对象  3.添加类名旋转图标
$(click_show).click(function(){
		if($(this).attr('true')=="1"){
			$(this).parent().find(obj_open).slideUp();
			$(this).removeClass(class_name);
			$(this).attr('true',"0");
		}else{
				$(this).parent().find(obj_open).slideDown();
				$(this).addClass(class_name);
				$(this).attr('true',"1");
			}
	})
}

function suspension(click_obj,move_obj,distance,className){//悬浮  1.点击的对象  2.移动的对象  3.距离右边的数值 4.类名 
$(click_obj).click(function(){
		
		if($(this).attr('open')=='1'){
				$(move_obj).animate({'right':-$(move_obj).width()-2+"px"},600,'swing');
				$(this).attr('open','0');
				$(this).removeClass(className);
			}else{
					$(this).addClass(className);
					$(move_obj).animate({'right':distance+"px"},600,'swing');
					$(this).attr('open','1');
				}
	})
}


function letter(str_par){//密码必须由6-15位数字加字母组成
		var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
		if(reg.test($(str_par).val())){
			//alert("密码PASS通过");
		}else{
			$(str_par).parent().find('b').slideDown();
			$(str_par).focus(function(){
			 	$(this).parent().find('b').slideUp();
			 })
			
			}
	}
	function number(str_par){//账号由6-15位字符串组成
		var reg=/^[a-zA-Z0-9]{6,15}$/
		if(reg.test($(str_par).val())){
			//alert("账号PASS通过");
		}else{
			$(str_par).parent().find('b').slideDown();
			$(str_par).focus(function(){
			 	$(this).parent().find('b').slideUp();
			 })
			}
	}
	function CheckMail(mail) {//邮箱正则
		 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		 if (filter.test($(mail).val())) return true;
		 else {
		 //alert('您的电子邮件格式不正确');
		 $(mail).parent().find('b').slideDown();
		 $(mail).focus(function(){
			 	$(this).parent().find('b').slideUp();
			 })
		 return false;}
	}

		
function full_screen(number,click_left,click_right,click_cirl){//全屏左右滚动轮播 1.数量  2.左点击  2.右点击  3.小圆点点击
var olen1=$(number).length;
var timer=0;
var bowidth1=$('body').width();
$(number).parent().width(bowidth1*olen1+"px");
var thinde1=0;

$(number).css("width",bowidth1+"px");

for(var j=0;j<olen1;j++){
		$(number).eq(j).css("left",j*bowidth1+"px");
	}
$(click_right).click(function(){
		thinde1++;
		if(thinde1<olen1){
		$(number).parent().animate({"left":-thinde1*bowidth1+"px"},600,"swing");}
	})
$(click_left).click(function(){
		if(thinde1>0){
			thinde1--;
		$(number).parent().animate({"left":-thinde1*bowidth1+"px"},600,"swing");
		}
	})
	
$(click_cirl).click(function(){
		thinde1=$(this).index();
		$(this).addClass('acti').siblings().removeClass('acti');
		$(number).parent().animate({"left":-thinde1*bowidth1+"px"},600,"swing");	
	})
timer=setInterval(autocroll,3000);
function autocroll(){
		thinde1++;
		if(thinde1>olen1-1) thinde1=0;
		
		$(click_cirl).eq(thinde1).addClass('acti').siblings().removeClass('acti');
		$(number).parent().animate({"left":-thinde1*bowidth1+"px"},600,"swing");		
	}
$(click_cirl).hover(function(){
		clearInterval(timer);
	},function(){
			timer=setInterval(autocroll,3000);
		})

}


function autobox(obj,oble,value,pase){//居中 1.对象  2. 0-[左边] 1-[右边]  3.宽度  4.偏移量
lrauto();
$(window).resize(function(){
		 lrauto();
	})
function lrauto(){
		var bwidt=$("body").width();
		if(oble==0){
				$(obj).css({left:(bwidt-value)/2+pase+"px"});
		}else{
			if(oble==1){
				$(obj).css({right:(bwidt-value)/2+pase+"px"})
				}
				else{
						alert('第二个传值出错！0是左 1是右');
					}
			}
	}
}

function Cutimg(obj){//裁图后 垂直水平居中  1.图片对象
autoimg()
$(window).resize(function(){
		 autoimg()
	})
function autoimg(){
		var widt=$(obj).parent().width();
		var heit=$(obj).parent().height();
		var img_wid=$(obj).width();
		var img_hei=$(obj).height();
		$(obj).css({"left":(widt-img_wid)/2+"px","top":(heit-img_hei)/2+"px","position":"absolute"});
		$(obj).parent().css({"position":"relative","overflow":"hidden"});
	}
}
function eject(hover_obj,hide_obj){//弹出菜单  1.移上去的对象  2.隐藏的对象
	$(hide_obj).hide();
	$(hover_obj).hover(function(){
		$(hide_obj).hide();
		$(hide_obj).eq($(this).index()).show();
	})
$(hide_obj).parent().hover(function(){
	
	},function(){
			$(hide_obj).fadeOut();
		})
}

function replaimg(obj){//HOVER变颜色的图标 1.移上去的对象
	$(obj).hover(function(){
			var path_img=$(this).find('img').attr('src');
			var new_path=path_img.replace(".","-1.");
			$(this).find('img').attr('src',new_path);			
		},function(){
			var path_img=$(this).find('img').attr('src');
			var new_path=path_img.replace("-1.",".");
			$(this).find('img').attr('src',new_path);
			})
	}

function scrollTop(obj_fixed,ClassName,value){//当元素滚动到一定时就固定定位  1.定位的对象  2.加入一个类  3.默认值不可更改
	$(window).scroll(function(){
			var valt=$(window).scrollTop();
			var top=$(obj_fixed).offset().top;
			if(value==1){
					value=top;
				}
			if(valt>value){
				$(obj_fixed).addClass(ClassName);
				}else{
				$(obj_fixed).removeClass(ClassName);
				}
		})
	}
	

function tabs_cg(Oobj,Otabch,event,ClassName,Find,level){//选项卡切换  1.点击的对象  2.切换的的对象  3.事件   4.类名  5.查找下一级   6.如果Find实参存在,缺少值是为 1  

	
	if(level==1){
			$(Oobj)[event](function(){
				var t=$(this).index();
				$(this).addClass(ClassName).siblings().removeClass(ClassName);
				$(this).parents(Otabch).find(Find).eq(t).show().siblings().hide();
			});
		}else{
				$(Otabch).hide();
				$(Otabch).first().show();
				$(Oobj)[event](function(){
					$(this).addClass(ClassName).siblings().removeClass(ClassName);
					$(Otabch).hide()
					$(Otabch).eq($(this).index()).show();
				})
			}
	
}

function two_scroll(number,cli_left,cli_right,click_cirl,textp){//滚动轮播 1.元素的个数	2.左点击对象	3.右点击对象	4.小圆点对击对象[可选项] 5.文字变化 6.滚动的距离[必选项] 7.滚动的个数[必选项]
	var olit=$(number).length;//元素的数量
	ots=parseInt($(number).parent().parent().width()/$(number).width());
	ovalue=$(number).width()+parseInt($(number).css("margin-left"));
	$(number).parent().css({"width":ovalue*olit+"px","position":"absolute"}).parent().css({"position":"relative","overflow":"hidden","height":$(number).height()});/*计算宽度*/
	var objscr=$(number).parent()//滚动的对像
	var j=0;//统计 
	var setotimer=null;//时间变量	
	setotimer=setInterval(orcroauto,3000);
	
	$(cli_left).hover(function(){
			clearInterval(setotimer);
		},function(){
			setotimer=setInterval(orcroauto,3000);
			})
	$(cli_right).hover(function(){
			clearInterval(setotimer);
		},function(){
			setotimer=setInterval(orcroauto,3000);
			})
	$(click_cirl).hover(function(){
			clearInterval(setotimer);
		},function(){
			setotimer=setInterval(orcroauto,3000);
			})
			
    $(cli_left).click(function(){
			j--;
			if(j<0){j=olit-ots}
			$(objscr).stop().animate({"left":-j*ovalue+"px"},600,"swing");
			$(click_cirl).eq(j).addClass('acti').siblings().removeClass('acti');
			$(textp).animate({"top":-j*$(textp).parent().height()+"px"});
		})
		
	$(cli_right).click(function(){
			orcroauto()
	})
	$(click_cirl).click(function(){
			j=$(this).index();
			$(objscr).stop().animate({"left":-j*ovalue+"px"},600,"swing");
			$(this).addClass('acti').siblings().removeClass('acti');
			$(textp).animate({"top":-j*$(textp).parent().height()+"px"});
			
		})
	function orcroauto(){
		j++;
		if(j>olit-ots){j=0}
		$(objscr).stop().animate({"left":-j*ovalue+"px"},600,"swing");
		$(click_cirl).eq(j).addClass('acti').siblings().removeClass('acti');
		$(textp).animate({"top":-j*$(textp).parent().height()+"px"});
		}
}

function down_drop(a,b,c){//下拉列表	1.点击获取文本内容  2.点击对像显示下拉  3.下拉这个Div对像
	$(a).click(function(){
				var text=$(this).text();
				$(this).parent().parent().find('input').val(text);
				$(this).parent().hide();
			})
		$(b).click(function(){
				$(this).parent().find(c).show();
			})
		
		$(a).parent().parent().hover(function(){
			
			},function(){
					$(this).find(c).hide();
				})
}

function fade(banner,cirl,timer,click_left,click_right){//淡入淡出轮播  1.切换的对像	2.小圆点控制的对像	 3.时间值[必选]  4.左点击  5.右点击
	var i=0;
	var Otimer=null;
	var olen=$(banner).length;
	$(banner).css("opacity","0");
	$(banner).eq(i).css("zIndex","1").animate({"opacity":"1"},600,'swing');
	$(cirl).click(function(){
			$(this).addClass('acti').siblings().removeClass('acti');
			i=$(this).index();
			$(banner).eq(i).css("zIndex","1").animate({"opacity":"1"},600,'swing').siblings().css("zIndex","0").animate({"opacity":"0"},600,'swing');
		})
	Otimer=setInterval(bann_auto,timer);
	function bann_auto(){
			i++;
			if(i>olen-1) i=0;
			$(cirl).eq(i).addClass('acti').siblings().removeClass('acti');
			$(banner).eq(i).css("zIndex","1").animate({"opacity":"1"},600,'swing').siblings().css("zIndex","0").animate({"opacity":"0"},600,'swing');
		}
	$(cirl).hover(function(){
			clearInterval(Otimer);	
		},function(){
			Otimer=setInterval(bann_auto,timer);
			})
	$(click_left).hover(function(){
			clearInterval(Otimer);	
		},function(){
			Otimer=setInterval(bann_auto,timer);
			})
	$(click_right).hover(function(){
			clearInterval(Otimer);	
		},function(){
			Otimer=setInterval(bann_auto,timer);
			})
	$(click_left).click(function(){
			i--;
			if(i<0) i=olen-1;
			$(cirl).eq(i).addClass('acti').siblings().removeClass('acti');
			$(banner).eq(i).css("zIndex","1").animate({"opacity":"1"},600,'swing').siblings().css("zIndex","0").animate({"opacity":"0"},600,'swing');
		})
		
	$(click_right).click(function(){
			bann_auto();
		})
	
}