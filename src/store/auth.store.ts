import { Module } from 'vuex';
import AuthServices from '@/services/auth.services';
import { singletonPromiseCurry } from '@/utils/singletonGet';

const authState = {
  token: '',
  openId: '',
  userInfo: null,
  isAuth: false,
  authSetting: {} as IAnyObject,
};

const authStore: Module<typeof authState, {}> = {
  state: authState,
  mutations: {
    /**
     * 更换token
     */
    changeToken(state, token) {
      state.token = token;
    },
    /**
     * 更换是否获得用户信息
     * @param state
     * @param isAuth
     */
    changeIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
    /**
     * 更新用户功能授权配置
     * @param state
     */
    changeWechatAppScope(state, authSetting) {
      state.authSetting = authSetting;
    },
    changeOpenId(state, openId) {
      state.openId = openId;
    },
  },
  actions: {
    /**
     * 用户授权
     */
    async auth({ commit }, userInfo) {
      if (userInfo.errMsg && ~userInfo.errMsg.indexOf('deny')) {
        mpx.toast('取消授权');
        return;
      }
      const res = await AuthServices.accreditUserInfo(userInfo);
      if (res) {
        commit('changeIsAuth', true);
        AuthServices.saveIsAuthStorage(true);
      }
    },

    /**
     * 登录实际方法
     */
    login: singletonPromiseCurry(async function({ commit }) {
      try {
        const {
          token,
          auth: notAuth, // API 返回的 auth 存在歧义，1 的时候表示未授权
          openId, // 用户openId
        } = await AuthServices.getTokenAndUserInfo();
        commit('changeToken', token);
        commit('changeIsAuth', !notAuth);
        commit('changeOpenId', openId);
        AuthServices.saveTokenStorage(token);
        AuthServices.saveIsAuthStorage(!notAuth);
        AuthServices.saveOpenIdStorage(openId);
      } catch (error) {
        logger.error('初始化获取token失败', error);
      }
    }),

    async logout({ commit }) {
      commit('changeToken', '');
      commit('changeIsAuth', false);
      await AuthServices.saveTokenStorage(void 0);
      await AuthServices.saveIsAuthStorage(void 0);
    },

    async reLogin({ dispatch, state }) {
      if (state.token) {
        await dispatch('logout');
      }
      return dispatch('login');
    },
    /**
     * 初始化
     */
    async init({ dispatch, commit }) {
      const token = AuthServices.getTokenStorage(true);
      if (token) {
        commit('changeToken', token);
        commit('changeIsAuth', AuthServices.getIsAuthStorage(true));
        commit('changeOpenId', AuthServices.getOpenIdStorage(true));
        try {
          await mpx.checkSession(); // 检查session
        } catch {
          // session 过期重新登录
          logger.warn('Session 过期');
          return dispatch('reLogin');
        }
      } else {
        return dispatch('login');
      }
    },
    /**
     * 更新store的授权信息
     */
    async updateAuthSetting({ commit, state }) {
      const setting = await mpx.getSetting({});
      const shouldUpdate = Object.keys(setting.authSetting).some(key => {
        return setting.authSetting[key] !== state.authSetting[key];
      });
      if (shouldUpdate) {
        commit('changeWechatAppScope', setting.authSetting);
      }
    },
  },
  getters: {
    isLogin(state) {
      return !!state.token;
    },
  },
};

export default authStore;
