<!-- policy 政策 -->
<template>
    <div class="policy_box"  :style="{minHeight: minH + 'px'}">
        <policyCard v-for="(item, index) in policyCardList" 
        :key="index" 
        :title="item.typeName" 
        :type="item.type" 
        :list="item.pubPolicyList"></policyCard>
    </div>
</template>

<script>
import policyCard from './policyCard'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            policyCardList: [],
            minH: 0,
        };
    },
    components: {policyCard},
    created() {
        this.getList();
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
        getList() {
            ajaxGet(apiUrl.policyType, {}, res => {
                this.policyCardList = res;
            })
        },
    }
}

</script>
<style lang='less' scoped>
.policy_box {
    background-color: #f2f2f2;
}
</style>