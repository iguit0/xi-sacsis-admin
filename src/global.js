import Vue from 'vue';
export const baseApiUrl = 'https://api.sacsis.tech/api'
export const userKey = '__sacsis_user'

// tratamento de erros/exceções do backend
export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export function showSuccess(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultSuccess({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultSuccess({ msg: e })
    } else {
        Vue.toasted.global.defaultSuccess()
    }
}

export function showInfo(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultInformation({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultInformation({ msg: e })
    } else {
        Vue.toasted.global.defaultInformation()
    }
}

export function showWelcome(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultWelcome({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultWelcome({ msg: e })
    } else {
        Vue.toasted.global.defaultWelcome()
    }
}