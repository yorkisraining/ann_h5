<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-13 15:26:41
 * @LastEditors: Please set LastEditors
 -->
<!-- globalHeader -->
<template>
    <div class="g_title" :class="{'ios_devices': ifIosDevices}" v-if="ifShowHeader">
        <div class="return_icon" v-if="returnBtn" @click="() => {this.$router.go(-1)}"><i class="el-icon-arrow-left"></i></div>
        <div class="title">{{title | filterTitle}}</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ifIosDevices: false
        };
    },
    props: ['title', 'returnBtn', 'ifShowHeader'],
    created() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            this.ifIosDevices = true;
        }
    },
    filters: {
        filterTitle(val) {
            return val.length > 8 ? val.slice(0, 8) + '...' : val;
        }
    },
}

</script>
<style lang='less' scoped>
.g_title {
    height: .88rem;
    background-color: #0D9BED;
    color: #fff;
    line-height: .88rem;
    font-size: .38rem;
    font-weight: 500;
    position: relative;
    padding: 0 .3rem;
    /* Status bar height on iOS 11+ */
    padding-top: constant(safe-area-inset-top);
    &.ios_devices {
        padding-top: .4rem;
        height: 1.28rem;
        .return_icon {
            margin-top: .2rem;
        }
    }
    .title {
        margin: 0 auto;
        text-align: center;
    }
    .return_icon {
        position: absolute;
        left: 0;
        text-align: center;
        width: .8rem;
        top: 50%;
        transform: translateY(-50%);
    }
}


</style>