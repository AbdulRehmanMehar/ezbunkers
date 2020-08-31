import Vue from 'vue'
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
    do_password_update_request({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.patch('/api/authentication/set-password', data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)
                    resolve(resp)
                }).catch(error => {
                console.log({...error})

                commit('SET_LOADING', false)
                commit('SET_ERRORS', error)
                reject(error)
            })
        })
    },

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