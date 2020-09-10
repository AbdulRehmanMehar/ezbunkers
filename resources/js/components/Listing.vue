<template>
    <div>

        <Searchbar class="my-5" />


        <div class="container my-5">

            <div class="row justify-content-lg-center">
                <div class="col-lg-7 col-md-12">
                  <p class="text-uppercase">We found <b>{{ locationLength }}</b> result(s) for {{ $route.params.location }}, <b>{{ fuelGradeLength }}</b>, {{ $route.params.fuel }}</p>
                    <hr>
                </div>
<!--                <div class="col-lg-5 com-md-12"></div>-->
            </div>

            <div class="row justify-content-lg-center my-4" v-for="company of companies" :key="company._id">
                <div class="col-lg-3 col-md-5 col-sm-12">
                    <carousel :per-page="1" :mouse-drag="true" :autoplay="true" :loop="true" :paginationEnabled="false">
                        <slide v-for="image of company.companyImages.filter(img => img.type == 'banner')" :key="image._id">
                            <div class="bg-image" :style="{'background-image': `url('${image.path.slice(3, image.path.length)}')`}">
                                <div class="badge bg-primary text-light p-2">
                                      Verified
                                </div>

                                <div class="p-3">
                                    <div class="bg-image"
                                         :style="{
                                              'background-image': `url('${company.companyImages.filter(img => img.type == 'logo')[0].path.slice(3, company.companyImages.filter(img => img.type == 'logo')[0].path.length)}')`,
                                              'height': '40px !important',
                                              'width': '40px !important',
                                              'border-radius': '.3rem',
                                              'position': 'absolute',
                                              'top': '.3rem',
                                              'right': '.3rem'}"></div>
                                </div>
                            </div>
                        </slide>
                    </carousel>
                </div>
                <div class="col-lg-4 col-md-7 col-sm-12">
                    <div class="mt-4 mt-md-0 mt-lg-0">
                        <h4 class="font-weight-normal mb-2">
                          <router-link class="text-dark text-decoration-none" :to="{name: 'profile', params: { id: company._id }}">{{ company.companyName }}</router-link>
                        </h4>
                        <h6 class="font-weight-lighter text-14">{{ company.country }}</h6>

                        <p class="text-grey text-12 mt-3">{{ company.companyDescription.slice(0, 220) }}...</p>

                        <p class="text-primary">
                            <router-link :to="{ name: 'nominate-order', params: { id: company._id, vesselId: vessel._id } }" class="d-inline-block mr-4" v-for="vessel of company.vessels" :key="vessel._id">
                                {{ vessel.name }}
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import Searchbar from "@/components/partials/Searchbar"

    export default {
        name: "Listing",
        components: { Searchbar },

        created() {
            this.$store.dispatch('Account/fetch_accounts')
        },

        computed: {

            companies() {
                const { fuel, location } = this.$route.params
                if (fuel && location) {
                    let companies = this.$store.getters['Account/search_approved_accounts'](fuel, location)
                    console.log(companies)
                    return companies
                }

                return []
            },

            fuelGradeLength() {
              if (this.companies) {
                let counter = 0
                const { fuel } = this.$route.params
                this.companies.forEach(account => {
                  account.vessels.filter(
                      vessel => vessel.name.toLowerCase() == fuel.toLowerCase() ||
                          (
                              vessel.fuel &&
                              vessel.fuel.findIndex(
                                  f => f.name.toLowerCase() == fuel.toLowerCase()) != -1)
                  ).length > 0 ? counter++ : ''
                })
                return counter
              }
              return 0
            },

            locationLength() {
                if (this.companies) {
                    let counter = 0
                    const { location } = this.$route.params
                    this.companies.forEach(account => {
                        (
                            account.country &&
                            account.country.toLowerCase() == location.toLowerCase()
                        ) ? counter++ : ''
                    })

                    return counter
                }
                return 0
            }
        }
    }
</script>

<style scoped>
    .bg-image {
        width: 100%;
        position: relative;
        background-size: cover;
        height: 180px !important;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: #ffffff;
        position: relative;
    }

    .col-md-3 .bg-image .badge {
        position: absolute;
    }

    .col-md-3 .bg-image .badge:first-child {
        top: 10px;
        left: 10px;
    }

    .col-md-3 .bg-image .badge:last-child {
        top: 0;
        right: 0;
    }
</style>