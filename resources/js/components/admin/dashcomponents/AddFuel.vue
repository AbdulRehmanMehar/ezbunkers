<template>
  <div>
    <div v-if="!loading" class="card">
      <div class="card-header">Create Fuel</div>
      <div class="card-body">
        <form @submit.prevent="addFuel">
          <div class="form-group">
            <label for="name">Title</label>
            <input type="text" id="name" v-model="name" class="form-control" placeholder="Name" required>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" id="description" v-model="description" class="form-control" placeholder="Description">
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-info form-control">Create</button>
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
  name: "AddFuel",
  components: { Loading },
  data() {
    return {
      name: null,
      description: null
    }
  },

  computed: {
    errors() {
      return this.$store.getters['Fuel/errors'] || []
    },
    loading() {
      return this.$store.getters['Fuel/loading']
    },
    success() {
      return this.$store.getters['Fuel/success']
    },
  },

  watch: {
    success() {
      if (this.success) {
        this.$toast.success('Success! Fuel is added.')
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
    addFuel() {
      this.$store.dispatch('Fuel/create_fuel', {
        name: this.name,
        description: this.description || ''
      })
    }
  }
}
</script>

<style scoped>

</style>