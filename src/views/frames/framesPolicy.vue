<!-- framesPolicy 政策 -->
<template>
    <div class="iframes">
        <iframe :src="reportUrl" width="100%" :height="height" frameborder="0" scrolling="no"></iframe>
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
import mainNav from '@/components/mainNav'

export default {
    data () {
        return {
            reportUrl: 'https://111.59.18.58:18501/km/institution/km_institution_knowledge/kmInstitutionKnowledge.do?method=listChildren&type=category&categoryId=16c3bc137a681c60deb2bf74a0c930fe#cri.q=docStatus:30',
            height: 0,
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
                src: require('@/assets/button_hd.png'),
                link: '/activity'
                },
            ],
        };
    },
    components: {mainNav},
    created() {
        this.height = document.documentElement.clientHeight - 115;
    },
    methods: {
        toThisNav(url) {
            this.$router.push(url);
        },
    }
}

</script>
<style lang='less' scoped>
    .fix_bottom_nav {
        position: fixed;
        bottom: -1px;
        background-color: #fff;
        width: 100%;
        z-index: 19950606;
        background-attachment: fixed;
    }
</style>
