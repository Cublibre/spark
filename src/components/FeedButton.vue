<template>
    <button class="FeedButton" v-on:click="$emit('no-thanks')"></button>
</template>

<script>
export default {
  name: "FeedButton",
  props: ["iconUrl"],
  components: {},
};
</script>

<style>
  .FeedButton {
    height: 65px;
    width: 65px;
    border-radius: 50%;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
    background: white;
  }
</style>