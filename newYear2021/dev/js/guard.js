var newYear = {
  env: 'demo',
  customerId: $config.getQueryStringByName('customerId'),
  token: $config.getQueryStringByName('token'),
  sex: $config.getQueryStringByName('sex'),
  page: 1,
  pageSize: 15,
  type: 2,
  isInvite: false,
  ranks: [],
  nickName: '',
  opCustomerId: '',
  init: function () {
    newYear.getGuardRanks()
  },
  mounted: function (data) {
    if (newYear.sex == 1) {
      // 男
      $('.head-sex0').addClass('popup')
      $('.head-sex1').removeClass('popup')
      $('.wrap-sex0').addClass('popup')
      $('.wrap-sex1').removeClass('popup')
      $('.gi-value-sex0').addClass('popup')
      $('.gi-value-sex1').removeClass('popup')
      $('.gi-name-other').removeClass('other-boy').addClass('other-girl').text('她的昵称')
      $('.gi-name-mine').removeClass('mine-girl').addClass('mine-boy')
    }
    $('.rank-icon .num').text(data.guardCustomers)
    var ranks = data.ranks
    if (ranks.length > 0) {
      $('.gi-wrap ul').html('')
      for (var i = 0; i < ranks.length; i++) {
        var str =
          '<li class="flexbox" id="' +
          ranks[i].customerId +
          '">' +
          '<div class="rank-font li-rank">' +
          (i < 3
            ? '<img src="./images/guard_' +
            String(i + 1) +
            String(i + 1) +
            '.png">'
            : i < 9
              ? '0' + (i + 1)
              : i + 1) +
          '</div>' +
          '<div onclick="toHome(' +
          ranks[i].customerId +
          ')" class="li-photo ' +
          (i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third' : '') +
          '"><img src="' +
          ranks[i].photo +
          '"></div>' +
          '<div class="li-name">' +
          (newYear.sex == 0
            ? '<input class="fontfamily name-sex0 li-name-boy" type="text" value="' +
            ranks[i].opNickName +
            '" onblur="setNickName(this,1)" onfocus="getNickName(this)">' +
            '<input class="fontfamily name-sex0 li-name-girl" type="text" value="' +
            ranks[i].nickName +
            '" onblur="setNickName(this,2)" onfocus="getNickName(this)">'
            : '<div class="name-sex1 li-name-girl">' +
            ranks[i].opNickName +
            '</div><div class="name-sex1 li-name-boy">' +
            ranks[i].nickName +
            '</div>') +
          '</div>' +
          '<div class="li-value column">' +
          '<p class="lv-value ' +
          (i > 2 ? 'black' : '') +
          '">' +
          newYear.fmoney(ranks[i].guardNum) +
          '</p>' +
          (newYear.type == 3
            ? '<p class="lv-success popup">跨年成功</p>'
            : '') +
          '</div>' +
          '<span class="invite popup" onclick="toInvite(this,' +
          i +
          ')">【点击邀请她参加活动】</span>' +
          '<i class="li-border"></i>' +
          '</li>'
        $('.gi-wrap ul').append(str)
        if (newYear.sex == 1 && ranks[i].guardNum >= 100000) {
          if (ranks[i].joinType == 3) {
            $($('.lv-success')[i]).removeClass('popup')
          }
        }
        if (newYear.sex == 0 && ranks[i].guardNum >= 100000) {
          if (ranks[i].joinType == 3) {
            $($('.lv-success')[i]).removeClass('popup')
          }
        }
        if (ranks[i].guardNum == 0) {
          if (ranks[i].joinType == 1) {
            $($('.invite')[i]).removeClass('popup')
          } else if (ranks[i].joinType == 2) {
            $($('.invite')[i])
              .removeClass('popup')
              .addClass('gray')
              .text('【已邀请,等待她同意】')
          }
        }
      }
      if (ranks.length >= 15) {
        $('.gi-wrap ul').append(
          '<li class="look-more" onclick="lookMore(this)">点击查看更多<img src="./images/more.png"></li>'
        )
      }
    } else {
      $('.gi-wrap ul').html(
        '<li class="flexbox">暂无人上榜</li>'
      )
    }
  },
  getGuardRanks: function () {
    newYear.page = 1
    var parmas = {
      customerId: newYear.customerId,
      type: newYear.type,
      page: newYear.page,
      pageSize: newYear.pageSize
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(newYear.env, '/act/newyear2021/getActRank'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        console.log('榜单: ', res.data)
        if (res.result) {
          newYear.ranks = res.data.ranks
          newYear.mounted(res.data)
        } else {
          layer.msg(res.message)
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
    // var l = s + ''
    // t = ''
    // for (i = 0; i < l.length; i++) {
    //   t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
    // }
    // return t
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    var l = s.split(".")[0].split("").reverse();
    t = "";
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("");
  }
}
function changeNav(type) {
  if (type == 3) {
    $('.nav-des')
      .removeClass('small-nav')
      .addClass('big-nav')
    $('.nav-award')
      .removeClass('big-nav')
      .addClass('small-nav')
    newYear.type = type
  } else {
    $('.nav-des')
      .removeClass('small-nav')
      .addClass('small-nav')
    $('.nav-award')
      .removeClass('small-nav')
      .addClass('big-nav')
    newYear.type = type
  }
  newYear.getGuardRanks()
}
function toInvite(_this) {
  if ($(_this).hasClass('gray')) {
    return
  }
  var parmas = {
    customerId: newYear.customerId,
    opCustomerId: $($(_this).parents()[0]).attr('id'),
    token: newYear.token
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(newYear.env, '/act/newyear2021/authApi/sendInviteMsg'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        layer.msg(
          '您的邀请发送成功！她将收到官方的私信提醒~她同意参加活动后你们的数据就会被记录。'
        )
        $(_this).addClass('gray').text('【已邀请,等待她同意】')
      } else {
        layer.msg(res.message)
      }
    },
    error: function (error) {
      layer.msg('网络异常')
    }
  })
}
function setNickName(that, type) {
  if (
    newYear.nickName == $(that).val() ||
    $(that)
      .val()
      .trim() == ''
  ) {
    $(that).val(newYear.nickName)
    layer.msg('已保存，未作修改！')
    return
  }
  var nameVal = $(that).val()
  if ($(that).val().length >= 8) {
    var nameVal = $(that)
      .val()
      .substring(0, 8)
    // $(that).val(nameVal)
    // layer.msg('您输入的内容过长，情侣名限8个字以内！')
  }
  var parmas = {
    opCustomerId: $($(that).parents()[1]).attr('id'),
    customerId: newYear.customerId,
    nickName: nameVal,
    token: newYear.token,
    type: type
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(newYear.env, '/act/newyear2021/authApi/setNickName'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if ($(that).val().length >= 8) {
          $(that).val(nameVal)
          layer.msg('您输入的内容过长，情侣名限8个字以内！')
        } else {
          layer.msg('修改成功，昵称已在活动所有榜单生效！')
        }
      } else {
        $(that).val(newYear.nickName)
        layer.msg(res.message)
      }
    },
    error: function (error) {
      layer.msg('网络异常')
    }
  })
}
function getNickName(that) {
  newYear.nickName = $(that).val()
}
function deleteName(that) {
  if ($(that).val().length >= 8) {
    var nameVal = $(that)
      .val()
      .substring(0, 8)
    $(that).val(nameVal)
    layer.msg('您输入的内容过长，情侣名限8个字以内！')
  }
}
function toHome(customerId) {
  var ua = navigator.userAgent.toLowerCase()
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isIOS) {
    window.webkit.messageHandlers.jumpToHomePage.postMessage({
      customerId: customerId
    })
  } else if (isAndroid) {
    client.jumpToHomePage(customerId)
  }
}
function lookMore(that) {
  $(that).addClass('popup')
  newYear.page++
  if (newYear.ranks.length > 300) {
    $('.gi-wrap ul').append('<li class="look-more">榜单仅展示前300名哦~</li>')
    return
  }
  var parmas = {
    customerId: newYear.customerId,
    type: newYear.type,
    page: newYear.page,
    pageSize: newYear.pageSize
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(newYear.env, '/act/newyear2021/getActRank'),
    data: parmas,
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
            '<li class="flexbox" id="' +
            data.ranks[i].customerId +
            '">' +
            '<div class="rank-font li-rank">' +
            newYear.ranks.length +
            '</div>' +
            '<div onclick="toHome(' +
            data.ranks[i].customerId +
            ')" class="li-photo ' +
            (i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third' : '') +
            '"><img src="' +
            data.ranks[i].photo +
            '"></div>' +
            '<div class="li-name">' +
            (newYear.sex == 0
              ? '<input class="fontfamily name-sex0 li-name-boy" type="text" value="' +
              data.ranks[i].opNickName +
              '" onblur="setNickName(this,1)" onfocus="getNickName(this)">' +
              '<input class="fontfamily name-sex0 li-name-girl" type="text" value="' +
              data.ranks[i].nickName +
              '" onblur="setNickName(this,2)" onfocus="getNickName(this)">'
              : '<div class="name-sex1 li-name-girl">' +
              data.ranks[i].opNickName +
              '</div><div class="name-sex1 li-name-boy">' +
              data.ranks[i].nickName +
              '</div>') +
            '</div>' +
            '<div class="li-value column">' +
            '<p class="lv-value black">' +
            newYear.fmoney(data.ranks[i].guardNum) +
            '</p>' +
            (newYear.type == 3
              ? '<p class="lv-success popup">跨年成功</p>'
              : '') +
            '</div>' +
            '<span class="invite popup" onclick="toInvite(this)">【点击邀请她参加活动】</span>' +
            '<i class="li-border"></i>' +
            '</li>'
          $('.gi-wrap ul').append(str)
          if (newYear.sex == 1 && data.ranks[i].guardNum >= 100000) {
            var num = i + 15 * newYear.page
            if (data.ranks[i].joinType == 3) {
              $($('.lv-success')[num]).removeClass('popup')
            }
          }
          if (newYear.sex == 0 && data.ranks[i].guardNum >= 100000) {
            var num = i + 15 * newYear.page
            if (data.ranks[i].joinType == 3) {
              $($('.lv-success')[num]).removeClass('popup')
            }
          }
          if (data.ranks[i].guardNum == 0) {
            if (data.ranks[i].joinType == 1) {
              $($('.invite')[i + 15 * (newYear.page - 1)]).removeClass('popup')
            }
            if (data.ranks[i].joinType == 2) {
              $($('.invite')[i + 15 * (newYear.page - 1)])
                .removeClass('popup')
                .addClass('gray')
                .text('【已邀请,等待她同意】')
            }
          }
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
      } else {
        layer.msg(res.message)
      }
    },
    error: function (error) {
      layer.msg('网络异常')
    }
  })
}
newYear.init()
