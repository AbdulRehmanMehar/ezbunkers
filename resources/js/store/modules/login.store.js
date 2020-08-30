import axios from 'axios'


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
    validate_uid_response_code: (state) => state.validate_uid_response_code,
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}