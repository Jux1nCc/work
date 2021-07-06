var CommonSubmit = function () {
    var self = this;
    this.init = function () {
        // 获取产品线基本信息
//        var params = getUrlParams();
//        self.appid = params.appid;
//        self.pageid = params.pageid ? params.pageid : '0';
//        self.info = {};
//        //extend_feedback_channel
//        if(params.activityId && params.activityId !== "") {
//           self['info'].extend_feedback_channel = unescape(params.activityId); 
//        }    
//        // 取缓存中列表页的父页面URL
//        if(localStorage.getItem("listReferrer")) {
//            self['info'].wr = localStorage.getItem("listReferrer");
//        }
//        // BaiduId  wise新增参数
//        if(params.bw && params.bw !== '') {
//            self['info'].bw = unescape(params.bw);
//        }
//       // Query  wise新增参数 extend_query 关键词
//        if(params.kw && params.kw !== '') {
//            self['info'].kw = unescape(params.kw);
//        }
//       // 页面版式  wise新增参数
//        if(params.tn && params.tn !== '') {
//            self['info'].tn = unescape(params.tn);
//        }
//
//
//        // 获取配置信息
//        var config = COMMONSUBMIT_CONFIG[self.appid]? COMMONSUBMIT_CONFIG[self.appid][self.pageid] : undefined;
//        if (config === undefined) {
//            //$('#submitbtn').text('该产品线未配置相应页面');
//            return;
//        }
//        self.headerConfig = config.head;
//        self.feedbackConfig = config.feedbackInfo;
//        self.hasUpload = config.hasUpload;
//        self.userConfig = config.userInfo;
//        self.submitted = config.submitted ? config.submitted : 'hold';

//        setHeader();
//        setFeedbackInfo();
//        setUserInfo();

        var u = navigator.userAgent;
        isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        setUpload();

        addListener();
    };
    this.hasNewMsg = function () {
        var params = {
            m: 'Client',
            a: 'getNotice',
            uid: uid,//目前写死
            appid: self.appid
        };
        var url = window.location.href.substr(0, window.location.href.indexOf("?"));
        $.getJSON(url, params, function (data) {
            if (data.newmsg != "0")
                $(".piaoxin").show();
        });
    };

    function addListener() {
        // 上传图片，图片预览
        // $("#uploadPic").bind('change', function () {
        //     imgPreview();
        // });

        $("#addMyPic").bind('click', function () {
            $("#uploadPic").click();
        });
        //
        //提交反馈信息
        if (isAndroid || isiOS) {
            $("#submitbtn").bind('touchend', function () {
                submitInfo();
            });
        } else {
            $("#submitbtn").bind('click', function () {
                submitInfo();
            });
        }
        // 字数控制
        $('textarea').bind('change, input', function () {
            //判断字数是否超出限制
            if (!checkMaxInput()) {
                showWarningTip('字数超出范围');
            }
        });
        // focus效果
        $('.itemObt').bind('focus', function () {
            $(this).removeClass('require-style');
            if ($(this).hasClass('itemTextArea')) {
                $(this).parent().removeClass('require-style');
            }
            // 软键盘弹起之后再调整滚动条位置
            if ($(this).offset().top > document.body.scrollHeight / 2) {
                setTimeout(function () {
                    window.scrollTo(0, document.body.scrollHeight);
                }, 500);
            }


        });


    }

    var clickFlag = false;

    function submitInfo() {
        if (infoIntergrityVerify() && infoValidityVerify()) {
            if (!checkMaxInput()) {
                $('.textWrapper').addClass('require-style');
                return;
            }
            if (arrayImg && arrayImg.length > 9) {
                layer.msg("亲，最多只能上传9张");
                return;
            }
            //alert(arrayImg.length);
            //return;
            // var objlist = $('.itemObt');
            // var urlParams = {
            //     uid: uid,
            //     appid: self.appid,
            //     ajax: 1
            //
            // };
            // // wise 字段
            // if (self.appid === '517') {
            //     $.extend(urlParams, self.info);
            // }
            //
            // for (var i = 0, len = objlist.length; i < len; i++) {
            //     var to = $(objlist[i]).data('to');
            //     var val = $(objlist[i]).val();
            //     if (to.trim() !== '' && val.trim() !== '') {
            //         if (to.trim() === 'wr') {
            //             //wr:extend_referer 若用户未填写，获取系统传入的链接
            //             self.info[to] = self.info[to] ? self.info[to] : '';
            //             if (val.trim() != '') {
            //                 urlParams[to] = val.trim();
            //             }
            //             else {
            //                 urlParams[to] = self.info[to];
            //             }
            //         }
            //         else {
            //             urlParams[to] = val.trim();
            //         }
            //     }
            // }

            // // 是否上传图片
            // if ($('.realPic').length !== 0) {
            //     var quality = 10;
            //     var compressPic = compress3($('.realPic')[0], quality);
            //     urlParams.screenshot = compressPic;
            // }

            /*var timeoutAlert; //计时器 30s超时
            timeoutAlert = setTimeout(function() {
                CloseDiv('uploading');
                ShowDiv('popError');
                setTimeout(function() {
                    CloseDiv('popError');
                },2000);
            },30000);*/
            if (clickFlag) {
                return;
            }
            clickFlag = true;
            var form = document.forms[0];
            var formData = new FormData(form);

            if (arrayImg && arrayImg.length > 0) {
                for (var i = 0; i < arrayImg.length; i++) {
                    formData.append("files", convertBase64UrlToBlob(arrayImg[i]));
                }
            }
            // var reg1 = new RegExp("data:image/jpeg;base64,", "g");
            // var reg2 = new RegExp("data:image/png;base64,", "g");
            // var reg3 = new RegExp("data:image/jpg;base64,", "g");

            document.getElementById("uploading").style.display = 'block';
//             if (pics[0].files.length > 0) {
//                 $(pics).localResizeIMG({
//                     width: 200,
//                     quality: 0.8,
//                     success: function (result) {
//                         console.log(result);
//                         formData.append('files', convertBase64UrlToBlob(result.base64));
//                     }
//
//                 });
//
// //                 $.each(pics, function (index, value) {
// // //            		var str = $(this).attr("src").replace(reg1,"").replace(reg2,"").replace(reg3,"");
// // //                	formData.append('file',str);    //将文件转成二进制形式
// //                     debugger;
// //                     formData.append('files', convertBase64UrlToBlob(value.src));
// //                     // arrayImg.push(convertBase64UrlToBlob(value.src));
// // //                     $(value).localResizeIMG({
// // //                         width: 200,
// // //                         quality: 0.8,
// // //                         success: function (result) {
// // //                             var img = new Image();
// // //                             img.src = result.base64;
// // // //                            $('body').append(img);
// // //                             console.log(result);
// // //                             arrayImg.push(convertBase64UrlToBlob(result.base64));
// // //                         }
// // //
// // //                     });
// //
// //                 });
//             }
            // formData.append('files', arrayImg);
            var url = window.location;
            var tokenCustomerId = getUrlParam(url, 'tokenCustomerId');
            var token = getUrlParam(url, 'token');
            formData.append('tokenCustomerId', tokenCustomerId);
            formData.append('token', token);
            formData.append('name', $("#name").val());
            formData.append('phone', $("#phone").val());
            formData.append('advise', $("#advise").val());
            $.ajax({
                url: "../api/customerRelation/fileupload",
                type: "POST",
                async: true,
                contentType: false,    //这个一定要写
                processData: false, //这个也一定要写，不然会报错
                data: formData,
                dataType: 'json',    //返回类型，有json，text，HTML。这里并没有jsonp格式，所以别妄想能用jsonp做跨域了。
                success: function (data) {
                    if (data.code == 0) {
                        $("#name").val("");
                        $("#phone").val("");
                        $("#advise").val("");
                        $("#imgDiv").html("");
                        CloseDiv("uploading");
                        ShowDiv('popSuccess');
                        setTimeout(function () {
                            CloseDiv('popSuccess');
                            document.getElementById("jumpToMe").click();
                        }, 2000);

                    } else {
//                		clearTimeout(timeoutAlert);
                        CloseDiv("uploading");
                        ShowDiv('popError');
                        setTimeout(function () {
                            CloseDiv('popError');
                        }, 2000);
                        layer.msg("提交失败，" + data.message);
                    }
                    clickFlag = false;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown, data) {
                    clickFlag = false;
                    layer.msg("系统异常，请联系客服人员");
                }
            });
            setTimeout(function () {
                document.getElementById("jumpToMe").click();
            }, 2000);
        }
    }


    function infoIntergrityVerify() {
        var checklist = $('input[data-required="true"], textarea[data-required="true"]');
        var res = true;
        for (var i = 0, len = checklist.length; i < len; i++) {
            var content = checklist[i].value;
            if (content.trim() === '') {
                res = false;
                if ($(checklist[i]).hasClass('itemTextArea')) {
                    $(checklist[i]).parent().addClass('require-style');
                }
                else {
                    $(checklist[i]).addClass('require-style');
                }

                window.scrollTo(0, $(checklist[i]).offset().top);

                return res;
            }
        }
        return res;
    }

    function infoValidityVerify() {
        var checklist = $('input[data-limit]');
        var res = true;
        for (var i = 0, len = checklist.length; i < len; i++) {
            var type = $(checklist[i]).data('limit');

            if (type.trim() !== '' && checklist[i].value.trim() !== '') {
                switch (type.trim()) {
                    case 'email':
                        if (!isEmail(checklist[i].value)) {
                            res = false;
                            ShowDiv('popEmailError');
                            setTimeout(function () {
                                CloseDiv('popEmailError');
                            }, 2000);
                            return res;
                        }
                        break;
                    case 'phone':
                        if (!(isPhone(checklist[i].value))) {
                            res = false;
                            return res;
                        }
                        break;
                }
            }
        }
        return res;
    }

    function imgPreview() {
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {

                    android: u.indexOf('Android') > -1
                    || u.indexOf('Linux') > -1,

                    iPhone: u.indexOf('iPhone') > -1,

                    iPad: u.indexOf('iPad') > -1,
                    iPod: u.indexOf('iPod') > -1,

                };
            }(),
            language: (navigator.browserLanguage || navigator.language)
                .toLowerCase()
        }

        // 如果浏览器不支持FileReader，则不处理
        if (!window.FileReader) {
            layer.msg('该浏览器不支持图片上传');
            return;
        }
        if (!browser.versions.android) {
            $('#imgDiv').html("");
        }
        var files = event.target.files;
        if (files.length > 9) {
            layer.msg('最大能上传9张图片');
            return;
        }
        var html = "";
        console.log("---------图片开始压缩显示");
        for (var i = 0; i < files.length; i++) {
            /*if (!f.type.match('image.*')) {
              continue;
            }*/
            var f = files[i];
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    var wrapper = $("#imgscan");
                    var imgItem;
                    imgItem = document.createElement('img');
                    imgItem = $(imgItem);
                    imgItem.addClass('realPic');

                    $(imgItem).data('size', e.loaded);
                    var sBase64 = e.target.result;

                    // 部分Android下base64字符串格式不完整
                    if (window.gIsAndroid && sBase64.indexOf("data:image/") != 0) {
//                  var sMime = sName.split(".").pop().toLowerCase();
//                  sBase64 = sBase64.replace("base64,", "image/" + sMime + ";base64,");
                    }
                    console.log("准备压缩");
                    // $(imgItem).localResizeIMG({
                    //     file: theFile,
                    //     width: 200,
                    //
                    //     quality: 0.8,
                    //
                    //     success: function (result) {
                    //         sBase64 = result.base64;
                    //         // $('body').append(img);
                    //         console.log("压缩成功");
                    //     }
                    // });

                    // f.src = sBase64;
                    imgItem.attr('src', sBase64);
                    if (browser.versions.android) {
                        $('#imgDiv').append(imgItem);
                        $('.onePic').css('display', 'none');
                        $("#imgscan").css('display', 'block');
                    } else {
                        $('#imgDiv').append(imgItem);
                        $('.onePic').css('display', 'none');
                        $("#imgscan").css('display', 'block');
                    }


                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    function setHeader() {
        // 是否有返回功能，是否有「我的反馈」
        /*var flag = self.headerConfig.return.hidden ? 'none': 'block';
        $('#returnBtn').css('display', flag);
        if (flag === 'block') {
            flag = self.headerConfig.return.url? self.headerConfig.return.url : '/Public/img/h5-list-arrow-left.png';
            $('#returnBtn').css('background-image', 'url("' + flag + '")');
        }
        flag = self.headerConfig.myfeedback.hidden? 'hidden': 'visible';
        $('#fbtn').css('visibility', flag);
        if (flag === 'visible') {
            if(uid != ""){//说明已经登陆
                // 获取“我的反馈”url
                var params = getUrlParams();
                if (self.appid == 517) {
                    params['a'] = 'historyCrossProductLine';
                } else {
                    params['a'] = 'history';
                }
                params['ajax'] = '0';
                params['uid'] = uid;
                var submitUrl = concatUrl("",params);
                document.getElementById("fbtn").href = submitUrl;

                $("#fbtn").css("visibility","visible");//"我的反馈"可见
                flag = self.headerConfig.myfeedback.url ? self.headerConfig.myfeedback.url : '/Public/img/h5-myfb.png';
                $('#fbtn').css('background-image', 'url("' + flag + '")');

                //飘新轮询：初次进入页面执行一次，后面每10分钟执行一次
                self.hasNewMsg();
                setInterval(function(){
                    self.hasNewMsg();
                },600000);

            }else {
        		// 说明还没有登录
                uid = '';
                $("#fbtn").css("visibility","hidden");//"我的反馈"可见
        		// 显示提示登录
                // $('#logonTip').css('visibility', 'visible');
            }
        }
        // 背景色
        flag = self.headerConfig.bgcolor? self.headerConfig.bgcolor: '#38f';
        $('#head').css('background-color', flag);
        // Head内容
        flag = self.headerConfig.title.hidden? 'none': 'block';
        $('#title').css('display', flag);
        if (flag) {
            var text = self.headerConfig.title.content? self.headerConfig.title.content : '用户反馈';
            var color = self.headerConfig.title.color? self.headerConfig.title.color: '#fff';
            $('#title').css('color', color).text(text);
        }*/
    }

    function setFeedbackInfo() {
        $('#feedbackInfo').children().remove();
        for (var i = 0, len = self.feedbackConfig.length; i < len; i++) {
            var item = createInfoItem(self.feedbackConfig[i]);
            $('#feedbackInfo').append(item);
        }
    }

    function setUserInfo() {
        $('#contactInfo').children().remove();
        var userInfo = createInfoItem(self.userConfig);
        $('#contactInfo').append(userInfo);
    }

    function setUpload() {
        if (self.hasUpload) {
            var uploadHtml = ''
                + '<div id = "imgscan" >'
                + '<div class="picItem" id = "addImgBtn" style="position: relative">'
                + '<input type="file" id="uploadPic" accept="image/*" class="upload-input" name="files[]"  >'
                + '<img class="onePic" src="/Public/img/camera.png" style="width:18px; position: absolute; bottom:3px; left:0;">'
                + '<span id="uploadSpan">上传问题截图</span>'
                + '<span id="lit" >（图片请不要超过2M）</span>'
                + '</div>'
                + '</div>';
            $('#imgUpload').append($(uploadHtml));
        }
    }

    function createInfoItem(item) {

        var title = item.title ? item.title : '未配置标题';
        var itemHtml = ''
            + '<div class="infoItem spreadWidth">'
            + '<div class="itemTitle spreadWidth">'
            + '<span class="itemContent">' + title + '</span>'
            + '</div>'
            + '</div>';
        var itemNode = $(itemHtml);
        // 副标题
        if (item.subTitle) {
            itemNode.find('.itemTitle').append($('<span class="itemContentAppend">' + item.subTitle + '</span>'));
        }
        // 行尾链接
        if (item.link) {
            itemNode.find('.itemTitle').append($('<a class="itemlink" href = "http://' + document.location.host + item.link.linkUrl + '">' + item.link.linkText + '</a>'));
        }

        // 判断类型
        var required = item.required ? item.required : false;
        var to = item.to ? item.to : '';
        switch (item.type) {
            case 'input':
                var placeholder = item.placeholder ? item.placeholder : '';
                var limit = item.limit ? item.limit : '';
                itemNode.append($('<input placeholder="' + placeholder + '" class="itemInput spreadWidth itemObt" data-limit = "' + limit + '" data-to = "' + to + '" data-required = "' + required + '"/>'));
                break;
            case 'select':
                var options = item.options ? item.options : [];
                var tmpHTML = '<div class="selBtn custom-select"><select class="itemSelect spreadWidth itemObt" data-to = "' + to + '">';
                for (var i = 0, len = options.length; i < len; i++) {
                    tmpHTML += '<option value="' + options[i].value + '">' + options[i].text + '</option>';
                }
                tmpHTML += '</select></div>';
                itemNode.append($(tmpHTML));
                break;
            case 'textarea':
                placeholder = item.placeholder ? item.placeholder : '';
                itemNode.append($('<div class="textWrapper"><textarea placeholder="' + placeholder + '" class="itemTextArea spreadWidth itemObt" data-to = "' + to + '" data-required = "' + required + '"></textarea></div>'));
                itemNode.append($('<span class="num">还可以输入<span id="numlimit">200</span>字</span>'));
                break;
        }
        return itemNode;
    }

    function compress3(source_img_obj) {
        // 如果尺寸小于150KB，则不进行压缩
        var size = $(source_img_obj).data('size');
        if (size / 1024 < 150) {
            return source_img_obj.src;
        }
        // ==========================
        var square = 580;
        var canvas = document.createElement('canvas');

        var oriWidth = source_img_obj.naturalWidth;
        var oriHeight = source_img_obj.naturalHeight;

        canvas.width = oriWidth;
        canvas.height = oriHeight;

        var context = canvas.getContext('2d');
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.drawImage(source_img_obj, 0, 0);
        var data = canvas.toDataURL('image/jpeg', 0.1);
        return data;
    }

    // // 获取网络类型
    // function getNetType() {
    //     var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{tyep:'unknown'};
    //     var type_text = ['unknown','ethernet','wifi','2g','3g','4g','none'];

    //     if(typeof(connection.type) == "number"){
    //         netType = type_text[connection.type];
    //     }else{
    //         netType = connection.type;
    //     }
    //     if(typeof(connection.bandwidth) == "number"){
    //         if(connection.bandwidth > 10){
    //             netType = 'wifi';
    //         }else if(connection.bandwidth > 2){
    //             netType = '3g';
    //         }else if(connection.bandwidth > 0){
    //             netType = '2g';
    //         }else if(connection.bandwidth == 0){
    //             netType = 'none';
    //         }else{
    //             netType = 'unknown';
    //         }
    //     }
    //     return netType;
    // }

    // 获取当前url的get参数
    function getUrlParams() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    function concatUrl(url, params) {
        if (-1 != url.indexOf('?')) {
            for (key in params) {
                if (params[key] != undefined) url += '&' + key + '=' + encodeURIComponent(params[key]);
            }
        }
        else {
            url += '?';
            for (key in params) {
                if (params[key] != undefined) url += key + '=' + encodeURIComponent(params[key]) + '&';
            }
            url = url.substr(0, url.length - 1);
        }
        return url;
    }

    function isEmail(email) {
        var szReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var res = szReg.test(email);
        return res;
    }

    function isPhone(sPhone) {
        if (!(/^1[3|4|5|8] \d{9}$/.test(sPhone))) {
            return false;
        }
        else {
            return true;
        }
    }

    function checkMaxInput() {
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
    }

    // 弹出警告
    function showWarningTip(text) {
        var html = ''
            + '<div class="popLayerWarning">'
            + '<span class="warning-tip-text">' + text + '</span>'
            + '</div>';
        $('body').append($(html));
        setTimeout(function () {
            $('.popLayerWarning').remove();
        }, 3000);
    }

    function ShowDiv(show_div) {
        document.getElementById(show_div).style.display = 'block';
    }

    function CloseDiv(show_div) {
        document.getElementById(show_div).style.display = 'none';
    }


};

//获取Url的参数
function getUrlParam(url, name) {
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(url);
    var items = null;
    if (matcher != null) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
}

var commonsubmit = new CommonSubmit();
commonsubmit.init();
