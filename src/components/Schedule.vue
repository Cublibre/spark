<template>
  <div class="is-size-5" style="width: 100%">
    <DayIcon v-for="(times, index) in week" :key="index" :weekday="weekdays[index]" :timeRange="times" />
  </div>
</template>

<script>
import DayIcon from "./DayIcon";
export default {
  name: "Schedule",
  components: {
    DayIcon,
  },
  props: ["availableDays"],
  data: function () {
    /**
     *  Start with an empty week, and assign available days from props
     *  We need a map with all days so the keys stay in order even if
     *  the props change.
     *
     * week is an array because Vue2 doesn't support iterating over
     * maps or sets in v-for. So strings have to converted to indices
     */
    const index = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };
    var week = new Array(7);
    for (const property in this.availableDays) {
      // week[weekday] = [startTime, endTime]
      console.log(property, index[property]);
      week[index[property]] = Object.values(this.availableDays[property]);
    }
    return {
      week,
      weekdays: Object.keys(index)
    };
  },
};
</script>

<style>
</style>
