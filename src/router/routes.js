// 路由配置
// 引入路由组件
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Traed from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
// 路由懒加载
const foo = () => {
    console.log('home')
    return import ('@/pages/Home')
}
export default [{
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        component: () =>
            import ('@/pages/Search'),
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
        component: () =>
            import ('@/pages/Register'),
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
        component: () =>
            import ('@/pages/Detail'),
        meta: { siShow: true }
    },


    // 下面的都是不懒加载
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
        meta: { isShow: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须从购物车页面来
            if (from.path == '/shopcart') {
                next();
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { isShow: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/traed') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { isShow: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { isShow: true },
        // 二级路由
        children: [{
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
]