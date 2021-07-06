# 今日学习任务

* [ ] 1.jquery三大家族操作(尺寸操作)

  * [ ] a.宽高尺寸
  * [ ] b.position与offset
  * [ ] c.获取可视区域宽高
  * [ ] d.scrollLeft()与scrollTop()
  * [ ] e.案例：固定导航

* [ ] 2.jquery事件

  * [ ] jquery事件的发展史

  * [ ] 事件解绑

  * [ ] 事件触发

  * [ ] jquery事件对象

    

  

# 1-jquery三大家族操作(尺寸操作)

| 名称                               | 用法                      | 描述                                                         |
| ---------------------------------- | ------------------------- | ------------------------------------------------------------ |
| outerWidth() / outerHieght()       | $('div').outerWidth()     | 获取 `width` + `padding·`+ `border`(相当于原生的offsetWidth/Height) |
| width() / height()                 | $('div').width()          | 获取 `width`                                                 |
| innerWidth()/innerHeight()         | $('div').innerWidth()     | 获取 `wdith` + `padding`                                     |
| outerWidth(true)/outerHeight(true) | $('div').outerWidth(true) | 获取 `width` + `padding·`+ `border` + `margin`               |
| position()                         | $('div').position()       | 对象类型，自身左外边框  到 定位父级 左内边框距离（相当于原生的offsetLeft/Top） |
| offset()                           | $('div').offset()         | 对象类型, 自身左外边框 距离 页面 左内边框距离                |
| scrollLeft() / scrollTop()         | $('div').scrollLeft()     | 与原生的scrollLeft/Top作用一样.支持修改                      |



## 1.1-宽高尺寸



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

</body>

</html>
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .one {
            width: 200px;
            border: 10px solid red;
            padding: 20px;
            margin: 30px;
        }
    </style>

</head>

<body>
    <div id="one" class="one" style="height: 200px;"></div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {

            /*复习原生DOM三大家族
                1.offset家族：获取元素自身真实宽高与位置
                    offsetWidth/Height : 宽高 （内容width + padding + border）
                    offsetParent :   定位父级
                    offsetLeft/Top : 元素自身左/上 外边框  到  定位父级  左/上 内边框距离
                2.scroll家族
                    scrollWidth/Height : 元素内容真实宽高
                    scrollLeft/Top :  左/上 滚动出去的距离
                3.client家族
                    clientWidth/Height: 元素可视区域的宽高
                    clientLeft/Top:  左/上  边框宽度
            2.原生三大家族共同特点： (1)获取行内和行外 (2)number类型，不带单位  (3)只能获取不能设置
            
            */


            /*
            1.jquery中的三大家族(元素尺寸操作)
                outerWidth()/ outerHieght() : width+padding+border
                width()/height()            : 只是获取width
                innerWidth()/innerHeight()  : 获取的是width+padding
                outerWidth(true)/outerHeight(true) : 获取的是width+padding+border+margin
            
            2.特点
                a.可以获取行内和行外
                b.获取的是number，不带单位
                c.可以获取和修改（本质是修改宽高width/height）
            */

            //1.获取元素自身真实宽高（width+padding+border）

            //1.1 以前的方式css操作：  获取的是字符串类型
            console.log($('#one').css('width'));//200px
            console.log($('#one').css('padding'));//20px
            console.log($('#one').css('border'));//10px solid rgb(255, 0, 0)
            console.log($('#one').css('border-left-width'));//10px

            //1.2 outerWidth()/ outerHieght() : width+padding+border  
            /* a.可以获取行内行外
               b.获取的是number类型，不带单位
               c.可以获取也可以修改 
            */

            console.log($('#one').outerWidth());//260
            console.log($('#one').outerHeight());//260

            $('#one').outerWidth(300);//支持修改,本质改的是width


            //2.jquery新增其他的宽高操作

            //2.1  width()/height() :  只是获取width

            console.log($('#one').width()); //240
            console.log($('#one').height()); //200

            $('#one').height(100);

            //2.2 innerWidth()/innerHeight() : 获取的是width+padding

            console.log($('#one').innerWidth());
            console.log($('#one').innerHeight());

            $('#one').innerWidth(100);//本质改的还是width


            //2.3 outerWidth(true)/outerHeight(true) : 获取的是width+padding+border+margin

            console.log($('#one').outerWidth(true));
            console.log($('#one').outerHeight(true));
        });

    </script>
</body>

</html>
```



## 1.2-position与offset

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            width: 400px;
            height: 400px;
            border: 10px solid red;
            position: relative;
            top: 10px;
            left: 10px;
        }

        .son {
            width: 100px;
            height: 100px;
            border: 10px solid green;
            position: absolute;
            top: 100px;
            left: 100px;
        }
    </style>

</head>

<body>
    <div id="father" class="father">
        <div id="son" class="son"></div>
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*
            1. position() ： 相当于offsetLeft与offsetTop
                a.获取的是一个对象：
                    left: 自身左外边框  到 定位父级 左内边框距离
                    top:  自身上 外边框 到 定位父级 上内边框距离
                b.不支持设置

            */

            console.log($('#son').position());
            console.log($('#son').position().left);
            console.log($('#son').position().top);

            //修改无效
            $('#son').position({
                left:200,
                top:200
            });




            /* 
            2. offset : 获取自身到document（页面）的距离
                a.获取的是一个对象
                    left: 自身左外边框 距离 页面 左内边框距离
                    top:  自身上外边框 距离 页面 上内边框距离
                b.支持设置
                    * 如果元素没有定位，会自动给元素添加relative相对定位
            */
            console.log($('#son').offset());
            console.log($('#son').offset().left);
            console.log($('#son').offset().top);

            $('#son').offset({
                left:150,
                top:150
            });
            

        });
    </script>
</body>

</html>
```



## 1.3-获取可视区域宽高

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
    <script src="./jquery-1.12.4.js"></script>
    <script>
        /* 
        获取页面可视区域宽高：固定语法
            $(window).width()
            $(window).height()
        */

        console.log( $(window).width());
        console.log( $(window).height());


        //模拟响应式布局
        $(window).resize(function(){
            if($(window).width() >= 1000){
                $('body').css('backgroundColor','red');
            }else if($(window).width() >= 600){
                $('body').css('backgroundColor','yellow');
            }else{
                $('body').css('backgroundColor','green');
            }
        })
        
    </script>
</body>
</html>
```



## 1.4-scrollLeft()与scrollTop()

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            width: 2000px;
            height: 2000px;
        }

        div {
            width: 200px;
            height: 200px;
            border: 1px solid red;
            overflow: auto;
        }

        img {
            vertical-align: top;
        }
    </style>


</head>

<body>
    <div>
        <img src="./images/1.jpg" alt="" />
    </div>

    <script src="./jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /* 
            scrollLeft() / scrollTop() : 获取内容 左/上 滚动出去的距离
                * 与原生的scrollLeft/Top作用一样
                * 支持修改
            */
            //1.给div注册滚动条事件
            $('div').scroll(function(){
                console.log($(this).scrollLeft());
                console.log($(this).scrollTop());
            });

            //2.给页面注册滚动条事件
            $(window).scroll(function(){
                console.log($(this).scrollLeft());
                console.log($(this).scrollTop());
            });
        });
    </script>
</body>

</html>
```



## 1.5-案例：固定导航

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day04/01-三大家族(尺寸)/06-案例：固定导航.html)

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>固定导航栏</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        .top,
        .nav {
            width: 1423px;
            margin-left: 50%;
            transform: translate(-50%);
        }

        .main {
            width: 1000px;
            margin: 10px auto;
        }

        img {
            display: block;
            vertical-align: middle;
        }
    </style>

</head>

<body>

    <div class="top">
        <img src="images/top.png" />
    </div>
    <div class="nav">
        <img src="images/nav.png" />
    </div>
    <div class="main">
        <img src="images/main.png" />
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*需求： 页面注册滚动条事件，判断滚动出去距离
                超过nav高度就设置top定位为fixed固定定位，否则回到标准流static
            */

            //页面滚动事件
            $(window).on('scroll', function () {
                //判断scrollTop值
                if ($(this).scrollTop() > $('.top').height()) {
                    //nav为固定定位.
                    $('.nav').css({
                        position: 'fixed',
                        top: 0,
                        left: 0
                    });
                    //设置main的marginTop，避免脱标导致顿闪
                    $('.main').css({
                        marginTop: $('.nav').height() + 10 + 'px'
                    });
                } else {
                    //nav为标准流.
                    $('.nav').css({
                        position: 'static'
                    });
                    //设置mian的margintop为默认值
                    $('.main').css({
                        marginTop: '10px'
                    });
                }
            });
        });
    </script>
</body>

</html>
```



# 2-jquery事件



## 1.1-jquery事件的发展史

| 名称       | 用法                                                 | m描述                                                        |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| click()    | `$('div').click(function(){})`                       | (1)不支持同时注册：不能一行代码同时注册两个事件，需要写两行                                                                                        (2)不支持动态注册：如果是新创建的元素，没有事件。需要重新注册 |
| bind()     | $('div').bind('click mouseover',function(){})        | (1)支持同时注册                                                                               (2)不支持动态注册 |
| delegate() | $('body').bind('click mouseover','div',function(){}) | (1)支持同时注册                                                                               (2)支持动态注册 |
| on()       | $('body').bind('click mouseover','div',function(){}) | (1)支持同时注册                                                                               (2)支持动态注册(`给body注册`) |
| on()       | $('div').bind('click mouseover',function(){})        | (1)支持同时注册                                                                               (2)不支持动态注册（`给元素注册`） |



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
            margin-top: 10px;
        }

        .one {
            border: 1px solid red;
        }

        .two {
            border: 1px solid green;
        }
    </style>

</head>

<body>
    <input type="button" value="按钮" id="btn" /> <br /><br />
    <div class="one" id="one"></div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //1. 复习原生js中用on的方式注册事件,相同的事件后面的会把前面的给覆盖.
            // document.getElementById("one").onclick = function () {
            //   alert('6666');
            // };
            // document.getElementById("one").onclick = function () {
            //   alert('7777');
            // };

            //2.jQuery中的事件发展历程.

            //2.1 简单事件注册.
            //语法:  $().事件类型(回调函数)
            /* 不好的地方: 
            (1)不能同时注册事件 ： 不能一行代码同时注册点击和鼠标移入事件，需要两行代码
            （2）不支持动态注册 ： 注册的事件只对已经存在的元素有效，如果是新创建的元素还需要再注册一次
            */

            // $('div').click(function () {
            //     alert(111666);
            // });
            // $('div').click(function () {
            //     alert(222777);
            // });
            // $('div').mouseenter(function () {
            //     console.log('鼠标移入了');
            // });

            // //点击按钮新创建一个div
            // $('#btn').on('click', function () {
            //     $('body').append($('<div class="one" id="two"></div>'));
            //     //虽然这样给刚才新增的div注册了鼠标移入事件，但是也会给以前的div重复注册
            //     $('div').mouseenter(function () {
            //         console.log('鼠标移入了');
            //     });
            // });



            //2.bind事件绑定 ：两种写法
            //(1)支持同时注册  （2）不支持动态注册

            // //2.1 两个事件处理函数一致写法
            // $('div').bind('click mouseenter', function () {
            //     console.log("哈哈");
            // });
            // //2.2 两个事件处理函数不一致写法
            // $('div').bind({
            //     click: function () {
            //         console.log("我是点击事件");
            //     },
            //     mouseenter: function () {
            //         console.log("我是鼠标移入事件");
            //     }
            // });

            // //点击按钮新创建一个div
            // $('#btn').on('click', function () {
            //     $('body').append($('<div class="one" id="two"></div>'));
            // });


            //3.delegate事件绑定 
            //原理：统一给body注册事件，底层使用事件冒泡来捕获事件源
            //（1）支持同时注册事件  （2）支持动态注册

            // $('body').delegate('div', {
            //     click: function () {
            //         console.log("单击事件");
            //     },
            //     mouseenter: function () {
            //         console.log("鼠标移入事件");
            //     }
            // })

            // //点击按钮新创建一个div
            // $('#btn').on('click', function () {
            //     $('body').append($('<div class="one" id="two"></div>'));
            // });




            //4.jQuery1.7之后，jQuery用on统一了所有事件的处理方法。

            /* 
            （1）支持同时注册
            （2）支持动态注册（由用户决定）
                给父元素注册：支持动态注册
                给子元素注册：不支持动态注册
            */

            //4.1 on注册简单事件（不支持动态注册）
            // $('div').on('click mouseenter', function () {
            //     console.log("哈哈");
            // });

        
            //4.2  on注册委托事件（支持动态注册） 

            $('body').on('click mouseenter', 'div', function () {
                console.log("哈哈");
            });

            //点击按钮新创建一个div
            $('#btn').on('click', function () {
                $('body').append($('<div class="one" id="two"></div>'));
            });
        });
    </script>
</body>

</html>
```



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
            border: 1px solid red;
        }
    </style>

</head>

<body>
    <input type="button" value="注册事件" id="btn1" />
    <input type="button" value="解绑事件" id="btn2" /> <br /><br />
    <div class="one" id="one"></div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //1.复习原生dom中如何解绑事件的.
            // document.getElementById("one").onclick = function () {
            //   console.log("哈哈");
            // };
            // document.getElementById("one").onclick = null;
            // document.getElementById("one").addEventListener();
            // document.getElementById("one").removeEventListener();
            // document.getElementById("one").attachEvent();
            // document.getElementById("one").detachEvent();



            //2.jQuery中用on()的方式注册事件,就用off()来解绑事件.
            //注册事件
            $('#btn1').on('click', function () {
                //点击按钮,给div注册事件
                $('div').on({
                    click: function () {
                        console.log("我是单击事件");
                    },
                    mouseenter: function () {
                        console.log("我是鼠标移入事件");
                    }
                });
            });

            //解绑事件.
            $('#btn2').on('click', function () {
                //点击按钮,给div解绑事件.
                //a.如果off()不给参数,解绑所有事件
                // $('div').off();
                //b.给参数就解绑指定的事件.
                $('div').off('mouseenter');
            });
        });
    </script>
</body>

</html>
```



## 1.3-事件触发

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
            border: 1px solid red;
        }
    </style>

</head>

<body>
    <div class="one" id="one"></div>
    
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //1.复习原生dom中如何主动触发事件

            // document.getElementById("one").onclick = function () {
            //   alert("哈哈");
            // };

            // //事件既可以是用户交互之后浏览器自动触发，我们也可以使用代码主动触发
            // document.getElementById("one").onclick();


            //2.jqeury中主动触发事件  :  $().trigger()

            $('div').on('click', function () {
                alert('我是div单击事件');
            });

            //主动触发
            $('div').trigger('click'); 
    
        });
    </script>
</body>

</html>
```



## 1.4-jquery事件对象

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            width: 2000px;
            height: 2000px;

        }

        .one {
            width: 200px;
            height: 200px;
            border: 1px solid red;
            /*margin-top: 10px;*/
            position: relative;
            top: 100px;
            left: 100px;
        }
    </style>

</head>

<body>
    <div id="one" class="one">
        <a href="https://www.baidu.com">百度一下，你就知道</a>
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //1.事件对象:存储与事件相关信息的对象（鼠标坐标点，键盘按键等）
            //原生dom：有IE8的兼容性
            // document.getElementById("one").onclick = function (e) {
            //   e = e || window.event;
            //   console.log(e);
            // };


            //2.jQuery中的事件对象.
            //jQuery事件对象其实就是js事件对象的一个封装，处理了兼容性。
            $('#one').on('click', function (e) {
                //2.1 就是用事件参数e来获取就ok. （用法都一样）
                //console.log(e);

                //2.2 事件对象中的常用的三个坐标
                console.log("screenX :"+e.screenX + "-" + e.screenY); //屏幕坐标系
                console.log("clientX :"+e.clientX + "-" + e.clientY); //页面可视区坐标系
                console.log("pageX :"+e.pageX + "-" + e.pageY);//页面左上角坐标系

                //2.3 事件触发源（真正触发这个事件的元素）
                alert('我是div的单击事件');
                console.log(e.target);
            });


            //3.给a标签注册单击事件.
            $('a').on('click', function (e) {
                alert('我是a标签的单击事件.');
                //阻止默认行为,比如a标签的默认跳转.
                e.preventDefault();
                //阻止冒泡.
                // e.stopPropagation();

                //return false 既能阻止默认行为,又能阻止事件冒泡
                //return false;
            });


            //4 keyCode获取键盘按键.
            $(document).on('keydown', function (e) {
                //jquery帮我们处理好了兼容性封装问题
                console.log(e.keyCode);
            });




            //5  第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用（不常使用）
            // $('body').on('click','div','我是传递进来的data数据', function (e) {
            //   //存储绑定事件时传递的附加数据
            //   console.log(e.data);
            // });


        });
    </script>
</body>

</html>
```

