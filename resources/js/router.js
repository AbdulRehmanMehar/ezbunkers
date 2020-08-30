import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const isAdminAuthenticated = () => {
    return JSON.parse(localStorage.getItem('admin-account'))
}

const isUserAuthenticated = () => {
    return JSON.parse(localStorage.getItem('user-account'))
}

const adminGaurd = (to, from, next) => {
    let adminAuth = !isAdminAuthenticated()
    if (to.name != 'admin-login' && adminAuth) {
        return next({ name: 'admin-login' })
    }
    return next()
}

const adminGaurdInverted = (to, from, next) => {
    let adminAuth = !!isAdminAuthenticated()
    if (adminAuth) {
        return next({ name: 'admin-dashboard' })
    }
    return next()
}

const userGaurd = (to, from, next) => {
    let adminAuth = !isUserAuthenticated()
    if (to.name != 'login' && adminAuth) {
        return next({ name: 'login' })
    }
    return next()
}

const userGaurdInverted = (to, from, next) => {
    let adminAuth = !!isUserAuthenticated()
    if (adminAuth) {
        return next({ name: 'home' })
    }
    return next()
}


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
            path: '/signup-success',
            name: 'signup-success',
            component: () => import('@/components/SignupSuccess.vue')
        },
        {
            path: '/login',
            name: 'login',
            beforeEnter: userGaurdInverted,
            component: () => import('@/components/Login.vue')
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
        },

        {
            path: '/admin',
            name: 'admin',
            component: {
                template: `<div>
                                <router-view></router-view>
                            </div>`
            },

            beforeEnter: adminGaurd,

            children: [
                {
                    path: 'login',
                    name: 'admin-login',
                    beforeEnter: adminGaurdInverted,
                    component: () => import('@/components/admin/Login.vue')
                },
                {
                    path: 'dashboard',
                    name: 'ad-dashboard',
                    component: () => import('@/components/admin/Dashboard.vue'),
                    children: [
                        {
                            path: '',
                            name: 'admin-dashboard',
                            component: () => import('@/components/admin/dashcomponents/DashboardIndex.vue')
                        },
                        {
                            path: 'accounts/:type?',
                            name: 'admin-dashboard-accounts',
                            component: () => import('@/components/admin/dashcomponents/Accounts.vue'),
                            props: (route) => ({ type: route.params.type || 'needing-approval' })
                        },
                        {
                            path: 'fuel',
                            name: 'admin-fuel-wrapper',
                            component: {
                                template: `<div>
                                                <router-view></router-view>
                                            </div>`
                            },

                            children: [
                                {
                                    path: 'all',
                                    name: 'admin-fuel-list',
                                    component: () => import('@/components/admin/dashcomponents/FuelList.vue')
                                },

                                {
                                    path: 'create',
                                    name: 'admin-create-fuel',
                                    component: () => import('@/components/admin/dashcomponents/AddFuel.vue')
                                },
                            ]
                        },
                    ]
                }
            ]
        }

    ]
})
