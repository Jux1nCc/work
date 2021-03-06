(function () {
  
  function mobileSlider(params) {
    var object = {
      bImg: params.bImg, //大图片的盒子
      sImg: params.sImg, //图片上的小图片
      sImgOver: params.sImgOver, //图片上的占位区域
      sliderF: params.sliderF, //滑块的父元素
      sliderBtn: params.sliderBtn, //滑块
      sliderBg: params.sliderBg, //滑块滑动过程中的背景块
      refreshBtn: params.refreshBtn, //刷新按钮
      range: params.range, //验证通过的运行范围值
      imgArr: params.imgArr, //图片数组
      refreshCallback: params.refreshCallback, //刷新回调
      callback: params.callback //验证回调函数，true为成功，false为失败
    };
  
    var sliderF = document.getElementById(object.sliderF);
    var sliderBtn = document.getElementById(object.sliderBtn);
    var sliderBg = document.getElementById(object.sliderBg);
    var sImg = document.getElementById(object.sImg);
    var bImg = document.getElementById(object.bImg);
    var sImgOver = document.getElementById(object.sImgOver);
    var refreshBtn = document.getElementById(object.refreshBtn);
    var max_left = sliderF.offsetWidth - sliderBtn.offsetWidth;
    var sImgBeginLeft = 0;
  
  
    function refresh() {
      sliderBtn.style.left = sliderBg.style.width = 0;
      sImgBeginLeft = 0;
      var ram = Math.random();
      var imgIndex = Math.floor(object.imgArr.length * ram);
      var imgSrc = object.imgArr[imgIndex];
      bImg.getElementsByClassName('img')[0].src = sImg.getElementsByClassName('simg')[0].src = imgSrc;
      sImgOver.style.left = Math.floor(bImg.offsetWidth / 2 + bImg.offsetWidth / 2 * ram - sImgOver.offsetWidth - 6) + "px";
      sImg.style.left = sImgBeginLeft = Math.floor((bImg.offsetWidth / 2 - sImgOver.offsetWidth) * ram) + "px";
      sImgOver.style.top = sImg.style.top = Math.floor((bImg.offsetHeight - sImgOver.offsetWidth - 10) * ram + 10) + "px";
      sImg.getElementsByClassName('simg')[0].style.left = -Math.floor(bImg.offsetWidth / 2 + bImg.offsetWidth / 2 * ram - sImgOver.offsetWidth - 6) + "px";
      sImg.getElementsByClassName('simg')[0].style.top = -Math.floor((bImg.offsetHeight - sImgOver.offsetWidth - 10) * ram + 10) + "px";
      object.refreshCallback(true)
    }
    refresh();
  
    sliderBtn.ontouchstart = function (e) {
      var ev = e || window.event
      var downX = ev.touches[0].pageX;
      var sImgLeft = parseInt(sImg.style.left);
      this.ontouchmove = function (e) {
        var ev = e || window.event;
        var leftX = ev.touches[0].pageX - downX;
        leftX = leftX < 0 ? 0 : (leftX < max_left ? leftX : max_left)
        sliderBtn.style.left = leftX + 'px';
        sliderBg.style.width = leftX + sliderBtn.offsetWidth / 2 + "px";
        sImg.style.left = leftX + sImgLeft + "px";
      }
      this.ontouchend = function (e) {
        this.ontouchmove = null; //移除移动事件
        var sImgLeft = parseInt(sImg.style.left);
        var sImgOverLeft = parseInt(sImgOver.style.left);
        if (Math.abs(sImgOverLeft - sImgLeft) < object.range) {
          object.callback && object.callback(true)
        } else {
          object.callback && object.callback(false)
          var timer = null,
            step = 10;
          var sliderBtnLeft = parseInt(sliderBtn.style.left)
          timer = setInterval(function () {
            sliderBtnLeft -= step;
            step += 5;
            if (sliderBtnLeft <= 0) {
              clearInterval(timer);
              sliderBtnLeft = 0;
              sliderBtn.style.left = sliderBg.style.width = 0;
              sImg.style.left = parseInt(sImgBeginLeft) + "px"
            }
            sliderBtn.style.left = sliderBg.style.width = sliderBtnLeft + "px";
            sImg.style.left = sliderBtnLeft + parseInt(sImgBeginLeft) + "px"
          }, 20)
  
        }
      }
    };
  
  
  
    refreshBtn.ontouchstart = function () {
      refresh()
    }
  
  }
  
  window.mobileSlider = mobileSlider;
})()