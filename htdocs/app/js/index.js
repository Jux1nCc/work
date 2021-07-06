var box = document.getElementById("box");

var inner = box.children[0];;
var ulObj = inner.children[0];
var list = ulObj.children;
var olObj = inner.children[1];
var imgWidth = inner.offsetWidth;
var pic = 0;
//根据li个数，创建小按钮 导航按钮
for(var i = 0; i < list.length; i++) {
	var liObj = document.createElement("li");
	olObj.appendChild(liObj);
	liObj.innerText = (i + 1);
	liObj.setAttribute("index", i);
	//为按钮注册mouseover事件
	liObj.onmouseover = function() {
		//先清除所有按钮的样式
		for(var j = 0; j < olObj.children.length; j++) {
			olObj.children[j].removeAttribute("class");
		}
		this.className = "current";
		pic = this.getAttribute("index");
		animate(ulObj, -pic * imgWidth);
	}
}

//设置ol中第一个li有背景颜色
olObj.children[0].className = "current";
//克隆一个ul中第一个li,加入到ul中的最后=====克隆
var addpendChild = '<li class="swiper-slide1"><p>牵守</p><div class="flexslider" id="banner_tuliao_end"><ul class="slides"><li><a title="" target="_blank" href="#"><img src="../images/03.png"></a></li><li><a title="" href="#"><img src="../images/02.png"></a></li><li><a title="" href="#"><img src="../images/01.png"></a></li></ul></div></li>'
$('.inner>ul').append(addpendChild)
var timeId = setInterval(onmouseclickHandle, 15000);
function onmouseclickHandle() {
	//如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
	//所以,如果用户再次点击按钮,用户应该看到第二个图片
	if(pic == list.length - 1) {
		//如何从第6个图,跳转到第一个图
		pic = 0; //先设置pic=0
		ulObj.style.left = 0 + "px"; //把ul的位置还原成开始的默认位置
	}
	pic++; //立刻设置pic加1,那么此时用户就会看到第二个图片了
	animate(ulObj, -pic * imgWidth); //pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
	//如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
	if(pic == list.length - 1) {
		//第五个按钮颜色干掉
		olObj.children[olObj.children.length - 1].className = "";
		//第一个按钮颜色设置上
		olObj.children[0].className = "current";
	} else {
		//干掉所有的小按钮的背景颜色
		for(var i = 0; i < olObj.children.length; i++) {
			olObj.children[i].removeAttribute("class");
		}
		olObj.children[pic].className = "current";
	}
}

left.onclick = function() {
	if(pic == 0) {
		pic = list.length - 1;
		ulObj.style.left = -pic * imgWidth + "px";
	}
	pic--;
	animate(ulObj, -pic * imgWidth);
	for(var i = 0; i < olObj.children.length; i++) {
		olObj.children[i].removeAttribute("class");
	}
	//当前的pic索引对应的按钮设置颜色
	olObj.children[pic].className = "current";
}

;
//设置任意的一个元素,移动到指定的目标位置
function animate(element, target) {
	clearInterval(element.timeId);
	//定时器的id值存储到对象的一个属性中
	element.timeId = setInterval(function() {
		//获取元素的当前的位置,数字类型
		var current = element.offsetLeft;
		//每次移动的距离
		var step = 10;
		step = current < target ? step : -step;
		//当前移动到位置
		current += step;
		if(Math.abs(current - target) > Math.abs(step)) {
			element.style.left = current + "px";
		} else {
			//清理定时器
			clearInterval(element.timeId);
			//直接到达目标
			element.style.left = target + "px";
		}
	}, 10);
}
$(function() {
	var bannerSlider = new Slider($('#banner_tabs'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});

	var bannerSlider = new Slider($('#banner_jernal'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});

	var bannerSlider = new Slider($('.banner_tabs'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});

	var bannerSlider = new Slider($('#banner_tuliao'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});

	var bannerSlider = new Slider($('#banner_tuliao_end'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});

})