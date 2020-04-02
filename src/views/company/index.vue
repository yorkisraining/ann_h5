<!-- company 企业成果展 -->
<template>
    <div class="information_contain" :style="{minHeight: minH + 'px'}">
        <van-tabs sticky :offset-top="fixedTop" :animated="true" :swipeable="true">
            <van-tab v-for="item in companyTypeList" :key="item.id" :title="item.paramValue">
                <inforTabs :type="item.paramKey"></inforTabs>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import inforTabs from './inforTabs'
import { ajaxGet } from '@/common/js/public'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            minH: 0,
            fixedTop: 54,
            companyTypeList: []
        };
    },
    components: {inforTabs},
    created() {
        //获取分类
        ajaxGet(`${apiUrl.companyType}`, {}, res => {
            this.companyTypeList = res;
        })
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
    },
    methods: {
    }
}

</script>
<style lang='less' scoped>
.information_contain {
    background-color: #f3f3f3;
}
</style>