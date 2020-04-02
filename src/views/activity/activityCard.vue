<!-- activityCard  -->
<template>
    <div class="avtivity_card" @click="toDetail(id)"> 
        <div class="img_box">
            <img :src="src" />
        </div>
        <div class="msg">
            <div class="msg_left">
                <div class="title">{{title}}</div>
                <div class="detail_msg">时间：<span>{{time}}</span></div>
                <div class="detail_msg">地点：<span>{{address}}</span></div>
            </div>
            <div class="sign_up" @click.stop="signUp(id)" v-if="allowSign != 0">
                <div><img class="sign_up_icon" src="@/assets/activ_icon.png" /></div>
                <div>报名</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: ['id', 'title', 'src', 'time', 'address', 'allowSign'],
    methods: {
        toDetail(id) {
            this.$router.push(`/activityDetail?id=${id}`)
        },
        signUp(id) {
            this.$router.push(`/activitySignUp?id=${id}`)
        }
    }
}

</script>
<style lang='less' scoped>
.avtivity_card {
    padding: .16rem .32rem;
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
            /* height: 100%; */
        }
    }
    .title {
        font-size: .34rem;
        color: #333;
        line-height: .48rem;
        margin-bottom: .08rem;
    }
    .msg {
        margin-right: .16rem;
        .msg_left {
            width: calc(100% - .9rem);
            .detail_msg {
                font-size: .22rem;
                color: #666;
                line-height: .3rem;
                width: 100%;
                margin-bottom: .1rem;
                span {
                    color: #999;
                }
                &:last-child {
                    margin: 0;
                }
            }
        }
        .sign_up {
            position: absolute;
            right: .32rem;
            bottom: .16rem;
            border-left: 1px dotted #cbcbcb;
            width: .9rem;
            height: 1rem;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            align-content: center;
            color: #FFA122;
            font-size: .22rem;
            .sign_up_icon {
                width: .22rem;
            }
        }
    }

}

</style>