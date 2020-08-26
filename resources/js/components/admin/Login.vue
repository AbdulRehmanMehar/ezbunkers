<template>
  <div>
    <div v-if="!loading" class="container my-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header">
              Admin Login
            </div>
            <div class="card-body">
              <form @submit.prevent="login">

                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" v-model="username" class="form-control" id="username" placeholder="mehar" required>
                  <small v-if="errors.length > 0 && errors.find(error => error.param == 'username')" class="form-text text-danger">
                    {{ errors.find(error => error.param == 'username').msg }}
                  </small>
                </div>

                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="password" class="form-control" id="password" placeholder="********" required>
                  <small v-if="errors.length > 0 && errors.find(error => error.param == 'password')" class="form-text text-danger">
                    {{ errors.find(error => error.param == 'password').msg }}
                  </small>
                </div>

                <div class="form-group">
                  <button type="submit" class="btn btn-outline-success form-control">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
      <h1 class="mt-4 text-center">Processing</h1>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/partials/Loading"

export default {
  name: "AdminLogin",

  components: { Loading },

  data() {
    return {
      username: null,
      password: null
    }
  },

  computed: {
    errors() {
      return this.$store.getters['Adminlogin/errors'] || []
    },
    loading() {
      return this.$store.getters['Adminlogin/loading']
    },
    success() {
      return this.$store.getters['Adminlogin/success']
    },
  },

  watch: {
    success() {
      if (this.success) {
        this.$toast.success('Success! You\'re logged In!')
        this.$router.push({ name: 'admin-dashboard' })
      }
    },

    errors() {
      if (this.errors) {
        this.$toast.error('Yikes! Something isn\'t right!')
      }
    }
  },

  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      }

      this.$store.dispatch('Adminlogin/do_login_request', data)

    }
  }
}
</script>

<style scoped>

</style>