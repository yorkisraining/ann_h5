import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

//请求商务首页
export const getBusiHomeData = ({
    commit
}, obj) => {
    ajaxGet(apiUrl.inforBusiIndex, {
        num: obj
    }, res => {
        commit('changeBusiHomeList', res);
    })
}

//请求商务分类列表
export const getBusiList = ({
    commit
}, obj) => {
    ajaxGet(apiUrl.inforBusiList, {
        type: obj.type,
        page: obj.page,
        limit: obj.limit
    }, res => {
        if (obj.page == 1) {
            //直接改
            commit('changeBusiList', res.list);
        } else {
            //加进去
            commit('addBusiList', res.list);
        }
    })
}

//请求招商首页
export const getPolicyHomeData = ({
    commit
}, obj) => {
    ajaxGet(apiUrl.inforPocilyIndex, {
        num: obj
    }, res => {
        commit('changePolicyHomeList', res);
    })
}

//请求招商分类列表
export const getPolicyList = ({
    commit
}, obj) => {
    ajaxGet(apiUrl.inforPocilyList, {
        type: obj.type,
        page: obj.page,
        limit: obj.limit
    }, res => {
        if (obj.page == 1) {
            //直接改
            commit('changeBusiList', res.list);
        } else {
            //加进去
            commit('addBusiList', res.list);
        }
    })
}

//请求租赁首页
export const getRentHomeData = ({
    commit
}, obj) => {
    ajaxGet(apiUrl.inforRentIndex, {
        num: obj
    }, res => {
        commit('changeRentHomeList', res);
    })
}

//请求租赁分类列表
export const getRentList = ({
    commit
}, obj) => {
    ajaxGet(apiUrl.inforRentList, {
        type: obj.type,
        page: obj.page,
        limit: obj.limit
    }, res => {
        if (obj.page == 1) {
            //直接改
            commit('changeBusiList', res.list);
        } else {
            //加进去
            commit('addBusiList', res.list);
        }
    })
}