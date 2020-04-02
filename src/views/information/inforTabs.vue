<!-- inforTabs -->
<template>
    <div>
        <div class="carousel_block">
            <van-swipe :autoplay="3000" :style="{'height': setting.height}">
                <van-swipe-item v-for="item in topCarImgList" :key="item.id" >
                    <img v-lazy="item.image"  @touchmove="toImgNavMove" @touchend="toImgNavUp(item.url)">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div>
            <inforCard v-for="(item, index) in inforCardList" :key="index" :title="item.typeName" :type="type" :classify="item.type" :list="item.list"></inforCard>
        </div>
    </div>
</template>

<script>
import inforCard from './inforCard'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            setting: {
                height: '2.2rem',
                autoplay: true,
                interval: 2000,
                indicatorPosition: 'inside',
            },
            topCarImgList: [],
            inforCardList: [],
            clickImageIndex: -1, //轮播图点击flag
        };
    },
    /* type 0招商信息 1商务信息 2租赁信息 */
    props: ['type'],
    components: {inforCard},
    created() {
        switch (Number(this.type)) {
            case 0:
            this.getBanner(apiUrl.banner, 5);
            this.getList(apiUrl.inforPocilyIndex);
                break;
            case 1:
            this.getBanner(apiUrl.banner, 6);
            this.getList(apiUrl.inforBusiIndex);    
                break;
            case 2:
            this.getBanner(apiUrl.banner, 7);
            this.getList(apiUrl.inforRentIndex);    
                break;
        }
        
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
        getBanner(url, type) {
            ajaxGet(url, {
                type: type
            }, res => {
                this.topCarImgList = res;
            })
        },
        getList(url) {
            ajaxGet(url, {
                num: 5
            }, res => {
                this.inforCardList = res
                console.log(this.inforCardList)
            })
        },
        toThisNav(url) {
            if (!/http/.test(url)) {
                url = `http://${url}`;
            }
            window.location.href = url;
        }
    },
}

</script>
<style lang='less' scoped>
    .el-carousel__item img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }

    .carousel_block {
        margin-bottom: .15rem;
        margin-top: -1px;
        padding: .24rem .32rem;
        background-color: #fff;
    }
</style>