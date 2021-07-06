// pages/cook/cook.js
Page({
  /**
  * ⻚⾯的初始数据
  */
  data: {
  array:[]
  },
  /**
  * ⽣命周期函数--监听⻚⾯加载
  */
  onLoad: function (options) {
  // 调⽤⾃定义函数
  var array = this.initData();
  // 设置data数据
  this.setData({
  array:array
  });
  },
  /**
  * ⾃定义函数--数据加载
  */
  initData: function (options) {
  var array = [];
  // 创建对象和属性，保存到数组
  var obj1 = new Object();
  obj1.img = '../../images/list/food-1.jpg';
  obj1.title = '爱⼼早餐';
  obj1.type = '健康养⽣';
  obj1.liulan = '20696浏览';
  obj1.pinglun = '12评论';
  array[0] = obj1;
  var obj2 = new Object();
  obj2.img = '../../images/list/food-2.jpg';
  obj2.title = '困了只要喝咖啡';
  obj2.type = '家庭';
  obj2.liulan = '30696浏览';
  obj2.pinglun = '15评论';
  array[1] = obj2;
  var obj3 = new Object();
  obj3.img = '../../images/list/food-3.jpg';
  obj3.title = '橘⼦吃多了变成⼩⻩⼈';
  obj3.type = '在线⼀⽣';
  obj3.liulan = '10696浏览';
  obj3.pinglun = '5评论';
  array[2] = obj3;
  var obj4 = new Object();
  obj4.img = '../../images/list/food-4.jpg';
  obj4.title = '搜狐新闻，⼿机⽤多了';
  obj4.type = '⼴告';
  obj4.liulan = '20696浏览';
  obj4.pinglun = '12评论';
  array[3] = obj4;
  var obj5 = new Object();
  obj5.img = '../../images/list/food-5.jpg';
  obj5.title = '爱⼼早餐';
  obj5.type = '健康养⽣';
  obj5.liulan = '20696浏览';
  obj5.pinglun = '12评论';
  array[4] = obj5;
  return array;
  },
  // 点击绑定的事件：seeDetail
  seeDetail:function(e){
  // e：事件对象
  // currentTarget 属性集合
  // currentTarget.属性名称获取值
  console.log(e.currentTarget.id);
  }
 })