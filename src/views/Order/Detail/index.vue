<template>
  <div class="order_detail">
    <div class="head flex-row">
      <div class="image">
        <img
          src="http://47.115.51.185//uploads/attach/2021/06/20210626/b59d7521f8e6a762f9b86bc79f321719.gif"
          alt=""
        />
      </div>
      <div class="desc">
        <div class="txt">{{ detailInfo._status?._msg }}</div>
        <div class="date">{{ detailInfo._add_time }}</div>
      </div>
    </div>
    <div class="steps">
      <div class="my_steps flex-around">
        <div
          :class="[
            'my_step_item',
            {
              on_step: active === step.id,
              to_red: step.id <= active,
              line_to_red: step.id < active,
            },
          ]"
          v-for="step in steps"
          :key="step.id"
        >
          {{ step.name }}
        </div>
      </div>
      <div class="addr flex-col">
        <div class="user flex-row">
          <div class="name">{{ detailInfo.real_name }}</div>
          <div class="phone">{{ detailInfo.user_phone }}</div>
        </div>
        <div class="address">{{ detailInfo.user_address }}</div>
      </div>
    </div>
    <div class="lineimg">
      <img src="http://47.115.51.185/h5/img/line.05bf1c84.jpg" alt="" />
    </div>
    <div class="cards">
      <div class="txt">共{{ detailInfo.total_num }}件商品</div>
      <van-card
        v-for="card in detailInfo.cartInfo"
        :key="card.id"
        :num="card.cart_num"
        :price="card.truePrice"
        :desc="card.productInfo.attrInfo.suk"
        :title="card.productInfo.store_name"
        :thumb="card.productInfo.image"
      />
      <div
        class="kefu"
        @click="$router.push(`/customer/list/${detailInfo.order_id}`)"
      >
        <van-icon name="service-o" />
        <span class="btn">联系客服</span>
      </div>
    </div>

    <div class="infos">
      <div class="text flex-space">
        <span>订单编号:</span>
        <span>{{ detailInfo.order_id }}</span>
      </div>
      <div class="text flex-space">
        <span>下单时间:</span>
        <span>{{ detailInfo._add_time }}</span>
      </div>
      <div class="text flex-space">
        <span>订单类型:</span>
        <span>普通订单</span>
      </div>
      <div class="text flex-space">
        <span>支付状态:</span>
        <span>{{ detailInfo._status?._title }}</span>
      </div>
      <div class="text flex-space">
        <span>支付方式:</span>
        <span>{{ detailInfo._status?._payType }}</span>
      </div>
    </div>
    <div class="pay">
      <div class="text flex-space">
        <span>支付金额:</span>
        <span>{{ detailInfo.pay_price }}</span>
      </div>
      <div class="text flex-space">
        <span>运费:</span>
        <span>{{ detailInfo.pay_postage }}</span>
      </div>
    </div>
    <div class="infact flex-end">
      实付款：<span
        >￥{{
          (
            Number(detailInfo.pay_price) + Number(detailInfo.pay_postage)
          ).toFixed(2)
        }}</span
      >
    </div>
    <div class="tuikuan flex-end">
      <div class="btn">申请退款</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: {},
      active: 0,
      steps: [
        {
          name: "待付款",
          id: 0,
        },
        {
          name: "待发货",
          id: 1,
        },
        {
          name: "待收货",
          id: 2,
        },
        {
          name: "待评价",
          id: 3,
        },
        {
          name: "已完成",
          id: 4,
        },
      ],
    };
  },
  created() {
    this.get_detail();
  },
  methods: {
    async get_detail() {
      let detail = await this.$api({
        method: "GET",
        url: "/order/detail/" + this.$route.params.id,
      });
      this.detailInfo = detail;
      this.active = detail._status._type;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
