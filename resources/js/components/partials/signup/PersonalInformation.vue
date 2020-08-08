<template>
    <div>
        <h2 class="font-weight-lighter my-4 text-center">Personal Information</h2>
        <div class="form-group">
            <label for="name">Name <span class="text-danger" title="This field is required">*</span></label>
            <input type="text" id="name" v-model="name" class="form-control" placeholder="Jone Doe">
        </div>

        <div class="form-group">
            <label for="email">Email <span class="text-danger" title="This field is required">*</span></label>
            <input type="email" id="email" v-model="email" class="form-control" placeholder="jone@doe.io">
        </div>


        <div class="form-group">
            <button class="btn btn-primary form-control">Next</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonalInformation",

        data() {
            return {
                name: null,
                email: null,
            }
        }
    }
</script>

<style scoped>

</style>