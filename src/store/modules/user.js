import { Local, Session } from "../../utils/storage";
const state = {
  token: Local.get("TOKEN"),
  userInfo: {},
  tabActive: Session.get("TAB_ACTIVE"),
  lastPath: "",
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info;
  },
  SET_TAB_ACTIVE: (state, active) => {
    state.tabActive = active;
  },
  SET_LAST_PATH: (state, path) => {
    state.lastPath = path;
  },
};
const actions = {
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      resolve();
    });
  },
  login({ commit }, data) {
    commit("SET_TOKEN", data?.token);
    commit("SET_LAST_PATH", "");
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      this._vm.$api({
        url: "",
        method: "post",
      });
      commit("SET_TOKEN", "");
      resolve();
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
