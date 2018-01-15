import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

// import VConsole from 'vconsole'

/* eslint-disable no-unused-vars */
// let vConsole = new VConsole()

fastclick.attach(document.body)

document.addEventListener('touchmove', (e) => {
  e.preventDefault()
})

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
