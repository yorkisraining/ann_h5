<!-- inforCard 标题 详情 列表 -->
<template>
    <div class="infor_card">
        <div class="title_box">
            <div class="left_item">
                <span class="title">{{title}}</span>
            </div>
            <div class="right_item" @click="toDetailList(type, classify, title)">
                查看更多<i class="el-icon-arrow-right"></i>
            </div>
       </div>
       <div>
           <inforList v-for="item in list" :key="item.id" 
           :title="item.policyName" 
           :brief="item.absContent" 
           :id="item.id" 
           :type="type"
           :src="item.mainImageUrl"></inforList>
       </div>
    </div>
</template>

<script>
import inforList from './inforList'

export default {
    data () {
        return {
            infornList: []
        };
    },
    props: ['title', 'classify', 'type', 'list', 'id'],
    components: {inforList},
    methods: {
        toDetailList(type, classify, title) {
            //查看详情
           this.$router.push(`/inforDetails?&type=${type}&classify=${classify}&title=${title}`);
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
        margin-bottom: .2rem;
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
            font-size: .38rem;
            font-weight: 500;
            color: #333;
        }
    }
   
}
</style>