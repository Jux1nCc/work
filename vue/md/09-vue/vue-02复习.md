## day02- 循环 和 条件 指令

### 1.循环 v-for

+ 循环普通数组

```html
<ul>
    <li v-for="ele in list" :key="ele"> {{ele}} </li>
</ul>


let a = new Vue({
	el:'#app',
	data:{
		list:[1,2,3,4]
	}
});
```

+ 循环对象数组

```html
<ul>
    <li v-for="(ele,index) in list" :key="ele.id"> {{ele.name}} </li>
</ul>


let a = new Vue({
	el:'#app',
	data:{
		list:[
			{id:1,name:'死鬼'},
			{id:2,name:'老公'},
			{id:3,name:'渣男'},
		]
	}
});
```

### 2.v-if...

+ v-if : 用来 表示 当前所在 标签 是否 要显示 (要么 从 dom树移出，要么 添加到 dom树)
+ 特点：比较消耗 性能

```html
<div v-if="isShow">
    大屁股老师 喜欢 群姐吗？
</div>

let a = new Vue({
	el:'#app',
	data:{
		isShow:true
	}
});
```

+ v-else
+ 特点：前面的兄弟元素节点 必须 有 `v-if`  or  `v-else-if` 指令，否则 报错！！！

```html
<div v-if="isShow">
    大屁股老师 喜欢 群姐吗？
</div>
<div v-else>
    大屁股老师 喜欢 群姐吗？
</div>

let a = new Vue({
	el:'#app',
	data:{
		isShow:false
	}
});
```

+ v-else-if
+ 特点：前面的兄弟元素节点 必须 有 `v-if`  or  `v-else-if` 指令，否则 报错！！！

```html
<div v-if="age<18">
    大屁股老师 喜欢 群姐吗？1
</div>
<div v-else-if="age>=18 && age <= 25">
    大屁股老师 喜欢 群姐吗？2
</div>
<div v-else>
    大屁股老师 喜欢 群姐吗？3
</div>

let a = new Vue({
	el:'#app',
	data:{
		age:1
	}
});
```

### 3.v-show

+ 和 v-if 类似：都是 用来 辨识 当前所在 标签是否要显示
+ 特点：v-show　是利用 display样式 来 决定 显示和异常的！！！ 因为没有新增或删除dom，所以性能更高！

### 4.v-cloak

+ 用来 加载 vue.js 文件 完成之前，隐藏 {{胡子语法}} 。
+ 结合 [v-cload] 属性 选择器才可以

### 5.v-once

+ 只会 执行 一次 vue 指令 和 胡子语法，之后 不管数据怎么变动，都不会再执行了！！！



### 6.v-pre

+ 直接 告诉 vue 框架，跳过 当前标签中 所有的 {{}} ，把它当成 文本显示 就好！



### 7.v-bind:key

+ 简写：  `:key='值'`

+ 用来 避免 vue框架 重复 利用同一个 dom 对象！！！
+ 注意：key 不可以 有重复的 值！！！！