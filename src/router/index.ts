import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log('before each, from: ' + from.name)
  console.log('before each, to: ' + to.name)
  const jwtToken = localStorage.getItem('JWT_TOKEN')
  // const code = getUrl(window.location.href).code
  console.log(jwtToken)
  if (jwtToken) {
    next()
  } else if (to.name === 'Login') {
    console.log('login')
    try {
      const href = window.location.href
      console.log('href: ' + href)
      const splitted = href.split('?', 2)
      console.log('splitted: ' + splitted)
      const params = splitted[1]
      console.log('splitted: ' + params)
      const splittedB = params.split('&', 2)
      const myMap = new Map()
      splittedB.forEach(function (value) {
        const p = value.split('=', 2)
        myMap.set(p[0], p[1])
      })
      const codeValue = myMap.get('code')
      const stateValue = myMap.get('state')
      console.log(codeValue + ', ' + stateValue)
      // let jwtToken = ''
      // axios.post('/ping', {
      //   code: codeValue,
      //   state: stateValue
      // }).then(response => (jwtToken = response.data.jwt_token))

      axios.post('/ping', {
        code: codeValue,
        state: stateValue
      })
        .then(function (response) {
          console.log(response)
          console.log(response.data)
          console.log(response.data.jwt_token)
          localStorage.setItem('JWT_TOKEN', response.data.jwt_token)
        })
        .catch(function (error) {
          console.log(error)
        })

      console.log('jwt token: ' + jwtToken)
    } catch (error) {
      console.error('no params code...')
    }
  } else {
    //  next({ name: 'Login' })
    // window.location.href = 'https://baidu.com'
    next()
  }
})

export default router
