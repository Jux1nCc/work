		var code;
		code = getUrlParam(window.location, 'code');
		
	    //错误处理：确保app始终能正常的安装
	    var timer = setTimeout(
	            function() {
	                var button = document.getElementById("downloadButton");
	                button.style.visibility = "visible";
	                button.onclick = function() {
	                	
	                	// 动态创建 input 元素
	        			var aux = document.createElement("input");
	        			// 获得需要复制的内容
	        			aux.setAttribute("value", code);
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
	                	
	                    var ua = navigator.userAgent;
	                    if (ua.indexOf(" MicroMessenger/") > -1) {
	                        //微信中显示遮罩提示在浏览器中打开或进入应用宝
	                        var div = document.createElement("div");
	                        div.innerHTML = "<div style='font-size:2rem;color:#fff;text-align:center;"
	                        +"position:fixed;left:0;top:0;background:rgba(0,0,0,0.5);filter:alpha(opacity=50);"
	                        +"width:100%;height:100%;z-index:10000;'>点击右上角在浏览器中打开</div>";
	                        document.body.appendChild(div);
	                    } else {
	                        if (ua.indexOf("Android") > -1) {
	                            //直接下载apk
	                            window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.folkcam.rablive.jwrablive";
	                        } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
	                            //直接进入appstore
	                            window.location="https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8";
	                        } else {
	                        	window.location.href = "http://www.rabbitlive.cn";
	                        }
	                    }
	                }
	            }, 15000);

	    //openinstall初始化，初始化时将与openinstall服务器交互，应尽可能早的调用
	    /*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据*/
	    var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
	    new OpenInstall({
	        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
	        appKey : "bmhy9f",
	        /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
	        //apkFileName : "OpenInstallDemo-v2-1.1.1.apk",
	        /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
	        preferWakeup:true,
	        /*openinstall初始化完成的回调函数，可选*/
	        onready : function() {
	            //openinstall已成功回调，清除定时器
	            clearTimeout(timer);
	            timer = null;

	            var m = this, button = document.getElementById("downloadButton");
	            button.style.visibility = "visible";

	            /*在app已安装的情况尝试拉起app*/
	            m.schemeWakeup();
	            /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
	            button.onclick = function() {
	            	
	            	// 动态创建 input 元素
	    			var aux = document.createElement("input");
	    			// 获得需要复制的内容
	    			aux.setAttribute("value", code);
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
	            	
	                m.wakeupOrInstall();
	            }
	        }
	    }, data);
	    //错误处理：确保app始终能正常的安装
	    var timer = setTimeout(
	            function() {
	                var button = document.getElementById("downloadButton");
	                button.style.visibility = "visible";
	                button.onclick = function() {
	                	
	                	// 动态创建 input 元素
	        			var aux = document.createElement("input");
	        			// 获得需要复制的内容
	        			aux.setAttribute("value", code);
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
	                	
	                    var ua = navigator.userAgent;
	                    if (ua.indexOf(" MicroMessenger/") > -1) {
	                        //微信中显示遮罩提示在浏览器中打开或进入应用宝
	                        var div = document.createElement("div");
	                        div.innerHTML = "<div style='font-size:2rem;color:#fff;text-align:center;"
	                        +"position:fixed;left:0;top:0;background:rgba(0,0,0,0.5);filter:alpha(opacity=50);"
	                        +"width:100%;height:100%;z-index:10000;'>点击右上角在浏览器中打开</div>";
	                        document.body.appendChild(div);
	                    } else {
	                        if (ua.indexOf("Android") > -1) {
	                            //直接下载apk
	                            window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.folkcam.rablive.jwrablive";
	                        } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
	                            //直接进入appstore
	                            window.location="https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8";
	                        } else {
	                        	alert("PC"+data);
	                        }
	                    }
	                }
	            }, 15000);

	    //openinstall初始化，初始化时将与openinstall服务器交互，应尽可能早的调用
	    /*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据*/
	    var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
	    new OpenInstall({
	        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
	        appKey : "bmhy9f",
	        /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
	        //apkFileName : "OpenInstallDemo-v2-1.1.1.apk",
	        /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
	        preferWakeup:true,
	        /*openinstall初始化完成的回调函数，可选*/
	        onready : function() {
	            //openinstall已成功回调，清除定时器
	            clearTimeout(timer);
	            timer = null;

	            var m = this, button = document.getElementById("downloadButton");
	            button.style.visibility = "visible";

	            /*在app已安装的情况尝试拉起app*/
	            m.schemeWakeup();
	            /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
	            button.onclick = function() {
	            	
	            	// 动态创建 input 元素
	    			var aux = document.createElement("input");
	    			// 获得需要复制的内容
	    			aux.setAttribute("value", code);
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
	            	
	                m.wakeupOrInstall();
	            }
	        }
	    }, data);		
		
	    
	  //错误处理：确保app始终能正常的安装
	    var timer = setTimeout(
	            function() {
	                var button = document.getElementById("downloadButton1");
	                button.style.visibility = "visible";
	                button.onclick = function() {
	                	
	                	// 动态创建 input 元素
	        			var aux = document.createElement("input");
	        			// 获得需要复制的内容
	        			aux.setAttribute("value", code);
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
	                	
	                    var ua = navigator.userAgent;
	                    if (ua.indexOf(" MicroMessenger/") > -1) {
	                        //微信中显示遮罩提示在浏览器中打开或进入应用宝
	                        var div = document.createElement("div");
	                        div.innerHTML = "<div style='font-size:2rem;color:#fff;text-align:center;"
	                        +"position:fixed;left:0;top:0;background:rgba(0,0,0,0.5);filter:alpha(opacity=50);"
	                        +"width:100%;height:100%;z-index:10000;'>点击右上角在浏览器中打开</div>";
	                        document.body.appendChild(div);
	                    } else {
	                        if (ua.indexOf("Android") > -1) {
	                            //直接下载apk
	                            window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.folkcam.rablive.jwrablive";
	                        } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
	                            //直接进入appstore
	                            window.location="https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8";
	                        } else {
	                        	window.location.href = "http://www.rabbitlive.cn";
	                        }
	                    }
	                }
	            }, 15000);

	    //openinstall初始化，初始化时将与openinstall服务器交互，应尽可能早的调用
	    /*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据*/
	    var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
	    new OpenInstall({
	        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
	        appKey : "bmhy9f",
	        /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
	        //apkFileName : "OpenInstallDemo-v2-1.1.1.apk",
	        /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
	        preferWakeup:true,
	        /*openinstall初始化完成的回调函数，可选*/
	        onready : function() {
	            //openinstall已成功回调，清除定时器
	            clearTimeout(timer);
	            timer = null;

	            var m = this, button = document.getElementById("downloadButton1");
	            button.style.visibility = "visible";

	            /*在app已安装的情况尝试拉起app*/
	            m.schemeWakeup();
	            /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
	            button.onclick = function() {
	            	
	            	// 动态创建 input 元素
	    			var aux = document.createElement("input");
	    			// 获得需要复制的内容
	    			aux.setAttribute("value", code);
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
	            	
	                m.wakeupOrInstall();
	            }
	        }
	    }, data);
	    //错误处理：确保app始终能正常的安装
	    var timer = setTimeout(
	            function() {
	                var button = document.getElementById("downloadButton1");
	                button.style.visibility = "visible";
	                button.onclick = function() {
	                	
	                	// 动态创建 input 元素
	        			var aux = document.createElement("input");
	        			// 获得需要复制的内容
	        			aux.setAttribute("value", code);
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
	                	
	                    var ua = navigator.userAgent;
	                    if (ua.indexOf(" MicroMessenger/") > -1) {
	                        //微信中显示遮罩提示在浏览器中打开或进入应用宝
	                        var div = document.createElement("div");
	                        div.innerHTML = "<div style='font-size:2rem;color:#fff;text-align:center;"
	                        +"position:fixed;left:0;top:0;background:rgba(0,0,0,0.5);filter:alpha(opacity=50);"
	                        +"width:100%;height:100%;z-index:10000;'>点击右上角在浏览器中打开</div>";
	                        document.body.appendChild(div);
	                    } else {
	                        if (ua.indexOf("Android") > -1) {
	                            //直接下载apk
	                            window.location="http://a.app.qq.com/o/simple.jsp?pkgname=cn.folkcam.rablive.jwrablive";
	                        } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
	                            //直接进入appstore
	                            window.location="https://itunes.apple.com/us/app/tu-liao-liao-ni-xiang-liao/id1155891716?l=zh&ls=1&mt=8";
	                        } else {
	                        	alert("PC"+data);
	                        }
	                    }
	                }
	            }, 15000);

	    //openinstall初始化，初始化时将与openinstall服务器交互，应尽可能早的调用
	    /*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的android/ios api可以获取此数据*/
	    var data = OpenInstall.parseUrlParams();//openinstall.js中提供的工具函数，解析url中的所有查询参数
	    new OpenInstall({
	        /*appKey必选参数，openinstall平台为每个应用分配的ID*/
	        appKey : "bmhy9f",
	        /*可选参数，自定义android平台的apk下载文件名，只有apk在openinstall托管时才有效；个别andriod浏览器下载时，中文文件名显示乱码，请慎用中文文件名！*/
	        //apkFileName : "OpenInstallDemo-v2-1.1.1.apk",
	        /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
	        preferWakeup:true,
	        /*openinstall初始化完成的回调函数，可选*/
	        onready : function() {
	            //openinstall已成功回调，清除定时器
	            clearTimeout(timer);
	            timer = null;

	            var m = this, button = document.getElementById("downloadButton1");
	            button.style.visibility = "visible";

	            /*在app已安装的情况尝试拉起app*/
	            m.schemeWakeup();
	            /*用户点击某个按钮时(假定按钮id为downloadButton)，安装app*/
	            button.onclick = function() {
	            	
	            	// 动态创建 input 元素
	    			var aux = document.createElement("input");
	    			// 获得需要复制的内容
	    			aux.setAttribute("value", code);
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
	            	
	                m.wakeupOrInstall();
	            }
	        }
	    }, data);