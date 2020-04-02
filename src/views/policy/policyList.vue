<!-- policyList -->
<template>
    <div class="infor_list" :class="{'over_time': ifOverTime}" @click="toArticle(id, title)">
        <div :class="['msg_box', {noImg: src == '' || src == null || src == undefined}]">
            <div class="title">{{title}}</div>
            <div class="brief" v-html="brief">{{brief}}</div>
            <div class="time">{{publishOrg}} | {{publishTime}}</div>
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
    props: ['title', 'brief', 'src', 'id', 'inactivityTime', 'publishOrg', 'publishTime'],
    computed: {
        ifOverTime() {
            if (new Date(this.inactivityTime) < new Date().getTime()) {
                return true;
            }
            return false;
        }
    },
    methods: {
        toArticle(id, title) {
            //跳转页面
            this.$router.push(`/policyArticle?id=${id}&title=${title}`)
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
    background-color: #fff;
    &.over_time {
        opacity: .6;
    }
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
            font-size: .22rem;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: .16rem;
        }
        .time {
            line-height: .3rem;
            font-size: .22rem;
            color: #666;
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