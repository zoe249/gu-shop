import { reqCarList, reqDeleteCartById, reqUpdateCheckedBuId } from '@/api/index'
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    // 获取购物车接口
    async getCartList({ commit }) {
        let result = await reqCarList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某一个产品Id
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 修改购物车产品选中状态
    async updataCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedBuId(skuId, isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除勾选的全部商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // 获取购物车中全部的产品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
                // 将每一次发挥的Promise返回到数据
                PromiseAll.push(promise)
            })
            // /只要全部返回的都是成功，返回结果即为成功，有一个失败就位黑白
        return Promise.all(PromiseAll);
    },
    // 全选按钮
    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        // console.log(state.cartList[0].cartInfoList);
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updataCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}