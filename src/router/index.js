import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                }
            ]
        },
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/panel',
                    name: 'panel',
                    component: () => import('@/views/DashboardPanel.vue')
                },
                {
                    path: '/panel/consultas',
                    name: 'consultas',
                    component: () => import('@/views/modulos/consultas/Index.vue')
                },
                {
                    path: '/panel/clientes',
                    name: 'clientes',
                    component: () => import('@/views/modulos/clientes/Index.vue')
                },
                {
                    path: '/panel/promociones',
                    name: 'promociones',
                    component: () => import('@/views/modulos/promociones/Index.vue')
                },
            ]
        }
    ]
});

export default router;