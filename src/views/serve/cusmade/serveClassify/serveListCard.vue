<!-- building/serveClassify/serveListCard 图 名称 价格 数量卡 -->
<template>
    <div class="serve_list_card"  @click="changeRouter(id, title)">
        <div class="serve_img" :style="{'backgroundImage': 'url('+ src + ')'}">
            <!-- <img :src="src" alt=""> -->
        </div>
        <div class="serve_detail">
            <div class="title">{{title}}</div>
            <div class="brief">{{brief}}</div>
            <div class="price_box">
                <div class="price" v-if="price > 0">￥<span>{{price | filterPrice}}</span></div>
                <div class="free" v-else>免费</div>
                <div class="stepper">
                    <span @click.stop="sub(id, price)" class="btn sub" v-show="tCount != 0">-</span>
                    <span v-show="tCount != 0">{{tCount}}</span>
                    <span @click.stop="add(id, price)" class="btn add">+</span>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
import { Toast } from 'vant';

export default {
    data () {
        return {
            tCount: this.count
        };
    },
    props: ['title', 'brief', 'price', 'src', 'id', 'totalPrice', 'chooseListLength', 'count'],
    watch: {
        count(val) {
            this.tCount = val;
        }
    },
    filters: {
        filterPrice(val) {
            return (Number(val) / 100).toFixed(2);
        }
    },
    methods: {
        isCanChange(price) {
            /* 
                1.如果当前选择商品的价格为0，并且当前总价不为零
                2.当前选择商品价格不为零，当前总价为零，chooseList.length不为零
                以上两种情况时，有异常提示
            */
            if ((price == 0 && this.totalPrice != 0) || (price != 0 && this.totalPrice == 0 && this.chooseListLength != 0)) {
                // 不能共存,异常提示 
                Toast({
                    message: '请不要同时选择免费和付费商品',
                    duration: 2000
                })
                return false;
            }
            return true;
        },
        sub(id, price) {
            if (this.isCanChange(price) ) {
                this.tCount--;
                this.$emit('changePrice', {
                    id: id,
                    price: price,
                    count: this.tCount,
                    type: -1
                })
            }
            
        },
        add(id, price) {
            if (this.isCanChange(price) ) {
                this.tCount++;
                this.$emit('changePrice', {
                    id: id,
                    price: price,
                    count: this.tCount,
                    type: 1
                })
            }
        },
        changeRouter(id, title) {
            this.$emit('toThisDetail', {
                id: id,
                title: title
            })
        }
    }
}

</script>
<style lang='less' scoped>
.serve_list_card {
    display: flex;
    align-items: top; 
    margin-bottom: .48rem;
    .serve_img {
        width: 1.8rem;
        overflow: hidden;
        margin-right: .24rem;
        border-radius: 4px;
        background-size: cover;
        img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
        }
    }
    .serve_detail {
        width: calc(100% - 1.8rem - .24rem);
        .title {
            font-size: .34rem;
            line-height: .48rem;
            color: #333;
        }
        .brief {
            font-size: .26rem;
            color: #999;
            width: 100%;
            line-height: .38rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .price_box {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: .24rem;
            .price {
                font-size: .28rem;
                color: #F14D2A;
                span {
                    font-size: .48rem;
                }
            }
            .free {
                font-size: .28rem;
                color: #999;
            }
            .stepper {
                span {
                    display: inline-block;
                    text-align: center;
                    font-size: .28rem;
                    margin-left: .16rem;
                }
                .btn {
                    border-radius: 50%;
                    height: .48rem;
                    width: .48rem;
                    line-height: .48rem;
                    color: #333;
                    background-color: #FFA122;
                    &.sub {
                        background-color: #fff;
                        color: #999;
                        border: .02rem solid #CBCBCB;
                    }
                }
            }
        }
    }
}
</style>