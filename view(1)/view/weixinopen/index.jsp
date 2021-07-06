<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>请登录</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
.btn-main {
    color: #fff;
    box-shadow: 0 2px 5px rgba(0,28,88,.3);
}
.btn-login {
    background: url('../img/login_btn1.png') no-repeat;
}
.btn {
    width: 110px;
    height: 38px;
    float: left;
    text-align: center;
    cursor: pointer;
    border: 0;
    padding: 0;
    font-weight: 700;
    font-size: 14px;
    display: inline-block;
    vertical-align: baseline;
    line-height: 38px;
    outline: 0;
    background-color: transparent;
}
.formIpt {
    width: 205px;
    padding: 9px 0 10px;
    ime-mode: disabled;
    height: 20px;
    top: 1px;
    left: 28px;
    color: #333;
    font-size: 14px;
    font-weight: 700;
    border: none;
    font-family: verdana;
    line-height: 20px;
    position: absolute;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    outline: none;
    background: transparent !important;
}	
</style>
  </head>
  
  <body>
  	<form name="login" method="post" action="LoginServlet">
	    <h5>请登录你的兔聊账号</h5><br>
	    <input type="text" id="username" name="username" placeholder="请输入注册手机号"/><br>
	    
	    <input type="password" " id="password" name="password" placeholder="请输入登录密码"/><br>
	    
	    <input type="submit" id="loginbutton" /><br>
  	</form>
  </body>
</html>
