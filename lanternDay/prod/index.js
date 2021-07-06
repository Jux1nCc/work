var lantern = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  token: $config.getQueryStringByName("token"),
  isFrom: $config.getQueryStringByName("isFrom"),
  appType: 2,
  actNum: 0,
  init: function () {
    if ($config.browser.versions.android) {
      $('.isApple').addClass('popup')
    }
    lantern.created()
  },
  created: function() {
    var parmas = {
      customerId: lantern.customerId,
      isFrom: lantern.isFrom,
      token: lantern.token
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(lantern.env, '/act/yuanxiao2021/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          lantern.appType = res.data.appType
          lantern.actNum = res.data.actNum
          if (!res.data.isLogin) {
            $config.dialogComm($('#isLogin'), 'isLogin')
            return
          }
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          lantern.diffApp()
          lantern.mounted(res.data)
        } else {
          if (res.code == '-100') {
            layer.msg(res.message, {
              time: false,
              shade: 0.5
            })
            document.body.addEventListener(
              'touchmove',
              function (e) {
                e.preventDefault()
              },
              { passive: false }
            )
          } else {
            $config.yfAlert(res.message)
          }
        }
      },
      error: function (error) {
        layer.msg('网络异常')
      }
    })
  },
  mounted: function (data) {
    $('.ishave span').text(lantern.actNum + '个')
    for (var i = 0; i < data.gifts.length; i++) {
      $($($($('li')[i]).children()[0]).children()[1]).text(data.gifts[i].giftName)
      $($($($($('li')[i]).children()[0]).children()[2]).children()[0]).text(data.gifts[i].giftPrice)
      $($($($('li')[i]).children()[0]).children()[0]).attr('src', data.gifts[i].giftImage + '?x-oss-process=image/resize,w_200')
      $($($($('li')[i]).children()[1]).children()[2]).children().text(data.gifts[i].giftPrice / 200 + '个')
      $($($('li')[i]).children()[2]).attr('id', data.gifts[i].id)
      if(lantern.actNum < parseInt($($($($('li')[i]).children()[1]).children()[2]).children().text())){
        $($('li')[i]).children('.gift-count').children('.gift-count-control').children('.line-add').addClass('gray').siblings('.add').addClass('gray')
      }
    }
  },
  diffApp: function(){
    if(lantern.appType == 1){
      $('.appName').text('兔聊')
      $('.appUnit').text('聊币')
    }else {
      $('.appName').text('觅伊')
      $('.appUnit').text('钻石')
    }
  }
}
function toGetGift(that) {
  if(!$(that).hasClass('success')){
    return
  }
  var _giftNum = $(that).siblings('.gift-count').children('.gift-count-control').children('.sum').text()
  var giftName = $(that).siblings('.gift-pic').children('.gift-pic-name').text()
  var parmas = {
    customerId: lantern.customerId,
    giftId: $(that).attr('id'),
    giftNum: _giftNum,
    token: lantern.token
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(lantern.env, '/act/yuanxiao2021/authApi/exchangeGift'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        lantern.actNum = res.data.actNum
        $('.ishave span').text(lantern.actNum + '个')
        $config.yfAlert('兑换成功，'+ _giftNum +'个“'+ giftName +'”礼物已经放至您的背包礼物！')
        $('.sum').text('0')
        $('.sub').addClass('gray').siblings('.line-sub').addClass('gray')
        $('.gift-exchange').removeClass('success')
        for(var i = 0; i < 3; i++){
          if(lantern.actNum < parseInt($($($($('li')[i]).children()[1]).children()[2]).children().text())){
            $($('li')[i]).children('.gift-count').children('.gift-count-control').children('.line-add').addClass('gray').siblings('.add').addClass('gray')
          }else {
            $($('li')[i]).children('.gift-count').children('.gift-count-control').children('.line-add').removeClass('gray').siblings('.add').removeClass('gray')
          }
        }
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      layer.msg('网络异常')
    }
  })
}
function subNum(that) {
  if ($(that).hasClass('gray')) {
    return
  }
  var sum = Number($(that).siblings('.sum').text()) - 1
  $(that).siblings('.add').removeClass('gray').siblings('.line-add').removeClass('gray')
  $(that).siblings('.sum').text(sum)
  if ($(that).siblings('.sum').text() == 0) {
    $(that).addClass('gray').siblings('.line-sub').addClass('gray')
    $(that).parent().parent().siblings('.gift-exchange').removeClass('success')
  }
}
function addNum(that) {
  if ($(that).hasClass('gray')) {
    if(lantern.actNum != 0){
      layer.msg('已达到最多可换个数，多多收集“元宵”来换更多礼物吧！')
    }else {
      layer.msg('“元宵”数量不足，多多收集“元宵”来换礼物吧！')
    }
    return
  }
  var sum = Number($(that).siblings('.sum').text()) + 1
  var price = parseInt($($($(that).parent().siblings('span')[1]).children()[0]).text())
  $(that).siblings('.sub').removeClass('gray').siblings('.line-sub').removeClass('gray')
  $(that).parent().parent().siblings('.gift-exchange').addClass('success')
  $(that).siblings('.sum').text(sum)
  if ((lantern.actNum - sum * price) < price) {
    $(that).addClass('gray').siblings('.line-add').addClass('gray')
    return
  }
}
lantern.init()