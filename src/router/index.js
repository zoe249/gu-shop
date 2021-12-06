// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// 下吧VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来push方法，传递那些参数
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        // call()||apply区别
        // 相同点，都可以调用函数一次，都可篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [{
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },
            name: 'search',
            // 1.布尔值的写法,params
            // props: true,
            // 2.对象写法
            // props: { a: 1, b: 2 }
            // 3.函数写法：可以params参数，query参数传递给props
            props: (route) => {
                return { keyword: route.params.keyword, k: route.params.keyword }
            }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        // 重定向,在项目跑起来，访问/立马定向到首页
        {
            path: '/',
            redirect: 'home',
            meta: { show: true }
        }
    ]
})