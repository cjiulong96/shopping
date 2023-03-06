<template>
  <div class="status">
    <div class="wrapper">
      <div class="close">
        <van-icon name="clear"></van-icon>
      </div>
      <div class="title">订单支付失败</div>
      <div class="desc">
        <div class="item flex-space">
          <span>订单编号</span>
          <span>{{ $route.params.id }}</span>
        </div>
        <div class="item flex-space">
          <span>下单时间</span>
          <span>{{ new Date().toLocaleString() }}</span>
        </div>
        <div class="item flex-space">
          <span>支付方式</span>
          <span>{{ orderStatus?.payType }}</span>
        </div>
        <div class="item flex-space">
          <span>支付金额</span>
          <span>{{ (orderStatus?.totalPrice / 100).toFixed(2) }}</span>
        </div>
      </div>
      <div class="btns flex-col">
        <van-button
          class="btn btn1"
          size="large"
          round
          :to="`/order/detail/${$route.params.id}`"
          >查看订单</van-button
        >
        <van-button class="btn btn2" size="large" round to="/"
          >返回首页</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Session } from "@/utils/storage";
export default {
  computed: {
    orderStatus: () => Session.get("orderStatus"),
  },
};
</script>

<style lang="scss" scoped>
.status {
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .wrapper {
    background-color: #fff;
    border-radius: 6px;
    position: absolute;
    top: 100px;
    width: calc(100% - 32px);
    margin: 0 16px;
  }
  .close {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    color: #999999;
  }
  .title {
    font-size: 16px;
    color: #333;
    font-weight: 700;
    padding: 40px 0 30px 0;
    border-bottom: 1px solid #eee;
    margin: 0 16px;
  }
  .desc {
    padding: 10px 16px;
    border-bottom: 1px solid #eee;
    .item {
      font-size: 14px;
      color: #282828;
      padding: 4px 0;
    }
  }
  .btns {
    margin: 24px 16px;
    font-size: 14px;
    .btn {
      height: 44px;
    }
    .btn1 {
      margin-bottom: 10px;
      color: #fff;
      background-color: #fc4141;
    }
    .btn2 {
      color: #fc4141;
      background-color: #fff;
      border: 1px solid #fc4141;
    }
  }
}
</style>
