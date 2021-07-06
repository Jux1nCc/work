var singles = {
  appBool: openInWebview(),
  appType: $config.getQueryStringByName("appType"),
  init: function () {
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
    $config.addObserver()
    singles.diffApp()
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
function shareTc() {
  var img = "http://miyiurl.rklive888.com/activities/singles/dev/image/share_girl.png",
    title = '嗨爆11.11，视频聊天专场',
    subTitle = '聊天轻松拿奖励，天天都有！';
  shareComm(img, title, subTitle)
}
singles.init()