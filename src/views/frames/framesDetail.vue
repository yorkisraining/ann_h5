<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 11:17:20
 * @LastEditTime: 2019-08-09 11:40:02
 * @LastEditors: Please set LastEditors
 -->
<!-- framesDetail -->
<template>
    <div class="iframes">
        <globalHeader :title="title" :returnBtn="true" :ifShowHeader="true" class="head"></globalHeader>
        <iframe :src="reportUrl" width="100%" :height="height" frameborder="0" scrolling="no"></iframe>
    </div>
</template>

<script>
import globalHeader from '@/components/header'

export default {
    data () {
        return {
            reportUrl: '',
            height: 0,
            title: '',
        };
    },
    components: {globalHeader},
    created() {
        console.log(this.$route.query)
        this.height = document.documentElement.clientHeight - 60;
        this.reportUrl = this.$route.query.url;
        this.title = this.$route.query.title;
    },
}

</script>
<style lang='less' scoped>
.head {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 99;
}
</style>
