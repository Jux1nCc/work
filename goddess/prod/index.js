var goddess = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  isFrom: $config.getQueryStringByName("isFrom"),
  token: $config.getQueryStringByName("token"),
  appType: 1,
  appBool: openInWebview(),
  isLogin: true,
  isEnd: false, 
  imgStr: null,
  date1: null,
  date2: null,
  date3: null,
  dateNow: null,
  noticeId: 0,
  noticeTime: 0,
  page: 1,
  pageSize: 15,
  ranks: [],
  app: [{ 
    name: '兔聊',
    downloadUrl: 'http://share.folkcam.cn:8080/view/share.html',
    appKey: 'bmhy9f',
    vipName: '会员',
    util: '聊币',
    title: '发现身边的俊男美女，线上聊，线下约。快来找我吧，点击进入 >',
    textContent: '发现身边“美”一刻',
    umImage1: 'https://jw-yunying.oss-cn-shenzhen.aliyuncs.com/share/image/defaultShare.jpg'
  },
  { 
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
    goddess.diffApp()
    goddess.created()
  },
  diffApp: function () {
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
    if (goddess.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appName').text('兔聊')
    } else {
      $('.appUnit').text('钻石')
      $('.appName').text('觅伊')
    }
  },
  created: function () {
    var parmas = {
      customerId: goddess.customerId,
      token: goddess.token,
      isFrom: goddess.isFrom
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(goddess.env, '/act/goddess/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (goddess.appBool && goddess.isLogin) {
          scrollEvent()
        }
        if (!goddess.appBool) {
          $config.dialogComm($('#openOutApp'), 'openOutApp')
        } else if (!goddess.isLogin) {
          $config.dialogComm($('#isLogin'), 'isLogin')
        }
        if (res.result) {
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          goddess.isEnd = res.data.isEnd
          goddess.isLogin = res.data.isLogin
          goddess.appType = res.data.appType
          goddess.noticeId = res.data.rollNotice.id
          goddess.noticeTime = res.data.rollNotice.interval * 1000
          goddess.date1 = moment(res.data.date1).valueOf()
          goddess.date2 = moment(res.data.date2).valueOf()
          goddess.date3 = moment(res.data.date3).valueOf()
          goddess.dateNow = moment(res.data.now).valueOf()
          goddess.setNotice(res.data.rollNotice.notices)
          goddess.mounted(res.data)
          goddess.createdPamper(res.data.now)
          goddess.createdRank(1)
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
        layer.msg('网络异常', {
          time: false,
          shade: 0.5
        })
      }
    })
  },
  createdPamper: function (date) {
    var parmas = {
      customerId: goddess.customerId,
      date: date
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(goddess.env, '/act/goddess/getWall'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          goddess.mountedPamper(res.data)
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
  createdRank: function (type) {
    var parmas = {
      customerId: goddess.customerId,
      type: type,
      page: goddess.page,
      pageSize: goddess.pageSize
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(goddess.env, '/act/goddess/getActRank'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          goddess.ranks = res.data.ranks
          goddess.mountedRank(res.data, type)
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
  getNotice: function () {
    var parmas = {
      customerId: goddess.customerId,
      id: goddess.noticeId
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(goddess.env, '/act/goddess/getRollNotice'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          goddess.noticeId = res.data.id
          goddess.noticeTime = res.data.interval * 1000
          if (res.data.notices.length > 0) {
            goddess.setNotice(res.data.notices)
          } else {
            setTimeout(function () {
              goddess.getNotice()
            }, goddess.noticeTime)
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
  },
  mounted: function (data) {
    goddess.diffApp()
    if (data.wallOne.payPhoto) {
      $('.love-wrap-left .wallOneName').text(data.wallOne.gainNickName)
      $('.love-wrap-right .wallOneName').text(data.wallOne.payNickName)
      $('.love-wrap-right img').attr('src', data.wallOne.payPhoto)
      goddess.imgStr = '<img src="' + data.wallOne.gainPhoto + '?x-oss-process=image/resize,w_200" alt="" onclick="toHome(' + data.wallOne.gainCustomerId + ')">'
      $('.love-wrap-left .lw-item').html(goddess.imgStr)
      goddess.showEllipsis($('.wallOneName'))
    }
    $('.pamper-nav0').text(data.date1.split('-')[1].slice(1, 2) + '月' + data.date1.split('-')[2].slice(1, 2) + '日').attr('date', data.date1)
    $('.pamper-nav1').text(data.date2.split('-')[1].slice(1, 2) + '月' + data.date2.split('-')[2].slice(1, 2) + '日').attr('date', data.date2)
    $('.pamper-nav2').text(data.date3.split('-')[1].slice(1, 2) + '月' + data.date3.split('-')[2].slice(1, 2) + '日').attr('date', data.date3)
    if (goddess.dateNow == goddess.date1) {
      $('.pamper-nav0').addClass('nav-1').removeClass('nav-0').removeClass('nav-2')
      $('.pamper-nav1').addClass('nav-2').removeClass('nav-0').removeClass('nav-1')
      $('.pamper-nav2').addClass('nav-2').removeClass('nav-0').removeClass('nav-1')
    } else if (goddess.dateNow == goddess.date2) {
      $('.pamper-nav0').addClass('nav-0').removeClass('nav-1').removeClass('nav-2')
      $('.pamper-nav1').addClass('nav-1').removeClass('nav-0').removeClass('nav-2')
      $('.pamper-nav2').addClass('nav-2').removeClass('nav-0').removeClass('nav-1')
    } else if (goddess.dateNow == goddess.date3) {
      $('.pamper-nav0').addClass('nav-0').removeClass('nav-1').removeClass('nav-2')
      $('.pamper-nav1').addClass('nav-0').removeClass('nav-1').removeClass('nav-2')
      $('.pamper-nav2').addClass('nav-1').removeClass('nav-0').removeClass('nav-2')
    }
  },
  mountedPamper: function (data) {
    $('.pamper-main .pamper-item ').remove()
    if (data.length != 0) {
      $('.pamper-init').removeClass('flexbox').addClass('popup')
      for (var i = 0; i < data.length; i++) {
        var htmlStr =
          '<div class="pamper-item flexbox">' +
          '<div class="pi-left flexbox">' +
          '<div class="pi-item flexbox" onclick="toHome(' + data[i].gainCustomerId + ')">' +
          '<img src="' + data[i].gainPhoto + '?x-oss-process=image/resize,w_200" alt="">' +
          '<span class="flexbox">' + data[i].gainNickName.slice(0, 4) + '</span>' +
          '</div>' +
          '</div>' +
          '<div class="pi-right flexbox">' +
          '<div class="pi-item flexbox">' +
          '<img src="' + data[i].payPhoto + '?x-oss-process=image/resize,w_200" alt="">' +
          '<span class="flexbox">' + data[i].payNickName.slice(0, 4) + '</span>' +
          '</div>' +
          '</div>' +
          '<i class="pi-heart"></i>' +
          '</div>'
        $('.pamper-main').append(htmlStr)
      }
    } else {
      $('.pamper-init').removeClass('popup').addClass('flexbox')
    }
  },
  mountedRank: function (data, type) {
    $('.mp-value-mine').text(data.giftAmt + '甜蜜值')
    $('.mp-name').text(data.gainNickName)
    if (data.giftAmt != 0) {
      $('.mp-rank').text(data.rank)
      $('.mp-pre').text(data.preAmt)
    } else {
      $('.mp-rank').text('暂无')
      $('.mp-pre').text('暂无')
    }
    if (data.rank == 1) {
      $('.pre-value').addClass('popup')
    } else {
      $('.pre-value').removeClass('popup')
    }
    if (type == 1) {
      $('.mp-photo').prepend('<div class="photo-img flexbox alone" onclick="toMyList()"><img src="images/miao.png" alt="" class="photo-mine"></div>')
      if (data.giftCustomers) {
        if (data.giftCustomers.length > 0) {
          $('.photo-img').removeClass('alone')
          for (var i = 0; i < data.giftCustomers.length; i++) {
            $('.photo-' + (i + 1) + '').attr('src', data.giftCustomers[i] + '?x-oss-process=image/resize,w_200').removeClass('popup')
          }
        }
        if (data.giftCustomers.length >= 3) {
          $('.mp-photo>span').removeClass('popup')
        }
      }
    } else {
      $('.mp-photo').prepend('<div class="photo-img flexbox alone"><img src="images/miao.png" alt="" class="photo-mine"></div>')
    }
    $('.photo-img img').attr('src', data.gainPhoto + '?x-oss-process=image/resize,w_200')
    if (data.ranks.length != 0) {
      $('.rank-main ul').html('')
      for (var i = 0; i < data.ranks.length; i++) {
        var rankStr =
          '<li class="rank-item flexbox">' +
          '<div class="li-num flexbox">' +
          (i < 3 ? '<img src="images/rank_no' + (i + 1) + '.png" alt="">' : (i + 1)) +
          '</div>' +
          '<div class="li-photo" ' +
          (type == 1 ? 'onclick="toHome(' + data.ranks[i].customerId + ')"' : '') +
          '>' +
          '<img src="' + data.ranks[i].photo + '?x-oss-process=image/resize,w_200" alt="">' +
          (i < 3 ? '<div class="li-photo-frame frame' + (i + 1) + '"></div>' : '') +
          '</div>' +
          '<span class="li-name">' + data.ranks[i].nickName + '</span>' +
          '<span class="li-value">' + goddess.fmoney(data.ranks[i].giftAmt) + '</span>' +
          '<i></i>' +
          '</li>'
        $('.rank-main ul').append(rankStr)
      }
      if (data.ranks.length >= 15) {
        $('.rank-main ul').append(
          '<li class="look-more" onclick="lookMore(this,' + type + ')">点击查看更多</li>'
        )
      } else if (data.ranks.length < 15) {
        $('.rank-main ul').append(
          '<li class="look-more">你已经看到了我的底线~</li>'
        )
      }
    }
  },
  setNotice: function (arr) {
    var data = ''
    for (var i = 0; i < arr.length; i++) {
      data = data + '【' + arr[i].payNickName + '】使用' + arr[i].giftName + '宣告了对【' + arr[i].gainNickName + '】的爱慕之情&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
    }
    ScrollText($('.notice-item'), 0.4, 300, data, 'left', 1, 20)
  },
  showEllipsis: function (ele) {
    ele.each(function () {
      var len = $(this).text().length
      if (len > 4) {
        var str = ''
        str =
          $(this)
            .text()
            .substring(0, 5) + '...'
        $(this).html(str)
      }
    })
  },
  fmoney: function (s) {
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    var l = s.split(".")[0].split("").reverse();
    t = "";
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("");
  }
}
function lookMore(that, type) {
  $(that).addClass('popup')
  goddess.page++
  if (goddess.ranks.length > 485) {
    $('.rank-main ul').append('<li class="look-more">榜单仅展示前500名哦~</li>')
    return
  }
  var parmas = {
    customerId: goddess.customerId,
    type: type,
    page: goddess.page,
    pageSize: goddess.pageSize
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(goddess.env, '/act/goddess/getActRank'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if (res.data.ranks.length == 0) {
          $('.rank-main ul').append(
            '<li class="look-more flexbox">你已经看到我的底线了~</li>'
          )
          return
        }
        for (var i = 0; i < res.data.ranks.length; i++) {
          goddess.ranks.push(res.data.ranks[i])
          var rankStr =
            '<li class="rank-item flexbox">' +
            '<div class="li-num flexbox">' + goddess.ranks.length +
            '</div>' +
            '<div class="li-photo" ' +
            (type == 1 ? 'onclick="toHome(' + res.data.ranks[i].customerId + ')"' : '') +
            '>' +
            '<img src="' + res.data.ranks[i].photo + '?x-oss-process=image/resize,w_200" alt="">' +
            '</div>' +
            '<span class="li-name">' + res.data.ranks[i].nickName + '</span>' +
            '<span class="li-value">' + goddess.fmoney(res.data.ranks[i].giftAmt) + '</span>' +
            '<i></i>' +
            '</li>'
          $('.rank-main ul').append(rankStr)
        }
        if (res.data.ranks.length >= 15) {
          $('.rank-main ul').append(
            '<li class="look-more" onclick="lookMore(this,' + type + ')">点击查看更多</li>'
          )
        } else {
          $('.rank-main ul').append(
            '<li class="look-more flexbox">你已经看到我的底线了~</li>'
          )
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
function toHome(customerId) {
  if (!goddess.appBool) {
    config.dialogComm($('#openOutApp'), 'openOutApp');
    return
  }
  if (!goddess.isLogin) {
    config.dialogComm($('#isLogin'), 'isLogin');
    return
  }
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
function toMyList() {
  if (!goddess.appBool) {
    config.dialogComm($('#openOutApp'), 'openOutApp');
    return
  }
  if (!goddess.isLogin) {
    config.dialogComm($('#isLogin'), 'isLogin');
    return
  }
  window.location.href = './rank.html?token=' + goddess.token + '&customerId=' + goddess.customerId
}
function changeNav(that, type) {
  $('.photo-img').remove()
  $('.mp-photo>img').addClass('popup')
  $(that).removeClass('small').siblings('div').addClass('small')
  if (type == 1) {
    $('.title-nav').text('收到')
  } else {
    $('.title-nav').text('送出')
  }
  goddess.page = 1
  goddess.createdRank(type)
}
function changePamperNav(that) {
  if ($(that).hasClass('nav-2')) return
  $(that).addClass('nav-1').siblings().removeClass('nav-1').addClass('nav-0')
  goddess.createdPamper($(that).attr('date'))
}
function openRule() {
  window.location.href = './rule.html?appType=' + goddess.appType
}
var scrollAction = { x: 'undefined', y: 'undefined' }, scrollDirection;
function scrollEvent() {
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
function getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}
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
  var img = "http://miyiurl.rklive888.com/activities/goddess/dev/images/rank_head.png",
    title = '女神宠爱节',
    subtitle = '爱意大比拼正式开战，快去为喜爱的女神支持助力吧~',
    url = window.location.href,
    sharingState = 4;
  if ($config.browser.versions.android) {
    client.jumpToShare(img, title, url, subtitle, sharingState);
  } else {
    window.webkit.messageHandlers.jumpToShare.postMessage({
      img: img,
      title: title,
      url: url,
      subtitle: subtitle,
      type: sharingState,
      shareLink: 0
    });
  }
}
function download() {
  layer.closeAll()
  if ($config.browser.versions.android) {
    window.location.href = goddess.app[goddess.appType - 1].downloadUrl
  } else {
    if (goddess.appType == 1) {
      window.location.href = goddess.app[0].downloadUrl
    } else {
      var data = OpenInstall.parseUrlParams();
      new OpenInstall({
        appKey: goddess.app[1].appKey,
        onready: function () {
          var m = this;
          m.schemeWakeup();
          m.wakeupOrInstall();
        }
      })
    }
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
    css('width', '6rem');
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
goddess.init()