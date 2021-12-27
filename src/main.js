import Vue from 'vue'
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from "./router";
import vueCookie from "../utils/cookie";

Vue.config.productionTip = false
Vue.use(Antd);

new Vue({
  router,
  vueCookie,
  ...App
}).$mount('#app')
