<!-- policyCard 标题 详情 列表 -->
<template>
    <div class="infor_card">
        <div class="title_box" @click="toDetailList(type, title)">
            <div class="left_item">
                <span class="title">{{title}}</span>
            </div>
            <!-- <div class="right_item" @click="toDetailList(type, title)">
                查看更多<i class="el-icon-arrow-right"></i>
            </div> -->
       </div>
       <div>
           <policyList v-for="item in list" 
           :key="item.id"
           :title="item.policyName" 
           :brief="item.absContent" 
           :id="item.id" 
           :inactivityTime="item.inactivityTime"
           :publishOrg="item.publishOrg" 
           :publishTime="item.publishTime"
           :src="item.mainImageUrl"></policyList>
       </div>
    </div>
</template>

<script>
import policyList from './policyList'

export default {
    data () {
        return {
        };
    },
    props: ['title', 'type', 'list', 'id'],
    components: {policyList},
    methods: {
        toDetailList(type, title) {
            //查看详情
           this.$router.push(`/policyList?type=${type}&title=${title}`);
        }
    }
}

</script>
<style lang='less' scoped>
.infor_card {
    background-color: #fff;
    margin-top: .16rem;
    .title_box {
        padding: .1rem .32rem;
        margin-bottom: .16rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .right_item {
            font-size: .22rem;
            color: #999;
            cursor: pointer;
        }   
        .title {
            font-size: .48rem;
            font-weight: 500;
            color: #333;
        }
    }
   
}
</style>