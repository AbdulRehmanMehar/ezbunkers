<template>
    <div>
        <h2 class="font-weight-lighter my-4 text-center">Company Information</h2>
        <div class="form-group">
            <label for="company-name">Company Name <span class="text-danger">*</span></label>
            <input type="text" id="company-name" v-model="companyName" class="form-control" placeholder="Best Bunker">
        </div>

        <div class="form-group">
            <label for="company-address">Company Address <span class="text-danger" title="This field is required">*</span></label>
            <textarea id="company-address" class="form-control" rows="3" placeholder="North Americas" v-model="companyAddress"></textarea>
        </div>

        <div class="form-group">
            <label for="company-work-title">Work Title <span class="text-danger" title="This field is required">*</span></label>
            <input type="text" id="company-work-title" v-model="workTitle" class="form-control" placeholder="CEO">
        </div>

        <div class="form-group">
            <label for="customFile">Proof of Ownership <span class="text-danger" title="This field is required">*</span></label>
            <div class="custom-file form-control">
                <input type="file" class="custom-file-input" ref="proofOfOwnership" id="customFile" @change="handleUploadForOwnership">
                <label class="custom-file-label" for="customFile">You may choose multiple</label>
            </div>
        </div>

        <div class="form-group">
            <label for="customFile1">Proof of Registry <span class="text-danger" title="This field is required">*</span></label>
            <div class="custom-file form-control">
                <input type="file" class="custom-file-input" ref="proofOfRegistry" id="customFile1" @change="handleUploadForRegistry">
                <label class="custom-file-label" for="customFile">You may choose multiple</label>
            </div>
        </div>

        <div class="form-group">
            <label for="account_type">Service Type <span class="text-danger" title="This field is required">*</span></label>
            <select class="form-control" id="account_type" v-model="accountType">
                <option value="bunkering">Bunkering</option>
                <option value="shipping">Shipping</option>
            </select>
        </div>

        <div class="form-group">
            <button class="btn btn-primary form-control">Next</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CompanyInformation",

        data() {
            return {
                companyName: null,
                companyAddress: null,
                proofOfOwnership: null,
                proofOfRegistry: null,
                workTitle: null,
                accountType: null
            }
        },
        methods: {
            handleUploadForOwnership() {
                this.proofOfOwnership = this.$refs.proofOfOwnership.files
            },

            handleUploadForRegistry() {
                this.proofOfRegistry = this.$refs.proofOfRegistry.files
            }
        }
    }
</script>

<style scoped>

</style>