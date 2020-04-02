<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-14 09:47:59
 * @LastEditors: Please set LastEditors
 -->
<!-- serve/cusmade/cusCard 定制化服务展示卡片 -->
<template>
    <div class="card"  @click="toDetaill(id, title)">
        <div class="icon">
            <img src="@/assets/server_default.png" />
        </div>
        <div class="desc">
            <div class="title">{{title}}</div>
            <div class="brief">{{brief}}</div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
        };
    },
    props: ['src', 'title', 'brief', 'id'],
    methods: {
        toDetaill(id, title) {
            this.$emit('toDetail', {
                id: id,
                title: title
            });
        }
    }
}

</script>
<style lang='less' scoped>
.card {
    background-color: #fff;
    padding: .24rem;
    margin: .24rem .32rem 0 .32rem;
    display: flex;
    border-radius: .1rem;
    .icon {
        width: .48rem;
        height: .48rem;
        overflow: hidden;
        margin-right: .16rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .desc {
        width: calc(100% - .48rem - .16rem);
        .title {
            font-size: .34rem;
            color: #333;
            line-height: .48rem;
            font-weight: 600;
        }
        .brief {
            font-size: .26rem;
            color: #999;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>