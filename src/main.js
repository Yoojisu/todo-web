import Vue from 'vue'
import Login from './Login.vue';
import Antd from 'ant-design-vue';

Vue.config.productionTip = false
Vue.use(Antd);

new Vue({
  render: h => h(Login),
}).$mount('#login')
