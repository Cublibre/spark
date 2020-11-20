<template>
  <div class="card has-background-white-ter">
    <div class="container">
      <div class="is-flex-direction-column has-text-right">
        <h1 class="title is-1 has-text-success">It's a match!</h1>
        <section class="box">
          <h2 class="title is-2 has-text-weight-bold">{{ userData.name }}</h2>
          <b class="">Contact Info</b>
          <p>{{ userData.phone }}</p>
          <p>{{ userData.email }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchCard",
  props: ["userData"],
};
</script>

<style scoped>
.card {
  display: flex;
  background: white;
  overflow: hidden;
  padding: 30px;
  border-radius: 15px;
}
</style>
