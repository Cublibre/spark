<template>
  <div class="card is-flex-direction-column has-background-white">
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
            <template v-if="userData.major">
              {{ userData.major }},
            </template>
            <template v-if="userData.year">
              '{{ userData.year.substring(2) }}
            </template>
          </h4>
          <CourseList :courses="userData.courses" />
          <h6 v-if="Object.keys(userData.workdays).length > 0" class="subtitle ml-1 is-7 mb-2 has-text-success">
            <b-icon icon="calendar-check" size="is-small"></b-icon>
            Hover to see available times
          </h6>
          <h6 v-else class="subtitle ml-1 is-7 mb-2">
            <b-icon icon="calendar-times" size="is-small"></b-icon>
            No available times on record.
          </h6>
          <Schedule :availableDays="userData.workdays" />
        </div>
      </div>
    </div>
    <b-collapse v-model="isExpanded" animation="slide">
      <div>
        <h4 class="title is-4">About me</h4>
        <div class="extended columns">
          <div class="column scrollable">
            <template v-if="userData.bio">
              {{ userData.bio }}
            </template>
            <template v-else>
              <em>No bio provided.</em>
            </template>
          </div>
        </div>
      </div>
    </b-collapse>
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
  width: 600px;
  background: white;
  overflow: hidden;
  padding: 45px;
  border-radius: 15px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}

.extended {
  max-height: 150px;
}

.scrollable {
  overflow-y: hidden;
}

.scrollable:hover {
  overflow-y: overlay;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  width: 5px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  width: 5px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb:active {
  width: 5px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
