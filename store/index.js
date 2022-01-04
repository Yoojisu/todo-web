import Vuex from 'vuex';
import Vue from 'vue';
import Auth from "../http/auth";
import vueCookie from 'vue-cookie';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: null,
    userInfo:{}
  },

  getters:{

  },
  
  mutations:{
    login(state, user){
      console.log(user);
      if(user){
        state.userInfo = user;
        state.accessToken = vueCookie.get(".AspNetCore.Cookies");
      }else{
        state.accessToken = null;
      }
    },
    isAuth(state, {userInfo}){
      state.userInfo = userInfo;
    }
  },

  actions:{
   async login({commit}, {id,password}){
    let result = await Auth.login(id, password);
    commit('login', result);
    },

    async isAuth({commit}, {cookie}){
      return await Client.get("/Auth/self", {
        headers: {
          Cookie: cookie,
        },
      }).then(({data}) => commit("isAuth", data));
    }
  }
});

export default store;