<template>
    <div style="max-width: fit-content; overflow-x: hidden;">
        <div class="banner" :style="{ 'background-image' : `url(${banner})` }">
            <div class="wrapper">
                <div class="container">
                    <div class="inner text-center">
                        <h1 class="display-5 text-uppercase font-weight-bold">Discover. Engage. Review.</h1>
                        <p class="text-capitalize font-weight-lighter">Connects you to the best Bunker Companies Worldwide</p>
                        <form class="form-inline mt-5 justify-content-center" role="form">
                            <div class="form-group mb-2">
                                <label for="location" class="label-before">Near</label>
                                <input id="location" type="text" class="form-control form-control-lg" placeholder="Location">
                            </div>
                            <div class="form-group mx-sm-3 mb-2">
                                <label for="fuelgrade" class="label-before">Find</label>
                                <input type="text" class="form-control form-control-lg" id="fuelgrade" placeholder="Grade of Fuel">
                            </div>
                            <button type="submit" class="form-control w-auto form-control-lg btn btn-primary btn-lg mb-2">Search</button>
                        </form>
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
                <div class="col-md-4 text-center">
                    <div class="col-inner py-5">
                        <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'thumbs-up']"></font-awesome-icon>
                        <p class="font-weight-lighter mt-4">Top Ratings</p>
                    </div>
                </div>

                <div class="col-md-4 text-center">
                    <div class="col-inner py-5">
                        <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'check-circle']"></font-awesome-icon>
                        <p class="font-weight-lighter mt-4">Most Reviewed</p>
                    </div>
                </div>

                <div class="col-md-4 text-center">
                    <div class="col-inner py-5">
                        <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'forward']"></font-awesome-icon>
                        <p class="font-weight-lighter mt-4">Fast Services</p>
                    </div>
                </div>
            </div>
        </div>

        <!--    Registration    -->
        <div class="registration" :style="{'background-image': `url(${banner2})`}">
            <div class="wrapper">
                <div class="container">
                    <div class="inner">
                        <hr style="background-color: #ffffff">

                        <div class="row mt-2">
                            <div class="col-md-3 text-center">
                                <div class="circle">
                                    <div class="content">125</div>
                                </div>
                                <p class="font-weight-lighter mt-4">Bunker Companies</p>
                            </div>

                            <div class="col-md-3 text-center">
                                <div class="circle">
                                    <div class="content">4</div>
                                </div>
                                <p class="font-weight-lighter mt-4">Countries</p>
                            </div>

                            <div class="col-md-3 text-center">
                                <div class="circle">
                                    <div class="content">345</div>
                                </div>
                                <p class="font-weight-lighter mt-4">Transactions</p>
                            </div>

                            <div class="col-md-3 text-center">
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
                    <div class="col-md-4 text-center">
                        <div class="col-inner py-5">
                            <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'search']"></font-awesome-icon>
                            <h5 class="font-weight-lighter my-4 text-primary font-weight-bold">Discover</h5>
                            <p>Explore &amp; Search for Bunker Companies worldwide using our Search Engine powered by AI</p>
                        </div>
                    </div>

                    <div class="col-md-4 text-center">
                        <div class="col-inner py-5">
                            <font-awesome-icon class="font-weight-lighter icon" :icon="['fas', 'sms']"></font-awesome-icon>
                            <h5 class="font-weight-lighter my-4 text-primary font-weight-bold">Engage</h5>
                            <p>Nominate the Bunker Company of your choice and receive a confirmation on the bunker delivery.</p>
                        </div>
                    </div>

                    <div class="col-md-4 text-center">
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

    export default{
        name: 'Home',
        data() {
            return {
                banner: require('@/images/Shipping_LogisticsV2.jpg'),
                banner2: require('@/images/Bunkering_Hose.jpg')
            }
        }
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
    .form-inline  .label-before {
        height: calc(1.5em + 1rem + 2px);
        padding: 0.5rem 1rem;
        background: #ffffff;
        color: #495057;
        font-size: 1.25rem;
        line-height: 1.5;
        border-top-left-radius: .3rem;
        border-bottom-left-radius: .3rem;
        margin-right: -1px;
    }
    .form-inline .form-control:not(button) {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border: none !important;
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

</style>