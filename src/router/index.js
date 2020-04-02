/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-14 10:03:15
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history', //要配置成history https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
    routes: [{
        path: '/',
        name: '中国-东盟新型智慧城市协同创新中心',
        component(resolve) {
            require(['@/views/home/'], resolve)
        },
        props: {
            returnBtn: false,
            ifShowHeader: false
        }
    }, {
        path: '/serve',
        name: '企业服务',
        component(resolve) {
            require(['@/views/serve/'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/serveHistory',
        name: '服务记录',
        component(resolve) {
            require(['@/views/serve/cusmade/serveHistory'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/paySuccess',
        name: '支付成功',
        component(resolve) {
            require(['@/components/paySuccess'], resolve)
        },
        props: {
            returnBtn: false,
            ifShowHeader: false
        }
    }, {
        path: '/payFail',
        name: '支付失败',
        component(resolve) {
            require(['@/components/payFail'], resolve)
        },
        props: {
            returnBtn: false,
            ifShowHeader: false
        }
    }, {
        path: '/confirmOrder',
        name: '订单信息确认',
        component(resolve) {
            require(['@/views/serve/cusmade/serveHistory/confirmOrder'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/serveClassify',
        name: '定制服务',
        component(resolve) {
            require(['@/views/serve/cusmade/serveClassify'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/serveDetail',
        name: 'serveDetail',
        component(resolve) {
            require(['@/views/serve/cusmade/serveClassify/serveDetail'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/foods',
        name: 'foods',
        component(resolve) {
            require(['@/views/foods'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/foodsHistory',
        name: '订单记录',
        component(resolve) {
            require(['@/views/foods/foodsHistory'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/foodsOrderComfirm',
        name: '订单信息确认',
        component(resolve) {
            require(['@/views/foods/foodsOrderComfirm'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/information',
        name: '资讯',
        component(resolve) {
            require(['@/views/information'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/inforArticle',
        name: '资讯',
        component(resolve) {
            require(['@/views/information/inforArticle'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/inforDetails',
        name: '资讯',
        component(resolve) {
            require(['@/views/information/inforDetailList'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/coffee',
        name: 'coffee',
        component(resolve) {
            require(['@/views/coffee'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/coffeeHistory',
        name: '订单记录',
        component(resolve) {
            require(['@/views/coffee/foodsHistory'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/coffeeOrderComfirm',
        name: '订单信息确认',
        component(resolve) {
            require(['@/views/coffee/foodsOrderComfirm'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/choosePayFn',
        name: '订单支付',
        component(resolve) {
            require(['@/components/choosePayFn'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/activity',
        name: '活动',
        component(resolve) {
            require(['@/views/activity'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/activityHistory',
        name: '活动记录',
        component(resolve) {
            require(['@/views/activity/activityHistory'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/activityDetail',
        name: '活动',
        component(resolve) {
            require(['@/views/activity/activityDetail'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/activitySignUp',
        name: '报名信息',
        component(resolve) {
            require(['@/views/activity/activitySignUp'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/activitySignUpSuccess',
        name: '报名成功',
        component(resolve) {
            require(['@/views/activity/signupSuccess'], resolve)
        },
        props: {
            returnBtn: false,
            ifShowHeader: true
        }
    }, {
        path: '/framesCompany',
        name: '入驻企业成果展',
        component(resolve) {
            require(['@/views/frames/framesCompany'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/framesProject',
        name: '项目',
        component(resolve) {
            require(['@/views/frames/framesProject'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/framesPolicy',
        name: '政策',
        component(resolve) {
            require(['@/views/frames/framesPolicy'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/framesDetail',
        name: '内嵌页面',
        component(resolve) {
            require(['@/views/frames/framesDetail'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/checkPay',
        name: '',
        component(resolve) {
            require(['@/components/checkPay'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/areaReserve',
        name: '场地预定',
        component(resolve) {
            require(['@/views/areaReserve'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/share',
        name: '活动分享',
        component(resolve) {
            require(['@/views/share/'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/shareSignin',
        name: '活动分享报名',
        component(resolve) {
            require(['@/views/share/signin'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/shareSigninSuccess',
        name: '报名成功',
        component(resolve) {
            require(['@/views/share/signinSuccess'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/shareRegister',
        name: '活动签到',
        component(resolve) {
            require(['@/views/share/register'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/actsignin',
        name: '活动报名并签到',
        component(resolve) {
            require(['@/views/share/actsignin'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/middle',
        name: '中间页',
        component(resolve) {
            require(['@/components/middle'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/company',
        name: '入驻企业成果展',
        component(resolve) {
            require(['@/views/company'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/companyDetail',
        name: '企业成果展',
        component(resolve) {
            require(['@/views/company/inforArticle'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/project',
        name: '项目中心',
        component(resolve) {
            require(['@/views/project'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/projectDetail',
        name: '项目信息',
        component(resolve) {
            require(['@/views/project/activityDetail'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/policy',
        name: '政策',
        component(resolve) {
            require(['@/views/policy'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, {
        path: '/policyList',
        name: '政策',
        component(resolve) {
            require(['@/views/policy/policyDetailList'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: false
        }
    }, {
        path: '/policyArticle',
        name: '政策',
        component(resolve) {
            require(['@/views/policy/policyArticle'], resolve)
        },
        props: {
            returnBtn: true,
            ifShowHeader: true
        }
    }, ]
})

router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
        // firefox
    document.documentElement.scrollTop = 0
        // safari
    window.pageYOffset = 0
    next();
})

export default router