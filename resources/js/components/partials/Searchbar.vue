<template>
    <div>

        <form class="form-inline mt-5 justify-content-center" @submit.prevent="listBunkers" role="form">
            <div class="form-group mb-2">
                <label for="location" class="label-before">Near</label>
                <input id="location" type="text" class="form-control form-control-lg" placeholder="Location">
            </div>
            <div class="form-group mx-sm-3 mb-2">
                <label for="fuelgrade" class="label-before">Find</label>
                <input type="text" class="form-control form-control-lg" id="fuelgrade" placeholder="Grade of Fuel">
            </div>
            <button type="submit" class="form-control w-auto form-control-lg btn btn-primary w-100 btn-lg mb-2">
                <font-awesome-icon class="font-weight-lighter" :icon="['fas', 'search']"></font-awesome-icon>
                Search
            </button>
        </form>

    </div>
</template>

<script>
    export default {
        name: "Searchbar",

        methods: {
            listBunkers() {
                console.log('API CALL')
                this.$router.push({name: 'listing'})
            }
        }
    }
</script>

<style lang="css" scoped>
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

    @media screen and (max-width: 600px) {
      .form-inline.mt-5.my-5 {
        margin: 1rem 0 !important;
      }
      .form-inline  .label-before {
        margin-right: -5px;
        display: none;
      }
      .form-inline .form-control:not(button) {
        border-top-left-radius: .3rem !important;
        border-bottom-left-radius: .3rem !important;
        display: inline-block;
      }
      .form-inline button.form-control {
        width: 70% !important;
      }
    }

    @media screen and (max-width: 320px) {
      .form-inline button.form-control {
        width: 95% !important;
      }
    }
</style>