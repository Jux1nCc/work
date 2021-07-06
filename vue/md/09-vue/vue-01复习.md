## 1.MVVM模式

+ Model : 数据
+ View ：视图
+ ViewModel：数据和 视图 的 桥梁 -- 主要业务 也在此

## 2.Vue框架

### 2.1 数据绑定

+ 单向数据绑定 ： vue框架 会 自动 将 data中的数据 渲染 到 视图中 指定位置
+ 双向数据版型：vue框架 会自动 将 设置了 v-model 的 表单元素的 value值 设置给 数据，且也会自动将变动后的数据 显示到 表单元素中

### 2.2 Vue指令

#### 2.2.1 文本指令

+ v-text
+ v-html
+ {{ 胡子语法 }}

#### 2.2.2 事件指令

+ 完整：`v-on:事件名 = ""`
+ 简写：`@事件名 = ""`
+ 事件指令 中的值
  + 直接写 js 代码
  + 直接写 methods 中的 方法名
  + 直接写 methods 中的 方法名() or 方法名(实参)

#### 2.2.3 事件指令修饰符

+ 阻断事件冒泡 ： @事件名.stop = ''
+ 阻断默认行为 ：@事件名.prevent = ''
+ 联合修饰符： @事件名.stop.prevent = ''
+ 回车事件：@keyup.enter = ''



#### 2.2.4 其他指令

+ 完整：`v-bind:属性名 = 属性值`
+ 简写：`:属性名 = 属性值`



#### 2.2.5 其他指令绑定class

+ 完整：`v-bind:class="red big"`
+ 简写：`:class="red big"`

+ 绑定对象： `v-bind:class="{red:isRed, big:isBig}"`

+ 绑定对象2：`v-bind:class="claObj"`

  ​                      `data:{ claObj:{red:true, big:false} }`







