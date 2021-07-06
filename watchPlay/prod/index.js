var watch = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  liveCustomerId: $config.getQueryStringByName("liveCustomerId"),
  isFrom: $config.getQueryStringByName("isFrom"),
  appType: 2,
  loop: false,
  init: function () {
    watch.created()
    watch.appDiff()
  },
  created: function () {
    var parmas = {
      customerId: watch.customerId,
      liveCustomerId: watch.liveCustomerId
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(watch.env, '/api/liveAct/getWatchAndLiveTaskSchedule'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          watch.appType = res.data.appType
          if (!watch.liveCustomerId) {
            watch.liveCustomerId = res.data.listTop[0].liveCustomerId
          }
          watch.mounted(res.data)
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
  },
  mounted: function (data) {
    data.currValue = parseInt(data.currValue / 60)
    if (data.goalValues) {
      data.goalValues[0] = parseInt(data.goalValues[0] / 60)
      data.goalValues[1] = parseInt(data.goalValues[1] / 60)
      data.goalValues[2] = parseInt(data.goalValues[2] / 60)
    }
    // 进度条
    if (data.currValue >= 50) data.currValue = 50
    $('.live-progress-item').css('width', data.currValue / 50 * 100 + '%')
    if (data.currValue >= 10) {
      if (data.isGets[0]) {
        $('.li-0 .btn').removeClass('gray').addClass('red').text('已领取')
      } else {
        $('.li-0 .btn').removeClass('gray').addClass('animation')
      }
      if (data.currValue >= 20) {
        if (data.isGets[1]) {
          $('.li-1 .get-award').addClass('popup')
          $('.li-1 .goto-recharge').removeClass('popup')
        } else {
          $('.li-1 .btn').removeClass('gray').addClass('animation')
        }
        if (data.currValue >= 40) {
          if (data.isGets[2]) {
            $('.li-2 .get-award').addClass('popup')
            $('.li-2 .goto-recharge').removeClass('popup')
          } else {
            $('.li-2 .btn').removeClass('gray').addClass('animation')
          }
        }
      }
    }
    // 轮播
    if (data.listTop) {
      $('.preview-prev-btn').removeClass('popup')
      $('.preview-next-btn').removeClass('popup')
      $('.comment-wrap .get-award').removeClass('popup')
      if (data.listTop.length > 1) {
        watch.loop = true
      }
      for (var i = 0; i < data.listTop.length; i++) {
        var str =
          '<div class="swiper-slide column preview-item">' +
          '<div class="liveUser flexbox">' +
          '<div class="liveUser-img" onclick="jumpToPersonal(' + data.listTop[i].liveCustomerId + ')">' +
          '<img src="' + data.listTop[i].livePhoto + '">' +
          '<div class="live-icon">主播</div>' +
          '<span class="liveUser-name">' + data.listTop[i].liveNickName + '</span>' +
          '</div>' +
          '<div class="liveUser-info column">' +
          '<div class="stop-time flexbox">' +
          '<span>停留时长</span>' +
          '<div class="progress-wrap">' +
          '<div class="progress-item" style="width:' + parseInt(data.listTop[i].currWatchTimes / 60) / parseInt(data.listTop[i].watchTimes / 60) * 100 + '%"></div>' +
          '<div class="progress-value">' +
          '<span class="time-value">' + parseInt(data.listTop[i].currWatchTimes / 60) + '</span>/' +
          '<span>' + parseInt(data.listTop[i].watchTimes / 60) + '</span>' +
          '</div></div></div>' +
          '<div class="send-message flexbox">' +
          '<span>发送评论</span>' +
          '<div class="progress-wrap">' +
          '<div class="progress-item" style="width:' + data.listTop[i].currCommentNum / data.commentGoalValue * 100 + '%"></div>' +
          '<div class="progress-value">' +
          '<span class="message-value">' + data.listTop[i].currCommentNum + '</span>/' +
          '<span>' + data.commentGoalValue + '</span>' +
          '</div></div></div></div></div>' +
          // '<div class="get-award ' + (parseInt(data.listTop[i].currWatchTimes / 60) >= parseInt(data.listTop[i].watchTimes / 60) ? (data.listTop[i].currCommentNum >= data.commentGoalValue ? (data.commentIsGet) ? 'gray' : 'animation' : 'gray') : 'gray') + '" onclick="getAward(this,4)" id="' + data.listTop[i].liveCustomerId + '">' + (data.commentIsGet ? '已领奖' : '立即领奖') + '</div>' +
          '<p>可左右滑动，浏览你今天观看过的主播</p>' +
          '</div>'
        $('.swiper-wrapper').append(str)
        showEllipsis($('.liveUser-name'))
      }
      new Swiper('.swiper-container', {
        loop: watch.loop,
        navigation: {
          nextEl: '.preview-next-btn',
          prevEl: '.preview-prev-btn',
        },
      })
      for (var i = 0; i < data.listTop.length; i++) {
        if (data.listTop[i].isGet && data.listTop[i].isDone) {
          $('.comment-wrap .get-award').text('已领奖')
          return
        } else {
          if (!data.listTop[i].isGet && data.listTop[i].isDone) {
            $('.comment-wrap .get-award').text('立即领奖').removeClass('gray').addClass('animation').attr('id', data.listTop[i].liveCustomerId)
          }
        }
      }
    }
    watch.appDiff()
  },
  appDiff: function () {
    if (watch.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appName').text('兔聊')
      $('.appVip').text('高级会员')
      $('.appVip2').text('普通会员')
      $('.tuliao').removeClass('popup')
      $('.miyi-android').addClass('popup')
      $('.miyi-ios').addClass('popup')
      $('.li-1 .img-ticket').attr('src', 'images/dia_tuliao.png')
      $('.li-2 .img-vip').attr('src', 'images/tuliao_vip.png')
    } else {
      $('.appUnit').text('钻石')
      $('.appName').text('觅伊')
      $('.appVip').text('黄金贵族')
      $('.appVip2').text('白银贵族')
      $('.tuliao').addClass('popup')
      if ($config.browser.versions.android) {
        $('.miyi-android').removeClass('popup')
        $('.miyi-ios').addClass('popup')
      } else {
        $('.miyi-android').addClass('popup')
        $('.miyi-ios').removeClass('popup')
      }
    }
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
  }
}
function getAward(that, type) {
  if ($(that).hasClass('gray') || $(that).hasClass('red')) return
  var parmas = {
    // token: watch.token,
    customerId: watch.customerId,
    liveCustomerId: type == 4 ? $(that).attr('id') : watch.liveCustomerId,
    rewardType: type
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(watch.env, '/api/liveAct/getRewardByWatchAndLive'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        showDialog(res.data, Number(type))
        if (type < 4) {
          if (type == 2) {
            $('.li-1 .get-award').addClass('popup')
            $('.li-1 .goto-recharge').removeClass('popup')
          } else if (type == 3) {
            $('.li-2 .get-award').addClass('popup')
            $('.li-2 .goto-recharge').removeClass('popup')
          } else {
            $(that).addClass('red').text('已领取').removeClass('animation')
          }
        } else {
          $(that).addClass('gray').text('已领取').removeClass('animation')
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
function showDialog(data, type) {
  if (watch.isFrom == 'isLive') {
    $('#diaCar').addClass('isHang')
    $('#diaTicket').addClass('isHang')
    $('#diaVip').addClass('isHang')
    $('#diaNecklace').addClass('isHang')
  }
  switch (type) {
    case 1:
      $('#diaCar .dialog-title').text('“' + data.productName + '”进场特效x3天')
      $('#diaCar img').attr('src', data.previewUrl)
      $config.dialogComm($('#diaCar'), 'diaCar')
      break;
    case 2:
      if (watch.appType == 1) {
        $('#diaTicket img').attr('src', 'images/dia_tuliao.png')
      }
      $config.dialogComm($('#diaTicket'), 'diaTicket')
      break;
    case 3:
      if (watch.appType == 1) {
        $('#diaVip .vip-img').attr('src', 'images/tuliao_vip.png')
      }
      $config.dialogComm($('#diaVip'), 'diaVip')
      break;
    case 4:
      $config.dialogComm($('#diaNecklace'), 'diaNecklace')
      break;
  }
  watch.appDiff()
}
function showEllipsis(ele) {
  ele.each(function () {
    var len = $(this).text().length;
    if (len > 4) {
      var str = "";
      str = $(this).text().substring(0, 4) + "...";
      $(this).html(str);
    }
  });
}
function toRecharge() {
  if (watch.appType == 1) {
    window.location.href = 'https://wxgzh.folkcam.cn/view/weixinopen/WAPRECHAGEIOS.html'
  } else {
    if ($config.browser.versions.android) {
      client.jumpToCharge()
    } else {
      layer.msg('请在“觅伊”公众号（微信号：Miyiapp）—菜单栏进行充值。')
    }
  }
}
function showTip() {
  if (watch.loop) {
    return
  } else {
    layer.msg('观看更多主播后，才可滑动浏览更多')
  }
}
watch.init()