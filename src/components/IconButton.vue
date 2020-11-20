<template>
  <button class="mx-6 icon-button">
    <b-icon
      pack="fas"
      class="icon"
      size="is-large"
      v-bind:type="type"
      v-bind:icon="icon"
    ></b-icon>
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: ["type", "icon"],
};
</script>

<style scoped>
.icon {
  position: absolute;
  font-size: 150%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
}

.icon-button {
  position: relative;
  height: 65px;
  width: 65px;
  border-radius: 50%;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  background: white;
  border: solid 1px transparent;
}

.icon-button:focus {
  outline: 0px;
}

.icon-button:hover {
  transform: scale(1.1);
}

.icon-button:active {
  transform: scale(0.95);
  filter: brightness(90%);
}
</style>
