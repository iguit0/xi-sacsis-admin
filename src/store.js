import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        user: null,
        participants: 0,
        courses: 0
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
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        },
        setParticipants(state, participants) {
            state.participants = participants
        },
        setCourses(state, courses) {
            state.courses = courses
        }
    },
    getters: {
        getUsername(state) {
            return state.user.dados.nome
        },
        getToken(state) {
            return state.user.jwt_token
        },
        getParticipants(state) {
            return state.participants
        },
        getCourses(state) {
            return state.courses
        }
    }
})
