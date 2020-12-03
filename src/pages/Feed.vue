<template>
  <div
    id="feed"
    v-if="currentProfile"
    class="is-flex is-flex-direction-column is-align-items-center"
  >
    <section
      style="position: absolute; top: 48px; left: 100px; z-index: 30 !important"
    >
      <IconButton
        @click.native="toggleInstructions = !toggleInstructions"
        type="is-info"
        icon="question"
      />
      <b-message
        class="mt-3"
        style="width: 400px"
        title="How to find a partner"
        v-model="toggleInstructions"
        aria-close-label="Close message"
        type="is-info"
      >
        Press the
        <b-icon pack="fas" icon="check-circle" size="is-small"> </b-icon> check
        button if you want to be partners with this user, and the
        <b-icon pack="fas" icon="times-circle" size="is-small"> </b-icon> other
        button to skip. If you match, you will get their contact info.
        Otherwise, wait for them to match with you.
      </b-message>
    </section>
    <div class="is-flex is-flex-direction-row is-align-items-center">
      <IconButton @click.native="getNextUser" type="is-danger" icon="times" />
      <Card :userData="currentProfile" :isExpanded="toggleExpanded" />
      <IconButton @click.native="getMatch" type="is-success" icon="check" />
    </div>
    <div class="mt-5" style="position: relative">
      <b-button
        class="poppins has-text-weight-semibold"
        icon-pack="fas"
        icon-left="chevron-circle-down"
        rounded
        v-if="!toggleExpanded"
        @click="expandProfile"
        type="is-info"
        >More about {{ currentProfile.name.split(" ")[0] }}</b-button
      >
      <b-button
        class="poppins has-text-weight-semibold"
        icon-pack="fas"
        icon-left="chevron-circle-up"
        rounded
        v-else
        @click="expandProfile"
        type="is-info is-light"
        >Less about {{ currentProfile.name.split(" ")[0] }}</b-button
      >
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
import { firestore, auth, userCollection } from "@/firebase";
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
      toggleInstructions: false,
    };
  },
  methods: {
    getMatch() {
      if (this.isMatchedWithUser(auth.currentUser.uid)) {
        console.log("User matched");
        this.isMatchCardModalActive = true;
      } else {
        // Add the user's uid to my invites
        var user = auth.currentUser;
        var userDoc = userCollection.doc(user.uid);
        var currentProfileUid = this.currentProfile.uid;
        userDoc.update({
          liked: firestore.FieldValue.arrayUnion(currentProfileUid),
        });
        this.getNextUser();
      }
    },
    getNextUser: function () {
      this.isMatchCardModalActive = false;
      // Move to next card
      if (this.userList.length > 1) {
        this.userList.shift();
      } else {
        this.$buefy.dialog.confirm({
          title: "No more users in queue",
          message:
            "We have run out of possible matches for you. You may get contacted by someone who matches with you. Check back later to see if anyone new is looking for a spark!",
          cancelText: "Back to Search",
          confirmText: "Home",
          type: "is-primary",
          onCancel: () => this.$router.push({ name: "Search" }),
          onConfirm: () => this.$router.push({ name: "Home" }),
        });
      }
    },
    isMatchedWithUser: function (uid) {
      // returns true if the user with uid has currentUser's uid in their list.
      return this.currentProfile.liked.includes(uid);
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
            // don't add currently logged in user
            if (doc.id === auth.currentUser.uid) return;
            users.push({ ...doc.data(), uid: doc.id });
          });
        })
        .catch(function (error) {
          console.log("Error getting users: ", error);
        });
      // Filter out users that I already liked
      return users;
    },
    expandProfile: function () {
      this.toggleExpanded = this.toggleExpanded ? false : true;
      console.log(this.toggleExpanded);
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
