var earning = {
    env: $config.getQueryStringByName('env') || 'demo',
    customerId: $config.getQueryStringByName("customerId"),
    token: $config.getQueryStringByName("token"),
    tokenCustomerId: $config.getQueryStringByName("tokenCustomerId") || $config.getQueryStringByName("customerId"),
    earn: $config.getQueryStringByName("earn"),
    iVersion: $config.getQueryStringByName("iVersion"),
    exchange: JSON.parse(sessionStorage.getItem('exchange')) || {},
    routerFrom: sessionStorage.getItem('routerFrom'),
    gainInter: $config.getQueryStringByName('gainInter'),
    amountArr: [
        { iconPath: 'image/icon4.png', title: '总收益', today: 0.0, yestoday: 0.0, week: 0.0, month: 0.0 },
        { iconPath: 'image/icon2.png', title: '非直播收益', today: 0.0, yestoday: 0.0, week: 0.0, month: 0.0 },
        { iconPath: 'image/icon3.png', title: '直播收益', today: 0.0, yestoday: 0.0, week: 0.0, month: 0.0 },
    ],
    inter: 0,
    liveInter: 0,
    unLiveInter: 0,
    page: 1,
    tableData: [],
    sex: 0, //0女 1男
    timer: null,
    submitChange: false,
    init: function () {
        earning.getEarning() //获取我的积分
        if (window.location.href.indexOf('exchangeSuccess.html') > -1) {
            earning.intialSuccess()
        }
        if (window.location.href.indexOf('exchangeRecord.html') > -1) {
            earning.getList();
        }
        if (window.location.href.indexOf('exchange.html') > -1) {
            if (earning.routerFrom == 'vip') {
                var need = (earning.exchange.cost - earning.exchange.rechargeBal || 0) < 100 ? 100 : (earning.exchange.cost - earning.exchange.rechargeBal || 0)
                $('.vipLevel span').html(earning.exchange.month)
                $('.vipLevel b').html(earning.exchange.level == 1 ? '白银' : '黄金')
                earning.initInput(need)
            } else {
                $('.vipLevel').css('display', 'none')
                if (earning.gainInter) {
                    earning.initInput(earning.gainInter)
                }
            }
        }
        earning.bindEven();
        // 设置头部导航栏
    },
    versionBool: function () {
        // ios135,android144   3.01版本标签申请
        var version = earning.iVersion.toLowerCase()
        var num = version.replace(/[^0-9]/gi, "");
        if ((version.indexOf("ios") > -1 && +num >= 135) || (version.indexOf("android") > -1 && +num >= 144)) {
            return true;
        } else {
            return false;
        }
    },
    mountedAmount: function (sex) {
        var bool = earning.versionBool();
        if (sex == 1 || !bool) {
            return;
        }
        for (var i = 0; i < earning.amountArr.length; i++) {
            (function (num) {
                var str = ''
                var obj = earning.amountArr[num];
                str = (num == 0 ? '<h1>收益统计(元)<img src="image/icon1.png" class="icon" onclick="openTip()" /></h1>' : '')
                    + '<h6><img src="' + obj.iconPath + '" class="icon" />' + obj.title + '</h6>'
                    + '<p class="flexbox around">'
                    + '     <span><b>' + obj.today + '</b><br>今日</span>'
                    + '     <span><b>' + obj.yestoday + '</b><br>昨日</span>'
                    + '     <span><b>' + obj.week + '</b><br>本周</span>'
                    + '     <span><b>' + obj.month + '</b><br>本月</span>'
                    + '</p>'
                $('.total' + (num + 1)).html(str).css('display', 'block')
            })(i)
        }
    },
    initInput: function (need) {   //初始化输入框的积分数,依据用户所需要数量
        $('.vipLevel strong').html(need)
        $('.input-want').val(need)
        $('.result').html(need)
        $('.apply').addClass('btn-show-active').attr('disabled', false)
    },
    bindEven: function () {
        $(".input-want").trigger("click").focus()
        $('.menu').click(function () {
            $(this).hide()
        })
        $('.menu-nav').click(function () {
            $(this).hide()
        })
        $('.header-pull-right').on('click', function () {
            $('.menu-nav').css('display', 'block')
            $('.nav-tip').css('display', 'flex')
        })
    },
    getEarning: function () {
        var params = {
            customerId: earning.customerId,
            token: earning.token,
            tokenCustomerId: earning.tokenCustomerId,
        }
        $.ajax({
            type: "GET",
            url: $config.toUrl(earning.env, "/api/miyiGain/myWallet"),
            data: params,
            dataType: "json",
            success: function (res) {
                if (res.result) {
                    var inter = res.data.jifen
                    $('.other .currentInter').html(inter)
                    $('.live .currentInter').html(res.data.liveJifen)
                    $('.input-tip span:first-of-type').html('可兑换积分数' + (+res.data.liveJifen + res.data.jifen).toFixed(2))
                    $('.record-title span').html(inter)
                    earning.inter = (+res.data.liveJifen + res.data.jifen).toFixed(2)
                    earning.liveInter = +res.data.liveJifen
                    earning.unLiveInter = +res.data.jifen
                    earning.phone = res.data.mobile
                    earning.areaCode = res.data.areaCode
                    earning.sex = res.data.sex
                    earning.isHasCoupon = +res.data.isHasCoupon;
                    if (res.data.sex == 0) {
                        $('.to-extent span').text('聊天前必看! 完成这几步, 才能成为聊天达人')
                    }
                    if (window.location.href.indexOf('earning.html') > -1) {
                        var data = res.data;
                        for (var i = 0; i < earning.amountArr.length; i++) {
                            (function (num) {
                                var obj = earning.amountArr[num];
                                obj.today = (num == 0 ? data.todayTotal : num == 1 ? data.today : data.todayLive) || 0
                                obj.yestoday = (num == 0 ? data.yeasterdayTotal : num == 1 ? data.yeasterday : data.yeasterdayLive) || 0
                                obj.week = (num == 0 ? data.weekTotal : num == 1 ? data.week : data.weekLive) || 0
                                obj.month = (num == 0 ? data.monthTotal : num == 1 ? data.month : data.monthLive) || 0
                            })(i)
                        }
                        earning.mountedAmount(earning.sex)
                    }
                } else {
                    $config.yfAlert(res.message)
                }
            },
            error: function (err) {
                $config.yfAlert('网络异常')
            }
        });
    },
    intialSuccess: function () {
        $('.getter').text('+' + $config.toThousands(earning.earn))
        $('.changeInter').text('-' + $config.toThousands(earning.earn))
    },
    getList: function () {
        var params = {
            customerId: earning.customerId,
            token: earning.token,
            tokenCustomerId: earning.tokenCustomerId,
            pageIndex: earning.page,
            pageItemCount: 20,
        }
        $.ajax({
            type: "GET",
            url: $config.toUrl(earning.env, "/api/miyiGain/conversionToZsList"),
            data: params,
            dataType: "json",
            success: function (res) {
                if (res.result) {
                    earning.tableData = earning.tableData.concat(res.data)
                    if (res.data.length > 0) {
                        earning.setList(res.data)
                        $('.more').css('display', 'none')
                    } else {
                        if (earning.tableData.length > 0) {
                            $('.more').text('没有更多数据').css('display', 'block')
                        } else {
                            $('.more').text('暂无数据').css('display', 'block')
                        }
                        earning.setList(res.data)
                    }
                } else {
                    $config.yfAlert(res.message)
                }
            },
            error: function () {
                $config.yfAlert('网络异常')
            }
        });
    },
    setList: function () {
        var str = ''
        for (var i = 0; i < earning.tableData.length; i++) {
            str += (function (num) {
                var obj = earning.tableData[num]
                return ' <tr class="flexbox between">'
                    + '    <td class="column col-left">'
                    + '        <h1>兑换' + $config.toThousands(obj.amt) + '人民币</h1>'
                    + '        <p>' + (obj.createTime || '-') + '</p>'
                    + '    </td>'
                    + '    <td class="column">'
                    + '        <h6>-' + $config.toThousands(obj.amt) + '</h6>'
                    + '    </td>'
                    + '</tr>'
            })(i)
        }
        $('.contain table').html(str)
    },
}
function showEarningDetail(bool) {
    $('.nav-tip').css('display', 'none')
    window.webkit.messageHandlers.jumpToShowBreakDown.postMessage({ live: bool });
}
function jumpToProblems() {
    window.location.href = "integral.html?" + window.location.href.split('?')[1]
}
function toExtend() {
    if(earning.sex){
        window.webkit.messageHandlers.jumpToInviteReward.postMessage({})
    }else {
        window.location.href = 'http://miyiurl.rklive888.com/guide/chatExpert.html'
    }
}
function calculate() {
    var inter = $('.input-want').val();
    if (!inter) {
        $('.input-tip span:last-of-type b').html('0.00')
        $('.tip-warn').html('可兑换积分' + earning.inter).removeClass('warning')
    } else if (!(+inter) || (inter.indexOf('.') > -1 && (+inter.split('.')[1]) > 0)) {
        $('.tip-warn').html('单次兑换积分数为整数').addClass('warning')
        $('.apply').removeClass('btn-show-active').attr('disabled', true)
    } else if (+inter < 100) {
        // $('.tip-warn').html('不得为小于100积分的整数')
    } else if (+inter > +earning.inter) {
        $('.tip-warn').html('超出可兑换积分').addClass('warning')
        $('.input-tip span:last-of-type b').html('0.00')
        $('.apply').removeClass('btn-show-active').attr('disabled', true)
    } else {
        $('.tip-warn').html('可兑换积分' + earning.inter).removeClass('warning')
        $('.input-tip span:last-of-type b').html((+inter).toFixed(2))
        $('.apply').addClass('btn-show-active').attr('disabled', false)
    }
}
function handleCheck() {
    if (!$(".rule-wrap input[type='checkbox']").is(':checked')) {
        $('.apply').removeClass('btn-show-active').attr('disabled', true)
    } else {
        $('.apply').addClass('btn-show-active').attr('disabled', false)
    }
}
function changeok() { //兑换申请
    if(earning.submitChange) return
    earning.submitChange = true
    if ($('.apply').attr('disabled')) return;
    var inter = $('.input-want').val();
    if (!inter) {
        layer.msg('请输入兑换积分数')
    } else if (!(+inter) || (inter.indexOf('.') > -1 && (+inter.split('.')[1]) > 0)) {
        layer.msg('单次兑换积分数为整数')
    } else if (+inter < 100) {
        layer.msg('单次兑换积分数不得为小于100积分的整数')
    } else if (+inter > +earning.inter) {
        layer.msg('您的积分不足')
    } else if (!$(".rule-wrap input[type='checkbox']").is(':checked')) {
        layer.msg('请阅读并同意“兑换规则”')
    } else {
        var result = $('.result').text();
        var need = earning.exchange.cost - earning.exchange.rechargeBal
        mui.confirm('兑换积分：-' + result + '积分<br>到账钻石：+' + result + '钻石<br>'
            + (earning.routerFrom == 'vip' ? +result < +need ? '兑换' + earning.exchange.month + '个月的白银贵族，您至少需要兑换' + need
                + '钻石。您当前兑换的钻石不够，是否要继续完成兑换。' : '' : ''), ' ', ['返回修改', '立即兑换'], function (e) {
                    if (e.index == 1) {
                        submit()
                    }
                })
    }
    earning.submitChange = false
}

function submit() {
    var params = {
        customerId: earning.customerId,
        token: earning.token,
        tokenCustomerId: earning.tokenCustomerId,
        amt: $('.input-want').val()
    }
    $.ajax({
        type: "POST",
        url: $config.toUrl(earning.env, '/api/miyiGain/conversionToZs'),
        data: params,
        dataType: "json",
        success: function (res) {
            earning.submitChange = false
            if (res.result) {
                window.location.href = 'exchangeSuccess.html?earn=' + $('.input-want').val() + '&' + window.location.href.split('?')[1]
            } else {
                layer.msg(res.message)
            }
        },
        error: function () {
            earning.submitChange = false
            $config.yfAlert('网络异常')
        }
    })
}

function scrollList() {
    if ($('.record').scrollTop() == $('.record table').height() - Math.ceil($('.record').height())) {
        $('.more').html('加载更多的数据...').css('display', 'block')
        earning.page++;
        clearTimeout(earning.timer)
        earning.timer = setTimeout(earning.getList, 1000)
    }
}

function doExchange() {
    // 积分兑换钻石
    sessionStorage.setItem('routerFrom', 'earning')
    window.location.href = 'exchange.html?' + window.location.href.split('?')[1]
}

function exchangeMoney() {
    // 兑换人民币
    $('.menu').show()
}
function withDraw(type) {
    // 支付宝提现
    var currentInter = type == 1 ? earning.unLiveInter : earning.liveInter
    if (earning.sex == 1 && +currentInter / 100 < 50) {
        layer.msg('满50元方可提现')
        return;
    }
    if (!earning.phone) {
        window.webkit.messageHandlers.jumpTobindPhone.postMessage({});
        return;
    }
    //资质认证
    var params = {
        iVersion: earning.iVersion,
        sex: earning.sex,
        customerId: earning.customerId,
        tokenCustomerId: earning.tokenCustomerId,
        type: 0,
        token: earning.token,
    }
    $.ajax({
        type: "GET",
        url: $config.toUrl(earning.env, '/api/miyiGain/isCertified'),
        data: params,
        dataType: "json",
        success: function (res) {
            if (res.result) {
                if (res.data.isCertified == 1) { //认证通过
                    var param = $config.getQueryAll();
                    param['token'] = earning.token
                    param['type'] = type
                    // param['phone'] = earning.phone
                    // param['areaCode'] = earning.areaCode
                    // param['inter'] = earning.inter
                    // param['isHasCoupon'] = earning.isHasCoupon
                    // param['sex'] = earning.sex
                    window.location.href = 'index.html?' + $config.setQueryConfig(param)
                } else {   //认证失败
                    window.webkit.messageHandlers.jumpToAccrediteConfirm.postMessage({})
                }
            } else {
                layer.msg(res.message)
            }
        },
        error: function () {
            $config.yfAlert('网络异常')
        }
    })
}
function exchangeRecord() {
    window.webkit.messageHandlers.jumpToExchangeRecord.postMessage({ inter: earning.inter })
}
function openTip() {
    $config.confirm('<h1 class="confirm-title">说明</h1><p>1.“收益统计”的计量单位是元，数据精确到小数点后一位，并且未四舍五入。<br>2.收益统计所显示的收益数不代表最终可以提现到账的金额(支付宝提现会根据金额扣除部分的手续费)。<br>3.收益统计不展示因为兑换钻石、提现、在后台等扣除了积分后的数据，只会展示对应时间内增加的积分数。<br>4.最终解释权归觅伊官方所有。</p><button onclick="layer.closeAll()">我知道了</button>', [], function (index) { })
    $('.popup-btn-wrap').css('display', 'none')
    $('.layui-layer-shade').click(function () {
        layer.closeAll()
    })
}

earning.init()
$('body').height($('body')[0].clientHeight);