import Vue from 'vue'
import VueRouter from 'vue-router'

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
        path: '/entrar',
        name: 'auth',
        component: () => import('./components/auth/Auth')
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})