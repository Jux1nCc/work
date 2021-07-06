#  今日学习任务

* [ ] 01-flex伸缩布局
  * [ ] 主轴方向flex-direction
  * [ ] 主轴排列方式justify-content
  * [ ] 次轴排列方式align-items
  * [ ] 主轴换行方式aflex-wrap
  * [ ] 多行排列方式:align-content
* [ ] 02-案例：携程网



# 01-flex伸缩布局



* 课外学习传送门:<http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool>

* `以下这些属性是给父盒子设置`

  | 属性                | 语法                    | 描述                                                         |
  | ------------------- | ----------------------- | ------------------------------------------------------------ |
  | flex                | display:flex            | 让`父盒子`成为伸缩盒子(加buff，变得比以前的盒子更牛逼)       |
  | flex-direction      | flex-direction：cloumn  | (排列方式)让`子盒子`垂直方向排列（默认水平）                 |
  | ==justify-content== | justify-content：center | (对齐方式)让`子盒子`主轴方向居中对齐（主轴默认水平）         |
  | ==align-items==     | align-items：center     | (对齐方式)让`子盒子`次轴方向居中对齐（次轴默认垂直）         |
  | ==flex-wrap==       | flex-wrap：wrap         | 当子盒子总宽度>父盒子宽度，允许换行(默认不会换行，而是自动按比例分配) |
  | align-content       | align-content:center    | (对齐方式)每一行垂直方向居中对齐(只对多行有效，一行是无效的) |

* `以下这些属性是给子盒子设置`

| 属性        | 语法               | 描述                                                         |
| ----------- | ------------------ | ------------------------------------------------------------ |
| aligin-self | aligin-self:center | 单独设置某一个子盒子的次轴对齐(vip特殊化)                    |
| order       | order:1            | 单独设置子盒子的排列顺序（数字越大越靠后，默认都是0）        |
| flex        | flex:1             | 设置子盒子主轴方向尺寸 (1flex = 父元素宽度 / 子元素总flex。 类似于几个人切蛋糕，我要几份的意思。如果某个子元素设置了独立的width，则父盒子分蛋糕会先减去这个width) |



## 1.1-flex伸缩盒子布局介绍

* 1.什么是伸缩布局(弹性布局`Flexible Boxes`)

  * Flexible意为可伸缩的，Boxes意为盒子。是CSS3中一种新的盒子模型-`伸缩盒子模型`，由[CSS3规范](http://www.w3.org/TR/2014/WD-css-flexbox-1-20140325/)提出，这是在原有的大家非常熟悉的`block`, `inline-block`, `inline`的基础上延伸出的新一代布局模式
    * `display:flex`:让一个盒子变成伸缩盒子，这种布局方式叫做伸缩布局
      * 说人话：给一个盒子增加buff，让它功能变得更加强大

* 2.伸缩布局特点

  * `a.伸缩盒子最大的特点(优点)就是把空间以最合理高效的方式分配给每一个子盒子`

    * ps：人人都有房子住，不会让你暴露街头(而overflow会让这个盒子多余的部分隐藏)

  * `b.当伸缩盒子中所有的子元素总宽高大于flex伸缩盒子宽高时，子元素并不会超出`

    ​               flex盒子，flex盒子会自动按照每一个子元素的宽高比例合理分配

    

* 需求：父盒子中有三个子盒子，这三个子盒子的宽度为父元素的三分之一

  * 1.设置父盒子的`display:flex`,变成伸缩盒子
  * 2.设置三个子元素的`flex:1`，表示盒子在排列方向尺寸比例为1

  

  

  ![1555341977602](day02.assets/1555341977602.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap{
            width: 600px;
            height: 300px;
            border: 1px solid red;
            margin: 50px auto;
            /* 设置父盒子为伸缩(弹性)盒子 */
            display: flex;

            /* 1.伸缩盒子最大的特点(优点)就是把空间以最合理高效的方式分配给每一个子盒子
                    * ps：人人都有房子住，不会让你暴露街头(overflow)
               2.当伸缩盒子中所有的子元素总宽高大于flex伸缩盒子宽高时，子元素并不会超出
               flex盒子，flex盒子会自动按照每一个子元素的宽高比例合理分配。     
            */
        }

        .wrap>div{
            /* 盒子在排列方向尺寸比例为1 */
            flex: 1;
        }

        .box1{
            background-color: red;
        }

        .box2{
            background-color: yellow;
        }

        .box3{
            background-color: green;
        }

    </style>
</head>
<body>
    <div class="wrap">
        <div class="box1">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
    </div>
</body>
</html>
```



## 1.2-flex伸缩盒子组成部分介绍

![1555342387564](day02.assets/1555342387564.png)

* 第一眼接触`伸缩盒子`的时候，会觉得很多概念名词和属性特别多，难以理解和记忆
  * 这一切都在老师意料之中，所以我们换一种方式来介绍flex伸缩盒子的内容



* 1.有一个好人坤哥在深圳买了一套公寓楼(`flex伸缩盒子`)分给哪些无家可归的人来居住，带阳台的大单间。（脑部一下我们自己住的公寓楼）
  * ==伸缩盒子三要素==
    * 子盒子item：住户的房间
    * 主轴main axis：房间的排列方向
    * 次轴(交叉轴)cross axis:房间阳台的排列方向
  * ==注意点:主轴和次轴一定是垂直的==
* 2.坤哥的能力有限，只能买得起`1000*200(父盒子大小)`平米的公寓楼,但是我也不确定住户有多少，不管怎么样大家都不容易，如果住的人少那每个人分的空间多一些，剩下的作为公摊面积，如果住的人多那每个人分的空间少一些，原则是：`来了就是深圳人，来了就有房子住`
  * ==伸缩盒子最大特点:按照比例合理分配==
    * `在主轴方向上，如果子元素的总宽高超过父元素宽高时，并不会超出。而是父元素（flex伸缩盒子）会按照比例合理分配。`
      * 例如：坤哥的公寓只有1000*200，住进来了三个人，1号房间班长，2号房间副班长，3号房间班花
        * a.班长要住100 x 50平米盒子，副班长要住100 x 50平米盒子,班花要住100 x 50平米盒子
          * 坤哥的1000 x 200公寓楼够他们住，多出来的部分就作为公摊面积，所以最终结果`1班长100*50，2副班长100*50，3班花100*50`
        * b.班长要住800 x 500的房子，副班长要住800 x 300房子,班花要住400 x 100房子。
          * 坤哥发现班长和副班长房子宽度一致，都是班花的两倍，于是将我那1000分成5份，班长占2份，副班长占2份，班花占1份。而高度虽然我的房子只有200，但是我可以把阳台改长一点尽量满足住户，于是最终结果是`1班长400*500，2副班长400*300，3班花200*100`

![1555345342871](day02.assets/1555345342871.png)





![1555345819802](day02.assets/1555345819802.png)



* 3.flex伸缩盒子常用属性
  * (1)有住户投诉，房间朝向不好，住的不舒服
    * 设置主轴方向:`flex-direction`
      * ***注意：主轴和次轴一定是垂直的，例如设置主轴为水平方向，次轴就是垂直方向。设置主轴垂直方向，次轴就是水平方向***
  * (2)有住户投诉，房间挨得太近，没有隐私空间(希望调整房间排列方式)
    * 设置主轴排列方式:`justify-content`
  * (3)有住户投诉，阳台位置不合理，看不到外面风景(希望调整阳台排列方式)
    * 设置次轴排列方式：`align-items`
  * (4)有住户投诉，一排的房间太多了，住的不爽（希望能多排住）
    * 设置主轴换行方式：`flex-wrap`
  * (5)有住户请坤哥洗脚，希望能住上VIP房间(房间排列特殊化)
    * 某个子元素单独设置对齐方式:`align-self`

## 1.3-flex主轴与次轴flex-direction

![1555347575363](day02.assets/1555347575363.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap{
            width: 600px;
            height: 300px;
            border: 1px solid red;
            margin: 50px auto;
            /* 设置父盒子为伸缩(弹性)盒子 */
            display: flex;
            /*1.默认情况下，html中的块级元素排列方向为垂直方向，行内元素排列方向为水平方向
             2.在flex伸缩布局中，可以通过flex-direction属性来设置元素排列方向
                * 不想默认水平从左往右分房，想换个方向分房子就可以用这个属性
             */

             /* a.默认：主轴方向为： 水平方向，从左往右  （此时垂直方向是次轴）*/
             /* flex-direction: row; */

             /* b.主轴方向为： 水平方向，从右往左   */
             /* flex-direction: row-reverse; */
            
            /* c.主轴方向为： 垂直方向，从上往下 （此时水平方向是次轴）*/
            /* flex-direction: column; */

            /* d.主轴方向为： 垂直方向，从下往上 */
            flex-direction: column-reverse;

        }

        .wrap>div{
            /* 盒子在排列方向尺寸比例为1 */
            flex: 1;
        }

        .box1{
            background-color: red;
        }

        .box2{
            background-color: yellow;
        }

        .box3{
            background-color: green;
        }

        .box4{
            background-color: purple;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="box1">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
        <div class="box4">4</div>
    </div>
</body>
</html>
```



## ==1.4-flex主轴排列方式justify-content==

![1555347681600](day02.assets/1555347681600.png)

![1555347698680](day02.assets/1555347698680.png)





![1555347707590](day02.assets/1555347707590.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap{
            width: 600px;
            height: 300px;
            border: 1px solid red;
            margin: 50px auto;
            /* 1.设置父盒子为伸缩(弹性)盒子 */
            display: flex;
            /* 2.默认：主轴方向为： 水平方向，从左往右  （此时垂直方向是次轴）*/
             flex-direction: row;
            /*
             3.justify-contents:设置子盒子在主轴方向的对齐方式
                * 默认flex会按照比例分配把大房子全部挤满，毫无隐私。
            如果希望房子定额分配（固定面积），多出来的部分作为公共区域则可以使用这个属性
                * 如果设置了父盒子这个属性，则子元素不能设置flex属性，否则会失效
             */
            
            /* start:主轴起始方向  end：主轴结束方向 */
            
             /* a.默认：左对齐 */
             /* justify-content: flex-start; */

             /* b.右对齐 */
             /* justify-content: flex-end; */

             /* c.居中 */
             /* justify-content: center; */

             /* d.两端对齐，元素间隔相等 */
             /* justify-content:space-between; */

             /* e.每个元素左右两边间隔相等（中间元素就是两倍间隔） */
             justify-content: space-around;
        }

        .wrap>div{
            width: 100px;
            height: 50px;
        }

        .box1{
            background-color: red;
        }

        .box2{
            background-color: yellow;
        }

        .box3{
            background-color: green;
        }

        .box4{
            background-color: purple;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="box1">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
        <div class="box4">4</div>
    </div>
</body>
</html>
```



## ==1.5-flex次轴排列方式align-items==

![1555347623579](day02.assets/1555347623579.png)



![1555347640733](day02.assets/1555347640733.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap{
            width: 600px;
            height: 300px;
            border: 1px solid red;
            margin: 50px auto;
            /* 1.设置父盒子为伸缩(弹性)盒子 */
            display: flex;
            /* 2.默认：主轴方向为： 水平方向，从左往右  （此时垂直方向是次轴）*/
             flex-direction: row;
            /*3.justify-contents:设置子盒子在主轴方向的对齐方式*/
             /* 两端对齐，元素间隔相等 */
             justify-content: space-between;
             /*4.align-items:设置子盒子在次轴方向的对齐方式 
             
              */
              /* a.默认值：作用是如果子盒子没有设置高度则拉伸至父盒子高度 */
              /* align-items: stretch; */

              /* b.从次轴起始方向对齐，默认顶部 */
              align-items: flex-start;

              /* c.从次轴结束方向对齐，默认底部 */
              align-items: flex-end;

              /* d.中心对齐 */
              align-items: center;

              /* e.第一行文字基线对齐（了解即可） */
              align-items: baseline;
        }

        .wrap>div{
            width: 100px;
            height: 50px;
        }

        .box1{
            background-color: red;
        }

        .box2{
            background-color: yellow;
        }

        .box3{
            background-color: green;
        }

        .box4{
            background-color: purple;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="box1">1</div>
        <div class="box2">2</div>
        <div class="box3">3</div>
        <div class="box4">4</div>
    </div>
</body>
</html>
```



## ==1.6-flex主轴换行方式flex-wrap==

![1555347866317](day02.assets/1555347866317.png)



![1555347879612](day02.assets/1555347879612.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap{
            width: 600px;
            height: 300px;
            border: 1px solid red;
            margin: 50px auto;
            /* 1.设置父盒子为伸缩(弹性)盒子 */
            display: flex;
            /* 2.默认：主轴方向为： 水平方向，从左往右  （此时垂直方向是次轴）*/
             flex-direction: row;
            /*3.justify-contents:设置子盒子在主轴方向的对齐方式*/
             justify-content: flex-start;
             /*4.align-items:设置子盒子在次轴方向的对齐方式 */
              align-items: stretch;

              /* 5.flex-wrap:设置子盒子在主轴方向的对齐方式
                    * 设置flex-wrap换行后，每个子元素上下会有默认间距
                        * 解决方案：设置父盒子高度 = 子盒子高度 * 行数
              */
              /* a.默认值：子盒子强制一行显示 */
              flex-wrap: nowrap;
              /* b.wrap:换行，第一行在上方 */
              flex-wrap: wrap;
              /* c.wrap-reverse:换行，第一行在下方 */
              flex-wrap: wrap-reverse;
        }

        .wrap>div{
            width: 100px;
            height: 150px;
        }

        .box{
            background-color: green;
            border: 2px solid red;
            box-sizing: border-box;
        }

    </style>
</head>
<body>
    <div class="wrap">
        <div class="box">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
        <div class="box">4</div>
        <div class="box">5</div>
        <div class="box">6</div>
        <div class="box">7</div>
        <div class="box">8</div>
        <div class="box">9</div>
        <div class="box">10</div>
    </div>
</body>
</html>
```



## 1.7-flex多行排列方式align-content

* `该属性只对多行子元素起作用，如果只有一行则设置无效`

![1555347965500](day02.assets/1555347965500.png)



![1555347983980](day02.assets/1555347983980.png)



![1555347992310](day02.assets/1555347992310.png)

## 1.8-flex其他属性介绍(aligen-self、order)

* `align-self与order属性都不是给flex盒子设置的，而是给它的子盒子`
  * align-self:设置单个子元素在次轴方向的对齐方式，作用是覆盖父元素的align-items
  * order:设置子元素的排序方式，默认值都是0，从小到大排序

![1555348016680](day02.assets/1555348016680.png)



![1555348037254](day02.assets/1555348037254.png)



![1555349080563](day02.assets/1555349080563.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .wrap{
            width: 600px;
            height: 300px;
            border: 1px solid red;
            margin: 50px auto;
            /* 1.设置父盒子为伸缩(弹性)盒子 */
            display: flex;
            /* 2.默认：主轴方向为： 水平方向，从左往右  （此时垂直方向是次轴）*/
             flex-direction: row;
            /*3.justify-contents:设置子盒子在主轴方向的对齐方式*/
             justify-content: flex-start;
             /*4.align-items:设置子盒子在次轴方向的对齐方式 */
              align-items: stretch;
              /* 5.flex-wrap:设置子盒子在主轴方向的对齐方式*/
              flex-wrap: wrap;
              /* 6.align-content:设置多行子盒子在次轴方向的对齐方式 */
              align-content: stretch;
              /* 7.align-self:设置单个子元素对齐方式
                    * 改属性不是给flex盒子设置的，而是给子元素设置
                        * 作用：覆盖父元素的对齐方式align-items
              */

              /* 8.order:用于子元素的排序
                规则：默认都是0，从小到大排序
                这个属性也是给子元素设置的
              */
        }

        .wrap>div{
            width: 100px;
            height: 50px;
        }

        .box{
            background-color: green;
            border: 2px solid red;
            box-sizing: border-box;
        }

    </style>
</head>
<body>
    <div class="wrap">
        <div class="box" style="order:2">1</div>
        <div class="box">2</div>
        <div class="box">3</div>
        <div class="box">4</div>
        <div class="box">5</div>
        <div class="box" style="order:1">6</div>
        <div class="box">7</div>
        <div class="box">8</div>
        <div class="box">9</div>
        <div class="box" style="align-self:flex-end">10</div>
    </div>
</body>
</html>
```



## 1.9-子盒子flex属性介绍

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .wrap{
            width: 1000px;
            height: 300px;
            border: 1px solid red;
            margin: 100px auto;

            /* 1.伸缩布局： 本质就是给盒子加buff，专治不服：百分比+浮动实现比较麻烦的需求
                如何使用： 设置盒子display 为flex

                2.伸缩布局三要素
                    子元素：住户
                    主轴：住户排列方式（默认水平）
                    次轴：阳台方向
            */
            display: flex;

        }

       
           
        

        .box1{
            /* 1flex = 父元素宽度 / 子元素总flex
            注意：设置了flex，设置宽度没用
            */
            background-color: red;
            flex: 2;/* 子元素宽度比例：切蛋糕 */
        }

        .box2{
            background-color: green;
            flex: 1;
            width: 100px;/* 无效 */
        }

        .box3{
            background-color: hotpink;
            width: 100px;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>

    </div>
</body>
</html>
```



# 02-伸缩布局案例：携程首页

![1560570343292](day02.assets/1560570343292.png)

### 1.1-background-size属性详解

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        a{
            width: 180px;
            height: 180px;
            display: block;
            border:  1px solid black;

            background: url(hotal.png) no-repeat center bottom ;
            
            /* contain:图片都不会拉伸，会等比例缩放(图片一定会全部显示，但是盒子会有空白) 
            盒子尺寸 《 图片尺寸： 图片等比缩小
            盒子尺寸 > 图片尺寸： 图片等比放大

            常用
            */
            background-size: contain;

            /* corver:图片都不会拉伸，会等比例缩放(图片一定会铺满盒子，但是图片部分区域不可见)    */ 
            /* background-size: cover; */
        }
    </style>
</head>
<body>
    <a href=""></a>
</body>
</html>
```

## 1.2-携程首页

![1557306505855](day02.assets/1557306505855.png)



![1557306518004](day02.assets/1557306518004.png)

### 完整html代码



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/index.css">
</head>

<body>
    <div class="container">
        <!-- 1-搜索栏 -->
        <div class="top-bar">
            <div>
                <i class="icon-search"></i>
                <input type="text" placeholder="搜索：目的地">
            </div>
            <a href="">
                <i class="icon-user"></i>
                <span>我的</span>
            </a>
        </div>
        <!-- 2.banner栏 -->
        <div class="banner">
            <a href=""><img src="images/banner.png" alt=""></a>
        </div>
        <!-- 3.导航栏 -->
        <div class="nav-bar">
            <a href="">
                <span class="icon"></span>
                <span>一日游</span>
            </a>
            <a href="">
                <span class="icon"></span>
                <span>一日游</span>
            </a>
            <a href="">
                <span class="icon"></span>
                <span>一日游</span>
            </a>
            <a href="">
                <span class="icon"></span>
                <span>一日游</span>
            </a>
            <a href="">
                <span class="icon"></span>
                <span>一日游</span>
            </a>
        </div>
        <!-- 4.网格栏 -->
        <div class="grid">
            <div class="item">
                <div class="left">
                    <a href="">酒店</a>
                </div>
                <div class="right">
                    <a href="">酒店</a>
                    <a href="">酒店</a>
                </div>
                <div class="right">
                    <a href="">酒店</a>
                    <a href="">酒店</a>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <a href="">酒店</a>
                </div>
                <div class="right">
                    <a href="">酒店</a>
                    <a href="">酒店</a>
                </div>
                <div class="right">
                    <a href="">酒店</a>
                    <a href="">酒店</a>
                </div>
            </div>
            <div class="item">
                <div class="left">
                    <a href="">酒店</a>
                </div>
                <div class="right">
                    <a href="">酒店</a>
                    <a href="">酒店</a>
                </div>
                <div class="right">
                    <a href="">酒店</a>
                    <a href="">酒店</a>
                </div>
            </div>
        </div>
        <!-- 5.热门活动 -->
        <div class="adv-list">
            <a href=""><img src="images/1.jpg" alt=""></a>
            <a href=""><img src="images/2.jpg" alt=""></a>
            <a href=""><img src="images/3.jpg" alt=""></a>
            <a href=""><img src="images/4.jpg" alt=""></a>
        </div>
    </div>
</body>

</html>
```



### 完整css代码



```css


.container{
    width: 100%;
}

/* 1.顶部搜索栏 */
.top-bar{
    position: fixed;
    top: 0px;
    width: 100%;
    height: 44px;
    display: flex;
    background-color: #eee;
    padding: 5px;
}

.top-bar div{
    flex: 1;
    background-color: #fff;
    border-radius: 22px;
    padding-left: 10px;
}

.top-bar input{
    width: 90%;
    height: 100%;
}

.top-bar a{
    width: 50px;
    display: block;
    text-align: center;
}

.top-bar a>i{
    background-color: #2eaae0;
    border-radius: 12px;

    font-size: 24px;
    color: #fff;
}

.top-bar span{
    display: block;
    color: #2eaae0;
}

/* 2-banner栏 */
.banner{
    width: 100%;
}

.banner img{
    width: 100%;
}

/* 3.导航栏 */
.nav-bar{
    width: 100%;
    display: flex;
}

.nav-bar a{
    display: block;
    flex: 1;
    text-align: center;
}

.nav-bar a .icon{
    width: 32px;
    height: 32px;
    display: block;
    margin: 10px auto 5px;
    background: url(../images/nav_local.png) no-repeat;
    background-size: 32px 160px;
}

.nav-bar a:nth-child(2) .icon{
    background-position-y: -32px;
}

.nav-bar a:nth-child(3) .icon{
    background-position-y: -64px;
}

.nav-bar a:nth-child(4) .icon{
    background-position-y: -96px;
}

.nav-bar a:nth-child(5) .icon{
    background-position-y: -128px;
}

/* 4-网格栏 */
.grid{
    width: 100%;
    padding: 10px;
    
}

.grid .item{
    width: 100%;
    height: 88px;
    background: linear-gradient(to right,#fa5956,#fa9b4d);  
    display: flex;
}

.grid .item div{
    /* 宽度方向等分 */
    flex: 1;
    height: 100%;
    
}

.grid .item div a{
    height: 50%;
    display: block;
    text-align: center;
    color: #fff;
    line-height: 44px;
}

.grid .item .left{
    background: url(../images/hotel.png) no-repeat center bottom;
    background-size: contain;
    
}

.grid .item div:nth-child(1) a{
    height: 100%;
    display: block;
}

.grid .item div:nth-child(n+2) a{
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
}

/* 下面两个item */
.grid .item:nth-child(2){
    background: linear-gradient(to right,#4b8fe6,#53bced);
    margin-top: 5px;
}

.grid .item:nth-child(2) .left{
    background: url(../images/flight.png) no-repeat center bottom;
    background-size: contain;
}

.grid .item:nth-child(3){
    margin-top: 5px;
    background: linear-gradient(to right,#34c2aa,#6cd557);
}

.grid .item:nth-child(3) .left{
    background: url(../images/travel.png) no-repeat center bottom;
    background-size: contain;
}

/* 5.热门活动 */

.adv-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.adv-list a{
    display: block;
    width: 50%;
}

.adv-list a img{
    width: 100%;
}

```


