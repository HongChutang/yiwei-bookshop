import Vue from 'vue'
import VueSimpleStore from './vue-simple-store.js'
import MainStore from './main-store.js'
(function () {
    Vue.use(VueSimpleStore, {stores: [MainStore], debug: true})
})()
