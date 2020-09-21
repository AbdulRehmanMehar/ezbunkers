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
        components: { Navbar, Footer },

        computed: {
            currentUser() {
                return this.$store.getters['Login/account']
            }
        },

        sockets: {
            message(data) {
                if (this.currentUser && data.sender._id != this.currentUser._id) {
                    this.$toast.info(`${data.sender.companyName}: ${data.message}`)
                }
                if (!(this.$router.currentRoute.name == 'chat' && this.$router.currentRoute.params.user == data.sender._id)) {
                    this.$store.dispatch('SocketIo/addMessage', data)
                }
            }
        },
    }
</script>