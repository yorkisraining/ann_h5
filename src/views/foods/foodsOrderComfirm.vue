<!-- foods/foodsOrderComfirm 订单信息确认 or 订单详情 -->
<template>
    <div class="confirm_order"  :style="{minHeight: minH + 'px'}">
        <gheader :title="title" class="head" showMsg="false" @returnFn="returnFn"></gheader>
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
                <div class="msg_list_item">
                    <div>服务分类</div>
                    <div>{{serveType | filterServerType}}</div>
                </div>
                <div class="msg_list_item">
                    <div>下单时间</div>
                    <div>{{createTime}}</div>
                </div>
                <div class="msg_list_item" v-if="!curBtn || !appointTime">
                    <div>预约时间</div>
                    <div>{{appointTime | filerTime}}</div>
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
                    <div class="orange">-￥{{discount | filterPrice}}</div>
                </div>
                <div class="msg_list_item">
                    <div>合计金额</div>
                    <div class="orange">￥{{totalPrice | filterPrice}}</div>
                </div>
            </div>
        </div>
        <div class="explaint">请在下单后6个小时内取餐，过期订单自动失效</div>
        <div class="appoint_btn_box" v-if="type == 1">
            <div :class="['appoint_btn', {cur: curBtn}]" @click="() => {this.curBtn = true}">立即取餐</div>
            <div :class="['appoint_btn', {cur: !curBtn}]" @click="clickAppoint">预约取餐 <span v-show="!curBtn">{{appointTime}}</span></div>
        </div>
        <div :class="['type_btn', {'default_btn': type == 0 || type == 3}]" @click="pay(type)">{{type | filterTypeBtn}}</div>
        <van-popup v-model="ifShowTime" position="bottom">
            <van-datetime-picker
                v-model="appointTime"
                type="time"
                :min-hour="0"
                :max-hour="24"
                @confirm="closePopup"
                @cancel="() => {this.ifShowTime = false}"
            />
        </van-popup>
            
    </div>
</template>

<script>
import gheader from '@/components/headerWithDiyReturn'
import anOrderList from '@/components/anOrderList'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            title: '',
            minH: 0,
            type: 1,
            serveType: '',
            createTime: '',
            appointTime: '',
            orderId: '',
            ifShowTime: false,
            isClickPay: false,
            curBtn: true,
            orderList: [],
            totalPrice: 0,
            discount: 0, //优惠
            dpDiscount: '无',
            vipDiscount: '无',
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
        filterPrice(val) {
            return (Number(val) / 100).toFixed(2);
        },
        filterDisCount(val) {
            if (val != '无') {
                return (Number(val) / 100).toFixed(2);
            }
        },
        filerTime(val) {
            function formatDate(timestamp) {
                function addZero(num) {
                    return num < 10 ? '0' + num : num;
                }
                var date = new Date(timestamp);
                var year = date.getFullYear();
                var month = addZero(date.getMonth() + 1);
                var day = addZero(date.getDate());
                var hours = addZero(date.getHours());
                var minutes = addZero(date.getMinutes());
                var seconds = addZero(date.getSeconds());
                // return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
                return year + '-' + month + '-' + day;
            }
            if (val) {
                if (val.length < 8) {
                    return `${formatDate(new Date().getTime())} ${val}:00`;
                }
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
        } else {
            this.title = '订单确认';
        }

        ajaxGet(`${apiUrl.baseURL}app/goodOrder/info/${this.orderId}`, {}, res => {
            this.orderList = res.detailList;
            this.createTime = res.createTime;
            this.serveType = res.orderType;//服务分类
            this.discount = Math.abs(res.orderMoney - res.realMoney);
            this.totalPrice = res.realMoney;
            this.appointTime = res.bookTime

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
        })
    },
    mounted() {
        this.minH = document.documentElement.clientHeight;
    },
    methods: {
        returnFn() {
            this.$router.go(-1);
        },
        clickAppoint() {
            //预约取餐
            this.ifShowTime = true;
        },
        closePopup(val) {
            this.ifShowTime = false;
            this.curBtn = false;
        },
        formatDate(timestamp) {
            function addZero(num) {
                return num < 10 ? '0' + num : num;
            }
            var date = new Date(timestamp);
            var year = date.getFullYear();
            var month = addZero(date.getMonth() + 1);
            var day = addZero(date.getDate());
            var hours = addZero(date.getHours());
            var minutes = addZero(date.getMinutes());
            var seconds = addZero(date.getSeconds());
            // return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            return year + '-' + month + '-' + day;
        },
        pay(type) {
            //支付
            /* 
            立即就餐 app/goodOrder/book/1/{orderId}
            预约取餐 app/goodOrder/book/2/{orderId} bookTime 
            */
            if (this.type != 0) {
                if (this.type == 2) {
                    this.$router.replace(`/choosePayFn?module=1&id=${this.orderId}`);
                    return false;
                }
                if (!this.isClickPay) {
                    this.isClickPay  = true;
                    if (this.curBtn) {
                        //立即
                        ajaxGet(`${apiUrl.baseURL}app/goodOrder/book/1/${this.orderId}`, {}, res => {
                            this.isClickPay = false;
                            this.$router.replace(`/choosePayFn?module=1&id=${this.orderId}`);
                        }, res => {
                            this.isClickPay = false;
                        })
                    } else {
                        //预约
                        let time = `${this.formatDate(new Date().getTime())} ${this.appointTime}:00`;
                        ajaxGet(`${apiUrl.baseURL}app/goodOrder/book/2/${this.orderId}`, {
                            bookTime: time
                        }, res => {
                            this.isClickPay = false;
                            this.$router.replace(`/choosePayFn?module=1&id=${this.orderId}`);
                        }, res => {
                            this.isClickPay = false;
                        })
                    }
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
    .card_item {
        background-color: #fff;
        padding: .18rem .24rem .24rem;
        margin: .24rem .32rem .32rem;
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
        border-radius: .1rem;
        position: absolute;
        bottom: 0;
        &.default_btn {
            background-color: #FFFFFF;
            font-size: .34rem;
            color: #666;
        }
    }
    .appoint_btn_box {
        display: flex;
        font-size: .3rem;
        padding: 0 .32rem;
        .appoint_btn {
            margin-right: .18rem;
            width: calc(100% / 2);
            height: .88rem;
            line-height: .88rem;
            color: #999;
            text-align: center;
            border-radius: .1rem;
            background: #FFF;
            border: 1px solid #DCDCDC;
            &:last-child {
                margin: 0;
            }
            &.cur {
                background-color: #FFCB44;
                color: #333;
                border: none;
            }
        }
    }
    .explaint {
        font-size: .2rem;
        color: #666;
        padding: 0 .32rem .16rem;
    }
}

</style>