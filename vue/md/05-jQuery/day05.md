# 今日学习任务

* [ ] ==1.jquery补充知识点==
  * [ ] 链式编程注意点与end方法
  * [ ] 案例：五角星评分案例
  * [ ] 显式迭代each
  * [ ] 多库共存
* [ ] 2.jquery插件开发
  * [ ] 第三方插件
    * [ ] 颜色插件
    * [ ] 图片懒加载插件
    * [ ] 省市联动插件
    * [ ] UI相关插件
  * [ ] 自定义插件(插件工作原理)
    * [ ] 自定义插件封装
    * [ ] 自定义插件封装案例：弹幕插件



# ==1-jquery补充知识点==

## 1.1-链式编程注意点与end方法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>1</p>
    <div>2</div>
    <p>3</p>

    <script src="./jquery-1.12.4.js"></script>
    <script>
        /*1.jQuery链式语法工作原理 
        a. jq的方法返回一个jq对象
        b. jq对象就可以继续调用jq的方法
         */

        // $('div').text('222222').width(100).height(100).css('backgroundColor','red');


        //2.链式语法注意点

        /*  2.1  并不是所有的方法返回值都是jq对象
        a. 一般设置类方法 返回jq对象可以继续点语法调用
        b. 获取类的方法， 返回的是元素的属性值。 无法继续链式，程序会报错
        
         */

        //程序报错的原因： $('div').width(100).height() 返回值 高度number，不能继续链式
        //console.log($('div').width(100).height());//21
        
        //  $('div').width(100).height().css('backgroundColor','red');

        /*  2.2 并不是所有的方法都会返回你想要的结果 
          end():方法回退到dom树状态的上一步结果
        */

        // 需求： (1)给div设置文字 22222  （2）给div的上一个元素设置文字1111  （3）给div的下一个元素设置文字3333

        /* 
        (1) $('div').text('2222')          给div设置文字，返回的是div
        (2) .prev().text('1111')           给div的上一个p1设置文字，返回p1
        (3) .next().text('3333')           获取p1的下一个div，设置文字
         */
        // $('div').text('2222').prev().text('1111').next().text('3333');


        /* 
        (1) $('div').text('2222')          给div设置文字，返回的是div
        (2) .prev().text('1111')           给div的上一个p1设置文字，返回p1
        end()  : 返回dom树状态的上一步结果，返回的就是div
        (3) .next().text('3333')           获取p1的下一个div，设置文字
         */
        //end() : 回退到上一步dom树状态的结果
        // $('div').text('2222').prev().text('1111').end().next().text('3333');


        //3.总结： 链式语法过长会有潜在bug
        //解决方案： 将一条很长的链 拆开成 多条链
        $('div').text('2222');
        $('div').prev().text('1111');
        $('div').next().text('333');

    </script>
</body>
</html>
```



## 1.2-案例：五角星评分案例

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day05/01-jquery语法细节补充/02-案例：五角星评分案例.html)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>五角星评分案例</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .comment {
            font-size: 40px;
            color: red;
        }

        .comment li {
            float: left;
            cursor: pointer;
        }

        ul {
            list-style: none;
        }
    </style>

</head>

<body>
    <ul class="comment">
        <li>☆</li>
        <li>☆</li>
        <li>☆</li>
        <li>☆</li>
        <li>☆</li>
    </ul>
    <script src="jquery-1.12.4.js"></script>

    <script>
        /* 需求：
        (1)鼠标移入每一个li元素：
            a.设置实心 : 当前移入的li元素this,和以前的兄弟们 
            b.设置空心 : 当前移入的li元素的后面的兄弟们
        (2)鼠标单击li元素
            记录当前点击的li元素
        (3)鼠标移出li元素
            a. 全部设置空心
            b. 如果用户有点击的话， 点击的li元素和它的哥哥们设置实心，弟弟们设置空心
        
         */
         var sx_wjx = '★';
         var kx_wjx = '☆';
        
        $('.comment>li').on('mouseenter',function(){ 
            console.log('1111');
            //实心：当前移入的li元素this,和以前的兄弟们
            //空心 : 当前移入的li元素的后面的兄弟们
            /* 
            prev() : 获取上一个兄弟元素
            prevAll() : 获取以前所有的兄弟元素
             */
            $(this).text(sx_wjx).prevAll().text(sx_wjx).end().nextAll().text(kx_wjx);
        })
        .on('click',function(){
            console.log('22222');
            //排他思想记录当前点击的li元素 (行内自定义属性)
            $(this).attr('aaa','current').siblings().removeAttr('aaa');
        })
        .on('mouseleave',function(){
            console.log('33333');
            //(1)设置所有的li元素为空心 (用户没有点击)
            $('.comment>li').text(kx_wjx);
            //(2)点击的li元素和它的哥哥们设置实心，弟弟们设置空心
            $('.comment>li[aaa="current"]').text(sx_wjx).prevAll().text(sx_wjx);
        });
        
    </script>
</body>
</html>
```

## 1.3-显式迭代each

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>复制</title>
    <style>
        ul {
            list-style: none;
        }

        li {
            float: left;
            width: 200px;
            height: 200px;
            background: pink;
            text-align: center;
            line-height: 200px;
            margin: 0 20px 20px 0;
        }
    </style>
</head>

<body>
    <ul id="ulList">
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
        <li>什么都看不见</li>
    </ul>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //需求 :  设置每一个li标签的透明度,从0.1到1.

            //1.隐式迭代 ：jquery默认行为。  会给每一个li元素设置相同的属性值
            $('#ulList>li').css('opacity', 1);


            //2.显示迭代 ：主动遍历每一个元素，可以设置不同的值

            //2.1 原生js实现
            // for (var i = 0; i < $lis.length; i++) {
            //     var $lis = $('#ulList>li');
            //     //最后一次强调： juquery对象不能使用dom语法，dom对象不能使用jquery语法
            //     $lis[i].style.opacity = (i + 1) / 10;
            //     //$($lis[i]).css('opacity',(i+1)/10);
            // }


            //2.2 jquery语法：显示迭代each();
            //参数是一个回调函数：  function(index,ele){ index:下标 0-最大   ele：dom元素}
            $('#ulList>li').each(function (index, ele) {
                // console.log(index);
                // console.log(ele); //dom元素
                //ele.style.opacity = (index+1)/10;
                $(ele).css('opacity', (index + 1) / 10);
            });
        });
    </script>
</body>

</html>
```



## 1.4-多库共存

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>

</head>

<body>
    <script src="sb.js"></script>
    <script src="jquery-1.12.4.js"></script>
    <script src="jquery-3.0.0.js"></script>


    <script>

        jQuery(function () {
            //1.以前讲jQuery的版本

            //1.x 支持ie678
            //2.x 不支持ie678
            //3.x 不支持ie678 更新中


            //2. 补充:如何查看$的版本.
            //console.log($.prototype.jquery);
            //console.log($.fn.jquery);
            //console.log(jQuery.fn.jquery);



            /* 3. 现在我想我们的项目支持ie678,
                    然后又想使用3.x的新方法,
                    那就应该引入2个jQuery文件,一个1.x,一个3.x的.
            问题：这2个jQuery文件中都有$符号,那现在使用$符号使用的是哪一个文件中的$.
            结论：那个文件后引入,使用的这个$就是那个文件中的.
            */
            
            //4.解决方案： 使用$.noConflict()  释放控制权
            var _$3 = $.noConflict(); //$默认是最后导入的3.x版本，现在这个3.0版本变成了_$3

            console.log(_$3.fn.jquery);
            console.log($.fn.jquery); // $就变成了1.x版本的
            
            //5.如果我觉得 _$3,用着别扭，还是想一个$同时代表3.x 和 1.x 咋办？

            //有困难找闭包：沟通函数内部和外部的桥梁

            //把全局变量_$3作为形参传递到 局部作用域中
            (function($){
                console.log('老铁666' + $.fn.jquery);
            })(_$3);
        });
    </script>
</body>

</html>
```



# 2-jquery插件开发



* 什么是插件呢？
  * a.jquery作者虽然很牛逼，但是不是万能的，有些功能还是做不得了。
  * b.热心网友在jquery原有的功能上拓展新的功能(方法)，这些方法就叫插件
    * 插件：在原有的基础上新增的方法
* 插件的原理是啥？
  * 就是给jQuery的原型添加自己封装的方法（所有$对象都可以调用）
* 插件课外学习传送门
  * 国内最好的jq插件库：<http://www.jq22.com/>
  * UI相关的插件
    * jq自己团队写的：<http://jqueryui.com/>
    * 第三方团队写的：<http://www.jeasyui.net/plugins/>
    * 最好用的还是bootstrap:<https://www.bootcss.com/>
      * 大家还记不记得使用bootstrap需要下载并导入jquery?
        * 其实bootstrap也算是jq的一种UI插件
* 课堂介绍常用的第三方插件
  * 颜色插件：<https://download.csdn.net/download/ozhy111/10792316?utm_source=bbsseo>
  * 图片懒加载插件：<http://www.jq22.com/jquery-info390>
  * 省市联动插件：<http://www.jq22.com/jquery-info8054>

## 1.1-颜色插件

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day05/02-jquery插件开发/01-颜色插件.html)

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>标题</title>
  <style>
    div {
      width: 200px;
      height: 200px;
      background-color: red;
      position: relative;
      top: 0px;
      left: 0px;
    }
  </style>

  <script src="jquery-1.12.4.js"></script>
  <script src="plugin/jquery.color.js"></script>
  <script>
    $(function () {
      $('#btn').on('click', function () {
        //让div做动画.
        //animate()动画改变不了背景色.   如果就是想改,就要使用jQuery的插件.
        $('div').animate({
          left:800,
          width:100,
          height:100,
          opacity:0.5,
          backgroundColor:'green'
        },3000);
      });
    });
  </script>


</head>
<body>
<input type="button" value="按钮" id="btn"/> <br/> <br/>
<div></div>
</body>
</html>
```

## 案例：京东工具栏

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day05/02-jquery插件开发/02-颜色插件案例：京东工具栏.html)

移入红色：#db192a

移出灰色：#7a6e6e

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            overflow: hidden;
            font-family: "Microsoft YaHei";
        }

        ul {
            list-style: none;
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -90px;
        }

        ul li {
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            text-align: center;
            margin-bottom: 1px;
            position: relative;
        }

        ul li.last {
            margin-bottom: 0;
        }

        ul li span {
            display: inline-block;
        }

        ul li .text {
            width: 76px;
            height: 35px;
            background: #7a6e6e;
            /*background: #db192a;*/
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 2px 0 0 2px;
            color: white;
        }

        ul li .icon {
            width: 34px;
            height: 35px;
            position: relative;
            left: 0;
            right: 0;
            background: #7a6e6e url("images/toolbars/toolbars.png") no-repeat;
        }

        div {
            width: 100px;
            height: 100px;
            background: red;
        }
    </style>

</head>

<body>
    <ul class="toolbar">
        <li><span class="text">京东会员</span><span class="icon" style="background-position: -88px -175px;"></span></li>
        <li><span class="text">购物车</span><span class="icon" style="background-position: -50px 0;"></span></li>
        <li><span class="text">我的关注</span><span class="icon" style="background-position: -50px -50px;"></span></li>
        <li><span class="text">我的消息</span><span class="icon" style="background-position: -190px -150px;"></span></li>
        <li class="last"><span class="text">咨询JIMI</span><span class="icon jm"
                style="background-position: -50px -150px;"></span></li>
    </ul>
    <script src="jquery-1.12.4.js"></script>
    <script src="plugin/jquery.color.js"></script>
    <script>
        $(function () {
            /*
                需求1:给每一个li设置鼠标移入事件:
                    * 上面是文字的span更改定位的left值为-76(宽)以及颜色,
                    * 下面的图标span更改颜色.
                需求2:给每一个li设置鼠标移出事件:还原
            */

            //动画延迟
            //delay();

            $('.toolbar>li').on('mouseenter', function () {
                $(this).find('.text').stop(true, false).delay(200).animate({
                    left: -76,
                    backgroundColor: '#db192a'
                }, 500);

                $(this).find('.icon').stop(true, false).delay(200).animate({
                    backgroundColor: '#db192a'
                }, 500);

            }).on('mouseleave', function () {
                $(this).find('.text').stop(true, false).animate({
                    left: 0,
                    backgroundColor: '#7a6e6e'
                }, 200);

                $(this).find('.icon').stop(true, false).animate({
                    backgroundColor: '#7a6e6e'
                }, 200);
            });


        });
    </script>
</body>

</html>
```





## 1.2-图片懒加载插件

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day05/02-jquery插件开发/03-图片懒加载插件.html)

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
            width: 980px;
            margin: 0 auto;
        }

        ul li {
            width: 230px;
            height: 230px;
            float: left;
            margin-right: 20px;
            margin-bottom: 20px;
        }

        ul li.last {
            margin-right: 0;
        }

        ul li img {
            width: 100%;
            height: 100%;
            display: block;
        }
    </style>
</head>

<body>
    <!-- 假设上面的内容高度1000px -->
    <div style="margin-top: 1000px;"></div>
    <ul>
        <li><img data-original="http://img.daimg.com/uploads/allimg/160324/1-160324232117.jpg" alt=""></li>
        <li><img data-original="http://img.daimg.com/uploads/allimg/160318/1-16031P01P0.jpg" alt=""></li>
        <li><img data-original="http://img.daimg.com/uploads/allimg/160318/1-16031P01332.jpg" alt=""></li>
        <li class="last"><img data-original="images/guojidapai.jpg" alt=""></li>
    </ul>
    <!--
图片懒加载
1. img标签特点：不管图片隐藏还是显示  有src属性都会去加载
2. 那么如果页面上有太多的图片  而且有些图片不在可视窗口内  如果加载了会影响页面的渲染页面时间
3. 解决方案：自己控制图片的加载  当进入可视区域内容才去加载
4. 怎么控制呢？ 通过控制src属性来控制图片加载
5. 思路怎么样？ 首先默认所有的图片都不使用src属性，自定义一个属性存要显示的图片路径，当进入可视区域追加到src属性
6. 使用插件  基于jquery的图片加载插件
7. jquery.lazyload.js  延时加载图片
-->
    <script src="jquery-1.12.4.js"></script>
    <script src="plugin/jquery.lazyload.js"></script>
    <script>
        $(function () {
            
            /*底层原理：
                （1）监听页面滚动
                （2）如果页面滚动距离 > 元素top
                    * 把src属性改成自定义属性  默认的是  data-original
             */
            $('ul img').lazyload();

        });
    </script>
</body>

</html>
```



## 1.3-省市联动插件

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day05/02-jquery插件开发/04-省市联动插件.html)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>

</head>

<body>
    <div class="one" id="one">
        <select name=""></select>
        <select name=""></select>
        <select name=""></select>
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script src="plugin/distpicker.data.js"></script>
    <script src="plugin/distpicker.js"></script>
    <script>
        $(function () {
            /* 细节：one这个div的子元素需要有三个select标签 */
            $('#one').distpicker({
                province: "湖北省",
                city: "黄冈市",
                district: "浠水县"
            });
        });
    </script>
</body>

</html>
```



## 1.4-UI相关插件

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <link rel="stylesheet" href="css/jquery-ui.css" />
    <style>
        #accordion h3 {
            background-color: pink;
        }

        #tabs li {
            background-color: green;
        }
    </style>

</head>

<body>
    <!-- Accordion -->
    <h2 class="demoHeaders">Accordion</h2>
    <div id="accordion">
        <h3>First</h3>
        <div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
        <h3>Second</h3>
        <div>Phasellus mattis tincidunt nibh.</div>
        <h3>Third</h3>
        <div>Nam dui erat, auctor a, dignissim quis.</div>
        <h3>four</h3>
        <div>four.....Nam dui erat, auctor a, dignissim quis.</div>
    </div>


    <!-- Tabs -->
    <h2 class="demoHeaders">Tabs</h2>
    <div id="tabs">
        <ul>
            <li><a href="#tabs-1">First</a></li>
            <li><a href="#tabs-2">Second</a></li>
            <li><a href="#tabs-3">Third</a></li>
        </ul>
        <div id="tabs-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</div>
        <div id="tabs-2">Phasellus mattis tincidunt nibh. Cras orci urna, blandit id, pretium vel, aliquet ornare,
            felis. Maecenas scelerisque sem non nisl. Fusce sed lorem in enim dictum bibendum.</div>
        <div id="tabs-3">Nam dui erat, auctor a, dignissim quis, sollicitudin eu, felis. Pellentesque nisi urna,
            interdum eget, sagittis et, consequat vestibulum, lacus. Mauris porttitor ullamcorper augue.</div>
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script src="plugin/jquery-ui.js"></script>
    <script>
        $(function () {
            //ui插件  user interface 用户界面
            //http://www.jeasyui.net/
            //https://jqueryui.com/
            $("#accordion").accordion();
            $("#tabs").tabs();

        });
    </script>

</body>

</html>
```



## 1.5-自定义插件封装

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>

    <script src="jquery-1.12.4.js"></script>
    <script src="jquery-bgColor.js"></script>

    <script>
        $(function () {
            //1.需求:给div设置宽高和背景色.

            // $('div').width(100).height(100).css('backgroundColor','red');


            //2.如果能有个插件这样写就好了
            //可惜报错了：理想很美好，现实很骨感
            //   $('div').w(100).h(100).bgColor('red');


            //3.自定义插件原理： 给jQuery对象的原型添加方法，封装一些自己的操作

            //把这个函数放到单独的js文件中就完美了

            // jQuery.fn.w = function(width){
            //     //this:指向调用这个方法的jquery对象
            //     this.width(width);

            //     //这个对象我用完了，返回出去给调用者继续用，这就是链式编程的原理
            //     return this;
            // };

            // jQuery.fn.h = function(height){
            //     //this:指向调用这个方法的jquery对象
            //     this.height(height);
            //     return this;
            // };

            // jQuery.fn.bgColor = function(color){
            //     //this:指向调用这个方法的jquery对象
            //     this.css('backgroundColor',color);
            //     return this;
            // };


            //4.试试自己的插件吧
            $('div').w(100).h(100).bgColor('red');



        });
    </script>
</head>

<body>
    <div></div>
    <p></p>
</body>

</html>
```



## 1.6-自定义插件封装案例：弹幕插件

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day05/02-jquery插件开发/07-自定义插件封装案例：弹幕插件.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .container {
            width: 1000px;
            margin: 0 auto;
        }

        .container .video {
            width: 1000px;
            height: 600px;
            background: #000;
            position: relative;
            overflow: hidden;
        }

        .container .content {
            background: #333;
            height: 30px;
            padding: 10px;
        }

        .container .content input {
            float: right;
            border: none;
            outline: none;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="video">
        <video width="1000" height="600" src="images/video/1.mp4" controls></video>
    </div>
    <div class="content">
        <input type="button" value="发射" id="btn">
        <input type="text" id="txt">
    </div>
</div>

<script src="./jquery-1.12.4.js"></script>
<script src="./jquery-danmu.js"></script>
<script>
    $(function () {
        $('#btn').click(function () {
            //1.获取输入框文本
            var text = $('#txt').val().trim();//trim（）字符串去空格
            //2.没有输入就不发射
            if (!text) {
                return false;
            };
            //3.开始发射
            $('.video').faShe(text);
            //4.清空文本框
            $('[type="text"]').val('');
        });
        
    })
</script>
</body>
</html>
```



* jquery-danmu.js

```javascript
//沙箱模式
(function ($) {
    $.fn.faShe = function (text) {
        //this:调用这个方法的父元素
        //1.创建一个span元素
        var $span = $('<span></span>');
        //2.设置属性和动画
        $span.text(text).css({
            'position': 'absolute',
            'width': 200,
            'height': 30,
            'font-size': '20px',
            'font-weight': 'bold',
            'right': -200,
            'color': getRandomColor(),
            'top': getRandomTop()
        }).animate({ 'right': 1000 }, 10000, 'linear', function () {
            /*动画结束之后需要删除  自杀*/
            span.remove();
        }).appendTo(this);
    };

    //在闭包作用域中声明一个工具函数
    function getRandomColor() {
        /*0-255*/
        var r = Math.floor(256 * Math.random());
        var g = Math.floor(256 * Math.random());
        var b = Math.floor(256 * Math.random());
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function getRandomTop() {
        //一般弹幕都在上面
        return Math.floor(Math.random()*100);
    }

})(jQuery)
```

