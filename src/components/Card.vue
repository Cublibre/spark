<template>
  <div class="card is-flex-direction-column">
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
          <CourseList :courses="userData.courses" />
          <h6 class="subtitle ml-1 is-7 mb-2 has-text-success">
            <b-icon icon="calendar-check" size="is-small"></b-icon>
            Hover to see available times
          </h6>
          <Schedule :availableDays="userData.workdays" />
        </div>
      </div>
    </div>
    <div v-if="isExpanded">
      {{ userData.bio }}
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import CourseList from "./CourseList.vue";
import Schedule from "./Schedule.vue";
export default {
  name: "Card",
  props: ["userData", "isExpanded"],
  components: {
    Avatar,
    CourseList,
    Schedule,
  },
};
</script>

<style scoped>
.card {
  display: flex;
  background: white;
  overflow: hidden;
  padding: 45px;
  border-radius: 15px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
</style>
