import Vue from 'vue'
import VueRouter from 'vue-router'
import { userKey } from '@/global'

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
        component: () => import('./components/admin/AdminPages'),
        meta: { requiresAdmin: true }
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
    },
    {
        path: '/cadastro-palestrante',
        name: 'FormSpeakerSignup',
        component: () => import('./components/admin/FormSpeakerSignup.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router