<!-- views/areaReserve 场地预定 -->
<template>
    <div class="areaReserve_box">
        <headerWithPhone :title="'场地预定'" :linkMsg="'预定记录'" class="head" @clickLink="toHis"></headerWithPhone>
        <van-tabs :swipe-threshold="3" :line-width="'.4rem'" color="#0D9BED" title-active-color="#0D9BED" sticky :offset-top="fixedTop"  :animated="true"  :swipeable="true">
            <van-tab v-for="item in areaReserveTypeList" :key="item.id" :title="item.paramValue">
                <areaReserveHome :type="item.id"></areaReserveHome>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import headerWithPhone from '@/components/headerWithPhone'
import areaReserveHome from './areaReserveHome'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            areaReserveTypeList: [
                {
                    id: 1,
                    paramValue: '路演厅'
                },
                {
                    id: 2,
                    paramValue: '品牌中心'
                },
                {
                    id: 3,
                    paramValue: '会议室'
                }
            ],
            fixedTop: 55
        };
    },
    components: {areaReserveHome},
    created() {
        ajaxGet(apiUrl.Type, {}, res => {
            this.areaReserveTypeList = res;
        })
    },
     mounted() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            //ios
        } else {
            // another
            this.fixedTop = 42;
        }

    },
    methods: {
        toHis() {
            this.$router.push('/areaReserveHistory')
        },
        toThisNav(url) {
            this.$router.push(url);
        },
    }
}

</script>
<style lang='less' scoped>
.avtivity_box {
    .head {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 199;
    }
}
</style>