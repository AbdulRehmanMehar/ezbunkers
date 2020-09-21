import axios from 'axios'
import Vue from "vue";


const state = {
    loading: false,
    errors: null,
    success: false,
    orders: []
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

    SET_ORDERS(state, payload) {
        state.orders = payload
    },

    UPDATE_ORDER(state, payload) {

        for (let i=0; i < state.orders.length; i++) {
            if (state.orders[i]._id == payload._id) {
                state.orders[i].status = payload.status
                Vue.set(state.orders, i, state.orders[i])
            }
        }
    }

}

const actions = {

    nominate({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.post('/api/nomination', data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)
                    console.log(resp)
                    resolve(resp.data.data.nomination)
                })
                .catch(error => {
                    commit('SET_LOADING', false)
                    commit('SET_ERRORS', error)
                    reject(error)
                })

        })
    },

    getOrders({ commit, rootState, rootGetters }) {
        return new Promise((resolve, reject) =>  {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)
            axios.get('/api/nomination/orders', {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            }).then(resp => {
                let results = resp.data.data.orders

                commit('SET_LOADING', false)
                commit('SET_SUCCESS', true)
                commit('SET_ORDERS', results)
                resolve(resp)
            }).catch(error => {
                console.log(error)
                commit('SET_LOADING', false)
                commit('SET_ERRORS', error)
                reject(error)
            })

        })
    },


    patchOrder({ commit, rootState, rootGetters }, data) {

        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.patch('/api/nomination', data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    let update;
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)

                    update = resp.data.data.resp
                    update._id = data.id
                    console.log(update)
                    commit('UPDATE_ORDER', update)
                    resolve(resp.data.data)
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
    orders: (state, getters, rootState) => {
        return state.orders.filter(order => order.vessel.owner._id == rootState.Login.account._id)
    },
    nominations: (state, getters, rootState) => {
        return state.orders.filter(order => order.nominator._id == rootState.Login.account._id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}