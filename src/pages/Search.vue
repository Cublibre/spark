<template>
  <div class="search has-background-white px-6 py-6">
    <div class="container">
      <h1 class="title">What class do you need a partner for?</h1>
      <CourseSearchbar />
    </div>
  </div>
</template>

<script>
import CourseSearchbar from "@/components/CourseSearchbar";
export default {
  components: {
    CourseSearchbar,
  },
};
</script>

<style scoped>
.search {
  border-radius: 15px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
</style>
