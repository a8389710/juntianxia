// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueWechatTitle from 'vue-wechat-title'
import Vant from 'vant';
// import { ShareSheet } from 'vant';
import 'vant/lib/index.css';
import './common/rem.js'
import Api from './requests/api.js'
import store from './store/index'
import Vuex from 'vuex'

Vue.prototype.Api = Api;

Vue.config.productionTip = false
Vue.use(VueWechatTitle)
Vue.use(Vant)
Vue.use(Vuex)

import VueAMap from 'vue-amap';
Vue.use(VueAMap);

// 地图
VueAMap.initAMapApiLoader({
  key: '2e3312741a5172ebdc075701b00f865d',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


// -----------------------

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
