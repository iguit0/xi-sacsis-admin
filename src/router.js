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
        path: '/admin-programacao',
        name: 'SchedulePages',
        component: () => import('./components/admin/schedule/SchedulePages.vue'),
        meta: { requiresLogin: true, requiresAdmin: true }
    },
    {
        path: '/programacao',
        name: 'ScheduleView',
        component: () => import('./components/template/Schedule.vue'),
        meta: { requiresLogin: true }
    },
    {
        path: '/minicursos',
        name: 'CoursesList',
        component: () => import('./components/user/Courses.vue'),
        meta: { requiresLogin: true }
    },
    {
        path: '/relatorios',
        name: 'ReportsPage',
        component: () => import('./components/admin/ReportsPage.vue'),
        meta: { requiresLogin: true, requiresAdmin: true }
    },
    {
        path: '/minha-conta',
        name: 'AccountPages',
        component: () => import('./components/user/Account.vue'),
        meta: { requiresLogin: true }
    },
    {
        path: '/entrar',
        name: 'auth',
        component: () => import('./components/template/Login.vue')
    },
    {
        path: '/admin-ministrantes',
        name: 'GuestsPages',
        component: () => import('./components/admin/GuestsPages.vue'),
        meta: { requiresLogin: true, requiresAdmin: true }
    },
    {
        path: '/cadastro-palestra/:token',
        name: 'FormSpeakerSignup',
        component: () => import('./components/admin/FormSpeakerSignup.vue'),
        props: true
    },
    {
        path: '/cadastro-minicurso/:token',
        name: 'FormTeacherSignup',
        component: () => import('./components/admin/FormTeacherSignup.vue'),
        props: true
    },
    {
        path: '*',
        name: 'NotFound',
        component: () => import('./components/template/404.vue')
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
        user && user.jwt_token && user.admin ? next() : next({ path: '/entrar' })
    } else {
        next()
    }
})

export default router;