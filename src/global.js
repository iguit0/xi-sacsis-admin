import Vue from 'vue'

export const baseApiUrl = 'https://sacsis-api.herokuapp.com/api'
export const userKey = '__sacsis_user'

// tratamento de erros/exceções do backend
export function showError(e) {
    Vue.toasted.global.defaultError({ msg: 'Erro!' })
    /*if (e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }*/
}

export function errorForm(e) {
    if (e) {
        console.log(e)
        Vue.toasted.global.defaultError({ msg: 'E-mail incorreto!' })
    }
}