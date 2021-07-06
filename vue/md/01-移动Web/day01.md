# 今日学习任务

* [ ] 01-移动Web入门

  * [ ] a.知道如何使用谷歌浏览器打开移动Web网页
  * [ ] b.知道`meta`标签的作用是设置移动端`视口`
  * [ ] c.知道移动端图片通常使用二倍图
  * [ ] d.了解物理像素与css逻辑像素的区别

* [ ] 02-流式布局
  * [ ] a.流式布局：宽度使用百分比，高度使用px
  * [ ] b.border-box属性介绍

* [ ] 03-案例：京东首页

  

# 01-移动Web概念介绍(课后了解)



## 1.1-移动Web的概念介绍



* 1.什么是移动Web
  * 运行在移动设备的网页(web)，称之为移动端网页(移动web)。所谓的移动设备泛指：手机，平板。
* 2.如何调试移动web网页
  * a.真机调试：现阶段由于没有学习服务器相关知识，所以暂时不接触真机调试
  * b.chrome浏览器调试：和PC端网页一样，首先按F12打开开发者工具，然后点击做下表手机图标即可(见下图)
    * 移动端网址特点：以m开头
      * 例如：PC端的京东首页是<www.jd.com>,那么移动端京东首页就是<www.m.jd.com>
      * `小技巧：在PC端进入任何网页之后，切换到移动web页面刷新网页，就会自动打开移动端网页`

![1555244694703](day01.assets/1555244694703.png)

![1555245119681](day01.assets/1555245119681.png)

* 3.移动Web的发展历史
  * 从2014年HTML5正式定稿后移动web就迎来了飞速的发展 因为使用HTML5技术可以更方便 更快捷的开发现代web应用程序 
  * 而移动端的手机浏览器都是比较新的 HTML5在移动端的浏览器支持情况都比较好 

  * 所以HTML5主要应用就是在移动端 移动web

  * 直到2015 - 2016 - 2017 - 至今  移动web已经发展了很多年 各方面的技术都比较成熟稳定 网上的教程也比较完整成熟 所以现在的web已经到全民移动web的时代了



## 1.2-移动端布局特点介绍



* 1.移动端网页与PC端网页区别
  * (1)`多机型适配`
    * pc端布局无需考虑机型适配，但是移动设备(手机,平板)机型尺寸种类特别多，需要考虑不同的机型尺寸适配
  * (2)`页面结构简单`
    * 相比而言，由于移动设备的屏幕远小于PC端的屏幕，所以移动Web的页面结构比PC端简单
      * 手机性能有限，所以网页一般不会做的太复杂
        * 常见的移动Web页面结构(从上往下)：广告栏banner、搜索栏、轮播图、导航栏、商品列表、底部tabbar
* ==2.移动Web布局核心思想==
  * `1.不允许网页出现横向滚动`
    * 移动端一般只适配宽度盛满整个屏幕，高度从上往下滚动
      * pc端布局一般都是使用**固定宽度，水平居中且两边留白**的方式来布局，所以pc端不用考虑显示屏的宽度，而移动端布局是**采用全屏的方式布局**，既然是全屏，就要考虑屏幕的适配，因为不同的手机的屏幕宽度是不一样的
  * 2.页面盛满屏幕，盒子宽度与屏幕一致 100%
  * 3.让盒子的内容宽高width/height包含padding与border，避免出现横向滚动条
* 3.移动Web布局方式介绍
  * `(1)流式布局(百分比布局)`
    * px不写死，使用%百分比实现比例布局
  * `(2)flex伸缩布局(弹性布局)`
  * `(3)rem布局`
    * 以html元素字体大小作为单位. 1rem = html字体大小
  * `(4)响应式布局`
  * ==注意：以上的布局方式不是每种页面只能使用一种，而是根据实际需求灵活搭配，只要能实现产品经理的需求，使用任何方式都可以(不管黑猫白猫，抓到老鼠就是好猫)==
    * `每种布局方式没有优劣之分，只是各自特点不同，所适用的场景不同而已`
    * 例如：能使用百分比就使用百分比，如果百分比不能用，就使用rem，如果rem不能用，就使用固定宽高，总之怎么舒服怎么来。

![1555254144385](day01.assets/1555254144385.png)

## 1.3-课后了解：移动端私有前缀



* 1.什么是私有前缀

  * 浏览器厂商通常都是在属性名称前添加厂商的私有前缀，来测试这些尚未成为标准的特性。                      因此，可以借助私有前缀，来解决浏览器对CSS3的兼容性问题。
  * 在移动端，仅有四个独立的浏览器内核，分别为微软的Trident、火狐的Gecko、开源内核Webkit、Opera的Presto。
    目前微软的Trident在移动终端上主要为WP7、8系统内置浏览器。Opera的Presto内核主要为 Opera Mobile、OperaMini、欧朋浏览器以及欧朋HD Beta版。Webkit内核的适用范围则较为广泛，Android原生浏览器、苹果的Safari、谷歌Chrome(Android4.0使用) 都是基于Webkit开源内核开发的。
  * UC、Android内置、Chrome、Safari、QQ Browser都是webkit内核，从图上看占了绝大部分的市场份额。
    所以一定要伺候好-webkit-。 有的公司干脆只兼容-webkit-，别的兼容比如-ms-都不写

  | 内核    | 前缀       | 主要浏览器                     |
  | ------- | ---------- | ------------------------------ |
  | Trident | -ms-       | Internet Explorer              |
  | Gecko   | -moz-      | Firefox                        |
  | Webkit  | `-webkit-` | Chrome、Opera、Safari、Android |
  | Presto  | -o-        | 早期Opera                      |

  ```css
  .box{
      -webkit-transition:all 1s; 
      -moz-transition:all 1s; 
      -ms-transition:all 1s; 
      -o-transition:all 1s; 
      transition:all 1s; 
  }
  ```

  

![1555917421876](day01.assets/1555917421876.png)

# 02-移动Web入门



## 1.1-视口属性介绍

* 视口：手机网页的大小

* `<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">`
  * name：要设置的属性，viewport表示视口
  * content：要设置的内容
  * width=device-width：设置视口宽度与设备宽度一致
  * initial-scale=1.0：设置视口初始化缩放为1（不缩放）
  * user-scalable=no：设置视口不允许用户缩放（绝大多数手机网页都是不能缩放的）
  * 其他属性介绍
    * maximum-scale=5.0：设置视口最大缩放比例为5，如果禁止缩放该属性设置无效
    *  m-scale=0.5：设置视口最小缩放比例为0.5
  * 小技巧: 在vscode中设置视口快捷键`meta:vp + tab键`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- 兼容IE浏览器 -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--
        1.pc端网页大小 ： 可以随意改变
        2.移动端网页大小： 不能改变，取决于手机屏幕大小

        3.视口：移动端网页布局大小
            name:viewport 视口
            content：视口内容属性
                width=device-width：让移动端网页宽度和当前手机屏幕一致
                initial-scale=1.0 ： 设置视口默认不缩放
                user-scalable=no : 设置不允许缩放
     -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">

    <!-- 小技巧：在vscode中输入：  meat:vp   然后tab键可以快速设置移动端视口 -->
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <title>Document</title>
    <style>
        body{
            margin: 0px;
            padding: 0px;
        }

        .box{
            width: 320px;
            height: 375px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div class="box">班长</div>
</body>
</html>
```



### 视口单位vh与vw介绍(课外了解)

* vh与vm与我们第四天将要学习的rem作用非常类似，最大的区别是vh与vm的浏览器兼容性不如rem，所以实际开发中还是rem使用较多

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }

        html{
            height: 100%;
        }

        body{
            height: 300px;
        }

        div{
            background-color: red;


            /* 1.百分比：参照父元素 */
            /* width: 100%;
            height: 100%; */

            /* 2.视口单位  
            vw : 视口宽度百分之一    1vm = %1视口宽度
            vh : 视口高度百分之一    1vh = 1%视口高度 
            vmin: 视口最小值的百分之一 
            vmax：视口最大值百分之一
                竖屏： 1vmin = 1vw  1vmax = 1vh 
                横屏:  1vim = 1vh   1vmax = 1vw
             */
            
            /* 盒子宽高与屏幕宽高一致
            width: 100vw;
            height: 100vh; 
            */

            /* 盒子宽高相等 = 屏幕宽度
            width: 100vw;
            height: 100vw; 
            */

            width: 50vmin;
            height: 50vmax; 
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```



## 1.2-屏幕像素介绍(了解)

* 1.手机屏幕尺寸及ppi
  * 手机屏幕的尺寸一般是采取手机对角线的长度(单位是英寸，1英寸=2.54厘米)作为手机屏幕的尺寸，手机还有一个ppi的参数指的是手机每英寸包含的像素点，这个像素指的是物理像素，ppi越大，手机的像素密度越高。

![1555263661160](day01.assets/1555263661160.png)

* 2.物理像素(设备像素**Device Pixel**、分辨率)
  * 指的是手机屏幕设备的像素点，可以理解成手机屏幕上的一个发光点，无数的发光点组成了手机屏幕
* 3.逻辑像素(设备独立像素**Device Independent Pixel**、css像素)
  * `代表可以通过程序控制使用的虚拟像素`
  * css像素:逻辑像素也可以叫做css像素，它指的是组成图像的最小单位，我们知道，图像是由不同颜色像素点组成的。而图像要在屏幕上显示出来，需要通过屏幕的物理像素点显示，在一般的屏幕，一个物理像素点刚好显示一个图像上的css像素，但是，如果是ppi很高的屏幕，那就是多个物理像素显示一个css像素。

![1555264086123](day01.assets/1555264086123.png)



* 4.手机分辨率、开发尺寸、倍率(设备像素比)
  * 手机分辨率：指的就是手机在水平和垂直方向的物理像素点个数
    * 例如iphone5的分辨率为`640*1136`，表示屏幕水平方向有640个发光点，垂直方向有1136个发光点
      * `这是设备出厂就已经确定的，无法更改，也不能用代码来控制`
  * 开发尺寸:指的是手机在水平和垂直方向的显示逻辑像素的个数
    * 例如iphone逻辑像素为`320*568`,表示如果我使用代码设置一个元素的宽度为`320px`，则元素宽度与屏幕宽度位置（前提是网页视口与设备宽高一致，否则渲染视口的时候会自动缩放）
  * 倍率DPR(devicePixelRatio)： 手机分辨率（物理像素）/开发尺寸(逻辑像素)
    * 课后了解，js代码获取当前设备倍率:`window.devicePixelRatio`
    * 普通屏幕: DPR为1，表示代码1px对应屏幕上面1个发光点
    * 高清屏幕:DPR为2，表示代码1px对应屏幕上面4个发光点
      * 如果一个设备的ppi超过300，那么此时人的肉眼无法观察到物理像素发光点，所以这种屏幕又称之为retina屏幕 (视网膜高清屏) 

![1555265050473](day01.assets/1555265050473.png)



![1555267057427](day01.assets/1555267057427.png)



## 1.3-高清屏图像适配(2倍图)

* 需求：在页面展示一张200px*140px的图片

  * 当DRP为1的普通屏幕：由于一个逻辑像素(css像素，图像最小单位)对应一个设备像素(屏幕发光点)，此时可以正常显示

  * 当DPR为2的高清屏：由于一个css像素对应4个设备像素，所以图片像素首先会被拉伸放大(`造成图像失真`)，然后加载到手机屏幕，就会导致图像变得模糊。

    * ==图片从小到大会模糊失真，但是由大到小不会==
    * 课后了解，js代码获取当前设备倍率:`window.devicePixelRatio`

    

* 解决方案:如果设备DPR为2，则将图片做成清晰的2倍图`400px*280px`,然后设置`img`标签宽高为200px*140px,这样就不会失真

  * DPR为3：同理，正规公司UI会切3倍图，但是由于人的肉眼无法观察，所以很多小公司仍然使用2倍图来适配DPR为2的高清屏。

![1555267777086](day01.assets/1555267777086.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- 
        1.分辨率（物理像素）：手机屏幕的发光点，代码无法控制
        2.css像素(逻辑像素)： 1px = 1css像素
        3.dpi: 屏幕发光点（分辨率）/ 屏幕尺寸(css像素)   像素比

        devicePixelRatio：1  1px屏幕会有1个发光点
        devicePixelRatio：2  1px屏幕会有2个发光点
        devicePixelRatio：3  1px屏幕会有3个发光点

        4.图片的 1像素 = 屏幕1发光点(物理像素)
            * pc端：   由于dpi固定为1.   所以  图片是多大，css尺寸就写多大
            * 移动端： 大多数手机dpi为2. 所以  图片是多大，css尺寸就应该除以2
        
        思考题： 假设UI妹子想要显示一个图标 是200px * 200px,她应该切一张多大的图片？
            * 400 * 400

     -->

     <style>
         img{
             /* img标签设置宽度，高度会自动等比例缩放 */
             width: 200px;
         }
     </style>
</head>
<body>
    <img src="images/pic.png" alt="">
    <img src="images/pic_2x.png" alt="">
    <!-- 图片大小 400 280， 对应css像素 应该是 200px * 140px -->
</body>

</html>

<script>
    console.log(window.devicePixelRatio);
    
</script>
```



## 1.4-移动端布局注意点

1.水平方向不能出现滚动条

​            a. 禁止用户缩放

​            b. 元素宽度不能超过视口宽度

2.只适配宽度（使用百分比单位），高度使用固定px

​            \* 百分比布局（流式布局）：水平方向使用百分比单位，高度使用固定px

3.盒子宽度不能受到padding和margin影响（避免出现滚动条）

​            \* 解决方案：设置内减盒子 box-sizing: border-box;



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- 视口：移动端适配 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <!--移动端布局核心
        1.水平方向不能出现滚动条
            a. 禁止用户缩放
            b. 元素宽度不能超过视口宽度
        2.只适配宽度（使用百分比单位），高度使用固定px
            * 百分比布局（流式布局）：水平方向使用百分比单位，高度使用固定px
        3.盒子宽度不能受到padding和margin影响（避免出现滚动条）
            * 解决方案：设置内减盒子 box-sizing: border-box;

     -->

     <style>
         body{
             padding: 0;
             margin: 0;
         }

         .box{
             width: 100%;
             height: 50px;
             background-color: red;

             border: 10px solid green;
             padding: 50px;

             /* box-sizing ：盒子真实尺寸 = content + padding + border 
             1.pc端默认值： content-box   width = content 
                * 外扩盒子 ： 盒子宽度受padding和border的影响。
             2.移动端一般设置：border-box   width = content + padding + border 
                * 内减盒子    盒子宽度不受padding和border的影响。content会自动内减
              */

             box-sizing: border-box;/*  */
         }
     </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
```

![1555307962030](day01.assets/1555307962030.png)



![1555308158452](day01.assets/1555308158452.png)



![1555308324679](day01.assets/1555308324679.png)



* 3.流式布局经典案例： 两端固定，中间伸缩
  * 思路介绍
    * a.父盒子father，宽度为100%，铺满屏幕，且box-sizing为box-border
    * b.设置父盒子的左右padding为60px
    * c.中间center子盒子宽度为100%
      * `子元素的宽度百分比是相对于父元素的内容(width-padding)`
        * 如果不设置center的盒子宽度，思考一下它的默认宽度是多少？
          * 块元素的宽度默认等于父级的宽度减去padding
    * d.左右两边盒子通过绝对定位来实现
      * `子元素绝对定位相对于父元素的内边框左上角`



![1555310813285](day01.assets/1555310813285.png)



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            padding: 0;
            margin: 0;
        }

        .father {
            width: 100%;
            height: 50px;
            background-color: pink;
            /* border: 10px solid red; */
            padding: 0px 60px;
            box-sizing: border-box;
        }

        
        .left {
            position: absolute;
            left: 0;
            top: 0;
            width: 60px;
            height: 50px;
            background-color: red;
        }

        .center {
            /* 块元素的宽度默认等于父级的宽度减去padding */
            width: 100%;
            height: 50px;
            background-color: yellow;  
        }

        .right {
            position: absolute;
            right: 0;
            top: 0;
            width: 60px;
            height: 50px;
            background-color: green;  
        }

    </style>
</head>

<body>
    <div class="father">
         <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div>
</body>

</html>
```



# 03-案例：京东首页（流式布局）

![1555752891267](day01.assets/1555752891267.png)



## 1.1-移动端初始化css

* 移动端初始化css与pc端基本一致，不同点如下
  * a.移动端需要设置所有的元素为内减模型(避免padding和border导致出现滚动条)
  * b.移动端字体大小一般为12px
    * pc端默认是16px
  * c.移动端默认a标签点击背景有蓝色高亮，需要取消

```css
* {
    margin: 0px;
    padding: 0px;
    /* 1.内减盒子 */
    box-sizing: border-box;
}

body {
    /* 2.移动端默认字体一般是12px */
    font-size: 12px;
}

li {
    list-style: none;
}

img{
    vertical-align: middle;/* 图片居中 */
}

a {
    color: #000;
    /* 取消a标签默认下划线 */
    text-decoration: none;
    /* 3.移动端点击a链接出现蓝色背景问题解决 */
    -webkit-tap-highlight-color: transparent;
}

input {
    border: 0 none;
    outline-style: none; /*取消内边框*/
}

/* 清除浮动，解决margin-top塌陷 */
.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.celarfix {
    zoom: 1;
}
```



## 1.2-布局思路分析

* 思路分析（盒子模型，最外部版心盒子container）
  * 1.搜索栏:search_bar
    * `流式布局核心`：宽度使用百分比，高度尽量使用内容自动撑开
    * 左右两个a标签可以使用padding+绝对定位来实现
    * 精灵图也需要注意二倍图适配，设置background-size为图片的一半
  * 2.banner栏
    * `图片一般只设置宽度，高度自动根据视口大小缩放`
  * 3.导航栏:nav_bar
    * `设置li元素浮动之后，别忘记清除ul的浮动。否则ul没有高度`
    * `文字居中可以使用text-align:center`
    * `图片居中，可以利用快级元素的margin属性`
      * 先设置图片display为block
      * 然后设置margin：0 auto;
  * 4.京东快报:jd_news
    * `背景精灵图可以通过设置偏移来模拟padding效果`
  * 5.活动广告:adv_show
    * 三个li元素宽度分别为 50% 25% 25%
    * img宽度100%，display为block
    * 间隔线可以设置*border-left*: 1px solid #e0e0e0
  * 6.商品列表：good_list
  * 7.底部栏：bottom_bar
    * 注意清除ul的浮动
    * 思考：固定定位脱标之后遮挡了标准流的元素内容如何解决？



## 1.3-布局技巧总结



* 1.宽度适配技巧

  * div宽度使用百分比，高度使用px或者由内容撑开
  * 图片设置宽度为百分比,高度自动等比例缩放

* 2.子元素浮动之后千万不要忘记清除父元素浮动

* 3.居中技巧

  * 快级元素:`margin:0 auto`
  * 行内元素水下居中:`display:block` `margin:0 auto`
  * 文字水平居中:`text-align:center`

  

## 1.4-开发流程

### 1-搜索栏



![1555754888513](day01.assets/1555754888513.png)

```html
<!-- 1-搜索栏 -->
        <div class="top-bar">
            <a href="" class="menu"></a>
            <input type="text" placeholder="商品名称">
            <a href="" class="login">登录</a>
        </div>
```

```css
/* 1-搜索栏 */
.top-bar{
    position: fixed;
    top:0;
    width: 100%;
    height: 44px;
    background-color: #E72E27;
    padding: 0px 50px;
}

.top-bar .menu{
    position: absolute;
    left: 14px;
    top:14px;
    width: 20px;
    height: 18px;
    background: url(../images/jd_icons.png) no-repeat;
    background-size: 250px 200px;
}

.top-bar input{
    width: 100%;
    height: 30px;
    margin-top: 7px;
    padding-left: 10px;
    border-radius: 15px;
}

.top-bar .login{
    position: absolute;
    top: 14px;
    right: 14px;
    color: #fff;
}
```

### 2-banner栏

![1555754963169](day01.assets/1555754963169.png)

```html
 <!-- 2.banner栏 -->
        <div class="banner">
            <img src="images/slide.png" alt="">
        </div>
```

```css
/* 2-banner栏 */
.banner{
    width: 100%;
    /* 注意点：固定定位fixed会脱标
       解决方案：设置元素margin撑开脱标的高度
    */
    margin-top: 44px;
}

.banner img{
    width: 100%;
}
```



### 3-导航栏

![1555755053299](day01.assets/1555755053299.png)

```html
<!-- 3.导航栏 -->
        <div class="nav_bar">
            <ul class="clearfix">
                <li><a><img src="images/nav01.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav02.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav03.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav04.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav05.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav06.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav07.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav08.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav09.png" alt=""><span>京东超市</span></a></li>
                <li><a><img src="images/nav10.png" alt=""><span>京东超市</span></a></li>
            </ul>
        </div>
```

```css
/* 3.导航栏 */

.nav-bar{
    width: 100%;
    height: 175px;
}


.nav-bar ul{
    width: 100%;
}

.nav-bar ul>li{
    float: left;
    width: 20%;
    text-align: center;
}

.nav-bar ul>li img{
    display: block;
    width: 40px;
    height: 40px;
    margin: 10px auto 5px;
}
```

### 3-京东快报

```html
<!-- 4.京东快报 -->
        <div class="jd-news">
            <span><span>热门&nbsp;&nbsp;</span>价格太贵买不起</span>
            <a href="">更多</a>
        </div>
```



```css
/* 4.京东快报 */
.jd-news{
    width: 100%;
    height: 16px;
    background: url(../images/jd_icons.png) no-repeat 8px -22px;
    background-size: 250px 200px;
    text-align: center;
}

.jd-news>span>span{
    color: red;
}

.jd-news a{
    float: right;
    padding: 0px 5px;
    border-left: 1px solid #E0E0E0;
}
```



### 5-活动广告

```html
<!-- 5.活动列表 -->
        <div class="adv-list clearfix">
            <a href=""><img src="images/adv01.jpg" alt=""></a>
            <a href=""><img src="images/adv02.jpg" alt=""></a>
            <a href=""><img src="images/adv03.jpg" alt=""></a>
        </div>
```

```css
/* 5.活动列表 */
.adv-list{
    width: 100%;
    margin: 10px 0px;
}

.adv-list a{
    display: block;
    float: left;
    width: 50%;
    padding: 0px 5px;
}

.adv-list a:nth-child(n+2){
    width: 25%;
    border-left: 1px solid #e0e0e0;
    
}

.adv-list a img{
    width: 100%;
}
```



### 6-商品列表

```html
<!-- 6.商品列表 -->
        <div class="good-list">
            <div class="good-title"><img src="images/goods_title.jpg" alt=""></div>
            <div class="good-list01 clearfix">
                <a href="" class="clearfix">
                    <span>二手寻宝</span>
                    <span>跳蚤市场逛一逛</span>
                    <img src="images/goods.jpg" alt="">
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="" class="clearfix">
                    <span>二手寻宝</span>
                    <span>跳蚤市场逛一逛</span>
                    <img src="images/goods.jpg" alt="">
                    <img src="images/goods.jpg" alt="">
                </a>
            </div>
            <div class="good-list02 clearfix">
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
            </div>
        </div>
```



```css
/* 6.商品列表 */

.good-list{
    width: 100%;
    /* 解决底部栏固定定位脱标问题 */
    margin-bottom: 44px;
}

/* 商品头部 */
.good-list .good-title{
    width: 100%;
    height: 35px;
    background-color: #F5F5F5;
}

.good-list .good-title img{
    display: block;
    height: 100%;
    margin: 0 auto;
}

/* 商品列表01 */
.good-list .good-list01{
    width: 100%;
}

.good-list .good-list01 a{
    display: block;
    float: left;
    width: 50%;
    text-align: center;
}

.good-list .good-list01 a:nth-child(2){
    border-left: 1px solid #e0e0e0;
}

.good-list .good-list01 a span{
    display: block;
}

.good-list .good-list01 a span:nth-child(1){
    font-size: 16px;
}

.good-list .good-list01 a span:nth-child(2){
    color: #779CFF;
}

.good-list .good-list01 a img{
    float: left;
    width: 50%;
    padding: 5px;
}

/* 商品列表02 */

.good-list .good-list02{
    width: 100%;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
}

.good-list .good-list02 a{
    display: block;
    float: left;
    width: 25%;
    text-align: left;
    padding: 5px;
}

.good-list .good-list02 a:nth-child(n+2){
    border-left: 1px solid #e0e0e0;
}

.good-list .good-list02 a span{
    display: block;
}

.good-list .good-list02 a span:nth-child(1){
    font-size: 16px;
}

.good-list .good-list02 a span:nth-child(2){
    color: green;
}

.good-list .good-list02 a img{
    width: 100%;
}
```



### 7-底部栏

![1555755407827](day01.assets/1555755407827.png)

```html
<!-- 7.底部栏 -->
        <div class="bottom-bar clearfix">
            <a href=""><img src="images/icon_index.png" alt=""></a>
            <a href=""><img src="images/icon_category.png" alt=""></a>
            <a href=""><img src="images/icon_center.png" alt=""></a>
            <a href=""><img src="images/icon_shopping.png" alt=""></a>
            <a href=""><img src="images/icon_mime.png" alt=""></a>
        </div>
```



```css
/* 7.底部栏 */
.bottom-bar{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 44px;
    background-color: #fff;
}

.bottom-bar a{
    float: left;
    width: 20%;
}

.bottom-bar a img{
    width: 44px;
    height: 44px;
    display: block;
    margin: 0 auto;
}
```



## 完整的html代码

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <!-- 移动端视口适配 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>京东首页</title>
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/index.css">
</head>

<body>
    <!-- 版心容器 -->
    <div class="container">
        <!-- 1-搜索栏 -->
        <div class="top-bar">
            <a href="" class="menu"></a>
            <input type="text" placeholder="商品名称">
            <a href="" class="login">登录</a>
        </div>
        <!-- 2-banner栏 -->
        <div class="banner">
            <img src="images/slide.png" alt="">
        </div>
        <!-- 3.导航栏 -->
        <div class="nav-bar">
            <ul class="clearfix">
                <li><a href=""><img src="images/nav01.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav02.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav03.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav04.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav05.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav06.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav07.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav08.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav09.png" alt=""><span>京东超市</span></a></li>
                <li><a href=""><img src="images/nav10.png" alt=""><span>京东超市</span></a></li>
            </ul>
        </div>
        <!-- 4.京东快报 -->
        <div class="jd-news">
            <span><span>热门&nbsp;&nbsp;</span>价格太贵买不起</span>
            <a href="">更多</a>
        </div>
        <!-- 5.活动列表 -->
        <div class="adv-list clearfix">
            <a href=""><img src="images/adv01.jpg" alt=""></a>
            <a href=""><img src="images/adv02.jpg" alt=""></a>
            <a href=""><img src="images/adv03.jpg" alt=""></a>
        </div>
        <!-- 6.商品列表 -->
        <div class="good-list">
            <div class="good-title"><img src="images/goods_title.jpg" alt=""></div>
            <div class="good-list01 clearfix">
                <a href="" class="clearfix">
                    <span>二手寻宝</span>
                    <span>跳蚤市场逛一逛</span>
                    <img src="images/goods.jpg" alt="">
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="" class="clearfix">
                    <span>二手寻宝</span>
                    <span>跳蚤市场逛一逛</span>
                    <img src="images/goods.jpg" alt="">
                    <img src="images/goods.jpg" alt="">
                </a>
            </div>
            <div class="good-list02 clearfix">
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
                <a href="">
                    <span>爱是一道光</span>
                    <span>绿到你发慌</span>
                    <img src="images/goods.jpg" alt="">
                </a>
            </div>
        </div>
        <!-- 7.底部栏 -->
        <div class="bottom-bar clearfix">
            <a href=""><img src="images/icon_index.png" alt=""></a>
            <a href=""><img src="images/icon_category.png" alt=""></a>
            <a href=""><img src="images/icon_center.png" alt=""></a>
            <a href=""><img src="images/icon_shopping.png" alt=""></a>
            <a href=""><img src="images/icon_mime.png" alt=""></a>
        </div>
    </div>
</body>

</html>
```



## 完整的CSS代码



```css


/* 版心 */
.container{
    width: 100%;
    /* 限制pc端版心范围 */
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
}

/* 1-搜索栏 */
.top-bar{
    /* 固定定位相对于页面，想要居中显示也要限制版心范围 */
    min-width: 320px;
    max-width: 750px;
  
    position: fixed;
    top:0;
    width: 100%;
    height: 44px;
    background-color: #E72E27;
    padding: 0px 50px;
}

.top-bar .menu{
    position: absolute;
    left: 14px;
    top:14px;
    width: 20px;
    height: 18px;
    background: url(../images/jd_icons.png) no-repeat;
    background-size: 250px 200px;
}

.top-bar input{
    width: 100%;
    height: 30px;
    margin-top: 7px;
    padding-left: 10px;
    border-radius: 15px;
}

.top-bar .login{
    position: absolute;
    top: 14px;
    right: 14px;
    color: #fff;
}

/* 2-banner栏 */
.banner{
    width: 100%;
    /* 注意点：固定定位fixed会脱标
       解决方案：设置元素margin撑开脱标的高度
    */
    margin-top: 44px;
}

.banner img{
    width: 100%;
}

/* 3.导航栏 */

.nav-bar{
    width: 100%;
    height: 175px;
}


.nav-bar ul{
    width: 100%;
}

.nav-bar ul>li{
    float: left;
    width: 20%;
    text-align: center;
}

.nav-bar ul>li img{
    display: block;
    width: 40px;
    height: 40px;
    margin: 10px auto 5px;
}

/* 4.京东快报 */
.jd-news{
    width: 100%;
    height: 16px;
    background: url(../images/jd_icons.png) no-repeat 8px -22px;
    background-size: 250px 200px;
    text-align: center;
}

.jd-news>span>span{
    color: red;
}

.jd-news a{
    float: right;
    padding: 0px 5px;
    border-left: 1px solid #E0E0E0;
}

/* 5.活动列表 */
.adv-list{
    width: 100%;
    margin: 10px 0px;
}

.adv-list a{
    display: block;
    float: left;
    width: 50%;
    padding: 0px 5px;
}

.adv-list a:nth-child(n+2){
    width: 25%;
    border-left: 1px solid #e0e0e0;
    
}

.adv-list a img{
    width: 100%;
}

/* 6.商品列表 */

.good-list{
    width: 100%;
    /* 解决底部栏固定定位脱标问题 */
    margin-bottom: 44px;
}

/* 商品头部 */
.good-list .good-title{
    width: 100%;
    height: 35px;
    background-color: #F5F5F5;
}

.good-list .good-title img{
    display: block;
    height: 100%;
    margin: 0 auto;
}

/* 商品列表01 */
.good-list .good-list01{
    width: 100%;
}

.good-list .good-list01 a{
    display: block;
    float: left;
    width: 50%;
    text-align: center;
}

.good-list .good-list01 a:nth-child(2){
    border-left: 1px solid #e0e0e0;
}

.good-list .good-list01 a span{
    display: block;
}

.good-list .good-list01 a span:nth-child(1){
    font-size: 16px;
}

.good-list .good-list01 a span:nth-child(2){
    color: #779CFF;
}

.good-list .good-list01 a img{
    float: left;
    width: 50%;
    padding: 5px;
}

/* 商品列表02 */

.good-list .good-list02{
    width: 100%;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
}

.good-list .good-list02 a{
    display: block;
    float: left;
    width: 25%;
    text-align: left;
    padding: 5px;
}

.good-list .good-list02 a:nth-child(n+2){
    border-left: 1px solid #e0e0e0;
}

.good-list .good-list02 a span{
    display: block;
}

.good-list .good-list02 a span:nth-child(1){
    font-size: 16px;
}

.good-list .good-list02 a span:nth-child(2){
    color: green;
}

.good-list .good-list02 a img{
    width: 100%;
}

/* 7.底部栏 */
.bottom-bar{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 44px;
    background-color: #fff;
}

.bottom-bar a{
    float: left;
    width: 20%;
}

.bottom-bar a img{
    width: 44px;
    height: 44px;
    display: block;
    margin: 0 auto;
}









```


