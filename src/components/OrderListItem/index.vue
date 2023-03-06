<template>
  <div class="order_list_item" v-show="Object.keys(item)">
    <div class="head flex-space">
      <span class="date">{{ item?._add_time }}</span>
      <span class="status">{{ item?._status?._title }}</span>
    </div>
    <div class="content">
      <van-card
        v-for="card in item?.cartInfo"
        :key="card.id"
        :num="card?.cart_num"
        :price="card?.truePrice"
        :title="card?.productInfo?.store_name"
        :thumb="card?.productInfo?.image"
      />
      <div class="tips flex-end">
        共{{ item?.cartInfo?.length }}件商品，总金额<span class="t_price"
          >￥{{ item.pay_price }}</span
        >
      </div>
    </div>
    <div class="foot flex-end">
      <template v-if="$route.params.id > 0">
        <div
          class="btn"
          @click="$router.push(`/order/detail/${item.order_id}`)"
        >
          查看详情
        </div>
      </template>
      <template v-else>
        <div class="pay_btns">
          <van-button
            plain
            hairline
            round
            color="#999"
            @click="$emit('do_cancel', item.order_id)"
            >取消订单</van-button
          >
          <van-button
            hairline
            round
            color="#E93323"
            @click="$emit('do_pay', item.order_id)"
            >立即付款</van-button
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped>
.order_list_item {
  font-size: 14px;
  background-color: #fff;
  margin-bottom: 10px;
  .head {
    padding: 0 16px;
    height: 40px;
    border-bottom: 1px solid #eee;
    .status {
      color: #fc4141;
    }
  }
  .van-card__content {
    text-align: left;
  }

  .tips {
    height: 40px;
    padding: 0 16px;
    .t_price {
      color: #fc4141;
      font-weight: 700;
    }
  }
  .foot {
    padding: 0 16px;
    height: 54px;
    border-top: 1px solid #eee;
    .btn {
      width: 88px;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      background-color: #fc4141;
      color: #fff;
    }
  }
}
.pay_btns {
  .van-button {
    width: 88px;
    height: 30px;
    margin-left: 10px;
  }
}
</style>
