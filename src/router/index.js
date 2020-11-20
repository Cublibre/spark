import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function route(path, component) {
  /* Creates a route object for the router. */
  return {
    path,
    name: component,
    component: () => import(`@/pages/${component}`)
  }
}

const routes = [
  route('/', 'Home'),
  route('/search', 'Search'),
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
