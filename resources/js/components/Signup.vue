<template>
    <div>
        <div class="container my-5">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="card">
                        <div class="card-header">Sign Up</div>
                        <div class="card-body">
                            <ContactInformation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Signup',

        components: {
            Success: () => import('@/components/partials/signup/Success.vue'),
            PersonalInformation: () => import('@/components/partials/signup/PersonalInformation.vue'),
            ContactInformation: () => import('@/components/partials/signup/ContactInformation.vue'),
            CompanyInformation: () => import('@/components/partials/signup/CompanyInformation.vue'),
        }
    }
</script>