<template>
  <div>
    <div v-if="!loading" class="container my-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header">
              Login
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">


                <div class="form-group">
                  <label for="inputName">User ID</label>
                  <input type="text" v-model="uid" class="form-control" id="inputName" placeholder="HkNkS7PoLW32bjBR" required :readonly="(seeUserIdAndSetOTPIfNeededResponseCode != 204 && seeUserIdAndSetOTPIfNeededResponseCode != 0)">
                  <small v-if="errors.length > 0 && errors.find(error => error.param == 'uid')" class="form-text text-danger">
                    {{ errors.find(error => error.param == 'uid').msg }}
                  </small>
                  <small v-if="seeUserIdAndSetOTPIfNeededResponseCode == 204" class="text-danger">
                    No such User was found!
                  </small>
                </div>

                <div class="form-group" v-if="seeUserIdAndSetOTPIfNeededResponseCode == 0 || seeUserIdAndSetOTPIfNeededResponseCode == 204">
                  <button type="submit" class="btn form-control btn-outline-info">Next</button>
                </div>

                <div v-else-if="seeUserIdAndSetOTPIfNeededResponseCode == 201 || seeUserIdAndSetOTPIfNeededResponseCode == 200">

                  <div class="form-group" v-if="seeUserIdAndSetOTPIfNeededResponseCode == 201">
                    <label for="inputOTP">One Time Password</label>
                    <input type="text" v-model="otp" class="form-control" id="inputOTP" placeholder="*******" required>
                    <small v-if="errors.length > 0 && errors.find(error => error.param == 'password')" class="form-text text-danger">
                      {{ errors.find(error => error.param == 'password').msg }}
                    </small>
                  </div>

                  <div class="form-group" v-else>
                    <label for="inputPassword">Password</label>
                    <input type="text" v-model="password" class="form-control" id="inputPassword" placeholder="********" required>
                    <small v-if="errors.length > 0 && errors.find(error => error.param == 'password')" class="form-text text-danger">
                      {{ errors.find(error => error.param == 'password').msg }}
                    </small>
                  </div>

                  <div class="form-group">
                    <button type="submit" class="btn form-control btn-outline-success">Login</button>
                  </div>
                </div>


                <div class="text-danger" v-else>
                  Sorry, Something went seriously wrong.
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
  name: "Login",
  components: { Loading },
  data() {
    return {
      uid: null,
      otp: null,
      password: null,
    }
  },

  computed: {
    errors() {
      return this.$store.getters['Login/errors'] || []
    },

    loading() {
      return this.$store.getters['Login/loading']
    },

    success() {
      return this.$store.getters['Login/success']
    },

    seeUserIdAndSetOTPIfNeededResponseCode() {
      return this.$store.getters['Login/validate_uid_response_code']
    },

  },

  watch: {
    seeUserIdAndSetOTPIfNeededResponseCode() {
      if (this.seeUserIdAndSetOTPIfNeededResponseCode == 201) {
        this.$toast.success('Use the OTP we sent to your email to login!')
      } else if(this.seeUserIdAndSetOTPIfNeededResponseCode == 200) {
        this.$toast.success('Enter your password to login!')
      } else if (this.seeUserIdAndSetOTPIfNeededResponseCode == 204) {
        this.$toast.error('The User ID is invalid.')
      }
    },

    errors() {
      if (this.errors) {
        this.$toast.error('Yikes! Something isn\'t right!')
      }
    }
  },

  methods: {
    handleLogin() {
      if (this.otp == null && this.password == null && this.uid != null) { // We need to Validate
        this.seeUserIdAndSetOTPIfNeeded()
      } else {


        if (this.seeUserIdAndSetOTPIfNeededResponseCode == 201) {
          this.$store.dispatch('Login/do_login_request', {
            uid: this.uid,
            otp: this.otp
          }).then(() => {
            this.$router.push({ name: 'user-dashboard-set-password' })
          })
        } else {
          this.$store.dispatch('Login/do_login_request', {
            uid: this.uid,
            password: this.password
          }).then(() => {
            this.$router.push({ name: 'home' })
          })
        }



      }
    },

    seeUserIdAndSetOTPIfNeeded() {
      this.$store.dispatch('Login/validate_user_id', this.uid)
    }
  }
}
</script>

<style scoped>

</style>