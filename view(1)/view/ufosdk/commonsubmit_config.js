/*var COMMONSUBMIT_CONFIG = {
    // 产品线appid
    '210431': {
        // 页面分类，0表示默认页面
        '0': {
            head: {
                title: {
                    hidden: false,
                    content: '意见反馈',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'textarea',
                title: '详细说明',
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'
            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页
        },
    },
    // 产品线appid
    '517': {
        // 页面分类，0表示默认页面
        '0': {
            head: {
                title: {
                    hidden: false,
                    content: '对搜索结果不满意',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'input',
                title: '搜索关键词',
                link: {
                    linkText: '如何获取索引链接',
                    linkUrl: '/?m=Client&a=commonanswer&appid=517&qaid=1'
                },
                placeholder: '如：大众点评网',
                required: false,
                to: 'kw'
            }, {
                type: 'select',
                title: '请选择您的问题',
                options: [{
                    text: '搜索结果太旧',
                    value: 12807
                }, {
                    text: '定位地点不准',
                    value: 12808
                }, {
                    text: '搜索结果打不开',
                    value: 12809
                }, {
                    text: '结果涉及色情或反动',
                    value: 12810
                }, {
                    text: '重复结果太多',
                    value: 12811
                }, {
                    text: '搜索推广有虚假广告',
                    value: 12812
                }, {
                    text: '其他问题',
                    value: 12308
                }],
                to: 'daily_type'
            }, {
                type: 'textarea',
                title: '详细说明',
                link: {
                    linkText: '常见解决办法',
                    linkUrl: '/?m=Client&a=commonanswer&appid=517&qaid=1'
                },
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'

            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(便于我们将处理结果通知您)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页
        },
        '1': {
            head: {
                title: {
                    hidden: false,
                    content: '对搜索结果不满意',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'input',
                title: '搜索关键词',
                placeholder: '如：我是歌手',
                required: true,
                to: 'kw'
            }, {
                type: 'select',
                title: '请选择您的问题',
                options: [{
                    text: '搜索结果太旧',
                    value: 12807
                }, {
                    text: '定位地点不准',
                    value: 12808
                }, {
                    text: '搜索结果打不开',
                    value: 12809
                }, {
                    text: '结果涉及色情或反动',
                    value: 12810
                }, {
                    text: '重复结果太多',
                    value: 12811
                }, {
                    text: '搜索推广有虚假广告',
                    value: 12812
                }, {
                    text: '其他问题',
                    value: 12308
                }],
                to: 'daily_type'

            }, {
                type: 'textarea',
                title: '详细说明',
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'


            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页

        },
        '2': {
            head: {
                title: {
                    hidden: false,
                    content: '删除搜索结果',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'input',
                title: '索引链接',
                link: {
                    linkText: '如何获取索引链接',
                    linkUrl: '/?m=Client&a=commonanswer&appid=517&qaid=1'
                },
                required: true,
                to: 'wr'

            }, {
                type: 'select',
                title: '请选择您的问题',
                options: [{
                    text: '删除搜索结果',
                    value: 12309

                }, {
                    text: '举报不良信息',
                    value: 12310
                }],
                to: 'daily_type'

            }, {
                type: 'textarea',
                title: '详细说明',
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'


            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页

        },
        '3': {
            head: {
                title: {
                    hidden: false,
                    content: '删除搜索提示词',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'input',
                title: '搜索关键词',
                required: true,
                to: 'kw'
            }, {
                type: 'select',
                title: '提示词类型',
                options: [{
                    text: '搜索框下拉提示词',
                    value: 12311
                }, {
                    text: '相关搜索',
                    value: 12312
                }, {
                    text: '搜索推荐',
                    value: 12313
                }],
                to: 'daily_type'

            },{
                type: 'input',
                title: '需要处理的词条',
                required: true
            },{
                type: 'textarea',
                title: '详细说明',
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'


            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页

        },
        // '4': {
        //     head: {
        //         title: {
        //             hidden: false,
        //             content: '站长反馈',
        //             color: '#fff'
        //         },
        //         return: {
        //             hidden: false,
        //             url: '/Public/img/h5-list-arrow-left.png'
        //         },
        //         myfeedback: {
        //             hidden: false,
        //             url: '/Public/img/h5-myfb.png'
        //         },
        //         bgcolor: '#38f'
        //     },
        //     feedbackInfo: [{
        //         type: 'input',
        //         title: '您反馈问题的网站地址',
        //         required: true,
        //         to: 'wr'
        //     }, {
        //         type: 'select',
        //         title: '请选择您的问题',
        //         options: [{
        //             text: '标题摘要乱码',
        //             value: 12314
        //         }, {
        //             text: '自适应站点被转码',
        //             value: 12315
        //         }, {
        //             text: '其他问题',
        //             value: 12316
        //         }],
        //         to: 'daily_type'

        //     }, {
        //         type: 'textarea',
        //         title: '详细说明',
        //         placeholder: '请详细描述您遇到的问题',
        //         required: true,
        //         to: 'content'


        //     }],
        //     hasUpload: true,
        //     userInfo: {
        //         type: 'input',
        //         title: '联系方式',
        //         limit: 'email',
        //         to: 'email',
        //         subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
        //         placeholder: '联系邮箱',
        //         required: false
        //     },
        //     submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页

        // },
        '4': {
            head: {
                title: {
                    hidden: false,
                    content: '无法正常使用百度搜索功能',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'textarea',
                title: '详细说明',
                link: {
                    linkText: '常见解决办法',
                    linkUrl: '/?m=Client&a=commonanswer&appid=517&qaid=2'
                },
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'


            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页

        },
        '5': {
            head: {
                title: {
                    hidden: false,
                    content: '搜索结果页面显示异常',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'input',
                title: '搜索关键词',
                placeholder: '如：我是歌手',
                required: true,
                to: 'kw'
            }, {
                type: 'select',
                title: '请选择您的问题',
                options: [{
                    text: '字体、按钮过小，不便操作',
                    value: 12805
                }, {
                    text: 'PC页面被强制转码为移动样式',
                    value: 12806
                },{
                    text: '其他问题',
                    value: 12813
                }],
                to: 'daily_type'
            }, {
                type: 'textarea',
                title: '详细说明',
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'
            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页

        },
        '6': {
            head: {
                title: {
                    hidden: false,
                    content: '其他问题或建议',
                    color: '#fff'
                },
                return: {
                    hidden: false,
                    url: '/Public/img/h5-list-arrow-left.png'
                },
                myfeedback: {
                    hidden: false,
                    url: '/Public/img/h5-myfb.png'
                },
                bgcolor: '#38f'
            },
            feedbackInfo: [{
                type: 'textarea',
                title: '详细说明',
                placeholder: '请详细描述您遇到的问题',
                required: true,
                to: 'content'


            }],
            hasUpload: true,
            userInfo: {
                type: 'input',
                title: '联系方式',
                limit: 'email',
                to: 'email',
                subTitle: '(留下您的邮箱，以便将结果通知给您，我们会严格保密)',
                placeholder: '联系邮箱',
                required: false
            },
            submitted: 'return' // 'hold'表示停留在本页， 'return'表示返回上一页

        },
    }

};
*/