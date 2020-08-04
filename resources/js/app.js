window.$ = window.jQuery = require('jquery')
require('popper.js')
require('bootstrap')

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
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

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
