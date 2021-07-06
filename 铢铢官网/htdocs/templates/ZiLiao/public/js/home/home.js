//$(document).ready(function(){
//	
//	$("#top_title_nav").on("click", ".Page_jump",function(){
//		
//		if (sessionStorage.getItem('customerId') != null) {
//			alert("请先登录");
//			window.location.href="Login.html"
//		}
//		
//	})
//	
//	
//	
//	
//})

$(function(){
    carousel3D();
    
    $(".hovereffect_btn").on("click",".butn2",function(){
		$(".hot2_less").css("display","none");
		$(".download2").css("display","block");
		
	})
    
    $(".hovereffect_btn").on("click",".butn3",function(){
			$(".hot3_less").css("display","none");
			$(".download3").css("display","block");
			
			
		})
    
    $(".hovereffect_btn").on("click",".butn4",function(){
			$(".hot4_less").css("display","none");
			$(".download4").css("display","block");
			
			
		})
    
    $(".hovereffect_btn").on("click",".butn5",function(){
			$(".hot5_less").css("display","none");
			$(".download5").css("display","block");
			
			
		})
    
    $(".hovereffect_btn").on("click",".butn6",function(){
			$(".hot6_less").css("display","none");
			$(".download6").css("display","block");
			
			
		})
    
})
var carousel3D=function(){
	var timer;
	var next = document.getElementById('next')
    var cArr=[], $li=$(".field_box li"),ln=$li.length;
    for(i=0;i<ln;i++){
        cArr.push('p1');
    }
    cArr[0]='p4';
    cArr[1]='p3';
    cArr[2]='p2';
   $li.each(function(i,e){
        $(e).removeClass().addClass(cArr[i]);
    })
   $('.field_box .title').text($('.field_box .p3').attr('data-t'));
    $(".field_box .next").click(
        function(){
        nextimg();
        }
    )
    $(".field_box .prev").click(
        function(){
        previmg();
        }
    )   
    //点击class为p2的元素触发上一张照片的函数
    $(document).on("click",".field_box .p2",function(){
        previmg();
        return false;//返回一个false值，让a标签不跳转
    });
    //点击class为p4的元素触发下一张照片的函数
    $(document).on("click",".field_box .p4",function(){
        nextimg();
        return false;
    });
    //上一张
    function previmg(){
        cArr.unshift(cArr[ln-1]);
        cArr.pop();
        //i是元素的索引，从0开始
        //e为当前处理的元素
        //each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
        $li.each(function(i,e){
            $(e).removeClass().addClass(cArr[i]);
        }) 
        show();
    }

    //下一张
    function nextimg(){
        cArr.push(cArr[0]);
        cArr.shift();
        $li.each(function(i,e){
            $(e).removeClass().addClass(cArr[i]);
        })
        show();
    }
     function play(){
	 timer=setInterval(function(){
	 //next.onclick();
	 },150);
	 }
	play();
    
    function show(){
        $('.field_box .title').text($('.field_box .p3').attr('data-t'));
    }
}






