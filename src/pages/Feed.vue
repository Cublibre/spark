<template>
  <div
    id="feed"
    v-if="currentProfile"
    class="is-flex is-flex-direction-column is-align-items-center"
  >
    <div class="is-flex is-flex-direction-row is-align-items-center">
      <IconButton @click.native="getNextUser" type="is-danger" icon="times" />
      <Card :userData="currentProfile" :isExpanded="toggleExpanded" />
      <IconButton @click.native="getMatch" type="is-success" icon="check" />
    </div>
    <div class="mt-5">
      <b-button class="poppins has-text-weight-semibold" rounded v-if="!toggleExpanded" @click="expandProfile" type="is-info">More Info</b-button>
      <b-button class="poppins has-text-weight-semibold" rounded v-else @click="expandProfile" type="is-info is-light">Less Info</b-button>
    </div>
    <!-- Match modal popup (isn't visible unless triggered) -->
    <b-modal
      v-model="isMatchCardModalActive"
      :can-cancel="false"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
      custo
    >
      <template>
        <div class="is-flex is-flex-direction-column mx-0">
          <MatchCard :userData="currentProfile" />
          <section class="container">
            <b-button class="mt-5 mr-5" @click="$router.push('/')"
              >Home</b-button
            >
            <b-button class="mt-5" @click="getNextUser">Keep matching</b-button>
          </section>
        </div>
      </template>
    </b-modal>
  </div>
  <div v-else class="is-size-1 has-text-white">Loading...</div>
</template>

<script>
import Card from "@/components/Card";
import MatchCard from "@/components/MatchCard";
import IconButton from "@/components/IconButton";
import { userCollection } from "@/firebase";
export default {
  name: "Feed",
  components: {
    Card,
    IconButton,
    MatchCard,
  },
  created() {
    const classQuery = this.$route.query.class;
    this.userList = this.getUsers(classQuery);
  },
  data: function () {
    return {
      userList: [],
      isMatchCardModalActive: false,
      toggleExpanded: false,
    };
  },
  methods: {
    getMatch() {
      // TODO: Check if there's a match
      if (this.isMatchedWithUser(/* userid */)) {
        console.log("User matched");
        // Show match screen
        this.isMatchCardModalActive = true;
      } else {
        this.getNextUser();
      }
    },
    getNextUser: function () {
      this.isMatchCardModalActive = false;
      // Move to next card
      // TODO: Show screen when out of people
      if (this.userList.length > 1) {
        this.userList.shift();
      } else {
        console.log("No more users in queue");
        // TODO: Show a screen saying there are no more users
      }
    },
    isMatchedWithUser: function (/* userid */) {
      // TODO: query database of matches using userid's
      return true;
    },
    getUsers: function (courseNum) {
      /**
       * Get a list of users that are looking in this course from firebase
       */
      var users = [];
      userCollection
        .where("courses", "array-contains", "EECS " + courseNum)
        .get()
        .then(function (result) {
          result.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            users.push(doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting users: ", error);
        });

      return users;
    },
    expandProfile: function () {
      this.toggleExpanded = this.toggleExpanded ? false : true
      console.log(this.toggleExpanded)
    },
  },
  computed: {
    currentProfile: {
      get: function () {
        return this.userList[0];
      },
    },
  },
};
</script>

<style scoped>
.poppins {
  font-family: "Poppins", "Helvetica", sans-serif;
}
</style>
