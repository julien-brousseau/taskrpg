// Main modules
import Vue from 'vue'
import Vuex from 'vuex'

// Main component
import App from './App'

// State management
import store from './store'
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
