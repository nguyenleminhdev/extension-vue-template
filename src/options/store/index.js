import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        is_loading: false,
    },
    mutations: {
        is_loading(state, value) {
            state.is_loading = value
        },
    },
    actions: {
        is_loading(context, value) {
            context.commit('is_loading', value)
        },
    },
    plugins: [createPersistedState()]
})

export default store
