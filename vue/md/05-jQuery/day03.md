# 今日学习任务



* [ ] 1.类名操作
  * [ ] a.语法学习
  * [ ] b.案例：tab栏切换
* [ ] 2.jquery动画
  * [ ] 显示show()与隐藏hide()
  * [ ] 滑入slideDown()与滑出slideUp()
  * [ ] 淡入fadeIn()与淡出fadeOut()
  * [ ] 自定义动画animate
  * [ ] 动画队列
* [ ] 3.动画案例
  * [ ] 360开机动画
  * [ ] 京东呼吸轮播图(渐变轮播图)
  * [ ] 手风琴
  * [ ] 下拉菜单
  * [ ] 打字动画



# 1-类名操作

| 名称          | 用法                        | 描述                       |
| ------------- | --------------------------- | -------------------------- |
| addClass()    | $('div').addClass('one')    | 添加类                     |
| removeClass() | $('div').removeClass('one') | 移除类                     |
| hasClass()    | $('div').hasClass('one')    | 判断类                     |
| toggleClass() | $('div').toggleClass('one') | 切换类(有就移除，没就添加) |

## 1.1-语法：类名操作



```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            margin-top: 10px;
        }

        .bgc {
            background-color: green;
        }

        .fontSize30 {
            font-size: 30px;
        }

        .width200 {
            width: 200px;
        }

        .height200 {
            height: 200px;
        }
    </style>
</head>

<body>
    <input type="button" value="添加类" id="addClass" />
    <input type="button" value="移除类" id="removeClass" />
    <input type="button" value="判断类" id="hasClass" />
    <input type="button" value="切换类" id="toggleClass" />
    <div id="div1" class="bgc ">div1</div>
   
    <script src="jquery-1.12.4.js"></script>
    <script>

        /*1.复习元素dom的类名操作
            a.获取： 元素.className
            b.设置： 元素.calssNmae = 类名
                修改类名，样式也会修改
        
          2.jquery类名操作
            添加类： $().addClass('类名')
            移除类： $().removeClass('类名')
            判断类： $().hasClass('类名')    
                返回布尔类型
            切换类： $().toggleClass('类名')
                如果没有这个类就添加，如果有就移除
        */
        $(function () {
            //1.添加类
            $('#addClass').on('click', function () {
                $('div').addClass('fontSize30 width200');
            });

            //2.移除类
            $('#removeClass').on('click', function () {
                //如果不写参数,就会删除所有的类,但是class这个属性名还保留着.
                // $('div').removeClass();
                //如果要移除对应的类,就写对应的类名参数.
                $('div').removeClass('fontSize30');
            });

            //3.判断类
            $('#hasClass').on('click', function () {
                console.log($('#div1').hasClass('fontSize30'));
            });


            //4.切换类.
            //如果你有某个类,就移除这个类; 如果你没有某个类,就添加上这个类.
            $('#toggleClass').on('click', function () {
                $('#div1').toggleClass('fontSize30');
            });

        });
    </script>
</body>

</html>
```



## 1.2-案例：tab栏切换

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/01-jquery类名操作/02-案例：tab栏切换.html)

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }

        .wrapper {
            width: 1000px;
            height: 475px;
            margin: 0 auto;
            margin-top: 100px;
        }

        .tab {
            border: 1px solid #ddd;
            border-bottom: 0;
            height: 36px;
            width: 320px;
        }

        .tab li {
            position: relative;
            float: left;
            width: 80px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            cursor: pointer;
            border-top: 4px solid #fff;
        }

        .tab span {
            position: absolute;
            right: 0;
            top: 10px;
            background: #ddd;
            width: 1px;
            height: 14px;
            overflow: hidden;
        }

        .products {
            width: 1002px;
            border: 1px solid #ddd;
            height: 476px;
        }

        .products .main {
            float: left;
            display: none;
        }

        .products .main.selected {
            display: block;
        }

        .tab li.active {
            border-color: red;
            border-bottom: 0;
        }
    </style>

</head>

<body>
    <div class="wrapper">
        <ul class="tab">
            <li class="tab-item active">国际大牌<span>◆</span></li>
            <li class="tab-item">国妆名牌<span>◆</span></li>
            <li class="tab-item">清洁用品<span>◆</span></li>
            <li class="tab-item">男士精品</li>
        </ul>
        <div class="products">
            <div class="main selected">
                <a href="###"><img src="images/guojidapai.jpg" alt="" /></a>
            </div>
            <div class="main">
                <a href="###"><img src="images/guozhuangmingpin.jpg" alt="" /></a>
            </div>
            <div class="main">
                <a href="###"><img src="images/qingjieyongpin.jpg" alt="" /></a>
            </div>
            <div class="main">
                <a href="###"><img src="images/nanshijingpin.jpg" alt="" /></a>
            </div>
        </div>
    </div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //需求:给tab栏的每一个li标签注册点击事件
            //(1) 当前点击的li添加active类,其他的兄弟li移除active类.
            //(2) 与点击的li元素下标对应的div添加 selected类,其他的兄弟div移除selected类.

            $('.wrapper .tab-item ').click(function () {
                //（1）当前点击的li添加active类,其他的兄弟li移除active类
                $(this).addClass('active').siblings().removeClass('active');
                //（2）获取当前点击的li元素的索引
                var index = $(this).index();
                // (3)对应的div添加 selected类,其他的兄弟div移除selected类
                $('.wrapper .main').eq(index).addClass('selected').siblings().removeClass('selected');
            });


        });
    </script>
</body>

</html>
```



# 2-jquery动画

| 名称        | 用法                                                  | 描述                                                         |
| ----------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| show()      | $('div').show(动画时间，动画完成回调)                 | 展示动画，主要修改元素 `宽高 + display为block`               |
| hide()      | $('div').hide(动画时间，动画完成回调)                 | 隐藏动画，主要修改元素 `宽高 + display为none`                |
| slideDown() | $('div').slideDown(动画时间，动画完成回调)            | 滑入动画（卷帘门效果），主要修改元素 `高度+ display为block`  |
| slideUp()   | $('div').slideUp(动画时间，动画完成回调)              | 滑出动画（卷帘门效果），主要修改元素 `高度+ display为none`   |
| fadeIn()    | $('div').fadeIn(动画时间，,动画完成回调)              | 淡入动画(渐变效果)，主要修改元素 `透明度1+ display为block`   |
| fadeOut()   | $('div').fadeOut(动画时间，,动画完成回调)             | 淡出动画(渐变效果)，主要修改元素 `透明度0+ display为block`   |
| fadeTo()    | $('div').fadeTo(动画时间，`目标透明度`,动画完成回调)  | 淡入动画(渐变效果)，主要修改元素 `透明度+ display为block`    |
| animate()   | $('div').animate(属性对象,动画时间,动画速度,回调函数) | 相当于webApi中封装的缓动动画animationSlow()，只是参数不同而已 |

 

## 1.1-显示show()与隐藏hide()

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/02-jquery动画/01-显示与隐藏.html)

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
            display: none;
        }
    </style>

</head>

<body>
    <input type="button" value="显示" id="show" />
    <input type="button" value="隐藏" id="hide" />
    <input type="button" value="切换" id="toggle" /> <br /><br />
    <div id="div1"></div>
    <br /><br />
    <div id="div2"></div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {

            //1.显示动画show()
            $('#show').click(function () {
                /**
                 * @description: 显示动画 show()
                 * @param {type} duration动画时间(ms)：可选参数，不传没有动画
                 * @param {type} fn：可选参数，动画完成回调函数
                 * @return: 返回jquery对象，用于链式语法
                 */

                //1.1 不传参数，没有动画
                // $('#div1').show();

                //1.2 第一个参数：动画时间 单位ms
                // $('#div1').show(1000);

                //1.3 动画时间可以传三个字符串  fast:200 normal:400 slow:600
                //$('#div1').show('');  //空字符代表normal

                //1.4 第二个参数：动画完成回调函数
                // $('#div1').show('', function () {
                //     alert('66666');
                // });
                
                //1.5 jquery中的动画也支持隐式迭代：选中多个元素会同时执行动画
                $('div').show('');

            });
            
            //2.隐藏动画hide();
            $('#hide').on('click', function () {
                
                //(1) 特点与show()完全一致
                //(2) 动画效果与show()相反
                $('div').hide('');
            });

            //3.切换
            $('#toggle').on('click', function () {
                /* toggle()切换动画
                    1.如果元素当前display为none  隐藏， 则执行show()动画 
                    2.如果元素当前display为block 显示， 则执行hide()动画 
                 */
                $('div').toggle(1000);
            });
        });
    </script>
</body>
</html>
```



## 1.2-滑入slideDown()与滑出slideUp()

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/02-jquery动画/02-滑入与滑出.html)

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
            display: none;
        }
    </style>
</head>

<body>
    <input type="button" value="滑入" id="slideDown" />
    <input type="button" value="滑出" id="slideUp" />
    <input type="button" value="切换" id="slideToggle" /><br /><br />
    <div id="div1"></div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {

            //1.滑入动画 slideDown()
            $('#slideDown').on('click', function () {
                //(1)用法与显示隐藏动画一致
                //(2)细节区别：如果第一个参数不传，也有动画。默认为normal
                $('div').slideDown();

                $('div').slideDown('',function(){
                    alert('666');
                });
            });


            //2.滑出动画 
            $('#slideUp').on('click', function () {
                $('#div1').slideUp(1000);
            });


            //3.切换
            $('#slideToggle').on('click', function () {
                $('#div1').slideToggle(1000);
            });


        });
    </script>
</body>

</html>
```



## 1.3-淡入fadeIn()与淡出fadeOut()

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/02-jquery动画/03-淡入与淡出.html)

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
            display: none;
        }
    </style>
</head>

<body>
    <input type="button" value="淡入" id="fadeIn" />
    <input type="button" value="淡出" id="fadeOut" />
    <input type="button" value="切换" id="fadeToggle" />
    <input type="button" value="淡入到指定透明度" id="fadeTo" /><br /><br />
    <div id="div1"></div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {

            //1.淡入动画 fadeIn()
            $('#fadeIn').on('click', function () {
                //用法与滑入滑出动画一致
                // $('div').fadeIn();

                $('div').fadeIn(2000,function(){
                    alert('淡淡的我来了');
                });
            });

            //2.淡出
            $('#fadeOut').on('click', function () {

                $('#div1').fadeOut(function(){
                    alert('正如我淡淡的走');
                });

            });

            //3.切换
            $('#fadeToggle').on('click', function () {
                $('#div1').fadeToggle(1000);
            });


            //4.淡入到指定透明度 fadeTo
            $('#fadeTo').on('click', function () {

                //第一个参数：动画时间 不能不传
                //第二个参数：透明度  number类型和字符串类型都可以
                //第三个参数：回调函数
                $('#div1').fadeTo('',0.5, function () {
                    alert('我完事了');
                });
            });


        });
    </script>
</body>

</html>
```



## 1.4-自定义动画animate

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/02-jquery动画/04-自定义动画animate.html)

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: red;
            position: absolute;
            left: 0px;
        }

        #div1 {
            top: 50px;
        }

        #div2 {
            left: 300px;
            top: 200px;
            background-color: green;
        }
    </style>

</head>

<body>
    <input type="button" value="从左到右800" id="lr800" />
    <div id="div1"></div>
    <div id="div2"></div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //自定义动画
            //animate(参数1,);
            //参数1:是一个对象,代表做动画的属性,必选
            //参数2:动画执行的时长. 可选,如果没有写那就相当于是一个normal
            //参数3:easing:执行效果，默认为swing（缓动）  可以是linear（匀速）  可选的,默认不写是'swing'
            //参数4:动画执行完毕后的回调函数 可选的.
            $("#lr800").on('click', function () {

                /**
                 * @description: 自定义动画(其实就是我们以前封装的缓动动画)
                 * @param {type} 参数1： 要移动的属性对象    必须
                 * @param {type} 参数2： 动画时间           可选，默认normal 400
                 * @param {type} 参数3： 动画方式           可选，默认swing缓动    匀速：linear
                 * @param {type} 参数4： 回调函数           可选
                 * @return: jq对象，用于链式语法
                 */

                // $('#div1').animate({
                //     left: 300,
                //     top: 200,
                //     width: 500,
                //     height: 300,
                //     zIndex: 1,
                //     opacity: 0.5,
                // }, 2000, 'linear', function () {
                //     alert('666');
                // });

                //常见用法： 只传参数1 或者 加上参数4，参数23不传自动默认
                $('#div1').animate({
                    left: 300,
                    top: 200,
                    width: 500,
                    height: 300,
                    zIndex: 1,
                    opacity: 0.5,
                }, function () {
                    $('#div1').animate(
                        { 
                            left: 500,
                            top: 50, 
                            width: 50,
                             height: 50, 
                             opacity: 0.2 
                        });
                });
            });

        });
    </script>
</body>

</html>
```



## 1.5-动画队列

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/02-jquery动画/05-动画队列.html)

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        div {
            width: 200px;
            height: 300px;
            background-color: red;
            display: none;
        }
    </style>
</head>

<body>
    <input type="button" value="开始动画" id="start" />
    <input type="button" value="停止动画" id="stop" /> <br /><br />
    <div></div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //1.模拟一个动画队列.
            $('#start').on('click', function () {
                $('div').slideDown(2000).slideUp(2000);
            });

            //2.stop(参数1,参数2)   ：停止当前动画 (类似于以前的缓动动画每一次之前先清除以前的定时器以本次为准)
            //参数1:是否清除队列      (后面动画是否取消)
            //参数2:是否跳转最终效果   (当前动画最终效果还要不要看一眼)
            $('#stop').on('click', function () {
                // $('div').stop(true,true);
                $('div').stop(true,false);
                // $('div').stop(false,true);
                // $('div').stop(false,false);

                //如果不写参数,两个参数默认就是false,false
                // $('div').stop();
            });

        });
    </script>
</body>

</html>
```



# 3-动画案例

## 1.1-360开机动画

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/03-动画案例/01-360开机动画.html)

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        .box {
            width: 322px;
            position: fixed;
            bottom: 0;
            right: 0;
            overflow: hidden;
        }

        span {
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 20px;
            cursor: pointer;
        }
    </style>

</head>

<body>
    <div class="box" id="box">
        <span id="closeButton"></span>
        <div class="hd" id="headPart">
            <img src="images/t.jpg" alt="" />
        </div>
        <div class="bd" id="bottomPart">
            <img src="images/b.jpg" alt="" />
        </div>
    </div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //需求：点击关闭按钮 ： 下半部分高度为0，然后整个盒子宽度为0
            $('#closeButton').click(function () {
                $('#bottomPart').animate({
                    height: 0
                }, function () {
                    $('#box').animate({
                        width: 0
                    });
                });
            });
        });
    </script>


</body>

</html>
```



## 1.2-京东呼吸轮播图(渐变轮播图)

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/03-动画案例/02-京东呼吸轮播图(渐变轮播).html)

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <title>动画-案例《轮播图》</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .slider {
            height: 340px;
            width: 790px;
            margin: 100px auto;
            position: relative;
        }

        .slider li {
            position: absolute;
            display: none;
        }

        .slider li:first-child {
            display: block;
        }


        .arrow {
            display: none;
        }

        .slider:hover .arrow {
            display: block;
        }

        .arrow-left,
        .arrow-right {
            font-family: "SimSun", "宋体";
            width: 30px;
            height: 60px;
            background-color: rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 50%;
            margin-top: -30px;
            cursor: pointer;
            text-align: center;
            line-height: 60px;
            color: #fff;
            font-weight: 700;
            font-size: 30px;
        }

        .arrow-left:hover,
        .arrow-right:hover {
            background-color: rgba(0, 0, 0, .5);
        }

        .arrow-left {
            left: 0;
        }

        .arrow-right {
            right: 0;
        }
    </style>
</head>

<body>
    <div class="slider">
        <!--图片容器  6图 -->
        <ul>
            <li><a href="#"><img src="images/jd/1.jpg" alt=""></a></li>
            <li><a href="#"><img src="images/jd/2.jpg" alt=""></a></li>
            <li><a href="#"><img src="images/jd/3.jpg" alt=""></a></li>
            <li><a href="#"><img src="images/jd/4.jpg" alt=""></a></li>
            <li><a href="#"><img src="images/jd/5.jpg" alt=""></a></li>
            <li><a href="#"><img src="images/jd/6.jpg" alt=""></a></li>
        </ul>
        <!--箭头-->
        <div class="arrow">
            <span class="arrow-left">&lt;</span>
            <span class="arrow-right">&gt;</span>
        </div>
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //1.声明变量存储当前图片下标
            var index = 0;

            //2.点击下一页
            $('.arrow-right').click(function () {
                //(1)index++
                //如果当前index是最后一张，则从0开始
                index == $('ul').children().length - 1 ? index = 0 : index++;
                //(2)开始动画 ： 当前index的li元素淡入，它所有的兄弟li元素淡出
                $('.slider li').eq(index).fadeIn(500).siblings('li').fadeOut(500);
            })


            //3.点击下一页
            $('.arrow-left').click(function () {
                //(1)index--
                //如果当前index是第一张，则从最后一张开始
                index == 0 ? index = $('ul').children().length - 1 : index--;
                //(2)开始动画 ： 当前index的li元素淡入，它所有的兄弟li元素淡出
                $('.slider li').eq(index).fadeIn(500).siblings('li').fadeOut(500);
            });

        });
    </script>

</body>

</html>
```



## 1.3-手风琴

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/03-动画案例/03-手风琴.html)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>动画-案例《手风琴》</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
            width: 2400px;
        }

        #box {
            width: 1200px;
            height: 400px;
            border: 2px solid red;
            margin: 100px auto;
            overflow: hidden;
        }

        #box li {
            width: 240px;
            height: 400px;
            float: left;
        }
    </style>
</head>

<body>
    <div id="box">
        <ul>
            <li><img src="./images/collapse/1.jpg" alt=""></li>
            <li><img src="./images/collapse/2.jpg" alt=""></li>
            <li><img src="./images/collapse/3.jpg" alt=""></li>
            <li><img src="./images/collapse/4.jpg" alt=""></li>
            <li><img src="./images/collapse/5.jpg" alt=""></li>
        </ul>
    </div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*需求
            (1):给每一个li设置鼠标移入事件:当前li的宽度变成800,其他兄弟li宽度变成100
            (2):鼠标移出大盒子,所有的li的宽度都变成默认的240 
             */

            //1.给每一个li元素注册鼠标移入事件
            $('#box li').mouseenter(function () {
                $(this).stop(true, false).animate({ width: 800 }, 500).siblings('li').stop(true, false).animate({ width: 100 }, 500);
            });

            //2.给box注册鼠标移出事件
            $('#box').mouseleave(function () {
                $(this).find('li').stop(true, false).animate({ width: 240 }, 200);
            });
        });
    </script>

</body>

</html>
```



## 1.4-下拉菜单

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/03-动画案例/04-下拉菜单.html)

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }

        .wrap {
            width: 330px;
            height: 30px;
            margin: 100px auto 0;
            padding-left: 10px;
            background-image: url(images/bg.jpg);
        }

        .wrap li {
            background-image: url(images/libg.jpg);
        }

        .wrap>ul>li {
            float: left;
            margin-right: 10px;
            position: relative;
        }

        .wrap a {
            display: block;
            height: 30px;
            width: 100px;
            text-decoration: none;
            color: #000;
            line-height: 30px;
            text-align: center;
        }

        .wrap li ul {
            position: absolute;
            top: 30px;
            display: none;
        }
    </style>
</head>

<body>
    <div class="wrap">
        <ul>
            <li>
                <a href="javascript:void(0);">一级菜单1</a>
                <ul>
                    <li><a href="javascript:void(0);">二级菜单1</a></li>
                    <li><a href="javascript:void(0);">二级菜单2</a></li>
                    <li><a href="javascript:void(0);">二级菜单3</a></li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0);">一级菜单1</a>
                <ul>
                    <li><a href="javascript:void(0);">二级菜单1</a></li>
                    <li><a href="javascript:void(0);">二级菜单2</a></li>
                    <li><a href="javascript:void(0);">二级菜单3</a></li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0);">一级菜单1</a>
                <ul>
                    <li><a href="javascript:void(0);">二级菜单1</a></li>
                    <li><a href="javascript:void(0);">二级菜单2</a></li>
                    <li><a href="javascript:void(0);">二级菜单3</a></li>
                </ul>
            </li>
        </ul>


    </div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*需求:
                （1）鼠标移入一级li元素,显示它下面的二级菜单ul.
                （2）鼠标移出一级li元素,隐藏它下面的二级菜单ul.
            */
            //$('li'); //不行
            //$('ul>li'); //不行
            //$('.wrap li'); //不行

            $('.wrap>ul>li').mouseenter(function () {
                //$(this).children('ul').css('display','block');
                //上面代码和下面这行代码是等价的。 show()方法底层修改的就是display为block
                $(this).children('ul').stop(true,false).slideDown();
            });

            $('.wrap>ul>li').mouseleave(function () {
                $(this).children('ul').stop(true,false).slideUp();
            });

            //课后思考题:为什么是给一级菜单li标签设置鼠标移入移出事件,而不是给一级菜单a标签设置?
            // $('.wrap>ul>li>a').mouseover(function () {
            //     $(this).next().show();
            // });

            // $('.wrap>ul>li>a').mouseout(function () {
            //     $(this).next().hide();
            // });

        });
    </script>
</body>

</html>
```



## 1.5-打字动画

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day03/03-动画案例/05-打字动画.html)

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

        .wrap {
            width: 1000px;
            text-align: center;
            margin: 100px auto 0;
        }

        .wrap h1 {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-weight: 300;
        }

        .word {
            font-weight: 700;
        }

        .typed-cursor {
            opacity: 1;
            display: none;
        }

        .saySection {
            margin-top: 50px;
        }

        .saySection input {
            font-size: 30px;
        }

        .saySection .txtSay {
            padding-left: 10px;
        }

        .saySection .btnSay {
            display: inline-block;
            padding: 0 20px;
            cursor: pointer;
        }
    </style>
</head>

<body>

    <div class="wrap">
        <h1>
            <span class="word"></span>
            <span class="typed-cursor">|</span> ！
        </h1>
        <div class="saySection">
            <input type="text" id="inValue" class="txtSay" />
            <input type="button" value="Say" id="btnSay" class="btnSay" />
        </div>
    </div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {

            

            //给Say按钮注册点击事件，点击之后获取输入框文本展示打字效果
            $('#btnSay').click(function(){
                showText($('#inValue').val());
            });


            var timeID = null;

            //函数测试
            showText('黑马程序员');

            //打字效果动画函数封装
            function showText(text) {
                //1.先清除之前的定时器，以本次动画为准
                clearInterval(timeID);
                //2.开始本次动画
                var str = '';//声明空字符串用于逐个拼接text字符
                timeID = setInterval(function () {
                    //如果str与text长度不一致，说明没打完
                    if (str.length != text.length) {
                        //拼接下一个字符
                        str += text[str.length++];
                        $('.word').text(str).show();
                       // $('.typed-cursor').fadeIn(250).fadeOut(250);//淡入淡出实现顿闪效果

                    } else {
                        clearInterval(timeID);
                    };
                }, 500);
            }

        });
    </script>
</body>

</html>
```

