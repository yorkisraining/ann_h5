<!-- inforDetailList 分类查看更多 -->
<template>
    <div class="infor_detail_list" :style="{minHeight: minH + 'px'}">
        <globalHeader :title="title" :returnBtn="true" :ifShowHeader="true" class="head"></globalHeader>
        <van-list v-model="scrollSetting.loading"
                :finished="scrollSetting.finished"
                finished-text="没有更多了"
                @load="getList"
            >
            <policyList v-for="item in list" 
            :key="item.id" 
            :title="item.policyName" 
            :brief="item.absContent" 
            :id="item.id" 
            :src="item.mainImageUrl"
            :publishOrg="item.publishOrg"
            :publishTime="item.publishTime"
            :inactivityTime="item.inactivityTime" 
            class="policy_list"></policyList>
        </van-list>
    </div>
</template>

<script>
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'
import policyList from './policyList'
import globalHeader from '@/components/header'

export default {
    data () {
        return {
            minH: 0,
            type: '', //文章小分类，如政策
            list: [],
            page: 0, 
            limit: 10,
            totalPage: 1, //总页码
            scrollSetting: {
                loading: false,
                finished: false
            },
            title: ''
        };
    },
    components: {policyList, globalHeader},
    created() {
        let query = this.$route.query;
        this.type = query.type;
        this.title = query.title;
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
        getList() {
            if (this.page < this.totalPage) {
                this.page += 1;
                ajaxGet(apiUrl.policyList, {
                    page: this.page,
                    limit: this.limit,
                    type: this.type
                }, res => {
                    this.list = this.list.concat(res.list)
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
    },
}

</script>
<style lang='less' scoped>
.infor_detail_list {
    background-color: #f2f2f2;
}
.head {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 99;
}
.policy_list {
    margin-bottom: .16rem;
}
</style>