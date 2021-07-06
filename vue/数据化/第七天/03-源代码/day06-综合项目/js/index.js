//入口函数 : DOM树加载完毕
$(function () {
    /* 功能一： 设备监控  tab栏切换
    需求 ： 鼠标点击  .monitor .tabs>a
        排他思想：(1)当前点击的a添加类型active,其他兄弟元素移除类名active
                 (2)与当前点击a下标一致的content显示，其他的content隐藏

    */
    $('.monitor .tabs>a').click(function () {
        //(1)当前点击的a添加类型active,其他兄弟元素移除类名active
        $(this).addClass('active').siblings().removeClass('active');
        //(2)与当前点击a下标一致的content显示，其他的content隐藏
        var index = $(this).index();
        $('.monitor .content').eq(index).show().siblings('.content').hide();
    });

    /* 功能二： 设备监控  无限滚动
    （1）carousel盒子往上滚动   总row高度（15*35） - 可视高度（350） = 175px
        * 注意点 ： 修改元素位置，最好给元素添加定位
     (2)滚动到最底部之后，瞬间修改元素位置为0，然后重新开始滚动
    */

    function lunbo() {
        $('.carousel').animate({ top: -175 }, 5000, 'linear', function () {
            //动画结束
            //1.瞬间修改元素位置为0
            $('.carousel').css('top', 0);
            //2.继续动画
            lunbo();
        });
    };
    //页面一加载就执行动画
    lunbo();


    // lunbo1();
    // setInterval(function () {
    //     lunbo1();
    // }, 5000);
    // function lunbo1() {
    //     $('.carousel').animate({ top: -175 }, 5000, 'linear', function () {
    //         //动画结束
    //         //1.瞬间修改元素位置为0
    //         $('.carousel').css('top', 0);
    //     });
    // };


    /* 功能三： 设备监控  鼠标移入移出
    移入row : 当前移入的元素，添加类名 active. 兄弟元素移除类名
    移出carousel-view : 所有的row移除类名active
    */
    $('.carousel-view .row').mouseenter(function () {
        //当前移入的元素，添加类名 active. 兄弟元素移除类名
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('.carousel-view').mouseleave(function () {
        //所有的row移除类名active
        $('.carousel-view .row').removeClass('active');
    });

    /* 功能四： 订单统计  tab栏切换
    鼠标点击每一个a标签 ： （1）排他思想修改样式  （2）加载对应（下标一致）的数据
    */
    //数据数组
    var orderData = [
        { orders: '20,301,987', amount: '99834' },
        { orders: '301,987', amount: '9834' },
        { orders: '1,987', amount: '3834' },
        { orders: '987', amount: '834' }
    ];
    //页面加载完毕，默认显示数组第一个数据
    $('.order .data .item:eq(0)').children('h4').text(orderData[0].orders);
    $('.order .data .item:eq(1)').children('h4').text(orderData[0].amount);

    $('.order .filter a').click(function () {
        //（1）排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
        //(2)加载对应（下标一致）的数据
        var obj = orderData[$(this).index()];
        console.log(obj);
        $('.order .data .item:eq(0)').children('h4').text(obj.orders);
        $('.order .data .item:eq(1)').children('h4').text(obj.amount);

    });

    /* 功能五： 各省热榜  鼠标移入 */
    var hotData = [
        { name: '可爱多', num: '9,086' },
        { name: '娃哈哈', num: '8,341' },
        { name: '喜之郎', num: '7,407' },
        { name: '八喜', num: '6,080' },
        { name: '小洋人', num: '6,724' },
        { name: '好多鱼', num: '2,170' },
    ];

    //输入城市列表 : 重新渲染右侧列表ul
    $('.hot .province>ul:eq(0)>li').mouseenter(function(){
        //(1)数组的第一个元素移动到最后面
        hotData.push(hotData.shift());
        //(2)排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
        //(3)重新渲染右侧列表ul
        //求和
        var htmlStr = '';
        for(var i = 0;i<hotData.length;i++){
            var obj = hotData[i];
            console.log(obj);
            htmlStr += '<li>' + 
            '<span>' + obj.name + '</span>' + 
            '<span><i class="icon-up" style="color: #DC3C33"></i>' + obj.num + '</span>' +
            '</li>'
        };
        console.log(htmlStr);
        //用最新生成的htmlStr替换现在的htmlStr
        $('.hot .province>ul:eq(1)').html(htmlStr)
        
    });
});