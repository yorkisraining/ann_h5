<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-13 14:45:06
 * @LastEditors: Please set LastEditors
 -->
<!-- foods 美食服务首页 -->
<template>
    <div class="foods_containt">
        <gheader :title="companyMsg.companyName" :linkMsg="'订单记录'" class="head" @clickLink="toHis" showMsg="false" @returnFn="headerReturnFn"></gheader>
        <div class="carousel_block">
            <van-swipe :autoplay="3000" :style="{'height': setting.height}">
                <van-swipe-item v-for="item in topCarImgList" :key="item.id" >
                    <img v-lazy="item.image"  @touchmove="toImgNavMove" @touchend="toImgNavUp(item.url)">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="address_box">
            <div class="address_item">
                <img src="@/assets/address.png">
                <div>地址：<span>{{companyMsg.signAddress}}</span></div>
            </div>
            <div class="tel" @click="telFn"><img src="@/assets/phone.png" /></div>
        </div>
        <van-popup v-model="isTelshow" position="bottom" class="popup_tel" >
            <div class="popup_box">
                <div class="popup_top">
                    <div style="color: #999">拨打电话</div>
                    <div style="color: #333" @click="callTel">{{companyMsg.linkPhone}}</div>
                </div>
                <div class="popup_return" @click="returnFn" style="color: #666">返回</div>
            </div>
        </van-popup>
        <div class="foods_list_box">
            <van-list v-model="scrollSetting.loading"
                :finished="scrollSetting.finished"
                finished-text="没有更多了"
                @load="getMsgList"
            >
                <foodsListCard v-for="item in coffeeList" :key="item.id"
                :price="item.price"
                :title="item.goodName"
                :brief="item.remark"
                :id="item.id"
                :src="item.imageUrl"
                :count="item.count"
                :totalPrice="totalPrice"
                :chooseListLength="chooseList.length"
                @changePrice="changePrice" ></foodsListCard>
            </van-list>
        </div>
        <div class="cart" @click="showCard">
            <div class="cart_left">
                <img src="@/assets/cart.png" class="cart_icon">
                <div class="cart_price">
                    <div>合计:<span class="total_price">￥{{totalPrice | filterPrice}}</span></div>
                    <div class="preferent"><span v-show="preferentPrice != 0">已优惠{{preferentPrice | filterPrice}}</span><span v-show="preferentPrice == 0">无优惠</span></div>
                </div>
            </div>
            <div class="cart_right cart_btn" @click.stop="toPay">下单</div>
        </div>
        <van-popup v-model="isCartshow" position="bottom" class="popup_cart">
            <div class="popup_cart_box">
                <div class="popup_cart_preferent"><span v-show="preferentPrice != 0">有优惠券可使用，已优惠{{preferentPrice | filterPrice}}元</span><span v-show="preferentPrice == 0">无优惠</span></div>
                <div class="popup_cart_title">已选服务</div>
                <cartCard class="popup_cart_card" v-for="item in chooseList"
                :key="item.id"
                :id="item.id"
                :title="item.goodName"
                :price="item.price"
                :count="item.count"
                :totalPrice="totalPrice"
                :chooseListLength="chooseList.length"
                @changePrice="changePrice"></cartCard>
            </div>
        </van-popup>
    </div>
</template>

<script>
import foodsListCard from './foodsListCard'
import cartCard from './cartCard'
import { ajaxGet, ajaxPost } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'
import { Toast } from 'vant';
import gheader from '@/components/headerWithDiyReturn'

export default {
    data () {
        return {
            setting: {
                height: '2.2rem',
                autoplay: true,
                interval: 2000,
                indicatorPosition: 'inside',
            },
            companyMsg: {},
            topCarImgList: [],
            page: 0,
            limit: 10,
            totalPage: 1,
            isTelshow: false,
            isCartshow: false,
            isClickPay: false, //点击下单按钮的flag
            totalPrice: 0, //总价
            scrollSetting: {
                loading: false,
                finished: false
            },
            coffeeList: [],
            chooseList: [],
            preferentPrice: 0, //优惠金额
            clickImageIndex: -1, //轮播图点击flag
        };
    },
    components: {foodsListCard, cartCard, gheader},
    filters: {
        filterPrice(val) {
            return (Number(val) / 100).toFixed(2);
        }
    },
    created() {
        this.$store.commit('cartModule/changeCoffeeReduce', this.reduce);

        //重置vuex数据
        this.$store.commit('cartModule/resetCoffee');

        //请求banner
        ajaxGet(apiUrl.banner, {
            type: 3
        }, res => {
            this.topCarImgList = res
        })

        //请求公司信息
        ajaxGet(apiUrl.coffeeMsg, {}, res => {
            this.companyMsg = res;
        })
    },
    methods: {
        toImgNavMove() {
            this.clickImageIndex = 1;
        },
        toImgNavUp(url) {
            if (this.clickImageIndex < 1) {
                if (!/http/.test(url)) {
                    url = `http://${url}`;
                }
                window.location.href = url;
            }
            this.clickImageIndex = -1;
        },
        headerReturnFn() {
            /* 支付页回来的带一个query参数 */
            if (this.$route.query.ifPay == 1) {
                this.$router.push('/middle');
            } else {
                this.$router.go(-1);
            }
        },
        getMsgList() {
            if (this.page < this.totalPage) {
                this.page += 1;
                //获取商品列表
                ajaxGet(apiUrl.coffeeGoods, {
                    page: this.page,
                    limit: this.limit
                }, res => {
                    this.totalPage = res.totalPage == 0 ? 1 : res.totalPage;
                    let list = res.list;
                    for (let i=0; i<list.length; i++) {
                        list[i]['count'] = 0;
                        this.coffeeList.push(list[i]);
                    }
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
        toThisNav(url) {
            //图片链接
            if (!/http/.test(url)) {
                url = `http://${url}`;
            }
            window.location.href = url;
        },
        toHis() {
            //服务记录
            this.$router.push('/coffeeHistory');
        },
        telFn() {
            this.isTelshow = true;
        },
        callTel() {
            window.location.href = `tel:${this.tel}`;
        },
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
        findFoodsList(id) {
            for (let i=0; i<this.coffeeList.length; i++) {
                if (this.coffeeList[i].id == id) {
                    return i;
                }
            }
        },
        changePrice(obj) {
            this.totalPrice += obj.type * obj.price;

            const cidx = this.findChooseList(obj.id),
                    sidx = this.findFoodsList(obj.id);

            let count = this.coffeeList[sidx].count + obj.type;

            this.coffeeList[sidx].count = count;

            if (obj.count == 0) {
                //count为0，chooseList删掉这个选择的商品
                this.chooseList.splice(cidx, 1);
            } else {
                if (cidx != -1) {
                    //找到了，修改chooselist里这个商品的数量
                    this.$set(this.chooseList[cidx], 'count', count);
                } else {
                    //没找到，添加进去
                    this.chooseList.push(this.coffeeList[sidx]);
                }
            }
            this.$store.commit('cartModule/changeCoffeeList', {
                list: this.chooseList,
                total: this.totalPrice,
            });

        },
        toPay() {
           //下单
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
                        this.$router.push(`/coffeeOrderComfirm?id=${res}&company=${this.companyMsg.companyName}&type=1`);
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
    },
}

</script>
<style lang='less' scoped>
.foods_containt {
    padding-bottom: 1.1rem;
    .head {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 199;
    }
    .el-carousel__item img {
        width: 100%;
        border-radius: 4px;
    }

    .carousel_block {
        margin-bottom: .15rem;
        margin-top: -1px;
        padding: .16rem .32rem;
    }

    .address_box {
        padding: .16rem .32rem;
        border-bottom: .1rem solid #f2f2f2;
        border-top:  1px solid #f2f2f2;
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

    .foods_list_box {
        padding: 0 .32rem;
        margin-top: .24rem;
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
        border-top: .01rem solid #CBCBCB;
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
