<template>
  <div id="feed" class="is-flex is-flex-direction-row is-align-items-center">
      <IconButton @click.native="getNextUser" type="is-danger" icon="times" />
    <Card :userData="currentProfile" />
      <IconButton @click.native="getMatch" type="is-success" icon="check" />
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
</template>

<script>
import Card from "@/components/Card";
import MatchCard from "@/components/MatchCard";
import IconButton from "@/components/IconButton";
export default {
  name: "Feed",
  components: {
    Card,
    IconButton,
    MatchCard,
  },
  created () {
    const classQuery = this.$route.query.class;
    this.getFilteredUsers(classQuery);
  },
  data: function () {
    return {
      userList: [],
      currentProfile: {},
      isMatchCardModalActive: false,
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
        this.currentProfile = this.userList[0];
      } else {
        console.log("No more users in queue");
        // TODO: Show a screen saying there are no more users
      }
    },
    isMatchedWithUser: function (/* userid */) {
      // TODO: query database of matches using userid's
      return true;
    },
    getFilteredUsers(query) {
      // TODO: Get user list from database
      const JOHN_DOE = {
        name: "John Doe",
        major: "Computer Science",
        year: "2020",
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
        phone: "(123) 456-7890",
        email: "jdoe@umich.edu",
      };
      const JANE_DOE = {
        name: "Jane Doe",
        major: "Computer Science",
        year: "2021",
        imageUrl:
          "https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg",
        courses: {
          "EECS 482": true,
          "EECS 442": true,
          "EECS 493": true,
        },
        workdays: {
          tuesday: {
            startTime: "10:00",
            endTime: "12:00",
          },
          wednesday: {
            startTime: "13:00",
            endTime: "17:00",
          },
          friday: {
            startTime: "13:00",
            endTime: "15:00",
          },
        },
        phone: "(135) 789-1113",
        email: "jadoe@umich.edu",
      };

      const USER_LIST = [JOHN_DOE, JANE_DOE];
      
      this.userList = USER_LIST.filter((user_obj) => {
        let courses = Object.keys(user_obj.courses)
        console.log(`${user_obj.name}'s courses: ${courses}`)
        return courses.includes("EECS " + query)
      });

      if(this.userList.length > 0) {
        this.currentProfile = this.userList[0];
      } else {
        console.log("No users found")
        // TODO: Show alert to user
      }
    },
  },
  computed: {
    
  },
};
</script>