var advice = {
  env: $config.getQueryStringByName("env") || 'demoQS',
  customerId: $config.getQueryStringByName('customerId'),
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
    if ($config.browser.versions.android) {
      $('.apple').addClass('popup')
    }
  },
  getUserMedia: function () {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, function onSuccess(stream) {
        console.log('已点击允许,开启成功');
      }, function onError(error) {
        console.log("错误：", error);
      });
    }
  },
  isPhone: function (phoneNum) {
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(phoneNum);
  },
}
function isCanSubmit(type) {
  if ($('#suggestText').val().trim() != '' && $('#name').val().trim() != '' && $('#photoCode').val().trim() != '') {
    $('.btn-item').removeClass('gray')
  } else {
    $('.btn-item').addClass('gray')
  }
  if (type) {
    if ($('#photoCode').val().trim().length > 11) {
      $('#photoCode').val($('#photoCode').val().trim().slice(0, 11))
    }
  }
}
function submit() {
  if ($('.btn-item').hasClass('gray')) {
    return
  }
  if (arr && arr.length > 9) {
    layer.msg("亲，最多只能上传9张");
    return;
  }
  if ($('#photoCode').val().trim().length != 11 || !advice.isPhone($("#photoCode").val().trim())) {
    layer.msg('请输入正确的手机号')
    return
  }
  var form = document.forms[0];
  var formData = new FormData(form);
  if (arr && arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      formData.append("files", convertBase64UrlToBlob(arr[i]));
    }
  }
  formData.append('customerId', advice.customerId);
  formData.append('suggestType', '2');
  formData.append('customerName', $("#name").val().trim());
  formData.append('question', $("#suggestText").val().trim());
  formData.append('tel', $("#photoCode").val().trim());
  formData.append('phoneVersion', os);
  formData.append('phoneModel', model);
  $.ajax({
    type: 'POST',
    url: $config.toUrl(advice.env, '/api/foreverHtml/customerSuggest/addCustomerSuggest'),
    // url: 'https://testcall.jernal.cn/api/foreverHtml/customerSuggest/addCustomerSuggest',
    data: formData,
    contentType: false,    //这个一定要写
    processData: false, //这个也一定要写，不然会报错
    success: function (res) {
      if (res.code == 0) {
        layer.msg('您的意见已反馈')
        $('.btn-item').addClass('gray')
        $('#suggestText').val(' ')
        $('#name').val(' ')
        $('#photoCode').val(' ')
        arr.length = 0
        $('.photo-wrap .up-photo').remove()
        setTimeout(function () {
          goBack()
        }, 1500)
      } else {
        layer.msg(res.message)
      }
    },
    error: function () {
      layer.msg('网络异常')
    }
  })
}
function remove(that) {
  $(that).parent()[0].remove()
  var index = arr.indexOf($($(that).parent()[0]).attr('baseStr'))
  arr.splice(index, 1)
  if (arr.length == 0) {
    $('.btn-item').addClass('gray')
  }
}
function upLoadFile(type) {
  if (type) {
    $('#uploadPic').attr('capture', 'camera')
    $("#uploadPic").click();
  } else {
    $("#uploadPic").click();
  }
}
advice.init()