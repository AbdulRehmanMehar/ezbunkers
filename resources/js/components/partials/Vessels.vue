<template>
  <div>
    <div class="container">

      <div class="row mb-5 p-4 bg-white" v-for="vessel of vessels" :key="vessel._id">
        <div class="col-md-5 col-sm-12">
          <div class="bg-image" :style="{'background-image': `url('${vessel.image.path.slice(3, vessel.image.path.length)}')`}"></div>
        </div>
        <div class="col-md-7 col-sm-12">
          <div class="mt-4 mt-md-0 mt-lg-0">
            <h4 class="font-weight-normal mb-2">{{ vessel.name }}</h4>

            <p class="text-primary">
              <span class="d-inline-block my-2 text-dark">Fuels: </span>
              <span class="d-inline-block my-2" v-for="fuel of vessel.fuel" :key="fuel._id">
                {{ fuel.name }}
              </span>
            </p>

            <router-link class="btn btn-dark" :to="{name: 'nominate-order', params: { id: $route.params.id, vesselId: vessel._id }}">Nominate Order</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Vessels",

  computed: {
    company() {
      const { id } = this.$route.params
      if (id) {
        return this.$store.getters['Account/getAccountById'](id)
      }
      return null
    },

    vessels() {
      if (this.company && this.company.vessels) {
        return this.company.vessels
      }
      return []
    }
  }
}
</script>

<style scoped>
.bg-image {
  width: 100%;
  position: relative;
  background-size: cover;
  height: 150px !important;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #ffffff;
  position: relative;
}
</style>