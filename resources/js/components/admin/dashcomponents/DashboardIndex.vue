<template>
  <div>

    <div class="card my-5">
      <div class="card-body py-4">
        <h1>Accounts</h1>
        <p>Activate or Deactivate accounts</p>
        <div style="float: right">
          <router-link :to="{ name: 'admin-dashboard-accounts' }" class="btn btn-info my-1">See Accounts Needing Approval</router-link>
          <router-link :to="{ name: 'admin-dashboard-accounts', params: { type: 'all' } }" class="btn btn-success my-1">See All Accounts</router-link>
        </div>
      </div>
    </div>

    <div class="card my-5">
      <div class="card-body py-4">
        <h1>Fuel</h1>
        <p>Add fuel types</p>
        <div style="float: right">
          <router-link :to="{ name: 'admin-create-fuel' }" class="btn btn-info">Add Fuel</router-link>
          <router-link :to="{ name: 'admin-fuel-list' }" class="btn btn-success">See Fuels List</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DashboardIndex",
}
</script>

<style scoped>

</style>