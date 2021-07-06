# 今日学习任务



* [ ] 1.语法学习
  * [ ] a.节点操作
  * [ ] b.增删改查元素
* [ ] ==2.案例学习(熟悉jQuery的链式语法)==
  * [ ] 哼哼哈哈
  * [ ] 手风琴
  * [ ] 下拉菜单
  * [ ] 突出展示
  * [ ] 淘宝服饰精品展示
  * [ ] 选择城市（以前的选择职业）
  * [ ] 综合表格处理 (以前的webapi最难的案例)



# 1.语法学习

## 1.1-节点操作(筛选)

* 筛选选择器的功能与过滤选择器有点类似，但是用法不一样，筛选选择器主要是方法。

1. | 名称               | 用法                        | 描述                             |
   | ------------------ | --------------------------- | :------------------------------- |
   | children(selector) | $('ul').children('li')      | 相当于$('ul>li')，子类选择器     |
   | find(selector)     | $('ul').find('li');         | 相当于$('ul li'),后代选择器      |
   | siblings(selector) | $('#first').siblings('li'); | 查找兄弟节点，不包括自己本身。   |
   | parent()           | $('#first').parent();       | 查找父亲                         |
   | eq(index)          | $('li').eq(2);              | 相当于$('li:eq(2)'),index从0开始 |
   | next()             | $('li').next()              | 找下一个兄弟                     |
   | prev()             | $('li').prev()              | 找上一个兄弟                     |


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
    <ul>
        <li>我是班长1</li>
        <li>我是班长2</li>
        <li>我是班长3</li>
        <li>我是班长4</li>
        <li>我是班长5</li>
        <p>我是班长的女朋友</p>
        <div>
            <ol>
                <li>我是后代li元素</li>
            </ol>
        </div>
    </ul>

    <script src="./jquery-1.12.4.js"></script>
    <script>
        /*1.复习dom原生的节点操作 ： 通过属性获取
            a.获取子元素：  父元素.children
            b.获取父元素：  父元素.parentNode
            c.获取上一个元素：  父元素.previousElementSibling
            d.获取下一个元素：  父元素.nextElementSibling

         2.jquery的节点操作 ： 通过方法获取
            a.获取子元素：       $().children()   
            b.获取父元素：       $().parent()   
            c.获取上一个元素：   $().prev()   
            d.获取下一个元素：   $().next()   
            e.获取所有兄弟元素： $().siblings()  
                * 除自己之外的同级元素
            f.获取所有满足条件的后代元素:  $().find(选择器)
        
        
        */

        //1.获取子元素
        //$().children():不传参数表示获取所有的子元素
        console.log($('ul').children());

        //$().children(选择器)：表示获取选择器满足条件的子元素（过滤）
        console.log($('ul').children('p'));//获取ul中的p标签子元素

        
        

        //2.获取父元素
        console.log($('li:eq(1)').parent());
        
        //3.获取上一个元素
        console.log($('li:eq(1)').prev());

        //4.获取下一个元素
        console.log($('li:eq(1)').next());

        //5.获取所有的兄弟元素（除自己之外的同级元素）
        console.log($('li:eq(1)').siblings());

        //6.获取所有的后代li元素
        console.log($('ul').find('li'));//6个后代li元素
        console.log($('ul').children('li'));//5个子代li元素
        
        
    </script>
</body>
</html>
```



## 1.2-创建元素2种方式



```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>
    <style>
        #div1 {
            width: 300px;
            height: 300px;
            border: 1px solid red;
        }
    </style>

</head>

<body>
    <input type="button" value="html()" id="btnHtml1" />
    <input type="button" value="$()" id="btn1" /> <br /><br />

    <div id="div1">
        <p>p1
            <span>span1</span>
        </p>
    </div>
    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /*: 
            1.复习原生dom创建元素三种方式
                document.write();  不推荐
                innerHTML; 超过100，性能问题
                document.createElement(); 推荐方式

            2.jqquery创建元素两种方式
                $().html('字符串')      相当于innerHTML
                $('字符串')             相当于document.createElement()
            */
           
            //1.html()
            $('#btnHtml1').on('click', function () {
                //1.1 获取内容,不给参数.
                //console.log($('#div1').html());

                //1.2 设置内容,给参数
                $('#div1').html('<a href="https://www.baidu.com">我是超链接</a><h1>我是标题</h1>');
            });

            //2.$();
            $('#btn1').on('click', function () {
                //2.1 在内存创建一个jquery对象
                var $links = $('<a href="http://www.sina.com.cn">点击查看新闻</a>');
                //console.log($links);
                //2.2 添加到页面
                $('#div1').append($links);
            });



        });
    </script>
</body>

</html>
```



## 1.3-添加元素5种方式

| 名称       | 用法                    | 描述                                          |
| ---------- | ----------------------- | --------------------------------------------- |
| append()   | 父元素.append(子元素)   | 添加到最后面                                  |
| appendTo() | 子元素.appendTo(父元素) | 添加到最后面(作用与append一致,调用顺序不一样) |
| prepend()  | 父元素.prepend(子元素)  | 添加到最前面面                                |
| before()   | 兄弟A.before(兄弟B)     | B插入A前面                                    |
| after()    | 兄弟A.after(兄弟B)      | B插入A后面                                    |

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>


</head>

<body>
    <input type="button" value="append" id="btnAppend" />
    <input type="button" value="appendTo" id="btnAppendTo" />
    <input type="button" value="prepend" id="btnPrepend" />
    <input type="button" value="before" id="btnBefore" />
    <input type="button" value="after" id="btnAfter" />


    <ul id="ul1">
        <li>我是班长1</li>
        <li id="li2">我是班长2</li>
        <li>我是班长3</li>
        <li>我是班长4</li>
        <li>我是班长5</li>
    </ul>

    <ul id="ul2">
        <li>我是坤哥1</li>
        <li>我是坤哥2</li>
        <li id="li3">我是坤哥3</li>
        <li>我是坤哥4</li>
        <li>我是坤哥5</li>
    </ul>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            /* 
            1.复习原生dom添加元素两种方式
                父元素.appendChild(子元素)  ： 添加到最后面
                父元素.insertBefore(A元素,B元素)  ： A元素添加到B元素前面
            
            2.复习元素DOM添加元素的特点
                a.新元素：添加
                b.已存在：移动
                c.有子元素：父子一起移动

            2.jquery添加元素五种方式：特点与原生一致
                $().append(jquery对象)      : 添加到最后面   父元素.append(子元素)
                $().appendTo(jquery对象)    : 添加到最后面   子元素.appendTo(父元素)
                $().prepend(jquery对象)     : 添加到最前面   父元素.prepend(子元素) 
                $().before(jquery对象)      : 添加到指定位置  兄弟A.before(兄弟B) B插入A前面 
                $().after(jquery对象)       : 添加到指定位置  兄弟A.after(兄弟B) B插入A后面 
            */

            //1.append();
            $('#btnAppend').on('click', function () {
                //1.1 新元素
                var $liNew = $('<li>我是新创建的li标签</li>');
                $('#ul1').append($liNew);
                //1.2 已存在元素
                $('#ul1').append($('#li3'));
                //1.3 有子元素
                $('#ul1').append($('#ul2'));
            });

            //2.appendTo();
            //子元素.appendTo(父元素); //子元素作为最后一个子元素添加到父元素中.
            $('#btnAppendTo').on('click', function () {
                //2.1 新元素
                var $liNew = $('<li>我是新创建的li标签</li>');
                $liNew.appendTo($('#ul1'));
                //2.2 已存在元素
                $('#li3').appendTo($('#ul1'));
                //2.3 有子元素
                $('#ul2').appendTo($('#ul1'));
            });

            //3.prepend();
            $('#btnPrepend').on('click', function () {
                //3.1 新元素
                var $liNew = $('<li>我是新创建的li标签</li>');
                $('#ul1').prepend($liNew);
                //3.2 已存在元素
                $('#ul1').prepend($('#li3'));
                //3.3 有子元素
                $('#ul1').prepend($('#ul2'));
            });

            //4.before();
            //兄弟元素a.before(兄弟元素b);  //把兄弟元素b插入到兄弟元素a的前面.
            $('#btnBefore').on('click', function () {
                //4.1 新元素
                var $liNew = $('<li>我是新创建的li标签</li>');
                $('#li2').before($liNew);
                //4.2 已存在元素
                $('#li2').before($('#li3'));
                //4.3 有子元素
                $('#li2').before($('#ul2'));
            });

            //5.after();
            //兄弟元素a.after(兄弟元素b);  //把兄弟元素b插入到兄弟元素a的后面.
            $('#btnAfter').on('click', function () {
                //5.1 新元素
                var $liNew = $('<li>我是新创建的li标签</li>');
                $('#li2').after($liNew);
                //5.2 已存在元素
                $('#li2').after($('#li3'));
                //5.3 有子元素
                $('#li2').after($('#ul2'));
            });

        });
    </script>
</body>

</html>
```



## 1.4-移除元素3种方式



```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title>标题</title>

</head>

<body>
    <ul id="ul1">
        <li>我是班长1</li>
        <li id="li2">我是班长2</li>
        <li>我是班长3</li>
        <li>我是班长4</li>
        <li>我是班长5</li>
    </ul>

    <ul id="ul2">
        <li>我是坤哥1</li>
        <li>我是坤哥2</li>
        <li id="li3">我是坤哥3</li>
        <li>我是坤哥4</li>
        <li>我是坤哥5</li>
    </ul>

    <script src="jquery-1.12.4.js"></script>
    <script>

        /* 
        1.复习原生DOM移除节点两种方式：
            a.清空所有子节点  
                父元素.innerHTML = ''
            b.移除单个子节点
                父元素.removeChild(子元素)

        2.jquery移除节点三种方式
            a.清空所有子节点
                $().html('')     少用
                $().empty()    推荐使用，性能比html方式要好
            b.移除单个子节点
                $().remove()   
                    移除$() : 相当于自杀。   底层原理： this.parentNode.removeChild(this)  
        */

        $(function () {
            //移除节点.
            $('#btn').on('click', function () {
                //1.$().html('')   少用
                $('#ul1').html("");

                //2.empty();   推荐使用 性能高
                $('#ul1').empty();


                //3.删除某个节点. $().remove();  自己移除,自杀.
                $('#li3').remove();

                //4.如果要移除父元素呢？
                // $('#ul1').remove();
                //$('#li3').parent().remove(); //让我爸爸自己移除自己

            });


        });
    </script>
</body>

</html>
```



# 2.案例



## 2.1-哼哼哈哈

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day02/02-案例/01-案例：哼哼哈哈(链式编程).html)

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
    <button>哼哼</button>
    <button>哼哼</button>
    <button>哼哼</button>
    <button>哼哼</button>
    <button>哼哼</button>

    <script src="./jquery-1.12.4.js"></script>
    <script>
        //需求：点击每一个按钮  （1）修改自身样式文字为哈哈，颜色粉色  （2）其他按钮样式恢复默认

        $('button').click(function () {
            /* 链式编程:一个对象可以连续调用它的方法
                原理：jq在设置完元素的属性之后，这个函数会返回一个jq对象。既然是jq对象，那就可以继续调用方法
                这种编程语法称之为链式语法
             */

            // 调用text()方法给元素设置文本，并且返回元素自身
            // console.log($(this).text('哈哈'));
            $(this).text('哈哈').css('backgroundColor', 'pink').siblings().text('哼哼').css('backgroundColor', '');
            // $(this).text('哈哈');
            // $(this).css('backgroundColor','pink');
            // $(this).siblings().text('哼哼');
            // $(this).siblings().css('backgroundColor','');
        });
    </script>
</body>

</html>
```



## 2.2-手风琴

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day02/02-案例/02-案例：手风琴.html)

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
        * {
            padding: 0;
            margin: 0;
        }

        ul {
            list-style-type: none;
        }

        .parentWrap {
            width: 200px;
            text-align: center;
            margin: 50px auto auto;

        }

        .menuGroup {
            border: 1px solid #999;
            background-color: #e0ecff;
        }

        .groupTitle {
            display: block;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            cursor: pointer;
        }

        .menuGroup > div {
            height: 200px;
            background-color: #fff;
            display: none;
        }

    </style>
    
</head>
<body>
    <ul class="parentWrap">
        <li class="menuGroup">
            <span class="groupTitle">标题1</span>
            <div>我是弹出来的div1</div>
        </li>


        <li class="menuGroup">
            <span class="groupTitle">标题2</span>
            <div>我是弹出来的div2</div>
        </li>


        <li class="menuGroup">
            <span class="groupTitle">标题3</span>
            <div>我是弹出来的div3</div>
        </li>

        <li class="menuGroup">
            <span class="groupTitle">标题4</span>
            <div>我是弹出来的div4</div>
        </li>
    </ul>

    <script src="jquery-1.12.4.js"></script>
    <script>
        //需求： 点击每一个li元素，（1）显示自身的子代div （2）隐藏其他兄弟li元素的子代div
        /*juqery语法显示和隐藏
            显示： $().show()    底层是设置display为block
            隐藏： $().hide()    底层是设置display为none
        */

        $('.menuGroup').click(function(){
            $(this).children('div').show().parent().siblings('li').children('div').hide();
        });
    </script>
</body>
</html>

```







## 2.3-下拉菜单

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day02/02-案例/03-案例：下拉菜单.html)

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

            $('.wrap>ul>li').mouseover(function () {
                //$(this).children('ul').css('display','block');
                //上面代码和下面这行代码是等价的。 show()方法底层修改的就是display为block
                $(this).children('ul').show();
            });

            $('.wrap>ul>li').mouseout(function () {
                $(this).children('ul').hide();
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





## 2.4-onmouseover与onmouseleave(了解)

[onmouseover与onmouseleave区别](https://www.runoob.com/jsref/event-onmouseenter.html)



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
            /*本小节知识点： onmouseover和onmouseleave的区别
                onmouseover/onmouseout：支持冒泡。移入元素和子元素都会触发（浪费性能）
                onmouseenter/onmouseleave：不支持冒泡。移入子元素不会触发（节省性能）

                总结： 以后尽量使用 onmouseenter/onmouseleave
            */

            $('.wrap>ul>li').mouseenter(function () {
                //$(this).children('ul').css('display','block');
                //上面代码和下面这行代码是等价的。 show()方法底层修改的就是display为block
                $(this).children('ul').show();

                console.log('鼠标移入我了');
                
            });

            $('.wrap>ul>li').mouseleave(function () {
                $(this).children('ul').hide();

                console.log('鼠标移出我了');
            });

        });
    </script>
</body>

</html>
```



## 2.5-突出展示

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day02/02-案例/05-案例：突出展示.html)

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

        body {
            /* background: #000; */
        }

        .wrap {
            margin: 100px auto 0;
            width: 630px;
            height: 394px;
            padding: 10px 0 0 10px;
            background: #000;
            overflow: hidden;
            border: 1px solid #fff;
        }

        .wrap li {
            float: left;
            margin: 0 10px 10px 0;
        }

        .wrap img {
            display: block;
            border: 0;
        }
    </style>

</head>

<body>
    <div class="wrap">
        <ul>
            <li><a href="#"><img src="images/01.jpg" alt="" /></a></li>
            <li><a href="#"><img src="images/02.jpg" alt="" /></a></li>
            <li><a href="#"><img src="images/03.jpg" alt="" /></a></li>
            <li><a href="#"><img src="images/04.jpg" alt="" /></a></li>
            <li><a href="#"><img src="images/05.jpg" alt="" /></a></li>
            <li><a href="#"><img src="images/06.jpg" alt="" /></a></li>
        </ul>
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //需求1:给每一个小人对应的li标签设置鼠标移入事件,他自己的opacity为1,他的兄弟们的opacity为0.4.
            //需求2:鼠标离开整个高亮显示大盒子, 所有li标签的透明度都变成1.

            /*需求：
                1.鼠标移入每一个li元素：自身透明度opacity为1，兄弟元素为0.4 （排他）
                2.鼠标移出大盒子wrap：所有li元素的透明度opacity为1
            */

            //获取li标签
            // $('li'); //可行
            // $('ul>li'); //可行的
            // $('.wrap li');//可行的
            // $('.wrap>ul>li'); //可行的.
            // $('.wrap').find('li');//可行的.
            // $('a').parent('li');//可行的.

            $('.wrap>ul>li').mouseenter(function () {
                $(this).css('opacity', '1').siblings('li').css('opacity', '0.4');
            });

            $('.wrap').mouseleave(function () {
                $(this).find('li').css('opacity', '1');
            });
        });
    </script>
</body>

</html>
```

## 2.6-淘宝服饰精品

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day02/02-案例/06-案例：淘宝服饰精品展示.html)

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
            font-size: 12px;
        }

        ul {
            list-style: none;
        }

        a {
            text-decoration: none;
        }

        .wrapper {
            width: 298px;
            height: 248px;
            margin: 100px auto 0;
            border: 1px solid pink;
            overflow: hidden;
        }

        #left,
        #center,
        #right {
            float: left;
        }

        #left li,
        #right li {
            background: url(images/lili.jpg) repeat-x;
        }

        #left li a,
        #right li a {
            display: block;
            width: 48px;
            height: 27px;
            border-bottom: 1px solid pink;
            line-height: 27px;
            text-align: center;
            color: black;
        }

        #left li a:hover,
        #right li a:hover {
            background-image: url(images/abg.gif);
        }

        #center {
            border-left: 1px solid pink;
            border-right: 1px solid pink;
        }
    </style>
</head>

<body>
    <div class="wrapper">

        <ul id="left">
            <li><a href="#">女靴</a></li>
            <li><a href="#">雪地靴</a></li>
            <li><a href="#">冬裙</a></li>
            <li><a href="#">呢大衣</a></li>
            <li><a href="#">毛衣</a></li>
            <li><a href="#">棉服</a></li>
            <li><a href="#">女裤</a></li>
            <li><a href="#">羽绒服</a></li>
            <li><a href="#">牛仔裤</a></li>
        </ul>
        <ul id="center">
            <li><a href="#"><img src="images/女靴.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/雪地靴.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/冬裙.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/呢大衣.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/毛衣.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/棉服.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/女裤.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/羽绒服.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/牛仔裤.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/女包.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/男包.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/登山鞋.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/皮带.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/围巾.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/皮衣.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/男毛衣.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/男棉服.jpg" width="200" height="250" /></a></li>
            <li><a href="#"><img src="images/男靴.jpg" width="200" height="250" /></a></li>
        </ul>
        <ul id="right">
            <li><a href="#">女包</a></li>
            <li><a href="#">男包</a></li>
            <li><a href="#">登山鞋</a></li>
            <li><a href="#">皮带</a></li>
            <li><a href="#">围巾</a></li>
            <li><a href="#">皮衣</a></li>
            <li><a href="#">男毛衣</a></li>
            <li><a href="#">男棉服</a></li>
            <li><a href="#">男靴</a></li>
        </ul>
    </div>

    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            //需求1:给左边的这些li设置鼠标移入事件,让中间索引对应的li显示,其他的li隐藏.
            //需求2:给右边的这些li设置鼠标移入事件,让中间索引对应的li显示,其他的li隐藏.

            //需求1:
            $('#left>li').mouseenter(function () {
                //1.1 获取当前鼠标移入的li元素的索引.
                var idx = $(this).index();
                console.log(idx);
                //1.2 让中间索引和idx匹配的li显示,其他的影藏.
                $('#center>li').eq(idx).show().siblings('li').hide();
            });

            //需求2:
            $('#right>li').mouseenter(function () {
                //1.1 获取当前鼠标移入的li元素的索引.
                var idx = $(this).index();
                console.log(idx);
                //1.2 右边的图片下标 = idx + $('#left').children.length
                idx += $('#left').children().length;
                //1.3 让中间索引和idx匹配的li显示,其他的影藏.
                $('#center>li').eq(idx).show().siblings('li').hide();
            });

            //思考题:如果给li元素中的a标签注册鼠标移入事件？应该如何获取li元素的索引？
            // $(this).parent().index()
        });
    </script>
</body>

</html>
```



## 2.7-选择城市

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day02/02-案例/07-案例：选择城市(选择职业).html)

```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        select {
            width: 200px;
            background-color: teal;
            height: 200px;
            font-size: 20px;
        }

        .btn-box {
            width: 30px;
            display: inline-block;
            vertical-align: top;
        }
    </style>

<body>
    <h1>城市选择：</h1>
    <select id="left" name="src-city" multiple>
        <option value="1">北京</option>
        <option value="2">上海</option>
        <option value="3">深圳</option>
        <option value="4">广州</option>
        <option value="5">西红柿</option>
    </select>
    <div class="btn-box">
        <!--实体字符-->
        <button id="btn1"> &gt;&gt; </button>
        <button id="btn2"> &lt;&lt; </button>
        <button id="btn3"> &gt;</button>
        <button id="btn4"> &lt; </button>
    </div>
    <select id="right" name="tar-city" multiple>
    </select>

    <script src="jquery-1.12.4.js"></script>
    <script>

        $(function () {
            //1.全部右移
            $('#btn1').click(function () {
                //找到左边的所有option项,追加到右边去.
                $('#left>option').appendTo($('#right'));
            });

            //2.全部左移.
            $('#btn2').click(function () {
                //找到右边所有的option项,追加到左边去.
                $('#right>option').appendTo($('#left'));
            });

            //3选中右移.
            $('#btn3').click(function () {
                //选中的左边的option,追加到右边去.
                $('#left>option:selected').appendTo($('#right'));
            });

            //选中左移.
            $('#btn4').click(function () {
                //所有选中的右边的option项,追加到左边去.
                $('#right>option:selected').appendTo($('#left'));
            });

        });
    </script>
</body>

</html>
```



## 2.8-综合表格处理

[效果演示](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/05-jQuery/课程资料/备课代码/day02/02-案例/08-案例：综合表格处理.html)



```html
<!DOCTYPE html>
<html>

<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        button {
            background-color: skyblue;
            border: none;
        }

        table {
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid #c0c0c0;
            margin: 50px auto auto;
        }

        th,
        td {
            border: 1px solid #d0d0d0;
            color: #404060;
            padding: 10px;
        }

        th {
            background-color: #09c;
            font: bold 16px "微软雅黑";
            color: #fff;
        }

        td {
            font: 14px "微软雅黑";
        }

        tbody tr {
            background-color: #f0f0f0;
        }

        tbody tr:hover {
            cursor: pointer;
            background-color: #fafafa;
        }
    </style>

</head>

<body>
    <div>

        <table>
            <thead>
                <tr>
                    <th>标题</th>
                    <th>地址</th>
                    <th>说明</th>
                    <th><button id="clear">清空数据</button></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>


    <script src="jquery-1.12.4.js"></script>
    <script>
        $(function () {
            // 模拟从后台拿到的数据
            //data数组的每一个元素其实就是一个tr.
            var data = [{
                name: "传智播客",
                url: "http://www.itcast.cn",
                type: "IT最强培训机构"
            }, {
                name: "黑马程序员",
                url: "http://www.itheima.com",
                type: "大学生IT培训机构"
            }, {
                name: "传智前端学院",
                url: "http://web.itcast.cn",
                type: "前端的黄埔军校"
            }, {
                name: "传智前端36期",
                url: "http://www.baidu.com",
                type: "我上过的最好的学生"
            }];


            //1.根据数组生成页面元素

            for(var i = 0;i<data.length;i++){
                var obj = data[i];
                //1.1 创建元素
                var $tr = $('<tr>' +
                '<td>' + obj.name + '</td>' +
                '<td>' + obj.url + '</td>' +
                '<td>' + obj.type + '</td>' +
                '<td><button class="up">上移</button> <button  class="down">下移</button> <button  class="delete">删除</button></td>' +
                '</tr>');
                //1.2 添加到页面
                $('table>tbody').append($tr);
            };

            //2.清空数据
            $('#clear').click(function(){
                $('table>tbody').empty();
            });

            //3.上移
            $('.up').click(function(){
                /* 
                $(this).parent()  : 不支持筛选，只会获取自己的父元素
                $(this).parents()  : 支持筛选，获取自己所有的父辈元素
                */
                if($(this).parents('tr').index() == 0){
                    alert('已经是第一个');
                }else{
                    // A.before(B)  B插入A的前面
                    $(this).parents('tr').prev().before($(this).parents('tr'));
                }
            });

            //4.下移
            $('.down').click(function(){
                /* 
                $(this).parent()  : 不支持筛选，只会获取自己的父元素
                $(this).parents()  : 支持筛选，获取自己所有的父辈元素
                */
                if($(this).parents('tr').index() == data.length-1){
                    alert('已经是最后一个');
                }else{
                    // A.after(B)  B插入A的后面
                    $(this).parents('tr').next().after($(this).parents('tr'));
                }
            });

            //5.删除
            $('.delete').click(function(){
                $(this).parents('tr').remove();
            });
        });
    </script>
</body>

</html>
```



# 课后了解：链式编程的底层原理

* 一句话： 在对象的方法中返回对象的自身，就可以继续调用这个对象的其他方法

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
    <script>
    
        var person = {
            name:'张三',
            age:18,
            sex:'男'
        };

        person.setName = function(name){
            person.name = name;

            //返回一个对象，那么这个对象就可以继续用点语法调用方法
            //这就是链式编程的原理
            return person;
        };

        person.setAge = function(age){
            person.age = age;

            //返回一个对象，那么这个对象就可以继续用点语法调用方法
            //这就是链式编程的原理
            return person;
        };

        person.setSex = function(sex){
            person.sex = sex;

            //返回一个对象，那么这个对象就可以继续用点语法调用方法
            //这就是链式编程的原理
            return person;
        };

        person.setName('李四').setAge(20).setSex('女');

        console.log(person);
        
    </script>
</body>
</html>
```

