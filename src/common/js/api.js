/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-14 18:16:52
 * @LastEditors: Please set LastEditors
 */
/*
 * api接口统一管理
 */

// 环境配置
const environment = {
    onLine: 'https://innovationcenter.cloudbae.cn:8301/', //正式环境请求地址
    dev: 'https://innovationcenter.cloudbae.cn:8301/', //开发环境请求地址
}

const environmentUrl = {
    onLine: 'https://innovationcenter.cloudbae.cn:8302/', //正式环境地址
    dev: 'https://innovationcenter.cloudbae.cn:8302/', //开发环境地址
}

// 请求接口前缀
let host = location.host,
    baseURL = '',
    baseHost = '';

//地址
let frontBaseURL = '',
    frontBaseHost = '';

if (host.indexOf('innovationcenter.cloudbae.cn') > -1) {
    // 线上环境
    baseHost = environment.onLine;
    frontBaseHost = environmentUrl.onLine;
} else {
    // 测试环境
    baseHost = environment.dev;
    frontBaseHost = environmentUrl.dev;
}

baseURL = baseHost;
frontBaseURL = frontBaseHost

// 接口集合
export const apiUrl = {
    baseURL: baseURL,
    frontBaseURL: frontBaseURL,
    //获取token
    token: baseURL + 'app/getToken', //ok
    testToken: baseURL + 'app/getTokenTest',
    //获取banner图 type 1:首页轮播；2 :三品王 ； 3:咖啡厅；4应用配置；5招商；6商务；7租赁
    banner: baseURL + 'app/banner/list', //ok
    //三品王信息
    spwMsg: baseURL + 'app/company/sanPinWang', //ok
    //三品王商品信息
    spwGoods: baseURL + 'app/good/sanPinWang', //ok
    //咖啡信息
    coffeeMsg: baseURL + 'app/company/coffee', //ok
    //咖啡商品信息
    coffeeGoods: baseURL + 'app/good/coffee', //ok
    //定制服务大类
    cusmadeSever: baseURL + 'app/good/cat/customService', //ok
    //获取首页所有数据
    homeData: baseURL + 'app/home/firstPage', //ok
    //商务信息首页
    inforBusiIndex: baseURL + 'app/infor/busi/home',
    //商务信息列表
    inforBusiList: baseURL + 'app/infor/busi/list',
    //招商信息首页
    inforPocilyIndex: baseURL + 'app/infor/pocily/home',
    //招商信息列表
    inforPocilyList: baseURL + 'app/infor/pocily/list',
    //租赁信息首页
    inforRentIndex: baseURL + 'app/infor/rent/home',
    //租赁信息列表
    inforRentList: baseURL + 'app/infor/rent/list',
    //下单
    pay: baseURL + 'app/goodOrder/order', //ok
    //微信支付
    wxPay: baseURL + 'app/pay/wx',
    //支付宝支付
    aliPay: baseURL + 'app/pay/alipay',
    //查询支付信息
    payResult: baseURL + 'app/pay/payResult',
    //查询退款信息
    refundResult: baseURL + 'app/pay/refundResult',
    //订单列表
    orderList: baseURL + 'app/goodOrder/my/list', //ok //未付款0;已付款1;已过期2;已撤销9;已接单3;已使用4;已退款5;已申请6
    //三品王订单列表
    spwOrderList: baseURL + 'app/goodOrder/my/list/sanPinWang',
    //咖啡订单列表
    coffeeOrderList: baseURL + 'app/goodOrder/my/list/coffee',
    //服务订单列表
    serveOrderList: baseURL + 'app/goodOrder/my/list/customService',
    //服务商品列表
    serveList: baseURL + 'app/good/list', //ok
    //未解决楼宇服务
    buildingNone: baseURL + 'app/building/list/nonProcess',
    //已解决楼宇服务
    buildingYes: baseURL + 'app/building/list/processed',
    //活动类型
    activityTye: baseURL + 'app/act/actType/list',
    //可分页活动列表
    activityList: baseURL + 'app/act/page',
    //已报名活动信息分页
    activitySignedList: baseURL + 'app/act/my/signed/list',
    //已审核活动信息分页
    activityAuditedList: baseURL + 'app/act/my/audited/list',
    //活动报名
    activitySignup: baseURL + 'app/act/sign',
    //退款
    refund: baseURL + 'app/pay/refund',
    //签到
    shareSignIn: baseURL + 'app/act/signIn',
    //报名并签到
    shareSignUp: baseURL + 'app/act/signUp',
    //活动分享报名
    shareSign: baseURL + 'app/act/shareSign',
    //企业成果分类
    companyType: baseURL + 'app/performance/type',
    //企业成果分类列表
    companyList: baseURL + 'app/performance/list',
    //企业成果详情
    companyDetail: baseURL + 'app/performance/info/',
    //项目中心分类
    projectType: baseURL + 'app/projectInfo/type',
    //项目中心分类列表
    projectList: baseURL + 'app/projectInfo/list',
    //项目中心详情
    projectDetail: baseURL + 'app/projectInfo/info/',
    //政策主列表
    policyType: baseURL + 'app/pubPolicy/list',
    //政策分类列表
    policyList: baseURL + 'app/pubPolicy/listByType',
    //政策详情
    policyDetail: baseURL + 'app/pubPolicy/info/',
}
