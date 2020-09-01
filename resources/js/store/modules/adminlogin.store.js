import axios from 'axios'


const state = {
    account: JSON.parse(localStorage.getItem('admin-account')) || null,
    loading: false,
    errors: null,
    success: false
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
}

const actions = {
    do_login_request({ commit }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_ERRORS', null)
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)

            axios.post("/api/authentication/admin-login", data)
                .then(resp => {
                    const adminAccount = resp.data.data.admin
                    localStorage.setItem('admin-account', JSON.stringify(adminAccount))
                    commit('SET_ACCOUNT', adminAccount)
                    commit('SET_SUCCESS', true)
                    resolve(resp)
                }).catch(error => {
                commit('SET_ERRORS', error.response.data.errors)
                reject(error)
            })


            commit('SET_LOADING', false)
        })
    },

    do_update_password_request({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_ERRORS', null)
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)

            axios.post("/api/admin/update-password", data, {
                headers: {
                    authorization: rootGetters['Adminlogin/account'].token
                }
            })
                .then(resp => {
                    commit('SET_SUCCESS', true)
                    resolve(resp)
                }).catch(error => {
                commit('SET_ERRORS', error.response.data.errors)
                reject(error)
            })


            commit('SET_LOADING', false)
        })
    },

    logout({ commit }) {
        localStorage.removeItem('admin-account')
        commit('SET_ACCOUNT', null)
    }
}

const getters = {
    errors: (state) => state.errors,
    loading: (state) => state.loading,
    success: (state) => state.success,
    account: (state) => state.account,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}