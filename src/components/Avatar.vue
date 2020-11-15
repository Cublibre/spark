<template>
  <div class="container avatar">
    <b-image
      :src="url"
      ratio="1by1"
      :rounded=true
    />
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
  .avatar {
    width: 150px;
  }
</style>
