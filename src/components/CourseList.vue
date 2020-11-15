<template>
  <b-taglist class="courses">
      <b-tag
        type="is-primary is-light"
        :rounded="true"
        v-for="name in courses"
        :key="name"
      >{{ name }}</b-tag>
  </b-taglist>
</template>

<script>
export default {
  name: "CourseList",
  props: {
    'courses': Array,
  },
}
</script>

<style>

</style>
