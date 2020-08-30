import Vue from 'vue'
import axios from 'axios'


const state = {
    fuels: [],
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

    SET_FUELS(state, payload) {
        state.fuels = payload
    },

    ADD_FUEL(state, payload) {
        state.fuels.push(payload)
    },

    REMOVE_FUEL(state, payload) {
        let fuel = state.fuels.filter(fuel => fuel._id == payload)[0]
        state.fuels = state.fuels.filter(fuel => fuel._id != payload)
        Vue.delete(state.fuels, fuel)
    }

}

const actions = {
    fetch_fuels({ commit, rootState, rootGetters }) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.get('/api/fuels', )
            .then(resp => {
                commit('SET_FUELS', resp.data.data.fuels)
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

    create_fuel({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.post('/api/admin/fuel', data, {
                headers: {
                    authorization: rootGetters['Adminlogin/account'].token
                }
            })
            .then(resp => {
                commit('SET_LOADING', false)
                commit('SET_SUCCESS', true)
                commit('ADD_FUEL',  resp.data.data.fuel )
                resolve(resp)
            })
            .catch(error => {
                commit('SET_LOADING', false)
                commit('SET_ERRORS', error)
                reject(error)
            })

        })
    },

    delete_fuel({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.delete('/api/admin/fuel/' + data, {
                headers: {
                    authorization: rootGetters['Adminlogin/account'].token
                }
            })
                .then(resp => {
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)
                    commit('REMOVE_FUEL',  data )
                    resolve(resp)
                })
                .catch(error => {
                    commit('SET_LOADING', false)
                    commit('SET_ERRORS', error)
                    reject(error)
                })

        })
    }
}

const getters = {
    errors: (state) => state.errors,
    loading: (state) => state.loading,
    success: (state) => state.success,
    fuels: (state) => state.fuels,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}