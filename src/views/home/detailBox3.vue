<!-- home/detailBox3 全图 -->
<template>
    <div>
        <div class="box" @click="clickFn(link)">
            <img v-lazy="src" class="list_img">
            <div class="top_mark">
                <div>{{topMark}}</div>
                <div class="go_now" :style="{backgroundColor: color}">立即查看<i class="el-icon-arrow-right"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: ['src', 'topMark', 'color', 'link'],
    methods: {
        clickFn(url) {
            this.$emit('toThisNavEmit', url);
        }
    }
}

</script>
<style lang='less' scoped>
    .box {
        text-align: center;
        padding: .1rem;
        position: relative;
        cursor: pointer;
        .list_img {
            border-radius: 4px;
            width: 100%;
            height: 2.4rem;
        }
        .top_mark {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
            font-size: .38rem;
            font-weight: bold;
            text-align: left;
            margin-left: .16rem;
            .go_now {
                padding: .08rem .12rem;
                border-radius: 22px;
                text-align: center;
                font-size: .2rem;
                font-weight: normal;
                margin-top: .1rem;
            }
        }
    }
    
</style>