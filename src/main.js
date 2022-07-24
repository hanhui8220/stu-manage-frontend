import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue';
import router from "@/router/index";
import axios from 'axios';
import VueAxios from 'vue-axios';
import { ElMessage } from 'element-plus';

const app = createApp(App)
app.use(ElementPlus,{locale})
app.use(VueAxios, axios)
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
app.use(router).mount('#app')

//路由拦截
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
        if (sessionStorage.getItem('USER_CODE')) { // 查询本地存储信息是否已经登陆
            next();
        } else {
            next({
                path: '/', // 未登录则跳转至login页面
                query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
            });
        }
    } else {
        next();
    }
});

// 全局异常处理
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response) {
        ElMessage.error(error.response.data.msg);
    } else {
        console.log('Error', error.message);
    }
});