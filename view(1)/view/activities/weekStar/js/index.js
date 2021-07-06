// 列表请求参数
var params = {
        searchTypeForCust: 1,
        dateStr: null,
        searchType: 1,
        customerId: customerId,
        token: token,
        isFrom: isFrom,
        isMore: 4
},
 updateWay = 'add'; //更新列表数据的方式, 加载更多或者按条件查询
$(function(){
    //获取昨日魅力星的信息
    getStarInfo()
    // 获取列表数据
    getList('add')
    // 动态生成周星榜活动日期
    createDateLi()
})
function getStarInfo(){
    // 做ajax请求
    // setStarInfo({})
}
function setStarInfo(info){
    $('.anchor img').attr('src', info.imgAnchorSrc);
    $('.anchor-name').html(info.anchor || '虚位以待');

    $('.guard img').attr('src', info.imgGuardSrc);
    $('.guard-name').html(info.guard || '虚位以待');

    $('.gift img').attr('src', info.imgGiftSrc);
    $('.gift-name').html(info.gift || '爱你');
}

function updateDateClass(){
    var nowDateStr = dateToStr(new Date());
    var currentTmp = new Date(nowDateStr).getTime();
    $('.title-date li').each(function(index, ele){
        var targetTmp = $(ele).attr('tmp');
        if(+currentTmp > +targetTmp){
            $(ele).addClass('BeforeDay')
        }else if(+currentTmp == +targetTmp){
            $(ele).addClass('currentDay')
        }else{
            $(ele).addClass('afterDay').removeAttr('onClick')
        }
    })
}
function onChangeDate(tmp){
    // 点击日期切换时间戳
    this.params.dateStr = tmp;
    getList('update')
}
function onTraggerClass(str){
    $('.anchor-more').css('display', 'block');
    this.params.searchTypeForCust = str;
    $('.title-nav li').each(function(index, ele){
        $(ele).removeClass('nav-active');
    });
    switch(str){
        case 1:
            $('.anchor-bang').addClass('nav-active');
            break;
        case 2:
            debugger;
            $('.guard-bang').addClass('nav-active');
        break;
    }
    getList('update')
}
function onChangeWay(way){
    $('.anchor-more').css('display', 'block');
    this.params.searchType = way;
    $('.list-date li').each(function(index, ele){
        $(ele).removeClass('date-active');
    });
    switch(way){
        case 1:
            $('.date-day').addClass('date-active');
            // $('.anchor-more').css('display', 'none');
            break;
        case 2:
            $('.date-week').addClass('date-active');
        break;
    }
    getList('update') 
}
function createDateLi(){
    var arr = [getWeekDate(0), getWeekDate(-1), getWeekDate(-2), getWeekDate(-3), getWeekDate(-4), getWeekDate(-5), getWeekDate(-6)],
        li = '';
    for(let i = 0; i< arr.length; i++){
         var strDate = '2019.'+ arr[i];

        let tmp = new Date('2019.'+ arr[i]).getTime();

        li+='<li tmp ="'+tmp+'"  onClick="onChangeDate('+strDate+')">'+arr[i]+'</li>'

    }
    $('.title-date').append(li)
    updateDateClass()
}
function getList(updateWay){
    // this.params 请求参数
    if (this.params.searchType == 1){
        // this.params.isMore = 3;
    }
    // 做ajax请求
    var arr = [];
    $.ajax({
        type: "GET",
        url: server+"view/activityWeekStar/initInfo",
        dataType: "json",
        data:params,
        success: function(obj){

            if(obj.code && obj.code != 0){
                
            }else{
                arr = obj.data.dataList;
                this.updateWay = updateWay;
                setTable(arr);

                if (!isEPT(obj.data.topCust.photo)){
                    $('#topAnchorPhoto').attr('src',obj.data.topCust.photo);
                }
                $('#anchor-name').html(obj.data.topCust.nickName  || '虚位以待');
                if (!isEPT(obj.data.topCust.photo)){
                    $('#topPayPhoto').attr('src',obj.data.topCustPay.photo);
                }
                $('#topPayName').html(obj.data.topCustPay.nickName || '虚位以待');
                // $('#topGiftImg').attr('src',obj.data.giftImage);
            }
        },
        error: function (obj) {

        }
    });


}
function setTable(arr){
    var str= '', 
    data = [...new Set(arr)];
    data.map(item=>{
        str+=`
        <tr class="flexbox">
            <td class="anchor-level">${updateLevel(item.level)}</td>
            <td class="anchor-photo">
                <img src="${item.photo}" onclick="openHomePage('${item.customerId}')" alt="">
                ${updateInfo(item.level)}
            </td>
            <td class="anchor-img  payPhoto "><img src="${item.payPhoto}" alt=""></td>
            <td class="anchor-detail">
                <p class="flexbox start">昵&nbsp;&nbsp; 称: &nbsp;<span class="anchor-name">${item.nickName}</span></p>
                <p class="flexbox start anchor-detail-p payName">守护者: &nbsp;<span class="guard-name">${item.payName}</span></p>
                <p class="flexbox start">积&nbsp;&nbsp;&nbsp;分: &nbsp;<span class="anchor-count">${item.amtStr}</span></p>
            </td>
        </tr>
        `
    });

    $('.anchor-table').html(str);

    updateList();
    // $('.anchor-more').css('display', 'block');
}
function updateList(){

    //'../image/底图.png'
    $("img").each(function(){
        var imgSrc = $(this).attr("src");
        if (imgSrc === "" || imgSrc == null || imgSrc == 'null' || imgSrc == undefined || imgSrc == 'undefined'){
            $(this).attr("src",'image/水印.png');
        }
    });
    /*if (this.params.searchType == 1){
        $('.anchor-more').css('display', 'none');
    }*/
    if(this.params.searchTypeForCust === 2){
        $('.anchor-img').css('display', 'none')
        $('.anchor-detail-p').css('display', 'none')
    }else{
        $('.anchor-img').css('display', 'block')
        $('.anchor-detail-p').css('display', 'block')
    }
}
function updateLevel(level){
    if(+level === 1 || +level === 2 || +level === 3 ){
        return 'Top'+level
    }else{
        return `<span>${level}</span>`
    }
}
function updateInfo(level){
    switch(+level){
        case 1: return '<p class="first"></p>';break;
        case 2: return '<p class="second"></p>';break;
        case 3: return '<p class="third"></p>';break;
        default: return '';
    }
}
function getMore(){
    this.params.isMore = 30;
    $('.anchor-more').css('display', 'none');
    getList('add')
}
//第一种，测试可使用
function getWeekDate(n){
    var now=new Date();
    var year=now.getFullYear();
    //因为月份是从0开始的,所以获取这个月的月份数要加1才行
    var month=now.getMonth()+1;
    var date=now.getDate();
    var day=now.getDay();
    //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    if(day!==0){
        n=n+(day-1);
    }
    else{
        n=n+day;
    }
    if(day){
        //这个判断是为了解决跨年的问题
        if(month>1){
            month=month;
        }
        //这个判断是为了解决跨年的问题,月份是从0开始的
        else{
            year=year-1;
            month=12;
        }
    }
    now.setDate(now.getDate()-n);
    year=now.getFullYear();
    month=now.getMonth()+1;
    date=now.getDate();
    // s=year+"年"+(month<10?('0'+month):month)+"月"+(date<10?('0'+date):date)+"日";
    s=(month<10?('0'+month):month)+"."+(date<10?('0'+date):date);
    return s;
}
function dateToStr(date){
    var year = date.getFullYear();
    var month =(date.getMonth() + 1).toString();
    var day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    var dateTime = year + "." + month + "." + day;
    return dateTime;
}
function isEPT(imgSrc) {
    if (imgSrc === "" || imgSrc == null || imgSrc == 'null' || imgSrc == undefined || imgSrc == 'undefined'){
        return true;
    }else {
        return false;
    }
}