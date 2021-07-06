//openinstall初始化时将与openinstall服务器交互，应尽可能早的调用
/*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据*/
var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
new OpenInstall({
    /*appKey必选参数，openinstall平台为每个应用分配的ID*/
    appKey : "bmhy9f",
    /*可选参数，自定义android平台的apk下载文件名；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
    //apkFileName : 'com.fm.openinstalldemo-v2.2.0.apk',
    /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
    //preferWakeup:true,
    /*自定义遮罩的html*/
    //mask:function(){
    //  return "<div id='openinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
    //},
    /*openinstall初始化完成的回调函数，可选*/
    onready : function() {
        var m = this, button = document.getElementById("downloadButton");
        button.style.visibility = "visible";

        /*在app已安装的情况尝试拉起app*/
        m.schemeWakeup();
        /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
        button.onclick = function() {
            m.wakeupOrInstall();
            return false;
        }
    }
}, data);

/**
 * 复制方法
 * @param id 激活复制事件元素id
 * @param val 需要复制的内容
 * @param f 操作回调
 */
function copy(id, val, f) {
    var button = document.getElementById(id);
    button.style.visibility = "visible";
    button.onclick = function() {
        // 动态创建 input 元素
        var aux = document.createElement("input");
        // 获得需要复制的内容
        aux.setAttribute("value", val);
        // 添加到 DOM 元素中
        document.body.appendChild(aux);
        // 执行选中
        // 注意: 只有 input 和 textarea 可以执行 select() 方法.
        aux.select();
        // 获得选中的内容
        var content = window.getSelection().toString();
        // 执行复制命令
        document.execCommand("copy");
        // 将 input 元素移除
        document.body.removeChild(aux);
        if (f && typeof(f) == "function") {
            f(content);
        }
    }
}

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