<template>
  <div>
    <div v-if="!loading" class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div>
            <h1 class="my-2">Documents</h1>
            <vue-good-table :columns="columns" :rows="documentRows" :pagination-options="{
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
                  <a class="btn btn-sm primary" @click.prevent="deleteDocument(props.formattedRow[props.column.field])">Delete</a>
                </span>


                <span v-else-if="props.column.field == 'path'">
                  <a style="display: block !important;" class="my-2" :href="props.formattedRow[props.column.field].slice(3, props.formattedRow[props.column.field].length)" target="_blank">
                     View
                  </a>
                </span>

                <span v-else>
                  {{props.formattedRow[props.column.field].toUpperCase()}}
                </span>
              </template>

            </vue-good-table>
          </div>
        </div>

        <div class="col-md-6">
          <h1 class="my-2">Add Documents</h1>
          <form @submit.prevent="addDocument">
            <div class="form-group">
              <label for="type">Document Type</label>
              <select class="form-control" v-model="type" id="type" required>
                <option :value=null>Choose...</option>
                <option value="other">Other</option>
                <option value="poo">Proof Of Ownership</option>
                <option value="por">Proof Of Registry</option>
              </select>
            </div>

            <div class="form-group">
              <label for="poo">Documents</label>
              <div>
                <div class="custom-file">
                  <input type="file" class="custom-file-input"  ref="documents" @change="handleUpload" id="poo" required multiple accept="image/*,application/pdf">
                  <label class="custom-file-label" for="poo">Choose file</label>
                </div>
              </div>
              <small v-if="errors.length > 0 && errors.find(error => error.param == 'poo')" class="form-text text-danger">
                {{ errors.find(error => error.param == 'poo').msg }}
              </small>
            </div>

            <button type="submit" class="form-control btn btn-success">Add</button>
          </form>
        </div>
      </div>
    </div>

    <div v-else>
      <Loading />
      <h1 class="mt-4 text-center">Processing</h1>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/partials/Loading"

export default {
  name: "CompanyDocuments",
  components: { Loading },

  data() {
    return {
      columns: [
        {
          label: 'Document Type',
          field: 'type'
        },
        {
          label: 'View',
          field: 'path'
        },
        {
          label: 'Actions',
          field: '_id'
        },
      ],

      type: null,
      documents: null,
    }
  },

  computed: {
    loading() {
      return this.$store.getters['Login/loading']
    },

    documentRows() {
      return this.$store.getters['Login/documents']
    },

    errors() {
      return this.$store.getters['Login/errors'] || []
    }
  },

  methods: {

    deleteDocument(_id) {
      this.$store.dispatch('Login/do_document_delete_request', _id)
      this.$toast.success('Success! Document was deleted!')
    },

    handleUpload() {
      this.documents = this.$refs.documents.files
    },

    addDocument() {
      let form_data = new FormData()
      form_data.append('fileType', this.type)
      for (let doc of this.documents) {
        form_data.append('documents', doc)
      }

      this.$store.dispatch('Login/do_document_add_request', form_data)
      this.$toast.success('Success! Document was Added.')
    }
  }
}
</script>

<style scoped>

</style>