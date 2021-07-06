var cash = {
    env: $config.getQueryStringByName('env') || 'developXuWei',
    roleType: 0,
    customerId: $config.getQueryStringByName("customerId"),
    token: $config.getQueryStringByName("token"),
    isFrom: $config.getQueryStringByName("isFrom"),
    iVersion: $config.getQueryStringByName("iVersion"),
    tokenCustomerId: $config.getQueryStringByName("tokenCustomerId"),
    type: $config.getQueryStringByName("type"),   //提现到支付宝的积分类型  1非直播,2直播
    inter: 0,
    isHasCoupon: 0,//是否有低门槛劵
    sex: 1,//性别
    isBindMobile: false,
    timer: null,
    timer2: null,
    checkCode: false,
    isDoApply: false,
    userInfo: {
        phone: '',
        areaCode: '86',
        money: 0,
    },
    alipay: {
        name: decodeURI($config.getQueryStringByName("aliName")),
        account: decodeURI($config.getQueryStringByName("aliAccount"))
    },
    init: function () {
        cash.created();
        cash.bindEvent();
    },
    bindEvent: function () {
        $('#openSelect ul li').each(function (index, ele) {
            $(ele).on('click', function () {
                $('.select-li').html('+' + $(ele).attr('value'))
                cash.userInfo.areaCode = $(ele).attr('value')
                layer.closeAll()
            })
        })
    },
    created: function () {
        var params = {
            customerId: cash.customerId,
            token: cash.token,
            tokenCustomerId: cash.tokenCustomerId,
            isCashOutPage: 1
        }
        $.ajax({
            type: "GET",
            url: $config.toUrl(cash.env, "/api/miyiGain/myWallet"),
            data: params,
            dataType: "json",
            success: function (res) {
                if (res.result) {
                    cash.userInfo = {
                        phone: res.data.mobile,
                        areaCode: res.data.areaCode,
                    }
                    cash.inter = (cash.type == 1 ? res.data.jifen : res.data.liveJifen).toFixed(2)
                    cash.phone = res.data.mobile
                    cash.areaCode = res.data.areaCode
                    cash.sex = res.data.sex
                    cash.isHasCoupon = +res.data.isHasCoupon
                    // 女性用户才有提现劵
                    if (res.data.sex == 0 && +res.data.isHasCoupon > 0 && +res.data.isFristIn > 0) {
                        mui.confirm('您有一张5元提现券。<br>使用限制：5≤提现金额<50。<br>有效期：' + (res.data.validTimeStr || '-') + '。<br>提现时支付宝会收取手续费，提现金额越多，手续费越少，到账金额越多。', ' ', ['我知道了'], function (e) {
                        }, 'div')
                    }
                    cash.mounted();
                } else {
                    $config.yfAlert(res.message)
                }
            },
            error: function () {
                $config.yfAlert('网络异常')
            }
        });
    },
    mounted: function (data) {
        var targetObj = JSON.parse(localStorage.getItem('target')) || {}
        if (targetObj.customerId == cash.customerId) {
            cash.alipay.name = targetObj.targetName
            cash.alipay.account = targetObj.targetAcct
        }
        $('.bind-name').val(cash.alipay.name)
        $('.bind-account').val(cash.alipay.account)
        $('.user-phone').html('*******' + cash.userInfo.phone.substr(7, 11))
        $('.old-phone').attr('placeholder', '*******' + cash.userInfo.phone.substr(7, 11))
        $('.select-li').html('+' + cash.userInfo.areaCode)
        // $('.header-title h1').html(Number(cash.userInfo.money).toFixed(2) || 0.00)
        $('.withDraw-inter').html(cash.inter)
        // 如果是男性用户，则不展示低门槛劵
        if (cash.sex == 1) {
            $('.sex0-show').css('display', 'none')
        }
    },
}
$('.doselect').change(function (ele) {
    doSelect(this)
})
function doSelect(ele) {
    var value = $(ele).find("option:selected").val()
}
function goRule(type) { //提现规则
    window.location.href = "rule.html?" + window.location.href.split('?')[1]
}
function goPay() {//绑定支付宝
    window.location.href = "bindAlipay.html?" + window.location.href.split('?')[1]
}
function changePhone() {
    window.location.href = "phone.html?" + window.location.href.split('?')[1]
}
function getVerify() { //获得验证码
    var params = {
        specifier: 1,
        iVersion: cash.iVersion,
        areaCode: cash.userInfo.areaCode,
        customerId: cash.customerId,
        tokenCustomerId: cash.tokenCustomerId,
        token: cash.token,
        account: cash.userInfo.phone,
        isShine: 1
    }
    sendCode(params, $('.verify-count'), cash.timer)
}

function count() {
    var target = $('.money-write')[0].value;
    var data = (target * 0.005);
    var discount = (data > 25) ? 25 : data < 2 ? 2 : target * 0.005;
    if (target > 0) {
        $('.input-clear').css('display', 'flex')
    }
    if (+target > 5000) {
        layer.msg('每日最多可提现5000元')
    } else if (+target > +cash.inter) {
        layer.msg('您的积分不足')
    } else {
        $('.money-get')[0].value = Math.round(target - discount) < 0 ? '0.00元' : Math.round(target - discount).toFixed(2) + '元'
    }
    isEmpty()
}
function clearInput() {
    $('.money-write').val("");
    $('.money-get').val("");
    $('.input-clear').css('display', 'none')
    isEmpty()
}


// 绑定手机号
function openSelect() {
    $config.dialogComm($('#openSelect'), 'selectUl')
}
function updateBtn() {
    if (!$('.old-phone').val() || $('.old-phone').val().length > 11) {
        $('.next-btn').removeClass('btn-show-active').attr('disabled', true)
    } else {
        $('.next-btn').addClass('btn-show-active').attr('disabled', false)
    }
}
function goNext() { //更换手机号时验证用户身份
    if ($('.next-btn').attr('disabled')) return;
    if (!$('.old-phone').val()) {
        layer.msg('请输入已绑定的手机号');
        return;
    }
    var params = {
        specifier: 6,
        areaCode: cash.userInfo.areaCode,
        iVersion: cash.iVersion,
        customerId: cash.customerId,
        tokenCustomerId: cash.tokenCustomerId,
        token: cash.token,
        account: $('.old-phone').val(),
    }
    $.ajax({
        type: "POST",
        url: $config.toUrl(cash.env, "/api/miyiGain/verificationMobile"),
        data: params,
        dataType: "json",
        success: function (res) {
            if (res.result) {
                changeSucceedJSAction()
            } else {
                $config.yfAlert(res.message)
            }
        },
        error: function () {
            $config.yfAlert('网络异常')
        }
    });
}
function changeSucceedJSAction() {
    $('.change-phone').css('display', 'none')
    $('.bind-phone').css('display', 'block')
}
function sendVerify() {
    if (!$('.new-phone').val()) {
        layer.msg('请输入手机号')
        return;
    }
    //获取验证码
    var params = {
        specifier: 8,
        iVersion: cash.iVersion,
        areaCode: cash.userInfo.areaCode,
        customerId: cash.customerId,
        tokenCustomerId: cash.tokenCustomerId,
        token: cash.token,
        account: $('.new-phone').val(),
        isShine: 1
    }
    sendCode(params, $('.send-verify'), cash.timer2)
}
function sendCode(params, ele, timer) {
    var count = 60;
    $.ajax({
        type: "POST",
        url: $config.toUrl(cash.env, "/api/miyiGain/sendCode"),
        data: params,
        dataType: "json",
        success: function (res) {
            if (res.result) {
                if ($(ele).attr('disabled')) return;
                $(ele).html(count + 's')
                timer = setInterval(function () {
                    count--;
                    if (count > 0) {
                        $(ele).html(count + 's').attr('disabled', true)
                    } else {
                        $(ele).html('发验证码').attr('disabled', false)
                        clearInterval(timer);
                    }
                }, 1000)
            } else {
                $config.yfAlert(res.message)
            }
        },
        error: function () {
            $config.yfAlert('网络异常')
        }
    });
}
function updateNewBtn() {
    if (!$('.new-phone').val() || $('.new-phone').val().length > 11 || !$('.new-phone-verify').val()) {
        $('.new-btn').removeClass('btn-show-active').attr('disabled', true)
    } else {
        $('.new-btn').addClass('btn-show-active').attr('disabled', false)
    }
}
function submitOk() {
    var params = {
        customerId: cash.customerId,
        token: cash.token,
        account: $('.new-phone').val(),
        code: $('.new-phone-verify').val().slice(0, 6),
        specifier: 8,
        areaCode: cash.userInfo.areaCode,
        isShine: 1
    }
    if (!params.account) {
        layer.msg('请输入手机号');
        return;
    }
    if (!params.code) {
        layer.msg('请输入验证码');
        return;
    }
    // 确认短信验证码
    $.ajax({
        type: "POST",
        url: $config.toUrl(cash.env, "/api/miyiGain/check"),
        data: params,
        dataType: "json",
        success: function (res) {
            if (res.result) {
                // 更换手机号
                $.ajax({
                    type: "POST",
                    url: $config.toUrl(cash.env, "/api/miyiGain/updatePhone"),
                    data: {
                        customerId: cash.customerId,
                        token: cash.token,
                        code: $('.new-phone-verify').val(),
                        mobile: $('.new-phone').val(),
                        specifier: 8,
                        iVersion: cash.iVersion,
                        areaCode: cash.userInfo.areaCode,
                        isShine: 1
                    },
                    dataType: "json",
                    success: function (res) {
                        if (res.result) {
                            confirmSucceedJSAction()
                        } else {
                            $config.yfAlert(res.message)
                        }
                    },
                    error: function () {
                        $config.yfAlert('网络异常')
                    }
                });

            } else {
                $config.yfAlert(res.message)
            }
        },
        error: function () {
            $config.yfAlert('网络异常')
        }
    });
}
function confirmSucceedJSAction() {
    var param = $config.getQueryAll();
    param['token'] = cash.token
    param['phone'] = $('.new-phone').val()
    param['areaCode'] = cash.userInfo.areaCode
    window.location.href = 'index.html?' + $config.setQueryConfig(param)
}
function isEmpty() {
    var params = {
        targetName: $('.bind-name').val(),
        targetAcct: $('.bind-account').val(),
        code: $('.verigy-write').val(),
        account: cash.userInfo.phone,
        amt: $('.money-write').val(),
        getMoney: $('.money-get').val(),
    }
    if (!params.targetName || !params.targetAcct || !params.code || !params.account || !params.amt || +params.amt < 1 || !params.getMoney) {
        $('.apply').removeClass('btn-show-active').attr('disabled', true)
    } else {
        $('.apply').addClass('btn-show-active').attr('disabled', false)
    }
}
function checkCode() {
    if (!$('.verigy-write').val()) {
        layer.msg('请输入验证码')
    }
    $.ajax({
        type: "POST",
        url: $config.toUrl(cash.env, "/api/miyiGain/check"),
        data: {
            customerId: cash.customerId,
            token: cash.token,
            // account: cash.userInfo.phone,
            code: +$('.verigy-write').val().slice(0, 6),
            specifier: 1,
            areaCode: cash.userInfo.areaCode,
            isShine: 1
        },
        dataType: "json",
        success: function (res) {
            if (res.result) {
                cash.checkCode = true
            } else {
                cash.checkCode = false
                $config.yfAlert(res.message)
            }
        },
        error: function () {
            $config.yfAlert('网络异常')
        }
    });
    isEmpty()
}
function doApply() {
    console.log("前",cash.isDoApply);
    if(cash.isDoApply){
        return
    }
    console.log("后",cash.isDoApply);
    cash.isDoApply = true
    var params = {
        targetName: $('.bind-name').val(),
        iVersion: cash.iVersion,
        customerId: cash.customerId,
        amt: (+$('.money-write').val()) * 100,
        targetType: 2,
        tokenCustomerId: cash.tokenCustomerId,
        targetAcct: $('.bind-account').val(),
        cashOutType: cash.type == 1 ? 2 : 3,
        token: cash.token,
        isShine: 1,
        cashOutCoupon: $('[name="checkbox1"]').prop("checked") == true ? 1 : 0
    }
    if (cash.sex == 1) {
        delete params.cashOutCoupon
    }
    if (!cash.checkCode) {
        checkCode();
        return;
    }
    var amtMoney = $('.money-write').val()
    if ($('.apply').attr('disabled')) return;
    if (!params.targetName) {
        layer.msg('请输入真实姓名')
    } else if (!params.targetAcct) {
        layer.msg('请输入支付宝账号')
    } else if (!$('.verigy-write').val()) {
        layer.msg('请输入验证码')
    } else if (!amtMoney || +amtMoney > 5000) {
        layer.msg(+amtMoney > 5000 ? '每日最多可提现5000元' : '请输入正确的金额')
    } else { //0-5000
        if (cash.sex == 1) { //男
            if (+amtMoney < 50) {
                layer.msg('满50元方可提现')
                return;
            }
        } else if (cash.sex == 0) {
            // 有低门槛劵
            if (+cash.isHasCoupon > 0) {
                if (params.cashOutCoupon) {  //选中
                    if (+amtMoney < 5) {
                        cash.isDoApply = false
                        layer.msg('提现金额不能小于5.00元');
                        return;
                    } else if (+amtMoney >= 50) {
                        mui.confirm('您的提现金额≥50元，未满足使用“低门槛提现券”的使用条件：5≤提现金额<50。请取消勾选。', ' ', ['取消', '不使用并提现'], function (e) {
                            if (e.index == 1) {
                                $('#selectCheck').attr('checked', false)
                                params.cashOutCoupon = 0
                                sendApplyAjax(params)
                            }
                        })
                        return;
                    }
                } else {  //未选中
                    if (+amtMoney < 5) {
                        cash.isDoApply = false
                        layer.msg('满50元方可提现')
                        return;
                    } else if (+amtMoney < 50 && +amtMoney >= 5) {
                        cash.isDoApply = false
                        mui.confirm('您的提现金额小于50元，请使用低门槛提现券进行提现。', ' ', ['我知道了'], function (e) {
                            $('#selectCheck').attr('checked', true)
                            params.cashOutCoupon = 1
                        })
                        return;
                    }
                }
            } else {  //没有劵
                if (params.cashOutCoupon) {  //选中
                    if (+amtMoney < 50) {
                        cash.isDoApply = false
                        mui.confirm('您暂无低门槛提现券，提现金额必须≥50元。在开通贵族期间，每月第一天将赠送您一张低门槛提现券。拥有提现券，满5元即可申请提现。', ' ', ['暂不开通', '立即开通'], function (e) {
                            if (e.index == 1) {
                                cash.isDoApply = false
                                $('.mui-popup-backdrop').remove(); // 去除遮罩
                                $('.mui-popup').remove();
                                window.location.href = "http://miyiurl.rklive888.com/vip/dev/vip.html?" + window.location.href.split('?')[1]
                            }
                        })
                        return;
                    } else {
                        mui.confirm('您暂时没有“低门槛提现劵”', ' ', ['取消', '不使用并提现'], function (e) {
                            if (e.index == 1) {
                                $('#selectCheck').attr('checked', false)
                                params.cashOutCoupon = 0
                                sendApplyAjax(params)
                            }
                        })
                        cash.isDoApply = false
                        return;
                    }
                } else {  //未选中
                    if (+amtMoney < 50) {
                        cash.isDoApply = false
                        layer.msg('满50元方可提现')
                        return;
                    }
                }
            }
        }
        sendApplyAjax(params)
    }

    cash.isDoApply = false


    // if (+amtMoney < 50) {
    //     if (cash.sex == 0) {
    //         // if (+amtMoney < 50 && +amtMoney >= 5) {
    //         if (!params.cashOutCoupon) { //未选中低门槛劵
    //             if (+cash.isHasCoupon > 0) { //有低门槛劵
    //                 mui.confirm('您的提现金额小于50元，请勾选使用5元优惠券。', ' ', ['选中5元优惠券'], function (e) {
    //                     $('[name="checkbox1"]:checkbox').attr('checked', true)
    //                     params.cashOutCoupon = 1
    //                 })
    //                 return;
    //             } else { //没有低门槛劵
    //                 layer.msg('满50元方可提现')
    //                 return;
    //             }
    //         } else {  //  选中低门槛劵
    //             if (+amtMoney < 5) {
    //                 layer.msg('提现金额不能小于5.00元');
    //                 return;
    //             }
    //             // else if (+cash.isHasCoupon > 0) { //有低门槛劵
    //             // mui.confirm('您的提现金额小于50元，请勾选使用5元优惠券。', ' ', ['选中5元优惠券'], function (e) {
    //             //     $('[name="checkbox1"]:checkbox').attr('checked', true)
    //             // })
    //             // return;
    //             // }
    //             else { //没有低门槛劵
    //                 mui.confirm('您暂无低门槛提现券，提现金额必须≥50元。在开通贵族期间，每月第一天将赠送您一张低门槛提现券。拥有提现券，满5元即可申请提现。', ' ', ['暂不开通', '立即开通'], function (e) {
    //                     if (e.index == 1) {
    //                         window.location.href = "../vip.html?" + window.location.href.split('?')[1]
    //                     }
    //                 })
    //                 return;
    //             }
    //         }
    //         sendApplyAjax(params)
    //         // }
    //     } else {
    //         layer.msg('满50元方可提现');
    //         return
    //     }
    // } else {
    //     // 50-5000
    //     //女用户
    //     if (cash.sex == 0 && params.cashOutCoupon) { //勾选中低门槛劵
    //         if (+cash.isHasCoupon > 0) {
    //             mui.confirm('您的提现金额≥50元，未满足使用“低门槛提现券”的使用条件：5≤提现金额<50。请取消勾选。', ' ', ['取消', '不使用并提现'], function (e) {
    //                 if (e.index == 1) {
    //                     $('[name="checkbox1"]:checkbox').attr('checked', false)
    //                     params.cashOutCoupon = 0
    //                     sendApplyAjax(params)
    //                 }
    //             })
    //         } else {
    //             mui.confirm('您暂无低门槛提现券，提现金额必须≥50元。在开通贵族期间，每月第一天将赠送您一张低门槛提现券。拥有提现券，满5元即可申请提现。', ' ', ['暂不开通', '立即开通'], function (e) {
    //                 if (e.index == 1) {
    //                     window.location.href = "../vip.html?" + window.location.href.split('?')[1]
    //                 }
    //             })
    //         }
    //     } else {
    //         sendApplyAjax(params)
    //     }

    // }
}

function sendApplyAjax(params) {
    // 发起提现申请
    $.ajax({
        type: "POST",
        url: $config.toUrl(cash.env, "/api/miyiGain/addWithZhiFuBao"),
        data: params,
        dataType: "json",
        success: function (res) {
            cash.isDoApply = false
            if (res.result) {
                // 提现申请界面
                window.location.reload(); 
                window.webkit.messageHandlers.jumpToApplyOk.postMessage(res.data)
            } else {
                $config.yfAlert(res.message)
            }
        },
        error: function () {
            cash.isDoApply = false
            $config.yfAlert('网络异常')
        }
    });
}
function goRuleDetail() {
    window.location.href = 'withdrawrule.html?' + window.location.href.split('?')[1]
}
cash.init();