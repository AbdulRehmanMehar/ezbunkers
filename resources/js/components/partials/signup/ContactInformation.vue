<template>
    <div>
        <h2 class="font-weight-lighter my-4 text-center">Contact Information</h2>
        <div class="form-group">
            <label for="phone">Phone Number <span class="text-danger" title="This field is required">*</span></label>
            <input type="text" id="phone" v-model="phone" class="form-control" placeholder="+92 318 4488201">
        </div>

        <div class="form-group">
            <label for="imo">IMO Number <span class="text-danger" title="This field is required">*</span></label>
            <input type="text" id="imo" v-model="imo" class="form-control" placeholder="+92 318 4488201">
        </div>


        <div class="form-group">
            <button class="btn btn-primary form-control">Sign Up</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ContactInformation",

        data() {
            return {
                phone: null,
                imo: null
            }
        }
    }
</script>

<style scoped>

</style>