<!-- inforArticle 资讯文章页 -->
<template>
    <div class="infor_article_box" :style="{width: width + 'px'}">
      <p style="text-align: center;"><span style="font-size: 14pt;" >{{title}}</span></p>
      <div v-html="article"></div>
    </div>
</template>

<script>
import { ajaxGet } from '@/common/js/public'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            article: '',
            title: '',
            width: 0
        };
    },
    created() {
        let id = this.$route.query.id

        ajaxGet(`${apiUrl.projectDetail}${id}`, {}, res => {
            this.title = res.projectName
            this.article = res.projectContent;
        })

        this.width = document.documentElement.clientWidth;
    },
    updated() {
        let imgs = document.querySelectorAll('img');
        for (let i=0; i<imgs.length; i++) {
            imgs[i].style.height = '100%'
        }
    }
}

</script>
<style lang='less' scoped>
    .infor_article_box {
        padding: .24rem .32rem;
    }
</style>
