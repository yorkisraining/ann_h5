<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-12 16:14:30
 * @LastEditors: Please set LastEditors
 -->
<!-- activitySignUp  -->
<template>
    <div class="avtivity_signup">
        <div class="signup_msg">
            <div class="signup_item">
                <div class="item_title">姓名</div>
                <input type="text" v-model="userMsg.name.val">
                <div class="remark">必填</div>
            </div>
            <div class="signup_item"  @click="popGender">
                <div class="item_title">性别</div>
                <input type="text" disabled v-model="userMsg.gender.val">
                <div class="remark">必填</div>
            </div>
            <div class="signup_item">
                <div class="item_title">电话</div>
                <input type="text"  v-model="userMsg.phone.val">
                <div class="remark">必填</div>
            </div>
            <div class="signup_item">
                <div class="item_title">住址</div>
                <input type="text"  v-model="userMsg.address.val">
                <div class="remark">非必填</div>
            </div>
        </div>
        <div class="confirm_btn" @click="confirm">提交</div>
        <van-popup v-model="ifShowGender" position="bottom">
           <van-picker :columns="columns" show-toolbar title="" @cancel="onCancel" @confirm="onConfirm" :default-index="0" />
        </van-popup>
    </div>
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            id: 0,
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
            }
        };
    },
    created() {
        this.id = this.$route.query.id;
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
            axios.post(apiUrl.activitySignup, {
                "actId": this.id,
                "gender": this.userMsg.phone.val == '男' ? 0 : 1,
                "mobile": this.userMsg.phone.val,
                "name": this.userMsg.phone.val,
            })
            .then(res => {
                res = res.data.result;
                if (res.code == 90000) {
                    Toast.fail({
                        message: res.data,
                        duration: 1000
                    });
                } else {
                    this.$router.replace('/activitySignUpSuccess');
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
.avtivity_signup {
    .signup_msg {
        padding: .32rem;
        .signup_item {
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
}
</style>