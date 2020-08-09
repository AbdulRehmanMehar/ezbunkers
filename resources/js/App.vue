<template>
    <div>
        <Navbar />
        <div class="router-view">
            <router-view class="mb-5"></router-view>
        </div>
        <Footer />
    </div>
</template>

<script>
    import Navbar from '@/components/partials/Navbar.vue'
    import Footer from "@/components/partials/Footer.vue"

    export default{
        name: 'App',
        components: { Navbar, Footer }
    }
</script>