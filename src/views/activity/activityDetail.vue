<!-- activityDetail  -->
<template>
    <div class="avtivity_Detail_box"  :style="{minHeight: minH + 'px'}">
        <headerWithPhone :title="'活动'" :linkMsg="'报名记录'" class="head" @clickLink="toHis"></headerWithPhone>
        <div class="avtivity_card"> 
            <div class="img_box" :style="{'backgroundImage': 'url('+ src + ')'}">
                <!-- <img :src="src" /> -->
            </div>
            <div class="msg">
                <div class="title">{{title}}</div>
                <div class="detail_msg">
                    <div>时间：<span>{{time}}</span></div>
                    <div>地点：<span>{{address}}</span></div>
                </div>
            </div>
        </div>
        <div class="article" v-html="article"></div>
        <div class="btn_group">
            <div class="share_btn btn" @click="share">分享</div>
            <div class="sign_btn btn" @click="signup" :class="{'not_allow': !allowSign}">报名</div>
        </div>
        
    </div>
</template>

<script>
import headerWithPhone from '@/components/headerWithPhone'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'
import { Toast } from 'vant';

export default {
    data () {
        return {
            minH: 0,
            title: '',
            address: "",
            time: "", 
            src: "",
            id: 0,
            actId: '',
            article: '',
            allowSign: 1, //0不允许报名，1允许
        };
    },
    components: {headerWithPhone},
    created() {
        let id = this.$route.query.id;
        this.actId = id;
        ajaxGet(`${apiUrl.baseURL}app/act/${id}`, {}, res => {
            this.title = res.actName;
            this.article = res.actContent;
            this.address = res.actPlace; 
            this.time = res.activeTime;
            this.id = res.id;
            this.src = res.imageList != null ? res.imageList[0].url : '';
            this.allowSign = res.allowSign == 0 ? false : true;
        })
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
        toHis() {
            this.$router.push('/activityHistory');
        },
        signup() {
            if (this.allowSign) {
                this.$router.push(`/activitySignUp?id=${this.id}`);
            }
        },
        filterHTMLTag (msg) {
            var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
            msg = msg.replace(/[|]*\n/, '') //去除行尾空格
            msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
            msg = msg.replace(/&ldquo;/ig, ''); 
            msg = msg.replace(/&rdquo;/ig, ''); 
            msg = msg.replace(/&mdash;/ig, ''); 
            return msg;
        },
        share() {
            let token = sessionStorage.getItem('token') || store.state.homeModule.token;

            var args = {
                title: this.title, // 标题
                content: this.filterHTMLTag(this.article).slice(0, 100), // 分享内容
                //imageUrl: this.src, // 分享图片地址
                targetUrl: `${apiUrl.frontBaseURL}share?id=${this.actId}&token=${token}`, // 分享跳转的目标地址
                description: this.filterHTMLTag(this.article).slice(0, 100), // 运营文案
                type: 'webpage' // 分享类型 'image' | 'text' | 'imageAndText' | 'webpage' | 'music'
            };
            YBB.hybrid.util.share(args).then(function() {
                Toast.success('分享成功');
            }).catch(function(error) {
                Toast.fail('分享失败');
            })
        }
    }
}

</script>
<style lang='less' scoped>
.avtivity_Detail_box {
    position: relative;
    .head {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 199;
    }
    .avtivity_card {
        display: flex;
        padding: .24rem 0;
        margin: 0 .32rem .6rem;
        border-bottom: 1px solid #cfcfcf;
        .img_box {
            width: 2.1rem;
            height: 2.5rem;
            border-radius: .1rem;
            margin-right: .24rem;
            overflow: hidden;
            background-size: cover;
            /* img {
                width: 100%;
            } */
        }
        .title {
            font-size: .34rem;
            color: #333;
            line-height: .48rem;
            margin-top: .08rem;
            margin-bottom: .24rem;
        }
        .msg {
            width: calc(100% - 2.1rem - .24rem);
            .detail_msg {
                font-size: .22rem;
                color: #666;
                line-height: .3rem;
                padding-right: .4rem;
                div {
                    margin-bottom: .08rem;
                    span {
                        color: #999;
                    }
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }
    }
    .article {
        padding: 0 .32rem;
        margin-bottom: 1.14rem;
    }
    .btn_group {
        width: 100%;
        color: #fff;
        font-size: .34rem;
        position: fixed;
        bottom: 0;
        display: flex;
        background-color: #fff;
        .btn {
            width: calc((100% - .32rem)/2);
            height: .98rem;
            line-height: .98rem;
            text-align: center;
            background-color: #42BD56;
            border-radius: .08rem;
        }
        .sign_btn {
            &.not_allow {
                background-color: #999;
            }
        }
        .share_btn {
            margin-right: .32rem;
        }
    }
}

</style>