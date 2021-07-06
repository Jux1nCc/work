var singles = {
  appBool: openInWebview(),
  appType: $config.getQueryStringByName("appType"),
  init: function () {
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
    $config.addObserver()
    singles.diffApp()
    // $('.page').removeClass('popup')
  },
  diffApp: function () {
    if (singles.appType == 1) {
      $('.appUnit').text('聊币')
      $('.appEarning').addClass('popup')
      $('.appName').text('兔聊')
    } else {
      $('.appUnit').text('收益积分')
      $('.appName').text('觅伊')
    }
  }
}
// 分享
function shareTc() {
  var img = "http://miyiurl.rklive888.com/activities/singles/dev/image/share.png",
    title = '疯狂双十一，疯狂中大奖',
    subTitle = '嗨爆双十一，视频聊天专场';
  shareComm(img, title, subTitle)
}
singles.init()