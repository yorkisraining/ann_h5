<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-09 11:35:04
 * @LastEditors: Please set LastEditors
 -->
<!-- home/carouselWithDesc 左图右字无时间有背景 -->
<template>
    <div class="with_desc_carousel" :style="{backgroundColor: bgColor % 2 == 0 ? '#F0F5FF' : '#FFF1F0'}" @click="clickFn(link)">
        <div class="list_img" :style="{'backgroundImage': 'url('+ src + ')'}">
            <!-- <img :src="src"> -->
        </div>
        <div class="list_desc">
            <p class="title">{{title | filterTitle}}</p>
            <p class="remark">{{desc | filterDesc}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: ['src', 'title', 'desc', 'bgColor', 'link', 'importantFlag'],
    filters: {
        filterTitle(val) {
            if (val) {
                return val.length > 16 ? val.slice(0, 16) + '...' : val;
            }
        },
        filterDesc(val) {
            if (val) {
                return val.length > 20 ? val.slice(0, 20) + '...' : val;
            }
        }
    },
    methods: {
        clickFn(url) {
            this.$emit('toDetailFrames', url, '项目');
        }
    }
}

</script>
<style lang='less' scoped>
    .with_desc_carousel {
        //width: 6.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .24rem;
        cursor: pointer;
        border-radius: 4px;
        .list_img {
            border-radius: 4px;
            width: 2.68rem;
            height: 1.92rem;
            margin-right: .24rem;
            overflow: hidden;
            flex-shrink: 0;
            background-size: cover;
            /* img {
                width: 100%;
            } */
        }
        .list_desc {
            opacity: .8;
            text-align: left;
            word-break: break-all;
            width: 100%;
            .title {
                font-size: .32rem;
                font-weight: 600;
                color: #333;
                margin-bottom: .04rem;
            }
            .remark {
                font-size: .24rem;
                line-height: 1.5;
                color: #666;
            }
        }
    }
</style>