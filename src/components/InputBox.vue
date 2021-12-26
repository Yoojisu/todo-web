<template>
  <div>
    <a-input :placeholder="text" type="text" />
  </div>
</template>

<script>
export default {
  name: "InputBox",

  props: {
    text: String,
  },
};
</script>

<style></style>
