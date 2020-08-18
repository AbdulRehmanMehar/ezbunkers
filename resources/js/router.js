import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Signup from '@/components/Signup'
import Listing from "@/components/Listing"
import HowItWorks from "@/components/HowItWorks"


Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
            // component: () => import('@/components/Home.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
            // component: () => import('@/components/Signup.vue')
        },
        {
            path: '/listing',
            name: 'listing',
            component: Listing
            // component: () => import('@/components/Listing.vue')
        },
        {
            path: '/how-it-works',
            name: 'how-it-works',
            component: HowItWorks
            // component: () => import('@/components/HowItWorks.vue')
        }
    ]
})
