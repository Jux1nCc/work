// JavaScript Document

try {
var urlhash = window.location.hash;
if (!urlhash.match("fromapp"))
{
if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)))
{	
	var params = window.location.href.split('?')[1]
	if(null != params && params!= '' && params!='undefined'){
		window.location="https://rklive888.com/m/index.html?"+window.location.href.split('?')[1];
	}else{
		window.location="https://rklive888.com/m/index.html";
	}
	
}
}
}
catch(err)
{
}
