import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./components/home/Home')
    },
    {
        path: '/admin',
        name: 'adminPages',
        component: () => import('./components/admin/AdminPages')
    },
    {
        path: '/minha-conta',
        name: 'AccountPages',
        component: () => import('./components/admin/AccountPages')
    },
    {
        path: '/entrar',
        name: 'auth',
        component: () => import('./components/auth/Auth')
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})