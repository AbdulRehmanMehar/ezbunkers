<template>
    <div style="max-width: fit-content; overflow-x: hidden;">
          <div class="banner" :style="{ 'background-image' : `url('/images/Shipping_LogisticsV2.jpg')` }">
            <div class="wrapper">
                <div class="container">
                    <div class="inner text-center">
                        <h1 class="display-5 text-uppercase font-weight-bold">Discover. Engage. Review.</h1>
                        <p class="text-capitalize font-weight-lighter">Connects you to the best Bunker Companies Worldwide</p>
                        <Searchbar />
                    </div>
                </div>
            </div>
        </div>

        <!--   Bunkering Services     -->
        <div class="services container my-5 py-5">
            <div class="text-center pt-5">
                <h2 class="font-weight-lighter text-capitalize">Looking for Bunkering Services?</h2>
                <p class="text-capitalize">Connect with top Bunker Companies</p>
                <hr>
            </div>
            <!--    Blocks        -->
            <div class="row">
                <div class="col-md-4 my-2 text-center">
                    <div class="col-inner py-5">
                        <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'thumbs-up']"></font-awesome-icon>
                        <p class="font-weight-lighter mt-4">Top Ratings</p>
                    </div>
                </div>

                <div class="col-md-4 my-2 text-center">
                    <div class="col-inner py-5">
                        <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'check-circle']"></font-awesome-icon>
                        <p class="font-weight-lighter mt-4">Most Reviewed</p>
                    </div>
                </div>

                <div class="col-md-4 my-2 text-center">
                    <div class="col-inner py-5">
                        <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'forward']"></font-awesome-icon>
                        <p class="font-weight-lighter mt-4">Fast Services</p>
                    </div>
                </div>
            </div>
        </div>

        <!--    Registration    -->
        <div class="registration" :style="{'background-image': `url('/images/Bunkering_Hose.jpg')`}">
            <div class="wrapper">
                <div class="container">
                    <div class="inner">
                        <hr style="background-color: #ffffff">

                        <div class="row mt-2">
                            <div class="col-md-3 col-sm-6 text-center">
                                <div class="circle">
                                    <div class="content">125</div>
                                </div>
                                <p class="font-weight-lighter mt-4">Bunker Companies</p>
                            </div>

                            <div class="col-md-3 col-sm-6 text-center">
                                <div class="circle">
                                    <div class="content">4</div>
                                </div>
                                <p class="font-weight-lighter mt-4">Countries</p>
                            </div>

                            <div class="col-md-3 col-sm-6 text-center">
                                <div class="circle">
                                    <div class="content">345</div>
                                </div>
                                <p class="font-weight-lighter mt-4">Transactions</p>
                            </div>

                            <div class="col-md-3 col-sm-6 text-center">
                                <div class="circle">
                                    <div class="content">100</div>
                                </div>
                                <p class="font-weight-lighter mt-4">Transparency</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 mt-5 text-center">
                                <router-link :to="{name: 'signup'}" class="btn btn-outline-light btn-lg">Sign Up</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--   Working     -->
        <div class="working container my-5 py-5">
            <div class="text-center pt-5">
                <h2 class="font-weight-lighter text-capitalize">How it works?</h2>
                <hr>
                <div class="row">
                    <div class="col-md-4 my-2 text-center">
                        <div class="col-inner py-5">
                            <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'search']"></font-awesome-icon>
                            <h5 class="font-weight-lighter my-4 text-primary font-weight-bold">Discover</h5>
                            <p>Explore &amp; Search for Bunker Companies worldwide using our Search Engine powered by AI</p>
                        </div>
                    </div>

                    <div class="col-md-4 my-2 text-center">
                        <div class="col-inner py-5">
                            <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'sms']"></font-awesome-icon>
                            <h5 class="font-weight-lighter my-4 text-primary font-weight-bold">Engage</h5>
                            <p>Nominate the Bunker Company of your choice and receive a confirmation on the bunker delivery.</p>
                        </div>
                    </div>

                    <div class="col-md-4 my-2 text-center">
                        <div class="col-inner py-5">
                            <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'globe-americas']"></font-awesome-icon>
                            <h5 class="font-weight-lighter my-4 text-primary font-weight-bold">Review</h5>
                            <p>Once your Bunker Transaction has been completed, simply rate the service &amp; receive 0.5% rebate.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Searchbar from "@/components/partials/Searchbar"

    export default{
        name: 'Home',
        components: { Searchbar },
    }
</script>

<style scoped>
    /* 1st Block */
    .banner, .registration {
        width: 100vw;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        height: var(--height-after-navbar);
        background-position: center center;
        background-color: #ffffff;
    }
    .banner .wrapper, .registration .wrapper {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        color: #ffffff;
        background-color: rgba(0,0,0,0.4);
    }
    .banner .container .inner{
       margin-top: calc(var(--height-after-navbar) / 2.5);
    }


    /*Block 2*/

    .services .col-md-4 .col-inner, .working .col-md-4 .col-inner{
        width: calc(100% - 10px);
        margin: 0 auto;
        border: 1px solid #ccc;
    }

    .services .col-md-4 .icon, .working .col-md-4 .icon{
        font-size: 48px;
    }


    /* Block 3 */
    .registration {
        height: 70vh;
    }

    .registration .container .inner{
        margin-top: calc(70vh / 4);
    }

    .registration .col-md-3 .circle{
        height: 120px;
        width: 120px;
        text-align: center;
        margin: 0 auto;
        border: 4px solid #ccc;
        border-radius: 50%;
    }
    .registration .col-md-3 .circle .content {
        display: inline-block;
        margin-top: calc(60px - 20px);
        font-size: 28px;
        font-weight: bold;
    }

    /*  Block 4  */
    .working .col-md-4 .col-inner p {
        font-size: 12px;
        font-weight: lighter;
        color: #999;
        width: calc(100% - 40px);
        margin: 0 auto;
        text-align: center;
    }

    @media screen and (max-width: 600px) {
      .banner .container .inner{
        margin-top: calc(var(--height-after-navbar) / 10);
      }
      .registration .container .inner {
        margin-top: 1rem !important;
      }

      .registration .container .col-md-3.col-sm-6 {
        max-width: 50% !important;
      }

      .registration .col-md-3 .circle {
        height: 60px;
        width: 60px;
        border: 2px solid #ccc;
      }
      .registration .col-md-3 .circle .content {
        font-size: 18px;
        margin-top: calc(30px - 15px);
      }

      .registration .container .col-md-3.col-sm-6 p.font-weight-lighter.mt-4 {
        margin-top: .5rem !important;
      }
    }

</style>