<!-- activityCard  -->
<template>
    <div class="avtivity_card"> 
        <div class="img_box">
            <van-swipe :autoplay="3000" :style="{'height': '2.4rem'}">
                <van-swipe-item v-for="item in imageList" :key="item.id" >
                    <!-- <img v-lazy="item.url" :alt="item.name" @touchmove="toImgNavMove" @touchend="toImgNavUp(item.url)"> -->
                    <img v-lazy="item.url" :alt="item.name">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="msg">
            <div class="msg_left">
                <div class="title">{{title}}</div>
                <div class="middle">
                    <div class="ele_width_bg">{{companyName}}</div>
                    <div class="ele_width_bg">{{linkPhone}}</div>
                </div>
            </div>
            <div class="msg_button">
                <div class="ele_fund">资金额：{{startFund}}</div>
                <div class="ele_detail" @click="toDetail(id)">详情></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            clickImageIndex: -1, //轮播图点击flag
        };
    },
    props: ['id', 'title', 'src', 'companyName', 'stickieFlag', 'linkPhone', 'imageList', 'src', 'startFund'],
    methods: {
        toDetail(id) {
            this.$router.push(`/projectDetail?id=${id}`)
        },
        toImgNavMove() {
            this.clickImageIndex = 1;
        },
        toImgNavUp(url) {
            if (this.clickImageIndex < 1) {
                if (!/http/.test(url)) {
                    url = `http://${url}`;
                }
                window.location.href = url;
            }
            this.clickImageIndex = -1;
        },
    }
}

</script>
<style lang='less' scoped>
.avtivity_card {
    position: relative;
    background-color: #fff;
    .img_box {
        width: 100%;
        height: 2.4rem;
        margin-bottom: .08rem;
        overflow: hidden;
        img {
            border-radius: .1rem;
            width: 100%;
        }
    }
    .title {
        font-size: .34rem;
        color: #333;
        line-height: .48rem;
        margin-bottom: .08rem;
    }
    .msg {
        .msg_left {
            padding: .16rem .24rem;
            background-color: #fff;
            .title {
                font-family: PingFangSC-Semibold;
                font-size: .34rem;
                color: #333;
            }
            .ele_width_bg {
                padding: .1rem .16rem;
                background-color: #f7f7f7;
                font-size: .22rem;
                color: #999;
                margin-right: .16rem;
                display: inline-block;
            }
        }
        .msg_button {
            padding: .16rem .24rem;
            background-color: #FFF1F0;
            position: relative;
            .ele_fund {
                font-family: PingFangSC-Regular;
                font-size: .22rem;
                color: #F14D2A;
            }
            .ele_detail {
                position: absolute;
                width: .8rem;
                height: .44rem;
                background: #00A5F7;
                border-radius: 1rem 0 0 1rem;
                color: #fff;
                font-size: .22rem;
                font-family: PingFang-SC-Medium;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                text-align: right;
                line-height: .44rem;
            }
        }
    }

}

</style>