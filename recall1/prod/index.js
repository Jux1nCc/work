var recall = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  token: $config.getQueryStringByName("token"),
  apkChannel: $config.getQueryStringByName("apkChannel"),
  recallDay: '0',
  indexPage: window.location.href.indexOf('index'),
  recordPage: window.location.href.indexOf('giveRecord'),
  init: function () {
    recall.created()
  },
  created: function () {
    var params = {
      customerId: recall.customerId,
      token: recall.token,
    }
    $.ajax({
      type: "GET",
      url: $config.toUrl(recall.env, "/act/recall/authApi/index"),
      data: params,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.result) {
          recall.recallDay = res.data.recallDay
          if (recall.recallDay > 37) {
            $('title').text('赠送记录')
            $('.page').addClass('popup').siblings('.recharge-page').addClass('popup').siblings('.give-record-page').removeClass('popup')
            recall.createdRecord()
            return
          }
          $('title').text('充值优惠')
          $('.page').addClass('popup').siblings('.homepage').removeClass('popup').siblings('.give-record-page').addClass('popup')
          recall.mounted(res.data)
        } else {
          $config.yfAlert(res.message)
          $('title').text('充值优惠')
          $('.page').addClass('popup').siblings('.recharge-page').removeClass('popup')
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    })
  },
  createdRecord: function () {
    var params = {
      customerId: recall.customerId,
      token: recall.token,
    }
    $.ajax({
      type: "GET",
      url: $config.toUrl(recall.env, "/act/recall/authApi/giveRecord"),
      data: params,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.result) {
          recall.mountedRecord(res.data)
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    })
  },
  mounted: function (data) {
    recall.setNotice()
    setInterval("recall.noticeUp('.notice>ul','-0.46rem',500)", 3000);
    if (data.recallDay < 8) {
      $('.time-days').removeClass('popup')
      $('.time-days #day').text(7 - data.recallDay)
      $('.recharge-main>span').addClass('popup')
      if (data.recallDay == 7) {
        $('.time-days').addClass('popup')
        $('.time-full').removeClass('popup')
        recall.timeDown()
      }
      $('.week-ul').removeClass('popup')
      $('.month-ul').addClass('popup')
      if (data.recharge1) {
        $('.week-ul .item1').children('.cover').removeClass('popup')
        $('.week-ul .item1').appendTo($($('.week-ul')[0]))
        $('.week-ul .item1').children('span:last').text('成功')
        $('.week-ul .item1').children('span:first').text('充值')
      }
      if (data.recharge2) {
        $('.week-ul .item2').children('.cover').removeClass('popup')
        $('.week-ul .item2').appendTo($($('.week-ul')[0]))
        $('.week-ul .item2').children('span:last').text('成功')
        $('.week-ul .item2').children('span:first').text('充值')
      }
      if (data.recharge3) {
        $('.week-ul .item3').children('.cover').removeClass('popup')
        $('.week-ul .item3').appendTo($($('.week-ul')[0]))
        $('.week-ul .item3').children('span:last').text('成功')
        $('.week-ul .item3').children('span:first').text('充值')
      }
      if (data.recharge4) {
        $('.week-ul .item4').children('.cover').removeClass('popup')
        $('.week-ul .item4').appendTo($($('.week-ul')[0]))
        $('.week-ul .item4').children('span:last').text('成功')
        $('.week-ul .item4').children('span:first').text('充值')
      }
    } else if (data.recallDay > 7) {
      $('.time-days').removeClass('popup')
      $('.time-days #day').text(37 - data.recallDay)
      $('.recharge-main>span').removeClass('popup')
      if (data.recallDay == 37) {
        $('.time-days').addClass('popup')
        $('.time-full').removeClass('popup')
        recall.timeDown()
      }
      $('.week-ul').addClass('popup')
      $('.month-ul').removeClass('popup')
      if (data.recharge1) {
        $('.month-ul .item5').children('.cover').removeClass('popup')
        $('.month-ul .item5').appendTo($($('.month-ul')[0]))
        $('.week-ul .item5').children('span:last').text('成功')
        $('.week-ul .item5').children('span:first').text('充值')
      }
      if (data.recharge2) {
        $('.month-ul .item6').children('.cover').removeClass('popup')
        $('.month-ul .item6').appendTo($($('.month-ul')[0]))
        $('.week-ul .item6').children('span:last').text('成功')
        $('.week-ul .item6').children('span:first').text('充值')
      }
      if (data.recharge3) {
        $('.month-ul .item7').children('.cover').removeClass('popup')
        $('.month-ul .item7').appendTo($($('.month-ul')[0]))
        $('.week-ul .item7').children('span:last').text('成功')
        $('.week-ul .item7').children('span:first').text('充值')
      }
      if (data.recharge4) {
        $('.month-ul .item8').children('.cover').removeClass('popup')
        $('.month-ul .item8').appendTo($($('.month-ul')[0]))
        $('.week-ul .item8').children('span:last').text('成功')
        $('.week-ul .item8').children('span:first').text('充值')
      }
    }
  },
  mountedRecord: function (data) {
    recall.setNotice()
    setInterval("recall.noticeUp('.notice>ul','-0.46rem',500)", 3000);
    $('.remain-count').text(data.rechargeBal)
    if (data.isRecharge7) {
      $('.remain-give .unit').text(data.sendAmt)
      $('.remain-willArrive').addClass('popup')
      $('.remain-arrived').removeClass('popup').children('.unit').text(data.arrivalAmt)
      $('.remain-arriveDay').removeClass('popup').children('.unit').text(data.remainArrivalDays)
      $('.remain-arriving').removeClass('popup').children('.unit').text(data.remainArrivalAmt)
      $('.to-index').addClass('popup')
      $('.to-app').removeClass('popup')
      if (data.isRecharge30) {
        $('.remain-vip').removeClass('popup').children('.unit').text(data.remainPassportDays)
      }
    } else {
      if (data.isRecharge30) {
        $('.remain-give .unit').text(data.sendAmt)
        $('.remain-willArrive').addClass('popup')
        $('.remain-arrived').removeClass('popup').children('.unit').text(data.arrivalAmt)
        $('.remain-vip').removeClass('popup').children('.unit').text(data.remainPassportDays)
        $('.to-index').addClass('popup')
        $('.to-app').removeClass('popup')
      }
    }
  },
  timeDown: function () {
    var createTime = new Date(new Date().toLocaleDateString()).getTime()
    var day = 0
    var hour = 23 - parseInt((new Date().getTime() - createTime) / 3600000) % 24
    var min = 59 - parseInt((new Date().getTime() - createTime) / 60000) % 60
    var sec = 59 - parseInt((new Date().getTime() - createTime) / 1000) % 60
    $('.time-full #day').text(day)
    $('#hour').text(hour < 10 ? '0' + hour : hour)
    $('#min').text(min < 10 ? '0' + min : min)
    $('#sec').text(sec < 10 ? '0' + sec : sec)
    var timer = setInterval(function () {
      var h = $('#hour').text()
      var m = $('#min').text()
      var s = $('#sec').text()
      s--
      if (s < 0) {
        s = 59
        m--
      }
      if (m < 0) {
        m = 59
        h--
      }
      if (h < 0) {
        h = 0
      }
      s = parseInt(s)
      m = parseInt(m)
      h = parseInt(h)
      s = s < 10 ? '0' + s : s
      m = m < 10 ? '0' + m : m
      h = h < 10 ? '0' + h : h
      $('#hour').text(h)
      $('#min').text(m)
      $('#sec').text(s)
      if (h == 0 && m == 0 && s == 0) {
        if (recall.recallDay > 7) {
          clearInterval(timer)
        } else {
          $('.time-days').removeClass('popup')
          $('.time-full').addClass('popup')
          $('.time-days #day').text(37 - recall.recallDay)
        }
      }
    }, 1000)
  },
  noticeUp: function (obj, top, time) {
    $(obj).animate({
      marginTop: top
    }, time, function () {
      $(this).css({ marginTop: "0" }).find(":first").appendTo(this)
    })
  },
  setNotice: function () {
    if (recall.recallDay < 8) {
      for (var i = 0; i < str.length; i++) {
        $('.notice>ul').append('<li>恭喜****' + str[parseInt(Math.random() * 100)] + '充值' + noticeObj.rechargeArr[i] + '元,获得' + noticeObj.weekAwardArr[i] + '元聊币</li>')
      }
    } else {
      for (var i = 0; i < str.length; i++) {
        $('.notice>ul').append('<li>恭喜****' + str[parseInt(Math.random() * 100)] + '充值' + noticeObj.rechargeArr[i] + '元,获得' + noticeObj.monthAwardArr[i] + '元聊币、' + noticeObj.monthAwardVipArr[i] + '天高级会员</li>')
      }
    }
  }
}
function toRule() {
  if (recall.recallDay > 7) {
    $config.dialogComm($('#month-rule'), 'month-rule')
  } else {
    $config.dialogComm($('#week-rule'), 'week-rule')
  }
}
function toGive() {
  window.location.href = './giveRecord.html?' + window.location.href.split('?')[1]
  recall.createdRecord()
}
function toIndex() {
  $('.recharge-page').removeClass('popup').siblings('.give-record-page').addClass('popup')
  $('title').text('充值优惠')
  recall.created()
}
function toCharge(value, that) {
  var recallMoney = [0, 98, 488, 1498, 4888, 98, 488, 1498, 4888]
  var params = {
    customerId: recall.customerId,
    recallType: value,
    token: recall.token
  }
  if (recall.apkChannel.indexOf('DXZH') == -1) {
    layer.msg('充值失败,请下载最新版本')
    return
  }
  $.ajax({
    type: "GET",
    url: $config.toUrl(recall.env, "/act/recall/authApi/findRecharge"),
    data: params,
    dataType: "json",
    success: function (res) {
      console.log(res);
      if (res.result) {
        client.jumpToCharge(value, recallMoney[value], that)
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      $config.yfAlert('网络异常')
    }
  })
}
window.rechargeSuccess = function (that) {
  $(that).siblings('.cover').removeClass('popup')
  $($(that).children('span:last')).text('成功')
  $($(that).children('span:first')).text('充值')
  $($(that).parents()[0]).appendTo($(that).parents()[1])
  setTimeout(function () {
    $config.dialogComm($('#rechargeok'), 'rechargeok')
  }, 100)
}
function toApp() {
  layer.closeAll()
  client.jumpToHot()
}
recall.init()