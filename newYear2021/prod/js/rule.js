var newYear = {
  sex: $config.getQueryStringByName("sex"),
  appType: $config.getQueryStringByName("appType"),
  init: function(){
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
    if(newYear.sex == 1){
      $('.sex-1').removeClass('popup')
      $('.sex-0').addClass('popup')
    }else {
      $('.sex-0').removeClass('popup')
      $('.sex-1').addClass('popup')
    }
    if(newYear.appType == 2){
      $('.appGold').text('黄金贵族')
      $('.appVip').text('白银贵族')
      $('.appUnit').text('钻石')
      $('.appDress').text('我-更多-个性装扮')
      $('.appName').text('觅伊')
    }else{
      $('.appGold').text('高级会员')
      $('.appVip').text('普通会员')
      $('.appUnit').text('聊币')
      $('.appDress').text('我-更多-个性商城-已有装扮')
      $('.appName').text('兔聊')
    }
  }
}
function changeNav(type){
  if(type){
    $('.nav-des').removeClass('small-nav').addClass('big-nav').attr('data-src','./images/rule-btn_1.png')
    $('.nav-award').removeClass('big-nav').addClass('small-nav').attr('data-src','./images/rule-btn_0.png')
    $('.rule-des').removeClass('popup')
    $('.rule-award').addClass('popup')
  }else {
    $('.nav-des').removeClass('big-nav').addClass('small-nav').attr('data-src','./images/rule-btn_0.png')
    $('.nav-award').removeClass('small-nav').addClass('big-nav').attr('data-src','./images/rule-btn_1.png')
    $('.rule-des').addClass('popup')
    $('.rule-award').removeClass('popup')
  }
  newYear.init()
}
newYear.init()