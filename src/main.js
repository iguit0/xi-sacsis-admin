import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// plugins
import './plugins/bootstrap'
import './plugins/icons'
import './plugins/toasted'
import './plugins/vue-mask'
import './plugins/form-wizard'
import './plugins/mq'
import './plugins/sweetalert'
import './plugins/v-select'

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');