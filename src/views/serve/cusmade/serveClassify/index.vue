<!-- building/serveClassify 服务分类主 -->
<template>
    <div class="server_classify">
        <headerWithPhone :title="title" :linkMsg="''" class="head"></headerWithPhone>
        <!-- <div class="address_box">
            <div class="address_item">
                <img src="@/assets/address.png">
                <div>地址：<span>{{companyMsg.address}}</span></div>
            </div>
            <div class="tel" @click="telFn"><img src="@/assets/phone.png" /></div>
        </div> -->
        <div>
            <div class="serve_list">
                <van-list v-model="scrollSetting.loading"
                    :finished="scrollSetting.finished"
                    finished-text="没有更多了"
                    @load="getMsgList"
                >
                    <serveListCard v-for="item in serveList" :key="item.id"
                    :price="item.price"
                    :title="item.goodName"
                    :brief="item.remark"
                    :id="item.id"
                    :count="item.count"
                    :src="item.imageUrl"
                    :totalPrice="totalPrice"
                    :chooseListLength="chooseList.length"
                    @changePrice="changePrice"
                    @toThisDetail="toThisDetail"></serveListCard>
                </van-list>
            </div>
            <div class="cart">
                <div class="cart_left" @click="showCard">
                    <img src="@/assets/cart.png" class="cart_icon">
                    <div class="cart_price">
                        <div>合计:<span class="total_price">￥{{totalPrice | filterPrice}}</span></div>
                        <div class="preferent"><span v-show="preferentPrice != 0">已优惠{{preferentPrice | filterPrice}}</span><span v-show="preferentPrice == 0">无优惠</span></div>
                    </div>
                </div>
                <div class="cart_right cart_btn" @click="toPay">下单</div>
            </div>
            <!-- <van-popup v-model="isTelshow" position="bottom" class="popup_tel" >
                <div class="popup_box">
                    <div class="popup_top">
                        <div style="color: #999">拨打电话</div>
                        <div style="color: #333" @click="callTel">{{companyMsg.linkPhone}}</div>
                    </div>
                    <div class="popup_return" @click="returnFn" style="color: #666">返回</div>
                </div>
            </van-popup> -->
            <van-popup v-model="isCartshow" position="bottom" class="popup_cart">
                <div class="popup_cart_box">
                    <div class="popup_cart_preferent"><span v-show="preferentPrice != 0">有优惠券可使用，已优惠{{preferentPrice | filterPrice}}元</span><span v-show="preferentPrice == 0">无优惠</span></div>
                    <div class="popup_cart_title">已选服务</div>
                    <cartCard class="popup_cart_card" v-for="item in chooseList"
                    :key="item.id"
                    :id="item.id"
                    :title="item.name"
                    :price="item.price"
                    :count="item.count"
                    :totalPrice="totalPrice"
                    :chooseListLength="chooseList.length"
                    @changePrice="changePrice"></cartCard>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
import serveListCard from './serveListCard'
import cartCard from './cartCard'
import headerWithPhone from '@/components/headerWithPhone'
import { ajaxGet, ajaxPost } from '@/common/js/public'
import { apiUrl } from '@/common/js/api.js'
import { Toast } from 'vant';

export default {
    data () {
        return {
            scrollSetting: {
                loading: false,
                finished: false
            },
            page: 0,
            limit: 10,
            title: '',
            totalPage: 1,
            goodtype: '',
            //isTelshow: false,
            isCartshow: false,
            isClickPay: false, //点击下单按钮的flag
            preferentPrice: 0, //优惠金额
            totalPrice: 0, //总价
            chooseList: [],
            serveList: []
        };
    },
    components: {serveListCard, cartCard, headerWithPhone },
    created() {
        let query = this.$router.history.current.query;
        this.goodtype = query.goodtype;
        this.title = query.title;

        //重置vuex数据
        this.$store.commit('serveModule/initServeList');

    },
    filters: {
        filterPrice(val) {
            return (Number(val) / 100).toFixed(2);
        }
    },
    methods: {
        getMsgList() {
            if (this.page < this.totalPage) {
                this.page += 1;
                //获取商品列表
                ajaxGet(apiUrl.serveList, {
                    page: this.page,
                    limit: this.limit,
                    goodType: this.goodtype
                }, res => {
                    let list = res.list;
                    for (let i=0; i<list.length; i++) {
                        list[i]['count'] = 0;
                        this.serveList.push(list[i]);
                    }
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
        /* telFn() {
            this.isTelshow = true;
        },
        callTel() {
            window.location.href = `tel:${this.tel}`;
        }, */
        returnFn() {
            this.isTelshow = false;
            this.isCartshow = false;
        },
        showCard() {
            this.isCartshow = !this.isCartshow;
        },
        findChooseList(id) {
            for (let i=0; i<this.chooseList.length; i++) {
                if (this.chooseList[i].id == id) {
                    return i;
                }
            }
            return -1;
        },
        findServeList(id) {
            for (let i=0; i<this.serveList.length; i++) {
                if (this.serveList[i].id == id) {
                    return i;
                }
            }
        },
        changePrice(obj) {
            this.totalPrice += obj.type * obj.price;

            const cidx = this.findChooseList(obj.id),
                    sidx = this.findServeList(obj.id);

            let count = this.serveList[sidx].count + obj.type;

            //不管怎么样都先修改serlist里的count
            this.$set(this.serveList[sidx], 'count', count);

            if (obj.count == 0) {
                //count为0，chooseList删掉这个选择的商品
                this.chooseList.splice(cidx, 1);
            } else {
                if (cidx != -1) {
                    //找到了，修改chooselist里这个商品的数量
                    this.$set(this.chooseList[cidx], 'count', count);
                } else {
                    //没找到，添加进去
                    this.chooseList.push(this.serveList[sidx]);
                }
            }
            this.$store.commit('serveModule/changeServeList', {
                list: this.chooseList,
                total: this.totalPrice,
            });
        },
        toPay() {
            //下单
            console.log(234)
            if (this.chooseList.length > 0) {
                if (!this.isClickPay) {
                    this.isClickPay = true;
                    let list = [];
                    for (let i=0; i<this.chooseList.length; i++) {
                        list.push({
                            goodId: this.chooseList[i].id,
                            orderNum: this.chooseList[i].count
                        })
                    }
                    ajaxPost(apiUrl.pay, list, res => {
                        this.isClickPay = false;
                        this.$router.push(`/confirmOrder?id=${res}&type=1`);
                    }, res => {
                        this.isClickPay = false;
                    })
                }
            } else {
                Toast({
                    message: '请选择商品',
                    duration: 2000
                });
            }
        },
        toThisDetail(obj) {
            this.$router.push(`/serveDetail?id=${obj.id}&title=${obj.title}`);
        },
    }
}

</script>
<style lang='less' scoped>
.server_classify {
    padding-top: .32rem;
    .head {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 199;
    }
    .address_box {
        padding: .16rem .32rem;
        border-bottom: 1px solid #CBCBCB;
        font-size: .26rem;
        color: #999;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .address_item {
            display: flex;
            align-items: flex-end;
            img {
                width: .22rem;
                height: 100%;
                margin-right: .16rem;
            }
            span {
                color: #333;
            }
        }
        .tel img {
            width: .26rem;
            height: 100%;
        }
    }
    .serve_list {
        padding: 0 .32rem;
    }
    .popup_cart {
        bottom: 1.08rem;
    }
    .popup_tel {
        z-index: 199506060 !important;
    }
    .popup_box {
        font-size: .34rem;
        text-align: center;
        .popup_top {
            div {
                &:first-child {
                    margin: .25rem 0 .4rem;
                }
                &:last-child {
                    margin-bottom: .15rem;
                }
            }
            border-bottom: .1rem solid #f2f2f2;
        }
        .popup_return {
            padding: .25rem 0;
        }
    }
    .cart {
        position: fixed;
        bottom: 0;
        z-index: 19950606;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .12rem .32rem;
        background-color: #fff;
        border-top: 1px solid #CBCBCB;
        .cart_left {
            display: flex;
            align-items: center;
            .cart_icon {
                width: .6rem;
                height: 100%;
                margin-right: .2rem;
            }
            .cart_price {
                font-size: .26rem;
                color: #333;
                .total_price {
                    color: #F14D2A;
                    font-size: .38rem;
                }
                .preferent {
                    color: #F14D2A;
                    font-size: .2rem;
                }
            }
        }
        .cart_btn {
            background-image: linear-gradient(90deg, #FFCF47 0%, #FFA122 100%);
            border-radius: .36rem;
            color: #333;
            font-size: .32rem;
            width: 1.8rem;
            height: .74rem;
            text-align: center;
            line-height: .74rem;
        }
    }
    .popup_cart_box {
        .popup_cart_preferent {
            background-color: #FFF7E6;
            border-radius: 0 0 .1rem .1rem;
            color: #666;
            font-size: .2rem;
            text-align: center;
            padding: .1rem 0;
        }
        .popup_cart_title {
            padding: .23rem .32rem .4rem;
            font-size: .3rem;
            color: #999;
        }
        .popup_cart_card {
            margin-bottom: .6rem;
            &:last-child {
                margin-bottom: .36rem;
            }
        }
    }
}

</style>
