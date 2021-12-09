// 路由配置
// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Traed from '@/pages/Trade'
import Pay from '@/pages/Pay'
export default [{
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
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { siShow: true }
    },
    {
        path: '/addcartSuccess',
        name: 'addcartSuccess',
        component: AddCartSuccess,
        meta: { isShow: true }
    },
    {
        path: '/shopcart',
        name: 'shopCart',
        component: ShopCart,
        meta: { isSHwo: true }
    },
    {
        path: '/traed',
        component: Traed,
        meta: { isShow: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { isShow: true }
    }
]