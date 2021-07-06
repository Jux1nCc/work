var week = {
  env: 'demo',
  customerId: $config.getQueryStringByName("customerId"),
  isFrom: $config.getQueryStringByName("isFrom"),
  token: $config.getQueryStringByName("token"),
  appType: $config.getQueryStringByName("appType").slice(0, 1) || 2,
  isLogin: true,
  rank: null,
  page: 1,
  pageSize: 15,
  appBool: openInWebview(),// 是否app外打开
  app: [{  //兔聊  
    name: '兔聊',
    downloadUrl: 'https://www.expertol.cn/',
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
    week.created()
    week.appMounted()
  },
  appMounted: function () {
    if (week.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appName').text('兔聊')
    }
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
  },
  created: function () {
    var parmas = {
      customerId: week.customerId,
      token: week.token,
      isFrom: week.isFrom
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(week.env, '/act/weekstar/v2/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (!week.appBool) {
          if (week.appType == 1) {
            $('#openOutApp').css('background-image', 'url(images/tuliao.png)')
          }
          $config.dialogComm($('#openOutApp'), 'openOutApp')
        }
        if (res.result) {
          week.appType = res.data.appType
          week.isLogin = res.data.isLogin
          if (!week.isLogin && week.appBool) {
            $config.dialogComm($('#isLogin'), 'isLogin')
          }
          week.mounted(res.data)
          week.createdRank(1)
          scrollEvent()
        } else {
          $('.mine-wrap').hide()
          if (week.appBool) {
            layer.msg(res.message, {
              shade: 0.5,
              time: false
            })
            document.body.addEventListener(
              'touchmove',
              function (e) {
                e.preventDefault()
              },
              { passive: false }
            )
          }
        }
      },
      error: function (error) {
        $('.mine-wrap').hide()
        if (week.appBool) {
          layer.msg('网络异常', {
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
        }
      }
    })
  },
  createdRank: function (type) {
    var parmas = {
      customerId: week.customerId,
      token: week.token,
      type: type,
      page: 1,
      pageSize: week.pageSize
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(week.env, '/act/weekstar/v2/getRankCustomer'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          week.rank = res.data.ranks
          week.mountedRank(res.data, type)
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        layer.msg('网络异常', {
          time: false,
          shade: 0.5
        })
      }
    })
  },
  mounted: function (data) {
    // 上周荣誉榜按钮
    if (data.preAward) {
      $('.lastweek-btn').removeClass('popup')
    }
    // 昨日冠军信息
    if (data.gainGiftAmt && data.gainGiftAmt > 0) {
      $('.champion-wrap .init-text').addClass('popup').siblings('.champion-info').css('display', 'flex')
      $('.champion-pic').attr('id', data.customerId)
      $('.champion-img').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
      $('.champion-item .champion-name').text(data.nickName)
      $('.champion-item .champion-value').text(fmoney(data.gainGiftAmt))
      if (data.isLive) {
        $('.champion-pic .live-icon').removeClass('popup')
      }
      week.appMounted()
    } else {
      $('.champion-wrap init-text').removeClass('popup').siblings('.champion-info').css('display', 'none')
    }
    // 本周礼物
    for (var i = 0; i < 3; i++) {
      $($('.gift-wrap .gift-img img')[i]).attr('src', data.gifts[i].giftImg + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
      $($('.gift-wrap .gift-name')[i]).text(data.gifts[i].giftName)
    }
  },
  mountedRank: function (data, type) {
    if (data.rank) {
      $('.mine-num').text(data.rank)
    }
    $('.mine-pic img').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
    $('.mine-info .mine-name').text(data.nickName)
    $('.mine-info .mine-value span').text(data.gainGiftAmt)
    if (data.payPhoto) {
      $('.mine-star img').attr('src', data.payPhoto + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
      $('.mine-star').removeClass('popup').siblings('.arrow').removeClass('popup')
    } else {
      $('.mine-star').addClass('popup').siblings('.arrow').addClass('popup')
    }
    if (data.ranks && data.ranks.length > 0) {
      $('.rank-wrap .init-text').addClass('popup')
      $('.rank-wrap ul').removeClass('popup').html(' ')
      if (data.ranks.length >= 7) {
        $('.rank-wrap ul').addClass('full')
      } else {
        $('.rank-wrap ul').removeClass('full')
      }
      for (var i = 0; i < data.ranks.length; i++) {
        var str =
          '<li class="flexbox">' +
          '<div class="li-title ' + (i < 3 ? '' : 'popup') + '">第' + (i == 0 ? '一' : (i == 1 ? '二' : '三')) + '名</div>' +
          '<div class="li-num">' +
          '<img class="' + (i < 3 ? '' : 'popup') + '" src="images/homepage_pic_' + (i == 0 ? '1' : (i == 1 ? '2' : '3')) + '.png">' + (i > 2 ? i + 1 : '') + '</div>' +
          '<div class="li-pic" onclick="jumpToHomePage(this,' + data.ranks[i].customerId + ')">' +
          '<div class="crown ' + (i < 3 ? '' : 'popup') + '"></div>' +
          '<img src="' + data.ranks[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
          '<div class="live-icon ' + (data.ranks[i].isLive ? '' : 'popup') + '">live</div>' +
          '</div>' +
          '<div class="li-info column">' +
          '<div class="li-name">' + data.ranks[i].nickName + '</div>' +
          '<div class="li-value">积分: <span>' + fmoney(data.ranks[i].gainGiftAmt) + '</span></div>' +
          '</div>' +
          '<div class="li-star">' +
          '<img src="' + data.ranks[i].payPhoto + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
          '<div class="star-icon flexbox">星探</div>' +
          '</div>' +
          '</li>'
        $('.rank-wrap ul').append(str)
      }
      if (data.ranks.length >= 15) {
        $('.rank-wrap ul').append('<li class="flexbox look-more" onclick="lookMore(this,' + type + ')">点击查看更多<i class="look-more-icon"></i></li>')
      }
    } else {
      $('.rank-wrap ul').addClass('popup')
      $('.rank-wrap .init-text').removeClass('popup')
    }
  }
}
function changeHomeNav(type, that) {
  if (!week.appBool) {
    if (week.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/tuliao.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  }
  if (type == 1) {
    $(that).addClass('rank-nav-1').removeClass('rank-nav-3').siblings('.rank-nav-item').removeClass('rank-nav-4').addClass('rank-nav-2')
    $('.rank-page>p').text('第一名可在明日登上“冠军黑马推荐位”')
  } else {
    $(that).removeClass('rank-nav-2').addClass('rank-nav-4').siblings('.rank-nav-item').removeClass('rank-nav-1').addClass('rank-nav-3')
    $('.rank-page>p').text('每周前3名周星主播及星探，可获得奖励。')
  }
  $('.arrow').attr('type', type)
  week.createdRank(type)
}
function toLastWeekPage() {
  window.location.href = './lastweek.html?customerId=' + week.customerId + '&token=' + week.token + '&isFrom=' + week.isFrom + '&appType=' + week.appType
}
function toRulePage() {
  window.location.href = './rule.html?type=1&appType=' + week.appType + '&customerId=' + week.customerId + '&token=' + week.token + '&isFrom=' + week.isFrom
}
function toSecondaryPage(that) {
  window.location.href = './secondary.html?customerId=' + week.customerId + '&token=' + week.token + '&isFrom=' + week.isFrom + '&type=' + $(that).attr('type') + '&appType=' + week.appType
}
function fmoney(s) {
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
  var l = s.split(".")[0].split("").reverse();
  t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("");
}
function jumpToHomePage(that, id) {
  if (!week.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  if (!week.appBool) {
    if (week.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/tuliao.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  }
  if (id) {
    jumpToPersonal(id)
  } else {
    jumpToPersonal($(that).attr('id'))
  }
}
function lookMore(that, type) {
  $(that).addClass('popup')
  week.page++
  if (week.rank.length > 285) {
    $('.rank-wrap ul').append('<li class="flexbox look-more">榜单最多展示前300位用户</li>')
    return
  }
  var parmas = {
    customerId: week.customerId,
    token: week.token,
    type: type,
    page: week.page,
    pageSize: week.pageSize
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(week.env, '/act/weekstar/v2/getRankCustomer'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        for (var i = 0; i < res.data.ranks.length; i++) {
          week.rank.push(res.data.ranks[i])
          var str =
            '<li class="flexbox">' +
            '<div class="li-num">' + week.rank.length + '</div>' +
            '<div class="li-pic" onclick="jumpToHomePage(this,' + res.data.ranks[i].customerId + ')">' +
            '<img src="' + res.data.ranks[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
            '<div class="live-icon ' + (res.data.ranks[i].isLive ? '' : 'popup') + '">live</div>' +
            '</div>' +
            '<div class="li-info column">' +
            '<div class="li-name">' + res.data.ranks[i].nickName + '</div>' +
            '<div class="li-value">积分: <span>' + fmoney(res.data.ranks[i].gainGiftAmt) + '</span></div>' +
            '</div>' +
            '<div class="li-star">' +
            '<img src="' + res.data.ranks[i].payPhoto + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
            '<div class="star-icon flexbox">星探</div>' +
            '</div>' +
            '</li>'
          $('.rank-wrap ul').append(str)
        }
        if (res.data.ranks.length >= 15) {
          $('.rank-wrap ul').append('<li class="flexbox look-more" onclick="lookMore(this)">点击查看更多<i class="look-more-icon"></i></li>')
        } else {
          $('.rank-wrap ul').append('<li class="flexbox look-more">你已经看到了我的底线~</li>')
        }
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      layer.msg('网络异常', {
        time: false,
        shade: 0.5
      })
    }
  })
}
function download() {
  layer.closeAll()
  if ($config.browser.versions.android) {
    window.location.href = week.app[week.appType - 1].downloadUrl
  } else {
    if (week.appType == 1) {
      window.location.href = week.app[0].downloadUrl
    } else {
      var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
      new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey: week.app[1].appKey,
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
function shareTc() {
  var img = "http://activity.folkcam.cn/weekActivity/share.png",
    title = '礼物周星争夺战',
    subtitle = '守擂周星, 做璀璨周星主播',
    sharingState = 'weekstarsV2',
    apptype = week.appType
  var path = window.location.href.split('?')[0], url = '',
    arr = window.location.href.split('?')[1].split('&'), result = [];
  for (var i = 0; i < arr.length; i++) {
    (function (index) {
      var item = arr[index];
      if (item.indexOf('customerId') < 0 && item.indexOf('token') < 0 && item.indexOf('isFrom') < 0) {
        result.push(item)
      }
    })(i)
  }
  result.push('isFrom=h5');
  query = result.join('&');
  if (apptype) {
    url = path + '?' + query + '&appType=' + apptype;
  } else {
    url = path + '?' + query;
  }
  if (browser.versions.android) {
    console.log(url);
    client.jumpToShare(img, title, url, subtitle, sharingState);
  } else {
    window.webkit.messageHandlers.jumpToShare.postMessage({
      img: img,
      title: title,
      url: url,
      subtitle: subtitle,
      type: sharingState,
      shareLink: 0,
    });
  }
}
var scrollAction = { x: 'undefined', y: 'undefined' }, scrollDirection;
function scrollEvent() {
  // 是否登录及是否app外打开
  if (!week.appBool) {
    $('.mine-wrap').hide()
    return
  }
  if (!week.isLogin) {
    $('.mine-wrap').hide()
    return
  }
  document.onscroll = function (e) {
    scrollFunc();
    if (scrollDirection == 'down') {
      if (getDocumentTop() + getWindowHeight() > getScrollHeight() - 10) {
        $('.mine-wrap').fadeIn()
      } else {
        $('.mine-wrap').fadeOut()
      }
    }
    else if (scrollDirection == 'up') {
      $('.mine-wrap').fadeIn()
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
week.init()