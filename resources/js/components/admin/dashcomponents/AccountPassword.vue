<template>
  <div>
    <div v-if="!loading" class="card">
      <div class="card-header">Set Password</div>
      <div class="card-body">
        <form @submit.prevent="update_password">
          <div class="form-group">
            <label for="name">Password</label>
            <input type="password" id="name" v-model="password" class="form-control" placeholder="*******" required>
          </div>

          <div class="form-group">
            <label for="description">Confirm Password</label>
            <input type="password" id="description" v-model="confirmPassword" class="form-control" placeholder="*******" required>
            <small class="text-danger" v-if="password != null && confirmPassword != null && password != confirmPassword">
              Passwords don't match.
            </small>
            <small v-if="errors.length > 0 && errors.find(error => error.param == 'password')" class="form-text text-danger">
              {{ errors.find(error => error.param == 'password').msg }}
            </small>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-info form-control" :disabled="password != confirmPassword">Set</button>
          </div>
        </form>
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
  name: "AccountPassword",
  components: { Loading },

  data() {
    return {
      password: null,
      confirmPassword: null
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
        this.$toast.success('Success! Password got updated!')
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
    update_password() {
      this.$store.dispatch('Adminlogin/do_update_password_request', {
        password: this.password,
        confirmPassword: this.password
      })
    }
  }

}
</script>

<style scoped>

</style>