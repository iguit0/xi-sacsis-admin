import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// plugins
import VueAnalytics from 'vue-analytics'
import './plugins/bootstrap'
import './plugins/icons'
import './plugins/toasted'
import './plugins/vue-mask'
import './plugins/form-wizard'
import './plugins/mq'
import './plugins/sweetalert'
import './plugins/v-select'
import './plugins/clipboard'
import './plugins/money'

Vue.use(VueAnalytics, {
    id: 'UA-140729382-2',
    router,
    checkDuplicatedScript: true
})

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');