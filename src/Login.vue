<template>
  <div id="login">
    <a-input v-model="loginForm.id" type="text" />
    <a-input v-model="loginForm.password" type="password" />
    <button type="primary" @click="loginBtn()">로그인</button>
  </div>
</template>

<script>
import Auth from "../http/auth";
//import Client from "../http/client";
import store from "../store/index";
//import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      loginForm: {
        id: "",
        password: "",
      },
    };
  },

  methods: {
    async loginBtn() {
      try {
        await store.dispatch("login", this.loginForm);

        if (store.state.accessToken) {
          this.$router.push("/home");
        }

        // const cookie = this.$cookie.get(".AspNetCore.Cookies");

        // const isAuth = await Client.get("/Auth/self", {
        //   headers: {
        //     Cookie: cookie,
        //   },
        // });

        // // const res = await Client.get("/Auth/self", null, {
        // //   Cookie: client.req.headers.cookie,
        // // });

        // console.log("res", isAuth);
      } catch (e) {
        throw e;
      } finally {
      }
    },
  },
};
</script>

<style></style>
