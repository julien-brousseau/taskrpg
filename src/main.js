// Main modules
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import VueResource from 'vue-resource';

// Main component
import App from './App';

Vue.use(Vuex);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = 'http://127.0.0.1:3000';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});

/* {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "plugin:vue/essential",
    "airbnb-base"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "semi": [
      "error",
      "always"
    ]
  }
},

"eslint.alwaysShowStatus": true,
"eslint.format.enable": true,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.run": "onType",
"eslint.validate": [
    "vue",
    "html",
    "javascript",
],
"editor.formatOnSave": true,
"eslint.codeActionsOnSave.mode": "all" */
