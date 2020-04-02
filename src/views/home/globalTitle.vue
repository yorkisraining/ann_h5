<!-- home/globalTitle -->
<template>
    <div class="box">
       <div class="left_item">
           <span class="title">{{title}}</span>
       </div>
       <div class="right_item" v-if="showMore"  @click="clickFn(link)">
           更多<i class="el-icon-arrow-right"></i>
       </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: ['title', 'showMore', 'link'],
    methods: {
        clickFn(url) {
            this.$emit('toThisNavEmit', url);
        }
    }
}

</script>
<style lang='less' scoped>
    .box {
        padding: .1rem .2rem;
        margin-bottom: .2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .right_item {
            font-size: .22rem;
            color: #999;
            cursor: pointer;
        }   
        .title {
            font-size: .38rem;
            font-weight: 500;
            color: #333;
        }
    }
</style>