import Vue from 'vue'
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './router';
import vueCookie from '../utils/cookie';
import store from '../store/todo';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(Antd);

new Vue({
  router,
  vueCookie,
  store:store,
  ...App,
}).$mount('#app')
