<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-06-24 09:16:25
 * @LastEditors: your name
 -->
<!-- serve/building/paysuccess 支付成功 -->
<template>
    <div class="pay_success">
        <div class="g_title" :class="{'ios_devices': ifIosDevices}">
            <div class="return_icon" @click="returnHome"><i class="el-icon-arrow-left"></i></div>
            <div class="title">支付成功</div>
        </div>
        <div class="icon_img">
            <img src="@/assets/paySuccess.png" alt="">
        </div>
        <div class="bold_msg">订单支付成功</div>
        <div class="normal_msg">订单已支付成功，可点击<span @click="toDetail">订单详情</span>查看</div>
        <div class="btn">已完成</div>
        <div class="btn return" @click="returnHome">返回</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            module: 0,
            orderNo: 0,
            ifIosDevices: false
        };
    },
    created() {
        let query = this.$route.query;
        this.module = query.module;

        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            this.ifIosDevices = true;
        }
    },
    mounted() {
        window.addEventListener('popstate', () => {
            window.location = '/';
        })

        window.history.pushState('', '', '/');
    },
    methods: {
        toDetail() {
            switch (Number(this.module)) {
                case 1:
                    this.$router.replace('/foodsHistory?ifPay=1')
                    break;
                case 2:
                    this.$router.replace('/coffeeHistory?ifPay=1')    
                    break;
                case 3:
                    this.$router.replace('/serveHistory?ifPay=1')
                    break;
                default:
                    this.$router.replace('/')
                    break;
            }
        },
        returnFn() {
            switch (Number(this.module)) {
                case 1:
                    this.$router.replace('/foods?ifPay=1')
                    break;
                case 2:
                    this.$router.replace('/coffee?ifPay=1')    
                    break;
                case 3:
                    this.$router.replace('/serve?ifPay=1')
                    break;
                default:
                    this.$router.replace('/')
                    break;
            }
        },
        returnHome() {
            this.$router.replace('/')
        }
    }
}

</script>
<style lang='less' scoped>
.pay_success {
    text-align: center;
    margin-top: 1.24rem;
    .g_title {
        height: .88rem;
        background-color: #0D9BED;
        color: #fff;
        line-height: .88rem;
        font-size: .38rem;
        font-weight: 500;
        position: fixed;
        width: 100%;
        top: 0;
        padding: 0 .3rem;
        /* Status bar height on iOS 11+ */
        padding-top: constant(safe-area-inset-top);
        &.ios_devices {
            padding-top: .4rem;
            height: 1.28rem;
            .return_icon {
                margin-top: .2rem;
            }
        }
    .title {
        margin: 0 auto;
        text-align: center;
    }
    .return_icon {
        position: absolute;
        left: 0;
        text-align: center;
        top: 50%;
        width: .8rem;
        transform: translateY(-50%);
    }
}
    .icon_img {
        width: 1.3rem;
        height: 1.3rem;
        margin: 0 auto .24rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .bold_msg {
        font-size: .38rem;
        color: #666666;
        margin-bottom: .28rem;
    }
    .normal_msg {
        font-size: .3rem;
        color: #999;
        margin-bottom: 1.28rem;
        span {
            color: #009BED;
        }
    }
    .btn {
        color: #fff;
        font-size: .34rem;
        height: .98rem;
        width: 6.86rem;
        line-height: .98rem;
        border-radius: .5rem;
        background-color: #009BED;
        margin: 0 auto .4rem;
        &.return {
            background-color: #fff;
            border: 1px solid #009BED;
            color: #009BED;
        }
    }
}

</style>