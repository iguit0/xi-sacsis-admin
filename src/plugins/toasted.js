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
        icon: 'times'
    }
)

Vue.toasted.register(
    'defaultInformation',
    payload => !payload.msg ? 'Ops... Aconteceu um erro!' : payload.msg, {
        type: 'info',
        icon: 'info-circle'
    }
)