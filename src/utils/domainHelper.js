import { getQueryObject } from "@/utils/index";

export default {
  install(Vue) {
    const { domain } = getQueryObject(location.search);
    Vue.prototype.$apiUrl = domain || process.env.VUE_APP_BASE_URL;
  },
};
