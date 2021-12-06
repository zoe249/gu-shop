// search模块
import { reqGetSearchInfo } from '@/api'
const state = {
    // 
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    // 获取Search模块数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqGetSearchInfo函数在调用服务器数据的时候，至少传递一个参数
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
// 计算属性
// getter主要作用是：简化仓库中的数据
// 可以把我们将来在组件当中要用的数据简化一下{在组件中使用就方便了}
const getters = {
    // 当前形参state，当前仓库中的state，并不是大仓库中的state
    goodsList(state) {
        // 这样书写是由问题的
        // 假如网络不给力|没有网络，state.searchList.goodsList返回的就是undefined
        // 至少来一个数组
        return state.searchList.goodsList;
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
}