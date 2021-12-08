import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';
// 封装游客临时身份，生成一个随机字符串
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客临时身份
    uuId_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    // 获取产品详情信息
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到和购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车以后，将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据 只返回code = 200
        // 所以不需要存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        // 当前函数如果执行返回Promise
        if (result.code == 200) {
            // 加入购物车成功的回调
            return 'ok'
        } else {
            // 加入购物车失败的回调
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}