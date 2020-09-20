import Vue from "vue";


const state = {
    messages: []
}

const mutations = {
    ADD_MESSAGE(state, payload) {
        state.messages.push(payload)
    },

    REMOVE_MESSAGES_OF_SENDER(state, payload) {
        let messages_of_sender = state.messages.filter(message => message.sender._id == payload)
        state.messages = state.messages.filter(message => message.sender._id != payload)
        Vue.delete(state.messages, messages_of_sender)
    }
}

const actions = {
    addMessage({ commit, rootState, rootGetters }, data) {
        if (rootGetters['Login/account']._id != data.sender._id) {
            commit('ADD_MESSAGE', data)
        }
    },

    removeMessagesBySenderId({ commit }, data) {

        commit('REMOVE_MESSAGES_OF_SENDER', data)

    }
}

const getters = {
    totalMessages: (state) => state.messages.length,
    totalMessagesBySenderId: (state) =>
                                (senderId) =>
                                    state.messages.filter(message => message.sender._id == senderId).length

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}