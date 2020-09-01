<template>
  <div>
    <h1 class="my-2">Vessels</h1>
    <vue-good-table :columns="columns" :rows="vesselRows" :pagination-options="{
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
    }"
                    :search-options="{
      enabled: true,
      trigger: 'enter',
    }">

      <template slot="table-row" slot-scope="props">

        <span v-if="props.column.field == '_id'">
          <a class="btn btn-sm primary" @click.prevent="deleteVessel(props.formattedRow[props.column.field])">Delete</a>
          <router-link :to="{ name: 'vessel', params: { id:  props.formattedRow[props.column.field]} }">View</router-link>
        </span>

        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>

    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: "VesselList",
  created() {
    this.$store.dispatch('Vessels/fetch_my_vessels')
  },

  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Actions',
          field: '_id'
        },
      ]
    }
  },

  computed: {
    vesselRows() {
      let vessels = this.$store.getters['Vessels/vessels']
      return vessels
    }
  },

  methods: {
    deleteVessel(id) {
      this.$store.dispatch('Vessels/delete_vessel', id)
        .then(() => {
          this.$toast.success('Success! Vessel is deleted.')
        })

    }
  }
}
</script>

<style scoped>

</style>