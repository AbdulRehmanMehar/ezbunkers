<template>
  <div>

    <div class="card my-5">
      <div class="card-body py-4">
        <h1>Accounts</h1>
        <p>Activate or Deactivate accounts</p>
        <router-link style="float: right" :to="{ name: 'admin-dashboard-accounts' }" class="btn btn-info">Go</router-link>
      </div>
    </div>

    <div class="card my-5">
      <div class="card-body py-4">
        <h1>Fuel</h1>
        <p>Add fuel types</p>
        <router-link style="float: right" :to="{ name: 'admin-dashboard-fuel' }" class="btn btn-info">Go</router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DashboardIndex"
}
</script>

<style scoped>

</style>