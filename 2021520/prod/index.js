var love = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  isFrom: $config.getQueryStringByName("isFrom"),
  token: $config.getQueryStringByName("token"),
  appType: $config.getQueryStringByName("appType").slice(0, 1) || 2,
  isLogin: true,
  rank: null,
  dataDate: null,
  sex: 0,
  page: 1,
  pageSize: 15,
  appBool: openInWebview(),// 是否app外打开
  dateArr: [],
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
    love.created()
    love.appMounted()
  },
  created: function () {
    var parmas = {
      customerId: love.customerId,
      token: love.token,
      isFrom: love.isFrom
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(love.env, '/act/2021520/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (!love.appBool) {
          if (love.appType == 1) {
            $('#openOutApp').css('background-image', 'url(images/tuliaoDownload.png)')
          }
          $config.dialogComm($('#openOutApp'), 'openOutApp')
          return
        }
        if (res.result) {
          love.now = res.data.now
          love.sex = res.data.sex
          love.isEnd = res.data.isEnd
          love.isLogin = res.data.isLogin
          love.beginDate = res.data.beginDate
          if (!love.isLogin) {
            $config.dialogComm($('#isLogin'), 'isLogin')
            return
          }
          if (res.data.appType) {
            love.appType = res.data.appType
          }
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          love.mounted(res.data)
          love.createdRank(moment(moment(res.data.now).valueOf()).format('YYYY-MM-DD'))
        } else {
          if (res.code == '-100') {
            if (res.message.indexOf('活动未开始') != -1) {
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
            }
            return
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
        document.body.addEventListener(
          'touchmove',
          function (e) {
            e.preventDefault()
          },
          { passive: false }
        )
      }
    })
  },
  createdRank: function (dataDate) {
    var parmas = {
      customerId: love.customerId,
      token: love.token,
      dataDate: dataDate,
      page: love.page,
      pageSize: love.pageSize,
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(love.env, '/act/2021520/getActRank'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          love.rank = res.data.ranks
          love.mountedRank(res.data)
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
  appMounted: function () {
    if (love.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appName').text('兔聊')
    }
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
  },
  mounted: function (data) {
    if (!love.appBool || !data.isLogin) {
      $('.main-mine').addClass('popup')
    } else {
      if (data.sex == 0) {
        // 女
        $('.page-title-girl').removeClass('popup').siblings('.page-text-girl').removeClass('popup')
        $('.progress-a').html('累计有效通话时长: <span class="progress-girl">' + data.videoSecond + '分钟</span>')
        $('.progress-b').html('我已累计获得免费盲盒: <span class="progress-blind">' + data.totalBoxNum + '个</span>')
        $('.progress-c').html('距获下一个盲盒还差: <span class="progress-value">' + data.nextBox + '分钟</span>通话')
      } else {
        // 男
        $('.page-title-boy').removeClass('popup').siblings('.page-text-boy').removeClass('popup')
        $('.progress-a').html('我已累计获得免费盲盒: <span class="progress-blind">' + data.totalBoxNum + '个</span>')
        $('.progress-b').html('已使用次数: <span class="progress-blind">' + data.videoSecond + '次</span>')
        $('.progress-c').html('剩余可免费抽: <span class="progress-value">' + data.nextBox + '次</span>')
      }
    }
    var timestamp = moment(data.beginDate).valueOf()
    for (var i = 0; i < 5; i++) {
      love.dateArr.push(moment(timestamp).format('YYYY-MM-DD'))
      $($('.rank-item-date li')[i]).text(moment(timestamp).format('M月DD日'))
      if (moment(data.now.split(' ')[0]).valueOf() == timestamp) {
        $($('.rank-item-date li')[i]).addClass('now').removeClass('later')
      } else if (moment(data.now.split(' ')[0]).valueOf() > timestamp) {
        $($('.rank-item-date li')[i]).addClass('ago').removeClass('later')
      }
      timestamp = timestamp + 86400000
    }
    love.appMounted()
  },
  mountedRank: function (data) {
    // console.log(data);
    $('.mine-photo img').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
    $('.mine-name').text(data.nickName)
    $('.info-photo img').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
    $('.info-name').text(data.nickName)
    showEllipsis($('.mine-name'))
    if (data.boxAmt != 0) {
      $('.info-rank').text(data.rank)
      $('.info-value-num').text(data.boxAmt)
    }
    if (data.ranks.length > 0) {
      $('.rank-item').html('')
      for (var i = 0; i < data.ranks.length; i++) {
        var str =
          '<li class="flexbox">' +
          '<div class="rank-num flexbox">' + (i < 3 ? '<img src="images/rank_icon_' + i + '.png">' : (i + 1)) +
          '</div>' +
          '<div class="rank-photo">' +
          '<img src="' + data.ranks[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
          (i < 3 ? '<div class="photo-wrap photo-wrap-' + i + '"></div>' : '') +
          '</div>' +
          '<div class="rank-name flexbox">' + data.ranks[i].nickName + '</div>' +
          '<div class="rank-value flexbox">' + fmoney(data.ranks[i].boxAmt) + '</div>' +
          '</li>'
        $('.rank-item').append(str)
      }
      if (data.ranks.length >= 10) {
        $('.rank-wrap').addClass('full')
      } else {
        $('.rank-wrap').removeClass('full')
      }
      if (data.ranks.length >= 15) {
        $('.rank-item').append('<li class="flexbox look-more" onclick="lookMore(this)">点击查看更多<i class="look-more-icon"></i></li>')
      }
    } else {
      $('.rank-item').html('')
      for (var i = 0; i < 5; i++) {
        var initstr =
          '<li class="flexbox">' +
          '<div class="rank-num flexbox">' + (i < 3 ? '<img src="images/rank_icon_' + i + '.png">' : (i + 1)) +
          '</div>' +
          '<div class="rank-photo">' +
          '<img src="images/miao.png">' +
          (i < 3 ? '<div class="photo-wrap photo-wrap-' + i + '"></div>' : '') +
          '</div>' +
          '<div class="rank-name flexbox">虚位以待</div>' +
          '<div class="rank-value flexbox">暂无</div>' +
          '</li>'
        $('.rank-item').append(initstr)
      }
    }
    showEllipsis($('.rank-name'))
  }
}
function lookRanksData(that, type) {
  if ($(that).hasClass('later')) return
  for (var i = 0; i <= 5; i++) {
    if (!$($('.rank-item-date li')[i]).hasClass('later')) {
      $($('.rank-item-date li')[i]).addClass('ago').removeClass('now')
    }
  }
  $(that).addClass('now').removeClass('ago')
  love.dataDate = love.dateArr[type]
  love.page = 1
  love.createdRank(love.dateArr[type])
}
function lookMore(that) {
  $(that).addClass('popup')
  love.page++
  if (love.rank.length > 285) {
    $('.rank-item').append('<li class="flexbox look-more">榜单最多展示前300位用户</li>')
    return
  }
  for (var i = 0; i < 5; i++) {
    if ($($('.rank-item-date li')[i]).hasClass('now')) {
      love.dataDate = i
    }
  }
  var parmas = {
    customerId: love.customerId,
    token: love.token,
    dataDate: love.dateArr[love.dataDate],
    page: love.page,
    pageSize: love.pageSize,
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(love.env, '/act/2021520/getActRank'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        for (var i = 0; i < res.data.ranks.length; i++) {
          love.rank.push(res.data.ranks[i])
          var htmlStr =
            '<li class="flexbox">' +
            '<div class="rank-num flexbox">' + love.rank.length +
            '</div>' +
            '<div class="rank-photo">' +
            '<img src="' + res.data.ranks[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
            '</div>' +
            '<div class="rank-name flexbox">' + res.data.ranks[i].nickName + '</div>' +
            '<div class="rank-value flexbox">' + fmoney(res.data.ranks[i].boxAmt) + '</div>' +
            '</li>'
          $('.rank-item').append(htmlStr)
        }
        showEllipsis($('.rank-name'))
        if (res.data.ranks.length >= 15) {
          $('.rank-item').append('<li class="flexbox look-more" onclick="lookMore(this)">点击查看更多<i class="look-more-icon"></i></li>')
        } else {
          $('.rank-item').append('<li class="flexbox look-more">你已经看到了我的底线~</li>')
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
function changePageNav(type, that) {
  if (!love.appBool) {
    if (love.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/tuliaoDownload.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!love.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  $(that).addClass('main-nav-a').removeClass('main-nav-b').siblings('.main-nav-item').addClass('main-nav-b').removeClass('main-nav-a')
  if (type == 2) {
    $('.main-bgc-rule').addClass('popup')
    $('.rank-wrap').removeClass('popup')
    $('footer span').addClass('popup')
    if (love.appBool && love.isLogin) {
      $('.rank-info-item').removeClass('popup')
    }
    $('.rule-btn').addClass('rank-page-btn')
  } else {
    $('.main-bgc-rule').removeClass('popup')
    $('.rank-wrap').addClass('popup')
    $('footer span').removeClass('popup')
    $('.rank-info-item').addClass('popup')
    $('.rule-btn').removeClass('rank-page-btn')
  }
  love.appMounted()
}
function toRulePage() {
  if (!love.appBool) {
    if (love.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/tuliaoDownload.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!love.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  window.location.href = './rule.html?appType=' + love.appType + '&sex=' + love.sex
}
function shareTc() {
  var img = "http://miyiurl.rklive888.com/activities/love/dev/images/miao.png",
    title = '抽盲盒 觅真爱',
    subTitle = '开出你的桃花运';
  shareComm(img, title, subTitle)
}
function download() {
  layer.closeAll()
  if ($config.browser.versions.android) {
    window.location.href = love.app[love.appType - 1].downloadUrl
  } else {
    if (love.appType == 1) {
      window.location.href = love.app[0].downloadUrl
    } else {
      var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
      new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey: love.app[1].appKey,
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
function fmoney(s) {
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
  var l = s.split(".")[0].split("").reverse();
  t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("");
}
love.init()