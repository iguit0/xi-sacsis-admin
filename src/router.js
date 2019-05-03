import Vue from 'vue'
import VueRouter from 'vue-router'
import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./components/template/Home.vue'),
        meta: { requiresLogin: true }
    },
    {
        path: '/admin',
        name: 'adminPages',
        component: () => import('./components/admin/AdminPages.vue'),
        meta: { requiresLogin: true, requiresAdmin: true }
    },
    {
        path: '/programacao',
        name: 'SchedulePages',
        component: () => import('./components/admin/SchedulePages.vue'),
        meta: { requiresLogin: true, requiresAdmin: true }
    },
    {
        path: '/minha-conta',
        name: 'AccountPages',
        component: () => import('./components/account/Account.vue'),
        meta: { requiresLogin: true }
    },
    {
        path: '/entrar',
        name: 'auth',
        component: () => import('./components/template/Login.vue')
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

    // verificar se usuario eh admin
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        user && user.admin == true ? next() : next({ path: '/entrar' })
    } else {
        next()
    }
})

export default router;