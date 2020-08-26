<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">
                <img :src="logo" height="60" alt="Orama">
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                </li>

                <div  style="display: inherit" v-if="adminAccount">

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'admin-dashboard'}">Admin Dashboard</router-link>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link" @submit.prevent="logoutAdmin">Logout</a>
                    </li>

                </div>

                <div style="display: inherit" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'how-it-works'}">How it Works</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'signup'}">Sign Up</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'login'}">Log In</router-link>
                    </li>
                </div>
            </ul>
        </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                logo: require('@/images/ezbunk.0caa7f64.png')
            }
        },

        computed: {
          adminAccount() {
            return this.$store.getters['Adminlogin/account']
          },

          standardAccount() {
            return false
          },
        },

        methods: {
          logoutAdmin() {
            this.$store.dispatch('Adminlogin/logout')
          }
        }
    }
</script>