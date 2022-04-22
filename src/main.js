// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// animate.css
import 'animate.css';
Vue.use(ElementUI);

// axios
// 引入axios
import axios from 'axios';
// 挂载到vue原型链上
Vue.prototype.axios = axios;
// apis
import apis from '@/apis/index'
Vue.prototype.apis=apis;

Vue.config.productionTip = false

import '@/styles/index.scss' // global css

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
