import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import { auth } from './firebase'

Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconPack: 'fas',
})

// Make sure Firebase is initialized before the app for auth to work
let app
auth.onAuthStateChanged(user => {
  if(user) {
    console.log("user is signed in")
  }
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
