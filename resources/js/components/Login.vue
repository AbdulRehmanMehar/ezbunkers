<template>
  <div>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header">
              Login
            </div>
            <div class="card-body">
              <form @submit.prevent="">


                <div class="form-group">
                  <label for="inputName">User ID</label>
                  <input type="text" v-model="uid" class="form-control" id="inputName" placeholder="HkNkS7PoLW32bjBR" required>
                  <small v-if="errors.length > 0 && errors.find(error => error.param == 'uid')" class="form-text text-danger">
                    {{ errors.find(error => error.param == 'uid').msg }}
                  </small>
                </div>

                <div class="form-group" v-if="!userIdValidated || accountExistsResponseCode == 204">
                  <button type="submit" class="btn form-control btn-outline-info">Validate</button>
                </div>

                <div v-else>

                  <div class="form-group" v-if="accountExistsResponseCode == 201">
                    <label for="inputOTP">One Time Password</label>
                    <input type="text" v-model="otp" class="form-control" id="inputOTP" placeholder="*******" required>
                    <small v-if="errors.length > 0 && errors.find(error => error.param == 'otp')" class="form-text text-danger">
                      {{ errors.find(error => error.param == 'otp').msg }}
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

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      uid: null,
      otp: null,
      password: null,
    }
  },

  computed: {
    errors() {
      return []
    },
    userIdValidated() {
      return false
    },
    accountExistsResponseCode() {
      return 201
    },
    nextURI() {
      return 'set-password'
    }
  }
}
</script>

<style scoped>

</style>