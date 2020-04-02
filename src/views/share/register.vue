<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 09:10:09
 * @LastEditTime: 2019-08-13 15:27:09
 * @LastEditors: Please set LastEditors
 -->
<!-- register 签到页 -->
<template>
    <div class="register_box" :style="{minHeight: minH + 'px'}">
        <div class="g_title" :class="{'ios_devices': ifIosDevices}">
            <!-- <div class="return_icon" @click="() => {this.$router.go(-1)}"><i class="el-icon-arrow-left"></i></div> -->
            <div class="title">签到</div>
        </div>
        <div class="contain">
            <div class="title">活动签到</div>
            <div class="phone_box">
                <input type="text" v-model="phone" placeholder="请输入手机号" class="input_item" @focus="() => {cur = 1}" @blur="() => {cur = 0}" :class="{'cur': cur == 1}">
            </div>
            <div class="verty_box">
                <!-- <div class="verty" @click="randomNumber">{{realVertyCode}}</div> -->
                <img class="verty" :src="captchaPath" @click="getCaptcha()" alt="">
                <div class="input_box">
                    <input type="text" v-model="vertyCode" placeholder="请输入校验码" class="input_item" @focus="() => {cur = 2}" @blur="() => {cur = 0}" :class="{'cur': cur == 2}">
                </div>
            </div>
            <div class="btn" @click="sign">签&nbsp;到</div>
            <div class="remark">备注说明：在此签到完成后到会场无需再签到</div>
        </div>
        <div class="shade" :style="{minHeight: minH + 'px'}" v-show="showPopup"></div>
        <div class="popup" v-show="showPopup">
            <div class="popup_main">
                <div class="text1">{{msg1}}</div>
                <div class="text2">{{msg2}}</div>
            </div>
            <div class="popup_close" @click="() => {showPopup = false;}">
                <img src="@/assets/share_close_icon.png" />
            </div>
        </div>
    </div>
</template>

<script>
import { ajaxGet } from '@/common/js/public'
import { apiUrl } from '@/common/js/api.js'
import { Toast } from 'vant'
import http from '@/common/js/httpRequest'
import axios from 'axios'

export default {
    data () {
        return {
            cur: 0,
            phone: '',
            vertyCode: '',
            captchaPath: '',
            minH: '',
            showPopup: false,
            msg1: '',
            msg2: '',
            ifIosDevices: false
        };
    },
    created() {
        this.randomNumber();
        this.id = this.$route.query.id;

        /* if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            this.ifIosDevices = true;
        } */
        this.getCaptcha();

        document.title = '活动签到';
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
        getUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
            })
        },
        getCaptcha() {
            this.uuid = this.getUUID();
            this.captchaPath = http.adornUrl(`${apiUrl.baseURL}/captcha.jpg?uuid=${this.uuid}`);
            this.captcha = '';
        },
        sign() {
            if (!this.phone) {
                Toast('请输入手机号');
                return false;
            }
            let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
            if (!reg.test(this.phone)) {
                Toast('请输入正确的手机号');
                return false;
            }
            if (!this.vertyCode) {
                Toast('请输入校验码');
                return false;
            }
            axios.get(apiUrl.shareSignIn, {
                params: {
                    mobile: this.phone,
                    actId: this.id, //活动id
                    uuid: this.uuid,
                    captcha: this.vertyCode
                }
            })
            .then(res => {
                res = res.data.result;
                if (res.code == 90000) {
                    this.getCaptcha();
                    if (res.data == '请先报名') {
                        this.msg1 = '未报名';
                        this.msg2 = '您未报名，请先去报名';
                        this.showPopup  = true;
                        setTimeout(() => {
                            this.$router.replace(`/actsignin?id=${this.id}&type=2`);
                        }, 2000);
                        return false;
                    }
                    //Toast(res.data);
                    return false;
                }
                this.msg1 = '签到成功';
                this.msg2 = '备注说明：在此签到完成后到会场无需再签到';
                this.showPopup  = true;
            })
        },
        randomNumber() {
            this.realVertyCode = Math.floor(Math.random() * 10000); //[0, 10000)
        }
    }
}

</script>
<style lang='less' scoped>
.register_box {
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
        margin-bottom: .8rem;
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
    .contain {
        padding: 0 .32rem;
        .title {
            font-family: PingFangSC-Regular;
            font-size: .48rem;
            color: #333;
            margin-bottom: 1rem;
        }
        .phone_box {
            width: 100%
        }
        .verty_box {
            display: flex;
            justify-content: space-between;
            margin-bottom: .2rem;
            .input_box {
                width: 5.26rem;
            }
            .verty {
                margin-right: 0.4rem;
                font-size: 0.38rem;
                color: #999;
                width: 2rem;
                height: 0.6rem;
            }
        }

        .input_item {
            width: 100%;
            border: none;
            border-bottom: 1px solid #cdcdcd;
            font-size: .3rem;
            color: #999999;
            padding-bottom: .2rem;
            margin-bottom: .4rem;
            &.cur {
                border-color: #0D9BED;
            }
        }

        .btn {
            width: 100%;
            height: .98rem;
            color: #333;
            font-family: PingFangSC-Semibold;
            font-size: .34rem;
            text-align: center;
            line-height: .99rem;
            background-color: #FFCB44;
            border-radius: .1rem;
            margin-bottom: .16rem;
        }

        .remark {
            font-size: .26rem;
            color: #999;
            font-family: PingFangSC-Regular;
        }
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
