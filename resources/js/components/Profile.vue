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
          <div class="container p-2">
            <div class="row">
              <div class="col-md-7 col-sm-12">
                <div class="d-flex">
                  <div class="bg-image" :style="{'background-image': `url('${company.companyImages.filter(img => img.type == 'logo')[0].path.slice(3, company.companyImages.filter(img => img.type == 'logo')[0].path.length)}')`, 'height': '65px !important', 'width': '65px !important'}"></div>

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
h2
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

  created() {
    this.$store.dispatch('Account/fetch_accounts')
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
    }
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