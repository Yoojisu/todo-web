<template>
  <div id="login" class="login-container">
    <div class="login-title fs-30 bold">TodoList</div>
    <div class="login-box" df fdc>
      <a-input v-model="loginForm.id" type="text" />
      <a-input v-model="loginForm.password" type="password" />
      <a-button class="login-btn bold" @click="loginBtn()">로그인</a-button>
    </div>
  </div>
</template>

<script>
import store from "../store/index";
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

        sessionStorage.setItem("accessToken", this.$cookie.get(".AspNetCore.Cookies"));
      } catch (e) {
        throw e;
      } finally {
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/src/assets/styles/flex.scss";
@import "~/src/assets/styles/box.scss";
@import "~/src/assets/styles/color.scss";
@import "~/src/assets/styles/font.scss";

.login-container {
  .login-box {
    margin-top: 20px;
    padding: 40px 30px;
    @include backgroundBox(10px, $white-1);

    .ant-input {
      &:nth-child(2) {
        margin: 10px 0 40px 0;
      }
    }
    .login-btn {
      border-color: $white-1;
      color: $white-1;
      background-color: $mint;

      &:hover {
        opacity: 0.8;
        transform: 0.3s;
      }
    }
  }
}
</style>
