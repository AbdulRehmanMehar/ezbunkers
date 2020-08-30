<template>
  <div>
    <div v-if="!loading" class="card">
      <div class="card-header">Set Password</div>
      <div class="card-body">
        <form @submit.prevent="">
          <div class="form-group">
            <label for="name">Password</label>
            <input type="password" id="name" v-model="password" class="form-control" placeholder="*******" required>
          </div>

          <div class="form-group">
            <label for="description">Confirm Password</label>
            <input type="password" id="description" v-model="confirmPassword" class="form-control" placeholder="*******" required>
            <small class="text-danger" v-if="password != confirmPassword">
              Passwords don't match.
            </small>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-info form-control" :disabled="password != confirmPassword">Create</button>
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
  }

  computed: {
    loading() {
      return false
    }
  }

}
</script>

<style scoped>

</style>