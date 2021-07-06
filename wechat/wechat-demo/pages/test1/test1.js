const app = getApp()
Page({
  data:{
    name: 'xingSkr',
    now: app.globalData.now
  },
  buttonHandler(event){
    const that = this
    wx.showModal({
      title: '操作确认',
      content: '确定修改内容吗?',
      success(res){
        if(res.confirm){
          that.setData({
            name: 'mingSkr'
          },function(){
            wx.showToast({
              title: '操作完成',
              duration: 700
            })
          })
        }else if(res.cancel) {
          wx.showToast({
            title: '已取消',
            duration: 700
          })
        }
      }
    })
  }
});