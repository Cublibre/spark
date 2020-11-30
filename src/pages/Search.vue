<template>
  <div v-if="courseList" class="search has-background-white px-6 py-6">
    <div class="container">
      <h1 class="title">What class do you need a partner for?</h1>
      <CourseSearchbar :courses="courseList" v-on:selected="showFeed" />
    </div>
  </div>
</template>

<script>
import CourseSearchbar from "@/components/CourseSearchbar";
import { eecsCollection } from "@/firebase";
export default {
  created() {
    this.getCourseList();
  },
  data: function () {
    return {
      courseList: null,
    };
  },
  methods: {
    showFeed(query) {
      if (query) {
        console.log("selected: ", query);
        // Check if there are people in the class. If not, show an alert
        if (this.courseList[query].people.length == 0) {
          this.noPeopleInCourse(query);
        } else {
          this.$router.push({ name: "Feed", query: { class: query } });
        }
      }
    },
    getCourseList() {
      var self = this;
      // Get a list of classes with other people actually searching in those classes.
      // Exclude the logged in user, and also people the user invited
      let courseList = {};
      eecsCollection
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            courseList[doc.id] = doc.data();
            self.courseList = courseList;
          });
          console.log("Retrieved course list");
        })
        .catch(function (error) {
          console.log("Error getting classes: ", error);
        });
    },
    noPeopleInCourse(course) {
      this.$buefy.notification.open({
        duration: 5000,
        message: `No students are looking for partners in <b>EECS ${course}</b> right now. Please enter a different course.`,
        position: "is-top",
        hasIcon: true,
        type: "is-danger",
      });
    },
  },
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
