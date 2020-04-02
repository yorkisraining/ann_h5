<!-- activityList  -->
<template>
    <div class="avtivity_list"  :style="{minHeight: minH + 'px'}">
        <van-list v-model="scrollSetting.loading"
            :finished="scrollSetting.finished"
            finished-text="没有更多了"
            @load="getMsgList"
        >
            <activityCard v-for="item in list" :key="item.id" 
            :title="item.projectName" 
            :companyName="item.companyName" 
            :id="item.id" 
            :stickieFlag="item.stickieFlag" 
            :linkPhone="item.linkPhone" 
            :imageList="item.imageList" 
            :startFund="item.startFund" 
            :src="item.mainImageUrl" 
            class="list_card"></activityCard>
        </van-list>
    </div>
</template>

<script>
import activityCard from './activityCard'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            minH: 0,
            scrollSetting: {
                loading: false,
                finished: false
            },
            page: 0,
            limit: 10,
            totalPage: 1,
            list: []
        };
    },
    components: {activityCard},
    props: ['type'],
    mounted() {
        this.minH = document.documentElement.clientHeight - 112 - 50;
    },
    methods: {
        getMsgList() {
            if (this.page < this.totalPage) {
                this.page += 1;
                //获取活动列表
                ajaxGet(apiUrl.projectList, {
                    page: this.page,
                    limit: this.limit,
                    type: this.type
                }, res => {
                    this.list = this.list.concat(res.list);
                    this.totalPage = res.totalPage == 0 ? 1 : res.totalPage;
                    this.scrollSetting.loading = false;
                }, res => {
                    this.scrollSetting.loading = false;
                    this.scrollSetting.finished = true;
                })
            } else {
                this.scrollSetting.finished = true;
                this.scrollSetting.loading = false;
            }
        },
    }
}

</script>
<style lang='less' scoped>
.avtivity_list {
    background-color: #f3f3f3;
    padding-top: .24rem;
    .list_card {
        margin: .32rem;
        border-radius: .1rem;
    }
}
</style>