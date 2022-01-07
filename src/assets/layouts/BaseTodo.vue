<template>
  <div>
    <div>
      <div v-if="loading">
        <a-icon class="loading-icon" type="loading" />
      </div>
      <div v-else></div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "BaseList",
  props: ["loading"],
};
</script>

<style lang="scss">
@import "~/src/assets/styles/color.scss";
.loading-icon {
  font-size: 30px;
  color: $mint !important;
}
</style>
