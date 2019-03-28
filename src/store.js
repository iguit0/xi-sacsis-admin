import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: "Igor Alves",
            email: 'igorsk89@gmail.com'
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }
    },
    getters: {
        username(state) {
            return state.user.name
        }
    }
})