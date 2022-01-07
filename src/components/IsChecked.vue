<template>
  <div class="check-container">
    <a-checkbox @change="onChange"> Checkbox </a-checkbox>
  </div>
</template>

<script>
export default {
  name: "IsChecked",

  methods: {
    onChange(e) {},
  },
};
</script>

<style>
.check-container {
  background-color: #fff3c9;
  padding: 10px 20px;
  text-align: left;
  border-radius: 2px;
}
</style>
