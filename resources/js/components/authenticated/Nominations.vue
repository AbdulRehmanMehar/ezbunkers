<template>
  <div>
    <div v-if="!loading">
      <h1 class="my-2">Nominations</h1>
      <vue-good-table v-if="nominationRows" :columns="columns" :rows="nominationRows" :pagination-options="{
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

          <span v-if="props.column.field == 'vessel'">
            <span v-for="(key, idx) in props.formattedRow[props.column.field]" :key="idx" >

              <span class="d-block my-2" v-if="idx == 'name'">{{ key }}</span>
              <router-link class="d-block my-2" v-if="idx == 'owner'" :to="{name: 'vessels', params: { id: key._id }}">More Information</router-link>
            </span>
          </span>

          <span v-else-if="props.column.field == 'fuels'">
            <p v-for="(fuels, idx) of props.formattedRow[props.column.field]" :key="idx">
              Fuel: {{ fuels.fuel.name }} &nbsp;
              Quantity: {{ fuels.quantity }}
            </p> <br> <br>
          </span>

          <span v-else-if="props.column.label.trim() === 'Actions'">

            <span v-if="checkOrderIfCompleted(props.formattedRow[props.column.field]) && !checkOrderIfHasReview(props.formattedRow[props.column.field])">
              <router-link class="btn btn-info" :to="{name: 'review', params: { company: getOwnerIdOfOrderVessel(props.formattedRow[props.column.field]), order: props.formattedRow[props.column.field] }}">
                Leave a Review
              </router-link>
            </span>
            <span v-else>
              No action can be taken!
            </span>
          </span>

          <span v-else-if="props.column.field == 'status'">
            {{props.formattedRow[props.column.field].toUpperCase()}}
          </span>

          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>

        </template>

      </vue-good-table>
    </div>

    <div v-else>
      <Loading />
      <h1 class="mt-4 text-center">Loading...</h1>
    </div>

  </div>
</template>

<script>
import Loading from "@/components/partials/Loading"

export default {
  name: "NominationsList",
  components: { Loading },

  beforeCreate() {
    this.$store.dispatch('Orders/getOrders')
  },

  data() {
    return {
      columns: [
        {
          label: 'Order Id',
          field: '_id'
        },
        {
          label: 'Vessel',
          field: 'vessel',
          sortable: false
        },
        {
          label: 'Vessel Size',
          field: 'vesselSize',
          sortable: false
        },
        {
          label: 'Price (USD)',
          field: 'price',
          sortable: false
        },
        {
          label: 'Destination',
          field: 'destination'
        },
        {
          label: 'Fuels',
          field: 'fuels',
          sortable: false
        },
        {
          label: 'Ordered At',
          field: 'createdAt'
        },
        {
          label: 'Order Status',
          field: 'status'
        },
        {
          label: 'Actions',
          field: '_id',
          sortable: false
        },

      ]
    }
  },

  computed: {
    nominationRows() {
      return this.$store.getters['Orders/nominations']
    },

    currentUser() {
      return this.$store.getters['Login/account']
    },

    loading() {
      return this.$store.getters['Orders/loading']
    }

  },

  methods: {
    checkOrderIfCompleted(orderId) {
      if (this.nominationRows) {
        let order = this.nominationRows.filter(order => order._id == orderId)[0]
        return order && order.status.toLowerCase() == 'completed'
      }
      return false
    },

    checkOrderIfHasReview(orderId) {
      if (this.nominationRows) {
        let order = this.nominationRows.filter(order => order._id == orderId)[0]
        return order && order.review && order.review._id
      }
      return false
    },

    getOwnerIdOfOrderVessel(orderId) {
      if (this.nominationRows) {
        let order = this.nominationRows.filter(nomination => nomination._id == orderId)[0]
        return order ? order.vessel.owner._id : null
      }
      return null
    }
  }
}
</script>

<style scoped>

</style>