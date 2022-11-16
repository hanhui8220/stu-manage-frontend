import { createWebHashHistory, createRouter } from 'vue-router';
import Login from "@/layouts/Login";
import Main from "@/layouts/Main";
import SearchUser from "@/views/user/SearchUser";
import SearchStu from '@/views/student/SearchStu'
import SearchTeacher from '@/views/teacher/SearchTeacher'
import SearchClass from '@/views/class/SearchClass'
import SearchCourse from '@/views/course/SearchCourse'
import SearchMajor from '@/views/major/SearchMajor'
import SearchScore from '@/views/score/SearchScore'
import PerSonalScore from '@/views/score/PerSonalScore'

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
            redirect: '/SearchUser',
            meta: {
                requireAuth: true // 进入页面前判断是否需要登陆
            },
            children: [
                // 会被渲染在 Main 的 <router-view> 中
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
                { path: '/SearchClass', component: SearchClass }
            ]
        },
        {
            path: '/CourseManagement',
            component: Main,
            meta: {
                requireAuth: true // 进入页面前判断是否需要登陆
            },
            children: [
                { path: '/SearchCourse', component: SearchCourse },
                { path: '/SearchMajor', component:SearchMajor}
            ]
        },
        {
            path: '/ScoreManagement',
            component: Main,
            redirect: '/PersonalScore',
            meta: {
                requireAuth: true // 进入页面前判断是否需要登陆
            },
            children: [
                { path: '/SearchScore', component: SearchScore },
                { path: '/PersonalScore', component:PerSonalScore}
            ]
        }
    ]
})
export default router;