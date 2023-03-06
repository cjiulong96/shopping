<template>
  <div id="tabbar">
    <van-tabbar v-model="active" active-color="#fc4141" @change="tabChange">
      <router-link
        class="item flex-center"
        v-for="tab in tabList"
        :key="tab.name"
        :to="tab.wap_url"
      >
        <van-tabbar-item :icon="tab.icon">{{ tab.name }}</van-tabbar-item>
      </router-link>
    </van-tabbar>
  </div>
</template>

<script>
import { Session } from "@/utils/storage";
import store from "@/store";
export default {
  name: "Tabbar",
  data() {
    return {
      // active: 0,
      tabList: [
        {
          name: "首页",
          icon: "home-o",
          wap_url: "/home",
        },
        {
          name: "分类",
          icon: "apps-o",
          wap_url: "/category",
        },
        {
          name: "购物车",
          icon: "shopping-cart-o",
          wap_url: "/shop",
        },
        {
          name: "我的",
          icon: "user-o",
          wap_url: "/user",
        },
      ],
    };
  },
  computed: {
    active: {
      get: () => store.state.user.tabActive,
      set: (val) => store.commit("user/SET_TAB_ACTIVE", val),
    },
  },
  created() {},
  methods: {
    tabChange(val) {
      Session.set("TAB_ACTIVE", val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
