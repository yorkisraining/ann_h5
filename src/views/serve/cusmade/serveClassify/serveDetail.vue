<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-12 10:55:58
 * @LastEditors: Please set LastEditors
 -->
<!-- building/serveClassify/serveDetail 服务详情 -->
<template>
    <div class="serve_detail_box">
        <globalHeader :title="headeTitle" :returnBtn="true" :ifShowHeader="true" class="head"></globalHeader>
        <div class="serve_list_card">
            <div class="serve_img">
                <img :src="src" alt="">
            </div>
            <div class="serve_detail">
                <div class="title">{{title}}</div>
                <div class="brief">{{brief}}</div>
                <div class="price_box">
                    <div class="price">￥<span>{{price | filterPrice}}</span></div>
                </div>
            </div>
        </div> 
        <div class="article_box" v-html="article"></div>
    </div> 
</template>

<script>
import globalHeader from '@/components/header'
import {ajaxGet} from '@/common/js/public'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            headeTitle: 'tite',
            id: 0,
            price: 0,
            title: '',
            brief: '',
            article: '',
            src: ''
        }
    },
    filters: {
        filterPrice(val) {
            return (Number(val) / 100).toFixed(2);
        }
    },
    created() {
        let query = this.$route.query;
        this.id = query.id;
        this.headeTitle = query.title;

        ajaxGet(`${apiUrl.baseURL}app/good/info/service/${this.id}`, {}, res => {
            this.address = res.company.address;
            this.tel = res.company.linkPhone;
            let list = res.goodList[0];
            this.article = list.goodContent;
            this.src = list.imageUrl;
            this.title = list.goodName;
            this.price = list.price;
            this.brief = list.remark;
        })
    },
    components: {globalHeader}
}

</script>
<style lang='less' scoped>
.serve_detail_box {
    .head {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 99;
    }
    .serve_list_card {
        display: flex;
        align-items: top; 
        border-bottom: .16rem solid #F5F8FD;
        padding: .24rem .32rem;
        .serve_img {
            width: 1.8rem;
            height: 1.8rem;
            overflow: hidden;
            margin-right: .24rem;
            img {
                width: 100%;
                height: 100%;
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
            }
        }
    }
    .article_box {
        padding: .24rem .32rem;
        img {
            width: 100%;
        }
    }
}
</style>