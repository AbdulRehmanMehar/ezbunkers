<template>
  <div>
    <div v-if="!loading" class="container">
      <div class=" p-4">
        <h3 class="mb-4">Leave the Review</h3>
        <form @submit.prevent="submit">

          <div class="form-group">
            <label for="comName">Company Name</label>
            <input type="text" id="comName" readonly class="form-control" :value="company ? company.companyName : ''" />
          </div>

          <div class="form-row">
            <div class="form-group col-md-4 col-sm-12">
              <label for="quality">Quality of Service</label>
              <select id="quality" class="form-control" v-model="quality" required>
                <option v-for="i in 5">{{ i }}</option>
              </select>
            </div>

            <div class="form-group col-md-4 col-sm-12">
              <label for="price">Price</label>
              <select id="price" class="form-control" v-model="price" required>
                <option v-for="i in 5">{{ i }}</option>
              </select>
            </div>

            <div class="form-group col-md-4 col-sm-12">
              <label for="communication">Communication</label>
              <select id="communication" class="form-control" v-model="communication" required>
                <option v-for="i in 5">{{ i }}</option>
              </select>
            </div>
          </div>


          <div class="form-group">
            <label for="review">Review</label>
            <textarea required id="review" v-model="review" rows="5" class="form-control" placeholder="Share your thoughts!"></textarea>

          </div>
          <button type="submit" class="btn btn-dark form-control">Submit</button>
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
  name: "ReviewForm",
  components: { Loading },

  data() {
    return {
      quality: null,
      price: null,
      communication: null,
      review: null
    }
  },

  beforeCreate() {
    this.$store.dispatch('Account/fetch_accounts')
  },

  computed: {
    loading() {
      return this.$store.getters['Review/loading']
    },

    errors() {
      return this.$store.getters['Review/errors']
    },

    success() {
      return this.$store.getters['Review/success']
    },

    company() {
      let { company } = this.$route.params
      if (company) {
        return this.$store.getters['Account/getAccountById'](company)
      }
      return null
    }
  },

  methods: {
    submit() {
      let { order } = this.$route.params
      if (this.company && order) {
        let data = {
          quality: this.quality,
          price: this.price,
          communication: this.communication,
          review: this.review,
          reviewee: this.company._id,
          nomination: order
        }

        this.$store.dispatch('Review/leave', data)
          .then(_ => {
            this.$toast.success('Success! your review is sent!')
            this.$router.push({ name: 'nominations-list' })
          }).catch(_ => {
          this.$toast.error('Sorry, Something went wrong!')
        })

      }
    }
  }

}
</script>

<style scoped>

</style>