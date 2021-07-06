$(document).ready(function() {
	
	Systeminfo();
	
	$(".l_header_back").click(function(){
		sessionStorage.clear()
		window.location.href="login.html";
	})
})

//加载页面
function newNotice(aid) {   
    var aidd = "#" + aid;//获取A标签点击的ID
    
    //$(this).attr('_href')
    var url = $(aidd).attr('_href')//获取自定义属性 _href的值
    //alert(url);
    $("#filling").attr("src", url);//更换iframe 的src 实现跳转
   

}


function courseClick(aid){
	newNotice(aid);
	fun.getAllCommentMessage();
	if(aid == "newsAlbum"){
		fun.getAllCommentMessage()
	}
	
}

//需要一个数组 只需要一个，因为每次切换的时候，必须要请求接口，看看有没有新的回复
var messageList = [];    //是这个吧
//页面信息加载
//系统消息
function Systeminfo(){
	//获取登录传过来的id
	var customerId = $("#customerId").text();
	customerId = sessionStorage.getItem('customerId');
	//console.log(customerId)
	
	//获取系统通知
	$.post("http://192.168.1.57:8080/api/messageSystem/getAllSystemMessage",{
		"customerId":customerId,
		"pageIndex" : 1,
		"pageItemCount": 10
	},function(data){
		console.log(data)
		if(data.data.length == ""){
			$("#System_list").append("数据为空");
		} else {
	
			var pageIndex = data.data.length;
			var customerId = sessionStorage.getItem('customerId');
			var page = 1;
			var customerId = sessionStorage.getItem('customerId');
			var totalPagr = parseInt(pageIndex / 4);
			var countNum = pageIndex % 4;
			var showNum = 4;
			if(countNum != 0) {
				totalPagr += 1;
			}
			layui.use(['laypage', 'layer'], function() {
				var laypage = layui.laypage,
					layer = layui.layer;
	
				if(page == totalPagr) {
					showNum = countNum;
				}
				laypage.render({
					elem: 'aldum_viode_page',
					count: pageIndex, //页面总条数
					limit: showNum, //每页显示数  
					layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip'],
					jump: function(obj, first) {
						var pageItemCount = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
						if(pageIndex != 0 == 0 ){
							$("#System_list").append("无数据");
						} else {
							//pageItemCount当前是第几页
							page = pageItemCount;
							if(page == totalPagr && countNum != 0) {
								var sum = (page - 1) * 4;
								fun.SystemPage(data, sum, pageIndex);
		
							} else {
								var sum = page * 4;
								//console.log(sum)
								fun.SystemPage(data, (page - 1) * 4, sum);
								page += 1;
							}
						}
	
					}
				})
			})
		}
	})
	
}



var fun = {    //这里和那边一样，传值给页面
	//系统通知列表
	SystemPage : function(data, pageIndex, pageindex2){
		$("#System_list").empty();
		
		for(var i = pageIndex; i < pageindex2; i++) {
			var str = "<li class='info_list'>";
				str += "<img src=' "+data.data[i].image+" '>";
				str += "<div class='info_list_content'>";
				str += "<p><span> "+data.data[i].sysMesType? 0: asjkbv +" </span><span class='info_list_time'>"+data.data[i].updateTime+"</span></p>";
				str += "<p class='info_list_prompt'>"+data.data[i].notice+"<a href='"+data.data[i].url+"'>"+data.data[i].url+"</a></p>";
				str += "</div>";
				str += "</li>";
			$("#System_list").append(str);
		}
	},
	
	getAllCommentMessage :function(){  
			var customerId = $("#customerId").text();
			customerId = sessionStorage.getItem('customerId');
			//评论收到
			$.post("http://192.168.1.57:8080/api/messageComment/getAllCommentMessage",{   
				"customerId":customerId,
				"type":1,
				"pageIndex":1,
				"pageItemCount":1000
			},function(data){
				console.log(data)
				if(data.result==true&&data.code==0){
					messageList = data.data;   
					fun.setMessageList(messageList);
					
				}
			});
		$("#aaa").click(function(){
			alert("啊")
		})
	
	},
	
	setMessageList:function(setMessageList){
		messageList = setMessageList;
	},
	getMessageList: function(){
		return messageList;
	},
	
	showAnswerMessage : function(myMessageList,recTag){    
			console.log(myMessageList)
			var pageIndex = myMessageList.length;
			var page = 1;
			var customerId = sessionStorage.getItem('customerId');
			var totalPagr = parseInt(pageIndex / 4);
			var countNum = pageIndex % 4;
			var showNum = 4;
			if(countNum != 0) {
				totalPagr += 1;
			}
			
			layui.use(['laypage', 'layer'], function() {  
				
				var laypage = layui.laypage,
					layer = layui.layer;
	
				if(page == totalPagr) {
					showNum = countNum;
				}
				
				laypage.render({
					elem: 'comment_page', //应该
					count: pageIndex, //页面总条数
					limit: showNum, //每页显示数  
					layout: ['count', 'prev', 'page', 'next', 'refresh', 'skip'],
					jump: function(obj, first) {  
						
						var pageItemCount = obj.curr; //得到当前页，以便向服务端请求对应页的数据。
						if(pageIndex != 0 == 0 ){
							$("#comment_list").append("无数据");
						} else {
							//pageItemCount当前是第几页
							page = pageItemCount;
							if(page == totalPagr && countNum != 0) {
								var sum = (page - 1) * 4;
								if(recTag == "recCourse"){  
									fun.recCourseMan(myMessageList, sum, pageIndex); // data是
								}
								
							} else {
								var sum = page * 4;
								//console.log(sum)
								fun.recCourseMan(myMessageList, (page - 1) * 4, sum);
								page += 1;
							}
						}
	
					}
				})
			})	
	
	},
	
	recCourseMan : function(data, pageIndex, pageindex2){  
		console.log(pageIndex + " ; " + pageindex2 )
		//console.log(data)  //这个已经打印了
		$("#comment_list").empty();
		for(var i = pageIndex; i < pageindex2; i++){  //
			
			console.log(data[i])
			var str = "<li class='list0'>";  
				str += "<div class='head'><img src='"+data[i].photo+"'></div>";
				str += "<div class='content'>";
				str += "<p class='text'><span class='name'>"+data[i].nickName+"</span><span class='date'></span></p>";
				str += "<div class='good'>";
				//str += "<p>课程评分：<span></span></p>";
				str += "<p>"+data[i].commentContent+"</p>";
				str += "<div class='album_info'>";
				str += "<img src='"+data[i].curriculumPhoto+"'>";
				str += "<p class='unoin_courseName'>"+data[i].curriculumName+"</p>";
				str += "</div>";
				str += "</div>";
				str += "<div class='hf'>";
				str += "<textarea type='text' class='hf-text' autocomplete='off' maxlength='100'>评论…</textarea>";
				str += "<button class='hf-btn'>回复</button>";
				str +="<span class='hf-nub'>0/100</span>";
				str += "</div>";
				str += "</div>";
				str += "</li>";


			$("#comment_list").append(str);
		}
	}
}
