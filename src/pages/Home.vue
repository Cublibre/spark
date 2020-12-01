<template>
  <div v-if="currentUser">
    <h1 class="title is-1 has-text-centered has-text-white mb-1">
      Hi {{ currentUser.name.split(" ")[0] }}!
    </h1>
    <!--<div class="home has-background-white has-text-centered"></div> -->
    <Card :userData="currentUser" :isExpanded="true" />
    <div class="container mt-5 is-mobile columns">
      <div class="column">
        <b-button
          @click="logout"
          rounded
          size="is-medium"
          class="has-text-weight-semibold poppins"
          type="is-danger"
          icon-pack="fas"
          icon-left="sign-out-alt"
        > Log out
        </b-button>
      </div>
      <div class="column">
        <router-link :to="{ name: 'Profile' }"
          ><b-button
            rounded
            size="is-medium"
            class="has-text-weight-semibold poppins"
            type="is-info"
            icon-pack="fas"
            icon-left="user-edit"
            >Edit profile
          </b-button></router-link
        >
      </div>
      <div class="column">
        <router-link :to="{ name: 'Search' }"
          ><b-button
            rounded
            size="is-medium"
            class="has-text-weight-semibold poppins"
            type="is-primary"
            icon-pack="fas"
            icon-left="sign-out-alt"
            >Find a partner
          </b-button></router-link
        >
      </div>
    </div>
  </div>
  <div v-else class="is-size-1 has-text-white">Loading...</div>
</template>

<script>
import { auth, userCollection } from "@/firebase";
import Card from "@/components/Card";

export default {
  components: {
    Card,
  },
  data() {
    return {
      currentUser: null,
    };
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser() {
      // FIXME: use signed in user's uid. if no profile found, redirect to create
      var userDoc = userCollection.doc("c003adS57ugEg1vRMkId");
      var self = this; // this is not available in auth()
      userDoc.get().then(function (doc) {
        if (doc.exists) {
          console.log("Fetched profile");
          self.currentUser = doc.data();
        } else {
          console.log("Profile not found");
        }
      });
    },
    logout() {
      var self = this;
      auth
        .signOut()
        .then(function () {
          // TODO: Prompt "Are you sure?"
          console.log("Logged out");
          self.$router.push({ name: "Login" });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    edit() {
      return;
    },
    search() {
      return;
    },
  },
};
</script>

<style scoped>
.home {
  width: 500px;
  height: 280px;
  border-radius: 30px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}

.poppins {
  font-family: "Poppins", "Helvetica", sans-serif;
}
</style>
