<template>
  <div class="is-size-5" style="width: 100%">
    <DayIcon
      v-for="(times, index) in weekdayTimes"
      :key="index"
      :weekday="weekdays[index]"
      :timeRange="times"
    />
  </div>
</template>

<script>
import DayIcon from "./DayIcon";
const index = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};
export default {
  name: "Schedule",
  components: {
    DayIcon,
  },
  props: ["availableDays"],
  computed: {
    weekdayTimes: function () {
      /**
       *  Start with an empty week, and assign weekdays time ranges.
       *  We need a map with all days so the weekdays stay in order even if
       *  the available days change.
       *
       *  week is an array of arrays, i.e. week[0] = ["0:00","1:00"] means
       *  Monday from 12AM to 1AM. Vue 2 doesn't support iterating over
       *  maps or sets in v-for.
       */

      var week = new Array(7);
      for (const weekday in this.availableDays) {
        // week[weekday] = [startTime, endTime]
        week[index[weekday]] = Object.values(this.availableDays[weekday]);
      }
      return week;
    },
    weekdays: function () {
      return Object.keys(index);
    },
  },
};
</script>

<style>
</style>
