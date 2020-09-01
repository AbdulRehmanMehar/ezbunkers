<template>
    <div>
      <div v-if="!loading" >
        <div class="jumbotron text-center py-4">
          <h1 class="py-4">Signup</h1>
          <p>Provide your details in the form below.</p>

          <div>
            <p style="display: inline-block;">Signup as: </p>
            <div style="display: inline-block">
              <button class="btn btn-outline-primary" ref="typeBunkering" @click.prevent="setBunkeringAsAccountType">Bunkering</button>
              <button class="btn btn-outline-primary" ref="typeShipping" @click.prevent="setShippingAsAccountType">Shipping</button>

            </div>
            <small v-if="errors.length > 0 && errors.find(error => error.param == 'role')" class="form-text text-danger">
              {{ errors.find(error => error.param == 'role').msg }}
            </small>
          </div>
        </div>
        <div class="container my-5">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                  <form @submit.prevent="submit">
                    <!--         Personal Info           -->
                    <div class="my-4">
                      <div class="form-group">
                        <h3 class="font-weight-bolder">Personal Information</h3>
                      </div>

                      <div class="form-row">

                        <div class="form-group col-md-6">
                          <label for="inputName">Name</label>
                          <input type="text" v-model="name" class="form-control" id="inputName" placeholder="Name" required>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'name')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'name').msg }}
                          </small>
                        </div>


                        <div class="form-group col-md-6">
                          <label for="inputEmail4">Email</label>
                          <input type="email" v-model="email" class="form-control" id="inputEmail4" placeholder="Email" required>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'email')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'email').msg }}
                          </small>
                        </div>

                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputPhone4">Phone</label>
                          <input type="tel" v-model="phone" class="form-control" id="inputPhone4" placeholder="Phone" required>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'phone')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'phone').msg }}
                          </small>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="inputIMO4">IMO</label>
                          <input type="tel" v-model="imo" class="form-control" id="inputIMO4" placeholder="IMO" required>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'imo')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'imo').msg }}
                          </small>
                        </div>
                      </div>
                    </div>


                    <!--         Business Info           -->
                    <div class="my-4">
                      <div class="form-group">
                        <h3 class="font-weight-bolder">Business Information</h3>
                      </div>



                      <div class="form-row">

                        <div class="form-group col-md-6">
                          <label for="inputCompanyName">Company Name</label>
                          <input type="text" v-model="companyName" class="form-control" id="inputCompanyName" placeholder="Company Name" required>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'companyName')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'companyName').msg }}
                          </small>
                        </div>


                        <div class="form-group col-md-6">
                          <label for="inputWorkTitle4">Work Title</label>
                          <input type="text" v-model="workTitle" class="form-control" id="inputWorkTitle4" placeholder="Work Title" required>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'workTitle')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'workTitle').msg }}
                          </small>
                        </div>

                      </div>
                      <div class="form-row">
                        <div class="form-group col-md-12">
                          <label for="inputCountry4">Country</label>
                          <input type="text" v-model="country" class="form-control" id="inputCountry4" placeholder="Country" required>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'country')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'country').msg }}
                          </small>
                        </div>

                      </div>
                      <div class="form-group">
                        <label for="inputCompanyAddress">Company Address</label>
                        <textarea required id="inputCompanyAddress" v-model="companyAddress" rows="5" class="form-control" placeholder="Company Address"></textarea>
                        <small v-if="errors.length > 0 && errors.find(error => error.param == 'companyAddress')" class="form-text text-danger">
                          {{ errors.find(error => error.param == 'companyAddress').msg }}
                        </small>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="poo">Proof of Ownership</label>
                          <div>
                            <div class="custom-file">
                              <input type="file" class="custom-file-input"  ref="proofOfOwnership" @change="handleUploadForOwnership" id="poo" required multiple accept="image/*,application/pdf">
                              <label class="custom-file-label" for="poo">Choose file</label>
                            </div>
                          </div>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'poo')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'poo').msg }}
                          </small>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="por">Proof of Registry</label>
                          <div>
                            <div class="custom-file">
                              <input type="file" class="custom-file-input" ref="proofOfRegistry" @change="handleUploadForRegistry" id="por"  required multiple accept="image/*,application/pdf">
                              <label class="custom-file-label" for="por">Choose file</label>
                            </div>
                          </div>
                          <small v-if="errors.length > 0 && errors.find(error => error.param == 'por')" class="form-text text-danger">
                            {{ errors.find(error => error.param == 'por').msg }}
                          </small>
                        </div>
                      </div>

                    </div>

                    <div class="form-group">
                      <button class="btn btn-outline-success form-control">Submit</button>
                    </div>

                  </form>
                </div>
            </div>
        </div>
      </div>

      <div v-else>
        <Loading />
        <h1 class="text-center mt-4">Processing</h1>
      </div>
    </div>
</template>

<script>
    import Loading from "@/components/partials/Loading"

    export default {
      name: 'Signup',

      components: { Loading },

      data() {
        return {
          name: null,
          email: null,
          phone: null,
          imo: null,
          companyName: null,
          companyAddress: null,
          country: null,
          workTitle: null,
          poo: null,
          por: null,
          accountType: null,
        }
      },
      computed: {
        errors() {
          return this.$store.getters['Signup/errors'] || []
        },
        loading() {
          return this.$store.getters['Signup/loading']
        },
        success() {
          return this.$store.getters['Signup/success']
        },
      },
      watch: {
        success() {
          if (this.success) {
            this.$toast.success('Success! You\'re signed Up!')
            this.$router.push({ name: 'signup-success' })
          }
        },

        errors() {
          if (this.errors) {
            this.$toast.error('Yikes! Something isn\'t right!')
          }
        }
      },
      methods: {
        handleUploadForOwnership() {
          this.poo = this.$refs.proofOfOwnership.files
        },

        handleUploadForRegistry() {
          this.por = this.$refs.proofOfRegistry.files
        },

        setBunkeringAsAccountType() {
          this.accountType = 'bunkering'
          this.$refs.typeBunkering.classList.remove('btn-outline-primary')
          this.$refs.typeBunkering.classList.add('btn-primary')
          this.$refs.typeShipping.classList.add('btn-outline-primary')
          this.$refs.typeShipping.classList.remove('btn-primary')
        },

        setShippingAsAccountType() {
          this.accountType = 'shipping'
          this.$refs.typeShipping.classList.remove('btn-outline-primary')
          this.$refs.typeShipping.classList.add('btn-primary')

          this.$refs.typeBunkering.classList.add('btn-outline-primary')
          this.$refs.typeBunkering.classList.remove('btn-primary')
        },

        submit() {
          let form_data = new FormData()
          form_data.append('name', this.name)
          form_data.append('email', this.email)
          form_data.append('phone', this.phone)
          form_data.append('imo', this.imo)
          form_data.append('companyName', this.companyName)
          form_data.append('companyAddress', this.companyAddress)
          form_data.append('workTitle', this.workTitle)
          for (let doc of this.poo) {
            form_data.append('poo', doc)
          }

          for (let doc of this.por) {
            form_data.append('por', doc)
          }

          // form_data.append('por', this.por)
          form_data.append('country', this.country)
          form_data.append('role', this.accountType)
          this.$store.dispatch('Signup/do_singup_request', form_data)
        },

        changeRoute() {
          this.$router.push({ name: '' })
        }
      }
    }
</script>