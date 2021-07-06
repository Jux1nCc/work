var newYear = {
  env: 'prod',
  customerId: $config.getQueryStringByName('customerId'),
  isFrom: $config.getQueryStringByName('isFrom'),
  token: $config.getQueryStringByName('token'),
  sex: 1,
  appType: 2,
  page: 1,
  pageSize: 15,
  isFirstAct: true,
  ranks: [],
  initData: null,
  nowYear: new Date().getFullYear(),
  init: function (isJoinType) {
    newYear.created(isJoinType)
    config.lazyLoad('.lazy-img')
  },
  created: function (isJoinType) {
    var parmas = {
      customerId: newYear.customerId,
      token: newYear.token,
      isFrom: newYear.isFrom
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(newYear.env, '/act/newyear2021/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          if (!res.data.isLogin) {
            config.dialogComm($('#toLogin'), 'toLogin')
            document.body.addEventListener(
              'touchmove',
              function (e) {
                e.preventDefault()
              },
              { passive: false }
            )
            return
          }
          if (!window.localStorage.getItem('isFirstAct') || isJoinType) {
            if (newYear.nowYear == 2020) {
              newYear.shake($('.is-prev .info-fir span'))
            } else {
              newYear.shake($('.is-next .info-fir span'))
            }
          }
          newYear.initData = res.data
          newYear.sex = res.data.sex
          newYear.appType = res.data.staffFlag
          newYear.mounted(res.data, isJoinType)
        } else {
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
    newYear.getGuardRanks()
    $('.page_1').removeClass('popup')
    $('.page_2').addClass('popup')
  },
  mounted: function (data, isJoinType) {
    if (data.staffFlag == 2) {
      $('.appName').text('觅伊')
      $('.appUnit').text('钻石')
    } else {
      $('.appName').text('兔聊')
      $('.appUnit').text('聊币')
    }
    if (newYear.nowYear == 2020) {
      $('.hp-itemp').css('width', '25%')
    } else {
      $('.hp-itemp').css('width', '75%')
      $('.xunren').addClass('popup')
      $('.is-prev').addClass('popup')
      $('.is-next').removeClass('popup')
      $('.glory-rank').addClass('popup')
      $('.join-btn').text('参与活动')
    }
    if (data.sex) {
      $('.text-sexType').text('送出')
      $('.progress-sexType').text('您守护的女神')
      $('.info-title').text('我守护的女神们')
      $('.info-btn').addClass('popup')
      $('.photo-text').html('我正在守护<span class="guard-num">0</span>人')
      $('.info-rank').addClass('popup')
      $('.in-prev').addClass('popup')
    } else {
      if (!data.isJoined) {
        window.localStorage.setItem('isFirstAct', 'true')
        $('.ny-goal').addClass('popup')
        $('.ny-info').addClass('popup')
        $('.ny-notJoin').removeClass('popup')
        $('.ny-btn').removeClass('popup')
      } else {
        window.localStorage.removeItem('isFirstAct')
        $('.ny-goal').removeClass('popup')
        $('.ny-info').removeClass('popup')
        $('.ny-notJoin').addClass('popup')
        $('.ny-btn').addClass('popup')
      }
    }
    if (!data.firstActDlg) {
      window.localStorage.setItem('isFirstAct', 'true')
    } else {
      if (data.sex) {
        config.dialogComm($('#guideBoy'), 'guideBoy')
      } else {
        config.dialogComm($('#guideGirl'), 'guideGirl')
      }
      window.localStorage.removeItem('isFirstAct')
    }
    if (data.totalGuardNum) {
      if (data.totalGuardNum - 100000 >= 0) {
        $('.ny-goal').html(
          '恭喜您, <span>跨年成功</span>, “跨年成功”奖励已发放'
        )
      } else {
        $('.ny-goal span').text(100000 - data.totalGuardNum)
      }
    }
    if (data.rank) {
      if (data.rank > 99) {
        $('.info-rank span').text('99+')
      } else {
        $('.info-rank span').text(data.rank)
      }
    } else {
      $('.info-rank span').text('暂无')
    }
    $('.guard-num').text(data.guardCustomers)
    $('.photo-me').attr('src', data.photo)
    if (data.photos) {
      if (data.photos.length > 0) {
        $('.photo-me').removeClass('alone')
        if (data.photos.length == 1) {
          $('.photo-1')
            .attr('src', data.photos[0])
            .removeClass('popup')
        } else if (data.photos.length == 2) {
          $('.photo-1')
            .attr('src', data.photos[0])
            .removeClass('popup')
          $('.photo-2')
            .attr('src', data.photos[1])
            .removeClass('popup')
        } else if (data.photos.length == 3) {
          $('.photo-1')
            .attr('src', data.photos[0])
            .removeClass('popup')
          $('.photo-2')
            .attr('src', data.photos[1])
            .removeClass('popup')
          $('.photo-3')
            .attr('src', data.photos[2])
            .removeClass('popup')
          $('.photo-3')
            .siblings('span')
            .removeClass('popup')
        }
      }
    }
    $('.fir-name').text(data.nickName)
    $('.sec-name').text(data.opNickName)
    $('.in-value span').text(newYear.fmoney(data.guardNum))
    $('.in-prev span').text(data.preAmt)
    if (!data.opNickName) {
      $('.in-name').html('今日暂无')
      $('.in-value span').text('暂无')
      $('.in-prev span').text('暂无')
    }
    if (!isJoinType) {
      var guardItem = data.guards
      if (guardItem.length > 0) {
        if (guardItem.length > 10) {
          guardItem.length = 10
        }
        $('.glory-empty').addClass('popup')
        for (var i = 0; i < guardItem.length; i++) {
          var str =
            '<div class="gw-item">' +
            '<div class="gw-name gw-girlName flexbox">' +
            '<div class="gw-name-item">' +
            guardItem[i].nickName.substring(0, 8) +
            '</div>' +
            '</div>' +
            '<div class="gw-name gw-boyName flexbox">' +
            '<div class="gw-name-item">' +
            guardItem[i].opNickName.substring(0, 8) +
            '</div>' +
            '</div>' +
            '<div class="gw-heart"></div>' +
            '<div class="gw-text column">' +
            '<p class="gw-success">跨年成功</p>' +
            '<p class="gw-time">' +
            guardItem[i].guardTime.split('-')[1] +
            '月' +
            guardItem[i].guardTime.split('-')[2].split(' ')[0] +
            '日 ' +
            guardItem[i].guardTime
              .split('-')[2]
              .split(' ')[1]
              .split(':')[0] +
            ':' +
            guardItem[i].guardTime
              .split('-')[2]
              .split(' ')[1]
              .split(':')[1] +
            '</p>' +
            '</div>' +
            '<div class="gw-firework"></div>' +
            '</div>'
          $('.glory-wrap').append(str)
        }
      }
    }
    newYear.showEllipsis($('.ellipsis'))
    newYear.showEllipsis($('.gw-name-item'))
  },
  mountedGuard: function (data) {
    if (data.ranks) {
      var ranks = data.ranks
      newYear.ranks = ranks
      if (ranks.length > 0) {
        $('.gi-wrap ul').html('')
        for (var i = 0; i < ranks.length; i++) {
          var str =
            '<li class="flexbox">' +
            '<div class="li-rank">' +
            (i < 3 ? '<img src="./images/guard_' + (i + 1) + '.png">' : i + 1) +
            '</div>' +
            '<div class="li-name">' +
            '<div class="li-name-girl flexbox">' +
            ranks[i].nickName +
            '</div>' +
            '<div class="li-name-boy flexbox">' +
            ranks[i].opNickName +
            '</div>' +
            (i < 3 ? '<i class="li-icon-left"></i><i class="li-icon-right"></i>' : '') +
            '</div>' +
            '<div class="li-value column">' +
            '<p><span class="lv-value">' +
            newYear.fmoney(ranks[i].guardNum) +
            '</span> 守护值</p>' +
            '<p><span class="lv-num">' +
            ranks[i].guardCustomers +
            '</span> 人想要守护她</p>' +
            '</div>' +
            '<i class="li-border"></i>' +
            '</li>'
          $('.gi-wrap ul').append(str)
        }
        if (ranks.length >= 15) {
          $('.gi-wrap ul').append(
            '<li class="look-more" onclick="lookMore(this)">点击查看更多<img src="./images/more.png"></li>'
          )
        }
      }
    }
  },
  renderDialog: function (data) {
    $('.award-photo img').attr('src', data.productView)
    if (newYear.appType == 2) {
      $('.appDress').text('我-更多-个性装扮')
    }
  },
  shake: function (ele) {
    $('.info-fir').removeClass('popup')
    $('.info-sec').addClass('popup')
    for (var i = 0; i < ele.length; i++) {
      $(ele[i]).css('left', i * 8 + 15 + '%')
      $(ele[i]).css(
        'animation',
        'move ' + ((i + 1) * 10 + 500) + 'ms linear infinite alternate'
      )
      $(ele[i]).css(
        '-webkit-animation',
        'move ' + ((i + 1) * 10 + 500) + 'ms linear infinite alternate'
      )
    }
  },
  showEllipsis: function (ele) {
    ele.each(function () {
      var len = $(this).text().length
      if (len > 4) {
        var str = ''
        str =
          $(this)
            .text()
            .substring(0, 4) + '...'
        $(this).html(str)
      }
    })
  },
  getGuardRanks: function () {
    var parmas_1 = {
      customerId: newYear.customerId,
      type: 1,
      page: newYear.page,
      pageSize: newYear.pageSize
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(newYear.env, '/act/newyear2021/getActRank'),
      data: parmas_1,
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        if (res.result) {
          newYear.mountedGuard(res.data)
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
function joinNewYear() {
  var parmas = {
    customerId: newYear.customerId,
    token: newYear.token
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(newYear.env, '/act/newyear2021/authApi/receiveReward'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        newYear.renderDialog(res.data)
        config.dialogComm($('#getAward'), 'getAward')
        window.localStorage.removeItem('isFirstAct')
        newYear.init(1)
        $('.ny-goal').removeClass('popup')
        $('.ny-info').removeClass('popup')
        $('.ny-notJoin').addClass('popup')
        $('.ny-btn').addClass('popup')
      } else {
        layer.msg(res.message)
        layer.closeAll()
      }
    },
    error: function (error) {
      layer.msg('网络异常')
      layer.closeAll()
    }
  })
}
function toGuard() {
  window.location.href =
    './guard.html?customerId=' +
    newYear.customerId +
    '&token=' +
    newYear.token +
    '&sex=' +
    newYear.sex
}
function lookMore(that) {
  newYear.page++
  $(that).addClass('popup')
  if (newYear.ranks.length > 300) {
    $('.gi-wrap ul').append('<li class="look-more">榜单仅展示前300名哦~</li>')
    return
  }
  var parmas_1 = {
    customerId: newYear.customerId,
    type: 1,
    page: newYear.page,
    pageSize: newYear.pageSize
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(newYear.env, '/act/newyear2021/getActRank'),
    data: parmas_1,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        var data = res.data
        if (data.ranks.length == 0) {
          $('.gi-wrap ul').append(
            '<li class="look-more">你已经看到我的底线了~</li>'
          )
          return
        }
        for (var i = 0; i < data.ranks.length; i++) {
          newYear.ranks.push(data.ranks[i])
          var str =
            '<li class="flexbox">' +
            '<div class="li-rank">' +
            newYear.ranks.length +
            '</div>' +
            '<div class="li-name">' +
            '<div class="li-name-girl flexbox">' +
            data.ranks[i].nickName.substring(0, 8) +
            '</div>' +
            '<div class="li-name-boy flexbox">' +
            data.ranks[i].opNickName.substring(0, 8) +
            '</div>' +
            '</div>' +
            '<div class="li-value column">' +
            '<p><span class="lv-value">' +
            newYear.fmoney(data.ranks[i].guardNum) +
            '</span> 守护值</p>' +
            '<p><span class="lv-num">' +
            data.ranks[i].guardCustomers +
            '</span> 人想要守护她</p>' +
            '</div>' +
            '<i class="li-border"></i>' +
            '</li>'
          $('.gi-wrap ul').append(str)
        }
        if (data.ranks.length >= 15) {
          $('.gi-wrap ul').append(
            '<li class="look-more" onclick="lookMore(this)">点击查看更多<img src="./images/more.png"></li>'
          )
        } else {
          $('.gi-wrap ul').append(
            '<li class="look-more">你已经看到我的底线了~</li>'
          )
        }
      }
    },
    error: function (error) {
      layer.msg('网络异常')
    }
  })
}
function toRule() {
  window.location.href =
    './rule.html?appType=' + newYear.appType + '&sex=' + newYear.sex
}
newYear.init(0)
