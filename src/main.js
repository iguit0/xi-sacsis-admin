import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

// plugins
import VueAnalytics from 'vue-analytics'
import VModal from 'vue-js-modal'
import './plugins/bootstrap'
import './plugins/icons'
import './plugins/toasted'
import './plugins/v-mask'
import './plugins/form-wizard'
import './plugins/mq'
import './plugins/sweetalert'
import './plugins/v-select'
import './plugins/clipboard'
import './plugins/money'

Vue.use(VModal, { 
    dynamic: true, 
    dynamicDefaults: { 
        clickToClose: false 
    } 
})
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