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
    let userAuth = !isUserAuthenticated()
    if (to.name != 'login' && userAuth) {
        return next({ name: 'login' })
    }
    return next()
}

const userGaurdInverted = (to, from, next) => {
    let userAuth = !!isUserAuthenticated()
    if (userAuth) {
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
            beforeEnter: userGaurdInverted,
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
            path: '/listing/:location?/:fuel?',
            name: 'listing',
            component: () => import('@/components/Listing.vue')
        },
        {
            path: '/profile/:id',
            name: 'profile-view',
            component: () => import('@/components/Profile.vue'),
            children: [
                {
                    path: 'home',
                    name: 'profile',
                    component: () => import('@/components/partials/ProfileHome.vue'),
                },

                {
                    path: 'vessels',
                    name: 'vessels',
                    component: () => import('@/components/partials/Vessels.vue'),
                },

                {
                    path: 'nominate-order/:vesselId?',
                    name: 'nominate-order',
                    component: () => import('@/components/partials/NominateOrder.vue'),
                },
            ]
        },
        {
            path: '/how-it-works',
            name: 'how-it-works',
            component: () => import('@/components/HowItWorks.vue')
        },

        {
            path: 'chat/:user?',
            name: 'chat',
            beforeEnter: userGaurd,
            component: () => import('@/components/authenticated/Chat.vue')
        },

        {
            path: '/dashboard',
            name: 'user-dash',
            beforeEnter: userGaurd,
            component: () => import('@/components/authenticated/Dashboard.vue'),

            children: [

                {
                    path: '',
                    name: 'user-dashboard',

                    component: {
                        template: `
                        <div v-else style="height: calc(var(--height-after-navbar) - 5rem); overflow-x: hidden; overflow-y: auto; display: flex; flex-direction: column; justify-content: center; align-items: center">
                            <h3>{{ currentUser ? currentUser.name : '' }} -  {{ currentUser ? currentUser.companyName : '' }}</h3>
                            <p>Click on the Links (in the Sidebar) to open specific sections!</p>
                          </div>
                        `,
                        computed: {
                            currentUser() {
                                return this.$store.getters['Login/account']
                            }
                        }
                    }
                },

                {
                    path: 'set-password',
                    name: 'user-dashboard-set-password',
                    component: () => import('@/components/authenticated/AccountPassword.vue')
                },

                {
                    path: 'create-vessels',
                    name: 'user-create-vessels',
                    component: () => import('@/components/authenticated/AddVessel.vue')
                },

                {
                    path: 'list-vessels',
                    name: 'user-vessels-list',
                    component: () => import('@/components/authenticated/VesselList.vue')
                },

                {
                    path: 'company-documents',
                    name: 'company-documents',
                    component: () => import('@/components/authenticated/CompanyDocuments.vue')
                },

                {
                    path: 'company-images',
                    name: 'company-images',
                    component: () => import('@/components/authenticated/CompanyImages.vue')
                },

                {
                    path: 'list-orders',
                    name: 'orders-list',
                    component: () => import('@/components/authenticated/Orders.vue')
                },

                {
                    path: 'list-nominations',
                    name: 'nominations-list',
                    component: () => import('@/components/authenticated/Nominations.vue')
                },

                {
                    path: 'leave-a-review/:company?/:order?',
                    name: 'review',
                    component: () => import('@/components/authenticated/ReviewForm.vue')
                },

                {
                    path: 'reviews/:type?',
                    name: 'reviews',
                    component: () => import('@/components/authenticated/ReviewsList.vue'),
                    props: (route) => ({ type: route.params.type || 'byme' })
                },

            ]
        },



        // Admin Dashboard
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
                            path: 'update-password',
                            name: 'admin-dashboard-update-password',
                            component: () => import('@/components/admin/dashcomponents/AccountPassword.vue')
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
