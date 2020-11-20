<template>
  <div class="card">
    <div
      class="container columns is-mobile is-variable is-align-items-center is-justify-content-center"
    >
      <div class="column is-one-third">
        <Avatar :url="userData.imageUrl" />
      </div>
      <div class="column is-two-thirds is-flex-direction-column">
        <div class="ml-3">
          <h1 class="title is-1 has-text-weight-bold">{{ userData.name }}</h1>
          <h4 class="subtitle is-4 mb-3">
            {{ userData.major }}, '{{ userData.year.substring(2) }}
          </h4>
          <CourseList :courses="classList" />
          <h6 class="subtitle ml-1 is-7 mb-2 has-text-success">
            <b-icon icon="calendar-check" size="is-small"></b-icon>
            Hover to see available times
          </h6>
          <Schedule :availableDays="userData.workdays" />
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
  props: ["userData"],
  components: {
    Avatar,
    CourseList,
    Schedule,
  },
  computed: {
    classList: function () {
      // Get a list of the class names (since their values are all true)
      return Object.keys(this.userData.courses);
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
