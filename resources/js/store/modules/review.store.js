import axios from 'axios'
import Vue from "vue";


const state = {
    loading: false,
    errors: null,
    success: false,
    reviews: []
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

    SET_REVIEWS(state, payload) {
        state.reviews = payload
    }


}

const actions = {

    leave({ commit, rootState, rootGetters }, data) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)

            axios.post('/api/review', data, {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            })
                .then(resp => {
                    commit('SET_LOADING', false)
                    commit('SET_SUCCESS', true)
                    resolve(resp.data.data.review)
                })
                .catch(error => {
                    commit('SET_LOADING', false)
                    commit('SET_ERRORS', error)
                    reject(error)
                })

        })
    },

    getReviews({ commit, rootState, rootGetters }) {
        return new Promise((resolve, reject) =>  {
            commit('SET_LOADING', true)
            commit('SET_SUCCESS', false)
            commit('SET_ERRORS', null)
            axios.get('/api/review', {
                headers: {
                    authorization: rootGetters['Login/account'].token
                }
            }).then(resp => {
                let results = resp.data.data.reviews

                commit('SET_LOADING', false)
                commit('SET_SUCCESS', true)
                commit('SET_REVIEWS', results)
                resolve(resp)
            }).catch(error => {
                console.log(error)
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
    reviews_by_me: (state, getters, rootState) => {
        return state.reviews.filter(review => review.reviewer._id == rootState.Login.account._id)
    },
    reviews_for_me: (state, getters, rootState) => {
        return state.reviews.filter(review => review.reviewee._id == rootState.Login.account._id)
    },

    reviewsForID: (state) => (id) => {
        return state.reviews.filter(review => review.reviewee._id == id)
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}