<template>
  <div v-if="profile" class="is-flex is-flex-direction-column">
    <h1 class="title is-1 has-text-white">edit profile</h1>
    <h4 class="subtitle is-4 has-text-white">help others find you</h4>
    <div class="profile is-align-items-center">
      <section class="is-flex is-flex-direction-row is-align-items-center">
        <div style="width: 4rem">
          <Avatar :url="profile.imageUrl" />
        </div>
        <h3 class="title is-3 has-text-weight-bold ml-4 mb-1">
          {{ profile.name }}
        </h3>
      </section>

      <b-tabs
        v-model="activeTab"
        position="is-centered"
        class="has-text-weight-semibold"
      >
        <b-tab-item label="info">
          <section>
            <h3 class="title is-3 mb-4 has-text-primary">about</h3>
            <section class="is-flex is-flex-direction-row is-flex">
              <b-field class="ml-0" label="major">
                <b-input
                  v-model="profile.major"
                  placeholder="Computer Science"
                ></b-input>
              </b-field>
              <b-field class="mx-6" label="graduation year">
                <b-input
                  v-model="profile.year"
                  type="number"
                  :min="currentYear"
                  controls-position="compact"
                  controls-rounded
                  placeholder="2020"
                  :validation-message="
                    'enter a year on or after ' + currentYear
                  "
                >
                </b-input>
              </b-field>
            </section>
          </section>
          <section>
            <h3 class="title is-3 mb-4 has-text-primary">contact</h3>
            <section class="is-flex is-flex-direction-row">
              <b-field label="email">
                <b-input
                  placeholder="Email"
                  type="email"
                  icon-pack="fas"
                  icon="envelope"
                  v-model="profile.email"
                >
                </b-input>
              </b-field>
              <b-field class="mx-6" label="phone">
                <b-input
                  v-model="profile.phone"
                  placeholder="123-456-7890"
                  type="tel"
                  icon-pack="fas"
                  icon="mobile-alt"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  validation-message="Format: ###-###-####"
                >
                </b-input>
              </b-field>
            </section>
          </section>
        </b-tab-item>
        <b-tab-item label="courses">
          <h3 class="title is-3 mb-1 has-text-primary mb-3">
            courses you need partners for
          </h3>
          <section>
            <b-field>
              <b-taginput
                v-model="profile.courses"
                :allow-new="false"
                ellipsis
                icon-pack="fas"
                icon="chalkboard"
                placeholder="enter course codes e.g. 493"
                aria-close-label="Delete this tag"
                :data="filteredCourses"
                autocomplete
                @typing="getFilteredCourses"
                field="code"
                :before-adding="beforeAddCourse"
              >
                <template slot-scope="props">
                  <strong>{{ props.option.code }}</strong
                  >: {{ props.option.name }}
                </template>
              </b-taginput>
            </b-field>
          </section>
        </b-tab-item>
        <b-tab-item label="workdays">
          <h3 class="title is-3 mb-1 has-text-primary">
            when do you like to work?
          </h3>
          <section class="has-info mb-2">
            <b-icon
              type="is-info"
              pack="fas"
              icon="info-circle"
              size="is-small"
            >
            </b-icon>
            select both a start and end time for the days you are available
          </section>
          <section class="mb-6 is-flex is-flex-direction-row">
            <template v-for="(value, name) in workdayState"
              ><WorkdayTimePicker
                :key="name"
                @selected="closeAllButSelected(name)"
                :isExpanded="value.expanded"
                :buttonType="getButtonType(name)"
                :workday="value"
                :timePickerDirection="name === 'sun' ? 'left' : 'right'"
            /></template>
          </section>
        </b-tab-item>
        <b-tab-item label="bio">
          <h3 class="title is-3 mb-1 has-text-primary mb-3">
            distinguish yourself
          </h3>
          <b-field>
            <b-input
              v-model="profile.bio"
              type="textarea"
              placeholder="Write a few things about yourself. Here are some suggestions:
What are your work habits? 
What are your hobbies? 
When do you like to start projects / homework?"
            >
            </b-input>
          </b-field>
        </b-tab-item>
      </b-tabs>
    </div>
    <div class="mt-5 is-flex is-flex-direction-column is-align-items-center">
      <b-button
        @click="checkProfile"
        class="poppins has-text-weight-semibold"
        rounded
        type="is-success"
        size="is-large"
        icon-pack="fas"
        icon-left="save"
      >
        Save
      </b-button>
    </div>
  </div>
</template>

<script>
import { auth, userCollection } from "@/firebase";
import Avatar from "@/components/Avatar";
import WorkdayTimePicker from "@/components/WorkdayTimePicker";
import { eecsCollection } from "@/firebase";
export default {
  components: {
    Avatar,
    WorkdayTimePicker,
  },
  created() {
    this.getCourseList();
    this.getCurrentProfile();
  },
  data() {
    return {
      activeTab: 0,
      courses: {},
      filteredCourses: [],
      profile: {
        courses: [],
        bio: "",
        email: "",
        imageUrl: "",
        major: "",
        name: "",
        phone: "",
        workdays: {},
        year: "",
      },
      // Data for WorkdayTimePicker components
      workdayState: {
        mon: {
          label: "M",
          expanded: false,
          begin: null,
          end: null,
        },
        tue: {
          label: "Tu",
          expanded: false,
          begin: null,
          end: null,
        },
        wed: {
          label: "W",
          expanded: false,
          begin: null,
          end: null,
        },
        thu: {
          label: "Th",
          expanded: false,
          begin: null,
          end: null,
        },
        fri: {
          label: "F",
          expanded: false,
          begin: null,
          end: null,
        },
        sat: {
          label: "Sa",
          expanded: false,
          begin: null,
          end: null,
        },
        sun: {
          label: "Su",
          expanded: false,
          begin: null,
          end: null,
        },
      },
    };
  },
  methods: {
    getCourseList() {
      var self = this;
      // Get a list of classes with other people actually searching in those classes.
      // Exclude the logged in user, and also people the user invited
      let courses = {};
      eecsCollection
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            courses[doc.id] = doc.data();
            self.courses = courses;
          });
          console.log("Retrieved course list");
        })
        .catch(function (error) {
          console.log("Error getting classes: ", error);
        });
    },
    getCurrentProfile() {
      /* Get current profile from the database. */
      var user = auth.currentUser;
      var profile = this.profile;
      var userDoc = userCollection.doc(user.uid);
      var self = this;
      userDoc.get().then(function (doc) {
        if (doc.exists) {
          self.profile = doc.data();
          // convert profile.courses from "EECS ..." to { code: code,  name: self.courses[code].name} (this is pain)
          self.profile.courses = self.profile.courses.map((c) => {
            const code = c.substr(5);
            return { code: code, name: self.courses[code].name };
          });
          // convert string HH:mm to Date object
          for (var day in self.profile.workdays) {
            var times = self.profile.workdays[day];
            var strToDate = (s) => {
              var d = new Date();
              d.setHours(s.substr(0, 2));
              d.setMinutes(s.substr(4, 6));
              return d;
            };
            times.begin = strToDate(times.begin);
            times.end = strToDate(times.end);
            self.workdayState[day.substr(0, 3)] = Object.assign(
              self.workdayState[day.substr(0, 3)],
              times
            );
          }
        } else {
          profile.name = user.displayName;
          profile.imageUrl = user.photoURL ? user.photoURL : "";
          profile.email = user.email;
          profile.phone = user.phoneNumber ? user.phoneNumber : "";
          profile.liked = []
          userDoc
            .set(profile)
            .then(function () {
              console.log("Instantiated profile");
            })
            .catch((error) => {
              console.log(error)
            });
          return;
        }
      });
    },
    getFilteredCourses(input) {
      this.filteredCourses = this.courseNames.filter((option) => {
        return (
          option.code.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      });
    },
    isDayFilled(day) {
      // returns true if both begin and end times are selected for a day.
      return this.workdayState[day].begin && this.workdayState[day].end;
    },
    getButtonType(day) {
      /* Color button red if invalid, gray if unselected, and primary if valid. */
      var timeRange = this.workdayState[day];
      if (this.isDayFilled(day)) {
        return "is-primary";
      } else if (timeRange.begin === null && timeRange.end === null) {
        // user did not input any times
        return "";
      }
      return "is-danger";
    },
    closeAllButSelected(day) {
      // Set expanded to false on all collapses except the selected day.
      Object.entries(this.workdayState).forEach((w) => {
        if (w[0] != day) {
          this.workdayState[w[0]].expanded = false;
        }
      });
      this.workdayState[day].expanded = !this.workdayState[day].expanded;
    },
    checkProfile() {
      /* Submit profile data if input is valid. Show notification otherwise */
      // Check all workday times are valid
      for (const day in this.workdayState) {
        if (
          !this.isDayFilled(day) &&
          !(
            this.workdayState[day].begin === null &&
            this.workdayState[day].end === null
          )
        ) {
          console.log(`input for ${day} invalid`);
          this.invalidInputMessage(
            "Check that you entered your workdays correctly."
          );
          return;
        }
      }
      // Check that email isn't empty
      if (!this.profile.email) {
        this.invalidInputMessage("Email is required.");
        return;
      }
      this.submitProfile();
    },
    invalidInputMessage(msg) {
      this.$buefy.notification.open({
        duration: 5000,
        message: `Could not save profile: ${msg}`,
        position: "is-top",
        hasIcon: true,
        type: "is-danger",
      });
    },
    addWorkdaysToProfile(profile) {
      // add workdays from workdayState to profile
      for (const [key, value] of Object.entries(this.workdayState)) {
        if (value.begin !== null) {
          // convert Date to HH:mm string
          var begin = value.begin;
          var end = value.end;
          var dateToStr = (d) => {
            return `${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:${
              d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()
            }`;
          };
          begin = dateToStr(begin);
          end = dateToStr(end);
          profile.workdays[key] = { begin: begin, end: end };
        } else {
          delete profile.workdays[key];
        }
      }
    },
    submitProfile() {
      var user = auth.currentUser;
      var profile = JSON.parse(JSON.stringify(this.profile));
      var userDoc = userCollection.doc(user.uid);
      var self = this;
      this.addWorkdaysToProfile(profile);
      // convert course object array to array of strings
      profile.courses = this.profile.courses.map((c) => {
        return `EECS ${c.code}`;
      });
      userDoc
        .set(profile)
        .then(function () {
          console.log("Successfully saved profile");
          self.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log("Error writing profile:", error);
        });
    },
    beforeAddCourse(tag) {
      var valid = true;
      this.profile.courses.forEach((c) => {
        if (c.code === tag.code) {
          console.log("duplicate found");
          valid = false;
        }
      });
      return valid;
    },
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    courseCodes() {
      return Object.keys(this.courses);
    },
    courseNames() {
      /* Returns objects with {code: int, name: str} */
      let courses = Object.entries(this.courses);
      return courses.map((c) => {
        let code = c[0];
        let name = c[1].name;
        return { code, name };
      });
    },
    expanded() {
      return Object.values(this.workdayState).map((v) => {
        return v.expanded;
      });
    },
  },
};
</script>

<style>
.textarea {
  resize: none !important;
  height: 230px;
}

.profile {
  width: 700px;
  height: 500px;
  background: white;
  overflow: hidden;
  padding: 45px;
  border-radius: 30px;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}

.poppins {
  font-family: "Poppins", "Helvetica", sans-serif;
}
</style>
