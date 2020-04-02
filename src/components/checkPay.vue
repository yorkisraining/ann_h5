<!-- 查询微信支付状态 -->
<template>
    <div class="msg" v-show="showQuery"><i class="el-icon-loading"></i>正在查询支付结果，请稍后...</div>
</template>

<script>
import axios from 'axios'
import { apiUrl } from '@/common/js/api'
import { Toast } from 'vant'

export default {
    data () {
        return {
            showQuery: false
        };
    },
    created() {
        let query = this.$route.query;

        const _this = this;
        YBB.hybrid.util.showWeixinPayModal().then((selectResult) => {
            if (selectResult) {
                //console.log('用户选择了支付成功');
            } else {
                //console.log('用户选择了重新支付');
            }
            _this.showQuery = true;

            //查询支付状态
            setTimeout(() => {
                axios.get(apiUrl.payResult, {
                    params: {
                        orderId: query.id
                    }
                })
                .then(res => {
                    res = res.data.result;
                    //Toast(res.code);
                    if (res.code == 10000) {
                        //支付成功
                        _this.$router.replace(`/paySuccess?module=${query.module}`);
                    } else {
                        //支付失败
                        _this.$router.replace(`/payFail?id=${query.id}&module=${query.module}`);
                    }
                })
            }, 3000)
        });

        if (query == {}) {
            this.$router.push('/');
        }
    },
    mounted() {
        window.addEventListener('popstate', () => {
            window.location = '/';
        })

        window.history.pushState('', '', '/');
    },
}

</script>
<style lang='less' scoped>
    .msg {
        margin-top: 1rem;
        text-align: center;
    }
</style>