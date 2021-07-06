// 主页数据
var mountedData = {
  sex: 0,                //类型：Number  必有字段  备注：0-女，1-男
  photo: "https://nocheckimgs.oss-cn-shenzhen.aliyuncs.com/sysphoto/201910161933137516380054266168204.jpg",                //类型：String  必有字段  备注：头像
  signIns: [                //类型：Array  必有字段  备注：签到记录
    "2021-04-20"                //类型：String  必有字段  备注：签到日期
  ],
  treeGrowth: 100,                //类型：Number  必有字段  备注：树的成长值
  isEnd: false,                //类型：Boolean  必有字段  备注：是否结束
  shareNum: 0,                //类型：Mixed  必有字段  备注：分享次数
  inviteTrees: [                //类型：Array  必有字段  备注：待接受的邀请
    {                //类型：Object  必有字段  备注：无
      treeName: "一辈子的幸福",                //类型：String  必有字段  备注：树名
      nickName: "王大妞",                //类型：String  必有字段  备注：无
      customerId: "9527",                //类型：String  必有字段  备注：无
      id: 1,                //类型：Number  必有字段  备注：无
      photo: "https://nocheckimgs.oss-cn-shenzhen.aliyuncs.com/sysphoto/201910161933137516380054266168204.jpg"                //类型：String  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeName: "相亲相爱一家人",                //类型：String  必有字段  备注：树名
      nickName: "黄大喵",                //类型：String  必有字段  备注：无
      customerId: "1234",                //类型：String  必有字段  备注：无
      id: 2,                //类型：Number  必有字段  备注：无
      photo: "images/miao.png"                //类型：String  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeName: "树的昵称",                //类型：String  必有字段  备注：树名
      nickName: "啊嘞",                //类型：String  必有字段  备注：无
      customerId: "5678",                //类型：String  必有字段  备注：无
      id: 3,                //类型：Number  必有字段  备注：无
      photo: "http://head.expertol.cn/android/96021610705550661.jpg"                //类型：String  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeName: "哎哟真不错",                //类型：String  必有字段  备注：树名
      nickName: "jay",                //类型：String  必有字段  备注：无
      customerId: "1314",                //类型：String  必有字段  备注：无
      id: 4,                //类型：Number  必有字段  备注：无
      photo: "http://head.expertol.cn/android/95291610004652062.jpg"                //类型：String  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeName: "爱爱爱不完",                //类型：String  必有字段  备注：树名
      nickName: "搞饭吃",                //类型：String  必有字段  备注：无
      customerId: "6666",                //类型：String  必有字段  备注：无
      id: 5,                //类型：Number  必有字段  备注：无
      photo: "http://head.expertol.cn/android/43351616381701375.jpg"                //类型：String  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeName: "阴阳怪气",                //类型：String  必有字段  备注：树名
      nickName: "CREAZY112",                //类型：String  必有字段  备注：无
      customerId: "112",                //类型：String  必有字段  备注：无
      id: 6,                //类型：Number  必有字段  备注：无
      photo: "https://nocheckimgs.oss-cn-shenzhen.aliyuncs.com/sysphoto/201910161933137516380054266168204.jpg"                //类型：String  必有字段  备注：无
    },
  ],
  treeRecords: [                //类型：Array  必有字段  备注：树的成长记录
    "凉爽的芒创建了合种",                //类型：String  必有字段  备注：内容
    "TL81接受了邀请"
  ],
  beginDate: "2021-04-20 00:00:00",                //类型：String  必有字段  备注：活动的开始时间
  isLogin: true,                //类型：Boolean  必有字段  备注：无
  treeLevel: 1,                //类型：Number  必有字段  备注：树等级
  appType: 2,                //类型：Number  必有字段  备注：1-兔聊，2-觅伊
  oldLevel: 1,                //类型：Number  可有字段  备注：旧的等级（依据此字段是否弹出升级提醒）
  opPhoto: "http://head.expertol.cn/android/96021610705550661.jpg",                //类型：String  必有字段  备注：对方头像
  opCustomerId: "9602",                //类型：String  必有字段  备注：对方id
  propStatus: 0                //类型：Number  可有字段  备注：道具状态（0-未获得，1-已获得，2-已使用）
},
  // 推荐用户数据
  RecommendUserData = [
    {                //类型：Object  必有字段  备注：无
      nickName: "相互的蛇皮果",                //类型：String  必有字段  备注：无
      customerId: "3726",                //类型：String  必有字段  备注：无
      photo: "https://head.expertol.cn/avatar/161095386621937260.jpeg"                //类型：String  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      nickName: "4335",                //类型：String  必有字段  备注：无
      customerId: "4335",                //类型：String  必有字段  备注：无
      photo: "http://head.expertol.cn/android/43351616381701375.jpg"                //类型：String  必有字段  备注：无
    }
  ],
  // 树的信息数据
  TreeInfoData = {
    sex: 0,                //类型：Number  必有字段  备注：无
    photo: "https://nocheckimgs.oss-cn-shenzhen.aliyuncs.com/sysphoto/201910161933137516380054266168204.jpg",                //类型：String  必有字段  备注：无
    signIns: [                //类型：Array  必有字段  备注：签到记录
      "2021-04-20"                //类型：String  必有字段  备注：签到的日期
    ],
    treeGrowth: 1001,                //类型：Number  必有字段  备注：无
    shareNum: 0,                //类型：Number  必有字段  备注：无
    treeRecords: [                //类型：Array  必有字段  备注：无
      "凉爽的芒创建了合种",                //类型：String  必有字段  备注：无
      "TL81接受了邀请"                //类型：String  必有字段  备注：无
    ],
    beginDate: "2021-04-20 00:00:00",                //类型：String  必有字段  备注：无
    treeLevel: 4,                //类型：Number  必有字段  备注：无
    appType: 2,                //类型：Number  必有字段  备注：无
    customerId: "7981",                //类型：String  必有字段  备注：无
    opPhoto: "http://head.expertol.cn/android/96021610705550661.jpg",                //类型：String  必有字段  备注：无
    opCustomerId: "9602",                //类型：String  必有字段  备注：无
    propStatus: 0                //类型：Number  必有字段  备注：无
  },
  // 排行榜数据
  getActRankData = [
    {                //类型：Object  必有字段  备注：无
      treeLevel: 1,                //类型：Number  必有字段  备注：树等级（依据此字段判断是否接受>0）
      treeName: "一颗树",                //类型：String  必有字段  备注：树名称
      nickName: "凉爽的芒果",                //类型：String  必有字段  备注：无
      customerId: "1234",                //类型：String  必有字段  备注：依据此字段判断是否邀请
      photo: "http://head.expertol.cn/android/96021610705550661.jpg",                //类型：String  必有字段  备注：无
      treeGrowth: 100                //类型：Number  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeLevel: 2,                //类型：Number  必有字段  备注：无
      treeName: "二棵树",                //类型：String  必有字段  备注：无
      nickName: "咳咳",                //类型：String  必有字段  备注：无
      customerId: "5678",                //类型：String  必有字段  备注：无
      photo: "http://head.expertol.cn/android/95291610004652062.jpg",                //类型：String  必有字段  备注：无
      treeGrowth: 1001                //类型：Number  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeLevel: 3,                //类型：Number  必有字段  备注：无
      treeName: "三棵树三棵树",                //类型：String  必有字段  备注：无
      nickName: "咳咳",                //类型：String  必有字段  备注：无
      customerId: "1111",                //类型：String  必有字段  备注：无
      photo: "images/miao.png",                //类型：String  必有字段  备注：无
      treeGrowth: 10000                //类型：Number  必有字段  备注：无
    },
    {                //类型：Object  必有字段  备注：无
      treeLevel: 5,                //类型：Number  必有字段  备注：无
      treeName: "四棵树四棵树四棵树四棵树",                //类型：String  必有字段  备注：无
      nickName: "咳咳",                //类型：String  必有字段  备注：无
      customerId: "3527",                //类型：String  必有字段  备注：无
      photo: "images/miao.png",                //类型：String  必有字段  备注：无
      treeGrowth: 30000                //类型：Number  必有字段  备注：无
    }
  ],
  searchData = {
    nickName: "TL8175",                //类型：String  必有字段  备注：无
    customerId: "7981",                //类型：String  必有字段  备注：无
    photo: "https://nocheckimgs.oss-cn-shenzhen.aliyuncs.com/sysphoto/201910161933137516380054266168204.jpg"
  }