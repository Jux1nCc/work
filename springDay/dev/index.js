var spring = {
  env: 'demo',
  customerId: $config.getQueryStringByName("customerId"),
  token: $config.getQueryStringByName("token"),
  isFrom: $config.getQueryStringByName("isFrom"),
  appType: $config.getQueryStringByName("appType") || 2,
  photoUrlObj: [],
  customerIdObj: [],
  nickNameObj: [],
  hasPosition: [],
  domPool: [],
  danmuPool: [],
  MAX_DM_COUNT: 40,
  CHANNEL_COUNT: 5,
  page: 1,
  pageSize: 15,
  ranks: null,
  chats: [],
  timeID: null,
  messageNum: 0,
  inputValueMsg: '',
  errorMsg: '您当前没有留言条数，累积新年旺旺值达1000就能留言啦！',
  nickName:'',
  photoURL:'',
  isLogin: true, //是否登录
  isEnd: false,  //是否结束
  appBool: openInWebview(),// 是否app外打开
  maxId: 0, // 留言id
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
    downloadUrl: 'http://mygw.rklive888.com/',
    appKey: 'c6xjxt',
    vipName: '贵族',
    util: '钻石',
    title: '找对象 上觅伊',
    textContent: '6000万人都在玩的交友APP',
    umImage1: 'https://jw-yunying.oss-cn-shenzhen.aliyuncs.com/share/image/defaultShare.jpg'
  }],
  init: function () {
    spring.diffApp()
    config.lazyLoad('.lazy-img')
    spring.createdWish()
  },
  diffApp: function () {
    if ($config.browser.versions.android) {
      $('.isApple').addClass('popup')
    }else {
      $('input').addClass('input-top')
    }
    if (spring.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appName').text('兔聊')
      $('.appDress').text('我-更多-个性商城-已有装扮')
      $('.tuliaoUnit').removeClass('popup')
      $('.miyiUnit').addClass('popup')
    } else {
      $('.appUnit').text('钻石')
      $('.appName').text('觅伊')
      $('.appDress').text('我-个性装扮')
      $('.tuliaoUnit').addClass('popup')
      $('.miyiUnit').removeClass('popup')
    }
  },
  initDanmu: function () {
    var wrapper = document.getElementById('wishMain')
    for (let j = 0; j < spring.CHANNEL_COUNT; j++) {
      let doms = [];
      for (let i = 0; i < spring.MAX_DM_COUNT; i++) {
        let dom = document.createElement('div');
        wrapper.appendChild(dom);
        dom.className = 'right';
        dom.style.top = j * 0.9 + 0.2 + 'rem';
        doms.push(dom);
        dom.addEventListener('transitionend', function () {
          dom.style.transform = `translateX(${(-dom.children[0].children[0].clientWidth) / 17}rem)`;
          setTimeout(function(){
            dom.className = 'right';
            dom.style.transform = null;
            spring.domPool[j].push(dom);
          },1500)
        });
      }
      spring.domPool.push(doms);
    }
    for (var k = 0; k < spring.CHANNEL_COUNT; k++) {
      spring.hasPosition[k] = true;
    }
  },
  getChannel: function () {
    for (var i = 0; i < spring.CHANNEL_COUNT; i++) {
      if (spring.hasPosition[i] && spring.domPool[i].length) return i;
    }
    return -1;
  },
  shootDanmu: function (dom, text, channel, photoUrl, customerId, nickName) {
    var str =
      '<div class="danmu-item color' + parseInt(Math.random() * 3) + '">' +
      '<span class="item-text">' + nickName + ': ' + text + '</span>' +
      '<div class="item-photo" onclick="toHome(' + customerId + ')">' +
      '<img src="' + photoUrl + '">' +
      '</div>' +
      '</div>'
    dom.innerHTML = str
    dom.style.transform = `translateX(${(-dom.children[0].children[0].clientWidth) / 100}rem)`;
    dom.className = 'left';
    spring.hasPosition[channel] = false;
    setTimeout(function () {
      spring.hasPosition[channel] = true;
      spring.messageNum++
      if (spring.messageNum >= 200) {
        clearInterval(spring.timeID)
      }
    }, dom.children[0].children[0].clientWidth * 10 + 2500);
  },
  getMessage: function () {
    var parmas = {
      customerId: spring.customerId,
      id: spring.maxId
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(spring.env, '/act/spring2021/getLeaveInfo'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          spring.maxId = res.data.maxId
          spring.chats = res.data.chats
          spring.mountedMessage(res.data)
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        layer.msg('网络异常')
      }
    })
  },
  mountedMessage: function (data) {
    for (var j = 0; j < 2; j++) {
      spring.chats.push(...data.chats)
    }
    for (var i = 0; i < spring.chats.length; i++) {
      spring.photoUrlObj.push(spring.chats[i].photo + '?x-oss-process=image/resize,w_200')
      spring.danmuPool.push(spring.chats[i].chatContent)
      spring.nickNameObj.push(spring.chats[i].nickName)
      spring.customerIdObj.push(spring.chats[i].customerId)
    }
    spring.initDanmu();
    spring.timeID = setInterval(function () {
      var channel;
      if (spring.danmuPool.length && (channel = spring.getChannel()) != -1) {
        var danmuDom = spring.domPool[channel].shift();
        var danmuText = spring.danmuPool.shift();
        var danmuPhotoUrl = spring.photoUrlObj.shift()
        var danmuCustomerId = spring.customerIdObj.shift()
        var danmuNickName = spring.nickNameObj.shift()
        spring.shootDanmu(danmuDom, danmuText, channel, danmuPhotoUrl, danmuCustomerId, danmuNickName);
      }
    }, 1);
  },
  createdWish: function () {
    var parmas = {
      customerId: spring.customerId,
      token: spring.token,
      isFrom: spring.isFrom,
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(spring.env, '/act/spring2021/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          // 是否登录及是否app外打开
          if(res.data.appType){
            spring.appType = res.data.appType
          }
          spring.isLogin = res.data.isLogin
          spring.isEnd = res.data.isEnd
          if (!spring.appBool) {
            $('.mine-rank').addClass('popup')
            $config.dialogComm($('#openOutApp'), 'openOutApp')
            return
          } else if (!spring.isLogin) {
            $('.mine-rank').addClass('popup')
            $config.dialogComm($('#isLogin'), 'isLogin')
            return
          }
          if (res.data.isEnd) {
            layer.msg('活动已结束')
            $('.join-btn').addClass('popup')
          } else {
            if (res.data.isJoined) {
              $('.join-btn').addClass('popup')
            } else {
              $config.dialogComm($('#joinAct'), 'joinAct')
            }
          }
          spring.mountedWish(res.data)
          spring.diffApp()
        } else {
          if (res.code == '-100') {
            layer.msg(res.message, {
              time: false,
              shade: 0.5
            })
            document.body.addEventListener(
              'touchmove',
              function (e) {
                e.preventDefault() //阻止默认的处理方式(阻止下拉滑动的效果)
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
  createdPack: function () {
    // if (spring.appType == 1) {
    //   $('.get-award').css('margin', '.2rem auto')
    // }
    if (!spring.appBool) {
      $config.dialogComm($('#openOutApp'), 'openOutApp')
      return
    } else if (!spring.isLogin) {
      $config.dialogComm($('#isLogin'), 'isLogin')
      return
    }
    var parmas = {
      customerId: spring.customerId,
      token: spring.token,
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(spring.env, '/act/spring2021/authApi/getRedPacketInfo'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          spring.mountedPack(res.data)
          spring.diffApp()
        } else {
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        layer.msg('网络异常')
      }
    })
  },
  getNickName: function(){
    var parmas = {
      customerId: spring.customerId,
      type: 1,
      page: 1,
      pageSize: 15
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(spring.env, '/act/spring2021/getActRank'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          spring.nickName = res.data.nickName
          spring.photoURL = res.data.photo + '?x-oss-process=image/resize,w_200'
        }
      }
    })
  },
  createdRank: function (type) {
    if (!spring.appBool) {
      $config.dialogComm($('#openOutApp'), 'openOutApp')
      return
    } else if (!spring.isLogin) {
      $config.dialogComm($('#isLogin'), 'isLogin')
      return
    }
    var parmas = {
      customerId: spring.customerId,
      type: type,
      page: spring.page,
      pageSize: spring.pageSize
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(spring.env, '/act/spring2021/getActRank'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          scrollEvent()
          spring.ranks = res.data.ranks
          spring.mountedRank(res.data, type)
          spring.diffApp()
        } else {
          $('.mine-rank').hide()
          $config.yfAlert(res.message)
        }
      },
      error: function (error) {
        $('.mine-rank').hide()
        layer.msg('网络异常')
      }
    })
  },
  mountedWish: function (data) {
    $('.wn-num').text(data.chatNum)
    $('.wan-num').text(data.useChatNum)
    spring.getMessage()
    spring.isInput()
    spring.getNickName()
  },
  mountedPack: function (data) {
    $('.box-num').text(data.boxNum)
    $('.next-box-num').text(data.nextBoxNum)
    var str, packAward = data.redPacketAwards
    if (packAward.length > 0) {
      $('.empty').addClass('popup')
      for (var i = 0; i < packAward.length; i++) {
        str = '<div class="award-item">' +
          '<div class="award-photo"><img src="' + packAward[i].remark + '?x-oss-process=image/resize,w_200" alt=""></div>' +
          '<div class="award-type">' + packAward[i].awardContent2 + '</div>' +
          '<div class="award-name">' + packAward[i].awardContent + '</div>' +
          '</div>'
        $('.award-wrap').append(str)
      }
    }
  },
  mountedRank: function (data, type) {
    $('.mr-name').text(data.nickName)
    $('.mr-photo img').attr('src', data.photo + '?x-oss-process=image/resize,w_200')
    $('.mrv-value').text(spring.fmoney(data.actNum))
    if (data.rank) {
      if (data.rank > 99) {
        $('.mr-num').text('99+')
      } else {
        $('.mr-num').text(data.rank)
      }
    }
    if (spring.ranks.length > 0) {
      $('.rank-item ul').html('')
      for (var i = 0; i < spring.ranks.length; i++) {
        var str =
          '<li class="li-item flexbox">' +
          '<div class="li-num">' +
          ((i < 3) ? '<img src="images/' + (i + 1) + '.png">' : (i + 1)) +
          '</div>' +
          '<div class="li-photo"' + (type == 2 ? 'onclick="toHome(' + spring.ranks[i].customerId + ')"' : '') + '>' +
          '<div class="photo-item">' +
          '<img src="' + spring.ranks[i].photo + '?x-oss-process=image/resize,w_200" alt="头像">' +
          '</div>' +
          ((i < 3) ? '<div class="head-pic' + (i + 1) + '"></div>' : '') +
          '</div>' +
          '<div class="li-name">' + spring.ranks[i].nickName + '</div>' +
          '<div class="li-value">' + spring.fmoney(spring.ranks[i].actNum) + '</div>' +
          '</li>'
        $('.rank-item ul').append(str)
      }
      if (spring.ranks.length >= 15) {
        $('.rank-item ul').append(
          '<li class="look-more" onclick="lookMore(this,' + type + ')">点击查看更多<img src="./images/arrow.png"></li>'
        )
      }
    }else {
      var str = '<li class="li-item flexbox"><div class="li-num"><img src="images/1.png" alt="第一名"></div><div class="li-photo"><div class="photo-item"><img src="images/user.png" alt="头像"></div><div class="head-pic1 lazy-img" data-src="./images/no1.png"></div></div><div class="li-name">虚位以待</div><div class="li-value">暂无</div></li><li class="li-item flexbox"><div class="li-num"><img src="images/2.png" alt="第二名"></div><div class="li-photo"><div class="photo-item"><img src="images/user.png" alt="头像"></div><div class="head-pic2 lazy-img" data-src="./images/no2.png"></div></div><div class="li-name">虚位以待</div><div class="li-value">暂无</div></li><li class="li-item flexbox"><div class="li-num"><img src="images/3.png" alt="第三名"></div><div class="li-photo"><div class="photo-item"><img src="images/user.png" alt="头像"></div><div class="head-pic3 lazy-img" data-src="./images/no3.png"></div></div><div class="li-name">虚位以待</div><div class="li-value">暂无</div></li><li class="li-item flexbox"><div class="li-num">4</div><div class="li-photo"><div class="photo-item"><img src="images/user.png" alt="头像"></div></div><div class="li-name">虚位以待</div><div class="li-value">暂无</div></li><li class="li-item flexbox"><div class="li-num">5</div><div class="li-photo"><div class="photo-item"><img src="images/user.png" alt="头像"></div></div><div class="li-name">虚位以待</div><div class="li-value">暂无</div></li>'
      $('.rank-item ul').html(str)
    }
    showEllipsis($('.mr-name'))
    showEllipsis($('.li-name'))
  },
  fmoney: function (s) {
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    var l = s.split(".")[0].split("").reverse();
    t = "";
    for (i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("");
  },
  isInput: function () {
    if (spring.isEnd) {
      return
    }
    var parmas = {
      customerId: spring.customerId,
      token: spring.token,
      content: ''
    }
    $.ajax({
      type: 'POST',
      url: $config.toUrl(spring.env, '/act/spring2021/authApi/sendLeaveMsg'),
      data: parmas,
      dataType: 'json',
      Header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.result) {
          $('.input-text').addClass('popup')
          $('input').removeClass('popup')
        } else {
          $('.input-text').removeClass('popup')
          $('input').addClass('popup')
          spring.errorMsg = res.message
        }
      },
      error: function (error) {
        console.log('网络异常');
      }
    })
  }
}
function changeNav(type, that) {
  $(that).addClass('nav1').removeClass('nav2').siblings('div').addClass('nav2').removeClass('nav1')
  switch (type) {
    case 1:
      $('.wish-wrap').removeClass('popup')
      $('.cloud').removeClass('popup')
      $('.foot1').removeClass('popup')
      $('.redpack-wrap').addClass('popup')
      $('.rule-btn').addClass('popup')
      $('.rank-wrap').addClass('popup')
      $('.foot2').addClass('popup')
      window.location.reload()
      break;
    case 2:
      $('.wish-wrap').addClass('popup')
      $('.cloud').addClass('popup')
      $('.foot1').removeClass('popup')
      $('.redpack-wrap').removeClass('popup')
      $('.rule-btn').addClass('popup')
      $('.rank-wrap').addClass('popup')
      $('.foot2').addClass('popup')
      spring.createdPack()
      break;
    case 3:
      $('.wish-wrap').addClass('popup')
      $('.cloud').addClass('popup')
      $('.foot1').addClass('popup')
      $('.redpack-wrap').addClass('popup')
      $('.rule-btn').removeClass('popup')
      $('.rank-wrap').removeClass('popup')
      $('.foot2').removeClass('popup')
      spring.createdRank(2)
      break;
  }
}
function changeRankNav(type, that) {
  $(that).removeClass('rn-nav').siblings('.rn-item').addClass('rn-nav')
  if (type == 1) {
    $('.ri-text .white').text('送出的')
  } else {
    $('.ri-text .white').text('收到的')
  }
  spring.createdRank(type)
}
function openKeyUp() {
  if(spring.isEnd){
    layer.msg('活动已结束')
    return
  }
  if (!spring.appBool) {
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!spring.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  $config.yfAlert(spring.errorMsg)
}
function openKey() {
  $('.send-btn').removeClass('disable')
}
function closeKey() {
  if (!$('input').val().trim()) {
    $('.send-btn').addClass('disable')
  }
}
function joinAct(that) {
  if (!spring.appBool) {
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!spring.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  var parmas = {
    customerId: spring.customerId,
    token: spring.token,
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(spring.env, '/act/spring2021/authApi/receiveReward'),
    data: parmas,
    dataType: 'json',
    Header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.result) {
        if (that) {
          $(that).removeClass('animation').addClass('smaller')
          setTimeout(function () {
            $(that).fadeOut()
            $('#joinAward .dja-name').text(res.data.productName)
            $('#joinAward .dja-fir .dja-pic img').attr('src', res.data.productView1)
            $('#joinAward .dja-sec .dja-pic img').attr('src', res.data.productView2)
            if (spring.appType == 2) {
              $('#joinAward .dja-sec .dja-type').text('气泡、直播评论边框、直播弹幕边框x15天').addClass('dig-small-font')
            }
            if(spring.isFrom = 'h5'){
              $('.layui-layer.layui-layer-page.joinAct').css('top','5% !important')
            }
            $config.dialogComm($('#joinAward'), 'joinAward')
          }, 500)
        } else {
          layer.closeAll()
          $('#joinAward .dja-name').text(res.data.productName)
          $('#joinAward .dja-fir .dja-pic img').attr('src', res.data.productView1)
          $('#joinAward .dja-sec .dja-pic img').attr('src', res.data.productView2)
          if (spring.appType == 2) {
            $('#joinAward .dja-sec .dja-type').text('气泡、直播评论边框、直播弹幕边框x15天').addClass('dig-small-font')
          }
          if(spring.isFrom = 'h5'){
            $('.layui-layer.layui-layer-page.joinAct').css('top','5% !important')
          }
          $config.dialogComm($('#joinAward'), 'joinAward')
        }
        var num = Number($('.wn-num').text()) + 1
        $('.wn-num').text(num)
        $('.input-text').addClass('popup')
        $('input').removeClass('popup')
      } else {
        if (that) {
          $(that).removeClass('animation').addClass('smaller')
          setTimeout(function () {
            $(that).fadeOut()
          }, 500)
        }
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      layer.msg('网络异常')
    }
  })
}
function sendMsg(that) {
  if ($(that).hasClass('disable')) {
    return
  }
  if ($('input').val().trim().length > 30) {
    $config.yfAlert('您输入的内容过长，愿望祝福限30个字以内。')
    return
  }
  spring.inputValueMsg = $('input').val().trim().substring(0, 30)
  var parmas = {
    customerId: spring.customerId,
    token: spring.token,
    content: spring.inputValueMsg
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(spring.env, '/act/spring2021/authApi/sendLeaveMsg'),
    data: parmas,
    dataType: 'json',
    Header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.result) {
        if (res.data.useChatNum == 15) {
          $('#msgAward .dja-fir img').attr('src', res.data.productView1 + '?x-oss-process=image/resize,w_200')
          $('#msgAward .dja-sec img').attr('src', res.data.productView2 + '?x-oss-process=image/resize,w_200')
          if (spring.appType == 2) {
            $('#msgAward .dja-sec .dja-type').text('气泡、直播评论边框、直播弹幕边框x30天').addClass('dig-small-font')
          }
          if(spring.isFrom = 'h5'){
            $('.layui-layer.layui-layer-page.msgAward').css('top','5% !important')
          }
          setTimeout(function(){
            $config.dialogComm($('#msgAward'), 'msgAward')
          },2000)
        }
        $('.wn-num').text(res.data.chatNum)
        $('.wan-num').text(res.data.useChatNum)
        // $('.input-text').removeClass('popup')
        // $('input').addClass('popup')
        if (spring.inputValueMsg) {
          spring.danmuPool.unshift(spring.inputValueMsg);
          spring.nickNameObj.unshift(spring.nickName);
          spring.photoUrlObj.unshift(spring.photoURL);
        }
        spring.inputValueMsg = ''
        $('input').val('')
        $(that).addClass('disable')
        $config.yfAlert('发布成功，已登上新年许愿墙！您发的内容会被随机展示。')
        if(res.data.chatNum == 0){
          $('.input-text').removeClass('popup')
          $('input').addClass('popup')
          spring.errorMsg = '您当前没有留言条数，累积新年旺旺值达1000就能留言啦！'
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
function openRuleDig() {
  spring.diffApp()
  $config.dialogComm($('#awardRule'), 'awardRule')
}
// 滚动隐藏与显示
var scrollAction = { x: 'undefined', y: 'undefined' }, scrollDirection;
function scrollEvent() {
  // 是否登录及是否app外打开
  if (!spring.appBool) {
    $('.mine-rank').hide()
    return
  }
  if (!spring.isLogin) {
    $('.mine-rank').hide()
    return
  }
  document.onscroll = function (e) {
    scrollFunc();
    if (scrollDirection == 'down') {
      if (getDocumentTop() + getWindowHeight() > getScrollHeight() - 10) {
        $('.mine-rank').fadeIn()
      } else {
        $('.mine-rank').fadeOut()
      }
    }
    else if (scrollDirection == 'up') {
      $('.mine-rank').fadeIn()
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
function download() {
  layer.closeAll()
  if ($config.browser.versions.android) {
    window.location.href = spring.app[spring.appType - 1].downloadUrl
  } else {
    if (spring.appType == 1) {
      window.location.href = spring.app[0].downloadUrl
    } else {
      var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
      new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey: spring.app[1].appKey,
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
function toHome(customerId) {
  var ua = navigator.userAgent.toLowerCase()
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isIOS) {
    window.webkit.messageHandlers.jumpToHomePage.postMessage({
      customerId: customerId
    })
  } else if (isAndroid) {
    client.jumpToHomePage(customerId)
  }
}
function lookMore(that, type) {
  $(that).addClass('popup')
  spring.page++
  if (spring.ranks.length > 285) {
    $('.rank-item ul').append('<li class="look-more">榜单仅展示前300名哦~</li>')
    return
  }
  var parmas = {
    customerId: spring.customerId,
    type: type,
    page: spring.page,
    pageSize: spring.pageSize
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(spring.env, '/act/spring2021/getActRank'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if (res.data.ranks.length == 0) {
          $('.rank-item ul').append(
            '<li class="look-more flexbox">你已经看到我的底线了~</li>'
          )
          return
        }
        for (var i = 0; i < res.data.ranks.length; i++) {
          spring.ranks.push(res.data.ranks[i])
          var str =
            '<li class="li-item flexbox">' +
            '<div class="li-num">' + spring.ranks.length + '</div>' +
            '<div class="li-photo" ' + (type == 2 ? 'onclick="toHome(' + res.data.ranks[i].customerId + ')"' : '') + '>' +
            '<div class="photo-item">' +
            '<img src="' + res.data.ranks[i].photo + '?x-oss-process=image/resize,w_200" alt="头像">' +
            '</div>' +
            '</div>' +
            '<div class="li-name">' + res.data.ranks[i].nickName + '</div>' +
            '<div class="li-value">' + spring.fmoney(res.data.ranks[i].actNum) + '</div>' +
            '</li>'
          $('.rank-item ul').append(str)
        }
        if (res.data.ranks.length >= 15) {
          $('.rank-item ul').append(
            '<li class="look-more" onclick="lookMore(this,' + type + ')">点击查看更多<img src="./images/arrow.png"></li>'
          )
        } else {
          $('.rank-item ul').append(
            '<li class="look-more flexbox">你已经看到我的底线了~</li>'
          )
        }
        showEllipsis($('.li-name'))
      } else {
        $config.yfAlert(res.message)
      }
    },
    error: function (error) {
      layer.msg('网络异常')
    }
  })
}
// 分享
function shareTc() {
  var img = "http://miyiurl.rklive888.com/activities/spring21/dev/images/share1.png",
    title = '欢天喜地闹春节',
    subTitle = '这简单粗暴的福利！别说话，用心去感受~';
  shareComm(img, title, subTitle, spring.appType)
}
spring.init()