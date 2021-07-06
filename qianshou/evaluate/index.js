var eval = {
    env: $config.getQueryStringByName("env") || 'prodQS',
    opId: $config.getQueryStringByName('opId'),
    flag: 0,    // 防重复点击
    smallAudioTimer: null,  //录音时间 计时器
    AudioProgressTimer: null,   // 录音进度条计时器
    blob: null, // 录音文件
    duration: null, // 录音时长
    audio: null,    // 录音对象
    playI: 1,
    timeNum: null,
    isSubmitAudio: 0,   // 是否提交录音
    isSubmitPic: 0,   // 是否提交照片
    isSubmitVideo: 0,   // 是否提交视频
    nickName: '铢铢',   // 昵称
    videoDuration: null,    // 视频时长
    videoSize: null,    // 视频大小
    videoUrl: null,    // 视频文件
    videoDataUrl: null,    // 视频封面
    base64File: null,
    isRadioing: null,
    init: function () {
        // 判断是否ios微信打开
        if (!$config.browser.versions.android && eval.isWeiXin()) {
            $config.dialogComm($('#openInIphone'), 'openInIphone')
            return
        }
        eval.created()
        // 绑定点击事件 点击上传图片
        $("#addMyPic").bind('click', function () {
            if (eval.AudioProgressTimer || eval.duration || eval.videoUrl || eval.isRadioing) {
                mui.confirm('切换其他评价方式将会丢失当前评价方式所填写的内容。是否切换为其他评价方式？', ' ', function (e) {
                    if (e.index == 1) {
                        restartRec()    // 重置录音
                        replayVideo()    // 重置视频
                    }
                })
                return
            }
            $("#uploadPic").click();    // input上传
        });
        // 绑定点击事件 打开摄像头
        $('#starTakeVideo').bind('click', function () {
            if (eval.AudioProgressTimer || eval.duration || $('#suggestText').val() || $('.picture-item .up-photo').length) {
                mui.confirm('切换其他评价方式将会丢失当前评价方式所填写的内容。是否切换为其他评价方式？', ' ', function (e) {
                    if (e.index == 1) {
                        // 重置文本上传
                        $('.pic-item-text').removeClass('popup')
                        $('.pic-submit').removeClass('red')
                        $('#suggestText').val('')
                        $('#uploadPic').val('')
                        upLoadFile()
                        restartRec() // 重置录音
                        $(".openCamera").click()
                    }
                })
                return
            }
            $(".openCamera").click()    // input打开摄像头
        });
        // 绑定点击事件 上传视频
        $('#starUpVideo').bind('click', function () {
            if (eval.AudioProgressTimer || eval.duration || $('#suggestText').val() || $('.picture-item .up-photo').length) {
                mui.confirm('切换其他评价方式将会丢失当前评价方式所填写的内容。是否切换为其他评价方式？', ' ', function (e) {
                    if (e.index == 1) {
                        // 重置文本上传
                        $('.pic-item-text').removeClass('popup')
                        $('.pic-submit').removeClass('red')
                        $('#suggestText').val('')
                        $('#uploadPic').val('')
                        upLoadFile()
                        restartRec()// 重置录音
                        $(".loadVideo").click()
                    }
                })
                return
            }
            $(".loadVideo").click();    // input上传
        });
    },
    created: function () {  // 请求接口 获取初始数据
        layer.open({ type: 3 }) // 加载中icon
        $.ajax({
            type: 'POST',
            url: $config.toUrl(eval.env, '/api/foreverHtml/friendEvaluation/openValidationLink'),
            data: { opId: eval.opId },
            dataType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                layer.closeAll()
                if (res.code == 0) {
                    eval.nickName = res.data.nickName
                    eval.isSubmitPic = res.data.imageTextFlag
                    eval.isSubmitAudio = res.data.voiceFlag
                    eval.isSubmitVideo = res.data.videoFlag
                    //  三项评价都已填写 跳转官网
                    if (res.data.imageTextFlag == 1 && res.data.voiceFlag == 1 && res.data.videoFlag == 1) {
                        layer.msg('你已为朋友助力成功!<br />欢迎下载体验"铢铢", 寻找真爱!')
                        document.body.addEventListener(
                            'touchmove',
                            function (e) {
                                e.preventDefault()
                            },
                            { passive: false }
                        )
                        setTimeout(function () {
                            window.location.href = 'https://www.jernal.cn/'
                        }, 2000)
                        return
                    }
                    eval.mounted(res.data)
                }
                if (res.code == '-10001') {
                    layer.msg('缺少参数', {
                        time: false,
                        shade: 0.5
                    })
                    document.body.addEventListener( // 防止滚动穿透
                        'touchmove',
                        function (e) {
                            e.preventDefault()
                        },
                        { passive: false }
                    )
                } else if (res.code == '-10000') {
                    layer.msg(res.message, {
                        time: false,
                        shade: 0.5
                    })
                    document.body.addEventListener(
                        'touchmove',
                        function (e) {
                            e.preventDefault()
                        },
                        { passive: false }
                    )
                }
            },
            error: function () {
                layer.closeAll()
                layer.msg('网络异常', {
                    time: false,
                    shade: 0.5
                })
                document.body.addEventListener(
                    'touchmove',
                    function (e) {
                        e.preventDefault() //阻止默认的处理方式(阻止下拉滑动的效果)
                    },
                    { passive: false }
                )
            }
        })
    },
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    // 试听按钮的进度条
    loadPercent: function (x, y) {
        var rotate = (x / y) * 360
        var rotateRight = 0
        var rotateLeft = 0
        if (rotate < 180) {
            rotateRight = rotate + (-46)
        } else {
            rotateRight = 136
            rotateLeft = (rotate - 180 - 46)
            $("#loop-lc").css({
                "transform": "rotate(" + rotateLeft + "deg)",
            })
        }
        $("#loop-rc").css({
            "transform": "rotate(" + rotateRight + "deg)",
        })
    },
    mounted: function (data) {
        // 判断是否填写某个评价
        $('.mt-text .nick-name').text('(' + data.nickName + ')')
        if (data.imageTextFlag == 1) {
            $('.pic-main').css('height', '4.18rem').addClass('column')
            $('.pic-main').html(
                '<img class="isDoPic" src="image/01.png">' +
                '<div class="isDoText column">' +
                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                '<p>希望你能再通过语音或视频方式说说印象中的我</p>' +
                '</div>'
            )
            if (data.voiceFlag == 1) {
                $('.pic-main').html(
                    '<img class="isDoPic" src="image/01.png">' +
                    '<div class="isDoText column">' +
                    '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                    '<p>希望你能再通过视频方式说说印象中的我</p>' +
                    '</div>'
                )
            } else if (data.videoFlag == 1) {
                $('.pic-main').html(
                    '<img class="isDoPic" src="image/01.png">' +
                    '<div class="isDoText column">' +
                    '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                    '<p>希望你能再通过语音方式说说印象中的我</p>' +
                    '</div>'
                )
            }
        }
        if (data.voiceFlag == 1) {
            $('.audio-main').html(
                '<img class="isDoPic" src="image/01.png">' +
                '<div class="isDoText column">' +
                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                '<p>希望你能再通过图文或视频方式说说印象中的我</p>' +
                '</div>'
            )
            if (data.imageTextFlag == 1) {
                $('.audio-main').html(
                    '<img class="isDoPic" src="image/01.png">' +
                    '<div class="isDoText column">' +
                    '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                    '<p>希望你能再通过视频方式说说印象中的我</p>' +
                    '</div>'
                )
            } else if (data.videoFlag == 1) {
                $('.audio-main').html(
                    '<img class="isDoPic" src="image/01.png">' +
                    '<div class="isDoText column">' +
                    '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                    '<p>希望你能再通过图文方式说说印象中的我</p>' +
                    '</div>'
                )
            }
        }
        if (data.videoFlag == 1) {
            $('.video-main').html(
                '<img class="isDoPic" src="image/01.png">' +
                '<div class="isDoText column">' +
                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                '<p>希望你能再通过图文或语音方式说说印象中的我</p>' +
                '</div>'
            )
            if (data.imageTextFlag == 1) {
                $('.video-main').html(
                    '<img class="isDoPic" src="image/01.png">' +
                    '<div class="isDoText column">' +
                    '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                    '<p>希望你能再通过语音方式说说印象中的我</p>' +
                    '</div>'
                )
            } else if (data.voiceFlag == 1) {
                $('.video-main').html(
                    '<img class="isDoPic" src="image/01.png">' +
                    '<div class="isDoText column">' +
                    '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                    '<p>希望你能再通过图文方式说说印象中的我</p>' +
                    '</div>'
                )
            }
        }
    }
}
function countChar(that) {  // 控制文本上传长度
    var suggestStr = $(that).val()
    if ($(that).val().trim().length >= 500) {
        $(that).val(suggestStr.slice(0, 500))
    }
    $('.text-num span').text(document.getElementById('suggestText').value.length)
    if ($(that).val().trim().length != 0) {
        $('.pic-submit').addClass('red')
        openDialog($('#openSubmitDia'), 'openSubmitDia')
    } else {
        $('.pic-submit').removeClass('red')
    }
}
function remove(that) { // 点击删除已选择照片
    $(that).parent()[0].remove()
    var index = arr.indexOf($($(that).parent()[0]).attr('baseStr'))
    arr.splice(index, 1)
    if (arr.length == 0) {
        $('.pic-item-text').removeClass('popup')
    }
}
function upLoadFile() { // 清除已选择的所有照片
    arr.length = 0
    $('.picture-item .up-photo').remove()
}
function submitPic() {
    if (eval.flag) {
        return
    }
    if (eval.isSubmitPic) {
        return
    }
    if (!$('.pic-submit').hasClass('red')) {
        return
    }
    if (arr && arr.length > 5) {
        layer.msg("亲，最多只能上传5张");
        return;
    }
    if ($("#appellation").val().trim() == '') {
        mui.alert('请填写我怎么称呼你', ' ', '我知道了')
        // layer.msg('请填写我怎么称呼你')
        return
    }
    if ($("#relation").val().trim() == '') {
        mui.alert('填写你和我的关系', ' ', '我知道了')
        // layer.msg('填写你和我的关系')
        return
    }

    // 提交图文评价到后台
    mui.confirm('请仔细检查你的评价内容，提交后不可修改。并且，只能评价一次。', ' ', ['重新修改', '立即提交'], function (e) {
        if (e.index == 1) {
            layer.open({ type: 3 })
            eval.flag = 1
            var form = document.forms[0];
            var formData = new FormData(form);
            if (arr && arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    formData.append("files", convertBase64UrlToBlob(arr[i]));
                }
            }
            formData.append('opId', eval.opId);
            formData.append('evaluationType', 1);
            formData.append('appellation', $("#appellation").val().trim());
            formData.append('relation', $("#relation").val().trim());
            formData.append('text', $("#suggestText").val().trim());
            $.ajax({
                type: 'POST',
                url: $config.toUrl(eval.env, '/api/foreverHtml/friendEvaluation/submitEvaluation'),
                data: formData,
                dataType: "json",
                contentType: false,
                processData: false,
                success: function (res) {
                    layer.closeAll()
                    if (res.code == 0) {
                        eval.isSubmitPic = 1
                        $('.pic-main').css('height', '4.18rem').addClass('column')
                        $('.pic-main').html(
                            '<img class="isDoPic" src="image/01.png">' +
                            '<div class="isDoText column">' +
                            '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                            '<p>希望你能再通过语音或视频方式说说印象中的我</p>' +
                            '</div>'
                        )
                        if (eval.isSubmitVideo == 1 && eval.isSubmitAudio == 1) {
                            $('.pic-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                            $('.audio-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                            $('.video-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                        } else if (eval.isSubmitVideo == 1 && !eval.isSubmitAudio) {
                            $('.pic-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过语音方式说说印象中的我</p>' +
                                '</div>'
                            )
                            $('.video-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过语音方式说说印象中的我</p>' +
                                '</div>'
                            )
                        } else if (eval.isSubmitAudio == 1 && !eval.isSubmitVideo) {
                            $('.pic-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过视频方式说说印象中的我</p>' +
                                '</div>'
                            )
                            $('.audio-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过视频方式说说印象中的我</p>' +
                                '</div>'
                            )
                        }
                        $('#suggestText').val('').attr('disabled', 'true')
                        $('.pic-submit').removeClass('red')
                        $('#uploadPic').attr('disabled', 'true')
                        upLoadFile()
                    } else {
                        layer.msg(res.message)
                    }
                    eval.flag = 0
                },
                error: function () {
                    layer.closeAll()
                    layer.msg('网络异常')
                    eval.flag = 0
                }
            })
        }
    })

}
function submitAudio() {
    if (eval.flag) {
        return
    }
    if (eval.isSubmitAudio) {
        return
    }
    if (!$('.audio-submit').hasClass('red')) {
        return
    }
    if ($("#appellation").val().trim() == '') {
        mui.alert('请填写我怎么称呼你', ' ', '我知道了')
        // layer.msg('请填写我怎么称呼你')
        return
    }
    if ($("#relation").val().trim() == '') {
        mui.alert('填写你和我的关系', ' ', '我知道了')
        // layer.msg('填写你和我的关系')
        return
    }
    // 提交录音评价到后台
    mui.confirm('请仔细检查你的评价内容，提交后不可修改。并且，只能评价一次。', ' ', ['重新修改', '立即提交'], function (e) {
        if (e.index == 1) {
            layer.open({ type: 3 })
            eval.flag = 1
            var form = document.forms[0];
            var formData = new FormData(form);
            formData.append('opId', eval.opId);
            formData.append('evaluationType', 2);
            formData.append('appellation', $("#appellation").val().trim());
            formData.append('relation', $("#relation").val().trim());
            formData.append("audioAndVideoFile", eval.blob, "recorder.mp3")
            formData.append("audioSeconds", eval.duration)
            $.ajax({
                type: 'POST',
                url: $config.toUrl(eval.env, '/api/foreverHtml/friendEvaluation/submitEvaluation'),
                data: formData,
                dataType: "json",
                contentType: false,    // 不使用默认的数据格式 默认值: application/x-www-form-urlencoded
                processData: false, // 处理数据 不转换格式 直接上传data
                success: function (res) {
                    layer.closeAll()
                    if (res.code == 0) {
                        eval.isSubmitAudio = 1
                        $('.audio-main').html(
                            '<img class="isDoPic" src="image/01.png">' +
                            '<div class="isDoText column">' +
                            '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                            '<p>希望你能再通过图文或视频方式说说印象中的我</p>' +
                            '</div>'
                        )
                        if (eval.isSubmitVideo == 1 && eval.isSubmitPic == 1) {
                            $('.pic-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                            $('.audio-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                            $('.video-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                        } else if (!eval.isSubmitVideo && eval.isSubmitPic == 1) {
                            $('.audio-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过视频方式说说印象中的我</p>' +
                                '</div>'
                            )
                            $('.pic-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过视频方式说说印象中的我</p>' +
                                '</div>'
                            )
                        } else if (eval.isSubmitVideo == 1 && !eval.isSubmitPic) {
                            $('.audio-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过图文方式说说印象中的我</p>' +
                                '</div>'
                            )
                            $('.video-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过图文方式说说印象中的我</p>' +
                                '</div>'
                            )
                        }
                        restartRec()
                    } else {
                        if (res.code == -10001) {
                            layer.msg('请上传语音')
                        } else {
                            layer.msg(res.message)
                        }
                    }
                    eval.flag = 0
                },
                error: function () {
                    layer.closeAll()
                    layer.msg('网络异常')
                    eval.flag = 0
                }
            })
        }
    })

}
var rec
// 开始录音
function beginRec() {
    if (eval.isSubmitAudio) {
        layer.msg('你已提交过语音评价了,请通过图文或视频方式说说印象中的我。')
        return
    }
    // 定义录音事件对象
    rec = Recorder();
    // open() 开始录音方法
    rec.open(function () {
        rec.start();
        var str =
            '<div class="audio-img-wrap flexbox">' +
            '<img class="audioed" src="image/click_finish_recording.png" alt="" onclick="stopRec()">' +
            '<div class="loop-pie" onclick="stopRec()">' +
            '<div class="loop-pie-line loop-pie-r">' +
            '<div class="loop-pie-c loop-pie-rm" id="loop-rc"></div>' +
            '</div>' +
            '<div class="loop-pie-line loop-pie-l">' +
            '<div class="loop-pie-c loop-pie-lm" id="loop-lc"></div>' +
            '</div>' +
            '</div></div>'
        $('.audio-btn').html(str)
        $('.audio-wrap .audio-text').text('点击完成录制')
        $('.audio-wrap .audio-time').html('<span></span>00:00').addClass('redColor')
        var i = 1
        eval.AudioProgressTimer = setInterval(function () {
            eval.loadPercent(i, 180);
            if (i < 10) {
                $('.audio-wrap .audio-time').html('<span></span>00:0' + i)
            } else if (i >= 10 && i < 60) {
                $('.audio-wrap .audio-time').html('<span></span>00:' + i)
            } else if (i >= 60 && i < 70) {
                $('.audio-wrap .audio-time').html('<span></span>01:0' + (i - 60))
            } else if (i >= 70 && i < 120) {
                $('.audio-wrap .audio-time').html('<span></span>01:' + (i - 60))
            } else if (i >= 120 && i < 130) {
                $('.audio-wrap .audio-time').html('<span></span>02:0' + (i - 120))
            } else if (i >= 130 && i < 179) {
                $('.audio-wrap .audio-time').html('<span></span>02:' + (i - 120))
            } else if (i >= 179) {
                $('.audio-wrap .audio-time').html('<span></span>03:00')
                stopRec()
            }
            i++
        }, 1000)
    }, function (msg, isUserNotAllow) {
        restartRec()
        layer.msg(msg)
    });
}
// 准备录音
function startRec() {
    if ($('#suggestText').val() || $('.picture-item .up-photo').length || eval.videoUrl) {
        mui.confirm('切换其他评价方式将会丢失当前评价方式所填写的内容。是否切换为其他评价方式？', ' ', function (e) {
            if (e.index == 1) {
                // 清除图文评价
                $('.pic-item-text').removeClass('popup')
                $('.pic-submit').removeClass('red')
                $('#suggestText').val('')
                $('#uploadPic').val('')
                upLoadFile()
                replayVideo()   // 重置录视频
                // 开始录音
                beginRec()
            }
        })
    } else {
        beginRec()
        eval.isRadioing = true
    }
}
// 停止录音
function stopRec() {
    eval.isRadioing = false
    clearInterval(eval.AudioProgressTimer)
    // stop() 停止录音
    rec.stop(function (blob, duration) {
        rec.close();
        rec = null;
        console.log(blob);
        eval.duration = parseInt(duration / 1000)
        eval.blob = blob
        if (eval.duration < 3) {
            layer.msg('录音时长不得少于3秒')
            restartRec()
            return
        }
        eval.audio = document.createElement("audio");
        eval.audio.controls = true;
        eval.audio.style.display = 'none'
        document.body.appendChild(eval.audio);

        //非常简单的就能拿到blob音频url
        eval.audio.src = URL.createObjectURL(blob);
        if (eval.duration < 10 && eval.duration > 2) {
            $('.audio-wrap .audio-time').html('<span></span>00:0' + eval.duration)
        } else if (eval.duration >= 10 && eval.duration < 60) {
            $('.audio-wrap .audio-time').html('<span></span>00:' + eval.duration)
        } else if (eval.duration >= 60 && eval.duration < 70) {
            $('.audio-wrap .audio-time').html('<span></span>01:0' + (eval.duration - 60))
        } else if (eval.duration >= 70 && eval.duration < 120) {
            $('.audio-wrap .audio-time').html('<span></span>01:' + (eval.duration - 60))
        } else if (eval.duration >= 120 && eval.duration < 130) {
            $('.audio-wrap .audio-time').html('<span></span>02:0' + (eval.duration - 120))
        } else if (eval.duration >= 130 && eval.duration < 180) {
            $('.audio-wrap .audio-time').html('<span></span>02:' + (eval.duration - 120))
        } else if (eval.duration >= 180) {
            $('.audio-wrap .audio-time').html('<span></span>03:00')
        }
    }, function (msg) {
        layer.msg("录音失败:" + msg);
    });
    var str = ' <div class="audio-reset column">' +
        '<img src="image/rerecording.png" alt="" onclick="confirmRestartRec()">' +
        '<span>重录</span>' +
        '</div>' +
        '<img class="audioing" src="image/click_play.png" alt="" onclick="playRec(1)">' +
        '<div class="audio-save column">' +
        '<img src="image/save.png" alt="" onclick="saveRec()">' +
        '<span>保存</span>' +
        '</div>'
    $('.audio-btn').html(str)
    $('.audio-wrap .audio-text').text('点击试听')
}
// 播放录音
function playRec(type) {
    eval.audio.play()
    if (type == 1) {
        // 试听播放
        var str = ' <div class="audio-reset column">' +
            '<img src="image/rerecording.png" alt="" onclick="confirmRestartRec()">' +
            '<span>重录</span>' +
            '</div>' +
            '<div class="audio-img-wrap flexbox">' +
            '<img class="audioing" src="image/click_pause.png" alt="" onclick="pauseRec(1)">' +
            '<div class="loop-pie" onclick="pauseRec(1)">' +
            '<div class="loop-pie-line loop-pie-r">' +
            '<div class="loop-pie-c loop-pie-rm" id="loop-rc"></div>' +
            '</div>' +
            '<div class="loop-pie-line loop-pie-l">' +
            '<div class="loop-pie-c loop-pie-lm" id="loop-lc"></div>' +
            '</div>' +
            '</div></div>' +
            '<div class="audio-save column">' +
            '<img src="image/save.png" alt="" onclick="saveRec()">' +
            '<span>保存</span>' +
            '</div>'
        $('.audio-btn').html(str)
        $('.audio-wrap .audio-text').text('点击暂停')
        if (eval.playI > 1) {
            eval.loadPercent(eval.playI, eval.duration);
        }
        eval.AudioProgressTimer = setInterval(function () {
            eval.loadPercent(eval.playI, eval.duration);
            if (eval.playI > eval.duration) {
                clearInterval(eval.AudioProgressTimer)
                eval.playI = 1
                var str = ' <div class="audio-reset column">' +
                    '<img src="image/rerecording.png" alt="" onclick="confirmRestartRec()">' +
                    '<span>重录</span>' +
                    '</div>' +
                    '<img class="audioing" src="image/click_play.png" alt="" onclick="playRec(1)">' +
                    '<div class="audio-save column">' +
                    '<img src="image/save.png" alt="" onclick="saveRec()">' +
                    '<span>保存</span>' +
                    '</div>'
                $('.audio-btn').html(str)
                $('.audio-wrap .audio-text').text('点击试听')
                eval.playI = 0
            }
            eval.playI++
        }, 1000)
    } else {
        // 确认提交前播放
        $('.play-btn').addClass('popup').siblings('.pause-btn').removeClass('popup')
        eval.smallAudioTimer = setInterval(function () {
            var num = parseInt(Math.random() * 3)
            $('.play-pro').attr('src', 'image/voice' + num + '.png')
        }, 100)
        if (!eval.timeNum) {
            eval.timeNum = eval.duration
        }
        eval.AudioProgressTimer = setInterval(function () {
            eval.timeNum--
            $('.play-time').text(eval.timeNum + 's')
            if (eval.timeNum < 0) {
                eval.audio.pause()
                eval.timeNum = 0
                clearInterval(eval.smallAudioTimer)
                clearInterval(eval.AudioProgressTimer)
                $('.play-time').text(eval.duration + 's')
                $('.play-btn').removeClass('popup').siblings('.pause-btn').addClass('popup')
            }
        }, 1000)
    }
}
// 暂停播放
function pauseRec(type) {
    eval.audio.pause()
    if (type) {
        var str = ' <div class="audio-reset column">' +
            '<img src="image/rerecording.png" alt="" onclick="confirmRestartRec()">' +
            '<span>重录</span>' +
            '</div>' +
            '<img class="audioing" src="image/click_play.png" alt="" onclick="playRec(1)">' +
            '<div class="audio-save column">' +
            '<img src="image/save.png" alt="" onclick="saveRec()">' +
            '<span>保存</span>' +
            '</div>'
        $('.audio-btn').html(str)
        $('.audio-wrap .audio-text').text('点击试听')
        clearInterval(eval.AudioProgressTimer)
    } else {
        $('.play-btn').removeClass('popup').siblings('.pause-btn').addClass('popup')
        clearInterval(eval.smallAudioTimer)
        clearInterval(eval.AudioProgressTimer)
    }
}
// 保存录音
function saveRec() {
    eval.audio.pause()
    eval.audio.currentTime = 0
    clearInterval(eval.AudioProgressTimer)
    var str = '<div class="audio-item column">' +
        '<span>对' + eval.nickName + '的评价语音: <span>' + eval.duration + '</span>s</span>' +
        '<div class="audio-play-item flexbox">' +
        '<img src="image/play_radio.png" alt="" class="play-btn" onclick="playRec(0)">' +
        '<img src="image/pause_radio.png" alt="" class="pause-btn popup" onclick="pauseRec(0)">' +
        '<img src="image/voice0.png" alt="" class="play-pro">' +
        '<div class="play-time">' + eval.duration + 's</div>' +
        '</div>' +
        '</div>'
    $('.audio-btn').html(str)
    $('.audio-wrap .audio-text').text('重录').addClass('popup')
    $('.audio-wrap .audio-text.redColor').removeClass('popup')
    $('.audio-wrap .audio-time').text('最长可录制3分钟').removeClass('redColor')
    $('.audio-submit').addClass('red')
    openDialog($('#openSubmitDia'), 'openSubmitDia')
}
// 重录
function restartRec() {
    // if (eval.isSubmitAudio) return
    if (eval.audio) {
        eval.audio.currentTime = 0
        eval.audio.pause()
    }
    clearInterval(eval.smallAudioTimer)
    clearInterval(eval.AudioProgressTimer)
    eval.smallAudioTimer = null
    eval.AudioProgressTimer = null
    eval.blob = null
    eval.duration = null
    eval.audio = null
    eval.timeNum = null
    eval.playI = 1
    $('.audio-btn').html('<img class="audioed" src="image/click_recording.png" alt="" onclick="startRec()">')
    $('.audio-wrap .audio-text').text('点击录制语音').removeClass('popup')
    $('.audio-wrap .audio-text.redColor').addClass('popup')
    $('.audio-wrap .audio-time').text('最长可录制3分钟').removeClass('redColor')
    $('.audio-submit').removeClass('red')
}
// 重录语音的提示
function confirmRestartRec() {
    mui.confirm('重录将会删除刚才录制的语音，是否继续“重录”？', '', ['取消重录', '继续重录'], function (e) {
        if (e.index == 1) {
            restartRec()
        }
    })
}
// 重录视频的提示
function confirmReplayVideo() {
    mui.confirm('重录将会删除刚才录制的视频，是否继续“重录”？', '', ['取消重录', '继续重录'], function (e) {
        if (e.index == 1) {
            replayVideo()
        }
    })
}
// 重录语音
function resetAudio(that) {
    if (eval.AudioProgressTimer && eval.duration || eval.videoUrl || eval.isRadioing) {
        $(that)[0].blur()
        mui.confirm('切换其他评价方式将会丢失当前评价方式所填写的内容。是否切换为其他评价方式？', ' ', function (e) {
            if (e.index == 1) {
                eval.isRadioing = false
                restartRec()
                replayVideo()
            }
        })
    }
}
// 获取视频文件
function getUrl(that) {
    // eval.videoUrl = getObjectURL(that.files[0]);
    eval.videoUrl = that.files[0];
    eval.videoSize = that.files[0].size
    // console.log((eval.videoSize / 1048576).toFixed(1) + 'M');
    if (eval.videoUrl) {
        $('.video-submit').addClass('red')
        var url = URL.createObjectURL(that.files[0])
        var audioElement = new Audio(url);
        layer.open({ type: 3 })
        audioElement.addEventListener("loadedmetadata", function (_event) {
            layer.closeAll()
            eval.videoDuration = parseInt(audioElement.duration)
            var videoStr =
                '<span class="video-text-time">对' + eval.nickName + '的评价视频：' + eval.videoDuration + 's</span>' +
                '<video src="" id="video0" style="width: 4rem;height: 2.5rem;" poster="image/video.png"></video>' +
                '<span class="video-text-replay" onclick="confirmReplayVideo()">重录</span>' +
                '<span class="video-text">最长可录制3分钟</span>' +
                '<img class="play-video-btn" src="image/play_video.png" onclick="playVideo()">'
            $('.video-main').html(videoStr)
            $("#video0").attr("src", getObjectURL(that.files[0]))
            openDialog($('#openSubmitDia'), 'openSubmitDia')
        });
    }
}
// 播放视频
function playVideo() {
    var imgHeight = 0,
        imgWidth = 0,
        videoWidth = 0,
        videoHeight = 0,
        video = document.getElementById('video0');
    canvas = document.createElement("canvas");
    canvasCtx = canvas.getContext("2d");
    video.addEventListener('play', function () {
        canvas.width = imgWidth = video.offsetWidth;
        canvas.height = imgHeight = video.offsetHeight;
        //获取实际视频的宽高，相当于视频分辨率吧
        videoWidth = video.videoWidth;
        videoHeight = video.videoHeight;
        setTimeout(() => {
            canvasCtx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, imgWidth, imgHeight);
            //把图标base64编码后变成一段url字符串
            eval.videoDataUrl = canvas.toDataURL("image/png");
            // 获取图片的base64格式
            // console.log(convertBase64UrlToBlob(eval.videoDataUrl));
            console.log(eval.videoDataUrl);
        }, 400)
    })
    setTimeout(function () {
        video.play()
        if ($config.browser.versions.android) {
            launchFullscreen(video) // 全屏播放
        }
    }, 200)
    // video.addEventListener('ended', function () {
    //     if (that) {
    //         $(that).removeClass('popup')
    //     }
    // })
}
// 全屏播放
function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById('video0');
        var cssText = 'width:100%;height:100%;overflow:hidden;';
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';
        document.IsFullScreen = true;
    }
}
// 重录视频
function replayVideo() {
    if (eval.isSubmitVideo) return
    var str =
        '<div class="video-btn flexbox">' +
        '<div class="video-upload"></div>' +
        '<img src="image/addVideo.png" onclick="openVideoDia()">' +
        '<div class="video-upload column">' +
        '</div>' +
        '</div>'
    $('.video-main').html(str)
    $('.video-submit').removeClass('red')
    eval.videoUrl = null
    eval.videoDataUrl = null
    // 重新绑定打开摄像头事件
    $('#starUpVideo').bind('click', function () {
        if (eval.AudioProgressTimer || eval.duration || $('#suggestText').val() || $('.picture-item .up-photo').length) {
            mui.confirm('切换其他评价方式将会丢失当前评价方式所填写的内容。是否切换为其他评价方式？', ' ', function (e) {
                if (e.index == 1) {
                    $('.pic-item-text').removeClass('popup')
                    $('.pic-submit').removeClass('red')
                    $('#suggestText').val('')
                    $('#uploadPic').val('')
                    upLoadFile()
                    restartRec()
                    $(".loadVideo").click()
                }
            })
            return
        }
        $(".loadVideo").click();
    });
    // 重新绑定上传视频事件
    $('#starTakeVideo').bind('click', function () {
        if (eval.AudioProgressTimer || eval.duration || $('#suggestText').val() || $('.picture-item .up-photo').length) {
            mui.confirm('切换其他评价方式将会丢失当前评价方式所填写的内容。是否切换为其他评价方式？', ' ', function (e) {
                if (e.index == 1) {
                    $('.pic-item-text').removeClass('popup')
                    $('.pic-submit').removeClass('red')
                    $('#suggestText').val('')
                    $('#uploadPic').val('')
                    upLoadFile()
                    restartRec()
                    $(".openCamera").click()
                }
            })
            return
        }
        $(".openCamera").click();
    });
}
// 视频文件转格式
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) {
        // basic 
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
        // mozilla(firefox) 
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        // webkit or chrome 
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
// 提交视频
function submitVIdeo() {
    if (eval.flag) {
        return
    }
    if (eval.isSubmitVideo) {
        return
    }
    if (!$('.video-submit').hasClass('red')) {
        return
    }
    if ($("#appellation").val().trim() == '') {
        mui.alert('请填写我怎么称呼你', ' ', '我知道了')
        // layer.msg('请填写我怎么称呼你')
        return
    }
    if ($("#relation").val().trim() == '') {
        mui.alert('填写你和我的关系', ' ', '我知道了')
        // layer.msg('填写你和我的关系')
        return
    }
    if (eval.videoDuration > 180) {
        layer.msg('视频时长不能超过3分钟')
        return
    }
    if (eval.videoDuration < 3) {
        layer.msg('视频时长不能少于3秒钟')
        return
    }
    if (eval.videoSize > 1024 * 1024 * 50) {
        layer.msg('视频大小不能超过50M, 当前视频' + (eval.videoSize / 1048576).toFixed(1) + 'M')
        return
    }
    // 提交视频到后台
    mui.confirm('请仔细检查你的评价内容，提交后不可修改。并且，只能评价一次。', ' ', ['重新修改', '立即提交'], function (e) {
        if (e.index == 1) {
            layer.open({ type: 3 })
            eval.flag = 1
            var form = document.forms[0];
            var formData = new FormData(form);
            if (eval.videoDataUrl) {
                eval.videoFilePic = convertBase64UrlToBlob(eval.videoDataUrl)
            } else {
                eval.videoFilePic = convertBase64UrlToBlob(eval.base64File)
            }
            formData.append('opId', eval.opId);
            formData.append('evaluationType', 3);
            formData.append('appellation', $("#appellation").val().trim());
            formData.append('relation', $("#relation").val().trim());
            formData.append('audioSeconds', eval.videoDuration);
            formData.append('files', eval.videoFilePic);
            formData.append('audioAndVideoFile', eval.videoUrl, 'video.mp4');
            $.ajax({
                type: 'POST',
                url: $config.toUrl(eval.env, '/api/foreverHtml/friendEvaluation/submitEvaluation'),
                data: formData,
                dataType: "json",
                contentType: false,    // 不使用默认的数据格式 默认值: application/x-www-form-urlencoded
                processData: false, // 处理数据 不转换格式 直接上传data
                success: function (res) {
                    layer.closeAll()
                    if (res.code == 0) {
                        eval.isSubmitVideo = 1
                        $('.video-main').html(
                            '<img class="isDoPic" src="image/01.png">' +
                            '<div class="isDoText column">' +
                            '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                            '<p>希望你能再通过图文或语音方式说说印象中的我</p>' +
                            '</div>'
                        )
                        $('.video-submit').removeClass('red')
                        if (eval.isSubmitAudio == 1 && eval.isSubmitPic == 1) {
                            $('.pic-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                            $('.audio-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                            $('.video-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                                '</div>'
                            )
                        } else if (eval.isSubmitAudio == 1 && !eval.isSubmitPic) {
                            $('.video-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过图文方式说说印象中的我</p>' +
                                '</div>'
                            )
                            $('.audio-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过语音评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过图文方式说说印象中的我</p>' +
                                '</div>'
                            )
                        } else if (eval.isSubmitPic == 1 && !eval.isSubmitAudio) {
                            $('.video-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过视频评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过语音方式说说印象中的我</p>' +
                                '</div>'
                            )
                            $('.pic-main').html(
                                '<img class="isDoPic" src="image/01.png">' +
                                '<div class="isDoText column">' +
                                '<p>感谢你通过图文评价了我(' + eval.nickName + ')!</p>' +
                                '<p>希望你能再通过语音方式说说印象中的我</p>' +
                                '</div>'
                            )
                        }
                        eval.videoUrl = null
                    } else {
                        if (res.code == -10001) {
                            layer.msg('缺少参数')
                        } else {
                            layer.msg(res.message)
                        }
                    }
                    eval.flag = 0
                },
                error: function () {
                    layer.closeAll()
                    layer.msg('网络异常')
                    eval.flag = 0
                }
            })
        }
    })
}
// 获取视频封面 播放视频截取第一帧 未播放视频拿默认图片
function getVideoImg() {
    var imgHeight = 0,
        imgWidth = 0,
        videoWidth = 0,
        videoHeight = 0,
        //要截图的视频
        video = document.getElementById('video0');

    canvas = document.createElement("canvas");
    canvasCtx = canvas.getContext("2d");

    //视频准备好可以播放
    video.addEventListener("canplay", function () {
        //获取展示的video宽高作为画布的宽高和临时视频截图的宽高
        canvas.width = imgWidth = video.offsetWidth;
        canvas.height = imgHeight = video.offsetHeight;
        //获取实际视频的宽高，相当于视频分辨率吧
        videoWidth = video.videoWidth;
        videoHeight = video.videoHeight;
        setTimeout(() => {
            video.pause();
            //坐原图像的x,y轴坐标，大小，目标图像的x，y轴标，大小。
            canvasCtx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, imgWidth, imgHeight);
            //把图标base64编码后变成一段url字符串
            eval.videoDataUrl = canvas.toDataURL("image/png");
            // 获取图片的base64格式
            // 通过上一篇文章的：https://www.haorooms.com/post/js_file_base64_blob 把base64转换为file
            console.log(eval.videoDataUrl);
            // 然后通过上一节的ajax进行上传

        }, 1000);// 1000毫秒，就是截取第一秒，2000毫秒就是截取第2秒，视频1秒通常24帧，也可以换算成截取第几帧。
        //防止拖动进度条的时候重复触发
        video.removeEventListener("canplay", arguments.callee);
    });
}
// 默认视频封面转格式
function imageBase(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}
function getImgBase64() {
    // 未播放视频则阿囧默认图片设为视频封面
    var img = new Image();
    img.src = "./image/video.png";
    img.onload = function () {
        eval.base64File = imageBase(img);
    }
}
// 查看个人主页实例
function lookExample() {
    showDialog($('#example'), 'example')
}
function showDialog(contain, className) {
    layer.open({
        type: 1,
        shadeClose: true,
        title: false,
        shade: .85,
        closeBtn: 0,
        scrollbar: false,
        skin: className || 'yourclass',
        content: contain,
        end: function () {
        }
    })
}
// 主动失去焦点
function removeFocus(that) {
    if ($config.browser.versions.android) {
        document.onscroll = function (e) {
            that.blur()
        }
    }
}
// layer底部弹出框
function openDialog(contain, className) {
    layer.open({
        type: 1,
        anim: 2,
        title: false,
        offset: 'b',
        shade: .5,
        closeBtn: 0,
        scrollbar: false,
        isOutAnim: false,
        skin: className || 'yourclass',
        content: contain,
        end: function () {
        }
    })
}
// 清除事件冒泡
function stopEvent(event) {
    event.stopPropagation()
}
// 打开上传视频弹框
function openVideoDia() {
    openDialog($('#openVideoDia'), 'openVideoDia')
}
getImgBase64()
eval.init()
