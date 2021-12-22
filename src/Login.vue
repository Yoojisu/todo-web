<template>
  <div id="login">
    <input-box class="home-check"></input-box>
    <input-box class="home-check"></input-box>
    <a-button type="primary"> 로그인 </a-button>
  </div>
</template>

<script>
import InputBox from "./components/InputBox.vue";
export default {
  name: "Login",
  components: { InputBox },
};
</script>

<style></style>
