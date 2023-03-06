<template>
  <div id="shop">
    <div class="head">
      <header class="flex-around">
        <div class="item" v-for="hd in headerList" :key="hd">
          <van-icon name="passed"></van-icon>
          <span>{{ hd }}</span>
        </div>
      </header>
      <div class="header_manganer flex-space">
        <div class="left">
          购物数量<span>{{ count }}</span>
        </div>
        <div class="right">
          <span v-show="!clickManger" @click="clickManger_handle">管理</span>
          <span v-show="clickManger" @click="clickManger_handle">取消</span>
        </div>
      </div>
    </div>
    <div class="shopList">
      <ShopItem
        v-for="item in shopData"
        :key="item.id"
        :shopItem="item"
        @do_checked="do_checked"
      ></ShopItem>
    </div>
    <div class="border-t">
      <van-submit-bar
        v-show="!clickManger"
        :price="totalPrice"
        button-text="立即下单"
        @submit="onSubmit"
        class="shop_bottom"
      >
        <van-checkbox
          v-model="all_checked"
          checked-color="#FC4141"
          @click="do_all_checked"
          >全选</van-checkbox
        >
        <!-- <span slot="tip"> 你的收货地址不支持同城送, <span>修改地址</span> </span> -->
      </van-submit-bar>
      <div class="shop_bottom my_bottom flex-space" v-show="clickManger">
        <van-checkbox
          v-model="all_checked"
          checked-color="#FC4141"
          @click="do_all_checked"
          >全选</van-checkbox
        >
        <div class="btns">
          <van-button class="btn" round @click="do_collect">收藏</van-button>
          <van-button class="btn" round @click="do_del">删除</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Local } from "@/utils/storage";
import { Toast } from "vant/lib";
export default {
  components: {
    ShopItem: () => import("@cmpt/ShopItem/index.vue"),
  },
  data() {
    return {
      headerList: ["100%正品保证", "所有商品精挑细选", "售后无忧"],
      clickManger: false,
      shopData: [],
      count: 0,
      all_checked: false,
    };
  },
  computed: {
    checked_list() {
      return this.shopData.filter((f) => f.checked) || [];
    },
    checked_ids() {
      return Local.get("CHECKED_IDS");
    },
    totalPrice() {
      let p = this.checked_list.reduce((cur, next) => {
        return (cur += next.truePrice * 100 * next.cart_num);
      }, 0);
      return p;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.get_shop_list();
      this.get_count();
    },
    clickManger_handle() {
      this.clickManger = !this.clickManger;
    },
    async get_count() {
      let count = await this.$api({
        method: "GET",
        url: "/cart/count",
      });
      this.count = count.count;
    },
    async get_shop_list() {
      const shop_data = await this.$api({
        url: "/cart/list",
        method: "GET",
      });
      this.shopData = shop_data.valid.map((v) => ({
        ...v,
        checked: Local.get("CHECKED_IDS")?.includes(v.id),
      }));
    },
    onSubmit() {
      if (!this.checked_ids?.length) return Toast("请选择商品");
      this.$router.push(`/order/submit/${this.checked_ids.join(",")}`);
      Local.set("CHECKED_IDS", []);
    },
    do_del() {
      this.$api({
        method: "POST",
        url: "/cart/del",
        data: {
          ids: this.checked_ids,
        },
      }).then(() => {
        Toast.success("删除成功");
        Local.set("CHECKED_IDS", []);
        this.init();
      });
    },
    do_collect() {
      this.$api({
        method: "POST",
        url: "/collect/all",
        data: {
          category: "product",
          id: this.checked_ids,
        },
      }).then(() => {
        Toast.success("收藏成功");
      });
    },
    // 全选
    do_all_checked() {
      let ids = [];
      this.shopData = this.shopData.map((v) => {
        if (this.all_checked) ids.push(v.id);
        v.checked = this.all_checked;
        return v;
      });
      Local.set("CHECKED_IDS", ids);
    },
    do_checked(item) {
      let ids = Local.get("CHECKED_IDS") || [];
      ids.push(item.id);
      Local.set("CHECKED_IDS", ids);
    },
  },
  watch: {
    shopData: {
      handler(arr) {
        this.all_checked = arr.length && arr.every((v) => v.checked === true);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
