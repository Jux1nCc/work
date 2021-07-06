let lang;
$(function () {
    lang = navigator.language || navigator.userLanguage;//常规浏览器语言和IE浏览器
    $.ajaxSetup({
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
})
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

const phones = {
    'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
    'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
    'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
    'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
    'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
    'da-DK': /^(\+?45)?(\d{8})$/,
    'el-GR': /^(\+?30)?(69\d{8})$/,
    'en-AU': /^(\+?61|0)4\d{8}$/,
    'en-GB': /^(\+?44|0)7\d{9}$/,
    'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
    'en-IN': /^(\+?91|0)?[789]\d{9}$/,
    'en-NZ': /^(\+?64|0)2\d{7,9}$/,
    'en-ZA': /^(\+?27|0)\d{9}$/,
    'en-ZM': /^(\+?26)?09[567]\d{7}$/,
    'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
    'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
    'fr-FR': /^(\+?33|0)[67]\d{8}$/,
    'he-IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
    'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
    'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
    'ja-JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
    'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
    'nb-NO': /^(\+?47)?[49]\d{7}$/,
    'nl-BE': /^(\+?32|0)4?\d{8}$/,
    'nn-NO': /^(\+?47)?[49]\d{7}$/,
    'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
    'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
    'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
    'ru-RU': /^(\+?7|8)?9\d{9}$/,
    'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
    'tr-TR': /^(\+?90|0)?5\d{9}$/,
    'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
    'zh-CN': /^(\+?0?86\-?)?1[23456789]\d{9}$/,
    'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
};

function submitDataForm() {
    let isPass = true;
    $("#dataForm :input").each(function (i, item) {
        const name = $(item).attr("name");
        const val = $(item).val();
        if (name == "customerId" && $.isEmptyObject(val)) {
            alert("请填写兔聊ID！");
            isPass = false;
            return false;
        }
        if (name == "mobile") {
            if ($.isEmptyObject(val)) {
                alert("请填写手机号！");
                isPass = false;
                return false;
            }
            if (!phones[lang].test(val)) {
                alert("请填写正确的手机号！");
                isPass = false;
                return false;
            }
        }
        if (name == "intro" && $.isEmptyObject(val)) {
            alert("请填写个人介绍！");
            isPass = false;
            return false;
        }
    });

    if (isPass) {
        $.post("/api/recruit/submit", JSON.stringify($("#dataForm").serializeObject()), function (result) {
            alert(result.message);
        }, "json");
    }
}

const browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1,
            iPad: u.indexOf('iPad') > -1,
            iPod: u.indexOf('iPod') > -1,

        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function shareTc() {
    const curWwwPath = window.document.location.href;
    const pathName = window.document.location.pathname;
    const pos = curWwwPath.indexOf(pathName);
    const localhostPaht = curWwwPath.substring(0, pos);
    let img;
    let title;
    let subtitle;
    let url;
    img = "http://jw-version.oss-cn-shenzhen.aliyuncs.com/android/t_picture_new1557472473347.png?x-oss-process=image/resize,w_200";
    title = "兔聊才艺主播招募令";
    subtitle = "海量资源扶持，马上报名";
    url = localhostPaht + "/view/recruit/recruitment.html?1=1";
    const sharingState = 3;
    if (browser.versions.android) {
        client.jumpToShare(img, title, url, subtitle, sharingState);
    } else {
        window.webkit.messageHandlers.jumpToShare.postMessage({img: img, title: title, url: url, subtitle: subtitle, type: sharingState, shareLink: 0});
    }
}