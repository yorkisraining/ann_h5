<!-- building/serveClassify/cartCard 购物车商品列表 -->
<template>
    <div class="cart_card_list">
        <div class="title">{{title}}</div>
        <div class="price_box">
            <div class="price">￥<span>{{price | filterPrice}}</span></div>
            <div class="stepper">
                <span @click="sub(id, price)" class="btn sub">+</span>
                <span>{{tCount}}</span>
                <span @click="add(id, price)" class="btn add">+</span>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data () {
        return {
            tCount: this.count
        };
    },
    props: ['title', 'price', 'count', 'id'],
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
        sub(id, price) {
            if ( this.tCount > 0 ) {
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
            this.tCount++;
            this.$emit('changePrice', {
                id: id,
                price: price,
                count: this.tCount,
                type: 1
            })
        }
    }
}

</script>
<style lang='less' scoped>
.cart_card_list {
    display: flex;
    align-items: center; 
    justify-content: space-between;
    padding: 0 .32rem;
    .title {
        font-size: .34rem;
        color: #333;
    }
    .price_box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .price {
            font-size: .28rem;
            color: #F14D2A;
            margin-right: .6rem;
            span {
                font-size: .48rem;
            }
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
</style>