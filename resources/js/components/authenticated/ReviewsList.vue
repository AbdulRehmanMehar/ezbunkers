<template>
  <div>
    <div v-if="!loading">
      <h1 class="my-2">Reviews, {{ $route.params.type == 'byme' ? 'I left' : 'I got' }}!</h1>
      <vue-good-table v-if="reviewRows" :columns="columns" :rows="reviewRows" :pagination-options="{
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

          <span v-if="props.column.field == 'reviewer' || props.column.field == 'reviewee'">
            <span v-for="(key, idx) in props.formattedRow[props.column.field]" :key="idx">
              <p v-if="idx == '_id'">
                <router-link :to="{ name: 'profile', params: { id: key } }">Visit Profile Of</router-link>
              </p>
              <p v-if="idx == 'companyName'">{{ key }}</p> &nbsp;

            </span>
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
  name: "ReviewsList",
  components: { Loading },

  beforeCreate() {
    this.$store.dispatch('Review/getReviews')
  },

  data() {
    return {
      columns: [
        {
          label: 'Review ID',
          field: '_id'
        },
        {
          label: 'Reviewer',
          field: 'reviewer',
          sortable: false
        },
        {
          label: 'Reviewee',
          field: 'reviewee',
          sortable: false
        },
        {
          label: 'Price',
          field: 'price',
        },
        {
          label: 'Quality',
          field: 'quality'
        },
        {
          label: 'Communication',
          field: 'communication',
        },
        {
          label: 'Review',
          field: 'review'
        },

      ]
    }
  },

  computed: {
    reviewRows() {
      let { type } = this.$route.params
      let reviews = null

      if (type == 'byme') {
        reviews = this.$store.getters['Review/reviews_by_me']
      } else if (type == 'forme') {
        reviews = this.$store.getters['Review/reviews_for_me']
      }
      return reviews
    },

    loading() {
      return this.$store.getters['Review/loading']
    }
  }
}
</script>

<style scoped>

</style>