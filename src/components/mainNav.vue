<!-- home/mainNav -->
<template>
    <div class="box" :style="{ marginBottom: mButton }" @click="clickFn(link, blank, title)">
        <div>
            <img :src="src" class="nav_img" :style="{width: w, height: h}">
        </div>
        <div class="nav_title">{{title}}</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: ['src', 'title', 'mButton', 'w', 'h', 'link', 'blank'],
    components: {},
    methods: {
        clickFn(url, blank, title) {
            if (title == '政策') {
                blank = false;
            }
            this.$emit('toThisNavEmit', url, blank);
        }
    }
}

</script>
<style lang='less' scoped>
    .box {
        text-align: center;
        padding-top: .1rem;
        cursor: pointer;
        .nav_img {
            margin-bottom: .04rem;
        }
        .nav_title {
            font-size: .2rem;
            color: #333;
        }
    }

    

</style>