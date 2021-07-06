var blindAct = {
  env: 'demo',
  customerId: $config.getQueryStringByName("customerId"),
  token: $config.getQueryStringByName("token"),
  isFrom: $config.getQueryStringByName("isFrom"),
  appType: 2,
  actNum: 0,  // 夸夸你数量
  init: function () {
    if ($config.browser.versions.android) {
      $('.isApple').addClass('popup')
    }
    config.lazyLoad('.lazy-img')
    blindAct.created()
  },
  created: function() {
    var parmas = {
      customerId: blindAct.customerId,
      isFrom: blindAct.isFrom,
      token: blindAct.token
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(blindAct.env, '/act/april2021/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          console.log(res.data);
          blindAct.appType = res.data.appType
          blindAct.actNum = res.data.actNum
          if (!res.data.isLogin) {
            $config.dialogComm($('#isLogin'), 'isLogin')
            return
          }
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          blindAct.diffApp()
          blindAct.mounted(res.data)
        } else {
          if (res.code == '-100') {
            layer.msg(res.message, {
              time: false,
              shade: 0.5
            })
            document.body.addEventListener(
              'touchmove',
              function (e) {
                e.preventDefault() //阻止默认的处理方式(阻止下拉滑动的效果)
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
    $('.ishave span').text(blindAct.actNum + '个')
    for (var i = 0; i < data.gifts.length; i++) {
      $($($($('li')[i]).children()[0]).children()[1]).text(data.gifts[i].giftName)
      $($($($($('li')[i]).children()[0]).children()[2]).children()[0]).text(data.gifts[i].giftPrice)
      $($($($('li')[i]).children()[0]).children()[0]).attr('src', data.gifts[i].giftImage + '?x-oss-process=image/resize,w_200')
      // $($($($('li')[i]).children()[1]).children()[2]).children().text(parseInt(data.gifts[i].giftPrice / 200) + '个')
      $($($('li')[i]).children()[2]).attr('id', data.gifts[i].id)
      if(blindAct.actNum < parseInt($($($($('li')[i]).children()[1]).children()[2]).children().text())){
        $($('li')[i]).children('.gift-count').children('.gift-count-control').children('.line-add').addClass('gray').siblings('.add').addClass('gray')
      }
    }
  },
  diffApp: function(){
    if(blindAct.appType == 1){
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
  var _giftNum = $(that).siblings('.gift-count').children('.gift-count-control').children('.sum').val()
  if(_giftNum == 0){
    layer.msg('请输入需要兑换的数量')
    return
  }
  var giftName = $(that).siblings('.gift-pic').children('.gift-pic-name').text()
  var parmas = {
    customerId: blindAct.customerId,
    giftId: $(that).attr('id'),
    giftNum: _giftNum,
    token: blindAct.token
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(blindAct.env, '/act/april2021/authApi/exchangeGift'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        blindAct.actNum = res.data.actNum
        $('.ishave span').text(blindAct.actNum + '个')
        $config.yfAlert('兑换成功，'+ _giftNum +'个“'+ giftName +'”礼物已经放至您的背包礼物！')
        $('.sum').val('0')
        $('.sub').addClass('gray').siblings('.line-sub').addClass('gray')
        $('.gift-exchange').removeClass('success')
        for(var i = 0; i < 3; i++){
          if(blindAct.actNum < parseInt($($($($('li')[i]).children()[1]).children()[2]).children().text())){
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
  var sum = Number($(that).siblings('.sum').val()) - 1
  $(that).siblings('.add').removeClass('gray').siblings('.line-add').removeClass('gray')
  $(that).siblings('.sum').val(sum)
  if ($(that).siblings('.sum').val() == 0) {
    $(that).addClass('gray').siblings('.line-sub').addClass('gray')
    $(that).parent().parent().siblings('.gift-exchange').removeClass('success')
  }
}
function addNum(that) {
  if ($(that).hasClass('gray')) {
    if(blindAct.actNum != 0 && Number($(that).siblings('.sum').val()) != 0){
      layer.msg('已达到最多可换个数，多多收集“夸夸你”来换更多礼物吧！')
    }else {
      layer.msg('“夸夸你”数量不足，多多收集“夸夸你”来换礼物吧！')
    }
    return
  }
  var sum = Number($(that).siblings('.sum').val()) + 1
  var price = parseInt($($($(that).parent().siblings('span')[1]).children()[0]).text())
  $(that).siblings('.sub').removeClass('gray').siblings('.line-sub').removeClass('gray')
  $(that).parent().parent().siblings('.gift-exchange').addClass('success')
  $(that).siblings('.sum').val(sum)
  if ((blindAct.actNum - sum * price) < price) {
    $(that).addClass('gray').siblings('.line-add').addClass('gray')
    return
  }
}
function changeVal(that){
  var price = parseInt($($($(that).parent().siblings('span')[1]).children()[0]).text())
  var maxNum = parseInt(blindAct.actNum / price)
  if(maxNum < 1 || blindAct.actNum == 0){
    layer.msg('“夸夸你”数量不足，多多收集“夸夸你”来换礼物吧！')
    $(that).val('0')
    return
  }
  if($(that).val() > 0){
    $(that).parent().parent().siblings('.gift-exchange').addClass('success')
    $(that).siblings('.sub').removeClass('gray').siblings('.line-sub').removeClass('gray')
    $(that).val(parseInt($(that).val()))
  }else {
    $(that).siblings('.sub').addClass('gray').siblings('.line-sub').addClass('gray')
    $(that).attr('placeholder','0')
    $(that).parent().parent().siblings('.gift-exchange').removeClass('success')
  }
  if($(that).val() == ''){
    $(that).siblings('.sub').addClass('gray').siblings('.line-sub').addClass('gray')
    $(that).attr('placeholder','0')
    $(that).parent().parent().siblings('.gift-exchange').removeClass('success')
  }
  if($(that).val() > maxNum){
    layer.msg('您当前最多可兑换'+ maxNum +'个')
    $(that).siblings('.add').addClass('gray').siblings('.line-add').addClass('gray')
    $(that).val(maxNum)
  }
}
function addPlace(that){
  var price = parseInt($($($(that).parent().siblings('span')[1]).children()[0]).text())
  var maxNum = parseInt(blindAct.actNum / price)
  if(maxNum >= 1 && $(that).val() == 0){
    $(that).siblings('.add').removeClass('gray').siblings('.line-add').removeClass('gray')
  }
  if($(that).val() == ''){
    if(maxNum >= 1){
      $(that).siblings('.add').removeClass('gray').siblings('.line-add').removeClass('gray')
    }else {
      $(that).siblings('.sub').addClass('gray').siblings('.line-sub').addClass('gray')
      $(that).siblings('.add').addClass('gray').siblings('.line-add').addClass('gray')
    }
    $(that).attr('placeholder','0')
    $(that).parent().parent().siblings('.gift-exchange').removeClass('success')
  }
}
function removePlace(that){
  $(that).removeAttr('placeholder')
}
blindAct.init()
// config.lazyLoad('.lazy-img')