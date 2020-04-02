<!-- serve/building/orderCard 楼宇服务卡片 -->
<template>
    <div class="order_card_contain">
        <div class="top_box">
            <div>
                <img class="icon" />
                <span>订单信息</span>
            </div>
            <div class="status_btn" :style="{backgroundColor: bgColor, color: cl}">{{status | filterStatus}}</div>
        </div>
        <div class="bottom_box">
            <div class="main_item">
                <span class="name">订单编号：</span>
                <span class="desc">{{orderId}}</span>
            </div>
            <div class="main_item">
                <span class="name">服务分类：</span>
                <span class="desc">{{orderType}}</span>
            </div>
            <div class="main_item">
                <span class="name">提交时间：</span>
                <span class="desc">{{createTime}}</span>
            </div>
            <div class="main_item">
                <span class="name">提交内容：</span>
                <span class="desc">{{contain}}</span>
            </div>
        </div>
        <div class="bottom_box" v-if="status != 2">
            <div class="main_item">
                <span class="name">处理备注：</span>
                <span class="desc">{{remark}}</span>
            </div>
            <div class="main_item">
                <span class="name">处理时间：</span>
                <span class="desc">{{doneTime}}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            bgColor: '#f2f2f2',
            cl: '#666'
        };
    },
    props: ['orderId', 'orderType', 'createTime', 'contain', 'remark', 'doneTime', 'status'],
    methods: {
    },
    created() {
        switch (this.status) {
            case 0:
                this.bgColor = '#F54C2A';
                this.cl = '#fff';
                break;
            case 2:
                this.bgColor = '#FFA11F';
                this.cl = '#fff';
                break;
            case 1:
                this.bgColor = '#f2f2f2';
                this.cl = '#666';
                break;
        }
    },
    filters: {
        filterStatus(val) {
            switch (val) {
                case 0:
                    return '未处理'
                    break;
                case 2:
                    return '处理中'
                    break;
                case 1:
                    return '已处理'
                    break;
            }
        }
    }
}

</script>
<style lang='less' scoped>
.order_card_contain {
    margin: 0 .32rem .24rem .32rem;
    padding: .24rem .24rem .16rem .16rem;
    background-color: #fff;
    border-radius: .1rem;
    .top_box {
        margin-bottom: .16rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .status_btn {
            width: 1.2rem;
            height: .48rem;
            line-height: .48rem;
            border-radius: .3rem;
            font-size: .26rem;
            text-align: center;
        }
    }
    .bottom_box {
        border-top: 1px solid #f2f2f2;
        margin: 0 .6rem;
        padding-top: .16rem;
        .main_item {
            margin-bottom: .16rem;
            line-height: .38rem;  
            font-size: .26rem;
            color: #333;
            display: flex;
            .name {
                color: #999;
                min-width: 1.3rem;
            }
        }
    }
}
</style>