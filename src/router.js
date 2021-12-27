import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from './Home.vue';
import Login from './Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    component: Login
  },
  {
    path:"/home",
    component: Home
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router;