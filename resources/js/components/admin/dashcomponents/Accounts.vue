<template>
  <div>

    <vue-good-table :columns="columns" :rows="accountRows" :pagination-options="{
      enabled: true,
      mode: 'records',
      perPage: 5,
      position: 'top',
      perPageDropdown: [3, 7, 9],
      dropdownAllowAll: false,
      setCurrentPage: 1,
      nextLabel: 'next',
      prevLabel: 'prev',
      rowsPerPageLabel: 'Rows per page',
      ofLabel: 'of',
      pageLabel: 'page', // for 'pages' mode
      allLabel: 'All',
    }" />

  </div>
</template>

<script>
export default {
  name: "DashboardAccounts",

  data() {
    return {
      columns: [

      ]
    }
  },


  computed: {
    accountRows() {
      return []
    }
  }

}
</script>

<style scoped>

</style>