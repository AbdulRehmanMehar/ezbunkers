<template>
  <div>
    <div v-if="!loading" class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div>
            <h1 class="my-2">Images</h1>
            <vue-good-table :columns="columns" :rows="imageRows" :pagination-options="{
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
                  <a class="btn btn-sm primary" @click.prevent="deleteImage(props.formattedRow[props.column.field])">Delete</a>
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
          <h1 class="my-2">Add Images</h1>
          <form @submit.prevent="addImage">
            <div class="form-group">
              <label for="type">Image Type</label>
              <select class="form-control" v-model="type" id="type" required>
                <option :value=null>Choose...</option>
                <option value="logo">Logo</option>
                <option value="banner">Banner</option>
              </select>
            </div>

            <div class="form-group">
              <label for="poo">Images</label>
              <div>
                <div class="custom-file">
                  <input type="file" class="custom-file-input"  ref="image" @change="handleUpload" id="poo" :disabled="!this.type" required :multiple="this.type == 'banner'" accept="image/*">
                  <label class="custom-file-label" for="poo">Choose file</label>
                </div>
              </div>
            </div>

            <button type="submit" class="form-control btn btn-success" :disabled="!this.type || !this.images">Add</button>
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
  name: "CompanyImages",
  components: { Loading },

  data() {
    return {
      columns: [
        {
          label: 'Image Type',
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
      images: null,
    }
  },

  computed: {
    loading() {
      return this.$store.getters['Login/loading']
    },

    imageRows() {
      return this.$store.getters['Login/images']
    },

    errors() {
      return this.$store.getters['Login/errors'] || []
    },

    current_logo() {
      return this.$store.getters['Login/companyLogo']
    }
  },

  methods: {

    deleteImage(_id) {
      this.$store.dispatch('Login/do_image_delete_request', _id)
      this.$toast.success('Success! Image was deleted!')
    },

    handleUpload() {
      this.images = this.$refs.image.files
    },

    async addImage() {
      let form_data = new FormData()
      form_data.append('fileType', this.type)
      for (let doc of this.images) {
        form_data.append(this.type, doc)
      }

      if (this.type == 'logo' && this.current_logo != null) {
        await this.deleteImage(this.current_logo._id)
      }

      this.$store.dispatch('Login/do_image_add_request', form_data)
      this.$toast.success('Success! Added the Logo!')
    }
  }
}
</script>

<style scoped>

</style>