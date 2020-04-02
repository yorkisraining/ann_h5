/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 09:16:25
 * @LastEditTime: 2019-08-14 10:29:04
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex'
import remAndPhoneConfig from './common/js/rem'
import { Tab, Tabs, Popup, DatetimePicker, RadioGroup, Radio, Cell, CellGroup, Picker, List, Lazyload, Button, Field, Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
import VueQriously from 'vue-qriously'

Vue.use(VueQriously)

Vue.use(Tab).use(Tabs).use(Popup).use(DatetimePicker).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(Picker).use(List).use(Lazyload).use(Button).use(Field).use(Swipe).use(SwipeItem);

Vue.use(ElementUI);

remAndPhoneConfig();

Vue.config.productionTip = false;

//隐藏自带导航
YBB.hybrid.navigation.hide();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})