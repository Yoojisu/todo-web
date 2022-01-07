import Vue from 'vue'
import App from './App.vue';
import Antd from 'ant-design-vue';
import router from './router';
import vueCookie from '../utils/cookie';
import dateUtils from '../utils/dateTransform';

import store from '../store/index';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(Antd);
Vue.prototype.$dateUtils = dateUtils;

new Vue({
  router,
  vueCookie,
  
  store:store,
  ...App,
  created(){
    const token = sessionStorage.getItem('accessToken');
    if(token !== null){
      store.dispatch("isAuth", token);
    }
  }
}).$mount('#app')
