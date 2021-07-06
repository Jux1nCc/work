const app = getApp()
Page({
  data:{
    name: 'xingSkr'
  },
  buttonHandler(event){
    if (!event.detail.userInfo) return;
    this.setData({
      name: event.detail.userInfo.nickName
    });
  },
  buttonHandler1(event){
    wx.navigateTo({
      url: '../home/home'
    });
  }
});