<!-- activityHistory  -->
<template>
    <div class="avtivity_history_box"  :style="{minHeight: minH + 'px'}">
        <van-tabs :swipe-threshold="3" :line-width="'.4rem'" color="#33" title-active-color="#FFA036" class="van_tabs" sticky :offset-top="fixedTop"  :animated="true">
            <van-tab title="已报名" class="scroll_item">
                <van-list v-model="scrollSetting1.loading"
                    :finished="scrollSetting1.finished"
                    finished-text="没有更多了"
                    @load="getHisList1"
                >
                <hisCard class="his_card" v-for="item in hisCardList1" 
                    :key="item.id" 
                    :status="item.status" 
                    :id="item.id"
                    :actId="item.actId" 
                    :remark="item.remark" 
                    :auditTime="item.createTime" 
                    :actName="item.actName"></hisCard>
                </van-list>
            </van-tab>
            <van-tab title="已审核" class="scroll_item">
                <van-list v-model="scrollSetting2.loading"
                    :finished="scrollSetting2.finished"
                    finished-text="没有更多了"
                    @load="getHisList2"
                >
                    <hisCard class="his_card" v-for="item in hisCardList2" :key="item.id"
                    :status="item.status" 
                    :id="item.id"
                    :actId="item.actId" 
                    :remark="item.remark" 
                    :auditTime="item.auditTime" 
                    :actName="item.actName"></hisCard>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import hisCard from './hisCard'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            minH: 0,
            scrollSetting1: {
                loading: false,
                finished: false
            },
            scrollSetting2: {
                loading: false,
                finished: false
            },
            hisCardList1: [],
            hisCardList2: [],
            page1: 0, //已报名
            page2: 0, //已审核
            totalPage1: 1,
            totalPage2: 1,
            limit: 10,
            fixedTop: 58,
        };
    },
    components: {hisCard},
    mounted() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            //ios
            this.minH = document.documentElement.clientHeight - 64;
        } else {
            // another
            this.minH = document.documentElement.clientHeight - 42;
            this.fixedTop = 42;
        }
    },
    methods: {
        getHisList1() {
            if (this.page1 < this.totalPage1) {
                this.page1 += 1;
                ajaxGet(apiUrl.activitySignedList, {
                    page: this.page1,
                    limit: this.limit,
                }, res => {
                    this.hisCardList1 = this.hisCardList1.concat(res.list)
                    this.totalPage1 = res.totalPage1 == 0 ? 1 : res.totalPage1;
                    this.scrollSetting1.loading = false;
                }, res => {
                    this.scrollSetting1.loading = false;
                    this.scrollSetting1.finished = true;
                })
            } else {
                this.scrollSetting1.finished = true;
                this.scrollSetting1.loading = false;
            }
        },
        getHisList2() {
            if (this.page2 < this.totalPage2) {
                this.page2 += 1;
                ajaxGet(apiUrl.activityAuditedList, {
                    page: this.page2,
                    limit: this.limit
                }, res => {
                    this.hisCardList2 = this.hisCardList2.concat(res.list);
                    this.totalPage2 = res.totalPage2 == 0 ? 1 : res.totalPage2;
                    this.scrollSetting2.loading = false;
                }, res => {
                    this.scrollSetting2.loading = false;
                    this.scrollSetting2.finished = true;
                })
            } else {
                this.scrollSetting2.finished = true;
                this.scrollSetting2.loading = false;
            }
        },
    }
}

</script>
<style lang='less' scoped>
.avtivity_history_box {
    background-color: #f3f3f3;
    .his_card {
        margin: 0 .32rem .24rem;
        border-radius: .1rem;
        &:first-child {
            top: .24rem;
        }
    }
    .scroll_item {
        padding-top: .24rem;
    }
}

</style>