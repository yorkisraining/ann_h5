<!-- serve/building/confirmOrder 订单信息确认 or 订单详情 -->
<template>
    <div class="confirm_order"  :style="{minHeight: minH + 'px'}">
        <gheader :title="title" class="head" showMsg="false" @returnFn="returnFn"></gheader>
        <div class="confirm_order_box">
            <div class="card_item">
                <div class="title">{{serveType | filterServerType}}</div>
                <anOrderList class="order_list" v-for="item in orderList" :key="item.id" :orderName="item.goodName" :orderMoney="item.price" :orderCount="item.orderNum"></anOrderList>
            </div>
            <div class="card_item">
                <div class="title">订单信息</div>
                <div class="msg_list">
                    <div class="msg_list_item">
                        <div>订单编号</div>
                        <div>{{orderId}}</div>
                    </div>
                    <!-- <div class="msg_list_item">
                        <div>服务分类</div>
                        <div>{{serveType | filterServerType}}</div>
                    </div> -->
                    <div class="msg_list_item">
                        <div>下单时间</div>
                        <div>{{createTime}}</div>
                    </div>
                </div>
                <div class="msg_list">
                    <div class="msg_list_item">
                        <div>店铺优惠</div>
                        <div>{{dpDiscount}}</div>
                    </div>
                    <div class="msg_list_item">
                        <div>会员优惠</div>
                        <div>{{vipDiscount}}</div>
                    </div>
                    <div class="msg_list_item">
                        <div>优惠金额</div>
                        <div class="orange">-￥{{discount}}</div>
                    </div>
                    <div class="msg_list_item">
                        <div>合计金额</div>
                        <div class="orange">￥{{totalPrice}}</div>
                    </div>
                </div>
            </div>
            <div class="card_item">
                <div class="title">联系信息</div>
                <div class="msg_list user_msg" :class="{'detail_usr_fill': !ifDisabled}">
                    <div class="msg_list_item">
                        <div>姓名</div>
                        <div><input type="text" class="input_item" v-model="user.username" :disabled="ifDisabled" /></div>
                    </div>
                    <div class="msg_list_item">
                        <div>电话</div>
                        <div><input type="text" class="input_item" v-model="user.tel" :disabled="ifDisabled" /></div>
                    </div>
                    <div class="msg_list_item">
                        <div>地址</div>
                        <div><input type="text" class="input_item" v-model="user.address" :disabled="ifDisabled" /></div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="['type_btn', {'default_btn': type == 0 || type == 3}]"  @click="pay(type)">{{type | filterTypeBtn}}</div>
    </div>
</template>

<script>
import anOrderList from '@/components/anOrderList'
import gheader from '@/components/headerWithDiyReturn'
import { Toast, Dialog } from 'vant';
import { ajaxGet, ajaxPost } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api'

export default {
    data () {
        return {
            title: '',
            minH: 0,
            serveType: '',
            createTime: '',
            orderId: '',
            orderList: [],
            totalPrice: 0,
            discount: 0, //优惠
            dpDiscount: '无',
            vipDiscount: '无',
            type: 1, //订单详情还是确认订单
            user: {
                username: '',
                tel: '',
                address: ''
            },
            isClickPay: false,
            ifDisabled: false,
            ifIosDevices: false
        };
    },
    components: {anOrderList, gheader},
    filters: {
        filterTypeBtn(val) {
            //0 是订单详情 1 2 是订单确认 3撤单
            switch (Number(val)) {
                case 0:
                    return '已完成'
                case 1:
                    return '去支付'
                case 2:
                    return '去支付'
                case 3:
                    return '已撤销'
            }
        },
        filterServerType(val) {
            switch (val) {
                case 'S0':
                    return '免费服务'
                case 'S1':
                    return '定制服务'
                case 'C':
                    return '餐饮'
            }
        }
    },
    created() {
        let query = this.$route.query;
        this.orderId = query.id;
        this.type = query.type;

        if (this.type == 0 || this.type == 3) {
            this.title = '订单详情';
            this.ifDisabled = true;
        } else {
            this.title = '订单确认';
            this.ifDisabled = false;
        }

        ajaxGet(`${apiUrl.baseURL}app/goodOrder/info/${this.orderId}`, {}, res => {
            this.orderList = res.detailList;
            this.createTime = res.createTime;
            this.serveType = res.orderType;//服务分类
            this.discount = ((res.orderMoney - res.realMoney) / 100).toFixed(2);
            this.totalPrice = (res.realMoney / 100).toFixed(2);

            let discount = res.discountList;
            for (let i=0; i<discount.length; i++) {
                if (discount[i].scope == 2) {
                    //会员优惠
                    this.vipDiscount = `￥${(discount[i].money / 100).toFixed(2)}`;
                } else {
                    //店铺
                    this.dpDiscount = `￥${(discount[i].money / 100).toFixed(2)}`;
                }
            }

            this.user.username = res.linkMane;
            this.user.tel = res.linkMObile;
            this.user.address = res.address;

            if (res.linkMane) {
                this.ifDisabled = true;
            }
        })

    },
    mounted() {
        this.minH = document.documentElement.clientHeight;
    },
    methods: {
        returnFn() {
            this.$router.go(-1);
        },
        pay(type) {
            //支付
            if (type != 0) {
                if (type == 2) {
                    this.$router.replace(`/choosePayFn?module=3&id=${this.orderId}`);
                    return false;
                }
                if (!this.user.username || !this.user.tel ||  !this.user.address) {
                    Toast({
                        message: '请填写个人信息',
                        duration: 2000
                    });
                    return false;
                }
                let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
                if (!reg.test(this.user.tel)) {
                    Toast({
                        message: '请输入正确的手机号',
                        duration: 2000
                    });
                    return false;
                }
                if (!this.isClickPay) {
                    this.isClickPay  = true;
                    //提交地址信息
                    ajaxPost(`${apiUrl.baseURL}app/goodOrder/link/${this.orderId}`, {
                        address: this.user.address,
                        mobile: this.user.tel,
                        linkMan: this.user.username
                    }, res => {
                        this.isClickPay = false;
                        this.$router.replace(`/choosePayFn?module=3&id=${this.orderId}`);
                    }, res => {
                        this.isClickPay = false;
                    })
                }
            }
        }
    },
}

</script>
<style lang='less' scoped>
.confirm_order {
    background-color: #f3f3f3;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .confirm_order_box {
        padding: .24rem .32rem;
    }
    .card_item {
        background-color: #fff;
        padding: .18rem .24rem .24rem;
        margin-bottom: .32rem;
        border-radius: .1rem;
        .title {
            font-size: .32rem;
            color: #333;
            padding-bottom: .16rem;
            margin-bottom: .16rem;
            border-bottom: 1px solid #f2f2f2;
        }
        .order_list {
            margin-bottom: .32rem;
            &:last-child {
                margin: 0;
            }
        }
        .msg_list {
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: .08rem;
            margin-bottom: .16rem;
            &:last-child {
                border: none;
                padding-bottom: 0;
                margin-bottom: 0;
            }
            .msg_list_item {
                display: flex;
                justify-content: space-between;
                align-items: center; 
                font-size: .26rem;
                margin-bottom: .16rem;
                div {
                    color: #333;
                    &:first-child {
                        color: #999;
                    }
                }
                .orange {
                    color: #F14D2A;
                }
            }
            .input_item {
                border: none;
                text-align: right;
            }
        }
        .user_msg {
            &.detail_usr_fill {
                .input_item {
                    height: .6rem;
                    width: 100%;
                }
                input {
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
            }
            .msg_list_item {
                div {
                    margin-right: .16rem;
                    &:last-child {
                        flex-grow: 1;
                    }
                }
                input {
                    background-color: #fff;
                    width: 100%;
                }
            }
        }
    }
    .type_btn {
        width: 100%;
        height: .98rem;
        font-size: .34rem;
        text-align: center;
        line-height: .98rem;
        color: #393733;
        background-color: #FFCB44;
        border: 1px solid #DCDCDC;
        position: absolute;
        bottom: 0;
        &.default_btn {
            background-color: #FFFFFF;
            font-size: .34rem;
            color: #666;
        }
    }
}

</style>