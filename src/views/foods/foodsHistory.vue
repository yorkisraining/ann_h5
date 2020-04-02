<!-- foods/foodsHistory 订单记录 -->
<template>
    <div class="order_history food_order_history" :style="{minHeight: minH + 'px'}">
        <gHeader :title="'订单记录'" class="head" showMsg="false" @returnFn="returnFn"></gHeader>
        <div class="tabs_box">
            <van-tabs sticky :offset-top="fixedTop"  :animated="true"  :swipeable="true">
                <van-tab title="未消费" class="scroll_item">
                    <van-list v-model="scrollSetting1.loading"
                        :finished="scrollSetting1.finished"
                        finished-text="没有更多了"
                        @load="getHisList1"
                    >
                    <hisCard v-for="item in hisCardList1" :key="item.id" 
                    v-if="item.status == 0 || item.status == 1 || item.status == 3" 
                    :status="item.status" 
                    :orderList="item.detailList" 
                    :orderId="item.id" 
                    :checkCode="item.checkCode" 
                    :useType="item.useType" 
                    :orderTime="item.createTime" 
                    :appointTime="item.bookTime" 
                    @refund="refund"
                    @toPay="toPay"  
                    @cancelOrder="cancelOrder"></hisCard>
                    </van-list>
                </van-tab>
                <van-tab title="历史订单" class="scroll_item">
                    <van-list v-model="scrollSetting2.loading"
                        :finished="scrollSetting2.finished"
                        finished-text="没有更多了"
                        @load="getHisList2"
                    >
                    <hisCard v-for="item in hisCardList2" :key="item.id" 
                    v-if="item.status != 0" 
                    :status="item.status" 
                    :orderList="item.detailList" 
                    :orderId="item.id" 
                    :orderTime="item.createTime" 
                    :appointTime="item.bookTime" 
                    :checkCode="item.checkCode" 
                    :useType="item.useType" 
                    @refund="refund"
                    @toPay="toPay"  
                    @cancelOrder="cancelOrder"></hisCard>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
        <van-popup v-model="showRefundPopup" :style="{ width: '80%', padding: '16px' }">
            <van-field
                v-model="refundResult"
                required
                clearable
                label="原因"
                placeholder="请输入退款原因"
                :error="ifError"
                @focus="() => {this.ifError = false}"
            />
            <van-button type="primary" size="small" style="margin-top: 16px" @click="refundFn">确定退款</van-button>
            <van-button type="default" size="small" style="margin-top: 16px" @click="() => {this.showRefundPopup = false}">取消</van-button>
        </van-popup>
    </div>
</template>

<script>
import hisCard from './hisCard'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'
import { Dialog, Toast  } from 'vant'
import axios from 'axios'
import gHeader from '@/components/headerWithDiyReturn'

export default {
    data () {
        return {
            minH: 0,
            hisCardList1: [],
            hisCardList2: [],
            page1: 0, //未支付
            page2: 0, //历史订单
            limit: 10,
            totalPage1: 1,
            totalPage2: 1,
            scrollSetting1: {
                loading: false,
                finished: false
            },
            scrollSetting2: {
                loading: false,
                finished: false
            },
            refundResult: '',
            showRefundPopup: false,
            ifError: false,
            refundId: '',
            fixedTop: 58
        };
    },
    components: {hisCard, gHeader},
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
    beforeRouteLeave (to, from, next) {
        if(to.path.indexOf('/') == 0) {
            next();
        } else {
            this.$router.push('/');
        }
    },
    methods: {
        returnFn() {
            /* 支付页回来的带一个query参数 */
            if (this.$route.query.ifPay == 1) {
                this.$router.push('/middle');
            } else {
                this.$router.go(-1);
            }
        },
        getHisList1() {
            if (this.page1 < this.totalPage1) {
                this.page1 += 1;
                ajaxGet(apiUrl.spwOrderList, {
                    page: this.page1,
                    limit: this.limit,
                    status: '0,1,3'
                }, res => {
                    this.hisCardList1 = this.hisCardList1.concat(res.list);
                    this.totalPage1 = res.totalPage == 0 ? 1 : res.totalPage1;
                    this.scrollSetting1.loading = false;
                }, res => {
                    this.scrollSetting1.loading = false;
                    this.scrollSetting1.finished = true;
                })
            } else {
                this.scrollSetting1.finished = true;
                this.scrollSetting1.loading = false;
            }
        },
        getHisList2() {
            if (this.page2 < this.totalPage2) {
                this.page2 += 1;
                ajaxGet(apiUrl.spwOrderList, {
                    page: this.page2,
                    limit: this.limit
                }, res => {
                    this.hisCardList2 = this.hisCardList2.concat(res.list);
                    this.totalPage2 = res.totalPage == 0 ? 1 : res.totalPage2;
                    this.scrollSetting2.loading = false;
                }, res => {
                    this.scrollSetting2.loading = false;
                    this.scrollSetting2.finished = true;
                })
            } else {
                this.scrollSetting2.finished = true;
                this.scrollSetting2.loading = false;
            }
        },
        toPay(obj) {
            //去支付
            this.$router.push(`/foodsOrderComfirm?type=2&id=${obj.id}`);
        },
        cancelOrder(obj) {
            let findOrder = (id, list) => {
                for (let i=0; i<list.length; i++) {
                    if (list[i].id == id) {
                        list[i].status = 9;
                    }
                }
            }

            findOrder(obj.id, this.hisCardList1)
            findOrder(obj.id, this.hisCardList2)
        },
        refundOrder(objId) {
            let findOrder = (id, list) => {
                for (let i=0; i<list.length; i++) {
                    if (list[i].id == id) {
                        list[i].status = 5;
                    }
                }
                
            }

            findOrder(objId, this.hisCardList1)
            findOrder(objId, this.hisCardList2)
        },
        refund(obj) {
            this.showRefundPopup = true;
            this.refundId = obj.id;
        },
        refundFn() {
            //退款
            if (!this.refundResult) {
                this.ifError = true;
                return false;
            }
            this.ifError = false;
            Dialog.confirm({
                message: '是否确认退款？'
            }).then(() => {
                // on confirm
                this.showRefundPopup = false;
                axios.get(apiUrl.refund, {
                    params: {
                        'orderId': this.refundId,
                        'reason': this.refundResult
                    }
                })
                .then(res => {
                    res = res.data.result;
                    if (res.code == 10000) {
                        //退款成功
                        this.refundOrder(this.refundId)
                        this.refundResult = '';
                    } else {
                        //退款失败
                        Toast.fail('退款失败');
                    }
                })
            }).catch((err) => {
                this.refundResult = '';
                this.showRefundPopup = false;
            });
        },
    }
}

</script>
<style lang='less' scoped>
.order_history {
    background-color: #f3f3f3;
    .head {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 199;
    }
    .scroll_item {
        padding: 0 .32rem .24rem;
        border-radius: .1rem;
    }
}
</style>