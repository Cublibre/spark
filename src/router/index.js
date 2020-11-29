import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firebase'

Vue.use(VueRouter)

function route(path, component, meta={}) {
  /* Creates a route object for the router. */
  return {
    path,
    name: component,
    component: () => import(`@/pages/${component}`),
    meta: meta,
  }
}

const routes = [
  route('/', 'Home', { requiresAuth: true }),
  route('/search', 'Search', { requiresAuth: true }),
  route('/feed', 'Feed', { requiresAuth: true }),
  route('/profile', 'Profile', { requiresAuth: true }),
  route('/login', 'Login'),
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  var currentUser = auth.currentUser
  // check if user is authenticated
  if (requiresAuth && !currentUser) {
    next({ name: 'Login' })
  }
  else if (!requiresAuth && currentUser) {
    // Redirect to home if logged in
    next({ name: 'Home' })
  }
  else next()
})



export default router
