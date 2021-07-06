var wuyi = {
  // ?x-oss-process=image/resize,m_mfit,h_80,w_80
  env: 'prod', // demo
  customerId: $config.getQueryStringByName("customerId"),
  isFrom: $config.getQueryStringByName("isFrom"),
  token: $config.getQueryStringByName("token"),
  appType: $config.getQueryStringByName("appType").slice(0, 1),
  sex: 0,
  beginDate: null,
  appBool: openInWebview(),// 是否app外打开
  isLogin: true,
  isEnd: false,
  page: 1,
  code: 1,
  lookSVGAFlag: true,
  ranks: [],
  inviteTrees: [],
  indexData: {},
  recommendId: '',
  nowTreeData: {},
  nowTreeId: '',
  nowTreeCustomerId: '',
  nowTreeName: '',
  nowTreeLevel: '',
  singleTreeRank: [],
  allTreeRank: [],
  treeImgArr: [
    'images/tree_1.png',
    'images/tree_2.png',
    'images/tree_3.png',
    'images/tree_4.png',
    'images/tree_5.png',
    'images/tree_6.png',
    'images/tree_7.png',
    'images/tree_8.png',
    'images/tree_9.png',
  ],
  timeArr: [],
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
  treeGradeDetail: [
    { grade: 1, value: 0, name: '胚芽萌发' },
    { grade: 2, value: 1000, name: '破土而出' },
    { grade: 3, value: 9000, name: '嫩芽吐绿' },
    { grade: 4, value: 12000, name: '生机勃勃' },
    { grade: 5, value: 25000, name: '青青葱葱' },
    { grade: 6, value: 49500, name: '茁壮成长' },
    { grade: 7, value: 120000, name: '枝繁叶茂' },
    { grade: 8, value: 260000, name: '含苞待放' },
    { grade: 9, value: 700000, name: '鲜花绽放' }
  ],
  init: function () {
    wuyi.created()
    wuyi.appMounted()
  },
  created: function () {
    var parmas = {
      customerId: wuyi.customerId,
      token: wuyi.token,
      isFrom: wuyi.isFrom
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(wuyi.env, '/act/mayday2021/index'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (!wuyi.appBool) {
          if (wuyi.appType == 1) {
            $('#openOutApp').css('background-image', 'url(images/dia_open_app_rabbit.png)')
          }
          $config.dialogComm($('#openOutApp'), 'openOutApp')
          return
        } else if (!wuyi.isLogin) {
          $config.dialogComm($('#isLogin'), 'isLogin')
          return
        }
        if (res.result) {
          wuyi.indexData = res.data
          wuyi.sex = res.data.sex
          wuyi.isEnd = res.data.isEnd
          wuyi.isLogin = res.data.isLogin
          if (res.data.appType) {
            wuyi.appType = res.data.appType
          }
          wuyi.inviteTrees = res.data.inviteTrees
          wuyi.beginDate = res.data.beginDate.split(' ')[0]
          if (res.data.isEnd) {
            layer.msg('活动已结束')
          }
          // 树的等级大于0  直接展示 树页面
          if (res.data.treeLevel > 0 || res.data.opCustomerId || res.data.treeId) {
            wuyi.createdTreePage(res.data.treeId)
            if (res.data.oldLevel && res.data.oldLevel != res.data.treeLevel) {
              wuyi.showGradeTip(res.data)
            }
          } else {
            // 还没有种树
            wuyi.mountedIndex(res.data)
          }
          if (res.data.sex == 1) {
            if (res.data.inviteTrees.length > 0) {
              pendingInvite()
            }
          }
        } else {
          if (res.code == '-100') {
            wuyi.code = res.code
            wuyi.initMounted()
            if (res.message == '活动未开始，敬请期待') {
              layer.msg(res.message, {
                time: false,
                shade: 0.5
              })
            }
            document.body.addEventListener(
              'touchmove',
              function (e) {
                e.preventDefault() //阻止默认的处理方式(阻止下拉滑动的效果)
              },
              { passive: false }
            )
            return
          } else {
            wuyi.initMounted()
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
  appMounted: function () {
    if (wuyi.appType == 1) {
      $('.appUnit').text('聊币')
    }
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
  },
  // 5月10日之后的处理
  initMounted() {
    $('.love-tree-page').removeClass('popup')
    $('.invite-text-3').removeClass('popup').siblings('.invite-text').addClass('popup')
    $('.tree-main-tool').addClass('popup')
    // $('.all-the-tree').removeClass('popup').siblings('.all-the-tree-rank').removeClass('popup')
  },
  // 展示初始发起合种页面
  mountedIndex(data) {
    $('.grow-invite').removeClass('popup')
    $('.love-tree-page').addClass('popup')
    if (data.sex != 0) {
      $('.invite-text-2').removeClass('popup').siblings('.invite-text').addClass('popup')
      $('.invite-boy').removeClass('popup').siblings('.grow-invite-main-begin').addClass('popup').siblings('.finger').addClass('popup')
      $('.pending-invites').removeClass('popup')
    }
  },
  // 展示树页面
  createdTreePage: function (treeId) {
    var parmas = {
      customerId: wuyi.customerId,
      token: wuyi.token,
      treeId: treeId
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/getTreeInfo'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          wuyi.recommendId = ''
          wuyi.nowTreeData = res.data
          wuyi.nowTreeId = res.data.treeId
          wuyi.nowTreeName = res.data.treeName
          wuyi.nowTreeLevel = res.data.treeLevel
          wuyi.nowTreeCustomerId = res.data.opCustomerId
          if (res.data.signIns.length > 0) {
            wuyi.initSignTime(res.data.signIns[res.data.signIns.length - 1])
          } else {
            wuyi.initSignTime(res.data.beginDate)
          }
          wuyi.mountedTreePage(res.data, treeId)
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
  mountedTreePage: function (data, treeId) {
    if (data.treeLevel == 0) {
      var newTreeLevel = 1
    } else {
      var newTreeLevel = data.treeLevel
    }
    // $('#DoInvite .invite-search-result .search-result-btn').attr('treeId', treeId)
    $('.invite-text-3').removeClass('popup').siblings('.invite-text').addClass('popup')
    $('.grow-invite').addClass('popup').siblings('.love-tree-page').removeClass('popup').siblings('.all-the-tree').removeClass('popup').siblings('.all-the-tree-rank').removeClass('popup')
    $('.tree-main-item img').attr('src', 'images/tree_' + newTreeLevel + '.png')
    $('.tree-main-title p').text(data.treeName)
    // 双方头像 
    if (data.sex) {
      var nowTimeArr = []
      for (var i = 0; i < 7; i++) {
        nowTimeArr.push(moment(moment(data.beginDate).valueOf() + (60 * 60 * 24 * 1000 * i)).format("YYYY-MM-DD HH:mm:ss"))
      }
      //使用道具按钮
      if (moment(data.now).valueOf() < (moment(nowTimeArr[6]).valueOf() + (60 * 60 * 20 * 1000))) {
        $('.tree-main-prop-btn').removeClass('popup')
      }
      $('.tree-main-tool').addClass('popup')
      var PhotoStr =
        '<img class="tree-users-info-opPhoto" customerId="' + data.opCustomerId + '" onclick="jumpToHome(this)" src="' + data.opPhoto + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
        '<div class="users-info-heart"></div>' +
        '<img class="tree-users-info-photo" src="' + data.photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">'
    } else {
      PhotoStr =
        '<img class="tree-users-info-photo" src="' + data.photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
        '<div class="users-info-heart"></div>' +
        '<div class="tree-users-info-img">' +
        '<img class="tree-users-info-opPhoto" customerId="' + data.opCustomerId + '" onclick="jumpToHome(this)" src="' + (data.opCustomerId ? data.opPhoto + '?x-oss-process=image/resize,m_mfit,h_80,w_80' : 'images/miao.png') + '">' +
        (data.opCustomerId ?
          (data.treeLevel ?
            '' :
            '<div class="tree-users-info-cover" customerId="' + data.opCustomerId + '" onclick="jumpToHome(this)">' +
            '</div>' +
            '<div class="tree-users-info-invite rank-img-btn flexbox">待同意</div>') : '<div class="tree-users-info-cover">' + '</div>' + '<div class="tree-users-info-invite rank-img-btn do-invite flexbox" onclick="inviteBoy(' + wuyi.nowTreeId + ')">邀请' +
          '</div>'
        ) +
        '</div>'
    }
    $('.tree-users-info').html(PhotoStr)
    // 级数和名称
    var treeGradeStr = wuyi.treeGradeDetail[newTreeLevel - 1].grade
    var treeNameStr = wuyi.treeGradeDetail[newTreeLevel - 1].name
    $('.tree-main-grade-show').html(treeGradeStr + '级<br />' + treeNameStr)
    if (data.treeLevel > 8) {
      $('.look-svga').removeClass('popup')
    } else {
      $('.look-svga').addClass('popup')
    }
    // 成长值
    if (newTreeLevel < 9) {
      $('.tree-main-tips').html('<p class="tree-main-tips">爱情树再获得<span class="tips-value">1000</span>成长值就<span class="tips-name">破土而出</span>啦')
      var nextTreeValue = wuyi.treeGradeDetail[newTreeLevel].value
      $('.tree-main-tips .tips-value').text(nextTreeValue - data.treeGrowth)
      $('.tree-main-tips .tips-name').text(wuyi.treeGradeDetail[newTreeLevel].name)
      // 进度条
      var progressNum = (data.treeGrowth - wuyi.treeGradeDetail[newTreeLevel - 1].value) / (wuyi.treeGradeDetail[newTreeLevel].value - wuyi.treeGradeDetail[newTreeLevel - 1].value)
      $('.tree-main-progress').css('width', parseInt(progressNum * 100) + '%')
    } else {
      $('.tree-main-tips').html('恭喜已达最高级<span class="tips-grade">9</span>级，当前成长值<span class="tips-value">' + data.treeGrowth + '</span>啦')
      $('.tree-main-progress').css('width', '100%')
    }
    // 动态
    $('.trends-wrap ul').html(' ')
    for (var i = 0; i < data.treeRecords.length; i++) {
      var trendStr =
        '<li class="flexbox trends-item">' +
        '<p><span class="pName">' + (data.treeRecords[i].nickName ? data.treeRecords[i].nickName : '') + '</span><span> ' + data.treeRecords[i].growthContent + '</span></p>' +
        '<span>' + wuyi.initTime(data.treeRecords[i].createTime) + '</span>' +
        '</li>'
      $('.trends-wrap ul').append(trendStr)
    }
    showEllipsis($('.pName'))
    // 树的排行
    wuyi.createdTreeRank(1, 5)
  },
  createdTreeRank: function (type, pageSize) {
    wuyi.page = 1
    var parmas = {
      customerId: wuyi.customerId,
      token: wuyi.token,
      pageSize: pageSize,
      page: wuyi.page,
      type: type,
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/getActRank'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          if (res.data.ranks == []) return
          if (type == 1) {
            wuyi.mountedTreeRank(res.data.ranks, $('.tree-rank-main ul'), 1)
          } else {
            wuyi.mountedTotalTreeRank(res.data.ranks, $('.rank-page-main ul'), true)
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
  mountedTreeRank: function (data, ele, flag) {
    if (flag == 1) {
      ele.html(' ')
      wuyi.singleTreeRank = []
    }
    for (var i = 0; i < data.length; i++) {
      wuyi.singleTreeRank.push(data[i])
      if (wuyi.sex == 0) {
        var rankStr =
          '<li class="tree-rank-item flexbox">' +
          '<div class="tree-rank-item-num ' + (i < 3 ? 'rank-item-num-' + (i + 1) : '') + '">' + (i < 3 ? '' : (i + 1)) + '</div>' +
          '<div class="tree-rank-item-img">' +
          '<img src="' + (data[i].customerId ? data[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80' : 'images/miao.png') + '" customerId="' + data[i].customerId + '" onclick="jumpToHome(this)">' +
          (data[i].customerId ?
            (data[i].treeLevel ?
              '' :
              '<div class="img-cover">' +
              '</div>' +
              '<div class="rank-img-btn flexbox">待同意</div>') : '<div class="img-cover">' + '</div>' + '<div class="rank-img-btn flexbox do-invite" onclick="inviteBoy(' + data[i].treeId + ')">邀请</div>') +
          '</div>' +
          '<div class="tree-rank-item-name column" onclick="changeTreeShow(this,' + data[i].treeId + ')">' + data[i].treeName + '</div>' +
          (data[i].customerId ? (data[i].treeLevel ? '<div class="tree-rank-item-value column">' +
            '<p>' + data[i].treeLevel + '级</p>' +
            '<span>' + setValue(data[i].treeGrowth) + '</span>' +
            '</div>' : '<div class="tree-rank-item-value column">暂无</div>') : '<div class="tree-rank-item-value column">暂无</div>')
        '<i></i>' +
          '</li>'
      } else {
        var rankStr =
          '<li class="tree-rank-item flexbox">' +
          '<div class="tree-rank-item-num ' + (i < 3 ? 'rank-item-num-' + (i + 1) : '') + '">' + (i < 3 ? '' : (i + 1)) + '</div>' +
          '<div class="tree-rank-item-img">' +
          '<img src="' + (data[i].customerId ? data[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80' : 'images/miao.png') + '" customerId="' + data[i].customerId + '" onclick="jumpToHome(this)">' +
          (data[i].treeLevel ?
            '' :
            '<div class="img-cover">' +
            '</div>' +
            '<div class="rank-img-btn flexbox do-invite" treeId="' + data[i].treeId + '" onclick="doInviteOne(this,3)">接受</div>') +
          '</div>' +
          '<div class="tree-rank-item-name column" onclick="changeTreeShow(this,' + data[i].treeId + ')">' + data[i].treeName + '</div>' +
          (data[i].treeLevel ? '<div class="tree-rank-item-value column">' +
            '<p>' + data[i].treeLevel + '级</p>' +
            '<span>' + setValue(data[i].treeGrowth) + '</span>' +
            '</div>' : '<div class="tree-rank-item-value column">暂无</div>')
        '<i></i>' +
          '</li>'
      }
      ele.append(rankStr)
    }
    if (data.length >= 5) {
      var lookMoreStr = '<li class="tree-rank-item flexbox look-more" onclick="lookMore(this,1,5)">点击查看更多<i class="more-icon"></i></li>'
      ele.append(lookMoreStr)
    } else {
      var allShowStr = '<li class="rank-page-item flexbox look-more">你已经看到了我的底线~</li>'
      ele.append(allShowStr)
    }
  },
  mountedTotalTreeRank: function (data, ele, flag) {
    if (flag && data.length != 0) {
      ele.html(' ')
      wuyi.allTreeRank = []
    }
    if (data.length >= 15) {
      $('.rank-page-main').addClass('rank-page-init')
    }
    for (var i = 0; i < data.length; i++) {
      wuyi.allTreeRank.push(data[i])
      var rankStr =
        '<li class="rank-page-item flexbox">' +
        '<div class="rank-item-num ' + (i < 3 ? 'rank-num-' + (i + 1) : '') + '">' + (i < 3 ? '' : (i + 1)) + '</div>' +
        '<div class="rank-item-name flexbox">' + data[i].treeName + '</div>' +
        '<div class="rank-item-grade">' + data[i].treeLevel + '</div>' +
        '<div class="rank-item-value flexbox"><i></i>' + setValue(data[i].treeGrowth) + '</div>' +
        '<i></i>' +
        '</li>'
      ele.append(rankStr)
    }
    if (data.length >= 15) {
      var lookMoreStr = '<li class="rank-page-item flexbox look-more" onclick="lookMore(this,2,15)">点击查看更多<i class="more-icon"></i></li>'
      ele.append(lookMoreStr)
    } else if (data.length < 15) {
      var allShowStr = '<li class="rank-page-item flexbox look-more">你已经看到了我的底线~</li>'
      ele.append(allShowStr)
    }
  },
  // 推荐接口
  createdRecommendUser: function (treeId) {
    var parmas = {
      customerId: wuyi.customerId,
      token: wuyi.token,
      usedIds: wuyi.recommendId
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/getRecommendUser'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          if (res.data) {
            for (var i = 0; i < res.data.length; i++) {
              wuyi.recommendId = wuyi.recommendId + res.data[i].customerId + ','
            }
            wuyi.mountedRecommendUser(res.data, treeId)
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
  mountedRecommendUser: function (data, treeId) {
    $('.invite-recommend-title i').attr('treeId', treeId)
    $('.invite-search-result .search-result-btn').attr('treeId', treeId)
    if (data.length <= 0) {
      $('.invite-recommend').addClass('popup')
    } else {
      $('#DoInvite').removeClass('init')
      if (data.length == 1) {
        $('#DoInvite').addClass('singleInit')
      }
      $('.invite-recommend ul').html(' ')
      for (var i = 0; i < data.length; i++) {
        var inviteRecommendStr =
          '<li class="invite-recommend-user flexbox">' +
          '<img class="invite-recommend-user-photo" src="' + data[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
          '<div class="search-result-name">' + data[i].nickName + '</div>' +
          '<div class="search-result-btn flexbox" customerId="' + data[i].customerId + '" treeId="' + treeId + '" onclick="inviteUser(this)">邀请</div>' +
          '</li>'
        $('.invite-recommend ul').append(inviteRecommendStr)
      }
      $('.invite-recommend').removeClass('popup')
    }
  },
  // 搜索接口
  createdSearch: function (searchCustomerId) {
    var parmas = {
      customerId: wuyi.customerId,
      token: wuyi.token,
      searchCustomerId: searchCustomerId
    }
    $.ajax({
      type: 'GET',
      url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/searchCustomer'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          if (res.data) {
            wuyi.mountedSearch(res.data)
          }
        } else {
          $('.invite-search-result').addClass('popup')
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
  mountedSearch: function (data) {
    $('.search-result-photo').attr('src', data.photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
    $('.invite-search-result .search-result-name').text(data.nickName)
    $('.invite-search-result .search-result-btn').attr('customerId', data.customerId)
    $('.invite-search-result').removeClass('popup')
  },
  showGradeTip: function (data) {
    $('.oldTreeImg img').attr('src', 'images/tree_' + data.oldLevel + '.png')
    $('.newTreeImg img').attr('src', 'images/tree_' + data.treeLevel + '.png')
    $('.oldTreeName').text(wuyi.treeGradeDetail[data.oldLevel - 1].name)
    $('.newTreeName').text(wuyi.treeGradeDetail[data.treeLevel - 1].name)
    $('.oldTreeGrade').text(wuyi.treeGradeDetail[data.oldLevel - 1].grade + '级')
    $('.newTreeGrade').text(wuyi.treeGradeDetail[data.treeLevel - 1].grade + '级')
    $config.dialogComm($('#GradeTip'), 'GradeTip')
  },
  initTime: function (time) {
    var min = time.split(' ')[1].split(':')
    return min[0] + ':' + min[1]
  },
  initSignTime: function (time) {
    wuyi.timeArr = []
    for (var i = 0; i < 7; i++) {
      wuyi.timeArr.push(moment(moment(time).valueOf() + (60 * 60 * 24 * 1000 * i)).format("YYYY-MM-DD"))
    }
  }
}
// 发起种树
function beginGrow() {
  if (!wuyi.appBool) {
    if (wuyi.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/dia_open_app_rabbit.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!wuyi.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  $config.dialogComm($('#EnterName'), 'EnterName')
  changeDiaTop()
}
function doGrow(that) {
  var treeName = $(that).siblings('input').val().trim()
  if (treeName.length == 0) {
    layer.msg('取个有意义的名称吧')
    $(that).siblings('input').val('')
    return
  }
  var parmas = {
    customerId: wuyi.customerId,
    token: wuyi.token,
    treeName: treeName
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/startTree'),
    data: parmas,
    dataType: 'json',
    Header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      $(that).siblings('input').val('')
      if (res.result) {
        wuyi.createdTreePage(res.data)
        $('#DoInvite .invite-search-result .search-result-btn').attr('treeId', res.data)
        inviteBoy(res.data)
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
// 待处理邀请
function pendingInvite() {
  if (wuyi.inviteTrees.length == 0) {
    layer.msg('暂无待处理的合种爱情树邀请。多和心仪的女性聊天，让她们邀请你合种爱情树吧！')
  } else {
    if (wuyi.inviteTrees.length > 1) {
      $('.invite-users ul').html(' ')
      for (var i = 0; i < wuyi.inviteTrees.length; i++) {
        var AcceptInviteMultiStr =
          '<li class="invite-users-item column">' +
          '<div class="invite-users-info flexbox">' +
          '<img class="invite-users-photo" src="' + wuyi.inviteTrees[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80">' +
          '<p class="invite-user-tree-name">' + wuyi.inviteTrees[i].treeName + '</p>' +
          '<div class="accept-invite-btn flexbox" treeId="' + wuyi.inviteTrees[i].id + '" onclick="doInviteOne(this,2)">接受</div>' +
          '</div>' +
          '<p class="invite-users-name">' + wuyi.inviteTrees[i].nickName + '</p>' +
          '</li>'
        $('.invite-users ul').append(AcceptInviteMultiStr)
      }
      $config.dialogComm($('#AcceptInviteMulti'), 'AcceptInviteMulti')
      changeDiaTop()
    } else {
      $('#AcceptInviteOne p').text(wuyi.inviteTrees[0].treeName)
      $('.accept-one-userName').text(wuyi.inviteTrees[0].nickName)
      $('.accept-one-main img').attr('src', wuyi.inviteTrees[0].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80')
      $('#AcceptInviteOne .to-grow').attr('treeId', wuyi.inviteTrees[0].id)
      $config.dialogComm($('#AcceptInviteOne'), 'AcceptInviteOne')
      changeDiaTop()
    }
  }
}
// 任务弹窗
function showTaskDia() {
  if (wuyi.code == '-100') return
  window.localStorage.setItem('todaySign', wuyi.nowTreeData.signIns.length)
  if (wuyi.nowTreeData.shareNum < 3) {
    $('.task-item-text h3 span').text(wuyi.nowTreeData.shareNum)
  } else {
    $('.task-item-text h3 span').text(3)
  }
  if (wuyi.nowTreeData.sex) {
    $('.sexGift').text('送礼物')
  } else {
    $('.sexGift').text('收礼物')
  }
  if (wuyi.nowTreeCustomerId && wuyi.nowTreeLevel) {
    $('.task-item-btn').attr('treeId', wuyi.nowTreeId).attr('customerId', wuyi.nowTreeCustomerId)
    $('.sign-get-btn').attr('treeId', wuyi.nowTreeId)
    wuyi.appMounted()
    dialogComm($('#taskCenter'), 'taskCenter')
  } else {
    layer.msg('请先邀请伙伴或者等待小伙伴同意合种<br />才能领取成长值!')
  }
  if (wuyi.sex == 0) {
    $('.five-days').css('display', 'none')
  } else {
    var nowTimeArr = []
    for (var i = 0; i < 7; i++) {
      nowTimeArr.push(moment(moment(wuyi.nowTreeData.beginDate).valueOf() + (60 * 60 * 24 * 1000 * i)).format("YYYY-MM-DD HH:mm:ss"))
    }
    if (moment(wuyi.nowTreeData.now).valueOf() < (moment(nowTimeArr[6]).valueOf() + (60 * 60 * 20 * 1000))) {
      $('.five-days').parent().html('<div class="five-days column">500成长值<br />+1张成长加速道具</div>')
    } else {
      $('.five-days').css('display', 'none')
    }
  }
  if (wuyi.nowTreeData.signIns.length != 0) {
    if (wuyi.nowTreeData.signIns.length == 4 || wuyi.nowTreeData.signIns.length == 5 && wuyi.nowTreeData.signIns[0] == moment(moment(wuyi.nowTreeData.now).valueOf()).format("YYYY-MM-DD")) {
      $('.sign-in-value .value1').css('display', 'none')
      $('.sign-in-value .value6').css('display', 'flex')
      $('.day4').attr('barWidth', '60%')
      $('.day1').css('display', 'none')
      $('.day6').css('display', 'flex')
    }
    if (wuyi.nowTreeData.signIns.length > 5 || wuyi.nowTreeData.signIns.length == 5 && wuyi.nowTreeData.signIns[0] != moment(moment(wuyi.nowTreeData.now).valueOf()).format("YYYY-MM-DD")) {
      $('.sign-in-value .value1').css('display', 'none')
      $('.sign-in-value .value2').css('display', 'none')
      $('.sign-in-value .value6').css('display', 'flex')
      $('.sign-in-value .value7').css('display', 'flex')
      $('.day5').attr('barWidth', '60%')
      $('.day1').css('display', 'none')
      $('.day2').css('display', 'none')
      $('.day6').css('display', 'flex')
      $('.day7').css('display', 'flex')
    }
    $('.sign-in-progress-item').css('width', $($('.sign-in-days li')[wuyi.nowTreeData.signIns.length - 1]).attr('barWidth'))
    for (var i = 0; i < wuyi.nowTreeData.signIns.length; i++) {
      $($('.sign-in-days li')[i]).html('<img src="./images/dia_task_finish.png">')
    }
    if (wuyi.nowTreeData.signIns[0] == wuyi.timeArr[window.localStorage.getItem('todaySign') - 1] && wuyi.timeArr[window.localStorage.getItem('todaySign') - 1] == moment(moment(wuyi.nowTreeData.now).valueOf()).format("YYYY-MM-DD")) {
      $($('.sign-in-days li')[wuyi.nowTreeData.signIns.length - 1]).html('<img src="images/dia_task_finish.png">今天')
      $('.sign-get-btn').removeClass('isGetted').text('已领取')
    } else {
      $($('.sign-in-days li')[window.localStorage.getItem('todaySign')]).text('今天')
      $('.sign-get-btn').addClass('isGetted').text('领取')
    }
  } else {
    var dayInitStr =
      '<li class="flexbox day1" barWidth="20%">今天</li>' +
      '<li class="flexbox day2" barWidth="40%">第二天</li>' +
      '<li class="flexbox day3" barWidth="60%">第三天</li>' +
      '<li class="flexbox day4" barWidth="80%">第四天</li>' +
      '<li class="flexbox day5" barWidth="100%">第五天</li>' +
      '<li class="flexbox day6" style="display: none;" barWidth="100%">第六天</li>' +
      '<li class="flexbox day7" style="display: none;" barWidth="100%">第七天</li>'
    $('.sign-in-days').html(dayInitStr)
    $('.sign-get-btn').addClass('isGetted').text('领取')
    $('.sign-in-progress-item').css('width', '0')
  }
  setTimeout(function () {
    window.localStorage.removeItem('todaySign')
  }, 500)
}
// 规则页
function toRulePage() {
  // if (wuyi.code == '-100') {
  //   layer.msg('活动已结束')
  //   return
  // }
  if (!wuyi.appBool) {
    if (wuyi.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/dia_open_app_rabbit.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!wuyi.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  window.location.href = './rule.html?appType=' + wuyi.appType + '&sex=' + wuyi.sex
}
// 主页切换nav
function changeIndexNav(type, that) {
  if (!wuyi.appBool) {
    if (wuyi.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/dia_open_app_rabbit.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!wuyi.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  $(that).addClass('index-nav1').removeClass('index-nav2').siblings('.index-nav').addClass('index-nav2').removeClass('index-nav1')
  $('.nav' + type + '-page').removeClass('popup').siblings('.nav-page').addClass('popup')
  wuyi.appMounted()
  if (type == 2) {
    wuyi.createdTreeRank(2, 15)
  } else {
    if (wuyi.code == 1 && wuyi.nowTreeId) {
      wuyi.createdTreePage(wuyi.nowTreeId)
    }
  }
}
// 上滑弹出弹窗
function dialogComm(contain, className) {
  layer.open({
    type: 1,
    anim: 2,
    title: false,
    offset: 'b',
    shade: .5,
    closeBtn: 0,
    scrollbar: false,
    isOutAnim: false,
    skin: className || 'yourclass',
    content: contain,
    end: function () {
    }
  })
}
// 下滑关闭弹窗
function dialogSlideDown() {
  $(".slideDown-main").slideUp('fast');
  setTimeout(function () {
    layer.closeAll()
    $(".slideDown-main").slideDown('fast');
  }, 300)
}
// 弹出任务规则弹窗
function showSignRule() {
  dialogComm($('#signRulePage'), 'signRulePage')
}
// 关闭任务规则弹窗
function closeSignRulePage() {
  $('#signRulePage .slideDown-main').slideUp('fast', function () {
    layer.close(layer.index)
    $('#signRulePage .slideDown-main').slideDown()
  })
}
// 搜索ID
function searchId(that) {
  wuyi.createdSearch($(that).val())
}
// 查看更多
function lookMore(that, type, pageSize) {
  $(that).addClass('popup')
  wuyi.page++
  if (type == 1) {
    if (wuyi.singleTreeRank.length > 40) {
      $('.tree-rank-main ul').append('<li class="rank-page-item flexbox look-more">榜单最多显示50名~</li>')
      return
    }
  } else {
    if (wuyi.allTreeRank.length > 290) {
      $('.rank-page-main ul').append('<li class="rank-page-item flexbox look-more">榜单最多展示300棵树~</li>')
      return
    }
  }
  var parmas = {
    customerId: wuyi.customerId,
    token: wuyi.token,
    pageSize: pageSize,
    page: wuyi.page,
    type: type,
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/getActRank'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if (type == 1) {
          for (var i = 0; i < res.data.ranks.length; i++) {
            wuyi.singleTreeRank.push(res.data.ranks[i])
            if (wuyi.sex == 0) {
              var rankStr =
                '<li class="tree-rank-item flexbox">' +
                '<div class="tree-rank-item-num">' + wuyi.singleTreeRank.length + '</div>' +
                '<div class="tree-rank-item-img">' +
                '<img src="' + (res.data.ranks[i].customerId ? res.data.ranks[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80' : 'images/miao.png') + '" customerId="' + res.data.ranks[i].customerId + '" onclick="jumpToHome(this)">' +
                (res.data.ranks[i].customerId ?
                  (res.data.ranks[i].treeLevel ?
                    '' :
                    '<div class="img-cover">' +
                    '</div>' +
                    '<div class="rank-img-btn flexbox">待同意</div>') : '<div class="img-cover">' + '</div>' + '<div class="rank-img-btn flexbox do-invite" onclick="inviteBoy(' + res.data.ranks[i].treeId + ')">邀请</div>') +
                '</div>' +
                '<div class="tree-rank-item-name column" onclick="changeTreeShow(this,' + res.data.ranks[i].treeId + ')">' + res.data.ranks[i].treeName + '</div>' +
                (res.data.ranks[i].customerId ? (res.data.ranks[i].treeLevel ? '<div class="tree-rank-item-value column">' +
                  '<p>' + res.data.ranks[i].treeLevel + '级</p>' +
                  '<span>' + setValue(res.data.ranks[i].treeGrowth) + '</span>' +
                  '</div>' : '<div class="tree-rank-item-value column">暂无</div>') : '<div class="tree-rank-item-value column">暂无</div>')
              '<i></i>' +
                '</li>'
            } else {
              var rankStr =
                '<li class="tree-rank-item flexbox">' +
                '<div class="tree-rank-item-num">' + wuyi.singleTreeRank.length + '</div>' +
                '<div class="tree-rank-item-img">' +
                '<img src="' + (res.data.ranks[i].customerId ? res.data.ranks[i].photo + '?x-oss-process=image/resize,m_mfit,h_80,w_80' : 'images/miao.png') + '" customerId="' + res.data.ranks[i].customerId + '" onclick="jumpToHome(this)">' +
                (res.data.ranks[i].treeLevel ?
                  '' :
                  '<div class="img-cover">' +
                  '</div>' +
                  '<div class="rank-img-btn flexbox do-invite" treeId="' + res.data.ranks[i].treeId + '" onclick="doInviteOne(this,3)">接受</div>') +
                '</div>' +
                '<div class="tree-rank-item-name column" onclick="changeTreeShow(this,' + res.data.ranks[i].treeId + ')">' + res.data.ranks[i].treeName + '</div>' +
                (res.data.ranks[i].treeLevel ? '<div class="tree-rank-item-value column">' +
                  '<p>' + res.data.ranks[i].treeLevel + '级</p>' +
                  '<span>' + setValue(res.data.ranks[i].treeGrowth) + '</span>' +
                  '</div>' : '<div class="tree-rank-item-value column">暂无</div>')
              '<i></i>' +
                '</li>'
            }
            $('.tree-rank-main ul').append(rankStr)
          }
          if (res.data.ranks.length >= 5) {
            var lookMoreStr = '<li class="tree-rank-item flexbox look-more" onclick="lookMore(this,1,5)">点击查看更多<i class="more-icon"></i></li>'
            $('.tree-rank-main ul').append(lookMoreStr)
          } else {
            var allShowStr = '<li class="rank-page-item flexbox look-more">你已经看到了我的底线~</li>'
            $('.tree-rank-main ul').append(allShowStr)
          }
        } else {
          for (var i = 0; i < res.data.ranks.length; i++) {
            wuyi.allTreeRank.push(res.data.ranks[i])
            var rankStr =
              '<li class="rank-page-item flexbox">' +
              '<div class="rank-item-num">' + wuyi.allTreeRank.length + '</div>' +
              '<div class="rank-item-name flexbox">' + res.data.ranks[i].treeName + '</div>' +
              '<div class="rank-item-grade">' + res.data.ranks[i].treeLevel + '</div>' +
              '<div class="rank-item-value flexbox"><i></i>' + setValue(res.data.ranks[i].treeGrowth) + '</div>' +
              '<i></i>' +
              '</li>'
            $('.rank-page-main ul').append(rankStr)
          }

          if (res.data.ranks.length >= 15) {
            var lookMoreStr = '<li class="rank-page-item flexbox look-more" onclick="lookMore(this,2,15)">点击查看更多<i class="more-icon"></i></li>'
            $('.rank-page-main ul').append(lookMoreStr)
          } else if (res.data.ranks.length < 15) {
            var allShowStr = '<li class="rank-page-item flexbox look-more">你已经看到了我的底线~</li>'
            $('.rank-page-main ul').append(allShowStr)
          }
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
// 跳转个人主页
function jumpToHome(that) {
  var customerId = $(that).attr('customerId')
  if (customerId == 'null') return
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
function inviteBoy(treeId) {
  wuyi.createdRecommendUser(treeId)
  $config.dialogComm($('#DoInvite'), 'DoInvite')
  changeDiaTop()
}
// 男方单个接受邀请
function doInviteOne(that, type) {
  if ($(that).hasClass('gray')) return
  var parmas = {
    customerId: wuyi.customerId,
    treeId: $(that).attr('treeId'),
    token: wuyi.token
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/acceptTree'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if (type == 1) {
          layer.closeAll()
        } else if (type == 2) {
          $(that).addClass('gray').text('已接受')
        } else if (type == 3) {
          $(that).parent().parent().addClass('isClick')
          setTimeout(function () {
            $(that).parent().parent().removeClass('isClick')
          }, 50)
          layer.msg('已接受对方合种邀请，并为您切换到这棵树的状态')
        }
        wuyi.createdTreePage($(that).attr('treeId'))
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
// 男方多个接受邀请
function doInviteMulti() {
  var doInviteMultiTreeId = '',
    doInviteMultiEle = $('.invite-users li .accept-invite-btn'),
    isAcceptOneTrue = []
  for (var i = 0; i < doInviteMultiEle.length; i++) {
    if ($(doInviteMultiEle[i]).attr('treeId')) {
      doInviteMultiTreeId = doInviteMultiTreeId + $(doInviteMultiEle[i]).attr('treeId') + ','
    }
    if ($(doInviteMultiEle[i]).hasClass('gray')) {
      isAcceptOneTrue.push($(doInviteMultiEle[i]).attr('treeId'))
    }
  }
  if (isAcceptOneTrue.length == doInviteMultiEle.length) return
  var parmas = {
    customerId: wuyi.customerId,
    token: wuyi.token,
    treeId: doInviteMultiTreeId.slice(0, -1),
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/acceptTree'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        layer.closeAll()
        wuyi.createdTreePage(doInviteMultiTreeId.split(',')[0])
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
function showPropDia() {
  if (wuyi.nowTreeData.propStatus != 0) {
    $('.prop-item p').text('X 1 张')
    $('.not-have').addClass('popup')
    $('.youxiaoqi').removeClass('popup')
    if (wuyi.nowTreeData.propStatus == 1) {
      $('.do-speed-ticket').addClass('is-have').text('立即使用')
    } else {
      $('.do-speed-ticket').text('已使用').removeClass('is-have')
      $('.prop-item p').text('X 0 张')
    }
  } else {
    $('.prop-item p').text('X 0 张')
    $('.not-have').removeClass('popup')
    $('.youxiaoqi').addClass('popup')
    $('.do-speed-ticket').removeClass('is-have').text('暂无')
  }
  $('.do-speed-ticket.is-have').attr('treeId', wuyi.nowTreeId)
  dialogComm($('#propMan'), 'propMan')
}
// 刷新推荐
function refreshRecommend(that) {
  var parmas = {
    customerId: wuyi.customerId,
    token: wuyi.token,
    usedIds: wuyi.recommendId.slice(0, -1)
  }
  $.ajax({
    type: 'GET',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/getRecommendUser'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            wuyi.recommendId = wuyi.recommendId + res.data[i].customerId + ','
          }
          wuyi.mountedRecommendUser(res.data, $(that).attr('treeId'))
        } else {
          layer.msg('没有更多的推荐用户了')
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
// 邀请
function inviteUser(that) {
  var parmas = {
    opCustomerId: $(that).attr('customerId'),
    treeId: $(that).attr('treeId'),
    customerId: wuyi.customerId,
    token: wuyi.token,
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/inviteTree'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      $('.invite-search-input').val('')
      $('.invite-search-result').addClass('popup')
      if (res.result) {
        layer.closeAll()
        layer.msg('您的邀请已通过官方私信发送给对方啦！等待对方接受就能种下姻缘啦')
        wuyi.createdTreePage($(that).attr('treeId'))
        wuyi.createdTreeRank(1, 10)
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
// 签到
function treeSignIn(that) {
  if (!$(that).hasClass('isGetted')) return
  var parmas = {
    customerId: wuyi.customerId,
    token: wuyi.token,
    treeId: $(that).attr('treeId'),
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/treeSignIn'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        if (res.data.propStatus && wuyi.sex == 1) {
          layer.msg('恭喜获得1张【成长值加速券】，已经放入您的道具。（使用1张券可让合种树的成长值+10000。需在5月5日20:00前获得和使用，过期失效）')
        }
        $(that).removeClass('isGetted').text('已领取')
        $('.sign-in-days .day' + (wuyi.nowTreeData.signIns.length + 1) + '').html('<img src="images/dia_task_finish.png">今天').addClass('gray')
        $('.sign-in-progress-item').css('width', $('.sign-in-days .day' + (wuyi.nowTreeData.signIns.length + 1) + '').attr('barWidth'))
        wuyi.createdTreePage($(that).attr('treeId'))
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
    window.location.href = wuyi.app[wuyi.appType - 1].downloadUrl
  } else {
    if (wuyi.appType == 1) {
      window.location.href = wuyi.app[0].downloadUrl
    } else {
      var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
      new OpenInstall({
        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
        appKey: wuyi.app[1].appKey,
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
function toShare() {
  if (wuyi.code == '-100') {
    layer.msg('活动已结束')
    return
  }
  if (wuyi.appType == 2 && !$config.browser.versions.android && wuyi.nowTreeData.shareNum < 3) {
    var parmas = {
      customerId: wuyi.customerId,
      token: wuyi.token,
      treeId: wuyi.nowTreeId
    }
    $.ajax({
      type: 'POST',
      url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/shareStatistics'),
      data: parmas,
      dataType: 'json',
      success: function (res) {
        if (res.result) {
          wuyi.nowTreeData.shareNum++
          $('.task-item-text h3 span').text(wuyi.nowTreeData.shareNum)
          wuyi.createdTreePage(wuyi.nowTreeId)
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
  var img = "http://miyiurl.rklive888.com/labour/prod/images/header_bg.png",
    title = '劳动节合种爱情树',
    subtitle = '种下甜蜜记忆, 收获奖励果实',
    type = 'mayDay2021-' + wuyi.nowTreeId,
    apptype = wuyi.appType
  if (wuyi.nowTreeId && wuyi.nowTreeCustomerId) {
    var sharingState = type;
  } else {
    var sharingState = 4;
  }
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
function shareTc() {
  toShare()
}
function openToolDia() {
  if (!wuyi.appBool) {
    if (wuyi.appType == 1) {
      $('#openOutApp').css('background-image', 'url(images/dia_open_app_rabbit.png)')
    }
    $config.dialogComm($('#openOutApp'), 'openOutApp')
    return
  } else if (!wuyi.isLogin) {
    $config.dialogComm($('#isLogin'), 'isLogin')
    return
  }
  $('#toolDia div').attr('treeId', wuyi.nowTreeId).attr('treeName', wuyi.nowTreeName)
  layer.closeAll()
  layer.open({
    type: 1,
    shadeClose: false,
    title: false,
    shade: 0.85,
    closeBtn: 0,
    scrollbar: false,
    skin: 'toolDia',
    content: $('#toolDia'),
    shadeClose: true,
    end: function () {
    }
  })
}
function changeTreeName(that) {
  $('#ChangeName p').text($(that).attr('treeName'))
  $('#ChangeName .to-grow').attr('treeId', $(that).attr('treeId')).attr('treeName', $(that).attr('treeName'))
  $config.dialogComm($('#ChangeName'), 'ChangeName')
  changeDiaTop()
}
function doChangeName(that) {
  var treeName = $(that).siblings('input').val().trim()
  if (treeName.length == 0) {
    $(that).siblings('input').val('')
    layer.msg('取个有意义的名称吧')
  }
  var parmas = {
    treeName: treeName,
    treeId: $(that).attr('treeId'),
    customerId: wuyi.customerId,
    token: wuyi.token
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/updateTreeName'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      $(that).siblings('input').val('')
      if (res.result) {
        layer.msg('修改成功！')
        $(that).siblings('input').val('')
        layer.closeAll()
        wuyi.createdTreePage($(that).attr('treeId'))
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
function useProp(that) {
  if (!$(that).hasClass('is-have')) return
  var parmas = {
    treeId: $(that).attr('treeId'),
    customerId: wuyi.customerId,
    token: wuyi.token
  }
  $.ajax({
    type: 'POST',
    url: $config.toUrl(wuyi.env, '/act/mayday2021/authApi/applyProp'),
    data: parmas,
    dataType: 'json',
    success: function (res) {
      if (res.result) {
        $(that).removeClass('is-have').text('已使用')
        $('.prop-item p').text('X 0 张')
        wuyi.createdTreePage($(that).attr('treeId'))
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
function emptyInput(that) {
  $(that).siblings('input').val(' ')
  $('.invite-search-result').addClass('popup')
}
function changeTreeShow(that, treeId) {
  if (treeId != wuyi.nowTreeId) {
    $(that).parent().addClass('isClick')
    setTimeout(function () {
      $(that).parent().removeClass('isClick')
      layer.msg('已为您切换到这棵树的状态')
      wuyi.createdTreePage(treeId)
    }, 50)
  }
}
function lookSVGAImg() {
  if (wuyi.code == '-100') return
  if (wuyi.nowTreeLevel < 9) return
  if (wuyi.lookSVGAFlag) {
    wuyi.lookSVGAFlag = false
    showSvgaImg()
  }
}
function showSvgaImg() {
  layer.closeAll()
  $('#canvas').removeClass('popup')
  $('.tree-main-item img').addClass('popup')
  var player = new SVGA.Player('#canvas');
  player.loops = 1;
  player.clearsAfterStop = false;
  var parser = new SVGA.Parser('#canvas');
  parser.load('./svg/' + wuyi.nowTreeLevel + '.svga', function (videoItem) {
    player.setVideoItem(videoItem);
    player.startAnimation();
    player.onFinished(function () {
      console.log("11111")
    });
  })
  setTimeout(function () {
    player.stopAnimation()
    $('#canvas').addClass('popup')
    $('.tree-main-item img').removeClass('popup')
    wuyi.lookSVGAFlag = true
  }, 5000)
}
function closeRefresh() {
  layer.closeAll()
  wuyi.recommendId = ''
  $('.invite-search-input').val('')
  $('.invite-search-result').addClass('popup')
}
function showEllipsis(ele) {
  ele.each(function () {
    var len = $(this).text().length;
    if (len > 5) {
      var str = "";
      str = $(this).text().substring(0, 4) + "...";
      $(this).html(str);
    }
  });
}
function setValue(s) {
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
  var l = s.split(".")[0].split("").reverse();
  t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("");
}
function showRemoveBtn(that) {
  $(that).siblings('.search-btn').addClass('popup').siblings('.invite-search-close').removeClass('popup')
}
function showSearchBtn(that) {
  $(that).siblings('.search-btn').removeClass('popup').siblings('.invite-search-close').addClass('popup')
}
function clearInput(that) {
  layer.closeAll()
  $(that).siblings('input').val('')
}
function changeDiaTop() {
  if (wuyi.isFrom == 'live') {
    $('.layui-layer.layui-layer-page.EnterName').css('cssText', 'top: 0 !important; z-index: 999999999999999;')
    $('.layui-layer.layui-layer-page.ChangeName').css('cssText', 'top: 0 !important; z-index: 999999999999999;')
    $('.layui-layer.layui-layer-page.DoInvite').css('cssText', 'top: 0 !important; z-index: 999999999999999;')
    $('.layui-layer.layui-layer-page.AcceptInviteOne').css('cssText', 'top: 0 !important; z-index: 999999999999999;')
    $('.layui-layer.layui-layer-page.AcceptInviteMulti').css('cssText', 'top: 0 !important; z-index: 999999999999999;')
  }
}
wuyi.init()