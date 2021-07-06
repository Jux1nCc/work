var recall = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  token: $config.getQueryStringByName("token"),
  apkChannel: $config.getQueryStringByName("apkChannel"),
  recallDay: '0',
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
      url: $config.toUrl(recall.env, "/act/recall/authApi/giveRecord"),
      data: params,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.result) {
          recall.mounted(res.data)
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
        $('.notice>ul').append('<li>恭喜 ****' + str[parseInt(Math.random() * 100)] + ' 充值' + noticeObj.rechargeArr[i] + '元,获得' + noticeObj.weekAwardArr[i] + '元聊币</li>')
      }
    } else {
      for (var i = 0; i < str.length; i++) {
        $('.notice>ul').append('<li>恭喜 ****' + str[parseInt(Math.random() * 100)] + ' 充值' + noticeObj.rechargeArr[i] + '元,获得' + noticeObj.monthAwardArr[i] + '元聊币、' + noticeObj.monthAwardVipArr[i] + '天高级会员</li>')
      }
    }
  }
}
function toIndex() {
  window.location.href = './index.html?' + window.location.href.split('?')[1]
}
function toApp() {
  layer.closeAll()
  client.jumpToHot()
}
recall.init()