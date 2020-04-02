<!-- activity  -->
<template>
    <div class="avtivity_box">
        <headerWithPhone :title="'活动'" :linkMsg="'报名记录'" class="head" @clickLink="toHis"></headerWithPhone>
        <van-tabs :swipe-threshold="3" :line-width="'.4rem'" color="#0D9BED" title-active-color="#0D9BED" sticky :offset-top="fixedTop"  :animated="true"  :swipeable="true">
            <van-tab v-for="item in activityTypeList" :key="item.id" :title="item.paramValue">
                <activityList :type="item.id"></activityList>
            </van-tab>
        </van-tabs>
        <div class="fix_bottom_nav">
            <el-row>
                <el-col :span="8" class="nav_item"  v-for="item in bottomNavList" :key="item.name">
                    <mainNav 
                    :title="item.title" 
                    :src="item.src" 
                    :mButton="'.1rem'"
                    :w="'.5rem'"
                    :h="'.5rem'"
                    :link="item.link"
                    @toThisNavEmit="toThisNav"></mainNav>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import headerWithPhone from '@/components/headerWithPhone'
import activityList from './activityList'
import mainNav from '@/components/mainNav'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            bottomNavList: [
                {
                name: 'home',
                title: '协同',
                src: require('@/assets/button_xt.png'),
                link: '/'
                },
                {
                name: 'project',
                title: '项目',
                src: require('@/assets/button_xm.png'),
                link: '/project'
                },
                {
                name: 'active',
                title: '活动',
                src: require('@/assets/button_hd_cur.png'),
                link: '/activity'
                },
            ],
            activityTypeList: [],
            fixedTop: 55
        };
    },
    components: {headerWithPhone, activityList, mainNav},
    created() {
        ajaxGet(apiUrl.activityTye, {}, res => {
            this.activityTypeList = res;
        })
    },
    mounted() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            //ios
        } else {
            // another
            this.fixedTop = 42;
        }
    },
    methods: {
        toHis() {
            this.$router.push('/activityHistory')
        },
        toThisNav(url) {
            this.$router.push(url);
        },
    }
}

</script>
<style lang='less' scoped>
.avtivity_box {
    .head {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 199;
    }
    .fix_bottom_nav {
        position: fixed;
        bottom: -1px;
        background-color: #fff;
        width: 100%;
        z-index: 19950606;
        background-attachment: fixed;
    }
}

</style>