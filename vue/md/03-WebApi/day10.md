# 今日学习任务

* [ ] 1.阻止a标签默认跳转两种常用方式
* [ ] 2.注册/移除多个同名事件(addEventListener)
* [ ] 3.事件冒泡
  * [ ] (1)事件冒泡介绍
  * [ ] (2)事件冒泡好处
  * [ ] (3)事件冒泡影响
  * [ ] (4)阻止事件冒泡
* [ ] 4.事件捕获
  * [ ] (1)事件捕获介绍
  * [ ] (2)事件三个阶段
* [ ] 5.事件对象补充属性
  * [ ] (1)事件类型type
  * [ ] (2)键盘事件与获取按键
* [ ] 6.DOM增删改查综合案例总结



# 01-阻止a标签默认跳转



## 1.1-阻止a标签跳转两种常用方式

* 默认情况下，点击a标签会跳转到一个新的网页，这叫做超链接
* 某些情况下，我们只希望拿到a标签的样式（鼠标放上去有小手，用户很直观的知道这可以点击），而不希望跳转到新的网页这个时候我们就可以阻止a标签的跳转
* 以下几种不需要死记硬背，实际开发习惯任何一种即可
  * 原理了解即可：
    * 第一种：给a标签添加点击事件，在点击事件中return false
    * 第二种：给a标签的href属性设置一个伪链接
  * 课外拓展
    * 打电话:tel:
    * 发邮件:mailto:



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!--默认情况下，点击a标签会跳转到一个新的网页，这叫做超链接
某些情况下，我们只希望拿到a标签的样式（鼠标放上去有小手，用户很直观的知道这可以点击），而不希望跳转到新的网页
这个时候我们就可以阻止a标签的跳转
以下几种不需要死记硬背，实际开发习惯任何一种即可
    * 原理了解即可：第一种：给a标签添加点击事件，在点击事件中return false
                                第二种：给a标签的href属性设置一个伪链接
-->

<!--行内写法-->
<a href="#"   target="_blank" onclick="alert('哈哈，有SB点击我了');return false;">跳转1</a>
<!--注意：只要是行内写法，就需要在行内return false-->
<a href="#" target="_blank" onclick="test1();return false;">跳转2</a>
<!--内联写法，直接在函数中return false即可-->
<a href="#" target="_blank" id="link">跳转3</a>
<!--设置href属性伪链接-->
<a href="javascript:void(0)" target="_blank">跳转4</a>
<a href="javascript:;" target="_blank">跳转5</a>

</body>

<script>

    function test1 (  ) {
        alert('今晚');
    }

    var link = document.getElementById('link');
    link.onclick = function (  ) {
        alert('大吉');
        return false;
    }
</script>
</html>
```



## 1.2-案例：页面换肤

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/全天模式/02-WebApi/课程资料/备课代码/day03/05-案例：界面换肤.html)

![](../../../../../../%E5%BC%A0%E6%99%93%E5%9D%A4/Desktop/%E5%BC%A0%E6%99%93%E5%9D%A4%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE%E8%B5%84%E6%96%99/AB%E6%A8%A1%E5%BC%8F/03-WebApi/WebApi%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/day03.assets/0601.gif)

需求：点击上方小图，下方展示对应大图

* 思路：
  * 1.将图片的路径放入a标签的href属性中，并且禁用a标签的默认跳转
  * 2.给每一个a标签添加点击事件
  * 3.点击时，取出本次点击的a标签的href属性的值，赋值给下方大图的src属性



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>

        .small {
            width: 180px;
        }

        li {
            float: left;
            list-style: none;
            margin-right: 20px;
        }
        ul {
            width: 1000px;
            margin: 0 auto;

            height: 160px;

        }
        .father {
            width: 1000px;
            margin: 0 auto;
        }
        .father #bigPic {
            width: 1000px;
        }
    </style>
</head>
<body>
<ul id="ul1">
    <li><a href="images/01.jpg"><img src="images/01.jpg" alt="" class="small"/></a></li>
    <li><a href="images/02.jpg"><img src="images/02.jpg" alt="" class="small"/></a></li>
    <li><a href="images/03.jpg"><img src="images/03.jpg" alt="" class="small"/></a></li>
    <li><a href="images/04.jpg"><img src="images/04.jpg" alt="" class="small"/></a></li>
    <li><a href="images/05.jpg"><img src="images/05.jpg" alt="" class="small"/></a></li>
</ul>

<div class="father">
    <img src="images/01.jpg" alt="" id="bigPic"/>
</div>

</body>

<script src="common.js"></script>

<script>
    /*需求：点击上方小图，下方展示对应大图
    思路：
            1.将图片的路径放入a标签的href属性中，并且禁用a标签的默认跳转
            2.给每一个a标签添加点击事件
            3.点击时，取出本次点击的a标签的href属性的值，赋值给下方大图的src属性

     */

    //(1)取出界面元素
    var ul1 = id('ul1');
    var bigPic = id('bigPic');
    var aLinks = ul1.getElementsByTagName('a');

    //(2)给每一个a标签注册点击事件
    for(var i = 0;i<aLinks.length;i++){
        aLinks[i].onclick = function (  ) {
            //(3)取出本次点击的a标签的href属性的值赋值给大图的src属性
            bigPic.src = this.href;
            //(4)阻止a标签默认跳转事件
            return false;
        }
    }
</script>
</html>
```



# 02-注册/移除多个同名事件(addEventListener)

## 1.1-addEventListener注册事件

* 本小节知识点：如何给一个元素添加多个相同事件



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

</head>
<body>

<input type="button" value="点我" id="btn"/>

</body>
</html>


<script>

    /*本小节知识点：如何给一个元素添加多个相同事件
    */

    var btn = document.getElementById ( "btn" )


    //用这样的方式添加相同的事件，后面的会覆盖前面的
    //    btn.onclick = function () {
    //
    //        alert("点一次200块");
    //    }
    //
    //    btn.onclick = function () {
    //
    //        alert("点我干啥？");
    //    }


    //可以给同名的事件，绑定多个事件处理程序
    //语法：对象.addEventListener(参数1,参数2,参数3);
    //参数1：事件名(字符串)，不要加on  例如：click  、 mouseover 、mouseout
    //参数2：事件处理程序（函数名），当事件触发后哪个函数来处理
    //参数3：是一个bool类型，可以不传，默认为fasle（代表冒泡）跟冒泡和捕获有关
    //如果有同名事件不会覆盖，而是会依次执行

    //IE8及以前的版本不支持

    /*
    btn.addEventListener ( "click", function ( e ) {
        e = e || window.event
        alert ( "嘿嘿嘿" )
        console.log ( e )
    }, false )


    btn.addEventListener ( "click", function () {
        alert ( "哈哈哈" )
    } )

    //如果传入已经存在的函数，那么直接写函数名，千万不要写小括号
    btn.addEventListener ( "click", sayHi, false )

    function sayHi ( e ) {
        e = e || window.event
        alert ( "你来追我呀！" )
        console.log ( e )
    }
*/


    //只有IE8以前支持的方法，其他的都不支持
    //只有2个参数
    //参数1：事件名（字符串），但是要加on
    //参数2：事件处理程序。事件触发时哪个函数来响应
    //后面的先执行，前面的后执行

    /*
     btn.attachEvent("onclick", function () {

     alert("祝中间的早晚偷情成功");
     });

     btn.attachEvent("onclick", function () {

     alert("祝隔壁老王和我隔壁的幸福");
     });

*/


    /*兼容性封装*/

    /** 给元素添加多个相同的事件
    * @param obj：元素   eventName：事件名  fn：事件处理函数
    * @return 无
    */
    function addEvent(obj, eventName, fn) {

        //能力检测
        if (obj.addEventListener) {//非IE8

            obj.addEventListener(eventName, fn);

        } else if (obj.attachEvent) {//IE8

            obj.attachEvent("on" + eventName, fn);

        } else {//默认方式

            obj["on" + eventName] = fn;
        }
    }


</script>
```



## 1.2-removeEventListener移除事件



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>

</head>
<body>
<input type="button" value="按钮" id="btn"/>

<script>
    var btn = document.getElementById("btn");

    //1.on+事件名称的方式
    // btn.onclick = function () {
    //   alert("哈哈");
    //   btn.onclick = null; //移除事件。
    // }


    //2.元素名.addEventListener注册的事件，移除方式
    //元素名.removeEventListener(参数1，参数2，参数3);
    //参数1:事件名称
    //参数2：事件处理程序
    //参数3：布尔类型的值
    //  function test() {
    //    alert("哈哈");
    //  }
    //  btn.addEventListener("click", test,false);
    //  btn.removeEventListener("click",test,false)


    //3.元素名.attachEvent注册的事件移除方式
    //元素名.detachEvent(参数1，参数2)
    //参数1：事件名称  是加了on的方式
    //参数2：事件处理程序。
    //  function test2(){
    //    alert("哈哈哈哈哈哈啊....");
    //  }
    //  btn.attachEvent("onclick",test2);
    //  btn.detachEvent("onclick",test2);


    //4.移除事件，不同的添加方式，使用不同的方式移除，所以要做兼容处理。
    function removeEventListener(obj,type,listener){
        //能力检测
        if(obj.removeEventListener){
            obj.removeEventListener(type,listener,false);
        }else if(obj.detachEvent){
            obj.detachEvent("on"+type,listener);
        }else {
            obj["on"+type] = null;
        }
    }


    //5.对封装的函数做一个测试
    function ceshi(){
        alert("呵呵呵嘻嘻嘻嘻....cs移出事件函数....");
    }
    addEventListener(btn,"click",ceshi);
    removeEventListener(btn,"click",ceshi);



    //4.给某一个元素注册多个相同的事件，不同的浏览器有不同的方式，所以要做兼容。
    function addEventListener(obj,type,listener){
        //能力检测
        if(obj.addEventListener){
            obj.addEventListener(type,listener,false);
        }else if(obj.attachEvent){
            obj.attachEvent("on"+type,listener);
        }else {
            obj["on"+type] = listener;
        }
    }
</script>
</body>
</html>
```



# 03-事件冒泡

## 1.1-事件冒泡介绍

本小节知识点：介绍什么是事件冒泡

* 事件冒泡：如果一个元素的事件被触发，那么他的所有父级元素的同名事件也会被依次触发
  * 元素->父元素->body->html->document->window
    * 事件冒泡一直存在，只不过以前我们没有给父级元素加同名事件



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

    <style>
        #box{
            width: 300px;
            height: 300px;
            background-color: hotpink;
            position: relative;
        }

        #son{
            width: 100px;
            height: 100px;
            position: absolute;

            left: 350px;
            top: 350px;

            background-color: yellowgreen;
        }
    </style>
</head>
<body>

<div id="box">
    <input type="button" value="点我" id="btn"/>

    <div id="son"></div>
</div>

</body>
</html>

<script>

    /*本小节知识点：介绍什么是事件冒泡
     * 事件冒泡：如果一个元素的事件被触发，那么他的所有父级元素的同名事件也会被依次触发
            * 元素->父元素->body->html->window
        *事件冒泡一直存在，只不过以前我们没有给父级元素加同名事件
     */


    window.onclick = function () {

        alert("window被点击了");
    }

    document.onclick = function () {

        alert("文档被点击了");
    }

    document.documentElement.onclick = function () {

        alert("html被点击了");
    }

    document.body.onclick = function () {

        alert("body被点击了");
    }

    document.getElementById("box").onclick = function () {

        alert("我是骚粉的大盒子");
    };

    document.getElementById("btn").onclick = function () {

        alert("我是小按钮");
    };

    document.getElementById("son").onclick = function () {

        alert("我是又黄又绿的小盒子");
    };
</script>
```



## 1.2-事件冒泡好处

本小节知识点：介绍事件冒泡的好处

​    事件冒泡好处：如果想给父元素的多个子元素添加事件，我们可以只需要给父元素添加事件即可，然后

  通过获取事件源(e.target)就可以得知是哪一个子元素触发了这个事件

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

<ul id="ul1">
    <li>隔壁老王1</li>
    <li>隔壁老王2</li>
    <li>隔壁老王3</li>
    <li>隔壁老王4</li>
    <li>隔壁老王5</li>
</ul>

</body>
</html>

<script>
    /*本小节知识点：介绍事件冒泡的好处
    事件冒泡好处：如果想给父元素的多个子元素添加事件，我们可以只需要给父元素添加事件即可，然后
  通过获取事件源(e.target)就可以得知是哪一个子元素触发了这个事件

     */

    var ul = document.getElementById("ul1");

    //1.如果想给ul中的每一个li标签添加点击事件，以前的做法需要遍历ul的li标签逐个添加
    //    for (var i = 0; i < ul.children.length; i++) {
    //
    //        ul.children[i].onclick = function () {
    //
    //            alert(this.innerHTML);
    //        }
    //    }

    //2.使用时间冒泡：只需要给父元素添加点击事件即可
    ul.onclick = function (e) {

        e = e || window.event;

        var target = e.target || e.srcElement;

        console.log(target.innerHTML);

        //target：事件源：触发本次事件的源头
        alert(e.target.innerHTML);
    }

</script>
```



## 1.3-事件冒泡影响

* 本小节知识点：介绍事件冒泡的影响
  * 事件冒泡会导致需求冲突：例如我想要添加一个功能，弹出登录窗之后点击body空白区域让登陆窗消失
  * 此时a标签弹出登录窗的点击事件会触发body的点击事件，导致登陆窗一出来就消失
* 解决方案：阻止事件冒泡（下一小节知识点）

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        .login-header {
            width: 100%;
            text-align: center;
            height: 30px;
            font-size: 24px;
            line-height: 30px;
        }

        html, body, ul, li, ol, dl, dt, dd, div, p, span, h1, h2, h3, h4, h5, h6, a {
            padding: 0px;
            margin: 0px;
        }

        .login {
            width: 512px;
            position: absolute;
            border: #ebebeb solid 1px;
            height: 280px;
            left: 50%;
            right: 50%;
            background: #ffffff;
            box-shadow: 0px 0px 20px #ddd;
            z-index: 9999;
            margin-left: -256px;
            margin-top: 140px;
            display: none;
        }

        .login-title {
            width: 100%;
            margin: 10px 0px 0px 0px;
            text-align: center;
            line-height: 40px;
            height: 40px;
            font-size: 18px;
            position: relative;
            cursor: move;
        }

        .login-input-content {
            margin-top: 20px;
        }

        .login-button {
            width: 50%;
            margin: 30px auto 0px auto;
            line-height: 40px;
            font-size: 14px;
            border: #ebebeb 1px solid;
            text-align: center;
        }

        .login-bg {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0px;
            left: 0px;
            background: #000000;
            opacity: 0.3;
            display: none;
        }

        a {
            text-decoration: none;
            color: #000000;
        }

        .login-button a {
            display: block;
        }

        .login-input input.list-input {
            float: left;
            line-height: 35px;
            height: 35px;
            width: 350px;
            border: #ebebeb 1px solid;
            text-indent: 5px;
        }

        .login-input {
            overflow: hidden;
            margin: 0px 0px 20px 0px;
        }

        .login-input label {
            float: left;
            width: 90px;
            padding-right: 10px;
            text-align: right;
            line-height: 35px;
            height: 35px;
            font-size: 14px;
        }

        .login-title span {
            position: absolute;
            font-size: 12px;
            right: -20px;
            top: -30px;
            background: #ffffff;
            border: #ebebeb solid 1px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }
    </style>
</head>
<body>


<div class="login-header">
    <a id="link" href="javascript:void(0);">点击，弹出登录框</a>
</div>

<div id="login" class="login">
    <div id="title" class="login-title">登录会员
        <span>
            <a id="closeBtn" href="javascript:void(0);" class="close-login"> 关闭</a>
        </span>
    </div>

    <div class="login-input-content">
        <div class="login-input">
            <label>用户名：</label>
            <input type="text" placeholder="请输入用户名" name="info[username]" id="username" class="list-input">
        </div>
        <div class="login-input">
            <label>登录密码：</label>
            <input type="password" placeholder="请输入登录密码" name="info[password]" id="password" class="list-input">
        </div>
    </div>
    <div id="loginBtn" class="login-button"><a href="javascript:void(0);" id="login-button-submit">登录会员</a></div>
</div>

<div id="bg" class="login-bg"></div>
<script src="common.js"></script>

<script>

    /*本小节知识点：介绍事件冒泡的影响
    事件冒泡会导致需求冲突：例如我想要添加一个功能，弹出登录窗之后点击body空白区域让登陆窗消失
    此时a标签弹出登录窗的点击事件会触发body的点击事件，导致登陆窗一出来就消失

    解决方案：阻止事件冒泡（下一小节知识点）

     */

    //找到弹出窗口的a标签
    var open = document.getElementById("link");//点击弹出登录窗口
    //找到整个登录窗口
    var login = document.getElementById("login");//需要移动
    //找到背景阴影
    var bg = document.getElementById("bg");//弹出登录窗后需要修改颜色
    //找到登录的标题部分
    var title = document.getElementById("title");//需要拖拽

    /*添加需求：点击页面空白区域让登录窗消失  */
    window.onclick = function () {
        login.style.display = "none";
        bg.style.display = "none";
    }


    //a标签点击事件
    open.onclick = function (e) {

        login.style.display = "block";
        bg.style.display = "block";
        //阻止事件冒泡
        e.stopPropagation();
    }

    //关闭按钮点击事件
    document.getElementById("closeBtn").onclick = function () {

        login.style.display = "none";
        bg.style.display = "none";
    };

    //title按下事件
    title.onmousedown = function (e) {

        e = e || window.event;

        var x = getPagePoint(e).pageX - login.offsetLeft;
        var y = getPagePoint(e).pageY - login.offsetTop;

        //页面添加鼠标移动事件
        document.onmousemove = function (event) {

            event = event || window.event;

            //login大盒子的margin-left: -256px，    margin-top: 140px
            //1 - -256 = 257  减去负数就相当于加这个数 (负负得正)
            login.style.left = getPagePoint(event).pageX - x + 256 + "px";
            login.style.top = getPagePoint(event).pageY - y - 140 + "px";
        }
    }

    title.onmouseup = function () {

        document.onmousemove = null;
    }

</script>

</body>
</html>
```



## 1.4-阻止事件冒泡

本小节知识点：阻止事件冒泡

* 阻止事件冒泡：让同名事件不要在父元素中冒泡（触发）

  ```
   * 说人话：点击一个元素只会触发当前元素的事件，不会触发父元素的同名事件
  ```

* 语法： 事件对象.stopPropagation() IE8及之前不支持

* 事件对象.cancelBubble = true IE8之前支持

* 注意：如果想要阻止事件冒泡，一定要在触发事件的函数中接收事件对象



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>

    <style>
        #box{
            width: 300px;
            height: 300px;
            background-color: hotpink;
            position: relative;
        }

        #son{
            width: 100px;
            height: 100px;
            position: absolute;

            left: 350px;
            top: 350px;

            background-color: yellowgreen;
        }
    </style>
</head>
<body>

<div id="box">
    <input type="button" value="点我" id="btn"/>

    <div id="son"></div>
</div>

</body>
</html>

<script>

    /*本小节知识点：阻止事件冒泡
     * 阻止事件冒泡：让同名事件不要在父元素中冒泡（触发）
            * 说人话：点击一个元素只会触发当前元素的事件，不会触发父元素的同名事件
     * 语法：  事件对象.stopPropagation()       IE8及之前不支持
     *             事件对象.cancelBubble = true               IE8之前支持
     *
     * 注意：如果想要阻止事件冒泡，一定要在触发事件的函数中接收事件对象
     */

    window.onclick = function () {

        alert("window被点击了");
    }

    document.onclick = function () {

        alert("文档被点击了");
    }

    document.documentElement.onclick = function () {

        alert("html被点击了");
    }

    document.body.onclick = function () {

        alert("body被点击了");
    }

    document.getElementById("box").onclick = function (e) {
        e = e || window.event;



        alert("我是骚粉的大盒子");
        // e.stopPropagation();
        //e.cancelBubble = true;//IE8及之前
        stopPropagation(e);//兼容性封装函数
        //阻止事件冒泡的这行代码可以写在这个事件函数的任意位置，一般习惯写在最后面
    };

    document.getElementById("btn").onclick = function () {

        alert("我是小按钮");
    };

    document.getElementById("son").onclick = function () {

        alert("我是又黄又绿的小盒子");
    };

    /**  阻止事件冒泡兼容性封装
    * @param e:事件对象
    * @return 无
    */
    function stopPropagation( e) {
        e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }
</script>
```





# 04-事件捕获

## 1.1-事件捕获介绍

本小节知识点：事件捕获

* 1.事件冒泡：从触发事件元素，一级一级往上找父元素触发同名事件，如果有就触发
* 2.事件捕获：从最顶级的父元素一级一级往下找子元素触发同名事件，直到触发事件的元素为止
  * 事件捕获与事件冒泡触发事件的顺序完全相反
* 3.事件捕获，只能通过addEventListener并且参数写true才是事件捕获
  * 其他都是冒泡（不是通过addEventListener添加、addEventListener参数为false）
* 4.事件对象.stopPropagation() 除了可以阻止冒泡还可以阻止捕获
* 5.IE8及以前没有捕获！



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        #box {
            width: 300px;
            height: 300px;
            background-color: hotpink;
            position: relative;
        }

        #son {
            width: 100px;
            height: 100px;
            position: absolute;

            left: 350px;
            top: 350px;

            background-color: yellowgreen;
        }
    </style>
</head>
<body>

<div id="box">

    <div id="son"></div>
</div>


</body>
</html>

<script>
    /*本小节知识点：事件捕获

     1.事件冒泡：从触发事件元素，一级一级往上找父元素触发同名事件，如果有就触发

    2.事件捕获：从最顶级的父元素一级一级往下找子元素触发同名事件，直到触发事件的元素为止
        * 事件捕获与事件冒泡触发事件的顺序完全相反

    3.事件捕获，只能通过addEventListener并且参数写true才是事件捕获
        * 其他都是冒泡（不是通过addEventListener添加、addEventListener参数为false）

    4.事件对象.stopPropagation() 除了可以阻止冒泡还可以阻止捕获

    5.IE8及以前没有捕获！

     */

    var box = document.getElementById("box");
    var son = document.getElementById("son");



    window.addEventListener("click", function () {
        alert("这是window");
    },true)


    document.addEventListener("click", function () {
        alert("这是document");
    },true)

    document.documentElement.addEventListener("click", function (e) {
        e = e || window.event;
        alert("这是html");
        e.stopPropagation();//阻止事件冒泡和事件捕获

    },true)

    document.body.addEventListener("click", function () {

        alert("这是body");

    },true)

    //参数3：默认是false，代表是支持事件冒泡
    box.addEventListener("click", function () {

        alert("这是box");
    },true)

    son.addEventListener("click", function () {

        alert("这是son");
    },true)




</script>
```



## 1.2-事件三个阶段



本小节知识点：介绍事件的三个阶段

* 1.事件一共有三个阶段：事件的执行顺序
  * 1--捕获阶段 ：
  * 2--目标阶段 ：
  * 3--冒泡阶段 ：
* 2.事件对象.eventPhase 可以获得触发这个事件时，到底是哪个阶段
* 3.先从最顶级往下一级一级捕获，然后到目标的捕获，目标的冒泡，再一级一级往上冒泡



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        .one {
            width: 200px;
            height: 200px;
            background-color: pink;
        }
        .son {
            width: 100px;
            height: 100px;
            background-color: green;
            position: absolute;
            left: 250px;
            top: 250px;
        }
    </style>
</head>
<body>
<div class="one" id="box">
    <input type="button" value="按钮" id="btn"/>
    <div class="son" id="son"></div>
</div>

<script>
    /*本小节知识点：介绍事件的三个阶段
    1.事件一共有三个阶段：事件的执行顺序
                1--捕获阶段 ：
                2--目标阶段 ：
                3--冒泡阶段 ：

      2.事件对象.eventPhase 可以获得触发这个事件时，到底是哪个阶段

      3.先从最顶级往下一级一级捕获，然后到目标的捕获，目标的冒泡，再一级一级往上冒泡

     */
    var box = document.getElementById("box");
    var btn = document.getElementById("btn");
    var son = document.getElementById("son");

    document.addEventListener("click",function (e) {
        alert("document"+ e.eventPhase);
    },true) ;//true表示事件捕获，所以是阶段1，并且优先执行

    document.body.addEventListener("click", function (e) {
        alert("哈哈，我是body"+ e.eventPhase);
    },false);


    box.addEventListener("click",function (e) {
        alert("哈哈哈，我是粉色的盒子box..."+ e.eventPhase);
    },false);



    btn.addEventListener("click",function (e) {
        alert("哈哈哈，我是按钮btn..."+ e.eventPhase);
    },false);



    son.addEventListener("click",function (e) {
        alert("嘻嘻嘻，我是绿色的盒子son"+ e.eventPhase);

    },false);

</script>
</body>
</html>
```







# 05-事件对象补充属性（事件类型、键盘按键）

## 1.1-事件类型e.type



```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <!--
        事件对象.type  能获取到触发事件的事件名
    -->
</head>
<body>

<input type="button" value="按钮" id="btn"/>
</body>
</html>

<script>

    var btn = document.getElementById('btn');

    /*
    btn.onclick = function (e) {

        console.log("我被点了");

        console.log(e.type);//获取事件名，获取到的是click
    };

    btn.onmouseover = function (e) {
        console.log(e.type);//mouseover
    };
    */

   btn.onclick = f1;
    btn.onmouseover = f1;

    function f1(e){
        //如果是点击触发的，那么就是click，如果是鼠标移入触发的就是mouseover
        console.log(e.type);
    }

</script>
```

## 1.2-键盘事件及获取键盘按键



本小节知识点：介绍键盘的事件和获取按键

​     1.键盘事件

​        onkeydown:键盘按下触发

​        onkeyup：键盘弹起触发

​        onkeypress：键盘按下并弹起会触发（用的比较多）

​     onkeydown和onkeypress的区别：了解即可

​           1.onkeypress可以过滤掉特殊的功能键例如删除、F1-F12,shift,alt键等等，onkeydown不会过滤

​            2.onkeypress可以区分大小写，但是onkeydown永远都是大写（不管大小写状态）

​      \2. 如何获取你到底按的是哪个键？

​            \* 通过事件对象获取   语法： 事件对象.keyCode

​                \* 获取到的是键盘对应字符的ascii码

​                \* ascii码转字符：String.fromCharCode(code)

​      3.有三个属性都可以获取到按下的键

​            keyCode（IE8及之前），charCode,which

​       所以为了保证一定能获取到，就做兼容

​            var code = e.keyCode || e.charCode || e.which;





```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

</body>
</html>

<script>
    /*本小节知识点：介绍键盘的事件和获取按键
     1.键盘事件
        onkeydown:键盘按下触发
        onkeyup：键盘弹起触发
        onkeypress：键盘按下并弹起会触发（用的比较多）

     onkeydown和onkeypress的区别：了解即可
           1.onkeypress可以过滤掉特殊的功能键例如删除、F1-F12,shift,alt键等等，onkeydown不会过滤
            2.onkeypress可以区分大小写，但是onkeydown永远都是大写（不管大小写状态）

      2. 如何获取你到底按的是哪个键？
            * 通过事件对象获取   语法： 事件对象.keyCode
                * 获取到的是键盘对应字符的ascii码
                * ascii码转字符：String.fromCharCode(code)

      3.有三个属性都可以获取到按下的键
            keyCode（IE8及之前），charCode,which
       所以为了保证一定能获取到，就做兼容
            var code = e.keyCode || e.charCode || e.which;
     */

    document.onkeypress = function (e) {

        e = e || window.event

        var code = e.keyCode || e.charCode || e.which;

        console.log("press触发了 : " + code);
       //根据ASCII码转换成字符
        console.log(String.fromCharCode(code));
    }

    //打开浏览器，按下任何键就触发了
    document.onkeydown = function (e) {

        e = e || window.event

        console.log("down触发了 : " + e.keyCode);

        console.log(String.fromCharCode(e.keyCode));
    }

</script>
```



# 06-DOM增删改查综合案例总结



## 1.1-案例：模拟百度搜索框

[效果预览](<file:///C:/Users/%E5%BC%A0%E6%99%93%E5%9D%A4/Desktop/%E5%BC%A0%E6%99%93%E5%9D%A4%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE%E8%B5%84%E6%96%99/AB%E6%A8%A1%E5%BC%8F/03-WebApi/%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/%E5%A4%87%E8%AF%BE%E4%BB%A3%E7%A0%81/day10/DOM%E7%BB%BC%E5%90%88%E6%A1%88%E4%BE%8B/12-%E6%A8%A1%E6%8B%9F%E7%99%BE%E5%BA%A6%E6%90%9C%E7%B4%A2%E6%A1%86.html>)



需求分析：
          1.键盘松开txt ： 根据搜索内容显示对应搜索列表ul
          2.鼠标移入li元素：颜色变红
          3.鼠标移出li元素：颜色变原先颜色
          4.鼠标点击li元素： （1）搜索框显示点击的li元素文本  （2）情况内容列表ul
           思路分析：事件三要素
                 1 获取元素：
                 2 注册事件：
                 3 事件处理：

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            font-size: 20px;
        }
        .box {
            width: 600px;
            height: 40px;
            margin: 200px auto;
            position: relative;
        }
        #txt {
            width: 498px;
            height: 38px;
            border: 1px solid #ccc;
            font-size: 20px;
        }
        #search {
            width: 100px;
            height: 40px;
        }
        #keywords {
            position: absolute;
            top: 40px;
            left: 0;
            background-color: rgb(12, 255, 24);
            list-style: none;
            width: 500px;;
        }
        li {
            line-height: 24px;
        }
    </style>
</head>
<body>
<div class="box">
    <div class="top">
        <input type="text" id="txt"/><input type="button" value="search" id="search"/>
    </div>
    <ul id="keywords"></ul>
</div>
<script>

      /* 需求分析：
          1.键盘松开txt ： 根据搜索内容显示对应搜索列表ul
          2.鼠标移入li元素：颜色变红
          3.鼠标移出li元素：颜色变原先颜色
          4.鼠标点击li元素： （1）搜索框显示点击的li元素文本  （2）情况内容列表ul
           思路分析：事件三要素
                 1 获取元素：
                 2 注册事件：
                 3 事件处理：
       */
    var keywords = ["林利群", "林利群为什么很黑", "林利群的经纪人是周林林吗", "林利群是谁", "广东人", "广东人爱吃", "广东人爱吃福建人","王宝强","王宝强的经纪人","王宝强的老婆","林丹出轨门","林丹夺冠","123","1234","2341","林丹的生平","JavaScript","Java","王思聪","王健林","社会王","隔壁老王"];

    //1. 获取元素：
    var txt = document.getElementById('txt');
    var ul = document.getElementById('keywords');
    //2.注册事件：

      //2.1 键盘松开
      txt.onkeyup = function (  ) {
        //3.事件处理 : 根据搜索内容显示对应文本
          //3.1 获取搜索文本
          var search = this.value;
          //3.2 每一次输入之前应该把之前的内容清空，以本次输入为准
          ul.innerHTML = '';
          //3.3 如果用户没有输入，则不搜索
          if(search.length == 0){
              return;
          };
          console.log ( search );
          //3.3 根据搜索文本显示对应内容
          searchTxt(search);
      };


      /**
       *
       * @param searchTxt 要搜索的文本
       */
      function searchTxt ( searchTxt ) {
          //将数组中的内容显示到页面
          for(var i = 0;i<keywords.length;i++){
              var str = keywords[i];
              //如果搜索文本searchTxt在str中则显示
              if (str.indexOf(searchTxt) != -1){
                  //1.创建空li元素
                  var li = document.createElement('li');
                  //2.设置文本
                  li.innerText = str;
                  //3.li元素添加到ul
                  ul.appendChild(li);

                  //每一个创建的li元素都有三个事件

                  //鼠标移入：颜色变红
                  li.onmouseover = function (  ) {

                      //(1)先用一个自定义属性存储原先的颜色
                      this.aaa = this.style.backgroundColor;
                      //(2)修改颜色为红色
                      this.style.backgroundColor = 'red';
                  };

                  //鼠标移出：颜色恢复原先的颜色
                  li.onmouseout = function (  ) {
                      this.style.backgroundColor = this.aaa;
                  };

                  //鼠标单击：
                  li.onclick = function (  ) {
                      //(1)搜索框文本变成单击的li元素文本
                      txt.value = this.innerText;
                      //(2)清空内容列表
                      ul.innerHTML = '';
                      // for(var i = 0;i<ul.children.length;i++){
                      //       ul.removeChild(ul.children[i]);
                      // }
                  };
              }
          }

      };
</script>
</body>
</html>
```



## 1.2-dom综合案例：数据表格处理



[效果预览](file:///C:/Users/%E5%BC%A0%E6%99%93%E5%9D%A4/Desktop/%E5%BC%A0%E6%99%93%E5%9D%A4%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE%E8%B5%84%E6%96%99/%E5%85%A8%E5%A4%A9%E6%A8%A1%E5%BC%8F/02-WebApi/%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/%E5%A4%87%E8%AF%BE%E4%BB%A3%E7%A0%81/day08/14-%E7%BB%BC%E5%90%88%E6%A1%88%E4%BE%8B-%E6%95%B0%E6%8D%AE%E8%A1%A8%E6%A0%BC%E5%A4%84%E7%90%86.html)

1.根据json数据生成页面结构

​                1.1-动态创建表头

​                1.2-根据json对象动态创建tr

​                1.3-动态创建tr中的三个操作按钮

​                函数封装：

​                    a.将创建tr封装到函数中：因为新增一行也会用到

​                    b.将根据id获取元素封装到函数中：因为页面多个地方会用到

​            2.注册页面事件

​                2.1-点击新增一行

​                2.2-新增确定

​                2.3-新增取消

​                2.4-向上移动

​                2.5-向下移动

​                2.6-删除

​           3.处理事件

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        .main,table {
            width: 800px;
            margin: 0 auto;
        }
        .main {
            height: 40px;
            line-height: 40px;
        }
        table , th ,td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        .optd {
            width: 200px;
        }
        .addTable {
            width: 780px;
            padding: 10px;
            border: 1px solid green;
            /* 固定位置 */
            position: fixed;
            top: 200px;
            left: 50%;
            margin-left: -400px;
            /* 标准流 */
            /* margin: 0 auto; */
            background-color: #fff;
            display: none;
        }
        .addTable table {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="main">
        <input type="button" value="新增一行" id="add"/>
    </div>
    <table id="table">

    </table>
    <!--用于新增表格获取数据的模块-->
    <div class="addTable" id="addRow">
        <table>
            <tr>
                <th>学号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
            </tr>
            <tr>
                <td><input type="text" id="number"/></td>
                <td><input type="text" id="name"/></td>
                <td>
                    <select id="gender">
                        <option >男</option>
                        <option >女</option>
                    </select>
                </td>
                <td><input type="text" id="age"/></td>
            </tr>
        </table>

        <div>
            <input type="button" value="确定" id="sure"/>
            <input type="button" value="取消" id="cancle"/>
        </div>
    </div>
    <script>

        /*思路分析
            1.根据json数据生成页面结构
                1.1-动态创建表头
                1.2-根据json对象动态创建tr
                1.3-动态创建tr中的三个操作按钮
                函数封装：
                    a.将创建tr封装到函数中：因为新增一行也会用到
                    b.将根据id获取元素封装到函数中：因为页面多个地方会用到
            2.注册页面事件
                2.1-点击新增一行
                2.2-新增确定
                2.3-新增取消
                2.4-向上移动
                2.5-向下移动
                2.6-删除
            3.处理事件 
        
        */
        var head = ["学号","姓名","性别","年龄","操作"];
        var data = [
            {"number":"001","name":"李狗蛋","gender":"男","age":16},
            {"number":"002","name":"王大柱","gender":"女","age":17},
            {"number":"003","name":"李葫芦","gender":"男","age":15},
            {"number":"004","name":"小明","gender":"男","age":18},
            {"number":"005","name":"小红","gender":"女","age":16}
        ];

        //1.根据json数据生成页面结构

        //1.1 获取table
        var table = id('table');

        //1.2 创建表头tr
        //（1）创建空标签
        var tableHead = document.createElement('tr');
        // (2) 设置属性：添加th
        for(var i = 0;i<head.length;i++){
            var th = document.createElement('th');
            th.innerText = head[i];
            tableHead.appendChild(th);
        };
        //(3) 添加到table中
        table.appendChild(tableHead);

        //1.3 创建表格主题内容tr
        for(var i = 0;i<data.length;i++){
            table.appendChild(createRow(data[i]));
        };

        /**根据json对象生成table的tr
         * @parma：json对象
         * @return：创建好的tr元素
         */
        function createRow(obj){
            //(1)创建空tr
            var tr = document.createElement('tr');
            //（2）设置属性
            //根据数组的元素添加td
            //数组元素date[i]是对象类型，所以需要使用遍历对象的语法
            for(var key in obj){
                var td = document.createElement('td');
                td.innerText = obj[key];//(1)var obj = data[i]  (2)obj[key]
                tr.appendChild(td);
            };
            //创建操作td
            var inputTd = document.createElement('td');
            inputTd.className = 'optd';
            //上移动按钮
            var upInput = document.createElement('input');
            upInput.type = 'button';
            upInput.value = '向上移动';
            upInput.onclick = moveUp;//事件onclick属性的值是一个函数类型的数据
            inputTd.appendChild(upInput);
            //下移动按钮
            var downInput = document.createElement('input');
            downInput.type = 'button';
            downInput.value = '向下移动';
            downInput.onclick = moveDown;
            inputTd.appendChild(downInput);
            //删除按钮
            var deleteInput = document.createElement('input');
            deleteInput.type = 'button';
            deleteInput.value = '删除';
            deleteInput.onclick = deleteRow;
            inputTd.appendChild(deleteInput);
            tr.appendChild(inputTd);
            //(3)返回创建好的tr
            return tr;
        };

        function id(str){
            return document.getElementById(str);
        };
        

        //2.页面事件
        var add = id('add');//新增按钮
        var addRow = id('addRow');//要显示的新增div
        var sure = id('sure');//确定按钮
        var cancle = id('cancle');//取消按钮

        //2.1 新增按钮：点击显示新增div
        add.onclick = function(){
            addRow.style.display = 'block';
        };

        //2.2 取消:隐藏新增div
        cancle.onclick = function(){
            addRow.style.display = 'none';
        };

        //2.3 确定:根据用户输入的数据创建tr添加到table中
        sure.onclick = function(){
            //3.事件处理
            //3.1 创建json对象
            var obj = {};
            //3.2 获取新增div的表单元素属性值添加到对象中
            obj.number = id('number').value;
            obj.name = id('name').value;
            obj.gender = id('gender').children[0].selected?'男':'女';
            obj.age = id('age').value;
            //3.3 根据对象创建tr添加到table中
            table.appendChild(createRow(obj));
            //3.4 隐藏新增div
            addRow.style.display = 'none';

        };

        //2.4 上移动按钮点击事件
        function moveUp(){
            //3.事件处理：把自己所在的tr移到上一个tr前面
            console.log(this);//按钮
            console.log(this.parentNode);//按钮的父亲是td
            console.log(this.parentNode.parentNode);//按钮的爷爷是tr
            
            //让按钮的祖宗table将按钮的爷爷（tr）移到他哥(tr的previousElementSibling)的前面去
            //注意：如果当前按钮所在的tr是第一个内容tr则不能移动
            if(this.parentNode.parentNode == table.children[1]){//0下标是表头，所以这里是1下标
                alert('已经到顶部啦');
                return;
            };
            table.insertBefore(this.parentNode.parentNode,this.parentNode.parentNode.previousElementSibling);
        };

        //2.5 下移动按钮点击事件
        function moveDown(){
            //让按钮的祖宗table将按钮的爷爷（tr）移到他弟弟(tr的nextElementSibling)的后面去
            //注意：如果当前按钮所在的tr是最后一个内容tr则不能移动
            if(this.parentNode.parentNode == table.lastElementChild){
                alert('已经到底部啦');
                return;
            };
            table.insertBefore(this.parentNode.parentNode,this.parentNode.parentNode.nextElementSibling.nextElementSibling);
        };

        //2.6 删除按钮点击事件
        function deleteRow(){
            //弹出确认框(返回值是布尔类型)
            var isSure = confirm('确定要删除吗?');
            if(isSure){
                //this:按钮
                //让我的祖宗table把我爷爷给移除掉
                table.removeChild(this.parentNode.parentNode);
            };
        };
        


        
    </script>
</body>
</html>
```



## 1.3-【课后了解】数据表格处理（真实开发中的模板引擎渲染原理介绍）



```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        .main,
        table {
            width: 800px;
            margin: 0 auto;
        }

        .main {
            height: 40px;
            line-height: 40px;
        }

        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        .optd {
            width: 200px;
        }

        .addTable {
            width: 780px;
            padding: 10px;
            border: 1px solid green;
            /* 固定位置 */
            position: fixed;
            top: 200px;
            left: 50%;
            margin-left: -400px;
            /* 标准流 */
            /* margin: 0 auto; */
            background-color: #fff;
            display: none;
        }

        .addTable table {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>
    <div class="main">
        <input type="button" value="新增一行" id="add" />
    </div>
    <table id="table">
        <tr>
            <th>学号</td>
            <th>姓名</td>
            <th>性别</td>
            <th>年龄</td>
            <th>操作</td>
        </tr>
        <!--模板引擎渲染：
            1.作用(为啥要学这个东西)：实际开发中页面结构很复杂，如果使用dom来创建页面结构代码量很多，
        如果提前将页面结构在html中写好，可以大大提高开发效率。
            2.怎么用(使用步骤或者语法)
                a.写模板：由于这个模板一开始只是占坑的，不希望显示，这时候可以放到script标签中
                    * 细节：script标签默认type是text/javascript,如果设置成text/html则不会执行
                b.获取srcipt模板标签的innerHTML文本，然后将我们模板语法替换成你真正想要渲染的数据
                    * 例如: document.getElementById('tpl').innerHTML.replace('{{value.name}}','张三')
                c.将替换之后的字符串设置成页面元素的内容innerHTML
                    * 因为我们模板写在script标签中无法显示，所以需要将替换之后的字符串显示到页面上
            3.注意点
                * 熟能生巧

         -->
        <script type="text/html" id="tpl">
            <td>{{number}}</td>
            <td>{{name}}</td>
            <td>{{gender}}</td>
            <td>{{age}}</td>
            <td class="optd">
                <!-- 如果是行内事件：this默认指向的并不是这个元素，而是window,js高级会讲解如何动态修改this -->
                <input type="button" value="向上移动" onclick="moveUp()">
                <input type="button" value="向下移动" onclick="moveDown()">
                <input type="button" value="删除" onclick="deleteRow()">
            </td>
        </script>

    </table>
    <!--用于新增表格获取数据的模块-->
    <div class="addTable" id="addRow">
        <table>
            <tr>
                <th>学号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
            </tr>
            <tr>
                <td><input type="text" id="number" /></td>
                <td><input type="text" id="name" /></td>
                <td>
                    <select id="gender">
                        <option>男</option>
                        <option>女</option>
                    </select>
                </td>
                <td><input type="text" id="age" /></td>
            </tr>
        </table>

        <div>
            <input type="button" value="确定" id="sure" />
            <input type="button" value="取消" id="cancle" />
        </div>
    </div>
    <script>

        /*思路分析
            1.根据json数据生成页面结构
                1.1-动态创建表头
                1.2-根据json对象动态创建tr
                1.3-动态创建tr中的三个操作按钮
                函数封装：
                    a.将创建tr封装到函数中：因为新增一行也会用到
                    b.将根据id获取元素封装到函数中：因为页面多个地方会用到
            2.注册页面事件
                2.1-点击新增一行
                2.2-新增确定
                2.3-新增取消
                2.4-向上移动
                2.5-向下移动
                2.6-删除
            3.处理事件 
        
        */
        var head = ["学号", "姓名", "性别", "年龄", "操作"];
        var data = [
            { "number": "001", "name": "李狗蛋", "gender": "男", "age": 16 },
            { "number": "002", "name": "王大柱", "gender": "女", "age": 17 },
            { "number": "003", "name": "李葫芦", "gender": "男", "age": 15 },
            { "number": "004", "name": "小明", "gender": "男", "age": 18 },
            { "number": "005", "name": "小红", "gender": "女", "age": 16 }
        ];

        //1.根据json数据生成页面结构

        //1.1 获取table
        var table = id('table');
        //1.3 创建表格主题内容tr
        //遍历数组每一个元素:将元素数据渲染到页面
        for (var i = 0; i < data.length; i++) {
            template('tpl', data[i]);
        };

        /*模板引擎渲染函数封装（实际开发中别人写好了，函数名也叫这个,参数也叫这个）
        第一个参数：模板script标签的id
        第二个参数：你想要渲染的数据
         */
        function template(tplId, obj) {
            console.log(tplStr);
            //1.获取模板文本
            var tplStr = id(tplId).innerHTML;
            //2.开始替换
            for (var key in obj) {
                tplStr = tplStr.replace('{{' + key + '}}', obj[key]);
            };
            //3.将替换好的字符串显示到页面
            var tr = document.createElement('tr');
            tr.innerHTML = tplStr;
            table.appendChild(tr);
            // //2.开始替换
            // tplStr = tplStr.replace('{{number}}',data[0].number);
            // tplStr = tplStr.replace('{{name}}',data[0].name);
            // tplStr = tplStr.replace('{{gender}}',data[0].gender);
            // tplStr = tplStr.replace('{{age}}',data[0].age);

            // //3.将替换好的字符串显示到页面
            // var tr = document.createElement('tr');
            // tr.innerHTML = tplStr;
            // table.appendChild(tr);
            // console.log(tplStr);

        }

        function id(str) {
            return document.getElementById(str);
        };


        //2.页面事件
        var add = id('add');//新增按钮
        var addRow = id('addRow');//要显示的新增div
        var sure = id('sure');//确定按钮
        var cancle = id('cancle');//取消按钮

        //2.1 新增按钮：点击显示新增div
        add.onclick = function () {
            addRow.style.display = 'block';
        };

        //2.2 取消:隐藏新增div
        cancle.onclick = function () {
            addRow.style.display = 'none';
        };

        //2.3 确定:根据用户输入的数据创建tr添加到table中
        sure.onclick = function () {
            //3.事件处理
            //3.1 创建json对象
            var obj = {};
            //3.2 获取新增div的表单元素属性值添加到对象中
            obj.number = id('number').value;
            obj.name = id('name').value;
            obj.gender = id('gender').children[0].selected ? '男' : '女';
            obj.age = id('age').value;
            //3.3 根据对象创建tr添加到table中
            // table.appendChild(createRow(obj));
            template('tpl', obj);
            //3.4 隐藏新增div
            addRow.style.display = 'none';

        };

        //2.4 上移动按钮点击事件
        function moveUp() {
            //3.事件处理：把自己所在的tr移到上一个tr前面
            console.log(this);//按钮
            console.log(this.parentNode);//按钮的父亲是td
            console.log(this.parentNode.parentNode);//按钮的爷爷是tr

            //让按钮的祖宗table将按钮的爷爷（tr）移到他哥(tr的previousElementSibling)的前面去
            //注意：如果当前按钮所在的tr是第一个内容tr则不能移动
            if (this.parentNode.parentNode == table.children[1]) {//0下标是表头，所以这里是1下标
                alert('已经到顶部啦');
                return;
            };
            table.insertBefore(this.parentNode.parentNode, this.parentNode.parentNode.previousElementSibling);
        };

        //2.5 下移动按钮点击事件
        function moveDown() {
            //让按钮的祖宗table将按钮的爷爷（tr）移到他弟弟(tr的nextElementSibling)的后面去
            //注意：如果当前按钮所在的tr是最后一个内容tr则不能移动
            if (this.parentNode.parentNode == table.lastElementChild) {
                alert('已经到底部啦');
                return;
            };
            table.insertBefore(this.parentNode.parentNode, this.parentNode.parentNode.nextElementSibling.nextElementSibling);
        };

        //2.6 删除按钮点击事件
        function deleteRow() {
            //弹出确认框(返回值是布尔类型)
            var isSure = confirm('确定要删除吗?');
            if (isSure) {
                //this:按钮
                //让我的祖宗table把我爷爷给移除掉
                table.removeChild(this.parentNode.parentNode);
            };
        };
    </script>
</body>

</html>
```

