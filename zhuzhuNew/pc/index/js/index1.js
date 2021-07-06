$(document).ready(function () {

	$("nav>ul>li").click(function () {
		$(this).addClass("choose").siblings().removeClass("choose");
	})
})
var mySwiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	// effect : 'fade',
	mousewheel: {
		releaseOnEdges: true,
	},
	speed: 500,
	pagination: {
		el: '.choose',
		clickable: true,
	},
	slidesPerView: 1,//3列,
	on: {
		init: function () {
			$('footer').css('display', 'none')
		},
		slideChange: function () {
			if (this.activeIndex != 0) {
				$('footer').css('display', 'block')
			} else {
				$('footer').css('display', 'none')
			}
		},
	}
})

//如果你在swiper初始化后才决定使用clickable，可以这样设置
mySwiper.params.pagination.clickable = true;
//此外还需要重新初始化pagination
mySwiper.pagination.destroy()
mySwiper.pagination.init()
mySwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');