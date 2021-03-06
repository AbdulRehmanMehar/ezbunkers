import axios from 'axios'
import Vue from "vue";


const state = {
    account: JSON.parse(localStorage.getItem('user-account')) || null,
    loading: false,
    errors: null,
    success: false,
    validate_uid_response_code: 0
}

const mutations = {
    SET_LOADING(state, payload) {
        state.loading = payload
    },

    SET_ERRORS(state, payload) {
        state.errors = payload
    },

    SET_SUCCESS(state, payload) {
        state.success = payload
    },

    SET_ACCOUNT(state, payload) {
        state.account = payload
    },

    SET_VALIDATE_UID_RESPONSE_CODE(state, payload) {
        state.validate_uid_response_code = payload
    },

    ADD_DOCUMENTS(state, payload) {
        let docs = [...state.account.companyDocuments, ...payload]
        state.account.companyDocuments = docs
        Vue.set(state.account, 'companyDocuments', docs)
    },

    DELETE_DOCUMENT(state, payload) {
        let document = state.account.companyDocuments.filter(document => document._id == payload)[0]
        state.account.companyDocuments = state.account.companyDocuments.filter(document => document._id != payload)
        Vue.delete(state.account.companyDocuments, document)
    },

    ADD_IMAGES(state, payload) {
        let images = [...state.account.companyImages, ...payload]
        state.account.companyImages = images
        Vue.set(state.account, 'companyImages', images)
    },

    DELETE_IMAGE(state, payload) {
        let image = state.account.companyImages.filter(image => image._id == payload)[0]
        state.account.companyImages = state.account.companyImages.filter(image => image._id != payload)
        Vue.delete(state.account.companyImages, image)
    },
}

const actions = {
    validate_user_id({ commit }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_ERRORS', null)
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)

            axios.get('/api/authentication/see-exists-and-set-otp/' + data)
                .then(resp => {
                    console.log({...resp})
                    commit('SET_VALIDATE_UID_RESPONSE_CODE', resp.status)
                    commit('SET_SUCCESS', true)
                    commit('SET_LOADING', false)
                    resolve(resp)
                })
                .catch(error => {
                    console.log({...error})
                    commit('SET_LOADING', false)
                    reject(error)
                })
        })
    },

    do_login_request({ commit }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_ERRORS', null)
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)

            axios.post("/api/authentication/login", data)
                .then(resp => {
                    const userAccount = resp.data.data.account
                    localStorage.setItem('user-account', JSON.stringify(userAccount))
                    commit('SET_ACCOUNT', userAccount)
                    commit('SET_SUCCESS', true)
                    console.log({...resp})
                    resolve(resp)
                }).catch(error => {
                commit('SET_ERRORS', error.response.data.errors)
                console.log({...error})
                reject(error)
            })


            commit('SET_LOADING', false)
        })
    },

    do_document_add_request({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_ERRORS', null)
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            axios.post('/api/authentication/add-documents', data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            }).then(resp => {
                commit('ADD_DOCUMENTS', resp.data.data.documents)
                commit('SET_SUCCESS', true)
                commit('SET_LOADING', false)

                localStorage.setItem('user-account', JSON.stringify(rootGetters['Login/account']))
                resolve(resp)
            }).catch(error => {
                console.log(error)
                commit('SET_ERRORS', error)
                commit('SET_LOADING', false)
                reject(error)
            })
        })
    },

    do_document_delete_request({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.delete('/api/authentication/document/' + data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)
                    commit('DELETE_DOCUMENT',  data )
                    localStorage.setItem('user-account', JSON.stringify(rootGetters['Login/account']))
                    resolve(resp)
                })
                .catch(error => {
                    commit('SET_LOADING', false)
                    commit('SET_ERRORS', error)
                    reject(error)
                })

        })
    },

    do_image_add_request({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_ERRORS', null)
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            axios.post('/api/authentication/add-images', data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            }).then(resp => {
                commit('ADD_IMAGES', resp.data.data.images)
                commit('SET_SUCCESS', true)
                commit('SET_LOADING', false)

                localStorage.setItem('user-account', JSON.stringify(rootGetters['Login/account']))
                resolve(resp)
            }).catch(error => {
                console.log(error)
                commit('SET_ERRORS', error)
                commit('SET_LOADING', false)
                reject(error)
            })
        })
    },

    do_image_delete_request({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.delete('/api/authentication/image/' + data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)
                    commit('DELETE_IMAGE',  data )
                    localStorage.setItem('user-account', JSON.stringify(rootGetters['Login/account']))
                    resolve(resp)
                })
                .catch(error => {
                    commit('SET_LOADING', false)
                    commit('SET_ERRORS', error)
                    reject(error)
                })

        })
    },

    logout({ commit }) {
        localStorage.removeItem('user-account')
        commit('SET_ACCOUNT', null)
    }
}

const getters = {
    errors: (state) => state.errors,
    loading: (state) => state.loading,
    success: (state) => state.success,
    account: (state) => state.account,
    images: (state, getters) => getters.account.companyImages,
    documents: (state, getters) => getters.account.companyDocuments,
    companyLogo: (state, getters) => getters.images.filter(image => image.type == 'logo')[0],
    validate_uid_response_code: (state) => state.validate_uid_response_code,

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}