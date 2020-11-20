<template>
  <div class="search has-background-white px-6 py-6">
    <div class="container">
      <h1 class="title">What class do you need a partner for?</h1>
      <CourseSearchbar :courseCodes="courseCodes" v-on:selected="showFeed" />
    </div>
  </div>
</template>

<script>
import CourseSearchbar from "@/components/CourseSearchbar";
export default {
  created() {
    this.getCourseList();
  },
  data: function () {
    return {
      courseList: [],
    }
  },
  methods: {
    showFeed(query) {
      if(query) {
        console.log("selected: ", query)
        // Show Feed page with query (course code for now, may change)
        this.$router.push({name:'Feed', query: {class: query}})
      }
    },
    getCourseList() {
      console.log("Retrieved course list")
      // Set my courseList to an array of strings.
      // TODO: Get list of courses from database
      const COURSE_LIST = {
        "EECS 442": true,
        "EECS 485": true,
        "EECS 481": true,
        "EECS 493": true,
        "EECS 280": true,
        "EECS 370": true,
      }
      this.courseList = Object.keys(COURSE_LIST)
    },
  },
  components: {
    CourseSearchbar,
  },
  computed: {
    courseCodes () {
      // Extract the numbers from the course name
      return this.courseList.map((name)=>name.slice(-3))
    },
  }
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
