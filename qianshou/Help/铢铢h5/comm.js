var comm = {
  env: $config.getQueryStringByName("env") || 'demoQS',
  timer: null,
  mSlider: null,
  customerId: $config.getQueryStringByName('customerId'),
  // 检查内容是否填写
  init: function () {
    $("#addMyPic").bind('click', function () {
      if ($config.browser.versions.android) {
        $("#uploadPic").click();
      } else {
        window.webkit.messageHandlers.getMediaAccess.postMessage({})
      }
    });
    $("#picText").bind('click', function () {
      if ($config.browser.versions.android) {
        $("#uploadPic").click();
      } else {
        window.webkit.messageHandlers.getMediaAccess.postMessage({})
      }
    });
  },
  checkMaxInput: function () {
    var n = $("textarea").val().length;
    var maxLen = 200;
    var count = document.getElementById('numlimit');
    if (n > maxLen) {
      count.innerText = maxLen - n;
      count.style.color = 'red';
      return false;
    } else {
      count.innerText = maxLen - n;
      count.style.color = '#CECECE';
      return true;
    }
  },
  // 手机号格式
  isPhone: function (phoneNum) {
    let reg = /^1(3[0-9]|4[2,3,5,7,9]|5[0,1,2,3,5,6,7,8,9]|6[1,3,4,6,8,9]|7[2,3,5,6,7,8]|8[0-9]|9[0-9])\d{8}$/;
    return reg.test(phoneNum);
  },
}
// 展示可提交按钮
function isCanSubmit(type) {
  if ($('#suggestText').val().trim() != '' && $('#vCode').val().trim() != '' && $('#photoCode').val().trim() != '') {
    $('button').removeClass('gray')
  } else {
    $('button').addClass('gray')
  }
  if (type) {
    if ($('#photoCode').val().trim().length > 0) {
      $('.get-code').addClass('show-blue')
    } else {
      $('.get-code').removeClass('show-blue')
    }
  }
}
// 文本框实时字数
function countChar() {
  $('.text-num span').text(document.getElementById('suggestText').value.length)
  if (Number($('.text-num span').text()) > 1024) {
    $('.text-num span').addClass('red')
  } else {
    $('.text-num span').removeClass('red')
  }
}
// 提交
function submit() {
  if ($('button').hasClass('gray')) {
    return
  }
  if (arr && arr.length > 9) {
    layer.msg("亲，最多只能上传9张");
    return;
  }
  var form = document.forms[0];
  var formData = new FormData(form);
  if (arr && arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      formData.append("files", convertBase64UrlToBlob(arr[i]));
    }
  }
  formData.append('customerId', comm.customerId);
  formData.append('suggestType', 1);
  formData.append('question', $("#suggestText").val().trim());
  formData.append('tel', $("#photoCode").val().trim());
  formData.append('phoneVersion', os);
  formData.append('phoneModel', model);
  $.ajax({
    type: 'GET',
    url: $config.toUrl(comm.env, '/api/validateCode/check'),
    // url: 'https://testcall.jernal.cn/api/validateCode/check',
    data: {
      mobile: $('#photoCode').val().trim(),
      code: $('#vCode').val().trim(),
      specifier: 7
    },
    dataType: 'json',
    success: function (res) {
      if (res.code == 0) {
        $.ajax({
          type: 'POST',
          url: $config.toUrl(comm.env, '/api/foreverHtml/customerSuggest/addCustomerSuggest'),
          // url: 'https://testcall.jernal.cn/api/foreverHtml/customerSuggest/addCustomerSuggest',
          data: formData,
          contentType: false,    //这个一定要写
          processData: false, //这个也一定要写，不然会报错
          success: function (res) {
            if (res.code == 0) {
              layer.msg('您的意见已反馈')
              setTimeout(function () {
                goBack()
              }, 1500)
            } else {
              layer.msg(res.message)
              $('#vCode').val('')
            }
          },
          error: function () {
            layer.msg('网络异常')
          }
        })
      } else {
        if (res.code == '-10007') {
          layer.msg('验证码过期')
        } else if (res.code == '-10008') {
          layer.msg('验证码错误')
        } else {
          layer.msg(res.message)
        }
      }
    },
    error: function () {
      layer.msg('网络异常')
    }
  })
}
// 获取验证码
function getCode() {
  if (!$('.get-code').hasClass('show-blue')) {
    return
  }
  $('#vCode').val('')
  var photoNum = $('.phone-num input').val().trim()
  if ($('.get-code').hasClass('isTime')) {
    return
  }
  if (photoNum == '') {
    layer.msg('手机号不能为空')
    return
  }
  if (!comm.isPhone(photoNum)) {
    layer.msg('手机号格式错误')
    return
  }
  document.getElementsByClassName('sliderModel')[0].style.display = "flex";
  comm.mSlider = new window.mobileSlider(object)
}
function upLoadFile() {
  $("#uploadPic").click();
}
function remove(that) {
  $(that).parent()[0].remove()
  var index = arr.indexOf($($(that).parent()[0]).attr('baseStr'))
  arr.splice(index, 1)
}
function bodyScroll(event) {
  event.preventDefault();
}
// 图形拖动弹窗
var object = {
  bImg: 'imgWrap',
  sImg: 'smartImg',
  sImgOver: 'sliderOver',
  sliderF: 'slider',
  sliderBtn: 'sliderBtn',
  sliderBg: 'bgC_left',
  refreshBtn: 'sliderRefresh',
  range: 5,
  imgArr: ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg',
    'images/5.jpg'
  ],
  refreshCallback: function (e) {
    var showMessage = document.getElementsByClassName('showMessage')[0];
    showMessage.innerHTML = "";
    showMessage.style.color = "#333";
    document.body.addEventListener('touchmove', bodyScroll, { passive: false })
  },
  callback: function (e) {
    var showMessage = document.getElementsByClassName('showMessage')[0];
    if (!e) {
      showMessage.innerHTML = "验证失败，请重新验证";
      showMessage.style.color = "red";
    } else {
      showMessage.innerHTML = "验证成功！";
      showMessage.style.color = "green";
      $.ajax({
        type: 'GET',
        url: $config.toUrl(comm.env, '/api/validateCode/send'),
        // url: 'https://testcall.jernal.cn/api/validateCode/send',
        data: {
          mobile: $('.phone-num input').val(),
          specifier: 7
        },
        dataType: 'json',
        success: function (res) {
          if (res.code == 0) {
            layer.msg('验证码发送成功')
            document.body.removeEventListener('touchmove', bodyScroll, { passive: false })
          } else {
            layer.msg(res.message)
          }
        },
        error: function () {
          layer.msg('网络异常')
        }
      })
      setTimeout(function () {
        document.getElementsByClassName('sliderModel')[0].style.display = "none";
        $('.get-code').removeClass('show-blue').addClass('isTime').text('60s')
        var num = 60
        comm.timer = setInterval(function () {
          num--
          if (num < 10 && num >= 0) {
            num = '0' + num
          }
          $('.get-code').text(num + 's')
          if (num <= 0) {
            clearInterval(comm.timer)
            $('.get-code').text('获取验证码')
            $('.get-code').removeClass('isTime').addClass('show-blue')
          }
        }, 1000)
      }, 1000)
    }
  },
}
comm.init()