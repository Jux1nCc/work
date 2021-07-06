var goddess = {
  env: 'demo',
  customerId: window.location.href.split('?')[1].split('&')[1].split('=')[1],
  token: window.location.href.split('?')[1].split('&')[0].split('token=')[1],
  page: 1,
  pageSize: 10,
  ranks: [],
  init: function () {
    goddess.created()
  },
  created: function () {
    var parmas = {
      customerId: goddess.customerId,
      token: goddess.token,
      page: goddess.page,
      pageSize: goddess.pageSize
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(goddess.env, '/act/goddess/authApi/getMyList'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          goddess.ranks = res.data
          goddess.mountedRank(res.data)
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
  mountedRank: function (data) {
    if (data.length != 0) {
      $('.rank-main ul').html('')
      for (var i = 0; i < data.length; i++) {
        var rankStr =
          '<li class="rank-item flexbox">' +
          '<div class="li-num flexbox">' + (i + 1) + '</div>' +
          '<div class="li-photo flexbox" onclick="toHome(' + data[i].payCustomerId + ')">' +
          '<img src="' + data[i].payPhoto + '" alt="">' +
          '</div>' +
          '<span class="li-name">' + data[i].payNickName + '</span>' +
          '<span class="li-value">' + goddess.fmoney(data[i].giftAmt) + '</span>' +
          '</li>'
        $('.rank-main ul').append(rankStr)
      }
      if (data.length >= 10) {
        $('.rank-main ul').append(
          '<li class="look-more" onclick="lookMore(this)">点击查看更多</li>'
        )
      } else {
        $('.rank-main ul').append(
          '<li class="look-more">你已经看到我的底线了~</li>'
        )
      }
    }
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
function lookMore(that) {
  $(that).addClass('popup')
  goddess.page++
  if (goddess.ranks.length > 490) {
    $('.rank-main ul').append('<li class="look-more">榜单仅展示前500名哦~</li>')
    return
  }
  var parmas = {
    customerId: goddess.customerId,
    token: goddess.token,
    page: goddess.page,
    pageSize: goddess.pageSize
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(goddess.env, '/act/goddess/authApi/getMyList'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if (res.data.length == 0) {
          $('.rank-main ul').append(
            '<li class="look-more">你已经看到我的底线了~</li>'
          )
          return
        }
        for (var i = 0; i < res.data.length; i++) {
          goddess.ranks.push(res.data[i])
          var rankStr =
            '<li class="rank-item flexbox">' +
            '<div class="li-num flexbox">' + goddess.ranks.length +
            '</div>' +
            '<div class="li-photo flexbox" onclick="toHome(' + res.data[i].payCustomerId + ')">' +
            '<img src="' + res.data[i].payPhoto + '" alt="">' +
            '</div>' +
            '<span class="li-name">' + res.data[i].payNickName + '</span>' +
            '<span class="li-value">' + goddess.fmoney(res.data[i].giftAmt) + '</span>' +
            '</li>'
          $('.rank-main ul').append(rankStr)
        }
        if (res.data.length >= 10) {
          $('.rank-main ul').append(
            '<li class="look-more" onclick="lookMore(this)">点击查看更多</li>'
          )
        } else {
          $('.rank-main ul').append(
            '<li class="look-more">你已经看到我的底线了~</li>'
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
goddess.init()