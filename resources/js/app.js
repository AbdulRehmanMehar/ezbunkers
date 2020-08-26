window.$ = window.jQuery = require('jquery')
require('popper.js')
require('bootstrap')

import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import VueToast from 'vue-toast-notification'
import VueGoodTablePlugin from 'vue-good-table'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faThumbsUp,
    faForward,
    faCheckCircle,
    faSearch,
    faGlobeAmericas,
    faSms,
    faPhone
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faThumbsUp,
    faForward,
    faCheckCircle,
    faSearch,
    faGlobeAmericas,
    faSms,
    faPhone
)

import 'vue-good-table/dist/vue-good-table.css'
import 'vue-toast-notification/dist/theme-default.css'

Vue.use(VueToast, {
    position: 'bottom'
})
Vue.use(VueGoodTablePlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
