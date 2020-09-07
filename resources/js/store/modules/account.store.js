import Vue from 'vue'
import axios from 'axios'


const state = {
    accounts: [],
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

    SET_ACCOUNTS(state, payload) {
        state.accounts = payload
    },

    UPDATE_ACCOUNT_UID(state, payload) {

        for (let i=0; i<state.accounts.length; i++) {
            if (state.accounts[i]._id == payload._id) {
                state.accounts[i].uid = payload.uid
                Vue.set(state.accounts, i, state.accounts[i])
                break
            }
        }
    }
}

const actions = {
    fetch_accounts({ commit, rootState, rootGetters }) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.get('/api/accounts')
            .then(resp => {
                commit('SET_ACCOUNTS', resp.data.data.accounts)
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

    do_account_approval_request({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.patch('/api/admin/activate-account/' + data, {}, {
                headers: {
                    authorization: rootGetters['Adminlogin/account'].token
                }
            })
            .then(resp => {
                commit('SET_LOADING', false)
                commit('SET_SUCCESS', true)
                commit('UPDATE_ACCOUNT_UID', { _id: data, uid: resp.data.data.uid })
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
    accounts: (state) => state.accounts,
    approved_accounts: (state) => state.accounts.filter(account => account.uid != undefined),
    accounts_needing_approval: (state) => state.accounts.filter(account => account.uid == undefined),
    search_approved_accounts: (state, getters) => (fuel, location) => {
        console.log('vuex', fuel, location)
        return getters.approved_accounts.filter(account => {
            return (
                (
                    account.vessels &&
                    account.vessels.some(
                        vessel => vessel.name.toLowerCase() == fuel.toLowerCase() ||
                        (
                            vessel.fuel &&
                            vessel.fuel.findIndex(
                            f => f.name.toLowerCase() == fuel.toLowerCase()) != -1)
                        )
                ) ||

                (
                    account.country &&
                    account.country.toLowerCase() == location.toLowerCase()
                )
            )
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}