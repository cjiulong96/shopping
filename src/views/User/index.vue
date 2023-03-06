<template>
  <div class="User" v-if="Object.keys(userData).length">
    <div class="bg flex-row">
      <div class="userInfo flex-row">
        <div class="avatar">
          <img :src="userData.avatar" alt="" />
        </div>
        <div class="info">
          <div class="name flex-row">
            <span class="nickname">{{ userData.nickname }}</span>
            <span class="vip_name">{{ userData.vip_name }}</span>
          </div>
          <div class="id">ID: {{ userData.uid }}</div>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="nav flex-around">
        <div class="item flex-col">
          <span>我的余额</span>
          <span>{{ userData.now_money }}</span>
        </div>
        <div class="line"></div>
        <div class="item flex-col">
          <span>当前佣金</span>
          <span>{{ userData.commissionCount }}</span>
        </div>
        <div class="line"></div>
        <div class="item flex-col">
          <span>优惠券</span>
          <span>{{ userData.couponCount }}</span>
        </div>
      </div>

      <div class="myorder">
        <van-cell
          title="我的订单"
          is-link
          value="全部订单"
          title-class="order"
          @click="$router.push(`/order/list/`)"
        />
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            :icon="item.icon"
            :text="item.name"
            :badge="userData.orderStatusNum[item.key]"
            v-for="item in gridList"
            :key="item.id"
            @click="on_grid(item.id)"
          />
        </van-grid>
      </div>
      <div class="myservice">
        <van-cell title="我的服务" title-class="service" />
        <van-grid
          :column-num="4"
          :border="false"
          v-if="Object.keys(userData).length"
        >
          <van-grid-item
            :icon="item.icon"
            :text="item.name"
            v-for="item in serviceList"
            :key="item.id"
            @click="$router.push(item.path)"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
      gridList: [
        {
          name: "待付款",
          id: 0,
          icon: "pending-payment",
          key: "unpaid_count",
        },
        {
          name: "待发货",
          id: 1,
          icon: "logistics",
          key: "unshipped_count",
        },
        {
          name: "待收货",
          id: 2,
          icon: "certificate",
          key: "received_count",
        },
        {
          name: "待评价",
          id: 3,
          icon: "comment-o",
          key: "evaluated_count",
        },
        {
          name: "售后/退款",
          id: -1,
          icon: "after-sale",
          key: "refund_count",
        },
      ],
      serviceList: [
        {
          name: "会员中心",
          id: 0,
          icon: "manager-o",
          path: "/user/vip",
        },
        {
          name: "砍价记录",
          id: 1,
          icon: "point-gift-o",
          path: "/activity/bargain/record",
        },
        {
          name: "我的推广",
          id: 2,
          icon: "friends-o",
          path: "/user/user_promotion",
        },
        {
          name: "我的余额",
          id: 3,
          icon: "gold-coin-o",
          path: "/user/account",
        },
        {
          name: "地址信息",
          id: 4,
          icon: "location-o",
          path: "/user/add_manage",
        },
        {
          name: "我的收藏",
          id: 5,
          icon: "star-o",
          path: "/collection",
        },
        {
          name: "优惠券",
          id: 6,
          icon: "coupon-o",
          path: "/user/user_coupon",
        },
        {
          name: "联系客服",
          id: 7,
          icon: "service-o",
          path: "/customer/list/",
        },
      ],
    };
  },
  created() {
    this.get_user_data();
  },
  methods: {
    async get_user_data() {
      let data = await this.$api({
        method: "GET",
        url: "/user",
      });
      this.userData = data;
    },
    on_grid(id) {
      if (id < 0) {
        return this.$router.push("/order/refund_list");
      }
      this.$router.push(`/order/list/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
