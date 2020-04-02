<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-14 14:59:27
 * @LastEditors: Please set LastEditors
 -->
<!-- home/home.vue -->
<template>
    <div class="home_contain" :class="{'ios_devices_home': ifIosDevices}">
        <div class="g_title" :class="{'ios_devices': ifIosDevices}">
            <div class="return_icon" @click.stop="closeThisWeb"><i class="el-icon-arrow-left"></i></div>
            <div class="title">{{thisTitle | filterTitle}}</div>
        </div>
        <pull-to :top-load-method="onPullingDown" 
        :top-config="{
            pullText: ''    
        }">
        <div class="home_contain_padding">
            <div class="carousel_block">
                <van-swipe :autoplay="3000" :style="{'height': setting.height}">
                    <van-swipe-item v-for="item in imageList" :key="item.id" >
                        <img v-lazy="item.image" :alt="item.remark" @touchmove="toImgNavMove" @touchend="toImgNavUp(item.url)">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="nav_block">
                <el-row>
                    <el-col :span="6" class="nav_item"  v-for="item in appList" :key="item.id">
                        <mainNav
                        :title="item.title"
                        :src="item.image"
                        :mButton="'.2rem'"
                        :w="'.8rem'"
                        :h="'.8rem'"
                        :link="item.url"
                        :blank="item.url != '/serve' ? true : false"
                        @toThisNavEmit="toThisNav"></mainNav>
                    </el-col>
                </el-row>
            </div>
            <div class="list_item qy_block">
                <!-- <div class="qy_title"  @click="toThisNav('/framesCompany')">入驻企业成果展示<i class="el-icon-arrow-right"></i></div> -->
                <div class="qy_title"  @click="toThisNav('/company')">入驻企业成果展示<i class="el-icon-arrow-right"></i></div>
                <div class="qy_detail_box_wrap">
                    <div v-for="item in companyPerformanceList" :key="item.fdId" class="qy_detail_box" @click="toCompanyDetail(item.fdId, item.title)">
                        <div class="qy_block_img" :style="{'backgroundImage': 'url('+ item.imageUrl + ')'}">
                            <!-- <img v-lazy="item.imageUrl"> -->
                        </div>
                        <div class="qy_block_name">{{item.companyShortName | filterCompanyTitle}}</div>
                        <div class="qy_block_desc">{{item.title | filterCompanyContent}}</div>
                    </div>
                </div>
            </div>
            <div class="list_item">
                <globalTitle :title="'资讯'"  :link="'/information'" :showMore="true" @toThisNavEmit="toThisNav"></globalTitle>
                <detailBox2 v-for="item in inforList"
                :key="item.id+''+item.typeFlag"
                :title="item.policyName"
                :remark="item.absContent"
                :src="item.mainImageUrl"
                :id="item.id"
                :link="item.link"
                :typeName="item.typeName"
                :createTime="item.createTime"
                :typeFlag="item.typeFlag"
                @toThisNavEmit="toThisNav"></detailBox2>
            </div>
            <div class="list_item">
                <globalTitle :title="'美食'"  :link="'/'" :showMore="false" @toThisNavEmit="toThisNav"></globalTitle>
                <el-row>
                    <el-col :span="12" class="nav_item" v-for="item in cateList" :key="item.id">
                        <detailBox3
                        :src="item.src"
                        :topMark="item.topMark"
                        :color="item.color"
                        :link="item.link"
                        @toThisNavEmit="toThisNav"
                        ></detailBox3>
                    </el-col>
                </el-row>
            </div>
            <div class="list_item">
                <globalTitle :title="'项目信息'" :link="projectCenterUrl" :showMore="true" @toThisNavEmit="toThisNav"></globalTitle>
                <div class="slider_block_wrap">
                    <!-- <ul class="slider_block clearfix" :style="{width: companyProjectWidth}">
                        <li v-for="(item, index) in companyProjectList" :key="item.fdId">
                            <carouselWithDesc
                            :src="item.imageUrl"
                            :title="item.title"
                            :desc="item.absContent"
                            :bgColor="index"
                            :importantFlag="item.importantFlag"
                            :link="item.linkUrl"
                            @toDetailFrames="toProjectDetail(item.fdId, item.title)"></carouselWithDesc>
                        </li>
                    </ul> -->
                    <van-swipe :style="{'height': '2.5rem'}" :loop="false">
                        <van-swipe-item v-for="(item, index) in companyProjectList" :key="item.fdId"
                        @touchmove="touchProjectMove"
                        @touchend="touchProjectUp(item.fdId, item.title)" >
                            <carouselWithDesc
                            :src="item.imageUrl"
                            :title="item.title"
                            :desc="item.absContent"
                            :bgColor="index"
                            :importantFlag="item.importantFlag"
                            :link="item.linkUrl"
                        ></carouselWithDesc>
                        </van-swipe-item>
                        <div slot="indicator"></div>
                    </van-swipe>
                </div>
            </div>
        </div>
        </pull-to>
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
import globalTitle from './globalTitle'
import detailBox1 from './detailBox1'
import detailBox2 from './detailBox2'
import detailBox3 from './detailBox3'
import carouselWithDesc from './carouselWithDesc'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'
import { Toast, Dialog  } from 'vant'
import PullTo from 'vue-pull-to'

export default {
    data () {
        return {
            thisTitle: '中国-东盟新型智慧城市协同创新中心',
            refreshSetting: {
                pullDownRefreshObj: {
                    threshold: 90,
                    stop: 40
                },
                scrollbarObj: {
                    fade: true
                },
                startY: 0,
            },
            bottomNavList: [
                {
                name: 'home',
                title: '协同',
                src: require('@/assets/button_xt_cur.png'),
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
            setting: {
                height: '2.2rem',
                autoplay: true,
                interval: 2000,
                indicatorPosition: 'inside',
            },
            appList: [],
            cateList: [
                {
                    id: 4001,
                    src: require('@/assets/coffe.jpg'),
                    topMark: '咖啡厅',
                    color: '#807AFF',
                    link: '/coffee',
                },
                {
                    id: 4002,
                    src: require('@/assets/th.jpg'),
                    topMark: '三品王',
                    color: '#FE5FD9',
                    link: '/foods',
                },
            ],
            imageList: [], //轮播图
            companyPerformanceList: [], //企业成果列表
            companyProjectList: [], //项目列表
            inforList: [], //资讯
            projectCenterUrl: '/project', //项目中心链接,
            companyProjectWidth: '6.2rem', //项目列表宽
            ifIosDevices: false,
            clickImageIndex: -1, //轮播图点击flag
            clickProjectIndex: -1, //项目轮播点击flag
            refreshLoading: false,
            completed: false,
        };
    },
    components: {mainNav, globalTitle, detailBox1, detailBox2, detailBox3, carouselWithDesc, PullTo},
    filters: {
        filterCompanyTitle(val) {
            if (val) {
                return val.length > 6 ? val.slice(0, 6) : val;
            }
        },
        filterCompanyContent(val) {
            if (val) {
                return val.length > 15 ? val.slice(0, 15) + '...' : val;
            }
        },
        filterTitle(val) {
            return val.length > 8 ? val.slice(0, 8) + '...' : val;
        }
    },
    created() {
        if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
            this.ifIosDevices = true;
        }

        //获取tooken
        try {
            if (sessionStorage.getItem('token') == null && this.$store.state.homeModule.token == '') {
                let code = /\^?code=\w+/.exec(window.location.href)[0].split('=')[1];

                ajaxGet(apiUrl.token, {
                    code: code
                }, res => {
                    sessionStorage.setItem('token', res.token);
                    this.$store.commit('homeModule/changeToken', res.token);
                })

                /* ajaxGet(apiUrl.testToken, {}, res => {
                    sessionStorage.setItem('token', res.token);
                    this.$store.commit('homeModule/changeToken', res.token);
                }) */
            }
        } catch (error) {
            //console.log('获取code出错：' + error);
            //Toast('获取code出错：' + error);
        }

    },
    mounted() {
        this.getData();
    },
    methods: {
        touchProjectMove() {
            this.clickImageIndex = 1;
        },
        touchProjectUp(id, title) {
            if (this.clickImageIndex < 1) {
                this.toProjectDetail(id, title);
            }
            this.clickImageIndex = -1;
        },
        toImgNavMove() {
            this.clickImageIndex = 1;
        },
        toImgNavUp(url) {
            if (this.clickImageIndex < 1) {
                if (!/http/.test(url)) {
                    url = `http://${url}`;
                }
                window.location.href = url;
            }
            this.clickImageIndex = -1;
        },
        toDetailFrames(url, title) {
            this.$router.push({
                path: 'framesDetail',
                query: {
                    url: url,
                    title: title
                }
            })
        },
        toProjectDetail(id, title) {
            this.$router.push(`/projectDetail?id=${id}&title=${title}`);
        },
        toCompanyDetail(id, title) {
            this.$router.push(`/companyDetail?id=${id}&title=${title}`);
        },
        closeThisWeb(e) {
            //退出
            /* Dialog.alert({
                title: '触发退出',
                message: `${e.target.nodeName},,${e.target.className},,${e.target.innerHTML}`,
            }).then(() => {
                // on close
            }); */
            //setTimeout(() => {
                YBB.hybrid.navigation.close();
            //}, 5000);
        },
        getData(loaded) {
            //请求首页所有数据
            ajaxGet(apiUrl.homeData, {}, res => {
                if (loaded) {
                    loaded('done')
                }
                res.appList.push({
                    id: 1004,
                    title: '企业服务',
                    image: require('@/assets/nav_qyfw.png'),
                    url: '/serve',
                })
                for (let i = 0; i < res.appList.length; i++) {
                    if (res.appList[i].title == '政策') {
                    res.appList[i].url = '/policy';
                    }
                }
                this.appList = res.appList;
                this.imageList = res.imageList;
                this.navList = res.appList; //导航
                this.companyPerformanceList = res.companyPerformanceList != null ? res.companyPerformanceList.splice(0, 3) : res.companyPerformanceList; //企业成果展示
                //this.companyProjectList = [res.companyProjectList[0]]; //项目列表
                this.companyProjectList = res.companyProjectList; //项目列表
                this.inforList = res.inforList; //资讯

                if (this.companyProjectList) {
                    this.companyProjectWidth = this.companyProjectList.length * (6.2 + 0.16) + 'rem';
                }
            }, res => {
                if (loaded) {
                    loaded('done')
                }
            })
        },
        toThisNav(url, blank) {
            if (blank) {
                if (!/http/.test(url)) {
                    url = `http://${url}`;
                }
                // window.location.href = url;
                YBB.hybrid.util.openLink(url);
            } else {
                this.$router.push(url);
            }
        },
        onPullingDown(loaded) {
            console.log('下拉刷新', loaded)
            this.getData(loaded);
        }
    }
}

</script>
<style lang='less' scoped>
    .home_contain {
        margin-bottom: .5rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1rem;
        &.ios_devices_home {
            margin-bottom: 1rem;
        }
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
            z-index: 2;
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
                z-index: 999;
            }
        }
        .home_contain_padding {
            padding: .16rem .32rem;
        }
        .van-swipe-item {
            overflow: hidden;
            img {
                width: 100%;
                /* height: 100%; */
            }
        }

        .carousel_block {
            margin-bottom: .15rem;
            margin-top: -1px;
        }

        .list_item, .nav_block  {
            background-color: #fff;
            margin-bottom: .15rem;
            padding: .15rem 0;
        }
        .slider_block_wrap {
            width: calc(100% - .32rem);
            margin: 0 auto;
            overflow: hidden;
            overflow-x: scroll;
            .slider_block {
                width: calc(6.2rem * 3 + .16rem * 3);
                li {
                    float: left;
                    margin-right: .16rem;
                }
            }
        }

        .qy_block {
            background-color: #E8F2FF;
            border-radius:15px;
            padding: .16rem;
            .qy_title {
                padding-left: .1rem;
                margin-bottom: .14rem;
                font-size: .34rem;
                font-weight: 500;
                color: #0D9BED;
            }
            .qy_detail_box_wrap {
                display: flex;
            }
            .qy_detail_box {
                background-color: #fff;
                border-radius: 10px;
                width: calc((100% - .4rem) / 3);
                height: 3.16rem;
                margin-right: .2rem;
                padding: .16rem .1rem;
                text-align: center;
                color: #333;
                cursor: pointer;
                &:last-child {
                    margin: 0;
                }
                .qy_block_img {
                    width: 100%;
                    height: 1.4rem;
                    overflow: hidden;
                    margin-bottom: .04rem;
                    border-radius: 4px;
                    background-size: cover;
                }
                /* img {
                    width: 100%;
                } */
                .qy_block_name {
                    font-weight: bold;
                    font-size: .3rem;
                    margin-bottom: .1rem;
                    font-weight: 600;
                    width: 100%;
                }
                .qy_block_desc {
                    font-size: .2rem;
                    font-weight: 500;
                    line-height: .28rem;
                    color: #666;
                    width: 100%;
                    text-align: left;
                    word-break: break-all;
                }
            }
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
