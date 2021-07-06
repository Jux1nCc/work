var report = {
  env: 'prod',
  customerId: $config.getQueryStringByName("customerId"),
  token: $config.getQueryStringByName("token"),
  appType: $config.getQueryStringByName("appType") || 2,
  swiper: null,
  inviteCode: null,
  isgetData: null,
  appBool: openInWebview(),
  app: [{
    name: '兔聊',
    downloadUrl: 'https://www.expertol.cn/',
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
    report.playMusic()
    report.diffApp()
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (!report.appBool || isWeixin) {
      if(report.appType == 2){
        $('#openOutApp').addClass('miyi')
      }else {
        $('#openOutApp').addClass('tuliao')
      }
      config.dialogComm($('#openOutApp'), 'openOutApp');
      document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, { passive: false });
      return
    }
    report.created()
  },
  created: function () {
    var parmas = {
      customerId: report.customerId,
      token: report.token,
      page: 1
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(report.env, '/act/bill2021/authApi/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          report.inviteCode = res.data.inviteCode
          report.appType = res.data.staffFlag
          report.mounted(res.data, 1)
          report.showSwiper()
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
  mounted: function (data, type) {
    var str, str1, str2, str3, str4, str5, str6, str7;
    var str6Gift = ''
    if (data.sex == 1) {
      $('.wrap .contain').addClass('boy')
      $('.wrap .contain-1').addClass('boy')
      $('.wrap .contain-2').addClass('boy')
      $('.wrap .contain-3').addClass('boy')
      $('.wrap .contain-4').addClass('boy')
      $('.wrap .contain-6').addClass('boy')
      if (type == 1) {
        if (data.browseCout == 0 && data.chatedCount == 0) {
          str2 =
            '<span>你的足迹常常出现在' + data.rand + '榜</span>' +
            '<span>是不是被小姐姐们的颜值</span>' +
            '<span>吸引了呢?</span>' +
            '<span>喜欢一定要主动搭讪哦!</span>'
        } else {
          if (data.chatedCount == 0) {
            str2 =
              '<span>这一年,</span>' +
              '<span>你对<span class="youshe-red">' + data.browseCout + '</span>个小姐姐产生了好感,</span>' +
              '<span>赶快主动撩她哦,</span>' +
              '<span>小姐姐们都是很抢手的呢。</span>'
          } else if (data.browseCout != 0 && data.chatedCount != 0) {
            str2 =
              '<span>这一年,</span>' +
              '<span>你对<span class="youshe-red">' + data.browseCout + '</span>位小姐姐产生了好感,</span>' +
              '<span>其中有<span class="youshe-red">' + data.chatedCount + '</span>位也喜欢了你,</span>' +
              '<span>缘分说不定就在里面哦!</span>'
          }
        }
        if (moment(data.registerDate).valueOf() < moment('2020-12-25').valueOf()) {
          str = '时间总是匆匆，在<span class="appName">觅伊</span>的这一年，是不是过得不太一样？'
          $('.contain-1').remove()
          if (data.browseCout == 0 && data.chatedCount != 0) {
            str2 =
              '<span>在<span class="appName">觅伊</span>的这一年,</span>' +
              '<span>有' + data.chatedCount + '位小姐姐喜欢了你哟,</span>' +
              '<span>里面有没有你喜欢的呢?</span>'
          }
        } else {
          str = '时间总是匆匆，在2020年即将过去之际，<span class="appName">觅伊</span>的小姐姐们很高兴看到你来啦！'
          $('.contain p').addClass('later')
          str1 = '<span class="youshe-red register-date">' +
            data.registerDate.split(' ')[0].split('-')[1] + '月' +
            data.registerDate.split(' ')[0].split('-')[2] + '日,' +
            '</span>' +
            '<span>你注册了<span class="appName">觅伊</span>,</span>' +
            '<span>开启你的撩妹男神之路。</span>'
          if (data.browseCout == 0 && data.chatedCount != 0) {
            str2 =
              '<span>刚来<span class="appName">觅伊</span>不久,</span>' +
              '<span>有' + data.chatedCount + '位小姐姐喜欢了你哟,</span>' +
              '<span>里面有没有你喜欢的呢?</span>'
          }
        }
        if (data.callNum == 0) {
          if (moment(data.registerDate).valueOf() < moment('2020-12-25').valueOf()) {
            str3 =
              '<span>在<span class="appName">觅伊</span>的这一年,</span>' +
              '<span>你有点羞涩,</span>' +
              '<span>还没有跟小姐姐谈过心哦!</span>' +
              '<span>不如今天就勇敢迈出第一步,</span>' +
              '<span>去找心动女生聊天吧!</span>'
          } else {
            str3 =
              '<span>刚来<span class="appName">觅伊</span>的你有点羞涩呢,</span>' +
              '<span>还没有跟小姐姐谈过心哦!</span>' +
              '<span>不如今天就勇敢迈出第一步,</span>' +
              '<span>去找心动女生聊天吧!</span>'
          }
        } else {
          if (data.callNum > 1) {
            str3 =
              '<span>你和' + data.callNum + '位小姐姐谈过情,</span>' +
              '<span>其中和你聊得最畅快的是</span>' +
              '<span class="youshe-red"><span class="appName">觅伊</span>号' + data.callOpCustomerId.split(',')[0] + '</span>' +
              '<span>的小姐姐,</span>' +
              '<span>你们的缘分值很高哦!</span>'
          } else {
            str3 =
              '<span>这一年你只钟情于</span>' +
              '<span class="youshe-red"><span class="appName">觅伊</span>号' + data.callOpCustomerId.split(',')[0] + '</span>' +
              '<span>的小姐姐,</span>' +
              '<span>和她一共通话' + data.callSecond + '秒。</span>' +
              '<span>你们的缘分</span>' +
              '<span>会在2021年延续吗?</span>'
          }
        }
        if (data.loginNum == 0){
          $('.contain-4').remove()
        }
        $('.contain-5').remove()
        $('.contain-7').remove()
      }
      else {
        if (data.loginNum != 0) {
          str4 =
            '<span class="youshe-red">' + data.loginTime.split(' ')[0].split('-')[1] + '月' + data.loginTime.split(' ')[0].split('-')[2] + '日</span>' +
            '<span>是哪位小姐姐</span>' +
            '<span>让你依依不舍呢?</span>' +
            '<span>在深夜' + data.loginTime.split(' ')[1].split(':')[0] + '点还在觅伊聊天。</span>'
          $('.contain-4 .youshe').html(str4)
        }
        str6 = '<span>你最喜欢的礼物是</span>'
        if (!data.giftName) {
          str6Gift += '<img src="images/flower.png" class="gift-item">'
        } else {
          if (data.giftName.split(',').length > 1) {
            for (var i = 0; i < data.giftName.split(',').length; i++) {
              str6Gift += '<img src="' + data.giftName.split(',')[i] + '"  class="gift-item">'
            }
          } else if (data.giftName.split(',').length == 1) {
            str6Gift += '<img src="' + data.giftName + '"  class="gift-item">'
          }
        }
      }
    } else {
      $('.wrap .contain').addClass('girl')
      if (type == 1) {
        if (moment(data.registerDate).valueOf() < moment('2020-12-25').valueOf()) {
          str = '时间总是匆匆，在<span class="appName">觅伊</span>的这一年，是不是过得不太一样？'
          str1 =
            '<span class="youshe-red register-date">' +
            data.registerDate.split(' ')[0].split('-')[0] + '年' +
            data.registerDate.split(' ')[0].split('-')[1] + '月' +
            data.registerDate.split(' ')[0].split('-')[2] + '日,' +
            '</span>' +
            '<span>你第一次走进<span class="appName">觅伊</span>,</span>' +
            '<span><span class="appName">觅伊</span>和你度过了' +
            parseInt((moment('2020-12-31 23:59').valueOf() - moment(data.registerDate).valueOf()) / 60000) +
            '分钟。</span>'
        } else {
          str = '时间总是匆匆，在2020年即将过去之际，<span class="appName">觅伊</span>的小哥哥们很高兴看到你来啦！'
          $('.contain p').addClass('later')
          str1 = '<span class="youshe-red register-date">' +
            data.registerDate.split(' ')[0].split('-')[1] + '月' +
            data.registerDate.split(' ')[0].split('-')[2] + '日,' +
            '</span>' +
            '<span>你注册了<span class="appName">觅伊</span>,</span>' +
            '<span>开启了你的撩汉女神之路。</span>'
        }
        if (data.browseCout == 0 && data.chatedCount == 0) {
          str2 =
            '<span>你的足迹常常出现在' + data.rand + '榜</span>' +
            '<span>是不是还比较羞涩呢?</span>' +
            '<span>喜欢一定要主动搭讪哦!</span>'
        } else {
          if (data.browseCout == 0) {
            str2 =
              '<span>这一年,</span>' +
              '<span>有<span class="youshe-red">' + data.chatedCount + '</span>个小哥哥喜欢了你哟,</span>' +
              '<span>女神潜力股说的就是你吧?</span>'
          } else if (data.chatedCount == 0) {
            str2 =
              '<span>你对<span class="youshe-red">' + data.browseCout + '</span>个小哥哥产生了好感,</span>' +
              '<span>赶快主动撩他哦,</span>' +
              '<span><span class="appName">觅伊</span>的男神</span>' +
              '<span>都喜欢主动的女生哦。</span>'
          } else {
            str2 =
              '<span>这一年,</span>' +
              '<span>你一共聊了<span class="youshe-red">' + data.browseCout + '</span>个男神,</span>' +
              '<span>其中有<span class="youshe-red">' + data.chatedCount + '</span>位也喜欢了你,</span>' +
              '<span>女神潜力股就是你了!</span>'
          }
        }
        if (data.callNum == 0) {
          str3 =
            '<span>这一年的你有点羞涩呢,</span>' +
            '<span>还没有跟小哥哥谈过情哦,</span>' +
            '<span>不如今天就勇敢迈出第一步,</span>' +
            '<span>去找心动的男神聊天吧!</span>'
          $('.contain-3 .youshe').css('height', '3.78rem')
        } else {
          if (data.callOpCustomerId.split(',').length == 1) {
            str3 =
              '<span class="youshe-red"><span class="appName">觅伊</span>号' + data.callOpCustomerId + '</span>' +
              '<span>的小哥哥</span>' +
              '<span>和你通话<span class="youshe-red">' + data.callSecond + '</span>秒,</span>' +
              '<span>是最舍不得你的</span>' +
              '<span>一位小哥哥哟。</span>'
            $('.contain-3 .youshe').css('height', '4.88rem')
          } else {
            var strCustomerId = ''
            for (var i = 0; i < data.callOpCustomerId.split(',').length; i++) {
              strCustomerId += '<span>' + data.callOpCustomerId.split(',')[i] + '</span>'
              console.log(strCustomerId);
            }
            str3 =
              '<span>这一年,</span>' +
              '<span>你一共进行了</span>' +
              '<span>语音和视频聊天共<span class="youshe-red">' + data.callNum + '</span>分钟</span>' +
              '<span>其中和你聊得最畅快的是,</span>' +
              '<span><span class="appName">觅伊</span>号</span>' + strCustomerId +
              '<span>的小哥哥。</span>'
          }
        }
        if (data.gainAmt == 0 || !data.payCustomerId) {
          $('.contain-4').remove()
        }
      } else {
        if (data.gainAmt != 0 && !!data.payCustomerId) {
          str4 =
            '<span>这一年,</span>' +
            '<span>你在<span class="appName">觅伊</span>共收获了' +
            '<span class="youshe-red">' + data.gainAmt + '</span><span class="appUnit">钻石</span></span>' +
            '<span>其中对你最钟情的是</span>' +
            '<span><span class="appName">觅伊</span>号' +
            '<span class="youshe-red">' + data.payCustomerId + '</span></span>' +
            '<span>的小哥哥,</span>' +
            '<span>他陪伴了你<span class="youshe-red">' + (data.payChatDays * 180) + '</span>分钟,</span>' +
            '<span>是你忠实的守护者呢。</span>'
        }
        if (!data.liveDuration) {
          str5 =
            '<span>热闹的直播广场,</span>' +
            '<span>还未见你的踪影,</span>' +
            '<span>这一年还没开启直播,</span>' +
            '<span>可知道好多小哥哥都在等着你呢?</span>'
        } else {
          if (data.liveAnchorLevel >= 15) {
            str5 =
              '<span>这一年你直播了<span class="youshe-red">' + data.liveDuration + '</span>小时,</span>' +
              '<span>累积了<span class="youshe-red">' + data.liveStarValue + '</span>星光值,</span>' +
              '<span>达到了<span class="youshe-red">' + data.liveAnchorLevel + '</span>级。</span>' +
              '<span>有这么多小哥哥</span>' +
              '<span>蹲守你的直播间,</span>' +
              '<span>2021年要继续发光发热哦!</span>'
          } else if (data.liveAnchorLevel < 11) {
            str5 =
              '<span>这一年你直播了<span class="youshe-red">' + data.liveDuration + '</span>小时,</span>' +
              '<span>累积了<span class="youshe-red">' + data.liveStarValue + '</span>星光值,</span>' +
              '<span>达到了<span class="youshe-red">' + data.liveAnchorLevel + '</span>级。</span>' +
              '<span>作为直播小萌新</span>' +
              '<span>2021年</span>' +
              '<span>有很大的进步空间哦!</span>'
          } else {
            str5 =
              '<span>这一年你直播了<span class="youshe-red">' + data.liveDuration + '</span>小时,</span>' +
              '<span>累积了<span class="youshe-red">' + data.liveStarValue + '</span>星光值,</span>' +
              '<span>达到了<span class="youshe-red">' + data.liveAnchorLevel + '</span>级。</span>' +
              '<span>好棒!</span>' +
              '<span>你离<span class="appName">觅伊</span>大主播</span>' +
              '<span>又进一步了呢!</span>'
          }
        }
        if (data.giftCustomers > 0) {
          str6 =
            '<span>这一年,</span>' +
            '<span>有<span class="youshe-red">' + data.giftCustomers + '</span>个小哥哥,</span>' +
            '<span>送了你<span class="youshe-red">' + data.giftNum + '</span>个礼物,</span>' +
            '<span>相当于<span class="youshe-red">' + data.giftTradeAmt + '</span>个<span class="appUnit">钻石</span>哦。</span>' +
            '<span>其中你的幸运礼物是</span>'
        } else {
          $('.contain-6 .gift').addClass('popup')
          str6 =
            '<span>作为小萌新,</span>' +
            '<span>你暂时还没在<span class="appName">觅伊</span>收获礼物。</span>' +
            '<span>不妨今天就去和小哥哥聊天吧,</span>' +
            '<span>聊天就有收获哦。</span>'
        }
        if (!data.giftName) {
          $('.contain-6 .gift').addClass('popup')
        } else {
          if (data.giftName.split(',').length > 1) {
            for (var i = 0; i < data.giftName.split(',').length; i++) {
              str6Gift += '<img src="' + data.giftName.split(',')[i] + '"  class="gift-item">'
            }
          } else {
            str6Gift += '<img src="' + data.giftName + '"  class="gift-item">'
          }
        }
        if (data.specialDay > 0) {
          str7 =
            '<span>这一年,</span>' +
            '<span>你被推荐了<span class="youshe-red">' + data.specialDay + '</span>次,</span>' +
            '<span>击败了全平台<span class="youshe-red">' + data.specialTate + '%</span>的女生,</span>' +
            '<span>如此优秀的你</span>' +
            '<span>一定要继续保持哦。</span>'
        } else {
          str7 =
            '<span>新的一年,</span>' +
            '<span>相信如此努力的你</span>' +
            '<span>会在2021年</span>' +
            '<span>成功上' + (data.staffFlag == 2 ? '魅力' : '推荐') + '榜哒!</span>'
        }
        $('.contain-5 .youshe').html(str5)
        $('.contain-7 .youshe').html(str7)
        $('.contain-4 .youshe').html(str4)
      }
    }
    $('.contain p').html(str)
    $('.contain-1 .youshe').html(str1)
    $('.contain-2 .youshe').html(str2)
    $('.contain-3 .youshe').html(str3)
    $('.contain-6 .youshe').html(str6)
    $('.contain-6 .gift').html(str6Gift)
    $('.contain-keyword .keyword').text(data.keyWord)
    report.diffApp()
  },
  diffApp: function () {
    if (report.appType == 2) {
      $('.appName').text('觅伊')
      $('.appUnit').text('钻石')
      $('title').text('觅伊年度报告')
    } else {
      $('.appName').text('兔聊')
      $('.appUnit').text('聊币')
      $('title').text('兔聊年度报告')
    }
  },
  getData: function () {
    if (report.isgetData) {
      return
    }
    var parmas = {
      customerId: report.customerId,
      token: report.token,
      page: 2
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(report.env, '/act/bill2021/authApi/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          report.isgetData = true
          report.mounted(res.data, 2)
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
  showSwiper() {
    report.swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
    })
    report.swiper.on('slideChangeTransitionEnd', function () {
      if (report.swiper.activeIndex == 2) {
        report.getData()
      }
    });
  },
  playMusic() {
    var voice = document.getElementById('voice');
    voice.play();
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
      voice.play();
    } else {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", function () {
          voice.play();
        }, false);
      }
    }
    var voiceStatus = true;
    document.addEventListener("touchstart", function (e) {
      if (voiceStatus) {
        voice.play();
        voiceStatus = false;
      }
    }, false);
  }
}
function shareTc() {
  var img = 'http://miyiurl.rklive888.com/activities/appReport/share_bg.png',
    title = '你的' + (report.appType == 2 ? '觅伊' : '兔聊') + '年度报告来袭，点击查看！',
    subtitle = '这一年，谁是你的忠实守护者，谁又是你最倾心的人？查看报告，一目了然！';
  var url = window.document.location.href.split('?')[0] + '?appType=' + report.appType;
  var sharingState = 4;
  if (browser.versions.android) {
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
    if (report.appType == 2) {
      window.location.href = report.app[1]['downloadUrl']
    } else {
      window.location.href = report.app[0]['downloadUrl']
    }
  } else {
    if (report.appType == 2) {
      var data = OpenInstall.parseUrlParams();
      new OpenInstall({
        appKey: 'c6xjxt',
        onready: function () {
          var m = this;
          m.schemeWakeup();
          m.wakeupOrInstall();
        }
      })
    } else {
      window.location.href = report.app[0]['downloadUrl']
    }
  }
}
function goToBack() {
  parent.WeixinJSBridge.call("closeWindow")
}
report.init()
window.onload = function () {
  setTimeout(function () {
    var ImgArr = ['contain_boy', 'contain_girl', 'arrow_1', 'arrow_2', 'contain1_girl', 'contain2_girl', 'contain3_girl', 'contain4_girl', 'contain5_girl', 'contain6_girl', 'contain7_girl', 'keyword', 'white_bg', 'share']
    for (var i = 0; i < ImgArr.length; i++) {
      (function (num) {
        var img = new Image()
        img.src = './images/' + ImgArr[num] + '.png'
        img.onload = function () {
          $($('.cssImg')[i]).css("background-image", "url(./images/" + ImgArr[num] + ".png)")
        }
      })(i)
    }
  }, 1000);
}; 