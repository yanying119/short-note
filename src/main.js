// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/css/index.css'

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	components: { App }
})