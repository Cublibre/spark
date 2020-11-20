<template>
  <div id="feed" class="is-flex is-flex-direction-row is-align-items-center">
    <div class="mx-6">
      <IconButton @click.native="getNextUser" type="is-danger" icon="times" />
    </div>
    <Card :userData="currentProfile" />
    <div class="mx-6">
      <IconButton @click.native="getMatch" type="is-success" icon="check" />
    </div>
  </div>
</template>

<script>
import router from '@/router'
import Card from "./Card";
import IconButton from "./IconButton";
export default {
  name: "Feed",
  components: {
    Card,
    IconButton,
  },
  data: function () {
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
    };

    let userList = [JOHN_DOE, JANE_DOE];

    return {
      userList,
      currentProfile: userList[0],
    };
  },
  methods: {
    getMatch() {
      // TODO: Check if there's a match
      //if(this.isMatchedWithUser(/* userid */)){
        //console.log("User matched")
        // Show match screen
      //}
      //else {
        //this.getNextUser();
      //}
      router.push('match')
    },
    getNextUser: function () {
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
    }
  },
};
</script>
