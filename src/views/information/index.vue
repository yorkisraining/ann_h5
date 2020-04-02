<!-- information 资讯 -->
<template>
    <div class="information_contain" :style="{minHeight: minH + 'px'}">
        <van-tabs  @click="changeTabs" sticky :offset-top="fixedTop" :animated="true" :swipeable="true">
            <van-tab title="参观视察">
                <inforTabs :type="0"></inforTabs>
            </van-tab>
            <van-tab title="活动资讯">
                <inforTabs :type="2"></inforTabs>
            </van-tab>            
            <van-tab title="商务信息">
                <inforTabs :type="1"></inforTabs>
            </van-tab>

        </van-tabs>
    </div>
</template>

<script>
import inforTabs from './inforTabs'

export default {
    data () {
        return {
            minH: 0,
            fixedTop: 54,
        };
    },
    components: {inforTabs},
    mounted() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            //ios
            this.minH = document.documentElement.clientHeight - 64;
        } else {
            // another
            this.minH = document.documentElement.clientHeight - 42;
            this.fixedTop = 44;
        }
    },
    methods: {
        changeTabs(index, title) {
            
        }
    }
}

</script>
<style lang='less' scoped>
.information_contain {
    background-color: #f3f3f3;
}
</style>