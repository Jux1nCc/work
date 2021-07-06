var may = {
    env: 'demo',
    customerId: $config.getQueryStringByName("customerId"),
    token: $config.getQueryStringByName("token"),
    isFrom: $config.getQueryStringByName("isFrom"),
    isLogin: false,
    tableData: [],
    timer: null,
    type: 1,
    appBool: openInWebview(),
    dayCashAward: false,
    gradeAlert: 0,
    isEnd: false,
    levelArr: [
        { level: 1, title: '成功解锁高级会员x3天<br>“五一快乐”头像框x5天', money: '49元' },
        { level: 2, title: '成功解锁活动礼物<span>8折</span>特权<br>“我爱兔酱”文字气泡 x 10天', money: '299元' },
        { level: 3, title: '成功解锁活动礼物<span>6折</span>特权<br>财富等级x1.2倍升级<br>“迷妹万千”进场特效 x 30天', money: '899元' },
        { level: 4, title: '成功解锁活动礼物<span>4折</span>特权<br>返现充值金额的6.5%', money: '3999元' },
        { level: 5, title: '成功解锁返现充值金额的8%<br>', money: '7888元' },
    ],
    welfArr: [
        '今日可领“勤劳小蜜蜂”头像框x1天',
        '今日可领“勤劳小蜜蜂”文字气泡x1天',
        '今日可领“土豪撒钱”进场特效x1天',
        '今日可领 高级会员1天',
        '今日可领“坐等撩”头像框x1天',
    ],
    init: function () {
        // may.created();
        // may.bindEvent();
        // may.getNotice();




        // ***********************************************************
        $config.addObserver();
        // 弹窗 
        // app外打开
        // config.dialogComm($('#openOutApp'), 'openOutApp');
        // 未登录
        // config.dialogComm($('#isLogin'), 'isLogin');
        // 每日福利
        // openWelf()
        // 领取奖励
        // getWelf()
        // 充值奖励
        // openRecharge()
        // 打折礼物
        config.dialogComm($('#discount'), 'discount');
        // ***********************************************************
    },
    bindEvent: function () {

    },
    created: function () {
        var params = {
            customerId: may.customerId,
            token: may.token,
            isFrom: may.isFrom,
        }
        $.ajax({
            type: "GET",
            url: $config.toUrl(may.env, "/act/may/index"),
            data: params,
            dataType: "json",
            success: function (res) {
                if (res.result) {               //类型：Boolean  必有字段  备注：无
                    if (res.data.isEnd) {
                        layer.msg('活动已结束')
                    }
                    may.isLogin = res.data.isLogin
                    may.isEnd = res.data.isEnd
                    may.getList();
                    may.mounted(res.data);
                } else {
                    if (res.code == '-100') {
                        layer.msg('活动已结束', {
                            time: false,
                            shade: 0.5
                        })
                    } else {
                        $config.yfAlert(res.message)
                    }
                }
            },
            error: function (error) {
                $config.yfAlert('网络异常')
            }
        });
    },
    mounted: function (data) {
        // 今日隐藏福利奖励是否领取dayLoginAward
        if (!data.dayLoginAward && !may.isEnd) {
            $('.welf-h1 span').html(+data.dayLoginDate + 1)
            $('.welf-title').html(may.welfArr[data.dayLoginDate])
            $('.welf-img').addClass('csImg-day' + (+data.dayLoginDate + 1))
            if (data.dayLoginDate == 0 || data.dayLoginDate == 4) {
                $('.welf-img img').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_120,w_120')
                if (!data.photo) {
                    $('.welf-img img').css('display', 'none')
                }
            }
            if (data.dayLoginDate == 3) {
                $('#welf').css({
                    'background': 'url("image/dialog-welf.png")',
                    'background-size': '100% 100%'
                }).addClass('welf-high')
                $('.welf-desp').html('发放说明: 如果您已购高级会员,将给您有效期延长1天;如果您已购普通会员,将给您有效期延长2天。')
                $('.welf-tip').html('提示：高级会员有很多特权，<br>记得去“我-更多-会员”了解下哦~')
            }
            config.dialogComm($('#welf'), 'welf');
        } else if (data.gradeAlert && !may.isEnd) {
            var obj = may.levelArr[data.gradeAlert - 1];
            $('#recharge h1').html(obj.money);
            $('#recharge p').html(obj.title);
            if (data.gradeAlert != 1 && data.gradeAlert != 5) {
                $('#recharge strong').css('display', 'block')
                $('#recharge strong span').html(data.gradeAlert == 2 ? '8' : data.gradeAlert == 3 ? '6' : 4)
            }
            if (data.gradeAlert == 4 || data.gradeAlert == 5) {
                $('#recharge .recharge-tip').html('返现金额将在活动结束后发放！')
            }
            config.dialogComm($('#recharge'), 'recharge');
        }
        if (!may.isLogin) return;
        if (may.appBool && may.isLogin) {
            // 当前折扣
            if (data.discount && data.grade > 1) {
                var progressStr = '您已成功解锁活动礼物<strong>' + data.discount + '</strong>折特权，赠送指定礼物<br>只会消费礼物原价<span>' + data.discount + '</span>折的聊币，请放心送礼吧~'
                $('.progress-current').css('display', 'block').html(progressStr)
            }
            // 下一级 nextAmt
            if (data.grade < 5) {
                var targetArr = [
                    '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<span>高级会员x<strong>3</strong>天…</span>',
                    '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<span>活动礼物<strong>8</strong>折特权…</span>',
                    '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<span>活动礼物<strong>6</strong>折特权…</span>',
                    '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<span>活动礼物<strong>4</strong>折特权…</span>',
                    '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<span>充值返现<strong>8</strong>%…</span>']
                var targetStr = targetArr[+data.grade]
                $('.progress-target p').html(targetStr)
            } else {
                $('.progress-target').css('display', 'none')
            }
            // 当前等级
            var arr = [5, 28, 51, 75, 100]
            $('.bar').css('height', arr[data.grade - 1] + '%')
            // height:5% 28%; 51% 75% 100
            $('li.el-timeline-item').each(function (index, ele) {
                if (5 - index <= data.grade) {
                    $(ele).addClass('timeline-grade')
                }
            })
        }
        may.gradeAlert = data.gradeAlert
        // 我的奖品 
        $('#award img.photo').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_120,w_120')
        may.dayCashAward = data.dayCashAward
        may.initCashAward()
    },
    initCashAward: function () {
        if (may.dayCashAward) {
            $('.award-ok').addClass('award-disabled').attr('disabled', true).html('今日已领取')
            $('#award p').css('display', 'block')
        }
    },
    getList: function () {
        var params = {
            customerId: may.customerId,
            token: may.token,
            type: may.type
        }
        $.ajax({
            type: "GET",
            url: $config.toUrl(may.env, '/act/may/getActRank'),
            data: params,
            dataType: "json",
            async: false,
            success: function (res) {
                if (res.result) {
                    may.setList(res.data)
                } else {
                    $config.yfAlert(res.message)
                }
            },
            error: function () {
                $config.yfAlert('网络异常')
            }
        });
    },
    setList: function (data) {
        var arr = [];//JSON.parse(JSON.stringify(data.ranks));
        for (var i = 0; i < data.ranks.length; i++) {
            (function (num) {
                arr.push(data.ranks[num]);
            })(i)
        }

        if (arr.length < 10) {
            for (var i = 0; i < 10 - data.ranks.length; i++) {
                (function (num) {
                    arr.push({
                        "nickName": "暂无",                //类型：String  必有字段  备注：无
                        "customerId": null,                //类型：String  必有字段  备注：无
                        "photo": "image/default.png",                //类型：String  必有字段  备注：无
                        "honorValue": 0
                    })
                })(i)
            }
        }
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            str += (function (num) {
                var obj = arr[num];
                return (num == 0 ? '<div class="row row1 flexbox between">' : num == 3 ? '<div class="row row2 flexbox between">' : num == 6 ? '<div class="row row3 flexbox between">' : '')
                    + '<div class="col col' + (+num + 1) + ' column">'
                    + '    <img class="resetImg" src="' + obj.photo + '?x-oss-process=image/resize,m_mfit,h_120,w_120" alt="">'
                    + (num < 3 ? '<img src="image/' + (num == 0 ? 'first' : num == 1 ? 'second' : 'third') + '.png" alt="" class="photo-bg">' : '')
                    + '    <p class="col-rank">NO.' + (num + 1) + '</p>'
                    + '    <p>' + $config.substrLen(obj.nickName, 5) + '</p>'
                    + (may.type == 1 ? '<p>光荣值: ' + (obj.honorValue || 0) + '</p>' : '')
                    + ' </div>'
                    + (num == 2 || num == 5 || num == 9 ? '</div>' : '')
            })(i)
        }
        $('.table-wrap').html(str)
        setTimeout("layer.closeAll('loading')", 1000)
        if (may.appBool && may.isLogin) {
            $('.list-rank p:first-of-type strong').html(data.rank || '暂无')
            $('.list-rank p:last-of-type strong').html(data.preAmt)
            if ((+data.rank == 0 && data.ranks.length >= 10) || +data.rank > 10) {
                $('.list-rank p:last-of-type em').html('第10名')
            } else {
                $('.list-rank p:last-of-type em').html('上一名')
            }
        }
    },
    getNotice: function () {
        var params = {
            customerId: may.customerId,
            token: may.token,
        }
        $.ajax({
            type: "GET",
            url: $config.toUrl(may.env, '/act/may/getRollNotice'),
            data: params,
            dataType: "json",
            async: false,
            success: function (res) {
                if (res.result) {
                    may.setNotice(res.data)
                } else {
                    $config.yfAlert(res.message)
                }
            },
            error: function () {
                $config.yfAlert('网络异常')
            }
        });
    },
    setNotice: function (data) {
        var str = data.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        $('.notice-wrap').append('<p class="notice-p">' + str + '</p>')
        marquee(data.length > 1 ? data.length * 6000 : 1000, (5 - data.length) * 6000);
    }
}


// ***********************************************************
function openWelf() {
    $('.dayWelf-wrap h6>b').html('9月1日')
    $('.dayWelf-wrap h6 p span').html('“千里共婵娟”文字气泡(3天)')
    $('.dayWelf-wrap img').attr('src', 'image/welf-gift1.png')
    // 福利type ,1充值卷,2文字气泡，3，会员，4抽奖券，5信用分
    // 同时区分app，兔聊上对应普通，高级会员，觅伊上是白银，黄金贵族
    var type = 3;
    var tip = (type == 1 ? '' : type == 2 ? '提示：领取成功后，去「我-更多-个性装扮」里点击“立即装扮”确认' : type == 3 ? '发放说明：如果您已购高级会员，将给您有效期延长7天；如果您已购普通会员，将给您有效期延长8天。' : type == 4 ? '提示：领取成功后，去「我-任务中心-做任务抽大奖」里点击“立即装扮”确认' : '提示：信用分可提高分成比例')
    $('.dayWelf-wrap .tip').text(tip)
    if (type == 3) {
        $('.dayWelf-wrap').css({
            top: '27%',
            bottom: '15%'
        })
        $('#dayWelf').css({
            "height": '9.68rem',
            "background": 'url("image/dayWelf2.png")',
            "background-size": "100% 100%",
        })
        $('.dayWelf-wrap .desp').css('display', 'block')
    }
    config.dialogComm($('#dayWelf'), type == 3 ? 'dayWelf2' : 'dayWelf');
}
function getWelf() {
    var type = 2, arr = ['可在我的「钱包-包裹-优惠券」里查看。<br>明天还要来哟，福利都抱走～',
        '记得去个性商城使用哦～<br>明日还要来哟，福利都抱走。',
        '尽情享受您都特权吧～<br>明日还要来哟，福利都抱走。',
        '快去任务中心抽奖哦，奖池很丰富～<br>明日还要来哟，福利都抱走。',
        '100信用分已到账～<br>明日还要来哟，福利都抱走。'
    ];
    $('.getWelf-wrap p').html(arr[type - 1])
    config.dialogComm($('#getWelf'), 'getWelf');
}

function openRecharge() {
    // 再打开弹窗之前做内容修改,type表示当前解锁等级
    var type = 5
    var titleArr = ['“土豪撒钱”进场特效<b>(5天)</b><br>“国庆快乐”头像框<b>(7天)</b>',
        '活动礼物<b>8折</b>特权<br>千里共婵娟” 文字气泡<b>(10天)</b>',
        '活动礼物<b>6折</b>特权<br>直播间入场提示',
        '活动礼物<b>4折</b>特权<br>返现<b>6.5%</b>资格',
        '返现<b>10%</b>资格<br>所有进场特效畅享<b>(15天)</b>'
    ]
    $('.recharge-wrap h6 b').html(type == 1 ? '49' : type == 2 ? '299' : type == 3 ? '899' : type == 4 ? '3999' : '7888')
    $('.recharge-wrap h1').html('成功解锁' + titleArr[type - 1])
    $('.recharge-wrap .recharge-tip').html(type < 4 ? '以上奖励已经发放，快去使用哦！' : '返现金额将在活动结束后发放！')
    $('.recharge-wrap strong').html((type == 1 || type == 5) ? '' : '注：您赠送活动指定礼物时，只会支出其<span>' + (type == 2 ? '8' : type == 3 ? '6' : type == 4 ? '4' : '') + '</span>折聊币，请放心送礼吧~')
    config.dialogComm($('#recharge'), 'recharge');
}
function download() {
    var app = [{  //兔聊  
        name: '兔聊',
        downloadUrl: 'http://share.folkcam.cn:8080/view/share.html',
        appKey: 'bmhy9f',
        vipName: '会员',
        util: '聊币',
    },
    { //觅伊
        name: '觅伊',
        downloadUrl: 'http://www.rklive888.com/',
        appKey: 'c6xjxt',
        vipName: '贵族',
        util: '钻石',
    }], appType = 1;
    if ($config.browser.versions.android) {
        window.location.href = app[appType - 1]['downloadUrl']
    } else {
        if (appType == 1) {
            window.location.href = app[appType - 1]['downloadUrl']
        } else {
            var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
            new OpenInstall({
                /*appKey必选参数，openinstall平台为每个应用分配的ID*/
                appKey: app[appType - 1]['appKey'],
                onready: function () {
                    var m = this;
                    /*在app已安装的情况尝试拉起app*/
                    m.schemeWakeup();
                    // 未安装时去Appstore
                    m.wakeupOrInstall();
                }
            })
        }
    }
}
function shareTc() {  //分享的主题url
    var img = "./image/share.png",
        title = '中秋闹国庆，放价大狂欢',
        subTitle = '每日领免费福利，充值返现火热进行中';
    shareComm(img, title, subTitle)
}


// ***********************************************************





















function marquee(speed, interval) {
    // 字幕滚动效果
    // var scrollWidth = $('.notice').width();
    // var textWidth = $('.notice-p').width();
    // var i = 0;
    // may.timer = setInterval(function () {
    //     i--;
    //     if (i < (scrollWidth - textWidth)) {
    //         clearInterval(may.timer)
    //     }
    //     $('.notice-p').animate({ 'left': i + 'px' }, 15);
    // }, 15);

    // 上一个继续向左滚动, 第二条从右向左滚动
    if ($('.prev-notice').length > 0) { //两条并存
        $('.notice-p').css('right', '-' + $('.notice-p').width() + 'px')
        $(".prev-notice").stop(true).animate({
            right: $('.notice').width() + 'px'
        }, 4000, 'linear', function () {
            $(".prev-notice").remove()
        })
    } else { //只有一条数据
        $('.notice-p').css('right', 'unset')
    }
    $('.notice-p').stop(true).delay(1000).animate({
        right: 0
    }, speed, 'linear', function () {
        $('.notice-p').removeClass('notice-p').addClass('prev-notice')
        setTimeout('may.getNotice()', interval)
    })
}
function changeNav(type) {
    if (!may.appBool) {
        $config.openOutApp()
        return
    } else if (!may.isLogin) {
        $config.isLogin()
        return
    }
    if (type == may.type) return;
    $('.list-nav').attr('src', 'image/nav' + type + '.png')
    if (type == 1) {
        $('.list-title').css('display', 'block')
        $('.list-tip').html('按照赠送礼物的光荣值进行排名，前10有奖励')
        $('.list-rank p:first-of-type span').html('')
        $('.list-rank p:last-of-type span').html('')
        $('.list-rank p:last-of-type i').html('光荣值')
    } else {
        $('.list-title').css('display', 'none')
        $('.list-tip').html('按照每日充值金额进行排名，前10有奖励')
        $('.list-rank p:first-of-type span').html('今日')
        $('.list-rank p:last-of-type span').html('充值额')
        $('.list-rank p:last-of-type i').html('元')
    }
    may.type = type;
    may.getList()
}
function goRule() {
    if (!may.appBool) {
        $config.openOutApp()
        return
    } else if (!may.isLogin) {
        $config.isLogin()
        return
    }
    window.location.href = "rule.html"
}
function refresh() {
    if (!may.appBool) {
        $config.openOutApp()
        return
    } else if (!may.isLogin) {
        $config.isLogin()
        return
    }
    $config.loading()
    may.getList()
}
function goAward() {
    if (!may.appBool) {
        $config.openOutApp()
        return
    } else if (!may.isLogin) {
        $config.isLogin()
        return
    }
    // 打开我的奖品
    may.initCashAward()
    $config.dialogComm($('#award'), 'award');
}
function shareTc() {
    var img = "http://activity.folkcam.cn/mayDay/dev/image/share.png",
        title = '五一狂撒千万聊币',
        subtitle = '充值返聊币活动火热进行中，每日可领免费福利';

    shareComm(img, title, subtitle, '')
}
function download() {
    window.location.href = 'http://share.folkcam.cn:8080/view/share.html'
}
// function getWelf(type, ele) {
//     var params = {
//         customerId: may.customerId,
//         token: may.token,
//         type: type,
//     }
//     if ($(ele).attr('disabled')) return;
//     if (type == 1) {
//         if (!may.appBool) {
//             $config.openOutApp()
//             return
//         } else if (!may.isLogin) {
//             $config.isLogin()
//             return
//         }
//     }
//     $.ajax({
//         type: "POST",
//         url: $config.toUrl(may.env, "/act/may/authApi/receiveReward"),
//         data: params,
//         dataType: "json",
//         success: function (res) {
//             if (res.result) {
//                 // 1-领取每日登陆奖励，2-领取每日首充奖励
//                 if (type == 1) {
//                     $(ele).animate({
//                         opacity: 0
//                     }, 1000, function () {
//                         $(ele).html('领取成功').attr('disabled', true).animate({
//                             opacity: 1
//                         })
//                     })

//                 } else {
//                     $(ele).animate({
//                         opacity: 0
//                     }, 1000, function () {
//                         $(ele).html('领取成功').attr('disabled', true).animate({
//                             opacity: 1
//                         }, 1000, function () {
//                             may.dayCashAward = true;
//                             $('#award p').css('display', 'block')
//                         })
//                     })

//                 }
//                 layer.msg('领取成功')
//             } else {
//                 $config.yfAlert(res.message)
//                 $(ele).attr('disabled', false)
//             }
//         }
//     })
// }
function openDialogWelf() {
    layer.closeAll();
    // 解锁等级
    if (may.gradeAlert && !may.isEnd) {
        var obj = may.levelArr[may.gradeAlert - 1];
        $('#recharge h1').html(obj.money);
        $('#recharge p').html(obj.title);
        if (may.gradeAlert != 1 && may.gradeAlert != 5) {
            $('#recharge strong').css('display', 'block')
            $('#recharge strong span').html(may.gradeAlert == 2 ? '8' : may.gradeAlert == 3 ? '6' : 4)
        }
        if (may.gradeAlert == 4 || may.gradeAlert == 5) {
            $('#recharge .recharge-tip').html('返现金额将在活动结束后发放！')
        }
        $config.dialogComm($('#recharge'), 'recharge');
    }
}
function checkGift() {
    if (!may.appBool) {
        $config.openOutApp()
        return
    } else if (!may.isLogin) {
        $config.isLogin()
        return
    }
    config.dialogComm($('#gift'), 'gift');
}
function doCharge() {
    var params = {
        customerId: may.customerId,
        token: may.token,
    }
    if (!may.appBool) {
        $config.openOutApp()
        return
    } else if (!may.isLogin) {
        $config.isLogin()
        return
    }
    //判断iOS或安卓和微信扣扣打开
    var ua = navigator.userAgent.toLowerCase();
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
    $.ajax({
        type: "POST",
        url: $config.toUrl(may.env, "/act/may/authApi/rechargeRecord"),
        data: params,
        dataType: "json",
        success: function (res) {
            if (res.result) {
                if (isIOS) {
                    var config = {
                        customerId: params.customerId,
                        token: params.token,
                        isFrom: 'act'//may.isFrom,
                    };
                    var returnUrl = encodeURIComponent(window.location.href.split('?')[0] + '?' + $config.setQueryConfig(config));
                    window.location.href = res.data.url + '?customerId=' + params.customerId + '&isFrom=' + res.data.accessId + '&returnUrl=' + returnUrl
                } else if (isAndroid) {
                    $config.dialogComm($('#update'), 'update');
                }
            } else {
                this.yfAlert(res.message)
            }
        }
    })
}
function copyText() {
    const textarea = document.createElement('textarea');
    textarea.value = 'https://www.expertol.cn/';
    document.body.appendChild(textarea);

    textarea.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        layer.msg('复制成功');
    }
    document.body.removeChild(textarea)
}
may.init()