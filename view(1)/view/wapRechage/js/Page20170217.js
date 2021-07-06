/**
 * Created by wuei6 on 2016/9/5.
 */
var $$XWDB_CM = {
//    公共参数
    version: 'WAP',
    techType: 'H5',
    channel: 'wap',
//    hostname: 'wap.js.10086.cn',
    hostname:'http://127.0.0.1:8080',
    //总控是否采集
    collect: true,
    collectRate: 100,
    //上传日志的服务器地址
    url: [

		{
		    "logServer": "http://wap.js.10086.cn/bigdata/v3/init",
		    "method": "POST",
		    "events": ["init"]
		},
		{
		    "logServer": "http://wap.js.10086.cn/bigdata/v3/envir",
		    "method": "POST",
		    "events": ["envir"]
		},
		{
		    "logServer": "http://wap.js.10086.cn/bigdata/v3/inPage",
		    "method": "POST",
		    "events": ["page"]
		},{
		    "logServer": "http://wap.js.10086.cn/bigdata/v3/outPage",
		    "method": "POST",
		    "events": ["outPage"]
		},
		{
		    "logServer": "http://wap.js.10086.cn/bigdata/v3/touch",
		    "method": "POST",
		    "events": ["touch"]
		}
    ],

    //需要向cookie中写入的参数的名称
    cookieName: {
        userInfo: 'userMobileForBigData',
        ch: '_XWBD_channel'
    },
    //需要从URL中获得的参数的名称
    urlParam: {
        channel: 'ch'
    },
//    具体页面
    pages: [
		{//首页  banner图  八宫格
		    url: 'http://wap.js.10086.cn/index.thtml',
		    // 控制页面采集
		    collect: true,
		    pageCode: 'CHONGZHISY',
		    envir: [
		        {
		            envirCode: '30',
		            areaCode: ''
		        } 
		    ],
		    touch : [
		             {
		           	id : 'czpc',// 图片 按钮的ID
		               touchCode : 'HOMECZ_05',
		               nextPageCode : 'CHONGZHI'
		             },
		            {
		            id : 'lele',// 八宫格 按钮的ID
		       	     touchCode : 'HOMECZ_01',
		       	     nextPageCode : 'CHONGZHI'
		       	    },
					{
		            id : 'kdyh',//宽带优惠
		       	     touchCode : 'HOME_KDYH'
		       	    },
					{
					id :"homekd_01",//宽带续费
					 touchCode : 'HOMEKD_01'
					},
					{id :"homekd_02",//新装宽带
					 touchCode : 'HOMEKD_02'
					},
					{id :"homekd_03",//宽带提速
					 touchCode : 'HOMEKD_03'
					},
					{id :"homekd_04",//办宽带右侧的更多按钮
					 touchCode : 'HOMEKD_04'
					},
					{id :"home_4G",//用4G楼层右侧更多按钮
					 touchCode : 'HOME_4G'
					},
					{id :"home_4GSJ",//4G手机
					 touchCode : 'HOME_4GSJ'
					},
					{id :"home_back",//返回顶部悬浮按钮
					 touchCode : 'HOME_BACK'
					},
					{id :"home_bzb",//标准版
					 touchCode : 'HOME_BZB'
					},
					{id :"home_cpb",//触屏版
					 touchCode : 'HOME_CPB'
					},
					{id :"home_dl",//登录切换
					 touchCode : 'HOME_DL'
					},
					{id :"home_dnb",//电脑版
					 touchCode : 'HOME_DNB'
					},
					{id :"home_dyrx",//当月热销
					 touchCode : 'HOME_DYRX'
					},
					{id :"home_fx",//底部导航-发现
					 touchCode : 'HOME_FX'
					},
					{id :"home_gd",//更多
					 touchCode : 'HOME_GD'
					},
					{id :"home_kdgg",//办宽带楼层图片广告
					 touchCode : 'HOME_KDGG'
					},
					{id :"home_khd",//客户端
					 touchCode : 'HOME_KHD'
					},
		            {id :"home_khfw",//客户服务
					 touchCode : 'HOME_KHFW'
					},
					{id :"home_llb",//4G流量包
					 touchCode : 'HOME_LLB'
					},
					{id :"home_llf",//让流量红包飞
					 touchCode : 'HOME_LLF'
					},
					{id :"home_llgg",//用4G楼层图片广告
					 touchCode : 'HOME_LLGG'
					},
					{id :"home_llzq",//流量专区
					 touchCode : 'HOME_LLZQ'
					},
					{id :"home_mrqd",//每日签到
					 touchCode : 'HOME_MRQD'
					},
					{id :"home_sc",//加入收藏
					 touchCode : 'HOME_SC'
					},
					{id :"home_sjgg1",//买手机楼层图片广告
					 touchCode : 'HOME_SJGG1'
					},
					{id :"home_sjgg2",//买手机楼层左侧图片广告
					 touchCode : 'HOME_SJGG2'
					},
					{id :"home_sjgg3",//买手机楼层右侧上方图片广告
					 touchCode : 'HOME_SJGG3'
					},
					{id :"home_sjgg4",//买手机楼层右侧下方图片广告
					 touchCode : 'HOME_SJGG4'
					},
					{id :"home_sjsc",//手机商城
					 touchCode : 'HOME_SJSC'
					},
					{id :"home_sjsc1",//买手机楼层右侧更多按钮
					 touchCode : 'HOME_SJSC1'
					},
					{id :"home_ss",//搜索按钮
					 touchCode : 'HOME_SS'
					},
					{id :"home_sy",//底部导航-首页
					 touchCode : 'HOME_SY'
					},
					{id :"home_tc",//4G套餐
					 touchCode : 'HOME_TC'
					},
					{id :"home_tcyl",//套餐余量
					 touchCode : 'HOME_TCYL'
					},
					{id :"home_vol",//volte专区
					 touchCode : 'HOME_VOL'
					},
					{id :"home_wd",//底部导航-我的
					 touchCode : 'HOME_WD'
					},
					{id :"home_xsh",//享生活楼层右侧更多按钮
					 touchCode : 'HOME_XSH'
					},
					{id :"home_xshds",//享生活楼层切换地市按钮
					 touchCode : 'HOME_XSHDS'
					},
					{id :"home_xshgg1",//享生活楼层左侧营销位
					 touchCode : 'HOME_XSHGG1'
					},
					{id :"home_xshgg2",//享生活楼层右侧第一个营销位
					 touchCode : 'HOME_XSHGG2'
					},
					{id :"home_xshgg3",//享生活楼层右侧第二个营销位
					 touchCode : 'HOME_XSHGG3'
					},
					{id :"home_xshgg4",//享生活楼层右侧第三个营销位
					 touchCode : 'HOME_XSHGG4'
					},
					{id :"home_xz",//掌厅客户端下载提示栏
					 touchCode : 'HOME_XZ'
					},
					{id :"home_yhj",//优惠券
					 touchCode : 'HOME_YHJ'
					},
					{id :"home_ykyw",//已开服务
					 touchCode : 'HOME_YKYW'
					},
					{id :"home_ywbl",//业务办理
					 touchCode : 'HOME_YWBL'
					},
					{id :"home_yytyh",//营业厅优惠
					 touchCode : 'HOME_YYTYH'
					},
					{id :"home_zb",//底部导航-周边
					 touchCode : 'HOME_ZB'
					},
					{id :"home_zdcx",//账单查询
					 touchCode : 'HOME_ZDCX'
					},
					{id : "home_tll",//淘流量
					 touchCode : "HOME_TLL" 	
					},
					{id : "home_lcpd",//理财频道
					 touchCode : "HOME_LCPD"	
					},
					{
					 id : "home_SJGJ",//手机估价
					 touchCode : "HOME_SJGJ"
					},
					{
					 id : "szjt_04",//数字家庭更多
					 touchCode : "SZJT_04"
					},
					{id : "home_szjt",//数字家庭楼层图片广告
					 touchCode : "HOME_SZJT"	
					},
					{
					 id : "szjt_01",//数字家庭楼层下方第一个营销位
					 touchCode : "SZJT_01"
					},
					{
					 id : "szjt_02",//数字家庭楼层下方第二个营销位
					 touchCode : "SZJT_02"	
					},
					{
					 id : "szjt_03",//数字家庭楼层下方第三个营销位
					 touchCode : "SZJT_03"	
					}
		             
		           ]
		},{
			//首页  banner图  八宫格
		    url: 'http://wap.js.10086.cn/index.html',
		    // 控制页面采集
		    collect: true,
		    pageCode: 'CHONGZHISY',
		    envir: [
		        {
		            envirCode: '30',
		            areaCode: ''
		        } 
		    ],
		    touch : [
		             {
		           	id : 'czpc',// 图片 按钮的ID
		               touchCode : 'HOMECZ_05',
		               nextPageCode : 'CHONGZHI'
		             },
		            {
		            id : 'lele',// 八宫格 按钮的ID
		       	     touchCode : 'HOMECZ_01',
		       	     nextPageCode : 'CHONGZHI'
		       	    },
					{
		            id : 'kdyh',//宽带优惠
		       	     touchCode : 'HOME_KDYH'
		       	    },
					{
					id :"homekd_01",//宽带续费
					 touchCode : 'HOMEKD_01'
					},
					{id :"homekd_02",//新装宽带
					 touchCode : 'HOMEKD_02'
					},
					{id :"homekd_03",//宽带提速
					 touchCode : 'HOMEKD_03'
					},
					{id :"homekd_04",//办宽带右侧的更多按钮
					 touchCode : 'HOMEKD_04'
					},
					{id :"home_4G",//用4G楼层右侧更多按钮
					 touchCode : 'HOME_4G'
					},
					{id :"home_4GSJ",//4G手机
					 touchCode : 'HOME_4GSJ'
					},
					{id :"home_back",//返回顶部悬浮按钮
					 touchCode : 'HOME_BACK'
					},
					{id :"home_bzb",//标准版
					 touchCode : 'HOME_BZB'
					},
					{id :"home_cpb",//触屏版
					 touchCode : 'HOME_CPB'
					},
					{id :"home_dl",//登录切换
					 touchCode : 'HOME_DL'
					},
					{id :"home_dnb",//电脑版
					 touchCode : 'HOME_DNB'
					},
					{id :"home_dyrx",//当月热销
					 touchCode : 'HOME_DYRX'
					},
					{id :"home_fx",//底部导航-发现
					 touchCode : 'HOME_FX'
					},
					{id :"home_gd",//更多
					 touchCode : 'HOME_GD'
					},
					{id :"home_kdgg",//办宽带楼层图片广告
					 touchCode : 'HOME_KDGG'
					},
					{id :"home_khd",//客户端
					 touchCode : 'HOME_KHD'
					},
		            {id :"home_khfw",//客户服务
					 touchCode : 'HOME_KHFW'
					},
					{id :"home_llb",//4G流量包
					 touchCode : 'HOME_LLB'
					},
					{id :"home_llf",//让流量红包飞
					 touchCode : 'HOME_LLF'
					},
					{id :"home_llgg",//用4G楼层图片广告
					 touchCode : 'HOME_LLGG'
					},
					{id :"home_llzq",//流量专区
					 touchCode : 'HOME_LLZQ'
					},
					{id :"home_mrqd",//每日签到
					 touchCode : 'HOME_MRQD'
					},
					{id :"home_sc",//加入收藏
					 touchCode : 'HOME_SC'
					},
					{id :"home_sjgg1",//买手机楼层图片广告
					 touchCode : 'HOME_SJGG1'
					},
					{id :"home_sjgg2",//买手机楼层左侧图片广告
					 touchCode : 'HOME_SJGG2'
					},
					{id :"home_sjgg3",//买手机楼层右侧上方图片广告
					 touchCode : 'HOME_SJGG3'
					},
					{id :"home_sjgg4",//买手机楼层右侧下方图片广告
					 touchCode : 'HOME_SJGG4'
					},
					{id :"home_sjsc",//手机商城
					 touchCode : 'HOME_SJSC'
					},
					{id :"home_sjsc1",//买手机楼层右侧更多按钮
					 touchCode : 'HOME_SJSC1'
					},
					{id :"home_ss",//搜索按钮
					 touchCode : 'HOME_SS'
					},
					{id :"home_sy",//底部导航-首页
					 touchCode : 'HOME_SY'
					},
					{id :"home_tc",//4G套餐
					 touchCode : 'HOME_TC'
					},
					{id :"home_tcyl",//套餐余量
					 touchCode : 'HOME_TCYL'
					},
					{id :"home_vol",//volte专区
					 touchCode : 'HOME_VOL'
					},
					{id :"home_wd",//底部导航-我的
					 touchCode : 'HOME_WD'
					},
					{id :"home_xsh",//享生活楼层右侧更多按钮
					 touchCode : 'HOME_XSH'
					},
					{id :"home_xshds",//享生活楼层切换地市按钮
					 touchCode : 'HOME_XSHDS'
					},
					{id :"home_xshgg1",//享生活楼层左侧营销位
					 touchCode : 'HOME_XSHGG1'
					},
					{id :"home_xshgg2",//享生活楼层右侧第一个营销位
					 touchCode : 'HOME_XSHGG2'
					},
					{id :"home_xshgg3",//享生活楼层右侧第二个营销位
					 touchCode : 'HOME_XSHGG3'
					},
					{id :"home_xshgg4",//享生活楼层右侧第三个营销位
					 touchCode : 'HOME_XSHGG4'
					},
					{id :"home_xz",//掌厅客户端下载提示栏
					 touchCode : 'HOME_XZ'
					},
					{id :"home_yhj",//优惠券
					 touchCode : 'HOME_YHJ'
					},
					{id :"home_ykyw",//已开服务
					 touchCode : 'HOME_YKYW'
					},
					{id :"home_ywbl",//业务办理
					 touchCode : 'HOME_YWBL'
					},
					{id :"home_yytyh",//营业厅优惠
					 touchCode : 'HOME_YYTYH'
					},
					{id :"home_zb",//底部导航-周边
					 touchCode : 'HOME_ZB'
					},
					{id :"home_zdcx",//账单查询
					 touchCode : 'HOME_ZDCX'
					},
					{id : "home_tll",//淘流量
					 touchCode : "HOME_TLL" 	
					},
					{id : "home_lcpd",//理财频道
					 touchCode : "HOME_LCPD"	
					},
					{
					 id : "home_SJGJ",//手机估价
					 touchCode : "HOME_SJGJ"
					},
					{
					 id : "szjt_04",//数字家庭更多
					 touchCode : "SZJT_04"
					},
					{id : "home_szjt",//数字家庭楼层图片广告
					 touchCode : "HOME_SZJT"	
					},
					{
					 id : "szjt_01",//数字家庭楼层下方第一个营销位
					 touchCode : "SZJT_01"
					},
					{
					 id : "szjt_02",//数字家庭楼层下方第二个营销位
					 touchCode : "SZJT_02"	
					},
					{
					 id : "szjt_03",//数字家庭楼层下方第三个营销位
					 touchCode : "SZJT_03"	
					}
		             
		           ]
		
		},{//当月热销充值 
		    url: 'http://wap.js.10086.cn/YHHD.thtml',
		    // 控制页面采集
		    collect: true,
		    pageCode: 'CHONGZHISYRX',
		    envir: [
		        {
		            envirCode: '29',
		            areaCode: ''
		        } 
		    ],
		    touch : [
		      {
		    	id : 'dyrxcz2',//   按钮的ID
		        touchCode : 'DYRX_01',
		        nextPageCode : 'CHONGZHI'
		      },{
		    	  id : 'dyrxczz1',//   按钮的ID
			      touchCode : 'DYRX_01',
			      nextPageCode : 'CHONGZHI'	
		      }
		    ]
		    },{
		    	//当月热销充值 
			    url: 'http://wap.js.10086.cn/YHHD.html',
			    // 控制页面采集
			    collect: true,
			    pageCode: 'CHONGZHISYRX',
			    envir: [
			        {
			            envirCode: '29',
			            areaCode: ''
			        } 
			    ],
			    touch : [
			      {
			    	id : 'dyrxcz2',//   按钮的ID
			        touchCode : 'DYRX_01',
			        nextPageCode : 'CHONGZHI'
			      },{
			    	  id : 'dyrxczz1',//   按钮的ID
				      touchCode : 'DYRX_01',
				      nextPageCode : 'CHONGZHI'	
			      }
			    ]
			    
		    },{//账单查询  在线充值
		        url: 'http://wap.js.10086.cn/ZDCX.thtml',
		        // 控制页面采集
		        collect: true,
		        pageCode: 'V3ZDCXCZ',
		        envir: [
		            {
		                envirCode: '28',
		                areaCode: ''
		            }
		        ],
		        touch : [
		            {
		               	id : 'zdcxcz3',//   按钮的ID
		   		        touchCode : 'ZDCX_CZ'//暂时不知道账单查询的在线充值
		   	        }
		         ]
		    },{
		    	//账单查询  在线充值
		        url: 'http://wap.js.10086.cn/ZDCX.html',
		        // 控制页面采集
		        collect: true,
		        pageCode: 'V3ZDCXCZ',
		        envir: [
		            {
		                envirCode: '28',
		                areaCode: ''
		            }
		        ],
		        touch : [
		            {
		               	id : 'zdcxcz3',//   按钮的ID
		   		        touchCode : 'ZDCX_CZ'//暂时不知道账单查询的在线充值
		   	        }
		         ]
		    
		    },
		{//现网上是WSCZYL
		   url: 'http://wap.js.10086.cn/WSCZYL.thtml',
		    // 控制页面采集
		    collect: true,
		    pageCode: 'CHONGZHI',
		    envir: [
		        {
		            envirCode: '31',
		            areaCode: ''
		        }
		    ],
		    touch : [ {
				id : 'moneyid',// 现金充值TAB 按钮的ID
				touchCode : 'CZSY_02',
				areaName : ''
			},{
				id : 'cashid',// 充值卡充值TAB 按钮的ID
				touchCode : 'CZSY_04',
				areaName : 'CZKCZ'
			},{
				id : 'wlwid',//物联网充值
				touchCode : 'CZSY_WULIAN',
				areaName : 'WLWCZ'
			}		
			,{
				id : 'mobile',// 充值号码输入 按钮的ID
				touchCode : 'CZSY_05'
			},{
				id : 'mobilePic',// 通讯录输入 按钮的ID
				touchCode : 'CZSY_06'
			},{
				id : '10y',// 充值金额-10元 按钮的ID
				touchCode : 'CZSY_07'
			},{
				id : '30y',// 充值金额-30元 按钮的ID
				touchCode : 'CZSY_08'
			},{
				id : '50y',// 充值金额-50元 按钮的ID
				touchCode : 'CZSY_09'
			},{
				id : '100y',// 充值金额-100元 按钮的ID
				touchCode : 'CZSY_10'
			},{
				id : '200y',// 充值金额-200元 按钮的ID
				touchCode : 'CZSY_11'
			},{
				id : '500y',// 充值金额-500元 按钮的ID
				touchCode : 'CZSY_12'
			},{
				id : 'czyhq1',// 优惠券列表 按钮的ID
				touchCode : 'CZSY_14'
			},{
				id : 'czyhq2',// 优惠券列表 按钮的ID
				touchCode : 'CZSY_14'
			},{
				id : 'fastZF',// 支付方式-快捷支付 按钮的ID
				touchCode : 'CZSY_15'
			},{
				id : 'zfbZF',// 支付方式-支付宝 按钮的ID
				touchCode : 'CZSY_16'
			},{
				id : 'wxZF',// 支付方式-微信支付 按钮的ID
				touchCode : 'CZSY_17'
			},{
				id : 'zgylZF',// 支付方式-中国银联 按钮的ID
				touchCode : 'CZSY_18'
			},{
				id : 'jhzcZF',// 支付方式-建行直充 按钮的ID
				touchCode : 'CZSY_19'
			},{
				id : 'sjZF',// 支付方式-荷包支付
				touchCode : 'CZSY_20'
			},{
				id : 'czlsjl',// 充值历史记录 按钮的ID
				touchCode : 'CZSY_21',
				nextPage : 'true'
			},{
				id : 'czxz',// 充值须知 按钮的ID
				touchCode : 'CZSY_22',
				nextPage : 'true'
			},{
				id : 'czBtn',// 立即充值按钮 按钮的ID
				touchCode : 'CZSY_23',
				nextPage : 'true'
			},{
				id : 'czqrczback',// 支付宝 微信 建行直充 中国银联支付 本页面确认订单 按钮的ID
				touchCode : 'CZSY_28'
			},{
				id : 'czback',// 支付宝 微信 建行直充 中国银联支付 本页面订单返回 按钮的ID
				touchCode : 'CZSY_29'
			},{
				id : 'czbackCZSY_30',//充值返回按钮
				touchCode : 'CZSY_30'
			}
		    
			]
		},{
			//现网上是WSCZYL
			   url: 'http://wap.js.10086.cn/WSCZYL.html',
			    // 控制页面采集
			    collect: true,
			    pageCode: 'CHONGZHI',
			    envir: [
			        {
			            envirCode: '31',
			            areaCode: ''
			        }
			    ],
			    touch : [ {
					id : 'moneyid',// 现金充值TAB 按钮的ID
					touchCode : 'CZSY_02',
					areaName : ''
				},{
					id : 'cashid',// 充值卡充值TAB 按钮的ID
					touchCode : 'CZSY_04',
					areaName : 'CZKCZ'
				},
				{
				id : 'wlwid',//物联网充值
				touchCode : 'CZSY_WULIAN',
				areaName : 'WLWCZ'
				},
				{
					id : 'mobile',// 充值号码输入 按钮的ID
					touchCode : 'CZSY_05'
				},{
					id : 'mobilePic',// 通讯录输入 按钮的ID
					touchCode : 'CZSY_06'
				},{
					id : '10y',// 充值金额-10元 按钮的ID
					touchCode : 'CZSY_07'
				},{
					id : '30y',// 充值金额-30元 按钮的ID
					touchCode : 'CZSY_08'
				},{
					id : '50y',// 充值金额-50元 按钮的ID
					touchCode : 'CZSY_09'
				},{
					id : '100y',// 充值金额-100元 按钮的ID
					touchCode : 'CZSY_10'
				},{
					id : '200y',// 充值金额-200元 按钮的ID
					touchCode : 'CZSY_11'
				},{
					id : '500y',// 充值金额-500元 按钮的ID
					touchCode : 'CZSY_12'
				},{
					id : 'czyhq1',// 优惠券列表 按钮的ID
					touchCode : 'CZSY_14'
				},{
					id : 'czyhq2',// 优惠券列表 按钮的ID
					touchCode : 'CZSY_14'
				},{
					id : 'fastZF',// 支付方式-快捷支付 按钮的ID
					touchCode : 'CZSY_15'
				},{
					id : 'zfbZF',// 支付方式-支付宝 按钮的ID
					touchCode : 'CZSY_16'
				},{
					id : 'wxZF',// 支付方式-微信支付 按钮的ID
					touchCode : 'CZSY_17'
				},{
					id : 'zgylZF',// 支付方式-中国银联 按钮的ID
					touchCode : 'CZSY_18'
				},{
					id : 'jhzcZF',// 支付方式-建行直充 按钮的ID
					touchCode : 'CZSY_19'
				},{
					id : 'sjZF',// 支付方式-荷包支付
					touchCode : 'CZSY_20'
				},
				{
					id : 'czlsjl',// 充值历史记录 按钮的ID
					touchCode : 'CZSY_21',
					nextPage : 'true'
				},{
					id : 'czxz',// 充值须知 按钮的ID
					touchCode : 'CZSY_22',
					nextPage : 'true'
				},{
					id : 'czBtn',// 立即充值按钮 按钮的ID
					touchCode : 'CZSY_23',
					nextPage : 'true'
				},{
					id : 'czqrczback',// 支付宝 微信 建行直充 中国银联支付 本页面确认订单 按钮的ID
					touchCode : 'CZSY_28'
				},{
					id : 'czback',// 支付宝 微信 建行直充 中国银联支付 本页面订单返回 按钮的ID
					touchCode : 'CZSY_29'
				},{
					id : 'czbackCZSY_30',//充值返回按钮
					touchCode : 'CZSY_30'
				}
			    
				]
			
		},{
          //在现网上使用的是QUICKPAYMENT.html
            url: 'http://wap.js.10086.cn/QUICKPAYMENT.thtml',
            // 控制页面采集
            collect: true,
            pageCode: 'CHONGZHIKQZF',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ],
            touch : [ {
             			id : 'kqzfdingdan',// 快捷支付 订单确认 按钮的ID
             			touchCode : 'CZDDQR_01'
                    },{
                	   id : 'kqzfdingdanok',// 快捷支付 支付完成 按钮的ID
             			touchCode : 'CZDDQR_02'
             		}
                     
             		]        
		},{

	          //在现网上使用的是QUICKPAYMENT.html
	            url: 'http://wap.js.10086.cn/QUICKPAYMENT.html',
	            // 控制页面采集
	            collect: true,
	            pageCode: 'CHONGZHIKQZF',
	            envir: [
	                {
	                    envirCode: '30',
	                    areaCode: ''
	                }
	            ],
	            touch : [ {
	             			id : 'kqzfdingdan',// 快捷支付 订单确认 按钮的ID
	             			touchCode : 'CZDDQR_01'
	                    },{
	                	   id : 'kqzfdingdanok',// 快捷支付 支付完成 按钮的ID
	             			touchCode : 'CZDDQR_02'
	             		}
	                     
	             		]        
			
		},{
          //充值优惠券
            url: 'http://wap.js.10086.cn/SINGLEYHQKQ.thtml',
            // 控制页面采集
            collect: true,
            pageCode: 'CHONGZHIYHQ',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ],
            touch : [ {
             			id : 'cz_yhq',
             			touchCode : 'CZ_YHQ'
                    }
            
             		]        
		},{

	          //充值优惠券
	            url: 'http://wap.js.10086.cn/SINGLEYHQKQ.html',
	            // 控制页面采集
	            collect: true,
	            pageCode: 'CHONGZHIYHQ',
	            envir: [
	                {
	                    envirCode: '30',
	                    areaCode: ''
	                }
	            ],
	            touch : [ {
	             			id : 'cz_yhq',
	             			touchCode : 'CZ_YHQ'
	                    }
	            
	             		]        
			
		},
	    {
            //现网请求地址
            url: 'http://wap.js.10086.cn/WSCZNEWHISTORY.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'CHONGZHISTORY',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
		{
            //现网请求地址
            url: 'http://wap.js.10086.cn/WSCZNEWHISTORY.html',
            //控制页面采集
            collect: true,
            pageCode: 'CHONGZHISTORY',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
 
        {
            //现网请求地址
            url: 'http://wap.js.10086.cn/LLKCB.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'LLKCB',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
        {
            //现网请求地址
            url: 'http://wap.js.10086.cn/PPTCBG.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'PPTCBG',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
        {
            //现网请求地址
            url: 'http://wap.js.10086.cn/ZXTC.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'ZXTC',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
        {
            //现网请求地址
            url: 'http://wap.js.10086.cn/GPRS4G.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'GPRS4G',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
        {
            //现网请求地址
            url: 'http://wap.js.10086.cn/JRLLTC.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'JRLLTC',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
        {
            //现网请求地址
            url: 'http://wap.js.10086.cn/YJZYLL.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'YJZYLL',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },
        {
            //现网请求地址
            url: 'http://wap.js.10086.cn/ZSLLB.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'ZSLLB',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        }, {
            //现网请求地址
            url: 'http://wap.js.10086.cn/GPRSDJB.thtml',
            //控制页面采集
            collect: true,
            pageCode: 'GPRSDJB',
            envir: [
                {
                    envirCode: '30',
                    areaCode: ''
                }
            ]
        },{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzMain.html',//自助排障
			collect :true,
			pageCode: 'zzpzMain',
			envir: [
                {
                    envirCode: '35',
                    areaCode: '35'
                }
            ],
			touch : [
			      {
			    	id : 'kdaz',//宽带安装
			        touchCode : 'ZT_P_KDAZ'
			      },{
					  id : 'sblj',//设备连接
					  touchCode : 'ZT_P_KDAZ_01'
			      },{
					 id : 'wkcz',//网卡操作
			        touchCode : 'ZT_P_KDAZ_02'
				  },{
					 id : 'bhszz',//拨号设置
			        touchCode : 'ZT_P_KDAZ_03'
				  },{
					 id : 'dtdnsw',//多台电脑上网
			        touchCode : 'ZT_P_KDAZ_04'
				  },{
					 id : 'gzzcl',//故障自处理
			        touchCode : 'ZT_P_GZZCL'
				  },{
					 id : 'bljnsw',//不能连接上网
			        touchCode : 'ZT_P_GZZCL_01'
				  },{
					 id : 'wydbk',//网页打不开
			        touchCode : 'ZT_P_GZZCL_02'
				  },{
					 id : 'wshm',//网速很慢
			        touchCode : 'ZT_P_GZZCL_03'
				  },{
					 id : 'swjcdx',//上网经常断线
			        touchCode : 'ZT_P_GZZCL_04'
				  },{
					 id : 'qtgz',//其它故障
			        touchCode : 'ZT_P_GZZCL_05'
				  },{
					 id : 'cjcwdm',//常见错误代码
			        touchCode : 'ZT_P_CJCWDM'
				  },{
					 id : 'cw691',//
			        touchCode : 'ZT_P_CJCWDM_01'
				  },{
					 id : 'cw678',//
			        touchCode : 'ZT_P_CJCWDM_02'
				  },{
					 id : 'cw769',//
			        touchCode : 'ZT_P_CJCWDM_03'
				  },{
					 id : 'cw734',//
			        touchCode : 'ZT_P_CJCWDM_04'
				  },{
					 id : 'cw619',//
			        touchCode : 'ZT_P_CJCWDM_05'
				  },{
					 id : 'cw718',//
			        touchCode : 'ZT_P_CJCWDM_06'
				  },{
					 id : 'cw604',//
			        touchCode : 'ZT_P_CJCWDM_07'
				  },{
					 id : 'cw645',//
			        touchCode : 'ZT_P_CJCWDM_08'
				  },{
					 id : 'cw650',//
			        touchCode : 'ZT_P_CJCWDM_09'
				  },{
					 id : 'cw720',//
			        touchCode : 'ZT_P_CJCWDM_10'
				  },{
					 id : 'cw617',//
			        touchCode : 'ZT_P_CJCWDM_11'
				  },{
					 id : 'qtdm',//
			        touchCode : 'ZT_P_CJCWDM_12'
				  },{
					 id : 'wlzs',//
			        touchCode : 'ZT_P_WLZS'
				  },{
					 id : 'DNSjs',//
			        touchCode : 'ZT_P_WLZS_01'
				  },{
					 id : 'DNSsz',//
			        touchCode : 'ZT_P_WLZS_02'
				  },{
					 id : 'yhswgcjs',//
			        touchCode : 'ZT_P_WLZS_03'
				  },{
					 id : 'wscs',//
			        touchCode : 'ZT_P_WLZS_04'
				  },{
					 id : 'cyml',//
			        touchCode : 'ZT_P_CJML'
				  },{
					 id : 'Pingsyff',//
			        touchCode : 'ZT_P_CJML_01'
				  },{
					 id : 'ipconfigsyff',//
			        touchCode : 'ZT_P_CJML_02'
				  },{
					 id : 'aqfbd',//
			        touchCode : 'ZT_P_AQFBD'
				  },{
					 id : 'aqfbd2',//
			        touchCode : 'ZT_P_AQFBD_01'
				  },{
					 id : 'zxkf',//在线客服
			        touchCode : 'ZT_P_ZXKF'
				  },{
					id : 'rx',//10086
			        touchCode : 'ZT_NO'
				  }
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=01',//设备连接
			collect :true,
			pageCode: 'zzpzDetail_01',
			envir: [
                {
                    envirCode: '36',
                    areaCode: '36'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_001'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_001'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=02',//网卡操作
			collect :true,
			pageCode: 'zzpzDetail_02',
			envir: [
                {
                    envirCode: '37',
                    areaCode: '37'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_002'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_002'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=03',//拨号设置
			collect :true,
			pageCode: 'zzpzDetail_03',
			envir: [
                {
                    envirCode: '38',
                    areaCode: '38'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_003'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_003'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=04',//多台电脑上网
			collect :true,
			pageCode: 'zzpzDetail_04',
			envir: [
                {
                    envirCode: '39',
                    areaCode: '39'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_004'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_004'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=05',//不能连接上网
			collect :true,
			pageCode: 'zzpzDetail_05',
			envir: [
                {
                    envirCode: '40',
                    areaCode: '40'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_005'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_005'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=06',//网页打不开
			collect :true,
			pageCode: 'zzpzDetail_06',
			envir: [
                {
                    envirCode: '41',
                    areaCode: '41'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_006'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_006'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=07',//网速缓慢
			collect :true,
			pageCode: 'zzpzDetail_07',
			envir: [
                {
                    envirCode: '42',
                    areaCode: '42'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_007'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_007'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=08',//上网经常断线
			collect :true,
			pageCode: 'zzpzDetail_08',
			envir: [
                {
                    envirCode: '43',
                    areaCode: '43'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_008'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_008'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=09',//其它故障
			collect :true,
			pageCode: 'zzpzDetail_09',
			envir: [
                {
                    envirCode: '44',
                    areaCode: '44'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_009'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_009'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=10',//错误691
			collect :true,
			pageCode: 'zzpzDetail_10',
			envir: [
                {
                    envirCode: '45',
                    areaCode: '45'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_010'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_010'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=11',//错误678
			collect :true,
			pageCode: 'zzpzDetail_11',
			envir: [
                {
                    envirCode: '46',
                    areaCode: '46'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_011'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_011'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=12',//错误769
			collect :true,
			pageCode: 'zzpzDetail_12',
			envir: [
                {
                    envirCode: '47',
                    areaCode: '47'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_012'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_012'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=13',//错误734
			collect :true,
			pageCode: 'zzpzDetail_13',
			envir: [
                {
                    envirCode: '48',
                    areaCode: '48'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_013'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_013'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=14',//错误619
			collect :true,
			pageCode: 'zzpzDetail_14',
			envir: [
                {
                    envirCode: '49',
                    areaCode: '49'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_014'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_014'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=15',//错误718
			collect :true,
			pageCode: 'zzpzDetail_15',
			envir: [
                {
                    envirCode: '50',
                    areaCode: '50'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_015'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_015'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=16',//错误606
			collect :true,
			pageCode: 'zzpzDetail_16',
			envir: [
                {
                    envirCode: '51',
                    areaCode: '51'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_016'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_016'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=17',//错误645
			collect :true,
			pageCode: 'zzpzDetail_17',
			envir: [
                {
                    envirCode: '52',
                    areaCode: '52'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_017'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_017'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=18',//错误650
			collect :true,
			pageCode: 'zzpzDetail_18',
			envir: [
                {
                    envirCode: '53',
                    areaCode: '53'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_018'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_018'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=19',//错误720
			collect :true,
			pageCode: 'zzpzDetail_19',
			envir: [
                {
                    envirCode: '54',
                    areaCode: '54'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_019'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_019'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=20',//错误617
			collect :true,
			pageCode: 'zzpzDetail_20',
			envir: [
                {
                    envirCode: '55',
                    areaCode: '55'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_020'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_020'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=21',//其它
			collect :true,
			pageCode: 'zzpzDetail_21',
			envir: [
                {
                    envirCode: '56',
                    areaCode: '56'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_021'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_021'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=22',//DNS介绍
			collect :true,
			pageCode: 'zzpzDetail_22',
			envir: [
                {
                    envirCode: '57',
                    areaCode: '57'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_022'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_022'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=23',//DNS设置
			collect :true,
			pageCode: 'zzpzDetail_23',
			envir: [
                {
                    envirCode: '58',
                    areaCode: '58'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_023'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_023'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=24',//用户上网过程介绍
			collect :true,
			pageCode: 'zzpzDetail_24',
			envir: [
                {
                    envirCode: '59',
                    areaCode: '59'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_024'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_024'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=25',//网速常识
			collect :true,
			pageCode: 'zzpzDetail_25',
			envir: [
                {
                    envirCode: '60',
                    areaCode: '60'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_025'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_025'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=26',//ping使用方法
			collect :true,
			pageCode: 'zzpzDetail_26',
			envir: [
                {
                    envirCode: '61',
                    areaCode: '61'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_026'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_026'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=27',//ipconfig使用方法
			collect :true,
			pageCode: 'zzpzDetail_27',
			envir: [
                {
                    envirCode: '62',
                    areaCode: '62'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_027'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_027'
				}
			]
		},{
			url: 'http://wap.js.10086.cn/userfiles/page/zzpzDetail.html?questionId=28',//安全防病毒
			collect :true,
			pageCode: 'zzpzDetail_28',
			envir: [
                {
                    envirCode: '63',
                    areaCode: '63'
                }
            ],
			touch : [
				{
				 id : 'zxkff',//在线客服
				 touchCode : 'ZT_P_ZXKF_028'
				},{
				 id : 'rxx',//10086
				touchCode : 'ZT_NO_028'
				}
			]
		},
  //登陆页

{
			url: 'http://wap.js.10086.cn/login.thtml',
			collect :true,
			pageCode: 'wap_tlogin',
			envir: [
                {
                    envirCode: 'login'
                }
            ]
			
		}


    ],

    pageStream: []
};

