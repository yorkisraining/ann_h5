<!-- serve/building -->
<template>
    <div>
        <div class="change_btn_group">
            <div :class="[curr == 0 ? 'curr' : '', 'btn_item']" @click="() => {curr = 0}">未解决</div>
            <div :class="[curr == 1 ? 'curr' : '', 'btn_item']" @click="() => {curr = 1}">已解决</div>
        </div>
        <div v-show="curr == 0">
            <orderCard v-for="item in orderCardList1" :key="item.id" 
            :status = "item.status"
            :orderId = "item.id"
            :orderType = "item.typeName"
            :createTime = "item.createTime"
            :contain = "item.detail"
            :remark = "item.processResult"
            :doneTime = "item.processTime"
            ></orderCard>
        </div>
        <div v-show="curr == 1">
            <orderCard v-for="item in orderCardList2" :key="item.id" 
            :status = "item.status"
            :orderId = "item.id"
            :orderType = "item.typeName"
            :createTime = "item.createTime"
            :contain = "item.detail"
            :remark = "item.processResult"
            :doneTime = "item.processTime"
            ></orderCard>
        </div>
        
    </div>
</template>

<script>
import orderCard from './orderCard'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () { 
        return {
            curr: 0,
            orderCardList1: [],
            orderCardList2: []
        };
    },
    components: {orderCard},
    created() {
        ajaxGet(apiUrl.buildingNone, {}, res => {
            this.orderCardList1 = res;
        })
        ajaxGet(apiUrl.buildingYes, {}, res => {
            this.orderCardList2 = res;
        })
    },
    methods: {
    }
}

</script>
<style lang='less' scoped>
.change_btn_group {
    margin: .24rem auto;
    display: flex;
    justify-content: center;
    .btn_item {
        width: 2.46rem;
        height: .68rem;
        background-color: #fff;
        color: #666;
        text-align: center;
        line-height: .68rem;    
        font-size: .26rem;
        &:first-child {
            border-radius: .1rem 0 0 .1rem;
        }
        &:last-child {
            border-radius: 0 .1rem .1rem 0;
        }
        &.curr {
            background-color: #FFA122;
            color: #fff;
        }
    }
}
</style>