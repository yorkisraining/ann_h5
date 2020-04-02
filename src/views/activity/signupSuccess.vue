<!-- serve/building/paysuccess 支付成功 -->
<template>
    <div class="pay_success">
        <div class="icon_img">
            <img src="@/assets/paySuccess.png" alt="">
        </div>
        <div class="bold_msg">报名成功</div>
        <div class="normal_msg">活动已报名成功，可点击<span @click="toDetail">活动详情</span>查看</div>
        <div class="btn">已完成</div>
        <div class="btn return" @click="() => {this.$router.go(-1)}">返回</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    methods: {
        toDetail() {
            this.$router.push('/activityHistory');
        }
    }
}

</script>
<style lang='less' scoped>
.pay_success {
    text-align: center;
    margin-top: 1.24rem;
    .icon_img {
        width: 1.3rem;
        height: 1.3rem;
        margin: 0 auto .24rem;
        overflow: hidden;
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