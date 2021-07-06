var national = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  token: $config.getQueryStringByName("token"),
  isFrom: $config.getQueryStringByName("isFrom"),
  appType: $config.getQueryStringByName("appType"),
  type: 1,
  appBool: openInWebview(),
  isLogin: false,
  dayCashAward: false,
  gradeAlert: 0,
  isEnd: false,
  todayTime: +moment(new Date().getTime()).format('D'),
  levelArr: [
    { level: 1, title: '成功解锁“土豪撒钱”进场特效x5天，“国庆快乐”头像框x7天', money: '49元' },
    { level: 2, title: '成功解锁活动礼物<span>8折</span>特权<br>“千里共婵娟”文字气泡*10天', money: '299元' },
    { level: 3, title: '成功解锁活动礼物<span>6折</span>特权<br>直播间入场提示', money: '899元' },
    { level: 4, title: '成功解锁活动礼物<span>4折</span>特权<br>返现充值金额的6.5%', money: '3999元' },
    { level: 5, title: '成功解锁返现充值金额的10%<br>所有进场特效畅享x15天', money: '7888元' },
  ],
  welfArr: [
    '满20元-3元充值优惠券',
    '“中秋小兔”头像框x3天',
    '“放假啦”头像框x3天',
    '“绚烂礼花”头像框x3天',
    '“千里共婵娟”文字气泡x3天',
    '高级会员x7天',
    '“土豪撒钱”进场特效x3天',
    '100信用分',
    '满98-10充值券'
  ],
  imgArr: ['./image/满20-3优惠券.png', './image/中秋小兔 头像框.png', './image/放假啦 头像框.png', './image/绚烂礼花 头像框.png', './image/千里共婵娟 文字气泡.png', './image/高级会员.png', './image/土豪撒钱.png', './image/100信用分.png', './image/满98-10优惠券.png'],
  dateArr: ['9月30日', '10月1日', '10月2日', '10月3日', '10月4日', '10月5日', '10月6日', '10月7日', '10月8日',],
  init: function () {
    diffApp(national.appType)
    $config.addObserver()
    national.created()
  },
  created: function () {
    var params = {
      customerId: national.customerId,
      token: national.token,
      isFrom: national.isFrom,
      appType: national.appType
    }
    $.ajax({
      type: "GET",
      url: $config.toUrl(national.env, "/act/national20/index"),
      data: params,
      dataType: "json",
      success: function (res) {
        if (res.result) {
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          if (!window.localStorage.getItem('todayTime')) {
            window.localStorage.setItem('todayTime', national.todayTime)
          } else {
            if (window.localStorage.getItem('todayTime') != national.todayTime) {
              window.localStorage.setItem('todayTime', national.todayTime)
              window.localStorage.removeItem('noWant')
            }
          }
          allAata = res.data
          national.isLogin = res.data.isLogin
          national.isEnd = res.data.isEnd
          national.getList();
          national.getNotice()
          national.mounted(res.data);
          if (!window.localStorage.getItem('noWant') && !res.data.isEnd) {
            openWelf(res.data)
          }
        } else {
          if (res.code == '-100') {
            layer.msg(res.message, {
              time: false,
              shade: 0.5
            })
          } else {
            $config.yfAlert(res.message)
          }
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    });
  },
  mounted: function (data) {
    if (!national.isLogin) return;
    if (national.appBool && national.isLogin) {
      if (data.discount && data.grade > 1) {
        var progressStr = '您已成功解锁<span class="unlock-award">活动礼物<strong>' + data.discount + '</strong>折特权</span>，赠送指定礼物<br />只会消费礼物原价' + data.discount + '折的<spanclass="appUnit">聊币</spanclass=>，请放心送礼吧~'
        $('.progress-current').show().html(progressStr)
      } else if (data.grade == 1) {
        $('.progress-current').show().html('您已成功解锁“土豪撒钱”进场特效x5天，“国庆快乐”头像框x7天')
      } else {
        $('.progress-current').hide()
      }
      for (var i = 0; i < data.grade; i++) {
        $($('.right-icon')[4 - i]).addClass('icon-color')
        $($('.welf1-right>li')[4 - i]).css({
          'background': 'url(./image/welfaward2.png)',
          'background-size': '100%'
        })
        $($('.right-award')[4 - i]).addClass('red')
      }
      if (data.grade < 5) {
        var targetArr = [
          '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<b>“土豪撒钱”进场特效…</b>',
          '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<b>活动礼物<strong>8</strong>折特权…</b>',
          '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<b>活动礼物<strong>6</strong>折特权…</b>',
          '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<b>活动礼物<strong>4</strong>折特权…</b>',
          '再充值<strong>' + data.nextAmt + '</strong>元即可解锁<br>机不可失的<b>充值返现<strong>10</strong>%…</b>']
        var targetStr = targetArr[+data.grade]
        $('.progress-target p').html(targetStr)
      } else {
        $('.progress-target').css('display', 'none')
      }
      var arr = [5, 28, 51, 75, 100]
      $('.bar').css('height', arr[data.grade - 1] + '%')
      $('li.el-timeline-item').each(function (index, ele) {
        if (5 - index <= data.grade) {
          $(ele).addClass('timeline-grade')
        }
      })
    }
    national.gradeAlert = data.gradeAlert
    $('#award img.photo').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_120,w_120')
    national.dayCashAward = data.dayCashAward
    national.initCashAward()
  },
  initCashAward: function () {
    if (national.dayCashAward) {
      $('.award-ok').addClass('award-disabled').attr('disabled', true).html('今日已领取')
      $('#award p').css('display', 'block')
    }
  },
  getList: function () {
    var params = {
      customerId: national.customerId,
      appType: national.appType,
      type: national.type
    }
    $.ajax({
      type: "GET",
      url: $config.toUrl(national.env, '/act/national20/getActRank'),
      data: params,
      dataType: "json",
      async: false,
      success: function (res) {
        if (res.result) {
          national.setList(res.data)
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function () {
        $config.yfAlert('网络异常')
      }
    });
  },
  setList: function (data) {
    var arr = [];
    for (var i = 0; i < data.ranks.length; i++) {
      (function (num) {
        arr.push(data.ranks[num]);
      })(i)
    }
    if (arr.length <= 1) {
      arr.unshift({
        customerId: "null",
        honorValue: 0,
        nickName: "暂无",
        photo: "./image/default.png"
      })
    } else {
      arr.splice(0, 1, arr.splice(1, 1, arr[0])[0])
    }
    var _arrLength = arr.length
    if (arr.length < 10) {
      for (var i = 0; i < 10 - _arrLength; i++) {
        (function (num) {
          arr.push({
            "nickName": "暂无",
            "customerId": null,
            "photo": "image/default.png",
            "honorValue": 0
          })
        })(i)
      }
    }
    var str = '';
    for (var i = 0; i < arr.length; i++) {
      str += (function (num) {
        var obj = arr[num];
        return (num == 0 ? '<div class="row row' + (national.type == 1 ? '' : '-type2') + ' row1 flexbox around">' : num == 3 ? '<div class="row row' + (national.type == 1 ? '' : '-type2') + ' row2 flexbox around">' : num == 6 ? '<div class="row row' + (national.type == 1 ? '' : '-type2') + ' row3 flexbox around">' : '')
          + '<div class="col col' + (+num + 1) + ' column">'
          + '    <div class="nobor' + (national.type == 1 ? '' : (+num + 1)) + ' resetImg resetImg' + (+num + 1) + (num >= 3 && num < 6 ? ' margin-lr' : '') + '"> <img class="photopic' + (national.type == 1 ? "" : "1") + '" src="' + obj.photo + '?x-oss-process=image/resize,m_mfit,h_135,w_135" /><img class="photonum' + (national.type == 1 ? "" : "1") + '" src="./image/NO.' + (num == 1 ? '1' : num == 2 ? "3" : '2') + '.png" /></div>'
          + (num >= 3 ? ' <p class="col-rank">NO.' + (num + 1) + '</p>' : '')
          + '    <p class="nick-name">' + $config.substrLen(obj.nickName, 5) + '</p>'
          + (national.type == 1 ? '<p>助攻值: ' + (obj.honorValue || 0) + '</p>' : '')
          + ' </div>'
          + (num == 2 || num == 5 || num == 9 ? '</div>' : '')
      })(i)
    }
    $('.table-wrap').html(str)
    setTimeout("layer.closeAll('loading')", 1000)
    if (national.appBool && national.isLogin) {
      $('.list-rank-title .rank-title-num strong').html(data.rank || '暂无')
      $('.list-rank-title .rank-title-gap strong').html(data.preAmt)
      if ((+data.rank == 0 && data.ranks.length >= 10) || +data.rank > 10) {
        $('.list-rank-title .rank-title-gap span').html('第10名')
      } else {
        $('.list-rank-title .rank-title-gap span').html('上一名')
      }
    }
  },
  getNotice: function () {
    var params = {
      customerId: national.customerId,
      token: national.token,
      appType: national.appType
    }
    $.ajax({
      type: "GET",
      url: $config.toUrl(national.env, '/act/national20/getRollNotice'),
      data: params,
      dataType: "json",
      async: false,
      success: function (res) {
        if (res.result) {
          national.setNotice(res.data)
        }
      }
    });
  },
  setNotice: function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i] += ' !&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
    }
    ScrollText($('.notice-wrap'), 0.5, 300, data, 'left', 1, 20);
  }
}, allAata = null
function diffApp(appType) {
  if (appType == 1) {
    $('.room-tips').hide()
    $('.appName').text('兔聊')
    $('.appUnit').text('聊币')
    $('.appVip').text('会员')
    $('.appGold').text('高级会员')
    $('.appSliver').text('普通会员')
    $('.appCredit').text('信用分')
    $('.appDress').text('个性商城-已有装扮”里点击')
    $('.appAwardNum1').text('5000')
    $('.appAwardNum2').text('3000')
    $('.appAwardNum3').text('1200')
    $('.appAwardNum4').text('500')
  } else {
    $('.room-tips').show()
    $('.appName').text('觅伊')
    $('.appUnit').text('钻石')
    $('.appVip').text('贵族')
    $('.appGold').text('黄金贵族')
    $('.appSliver').text('白银贵族')
    $('.appCredit').text('魅力值')
    $('.appDress').text('个性装扮”里点击“立即装扮”')
    $('.appAwardNum1').text('3888')
    $('.appAwardNum2').text('1500')
    $('.appAwardNum3').text('1000')
    $('.appAwardNum4').text('300')
  }
}
function toRule() {
  if (!national.appBool) {
    $config.openOutApp()
    return
  } else if (!national.isLogin) {
    $config.isLogin()
    return
  }
  window.location.href = "./rule.html?" + window.location.href.split('?')[1]
}
function getNotWelf() {
  layer.closeAll()
  window.localStorage.setItem('noWant', true)
}
function changeNav(type) {
  if (!national.appBool) {
    $config.openOutApp()
    return
  } else if (!national.isLogin) {
    $config.isLogin()
    return
  }
  if (type == national.type) { return };
  $('.list-nav').attr('src', 'image/nav' + type + '.png')
  if (type == 1) {
    $('.list-title-text').show()
    $('.list-tip').show()
    $('.list-tip2').hide()
    $($('.rank-title-num')[0]).show()
    $($('.rank-title-gap')[0]).show()
    $($('.rank-title-num')[1]).hide()
    $($('.rank-title-gap')[1]).hide()
  } else {
    $('.list-title-text').hide()
    $('.list-tip').hide()
    $('.list-tip2').show()
    $($('.rank-title-num')[1]).show()
    $($('.rank-title-gap')[1]).show()
    $($('.rank-title-num')[0]).hide()
    $($('.rank-title-gap')[0]).hide()
  }
  national.type = type;
  national.getList()
}
function doCharge() {
  var params = {
    customerId: national.customerId,
    token: national.token,
    appType: national.appType
  }
  if (!national.appBool) {
    $config.openOutApp()
    return
  } else if (!national.isLogin) {
    $config.isLogin()
    return
  }
  var ua = navigator.userAgent.toLowerCase();
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  $.ajax({
    type: "POST",
    url: $config.toUrl(national.env, "/act/national20/authApi/rechargeRecord"),
    data: params,
    dataType: "json",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.result) {
        if (isIOS) {
          if (national.appType == 2) {
            window.webkit.messageHandlers.jumpToCharge.postMessage(null)
          } else {
            var config = {
              customerId: params.customerId,
              token: params.token,
              isFrom: national.isFrom,
            };
            var returnUrl = encodeURIComponent(window.location.href.split('?')[0] + '?' + $config.setQueryConfig(config));
            window.location.href = res.data.url + '?customerId=' + params.customerId + '&isFrom=' + res.data.accessId + '&returnUrl=' + returnUrl
          }
        } else if (isAndroid) {
          if (res.data.isRecharge && national.appType == 2) {
            client.jumpToCharge()
          } else {
            $config.dialogComm($('#chargeTip'), 'chargeTip');
          }
        }
      } else {
        $config.yfAlert(res.message)
      }
    }
  })
}
function checkGift() {
  if (!national.appBool) {
    $config.openOutApp()
    return
  } else if (!national.isLogin) {
    $config.isLogin()
    return
  }
  config.dialogComm($('#discount'), 'discount');
  $('.layui-layer-page .layui-layer-content').css('top', '-1rem')
}
function getWelf(data) {
  if (!national.appBool) {
    $config.openOutApp()
    return
  } else if (!national.isLogin) {
    $config.isLogin()
    return
  }
  var arr = ['可在我的「钱包-包裹-优惠券」里查看。<br>明天还要来哟，福利都抱走～',
    '记得去个性商城使用哦～<br>明日还要来哟，福利都抱走。',
    '记得去个性商城使用哦～<br>明日还要来哟，福利都抱走。',
    '记得去个性商城使用哦～<br>明日还要来哟，福利都抱走。',
    '记得去个性商城使用哦～<br>明日还要来哟，福利都抱走。',
    '尽情享受您的特权吧～<br>明日还要来哟，福利都抱走。',
    '记得去个性商城使用哦～<br>明日还要来哟，福利都抱走。',
    '100信用分已到账～<br>明日还要来哟，福利都抱走。',
    '可在我的「钱包-包裹-优惠券」里查看。<br>明天还要来哟，福利都抱走～'
  ];
  if (national.appType == 1) {
    arr[7] = '100信用分已到账～<br>明日还要来哟，福利都抱走。'
    for (var i = 1; i <= 6; i++) {
      arr[i] = '记得去个性商城使用哦～<br>明日还要来哟，福利都抱走。'
    }
    arr[5] = '尽情享受您的特权吧～<br>明日还要来哟，福利都抱走。'
  } else {
    arr[7] = '100魅力值已到账～<br>明日还要来哟，福利都抱走。'
    for (var i = 1; i <= 6; i++) {
      arr[i] = '记得去个性装扮使用哦～<br>明日还要来哟，福利都抱走。'
    }
    arr[5] = '快去任务中心抽奖吧哦,奖池很丰富～<br>明日还要来哟，福利都抱走。'
  }
  var params = {
    customerId: national.customerId,
    token: national.token,
    appType: national.appType,
    type: national.type
  }
  $.ajax({
    type: "POST",
    url: $config.toUrl(national.env, "/act/national20/authApi/receiveReward"),
    data: params,
    dataType: "json",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      console.log(res);
      if (res.result) {
        $('.getWelf-wrap .column').html(arr[data.dayLoginDate])
        config.dialogComm($('#getWelf'), 'getWelf');
      } else {
        layer.msg(res.message)
      }
    }
  })
}
function openWelf(data) {
  if (national.appType == 1) {
    national.welfArr[5] = '高级会员X7天'
    national.welfArr[7] = '100信用分'
    national.imgArr[5] = './image/高级会员.png'
    national.imgArr[7] = './image/100信用分.png'
  } else if (national.appType == 2) {
    national.welfArr[5] = '任务中心抽奖券x3张'
    national.welfArr[7] = '100魅力值'
    national.imgArr[5] = './image/任务中心抽奖券.png'
    national.imgArr[7] = './image/100魅力值.png'
  }
  var tipVipArr = ['', '提示：高级会员有很多权限，<br>记得去「我-更多->会员」了解下哦~', '提示：领取成功后，去“我-任务中心-做任务抽大奖”里点击确认使用']
  var tipCreditArr = ['', '提示：信用分可提高分成比例', '提示：魅力值的提升有助于提高您的用户等级']
  if (data.dayLoginAward) {
    return
  }
  if (!data.dayLoginAward) {
    $('.dayWelf-wrap h6>b').html(national.dateArr[data.dayLoginDate])
    $('.dayWelf-wrap h6 p span').html(national.welfArr[data.dayLoginDate])
    $('.dayWelf-wrap img').attr('src', national.imgArr[data.dayLoginDate])
  }
  var type = data.dayLoginDate;
  if (type > 8) {
    return
  }
  var tip = (type == 0 || type == 8 ? '' : type == 7 ? tipCreditArr[national.appType] : type == 5 ? tipVipArr[national.appType] : '提示：领取成功后，去「我-更多-' + (national.appType == 1 ? '个性商城-已有装扮」里点击' : '个性装扮」里点击“立即装扮”') + '确认使用~')
  $('.dayWelf-wrap .desp').html(tip)
  if (type == 5) {
    $('.dayWelf-wrap').css({
      top: '30%',
      left: '0',
      width: '100%'
    })
    $('.btn-wrap').removeClass('between').addClass('around')
    $('#dayWelf').css({
      "height": '9.68rem',
      "background": 'url("image/dayWelf2.png")',
      "background-size": "100% 100%",
    })
    $('.dayWelf-wrap .tip').css('display', 'block')
    $('.dayWelf-wrap .desp span').css('font-size', '0.24rem')
  }
  config.dialogComm($('#dayWelf'), type == 5 ? 'dayWelf2' : 'dayWelf');
}
function refresh() {
  if (!national.appBool) {
    $config.openOutApp()
    return
  } else if (!national.isLogin) {
    $config.isLogin()
    return
  }
  national.getList()
  layer.msg('刷新成功!')
}
function download() {
  var app = [{
    name: '兔聊',
    downloadUrl: 'http://share.folkcam.cn:8080/view/share.html',
    appKey: 'bmhy9f',
    vipName: '会员',
    util: '聊币',
  },
  {
    name: '觅伊',
    downloadUrl: 'http://www.rklive888.com/',
    appKey: 'c6xjxt',
    vipName: '贵族',
    util: '钻石',
  }], appType = 1;
  if ($config.browser.versions.android) {
    window.location.href = app[appType - 1]['downloadUrl']
  } else {
    if (appType == 1) {
      window.location.href = app[appType - 1]['downloadUrl']
    } else {
      var data = OpenInstall.parseUrlParams();
      new OpenInstall({
        appKey: app[appType - 1]['appKey'],
        onready: function () {
          var m = this;
          m.schemeWakeup();
          m.wakeupOrInstall();
        }
      })
    }
  }
}
function toWelf(_this) {
  if ($(_this).children('span').text() == '福利二') {
    $('html,body').animate({ scrollTop: ($($(_this).attr('href')).offset().top) }, 300)
    $(_this).attr('href', '#wrap_welf1').children('span').text('福利一')
  } else {
    $('html,body').animate({ scrollTop: ($($(_this).attr('href')).offset().top) }, 300)
    $(_this).attr('href', '#wrap_welf2').children('span').text('福利二')
  }
}
var ScrollTime
function ScrollAutoPlay(contID, scrolldir, showwidth, textwidth, steper) {
  var currPos;
  with ($('#' + contID)) {
    currPos = parseInt(css('margin-left'));
    if (scrolldir == 'left') {
      if (currPos < 0 && Math.abs(currPos) > textwidth) {
        css('margin-left', showwidth);
      }
      else {
        css('margin-left', currPos - steper);
      }
    }
    else {
      if (currPos > showwidth) {
        css('margin-left', (0 - textwidth));
      }
      else {
        css('margin-left', currPos - steper);
      }
    }
  }
}
function ScrollText(AppendToObj, ShowHeight, ShowWidth, ShowText, ScrollDirection, Steper, Interval) {
  var TextWidth, PosInit, PosSteper;
  with (AppendToObj) {
    html('');
    css('overflow', 'hidden');
    css('height', ShowHeight + 'rem');
    css('line-height', ShowHeight + 'rem');
    css('width', ShowWidth);
  }
  if (ScrollDirection == 'left') {
    PosInit = ShowWidth;
    PosSteper = Steper;
  }
  else {
    PosSteper = 0 - Steper;
  }
  if (Steper < 1 || Steper > ShowWidth) { Steper = 1 }
  if (Interval < 1) { Interval = 10 }
  var Container = $('<div></div>');
  var ContainerID = 'ContainerTemp';
  var i = 0;
  while ($('#' + ContainerID).length > 0) {
    ContainerID = ContainerID + '_' + i;
    i++;
  }
  with (Container) {
    attr('id', ContainerID);
    css('float', 'left');
    css('cursor', 'default');
    appendTo(AppendToObj);
    html(ShowText);
    TextWidth = width();
    if (isNaN(PosInit)) { PosInit = 0 - TextWidth; }
    css('margin-left', PosInit);
    mouseover(function () {
      clearInterval(ScrollTime);
    });
    mouseout(function () {
      ScrollTime = setInterval("ScrollAutoPlay('" + ContainerID + "','" + ScrollDirection + "'," + ShowWidth + ',' + TextWidth + "," + PosSteper + ")", Interval);
    });
  }
  ScrollTime = setInterval("ScrollAutoPlay('" + ContainerID + "','" + ScrollDirection + "'," + ShowWidth + ',' + TextWidth + "," + PosSteper + ")", Interval);
}
national.init()