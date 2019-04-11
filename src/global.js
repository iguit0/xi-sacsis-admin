import Vue from 'vue'

export const baseApiUrl = 'https://sacsis-api.herokuapp.com/api'
export const userKey = '__sacsis_user'

// tratamento de erros/exceções do backend
export function showError(e) {
    if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
        console.log('caso 1')
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
        console.log('caso 2')
    } else {
        Vue.toasted.global.defaultError()
        console.log('caso 3')
    }
}