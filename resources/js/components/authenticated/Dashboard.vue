<template>
  <div>
    <div class="container-fluid my-5">
      <div class="row">

        <div class="col-md-2 col-sm-12 my-2">
          <div style="height: calc(var(--height-after-navbar) - 5rem); overflow-x: hidden; overflow-y: auto">
            <div class="nav flex-column nav-pills" aria-orientation="vertical">
            <router-link class="nav-link head" :to="{ name: 'home' }">Profile</router-link>
            <router-link class="nav-link" :to="{ name: 'company-images', params: { type: 'all' } }" title="Add or Remove Company Images">Company Images</router-link>
              <router-link class="nav-link" :to="{ name: 'company-documents', params: { type: 'all' } }" title="Add or Remove Company Documents">Company Documents</router-link>
              <router-link class="nav-link" :to="{ name: 'user-dashboard-set-password', params: { type: 'all' } }">Update Password</router-link>

            <router-link class="nav-link head" :to="{ name: 'home' }">Vessels</router-link>
            <router-link :to="{ name: 'user-create-vessels' }" class="nav-link">Add Vessel</router-link>
            <router-link :to="{ name: 'user-vessels-list' }" class="nav-link">My Vessels</router-link>

            <router-link class="nav-link head" :to="{ name: 'home' }" title="Orders you received!">Orders</router-link>
            <router-link :to="{ name: 'orders-list' }" class="nav-link">My Orders</router-link>

            <router-link class="nav-link head" :to="{ name: 'home' }" title="Nomination (Orders) you made!">Nominations</router-link>
            <router-link :to="{ name: 'nominations-list' }" class="nav-link">My Nominations</router-link>

            <router-link class="nav-link head" :to="{ name: 'home' }" title="Reviews you got!">Reviews</router-link>
            <router-link :to="{ name: 'reviews', params: { type: 'forme' } }" class="nav-link">Reviews, I got</router-link>
            <router-link :to="{ name: 'reviews', params: { type: 'byme' } }" class="nav-link">Reviews, I left</router-link>
          </div>
          </div>
        </div>

        <div class="col-md-10 col-sm-12 my-2">
          <div style="height: calc(var(--height-after-navbar) - 5rem); overflow-x: hidden; overflow-y: auto">
              <router-view></router-view>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Dashboard",

  computed: {
    currentUser() {
      return this.$store.getters['Login/account']
    }
  }
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

.nav-link.router-link-exact-active, .nav-link:hover{
  color: #007bff !important;
  border-left: 2px solid #007bff;
  transition: all 320ms;
}
.nav-link.head {
  cursor: initial;
  pointer-events: none;
  background-color: #335c67 !important;
  color: #f1f1f1 !important;
  border-left: 2px solid #f1f1f1;
}



/* total width */
*::-webkit-scrollbar {
  background-color:#fff;
  width:16px
}

/* background of the scrollbar except button or resizer */
*::-webkit-scrollbar-track {
  background-color:#fff
}
*::-webkit-scrollbar-track:hover {
  background-color:#f4f4f4
}

/* scrollbar itself */
*::-webkit-scrollbar-thumb {
  background-color:#babac0;
  border-radius:16px;
  border:5px solid #fff
}
*::-webkit-scrollbar-thumb:hover {
  background-color:#a0a0a5;
  border:4px solid #f4f4f4
}

/* set button(top and bottom of the scrollbar) */
*::-webkit-scrollbar-button {display:none}


</style>