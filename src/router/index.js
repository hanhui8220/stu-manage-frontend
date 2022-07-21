import { createWebHashHistory, createRouter } from 'vue-router';
import Login from "@/layouts/Login";
import Main from "@/layouts/Main";
import InfoManagement from "@/views/InfoManagement";
import DataStatistics from "@/views/DataStatistics";

const history = createWebHashHistory();
const router = createRouter({
    history,
    routes: [
        {
            path: '/',
            component: Login,
        },
        {
            path: '/main',
            component: Main,
            redirect: '/InfoManagement',
            meta: {
                requireAuth: true // 进入页面前判断是否需要登陆
            },
            children: [
                // 会被渲染在 Main 的 <router-view> 中
                { path: '/InfoManagement', component: InfoManagement },
                { path: '/DataStatistics', component: DataStatistics },
            ]
        }
    ]
})
export default router;