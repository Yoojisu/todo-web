<template>
  <div id="login">
    <a-input v-model="loginForm.id" type="text" />
    <a-input v-model="loginForm.password" type="text" />
    <!-- <input-box type:text v-model="id" class="home-check" :text="`아이디를 입력해주세요.`"></input-box>
    <input-box v-model="password" class="home-check" :text="`비밀번호를 입력해주세요.`"></input-box> -->

    <button type="primary" @click="loginBtn()">로그인</button>
  </div>
</template>

<script>
//import InputBox from "./components/InputBox.vue";
import Client from "../http/client";

export default {
  name: "Login",
  // components: { InputBox },

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
      let result = await Client.post("/Auth/login", this.loginForm);

      console.log(result);
    },
  },
};
</script>

<style></style>
