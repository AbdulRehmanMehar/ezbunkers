<template>
    <div>
        <div class="jumbotron-fluid mb-5 w-100 bg-light py-4">
            <div class="container-fluid">
                <Searchbar />
            </div>
        </div>

        <div class="container my-5">

            <div class="row justify-content-center">
                <div class="col-md-7">
                    <p class="text-uppercase">We found <b>5</b> results for singapore, 1, MDO</p>
                    <hr>
                </div>
            </div>

            <div class="row justify-content-center my-4">
                <div class="col-md-3">
                    <div class="bg-image" :style="{'background-image': `url(/images/Shipping_LogisticsV2.jpg)`}">
                        <div class="badge bg-primary text-light p-2">
                            Verified
                        </div>

                        <div class="badge bg-primary text-light p-3 text-uppercase">
                            Sentake
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <h4 class="font-weight-normal mb-0">Sentek Marine</h4>
                    <h6 class="font-weight-lighter text-14">Singapore</h6>

                    <p class="text-grey text-12 mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid deleniti dolor dolorum expedita possimus quod ut. A blanditiis eligendi est fugiat iste molestiae, non odio, odit omnis quam veritatis voluptatum!</p>

                    <p class="text-primary">
                        MDO &nbsp; IFO &nbsp; MFO
                    </p>
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
                let companies = this.$store.getters['Account/search_approved_accounts']('a', 'pakistan')
                console.log(companies)
                return companies
            }
        }
    }
</script>

<style scoped>
    .bg-image {
        width: 100%;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
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