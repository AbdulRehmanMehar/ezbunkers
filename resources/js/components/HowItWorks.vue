<template>
    <div>
        <div class="container">

            <div class="row my-5">
                <div class="col-md-12 text-center">
                    <h1 class="display-4">How It Works?</h1>
                </div>
            </div>

            <div class="row py-5 my-5">
                <div class="col-md-8">
                    <h6 class="text-grey">Step 1</h6>
                    <h2 class="font-weight-lighter">Discover</h2>
                    <p class="text-grey">Explore &amp; Search for Bunker Companies worldwide using our Search Engine powered by AI. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores consequuntur, delectus distinctio earum eligendi error facilis laudantium maiores modi non omnis porro provident quisquam reiciendis similique tempore voluptate voluptatibus!</p>
                </div>
                <div class="col-md-4 text-center">
                  <div class="bg-image" :style="{'background-image': `url('/images/works-big-1.75647e2b.png')`, 'margin': '0 auto'}"></div>
                </div>
            </div>

            <div class="row py-5 my-5">
                <div class="col-md-4 text-center">
                  <div class="bg-image" :style="{'background-image': `url('/images/works-big-2.12957138.png')`, 'margin': '0 auto'}"></div>
                </div>
                <div class="col-md-8">
                    <h6 class="text-grey">Step 2</h6>
                    <h2 class="font-weight-lighter">Engage</h2>
                    <p class="text-grey">Explore &amp; Search for Bunker Companies worldwide using our Search Engine powered by AI. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores consequuntur, delectus distinctio earum eligendi error facilis laudantium maiores modi non omnis porro provident quisquam reiciendis similique tempore voluptate voluptatibus!</p>
                </div>
            </div>

            <div class="row py-5 my-5">
                <div class="col-md-8">
                    <h6 class="text-grey">Step 3</h6>
                    <h2 class="font-weight-lighter">Review</h2>
                    <p class="text-grey">Explore &amp; Search for Bunker Companies worldwide using our Search Engine powered by AI. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores consequuntur, delectus distinctio earum eligendi error facilis laudantium maiores modi non omnis porro provident quisquam reiciendis similique tempore voluptate voluptatibus!</p>
                </div>
                <div class="col-md-4 text-center">
                  <div class="bg-image" :style="{'background-image': `url('/images/works-big-3.570df745.png')`, 'margin': '0 auto'}"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "HowItWorks"
    }
</script>

<style scoped>
    .icon {
        font-size: 100px;
    }

    .row.py-5 {
        border-bottom: 1px solid #cccccc;
    }

    .bg-image {
      width: 219px;
      position: relative;
      background-size: cover;
      height: 219px;
      background-repeat: no-repeat;
      background-position: center center;
      position: relative;
      border-radius: 4px;
    }

</style>