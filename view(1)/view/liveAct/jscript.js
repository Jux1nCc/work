"use strict";!function(t,a){setHtml({}),init();function e(){var t=r.clientWidth;t&&(r.style.fontSize=450<=t?"100px":t/450*100+"px")}var r=t.documentElement,n="orientationchange"in window?"orientationchange":"resize";t.addEventListener&&(a.addEventListener(n,e,!1),t.addEventListener("DOMContentLoaded",e,!1))}(document,window);var errorCount=0;function init(){var t=getQueryStringByName("streamId"),a=getQueryStringByName("customerId"),e={};if(t&&a){try{$.get("/api/liveAct/getActTaskSchedule",{streamId:t,customerId:a},function(t){if(t.result){var a=t.data;0===(e={goalAddFansCnt:0|a.goalAddFansCnt,currAddFansCnt:0|a.currAddFansCnt,goalRewardCustCnt:0|a.goalRewardCustCnt,currRewardCustCnt:0|a.currRewardCustCnt,goalAddStarValue:0|a.goalAddStarValue,currAddStarValue:0|a.currAddStarValue,taskDay:0|a.taskDay}).taskDay&&setTimeout(init,5e3),setHtml(e)}else errorCount<3&&(errorCount++,init())})}catch(t){console.log(t)}setTimeout(init,3e4)}}function setHtml(t){var a="<h2 class='complete'>已完成</h2>";if(0!=+t.goalAddFansCnt&&+t.goalAddFansCnt==+t.currAddFansCnt)$(".fans").html(a);else{var e='<h2 class="realPec">'+(0|t.currAddFansCnt)+'</h2><span class="segre">/</span><h2 class="totalPec">'+(0|t.goalAddFansCnt)+"</h2>";$(".fans").html(e)}0!=+t.goalRewardCustCnt&&+t.goalRewardCustCnt==+t.currRewardCustCnt?$(".task").html(a):$(".task").html('<h2 class="realPec">'+(0|t.currRewardCustCnt)+'</h2><span class="segre">/</span><h2 class="totalPec">'+(0|t.goalRewardCustCnt)+"</h2>"),0!=+t.goalAddStarValue&&+t.goalAddStarValue==+t.currAddStarValue?$(".stars").html(a):$(".stars").html('<h2 class="realPec">'+(0|t.currAddStarValue)+'</h2><span class="segre">/</span><h2 class="totalPec">'+(0|t.goalAddStarValue)+"</h2>"),$(".wrap-progress").html(1|t.taskDay)}function getQueryStringByName(t){var a=location.search.match(new RegExp("[?&]"+t+"=([^&]+)","i"));return null==a||a.length<1?"":a[1]}