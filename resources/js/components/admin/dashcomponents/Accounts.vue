<template>
  <div>
    <h1 class="my-2">Accounts</h1>
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
    }"
    :search-options="{
      enabled: true,
      trigger: 'enter',
    }">

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == '_id'">
          <a class="btn btn-sm primary" v-if="$route.params.type != 'approved'" @click.prevent="activateAccount(props.formattedRow[props.column.field])">Activate Account</a>
          <a class="btn btn-sm primary" v-else @click.prevent="deactivateAccount(props.formattedRow[props.column.field])">Deactivate Account</a>
        </span>

        <span v-else-if="props.column.field == 'companyDocuments'">
          <a style="display: block !important;" class="my-2" v-for="(item) in props.formattedRow[props.column.field]" :key="item._id" :href="item.path.slice(3, item.path.length)" target="_blank">
           {{ item.type == 'poo' ? 'Proof of Ownership' : 'Proof of Registry' }} Document.{{ item.ext.toUpperCase() }}
          </a>
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
  name: "DashboardAccounts",

  beforeCreate() {
    this.$store.dispatch('Account/fetch_accounts')
  },

  data() {
    return {
      columns: [
        {
          label: 'Company Name',
          field: 'companyName'
        },
        {
          label: 'Company Address',
          field: 'companyAddress'
        },
        {
          label: 'Company Documents',
          field: 'companyDocuments',
          sortable: false
        },
        {
          label: 'Email',
          field: 'email'
        },
        {
          label: 'IMO Number',
          field: 'imo'
        },
        {
          label: 'Phone Number',
          field: 'phone'
        },
        {
          label: 'Account Type',
          field: 'type'
        },
        {
          label: 'Work Title',
          field: 'workTitle'
        },
        {
          label: 'Account Holder',
          field: 'name'
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
    accountRows() {
      let accounts;
      if (this.$route.params.type && this.$route.params.type == 'all') {
        accounts = this.$store.getters['Account/accounts']
      } else {
        accounts = this.$store.getters['Account/accounts_needing_approval']
      }
      return accounts || []
    }
  },

  methods: {
    activateAccount(id) {
      this.$store.dispatch('Account/do_account_approval_request', id)
      this.$toast.success('Success! The account is now approved.')
    },

    deactivateAccount(id) {
      // TODO:// API CALL TO DEACTIVATE THE ACCOUNT (IF CLIENT DEMANDS!)
      // console.log('deactivate ' + id)
    },

  }

}
</script>

<style scoped>

</style>