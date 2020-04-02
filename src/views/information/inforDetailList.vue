<!-- inforDetailList 分类查看更多 -->
<template>
    <div class="infor_detail_list">
        <globalHeader :title="title" :returnBtn="true" :ifShowHeader="true" class="head"></globalHeader>
        <van-list v-model="scrollSetting.loading"
                :finished="scrollSetting.finished"
                finished-text="没有更多了"
                @load="getList"
            >
            <inforList v-for="item in list" :key="item.id" 
            :title="item.policyName" 
            :brief="item.absContent" 
            :id="item.id" 
            :src="item.mainImageUrl"
            :type="type" ></inforList>
        </van-list>
    </div>
</template>

<script>
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'
import inforList from './inforList'
import globalHeader from '@/components/header'

export default {
    data () {
        return {
            type: '', //大类，如商务
            classify: '', //文章小分类，如政策
            ajaxUrl: '',
            list: [],
            page: 0, //未支付
            limit: 10,
            totalPage: 1, //总页码
            scrollSetting: {
                loading: false,
                finished: false
            },
            title: ''
        };
    },
    components: {inforList, globalHeader},
    created() {
        let query = this.$route.query;
        let id = query.id;
        this.type = query.type;
        this.classify = query.classify;
        this.title = query.title;
        switch (Number(this.type)) {
            case 0:
            //招商
            this.ajaxUrl = apiUrl.inforPocilyList
            break;
            case 1:
            //商务  
            this.ajaxUrl = apiUrl.inforBusiList
            break;
            case 2:
            //租赁    
            this.ajaxUrl = apiUrl.inforRentList
            break;
        }
    },
    methods: {
        getList() {
            if (this.page < this.totalPage) {
                this.page += 1;
                ajaxGet(this.ajaxUrl, {
                    page: this.page,
                    limit: this.limit,
                    type: this.classify
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
.head {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 99;
}
</style>