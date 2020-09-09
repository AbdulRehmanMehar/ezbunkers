<template>
  <div>
    <div class="nav flex-column nav-pills" aria-orientation="vertical">
      <router-link class="nav-link" :to="{ name: 'profile', params: {id: $route.params.id} }">Home</router-link>
      <router-link class="nav-link" :to="{ name: 'vessels', params: {id: $route.params.id} }">Vessels</router-link>
      <router-link class="nav-link" :to="{ name: 'profile', params: {id: 'avd'} }">Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>
.nav-link{
  color: #999999 !important;
  background: #ffffff !important;
  border-bottom: 3px solid #f1f1f1;
  font-weight: normal;
  border-radius: 0px !important;
  padding: 1rem !important;
}
.nav-link.router-link-exact-active{
  color: #007bff !important;
  border-left: 2px solid #007bff;
}
</style>