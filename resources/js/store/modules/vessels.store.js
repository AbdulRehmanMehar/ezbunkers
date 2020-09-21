import Vue from 'vue'
import axios from 'axios'


const state = {
    vessels: [],
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

    SET_VESSELS(state, payload) {
        state.vessels = payload
    },

    ADD_VESSEL(state, payload) {
        state.vessels.push(payload)
    },

    REMOVE_VESSEL(state, payload) {
        let vessel = state.vessels.filter(vessel => vessel._id == payload)[0]
        state.vessels = state.vessels.filter(vessel => vessel._id != payload)
        Vue.delete(state.vessels, vessel)
    }

}

const actions = {
    fetch_vessels({ commit, rootState, rootGetters }) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.get('/api/vessels', )
                .then(resp => {
                    commit('SET_VESSELS', resp.data.data.vessels)
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


    fetch_my_vessels({ commit, rootState, rootGetters }) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.get('/api/vessel/mine', {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    commit('SET_VESSELS', resp.data.data.vessels)
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

    create_vessel({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.post('/api/vessel', data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
            .then(resp => {
                commit('SET_LOADING', false)
                commit('SET_SUCCESS', true)
                commit('ADD_VESSEL',  resp.data.data.vessel )
                resolve(resp)
            })
            .catch(error => {
                commit('SET_LOADING', false)
                commit('SET_ERRORS', error)
                reject(error)
            })

        })
    },

    delete_vessel({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.delete('/api/vessel/' + data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)
                    commit('REMOVE_VESSEL',  data )
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
    vessels: (state) => state.vessels
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}