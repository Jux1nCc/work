# 今日学习任务



* [ ] 01-transition过渡动画
* [ ] 02-transform属性2D转换
  * [ ] ==2D平移==
  * [ ] ==2D旋转==
    * [ ] 修改元素旋转基准点
  * [ ] ==2D缩放==
  * [ ] 2D倾斜
  * [ ] 案例：大风车
* [ ] 03-transform属性3D转换
  * [ ] 3D平移
  * [ ] 3D旋转
  * [ ] 3D缩放
  * [ ] 案例：制作立方体
* [ ] 04-animation帧动画

# 01-transition过渡动画

* 1.在前端开发中，如果不使用`JS`代码，要想实现元素从A状态变成B状态，并且中间的过程可以被观察到，那么就可以使用`css`中的过渡属性:`transition`
* 2.`transition`属性是一个`复合属性`，类似于基础班的`background`、`border`等
* 3.`transition属性值介绍`
  * 官网文档传送门:<http://www.w3school.com.cn/cssref/pr_transition.asp>
  * transition-property:需要过渡的属性
    * 一般为`all`，对所有属性生效
  * transition-duration:需要过渡的时间
    * `必须设置`：因为默认值为0，没有动画
    * 例如1s，表示过渡动画时间为1秒
  * transition-timing-function：需要过渡的方式
    * 默认值ease:由快到慢
    * 一般设置为linear:表示匀速
  * transition-delay:延迟时间
    * 例如3s，表示动画从3秒之后才开始
    * 一般无需设置，默认为0，立即开始

![介绍](day06.assets/1555139520005.png)



* transition-timing-function速度曲线

![1555139562794](day06.assets/1555139562794.png)



* 细节注意点：
  * （1）如果在`horver`中设置`transition`属性，那么只有鼠标移入才有动画，移出没有动画
    * 因为鼠标移出之后，horver中的transition也被移除
  * （2）如果希望多个属性分开移动，则可以设置多组transition属性，每一组用逗号`,`隔开
    * `transition: width 2s , height 2s 2s;`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style >
        body{
            padding: 0px;
            margin: 0px;
        }
        .box{
            width: 200px;
            height: 200px;
            background-color: red;

            position: absolute;
            left: 0;
            top: 0;

            /*transition过渡动画
                a.第一个值表示过渡的属性，一般为all
                b.第二个值表示过渡的时间，必须要设置
                c.第三个值表示过渡的方式，一般为linear（匀速）
                d.第四个值表示延迟时间
             */
            transition: all 1s linear;
        }

        .box:hover{ 
           left: 100px;
           top: 100px;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
```



# ==02-transform属性2D转换==

## transform属性介绍

* ***==注意：transform是一个属性名，后面所要学习的平移、旋转、缩放、倾斜都是它的属性值==***
  * css属性语法： `属性名:属性值;`
  * `transform也是一个复合属性，可以同时设置多个值`
  * 官方文档传送门:<http://www.w3school.com.cn/cssref/pr_transform.asp>
  * 常用的属性值为以下几个
    * 平移：`transform: translate()`
    * 旋转：`transform: rotate()`
    * 缩放：`transform:scale()`
    * 倾斜(不常用):`transform:skew()`
    * 视距(3D专用):`perspective()`

[平移预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/01-移动Web/2.0版本/课程资料/预习代码/day06/02-transform转换/01-2d平移.html)

[旋转预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/01-移动Web/2.0版本/课程资料/预习代码/day06/02-transform转换/03-2d旋转.html)

[缩放预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/01-移动Web/2.0版本/课程资料/预习代码/day06/02-transform转换/06-2d缩放.html)

[倾斜预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/01-移动Web/2.0版本/课程资料/预习代码/day06/02-transform转换/08-2d倾斜.html)



![1555141839054](day06.assets/1555141839054.png)

## 1.1-2D平移translate

2D转换平移方式改变元素位置 

1. 基本语法：`transform: translate(x,y)`

2. 总结：

​           a.最多只能设置两个值，第一个值表示水平位置（x方向）,第二个值表示垂直位置（y方向）

​           b.如果只设置一个值，则表示水平方向

​           c.如果值为负数，元素则反方向移动

​           d.如果值为百分比，则相对于元素自身的宽高百分比

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        body{
            padding: 0px;
            margin: 0px;
        }
        .box{
            width: 200px;
            height: 200px;
            background-color: pink;
            
            transition: all 1s linear;
            
        }

        .box:hover{
            /* 2D转换平移方式改变元素位置 
                1. 基本语法：
                    transform: translate(x,y)
                2. 总结：
                    a.最多只能设置两个值，第一个值表示水平位置（x方向）,第二个值表示垂直位置（y方向）
                    b.如果只设置一个值，则表示水平方向
                    c.如果值为负数，元素则反方向移动
                    d.如果值为百分比，则相对于元素自身的宽高百分比
             */
             transform: translate(50%,200px);
        }
    </style>
</head>
<body>
    <div class="box"></div>

</body>
</html>
```

* `课后小练习：盒子居中`
  * 传统定位实现居中思路
    * a.设置子元素的left和top均为50%（百分比相对父元素宽高）
    * b.子元素往左/上偏移自身宽高一半
      * 弊端：如果子元素的宽高变化，则需要重新计算便宜的像素，非常麻烦
      * 解决方案：设置子元素的`translate(50%,50%)`,百分比相对于子元素自身宽高

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<style type="text/css">
		.box {
			width: 400px;
			height: 400px;
			border: 1px solid red;
			
			/* 标准流盒子居中 */
			margin: 0 auto;

			position: relative;
		}

		.one {
			width: 137px;
			height: 137px;
			background-color: pink;
			position: absolute;
			left: 50%;
			top: 50%;
			/* margin-top: -68.5px;
			margin-left: -68.5px; */

			/* 2D实现居中 */
			/* transform: translate(-50%,-50%); */
		}
	</style>
</head>
<body>
	
	  <div class="box">
	  		<div class="one"></div>
	  </div>
</body>
</html>
```



## ==translate练习：元素居中==



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .father{
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 1px solid red;

            position: relative;
        }

        .son{
            width: 100px;
            height: 100px;
            background-color: green;
            
            /* 1.margin实现元素居中
                特点：父元素或子元素宽高发生变化，都需要重新计算
             */
            /* margin-top: 100px;
            margin-left: 100px; */

            /* 2.使用定位:子绝父相 
                特点：子元素元素宽高发生变化，需要重新计算
            */
            /* position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -50px; 
            margin-left: -50px;  */

            /* 3.使用transform：translate(x,y) 
                好处：元素宽高变化，都会自动居中（transform属性值的百分比都是相对于元素自身宽高 ）
            */

            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
             /* 4.伸缩盒子居中 */
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>
</html>
```



## 1.2-2D旋转rotate



2D旋转

​	1.基本语法:`transform: rotate(角度)`

​	2.总结：

​                    a.只有一个值，表示旋转的角度(单位deg)

​                    b.角度值为正数：顺时针旋转   负数：逆时针旋转

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style >
        body{
            padding: 0px;
            margin: 0px;
        }
        .box{
            width: 200px;
            height: 200px;
            margin: 100px auto;
            background-color: pink;
            transition: all 1s linear;  
        }

        .box:hover{
           /* 2D旋转
                1. 基本语法：
                    transform: rotate(角度)
                2. 总结：
                    a.只有一个值，表示旋转的角度(单位deg)
                    b.角度值为正数：顺时针旋转   负数：逆时针旋转
             */  
             transform: rotate(-45deg)
        }
    </style>
</head>
<body>
    <div class="box"></div>
    
</body>
</html>
```



## 1.3-修改元素旋转基准点

* 1.默认情况下，元素在旋转的时候，是以自身的中心点作为旋转原点的，又称为旋转基准点

* 2.如果想要修改元素的基准点，则可以使用:`transform-origin`属性

* 3.设置基准点  

  ​                a. 默认值为元素中心点

  ​                b. 左：left  右：right  上：top  下：bottom

  ​		  `transform-origin: 100px 100px; `可以设置具体的坐标点

  ​            	`transform-origin*: left bottom;`也可以设置元素自身的顶点

* ==4.transform-origin修改元素的基准点不仅仅只是作用于旋转，也可以作用于即将学习的缩放与倾斜==

![1555144512978](day06.assets/1555144512978.png)

![1555144653084](day06.assets/1555144653084.png)

![1555144664268](day06.assets/1555144664268.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style >
        body{
            padding: 0px;
            margin: 0px;
        }
        .box{
            width: 200px;
            height: 200px;
            margin: 100px auto;
            background-color: pink;
            /*过渡动画*/
            transition: all 1s linear;

            /*设置基准点  
                a. 默认值为元素中心点
                b. 左：left  右：right  上：top  下：bottom
            */
            /* transform-origin: 100px 100px; */
            transform-origin: left bottom;
        }

        .box:hover{
             transform: rotate(45deg)
        }
    </style>
</head>
<body>
    <div class="box"></div>
    
</body>
</html>
```



## ==rotate练习：秒钟旋转==

[效果演示](file:///C:/Users/%E5%BC%A0%E6%99%93%E5%9D%A4/Desktop/%E5%BC%A0%E6%99%93%E5%9D%A4%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE%E8%B5%84%E6%96%99/AB%E6%A8%A1%E5%BC%8F/01-%E7%A7%BB%E5%8A%A8Web/2.0%E7%89%88%E6%9C%AC/%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/%E9%A2%84%E4%B9%A0%E4%BB%A3%E7%A0%81/day06/02-transform%E8%BD%AC%E6%8D%A2/05-rotate%E6%A1%88%E4%BE%8B%EF%BC%9A%E7%A7%92%E9%92%9F%E6%97%8B%E8%BD%AC.html)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .father{
            width: 300px;
            height: 300px;
            margin: 100px auto;
            border: 1px solid red;
            border-radius: 150px;
        }

        .son{
            width: 5px;
            height: 150px;
            margin: 0 auto;
            background-color: pink;

            /* 过渡动画 */
            transition: all 60s linear;
            /* 修改旋转基准点 */
            transform-origin: bottom;
        }

        /* 选择鼠标移入father状态下的son元素 */
        .father:hover .son{
            transform: rotate(360deg);
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>
</html>
```



## 1.4-2D缩放scale



2D缩放

1. 基本语法:`transform: scale(x,y)`

2. 总结：

​                    a.第一个值表示水平缩放比例（宽度），第二个值表示垂直缩放比例（高度）

​                    b.如果只设置一个值，表示宽度和高度同时缩放相应的比例

​                    c.缩小： 0-1之间的小数  放大：  大于1的数字

​                    d.transform-origin：设置2d转换基准点（作用于旋转、缩放、倾斜）



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style >
        body{
            padding: 0px;
            margin: 0px;
        }
        .box{
            width: 200px;
            height: 200px;
            margin: 100px auto;
            background-color: pink;
            /*过渡动画*/
            transition: all 1s linear;

            /*设置2d转换基准点  
                a. 默认值为元素中心点
                b. 左：left  右：right  上：top  下：bottom
            */
            /* transform-origin: 100px 100px; */
            /* transform-origin: left bottom; */
        }

        .box:hover{
           /* 2D缩放
                1. 基本语法：
                    transform: scale(x,y)
                2. 总结：
                    a.第一个值表示水平缩放比例（宽度），第二个值表示垂直缩放比例（高度）
                    b.如果只设置一个值，表示宽度和高度同时缩放相应的比例
                    c.缩小： 0-1之间的小数  放大：  大于1的数字
                    d.transform-origin：设置2d转换基准点（作用于旋转、缩放、倾斜）

             */  
             transform: scale(0.5,1.5)
        }

       
    </style>
</head>
<body>
    <div class="box"></div>
    
</body>
</html>
```



## ==scale练习：进度条==

[效果演示](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/01-移动Web/2.0版本/课程资料/预习代码/day06/02-transform转换/07-scale案例：进度条.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .father{
            width: 600px;
            height: 30px;
            border: 1px solid red;
            margin: 100px auto;
        }

        .son{
            width: 1px;
            height: 30px;
            background-color: red;

            /* 过渡动画 */
            transition: all 5s linear;
            /* 修改基准点 */
            transform-origin: left;
        }

        .father:hover .son{
            transform: scale(600,1);/* 1px * 600 = 600px */
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>
</html>
```

## ==scale经典应用场景：解决谷歌最小字体12px问题==



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=`, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <!-- 只有谷歌浏览器最小字体是12px,其他浏览器都支持
        解决方案：使用transform:scale() 缩小
    -->
    <p style="font-size:16px">我是文字</p>
    <p style="font-size:14px">我是文字</p>
    <p style="font-size:12px">我是文字</p>
    <p style="font-size:10px">我是文字</p>

    <p style="font-size:12px;transform: scale(1,0.8)">我是文字</p>

</body>
</html>
```



## 1.5-2D倾斜skew（了解）

2D倾斜（扭曲）

1. 基本语法： `transform: skew(x角度,y角度)`

2. 总结：

​                    a.第一个值表示x方向倾斜角度，第二个值表示y方向倾斜角度

​                    b.如果只设置一个值，表示x方向倾斜角度



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style >
        body{
            padding: 0px;
            margin: 0px;
        }
        .box{
            width: 200px;
            height: 200px;
            margin: 100px auto;
            background-color: pink;
            /*过渡动画*/
            transition: all 1s linear;

            /*设置2d转换基准 
                a. 默认值为元素中心点
                b. 左：left  右：right  上：top  下：bottom
            */
            /* transform-origin: 100px 100px; */
            /* transform-origin: left bottom; */
        }

        .box:hover{
           /* 2D倾斜（扭曲）
                1. 基本语法：
                    transform: skew(x角度,y角度)
                2. 总结：
                    a.第一个值表示x方向倾斜角度，第二个值表示y方向倾斜角度
                    b.如果只设置一个值，表示x方向倾斜角度
             */  
             transform:skew(30deg)
        }

    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
```

# 03-transform属性3D转换



## 3D转换介绍

==***默认情况下，我们的电脑屏幕是二维的，无法呈现Z轴效果，如果想要看到3D效果必须要设置视距属性***==

​	`perspective: 800px;`一般视距范围600-100px

​	倾斜Skew只有X轴Y轴，没有Z轴，但是可以用3d矩阵变换来实现matrix3d（了解即可）

![1555153370149](day06.assets/1555153370149.png)







## 1.1-3D视距perspective与位移

* 1.视距：视觉的距离

  * 相当于模拟出一个“眼睛”看物体的距离，遵循近大远小的规则
  * perspective: 800px;

* 2.3D位移

  ​            translate：既可以平移x轴，也能平移y轴

  ​            tranelateX：仅仅x轴平移

  ​            tranelateY：仅仅Y轴平移

  ​            tranelateZ：仅仅Z轴平移

![1555153486687](day06.assets/1555153486687.png)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- 
        1.视距：视觉的距离(z轴：我们的眼睛到电脑屏幕的距离)
            相当于模拟出一个“眼睛”看物体的距离，遵循近大远小的规则

        perspective:800px

        2.3D位移
            translate：既可以平移x轴，也能平移y轴
            tranelateX：仅仅x轴平移
            tranelateY：仅仅Y轴平移
            tranelateZ：仅仅Z轴平移
     -->

     <style>
         body{
             /* 使用3D转换，需要给父元素设置视距属性 */
             perspective: 800px;
         }
         img{
             transform:translateX(100px) translateY(100px) translateZ(0px);
         }
     </style>
</head>
<body>
    <img src="../images/girl.jpg" alt="">
</body>
</html>
```



## 1.2-3D旋转

![](day06.assets/1004.gif)

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

        ul{
            margin: 0 auto;
            border: 1px solid red;
            width: 660px;
            height: 220px;
            margin: 100px auto;
            list-style: none;
        }

        li{
            float: left;
            width: 200px;
            height: 200px;
            background-color: pink;
            margin: 10px;

            transition: all 1s linear;
        }

        li:nth-child(1):hover{
            transform: rotateX(90deg);
        }

        li:nth-child(2):hover{
            transform: rotateY(90deg);
        }

        li:nth-child(3):hover{
            transform: rotateZ(90deg);
            /* 2d旋转其实就是z轴旋转 */
        }
    </style>
</head>
<body>
    <ul>
        <li>x轴</li>
        <li>y轴</li>
        <li>z轴</li>
    </ul>
</body>
</html>
```



## 1.3-3D缩放

3d转换缩放:` *transform*: scaleX(2) scaleY(2) scaleZ(2);`

​                a.  scaleX和scaleY相当于2d转换scale(x,y)

​                b.  scaleZ相当于改变物体厚度(立方体有效)，单独使用无效果(少用)

   ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .box{
            width: 200px;
            height: 200px;
            margin: 100px auto;
            background-color: red;
            transition: all 1s;
        }

        .box:hover{
            /* 3d转换缩放
                a.  scaleX和scaleY相当于2d转换scale(x,y)
                b.  scaleZ相当于改变物体厚度(立方体有效)，单独使用无效果(少用)
             */
            transform: scaleX(2) scaleY(2) scaleZ(2);
            /* transform: scale(2,2); */
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
   ```



# 04-animation帧动画



## 1.1-animation动画介绍

* 1.transition动画存在的问题

​            a. 动画不能自动开始(需要配合horver使用)

​            b. 动画次数固定一次

* 2.animation动画（帧动画，也可以叫做补间动画）

​            a.可以自动开始

​            b.次数不限

* 3.语法介绍
* 课外学习传送门:<http://www.w3school.com.cn/cssref/pr_animation.asp>

![1555905230250](day06.assets/1555905230250.png)

```javascript
步骤：
            1.写一个动画剧本（动画集）：告诉元素怎么动
                语法：  @keyframes 动画名字{
                            from{
                                //开始状态
                            }to{
                                //结束状态
                            }
                        }

            2.在需要动画效果的元素上，写一个属性叫做animation-name，属性值就是动画集名称
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <!-- 
        1.transition动画存在的问题
            a. 动画不能自动开始(需要配合horver使用)
            b. 动画次数固定一次
        
        2.animation动画
            a.可以自动开始
            b.次数不限
        
        步骤：
            1.写一个动画剧本（动画集）：告诉元素怎么动
                语法：  @keyframes 动画名字{
                            from{
                                //开始状态
                            }to{
                                //结束状态
                            }
                        }

            2.在需要动画效果的元素上，写一个属性叫做animation-name，属性值就是动画集名称

     -->

    <style>
        
        /* 第一步：定义动画集 */
        @keyframes box_move{
            
           from{/*开始状态*/
                transform: translateX(0px);
           }to{/*结束状态*/
                transform: translateX(800px);
           } 
        }
        
        .box{
            width: 100px;
            height: 100px;
            background-color: red;
            margin-top: 50px;

            /* 第二步：开始动画 */
            animation-name: box_move;
            /* 动画时间：必须设置 */
            animation-duration: 2s;
        }
    </style>

    
</head>
<body>
    <div class="box"></div>
</body>
</html>
```



## 1.2-案例：网页加载动画

[效果演示](file:///C:/Users/%E5%BC%A0%E6%99%93%E5%9D%A4/Desktop/39%E6%9C%9F%E7%A7%BB%E5%8A%A8Web/%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/%E9%A2%84%E4%B9%A0%E4%BB%A3%E7%A0%81/day06/03-animation%E5%B8%A7%E5%8A%A8%E7%94%BB/02-%E6%A1%88%E4%BE%8B%EF%BC%9A%E7%BD%91%E9%A1%B5%E5%8A%A0%E8%BD%BD%E5%8A%A8%E7%94%BB.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body{
            background-color: #111;
        }
        .rotate{
            display:block;
            margin:200px auto 0;
            width:100px;
            height:100px;
            /* infinite:无穷大  动画无限循环 */
            animation:rotating 1s linear infinite;
        }
        p{
            text-align: center;
            color:#fff;
        }

        @keyframes rotating{
            from{
                transform:rotate(0deg);
            }
            to{
                transform:rotate(360deg);
            }
        }

    
    
    </style>
</head>
<body>
    <img src="images/rotate.png" alt="rotate" class="rotate">
    <p>Loading...</p>
</body>
</html>
```



## 1.3-（课外了解）animation动画属性介绍

![1555155573691](day06.assets/1555155573691.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .box{
            width: 100px;
            height: 100px;
            background-color: red;
            margin-top: 50px;

            /* 第二步：开始动画 */
            /* 1.动画名称 */
            animation-name: box_move;
            /* 2.动画时间：必须设置 */
            animation-duration: 2s;
            /* 3.动画次数：默认一次 */
            animation-iteration-count: 3;
            /* 4.动画逆播：默认不逆播
                alternate：动画逆播
             */
            animation-direction: alternate;
            /* 5.动画速度：默认ease 先快后慢
                匀速： linear
             */
            animation-timing-function: linear;
            /* 6.动画延时 */
            animation-delay: 3s;
            /* 7.动画完成状态： 默认回到初始状态
                forwards：保持在结束状态
            */
            animation-fill-mode: forwards;
        }

        /* 第一步：定义动画集 */
        @keyframes box_move{
            
           from{/*开始状态*/
                transform: translateX(0px);
           }to{/*结束状态*/
                transform: translateX(800px);
           } 
        }
    </style>

    
</head>
<body>
    

    <div class="box"></div>
</body>
</html>
```





## 1.4-（课外了解）animation多状态动画



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .box{
            width: 100px;
            height: 100px;
            background-color: red;
            margin-top: 50px;

            /* 第二步：开始动画 */
            
            animation: box_width 2s linear forwards,
                       box_height 1s linear forwards 2s;    
        }

        /* 第一步：定义动画集 */
        @keyframes box_width{
            
           from{/*开始状态*/
                width: 100px;
           }to{/*结束状态*/
                width: 400px;
           } 
        }

        @keyframes box_height{
            
            from{/*开始状态*/
                 height: 100px;
            }to{/*结束状态*/
                height: 400px;
            } 
         }


    </style>

    
</head>
<body>
    

    <div class="box"></div>

    <script>
        console.log(0 == -0);
    </script>
</body>
</html>
```



## 1.5-（课外了解）animation百分比实现多状态动画

[效果预览](file:///C:/Users/张晓坤/Desktop/张晓坤前端备课资料/AB模式/01-移动Web/课程资料/预习代码/day01/18-百分比实现动画多状态.html)



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        .box{
            width: 100px;
            height: 100px;
            background-color: red;
            margin-top: 50px;

            /* 第二步：开始动画 */
            
            animation: change 5s linear forwards;    
        }

        /* 第一步：定义动画集 */
      
        @keyframes change{
            /* 百分比是相对动画的执行时间 */
           0%{/*开始状态*/
                transform: scale(1.5) translate(0px,0px);
                opacity: 0.2;
            }
            20%{/*结束状态*/
                transform: scale(0.5) translate(200px,100px);
                opacity: 0.3;
            }
            40%{
                transform: scale(1) translate(200px,300px);
                opacity: 0.5;
            }
            80%{
                transform: scale(2) translate(300px,200px);
                opacity: 0.8;
            }
            100%{
                transform: scale(1) translate(300px,300px);
                opacity: 1;
            } 
         }


    </style>

    
</head>
<body>
    
    <div class="box"></div>
 
</body>
</html>
```


