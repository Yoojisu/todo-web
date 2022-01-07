import Vuex from 'vuex';
import Vue from 'vue';
import Auth from "../http/auth";
import vueCookie from 'vue-cookie';
import Client from "../http/client";

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
      if(user){
        state.userInfo = user;
        state.accessToken = vueCookie.get(".AspNetCore.Cookies");
      }else{
        state.accessToken = null;
      }
    },
    isAuth(state, userInfo){
      state.userInfo = userInfo;
    }
  },

  actions:{
   async login({commit}, {id,password}){
    let result = await Auth.login(id, password);
    commit('login', result);
    },

    async isAuth({commit}, {cookie}){
     let result = await Client.get("/Auth/self", {
      headers:{
        Cookie:cookie
      }
     });
     commit("isAuth", result);
    }
  }
});

export default store;