import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/Home.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('@/components/Signup.vue')
        },
        {
            path: '/listing',
            name: 'listing',
            component: () => import('@/components/Listing.vue')
        },
        {
            path: '/how-it-works',
            name: 'how-it-works',
            component: () => import('@/components/HowItWorks.vue')
        }
    ]
})
