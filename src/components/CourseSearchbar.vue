<template>
  <section class="searchbar">
    <b-field label="Enter an EECS course number:">
      <b-autocomplete
        v-model="input"
        :data="filteredCourseCatalog"
        :keep-first="true"
        placeholder="e.g. 493"
        icon="search"
        @select="(option) => (showFeed(option))"
      >
        <template slot="empty">No EECS classes found with that number.</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import router from '@/router'
export default {
  name: "CourseSearchbar",
  data: function () {
    return {
      input: "",
      selected: null,
    };
  },
  methods: {
    showFeed(code) {
      // Show feed with filtered users- TODO: pass a course code as prop?
      console.log(`Selected course: ${code}`)
      router.push('feed')
    }
  },
  computed: {
    courseCodes () {
      // TODO: get a list of courses from the database
      const COURSE_LIST = {
        "EECS 485": true,
        "EECS 481": true,
        "EECS 493": true,
        "EECS 280": true,
        "EECS 370": true,
      }
      let courseNames = Object.keys(COURSE_LIST)
      // Extract the numbers from the course name
      return courseNames.map((name)=>name.slice(-3))
    },
    filteredCourseCatalog () {
      /* Show the matching course codes in the dropdown based on input. */
      return this.courseCodes.filter((option) => {
        return (
          option.toString().toLowerCase().indexOf(this.input.toString().toLowerCase()) >= 0
        );
      });
    }
  },
};
</script>

<style scoped>
</style>
