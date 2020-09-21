<template>
  <div>
    <h1 class="my-2">Fuels</h1>
    <vue-good-table :columns="columns" :rows="fuelRows" :pagination-options="{
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
          <a class="btn btn-sm primary" @click.prevent="deleteFuel(props.formattedRow[props.column.field])">Delete Fuel</a>
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
  name: "FuelList",

  created() {
    this.$store.dispatch('Fuel/fetch_fuels')
  },

  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Description',
          field: 'description'
        },
        {
          label: 'Actions',
          field: '_id'
        },
      ]
    }
  },

  computed: {
    fuelRows() {
      let fuels = this.$store.getters['Fuel/fuels']
      console.log(fuels)
      return fuels || fuels
    }
  },

  methods: {
    deleteFuel(id) {
      this.$store.dispatch('Fuel/delete_fuel', id)
      this.$toast.success('Success! Fuel is deleted.')
    }
  }
}
</script>

<style scoped>

</style>