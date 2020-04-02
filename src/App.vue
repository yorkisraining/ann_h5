<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-14 15:12:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app" :style="{'padding-top': paddingTop}">
    <globalHeader :title="title" :returnBtn="returnBtn" :ifShowHeader="ifShowHeader" class="head"></globalHeader>
    <router-view/>
  </div>
</template>

<script>
import globalHeader from '@/components/header'

export default {
    name: 'App',
    data() {
      return  {
        title: '中国-东盟新型智慧城市协同创新中心',
        returnBtn: false,
        ifShowHeader: false,
        paddingTop: '.88rem',
      }
    },
    components: {globalHeader},
    created() {
      let now = this.$router.history.current;
        this.title = now.name;
        if (now.path == '/') {
          this.returnBtn = false;
        } else {
          this.returnBtn = true;
        }
        now.matched.some(res => {
          this.ifShowHeader = res.props.default.ifShowHeader;
        })

      if (navigator.userAgent.toLowerCase().indexOf('iphone') > 0) {
        this.paddingTop = '1.28rem';
      }
    },
    filters: {
      filterTitle(val) {
        return val.length > 8 ? val.slice(0, 8) + '...' : val;
      }
    },
    methods: {
        toThisNav(url) {
            this.$router.push(url);
        },
    },
    watch: {
      $route(now, old) {
        this.title = now.name;
        if (now.path == '/') {
          this.returnBtn = false;
        } else {
          this.returnBtn = true;
        }
        now.matched.some(res => {
          this.ifShowHeader = res.props.default.ifShowHeader;
        })

      }
    },
}
</script>
<style scoped lang="less">
#app {
  .head {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 199;
  }
}
</style>
