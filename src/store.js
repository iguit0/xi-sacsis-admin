import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({ storage: window.sessionStorage })],
    state: {
        isMenuVisible: false,
        user: null,
        stats: {
            participants: 0,
            courses: 0
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (!state.user) {
                state.isMenuVisible = false
                return
            }

            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if (user) {
                state.isMenuVisible = true
            } else {
                state.isMenuVisible = false
            }
        },
        setStats(state, stats) {
            state.stats = stats;
        },
    },
    getters: {
        getUserData(state) {
            return state.user.dados
        },
        getUsername(state) {
            return state.user.dados.nome
        },
        getToken(state) {
            if (state.user.jwt_token)
                return state.user.jwt_token
            else
                return null
        },
        getStats(state) {
            return state.stats
        }
    }
})
