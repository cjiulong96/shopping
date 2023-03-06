import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import Vant from "vant";
import "@/styles/index.scss";
import "vant/lib/index.css";
import domainHelper from "./utils/domainHelper";
import dispose from "./utils/dispose";
import { Lazyload } from "vant";
Vue.prototype.$api = dispose;
Vue.use(Lazyload);
Vue.use(Vant);
// 注册-拖拽组件
Vue.use(domainHelper);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
