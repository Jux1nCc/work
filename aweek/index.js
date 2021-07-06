var sevenAct = {
  env: 'demo',
  customerId: $config.getQueryStringByName("liveCustomerId"),
  appType: $config.getQueryStringByName("appType"), //app类型（1-兔聊，2-觅伊）
  url: ['', '/api/liveAct/getDay7TaskSchedule', '/api/miyiLiveAct/getDay7TaskSchedule'],
  android: $config.browser.versions.android,
  obj: {},
  streamIdArr: [],
  todayDate: '',
  dataDate: [],
  month: [],
  day: [],
  taskDay: 0,
  isDone: 0,
  playTimeGoal: 15,
  playTimeCurr: 0,
  playTimePro: '',
  newFanGoal: 15,
  newFanCurr: 0,
  newFanPro: '',
  giveCountGoal: 10,
  giveCountCurr: 0,
  giveCountPro: '',
  PKCountGoal: 1,
  PKCountCurr: 0,
  PKCountPro: '',
  newStarGoal: 4000,
  newStarCurr: 0,
  newStarPro: '',
  timeId: '',
  finishStatus: ['未完成', '已完成', '未开启'],
  monthArr: ['一 月', '二 月', '三 月', '四 月', '五 月', '六 月', '七 月', '八 月', '九 月', '十 月', '十一月', '十二月',],
  init: function () {
    console.log(111);
    getId()
    if (sevenAct.obj.customerId == sevenAct.streamIdArr[sevenAct.streamIdArr.length - 1]) {
      sevenAct.isAlert()
      $('.customer').css('display', 'none')
      $('.stream').css('display', 'block')
    } else {
      $('.stream').css('display', 'none')
      $('.customer').css('display', 'block')
    }
    sevenAct.diffAPP()
    sevenAct.diffsystem()
    sevenAct.beforeCreate()
  },
  diffAPP: function () {
    if (sevenAct.appType == 1) {
      $('.appName').text('兔聊')
      $('.appUnit').text('聊币（直播收益）')
      $('.appFreeGift').removeClass('popup')
      $('.wrap>p').css('background', 'url("image/rule_tuliao.png")')
    } else {
      $('.appName').text('觅伊')
      $('.appUnit').html('直播<br>收益（积分）')
      $('.wrap>p').css('background', 'url("image/rule_miyi.png")')
    }
  },
  diffsystem: function () {
    if (sevenAct.android) {
      $('.diffsystem').remove()
    }
  },
  beforeCreate: function () {
    var params = {
      customerId: sevenAct.customerId,
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(sevenAct.env, sevenAct.url[sevenAct.appType]),
      data: params,
      dataType: 'json',
      success: function (res) {
        if (res.code == -2) {
          $config.yfAlert(res.message)
          clearInterval(sevenAct.timeId)
          return
        }
        $('.photo-img img').attr('src', res.data.photo + '?x-oss-process=image/resize,m_mfit,h_170,w_170')
        changeDate(res.data.dataDate, res.data.taskDay)
        sevenAct.getValue(res.data)
        sevenAct.renderTaskDays(sevenAct.dataDate, res.data.taskDay)
        sevenAct.renderToday()
        sevenAct.mounted()
      },
      error: function (error) {
        $config.yfAlert('网络异常')
        // clearInterval(sevenAct.timeId)
      }
    })
  },
  mounted: function () {
    $('.liveTime h6').html(sevenAct.playTimeCurr + '/' + sevenAct.playTimeGoal)
    $('.liveTime .progress').css('width', sevenAct.playTimePro)
    if (sevenAct.taskDay < 5) {
      $('.fans h1').text('新增粉丝')
      $('.reward h1').text('打赏人数')
      $('.fans h6').html(sevenAct.newFanCurr + '/' + sevenAct.newFanGoal)
      $('.fans .progress').css('width', sevenAct.newFanPro)
      $('.reward h6').html(sevenAct.giveCountCurr + '/' + sevenAct.giveCountGoal)
      $('.reward .progress').css('width', sevenAct.giveCountPro)
    } else {
      $('.fans h1').text('P K 次数')
      $('.reward h1').html('新增星光')
      $('.fans h6').html(sevenAct.PKCountCurr + '/' + sevenAct.PKCountGoal)
      $('.fans .progress').css('width', sevenAct.PKCountPro)
      $('.reward h6').html(sevenAct.newStarCurr + '/' + sevenAct.newStarGoal)
      $('.reward .progress').css('width', sevenAct.newStarPro)
    }
  },
  renderTaskDays: function (date, taskDay) {
    for (var i = 0; i < date.length; i++) {
      sevenAct.month.push(date[i].split('/')[1])
      sevenAct.day.push(date[i].split('/')[2])
      if (sevenAct.day[i].split('')[0] == 0) {
        $($('.item-day')[i]).text(sevenAct.day[i].split('')[1])
      } else {
        $($('.item-day')[i]).text(sevenAct.day[i])
      }
      if (Number(sevenAct.month[i]) <= 10) {
        $($('.item-month')[i]).text(sevenAct.monthArr[sevenAct.month[i] - 1])
      } else {
        $($('.item-month')[i]).text(sevenAct.monthArr[sevenAct.month[i] - 1])
      }
      if (date[i].split('/')[2] == sevenAct.todayDate.split('/')[2]) {
        if (sevenAct.isDone == 1) {
          $('.task-finished-text').text(sevenAct.taskDay)
          $($('.task-days-item')[i]).addClass('item-finished').children('.item-progress').text(sevenAct.finishStatus[1])
        } else {
          $('.task-finished-text').text(sevenAct.taskDay - 1)
          $($('.task-days-item')[i]).addClass('item-tasking').children('.item-progress').text(sevenAct.finishStatus[0])
        }
      } else {
        $($('.task-days-item')[i]).removeClass('item-finished').removeClass('item-tasking').children('.item-progress').text(sevenAct.finishStatus[2])
      }
    }
    for (var j = 0; j < taskDay - 1; j++) {
      $($('.task-days-item')[j]).addClass('item-finished').children('.item-progress').text(sevenAct.finishStatus[1])
    }
  },
  renderToday: function () {
    $('.time-goal').text(sevenAct.playTimeGoal)
    $('.time-curr').text(sevenAct.playTimeCurr)
    if (sevenAct.playTimeCurr / sevenAct.playTimeGoal <= 0.05) {
      $('.card-item1 .process-bar-item').css('width', '')
      $('.card-item1 .card-item-process-text').removeClass('red').addClass('gray').text('未完成')
    } else {
      $('.card-item1 .process-bar-item').css('width', sevenAct.playTimePro)
      if (sevenAct.playTimeCurr == sevenAct.playTimeGoal) {
        $('.card-item1 .card-item-process-text').removeClass('gray').addClass('red').text('已完成')
      }
    }
    if (sevenAct.taskDay < 5) {
      $('.card-item2>.card-item-title').html('新增<br/>粉丝')
      $('.card-item3>.card-item-title').html('打赏<br/>人数')
      $('.new-fan').show().siblings('.PK-count').hide()
      $('.give-count').show().siblings('.new-star').hide()
      $('.newfan-goal').text(sevenAct.newFanGoal)
      $('.newfan-curr').text(sevenAct.newFanCurr)
      if (sevenAct.newFanCurr / sevenAct.newFanGoal <= 0.05) {
        $('.card-item2 .process-bar-item').css('width', '')
        $('.card-item2 .card-item-process-text').removeClass('blur').addClass('gray').text('未完成')
      } else {
        $('.card-item2 .process-bar-item').css('width', sevenAct.newFanPro)
        if (sevenAct.newFanCurr == sevenAct.newFanGoal) {
          $('.card-item2 .card-item-process-text').removeClass('gray').addClass('blue').text('已完成')
        }
      }
      $('.give-goal').text(sevenAct.giveCountGoal)
      $('.give-curr').text(sevenAct.giveCountCurr)
      if (sevenAct.giveCountCurr / sevenAct.giveCountGoal <= 0.05) {
        $('.card-item3 .process-bar-item').css('width', '')
        $('.card-item3 .card-item-process-text').removeClass('orange').addClass('gray').text('未完成')
      } else {
        $('.card-item3 .process-bar-item').css('width', sevenAct.giveCountPro)
        if (sevenAct.giveCountCurr == sevenAct.giveCountGoal) {
          $('.card-item3 .card-item-process-text').removeClass('gray').addClass('orange').text('已完成')
        }
      }
    } else {
      $('.card-item2>.card-item-title').html('P K<br>次数')
      $('.card-item3>.card-item-title').html('新增<br/>星光')
      $('.new-fan').hide().siblings('.PK-count').show()
      $('.give-count').hide().siblings('.new-star').show()
      $('.PK-goal').text(sevenAct.PKCountGoal)
      $('.PK-curr').text(sevenAct.PKCountCurr)
      if (sevenAct.PKCountCurr / sevenAct.PKCountGoal <= 0.05) {
        $('.card-item2 .process-bar-item').css('width', '')
        $('.card-item2 .card-item-process-text').removeClass('blur').addClass('gray').text('未完成')
      } else {
        $('.card-item2 .process-bar-item').css('width', sevenAct.PKCountPro)
        if (sevenAct.PKCountCurr == sevenAct.PKCountGoal) {
          $('.card-item2 .card-item-process-text').removeClass('gray').addClass('blue').text('已完成')
        }
      }
      $('.star-goal').text(sevenAct.newStarGoal)
      $('.star-curr').text(sevenAct.newStarCurr)
      if (sevenAct.newStarCurr / sevenAct.newStarGoal <= 0.05) {
        $('.card-item3 .process-bar-item').css('width', '')
        $('.card-item3 .card-item-process-text').removeClass('orange').addClass('gray').text('未完成')
      } else {
        $('.card-item3 .process-bar-item').css('width', sevenAct.newStarPro)
        if (sevenAct.giveCountCurr == sevenAct.giveCountGoal) {
          $('.card-item3 .card-item-process-text').removeClass('gray').addClass('orange').text('已完成')
        }
      }
    }
  },
  getValue: function (data) {
    sevenAct.taskDay = data.taskDay
    sevenAct.isDone = data.isDone
    sevenAct.playTimeGoal = parseInt(data.goalLiveDuration / 60)
    sevenAct.playTimeCurr = parseInt(data.currLiveDuration / 60)
    sevenAct.playTimePro = parseInt((sevenAct.playTimeCurr / sevenAct.playTimeGoal) * 100) + '%'
    sevenAct.newFanGoal = data.goalAddFansCnt
    sevenAct.newFanCurr = data.currAddFansCnt
    sevenAct.newFanPro = parseInt((sevenAct.newFanCurr / sevenAct.newFanGoal) * 100) + '%'
    sevenAct.giveCountGoal = data.goalRewardCustCnt
    sevenAct.giveCountCurr = data.currRewardCustCnt
    sevenAct.giveCountPro = parseInt((sevenAct.giveCountCurr / sevenAct.giveCountGoal) * 100) + '%'
    sevenAct.PKCountGoal = data.goalPkCnt
    sevenAct.PKCountCurr = data.currPkCnt
    sevenAct.PKCountPro = parseInt((sevenAct.PKCountCurr / sevenAct.PKCountGoal) * 100) + '%'
    sevenAct.newStarGoal = data.goalAddStarValue
    sevenAct.newStarCurr = data.currAddStarValue
    sevenAct.newStarPro = parseInt((sevenAct.newStarCurr / sevenAct.newStarGoal) * 100) + '%'
  },
  isAlert: function () {
    if (sevenAct.taskDay < 7) {
      if (sevenAct.isDone == 1) {
        layer.msg('今日任务<br/>已完成<br/>真棒')
        clearInterval(sevenAct.timeId)
      }
    } else {
      if (sevenAct.isDone == 1) {
        layer.msg('恭喜奖励已到账')
        clearInterval(sevenAct.timeId)
      }
    }
  }
}
function toRule() {
  window.location.href = "./rule.html?" + window.location.href.split('?')[1]
}
function toIndex() {
  window.history.go(-1)
}
function changeDate(dateData, taskDay) {
  var today = new Date()
  var date = new Date(dateData);
  var base = new Date(date).getTime();
  var oneDay = 24 * 3600 * 1000;
  var date = [];
  var time = new Date(base);
  var monthNum = time.getMonth()
  var dayNum = time.getDate()
  if (dayNum < 10) {
    dayNum = '0' + dayNum
  }
  date.push([time.getFullYear(), monthNum + 1, dayNum].join('/'));
  for (var i = 1; i < taskDay; i++) {
    var now = new Date(base -= oneDay);
    var nowDay = now.getDate()
    if (nowDay < 10) {
      nowDay = '0' + nowDay
    }
    date.push([now.getFullYear(), now.getMonth() + 1, nowDay].join('/'));
  }
  date = date.reverse()
  base = new Date(new Date(dateData)).getTime();
  for (var j = 7; j > taskDay; j--) {
    var now = new Date(base += oneDay);
    var nowDay = now.getDate()
    if (nowDay < 10) {
      nowDay = '0' + nowDay
    }
    date.push([now.getFullYear(), now.getMonth() + 1, nowDay].join('/'));
  }
  sevenAct.dataDate = date
  sevenAct.todayDate = moment(today.getTime()).format('YYYY/MM/DD')
}
function getId() {
  var obj = {}
  var hrefStr = window.location.href.split('?')[2]
  if (hrefStr == undefined) {
    return
  } else {
    var hrefArr = hrefStr.split('&')
    for (var i = 0; i < hrefArr.length; i++) {
      obj[hrefArr[i].split('=')[0]] = hrefArr[i].split('=')[1]
    }
  }
  sevenAct.obj = obj
  sevenAct.streamIdArr = sevenAct.obj.streamId.split('_')
}
sevenAct.init()
if (window.location.href.indexOf('hang') != -1) {
  clearInterval(sevenAct.timeId)
  sevenAct.timeId = setInterval(function () {
    sevenAct.init()
  }, 30000)
}