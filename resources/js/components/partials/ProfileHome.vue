<template>
  <div>
    <div class="container bg-white">
      <div class="p-4">
        <h3 class="font-weight-bold mb-4">About the Company</h3>
        <p>{{ company.companyDescription }}</p>

        <h3 class="font-weight-bold my-4">Contact Information</h3>
        <p>Email: <a :href="`mailto:${company.email}`" target="_blank">{{company.email}}</a></p>
        <p>Phone: <a :href="`tel:${company.phone}`" target="_blank">{{company.phone}}</a></p>
        <p>IMO: <a :href="`tel:${company.imo}`" target="_blank">{{company.imo}}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileHome",

  computed: {
    company() {
      const { id } = this.$route.params
      if (id) {
        return this.$store.getters['Account/getAccountById'](id)
      }
      return null
    },
  }

}
</script>

<style scoped>
  h3::after {
    content: '';
    height: 2px;
    width: 50px;
    display: block;
    margin-top: .5rem;
    background-color: #007bff;
  }
</style>