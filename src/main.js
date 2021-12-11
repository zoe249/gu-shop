import Vue from 'vue';
import App from './App.vue';
// 三级联动的组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination'

// 引入elementUI 
import { MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component('TypeNav', TypeNav);
Vue.component('Carousel', Carousel); //  轮播图
Vue.component('Pagination', Pagination); // 分页器
// 注册组件
// Vue.use(MessageBox);
Vue.prototype.$alert = MessageBox.alert;
// Vue.config.productionTip = false;
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入mockServe.js文件--mock数据
import '@/mock/mockServe';
// 引入swiper样式
import "swiper/css/swiper.css";
// 统一接受api文件夹里面的全部请求函数
import * as API from '@/api'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/jerry.gif'
// 注册
Vue.use(VueLazyload, {
    // 懒加载默认图
    loading: atm
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins);

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
    render: h => h(App),
    // 注册路由：底下的写法kv一致省略v【router小写】
    // 全局事件总线的配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    // 当这里书写route
    router,
    // 注册仓库：组件实例的身上会多一个$store的属性
    store,
}).$mount('#app')