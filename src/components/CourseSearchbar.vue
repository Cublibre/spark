<template>
  <section class="searchbar">
    <b-field>
      <b-autocomplete
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
  props: ['courseCodes'],
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
        return (
          option.toString().toLowerCase().indexOf(this.input.toString().toLowerCase()) >= 0
        );
      });
    }
  },
};
</script>

<style>
</style>
