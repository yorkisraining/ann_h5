<!-- foods/hisCard -->
<template>
    <div class="hisCard_box">
        <div class="top_box">
            <span class="order_id">编号：{{id}}</span>
            <span class="status">{{status | filterStatus}}</span>
        </div>
        <div class="middle_box">
            <div class="title">{{actName}}</div>
            <div class="detail" @click="toDetail(actId)">详情</div>
        </div>
        <div class="bottom_box">
            <div>报名时间：{{auditTime}}</div>
            <div>备注：{{remark}}</div>
        </div>
    </div>
</template>

<script>
import { apiUrl } from '@/common/js/api'
import { ajaxGet } from '@/common/js/public.js'
import { Dialog  } from 'vant';

export default {
    data () {
        return {
        };
    },
    props: ['id', 'actId', 'status', 'actName', 'auditTime', 'remark'],
    filters: {
        filterStatus(val) {
            switch (val) {
                case 0:
                    return '已报名'
                    break;
                case 1:
                    return '已审核'
                    break;
            }
        },
    },
    methods: {
        toDetail(id) {
            //查看详情
            this.$router.push(`/activityDetail?id=${id}`);
        }
    }
}

</script>
<style lang='less' scoped>
.box {
    padding-bottom: .2rem;
    margin-bottom: .22rem;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    color: #333;
    font-size: .26rem;
}

.hisCard_box {
    padding: .24rem;
    margin-top: .24rem;
    background-color: #fff;
    border-radius: .1rem;
    overflow: hidden;
    .top_box {
        .box;
        .order_id {
            color: #999;
        }
        .status {
            color: #ffa036;
        }
    }
    .middle_box {
        .box;
        .detail {
            color: #F04D33;
        }
    }
    .bottom_box {
        font-size: .26rem;
        color: #999; 
        div {
            margin-bottom: .16rem;
            &:last-child {
                margin: 0;
            }
            span {
                color: #333;
            }
        }
    }   
}

</style>