import Vue from 'vue'
import App from './App.vue'
import Product from './components/Product.vue'
import 'materialize-css/dist/css/materialize.css'
window.M = require('materialize-css/dist/js/materialize.js')
Vue.component("Product",Product);
new Vue({
  el: '#app',
  render: h => h(App)
})
