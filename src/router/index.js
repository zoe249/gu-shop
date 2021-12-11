// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter);
// /引入store
import store from '@/store/index'
import routes from './routes'
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
let router = new VueRouter({
    // 配置路由
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition) {
        // 返回的y代表滚动条在最上方
        return { y: 0 }
    }
})

// 全局导航守卫
router.beforeEach(async(to, from, next) => {
    // to 要跳转的路由
    // from 从哪个路由来的
    // next 放行函数    next('/login'):放行到指定的路由     next(false)
    next();
    // 用户登录了，一定会有token
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    if (token) {
        // 用户登录后还想去首页【不能去，留在首页】
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录了，去的不是登录页
            if (name) {
                next();
            } else {
                // 没有用户信息，派发actions
                try {
                    await store.dispatch('getUserInfo')
                } catch (error) {
                    // token 失效，获取不到信息
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        // 未登录暂时没有处理完毕
        // 未登录不能去交易相关的页面，不能去支付相关的页面、不能去个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未登录的时候没有去成的路径存储
            next('/login?rediret=' + toPath)
        } else {
            // /去的不是上面这些路由
        }
        next();
    }
})

export default router;