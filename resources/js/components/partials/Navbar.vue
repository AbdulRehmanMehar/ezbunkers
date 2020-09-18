<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name: 'home'}">
                <img src="/images/ezbunk.0caa7f64.png" height="60" alt="Orama">
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto" v-if="adminAccount">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'admin-dashboard'}">Admin Dashboard</router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'admin-dashboard-update-password'}">Change Password</router-link>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link" @click.prevent="logoutAdmin">Logout</a>
                </li>
            </ul>

              <ul class="navbar-nav ml-auto" v-else-if="standardAccount">
                <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'user-dashboard'}">Dashboard</router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'chat'}">Messages</router-link>
                </li>

                <li class="nav-item">
                  <a href="#" class="nav-link" @click.prevent="logoutStandardAccount">Logout</a>
                </li>
              </ul>

              <ul class="navbar-nav ml-auto" v-else>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'how-it-works'}">How it Works</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'signup'}">Sign Up</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" :to="{name: 'login'}">Log In</router-link>
                </li>
              </ul>
        </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',

        computed: {
          adminAccount() {
            return this.$store.getters['Adminlogin/account']
          },

          standardAccount() {
            return this.$store.getters['Login/account']
          },
        },

        methods: {
          navigateToRoot(){
            this.$router.push({ name: 'home' })
          },

          logoutAdmin() {
            this.$store.dispatch('Adminlogin/logout')
            this.navigateToRoot()
          },

          logoutStandardAccount() {
            this.$store.dispatch('Login/logout')
            this.navigateToRoot()
          }

        }
    }
</script>