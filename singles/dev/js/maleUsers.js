var singles = {
  env: 'demo',
  customerId: $config.getQueryStringByName("customerId"),
  appType: $config.getQueryStringByName("appType"),
  isFrom: $config.getQueryStringByName("isFrom"),
  token: $config.getQueryStringByName("token"),
  sex: $config.getQueryStringByName("sex"),
  nowTimestamp: '',  //当前时间戳
  beginTimestamp: '',  //活动开始时间戳
  singleTimestamp: '',// 双十一当天时间戳
  isLogin: true, //是否登录
  isEnd: false,  //是否结束
  dateNum: 1,  //活动第几天
  appBool: openInWebview(),// 是否app外打开
  remainNum: 0, //抽奖次数
  remainBigNum: 0, //爆大奖名额
  reChargeURL: '',//充值地址
  isRecharge: false,//能否充值
  isRedPack: false,//红包抽奖(true)还是爆大奖(false)
  isDo: false,
  liData: {},
  timer: null,
  placeTime: ['11.11开启', '11:00开启', '剩余<span class="placeNum">xxxx</span>名', '已开启'],
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
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
    if (singles.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appName').text('兔聊')
    } else {
      $('.appUnit').text('钻石')
      $('.appName').text('觅伊')
    }
  },
  created: function () {
    // 是否登录及是否app外打开
    // if (!singles.appBool) {
    //   return
    // } else if (!singles.isLogin) {
    //   return
    // }
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
        if (res.result) {
          console.log(res);
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          var nowTimestamp = moment(res.data.nowDate).valueOf(),
            beginTimestamp = moment(res.data.beginDate).valueOf()
          singles.nowTimestamp = nowTimestamp
          singles.beginTimestamp = beginTimestamp
          singles.singleTimestamp = beginTimestamp + (86400000 * 4)
          singles.isLogin = res.data.isLogin
          singles.isEnd = res.data.isEnd
          singles.dateNum = res.data.dateNum
          singles.remainBigNum = res.data.remainBigNum
          singles.reChargeURL = res.data.url
          singles.remainNum = res.data.remainNum
          singles.isRecharge = res.data.isRecharge
          if (nowTimestamp < beginTimestamp) {
            layer.msg('活动暂未开始, 敬请期待', {
              time: false,
              shade: 0.5
            })
            return
          }
          singles.mounted(res.data)
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
        layer.msg('网络异常', {
          time: false,
          shade: 0.5
        })
      }
    })
  },
  mounted: function (data) {
    // $('.page-man').show()
    // 双十一当天爆大奖弹窗
    if (singles.nowTimestamp > singles.singleTimestamp && singles.nowTimestamp < (singles.singleTimestamp + 86400000)) {
      if (data.awardDlg == 1) {
        config.dialogComm($('#placesRob'), 'placesRob')
      } else if (data.awardDlg == 2) {
        config.dialogComm($('#placesAwait'), 'placesAwait')
      } else if (data.awardDlg == 3) {
        config.dialogComm($('#placesOpen'), 'placesOpen')
      }
    }
    // 爆大奖按钮
    if (singles.nowTimestamp < singles.singleTimestamp) {
      // 11.11之前
      $('.places-btn').removeClass('popup')
      $('.place-time').html(singles.placeTime[0])
    } else if (singles.nowTimestamp > singles.singleTimestamp && singles.nowTimestamp < (singles.singleTimestamp + 39600000)) {
      // 11.11当天 00:00-11:00
      $('.places-btn').removeClass('popup')
      $('.place-time').html(singles.placeTime[1])
      $('.places-btn>span').addClass('animation')
    } else if (singles.nowTimestamp > (singles.singleTimestamp + 39600000) && singles.nowTimestamp < (singles.singleTimestamp + 86400000)) {
      // 11.11当天 11:00-24:00
      $('.places-btn').removeClass('popup')
      $('.place-time').html('剩余' + data.remainBigNum + '名')
      $('.places-btn>span').addClass('animation')
      if (data.remainBigNum < 1) {
        // 剩余名额为0
        $('.place-time').html(singles.placeTime[3])
        $('.places-btn>span').removeClass('animation')
      }
    } else {
      $('.places-btn').addClass('popup')
    }
    // 抽奖记录按钮
    if (data.showAward) {
      $('.record-btn').removeClass('popup')
    }
    // 公告
    singles.setNotice(data.notices)
    // 剩余抽奖机会
    $('.lottery-chance>span').text(data.remainNum)
    if (data.remainNum) {
      $('.lottery-chance').removeClass('gray')
    } else {
      $('.lottery-chance').addClass('gray')
    }
  },
  setNotice: function (data) {
    data = singles.getSsort(data)
    if (singles.liData.id) {
      $('.notice>ul').html('<li class="flexbox li' + singles.liData.id + '">' + singles.liData.content + '</li>')
    } else {
      $('.notice>ul').html('')
    }
    var noticeName, noticeAward
    for (var i = 0; i < data.length; i++) {
      noticeName = data[i].content.split('幸运')[0].split('恭喜')[1]
      noticeAward = data[i].content.split('抽中')[1]
      if (noticeAward.indexOf('钻石') != -1) {
        noticeAward = noticeAward.split('钻石')[0] + '<span class="appUnit">钻石</span>'
      }
      if (noticeAward.indexOf('+') != -1) {
        noticeAward = noticeAward.split('+')[0].split('-')[0] + '套装'
      }
      $('.notice>ul').append('<li class="flexbox li' + data[i].id + '">恭喜<span class="notice-name">' + noticeName + '</span>幸运抽中“<span class="notice-award">' + noticeAward + '</span>”</li>')
    }
    singles.liData.content = $('.notice>ul li:last').html()
    singles.liData.id = data[data.length - 1].id
    //3个字以上显示省略号
    $(".notice-name").each(function () {
      var len = $(this).text().length;
      if (len > 3) {
        var str = "";
        str = $(this).text().substring(0, 3) + "...";
        $(this).html(str);
      }
    });
    singles.timer = setInterval(function () {
      singles.noticeUp('.notice>ul', '-0.33rem', 500)
    }, 2000)
  },
  noticeUp: function (obj, top, time) {
    $(obj).animate(
      { marginTop: top },
      time,
      function () {
        $(this).css({ marginTop: "0" }).find(":first").appendTo(this)
        if ($(this).find(":first").hasClass('li' + singles.liData.id)) {
          clearInterval(singles.timer)
          setTimeout(function () {
            singles.getNotices(singles.liData.id)
          }, 10000)
        }
      })
  },
  // 重新按id排列公告数组
  getSsort: function (arr) {
    for (var j = 0; j < arr.length - 1; j++) {
      //两两比较，如果前一个比后一个大，则交换位置。
      for (var i = 0; i < arr.length - 1 - j; i++) {
        if (arr[i].id > arr[i + 1].id) {
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    return arr
  },
  // 获取公告数据
  getNotices: function (id) {
    var parmas = {
      customerId: singles.customerId,
      appType: singles.appType,
      id: id
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(singles.env, '/act/eleven20/getRollNotice'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          if (res.data.length) {
            singles.setNotice(res.data)
          } else {
            setTimeout(function () {
              singles.getNotices(singles.liData.id)
            }, 10000)
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
  winPrize: function (data) {
    if (data.awardType == 0) {
      $('.allValue').addClass('popup')
      $('.aValue').addClass('popup')
      // 抽中钱
      $('.win-main1').removeClass('popup')
      $('.win-main2').addClass('popup')
      $('.win-main3').addClass('popup')
      $('.dress').addClass('popup')
      $('.look-diamond').removeClass('popup')
      if (singles.appType == 1) {
        $('.win-item1>span').text(data.amt + '聊币')
      } else {
        $('.win-item1>span').text(data.amt + '钻石')
      }
    } else if (data.awardType == 4) {
      // 抽中套装
      if (singles.appType == 1) {
        $('.allValue').removeClass('popup')
        $('.allValue>span').text(data.tryPrice)
      }
      $('.win-main1').addClass('popup')
      $('.win-main2').addClass('popup')
      $('.win-main3').removeClass('popup')
      $('.dress').removeClass('popup')
      $('.look-diamond').addClass('popup')
      $('.win-item3 img').attr('src', data.productView1)
      $('.win-item3 .award1').text(data.productName1.split('”')[0] + '”')
      $('.win-item3 .award2').text(data.productName1.split('”')[1])
      $('.win-item4 img').attr('src', data.productView2)
      $('.win-item4 .award1').text(data.productName2.split('”')[0] + '”')
      $('.win-item4 .award2').text(data.productName2.split('”')[1])
      $('.win-item5 img').attr('src', data.productView3)
      $('.win-item5 .award1').text(data.productName3.split('”')[0] + '”')
      $('.win-item5 .award2').text(data.productName3.split('”')[1])
    } else {
      // 抽中头像框/气泡/入场特效
      $('.allValue').addClass('popup')
      $('.win-main1').addClass('popup')
      $('.win-main2').removeClass('popup')
      $('.win-main3').addClass('popup')
      $('.dress').removeClass('popup')
      $('.look-diamond').addClass('popup')
      $('.aValue').removeClass('popup')
      if (singles.appType == 1) {
        $('.aValue>span').text(data.tryPrice)
      } else {
        $('.aValue').html('<span>&nbsp;</span>')
      }
      $('.win-item2 img').attr('src', data.productView1)
      $('.win-item2 .award1').text(data.productName1)
    }
  }
}
// 中奖记录
function toWinRecord() {
  if (!singles.appBool) {
    config.dialogComm($('#openApp'), 'openApp');
    return
  } else if (!singles.isLogin) {
    config.dialogComm($('#toLogin'), 'toLogin');
    return
  }
  setBodyHidden()
  var parmas = {
    customerId: singles.customerId,
    token: singles.token,
    pageSize: 100,
    page: 1
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(singles.env, '/act/eleven20/authApi/getAwardRecord'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        $('.record-main>ul').html('')
        var str
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].awardAmt == '0.00') {
            if (res.data[i].awardContent.indexOf('+') != -1) {
              str =
                '<li class="flexbox">' +
                '<div class="record-name">' +
                '<div>' + res.data[i].awardContent.split('+')[0] + '+</div>' +
                '<div>' + res.data[i].awardContent.split('+')[1] + '+</div>' +
                '<div>' + res.data[i].awardContent.split('+')[2] + '</div>' +
                '</div>' +
                '<div class="record-time">' + res.data[i].createTime + '</div>' +
                '</li>'
            } else {
              str =
                '<li class="flexbox">' +
                '<div class="record-name">' +
                res.data[i].awardContent +
                '</div>' +
                '<div class="record-time">' + res.data[i].createTime + '</div>' +
                '</li>'
            }
          } else {
            str =
              '<li class="flexbox">' +
              '<div class="record-name">' +
              res.data[i].awardAmt +
              '<span class="appUnit">聊币</span>' +
              '</div>' +
              '<div class="record-time">' + res.data[i].createTime + '</div>' +
              '</li>'
          }
          $('.record-main>ul').append(str)
          singles.diffApp()
        }
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      $config.yfAlert('网络异常')
    }
  })
  $(".page-man").bind('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
  }, { passive: false });
  $config.dialogComm($('#winRecord'), 'winRecord')
}
// 充值
function toRecharge() {
  layer.closeAll()
  if (!singles.appBool) {
    config.dialogComm($('#openApp'), 'openApp');
    return
  } else if (!singles.isLogin) {
    config.dialogComm($('#toLogin'), 'toLogin');
    return
  }
  setTimeout(function () {
    var ua = navigator.userAgent.toLowerCase();
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
    if (isIOS) {
      if (singles.appType == 2) {
        window.webkit.messageHandlers.jumpToCharge.postMessage(null)
      } else {
        var config = {
          customerId: singles.customerId,
          token: singles.token,
          isFrom: singles.isFrom,
        };
        var returnUrl = encodeURIComponent(window.location.href.split('?')[0] + '?' + $config.setQueryConfig(config));
        window.location.href = singles.reChargeURL + '?customerId=' + singles.customerId + '&isFrom=2&returnUrl=' + returnUrl
      }
    } else if (isAndroid) {
      if (singles.isRecharge && singles.appType == 2) {
        client.jumpToCharge()
      } else {
        $config.dialogComm($('#chargeTip'), 'chargeTip');
      }
    }
  }, 200)
}
function toLook() {
  // if (!singles.appBool) {
  //   config.dialogComm($('#openApp'), 'openApp');
  //   return
  // } else if (!singles.isLogin) {
  //   config.dialogComm($('#toLogin'), 'toLogin');
  //   return
  // }
  $config.dialogComm($('#lookAward'), 'lookAward')
  setBodyHidden()
}
function toClose() {
  layer.closeAll()
  setBodyScroll()
}
function setBodyHidden() {
  $('body').css({
    "overflow": "hidden",
    "height": '100%'
  })
  $('html').css({
    "overflow": "hidden",
    "height": '100%'
  })
}
function setBodyScroll() {
  $('body').css({
    "overflow": "scroll"
  })
  $('html').css({
    "overflow": "scroll"
  })
}
// 爆大奖抽奖
function openAward() {
  layer.closeAll()
  setTimeout(function () {
    singles.isRedPack = false
    var parmas = {
      customerId: singles.customerId,
      token: singles.token,
      type: 1
    }
    $.ajax({
      type: 'POST',
      url: $config.toUrl(singles.env, '/act/eleven20/authApi/receiveReward'),
      data: parmas,
      dataType: 'json',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.result) {
          singles.winPrize(res.data)
          $config.dialogComm($('#winning'), 'winning')
          if (singles.remainBigNum > 1) {
            $('.place-time').html('剩余' + --singles.remainBigNum + '名')
          } else {
            $('.place-time').html('已开启')
          }
          if ($('.record-btn').hasClass('popup')) {
            $('.record-btn').removeClass('popup')
          }
        } else {
          if (res.code == '-20') {
            // 未中奖
            $config.dialogComm($('#placesNo'), 'placesNo')
            $('.place-time').html('已开启')
          } else {
            $config.yfAlert(res.message)
          }
        }
      },
      error: function (error) {
        $config.yfAlert('网络异常')
      }
    })
  }, 200)
}
// 红包抽奖
function doLottery(that) {
  if (!singles.appBool) {
    config.dialogComm($('#openApp'), 'openApp');
    return
  } else if (!singles.isLogin) {
    config.dialogComm($('#toLogin'), 'toLogin');
    return
  }
  if (singles.isEnd) {
    layer.msg('活动已结束')
    return
  }
  if (singles.isDo) {
    return
  }
  singles.isDo = true
  if (singles.remainNum > 0) {
    $(that).siblings('.pack-item').fadeOut('slow', function () {
      $(that).addClass('rotate')
    })
    setTimeout(function () {
      $(that).fadeOut()
      var parmas = {
        customerId: singles.customerId,
        token: singles.token,
        type: 0
      }
      $.ajax({
        type: 'POST',
        url: $config.toUrl(singles.env, '/act/eleven20/authApi/receiveReward'),
        data: parmas,
        dataType: 'json',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.result) {
            singles.winPrize(res.data)
            $config.dialogComm($('#winning'), 'winning')
            singles.remainNum--
            if ($('.record-btn').hasClass('popup')) {
              $('.record-btn').removeClass('popup')
            }
          } else {
            $config.yfAlert(res.message)
          }
          $('.lottery-chance span').text(singles.remainNum)
          $('.pack-item').css('display', 'block')
          $(that).removeClass('rotate').fadeIn('fast')
          console.log($(that));
          if (singles.remainNum < 1) {
            $('.lottery-chance').addClass('gray')
            $('.chance-icon').css('background', 'gray')
          }
        },
        error: function (error) {
          $config.yfAlert('网络异常')
        }
      })
      singles.isDo = false
    }, 3000)
  } else {
    $config.dialogComm($('#rechargeHint'), 'rechargeHint')
    singles.isDo = false
  }
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
// 分享
function shareTc() {
  var img = "http://miyiurl.rklive888.com/activities/single/dev/image/share_boy.png",
    title = '疯狂11.11，天天中大奖',
    subTitle = '这简单粗暴的福利！别说话，用心去感受~';
  shareComm(img, title, subTitle)
}
singles.init()
