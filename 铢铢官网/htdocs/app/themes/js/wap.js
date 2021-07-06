$(window).scroll(function () {
var pos = $(window).scrollTop();
if (pos > 870) {
$('.fixed').fadeIn("slow");
}else{
$('.fixed').fadeOut("slow");
}
});
$(".teamsbox li:last").css("border-bottom","none")
$(".screenshots_list .section:first").css("margin-top","0%")
$(document).ready(function(){
/*菜单展开*/
$("#wap #header .wap_menu").click(function(){
	$(".wap_menulist").toggle();
	
	});
$(".num").text(function(index) {
  return (index + 1);
});

	
$(".scenario_list li:first").css("margin-top","0");
/* 视频 弹出*/
var video_url=$(".reveal_bg").html()
 $(".wap_video .img").click(function(){
	 $(".reveal_bg").show();
	 });
  
  $(".reveal_bg").click(function(){
	  $(".reveal_bg").hide();
	  $(".reveal_bg").html("");
	  $(".reveal_bg").html(video_url);
	  });

/*邀你看*/
  var mySwiper = new Swiper('.swiper-container',{
    pagination: '.pagination',
    loop:true,
    grabCursor: true,
    paginationClickable: true
  })
  $('.arrow-left').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-right').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })

/*千里眼*/
  var mySwiper = new Swiper('.swiper-containereye',{
    pagination: '.paginationeye',
    loop:true,
    grabCursor: true,
    paginationClickable: true
  })
  $('.arrow-lefteye').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-righteye').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })
/*消息*/
  var mySwiper = new Swiper('.swiper-containermessage',{
    pagination: '.paginationmessage',
    loop:true,
    grabCursor: true,
    paginationClickable: true
  })
  $('.arrow-leftmessage').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-rightmessage').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })
/*通讯录*/
  var mySwiper = new Swiper('.swiper-containeraddress',{
    pagination: '.paginationaddress',
    loop:true,
    grabCursor: true,
    paginationClickable: true
  })
  $('.arrow-leftaddress').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-rightaddress').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })


/*我*/
  var mySwiper = new Swiper('.swiper-containeri',{
    pagination: '.paginationi',
    loop:true,
    grabCursor: true,
    paginationClickable: true
  })
  $('.arrow-lefti').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  $('.arrow-righti').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })
/* 返回顶部*/
    $(".wap_totop").hide(); 
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失 
      $(window).scroll(function() { 
        if ($(window).scrollTop() > 500) { 
          $(".wap_totop").fadeIn(1500); 
        } else { 
          $(".wap_totop").fadeOut(1500); 
        } 
      }); 
      //当点击跳转链接后，回到页面顶部位置 
      $(".wap_totop").click(function() { 
        $('body,html').animate({ 
          scrollTop: 0 
        }, 
        1000); 
        return false; 
      }); 
/* 返回顶部*/
    $(".foot_down").hide(); 
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失 
      $(window).scroll(function() { 
        if ($(window).scrollTop() >30) { 
          $(".foot_down").fadeIn(1500); 
        } else { 
          $(".foot_down").fadeOut(1500); 
        } 
      }); 
      //当点击跳转链接后，回到页面顶部位置 
      $(".foot_down").click(function() { 
        $('body,html').animate({ 
          scrollTop: 0 
        }, 
        1000); 
        return false; 
      }); 
	  
	  
	  
	  

});
	
