var descObj = {
    base:[
        '创建房间预览推流：输入房间id,作为主播推流',
        '创建房间只预览：输入房间id,作为主播只预览自己画面但不推流',
        '进入房间：另打开新页面，输入房间id,进入房间作为观众拉流',
        '退出：退出房间',
        '启用/关闭摄像头: 作为主播开关自己的摄像头',
        '启用/关闭麦克风: 作为主播开关自己的麦克风',
        '更改输出设备：切换扬声器',
        // '获取推流音频信息：可实时获取音量大小等',
        // '获取音频pcm数据：可实时获取音轨原始数据',
        // '下载wav：pcm数据转为wav格式浏览器端下载',
    ],
    audio:[
        '创建房间：输入房间id,作为主播推流(纯音频)',
        '进入房间：另打开新页面，输入房间id,进入房间作为观众拉流(纯音频)',
        '退出：退出房间',
        '特别说明：推纯音频时，拉流也必须只拉音频',
    ],
    third:[
        '推第三方视频：输入房间id,作为主播推第三方视频流',
        '推第三方音频：输入房间id,作为主播推第三方音频流',
        '退出：退出房间',
        '特别说明：推第三方视频，推第三方音频都是作为主播登录',
    ],
    message:[
        '创建房间：输入房间id,作为主播推流',
        '进入房间：另打开新页面，输入房间id,进入房间作为观众拉流',
        '退出：退出房间',
        '任意端发送消息，另一段会收到消息',
        'relay消息和大房间消息需要先开通权限才能使用',
    ],
    audioMixing:[
        '创建房间：输入房间id,作为主播推流',
        '进入房间：另打开新页面，输入房间id,进入房间作为观众拉流',
        '退出：退出房间',
        '混音：将当前页面上的audio混入到直播流当中',
        '停止混音: 停止混入audio到直播流当中',
        '实时混音: 混入buffer数据到直播流当中',
        '停止实时混音：停止混入buffer数据',
        '预加载音效：笑声,背景音乐需要先加载到内存才能播放',
        '鼓掌声：推流后直接可以播放',
        '暂停音效：暂停播放的笑声，背景音乐',
        '恢复音效：恢复播放的笑声，背景音乐',
        '停止音效：停止播放的笑声，背景音乐，鼓掌声',
        '释放音效：释放内存中播的笑声，背景音乐',
        '特别说明：切换音效时，需要先停止当前音效;预加载能更快速的播放音效，且兼容safari'
    ],
    live:[
        '创建房间：输入房间id,作为主播推流',
        '进入房间：另打开新页面，输入房间id,进入房间作为观众拉流',
        '退出：退出房间',
        '结束连麦：挂断当前连麦，可指定人员，主播和观众都可以发起',
        '邀请连麦：主播邀请观众和自己连麦',
        '请求连麦：观众向主播申请和自己连麦'
    ],
    auth:[
        '创建房间(登录鉴权)：用于第三方登录时鉴权',
        '退出：退出房间'
    ],
    mix:[
        '创建房间：输入房间id,作为主播推流',
        '退出：退出房间',
        '混流：当前房间内所有流混成一条，并在当前页面播放',
        '停止混流：当前房间内所有流混成一条，并在当前页面播放',
    ],
    screen:[
        '创建房间：输入房间id,作为主播推流',
        '退出：退出房间',
        '捕捉屏幕：调用捕捉屏幕api,选择要捕捉的页面或者应用，并推流（chrome需要插件，火狐不需要），只支持pc端chrome和火狐',
        '捕捉屏幕（无需插件）：和捕捉屏幕功能类似，区别是不需要安装插件，只有chrome72以上支持，且不能分享声音',
        '推两路流：如果需要同时推屏幕和麦克风声音，可以推两路流实现；后续可以通过混音推一路流实现，敬请期待！'
    ],
    cdn:[
        '创建房间：输入房间id,作为主播推流',
        `进入房间：另打开新页面，输入房间id,进入房间作为观众拉流,拉流方式不是通过webrtc,而是以播放地址的形式，默认sdk返回rtmp,flv，m3u8三种格式，延迟小到大：rtmp，flv，m3u8；rtmp需要flash,手机不支持，safari只支持m3u8`,
        '退出：退出房间',
    ],
    record:[
        '创建房间：输入房间id,作为主播推流',
        '进入房间：另打开新页面，输入房间id,进入房间作为观众拉流',
        '退出：退出房间',
        '截屏：截取当前推流video帧',
        '录制：客户端录制，可以保存视频到客户端，支持暂停，恢复，停止操作',
    ],

};