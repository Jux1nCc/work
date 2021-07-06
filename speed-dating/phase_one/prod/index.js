var speed = {
  env: 'prod',
  actId: $config.getQueryStringByName("actId"),
  token: $config.getQueryStringByName("token"),
  customerId: $config.getQueryStringByName("customerId"),
  appType: $config.getQueryStringByName("appType"),
  isShowBtn: $config.getQueryStringByName("isShowBtn"),
  startTime:'',
  endTime:'',
  actInfo_0:window.localStorage.getItem('actInfo_0'),
  actInfo_1:window.localStorage.getItem('actInfo_1'),
  actInfo_2:window.localStorage.getItem('actInfo_2'),
  actInfo_3:window.localStorage.getItem('actInfo_3'),
  actPeriods:['','第一期','第二期','第三期','第四期','第五期','第六期','第七期','第八期','第九期','第十期'],
  init: function () {
    diffApp()
    speed.created()
    $('.page').removeClass('popup')
  },
  created: function () {
    var parmas = {
      customerId: speed.customerId,
      token: speed.token,
      actId: speed.actId,
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(speed.env, '/api/lotMatchAct/getLotActMainPage'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          console.log(res)
          speed.startTime = res.data.startTime.split(' ')[0]
          speed.endTime = res.data.endTime.split(' ')[0]
          if(res.data.actScheduleInfos[0].currCnt >= res.data.actScheduleInfos[0].goalCnt){
            res.data.actScheduleInfos[0].currCnt = res.data.actScheduleInfos[0].goalCnt
          }
          if(res.data.actScheduleInfos[1].currCnt >= res.data.actScheduleInfos[1].goalCnt){
            res.data.actScheduleInfos[1].currCnt = res.data.actScheduleInfos[1].goalCnt
          }
          if(res.data.actScheduleInfos[2].currCnt >= res.data.actScheduleInfos[2].goalCnt){
            res.data.actScheduleInfos[2].currCnt = res.data.actScheduleInfos[2].goalCnt
          }
          if(res.data.actScheduleInfos[3].currCnt >= res.data.actScheduleInfos[3].goalCnt){
            res.data.actScheduleInfos[3].currCnt = res.data.actScheduleInfos[3].goalCnt
          }
          if(speed.actInfo_0 == ''){
            speed.setStorage(res.data)
          }else {
            if(res.data.actScheduleInfos[3].currCnt >= (res.data.actScheduleInfos[3].goalCnt) && speed.actInfo_3 != res.data.actScheduleInfos[3].currCnt){
              speed.showDig(res.data,3)
            }else if(res.data.actScheduleInfos[2].currCnt >= (res.data.actScheduleInfos[2].goalCnt) && speed.actInfo_2 != res.data.actScheduleInfos[2].currCnt){
              speed.showDig(res.data,2)
            }else if(res.data.actScheduleInfos[1].currCnt >= (res.data.actScheduleInfos[1].goalCnt) && speed.actInfo_1 != res.data.actScheduleInfos[1].currCnt){
              speed.showDig(res.data,1)
            }else if(res.data.actScheduleInfos[0].currCnt >= (res.data.actScheduleInfos[0].goalCnt) && speed.actInfo_0 != res.data.actScheduleInfos[0].currCnt){
              speed.showDig(res.data,0)
            }
            speed.setStorage(res.data)
          }
          speed.mounted(res.data)
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    })
  },
  setStorage(data){
    window.localStorage.setItem('actInfo_0',data.actScheduleInfos[0].currCnt)
    window.localStorage.setItem('actInfo_1',data.actScheduleInfos[1].currCnt)
    window.localStorage.setItem('actInfo_2',data.actScheduleInfos[2].currCnt)
    window.localStorage.setItem('actInfo_3',data.actScheduleInfos[3].currCnt)
  },
  mounted: function (data) {
    speed.startTime = speed.startTime.split('-')[0] + '年'+speed.startTime.split('-')[1] + '月' + speed.startTime.split('-')[2] + '日' 
    speed.endTime = speed.endTime.split('-')[0] + '年'+speed.endTime.split('-')[1] + '月' + speed.endTime.split('-')[2] + '日' 
    $('.act-time').html('<span>活动时间: ' + speed.startTime + ' - ' + speed.endTime+'</span>')
    $('.rule-time').text('1.本期活动时间:' + speed.startTime + '-' + speed.endTime + '；')
    $('.act-periods span').text(speed.actPeriods[data.periods])
    if (data.taskType == 1) {
      $('.is-time').text('人数')
      $('.li-title .item-count').text('缘分速配人数')
    } else {
      $('.is-time').text('次数')
      $('.li-title .item-count').text('缘分速配次数')
    }
    if(!data.actScheduleInfos.length){
      return
    }
    $('.two-min .item-time').text('≥' + data.actScheduleInfos[0].serveTime + '分钟')
    $('.three-min .item-time').text('≥' + data.actScheduleInfos[1].serveTime + '分钟')
    $('.five-min .item-time').text('≥' + data.actScheduleInfos[2].serveTime + '分钟')
    $('.elevent-min .item-time').text('≥' + data.actScheduleInfos[3].serveTime + '分钟')
    if (data.actScheduleInfos[0].currCnt < data.actScheduleInfos[0].goalCnt) {
      $('.two-min .item-count .currCnt').text(data.actScheduleInfos[0].currCnt)
      $('.two-min .item-count .goalCnt').text(data.actScheduleInfos[0].goalCnt)
      $('.two-min .item-count .progress').css('width', (data.actScheduleInfos[0].currCnt / data.actScheduleInfos[0].goalCnt)*100 + '%')
    } else {
      data.actScheduleInfos[0].currCnt = data.actScheduleInfos[0].goalCnt
      $('.two-min .item-count .progress').addClass('full')
      $('.two-min .item-count .isfinish').addClass('finished')
      $('.two-min .item-count .isfinish').html('<span>已完成</span>')
      $('.two-min .item-award .award-main').addClass('award-full')
    }
    if (data.actScheduleInfos[1].currCnt < data.actScheduleInfos[1].goalCnt) {
      $('.three-min .item-count .currCnt').text(data.actScheduleInfos[1].currCnt)
      $('.three-min .item-count .goalCnt').text(data.actScheduleInfos[1].goalCnt)
      $('.three-min .item-count .progress').css('width', (data.actScheduleInfos[1].currCnt / data.actScheduleInfos[1].goalCnt)*100 + '%')
    } else {
      data.actScheduleInfos[1].currCnt = data.actScheduleInfos[1].goalCnt
      $('.three-min .item-count .progress').addClass('full')
      $('.three-min .item-count .isfinish').addClass('finished')
      $('.three-min .item-count .isfinish').html('<span>已完成</span>')
      $('.three-min .item-award .award-main').addClass('award-full')
    }
    if (data.actScheduleInfos[2].currCnt < data.actScheduleInfos[2].goalCnt) {
      $('.five-min .item-count .currCnt').text(data.actScheduleInfos[2].currCnt)
      $('.five-min .item-count .goalCnt').text(data.actScheduleInfos[2].goalCnt)
      $('.five-min .item-count .progress').css('width', (data.actScheduleInfos[2].currCnt / data.actScheduleInfos[2].goalCnt)*100 + '%')
    } else {
      data.actScheduleInfos[2].currCnt = data.actScheduleInfos[2].goalCnt
      $('.five-min .item-count .progress').addClass('full')
      $('.five-min .item-count .isfinish').addClass('finished')
      $('.five-min .item-count .isfinish').html('<span>已完成</span>')
      $('.five-min .item-award .award-main').addClass('award-full')
    }
    if (data.actScheduleInfos[3].currCnt < data.actScheduleInfos[3].goalCnt) {
      $('.elevent-min .item-count .currCnt').text(data.actScheduleInfos[3].currCnt)
      $('.elevent-min .item-count .goalCnt').text(data.actScheduleInfos[3].goalCnt)
      $('.elevent-min .item-count .progress').css('width', (data.actScheduleInfos[3].currCnt / data.actScheduleInfos[3].goalCnt)*100 + '%')
    } else {
      data.actScheduleInfos[3].currCnt = data.actScheduleInfos[3].goalCnt
      $('.elevent-min .item-count .progress').addClass('full')
      $('.elevent-min .item-count .isfinish').addClass('finished')
      $('.elevent-min .item-count .isfinish').html('<span>已完成</span>')
      $('.elevent-min .item-award .award-main').addClass('award-full')
    }
    var data_0 = data.actScheduleInfos[0].rewardInfos
    var data_1 = data.actScheduleInfos[1].rewardInfos
    var data_2 = data.actScheduleInfos[2].rewardInfos
    var data_3 = data.actScheduleInfos[3].rewardInfos
    $('.two-min .award-time').text('x' + data_0[0].rewardDays + '天')
    $('.three-min .award-time').text('x' + data_1[0].rewardDays + '天')
    $('.five-min .award-time').text('x' + data_2[0].rewardDays + '天')
    $('.elevent-min .award-time').text('x' + data_3[0].rewardDays + '天')
    if (data_0.length == 1) {
      if(data_0[0].rewardType == 3){
        $('.two-min .earning').addClass('popup')
        $('.two-min .video').removeClass('popup')
        $('.two-min .video .award-num').html(data_0[0].rewardValue + '<span class="appUnit">钻石</span>')
      }else {
        $('.two-min .earning .award-num').text(data_0[0].rewardValue + '%')
      }
    } else {
      $('.two-min .award-item').addClass('high').addClass('small')
      $('.two-min .video').removeClass('popup')
      $('.two-min .dashed').removeClass('popup')
      for (var i = 0; i < data_0.length; i++) {
        if (data_0[i].rewardType == 3) {
          $('.two-min .video .award-num').html(data_0[i].rewardValue+'<span class="appUnit">钻石</span>')
        } else {
          $('.two-min .earning .award-num').text(data_0[i].rewardValue + '%')
        }
      }
    }
    if (data_1.length == 1) {
      if(data_0[0].rewardType == 3){
        $('.three-min .earning').addClass('popup')
        $('.three-min .video').removeClass('popup')
        $('.three-min .video .award-num').html(data_1[0].rewardValue + '<span class="appUnit">钻石</span>')
      }else {
        $('.three-min .earning .award-num').text(data_1[0].rewardValue + '%')
      }
    } else {
      $('.three-min .award-item').addClass('high').addClass('small')
      $('.three-min .video').removeClass('popup')
      $('.three-min .dashed').removeClass('popup')
      for (var i = 0; i < data_1.length; i++) {
        if (data_1[i].rewardType == 3) {
          $('.three-min .video .award-num').html(data_1[i].rewardValue+'<span class="appUnit">钻石</span>')
        } else {
          $('.three-min .earning .award-num').text(data_1[i].rewardValue + '%')
        }
      }
    }
    if (data_2.length == 1) {
      if(data_0[0].rewardType == 3){
        $('.five-min .earning').addClass('popup')
        $('.five-min .video').removeClass('popup')
        $('.five-min .video .award-num').html(data_2[0].rewardValue + '<span class="appUnit">钻石</span>')
      }else {
        $('.five-min .earning .award-num').text(data_2[0].rewardValue + '%')
      }
    } else {
      $('.five-min .award-item').addClass('high').addClass('small')
      $('.five-min .video').removeClass('popup')
      $('.five-min .dashed').removeClass('popup')
      for (var i = 0; i < data_2.length; i++) {
        if (data_2[i].rewardType == 3) {
          $('.five-min .video .award-num').html(data_2[i].rewardValue+'<span class="appUnit">钻石</span>')
        } else {
          $('.five-min .earning .award-num').text(data_2[i].rewardValue + '%')
        }
      }
    }
    if (data_3.length == 1) {
      if(data_0[0].rewardType == 3){
        $('.elevent-min .earning').addClass('popup')
        $('.elevent-min .video').removeClass('popup')
        $('.elevent-min .video .award-num').html(data_3[0].rewardValue + '<span class="appUnit">钻石</span>')
      }else {
        $('.elevent-min .earning .award-num').text(data_3[0].rewardValue + '%')
      }
    } else {
      $('.elevent-min .award-item').addClass('high').addClass('small')
      $('.elevent-min .video').removeClass('popup')
      $('.elevent-min .dashed').removeClass('popup')
      for (var i = 0; i < data_3.length; i++) {
        if (data_3[i].rewardType == 3) {
          $('.elevent-min .video .award-num').html(data_3[i].rewardValue+'<span class="appUnit">钻石</span>')
        } else {
          $('.elevent-min .earning .award-num').text(data_3[i].rewardValue + '%')
        }
      }
    }
    if (data.taskType == 1) {
      $('.most-count').text(data.actScheduleInfos[3].goalCnt + '人')
    } else {
      $('.most-count').text(data.actScheduleInfos[3].goalCnt + '次')
    }
      if (data.actScheduleInfos[0].rewardInfos[0].rewardType == 1) {
        $('.red').text('非直播收益的分成增加；')
        $('.is-video').text('1.奖励以下个周期的非直播收益部分进行核算（即除直播间收益外的全部收益）；')
        if(data.actScheduleInfos[0].rewardInfos.length == 2){
          if (data.actScheduleInfos[0].rewardInfos[1].rewardType == 3){
            $('.is-and').removeClass('popup')
            $('.is-and-3').removeClass('popup')
          }
        }
        if(data.actScheduleInfos[0].rewardInfos.length == 3){
          if (data.actScheduleInfos[0].rewardInfos[3].rewardType == 3){
            $('.is-and').removeClass('popup')
            $('.is-and-3').removeClass('popup')
          }
        }
      } else if (data.actScheduleInfos[0].rewardInfos[0].rewardType == 2) {
        $('.red').text('语音和视频收益的额外奖励；')
        $('.is-video').text('1.奖励以视频通话和语音通话时的收益部分进行核算；')
        if(data.actScheduleInfos[0].rewardInfos.length == 2){
          if (data.actScheduleInfos[0].rewardInfos[1].rewardType == 3){
            $('.is-and').removeClass('popup')
            $('.is-and-3').removeClass('popup')
          }
        }
        if(data.actScheduleInfos[0].rewardInfos.length == 3){
          if (data.actScheduleInfos[0].rewardInfos[3].rewardType == 3){
            $('.is-and').removeClass('popup')
            $('.is-and-3').removeClass('popup')
          }
        }
      } else {
        $('.all-no').addClass('popup')
        $('.award p:first').addClass('popup')
        $('.p-num-2').text('1')
        $('.p-num-3').text('2')
        if (data.actScheduleInfos[0].rewardInfos[0].rewardType == 3){
          $('.is-and-3').removeClass('popup')
        }
      }
    $('.most-time').text(data.actScheduleInfos[3].serveTime + '分钟')
    $('.most-day').text(data_3[0].rewardDays)
    $('.most-percent').text(data.actScheduleInfos[3].rewardInfos[0].rewardValue + '%')
    $('.percent-plus').text(50 + data.actScheduleInfos[3].rewardInfos[0].rewardValue + '%')
    diffApp()
  },
  showDig: function(data,type){
      $('.get-award1 .awardTip-earning').text('收益分成+' + data.actScheduleInfos[type].rewardInfos[0].rewardValue + '%')
      $('.get-award1 .awardTip-precent').text('(即' + (Number(data.rate.split('.')[0]) + data.actScheduleInfos[type].rewardInfos[0].rewardValue) + '%)')
      $('.get-award1 .awardTip-day').text('x' + data.actScheduleInfos[type].rewardInfos[0].rewardDays + '天')
      if(data.actScheduleInfos[type].rewardInfos.length > 1){
        $('.get-award2').removeClass('popup')
        $('.get-award2 .awardTip-earning').html('音视频收费上限+' + data.actScheduleInfos[type].rewardInfos[1].rewardValue + '<span class="appUnit">钻石</span>')
      $('.get-award2 .awardTip-day').text('x' + data.actScheduleInfos[type].rewardInfos[1].rewardDays + '天')
      }
    $config.dialogComm($('#awardTip'), 'awardTip')
  }
}

function toSpeed() {
  if (($config.browser.versions.android)) {
    client.jumpToSpeedMate()
  } else {
    window.webkit.messageHandlers.jumpToSpeedMate.postMessage(null)
  }
}
function diffApp() {
  if (speed.isShowBtn == 1) {
    $('.speed-dating').addClass('popup')
  }
  if ($config.browser.versions.android) {
    $('.apple').addClass('popup')
  }
  if (speed.appType == 1) {
    $('.appName').text('兔聊')
    $('.appUnit').text('聊币')
  } else {
    $('.appName').text('觅伊')
    $('.appUnit').text('钻石')
  }
}
speed.init()