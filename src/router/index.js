import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const childrenRouter = [
    {
        path: '',
        redirect: "index",
    },
    {
        path: "index",
        name: "Home",
        meta: {
            title: "首页",
        },
        component: () => import("@/views/home.vue"),
    },
    {
        path: "menu",
        name: "Menu",
        meta: {
            title: "菜单管理",
        },
        component: () => import("@/views/menu/index.vue"),
    },
]
const routes = [
    {
        path: "/",
        name: "/",
        component: () => import('@/views/index.vue'),
        children: childrenRouter,
    },
    {
        path: '/login',
        name: "Login",
        meta: {
            title: '登录',
        },
        component: () => import('@/views/login.vue'),
    },
]

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes
})

// 全局路由导航
router.beforeEach((to, from, next) => {
    // 设置标题
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    next()
});

// 滚动行为，实现切换路由是滚动到顶部
router.scrollBehavior = (to, from, savedPosition) => {
    return {x: 0, y: 0};
};

export default router
