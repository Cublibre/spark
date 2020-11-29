<template>
  <div class="has-text-centered">
    <div class="title-card">
      <div class="title is-align-items-center">
        <p>spark</p>
      </div>
    </div>
    <h4 class="subtitle is-4 has-text-white has-text-bold mt-3 mb-0">Matchmaking for EECS students.</h4>
    <b-button
      @click="login"
      rounded
      size="is-medium"
      class="mt-5 poppins has-text-weight-semibold"
      icon-pack="fab"
      icon-left="google"
      type="is-success"
      >Sign in
    </b-button>
    
  </div>
</template>

<script>
import { userCollection, auth } from "@/firebase";
import firebase from "firebase/app";

export default {
  name: "Login",
  methods: {
    login() {
      // sign in with google
      auth.useDeviceLanguage();
      var provider = new firebase.auth.GoogleAuthProvider();
      var self = this;
      auth
        .signInWithPopup(provider)
        .then(function (result) {
          var user = result.user;
          console.log("Signed in:", user.email);
          var userDoc = userCollection.doc(user.uid);
          // Try to get user profile data.
          // If user has a profile, redirect to /
          // If user has no profile, redirect to create
          userDoc
            .get()
            .then(function (doc) {
              if (doc.exists) {
                console.log("Profile found, redirecting to home...");
                self.$router.push({ name:'Home' })
              } else {
                // doc.data() will be undefined in this case
                console.log("No profile, redirecting to create profile");
                self.$router.push({ name:'Create' })
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        })
        .catch(function (error) {
          console.log("Error signing in: ", error);
        });
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  width: 500px;
  height: 280px;
  background-color: white;
  color: black;
  mix-blend-mode: screen;
  border-radius: 30px;
  font-size: 110px;
  font-weight: 600;
}
.title-card {
  border-radius: 30px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}

.poppins {
  font-family: "Poppins", "Helvetica", sans-serif;
}
</style>
