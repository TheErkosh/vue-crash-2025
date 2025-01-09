import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
        },
        {
            path: '/jobs/:id',
            name: 'job',
            component: () => import('@/views/JobView.vue')
        },
        {
            path: '/jobs/edit/:id',
            name: 'edit-job',
            component: () => import('@/views/EditJobView.vue')
        },
        {
            path: '/jobs/add',
            name: 'add-job',
            component: () => import('@/views/AddJobView.vue')
        }
    ]
})

export default router;