<template>
  <div class="card">
    <div class="container">
      <div class="is-flex-direction-column has-text-right">
        <h1 class="title is-2 has-text-weight-bold">{{ name }}</h1>
        <section class="">
          <b class="">Contact Info</b>
          <p>{{ phone_number }}</p>
          <p>{{ email }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchCard",
  props: ["userData"],
  components: {
  },
  data: function () {
    // Placeholder data for a firebase API call
    const USER_DATA = {
      name: "John Doe",
      major: "Computer Science",
      year: "2020",
      phone_number: "(493) 609-8712",
      email: "johndoe@umich.edu",
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
  overflow: hidden;
  padding: 30px;
  border-radius: 15px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
</style>
