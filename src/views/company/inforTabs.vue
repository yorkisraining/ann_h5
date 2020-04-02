<!-- inforTabs -->
<template>
    <div>
        <van-list v-model="scrollSetting.loading"
            :finished="scrollSetting.finished"
            finished-text="没有更多了"
            @load="getMsgList"
        >
            <inforList v-for="item in inforCardList" :key="item.id" 
           :title="item.title" 
           :brief="item.absContent" 
           :id="item.id"
           :companyName="item.companyName"
           :stickieFlag="item.stickieFlag"
           :src="item.mainImageUrl"></inforList>
        </van-list>
    </div>
</template>

<script>
import inforList from './inforList'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            inforCardList: [],
            scrollSetting: {
                loading: false,
                finished: false
            },
            page: 0,
            limit: 10,
            totalPage: 1,
        };
    },
    props: ['type'],
    components: {inforList},
    methods: {
        getMsgList() {
            if (this.page < this.totalPage) {
                this.page += 1;
                //获取活动列表
                ajaxGet(apiUrl.companyList, {
                    page: this.page,
                    limit: this.limit,
                    type: this.type
                }, res => {
                    this.inforCardList = this.inforCardList.concat(res.list);
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
        }
    },
}

</script>
<style lang='less' scoped>
</style>