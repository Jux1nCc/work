$(document).ready(function(){

//-------------------------------------
font_size(750);
function font_size(devwidth){
function _size(){
var deviceWidth = document.documentElement.clientWidth;
if(deviceWidth>=devwidth) deviceWidth=devwidth;
document.documentElement.style.fontSize = deviceWidth / (devwidth/100) + 'px';
}
_size();
window.onresize=function(){
	_size();
};
}
//-------------------------------------

$('.ohei').height($(window).height());
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
function imgauto(obj){//  图片适应
		$(obj).each(function(index, element) {
       		$(this).width($(this).width()/100+"rem");
	  	 });
	}
function checkbox(obj){
 $(obj).click(function(){
	 	if($(this).find("input[type='checkbox']").is(':checked')==true){
					$(this).parents('li').addClass('acti');
				}else{
						$(this).parents('li').removeClass('acti');
					}
	 })
}
function cli_cgimg(obj){
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

function replaimg(obj){//click变颜色的图标 1.移上去的对象
$('.tbas').hide();
tee=0;
$('.tbas').eq(tee).show();
	$(obj).click(function(){
			$(obj).eq(tee).removeClass('acti');
			$('.tbas').eq(tee).hide();
			var path_img=$(obj).eq(tee).find('img').attr('src');
			var new_path=path_img.replace("-1.",".");
			$(obj).eq(tee).find('img').attr('src',new_path);
			
			$(this).addClass('acti');
			var path_img=$(this).find('img').attr('src');
			var new_path=path_img.replace(".","-1.");
			$(this).find('img').attr('src',new_path);	
			
			tee=$(this).index();		
			$('.tbas').eq(tee).show();
		})
	}



//downslide(".banner .cirl ul li.acti",".banner .cirl ul li",'acti','.banner .bann ul li','.swiper-container');
function downslide(cilr,cilra,classname,downmove,main){//轮播图 说明：swiper-container   swiper-wrapper   swiper-slide
$(window).resize(function(){
				autowite();
			});
autowite();
function autowite(){
		var tabsSwiper = new Swiper(main,{
		speed:500,
		autoplay:5000,
		autoplayDisableOnInteraction : false,
		onSlideChangeStart: function(){
			$(cilr).removeClass(classname);
			
			$(cilra).eq(tabsSwiper.activeIndex).addClass(classname)  ;
		}
	});
	
	$(main).css({"overflow":"hidden"});
	$(cilra).on('touchstart mousedown',function(e){
		e.preventDefault();
		$(cilr).removeClass(classname);
		$(this).addClass(classname);
		tabsSwiper.slideTo( $(this).index() );
	});
	$(cilra).click(function(e){
		e.preventDefault();
	});

	var bwid=$('body').width();
	var bhei=$('body').height();
	var obj_len=$(downmove).length;
	
	for(var j=0;j<obj_len;j++){
			if(bwid>519){
				$(downmove).eq(j).css({"left":$(downmove).eq(j).width()*j+"px"});
			}else{
				$(downmove).eq(j).css({"left":bwid*j+"px"});
				}
		}
	}
}

function tabs_cg(Oobj,Otabch,event){//选项卡切换  1.点击的对象  2.切换的的对象  3.事件
	$(Otabch).hide();
	$(Otabch).first().fadeIn();
		$(Oobj)[event](function(){
				$(this).addClass('acti').siblings().removeClass('acti');
				$(Otabch).hide();
				$(Otabch).eq($(this).index()).show();
			});
}

//img_auto('.banner',750,388);
//img_auto('.list ul li .pict',340,200,1);
function img_auto(obj,wite,heit,ted,valut){//轮播图调整大小  1.外层Div  2.数值
		valut=heit/wite;
		$(window).resize(function(){
				abc();
			});
			abc();
			
		function abc(){
				if (ted==1){
					var widt=$(obj).width();
					if(widt>wite){
						$(obj).height(heit+"px");
					}else{
							$(obj).height(valut*widt+"px");
						}
				}else{
				var widt=$('body').width();
				if(widt>wite){
					$(obj).height(heit+"px");
					} else{
							$(obj).height(valut*widt+"px");
						}
			}}
	}
	
function hide(obj,value){//隐藏对象  1.要隐藏的对象  2.滚动条的值
   $(window).scroll(function(){
    var et=$(window).scrollTop();
    if(et>value){
        $(obj).fadeIn();
    }else{
        $(obj).fadeOut();
    }
   }) ;
} 

function Progressbar(obj){
	$(obj).each(function(index, element) {
        valuet=parseInt($(this).text())/15;
		$(this).animate({"width":valuet+"%"},800);
	});
};

})