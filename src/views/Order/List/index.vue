<template>
  <div class="order_list">
    <header class="order_header">
      <div class="txt_pic flex-space">
        <div class="text">
          <div class="title">订单信息</div>
          <div class="tips" v-if="orderData.order_count">
            <span>累计订单：{{ orderData.order_count }}</span>
            <span class="to_price">总消费：￥{{ orderData.sum_price }}</span>
          </div>
        </div>
        <div class="picture">
          <img
            src="http://47.115.51.185/h5/img/orderTime.e95f9090.png"
            alt=""
          />
        </div>
      </div>
    </header>
    <section class="lists">
      <div class="nav_list flex-around">
        <div
          :class="['nav_item flex-col', { active: navActive === index }]"
          v-for="(item, index) in navList"
          :key="item.id"
          @click="$router.push('/order/list/' + index)"
        >
          <div class="nav_name">{{ item.name }}</div>
          <div class="nav_count">{{ orderData[item.key] || 0 }}</div>
        </div>
      </div>
      <div class="orders">
        <van-loading
          class="loading"
          v-if="isLoading"
          type="spinner"
          size="50px"
          color="#E93323"
        ></van-loading>
        <template v-else>
          <template v-if="orders.length">
            <OrderListItem
              v-for="order in orders"
              :key="order.id"
              :item="order"
              @do_cancel="do_cancel"
              @do_pay="do_pay"
            ></OrderListItem>
          </template>
          <template v-else>
            <van-empty
              image="	http://47.115.51.185/h5/img/noOrder.90017ce2.png"
            />
          </template>
        </template>
      </div>
    </section>

    <van-action-sheet
      v-model="show"
      title="选择付款方式"
      :actions="actions"
      @select="onSelect"
    >
    </van-action-sheet>
  </div>
</template>

<script>
import { Toast } from "vant/lib";
export default {
  components: {
    OrderListItem: () => import("@cmpt/OrderListItem/index.vue"),
  },
  data() {
    return {
      isLoading: false,
      navList: [
        {
          name: "待付款",
          id: 0,
          key: "unpaid_count",
        },
        {
          name: "待发货",
          id: 1,
          key: "unshipped_count",
        },
        {
          name: "待收货",
          id: 2,
          key: "received_count",
        },
        {
          name: "待评价",
          id: 3,
          key: "evaluated_count",
        },
        {
          name: "已完成",
          id: 4,
          key: "complete_count",
        },
      ],
      orders: [],
      orderData: {},
      show: false,
      actions: [{ name: "微信支付" }, { name: "余额支付" }],
      pay_id: "",
    };
  },
  computed: {
    navActive() {
      let { id } = this.$route.params;
      if (id) id = Number(id);
      return id || 0;
    },
  },
  created() {
    this.get_order_data();
    this.get_order_list();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.get_order_list();
  },
  methods: {
    async get_order_data() {
      let data = await this.$api({
        method: "GET",
        url: "/order/data",
      });
      this.orderData = data;
    },
    async get_order_list(id) {
      this.isLoading = true;
      let orders = await this.$api({
        method: "GET",
        url: "/order/list",
        data: {
          page: 1,
          limit: 20,
          type: id || this.navActive,
        },
      });
      this.orders = orders;
      this.isLoading = false;
    },
    do_cancel(id) {
      this.$api({
        url: "/order/cancel",
        method: "POST",
        data: {
          id,
        },
      }).then(() => {
        Toast("取消成功");
        this.get_order_list();
      });
    },
    do_pay(id) {
      this.show = true;
      this.pay_id = id;
    },
    onSelect(v) {
      let payType = v.name === "微信支付" ? "weixin" : "yue";
      this.$api({
        method: "POST",
        url: "/order/pay",
        data: {
          uni: this.pay_id,
          paytype: payType,
          from: "weixinh5",
        },
      })
        .then(() => {
          this.show = false;
        })
        .catch(() => {
          this.show = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
