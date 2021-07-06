var option = {
    user_channel_chain: '2169_2515_1',
    callback: function (state) {
        if (!state) {

        }
    },
    isReturn: true,
    className: 'down',
    iosUrl: 'https://apps.apple.com/us/app/id1493053100?l=zh&ls=1',
    iosLayer: false,
    iosBaidu: true,
    showEwm: {
        width: 640,
        url: window.location.href,
    },
    tsLayer: {
        wx: true,
        qq: true,
        weibo: true
    },
    androidWxJump: true,
    trg: 2,
    toclick: function (state) {

        console.log(state);
    },
}
initCps(option);