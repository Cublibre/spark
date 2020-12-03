<template>
  <section class="workday-picker mx-3">
    <b-button
      @click="$emit('selected')"
      rounded
      :focused="isExpanded"
      class="has-text-weight-semibold poppins"
      :type="buttonType"
      aria-controls="contentIdForA11y1"
      >{{ workday.label }}</b-button
    >
    <b-collapse
      v-model="workday.expanded"
      aria-id="contentIdForA11y1"
    >
      <div class="box popup">
        <b-field>
          <b-timepicker
            v-model="workday.begin"
            placeholder="start time"
            :position="'is-top-' + timePickerDirection"
            :incrementMinutes="15"
            :focusable="false"
          >
          </b-timepicker>
        </b-field>
        <b-field>
          <b-timepicker
            v-model="workday.end"
            :position="'is-top-' + timePickerDirection"
            placeholder="end time"
            :incrementMinutes="15"
            :focusable="false"
          >
          </b-timepicker>
        </b-field>
        <button class="button is-danger is-light" @click="workday.begin = null; workday.end = null">
              <b-icon icon="times"></b-icon>
              <span>Clear</span>
            </button>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
  name: "WorkdayTimePicker",
  props: {
    buttonType: { type: String, required: true },
    workday: { type: Object, required: true },
    timePickerDirection: { type: String, default: "left" },
    isExpanded: {type: Boolean, default: false}
  },
};
</script>

<style scoped>

.workday-picker {
  position: relative;
}

.popup {
  width: 140px;
  position: absolute;
  left: -50%;
  top: 45px;
}
</style>
