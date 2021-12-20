import Vue from 'vue'
import Home from './Home.vue';
import Antd from 'ant-design-vue';

Vue.config.productionTip = false
Vue.use(Antd);

new Vue({
  render: h => h(Home),
}).$mount('#home')
