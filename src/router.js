import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from './Home.vue';
import Login from './Login.vue';
import VueCookie from 'vue-cookie';
import store from '../store';

Vue.use(VueRouter);

const auth = () => async(to,from,next) =>{
  if(store.state.accessToken == null){
    alert('로그인 필요');
    return next();
  }
  //next('/home');
}

const routes = [
  {
    path:"/",
    component: Login
  },
  {
    path:"/home",
    name:"home",
    component: Home,
   // beforeEnter: auth()
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

// router.beforeEach(async(to, from, next) => {
// const cookie = VueCookie.get(".AspNetCore.Cookies")
//   if(cookie){
//     console.log('cookie',cookie);
//     return next({path:"/home"});
//   }
// })

export default router;