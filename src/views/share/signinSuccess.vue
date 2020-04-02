<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 17:01:41
 * @LastEditTime: 2019-08-13 15:27:32
 * @LastEditors: Please set LastEditors
 -->
<!-- 分享活动报名成功 -->
<template>
    <div class="pay_success">
        <div class="g_title" :class="{'ios_devices': ifIosDevices}">
            <!-- <div class="return_icon" @click="() => {this.$router.go(-1)}"><i class="el-icon-arrow-left"></i></div> -->
            <div class="title">报名成功</div>
        </div>
        <div class="icon_img">
            <img src="@/assets/paySuccess.png" alt="">
        </div>
        <div class="bold_msg">报名成功</div>
        <div class="normal_msg">活动已报名成功</div>
        <div class="btn">已完成</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ifIosDevices: false,
        };
    },
    created() {
        document.title = '报名成功';
        /* if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            this.ifIosDevices = true;
        } */
    },
    methods: {
    }
}

</script>
<style lang='less' scoped>
.pay_success {
    text-align: center;
    position: fixed;
    top: 0;
    width: 100%;
    .g_title {
        height: .88rem;
        background-color: #0D9BED;
        color: #fff;
        line-height: .88rem;
        font-size: .38rem;
        font-weight: 500;
        position: relative;
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
            width: .8rem;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .icon_img {
        width: 1.3rem;
        height: 1.3rem;
        margin: 1.24rem auto .24rem;
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