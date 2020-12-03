<template>
  <section class="searchbar">
    <b-field>
      <b-autocomplete
        rounded
        v-model="input"
        :data="filteredCourseCatalog"
        :keep-first="true"
        placeholder="Enter an EECS course number ex. 493"
        icon="search"
        @select="(option) => onSelected(option)"
      >
        <template slot="empty">No EECS classes found with that number.</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
export default {
  name: "CourseSearchbar",
  props: ['courses'],
  data: function () {
    return {
      input: "",
      selected: null,
    };
  },
  methods: {
    onSelected: function (option) {
      this.$emit('selected', option)
    }
  },
  computed: {
    filteredCourseCatalog () {
      /* Show the matching course codes in the dropdown based on input. */
      return this.courseCodes.filter((option) => {
        var input = this.input.replace(/^\D+/g, "")
        return (
          option.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
        );
      });
    },
    courseCodes () {
      return Object.keys(this.courses)
    },
  },
};
</script>

<style>
</style>
