import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index';
import { setToken, removeToken } from '@/utils/token'
// 登录与注册的模块
const state = {
    code: "", // 验证码
    token: localStorage.getItem('TOKEN'),
    userInfo: {}, // 用户信息
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 清除token
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        removeToken()
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的接口，是把验证码返回了，但是正常情况下是返回到手机上
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fal'))
        }
    },
    // 登录业务[token]
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 服务器返回的token是唯一标识符
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token);
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 发起请求，通知服务器清除token
        let result = await reqLogout()
            // console.log(result);
        if (result.code == 200) {
            commit('CLEAR');
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}