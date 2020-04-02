<!-- inforList -->
<template>
    <div class="infor_list" @click="toArticle(id, title, type)">
        <div :class="['msg_box', {noImg: src == '' || src == null || src == undefined}]">
            <div class="title">{{title}}</div>
            <div class="brief" v-html="brief">{{brief}}</div>
        </div>
        <div class="img_box" v-if="src" :style="{'backgroundImage': 'url('+ src + ')'}">
            <!-- <img :src="src" /> -->
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        };
    },
    props: ['title', 'brief', 'src', 'id', 'type'],
    methods: {
        toArticle(id, title, type) {
            //跳转页面
            this.$router.push(`/inforArticle?id=${id}&type=${type}&title=${title}`)
        }
    }
}

</script>
<style lang='less' scoped>
.infor_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .24rem .32rem;
    .msg_box {
        width: calc(100% - .38rem - 2rem);
        .title {
            line-height: .45rem;
            font-size: .32rem;
            color: #333;
            margin-bottom: .08rem;
            width: 100%;
            /* overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; */
        }
        .brief {
            line-height: .3rem;
            font-size: .2rem;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        &.noImg {
            width: 100%;
        }
    }
    .img_box {
        width: 2rem;
        height: 1.4rem;
        border-radius: .04rem;
        margin-left: .38rem;
        overflow: hidden;
        background-size: cover;
        /* img {
            width: 100%;
            border-radius: .04rem;
        } */
    }
}
</style>