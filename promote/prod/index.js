var promote = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  liveCustomerId: $config.getQueryStringByName("liveCustomerId"),
  appType: $config.getQueryStringByName("appType"),
  timeId: '',
  isGet: '',
  isGets: [],
  liveCurrTime: '',
  liveAward: [
    '随机聊天气泡',
    '200<span class="appUnit">收益积分</span>',
    '500<span class="appUnit">收益积分</span>',
    '1000<span class="appUnit">收益积分</span>',
    '2000<span class="appUnit">收益积分</span>',
    '3000<span class="appUnit">收益积分</span>'],
  liveAward1: [
    '随机聊天气泡',
    '200<span class="appUnit1">收益积分</span>',
    '500<span class="appUnit1">收益积分</span>',
    '1000<span class="appUnit1">收益积分</span>',
    '2000<span class="appUnit1">收益积分</span>',
    '3000<span class="appUnit1">收益积分</span>'],
  init: function () {
    appDIff()
    promote.created()
  },
  created: function () {
    var params = {
      customerId: promote.customerId,
      liveCustomerId: promote.liveCustomerId
    }

    $.ajax({
      type: "GET",
      url: $config.toUrl(promote.env, "/api/liveAct/getWatchAndLiveTaskSchedule"),
      data: params,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.result) {
          res.data.currValue = parseInt(Number(res.data.currValue) / 60)// 转化时间
          promote.mounted(res.data)
          promote.isGet = res.data.isGet
          promote.isGets = res.data.isGets
          promote.liveCurrTime = res.data.currValue
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
    if (promote.customerId == promote.liveCustomerId) {
      $('.wrap1').removeClass('popup').siblings('.wrap2').addClass('popup').siblings('.wrap3').addClass('popup')
      $('title').text('开播拿红包活动')
      promote.renderAnchor(data)
      promote.renderAnchorHang(data)
    } else {
      $('title').text('直播福利')
      if (data.sex) {
        $('.wrap1').addClass('popup').siblings('.wrap2').addClass('popup').siblings('.wrap3').removeClass('popup')
        $('.page-live').addClass('popup').siblings('.page-man').removeClass('popup')
        if (data.currValue > 49) {
          data.currValue = 50
        }
        promote.renderUser(data)
        promote.renderUserHang(data)
      } else {
        $('.wrap1').addClass('popup').siblings('.wrap2').removeClass('popup').siblings('.wrap3').addClass('popup')
        $('.wrap.progress').addClass('popup')
        $('.left').addClass('popup').siblings('.right').addClass('popup').siblings('.line').addClass('popup')
      }
    }
    appDIff()
  },
  renderAnchor: function (data) {
    $('.page-live .played1 .play-time').text(data.currValue + '分钟')
    if (data.isGet) {
      $('.page-live .played1').addClass('popup')
      $('.page-live .playing1').addClass('popup')
      $('.page-live .played2').removeClass('popup')
      if (data.rewardAmt < 3000) {
        $('.page-live .playing2').removeClass('popup')
      } else {
        $('.page-live i').addClass('popup')
      }
      if (data.rewardAmt) {
        $('.page-live .played2 .receive').html(data.rewardAmt + '<span class="appUnit">收益积分</span>')
      } else if (data.productName) {
        $('.page-live .played2 .receive').html(data.productName + '聊天气泡')
      }
      $('.page-live .award-btn').addClass('disabled').removeClass('isaward').text('明日再来领!')
    } else {
      if (data.currValue < 10) {
        $('.page-live .playing1 .play-timing').text(10 - data.currValue)
      } else if (data.currValue < 20) {
        $('.page-live .played1 .receive').html(promote.liveAward[0])
        $('.page-live .playing1 .play-timing').text(20 - data.currValue)
        $('.page-live .playing1 .receiving').html(promote.liveAward[1])
        $('.page-live .award-btn').removeClass('disabled').addClass('isaward')
        $('.page-live .award-btn').html('立即领取' + promote.liveAward[0])
      } else if (data.currValue < 40) {
        $('.page-live .played1 .receive').html(promote.liveAward[1])
        $('.page-live .playing1 .play-timing').text(40 - data.currValue)
        $('.page-live .playing1 .receiving').html(promote.liveAward[2])
        $('.page-live .award-btn').removeClass('disabled').addClass('isaward')
        $('.page-live .award-btn').html('立即领取' + promote.liveAward[1])
      } else if (data.currValue < 60) {
        $('.page-live .played1 .receive').html(promote.liveAward[2])
        $('.page-live .playing1 .play-timing').text(60 - data.currValue)
        $('.page-live .playing1 .receiving').html(promote.liveAward[3])
        $('.page-live .award-btn').removeClass('disabled').addClass('isaward')
        $('.page-live .award-btn').html('立即领取' + promote.liveAward[2])
      } else if (data.currValue < 90) {
        $('.page-live .played1 .receive').html(promote.liveAward[3])
        $('.page-live .playing1 .play-timing').text(90 - data.currValue)
        $('.page-live .playing1 .receiving').html(promote.liveAward[4])
        $('.page-live .award-btn').removeClass('disabled').addClass('isaward')
        $('.page-live .award-btn').html('立即领取' + promote.liveAward[3])
      } else if (data.currValue < 120) {
        $('.page-live .played1 .receive').html(promote.liveAward[4])
        $('.page-live .playing1 .play-timing').text(120 - data.currValue)
        $('.page-live .playing1 .receiving').html(promote.liveAward[5])
        $('.page-live .award-btn').removeClass('disabled').addClass('isaward')
        $('.page-live .award-btn').html('立即领取' + promote.liveAward[4])
      } else {
        $('.page-live .played1 .receive').html(promote.liveAward[5])
        $('.page-live i').addClass('popup')
        $('.page-live .playing1').addClass('popup')
        $('.page-live .award-btn').removeClass('disabled').addClass('isaward')
        $('.page-live .award-btn').html('立即领取' + promote.liveAward[5])
      }
    }
  },
  renderAnchorHang: function (data) {
    if (data.isGet) {
      $('.wrap1 .receive').addClass('popup')
      $('.wrap1 .main').attr('src', './image/框框1.png')
      $('.wrap1 .receiving').css('top', '46%')
      $('.wrap1 .deputy').css('bottom', '10%')
      if (data.rewardAmt) {
        $('.wrap1 .receiving .award-over').removeClass('popup').html('太棒了,<br>你已领到<br>' + data.rewardAmt + '<span class="appUnit">收益积分</span>').siblings('p').addClass('popup')
      } else if (data.productName) {
        $('.wrap1 .receiving .award-over').removeClass('popup').html('太棒了,<br>你已领到<br>' + data.productName + '聊天气泡').siblings('p').addClass('popup')
      }
      $('.wrap1 .deputy').text('请明日再来!')
    } else {
      if (data.currValue < 10) {
        $('.wrap1 .wrap1-time').text(10 - data.currValue)
        $('.wrap1 .wrap1-awarded').html(promote.liveAward1[0])
      } else if (data.currValue < 20) {
        $('.wrap1 .wrap1-time').text(20 - data.currValue)
        $('.wrap1 .wrap1-awarded').html(promote.liveAward1[1])
        $('.wrap1 .wrap1-awarding').html(promote.liveAward1[0])
      } else if (data.currValue < 40) {
        $('.wrap1 .wrap1-time').text(40 - data.currValue)
        $('.wrap1 .wrap1-awarded').html(promote.liveAward1[2])
        $('.wrap1 .wrap1-awarding').html(promote.liveAward1[1])
      } else if (data.currValue < 60) {
        $('.wrap1 .wrap1-time').text(60 - data.currValue)
        $('.wrap1 .wrap1-awarded').html(promote.liveAward1[3])
        $('.wrap1 .wrap1-awarding').html(promote.liveAward1[2])
      } else if (data.currValue < 90) {
        $('.wrap1 .wrap1-time').text(90 - data.currValue)
        $('.wrap1 .wrap1-awarded').html(promote.liveAward1[4])
        $('.wrap1 .wrap1-awarding').html(promote.liveAward1[3])
      } else if (data.currValue < 120) {
        $('.wrap1 .wrap1-time').text(120 - data.currValue)
        $('.wrap1 .wrap1-awarded').html(promote.liveAward1[5])
        $('.wrap1 .wrap1-awarding').html(promote.liveAward1[4])
      } else {
        $('.wrap1 .receive').addClass('popup')
        $('.wrap1 .main').attr('src', './image/框框1.png')
        $('.wrap1 .receiving').css('top', '50%')
        $('.wrap1 .deputy').css('bottom', '10%')
        $('.wrap1 .wrap1-awarding').html(promote.liveAward1[5])
      }
    }
  },
  renderUser: function (data) {
    if (data.currValue > 9 && data.currValue < 20) {
      $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss')
    } else if (data.currValue > 19 && data.currValue < 40) {
      $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss')
      $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss')
    } else if (data.currValue > 39) {
      $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss')
      $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss')
      $($('.img-vip').parents()[1]).siblings('.award-btn').removeClass('miss')
    } else if (data.currValue > 49) {
      data.currValue == 50
    }
    $('.page-man .progress-wrap').css('width', (data.currValue * 2) + '%')
    if (data.isGets[0] && !data.isGets[1] && !data.isGets[2]) {
      $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
    } else if (data.isGets[1] && !data.isGets[0] && !data.isGets[2]) {
      $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
    } else if (data.isGets[2] && !data.isGets[0] && !data.isGets[1]) {
      $($('.img-vip').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
    } else if (data.isGets[0] && data.isGets[1] && !data.isGets[2]) {
      $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
      $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
    } else if (data.isGets[0] && !data.isGets[1] && data.isGets[2]) {
      $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
      $($('.img-vip').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
    } else if (!data.isGets[0] && data.isGets[1] && data.isGets[2]) {
      $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
      $($('.img-vip').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
    } else if (data.isGets[0] && data.isGets[1] && data.isGets[2]) {
      $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
      $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
      $($('.img-vip').parents()[1]).siblings('.award-btn').removeClass('miss').text('已领取').addClass('opacity')
    }
    if (data.commentIsGet) {
      $('.comment-pro-wrap').css('width', '100%')
      $('.comment-pro-box span').text('30/30')
      $('.pro-btn').removeClass('miss').text('已领奖').addClass('opacity')
    } else {
      if (data.commentCurrValue == null) {
        return
      } else {
        if (data.commentCurrValue > (data.commentGoalValue - 1)) {
          data.commentCurrValue = data.commentGoalValue
          $('.pro-btn').removeClass('miss')
        }
        $('.comment-pro-wrap').css('width', parseInt((data.commentCurrValue / data.commentGoalValue) * 100) + '%')
        $('.comment-pro-box span').text(data.commentCurrValue + '/' + data.commentGoalValue)
      }
    }
  },
  renderUserHang: function (data) {
    if (data.isGets[0] && data.isGets[1] && data.isGets[2] && data.commentIsGet) {
      $('.wrap3 .main1').addClass('popup')
      $('.wrap3 .main2').removeClass('popup')
    } else {
      if (!data.isGets[0]) {
        if (data.currValue < 10 && data.currValue > 0) {
          $('.watch-time .progress').css('width', parseInt((data.currValue / 10) * 100) + '%')
          $('.watch-time .currTime').text(data.currValue + '/10')
        } else if (data.currValue > 9) {
          $('.watch-time .progress').css('width', '0').siblings('p').addClass('popup')
          $('.watch-time .summ-btn').removeClass('popup')
        }
      } else {
        if (!data.isGets[1]) {
          if (data.currValue < 20 && data.currValue > 10) {
            $('.watch-time .progress').css('width', parseInt((data.currValue / 20) * 100) + '%').siblings('p').removeClass('popup')
            $('.watch-time .currTime').text(data.currValue + '/20')
            $('.watch-time .summ-btn').addClass('popup')
          } else if (data.currValue > 19) {
            $('.watch-time .progress').css('width', '0').siblings('p').addClass('popup')
            $('.watch-time .summ-btn').removeClass('popup')
          }
        } else {
          if (!data.isGets[2]) {
            if (data.currValue < 40 && data.currValue > 20) {
              $('.watch-time .progress').css('width', parseInt((data.currValue / 40) * 100) + '%').siblings('p').removeClass('popup')
              $('.watch-time .currTime').text(data.currValue + '/40')
              $('.watch-time .summ-btn').addClass('popup')
            } else if (data.currValue > 39) {
              $('.watch-time .progress').css('width', '0').siblings('p').addClass('popup')
              $('.watch-time .summ-btn').removeClass('popup')
            }
          } else {
            $('.watch-time .progress').css('width', '0').siblings('p').removeClass('popup')
            $('.watch-time .summ-btn').addClass('popup')
            $('.watch-time .currTime').text('已领奖')
            $('.watch-time').addClass('miss')
          }
        }
      }
      if (data.commentIsGet) {
        $('.send-comm .currComm').text('已领奖')
        $('.send-comm').addClass('miss')
        $('.send-comm .summ-btn').addClass('popup').siblings('.progress').css('width', '0%').siblings('p').removeClass('popup')
      } else {
        if (data.commentCurrValue < data.commentGoalValue) {
          if (data.commentCurrValue) {
            $('.send-comm .progress').css('width', parseInt((data.commentCurrValue / data.commentGoalValue) * 100) + '%')
            $('.send-comm .currComm').text(data.commentCurrValue + '/' + data.commentGoalValue)
          }
        } else {
          data.commentCurrValue = data.commentGoalValue
          $('.send-comm .progress').css('width', '0').siblings('p').addClass('popup').siblings('.summ-btn').removeClass('popup')
        }
      }
    }
  },
}
function getAward() {
  var params = {
    customerId: promote.customerId,
    liveCustomerId: promote.liveCustomerId,
    rewardType: 5,
  }
  if (promote.isGet) {
    return
  }
  if (promote.liveCurrTime > 119) {
    $.ajax({
      type: 'get',
      url: $config.toUrl(promote.env, '/api/liveAct/getRewardByWatchAndLive'),
      data: params,
      success: function (res) {
        if (res.result) {
          $config.yfAlert('领取成功<br>3000<span class="appUnit">收益积分</span>已到账!')
          $('.page-live .played1').addClass('popup')
          $('.page-live .playing1').addClass('popup')
          $('.page-live .played2').removeClass('popup')
          $('.page-live .award-btn').addClass('disabled').removeClass('isaward').text('明日再来领!')
          $('.wrap1 .receive').addClass('popup')
          $('.wrap1 .receiving .award-over').removeClass('popup').siblings('p').addClass('popup')
          $('.wrap1 .deputy').text('请明日再来!')
          promote.created()
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    })
  } else {
    if (promote.liveCurrTime < 10) {
      return
    }
    if (promote.liveCurrTime < 20) {
      $('#isreceive .rec-time').text(20 - promote.liveCurrTime)
      $('.isreceive-img').siblings('span').html(promote.liveAward[0])
      config.dialogComm($('#isreceive'), 'isreceive');
    } else {
      $('#isreceive .isreceive-img').css(
        { 'background': 'url(./image/gold.png) no-repeat', 'background-size': '100% 100%' }
      )
      if (promote.liveCurrTime > 19 && promote.liveCurrTime < 40) {
        $('#isreceive .rec-time').text(40 - promote.liveCurrTime)
        $('.isreceive-img').siblings('span').html(promote.liveAward[1])
        $('#isreceive .rec-award').text('300')
      } else if (promote.liveCurrTime > 39 && promote.liveCurrTime < 60) {
        $('#isreceive .rec-time').text(60 - promote.liveCurrTime)
        $('.isreceive-img').siblings('span').html(promote.liveAward[2])
        $('#isreceive .rec-award').text('500')
      } else if (promote.liveCurrTime > 59 && promote.liveCurrTime < 90) {
        $('#isreceive .rec-time').text(90 - promote.liveCurrTime)
        $('.isreceive-img').siblings('span').html(promote.liveAward[3])
        $('#isreceive .rec-award').text('1000')
      } else if (promote.liveCurrTime > 89 && promote.liveCurrTime < 120) {
        $('#isreceive .rec-time').text(120 - promote.liveCurrTime)
        $('.isreceive-img').siblings('span').html(promote.liveAward[4])
        $('#isreceive .rec-award').text('1000')
      }
      config.dialogComm($('#isreceive'), 'isreceive');
    }
  }
}
function submit() {
  var params = {
    customerId: promote.customerId,
    liveCustomerId: promote.liveCustomerId,
    rewardType: 5,
  }
  $.ajax({
    type: 'get',
    url: $config.toUrl(promote.env, '/api/liveAct/getRewardByWatchAndLive'),
    data: params,
    success: function (res) {
      if (res.result) {
        if (promote.liveCurrTime < 20) {
          $('#received>p').text(res.data.productName + '文字气泡*3天')
          $('#received received-img').css({ 'background': 'url(' + res.data.previewUrl + ') no-repeat', 'background-size': '100% 100%' })
          config.dialogComm($('#received'), 'received');
        } else {
          layer.closeAll()
          layer.msg('领取成功<br>' + res.data.rewardAmt + '<span class="appUnit">收益积分</span>已到账!')
        }
        promote.created()
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      $config.yfAlert('网络异常')
    }
  })
}
function userGetAward(type, that) {
  if ($(that).hasClass('miss') || $(that).hasClass('opacity')) {
    return
  } else {
    var params = {
      customerId: promote.customerId,
      liveCustomerId: promote.liveCustomerId,
      rewardType: type,
    }
    $.ajax({
      type: 'get',
      url: $config.toUrl(promote.env, '/api/liveAct/getRewardByWatchAndLive'),
      data: params,
      success: function (res) {
        if (res.result) {
          if (type == 1) {
            $('#received>p').text(res.data.productName + '进场特效*3天')
            $('#received .received-img').css(
              { 'background': 'url(' + res.data.previewUrl + ') no-repeat', 'background-size': '100% 100%' })
            config.dialogComm($('#received'), 'received');
          } else if (type == 2) {
            config.dialogComm($('#discount10-2'), 'discount10-2');
          } else if (type == 3) {
            config.dialogComm($('#discount85'), 'discount85');
          } else if (type == 4) {
            $('#received>p').html('<span class="kouhong">直播间礼物</span>口红*5个')
            $('#received .received-img').css(
              { 'background': 'url(./image/口红.png) no-repeat', 'background-size': '100% 100%' }).siblings('span').html('礼物已放入<span class="appBag">直播间背包</span>，有效期2天<br>快去送给心爱的女神吧~')
            config.dialogComm($('#received'), 'received');
          }
          $(that).addClass('opacity').text('已领取')
          promote.created()
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    })
  }
}
function faded() {
  $('.wrap1-fade').fadeIn('1000')
  setTimeout(function () {
    $('.wrap1-fade').fadeOut('1000')
  }, 5000)
  setInterval(function () {
    $('.wrap1-fade').fadeIn('1000')
    setTimeout(function () {
      $('.wrap1-fade').fadeOut('1000')
    }, 5000)
  }, 60000)
}
function appDIff() {
  var ua = navigator.userAgent.toLowerCase();
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
  if (isAndroid) {
    $('.isApple').addClass('popup')
  }
  if (promote.appType == 1) {
    $('.appName').text('兔聊')
    $('.appBag').text('包裹-平台礼物')
    $('.appUnit').text('聊币(直播收入)')
    $('.appUnit1').text('聊币')
    $('.appGoldVip').text('高级会员')
    $('.appSliverVip').text('普通会员')
    $('.appGift').text('私信礼物')
    $('.kouhong').text('私信礼物')
    $('.wrap1-fade').text('100聊币=1元')
  } else {
    $('.appName').text('觅伊')
    $('.appBag').text('直播间背包')
    $('.appUnit').text('收益积分')
    $('.appUnit1').text('收益积分')
    $('.appGoldVip').text('黄金贵族')
    $('.appSliverVip').text('白银贵族')
    $('.appGift').text('直播礼物')
    $('.kouhong').text('直播间礼物')
    $('.wrap1-fade').text('100积分=1元')
  }
}
promote.init()
faded()
if (window.location.href.indexOf('hang') != -1) {
  clearInterval(promote.timeId)
  promote.timeId = setInterval(function () {
    promote.init()
  }, 30000)
}