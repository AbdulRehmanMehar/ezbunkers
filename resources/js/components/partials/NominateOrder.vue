<template>
  <div>
    <div v-if="!loading" class="container bg-white">
      <div class=" p-4">
        <h3 class="mb-4">Nominate Order</h3>
        <form @submit.prevent="submit">

          <div class="form-group">
            <label for="vesselType">Vessel</label>
            <input type="text" id="vesselType" readonly class="form-control" :value="vessel ? vessel.name : ''" />
          </div>

          <div class="form-group">
            <label for="size">Vessel Size</label>
            <input type="number" id="size" v-model="vesselSize" class="form-control" placeholder="Size of Vessel" required />
          </div>

          <div class="form-group">
            <label for="price">Price (Bid in USD)</label>
            <input type="number" id="price" v-model="price" class="form-control" placeholder="Price" required />
          </div>

          <div class="form-group">
            <label for="destination">Destination</label>
            <input type="text" id="destination" v-model="destination" class="form-control" placeholder="Destination" required />
          </div>

          <div class="form-row" v-for="(fuel, idx) of vessel.fuel" :key="fuel._id">
            <div class="form-group col">
              <label for="fuelType">Fuel</label>
              <input type="text" id="fuelType" class="form-control" :value="fuel ? fuel.name : ''" readonly />
            </div>
            <div class="form-group col">
              <label for="quantity">Fuel Quantity</label>
              <input type="number" id="quantity" v-model="fuelQuantities[idx]" class="form-control" placeholder="Quantity of Fuel" required />
            </div>
          </div>

          <button type="submit" class="btn btn-dark form-control" :disabled="currentUser.uid == company.uid">Nominate</button>
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
  name: "NominateOrder",
  components: { Loading },

  data() {
    return {
      price: null,
      vesselSize: null,
      destination: null,
      fuelQuantities: []
    }
  },

  computed: {
    currentUser() {
      return this.$store.getters['Login/account']
    },

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
    },

    vessel() {
      const { vesselId } = this.$route.params
      if (this.vessels && vesselId) {
        let v = this.vessels.find(vessel => vessel._id == vesselId)
        console.log(v)
        return v
      }
      return null
    },

    loading() {
      return this.$store.getters['Orders/loading']
    },

    errors() {
      return this.$store.getters['Orders/errors']
    },

    success() {
      return this.$store.getters['Orders/success']
    },
  },

  methods: {
    submit() {
      let fuel = []
      for (let i=0; i < this.fuelQuantities.length; i++) {
        let obj = {
          id: this.vessel.fuel[i]._id,
          quantity: this.fuelQuantities[i]
        }

        fuel.push(obj)
      }

      let data = {
        sellerId: this.$route.params.id,
        vesselId: this.$route.params.vesselId,
        fuelQuantities: fuel,
        vesselSize: this.vesselSize,
        price: this.price,
        destination: this.destination
      }

      this.$store.dispatch('Orders/nominate', data)
        .then(order => {
          let msg = `Order ID: ${order._id} <br>
                  Company Name: ${order.nominator.companyName} <br>
                    Fuel Type & Quantity: ${order.fuels.map(fuel => `${fuel.fuel.name}: ${fuel.quantity}, `)} <br>
                    Vessel Type: ${order.vessel.name} <br>
                     Vessel Size: ${order.vesselSize} <br>
                       Price: ${order.price} USD<br>
                        Destination: ${order.destination}`

          this.$socket.client.emit('message', {
            message: msg,
            receiver: this.$route.params.id
          })
          this.$router.push({ name: 'chat', params: { user: this.$route.params.id } })
          this.$toast.success('Success! Order is Nominated!')
        })
    }
  }
}
</script>

<style scoped>

</style>