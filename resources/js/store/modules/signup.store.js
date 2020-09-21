import axios from 'axios'


const state = {
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
}

const actions = {
    do_singup_request({ commit }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_ERRORS', null)
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)

            axios.post("/api/authentication/register", data)
                .then(resp => {
                    console.log(resp.data)
                    commit('SET_SUCCESS', true)
                    resolve(resp)
                }).catch(error => {
                    commit('SET_ERRORS', error.response.data.errors)
                    reject(error)
                })


            commit('SET_LOADING', false)
        })
    }
}

const getters = {
    errors: (state) => state.errors,
    loading: (state) => state.loading,
    success: (state) => state.success,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}