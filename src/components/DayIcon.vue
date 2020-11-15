<template>
  <span class="day-icon is-relative mr-1">
    <!-- Available day -->
    <span v-if="timeRange != null" class="day-circle hover-shadow">
      <b-tooltip
        :animated="false"
        position="is-bottom"
        type="is-dark"
        :label="humanTime"
      >
        <b-icon
          type="is-primary"
          pack="fas"
          icon="circle"
          size="is-medium"
        ></b-icon>
        <strong
          class="day-label is-size-7 has-text-white is-capitalized"
          style="margin-top: 0.15rem"
        >
          {{ label }}
        </strong>
      </b-tooltip>
    </span>

    <!-- Unavailable day -->
    <template v-else>
      <b-icon
        type="is-light"
        pack="fas"
        icon="circle"
        size="is-medium"
      ></b-icon>
      <span
        class="day-label is-size-7 has-text-grey has-text-regular is-capitalized"
      >
        {{ label }}
      </span>
    </template>
    <!-- Make text light or dark based on the icon background -->
  </span>
</template>

<script>
export default {
  name: "DayIcon",
  props: ["weekday", "timeRange"],
  computed: {
    humanTime: function () {
      /**
       * Converts [HH:mm, HH:mm] to the format "h:mm AM/PM to h:mm AM/PM"
       */
      var convertHour = function (hour) {
        return ((parseInt(hour) + 11) % 12) + 1;
      };
      var suffix = function (hour) {
        return parseInt(hour) >= 12 ? " PM" : " AM";
      };
      var startHour = convertHour(this.timeRange[0].substr(0, 2));
      var startSuffix = suffix(this.timeRange[0].substr(0, 2));
      var endHour = convertHour(this.timeRange[1].substr(0, 2));
      var endSuffix = suffix(this.timeRange[1].substr(0, 2));
      var startTime =
        startHour + ":" + this.timeRange[0].substr(3) + startSuffix;
      var endTime = endHour + ":" + this.timeRange[1].substr(3) + endSuffix;
      return startTime + " to " + endTime;
    },
    label: function () {
      if (
        this.weekday == "tuesday" ||
        this.weekday == "thursday" ||
        this.weekday == "saturday" ||
        this.weekday == "sunday"
      ) {
        return this.weekday.substr(0, 2);
      }
      return this.weekday[0];
    },
  },
};
</script>

<style scoped>
.day-label {
  position: absolute;
  left: 50%;
  top: 41%;
  transform: translate(-50%, -50%);
  user-select: none;
  align-self: center;
}

.day-circle:hover {
  text-shadow: 0 0 0.15rem;
}
</style>
