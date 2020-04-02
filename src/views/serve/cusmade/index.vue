<!-- serve/cusmade 定制化服务 -->
<template>
    <div class="cusmade_containt">
        <cusCard v-for="item in cardList" :key="item.id + Math.random()" :id="item.id" :title="item.name" :brief="item.catDesc" :src="item.code" @toDetail="toDetail(item.code, item.name)"></cusCard>
    </div>
</template>

<script>
import cusCard from './cusCard'
import { ajaxGet } from '@/common/js/public.js'
import { apiUrl } from '@/common/js/api.js'

export default {
    data () {
        return {
            cardList: []
        };
    },
    components: {cusCard},
    created() {
        ajaxGet(apiUrl.cusmadeSever, {}, res => {
            this.cardList = res;
        })
    },
    methods: {
        toDetail(code, name) {
            this.$router.push(`/serveClassify?goodtype=${code}&title=${name}`);
        }
    }
}

</script>
<style lang='less' scoped>
</style>