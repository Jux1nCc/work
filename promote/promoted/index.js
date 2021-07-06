var promote = {
  env: 'demo',
  customerId: $config.getQueryStringByName("customerId"),
  liveCustomerId: $config.getQueryStringByName("liveCustomerId"),
  streamId: $config.getQueryStringByName("streamId"),
  appType: $config.getQueryStringByName("appType"),
  timeId: '',
  liveCurrTime: '',
  isHangGet: '',
  rewardAmt: window.localStorage.getItem('rewardAmt'),
  liveAward: [
    '随机聊天气泡',
    '200<span class="appUnit">收益积分</span>',
    '500<span class="appUnit">收益积分</span>',
    '1000<span class="appUnit">收益积分</span>',
    '2000<span class="appUnit">收益积分</span>',
    '3000<span class="appUnit">收益积分</span>'],
  init: function () {
    // console.log('用户id:', promote.customerId);
    // console.log('直播id:', promote.liveCustomerId);
    faded()
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
          promote.mounted(res.data)
          promote.isGet = res.data.isGet
          promote.liveCurrTime = res.data.currValue
        } else {
          $config.yfAlert(res.message)
          clearInterval(promote.timeId)
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
        clearInterval(promote.timeId)
      }
    })
  },
  mounted: function (data) {
    data.currValue = parseInt(Number(data.currValue) / 60)
    if (promote.customerId != promote.liveCustomerId) { // 用户端
      // console.log('用户端用户id:', promote.customerId);
      // console.log('用户端直播id:', promote.liveCustomerId);
      if (data.sex == 1) {
        // 男挂件 
        $('.act-time').css('top', '3.5rem')
        $('.wrap1').addClass('popup').siblings('.wrap2').addClass('popup').siblings('.wrap3').removeClass('popup')
        // 主页面
        $('.page-live').addClass('popup')   // 显示男主页面
        $('.page-man').removeClass('popup')
        // 进度条
        if (data.currValue >= 50) {
          data.currValue = 50
        }
        $('.page-man .progress-wrap').css('width', (data.currValue * 2) + '%')
        // 挂件进度条
        $('.wrap3 .currTime').text(data.currValue + '/10')
        $('.watch-time .progress').css('width', parseInt((data.currValue / 10) * 100) + '%')
        if (data.currValue >= 10 && data.currValue < 20) {
          // 立即领取按钮
          $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss')
          // 是否领取
          if (data.isGets[0]) {
            // 领取了则展示下一项奖励进度
            $('.wrap3 .currTime').text(data.currValue + '/20')
            $('.watch-time .progress').css('width', parseInt((data.currValue / 20) * 100) + '%')
          } else {
            // 未领取则展示按钮
            $('.watch-time>p').addClass('popup').siblings('summ-btn').removeClass('popup')
          }
        } else if (data.currValue >= 20 && data.currValue < 40) {
          $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss')
          $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss')
          if (data.isGets[1]) {
            $('.wrap3 .currTime').text(data.currValue + '/40')
            $('.watch-time .progress').css('width', parseInt((data.currValue / 40) * 100) + '%')
          } else {
            $('.watch-time>p').addClass('popup').siblings('summ-btn').removeClass('popup')
          }
        } else if (data.currValue >= 40) {
          $($('.img-car').parents()[1]).siblings('.award-btn').removeClass('miss')
          $($('.img-10-2').parents()[1]).siblings('.award-btn').removeClass('miss')
          $($('.img-vip').parents()[1]).siblings('.award-btn').removeClass('miss')
          if (data.isGets[2]) {
            // 领取了则展示已领奖
            $('.watch-time .currTime').text('已领奖')
          } else {
            // 未领取展示按钮
            $('.watch-time>p').addClass('popup').siblings('summ-btn').removeClass('popup')
          }
        }
        // 评论奖励
        if (data.commentCurrValue >= data.commentGoalValue) {
          // 评论数量到达目标数量 展示领取按钮 
          data.commentCurrValue = data.commentGoalValue
          $('.send-comm>p').addClass('popup')
          $('.send-comm .summ-btn').removeClass('popup')
          $('.pro-btn').removeClass('miss')
        }
        // 设置进度条
        $('.comment-pro-wrap').css('width', parseInt((data.commentCurrValue / data.commentGoalValue) * 100) + '%')
        $('.comment-pro-box').children('span').text(data.commentCurrValue + '/' + data.commentGoalValue)
        $('.send-comm .progres').css('width', parseInt((data.commentCurrValue / data.commentGoalValue) * 100) + '%')
        $('.send-comm .currComm').text(data.commentCurrValue + '/' + data.commentGoalValue)
        // 当全部领取 挂件展示提示
        if (data.commentIsGet) {
          $('.send-comm .currComm').text('已领奖')
        }
        if (data.isGets[2] && data.commentIsGet) {
          $('.summary').addClass('popup')
          $('.summary.all-award').removeClass('popup')
        }
      } else if (data.sex == 0) {
        // 女
        $('.wrap1').addClass('popup').siblings('.wrap2').removeClass('popup').siblings('.wrap3').addClass('popup')
        $('.page-live .progress').addClass('popup')
        $('.act-time').css('bottom', '0.9rem')
        $('.left').addClass('popup').siblings('.right').addClass('popup').siblings('.line').addClass('popup')
      }
      appDIff()
    } else {          // 主播端
      // 主页面
      // console.log('主播端用户id:', promote.customerId);
      // console.log('主播端直播id:', promote.liveCustomerId);
      $('.page-man').addClass('popup')
      $('.wrap1').removeClass('popup').siblings('.wrap2').addClass('popup').siblings('.wrap3').addClass('popup')
      $('.played1 .play-time').text(data.currValue + '分钟')
      if (data.currValue >= 10 && data.currValue < 20) {
        $('.play-timing').text(20 - data.currValue)
        $('.played1>.receive').html(promote.liveAward[0])
        $('.playing1 .receiving').html(promote.liveAward[1])
        $('.receiving .wrap1-awarding').text(promote.liveAward[1])
        $('.wrap1-time').text(20 - data.currValue)
        $('.wrap1-awarded').html(promote.liveAward[1])
        $('.wrap1-awarding').html(promote.liveAward[0])
      } else if (data.currValue >= 20 && data.currValue < 40) {
        $('.played1>.receive').html(promote.liveAward[1])
        $('.play-timing').text(40 - data.currValue)
        $('.playing1 .receiving').html(promote.liveAward[2])
        $(' wrap1 .receiving .wrap1-awarding').text(promote.liveAward[2])
        $('.wrap1-time').text(40 - data.currValue)
        $('.wrap1-awarding').html(promote.liveAward[1])
        $('.wrap1-awarded').html(promote.liveAward[2])
        $('.page-live .award-btn').html('立即领取200<span class="appUnit">收益积分</span>')
        $('.isreceive-img').siblings('span').html('200<span class="appUnit">收益积分</span>')
        $('.isreceive-img').css(
          { 'background': 'url(./image/gold.png) no-repeat' },
          { 'background-size': '100% 100%' }
        )
        $('.rec-time').text('20').siblings('.rec-award').text('500')
      } else if (data.currValue >= 40 && data.currValue < 60) {
        $('.played1>.receive').html(promote.liveAward[2])
        $('.play-timing').text(60 - data.currValue)
        $('.playing1 .receiving').html(promote.liveAward[3])
        $('.receiving .wrap1-awarding').text(promote.liveAward[3])
        $('.wrap1-time').text(60 - data.currValue)
        $('.wrap1-awarding').html(promote.liveAward[2])
        $('.wrap1-awarded').html(promote.liveAward[3])
        $('.page-live .award-btn').html('立即领取500<span class="appUnit">收益积分</span>')
        $('.isreceive-img').siblings('span').html('500<span class="appUnit">收益积分</span>')
        $('.isreceive-img').css(
          { 'background': 'url(./image/gold.png) no-repeat' },
          { 'background-size': '100% 100%' }
        )
        $('.rec-time').text('20').siblings('.rec-award').text('1000')
      } else if (data.currValue >= 60 && data.currValue < 90) {
        $('.played1>.receive').html(promote.liveAward[3])
        $('.play-timing').text(90 - data.currValue)
        $('.playing1 .receiving').html(promote.liveAward[4])
        $('.receiving .wrap1-awarding').text(promote.liveAward[4])
        $('.wrap1-time').text(90 - data.currValue)
        $('.wrap1-awarding').html(promote.liveAward[3])
        $('.wrap1-awarded').html(promote.liveAward[4])
        $('.page-live .award-btn').html('立即领取1000<span class="appUnit">收益积分</span>')
        $('.isreceive-img').siblings('span').html('1000<span class="appUnit">收益积分</span>')
        $('.isreceive-img').css(
          { 'background': 'url(./image/gold.png) no-repeat' },
          { 'background-size': '100% 100%' }
        )
        $('.rec-time').text('30').siblings('.rec-award').text('2000')
      } else if (data.currValue >= 90 && data.currValue < 120) {
        $('.played1>.receive').html(promote.liveAward[4])
        $('.play-timing').text(120 - data.currValue)
        $('.playing1 .receiving').html(promote.liveAward[5])
        $('.receiving .wrap1-awarding').text(promote.liveAward[5])
        $('.wrap1-time').text(120 - data.currValue)
        $('.wrap1-awarding').html(promote.liveAward[4])
        $('.wrap1-awarded').html(promote.liveAward[5])
        $('.page-live .award-btn').html('立即领取2000<span class="appUnit">收益积分</span>')
        $('.isreceive-img').siblings('span').html('2000<span class="appUnit">收益积分</span>')
        $('.isreceive-img').css(
          { 'background': 'url(./image/gold.png) no-repeat' },
          { 'background-size': '100% 100%' }
        )
        $('.rec-time').text('30').siblings('.rec-award').text('3000')
      } else if (data.currValue >= 120) {
        $('.played1>.receive').html(promote.liveAward[5])
        $('.playing1').addClass('popup')
        $('.wrap1-awarding').html(promote.liveAward[4])
        $('.page-live .award-btn').html('立即领取2000<span class="appUnit">收益积分</span>')
        $('.wrap1 .receive').addClass('popup')
        $('.wrap1 .main').attr('src', './image/框框1.png')
        $('.wrap1 .receiving').css('top', '50%')
        $('.wrap1 .deputy').css('bottom', '10%')
      } else {
        $('.played1>.receive').html('暂无')
        $('.play-timing').text(10 - data.currValue)
        $('.wrap1-time').text(10 - data.currValue)
        $('.wrap1-awarded').html(promote.liveAward[0])
      }
      if (data.currValue >= 10 && !promote.isGet) {
        $('.page-live .award-btn').removeClass('disabled').addClass('isaward')
      } else if (promote.isGet) {
        $('.page-live .award-btn').addClass('disabled').removeClass('isaward').text('明日再来领!')
        $('.played1').addClass('popup')
        $('.playing1').addClass('popup')
        $('.playing2').removeClass('popup')
        $('.played2').removeClass('popup')
        $('.played2 .receive').html($('.played1>.receive').html())
        $('.wrap1 .receive').addClass('popup')
        $('.wrap1 .main').attr('src', './image/框框1.png')
        $('.wrap1 .deputy').css('bottom', '10%')
        $('.wrap1 .receiving').css('top', '45%').html('<p class="award-over">太棒了,<br>你已领到<br>' + promote.rewardAmt + '</p>')
      }
      appDIff()
    }
  }
}
// 主播点击领取奖励
function getAward() {
  if (promote.liveCurrTime >= 10 && !promote.isGet) {
    var params = {
      customerId: promote.customerId,
      liveCustomerId: promote.liveCustomerId,
      rewardType: 5,
    }
    if (promote.liveCurrTime >= 120) {
      $.ajax({
        type: 'get',
        url: $config.toUrl(promote.env, '/api/liveAct/getRewardByWatchAndLive'),
        data: params,
        success: function (res) {
          if (res.result) {
            window.localStorage.setItem('rewardAmt', res.data.rewardAmt)
            $config.yfAlert('领取成功<br>3000<span class="appUnit">收益积分</span>已到账！')
            $('.page-live .award-btn').addClass('.disabled').removeClass('isaward').text('请明日再来！')
            $('.played1').addClass('popup')
            $('.playing1').addClass('popup')
            $('.playing2').removeClass('popup')
            $('.played2').removeClass('popup')
            $('.played2 .receive').html($('.played1>.receive').html())
            $('.deputy').text('请明日再来！')
            $('.wrap1 .main').attr('src', './image/框框1.png')
            $('.wrap1 .deputy').css('bottom', '10%')
            $('.wrap1 .receiving').css('top', '45%').html('<p class="award-over">太棒了,<br>你已领到<br>' + res.data.rewardAmt + '</p>')
          } else {
            $config.yfAlert(res.message)
          }
          appDIff()
        },
        error: function (error) {
          $config.yfAlert('网络异常')
        }
      })
    } else {
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
        window.localStorage.setItem('rewardAmt', res.data.rewardAmt)
        if (promote.liveCurrTime < 20) {
          var imgUrl = res.data.previewUrl
          $('.received-main').siblings('p').text('“' + res.data.productName + '”文字气泡x3天')
          $('.received-img').css(
            { 'background': 'url(' + imgUrl + ') no-repeat' },
            { 'background-size': '100% 100%' }
          )
          $('.wrap1 .receiving').css('top', '45%').html('<p class="award-over">太棒了,<br>你已领到<br>' + res.data.productName + '</p>')
          config.dialogComm($('#received'), 'received');
        } else {
          $config.yfAlert('领取成功<br>' + res.data.rewardAmt + '<span class="appUnit">收益积分</span>已到账！')
          $('.wrap1 .receiving').css('top', '45%').html('<p class="award-over">太棒了,<br>你已领到<br>' + res.data.rewardAmt + '</p>')
        }
        $('.page-live .award-btn').addClass('.disabled').removeClass('isaward').text('请明日再来！')
        $('.played1').addClass('popup')
        $('.playing1').addClass('popup')
        $('.playing2').removeClass('popup')
        $('.played2').removeClass('popup')
        $('.played2 .receive').html($('.played1>.receive').html())
        $('.deputy').text('请明日再来！')
        $('.wrap1 .main').attr('src', './image/框框1.png')
        $('.wrap1 .deputy').css('bottom', '10%')
        $('.deputy').text('请明日再来！')
      } else {
        $config.yfAlert(res.message)
        layer.closeAll()
      }
      appDIff()
    },
    error: function (error) {
      $config.yfAlert('网络异常')
      layer.closeAll()
    }
  })
}
// 用户点击领取奖励
function userGetAward(type, that, hang) {
  if ($(that).hasClass('miss') || $(that).hasClass('disabled')) {
    return
  }
  if (type == 6) {
    var num = $(that).siblings('.currTime').text().split('/')[1]
    type = num == 10 ? 1 : num == 20 ? 2 : 3
  }
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
        if (hang) {
          $(that).text('已领奖')
          setTimeout(function () {
            $(that).addClass('popup')
            $('.watch-time .currTime').text('已领奖')
          }, 2000)
          return
        }
        if (type == 2) {
          config.dialogComm($('#discount10-2'), 'discount10-2');
        } else if (type == 3) {
          config.dialogComm($('#discount85'), 'discount85');
        } else {
          if (type == 1) {
            var imgUrl = res.data.previewUrl
            $('.received-main').siblings('p').text('“' + res.data.productName + '”文字气泡x3天')
            $('.received-img').css(
              { 'background': 'url(' + imgUrl + ') no-repeat' },
              { 'background-size': '100%' }
            )
          } else {
            $(that).text('已领取')
            $('.received-main').siblings('p').text('直播间礼物口红*5个')
            $('.received-img').css(
              { 'background': 'url(./image/口红.png) no-repeat' },
              { 'background-size': '100%' }
            ).siblings('span').html('礼物已放入<span class="appBag">直播间背包</span>，有效期2天<br>快去送给心爱的主播吧~')
          }
          config.dialogComm($('#received'), 'received');
        }
      } else {
        $config.yfAlert(res.message)
      }
      appDIff()
    },
    error: function (error) {
      $config.yfAlert('网络异常')
    }
  })
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
    $('.appGoldVip').text('高级会员')
    $('.appSliverVip').text('普通会员')
    $('appGift').text('私信礼物')
  } else {
    $('.appName').text('觅伊')
    $('.appBag').text('直播间背包')
    $('.appUnit').text('收益积分')
    $('.appGoldVip').text('黄金会员')
    $('.appSliverVip').text('白银会员')
    $('appGift').text('直播礼物')
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
// function getQueryName(queryName, queryNameHang) {
//   var queryObj = {}
//   var queryObjHang = {}
//   for (var i = 0; i < queryName.length; i++) {
//     queryObj[queryName[i].split('=')[0]] = queryName[i].split('=')[1]
//   }
//   for (var i = 0; i < queryNameHang.length; i++) {
//     queryObjHang[queryNameHang[i].split('=')[0]] = queryNameHang[i].split('=')[1]
//   }
//   if (window.location.href.indexOf('hang') != -1) {
//     promote.liveCustomerId = queryObjHang.liveCustomerId
//   } else {
//     promote.liveCustomerId = queryObj.liveCustomerId
//   }
//   promote.customerId = queryObjHang.customerId
//   promote.liveCustomerId = queryObjHang.liveCustomerId
//   promote.streamId = queryObj.streamId
// }
promote.init()
if (window.location.href.indexOf('hang') != -1) {
  clearInterval(promote.timeId)
  promote.timeId = setInterval(function () {
    promote.init()
  }, 30000)
}