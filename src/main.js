// Main modules
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import VueResource from 'vue-resource'

// Main component
import App from './App'

Vue.use(Vuex)
Vue.use(VueResource)

Vue.config.productionTip = false
Vue.http.options.root = 'http://127.0.0.1:3000'

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
