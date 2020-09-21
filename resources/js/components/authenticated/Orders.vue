<template>
  <div>
    <div v-if="!loading">
      <h1 class="my-2">Orders</h1>
      <vue-good-table v-if="orderRows" :columns="columns" :rows="orderRows" :pagination-options="{
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

          <span v-if="props.column.field == 'nominator'">
            <span v-for="(key, idx) in props.formattedRow[props.column.field]" :key="idx">
              <p v-if="idx == '_id'">
                <router-link :to="{ name: 'profile', params: { id: key } }">Visit Profile Of</router-link>
              </p>
              <p v-if="idx == 'companyName'">{{ key }}</p> &nbsp;

            </span>
          </span>

          <span v-else-if="props.column.field == 'vessel'">
            <span v-for="(key, idx) in props.formattedRow[props.column.field]" :key="idx" v-if="idx == 'name'">
              <router-link :to="{name: 'vessels', params: { id: currentUser._id }}">{{ key }}</router-link>
            </span>
          </span>

          <span v-else-if="props.column.field == 'fuels'">
            <p v-for="(fuels, idx) of props.formattedRow[props.column.field]" :key="idx">
              Fuel: {{ fuels.fuel.name }} &nbsp;
              Quantity: {{ fuels.quantity }}
            </p> <br> <br>
          </span>

          <span v-else-if="props.column.label.trim() === 'Actions'">
            <span v-if="!checkOrderIfRejected(props.formattedRow[props.column.field]) && !checkOrderIfAccepted(props.formattedRow[props.column.field]) && !checkOrderIfCompleted(props.formattedRow[props.column.field])">
              <button class="d-block my-2 btn btn-primary" @click.prevent="acceptOrder(props.formattedRow[props.column.field])">Accept</button>
              <button @click.prevent="rejectOrder(props.formattedRow[props.column.field])" class="d-block my-2 btn btn-danger">Reject</button>
            </span>
            <span v-else-if="checkOrderIfAccepted(props.formattedRow[props.column.field])">
              <button @click.prevent="completeOrder(props.formattedRow[props.column.field])" class="d-block my-2 btn btn-success">Complete</button>
            </span>
            <span v-else-if="checkOrderIfRejected(props.formattedRow[props.column.field]) || checkOrderIfCompleted(props.formattedRow[props.column.field])">
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
  name: "OrdersList",
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
          label: 'Ordered By',
          field: 'nominator',
          sortable: false
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
    orderRows() {
      let orders = this.$store.getters['Orders/orders']
      return orders
    },

    currentUser() {
      return this.$store.getters['Login/account']
    },

    loading() {
      return this.$store.getters['Orders/loading']
    }

  },

  methods: {
    checkOrderIfAccepted(orderId) {
      if (this.orderRows) {
        let order = this.orderRows.filter(order => order._id == orderId)[0]
        return order && order.status == 'accepted'
      }
      return false
    },

    checkOrderIfRejected(orderId) {
      if (this.orderRows) {
        let order = this.orderRows.filter(order => order._id == orderId)[0]
        return order && order.status == 'rejected'
      }
      return false
    },

    checkOrderIfCompleted(orderId) {
      if (this.orderRows) {
        let order = this.orderRows.filter(order => order._id == orderId)[0]
        return order && order.status == 'completed'
      }
      return false
    },

    acceptOrder(orderId) {
      let data = {
        id: orderId,
        accept: 'true'
      }

      this.$store.dispatch('Orders/patchOrder', data)
        .then(() => {
          this.$toast.success('Success, Order is Accepted!')
      }).catch(() => {
        this.$toast.error('Sorry, Something went wrong!')
      })
    },

    rejectOrder(orderId) {
      let data = {
        id: orderId,
        reject: 'true'
      }

      this.$store.dispatch('Orders/patchOrder', data)
          .then(() => {
            this.$toast.success('Success, Order is Rejected!')
          }).catch(() => {
        this.$toast.error('Sorry, Something went wrong!')
      })
    },

    completeOrder(orderId) {
      let data = {
        id: orderId,
        complete: 'true'
      }

      this.$store.dispatch('Orders/patchOrder', data)
          .then(() => {
            this.$toast.success('Success, Order is Completed!')
          }).catch(() => {
        this.$toast.error('Sorry, Something went wrong!')
      })
    },
  }
}
</script>

<style scoped>

</style>