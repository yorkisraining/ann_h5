<!-- home/detailBox2 左图右文 -->
<template>
    <div>
        <div class="box" @click="clickFn(title, id, typeFlag)">
            <div class="list_img" :style="{'backgroundImage': 'url('+ src + ')'}">
                <!-- <img class="list_img" v-lazy="src"> -->
            </div>
            <div class="list_desc">
                <p class="title">{{title | filterTitle}}</p>
                <p class="remark" v-html="remark"></p>
                <div class="mark">
                    <span class="green">{{typeName}}</span>
                    <span class="fg">|</span>
                    <span class="time">{{createTime | filterTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props: ['title', 'remark', 'src', 'link', 'typeName', 'type', 'id','createTime','typeFlag'],
    filters: {
        filterTitle(val) {
            if (val) {
                return val.length > 30 ? val.slice(0, 30) + '...' : val;
            }
        },
        filterTime(val) {
            if (val) {
                return val.replace(/-/g,'/').substring(0,10)
            }
        },        
    },
    methods: {
        clickFn(title, id, typeFlag) {
            this.$router.push( `/inforArticle?id=${id}&title=${title}&type=${typeFlag}`)
        }
    }
}

</script>
<style lang='less' scoped>
    .box {
        margin-bottom: .4rem;
        position: relative;
        padding: .2rem 0;
        margin: 0 .15rem;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
        display: flex;
        .list_img {
            width: 1.4rem;
            height: 1.6rem;
            border-radius: 4px;
            margin-right: .16rem;
            vertical-align: top;
            overflow: hidden;
            background-size: cover;
            /* img {
                width: 100%;
            } */
        }
        .list_desc {
            vertical-align:top;
            display: inline-block;
            opacity: .8;
            text-align: left;
            word-break: break-all;
            width: calc(100% - 1.4rem - .16rem);
            .title {
                font-size: .3rem;
                color: #333;
                line-height: .42rem;
            }
            .remark {
                font-size: .22rem;
                line-height: .3rem;
                color: #999;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                
            }
            .mark {
                position: absolute;
                bottom: .2rem;
                font-size: .2rem;
                .green {
                    color: #F86938;
                }
                .fg {
                    margin: 0 .06rem;
                }
                .time {
                    opacity: .7;
                }
            }
        }
    }

    
</style>