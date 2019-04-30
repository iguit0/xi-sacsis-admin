import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação concluída com sucesso!' : payload.msg, {
        type: 'success',
        icon: 'check'
    }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ops... Aconteceu um erro!' : payload.msg, {
        type: 'error',
        position: "bottom-right",
        icon: 'times'
    }
)

Vue.toasted.register(
    'defaultWelcome',
    payload => !payload.msg ? 'Bem vindo(a)!' : payload.msg, {
        icon: 'smile'
    }
)

Vue.toasted.register(
    'defaultInformation',
    payload => !payload.msg ? 'Ops... Aconteceu um erro!' : payload.msg, {
        type: 'info',
        icon: 'info-circle'
    }
)