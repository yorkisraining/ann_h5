<!-- serve/index -->
<template>
    <div class="serve_contain"  :style="{minHeight: minH + 'px'}">
        <gHeader :title="'企业服务'" :linkMsg="'服务记录'" class="head" @clickLink="toHis" showMsg="false" @returnFn="returnFn"></gHeader>
        <div class="tabs_box">
            <van-tabs v-model="active" color="#0D9BED" line-width=".4rem" title-active-color="#0D9BED" sticky :animated="true" :offset-top="fixedTop"  :swipeable="true">
                <van-tab class="tabs_item" title="楼宇服务">
                    <building></building>
                </van-tab>
                <van-tab class="tabs_item" title="定制化服务">
                    <cusMade></cusMade>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import building from './building'
import cusMade from './cusmade'
import gHeader from '@/components/headerWithDiyReturn'

export default {
    data () {
        return {
            active: 0,
            minH: 0,
            fixedTop: 54,
        };
    },
    components: {building, cusMade, gHeader},
    methods: {
        toHis() {
            //服务记录
            this.$router.push('/serveHistory');
        },
        returnFn() {
            /* 支付页回来的带一个query参数 */
            if (this.$route.query.ifPay == 1) {
                this.$router.push('/middle');
            } else {
                this.$router.go(-1);
            }
        },
    },
    mounted() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            //ios
            this.minH = document.documentElement.clientHeight - 64;
        } else {
            // another
            this.minH = document.documentElement.clientHeight - 42;
            this.fixedTop = 44;
        }
        this.$router.beforeEach((to, from, next) => {
            if (from.path == '/serveClassify') {
                this.active = 1;
            }
            next();
        })
    },
}

</script>
<style lang='less' scoped>
    .serve_contain {
        background-color: #f3f3f3;
        .head {
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 199;
        }
    }
</style>