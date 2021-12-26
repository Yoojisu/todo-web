<template>
  <div id="login">
    <a-input v-model="loginForm.id" type="text" />
    <a-input v-model="loginForm.password" type="password" />
    <button type="primary" @click="loginBtn()">로그인</button>
  </div>
</template>

<script>
import Auth from "../http/auth";

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
      let result = await Auth.login("/Auth/login", this.loginForm);

      console.log(result);
    },
  },
};
</script>

<style></style>
