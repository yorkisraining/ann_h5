<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-06-24 09:16:25
 * @LastEditors: your name
 -->
<!-- globalHeaderWithLink -->
<template>
    <div class="g_title" :class="{'ios_devices': ifIosDevices}">
        <div class="return_icon" @click="() => {this.$router.go(-1)}"><i class="el-icon-arrow-left"></i></div>
        <div class="title">{{title | filterTitle}}</div>
        <div class="link" @click="clickPhone">{{linkMsg}}</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ifIosDevices: false
        };
    },
    props: ['title', 'returnBtn', 'linkMsg'],
    created() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            this.ifIosDevices = true;
        }
    },
    filters: {
        filterTitle(val) {
            if (val != '' && val != undefined) {
                return val.length > 8 ? val.slice(0, 8) + '...' : val;
            }
            return ''
        }
    },
    methods: {
        clickPhone() {
            this.$emit('clickLink');
        }
    }
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
        .link {
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
        top: 50%;
        width: .8rem;
        transform: translateY(-50%);
    }
    .link {
        position: absolute;
        right: .3rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: .3rem;
        color: #fff;
    }
}


</style>