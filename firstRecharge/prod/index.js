var pay = {
  env: 'demo',
  token: $config.getQueryStringByName("token"),
  customerId: $config.getQueryStringByName("customerId"),
  isFrom: $config.getQueryStringByName("isFrom"),
  flag: false,
  isLogin: null,
  iVersion: null,
  isRecharged: null,
  init: function () {
    if ($config.browser.versions.android) {
      $('.isAndroid').removeClass('popup')
      $('.wrap>li>i').css('margin-top', '.7rem')
    } else {
      $('.isApple').removeClass('popup')
      $('.isAppleNum').text('7')
      $('.wrap-488 .title').css('background-image', 'url("images/title_488_iphone.png")')
    }
    pay.created()
  },
  created: function () {
    var parmas = {
      token: pay.token,
      customerId: pay.customerId
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(pay.env, '/act/myRecharge/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (res.result) {
          pay.isLogin = res.data.isLogin
          pay.iVersion = res.data.iVersion
          pay.isRecharged = res.data.isRecharged
          $('footer a').attr('href', res.data.eChatMiyiUrl)
          if (!pay.isLogin) {
            $config.dialogComm($('#isLogin'), 'isLogin')
          }
        } else {
          layer.msg(res.message)
        }
      },
      error: function () {
        layer.msg('网络异常', {
          time: false,
          shade: 0.5
        })
      }
    })
  }
}
function closeWrap(that, type) {
  if (pay.flag) return
  pay.flag = true
  $('.wrap-' + type + ' .slide-wrap').slideToggle()
  if ($(that).attr('flag') == 1) {
    $(that).attr('flag', '0')
    $(that).addClass('open-btn')
    $('.wrap-' + type).addClass('small-height').removeClass('big-height')
    setTimeout(function () {
      $('.wrap-' + type + ' .slide-text').removeClass('popup')
      pay.flag = false
    }, 500)
  } else {
    $('.wrap-' + type + ' .slide-text').addClass('popup')
    $(that).attr('flag', '1')
    $(that).removeClass('open-btn')
    $('.wrap-' + type).removeClass('small-height').addClass('big-height')
    setTimeout(() => {
      pay.flag = false
    }, 600);
  }
}
function toPay(money) {
  if (!pay.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  if (pay.isRecharged) {
    layer.msg('本活动限新用户参与，您当前不满足条件')
    return
  }
  if ($config.browser.versions.android) {
    if (pay.iVersion.slice(-3) < 157) {
      layer.msg('当前版本过低, 请更新版本!')
      return
    }
  } else {
    if (pay.iVersion.slice(-3) < 148) {
      layer.msg('当前版本过低, 请更新版本!')
      return
    }
  }
  if ($config.browser.versions.android) {
    if (money < 488) {
      $('#payWaysOne button').attr('money', money)
      var str = null
      switch (money) {
        case 6:
          str =
            '<li class="award-item">' +
            '<div class="award-item-num">x3个</div>' +
            '<div class="award-img">' +
            '<img src="images/meteor.png">' +
            '</div>' +
            '<div class="award-name">对流星许愿</div>' +
            '<div class="award-price">(20钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期3天</div>' +
            '<div class="award-img">' +
            '<img src="images/car_1.png">' +
            '</div>' +
            '<div class="award-name">寻爱单车</div>' +
            '<div class="award-price">进场特效</div>' +
            '</li>'
          $('#payWaysOne .alipay .alipay-money').text('600钻石')
          $('#payWaysOne .wechat .alipay-money').text('420钻石')
          break;
        case 18:
          str =
            '<li class="award-item">' +
            '<div class="award-item-num">x5个</div>' +
            '<div class="award-img">' +
            '<img src="images/meteor.png">' +
            '</div>' +
            '<div class="award-name">对流星许愿</div>' +
            '<div class="award-price">(20钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期3天</div>' +
            '<div class="award-img">' +
            '<img src="images/car_1.png">' +
            '</div>' +
            '<div class="award-name">寻爱单车</div>' +
            '<div class="award-price">进场特效</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期3天</div>' +
            '<div class="award-img">' +
            '<img src="images/vip_1.png">' +
            '</div>' +
            '<div class="award-name">白银贵族</div>' +
            '</li>'
          $('#payWaysOne .alipay .alipay-money').text('1800钻石')
          $('#payWaysOne .wechat .alipay-money').text('1260钻石')
          break;
        case 30:
          str =
            '<li class="award-item">' +
            '<div class="award-item-num">x5个</div>' +
            '<div class="award-img">' +
            '<img src="images/meteor.png">' +
            '</div>' +
            '<div class="award-name">对流星许愿</div>' +
            '<div class="award-price">(20钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期7天</div>' +
            '<div class="award-img">' +
            '<img src="images/car_1.png">' +
            '</div>' +
            '<div class="award-name">寻爱单车</div>' +
            '<div class="award-price">进场特效</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-img">' +
            '<img src="images/ticket.png">' +
            '</div>' +
            '<div class="award-name">充值券</div>' +
            '<div class="award-price">(30元送300钻)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期7天</div>' +
            '<div class="award-img">' +
            '<img src="images/vip_1.png">' +
            '</div>' +
            '<div class="award-name">白银贵族</div>' +
            '</li>'
          $('#payWaysOne .alipay .alipay-money').text('3000钻石')
          $('#payWaysOne .wechat .alipay-money').text('2100钻石')
          break;
        case 50:
          str =
            '<li class="award-item">' +
            '<div class="award-item-num">x7个</div>' +
            '<div class="award-img">' +
            '<img src="images/meteor.png">' +
            '</div>' +
            '<div class="award-name">对流星许愿</div>' +
            '<div class="award-price">(20钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">x2个</div>' +
            '<div class="award-img">' +
            '<img src="images/cat.png">' +
            '</div>' +
            '<div class="award-name">就想摸摸你</div>' +
            '<div class="award-price">(199钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期7天</div>' +
            '<div class="award-img">' +
            '<img src="images/car_2.png">' +
            '</div>' +
            '<div class="award-name">红色保时捷</div>' +
            '<div class="award-price">进场特效</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期7天</div>' +
            '<div class="award-img">' +
            '<img src="images/vip_2.png">' +
            '</div>' +
            '<div class="award-name">黄金贵族</div>' +
            '</li>'
          $('#payWaysOne .alipay .alipay-money').text('5000钻石')
          $('#payWaysOne .wechat .alipay-money').text('3500钻石')
          break;
        case 98:
          str =
            '<li class="award-item">' +
            '<div class="award-item-num">x3个</div>' +
            '<div class="award-img">' +
            '<img src="images/cat.png">' +
            '</div>' +
            '<div class="award-name">就想摸摸你</div>' +
            '<div class="award-price">(20钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">x4个</div>' +
            '<div class="award-img">' +
            '<img src="images/heart.png">' +
            '</div>' +
            '<div class="award-name">爱你小心心</div>' +
            '<div class="award-price">(199钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期14天</div>' +
            '<div class="award-img">' +
            '<img src="images/car_3.png">' +
            '</div>' +
            '<div class="award-name">兰博基尼</div>' +
            '<div class="award-price">进场特效</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期14天</div>' +
            '<div class="award-img">' +
            '<img src="images/vip_2.png">' +
            '</div>' +
            '<div class="award-name">黄金贵族</div>' +
            '</li>'
          $('#payWaysOne .alipay .alipay-money').text('9800钻石')
          $('#payWaysOne .wechat .alipay-money').text('6860钻石')
          break;
        case 298:
          str =
            '<li class="award-item">' +
            '<div class="award-item-num">x11个</div>' +
            '<div class="award-img">' +
            '<img src="images/lollipop.png">' +
            '</div>' +
            '<div class="award-name">爱意棒棒糖</div>' +
            '<div class="award-price">(399钻石)</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">x5次</div>' +
            '<div class="award-img">' +
            '<img src="images/blind.png">' +
            '</div>' +
            '<div class="award-name">直播间</div>' +
            '<div class="award-price">免费抽盲盒</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期30天</div>' +
            '<div class="award-img">' +
            '<img src="images/car_4.png">' +
            '</div>' +
            '<div class="award-name">劳斯莱斯幻影</div>' +
            '<div class="award-price">进场特效</div>' +
            '</li>' +
            '<li class="award-item">' +
            '<div class="award-item-num">有效期21天</div>' +
            '<div class="award-img">' +
            '<img src="images/vip_2.png">' +
            '</div>' +
            '<div class="award-name">黄金贵族</div>' +
            '</li>'
          $('#payWaysOne .alipay .alipay-money').text('29800钻石')
          $('#payWaysOne .wechat .alipay-money').text('20860钻石')
          break;
      }
      $('.welfare ul').html(str)
      $('#payWaysOne button span').html('<i>¥</i>' + money)
      $config.dialogComm($('#payWaysOne'), 'payWaysOne')
    } else {
      $('.payWaysTwo button').attr('money', money)
      $config.dialogComm($('#payWaysTwo'), 'payWaysTwo')
    }
  } else {
    window.webkit.messageHandlers.jumpToWebPay.postMessage({
      money: money,
      actFrom: 'miyiFristRecharge'
    })
  }
}
function toPayAndroid(that) {
  var money = $(that).attr('money'),
    payway = $(that).attr('payway')
  client.jumpToWebPay(money, payway, 'miyiFristRecharge')
}
function paySuccess() {
  pay.isRecharged = true
  $config.dialogComm($('#paySuccess'), 'paySuccess')
}
function toRule() {
  $config.dialogComm($('#rulePage'), 'rulePage')
}
function selectPayWays(that, type) {
  $(that).addClass('isSelect')
  if (type) {
    $('#payWaysOne .wechat .select-icon').removeClass('isSelect')
    $('#payWaysOne button').attr('payway', 'alipay')
    $('#payWaysOne .alipay .diamond').addClass('isSelect')
    $('#payWaysOne .wechat .diamond').removeClass('isSelect')
    $('#payWaysOne .alipay .pay-ways-logo-wrap').removeClass('isSelect')
    $('#payWaysOne .wechat .pay-ways-logo-wrap').addClass('isSelect')
  } else {
    $('#payWaysOne .alipay .select-icon').removeClass('isSelect')
    $('#payWaysOne button').attr('payway', 'wechat')
    $('#payWaysOne .wechat .diamond').addClass('isSelect')
    $('#payWaysOne .alipay .diamond').removeClass('isSelect')
    $('#payWaysOne .wechat .pay-ways-logo-wrap').removeClass('isSelect')
    $('#payWaysOne .alipay .pay-ways-logo-wrap').addClass('isSelect')
  }
}
function selectPayWaysA(that, type) {
  $(that).addClass('isSelect')
  if (type) {
    $(that).siblings('.wechat').removeClass('isSelect')
    $('.pay-money-select').css('border', '1px solid #2F73F9')
    $('#payWaysTwo button').attr('payway', 'alipay')
    $('.diamond-text-alipay').removeClass('popup').siblings('.diamond-text').addClass('popup')
  } else {
    $(that).siblings('.alipay').removeClass('isSelect')
    $('.pay-money-select').css('border', '1px solid #1BBB1F')
    $('#payWaysTwo button').attr('payway', 'wechat')
    $('.diamond-text-wechat').removeClass('popup').siblings('.diamond-text').addClass('popup')
  }
}
function selectPayMoney(that) {
  $('.pay-money-select .select-icon').removeClass('isSelect')
  $(that).addClass('isSelect')
  $('#payWaysTwo button').attr('money', $(that).siblings().text().slice(1))
}
function goBack() {
  if ($config.browser.versions.android) {
    client.jumpToChatList()
  } else {
    window.webkit.messageHandlers.jumpToChatList.postMessage({})
  }
}
pay.init()
