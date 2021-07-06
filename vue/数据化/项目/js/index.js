$(function(){
    // 一 : 设备监控 tab栏切换
    $('.tabs>a').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.monitor .content').eq($(this).index()).show().siblings('.content').hide();
    });
    // 二 : 设备监控 无限轮播
    function Carousel(){
        $('.carousel').animate({top : -175},10000,'linear',function(){
            $('.carousel').css('top', 0);
            Carousel();
        });
    }
    Carousel();
    // 三 : 设备监控 鼠标移入移出
    $('.carousel .row').mouseenter(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.carousel').mouseleave(function () {
        //移除样式
        $('.carousel>.row').removeClass('active');
    });
    // 四 : 订单统计 tab栏切换
    var orderData = [
        { orders: '20,301,987', amount: '99834' },
        { orders: '301,987', amount: '9834' },
        { orders: '1,987', amount: '3834' },
        { orders: '987', amount: '834' }
    ];
    $('.fifter li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.order .item:eq(0)').children('h4').text(orderData[$(this).index()].orders);
        $('.order .item:eq(1)').children('h4').text(orderData[$(this).index()].amount);
    });
    // 五 : 各省热榜 鼠标移入
    var hotData = [
        { name: '可爱多', num: '9,086' },
        { name: '娃哈哈', num: '8,341' },
        { name: '喜之郎', num: '7,407' },
        { name: '八喜', num: '6,080' },
        { name: '小洋人', num: '6,724' },
        { name: '好多鱼', num: '2,170' },
    ];
    $('.province .sup:eq(0)>li').mouseenter(function () {
        //1.数组第一个元素移到最后面
        hotData.push(hotData.shift());
        //2.排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
        //3.拼接html字符串
        let htmlStr = '';
        for (var i = 0; i < hotData.length; i++) {
            htmlStr += `<li><span></span>${hotData[i].name}<span> <s class="icon-up" style="color: #DC3C33"></s>${hotData[i].num}</span></li>`
        };
        //4.替换ul内容
        $('.province .sup:eq(1)').html(htmlStr);
    });
});




//  饼状图
$(function(){

    var myChart = echarts.init(document.querySelector('.pie'));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
    
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: [15, 80],
                center: ['50%', '50%'],
                data: [
                    {value: 66, name: '江苏'},
                    {value: 88, name: '云南'},
                    {value: 120, name: '北京'},
                    {value: 130, name: '山东'},
                    {value: 130, name: '浙江'},
                    {value: 135, name: '河北'},
                    {value: 150, name: '四川'},
                    {value: 180, name: '湖北'},
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                color: ['#006cff', '#006c00', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#006cff'],
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    myChart.setOption(option);
});

//  地图 


//  柱状图
$(function(){
    var myChart = echarts.init(document.querySelector('.bar'));

    var item = {
        value: 1000,
        itemStyle: {
            color: '#254065',
            opacity: 0.5
        },
    };
var option = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......','','杭州','厦门','济南','成都','重庆'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel : {
                textStyle: {
                    color: '#3398DB'
                }
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel : {
                textStyle: {
                    color: '#3398DB'
                }
            },
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                            { offset: 0, color: '#00fffb' },
                            { offset: 1, color: '#0061ce' },
                    ]
                )
            },
            barWidth: '60%',
            data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
        }
    ]
};
    myChart.setOption(option);
});

//  环形图 
$(function () {
    // 3.1 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.gauge'));

    // 3.2 指定图表的配置项和数据
    var option = {
        series: [
            {
                // 起始的角度
                startAngle: 180,
                name: '访问来源',
                type: 'pie',
                radius: ['130%', '150%'],
                center: ['48%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {
                        value: 100, itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#00fffb' }, // 0 起始颜色
                                    { offset: 1, color: '#0061ce' }  // 1 结束颜色
                                ]
                            )
                        }
                    },
                    { value: 100, itemStyle: { color: '#12274d' } },
                    { value: 200, itemStyle: { color: 'transparent' } }
                ]
            }
        ]
    };

    // 3.3使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


});

