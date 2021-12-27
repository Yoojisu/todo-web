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
      try {
        let result = await Auth.login(this.loginForm.id, this.loginForm.password);
        this.$cookie.set("accesstoken", result.password, { expires: "1D" });
        this.$router.push("/home");
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>

<style></style>
