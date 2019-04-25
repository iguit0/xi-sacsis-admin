import Vue from 'vue'
import VueRouter from 'vue-router'
import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./components/home/Home'),
        meta: { requiresLogin: true }
    },
    {
        path: '/admin',
        name: 'adminPages',
        component: () => import('./components/admin/AdminPages'),
        meta: { requiresLogin: true }
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
    },
    {
        path: '/cadastro-ministrante',
        name: 'FormTeacherSignup',
        component: () => import('./components/admin/FormTeacherSignup.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem(userKey))

    // verificar se usuario esta logado - possui token valido
    if (to.matched.some(record => record.meta.requiresLogin))
        user && user.jwt_token ? next() : next({ path: '/entrar' })
    else
        next()

    /* verificar se usuario eh admin
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        user && user.admin ? next() : next({ path: '/entrar' })
    } else {
        next()
    }*/
})

export default router;