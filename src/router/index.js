import { createWebHashHistory, createRouter } from 'vue-router';
import Login from "@/layouts/Login";
import Main from "@/layouts/Main";
import InfoManagement from "@/views/InfoManagement";
import SearchUser from "@/views/user/SearchUser";
import SearchStu from '@/views/student/SearchStu'
import SearchTeacher from '@/views/teacher/SearchTeacher'
import SearchClass from '@/views/class/SearchClass'
import ChooseClass from '@/views/class/ChooseClass'

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
                { path: '/SearchUser', component: SearchUser },
                { path: '/SearchTeach', component: SearchTeacher },
                { path: '/SearchStu', component: SearchStu },
            ]
        },
        {
            path: '/ClassManagement',
            component: Main,
            meta: {
                requireAuth: true // 进入页面前判断是否需要登陆
            },
            children: [
                { path: '/SearchClass', component: SearchClass },
                { path: '/ChooseClass', component: ChooseClass }
            ]
        }
    ]
})
export default router;