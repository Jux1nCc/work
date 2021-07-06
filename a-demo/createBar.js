var bar = {
    // 导航栏配置
    title: document.title,
    backObj: { type: 3, detail: '' },  //左侧返回键
    rightBtn: { title: '', url: '' },  //右侧按钮
    color: { bg: '#fff', font: '#333' },
    browser: {
        versions: function () {
            var u = navigator.userAgent;
            return {
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1,
                iPad: u.indexOf('iPad') > -1,
                iPod: u.indexOf('iPod') > -1,

            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },// 设置导航栏
    createBar: function () {
        var str = '<div class="bar header-bar header-bar-nav flexbox between col-end">'
            + '       <a class="header-back header-icon header-icon-left-nav header-pull-left" onclick="doBack()"></a>'
            + (bar.rightBtn.title ? '<a class="header-pull-right" onclick="jump()">' + bar.rightBtn.title + '</a>' : '')
            + '       <h1 class="header-title">' + bar.title + '</h1>'
            + '   </div>'
        $('body>div:first-of-type').prepend(str)
        // bar样式，颜色调整
        setTimeout(function () {
            $('.header-bar *').css({ 'color': bar.color.font, 'border-color': bar.color.font, 'background': bar.color.bg })
            $('.header-bar').css('background', bar.color.bg)
        }, 100)
    },
    goBack: function () {
        window.history.back(-1)
    },
    setBar: function (color, backObj, rightBtn) {
        // 导航栏样式
        bar.color = color
        // 右侧操作按钮
        bar.rightBtn = rightBtn
        // 左侧按钮返回事件
        bar.backObj = backObj

        bar.createBar()
    }
}
function jump() {
    // 1,跳转指定页面
    // 2，与客户端交互方法
    if (bar.rightBtn.url) {
        window.location.href = bar.rightBtn.url
    } else if (bar.rightBtn.fn) {
        bar.rightBtn.fn()
        // if (bar.rightBtn.jumpTo) {
        //     var fn = bar.rightBtn.jumpTo
        //     var pms = bar.rightBtn.params ? bar.rightBtn.params.join(',') : null
        //     if (bar.browser.versions.android) {
        //         client.fn(pms);
        //     } else {
        //         window.webkit.messageHandlers[fn].postMessage({ pms });
        //     }
        // }
    }
}
function doBack() {
    // 1,返回上一级
    // 2,返回指定界面
    // 3,退出网页
    switch (bar.backObj.type) {
        case 1: goHistory(); break;
        case 2: window.location.href = bar.backObj.detail; break;
        case 3: goBack(); break;
    }
}
function goHistory() {
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) { // IE
        if (history.length > 0) {
            window.history.go(-1);
            return;
        } else {
            goBack()
            return;
        }
    } else if (navigator.userAgent.indexOf('Firefox') >= 0 ||
        navigator.userAgent.indexOf('Opera') >= 0 ||
        navigator.userAgent.indexOf('Safari') >= 0 ||
        navigator.userAgent.indexOf('Chrome') >= 0 ||
        navigator.userAgent.indexOf('WebKit') >= 0) {
        //非IE浏览器
        if (window.history.length > 1) {
            window.history.go(-1);
            return;
        } else {
            goBack()
            return;
        }
    } else { //未知的浏览器
        goBack()
    }

}
function goBack() {
    if (bar.browser.versions.android) {
        client.jumpToMe();
    } else {
        window.webkit.messageHandlers.jumpToMe.postMessage({});
    }
}
$bar = bar