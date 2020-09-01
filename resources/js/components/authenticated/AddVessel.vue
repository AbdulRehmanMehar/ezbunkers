<template>
  <div>
    <div v-if="!loading" class="card">
      <div class="card-header">Create Vessel</div>
      <div class="card-body">
        <form @submit.prevent="addVessel">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" class="form-control" placeholder="Name" required>
            <small v-if="errors.length > 0 && errors.find(error => error.param == 'name')" class="form-text text-danger">
              {{ errors.find(error => error.param == 'name').msg }}
            </small>
          </div>

          <div class="form-group">
            <label for="fuels">Description</label>
            <select class="custom-select form-control" v-model="fuels" id="fuels" multiple>
              <option v-for="fuel in fuelList" :value="fuel._id">{{ fuel.name }}</option>
            </select>

            <small v-if="errors.length > 0 && errors.find(error => error.param == 'fuel')" class="form-text text-danger">
              {{ errors.find(error => error.param == 'fuel').msg }}
            </small>
          </div>


          <div class="form-group">
            <label for="por">Image</label>
            <div>
              <div class="custom-file">
                <input type="file" class="custom-file-input" ref="image" @change="handleUpload" id="por"  required accept="image/*">
                <label class="custom-file-label" for="por">Choose file</label>
              </div>
            </div>
            <small v-if="errors.length > 0 && errors.find(error => error.param == 'image')" class="form-text text-danger">
              {{ errors.find(error => error.param == 'image').msg }}
            </small>
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
  name: "AddVessel",
  components: { Loading },

  data() {
    return {
      name: null,
      fuels: [],
      image: null
    }
  },

  created() {
    this.$store.dispatch('Fuel/fetch_fuels')
  },

  computed: {
    fuelList() {
      return this.$store.getters['Fuel/fuels']
    },

    loading() {
      return this.$store.getters['Vessels/loading']
    },

    success() {
      return this.$store.getters['Vessels/success']
    },

    errors() {
      return this.$store.getters['Vessels/errors'] || []
    }
  },

  watch: {
    success() {
      if (this.success) {
        this.$toast.success('Success! The Vessel is created!')
        this.$router.push({ name: 'user-dashboard' })
      }
    },

    errors() {
      if (this.errors) {
        this.$toast.error('Yikes! Something isn\'t right!')
      }
    }
  },

  methods: {
    handleUpload() {
      this.image = this.$refs.image.files[0]
    },

    addVessel() {
      let form_data = new FormData()
      form_data.append('name', this.name)
      form_data.append('fuel', this.fuels)
      form_data.append('image', this.image)
      this.$store.dispatch('Vessels/create_vessel', form_data)
    }

  }
}
</script>

<style scoped>

</style>