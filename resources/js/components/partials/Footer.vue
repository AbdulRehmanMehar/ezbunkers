<template>
    <footer class="mt-5 py-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p>
                        <font-awesome-icon class="font-weight-lighter" :icon="['fas', 'phone']"></font-awesome-icon>
                        &nbsp; &nbsp;
                        [88] 657 524 332
                    </p>
                </div>

                <div class="col-md-3">
                    <h4 class="font-weight-bolder my-3">Links</h4>
                    <ul class="nav flex-column">
                        <li class="nav-item my-2">
                            <router-link :to="{name: 'signup'}" class="text-dark">Sign Up</router-link>
                        </li>
                        <li class="nav-item my-2">
                            <router-link :to="{name: 'login'}" class="text-dark">Log In</router-link>
                        </li>
                    </ul>
                </div>

                <div class="col-md-3">
                    <h4 class="font-weight-bolder my-3">Company</h4>
                    <ul class="nav flex-column">
                        <li class="nav-item my-2">
                            <router-link :to="{name: 'how-it-works'}" class="text-dark">How it Works?</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

</style>