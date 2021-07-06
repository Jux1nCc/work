var singles = {
  env: 'demo',
  customerId: $config.getQueryStringByName("customerId"),
  appType: $config.getQueryStringByName("appType"),
  isFrom: $config.getQueryStringByName("isFrom"),
  token: $config.getQueryStringByName("token"),
  sex: $config.getQueryStringByName("sex"),
  nowTimestamp: '',  //当前时间戳
  beginTimestamp: '',  //活动开始时间戳
  isLogin: true, //是否登录
  isEnd: false,  //是否结束
  dateNum: 0,  //活动第几天
  appBool: openInWebview(),// 是否app外打开
  ranks: [],// 榜单
  navId: 0, // 日榜0 总榜1
  page: 1,
  pageSize: 30,
  mineName: '',
  timeArr: [''],
  timeList: [],
  allVideoAward: ['奖励: BANNER1天, 150元', '奖励: 120元', '奖励: 100元', '奖励: 80元', '奖励: 70元', '奖励: 50元', '奖励: 50元', '奖励: 50元', '奖励: 50元', '奖励: 50元'],
  app: [{  //兔聊  
    name: '兔聊',
    downloadUrl: 'http://share.folkcam.cn:8080/view/share.html',
    appKey: 'bmhy9f',
    vipName: '会员',
    util: '聊币',
    title: '发现身边的俊男美女，线上聊，线下约。快来找我吧，点击进入 >',
    textContent: '发现身边“美”一刻',
    umImage1: 'https://jw-yunying.oss-cn-shenzhen.aliyuncs.com/share/image/defaultShare.jpg'
  },
  { //觅伊
    name: '觅伊',
    downloadUrl: 'http://www.rklive888.com/',
    appKey: 'c6xjxt',
    vipName: '贵族',
    util: '钻石',
    title: '找对象 上觅伊',
    textContent: '6000万人都在玩的交友APP',
    umImage1: 'https://jw-yunying.oss-cn-shenzhen.aliyuncs.com/share/image/defaultShare.jpg'
  }],
  init: function () {
    $config.addObserver()
    singles.diffApp()
    singles.created()
  },
  diffApp: function () {
    if (singles.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appName').text('兔聊')
    } else {
      $('.appUnit').text('收益积分')
      $('.appName').text('觅伊')
    }
  },
  created: function () {
    var parmas = {
      customerId: singles.customerId,
      token: singles.token,
      isFrom: singles.isFrom,
      appType: singles.appType,
      sex: singles.sex
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(singles.env, '/act/eleven20/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (res.result) {
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          var nowTimestamp = moment(res.data.nowDate).valueOf()
          var beginTimestamp = moment(res.data.beginDate).valueOf()
          for (var i = 0; i < 6; i++) {
            singles.timeArr.push(moment(beginTimestamp + (86400000 * i)).format('YYYY-MM-DD'))
            singles.timeList.push(moment(beginTimestamp + (86400000 * i)).format('MM.D'))
          }
          singles.nowTimestamp = nowTimestamp
          singles.beginTimestamp = beginTimestamp
          singles.isLogin = res.data.isLogin
          singles.isEnd = res.data.isEnd
          if (res.data.dateNum > 6) {
            res.data.dateNum = 6
          }
          singles.dateNum = res.data.dateNum
          if (nowTimestamp < beginTimestamp) {
            layer.msg('活动暂未开始, 敬请期待', {
              time: false,
              shade: 0.5
            })
            return
          }
          singles.mounted(res.data)
          scrollEvent()
        } else {
          $('.myInfo-wrap').hide()
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
        $('.myInfo-wrap').hide()
        layer.msg('网络异常', {
          time: false,
          shade: 0.5
        })
      }
    })
  },
  mounted: function (data) {
    // 时间
    for (var i = 0; i < singles.timeList.length; i++) {
      $($('.time-future')[i]).text(singles.timeList[i])
    }
    for (var i = 0; i < data.dateNum; i++) {
      $($('.time-wrap>li')[i]).removeClass('time-future')
    }
    $($('.time-wrap>li')[data.dateNum - 1]).addClass('time-today')
    // 榜单数据
    singles.getRankList(0)
    showEllipsis($('.user-name>span'))
    // $('.page').removeClass('popup')
  },
  getRankList: function (rankType, type) {
    // rankType  0-日期榜  1-总榜
    singles.page = 1
    $('.look-more').addClass('popup')
    var timeType
    if (rankType) {
      timeType = 0
    } else {
      if (type) {
        timeType = type
      } else {
        for (var i = 0; i < $('.time-wrap>li').length; i++) {
          if ($($('.time-wrap>li')[i]).hasClass('time-today')) {
            timeType = i + 1
          }
        }
      }
    }
    var parmas = {
      customerId: singles.customerId,
      callDate: singles.timeArr[timeType],
      page: 1,
      pageSize: singles.pageSize
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(singles.env, '/act/eleven20/getCallRank'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          singles.ranks = res.data.ranks
          // 设置榜单
          singles.setRankList(res.data, rankType)
          // 设置个人信息
          singles.mineName = res.data.nickName
          singles.setMineInfo(res.data)
          if (res.data.ranks.length > 29) {
            $('.list-wrap').append('<li class="look-more" onclick="lookMore(this)">点击查看更多>></li>')
            $('.look-more').removeClass('popup')
          }
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    })
  },
  setRankList: function (data, rankType) {
    $('.list-wrap').html('')
    if (data.ranks.length == 0) {
      var listNum
      if (rankType) {
        listNum = 10
      } else {
        listNum = 5
      }
      // '+ (singles.appType == 1? "./image/logo.png" : "./image/miyi_logo.png") +'
      for (var i = 0; i < listNum; i++) {
        var str = '<li>' +
          '<div class="item-rank youshe item-rank' + (i + 1) + '">' +
          (i > 2 ? i + 1 : '') +
          '</div>' +
          '<div class="item-photo">' +
          '<img class="item-photo-frame item-photo-frame' + (i + 1) + ' popup" src="" alt="">' +
          '<img src="./image/headpic.png" alt="" class="' + (i < 3 ? "top-three" : "") + '">' +
          '<button class="follow-btn" onclick="toFollow(this,' + i + ')">关注</button>' +
          '<div class="item-award popup ' + (i == 0 ? "first-award" : i == 1 ? "sec-award" : i == 2 ? "sec-award" : "") + '">' + singles.allVideoAward[i] + '</div>' +
          '</div>' +
          '<div class="item-name">虚位以待</div>' +
          '<div class="item-time">暂无</div>' +
          '</li>'
        if (i < 4) {
          $('.follow-btn').addClass('photo-btn')
          $('.item-photo-frame').removeClass('popup')
          $('.item-photo-frame1').attr('src', './image/第一名.png')
          $('.item-photo-frame2').attr('src', './image/第二名.png')
          $('.item-photo-frame3').attr('src', './image/第三名.png')
        } else {
          $($('.item-rank')[i]).css('margin-right', '0.1rem')
          $($('.item-name')[i]).css('margin-left', '0.2rem')
        }
        $('.list-wrap').append(str)
      }
      if (rankType) {
        if (i < 10) {
          $('.item-award').removeClass('popup')
        }
      }
      return
    }
    for (var i = 0; i < data.ranks.length; i++) {
      var str = '<li>' +
        '<div class="item-rank youshe item-rank' + (i + 1) + '">' +
        (i > 2 ? i + 1 : '')
        + '</div>' +
        '<div class="item-photo">' +
        '<img class="item-photo-frame item-photo-frame' + (i + 1) + ' popup" src="" onclick="toHome(' + singles.ranks[i].customerId + ')"  alt="">' +
        '<img onclick="toHome(' + data.ranks[i].customerId + ')" src="' + data.ranks[i].photo + '" alt="" class="' + (i < 3 ? "top-three" : "") + '">' +
        '<button class="follow-btn" onclick="toFollow(this,' + i + ')">关注</button>' +
        '<div class="item-award popup ' + (i == 0 ? "first-award" : i == 1 ? "sec-award" : i == 2 ? "sec-award" : "") + '">' + singles.allVideoAward[i] + '</div>' +
        '</div>' +
        '<div class="item-name">' + data.ranks[i].nickName + '</div>' +
        '<div class="item-time">' + data.ranks[i].videoSecond + '</div>' +
        '</li>'
      // 展示关注按钮
      $('.list-wrap').append(str)
      if (data.ranks[i].relationType == 1 || data.ranks[i].relationType == 2) {
        $($('.follow-btn')[i]).addClass('popup')
      } else {
        $($('.follow-btn')[i]).removeClass('popup')
      }
      if (singles.mineName == data.ranks[i].nickName) {
        $($('.follow-btn')[i]).addClass('popup')
      }
      if (rankType) {
        if (i < 10) {
          $('.item-award').removeClass('popup')
        }
      }
      showEllipsis($(".item-name"))
      if (i < 3) {
        $('.follow-btn').addClass('photo-btn')
        $('.item-photo-frame').removeClass('popup')
        $('.item-photo-frame1').attr('src', './image/第一名.png')
        $('.item-photo-frame2').attr('src', './image/第二名.png')
        $('.item-photo-frame3').attr('src', './image/第三名.png')
      } else {
        $($('.item-rank')[i]).css('margin-right', '0.1rem')
        $($('.item-name')[i]).css('margin-left', '0.2rem')
      }
    }
  },
  setMineInfo: function (data) {
    if (data.videoSecond > 0) {
      $('.my-rank').text(data.rank)
    } else {
      $('.my-rank').text('暂无排名')
    }
    $('.my-photo>img').attr('src', data.photo)
    $('.my-info .user-name>span').text(data.nickName)
    $('.my-info .video-time>span').text(data.videoSecond)
    $('.my-info .rank-prev>span').text(data.preAmt)
    showEllipsis($('.user-name>span'))
  }
}
function changeNav(that, type) {
  if (!singles.appBool) {
    config.dialogComm($('#openApp'), 'openApp');
    return
  }
  if (!singles.isLogin) {
    config.dialogComm($('#toLogin'), 'toLogin');
    return
  }
  singles.navId = type
  $(that).addClass('tab-select').siblings('.tab-wrap').removeClass('tab-select')
  singles.getRankList(type)
  if (type == 0) {
    // 日榜
    $('.describe-day').removeClass('popup').siblings('.describe-all').addClass('popup')
    $('.list-tab').removeClass('list-tab-all').siblings('.time-wrap').removeClass('popup')
    $('.item-award').addClass('popup')
    for (var i = 6; i < $('.list-wrap>li').length; i++) {
      $($('.list-wrap>li')[i]).addClass('popup')
    }
  } else if (type == 1) {
    // 总榜
    $('.describe-day').addClass('popup').siblings('.describe-all').removeClass('popup')
    $('.list-tab').addClass('list-tab-all').siblings('.time-wrap').addClass('popup')
    $('.item-award').removeClass('popup')
    $('.list-wrap li').removeClass('popup')
  }
}
function toHome(customerId) {
  var ua = navigator.userAgent.toLowerCase();
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
  if (isIOS) {
    window.webkit.messageHandlers.jumpToHomePage.postMessage({ customerId: customerId })
  } else if (isAndroid) {
    client.jumpToHomePage(customerId)
  }
}
function changeRank(that, type) {
  if ($(that).hasClass('time-future')) {
    return
  }
  if (!singles.appBool) {
    config.dialogComm($('#openApp'), 'openApp');
    return
  } else if (!singles.isLogin) {
    config.dialogComm($('#toLogin'), 'toLogin');
    return
  }
  $(that).addClass('time-today').siblings().removeClass('time-today')
  singles.getRankList(0, type)
}
function lookMore(that) {
  singles.page++
  if (singles.ranks > 499) {
    $(that).text('榜单仅展示前500名哦')
    return
  }
  var callDate
  for (var i = 1; i < $('.time-wrap>li').length; i++) {
    if ($($('.time-wrap>li')[i]).hasClass('time-today')) {
      callDate = i + 1
    }
  }
  var parmas = {
    customerId: singles.customerId,
    callDate: singles.navId ? '' : singles.timeArr[callDate],
    page: singles.page,
    pageSize: singles.pageSize
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(singles.env, '/act/eleven20/getCallRank'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        // 设置榜单
        if (res.data.ranks.length == 0) {
          layer.msg('没有更多了')
          return
        }
        for (var i = 0; i < res.data.ranks.length; i++) {
          singles.ranks.push(res.data.ranks[i])
          var str = '<li>' +
            '<div class="item-rank youshe item-rank' + (singles.ranks.length) + '">' +
            (singles.ranks.length - 1 > 2 ? singles.ranks.length : '')
            + '</div>' +
            '<div class="item-photo">' +
            '<img class="item-photo-frame item-photo-frame' + (singles.ranks.length) + ' popup" onclick="toHome(' + singles.ranks[singles.ranks.length - 1].customerId + ')"  src="" alt="">' +
            '<img onclick="toHome(' + singles.ranks[singles.ranks.length - 1].customerId + ')" src="' + res.data.ranks[i].photo + '" alt="">' +
            '<button class="follow-btn" onclick="toFollow(this,' + i + ')">关注</button>' +
            '<div class="item-award popup ' + (singles.ranks.length - 1 == 0 ? "first-award" : singles.ranks.length - 1 == 1 ? "sec-award" : singles.ranks.length - 1 == 2 ? "sec-award" : "") + '">' + singles.allVideoAward[i] + '</div>' +
            '</div>' +
            '<div class="item-name">' + res.data.ranks[i].nickName + '</div>' +
            '<div class="item-time">' + res.data.ranks[i].videoSecond + '</div>' +
            '</li>'
          if (singles.ranks.length < 4) {
            $('.follow-btn').addClass('photo-btn')
            $('.item-photo-frame').removeClass('popup')
            $('.item-photo-frame1').attr('src', '../image/第一名.png')
            $('.item-photo-frame2').attr('src', '../image/第二名.png')
            $('.item-photo-frame3').attr('src', '../image/第三名.png')
          } else {
            $($('.item-rank')[singles.ranks.length - 1]).css('margin-right', '0.1rem')
            $($('.item-name')[singles.ranks.length - 1]).css('margin-left', '0.2rem')
          }
          $('.list-wrap').append(str)
          if (res.data.ranks[i].relationType == 1 || res.data.ranks[i].relationType == 2) {
            $($('.follow-btn')[singles.ranks.length - 1]).addClass('popup')
          } else {
            $($('.follow-btn')[singles.ranks.length - 1]).removeClass('popup')
          }
          if (singles.mineName == res.data.ranks[i].nickName) {
            $($('.follow-btn')[singles.ranks.length - 1]).addClass('popup')
          }
          if (singles.navId) {
            $('.item-award').removeClass('popup')
          }
          if (singles.ranks.length > 11) {
            $('.item-award').addClass('popup')
          }
          if (res.data.ranks.length < 30) {
            $('.look-more').addClass('popup')
          }
          showEllipsis($(".item-name"))
        }
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      $config.yfAlert('网络异常')
    }
  })
}
function toFollow(that, id) {
  if (!singles.appBool) {
    config.dialogComm($('#openApp'), 'openApp');
    return
  } else if (!singles.isLogin) {
    config.dialogComm($('#toLogin'), 'toLogin');
    return
  }
  if (!singles.ranks.length) {
    return
  }
  if (singles.ranks[id].relationType == 3) {
    $config.yfAlert('您已将对方拉黑')
    return
  } else if (singles.ranks[id].opRelationType == 3) {
    $config.yfAlert('对方已将您拉黑')
    return
  }
  var parmas = {
    customerId: singles.customerId,
    token: singles.token,
    targetCustomerId: singles.ranks[id].customerId,
    relationType: 1
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(singles.env, '/act/zq/isAttention'),
    data: parmas,
    dataType: 'json',
    Header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.result) {
        $(that).addClass('gray').text('已关注')
        setTimeout(function () {
          $(that).addClass('popup')
        }, 3000)
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      $config.yfAlert('网络异常')
    }
  })
}
// 显示省略号
function showEllipsis(ele) {
  ele.each(function () {
    var len = $(this).text().length;
    if (len > 5) {
      var str = "";
      str = $(this).text().substring(0, 5) + "...";
      $(this).html(str);
    }
  });
}
// 滚动隐藏与显示
var scrollAction = { x: 'undefined', y: 'undefined' }, scrollDirection;
function scrollEvent() {
  // 是否登录及是否app外打开
  if (!singles.appBool) {
    $('.myInfo-wrap').hide()
    return
  }
  if (!singles.isLogin) {
    $('.myInfo-wrap').hide()
    return
  }
  document.onscroll = function (e) {
    scrollFunc();
    if (scrollDirection == 'down') {
      if (getDocumentTop() + getWindowHeight() > getScrollHeight() - 10) {
        $('.myInfo-wrap').fadeIn()
      } else {
        $('.myInfo-wrap').fadeOut()
      }
    }
    else if (scrollDirection == 'up') {
      $('.myInfo-wrap').fadeIn()
    }
  }
}
function scrollFunc() {
  if (typeof scrollAction.x == 'undefined') {
    scrollAction.x = window.pageXOffset;
    scrollAction.y = window.pageYOffset;
  }
  var diffX = scrollAction.x - window.pageXOffset;
  var diffY = scrollAction.y - window.pageYOffset;
  if (diffX < 0) {
    scrollDirection = 'right';
  } else if (diffX > 0) {
    scrollDirection = 'left';
  } else if (diffY < 0) {
    scrollDirection = 'down';
  } else if (diffY > 0) {
    scrollDirection = 'up';
  } else {
  }
  scrollAction.x = window.pageXOffset;
  scrollAction.y = window.pageYOffset;
}
//文档高度
function getDocumentTop() {
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}
//可视窗口高度
function getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}
//滚动条滚动高度
function getScrollHeight() {
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}
function shareTc() {
  var img = "http://miyiurl.rklive888.com/activities/single/dev/image/share_girl.png",
    title = '嗨爆11.11，视频聊天专场',
    subTitle = '聊天轻松拿奖励，天天都有！';
  shareComm(img, title, subTitle)
}
function toRule() {
  if (!singles.appBool) {
    config.dialogComm($('#openApp'), 'openApp');
    return
  } else if (!singles.isLogin) {
    config.dialogComm($('#toLogin'), 'toLogin');
    return
  }
  window.location.href = './rule.html?' + window.location.href.split('?')[1]
}
// app外打开
function download() {
  layer.closeAll()
  if ($config.browser.versions.android) {
    window.location.href = singles.app[singles.appType - 1]['downloadUrl']
  } else {
    if (singles.appType == 1) {
      window.location.href = singles.app[singles.appType - 1]['downloadUrl']
    } else {
      var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
      new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey: singles.app[singles.appType - 1]['appKey'],
        onready: function () {
          var m = this;
          /*在app已安装的情况尝试拉起app*/
          m.schemeWakeup();
          // 未安装时去Appstore
          m.wakeupOrInstall();
        }
      })
    }
  }
}
singles.init()