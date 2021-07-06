var zhuzhu = {
  casePageNum: 2,   //牵手成功页码
  squarePageNum: 2,   //相亲广场页码
  dynamicPageNum: 2,   //产品动态页码
  detailTitle: null,  // 详情标题   用于渲染详情页
  detailText: null,  // 详情文本
  detailImgPath: null,   // 详情图片
  loadCaseArr: [],  // 页面上已加载的牵手成功  用于跳转详情页时传参
  loadSquareArr: [],  // 页面上已加载的相亲广场
  loadDynamicArr: [],  // 页面上已加载的产品动态
  init: function () {
    this.initpage()
  },
  initpage: function () {
    // 进去页面 判断是否是主页
    if (window.location.href.indexOf('index') == -1) {
      // 非首页 初始化头部及尾部
      this.initHead()
      this.initFoot()
      this.initpageWrap($config.getQueryStringByName('type'), $config.getQueryStringByName('id')) // 开始渲染页面
    } else {
      // 首页  初始化轮播
      new Swiper('.swiper-container', {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
    }
  },
  // 初始化头部
  initHead: function () {
    var type = $config.getQueryStringByName('type')
    $('#head').html(
      '<header>' +
      '<img id="logo" src="images/logo.png"></img>' +
      '<button onclick="showMenus()"></button>' +
      '<ul id="menuWrap" class="popup">' +
      '<li><a href="index.html">首页</a></li>' +
      '<li><a href="about.html?type=' + "about" + '">关于我们</a></li>' +
      '<li><a href="case.html?type=' + "case" + '">牵手成功</a></li>' +
      '<li><a href="square.html?type=' + "square" + '">相亲广场</a></li>' +
      '<li><a href="dynamic.html?type=' + "dynamic" + '">产品动态</a></li>' +
      '</ul>' +
      '</header>' +
      '<nav>' +
      '<img src="images/back.png" onclick="backToIndex()">' +
      '<h2>' + (type == 'about' ? '关于我们' : type == 'case' ? '牵手成功' : type == 'square' ? '相亲广场' : '产品动态') + '</h2>' +
      '</nav>'
    )
  },
  // 初始化尾部
  initFoot: function () {
    $('footer').text('版权所有@深圳市镜玩科技有限公司 粤ICP备：16028473号')
  },
  // 渲染页面
  initpageWrap: function (type, id) {
    if (id) { // 链接带ID参数为详情页
      switch (type) {
        case 'case':
          this.renderDetail(caseDetailArr, id)
          break;
        case 'square':
          this.renderDetail(squareDetailArr, id)
          break;
        case 'dynamic':
          this.renderDetail(dynamicDetailArr, id)
          break;
      }
      $('#detailWrap h1').text(zhuzhu.detailTitle)
      $('#detailWrap p').text(zhuzhu.tedetailTextxt)
      $('#detailWrap img').attr('src', zhuzhu.detailImgPath)
    } else {  // 链接不带ID参数为列表页
      switch (type) {
        case 'case':
          this.renderPage(caseArr, 'casePageWrap')
          break;
        case 'square':
          this.renderPage(squareArr, 'squarePageWrap')
          break;
        case 'dynamic':
          this.renderPage(dynamicArr, 'dynamicPageWrap')
          break;
      }
    }
  },
  // 渲染详情页
  renderDetail: function (array, id) {
    array.forEach(() => {
      zhuzhu.detailTitle = array[id].title
      zhuzhu.detailText = array[id].text
      zhuzhu.detailImgPath = array[id].imgPath
    });
  },
  renderPage: function (array, domEle, page) {
    // 首次进入页面 默认第一页
    if (page) {
      // 传入页码 根据页码 截取6条数据
      var arr = array.slice((page - 1) * 6, page * 6)
    } else {
      // 未传入页码  默认截取前6条数据
      var arr = array.slice(0, 6)
    }
    switch (domEle) {
      case 'casePageWrap':
        arr.forEach((ele) => {
          var str =
            '<li onclick="toDetail(' + "'case', " + this.loadCaseArr.length + ')">' +
            '<img src="' + ele.imgPath + '">' +
            '<h2>' + ele.title + '</h2>' +
            '<p>' + ele.text + '</p>' +
            '</li>'
          this.loadCaseArr.push(ele)  // 将渲染的数据存起来 用于传参详情页
          $('#casePageWrap').append(str)
        });
        break;
      case 'squarePageWrap':
        arr.forEach((ele) => {
          var str =
            `
              <li onclick="toDetail('square', ${this.loadSquareArr.length})">
                <img src="${ele.imgPath}">
                <div class="userInfo column">
                  <h6>${ele.name}</h6>
                  <p>${ele.sex} ${ele.age}岁 ${ele.height}cm ${ele.area}</p>
                  <p>职业：${ele.job}</p>
                </div>
              </li>
            `
          this.loadSquareArr.push(ele)
          $('#squarePageWrap').append(str)
        });
        break;
      case 'dynamicPageWrap':
        arr.forEach((ele) => {
          var str =
            `
              <li onclick="toDetail('dynamic', ${this.loadDynamicArr.length})">
                <div class="date column">
                  <span class="month">${ele.month}</span>
                  <span class="year">${ele.year}</span>
                </div>
                <div class="dynamic-detail">
                  <h5 class="dynamic-title">${ele.title}</h5>
                  <p class="dynamic-text">${ele.text}</p>
                </div>
              </li>
            `
          this.loadDynamicArr.push(ele)
          $('#dynamicPageWrap').append(str)
        });
        break;
    }
  },
}
function toDetail(type, id) {
  window.location.href = 'detail.html?type=' + type + '&id=' + id
}
// 展示隐藏菜单
function showMenus() {
  $('#menuWrap').fadeToggle()
}
// 返回首页
function backToIndex() {
  if ($config.getQueryStringByName('id')) {
    window.history.back()
  } else {
    window.location.href = 'index.html'
  }
}
// 分页按钮
function pageEvent(that, type) {
  switch (type) {
    case 'case':
      if ((zhuzhu.casePageNum - 1) * 6 > caseArr.length) {
        layer.msg('没有更多了')
        $(that).addClass('popup')
        return
      }
      zhuzhu.renderPage(caseArr, 'casePageWrap', zhuzhu.casePageNum)
      zhuzhu.casePageNum++
      break;
    case 'square':
      if ((zhuzhu.squarePageNum - 1) * 6 > squareArr.length) {
        layer.msg('没有更多了')
        $(that).addClass('popup')
        return
      }
      zhuzhu.renderPage(squareArr, 'squarePageWrap', zhuzhu.squarePageNum)
      zhuzhu.squarePageNum++
      break;
    case 'dynamic':
      if ((zhuzhu.dynamicPageNum - 1) * 6 > dynamicArr.length) {
        layer.msg('没有更多了')
        $(that).addClass('popup')
        return
      }
      zhuzhu.renderPage(dynamicArr, 'dynamicPageWrap', zhuzhu.dynamicPageNum)
      zhuzhu.dynamicPageNum++
      break;
  }
}
// 下载APP
function downLoadApp() {
  if ($config.browser.versions.android) {
    window.location.href = "https://jw-version.oss-cn-shenzhen.aliyuncs.com/android/myzh6.apk"
  } else {
    var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
    new OpenInstall({
      /*appKey必选参数，openinstall平台为每个应用分配的ID*/
      appKey: 'c6xjxt',
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
zhuzhu.init()