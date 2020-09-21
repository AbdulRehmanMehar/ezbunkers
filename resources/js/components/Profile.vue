<template>
  <div>
    <div v-if="company">
      <!--   IMAGE SHOWCASE   -->
      <div class="container my-4 border-1 border-dark">
        <carousel :per-page="1" :mouse-drag="true" :autoplay="true" :loop="true" :paginationEnabled="false">
        <slide v-for="image of company.companyImages.filter(img => img.type == 'banner')" :key="image._id">
          <div class="bg-image" :style="{'background-image': `url('${image.path.slice(3, image.path.length)}')`}">
          </div>
        </slide>
      </carousel>
        <div class="bg-white">
          <div class="container p-2 py-4">
            <div class="row">
              <div class="col-md-7 col-sm-12">
                <div class="d-flex">
                  <div class="bg-image" :style="{'background-image': `url('${company.companyImages.filter(img => img.type == 'logo')[0] ? company.companyImages.filter(img => img.type == 'logo')[0].path.slice(3, company.companyImages.filter(img => img.type == 'logo')[0].path.length) : '/images/ezbunk.0caa7f64.png'}')`, 'height': '65px !important', 'width': '65px !important'}"></div>

                  <div class="px-2">
                    <h3 class="mb-0">{{ company.companyName }}</h3>
                    <div class="d-flex" style="margin-left: -20px !important;">
                      <country-flag :country='generateFlagCode' size='normal'/>
                      <span style="float: right; margin-top: 10px !important;">{{ company.country }}</span>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-md-5 col-sm-12">
                <div style="float: left">
                  <p class="m-1">
                    <span class="d-inline-block mx-2" style="width: 150px">Overall Rating</span>
                    <star-rating class="d-inline-block ml-2" :read-only="true" :star-size="16" :show-rating="false" :rating="overallReviews"></star-rating>
                  </p>
                  <p class="m-1">
                    <span class="d-inline-block mx-2" style="width: 150px">Price</span>
                    <star-rating class="d-inline-block mx-2" :read-only="true" :star-size="16" :show-rating="false" :rating="priceReviews"></star-rating>
                  </p>
                  <p class="m-1">
                    <span class="d-inline-block mx-2" style="width: 150px">Quality</span>
                    <star-rating class="d-inline-block mx-2" :read-only="true" :star-size="16" :show-rating="false" :rating="qualityReviews"></star-rating>
                  </p>
                  <p class="m-1">
                    <span class="d-inline-block mx-2" style="width: 150px">Communication</span>
                    <star-rating class="d-inline-block mx-2" :read-only="true" :star-size="16" :show-rating="false" :rating="communicationReviews"></star-rating>
                  </p>
                </div>
                <div class="px-4 text-center">
                  <h1 class="display-3">{{ Math.floor(overallReviews) }}</h1>
                  <p class="font-weight-bold">{{ reviewsForCurrentProfile.length }} Reviews</p>
                </div>
                <div style="float: none; clear: both"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  VIEW    -->

      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-12 my-2">
            <Sidebar />
          </div>

          <div class="col-md-9 col-sm-12 my-2">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { getCode } = require('country-list')
import Sidebar from "@/components/partials/Sidebar"

export default {
  name: "Profile",

  components: { Sidebar },

  beforeCreate() {
    this.$store.dispatch('Account/fetch_accounts')
    this.$store.dispatch('Review/getReviews')
  },

  computed: {
    company() {
      const { id } = this.$route.params
      if (id) {
        return this.$store.getters['Account/getAccountById'](id)
      }
      return null
    },

    generateFlagCode() {
      if (this.company && this.company.country) {
        return getCode(this.company.country)
      }
      return 'it'
    },

    reviewsForCurrentProfile() {
      if (this.company) {
        return this.$store.getters['Review/reviewsForID'](this.company._id)
      }
      return null
    },

    overallReviews() {
      if (this.reviewsForCurrentProfile) {
        let reviews = this.reviewsForCurrentProfile.map(review => (review.quality + review.price + review.communication) / 3).reduce((a,b) => a+b, 0)
        return reviews / this.reviewsForCurrentProfile.length
      }
      return 0
    },

    priceReviews() {
      if (this.reviewsForCurrentProfile) {
        let reviews = this.reviewsForCurrentProfile.map(review => review.price).reduce((a,b) => a+b, 0)
        return reviews / this.reviewsForCurrentProfile.length
      }
      return 0
    },

    qualityReviews() {
      if (this.reviewsForCurrentProfile) {
        let reviews = this.reviewsForCurrentProfile.map(review => review.quality).reduce((a,b) => a+b, 0)
        return reviews / this.reviewsForCurrentProfile.length
      }
      return 0
    },

    communicationReviews() {
      if (this.reviewsForCurrentProfile) {
        let reviews = this.reviewsForCurrentProfile.map(review => review.communication).reduce((a,b) => a+b, 0)
        return reviews / this.reviewsForCurrentProfile.length
      }
      return 0
    },
  }
}
</script>

<style scoped>
  .bg-image {
    width: 100%;
    position: relative;
    background-size: cover;
    height: 50vh !important;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #ffffff;
    position: relative;
    border-radius: 4px;
  }
  @media screen and (max-width: 600px) {
    .bg-image {
      height: 30vh !important;
    }
  }
</style>