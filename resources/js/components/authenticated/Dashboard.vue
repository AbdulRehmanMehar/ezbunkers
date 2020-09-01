<template>
  <div>

    <div class="card my-5">
      <div class="card-body py-4">
        <h1>Profile</h1>
        <p>See or Edit your Profile</p>
        <div style="float: right">
          <router-link :to="{ name: 'user-update-profile' }" class="btn btn-info my-1">Update Profile</router-link>
<!--          <router-link :to="{ name: 'admin-dashboard-accounts', params: { type: 'all' } }" class="btn btn-success my-1">See All Accounts</router-link>-->
        </div>
      </div>
    </div>

    <div class="card my-5">
      <div class="card-body py-4">
        <h1>Vessels</h1>
        <p>Add or remove Vessels</p>
        <div style="float: right">
          <router-link :to="{ name: 'user-create-vessels' }" class="btn btn-info">Add Vessels</router-link>
          <router-link :to="{ name: 'user-vessels-list' }" class="btn btn-success">See Vessels List</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Dashboard"
}
</script>

<style scoped>

</style>