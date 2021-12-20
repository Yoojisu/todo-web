<template>
  <div id="home">
    <input-box class="home-check"></input-box>
    <is-checked></is-checked>
  </div>
</template>

<script>
import IsChecked from "./components/IsChecked.vue";
import InputBox from "./components/InputBox.vue";

export default {
  name: "Home",
  components: { IsChecked, InputBox },
};
</script>

<style>
body * {
  box-sizing: border-box;
  margin: 0;
}

#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: calc(100% * 1 / 3);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.home-check {
  margin: 20px 0;
}
</style>
