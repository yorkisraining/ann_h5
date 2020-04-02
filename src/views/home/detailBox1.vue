<!-- home/detailBox1 上图下文 -->
<template>
    <div>
        <div class="box" @click="clickFn(link)">
            <div>
                <img :src="src" class="list_img">
            </div>
            <div class="list_desc">{{desc}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: ['desc', 'src', 'link'],
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
        margin-bottom: .4rem;
        padding: .1rem;
        cursor: pointer;
        .list_img {
            width: .8rem;
            height: .8rem;
            border-radius: 3px;
        }
        .list_desc {
            opacity: .8;
            text-align: left;
            font-size: .2rem;
            word-break: break-all;
        }
    }

    
</style>