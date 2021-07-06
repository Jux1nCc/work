$(document).ready(function(){
	// $(".temp").click(function(){
	// 	window.location.href="squares.html"
	// })
	$("nav>div>ul>li").hover(function(){
		$(this).addClass("pg");
	},function(){
		$(this).removeClass("pg")
	})
})