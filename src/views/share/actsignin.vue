<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 16:57:13
 * @LastEditTime: 2019-08-13 15:27:12
 * @LastEditors: Please set LastEditors
 -->
<!-- share/signin 活动分享报名页 -->
<template>
    <div class="avtivity_signin" :style="{minHeight: minH + 'px'}">
        <div class="g_title" :class="{'ios_devices': ifIosDevices}">
            <!-- <div class="return_icon" @click="() => {this.$router.go(-1)}"><i class="el-icon-arrow-left"></i></div> -->
            <div class="title">活动报名并签到</div>
        </div>
        <div class="signin_msg">
            <div class="signin_item">
                <div class="item_title">姓名</div>
                <input type="text" v-model="userMsg.name.val">
                <div class="remark">必填</div>
            </div>
            <div class="signin_item"  @click="popGender">
                <div class="item_title">性别</div>
                <input type="text" disabled v-model="userMsg.gender.val">
                <div class="remark">必填</div>
            </div>
            <div class="signin_item">
                <div class="item_title">电话</div>
                <input type="text"  v-model="userMsg.phone.val">
                <div class="remark">必填</div>
            </div>
            <div class="signin_item">
                <div class="item_title">住址</div>
                <input type="text"  v-model="userMsg.address.val">
                <div class="remark">非必填</div>
            </div>
        </div>
        <div class="confirm_btn" @click="confirm">报名并签到</div>
        <van-popup v-model="ifShowGender" position="bottom">
           <van-picker :columns="columns" show-toolbar title="" @cancel="onCancel" @confirm="onConfirm" :default-index="0" />
        </van-popup>
        <div class="shade" :style="{minHeight: minH + 60 + 'px'}" v-show="showPopup"></div>
        <div class="popup" v-show="showPopup">
            <div class="popup_main">
                <div class="text1">签到成功</div>
                <div class="text2">备注说明：在此签到完成后到会场无需再签到</div>
            </div>
            <div class="popup_close" @click="() => {showPopup = false;}">
                <img src="@/assets/share_close_icon.png" />
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            id: '',
            type: '',
            columns: ['男', '女'],
            ifShowGender: false,
            userMsg: {
                name: {
                    val: '',
                    isMust: true
                },
                phone: {
                    val: '',
                    isMust: true
                },
                gender: {
                    val: '',
                    isMust: true
                },
                address: {
                    val: '',
                    isMust: false
                },
            },
            minH: '',
            showPopup: false,
            ifIosDevices: false,
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.type = this.$route.query.type; //type=1报名type=2报名+签到

        /* if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            this.ifIosDevices = true;
        } */

        document.title = '活动报名';
    },
    mounted() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            //ios
            this.minH = document.documentElement.clientHeight - 64;
        } else {
            // another
            this.minH = document.documentElement.clientHeight - 42;
        }
    },
    methods: {
        confirm() {
            for (let key in this.userMsg) {
                if (this.userMsg[key].isMust && this.userMsg[key].val.length == 0) {
                    Toast({
                        message: '请完成必填项填写',
                        duration: 1000
                    });
                    return false;
                }
            }

            let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (!reg.test(this.userMsg.phone.val)) {
                Toast('请输入正确的手机号');
                return false;
            }

            axios.post(apiUrl.shareSignUp, {
                "actId": this.id,
                "gender": this.userMsg.gender.val == '男' ? 1 : 0,
                "mobile": this.userMsg.phone.val,
                "name": this.userMsg.name.val,
                "address": this.userMsg.address.val,
            })
            .then(res => {
                res = res.data.result;
                if (res.code == 90000) {
                    Toast.fail({
                        message: res.data,
                        duration: 1000
                    });
                } else {
                    if (this.type == 1) {
                        this.$router.replace('/shareSigninSuccess');
                    } else if (this.type == 2) {
                        this.showPopup = true;
                        this.userMsg.gender.val = '';
                        this.userMsg.phone.val = '';
                        this.userMsg.name.val = '';
                        this.userMsg.address.val = '';
                    }
                }
            })
        },
        popGender() {
            this.ifShowGender = true;
        },
        onCancel() {
            this.ifShowGender = false;
        },
        onConfirm(value, index) {
            this.ifShowGender = false;
            this.userMsg.gender.val = value;
        }
    }
}

</script>
<style lang='less' scoped>
.avtivity_signin {
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
    .signin_msg {
        padding: .32rem;
        .signin_item {
            width: 100%;
            background-color: #f7f7f7;
            border-radius: .1rem;
            padding-left: .24rem;
            display: flex;
            align-items: center;
            position: relative;
            margin-bottom: .16rem;
            input {
                display: block;
                border: none;
                height: .88rem;
                background-color: #f7f7f7;
                width: calc(100% - 1.2rem);
                font-size: .26rem;
                color: #666;
                padding-left: .7rem;
            }
            .remark {
                border-left: 1px solid #cbcbcb;
                height: .3rem;
                width: 1.2rem;
                text-align: center;
                font-size: .24rem;
                color: #999;
            }
            .item_title {
                position: absolute;
                color: #666;
            }
        }
    }
    .confirm_btn {
        width: 100%;
        height: .98rem;
        color: #fff;
        font-size: .34rem;
        line-height: .98rem;
        text-align: center;
        background-color: #42BD56;
        position: fixed;
        bottom: 0;
    }

    .shade {
        background-color: rgba(0, 0, 0, .6);
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 98;
    }
    .popup {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 99;
        transform: translate(-50%, -60%);
        .popup_main {
            background-image: url('../../assets/share_popup_bg.png');
            background-size: 100%;
            background-repeat: no-repeat;
            width: 5.4rem;
            height: 5.9rem;
            .text1 {
                font-size: .38rem;
                color: #333;
                position: absolute;
                font-family: PingFangSC-Semibold;
                bottom: 1.5rem;
                text-align: center;
                width: 100%;
            }
            .text2 {
                font-size: .26rem;
                color: #999;
                position: absolute;
                bottom: .4rem;
                padding: 0 .46rem;
            }
        }
        .popup_close {
            width: .4rem;
            height: .4rem;
            position: absolute;
            bottom: -.6rem;
            left: 50%;
            transform: translate(-50%, 100%);
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
