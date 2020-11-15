<template>
  <div class="card">
    <div class="container columns is-mobile is-variable is-align-items-center is-justify-content-center">
      <div class="column is-one-third">
        <Avatar :url="imageUrl" />
      </div>
      <div class="column is-two-thirds is-flex-direction-column">
        <div class="ml-3">
          <h1 class="title is-1 has-text-weight-bold">{{ name }}</h1>
          <h4 class="subtitle is-4 mb-3">{{ major }}, '{{ year.substring(2) }}</h4>
          <CourseList :courses="classList" />
          <h6 class="subtitle ml-1 is-7 mb-2 has-text-success">
            <b-icon icon="calendar-check" size="is-small"></b-icon>
            Hover to see available times
          </h6>
          <Schedule :availableDays="workdays" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import CourseList from "./CourseList.vue";
import Schedule from "./Schedule.vue";
export default {
  name: "Card",
  components: {
    Avatar,
    CourseList,
    Schedule,
  },
  data: function () {
    // Placeholder data for a firebase API call
    const USER_DATA = {
      name: "John Doe",
      major: "Computer Science",
      year: "2020",
      imageUrl:
        "https://post.greatist.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
      courses: {
        "EECS 485": true,
        "EECS 493": true,
        "EECS 376": true,
      },
      workdays: {
        monday: {
          startTime: "14:00",
          endTime: "18:00",
        },
        wednesday: {
          startTime: "10:00",
          endTime: "12:00",
        },
        thursday: {
          startTime: "13:00",
          endTime: "15:00",
        },
      },
    };
    return USER_DATA;
  },
  computed: {
    classList: function () {
      // Get a list of the class names (since their values are all true)
      return Object.keys(this.courses);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  background: white;
  width: 600px;
  height: 350px;
  overflow: hidden;
  padding: 30px;
  border-radius: 15px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
</style>
