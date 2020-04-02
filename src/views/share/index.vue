<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 14:50:37
 * @LastEditTime: 2019-08-14 18:00:59
 * @LastEditors: Please set LastEditors
 -->
<!-- share 分享页 -->
<template>
    <div class="share_box" :style="{minHeight: minH + 'px'}">
        <div class="bg_small_pic">
            <img src="@/assets/share_bg_icon.png" alt="">
        </div>
        <div class="share_activity_box">
            <div class="item_title">主题</div>
            <div class="item_box">
                <div class="share_activity_item">时间：{{time}}</div>
                <div class="share_activity_item">场地：{{field}}</div>
                <div class="share_activity_item">地址：{{address}}</div>
                <!-- <div class="share_activity_item">内容：<span v-html="content"></span></div> -->
            </div>
        </div>
        <div class="btn" @click="toSignIn">去报名</div>
    </div>
</template>

<script>
import { ajaxGet, ajaxPost } from '@/common/js/public'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            minH: 0,
            time: '',
            field: '',
            address: '',
            content: '',
            id: '',
        };
    },
    created() {
        document.title = '活动分享';

        this.id = this.$route.query.id;

        sessionStorage.setItem('token', this.$route.query.token);

        ajaxGet(`${apiUrl.baseURL}app/act/${this.id}`, {}, res => {
            this.time = res.activeTime;
            this.field = res.actPlace;
            this.address = res.actPlace;
            this.content = res.actContent.slice(0, 20);
        })
    },
    mounted() {
        this.minH = document.documentElement.clientHeight;
    },
    methods: {
        toSignIn() {
            window.location.href = `${apiUrl.frontBaseURL}shareSignin?id=${this.id}&type=1`;
        }
    }
}

</script>
<style lang='less' scoped>
    .share_box {
        background-image: linear-gradient(0deg, #2A0674 0%, #683BC7 100%);
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 99;
        font-family: PingFangSC-Regular;
        padding: 0 .32rem;
        .share_activity_box {
            background-color: #fff;
            border-radius: .2rem;
            min-height: 4.36rem;
            margin: 0 auto;
            top: -1.2rem;
            position: relative;
            padding: .5rem .4rem .4rem .4rem;
            .item_title {
                font-family: PingFangSC-Semibold;
                font-size: .6rem;
                color: #333;
                padding-bottom: .14rem;
                border-bottom: 1px solid #CBCBCB;
                margin-bottom: .16rem;
            }
            .item_box {
                .share_activity_item {
                    font-size: .32rem;
                    color: #333333;;
                    margin-bottom: .16rem;
                }
            }
        }
        .btn {
            position: absolute;
            bottom: .48rem;
            width: calc(100% - .32rem * 2);
            height: 1rem;
            line-height: 1rem;
            background-image: linear-gradient(90deg, #FF9303 0%, #FE254A 100%);
            border-radius: .2rem;
            font-family: PingFangSC-Semibold;
            font-size: .28rem;
            color: #FFF;
            text-align: center;
            z-index: 19950606;
        }
    }
</style>