import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@views/Home/index.vue";
import { Local } from "@/utils/storage";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    alias: "/home",
    name: "Home",
    component: Home,
    meta: {
      keep_alive: true, // 缓存
      show_tab_bar: true, // 标签栏
      Auth: false, // 登录,
      is_tab: 1,
    },
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("@views/Category/index.vue"),
    meta: {
      keep_alive: true,
      show_tab_bar: true,
      Auth: false,
      is_tab: 2,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@views/Search/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: false,
      is_tab: 0,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@views/Login/index.vue"),
    meta: {
      show_tab_bar: false,
      is_tab: 0,
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@views/User/index.vue"),
    meta: {
      show_tab_bar: true,
      Auth: true,
      is_tab: 4,
    },
  },
  {
    path: "/user/add_manage",
    name: "AddManage",
    component: () => import("@/views/Address/AddManage/index.vue"),
    meta: {
      is_tab: 0,
    },
  },
  {
    path: "/user/add_address/:id?",
    name: "AddAddress",
    component: () => import("@/views/Address/AddAddress/index.vue"),
    meta: {
      is_tab: 0,
    },
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@views/Shop/index.vue"),
    meta: {
      show_tab_bar: true,
      Auth: true,
      is_tab: 3,
    },
  },
  {
    path: "/goods_list",
    name: "GoodList",
    component: () => import("@views/GoodList/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: false,
      is_tab: 0,
    },
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("@views/Detail/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: false,
      is_tab: 0,
    },
  },
  {
    path: "/evaluate_list/:id?",
    name: "Evaluate",
    component: () => import("@views/Evaluate/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: true,
      is_tab: 0,
    },
  },
  {
    path: "/customer/list/:id?",
    name: "Customer",
    component: () => import("@views/Customer/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: true,
      is_tab: 0,
    },
  },
  {
    path: "/collection",
    name: "Collect",
    component: () => import("@views/Collect/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: true,
      is_tab: 0,
    },
  },
  {
    path: "/order/submit/:id",
    name: "OrderSubmit",
    component: () => import("@views/Order/Submit/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: true,
      is_tab: 0,
    },
  },
  {
    path: "/order/status/:id",
    name: "OrderStatus",
    component: () => import("@views/Order/Status/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: true,
      is_tab: 0,
    },
  },
  {
    path: "/order/list/:id?",
    name: "OrderList",
    component: () => import("@views/Order/List/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: true,
      is_tab: 0,
    },
  },
  {
    path: "/order/detail/:id",
    name: "OrderDetail",
    component: () => import("@views/Order/Detail/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: true,
      is_tab: 0,
    },
  },
  {
    path: "/hot_new_goods/:id?",
    name: "HotNewGoods",
    component: () => import("@views/HotNewGoods/index.vue"),
    meta: {
      show_tab_bar: false,
      Auth: false,
      is_tab: 0,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    //添加该方法
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  let rs = routes
    .filter((r) => r.meta.is_tab)
    .sort((a, b) => a.meta.is_tab - b.meta.is_tab)
    .map((r) => r.name);
  let c_index = rs.findIndex((f) => f === to.name);
  store.commit("user/SET_TAB_ACTIVE", c_index);
  let token = Local.get("TOKEN");
  if (to.meta.Auth) {
    if (token) next();
    else {
      store.commit("user/SET_LAST_PATH", to.path);
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
